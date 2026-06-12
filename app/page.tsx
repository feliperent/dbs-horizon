import Link from "next/link";
import Image from "next/image";
import { customer } from "@/lib/mockData";

const tiles = [
  {
    href: "/mirror",
    title: "Mirror",
    blurb: "See yourself at 65, in your own parlance, drawn from your real DBS cashflow.",
    aisaqual: ["Anthropomorphism", "Tangibility", "Personalisation"],
  },
  {
    href: "/plan",
    title: "Plan",
    blurb: "Write the rules. The agent runs them. You approve anything irreversible.",
    aisaqual: ["Reliability", "Security", "Transparency"],
  },
  {
    href: "/founder",
    title: "Founder",
    blurb: "When you start a side business, the agent drafts your credit case to DBS. You sign every page.",
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
            <div className="text-[11px] font-bold uppercase tracking-widest text-dbsRed flex items-center gap-2">
              <Image src="/dbs-shield.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
              <span>Horizon · prototype</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-dbsInk mt-3 leading-tight">
              Tell the bank how your money should move.
            </h1>
            <p className="text-base text-dbsGray mt-3 max-w-lg">
              Write the rules in plain English. We run them for the next 30 days. You approve every step
              that cannot be undone.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
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
                Go to Plan
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
        <div className="text-xs font-bold uppercase tracking-widest text-dbsRed">How the three surfaces share state</div>
        <h2 className="text-xl font-extrabold text-dbsInk mt-1">One product. One customer. One continuous plan.</h2>
        <div className="mt-5 grid md:grid-cols-3 gap-4 text-sm">
          <div className="border border-dbsLine rounded-xl p-4 bg-dbsSurface">
            <div className="font-bold text-dbsRedDark">Mirror reveals the gap</div>
            <p className="text-dbsInk mt-1">A face at 65, in your parlance. You see what is missing before you write a single rule.</p>
            <div className="text-dbsRed mt-2 font-bold">↓ motivates</div>
          </div>
          <div className="border border-dbsLine rounded-xl p-4 bg-dbsSurface">
            <div className="font-bold text-dbsRedDark">Plan closes the gap</div>
            <p className="text-dbsInk mt-1">Your rules run for 30 days. Irreversible cards stop at a biometric consent gate with a ten-second cool-off.</p>
            <div className="text-dbsRed mt-2 font-bold">↓ funds growth via</div>
          </div>
          <div className="border border-dbsLine rounded-xl p-4 bg-dbsSurface">
            <div className="font-bold text-dbsRedDark">Founder fuels the business</div>
            <p className="text-dbsInk mt-1">The agent drafts your SME credit case. When approved, the disbursement becomes a card in Plan, and Mirror updates because the gap shrank.</p>
            <div className="text-dbsRed mt-2 font-bold">↑ loops back to Mirror</div>
          </div>
        </div>
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
