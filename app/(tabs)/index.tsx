import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, ShoppingBag, BookOpen, Laptop, Shirt, GraduationCap } from "lucide-react-native";
import { router } from "expo-router";
import { useAuth } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";
import { mockProducts } from "@/data/mock-products";
import { ProductCard } from "@/components/product-card";

const categories = [
  { id: "textbooks", name: "Textbooks", icon: BookOpen, emoji: "📚" },
  { id: "electronics", name: "Electronics", icon: Laptop, emoji: "💻" },
  { id: "clothes", name: "Clothes", icon: Shirt, emoji: "👕" },
  { id: "services", name: "Services", icon: GraduationCap, emoji: "👨‍🏫" },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <View style={styles.headerTop}>
            <Text style={[styles.logo, { color: colors.primary }]}>
              CampusCart 🎓🛒
            </Text>
            {!user ? (
              <TouchableOpacity
                style={[styles.authButton, { backgroundColor: colors.primary }]}
                onPress={() => router.push("/auth")}
              >
                <Text style={styles.authButtonText}>Login</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => router.push("/(tabs)/dashboard")}
              >
                <Image
                  source={{ uri: user.avatarUrl }}
                  style={styles.avatar}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Search color={colors.textSecondary} size={20} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search for books, electronics, clothes..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Hero Section */}
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Buy, sell, and trade with students on your campus</Text>
            <Text style={styles.heroSubtitle}>
              Join thousands of students buying and selling textbooks, electronics, and more
            </Text>
            <View style={styles.heroButtons}>
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: colors.background }]}
                onPress={() => user ? router.push("/(tabs)/dashboard") : router.push("/auth")}
              >
                <ShoppingBag color={colors.primary} size={20} />
                <Text style={[styles.primaryButtonText, { color: colors.primary }]}>
                  {user ? "Start Selling" : "Get Started"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  { 
                    backgroundColor: colors.surface,
                    borderColor: selectedCategory === category.id ? colors.primary : colors.border,
                    borderWidth: selectedCategory === category.id ? 2 : 1,
                  }
                ]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={[styles.categoryName, { color: colors.text }]}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {selectedCategory ? `${categories.find(c => c.id === selectedCategory)?.name}` : "All Products"}
            </Text>
            {selectedCategory && (
              <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                <Text style={[styles.clearFilter, { color: colors.primary }]}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold" as const,
  },
  authButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  authButtonText: {
    color: "white",
    fontWeight: "600" as const,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  hero: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 30,
  },
  heroContent: {
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 15,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold" as const,
  },
  clearFilter: {
    fontSize: 16,
    fontWeight: "600" as const,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  categoryCard: {
    flex: 1,
    minWidth: "45%",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 15,
    borderWidth: 1,
  },
  categoryEmoji: {
    fontSize: 30,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600" as const,
  },
  productRow: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
});
