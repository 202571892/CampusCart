import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: "regular" | "advanced" | "admin";
  unreadMessages: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoUsers: User[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@university.edu",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "admin",
    unreadMessages: 0,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "user-1",
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    role: "regular",
    unreadMessages: 2,
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "user-2",
    name: "John Doe",
    email: "john.doe@university.edu",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    role: "advanced",
    unreadMessages: 1,
    createdAt: "2024-01-03T00:00:00Z",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const foundUser = demoUsers.find(u => u.email === email);
    
    if (foundUser && (password === "DemoAdminPass123!" || password === "DemoUserPass123!" || password === "DemoSellerPass123!")) {
      setUser(foundUser);
      await AsyncStorage.setItem("user", JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    if (!email.endsWith(".edu")) {
      return false;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`,
      role: "regular",
      unreadMessages: 0,
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    await AsyncStorage.setItem("user", JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  }, []);

  const switchRole = useCallback(async () => {
    if (!user) return;

    const newRole: "regular" | "advanced" = user.role === "regular" ? "advanced" : "regular";
    const updatedUser: User = { ...user, role: newRole };
    
    setUser(updatedUser);
    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
  }, [user]);

  const value = useMemo(() => ({
    user,
    login,
    signup,
    logout,
    switchRole,
    isLoading,
  }), [user, login, signup, logout, switchRole, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
