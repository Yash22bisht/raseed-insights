import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  ShoppingBag,
  Store,
  Target,
  RefreshCw,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { getAiInsights } from "@/lib/api";

const Analytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  const [aiInsights, setAiInsights] = useState<any>(null);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const result = await getAiInsights();
        setAiInsights(result);
      } catch (error) {
        setAiInsights(null);
      }
    };

    void loadInsights();
  }, []);

  // Mock data
  const monthlyTrend = [
    { name: "Jan", amount: 12500 },
    { name: "Feb", amount: 15200 },
    { name: "Mar", amount: 13800 },
    { name: "Apr", amount: 16500 },
    { name: "May", amount: 14200 },
    { name: "Jun", amount: 18900 },
  ];

  const categoryData = [
    { name: "Food", value: 5200, color: "hsl(var(--chart-1))" },
    { name: "Grocery", value: 4800, color: "hsl(var(--chart-2))" },
    { name: "Transport", value: 2100, color: "hsl(var(--chart-3))" },
    { name: "Shopping", value: 3500, color: "hsl(var(--chart-4))" },
    { name: "Utilities", value: 1800, color: "hsl(var(--chart-5))" },
    { name: "Others", value: 1500, color: "hsl(var(--secondary))" },
  ];

  const merchantData = [
    { merchant: "Blinkit", visits: 12, spent: 3200, trend: 12 },
    { merchant: "Amazon", visits: 8, spent: 4500, trend: -5 },
    { merchant: "Swiggy", visits: 15, spent: 2800, trend: 18 },
    { merchant: "Zomato", visits: 10, spent: 2200, trend: 8 },
    { merchant: "Uber", visits: 6, spent: 1200, trend: -3 },
  ];

  const budgets = [
    { category: "Food", budget: 6000, spent: 5200, progress: 87 },
    { category: "Grocery", budget: 5000, spent: 4800, progress: 96 },
    { category: "Transport", budget: 3000, spent: 2100, progress: 70 },
    { category: "Shopping", budget: 4000, spent: 3500, progress: 88 },
  ];

  const subscriptions = [
    { name: "Netflix", amount: 649, nextDate: "15 Jan", status: "active" },
    { name: "Spotify", amount: 119, nextDate: "20 Jan", status: "active" },
    { name: "Amazon Prime", amount: 1499, nextDate: "28 Jan", status: "active" },
    { name: "YouTube Premium", amount: 129, nextDate: "5 Feb", status: "unused" },
  ];

  const forecastData = [
    { month: "Jun", actual: 18900, predicted: null },
    { month: "Jul", actual: null, predicted: 19500 },
    { month: "Aug", actual: null, predicted: 20200 },
    { month: "Sep", actual: null, predicted: 19800 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full hover:bg-muted/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Analytics & Insights</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Calendar className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-6xl mx-auto">
        {/* Overview Dashboard */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">₹18,900</CardTitle>
                <CardDescription>Total Spending This Month</CardDescription>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-semibold">8% less</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`₹${value}`, "Spent"]}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Analytics */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <CardTitle>Category Breakdown</CardTitle>
            </div>
            <CardDescription>Where your money goes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`₹${value}`, "Spent"]}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-3">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm font-semibold">₹{category.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Merchant Analytics */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-primary" />
              <CardTitle>Top Merchants</CardTitle>
            </div>
            <CardDescription>Your most visited places</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {merchantData.map((merchant, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Store className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{merchant.merchant}</p>
                      <p className="text-xs text-muted-foreground">
                        {merchant.visits} visits this month
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{merchant.spent}</p>
                    <div
                      className={`flex items-center gap-1 text-xs ${
                        merchant.trend > 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {merchant.trend > 0 ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      <span>{Math.abs(merchant.trend)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget Management */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle>Budget Tracking</CardTitle>
            </div>
            <CardDescription>Monitor your spending limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {budgets.map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{budget.category}</span>
                  <span className="text-muted-foreground">
                    ₹{budget.spent} / ₹{budget.budget}
                  </span>
                </div>
                <Progress
                  value={budget.progress}
                  className={`h-2 ${
                    budget.progress > 90
                      ? "[&>div]:bg-red-500"
                      : budget.progress > 70
                      ? "[&>div]:bg-yellow-500"
                      : "[&>div]:bg-green-500"
                  }`}
                />
                {budget.progress > 90 && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Almost at limit! Consider reducing spending.
                  </p>
                )}
              </div>
            ))}
            <Button className="w-full bg-gradient-to-r from-primary to-secondary">
              <Target className="w-4 h-4 mr-2" />
              Set New Budget
            </Button>
          </CardContent>
        </Card>

        {/* Subscription Tracking */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-primary" />
              <CardTitle>Subscriptions</CardTitle>
            </div>
            <CardDescription>Recurring expenses & renewals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subscriptions.map((sub, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    sub.status === "unused"
                      ? "bg-yellow-500/5 border-yellow-500/20"
                      : "bg-muted/30 border-border/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <RefreshCw className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{sub.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Renews {sub.nextDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{sub.amount}/mo</p>
                    {sub.status === "unused" && (
                      <span className="text-xs text-yellow-600 dark:text-yellow-400">
                        Rarely used
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="glass-card border-border/50 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              <CardTitle>AI Insights</CardTitle>
            </div>
            <CardDescription>Smart recommendations for you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiInsights?.summary && (
              <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                <p className="text-sm">
                  <span className="font-semibold text-primary">🧠 AI Summary:</span> {aiInsights.summary}
                </p>
              </div>
            )}
            <div className="p-4 rounded-xl bg-background/50 border border-border/50">
              <p className="text-sm">
                <span className="font-semibold text-primary">💡 Savings Opportunity:</span> Your
                Swiggy spending increased 18% this month. Consider cooking at home to save ₹800.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-background/50 border border-border/50">
              <p className="text-sm">
                <span className="font-semibold text-primary">📊 Trend Alert:</span> You're
                spending ₹1,200 more on groceries. Prices increased or buying more items?
              </p>
            </div>
            <div className="p-4 rounded-xl bg-background/50 border border-border/50">
              <p className="text-sm">
                <span className="font-semibold text-primary">🎯 Budget Tip:</span> You have ₹800
                left for Shopping this month. Stay on track!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Forecasting */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <CardTitle>Spending Forecast</CardTitle>
            </div>
            <CardDescription>AI-predicted spending for next 3 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={[...monthlyTrend.slice(-1), ...forecastData]}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ fill: "hsl(var(--secondary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 rounded-xl bg-muted/30">
              <p className="text-sm font-medium">
                📈 Predicted spending for next month:{" "}
                <span className="text-primary font-bold">₹19,500</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Based on your spending patterns and upcoming subscriptions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
