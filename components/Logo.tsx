export default function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 32"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="DBS Horizon"
    >
      <rect x="0" y="0" width="46" height="32" rx="3" fill="#C8102E" />
      <text
        x="23"
        y="22"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize="16"
        fill="#FFFFFF"
        letterSpacing="1"
      >
        DBS
      </text>
      <text
        x="54"
        y="22"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="16"
        fill="#1B1B1B"
        letterSpacing="0.5"
      >
        Horizon
      </text>
    </svg>
  );
}
