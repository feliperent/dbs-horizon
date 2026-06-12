import Image from "next/image";

type Who = "aaron" | "linwei" | "atlas";

const config: Record<Who, { src: string; alt: string; ring: string }> = {
  aaron: { src: "/aaron.jpg", alt: "Aaron Lim", ring: "ring-sky-500" },
  linwei: { src: "/linwei.jpg", alt: "Lin Wei", ring: "ring-rose-500" },
  atlas: { src: "/atlas-actor.jpg", alt: "Atlas (the consultant)", ring: "ring-dbsRed" },
};

export default function PartnerAvatar({
  who,
  size = 40,
  ring = false,
  className = "",
}: {
  who: Who;
  size?: number;
  ring?: boolean;
  className?: string;
}) {
  const c = config[who];
  return (
    <div
      className={
        "relative inline-block overflow-hidden rounded-full bg-dbsSurface " +
        (ring ? `ring-2 ${c.ring} ring-offset-2 ring-offset-white ` : "") +
        className
      }
      style={{ width: size, height: size }}
    >
      <Image
        src={c.src}
        alt={c.alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority={size >= 48}
      />
    </div>
  );
}
