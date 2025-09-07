import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { MessageCircle, Star, ArrowLeft } from "lucide-react-native";
import { mockProducts } from "@/data/mock-products";
import { useTheme } from "@/providers/theme-provider";
import { useAuth } from "@/providers/auth-provider";

const { width } = Dimensions.get("window");

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Product not found</Text>
      </SafeAreaView>
    );
  }

  const handleMessageSeller = () => {
    if (!user) {
      router.push("/auth");
      return;
    }
    router.push(`/(tabs)/messages?productId=${product.id}&sellerId=${product.sellerId}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Product Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          >
            {product.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.productImage} />
            ))}
          </ScrollView>
          
          {product.images.length > 1 && (
            <View style={styles.imageIndicators}>
              {product.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    {
                      backgroundColor: index === currentImageIndex ? colors.primary : colors.border,
                    },
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        <View style={styles.content}>
          {/* Product Info */}
          <View style={styles.productInfo}>
            <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
            <Text style={[styles.price, { color: colors.primary }]}>${product.price}</Text>
            
            <View style={styles.badges}>
              <View style={[styles.badge, { backgroundColor: colors.primary + "20" }]}>
                <Text style={[styles.badgeText, { color: colors.primary }]}>
                  {product.category.replace("-", " ")}
                </Text>
              </View>
              <View style={[styles.badge, { backgroundColor: colors.success + "20" }]}>
                <Text style={[styles.badgeText, { color: colors.success }]}>
                  {product.condition.replace("-", " ")}
                </Text>
              </View>
            </View>
          </View>

          {/* Seller Info */}
          <View style={[styles.sellerSection, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.sellerInfo}>
              <Image source={{ uri: product.sellerAvatar }} style={styles.sellerAvatar} />
              <View style={styles.sellerDetails}>
                <Text style={[styles.sellerName, { color: colors.text }]}>{product.sellerName}</Text>
                <View style={styles.rating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} color={colors.warning} fill={colors.warning} size={16} />
                  ))}
                  <Text style={[styles.ratingText, { color: colors.textSecondary }]}>(4.8)</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity
              style={[styles.messageButton, { backgroundColor: colors.primary }]}
              onPress={handleMessageSeller}
            >
              <MessageCircle color="white" size={20} />
              <Text style={styles.messageButtonText}>Message Seller</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {product.description}
            </Text>
          </View>

          {/* Additional Info */}
          <View style={styles.additionalInfo}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Details</Text>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Category:</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Condition:</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {product.condition.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Posted:</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {new Date(product.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width,
    height: 300,
    backgroundColor: "#f0f0f0",
  },
  imageIndicators: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  content: {
    padding: 20,
  },
  productInfo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold" as const,
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold" as const,
    marginBottom: 15,
  },
  badges: {
    flexDirection: "row",
    gap: 10,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600" as const,
    textTransform: "capitalize" as const,
  },
  sellerSection: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  sellerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: "600" as const,
    marginBottom: 4,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
  },
  messageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  messageButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600" as const,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  additionalInfo: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500" as const,
  },
});
