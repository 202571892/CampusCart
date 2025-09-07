import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  Moon, 
  Sun, 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
} from "lucide-react-native";
import { router } from "expo-router";
import { useAuth } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: logout },
      ]
    );
  };

  const settingsItems = [
    {
      id: "profile",
      title: "Edit Profile",
      icon: User,
      onPress: () => console.log("Edit profile"),
      showChevron: true,
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      onPress: () => console.log("Notifications settings"),
      showChevron: true,
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      icon: Shield,
      onPress: () => console.log("Privacy settings"),
      showChevron: true,
    },
    {
      id: "help",
      title: "Help & Support",
      icon: HelpCircle,
      onPress: () => console.log("Help & support"),
      showChevron: true,
    },
  ];

  if (user?.role === "admin") {
    settingsItems.splice(2, 0, {
      id: "admin",
      title: "Admin Panel",
      icon: Shield,
      onPress: () => router.push("/admin"),
      showChevron: true,
    });
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        </View>

        {/* Theme Toggle */}
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              {isDark ? (
                <Moon color={colors.text} size={24} />
              ) : (
                <Sun color={colors.text} size={24} />
              )}
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                {isDark ? "Dark Mode" : "Light Mode"}
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={isDark ? colors.background : colors.surface}
            />
          </View>
        </View>

        {/* Settings Items */}
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.settingItem,
                index < settingsItems.length - 1 && { borderBottomColor: colors.border, borderBottomWidth: 1 }
              ]}
              onPress={item.onPress}
            >
              <View style={styles.settingLeft}>
                <item.icon color={colors.text} size={24} />
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  {item.title}
                </Text>
              </View>
              {item.showChevron && (
                <ChevronRight color={colors.textSecondary} size={20} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* User Info */}
        {user && (
          <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.userInfo}>
              <Text style={[styles.userInfoLabel, { color: colors.textSecondary }]}>
                Signed in as
              </Text>
              <Text style={[styles.userInfoValue, { color: colors.text }]}>
                {user.name}
              </Text>
              <Text style={[styles.userInfoEmail, { color: colors.textSecondary }]}>
                {user.email}
              </Text>
            </View>
          </View>
        )}

        {/* Logout */}
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
            <View style={styles.settingLeft}>
              <LogOut color={colors.error} size={24} />
              <Text style={[styles.settingTitle, { color: colors.error }]}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appInfoText, { color: colors.textSecondary }]}>
            CampusCart v1.0.0
          </Text>
          <Text style={[styles.appInfoText, { color: colors.textSecondary }]}>
            Made for university students
          </Text>
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
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold" as const,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500" as const,
    marginLeft: 15,
  },
  userInfo: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  userInfoLabel: {
    fontSize: 12,
    fontWeight: "500" as const,
    marginBottom: 4,
  },
  userInfoValue: {
    fontSize: 18,
    fontWeight: "600" as const,
    marginBottom: 2,
  },
  userInfoEmail: {
    fontSize: 14,
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  appInfoText: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
  },
});
