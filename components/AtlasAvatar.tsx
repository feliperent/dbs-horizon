interface Props {
  mode: "joint" | "aaron" | "linwei";
  size?: number;
  className?: string;
}

export default function AtlasAvatar({ mode, size = 48, className = "" }: Props) {
  // Three-dot constellation for joint; two-dot pair for private threads.
  // Tints follow the partner accent (sky for Aaron, rose for Lin Wei, neutral warm for joint).
  const aaronColor = "#0284c7";
  const linWeiColor = "#e11d48";
  const jointColor = "#C8102E";
  const lightWarm = "#FFE5EA";

  const dotR = size * 0.11;
  const cx = size / 2;
  const cy = size / 2;
  const ringR = size * 0.42;

  let dots: { x: number; y: number; fill: string }[] = [];
  if (mode === "joint") {
    dots = [
      { x: cx, y: cy - ringR * 0.55, fill: jointColor },
      { x: cx - ringR * 0.55, y: cy + ringR * 0.4, fill: jointColor },
      { x: cx + ringR * 0.55, y: cy + ringR * 0.4, fill: jointColor },
    ];
  } else if (mode === "aaron") {
    dots = [
      { x: cx - ringR * 0.45, y: cy - ringR * 0.2, fill: aaronColor },
      { x: cx + ringR * 0.45, y: cy + ringR * 0.2, fill: aaronColor },
    ];
  } else {
    dots = [
      { x: cx - ringR * 0.45, y: cy + ringR * 0.2, fill: linWeiColor },
      { x: cx + ringR * 0.45, y: cy - ringR * 0.2, fill: linWeiColor },
    ];
  }

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className={className} aria-label="Atlas avatar">
      <defs>
        <radialGradient id={`atlas-bg-${mode}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={lightWarm} />
          <stop offset="100%" stopColor="#FAFAFA" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={ringR + dotR + 2} fill={`url(#atlas-bg-${mode})`} stroke="#E5E5E5" />
      {/* Constellation lines */}
      {dots.length === 3 && (
        <g stroke={jointColor} strokeWidth={size * 0.025} opacity={0.35}>
          <line x1={dots[0].x} y1={dots[0].y} x2={dots[1].x} y2={dots[1].y} />
          <line x1={dots[1].x} y1={dots[1].y} x2={dots[2].x} y2={dots[2].y} />
          <line x1={dots[2].x} y1={dots[2].y} x2={dots[0].x} y2={dots[0].y} />
        </g>
      )}
      {dots.length === 2 && (
        <line
          x1={dots[0].x}
          y1={dots[0].y}
          x2={dots[1].x}
          y2={dots[1].y}
          stroke={dots[0].fill}
          strokeWidth={size * 0.025}
          opacity={0.45}
        />
      )}
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={dotR} fill={d.fill} />
      ))}
    </svg>
  );
}
