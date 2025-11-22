import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Filter, Grid3x3, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const receipts = [
  { id: 1, merchant: "Starbucks", amount: 24.50, date: "Today", category: "Food & Dining", icon: "☕" },
  { id: 2, merchant: "Amazon", amount: 156.99, date: "Yesterday", category: "Shopping", icon: "📦" },
  { id: 3, merchant: "Uber", amount: 18.20, date: "2 days ago", category: "Transport", icon: "🚗" },
  { id: 4, merchant: "Blinkit", amount: 847.30, date: "3 days ago", category: "Grocery", icon: "🛒" },
  { id: 5, merchant: "Swiggy", amount: 385.50, date: "4 days ago", category: "Food & Dining", icon: "🍕" },
  { id: 6, merchant: "Shell Petrol", amount: 2150.00, date: "5 days ago", category: "Transport", icon: "⛽" },
  { id: 7, merchant: "Zara", amount: 4299.00, date: "1 week ago", category: "Shopping", icon: "👗" },
  { id: 8, merchant: "BookMyShow", amount: 720.00, date: "1 week ago", category: "Entertainment", icon: "🎬" },
];

export default function Receipts() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReceipts = receipts.filter(receipt =>
    receipt.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    receipt.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/5 to-secondary-light/5 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 glass-surface border-b border-border/50 px-6 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Receipts</h1>
              <p className="text-sm text-muted-foreground">{receipts.length} total receipts</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-full"
            >
              <List className="w-5 h-5" />
            </Button>
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-full"
            >
              <Grid3x3 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search receipts, merchants..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6">
        {viewMode === "list" ? (
          <div className="space-y-3">
            {filteredReceipts.map((receipt) => (
              <Card 
                key={receipt.id}
                onClick={() => navigate(`/receipt/${receipt.id}`)}
                className="glass-card p-4 cursor-pointer hover:shadow-elevated transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                    {receipt.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{receipt.merchant}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-muted-foreground">{receipt.date}</p>
                      <Badge variant="outline" className="text-xs">
                        {receipt.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">₹{receipt.amount.toFixed(2)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredReceipts.map((receipt) => (
              <Card 
                key={receipt.id}
                onClick={() => navigate(`/receipt/${receipt.id}`)}
                className="glass-card p-4 cursor-pointer hover:shadow-elevated transition-all active:scale-[0.98]"
              >
                <div className="space-y-3">
                  <div className="w-full aspect-square rounded-xl bg-primary/10 flex items-center justify-center text-4xl">
                    {receipt.icon}
                  </div>
                  <div>
                    <p className="font-medium truncate">{receipt.merchant}</p>
                    <p className="text-sm text-muted-foreground">{receipt.date}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs truncate max-w-[80px]">
                      {receipt.category}
                    </Badge>
                    <p className="font-semibold">₹{receipt.amount.toFixed(0)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
