import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Send, ArrowLeft } from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";
import { mockProducts } from "@/data/mock-products";

interface Conversation {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
}

const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    productId: "1",
    productTitle: "Calculus: Early Transcendentals",
    productImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    otherUserId: "user-2",
    otherUserName: "John Doe",
    otherUserAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    lastMessage: "Is this still available?",
    lastMessageTime: "2024-01-15T14:30:00Z",
    unreadCount: 1,
  },
  {
    id: "conv-2",
    productId: "2",
    productTitle: "MacBook Air M1 2020",
    productImage: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    otherUserId: "user-1",
    otherUserName: "Jane Smith",
    otherUserAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    lastMessage: "Thanks for the quick response!",
    lastMessageTime: "2024-01-14T16:45:00Z",
    unreadCount: 0,
  },
];

const mockMessages: Message[] = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    senderId: "user-2",
    text: "Hi! Is this textbook still available?",
    timestamp: "2024-01-15T14:25:00Z",
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    senderId: "user-1",
    text: "Yes, it's still available! Are you interested?",
    timestamp: "2024-01-15T14:27:00Z",
  },
  {
    id: "msg-3",
    conversationId: "conv-1",
    senderId: "user-2",
    text: "Is this still available?",
    timestamp: "2024-01-15T14:30:00Z",
  },
];
