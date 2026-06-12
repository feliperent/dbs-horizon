import Image from "next/image";

export default function Logo({ variant = "wordmark" }: { variant?: "wordmark" | "shield" | "compact" }) {
  if (variant === "shield") {
    return (
      <Image
        src="/dbs-shield.png"
        alt="DBS"
        width={32}
        height={32}
        priority
        className="h-7 w-7 object-contain"
      />
    );
  }
  if (variant === "compact") {
    return (
      <Image
        src="/dbs-compact.webp"
        alt="DBS"
        width={120}
        height={48}
        priority
        className="h-7 w-auto object-contain"
      />
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/dbs-shield.png"
        alt="DBS"
        width={32}
        height={32}
        priority
        className="h-8 w-8 object-contain"
      />
      <div className="leading-tight">
        <div className="text-[15px] font-extrabold text-dbsInk tracking-tight">DBS</div>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-dbsRed -mt-0.5">Horizon</div>
      </div>
    </div>
  );
}
