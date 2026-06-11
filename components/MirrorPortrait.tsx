"use client";

export default function MirrorPortrait({
  age,
  mood,
}: {
  age: number;
  mood: "content" | "worried" | "proud";
}) {
  // Stylised future-self portrait. Mood drives expression and tint.
  const skin = "#E8C9A8";
  const hair = age >= 60 ? "#C9C9C9" : "#3D2A1F";
  const mouth =
    mood === "proud"
      ? "M58 80 Q72 92 86 80"
      : mood === "content"
      ? "M58 84 Q72 90 86 84"
      : "M58 86 Q72 80 86 86";
  const wrinkle = age >= 60 ? 0.7 : 0;
  return (
    <div className="relative">
      <svg viewBox="0 0 144 160" className="w-full h-full">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFE5EA" />
            <stop offset="100%" stopColor="#FAFAFA" />
          </radialGradient>
        </defs>
        <rect width="144" height="160" fill="url(#bg)" rx="14" />
        {/* shoulders */}
        <path d="M14 160 Q14 116 72 110 Q130 116 130 160 Z" fill="#1B1B1B" />
        {/* neck */}
        <rect x="62" y="96" width="20" height="20" fill={skin} />
        {/* face */}
        <ellipse cx="72" cy="70" rx="34" ry="40" fill={skin} />
        {/* hair */}
        <path d="M40 50 Q72 24 104 50 Q104 38 72 30 Q40 38 40 50 Z" fill={hair} />
        {/* eyes */}
        <circle cx="60" cy="68" r="2.4" fill="#1B1B1B" />
        <circle cx="84" cy="68" r="2.4" fill="#1B1B1B" />
        {/* brows */}
        <path d="M54 60 Q60 57 66 60" stroke="#1B1B1B" strokeWidth="1.8" fill="none" />
        <path d="M78 60 Q84 57 90 60" stroke="#1B1B1B" strokeWidth="1.8" fill="none" />
        {/* mouth */}
        <path d={mouth} stroke="#7A1D1D" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        {/* age wrinkles */}
        {wrinkle > 0 && (
          <g stroke="#B89881" strokeWidth="1" opacity={wrinkle}>
            <path d="M48 74 Q54 76 60 74" fill="none" />
            <path d="M84 74 Q90 76 96 74" fill="none" />
            <path d="M62 92 Q72 95 82 92" fill="none" />
            <path d="M52 84 L56 86" fill="none" />
            <path d="M88 84 L92 86" fill="none" />
          </g>
        )}
        {/* age label */}
        <g>
          <rect x="100" y="8" width="36" height="22" rx="11" fill="#C8102E" />
          <text
            x="118"
            y="23"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            fontSize="11"
            fill="white"
          >
            age {age}
          </text>
        </g>
      </svg>
    </div>
  );
}
