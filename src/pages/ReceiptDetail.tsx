import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, CreditCard, Share2, Download, Edit3, TrendingUp, Shield } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const receiptData = {
  merchant: "Starbucks Coffee",
  merchantIcon: "☕",
  date: "June 20, 2024",
  time: "10:30 AM",
  location: "MG Road, Bangalore",
  category: "Food & Dining",
  paymentMethod: "UPI - PhonePe",
  
  items: [
    { name: "Caffe Latte (Grande)", quantity: 1, price: 280, category: "Beverage" },
    { name: "Chocolate Croissant", quantity: 2, price: 180, category: "Food" },
    { name: "Cold Brew Coffee", quantity: 1, price: 320, category: "Beverage" },
  ],
  
  subtotal: 780,
  tax: 70.20,
  discount: 50,
  total: 800.20,
  
  insights: [
    {
      icon: TrendingUp,
      text: "This price is 7% higher than your usual coffee shop spending",
      type: "warning"
    },
    {
      icon: Shield,
      text: "Return policy: Items can be returned within 24 hours",
      type: "info"
    }
  ]
};

export default function ReceiptDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/5 to-secondary-light/5 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 glass-surface border-b border-border/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <span className="font-semibold">Receipt Details</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 space-y-6">
        {/* Merchant Header */}
        <Card className="glass-card p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
              {receiptData.merchantIcon}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{receiptData.merchant}</h1>
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{receiptData.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{receiptData.location}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {receiptData.category}
                </Badge>
                <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                  <CreditCard className="w-3 h-3 mr-1" />
                  {receiptData.paymentMethod}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Total Amount Highlight */}
        <Card className="glass-card p-6 gradient-primary">
          <div className="flex items-center justify-between text-primary-foreground">
            <div>
              <p className="text-sm opacity-90">Total Amount</p>
              <p className="text-4xl font-bold mt-1">₹{receiptData.total.toFixed(2)}</p>
            </div>
            <Button 
              variant="secondary"
              size="icon"
              className="rounded-full"
            >
              <Edit3 className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Line Items */}
        <Card className="glass-card p-6 space-y-4">
          <h3 className="font-semibold text-lg">Items Purchased</h3>
          <div className="space-y-3">
            {receiptData.items.map((item, index) => (
              <div key={index} className="flex items-start justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <Separator />

          {/* Totals Breakdown */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{receiptData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (9%)</span>
              <span>₹{receiptData.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-success">
              <span>Discount</span>
              <span>-₹{receiptData.discount.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{receiptData.total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="glass-card p-6 space-y-4">
          <h3 className="font-semibold text-lg">Smart Insights</h3>
          <div className="space-y-3">
            {receiptData.insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div 
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-xl ${
                    insight.type === 'warning' 
                      ? 'bg-warning/10 border border-warning/20' 
                      : 'bg-primary/10 border border-primary/20'
                  }`}
                >
                  <Icon className={`w-5 h-5 mt-0.5 ${
                    insight.type === 'warning' ? 'text-warning' : 'text-primary'
                  }`} />
                  <p className="text-sm leading-relaxed">{insight.text}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
