import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Mail, Wallet, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { CameraCapture } from "@/components/camera-capture";
import { uploadReceipt } from "@/services/receipts";
import { toast } from "sonner";

const inputMethods = [
  {
    icon: Camera,
    title: "Scan Receipt",
    description: "Use your camera to capture",
    action: "scan",
    gradient: "from-primary to-primary/80"
  },
  {
    icon: Upload,
    title: "Upload Photo/PDF",
    description: "Choose from your device",
    action: "upload",
    gradient: "from-secondary to-secondary/80"
  },
  {
    icon: Mail,
    title: "Import from Gmail",
    description: "Sync receipt emails",
    action: "gmail",
    gradient: "from-destructive to-destructive/80"
  },
  {
    icon: Wallet,
    title: "Google Wallet",
    description: "Auto-import transactions",
    action: "wallet",
    gradient: "from-warning to-warning/80"
  }
];

export default function AddReceipt() {
  const navigate = useNavigate();
  const [showCamera, setShowCamera] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMethodClick = (action: string) => {
    switch (action) {
      case "scan":
        setShowCamera(true);
        break;
      case "upload":
        fileInputRef.current?.click();
        break;
      case "gmail":
        // TODO: Implement Gmail integration
        alert("Gmail integration coming soon!");
        break;
      case "wallet":
        // TODO: Implement Google Wallet integration
        alert("Google Wallet integration coming soon!");
        break;
      default:
        break;
    }
  };

  const handleCameraCapture = async (imageData: string) => {
    try {
      setIsUploading(true);
      const res = await fetch(imageData);
      const blob = await res.blob();
      const file = new File([blob], `camera-capture-${Date.now()}.jpg`, {
        type: "image/jpeg",
      });

      const uploaded = await uploadReceipt(file);
      navigate("/processing", { state: { receiptId: uploaded.id } });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to upload receipt");
    } finally {
      setIsUploading(false);
      setShowCamera(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setIsUploading(true);
      const uploaded = await uploadReceipt(file);
      navigate("/processing", { state: { receiptId: uploaded.id } });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to upload receipt");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/5 to-secondary-light/5">
        {/* Header */}
        <div className="px-6 pt-8 pb-6 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/dashboard")}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add Receipt</h1>
          <p className="text-sm text-muted-foreground">Choose your input method</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-24 space-y-4">
        {inputMethods.map((method) => {
          const Icon = method.icon;
          return (
            <Card 
              key={method.action}
              aria-disabled={isUploading}
              onClick={() => handleMethodClick(method.action)}
              className={`glass-card p-6 cursor-pointer hover:shadow-elevated transition-all active:scale-[0.98] ${isUploading ? "opacity-60 pointer-events-none" : ""}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.gradient} flex items-center justify-center shadow-card`}>
                  <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{method.title}</h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="px-6 pb-6">
        <Card className="glass-card p-4 bg-primary/5 border-primary/20">
          <p className="text-sm text-center text-muted-foreground">
            {isUploading
              ? "Uploading receipt to backend..."
              : "All receipts are securely processed and stored with end-to-end encryption"}
          </p>
        </Card>
      </div>

      {/* Hidden file input for uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>

    {/* Camera Modal */}
    {showCamera && (
      <CameraCapture
        onCapture={handleCameraCapture}
        onClose={() => setShowCamera(false)}
      />
    )}
  </>
  );
}
