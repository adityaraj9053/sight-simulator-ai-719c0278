import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { questions } from "./TestInterface";

interface TestResultsProps {
  answers: string[];
  onRetake: () => void;
  onGoHome: () => void;
}

const TestResults = ({ answers, onRetake, onGoHome }: TestResultsProps) => {
  const correctCount = answers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;

  const accuracy = (correctCount / questions.length) * 100;

  const getResultMessage = () => {
    if (accuracy >= 90) {
      return {
        title: "Normal Color Vision",
        description: "Your results indicate normal color vision. You correctly identified most of the plates.",
        icon: <CheckCircle2 className="h-16 w-16 text-green-500" />,
        color: "text-green-600",
      };
    } else if (accuracy >= 60) {
      return {
        title: "Possible Mild Color Vision Deficiency",
        description: "Your results suggest you may have a mild color vision deficiency. We recommend consulting an eye care professional for a comprehensive evaluation.",
        icon: <AlertCircle className="h-16 w-16 text-yellow-500" />,
        color: "text-yellow-600",
      };
    } else {
      return {
        title: "Possible Red-Green Color Vision Deficiency",
        description: "Your results indicate a possible red-green color vision deficiency. Please consult an ophthalmologist or optometrist for a professional diagnosis.",
        icon: <XCircle className="h-16 w-16 text-orange-500" />,
        color: "text-orange-600",
      };
    }
  };

  const result = getResultMessage();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Results Summary */}
      <div className="bg-card rounded-lg shadow-lg border p-8 mb-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            {result.icon}
          </div>
          <h2 className={`text-3xl font-bold mb-4 ${result.color}`}>
            {result.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {result.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {correctCount}/{questions.length}
            </div>
            <div className="text-sm text-muted-foreground">Correct Answers</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {Math.round(accuracy)}%
            </div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {questions.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Questions</div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Detailed Results</h3>
          <div className="space-y-3">
            {questions.map((question, index) => {
              const isCorrect = answers[index] === question.correctAnswer;
              return (
                <div
                  key={question.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    isCorrect
                      ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900"
                      : "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="font-medium">Plate {question.id}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Your answer: </span>
                    <span className={isCorrect ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                      {answers[index] || "No answer"}
                    </span>
                    {!isCorrect && (
                      <>
                        <span className="text-muted-foreground mx-2">|</span>
                        <span className="text-muted-foreground">Correct: </span>
                        <span className="font-medium">{question.correctAnswer}</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Educational Note */}
      <div className="bg-muted/50 rounded-lg p-6 mb-8">
        <h3 className="font-semibold mb-3">Important Information</h3>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            • This online test is a screening tool only and should not be used for diagnosis.
          </p>
          <p>
            • Color vision deficiency affects approximately 8% of males and 0.5% of females worldwide.
          </p>
          <p>
            • Most color vision deficiencies are inherited and present from birth.
          </p>
          <p>
            • For a professional diagnosis and comprehensive eye examination, please consult an optometrist or ophthalmologist.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRetake} size="lg" variant="outline">
          Retake Test
        </Button>
        <Button onClick={onGoHome} size="lg">
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default TestResults;