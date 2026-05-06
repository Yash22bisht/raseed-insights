import { useState } from "react";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Filter, Grid3x3, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { fetchReceipts, type ReceiptItem } from "@/lib/api";

type UiReceipt = {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  icon: string;
};

function mapReceiptToUi(receipt: ReceiptItem): UiReceipt {
  return {
    id: receipt.id,
    merchant: receipt.extractedVendor || receipt.fileName || "Unknown Merchant",
    amount: Number(receipt.extractedAmount || 0),
    date: new Date(receipt.uploadedAt).toLocaleDateString(),
    category: receipt.status || "Uncategorized",
    icon: "🧾",
  };
}

export default function Receipts() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [receipts, setReceipts] = useState<UiReceipt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReceipts = async () => {
      try {
        setIsLoading(true);
        const result = await fetchReceipts(1, 50);
        setReceipts((result.data || []).map(mapReceiptToUi));
      } catch (error) {
        setReceipts([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadReceipts();
  }, []);

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
            <ThemeToggle />
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
            {isLoading && <p className="text-sm text-muted-foreground">Loading receipts...</p>}
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
