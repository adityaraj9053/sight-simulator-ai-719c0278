import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";

export type BlindnessType = "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia" | null;

interface BlindnessSelectorProps {
  selectedType: BlindnessType;
  onTypeSelect: (type: BlindnessType) => void;
  disabled?: boolean;
}

const blindnessTypes = [
  {
    id: "protanopia",
    name: "Protanopia",
    description: "Red-blind. Difficulty distinguishing red from green.",
    prevalence: "~1% of males",
  },
  {
    id: "deuteranopia",
    name: "Deuteranopia",
    description: "Green-blind. Most common form of color blindness.",
    prevalence: "~1% of males",
  },
  {
    id: "tritanopia",
    name: "Tritanopia",
    description: "Blue-blind. Difficulty distinguishing blue from yellow.",
    prevalence: "~0.001% of population",
  },
  {
    id: "achromatopsia",
    name: "Achromatopsia",
    description: "Complete color blindness. Sees only in grayscale.",
    prevalence: "~0.003% of population",
  },
];

const BlindnessSelector = ({ selectedType, onTypeSelect, disabled }: BlindnessSelectorProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Select Color Blindness Type</h3>
      <RadioGroup
        value={selectedType || ""}
        onValueChange={(value) => onTypeSelect(value as BlindnessType)}
        disabled={disabled}
        className="space-y-3"
      >
        {blindnessTypes.map((type) => (
          <div
            key={type.id}
            className={`flex items-start space-x-3 p-4 rounded-lg border transition-all ${
              selectedType === type.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={() => !disabled && onTypeSelect(type.id as BlindnessType)}
          >
            <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
            <div className="flex-1">
              <Label
                htmlFor={type.id}
                className={`font-medium cursor-pointer ${
                  disabled ? "cursor-not-allowed" : ""
                }`}
              >
                {type.name}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
              <p className="text-xs text-muted-foreground mt-1 italic">{type.prevalence}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </Card>
  );
};

export default BlindnessSelector;
