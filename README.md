# CampusCart 🎓🛒

A fully functional, responsive, and secure e-commerce marketplace exclusively for university students, facilitating the buying, selling, and trading of items like textbooks, electronics, and more.

## 🚀 Features

### Core Functionality
- **Student-Only Marketplace**: Restricted to .edu email addresses
- **Real-time Messaging**: Chat with buyers/sellers about specific items
- **Role-Based Access**: Regular users, Advanced sellers, and Admin moderation
- **Dark Mode Support**: Persistent theme switching
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Image Upload**: Product photos with optimization
- **Search & Filter**: Find items by category, price, condition

### User Roles
- **Regular Users**: Browse and purchase items
- **Advanced Users**: Create and manage listings
- **Admin Users**: Moderate content and manage users

## 🛠 Tech Stack

### Frontend
- **React Native** with Expo SDK 53
- **Expo Router** for file-based navigation
- **TypeScript** for type safety
- **Lucide React Native** for icons
- **React Query** for server state management
- **Zustand** for global state

### Backend
- **Hono** web framework
- **tRPC** for type-safe APIs
- **Zod** for validation
- **AsyncStorage** for local persistence

### Development Tools
- **ESLint** for code quality
- **Bun** as package manager and runtime
- **Expo Go** for development testing

## 📱 App Structure

### Main Screens
- **Home** (`/`): Product grid with featured categories
- **Dashboard** (`/dashboard`): User management and listings
- **Messages** (`/messages`): Real-time chat system
- **Settings** (`/settings`): Profile and preferences
- **Admin Panel** (`/admin`): Content moderation (admin only)

### Authentication
- **Login/Signup** (`/auth`): .edu email validation
- **Role switching**: Toggle between buyer/seller modes
- **Session management**: Persistent authentication

## 🏗 Project Structure

```
app/
├── (tabs)/                 # Tab-based navigation
│   ├── index.tsx          # Home screen
│   ├── dashboard.tsx      # User dashboard
│   ├── messages.tsx       # Chat system
│   ├── settings.tsx       # User settings
│   └── admin.tsx          # Admin panel
├── auth.tsx               # Authentication
├── product/[id].tsx       # Product details
└── _layout.tsx            # Root layout

backend/
├── hono.ts                # Server entry point
└── trpc/                  # API routes
    ├── app-router.ts      # Main router
    └── routes/            # Individual procedures

components/
├── product-card.tsx       # Product display component
└── ...

providers/
├── auth-provider.tsx      # Authentication context
└── theme-provider.tsx     # Theme management

data/
└── mock-products.ts       # Sample data
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Expo CLI
- iOS Simulator or Android Emulator (optional)
- Expo Go app on your mobile device

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campuscart
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start the development server**
   ```bash
   bun start
   ```

4. **Open the app**
   - Scan the QR code with Expo Go app
   - Or press `w` to open in web browser
   - Or press `i`/`a` for iOS/Android simulator

### Development Scripts

```bash
# Start with tunnel (recommended)
bun start

# Start web version
bun run start-web

# Start web with debug logs
bun run start-web-dev

# Run linting
bun run lint
```

## 👥 Demo Accounts

The app comes with pre-configured demo accounts for testing:

### Admin User
- **Email**: admin@university.edu
- **Password**: DemoAdminPass123!
- **Role**: Admin (full access to moderation panel)

### Regular User (Buyer)
- **Email**: jane.smith@university.edu
- **Password**: DemoUserPass123!
- **Role**: Regular (browse and purchase)

### Advanced User (Seller)
- **Email**: john.doe@university.edu
- **Password**: DemoSellerPass123!
- **Role**: Advanced (create listings)

## 🔧 Configuration

### Environment Setup
The app uses Expo's built-in configuration. Key settings in `app.json`:

```json
{
  "expo": {
    "name": "CampusCart",
    "slug": "campuscart",
    "scheme": "myapp",
    "bundleIdentifier": "app.rork.campuscart"
  }
}
```

### Backend Configuration
The backend runs on Hono with tRPC integration:
- API endpoint: `/api/trpc`
- Real-time features ready for Socket.IO integration
- Type-safe client-server communication

## 📋 Features Checklist

- ✅ **Authentication System**
  - .edu email validation
  - Role-based access control
  - Session persistence

- ✅ **Product Management**
  - Create, read, update, delete listings
  - Image upload support
  - Category filtering
  - Search functionality

- ✅ **User Interface**
  - Responsive design (mobile, tablet, desktop)
  - Dark mode toggle with persistence
  - Intuitive navigation
  - Modern, clean design

- ✅ **Real-time Features**
  - Chat system architecture
  - Message notifications
  - Live updates

- ✅ **Admin Features**
  - Content moderation panel
  - User management
  - Listing oversight

## 🔒 Security Features

- **Email Validation**: Only .edu domains allowed
- **Role-Based Access**: Protected routes and features
- **Input Validation**: Zod schemas for all data
- **Type Safety**: Full TypeScript coverage
- **Secure Storage**: AsyncStorage for sensitive data

## 🎨 Design System

### Color Scheme
- Primary: University-inspired blues and greens
- Secondary: Warm accent colors
- Dark mode: Automatic system preference detection

### Typography
- System fonts for optimal performance
- Consistent sizing scale
- Accessible contrast ratios

### Components
- Reusable UI components
- Consistent spacing and layout
- Touch-friendly interactive elements

## 📱 Platform Support

- **iOS**: Native performance with Expo Go
- **Android**: Full feature compatibility
- **Web**: React Native Web for browser access
- **Cross-platform**: Shared codebase, platform-specific optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions:
- Check the documentation
- Review existing issues
- Contact the development team

---

**CampusCart** - Connecting students through secure, convenient marketplace transactions. 🎓✨
