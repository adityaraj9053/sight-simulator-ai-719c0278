import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import plate1 from "@/assets/ishihara-plate-1.jpg";
import plate2 from "@/assets/ishihara-plate-2.jpg";
import plate3 from "@/assets/ishihara-plate-3.jpg";
import plate4 from "@/assets/ishihara-plate-4.jpg";
import plate5 from "@/assets/ishihara-plate-5.jpg";
import plate6 from "@/assets/ishihara-plate-6.jpg";
import plate7 from "@/assets/ishihara-plate-7.jpg";
import plate8 from "@/assets/ishihara-plate-8.jpg";
import plate9 from "@/assets/ishihara-plate-9.jpg";
import plate10 from "@/assets/ishihara-plate-10.jpg";

interface Question {
  id: number;
  image: string;
  correctAnswer: string;
  options: string[];
}

const questions: Question[] = [
  { id: 1, image: plate1, correctAnswer: "12", options: ["12", "13", "15", "Can't see"] },
  { id: 2, image: plate2, correctAnswer: "8", options: ["8", "3", "6", "Can't see"] },
  { id: 3, image: plate3, correctAnswer: "6", options: ["6", "5", "9", "Can't see"] },
  { id: 4, image: plate4, correctAnswer: "29", options: ["29", "70", "26", "Can't see"] },
  { id: 5, image: plate5, correctAnswer: "57", options: ["57", "35", "37", "Can't see"] },
  { id: 6, image: plate6, correctAnswer: "5", options: ["5", "2", "3", "Can't see"] },
  { id: 7, image: plate7, correctAnswer: "3", options: ["3", "8", "5", "Can't see"] },
  { id: 8, image: plate8, correctAnswer: "15", options: ["15", "17", "18", "Can't see"] },
  { id: 9, image: plate9, correctAnswer: "74", options: ["74", "21", "71", "Can't see"] },
  { id: 10, image: plate10, correctAnswer: "2", options: ["2", "5", "7", "Can't see"] },
];

interface TestInterfaceProps {
  onComplete: (answers: string[]) => void;
}

const TestInterface = ({ onComplete }: TestInterfaceProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(newAnswers[currentQuestion + 1] || "");
    } else {
      onComplete(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || "");
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-lg shadow-lg border p-8 mb-6">
        <h3 className="text-xl font-semibold mb-6 text-center">
          What number do you see in this image?
        </h3>

        {/* Image */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md aspect-square">
            <img
              src={question.image}
              alt={`Ishihara plate ${question.id}`}
              className="w-full h-full object-contain rounded-lg"
              loading="lazy"
            />
          </div>
        </div>

        {/* Answer Options */}
        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option) => (
              <div
                key={option}
                className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedAnswer === option
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value={option} id={`option-${option}`} />
                <Label
                  htmlFor={`option-${option}`}
                  className="cursor-pointer flex-1 text-lg font-medium"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <Button
          onClick={handlePrevious}
          variant="outline"
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedAnswer}
        >
          {currentQuestion === questions.length - 1 ? "Finish Test" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default TestInterface;
export { questions };