import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Trash2, Eye, Users, Package, AlertTriangle } from "lucide-react-native";
import { useAuth } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";
import { mockProducts } from "@/data/mock-products";

const mockUsers = [
  {
    id: "user-1",
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    role: "regular",
    status: "active",
    joinDate: "2024-01-02",
    listingsCount: 3,
  },
  {
    id: "user-2",
    name: "John Doe",
    email: "john.doe@university.edu",
    role: "advanced",
    status: "active",
    joinDate: "2024-01-03",
    listingsCount: 3,
  },
];

const mockReports = [
  {
    id: "report-1",
    productId: "1",
    productTitle: "Calculus: Early Transcendentals",
    reportedBy: "user-1",
    reason: "Misleading description",
    status: "pending",
    createdAt: "2024-01-15T10:00:00Z",
  },
];

export default function AdminScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "listings" | "reports">("overview");

  if (!user || user.role !== "admin") {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.accessDenied}>
          <Text style={[styles.accessDeniedText, { color: colors.text }]}>
            Access Denied
          </Text>
          <Text style={[styles.accessDeniedSubtext, { color: colors.textSecondary }]}>
            You don't have permission to access this page
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleDeleteListing = (productId: string) => {
    Alert.alert(
      "Delete Listing",
      "Are you sure you want to delete this listing?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {
          console.log("Admin deleted listing:", productId);
        }},
      ]
    );
  };

  const handleSuspendUser = (userId: string) => {
    Alert.alert(
      "Suspend User",
      "Are you sure you want to suspend this user?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Suspend", style: "destructive", onPress: () => {
          console.log("Admin suspended user:", userId);
        }},
      ]
    );
  };

  const renderUserItem = ({ item }: { item: any }) => (
    <View style={[styles.itemCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.itemContent}>
        <Text style={[styles.itemTitle, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.itemSubtitle, { color: colors.textSecondary }]}>{item.email}</Text>
        <View style={styles.itemMeta}>
          <Text style={[styles.metaText, { color: colors.textSecondary }]}>
            Role: {item.role} • Listings: {item.listingsCount}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: colors.error + "20" }]}
        onPress={() => handleSuspendUser(item.id)}
      >
        <Trash2 color={colors.error} size={16} />
      </TouchableOpacity>
    </View>
  );

  const renderListingItem = ({ item }: { item: any }) => (
    <View style={[styles.itemCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.itemPrice, { color: colors.primary }]}>${item.price}</Text>
        <Text style={[styles.itemSubtitle, { color: colors.textSecondary }]}>
          by {item.sellerName}
        </Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary + "20" }]}
        >
          <Eye color={colors.primary} size={16} />
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

  const renderReportItem = ({ item }: { item: any }) => (
    <View style={[styles.itemCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.itemContent}>
        <Text style={[styles.itemTitle, { color: colors.text }]}>{item.productTitle}</Text>
        <Text style={[styles.itemSubtitle, { color: colors.textSecondary }]}>
          Reason: {item.reason}
        </Text>
        <Text style={[styles.metaText, { color: colors.textSecondary }]}>
          Reported on {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: colors.warning + "20" }]}>
        <Text style={[styles.statusText, { color: colors.warning }]}>Pending</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Admin Panel</Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { backgroundColor: colors.surface }]}>
        {[
          { key: "overview", label: "Overview" },
          { key: "users", label: "Users" },
          { key: "listings", label: "Listings" },
          { key: "reports", label: "Reports" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
            ]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === tab.key ? colors.primary : colors.textSecondary }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "overview" && (
          <View style={styles.overview}>
            {/* Stats */}
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Users color={colors.primary} size={24} />
                <Text style={[styles.statNumber, { color: colors.text }]}>{mockUsers.length}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Users</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Package color={colors.success} size={24} />
                <Text style={[styles.statNumber, { color: colors.text }]}>{mockProducts.length}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active Listings</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <AlertTriangle color={colors.warning} size={24} />
                <Text style={[styles.statNumber, { color: colors.text }]}>{mockReports.length}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Pending Reports</Text>
              </View>
            </View>

            {/* Recent Activity */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
              <View style={[styles.activityCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.activityText, { color: colors.textSecondary }]}>
                  No recent activity to display
                </Text>
              </View>
            </View>
          </View>
        )}

        {activeTab === "users" && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Users ({mockUsers.length})
            </Text>
            <FlatList
              data={mockUsers}
              renderItem={renderUserItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {activeTab === "listings" && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Listings ({mockProducts.length})
            </Text>
            <FlatList
              data={mockProducts}
              renderItem={renderListingItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {activeTab === "reports" && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Reports ({mockReports.length})
            </Text>
            <FlatList
              data={mockReports}
              renderItem={renderReportItem}
              keyExtractor={(item) => item.id}
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
  accessDenied: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  accessDeniedText: {
    fontSize: 24,
    fontWeight: "bold" as const,
    marginBottom: 10,
  },
  accessDeniedSubtext: {
    fontSize: 16,
    textAlign: "center",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold" as const,
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
    fontSize: 14,
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
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  section: {
    paddingTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    marginBottom: 15,
  },
  activityCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  activityText: {
    fontSize: 14,
  },
  itemCard: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500" as const,
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600" as const,
    marginBottom: 4,
  },
  itemMeta: {
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
  },
  itemActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600" as const,
  },
});
