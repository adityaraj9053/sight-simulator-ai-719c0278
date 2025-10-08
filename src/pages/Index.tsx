import { useState } from "react";
import { Eye } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import BlindnessSelector, { BlindnessType } from "@/components/BlindnessSelector";
import ImageComparison from "@/components/ImageComparison";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedBlindness, setSelectedBlindness] = useState<BlindnessType>(null);

  const handleImageUpload = (file: File, dataUrl: string) => {
    setUploadedImage(dataUrl);
    setSelectedBlindness(null);
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setSelectedBlindness(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Eye className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Color Blindness Simulator
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Introduction */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Visualize Color Vision Deficiencies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload an image and simulate how it appears to individuals with different types of color blindness.
            This diagnostic tool helps designers, developers, and medical professionals understand color accessibility.
          </p>
        </section>

        {/* Upload Section */}
        <section className="mb-12">
          <ImageUpload
            onImageUpload={handleImageUpload}
            uploadedImage={uploadedImage}
            onClearImage={handleClearImage}
          />
        </section>

        {/* Blindness Type Selection */}
        {uploadedImage && (
          <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BlindnessSelector
              selectedType={selectedBlindness}
              onTypeSelect={setSelectedBlindness}
            />
          </section>
        )}

        {/* Comparison View */}
        {uploadedImage && selectedBlindness && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ImageComparison
              originalImage={uploadedImage}
              blindnessType={selectedBlindness}
            />
          </section>
        )}

        {/* Educational Note */}
        {!uploadedImage && (
          <section className="mt-16 text-center">
            <div className="inline-block p-6 rounded-lg bg-muted/50 max-w-2xl">
              <h3 className="font-semibold mb-2">About Color Blindness</h3>
              <p className="text-sm text-muted-foreground">
                Color vision deficiency affects approximately 8% of males and 0.5% of females worldwide.
                This tool uses scientifically-validated transformation matrices to simulate the most common types
                of color blindness, helping create more accessible designs and content.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Educational tool for color accessibility awareness</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
