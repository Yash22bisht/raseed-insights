import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Receipt,
  ShoppingBag,
  Coffee,
  Home,
  Car,
  Zap,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Wallet,
  PieChart,
  BarChart3,
  User,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";
import { ThemeToggle } from "@/components/theme-toggle";
import { useDashboard } from "@/hooks/useDashboard";
import { useAuthStore } from "@/store/authStore";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

const fallbackSpendingData = [
  { month: "Jan", amount: 4200 },
  { month: "Feb", amount: 3800 },
  { month: "Mar", amount: 4500 },
  { month: "Apr", amount: 4100 },
  { month: "May", amount: 5200 },
  { month: "Jun", amount: 4800 },
];

const fallbackCategories = [
  {
    name: "Food & Dining",
    amount: 1240,
    percentage: 28,
    icon: Coffee,
    color: "hsl(var(--primary))",
  },
  {
    name: "Grocery",
    amount: 980,
    percentage: 22,
    icon: ShoppingBag,
    color: "hsl(var(--secondary))",
  },
  {
    name: "Transport",
    amount: 650,
    percentage: 15,
    icon: Car,
    color: "hsl(var(--warning))",
  },
  {
    name: "Utilities",
    amount: 520,
    percentage: 12,
    icon: Zap,
    color: "hsl(var(--success))",
  },
  {
    name: "Shopping",
    amount: 880,
    percentage: 20,
    icon: ShoppingBag,
    color: "hsl(250, 60%, 70%)",
  },
  {
    name: "Others",
    amount: 130,
    percentage: 3,
    icon: Home,
    color: "hsl(var(--muted-foreground))",
  },
];

const fallbackRecentReceipts = [
  {
    id: 1,
    merchant: "Starbucks",
    amount: 24.5,
    date: "Today",
    category: "Food & Dining",
    icon: "☕",
  },
  {
    id: 2,
    merchant: "Amazon",
    amount: 156.99,
    date: "Yesterday",
    category: "Shopping",
    icon: "📦",
  },
  {
    id: 3,
    merchant: "Uber",
    amount: 18.2,
    date: "2 days ago",
    category: "Transport",
    icon: "🚗",
  },
];

const fallbackInsights = [
  {
    text: "Your grocery spending increased 12% from last month",
    type: "warning",
    icon: TrendingUp,
  },
  {
    text: "You're on track to save ₹500 this month!",
    type: "success",
    icon: TrendingDown,
  },
];

