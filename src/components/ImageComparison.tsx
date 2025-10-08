import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import type { BlindnessType } from "./BlindnessSelector";

interface ImageComparisonProps {
  originalImage: string;
  blindnessType: BlindnessType;
}

const ImageComparison = ({ originalImage, blindnessType }: ImageComparisonProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (!originalImage || !blindnessType || !canvasRef.current) return;

    setIsProcessing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Apply color blindness transformation matrices
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        let newR, newG, newB;

        switch (blindnessType) {
          case "protanopia":
            // Red-blind transformation matrix
            newR = 0.567 * r + 0.433 * g + 0.0 * b;
            newG = 0.558 * r + 0.442 * g + 0.0 * b;
            newB = 0.0 * r + 0.242 * g + 0.758 * b;
            break;

          case "deuteranopia":
            // Green-blind transformation matrix
            newR = 0.625 * r + 0.375 * g + 0.0 * b;
            newG = 0.7 * r + 0.3 * g + 0.0 * b;
            newB = 0.0 * r + 0.3 * g + 0.7 * b;
            break;

          case "tritanopia":
            // Blue-blind transformation matrix
            newR = 0.95 * r + 0.05 * g + 0.0 * b;
            newG = 0.0 * r + 0.433 * g + 0.567 * b;
            newB = 0.0 * r + 0.475 * g + 0.525 * b;
            break;

          case "achromatopsia":
            // Complete color blindness (grayscale)
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            newR = gray;
            newG = gray;
            newB = gray;
            break;

          default:
            newR = r;
            newG = g;
            newB = b;
        }

        data[i] = Math.min(255, Math.max(0, newR));
        data[i + 1] = Math.min(255, Math.max(0, newG));
        data[i + 2] = Math.min(255, Math.max(0, newB));
      }

      ctx.putImageData(imageData, 0, 0);
      setIsProcessing(false);
    };

    img.src = originalImage;
  }, [originalImage, blindnessType]);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">Visual Comparison</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <div className="bg-muted p-3 border-b">
            <h4 className="font-medium text-center">Original Image</h4>
          </div>
          <div className="p-4">
            <img
              src={originalImage}
              alt="Original"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="bg-muted p-3 border-b">
            <h4 className="font-medium text-center">
              {blindnessType?.charAt(0).toUpperCase() + blindnessType?.slice(1)} Simulation
            </h4>
          </div>
          <div className="p-4 relative">
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            <canvas
              ref={canvasRef}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ImageComparison;
