import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImageUpload: (file: File, dataUrl: string) => void;
  uploadedImage: string | null;
  onClearImage: () => void;
}

const ImageUpload = ({ onImageUpload, uploadedImage, onClearImage }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PNG or JPEG image.",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      onImageUpload(file, dataUrl);
      toast({
        title: "Image uploaded successfully",
        description: "Now select a color blindness type to simulate.",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (uploadedImage) {
    return (
      <Card className="relative overflow-hidden">
        <img
          src={uploadedImage}
          alt="Uploaded"
          className="w-full h-auto max-h-96 object-contain"
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-4 right-4"
          onClick={onClearImage}
        >
          <X className="h-4 w-4" />
        </Button>
      </Card>
    );
  }

  return (
    <Card
      className={`border-2 border-dashed transition-all cursor-pointer ${
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <div className="p-12 text-center">
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Upload an image</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop or click to browse
        </p>
        <p className="text-xs text-muted-foreground">
          PNG or JPEG • Max 5MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    </Card>
  );
};

export default ImageUpload;