const CATEGORY_ICONS: Record<string, any> = {
  "food & dining": Coffee,
  food: Coffee,
  grocery: ShoppingBag,
  groceries: ShoppingBag,
  transport: Car,
  transportation: Car,
  utilities: Zap,
  shopping: ShoppingBag,
  home: Home,
};
const PALETTE = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--warning))",
  "hsl(var(--success))",
  "hsl(250, 60%, 70%)",
  "hsl(var(--muted-foreground))",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { summary, insights: aiInsights, recent, loading } = useDashboard();
  const user = useAuthStore((s) => s.user);

  const categories = useMemo(() => {
    if (summary?.categories?.length) {
      const total = summary.categories.reduce((s, c) => s + c.amount, 0) || 1;
      return summary.categories.map((c, i) => ({
        name: c.name,
        amount: c.amount,
        percentage: c.percentage ?? Math.round((c.amount / total) * 100),
        icon: CATEGORY_ICONS[c.name?.toLowerCase()] ?? ShoppingBag,
        color: PALETTE[i % PALETTE.length],
      }));
    }
    return fallbackCategories;
  }, [summary]);

  const spendingData = summary?.trend?.length
    ? summary.trend.map((t) => ({ month: t.label, amount: t.amount }))
    : fallbackSpendingData;

  const recentReceipts = recent.length
    ? recent.slice(0, 3).map((r) => ({
        id: r.id,
        merchant: r.storeName || r.vendor || r.merchant || "Receipt",
        amount: Number(r.total ?? r.amount ?? 0),
        date: r.date ? new Date(r.date).toLocaleDateString() : "",
        category: r.category || "Uncategorized",
        icon: "🧾",
      }))
    : fallbackRecentReceipts;

  const insights = aiInsights.length
    ? aiInsights.slice(0, 3).map((i) => ({
        text: i.description || i.title,
        type: i.type === "warning" ? "warning" : "success",
        icon: i.type === "warning" ? TrendingUp : TrendingDown,
      }))
    : fallbackInsights;

  const totalSpent = summary?.totalSpent ?? 4800;
  const remaining = summary?.remaining ?? 5200;
  const changePct = summary?.changePct ?? 8;

  const pieData = categories.map((cat, index) => ({
    name: cat.name,
    value: cat.amount,
    color: cat.color,
  }));

  const COLORS = categories.map((c) => c.color);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-cyan-50/30 dark:from-slate-950 dark:via-violet-950/20 dark:to-cyan-950/20">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Header with enhanced design */}
      <div className="relative px-6 pt-10 pb-8 space-y-1">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-600 to-secondary">
                Hello, {user?.name?.split(" ")[0] || "there"}
              </h1>
              <span className="text-3xl animate-wave inline-block">👋</span>
            </div>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Your financial overview
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative px-6 pb-32 space-y-6">
        {/* Stats Overview Cards - Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Total Spent Card */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary to-violet-600 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="relative p-5 space-y-2">
              <div className="flex items-center gap-2 text-white/80 text-xs font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                THIS MONTH
              </div>
              <div className="space-y-1">
                {loading ? (
                  <Skeleton className="h-9 w-24 bg-white/20" />
                ) : (
                  <div className="text-3xl font-bold">₹{(totalSpent/1000).toFixed(1)}K</div>
                )}
                <div className="flex items-center gap-1 text-sm text-white/90">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{changePct >= 0 ? "+" : ""}{changePct}% vs last</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Budget Remaining Card */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-secondary to-cyan-600 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="relative p-5 space-y-2">
              <div className="flex items-center gap-2 text-white/80 text-xs font-medium">
                <Wallet className="w-3.5 h-3.5" />
                REMAINING
              </div>
              <div className="space-y-1">
                {loading ? (
                  <Skeleton className="h-9 w-24 bg-white/20" />
                ) : (
                  <div className="text-3xl font-bold">₹{(remaining/1000).toFixed(1)}K</div>
                )}
                <div className="flex items-center gap-1 text-sm text-white/90">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>Budget left</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Spending Trend Chart - Enhanced */}
        <Card className="glass-card shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Spending Trend</h3>
                <p className="text-sm text-muted-foreground">Last 6 months</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80"
              >
                <PieChart className="w-4 h-4 mr-2" />
                Details
              </Button>
            </div>

            {/* Sparkline Chart */}
            <div className="h-32 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spendingData}>
                  <defs>
                    <linearGradient
                      id="colorAmount"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Category Breakdown - Enhanced with Visual Pie Chart */}
        <Card className="glass-card shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Category Breakdown</h3>
                <p className="text-sm text-muted-foreground">
                  Where your money goes
                </p>
              </div>
            </div>

            {/* Mini Donut Chart */}
            <div className="flex items-center justify-center -my-2">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2.5">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.name}
                    className="group flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: category.color }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {category.name}
                          </span>
                          <div className="text-right">
                            <span className="font-bold text-sm">
                              ₹{category.amount}
                            </span>
                            <span className="text-muted-foreground text-xs ml-2">
                              {category.percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-2">
                          <div
                            className="h-full rounded-full transition-all duration-500 ease-out"
                            style={{
                              width: `${category.percentage}%`,
                              backgroundColor: category.color,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Recent Receipts - Enhanced */}
        <Card className="glass-card shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Latest Receipts</h3>
                <p className="text-sm text-muted-foreground">
                  Recent transactions
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/receipts")}
                className="text-primary hover:text-primary/80 group"
              >
                View All
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="space-y-2">
              {recentReceipts.map((receipt, index) => (
                <div
                  key={receipt.id}
                  onClick={() => navigate(`/receipt/${receipt.id}`)}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/40 to-muted/20 hover:from-muted/60 hover:to-muted/40 transition-all cursor-pointer border border-transparent hover:border-primary/20 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                      {receipt.icon}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate text-base">
                      {receipt.merchant}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {receipt.date} • {receipt.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      ₹{receipt.amount.toFixed(2)}
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* AI Insights - Enhanced */}
        <Card className="glass-card shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Smart Insights</h3>
                <p className="text-xs text-muted-foreground">
                  AI-powered recommendations
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden flex items-start gap-4 p-5 rounded-2xl transition-all cursor-pointer hover:scale-[1.02] ${
                      insight.type === "warning"
                        ? "bg-gradient-to-r from-warning/15 to-warning/5 border border-warning/30 hover:border-warning/50 hover:shadow-lg hover:shadow-warning/20"
                        : "bg-gradient-to-r from-success/15 to-success/5 border border-success/30 hover:border-success/50 hover:shadow-lg hover:shadow-success/20"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                        insight.type === "warning"
                          ? "bg-warning/20"
                          : "bg-success/20"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          insight.type === "warning"
                            ? "text-warning"
                            : "text-success"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed font-medium">
                        {insight.text}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Floating AI Chat Button */}
      <div className="fixed bottom-24 right-6 z-50">
        <Button
          size="lg"
          onClick={() => navigate("/ai-chat")}
          className="relative h-16 w-16 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 shadow-2xl hover:shadow-violet-500/50 transition-all hover:scale-110 border-0 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
          <MessageSquare className="w-8 h-8 relative z-10 group-hover:scale-110 transition-transform duration-300" />
        </Button>
      </div>

      {/* Bottom Navigation - Enhanced with 5 items */}
      <div className="fixed bottom-0 left-0 right-0 glass-surface border-t border-border/50 px-4 py-4 backdrop-blur-xl bg-background/80 shadow-2xl z-40">
        <div className="flex justify-between items-end max-w-lg mx-auto relative">
          {/* Home */}
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2 px-4 rounded-2xl text-primary bg-primary/10 hover:bg-primary/20 transition-all"
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-semibold">Home</span>
          </Button>

          {/* Receipts */}
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2 px-4 rounded-2xl hover:bg-muted/50 transition-all"
            onClick={() => navigate("/receipts")}
          >
            <Receipt className="w-5 h-5 mb-1" />
            <span className="text-xs">Receipts</span>
          </Button>

          {/* Add Button - Center with elevation */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-10">
            <Button
              size="lg"
              onClick={() => navigate("/add-receipt")}
              className="relative h-20 w-20 rounded-full bg-gradient-to-r from-primary via-violet-600 to-secondary shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(124,58,237,0.5)] transition-all hover:scale-110 border-[6px] border-background group overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
              <Plus className="w-24 h-24 relative z-10 group-hover:rotate-90 transition-transform duration-300 stroke-[3]" />
            </Button>
          </div>

          {/* Analytics */}
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2 px-4 rounded-2xl hover:bg-muted/50 transition-all"
            onClick={() => navigate("/analytics")}
          >
            <BarChart3 className="w-5 h-5 mb-1" />
            <span className="text-xs">Analytics</span>
          </Button>

            {/*Profile*/}
            <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2 px-4 rounded-2xl hover:bg-muted/50 transition-all"
            onClick={() => navigate("/profile")}
          >
            <MessageSquare className="w-5 h-5 mb-1" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
