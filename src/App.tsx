import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import AddReceipt from "./pages/AddReceipt";
import Processing from "./pages/Processing";
import ReceiptDetail from "./pages/ReceiptDetail";
import Receipts from "./pages/Receipts";
import AIChat from "./pages/AIChat";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="raseed-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/add-receipt" element={<ProtectedRoute><AddReceipt /></ProtectedRoute>} />
            <Route path="/processing" element={<ProtectedRoute><Processing /></ProtectedRoute>} />
            <Route path="/receipt/:id" element={<ProtectedRoute><ReceiptDetail /></ProtectedRoute>} />
            <Route path="/receipts" element={<ProtectedRoute><Receipts /></ProtectedRoute>} />
            <Route path="/ai-chat" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
