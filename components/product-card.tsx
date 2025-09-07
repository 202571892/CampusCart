import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MessageCircle } from "lucide-react-native";
import { router } from "expo-router";
import { Product } from "@/data/mock-products";
import { useTheme } from "@/providers/theme-provider";
import { useAuth } from "@/providers/auth-provider";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { colors } = useTheme();
  const { user } = useAuth();

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  const handleMessageSeller = (e: any) => {
    e.stopPropagation();
    if (!user) {
      router.push("/auth");
      return;
    }
    router.push(`/(tabs)/messages?productId=${product.id}&sellerId=${product.sellerId}`);
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: product.images[0] }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {product.title}
        </Text>
        
        <Text style={[styles.price, { color: colors.primary }]}>
          ${product.price}
        </Text>
        
        <View style={styles.sellerInfo}>
          <Image source={{ uri: product.sellerAvatar }} style={styles.sellerAvatar} />
          <Text style={[styles.sellerName, { color: colors.textSecondary }]} numberOfLines={1}>
            {product.sellerName}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={[styles.conditionBadge, { backgroundColor: colors.primary + "20" }]}>
            <Text style={[styles.conditionText, { color: colors.primary }]}>
              {product.condition.replace("-", " ")}
            </Text>
          </View>
          
          <TouchableOpacity
            style={[styles.messageButton, { backgroundColor: colors.primary }]}
            onPress={handleMessageSeller}
          >
            <MessageCircle color="white" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
    backgroundColor: "#f0f0f0",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600" as const,
    marginBottom: 4,
    lineHeight: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold" as const,
    marginBottom: 8,
  },
  sellerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sellerAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  sellerName: {
    fontSize: 12,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  conditionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  conditionText: {
    fontSize: 10,
    fontWeight: "600" as const,
    textTransform: "capitalize" as const,
  },
  messageButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
