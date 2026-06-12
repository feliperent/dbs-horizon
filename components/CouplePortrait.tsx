"use client";

interface Props {
  age: number;
  mood: "content" | "worried" | "proud";
}

function Person({
  x,
  hair,
  skin,
  mouth,
  wrinkle,
  blush,
}: {
  x: number;
  hair: string;
  skin: string;
  mouth: string;
  wrinkle: number;
  blush: string;
}) {
  return (
    <g transform={`translate(${x},0)`}>
      <path d="M14 160 Q14 116 56 110 Q98 116 98 160 Z" fill="#1B1B1B" />
      <rect x="48" y="96" width="16" height="20" fill={skin} />
      <ellipse cx="56" cy="70" rx="28" ry="34" fill={skin} />
      <path d="M30 48 Q56 24 82 48 Q82 38 56 32 Q30 38 30 48 Z" fill={hair} />
      <circle cx="46" cy="68" r="2.1" fill="#1B1B1B" />
      <circle cx="66" cy="68" r="2.1" fill="#1B1B1B" />
      <path d="M40 60 Q46 57 52 60" stroke="#1B1B1B" strokeWidth="1.6" fill="none" />
      <path d="M60 60 Q66 57 72 60" stroke="#1B1B1B" strokeWidth="1.6" fill="none" />
      <path d={mouth} stroke="#7A1D1D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="42" cy="78" r="3" fill={blush} opacity={0.5} />
      <circle cx="70" cy="78" r="3" fill={blush} opacity={0.5} />
      {wrinkle > 0 && (
        <g stroke="#B89881" strokeWidth="1" opacity={wrinkle}>
          <path d="M38 76 Q44 78 50 76" fill="none" />
          <path d="M62 76 Q68 78 74 76" fill="none" />
          <path d="M48 88 Q56 91 64 88" fill="none" />
        </g>
      )}
    </g>
  );
}

export default function CouplePortrait({ age, mood }: Props) {
  const aaronSkin = "#E8C9A8";
  const aaronHair = age >= 55 ? "#CECECE" : "#2A1B12";
  const linWeiSkin = "#EFD3B5";
  const linWeiHair = age >= 55 ? "#D3D3D3" : "#3A2418";
  const mouthShape =
    mood === "proud"
      ? "M46 82 Q56 92 66 82"
      : mood === "content"
      ? "M46 84 Q56 90 66 84"
      : "M46 88 Q56 80 66 88";
  const wrinkle = age >= 55 ? 0.7 : 0;
  return (
    <svg viewBox="0 0 224 160" className="w-full h-full">
      <defs>
        <radialGradient id="cp-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFE5EA" />
          <stop offset="100%" stopColor="#FAFAFA" />
        </radialGradient>
      </defs>
      <rect width="224" height="160" fill="url(#cp-bg)" rx="14" />
      <g>
        <rect x="100" y="10" width="56" height="22" rx="11" fill="#C8102E" />
        <text
          x="128"
          y="25"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="11"
          fill="white"
        >
          A + LW · {age}
        </text>
      </g>
      <Person x={0} hair={aaronHair} skin={aaronSkin} mouth={mouthShape} wrinkle={wrinkle} blush="#7BAEDB" />
      <Person x={112} hair={linWeiHair} skin={linWeiSkin} mouth={mouthShape} wrinkle={wrinkle} blush="#E394A4" />
    </svg>
  );
}
