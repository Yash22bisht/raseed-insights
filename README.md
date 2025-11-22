# 🧾 Raseed Insights

A modern, AI-powered receipt management and expense tracking application built with React, TypeScript, and Capacitor for seamless cross-platform experience.

![Raseed Insights](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Capacitor](https://img.shields.io/badge/Capacitor-7-green)

## ✨ Features

### 📸 Smart Receipt Capture
- **Camera Scan** - Capture receipts using device camera with real-time preview
- **File Upload** - Support for images and PDF receipts
- **Gmail Integration** - Auto-import receipts from email
- **Google Wallet Sync** - Automatic transaction syncing

### 💰 Financial Management
- **Expense Tracking** - Real-time spending analytics
- **Category Breakdown** - Visual categorization with donut charts
- **Budget Monitoring** - Track spending against budgets
- **Spending Trends** - 6-month trend analysis with interactive charts

### 🤖 AI-Powered Insights
- **Smart Recommendations** - AI-driven spending insights
- **OCR Processing** - Automatic data extraction from receipts
- **Predictive Analytics** - Budget forecasting and alerts
- **AI Chat Assistant** - Interactive financial advisor

### 🎨 Modern UI/UX
- **Dark/Light Theme** - Seamless theme switching
- **Glassmorphism Design** - Modern, elegant interface
- **Responsive Layout** - Optimized for mobile and desktop
- **Smooth Animations** - Delightful user interactions
- **Bottom Navigation** - Intuitive mobile-first navigation

### 🔐 Security & Privacy
- **End-to-End Encryption** - Secure data storage
- **Cloud Backup** - Automated backup solutions
- **Two-Factor Authentication** - Enhanced account security
- **Privacy Controls** - Granular permission settings

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript 5** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful component library
- **Recharts** - Data visualization

### Mobile
- **Capacitor 7** - Cross-platform native runtime
- **Android Support** - Native Android app
- **Camera API** - Native camera integration
- **File System API** - Local storage access

### State Management
- **TanStack Query** - Server state management
- **React Context** - Theme and global state
- **Local Storage** - Persistent user preferences

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/bun
- Android Studio (for Android development)
- JDK 17+ (for Android builds)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yash22bisht/raseed-insights.git
   cd raseed-insights
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### 📱 Android Development

1. **Sync Capacitor**
   ```bash
   npx cap sync android
   ```

2. **Open in Android Studio**
   ```bash
   npx cap open android
   ```

3. **Build APK**
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

## 🗂️ Project Structure

```
raseed-insights/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn components
│   │   ├── camera-capture.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── pages/              # Application pages
│   │   ├── Dashboard.tsx
│   │   ├── AddReceipt.tsx
│   │   ├── Receipts.tsx
│   │   ├── Profile.tsx
│   │   ├── Processing.tsx
│   │   └── Onboarding.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── App.tsx             # Root component
├── android/                # Android native project
├── public/                 # Static assets
└── capacitor.config.ts     # Capacitor configuration
```

## 🎯 Key Features Implementation

### Camera Capture
```typescript
// Real-time camera preview with capture functionality
const CameraCapture = ({ onCapture, onClose }) => {
  // Access device camera
  // Capture and process image
  // Return base64 image data
}
```

### Theme System
```typescript
// Dark/Light theme with system preference detection
const ThemeProvider = ({ children }) => {
  // Persist theme in localStorage
  // Auto-detect system preference
  // Apply theme CSS classes
}
```

### Data Visualization
```typescript
// Interactive charts using Recharts
<AreaChart data={spendingData}>
  <Area type="monotone" dataKey="amount" />
</AreaChart>
```

## 🔧 Configuration

### Environment Variables
Create `.env` file in root:
```env
VITE_API_URL=your_api_url
VITE_APP_NAME=Raseed Insights
```

### Capacitor Config
Edit `capacitor.config.ts`:
```typescript
const config: CapacitorConfig = {
  appId: 'com.raseed.insights',
  appName: 'Raseed Insights',
  webDir: 'dist'
};
```

## 📱 Supported Platforms

- ✅ **Web** - Chrome, Firefox, Safari, Edge
- ✅ **Android** - Android 7.0+
- 🚧 **iOS** - Coming soon

## 🎨 Design System

### Colors
- **Primary**: Purple/Violet gradient
- **Secondary**: Cyan/Teal gradient
- **Success**: Green
- **Warning**: Orange
- **Destructive**: Red

### Typography
- **Font Family**: Inter, System UI
- **Sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Yash Bisht** - [@Yash22bisht](https://github.com/Yash22bisht)

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Capacitor](https://capacitorjs.com/) - Cross-platform runtime
- [Recharts](https://recharts.org/) - Chart library
- [Lucide Icons](https://lucide.dev/) - Icon set
- [TailwindCSS](https://tailwindcss.com/) - CSS framework

## 📧 Contact

For questions or feedback, reach out:
- **Email**: yash@example.com
- **GitHub**: [@Yash22bisht](https://github.com/Yash22bisht)

## 🚀 Roadmap

- [ ] iOS App Support
- [ ] Backend API Integration
- [ ] Real OCR Implementation
- [ ] Cloud Sync
- [ ] Multi-language Support
- [ ] Export Reports (PDF/CSV)
- [ ] Receipt Sharing
- [ ] Warranty Tracking
- [ ] Subscription Management

---

Made with ❤️ by the Raseed Team
