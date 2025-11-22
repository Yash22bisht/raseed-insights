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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-receipt" element={<AddReceipt />} />
            <Route path="/processing" element={<Processing />} />
            <Route path="/receipt/:id" element={<ReceiptDetail />} />
            <Route path="/receipts" element={<Receipts />} />
            <Route path="/ai-chat" element={<AIChat />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
