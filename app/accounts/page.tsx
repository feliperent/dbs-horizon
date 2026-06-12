"use client";
import ViewSwitcher from "@/components/ViewSwitcher";
import PartnerAvatar from "@/components/PartnerAvatar";
import { accounts, aaron, linwei } from "@/lib/mockData";
import { useCouple } from "@/lib/state";

export default function AccountsPage() {
  const { view, setView } = useCouple();
  const visible = accounts.filter((a) => {
    if (view === "joint") return a.owner === "joint";
    if (view === "aaron") return a.owner === "joint" || a.owner === "aaron";
    return a.owner === "joint" || a.owner === "linwei";
  });

  const jointTotal = accounts.filter((a) => a.owner === "joint").reduce((s, a) => s + a.balance, 0);
  const aaronTotal = accounts.filter((a) => a.owner === "aaron").reduce((s, a) => s + a.balance, 0);
  const linWeiTotal = accounts.filter((a) => a.owner === "linwei").reduce((s, a) => s + a.balance, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-dbsRed">Accounts</div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-dbsInk">All your balances, with the disclosure rules visible.</h1>
          <p className="text-sm text-dbsGray mt-1 max-w-2xl">
            Joint accounts are always shown to both partners. Private accounts are visible to the owner. The other partner sees the category total, never the line items, unless consent is given.
          </p>
        </div>
        <ViewSwitcher value={view} onChange={setView} />
      </div>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-dbsLine rounded-2xl p-4 shadow-soft">
          <div className="text-[10px] font-bold uppercase tracking-widest text-dbsRed">Joint</div>
          <div className="text-2xl font-extrabold text-dbsInk">SGD {jointTotal.toLocaleString()}</div>
          <div className="text-xs text-dbsGray">visible to both partners</div>
        </div>
        <div className="bg-white border border-dbsLine rounded-2xl p-4 shadow-soft">
          <div className="text-[10px] font-bold uppercase tracking-widest text-sky-600 flex items-center gap-1.5">
            <PartnerAvatar who="aaron" size={16} /> Aaron private
          </div>
          <div className="text-2xl font-extrabold text-dbsInk">{view === "linwei" ? `SGD ${aaronTotal.toLocaleString()}` : `SGD ${aaronTotal.toLocaleString()}`}</div>
          <div className="text-xs text-dbsGray">
            {view === "linwei" ? "Lin Wei sees the category total, not the line items." : "Line items visible to Aaron only."}
          </div>
        </div>
        <div className="bg-white border border-dbsLine rounded-2xl p-4 shadow-soft">
          <div className="text-[10px] font-bold uppercase tracking-widest text-rose-600 flex items-center gap-1.5">
            <PartnerAvatar who="linwei" size={16} /> Lin Wei private
          </div>
          <div className="text-2xl font-extrabold text-dbsInk">SGD {linWeiTotal.toLocaleString()}</div>
          <div className="text-xs text-dbsGray">
            {view === "aaron" ? "Aaron sees the category total, not the line items." : "Line items visible to Lin Wei only."}
          </div>
        </div>
      </section>

      <section className="bg-white border border-dbsLine rounded-2xl shadow-soft overflow-hidden">
        <div className="px-5 py-3 bg-dbsSurface border-b border-dbsLine text-[11px] font-bold uppercase tracking-widest text-dbsRedDark">
          {view === "joint" ? "Joint accounts" : view === "aaron" ? "Aaron's view (joint + private)" : "Lin Wei's view (joint + private)"}
        </div>
        <ul className="divide-y divide-dbsLine">
          {visible.map((a) => {
            const ownerColor = a.owner === "joint" ? "text-dbsRed" : a.owner === "aaron" ? "text-sky-700" : "text-rose-700";
            const ownerLabel = a.owner === "joint" ? "Joint" : a.owner === "aaron" ? "Aaron" : "Lin Wei";
            return (
              <li key={a.id} className="px-5 py-3 flex items-center gap-4">
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${a.owner === "joint" ? "bg-dbsRedLight" : a.owner === "aaron" ? "bg-sky-100" : "bg-rose-100"} ${ownerColor}`}>
                  {ownerLabel}
                </span>
                <div className="flex-1 text-sm text-dbsInk">{a.label}</div>
                <div className="text-sm font-bold text-dbsInk">SGD {a.balance.toLocaleString()}</div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-dbsRedLight border border-dbsRed/20 rounded-2xl p-4 text-xs text-dbsInk">
        <span className="font-bold text-dbsRedDark uppercase tracking-widest text-[10px] mr-2">Consent</span>
        Aaron has not opted to share line-item visibility on his Vickers brokerage. Lin Wei has not opted to share line items on her Wise account. Both partners see the category totals and quarterly contribution to joint goals.
      </section>
    </div>
  );
}
