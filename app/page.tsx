import Link from "next/link";
import Image from "next/image";
import AtlasAvatar from "@/components/AtlasAvatar";
import PartnerAvatar from "@/components/PartnerAvatar";
import { aaron, linwei, couple } from "@/lib/mockData";

const journey = [
  {
    phase: "Pre",
    title: "Onboard the dyad",
    body: "Both partners sign in, link their accounts, set joint goals, agree on disclosure rules. Atlas runs the first Quarterly Check-In.",
    petals: ["Information", "Order-taking"],
    aisaqual: ["Personalisation"],
  },
  {
    phase: "During",
    title: "Atlas mediates the live decisions",
    body: "HDB, baby, envelopes, parent care. Atlas surfaces options with numbers from the couple's own accounts. Refuses to pick.",
    petals: ["Consultation", "Exceptions", "Hospitality"],
    aisaqual: ["Anthropomorphism", "Transparency", "Reliability"],
  },
  {
    phase: "Post",
    title: "Commit, log, revisit",
    body: "Both partners tap to commit, Atlas logs the why-this-not-that trace. Quarterly Check-In repeats. Plan and Mirror update because both partners decided.",
    petals: ["Payment", "Billing", "Safekeeping"],
    aisaqual: ["Security", "Reliability"],
  },
];

const petals = [
  { name: "Information", desc: "Joint Pulse, why-this-not-that traces, balance summaries on every page." },
  { name: "Order-taking", desc: "Couple sets joint envelopes and the rule trigger thresholds." },
  { name: "Billing", desc: "Statements and receipts shared at category level, line items by consent." },
  { name: "Payment", desc: "Atlas only moves money on a rule both partners confirmed." },
  { name: "Consultation", desc: "Quarterly Check-In, Atlas mediated dialogue, scenario surface." },
  { name: "Hospitality", desc: "Atlas names both partners. Never \"you\" alone. Never \"your partner\"." },
  { name: "Safekeeping", desc: "Custody of joint and private funds. Disclosure rules locked at onboarding." },
  { name: "Exceptions", desc: "Envelope Mediator opens turn-based threads. Both confirm or nothing commits." },
];

const aisaqual = [
  { name: "Reliability", desc: "Does what the rule said it would do, on the trigger set by the couple." },
  { name: "Personalisation", desc: "Grounded in real accounts and the dyadic check-in scores." },
  { name: "Anthropomorphism", desc: "Atlas has a name, an avatar, a voice. Always names both partners." },
  { name: "Tangibility", desc: "Visual, two-partner side-by-sides. No hidden state." },
  { name: "Transparency", desc: "Rule, data, rejected alternative on every nudge. One tap." },
  { name: "Security", desc: "Category-level disclosure default. Line item only with consent." },
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
              surfaces the trade-offs with your numbers, and refuses to pick when the call is yours.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              <Link href="/atlas" className="px-4 py-2 rounded-md bg-dbsRed text-white text-sm font-semibold hover:bg-dbsRedDark">Talk to Atlas</Link>
              <Link href="/plan" className="px-4 py-2 rounded-md border border-dbsLine text-dbsInk text-sm font-semibold hover:bg-dbsSurface">See the Plan</Link>
              <Link href="/accounts" className="px-4 py-2 rounded-md border border-dbsLine text-dbsInk text-sm font-semibold hover:bg-dbsSurface">View balances</Link>
            </div>
          </div>
          <div className="md:col-span-2 bg-dbsRedLight px-7 py-8 border-l border-dbsLine">
            <div className="text-[11px] font-bold uppercase tracking-widest text-dbsRedDark">The couple</div>
            <div className="flex items-center gap-3 mt-2">
              <PartnerAvatar who="aaron" size={40} ring />
              <div>
                <div className="text-sm font-bold text-dbsInk">{aaron.name}, {aaron.age}</div>
                <div className="text-xs text-dbsGray">{aaron.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <PartnerAvatar who="linwei" size={40} ring />
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
        <Link href="/plan" className="block bg-white border border-dbsLine rounded-xl p-5 shadow-soft hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between"><div className="text-xs font-bold uppercase tracking-widest text-dbsRed">Plan</div><span className="text-dbsRed group-hover:translate-x-1 transition-transform">→</span></div>
          <p className="text-sm text-dbsInk mt-2">Joint envelopes, private envelopes, three live scenarios. Both partners confirm to commit.</p>
        </Link>
        <Link href="/atlas" className="block bg-white border border-dbsLine rounded-xl p-5 shadow-soft hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between"><div className="flex items-center gap-2"><AtlasAvatar mode="joint" size={26} /><div className="text-xs font-bold uppercase tracking-widest text-dbsRed">Atlas</div></div><span className="text-dbsRed group-hover:translate-x-1 transition-transform">→</span></div>
          <p className="text-sm text-dbsInk mt-2">The couple consultant. Quarterly check-in, mediator chat, voice rules visible.</p>
        </Link>
        <Link href="/accounts" className="block bg-white border border-dbsLine rounded-xl p-5 shadow-soft hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between"><div className="text-xs font-bold uppercase tracking-widest text-dbsRed">Accounts</div><span className="text-dbsRed group-hover:translate-x-1 transition-transform">→</span></div>
          <p className="text-sm text-dbsInk mt-2">All balances with disclosure rules visible. Joint, Aaron private, Lin Wei private.</p>
        </Link>
      </section>

      <section className="bg-white border border-dbsLine rounded-2xl p-6 shadow-soft">
        <div className="text-xs font-bold uppercase tracking-widest text-dbsRed">Customer journey</div>
        <h2 className="text-xl font-extrabold text-dbsInk mt-1">Pre · During · Post. The same loop on every couple decision.</h2>
        <div className="mt-5 grid md:grid-cols-3 gap-4">
          {journey.map((j, i) => (
            <div key={j.phase} className="border border-dbsLine rounded-xl p-4 bg-dbsSurface relative">
              <div className="absolute -top-3 left-4 bg-dbsRed text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                {j.phase}
              </div>
              <div className="font-bold text-dbsRedDark mt-1">{j.title}</div>
              <p className="text-xs text-dbsInk mt-2">{j.body}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {j.petals.map((p) => (
                  <span key={p} className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-dbsRedLight text-dbsRedDark">{p}</span>
                ))}
                {j.aisaqual.map((a) => (
                  <span key={a} className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-dbsInk text-white">{a}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-dbsLine rounded-2xl p-6 shadow-soft">
          <div className="text-xs font-bold uppercase tracking-widest text-dbsRed">Flower of Service (Lovelock & Wirtz)</div>
          <div className="text-lg font-bold text-dbsInk mt-1">8 of 8 petals covered</div>
          <ul className="mt-3 space-y-2">
            {petals.map((p) => (
              <li key={p.name} className="flex items-start gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-dbsRedLight text-dbsRedDark shrink-0 mt-0.5">{p.name}</span>
                <span className="text-xs text-dbsInk">{p.desc}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-dbsLine rounded-2xl p-6 shadow-soft">
          <div className="text-xs font-bold uppercase tracking-widest text-dbsRed">AISAQUAL (Mishra et al.)</div>
          <div className="text-lg font-bold text-dbsInk mt-1">6 of 6 dimensions covered</div>
          <ul className="mt-3 space-y-2">
            {aisaqual.map((a) => (
              <li key={a.name} className="flex items-start gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-dbsInk text-white shrink-0 mt-0.5">{a.name}</span>
                <span className="text-xs text-dbsInk">{a.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
