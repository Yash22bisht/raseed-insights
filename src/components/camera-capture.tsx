import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Camera, RotateCw, Check } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [error, setError] = useState<string>("");

  // Start camera when component mounts
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  const startCamera = async () => {
    try {
      setError("");
      
      // Stop existing stream first
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      // Request camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to base64 image
    const imageData = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(imageData);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const confirmPhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      stopCamera();
      onClose();
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full bg-black/30 hover:bg-black/50 text-white"
        >
          <X className="w-6 h-6" />
        </Button>
        
        {!capturedImage && (
          <Button
            variant="ghost"
            size="icon"
            onClick={switchCamera}
            className="rounded-full bg-black/30 hover:bg-black/50 text-white"
          >
            <RotateCw className="w-6 h-6" />
          </Button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="absolute top-20 left-4 right-4 z-10 p-4 bg-destructive/90 text-white rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Video Preview or Captured Image */}
      <div className="w-full h-full flex items-center justify-center">
        {!capturedImage ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={capturedImage}
            alt="Captured receipt"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Hidden canvas for capturing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-8 bg-gradient-to-t from-black/50 to-transparent">
        {!capturedImage ? (
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={capturePhoto}
              className="w-20 h-20 rounded-full bg-white hover:bg-gray-200 shadow-xl"
            >
              <Camera className="w-8 h-8 text-black" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={retakePhoto}
              className="rounded-full px-8"
            >
              Retake
            </Button>
            <Button
              size="lg"
              onClick={confirmPhoto}
              className="rounded-full px-8 bg-primary hover:bg-primary/90"
            >
              <Check className="w-5 h-5 mr-2" />
              Use Photo
            </Button>
          </div>
        )}
      </div>

      {/* Guidelines overlay (optional) */}
      {!capturedImage && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="border-2 border-white/50 rounded-2xl w-[90%] h-[70%] shadow-2xl">
            <div className="absolute top-4 left-0 right-0 text-center">
              <p className="text-white text-sm bg-black/50 inline-block px-4 py-2 rounded-full">
                Position receipt within frame
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
