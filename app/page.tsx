import Link from "next/link";
import Image from "next/image";
import AtlasAvatar from "@/components/AtlasAvatar";
import { aaron, linwei, couple } from "@/lib/mockData";

const surfaces = [
  {
    href: "/mirror",
    label: "Mirror",
    blurb: "See yourselves at 65, side by side. Built from your real joint cashflow.",
    petals: ["Information", "Consultation"],
    dim: ["Anthropomorphism", "Tangibility"],
  },
  {
    href: "/plan",
    label: "Plan",
    blurb: "Joint envelopes, your own discretionary, the three scenarios you have on the table.",
    petals: ["Order-taking", "Payment", "Safekeeping"],
    dim: ["Reliability", "Transparency"],
  },
  {
    href: "/atlas",
    label: "Atlas",
    blurb: "Your couple consultant. Always names both of you. Refuses to pick when the call is yours.",
    petals: ["Consultation", "Hospitality", "Exceptions"],
    dim: ["Anthropomorphism", "Personalisation"],
  },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
      <section className="bg-white border border-dbsLine rounded-2xl shadow-soft overflow-hidden">
        <div className="grid md:grid-cols-5">
          <div className="md:col-span-3 px-7 py-8">
            <div className="text-[11px] font-bold uppercase tracking-widest text-dbsRed flex items-center gap-2">
              <Image src="/dbs-shield.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
              <span>Horizon · for couples · prototype</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-dbsInk mt-3 leading-tight">
              The conversations you need to have. Together.
            </h1>
            <p className="text-base text-dbsGray mt-3 max-w-lg">
              Atlas is a couple financial mediator on top of DBS. It ingests both of your accounts,
              surfaces the trade-offs, and refuses to pick when the call is yours.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              <Link
                href="/atlas"
                className="px-4 py-2 rounded-md bg-dbsRed text-white text-sm font-semibold hover:bg-dbsRedDark"
              >
                Talk to Atlas
              </Link>
              <Link
                href="/plan"
                className="px-4 py-2 rounded-md border border-dbsLine text-dbsInk text-sm font-semibold hover:bg-dbsSurface"
              >
                See the Plan
              </Link>
              <Link
                href="/mirror"
                className="px-4 py-2 rounded-md border border-dbsLine text-dbsInk text-sm font-semibold hover:bg-dbsSurface"
              >
                Open the Mirror
              </Link>
            </div>
          </div>
          <div className="md:col-span-2 bg-dbsRedLight px-7 py-8 border-l border-dbsLine">
            <div className="text-[11px] font-bold uppercase tracking-widest text-dbsRedDark">The couple</div>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-bold">{aaron.initials}</div>
              <div>
                <div className="text-sm font-bold text-dbsInk">{aaron.name}, {aaron.age}</div>
                <div className="text-xs text-dbsGray">{aaron.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">{linwei.initials}</div>
              <div>
                <div className="text-sm font-bold text-dbsInk">{linwei.name}, {linwei.age}</div>
                <div className="text-xs text-dbsGray">{linwei.role}</div>
              </div>
            </div>
            <ul className="mt-4 text-xs text-dbsInk space-y-1">
              <li>Married <strong>{couple.marriedMonths} months</strong>, together {couple.yearsTogether} years</li>
              <li>Joint goal: <strong>{couple.jointGoal}</strong></li>
              <li>Living: {couple.living}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {surfaces.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block bg-white border border-dbsLine rounded-xl p-5 shadow-soft hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {s.label === "Atlas" ? (
                  <AtlasAvatar mode="joint" size={28} />
                ) : null}
                <div className="text-xs font-bold uppercase tracking-widest text-dbsRed">{s.label}</div>
              </div>
              <span className="text-dbsRed group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="text-sm text-dbsInk mt-2">{s.blurb}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {s.dim.map((d) => (
                <span key={d} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-dbsInk text-white">
                  {d}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>

      <section className="bg-white border border-dbsLine rounded-2xl p-6 shadow-soft">
        <div className="text-xs font-bold uppercase tracking-widest text-dbsRed">The product</div>
        <h2 className="text-xl font-extrabold text-dbsInk mt-1">Atlas augments the conversation. It does not have the conversation for you.</h2>
        <div className="mt-5 grid md:grid-cols-3 gap-4 text-sm">
          <div className="border border-dbsLine rounded-xl p-4 bg-dbsSurface">
            <div className="font-bold text-dbsRedDark">It surfaces, you decide</div>
            <p className="text-dbsInk mt-1">Atlas lays out the two paths with real numbers from your accounts. It names the non-money trade-offs each of you flagged in the quarterly check-in. It explicitly refuses to choose.</p>
          </div>
          <div className="border border-dbsLine rounded-xl p-4 bg-dbsSurface">
            <div className="font-bold text-dbsRedDark">Both partners confirm, or nothing commits</div>
            <p className="text-dbsInk mt-1">Joint actions require both taps. Disclosure between you is category-level by default, line-item only on consent. Both of you see what Atlas wrote and why.</p>
          </div>
          <div className="border border-dbsLine rounded-xl p-4 bg-dbsSurface">
            <div className="font-bold text-dbsRedDark">Built where the course says the value lives</div>
            <p className="text-dbsInk mt-1">The Missing Middle of human-machine collaboration: Amplify, Interact, Embody. Atlas augments. It will not automate a values call.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
