import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";

const processingSteps = [
  "Extracting text from receipt...",
  "Understanding line items...",
  "Detecting taxes, totals, and categories...",
  "Complete!"
];

export default function Processing() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const receiptId = (location.state as { receiptId?: string } | null)?.receiptId;

    // Simulate processing with a timeout
    const timer = setTimeout(() => {
      navigate(`/receipt/${receiptId || "1"}`);
    }, 4000);

    return () => clearTimeout(timer);
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary-light/10 to-secondary-light/10">
      <div className="text-center space-y-8 px-6 animate-in">
        {/* AI Animation Circle */}
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-ping" />
          <div className="absolute inset-0 rounded-full gradient-primary opacity-40 animate-pulse" />
          <div className="relative w-32 h-32 rounded-full gradient-primary flex items-center justify-center shadow-elevated">
            <Loader2 className="w-16 h-16 text-primary-foreground animate-spin" />
          </div>
        </div>

        {/* Processing Steps */}
        <div className="space-y-3 max-w-sm mx-auto">
          {processingSteps.map((step, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm animate-slide-up"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {index < 3 ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-success" />
              )}
              <p className="text-sm text-muted-foreground">{step}</p>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground">
          AI is analyzing your receipt...
        </p>
      </div>
    </div>
  );
}
