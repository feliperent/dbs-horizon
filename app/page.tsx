import Link from "next/link";
import { customer } from "@/lib/mockData";

const tiles = [
  {
    href: "/mirror",
    title: "Mirror",
    blurb: "See yourself at 65, in your own parlance, grounded in your real DBS cashflow.",
    aisaqual: ["Anthropomorphism", "Tangibility", "Personalisation"],
  },
  {
    href: "/plan",
    title: "Plan",
    blurb: "Write the rules. The agent runs them for the next 30 days, with a consent gate before anything irreversible.",
    aisaqual: ["Reliability", "Security", "Transparency"],
  },
  {
    href: "/founder",
    title: "Founder",
    blurb: "When you start a business, the agent drafts your credit case to DBS, section by section. You approve every page.",
    aisaqual: ["Personalisation", "Anthropomorphism", "Transparency"],
  },
];

const petals = [
  "Information",
  "Order-taking",
  "Billing",
  "Payment",
  "Consultation",
  "Hospitality",
  "Safekeeping",
  "Exceptions",
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
      <section className="bg-white border border-dbsLine rounded-2xl shadow-soft overflow-hidden">
        <div className="grid md:grid-cols-5">
          <div className="md:col-span-3 px-7 py-8">
            <div className="text-[11px] font-bold uppercase tracking-widest text-dbsRed">
              DBS Horizon · prototype
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-dbsInk mt-2 leading-tight">
              Your financial future, motivated and executed.
            </h1>
            <p className="text-sm text-dbsGray mt-3 max-w-lg">
              One product for Singapore dual-track professionals 28-39, salaried with a side-hustle or
              founder intent. Three surfaces, one customer, one plan.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              <Link
                href="/mirror"
                className="px-4 py-2 rounded-md bg-dbsRed text-white text-sm font-semibold hover:bg-dbsRedDark"
              >
                Start with the Mirror
              </Link>
              <Link
                href="/plan"
                className="px-4 py-2 rounded-md border border-dbsLine text-dbsInk text-sm font-semibold hover:bg-dbsSurface"
              >
                See the Plan
              </Link>
              <Link
                href="/founder"
                className="px-4 py-2 rounded-md border border-dbsLine text-dbsInk text-sm font-semibold hover:bg-dbsSurface"
              >
                Apply via Founder
              </Link>
            </div>
          </div>
          <div className="md:col-span-2 bg-dbsRedLight px-7 py-8 border-l border-dbsLine">
            <div className="text-[11px] font-bold uppercase tracking-widest text-dbsRedDark">Customer</div>
            <div className="text-lg font-bold text-dbsInk mt-1">{customer.name}, {customer.age}</div>
            <div className="text-sm text-dbsInk mt-1">{customer.role}</div>
            <ul className="mt-4 text-xs text-dbsInk space-y-1">
              <li>Salary <strong>SGD {customer.salaryMonthly.toLocaleString()}</strong> per month</li>
              <li>Side income <strong>SGD {customer.sideMonthly.toLocaleString()}</strong> per month</li>
              <li>{customer.segmentNote}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {tiles.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="block bg-white border border-dbsLine rounded-xl p-5 shadow-soft hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-widest text-dbsRed">{t.title}</div>
              <span className="text-dbsRed group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="text-sm text-dbsInk mt-2">{t.blurb}</p>
            <div className="flex flex-wrap gap-1 mt-4">
              {t.aisaqual.map((a) => (
                <span key={a} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-dbsInk text-white">
                  {a}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>

      <section className="bg-white border border-dbsLine rounded-2xl p-6 shadow-soft">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-dbsRed">Framework coverage</div>
            <div className="text-lg font-bold text-dbsInk">Flower of Service 8/8 · AISAQUAL 6/6</div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {petals.map((p) => (
              <span key={p} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-dbsRedLight text-dbsRedDark">
                {p}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-dbsGray mt-3 max-w-3xl">
          Every screen in this prototype tags the petals and AISAQUAL dimensions it covers, so the rubric
          mapping is visible on stage, not buried in a slide.
        </p>
      </section>
    </div>
  );
}
