import { BlindnessType } from "./BlindnessSelector";

interface ConeResponseDiagramProps {
  blindnessType: BlindnessType;
}

const ConeResponseDiagram = ({ blindnessType }: ConeResponseDiagramProps) => {
  const getWeakenedCone = () => {
    switch (blindnessType) {
      case "protanopia":
        return { cone: "L (Red)", color: "#ef4444", weakIndex: 0 };
      case "deuteranopia":
        return { cone: "M (Green)", color: "#22c55e", weakIndex: 1 };
      case "tritanopia":
        return { cone: "S (Blue)", color: "#3b82f6", weakIndex: 2 };
      case "achromatopsia":
        return { cone: "All", color: "#6b7280", weakIndex: -1 };
      default:
        return { cone: "L (Red)", color: "#ef4444", weakIndex: 0 };
    }
  };

  const weakened = getWeakenedCone();

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <linearGradient id="panelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
      </defs>

      <rect width="800" height="400" fill="url(#bgGrad)" />

      {/* Left Panel - Before Correction */}
      <g>
        <rect x="20" y="30" width="340" height="340" rx="12" fill="url(#panelGrad)" stroke="#cbd5e1" strokeWidth="2" />
        <text x="190" y="60" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#1e293b">
          Before Correction
        </text>

        {/* Plot Area */}
        <rect x="40" y="80" width="300" height="200" fill="#fafafa" stroke="#e2e8f0" strokeWidth="1" />
        
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={`grid-l-${i}`} x1="40" y1={80 + i * 50} x2="340" y2={80 + i * 50} stroke="#e2e8f0" strokeWidth="1" />
        ))}

        {/* L Cone Curve (Red) */}
        <path
          d="M 60 220 Q 120 120, 180 160 T 320 200"
          stroke="#ef4444"
          strokeWidth={weakened.weakIndex === 0 || weakened.weakIndex === -1 ? "1" : "3"}
          fill="none"
          opacity={weakened.weakIndex === 0 || weakened.weakIndex === -1 ? "0.3" : "1"}
          strokeDasharray={weakened.weakIndex === 0 || weakened.weakIndex === -1 ? "4,4" : "none"}
        />

        {/* M Cone Curve (Green) */}
        <path
          d="M 60 200 Q 140 100, 200 140 T 320 180"
          stroke="#22c55e"
          strokeWidth={weakened.weakIndex === 1 || weakened.weakIndex === -1 ? "1" : "3"}
          fill="none"
          opacity={weakened.weakIndex === 1 || weakened.weakIndex === -1 ? "0.3" : "1"}
          strokeDasharray={weakened.weakIndex === 1 || weakened.weakIndex === -1 ? "4,4" : "none"}
        />

        {/* S Cone Curve (Blue) */}
        <path
          d="M 60 240 Q 100 140, 160 180 T 320 220"
          stroke="#3b82f6"
          strokeWidth={weakened.weakIndex === 2 || weakened.weakIndex === -1 ? "1" : "3"}
          fill="none"
          opacity={weakened.weakIndex === 2 || weakened.weakIndex === -1 ? "0.3" : "1"}
          strokeDasharray={weakened.weakIndex === 2 || weakened.weakIndex === -1 ? "4,4" : "none"}
        />

        {/* Cone Icons */}
        <circle cx="80" cy="320" r="15" fill="#ef4444" opacity={weakened.weakIndex === 0 || weakened.weakIndex === -1 ? "0.3" : "0.8"} />
        <text x="80" y="355" fontSize="12" textAnchor="middle" fill="#475569">L</text>

        <circle cx="190" cy="320" r="15" fill="#22c55e" opacity={weakened.weakIndex === 1 || weakened.weakIndex === -1 ? "0.3" : "0.8"} />
        <text x="190" y="355" fontSize="12" textAnchor="middle" fill="#475569">M</text>

        <circle cx="300" cy="320" r="15" fill="#3b82f6" opacity={weakened.weakIndex === 2 || weakened.weakIndex === -1 ? "0.3" : "0.8"} />
        <text x="300" y="355" fontSize="12" textAnchor="middle" fill="#475569">S</text>
      </g>

      {/* Arrow */}
      <g>
        <path d="M 375 190 L 415 190 L 415 180 L 435 200 L 415 220 L 415 210 L 375 210 Z" fill="#8b5cf6" />
        <text x="405" y="245" fontSize="11" fontWeight="600" textAnchor="middle" fill="#7c3aed">
          AI correction
        </text>
      </g>

      {/* Right Panel - After Correction */}
      <g>
        <rect x="440" y="30" width="340" height="340" rx="12" fill="url(#panelGrad)" stroke="#cbd5e1" strokeWidth="2" />
        <text x="610" y="60" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#1e293b">
          After AI Correction
        </text>

        {/* Plot Area */}
        <rect x="460" y="80" width="300" height="200" fill="#fafafa" stroke="#e2e8f0" strokeWidth="1" />

        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={`grid-r-${i}`} x1="460" y1={80 + i * 50} x2="760" y2={80 + i * 50} stroke="#e2e8f0" strokeWidth="1" />
        ))}

        {/* All cones restored */}
        <path d="M 480 220 Q 540 120, 600 160 T 740 200" stroke="#ef4444" strokeWidth="3" fill="none" />
        <path d="M 480 200 Q 560 100, 620 140 T 740 180" stroke="#22c55e" strokeWidth="3" fill="none" />
        <path d="M 480 240 Q 520 140, 580 180 T 740 220" stroke="#3b82f6" strokeWidth="3" fill="none" />

        {/* Cone Icons - All restored */}
        <circle cx="500" cy="320" r="15" fill="#ef4444" opacity="0.8" />
        <text x="500" y="355" fontSize="12" textAnchor="middle" fill="#475569">L</text>

        <circle cx="610" cy="320" r="15" fill="#22c55e" opacity="0.8" />
        <text x="610" y="355" fontSize="12" textAnchor="middle" fill="#475569">M</text>

        <circle cx="720" cy="320" r="15" fill="#3b82f6" opacity="0.8" />
        <text x="720" y="355" fontSize="12" textAnchor="middle" fill="#475569">S</text>
      </g>
    </svg>
  );
};

export default ConeResponseDiagram;
