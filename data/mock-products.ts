export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: "textbooks" | "electronics" | "clothes" | "services";
  condition: "new" | "like-new" | "good" | "fair";
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  isSold: boolean;
  createdAt: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Calculus: Early Transcendentals",
    description: "8th Edition by James Stewart. Excellent condition, barely used. All pages intact, no highlighting or writing.",
    price: 120,
    category: "textbooks",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop"
    ],
    sellerId: "user-2",
    sellerName: "John Doe",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isSold: false,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "MacBook Air M1 2020",
    description: "13-inch MacBook Air with M1 chip, 8GB RAM, 256GB SSD. Great for students, excellent battery life. Minor scratches on the lid.",
    price: 850,
    category: "electronics",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop"
    ],
    sellerId: "user-2",
    sellerName: "John Doe",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isSold: false,
    createdAt: "2024-01-14T15:30:00Z",
  },
  {
    id: "3",
    title: "University Hoodie - Large",
    description: "Official university hoodie in navy blue, size Large. Worn a few times, very comfortable and warm.",
    price: 35,
    category: "clothes",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
    ],
    sellerId: "user-2",
    sellerName: "John Doe",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isSold: false,
    createdAt: "2024-01-13T09:15:00Z",
  },
  {
    id: "4",
    title: "Physics Textbook Bundle",
    description: "University Physics with Modern Physics 15th Edition + Solutions Manual. Perfect for physics majors.",
    price: 180,
    category: "textbooks",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop"
    ],
    sellerId: "user-1",
    sellerName: "Jane Smith",
    sellerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isSold: false,
    createdAt: "2024-01-12T14:20:00Z",
  },
  {
    id: "5",
    title: "iPad Pro 11-inch",
    description: "2021 iPad Pro with Apple Pencil included. Perfect for note-taking and digital art. Screen protector applied.",
    price: 650,
    category: "electronics",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop"
    ],
    sellerId: "user-1",
    sellerName: "Jane Smith",
    sellerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isSold: false,
    createdAt: "2024-01-11T11:45:00Z",
  },
  {
    id: "6",
    title: "Math Tutoring Services",
    description: "Experienced math tutor offering help with Calculus, Statistics, and Algebra. $25/hour, flexible schedule.",
    price: 25,
    category: "services",
    condition: "new",
    images: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=400&fit=crop"
    ],
    sellerId: "user-1",
    sellerName: "Jane Smith",
    sellerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isSold: false,
    createdAt: "2024-01-10T16:00:00Z",
  },
];
