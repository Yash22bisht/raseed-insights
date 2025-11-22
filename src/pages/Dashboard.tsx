import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, TrendingDown, Receipt, ShoppingBag, Coffee, Home, Car, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

const spendingData = [
  { month: "Jan", amount: 4200 },
  { month: "Feb", amount: 3800 },
  { month: "Mar", amount: 4500 },
  { month: "Apr", amount: 4100 },
  { month: "May", amount: 5200 },
  { month: "Jun", amount: 4800 },
];

const categories = [
  { name: "Food & Dining", amount: 1240, percentage: 28, icon: Coffee, color: "hsl(var(--primary))" },
  { name: "Grocery", amount: 980, percentage: 22, icon: ShoppingBag, color: "hsl(var(--secondary))" },
  { name: "Transport", amount: 650, percentage: 15, icon: Car, color: "hsl(var(--warning))" },
  { name: "Utilities", amount: 520, percentage: 12, icon: Zap, color: "hsl(var(--success))" },
  { name: "Shopping", amount: 880, percentage: 20, icon: ShoppingBag, color: "hsl(250, 60%, 70%)" },
  { name: "Others", amount: 130, percentage: 3, icon: Home, color: "hsl(var(--muted-foreground))" },
];

const recentReceipts = [
  { id: 1, merchant: "Starbucks", amount: 24.50, date: "Today", category: "Food & Dining", icon: "☕" },
  { id: 2, merchant: "Amazon", amount: 156.99, date: "Yesterday", category: "Shopping", icon: "📦" },
  { id: 3, merchant: "Uber", amount: 18.20, date: "2 days ago", category: "Transport", icon: "🚗" },
];

const insights = [
  {
    text: "Your grocery spending increased 12% from last month",
    type: "warning",
    icon: TrendingUp
  },
  {
    text: "You're on track to save ₹500 this month!",
    type: "success",
    icon: TrendingDown
  }
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/5 to-secondary-light/5">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 space-y-2">
        <h1 className="text-3xl font-bold">Hello, Yash 👋</h1>
        <p className="text-muted-foreground">Here's your spending summary</p>
      </div>

      {/* Scrollable Content */}
      <div className="px-6 pb-24 space-y-6">
        {/* Monthly Overview Card */}
        <Card className="glass-card p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Total Spent This Month</p>
              <h2 className="text-4xl font-bold mt-1">₹4,800</h2>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm text-success">8% from last month</span>
              </div>
            </div>
          </div>
          
          {/* Sparkline Chart */}
          <div className="h-24 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ 
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorAmount)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold">Category Breakdown</h3>
          <div className="space-y-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: category.color }} />
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">₹{category.amount}</span>
                      <span className="text-muted-foreground ml-2">{category.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: category.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Receipts */}
        <Card className="glass-card p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Latest Receipts</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate("/receipts")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentReceipts.map((receipt) => (
              <div 
                key={receipt.id}
                onClick={() => navigate(`/receipt/${receipt.id}`)}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                  {receipt.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{receipt.merchant}</p>
                  <p className="text-sm text-muted-foreground">{receipt.date} • {receipt.category}</p>
                </div>
                <div className="text-lg font-semibold">
                  ₹{receipt.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold">Smart Insights</h3>
          <div className="space-y-3">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div 
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-xl ${
                    insight.type === 'warning' 
                      ? 'bg-warning/10 border border-warning/20' 
                      : 'bg-success/10 border border-success/20'
                  }`}
                >
                  <Icon className={`w-5 h-5 mt-0.5 ${
                    insight.type === 'warning' ? 'text-warning' : 'text-success'
                  }`} />
                  <p className="text-sm leading-relaxed">{insight.text}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button 
          size="lg"
          onClick={() => navigate("/add-receipt")}
          className="h-16 w-16 rounded-full gradient-primary shadow-elevated hover:shadow-card transition-all"
        >
          <Plus className="w-8 h-8" />
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 glass-surface border-t border-border/50 px-6 py-4">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2 text-primary">
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2" onClick={() => navigate("/receipts")}>
            <Receipt className="w-5 h-5 mb-1" />
            <span className="text-xs">Receipts</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2" onClick={() => navigate("/add-receipt")}>
            <Plus className="w-5 h-5 mb-1" />
            <span className="text-xs">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
