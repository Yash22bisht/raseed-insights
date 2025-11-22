import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Camera, Brain, TrendingUp, Wallet } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const features = [
  {
    icon: Camera,
    title: "Auto-Scan Receipts",
    description: "Instantly capture and digitize receipts with AI-powered OCR technology"
  },
  {
    icon: Brain,
    title: "AI-Powered Parsing",
    description: "Automatically extract items, prices, taxes, and categories from your receipts"
  },
  {
    icon: TrendingUp,
    title: "Smart Budgeting",
    description: "Get intelligent insights and spending predictions to manage your finances"
  },
  {
    icon: Wallet,
    title: "Auto-Sync",
    description: "Seamlessly integrate with Google Wallet and Gmail for automatic receipt import"
  }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < features.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary-light/10 to-secondary-light/10">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold gradient-text">Raseed</div>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
          <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
            Skip
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md space-y-8 animate-in">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-3xl gradient-primary flex items-center justify-center shadow-elevated">
              {(() => {
                const Icon = features[currentSlide].icon;
                return <Icon className="w-16 h-16 text-primary-foreground" strokeWidth={1.5} />;
              })()}
            </div>
          </div>

          {/* Title and Description */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">
              {features[currentSlide].title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {features[currentSlide].description}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-10 space-y-6">
        {/* Dots Indicator */}
        <div className="flex justify-center gap-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <Button 
          onClick={handleNext}
          size="lg"
          className="w-full gradient-primary text-primary-foreground shadow-card hover:shadow-elevated transition-all"
        >
          {currentSlide === features.length - 1 ? "Get Started" : "Next"}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
