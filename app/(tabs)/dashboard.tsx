import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, Star } from "lucide-react-native";
import { router } from "expo-router";
import { useAuth } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";
import { mockProducts } from "@/data/mock-products";

export default function DashboardScreen() {
  const { user, switchRole } = useAuth();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<"overview" | "listings">("overview");

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.authPrompt}>
          <Text style={[styles.authPromptText, { color: colors.text }]}>
            Please log in to access your dashboard
          </Text>
          <TouchableOpacity
            style={[styles.authButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push("/auth")}
          >
            <Text style={styles.authButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const userListings = mockProducts.filter(product => product.sellerId === user.id);

  const handleRoleSwitch = () => {
    Alert.alert(
      "Switch Role",
      `Switch to ${user.role === "regular" ? "Advanced Seller" : "Regular User"} mode?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Switch", onPress: switchRole },
      ]
    );
  };

  const handleDeleteListing = (productId: string) => {
    Alert.alert(
      "Delete Listing",
      "Are you sure you want to delete this listing?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {
          console.log("Delete listing:", productId);
        }},
      ]
    );
  };

  const renderListingItem = ({ item }: { item: any }) => (
    <View style={[styles.listingCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Image source={{ uri: item.images[0] }} style={styles.listingImage} />
      <View style={styles.listingContent}>
        <Text style={[styles.listingTitle, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.listingPrice, { color: colors.primary }]}>
          ${item.price}
        </Text>
        <Text style={[styles.listingDate, { color: colors.textSecondary }]}>
          Posted {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.listingActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary + "20" }]}>
          <Edit color={colors.primary} size={16} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.error + "20" }]}
          onPress={() => handleDeleteListing(item.id)}
        >
          <Trash2 color={colors.error} size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <View style={styles.userInfo}>
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          <View>
            <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
            <Text style={[styles.userRole, { color: colors.textSecondary }]}>
              {user.role === "regular" ? "Regular User" : user.role === "advanced" ? "Advanced Seller" : "Admin"}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.roleSwitch} onPress={handleRoleSwitch}>
          {user.role === "regular" ? (
            <ToggleLeft color={colors.textSecondary} size={24} />
          ) : (
            <ToggleRight color={colors.primary} size={24} />
          )}
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { backgroundColor: colors.surface }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "overview" && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
          ]}
          onPress={() => setActiveTab("overview")}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === "overview" ? colors.primary : colors.textSecondary }
          ]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "listings" && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
          ]}
          onPress={() => setActiveTab("listings")}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === "listings" ? colors.primary : colors.textSecondary }
          ]}>
            My Listings
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "overview" ? (
          <View style={styles.overview}>
            {/* Stats Cards */}
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.statNumber, { color: colors.primary }]}>{userListings.length}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active Listings</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.statNumber, { color: colors.success }]}>12</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Items Sold</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <View style={styles.ratingContainer}>
                  <Star color={colors.warning} fill={colors.warning} size={20} />
                  <Text style={[styles.statNumber, { color: colors.warning }]}>4.8</Text>
                </View>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Rating</Text>
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
              <TouchableOpacity
                style={[styles.actionCard, { backgroundColor: colors.primary }]}
                onPress={() => console.log("Create new listing")}
              >
                <Plus color="white" size={24} />
                <Text style={styles.actionCardText}>Post New Item</Text>
              </TouchableOpacity>
            </View>

            {/* Recent Listings */}
            <View style={styles.recentListings}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Listings</Text>
              {userListings.slice(0, 3).map((item) => (
                <View key={item.id} style={[styles.recentItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Image source={{ uri: item.images[0] }} style={styles.recentItemImage} />
                  <View style={styles.recentItemContent}>
                    <Text style={[styles.recentItemTitle, { color: colors.text }]} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={[styles.recentItemPrice, { color: colors.primary }]}>
                      ${item.price}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.listings}>
            <View style={styles.listingsHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                My Listings ({userListings.length})
              </Text>
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: colors.primary }]}
                onPress={() => console.log("Add new listing")}
              >
                <Plus color="white" size={20} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={userListings}
              renderItem={renderListingItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  authPrompt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  authPromptText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  authButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  authButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600" as const,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600" as const,
  },
  userRole: {
    fontSize: 14,
    marginTop: 2,
  },
  roleSwitch: {
    padding: 5,
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600" as const,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  overview: {
    paddingTop: 20,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold" as const,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },
  quickActions: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    marginBottom: 15,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
    gap: 10,
  },
  actionCardText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600" as const,
  },
  recentListings: {
    marginBottom: 30,
  },
  recentItem: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
  recentItemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  recentItemContent: {
    flex: 1,
    justifyContent: "center",
  },
  recentItemTitle: {
    fontSize: 14,
    fontWeight: "500" as const,
    marginBottom: 4,
  },
  recentItemPrice: {
    fontSize: 16,
    fontWeight: "600" as const,
  },
  listings: {
    paddingTop: 20,
  },
  listingsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  listingCard: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  listingImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  listingContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: "500" as const,
    marginBottom: 4,
  },
  listingPrice: {
    fontSize: 18,
    fontWeight: "600" as const,
    marginBottom: 4,
  },
  listingDate: {
    fontSize: 12,
  },
  listingActions: {
    justifyContent: "space-between",
    alignItems: "center",
  },
