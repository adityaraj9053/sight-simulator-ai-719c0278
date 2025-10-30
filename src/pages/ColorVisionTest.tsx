import { useState } from "react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import TestIntro from "@/components/TestIntro";
import TestInterface from "@/components/TestInterface";
import TestResults from "@/components/TestResults";

type TestStage = "intro" | "testing" | "results";

const ColorVisionTest = () => {
  const [stage, setStage] = useState<TestStage>("intro");
  const [testAnswers, setTestAnswers] = useState<string[]>([]);

  const handleStartTest = () => {
    setStage("testing");
  };

  const handleTestComplete = (answers: string[]) => {
    setTestAnswers(answers);
    setStage("results");
  };

  const handleRetake = () => {
    setTestAnswers([]);
    setStage("intro");
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <Link to="/" className="flex items-center justify-center gap-3 hover:opacity-80 transition-opacity">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Eye className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Color Blindness Simulator
            </h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {stage === "intro" && <TestIntro onStart={handleStartTest} />}
        {stage === "testing" && <TestInterface onComplete={handleTestComplete} />}
        {stage === "results" && (
          <TestResults
            answers={testAnswers}
            onRetake={handleRetake}
            onGoHome={handleGoHome}
          />
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

export default ColorVisionTest;