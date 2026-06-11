import FounderPipeline from "@/components/FounderPipeline";
import { founderStages, customer } from "@/lib/mockData";

export default function FounderPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-widest text-dbsRed">Horizon Founder</div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-dbsInk">
          The agent drafts your credit case to DBS. You approve every page.
        </h1>
        <p className="text-sm text-dbsGray mt-1 max-w-2xl">
          Side-hustle on Shopify, freelance income, or a registered sole-proprietorship. The agent reads
          your books, drafts the funding ask, runs the FEAT and AI Verify check, and you sign. No broker.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white border border-dbsLine rounded-2xl p-5 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray">Business</div>
            <div className="text-base font-bold text-dbsInk">Kopi Studio</div>
            <ul className="mt-2 text-sm text-dbsInk space-y-1">
              <li>ACRA sole-prop, registered 2025-09-14</li>
              <li>Owner {customer.name}</li>
              <li>Shopify connected, Xero connected</li>
              <li>Average revenue SGD 4,600 per month, growing 18 percent QoQ</li>
            </ul>
            <div className="mt-3 p-3 rounded-lg bg-dbsSurface border border-dbsLine">
              <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray">Requested</div>
              <div className="text-2xl font-extrabold text-dbsInk">SGD 35,000</div>
              <div className="text-xs text-dbsGray">12-month working capital · revenue-share 3 percent</div>
            </div>
          </div>

          <div className="bg-dbsRedLight border border-dbsRed/20 rounded-2xl p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-dbsRedDark mb-1">Why this exists</div>
            <p className="text-xs text-dbsInk">
              In Singapore the SME loan-broker market lives because the owner does not know how to write a
              credit memo. Founder cuts the broker out and feeds cleaner inputs to CreditAI, so DBS decides
              faster and the customer pays no arrangement fee.
            </p>
          </div>

          <div className="bg-white border border-dbsLine rounded-2xl p-4 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray mb-2">
              Compliance visible
            </div>
            <ul className="text-xs text-dbsInk space-y-1 list-disc ml-4">
              <li>FEAT principles check before submission</li>
              <li>AI Verify test report attached</li>
              <li>No prohibited variables used in scoring</li>
              <li>Owner edits any sentence the agent drafted</li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-dbsSurface border border-dbsLine rounded-2xl p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray mb-3">
              Application pipeline · 8 stages
            </div>
            <FounderPipeline stages={founderStages} />
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white border border-dbsLine rounded-2xl p-5 shadow-soft flex flex-wrap items-center gap-3 justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray">Loop closure</div>
          <p className="text-sm text-dbsInk max-w-xl">
            On approval, the disbursement turns the Plan card <span className="font-semibold">Kopi Studio inventory advance</span> active. One product, one customer, one continuous plan.
          </p>
        </div>
        <a
          href="/plan"
          className="text-sm font-semibold px-4 py-2 rounded-md bg-dbsRed text-white hover:bg-dbsRedDark"
        >
          See the linked card in Plan →
        </a>
      </div>
    </div>
  );
}
