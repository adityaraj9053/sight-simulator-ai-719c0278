import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface TestIntroProps {
  onStart: () => void;
}

const TestIntro = ({ onStart }: TestIntroProps) => {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-primary to-secondary mb-6">
        <Eye className="h-12 w-12 text-primary-foreground" />
      </div>
      
      <h2 className="text-4xl font-bold mb-6">
        Ishihara Color Vision Test
      </h2>
      
      <div className="text-left bg-card rounded-lg p-6 shadow-lg mb-8 border">
        <h3 className="font-semibold text-lg mb-3">What is the Ishihara Test?</h3>
        <p className="text-muted-foreground mb-4">
          The Ishihara Color Vision Test is a globally recognized screening tool used to detect red-green color blindness. 
          Developed by Dr. Shinobu Ishihara in 1917, it consists of colored plates with numbers hidden within dot patterns.
        </p>
        
        <h3 className="font-semibold text-lg mb-3">How it Works</h3>
        <p className="text-muted-foreground mb-4">
          Each plate contains a circle of dots in different colors and sizes. People with normal color vision can identify 
          numbers within these patterns, while those with color vision deficiencies may see different numbers or no numbers at all.
        </p>
        
        <h3 className="font-semibold text-lg mb-3">Test Instructions</h3>
        <ul className="text-muted-foreground space-y-2 list-disc list-inside">
          <li>You will be shown 10 color plates</li>
          <li>Each plate displays a hidden number</li>
          <li>Select the number you see from the options provided</li>
          <li>If you can't see any number, select "Can't see"</li>
          <li>Take your time - there's no time limit</li>
        </ul>
      </div>
      
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> This is a screening tool only. For a professional diagnosis, please consult an eye care specialist.
        </p>
      </div>
      
      <Button 
        onClick={onStart}
        size="lg"
        className="px-8 py-6 text-lg"
      >
        Start Test
      </Button>
    </div>
  );
};

export default TestIntro;