"use client";
import { useState } from "react";
import AtlasAvatar from "@/components/AtlasAvatar";
import ViewSwitcher from "@/components/ViewSwitcher";
import { atlasJointThread, aaron, linwei } from "@/lib/mockData";
import { atlasReply, atlasGreeting } from "@/lib/ai";
import type { Partner, AtlasMessage } from "@/lib/types";

interface UIMessage extends AtlasMessage {
  ts: string;
}

export default function AtlasPage() {
  const [view, setView] = useState<Partner>("joint");
  const [thread, setThread] = useState<UIMessage[]>(
    atlasJointThread.map((m, i) => ({ ...m, ts: `${i + 1}m ago` }))
  );
  const [prompt, setPrompt] = useState("");

  function speakerLabel(s: AtlasMessage["speaker"]) {
    if (s === "atlas") return "Atlas";
    if (s === "aaron") return aaron.name;
    return linwei.name;
  }
  function speakerBg(s: AtlasMessage["speaker"]) {
    if (s === "atlas") return "bg-dbsRedLight border-dbsRed/20";
    if (s === "aaron") return "bg-sky-50 border-sky-200";
    return "bg-rose-50 border-rose-200";
  }
  function speakerChip(s: AtlasMessage["speaker"]) {
    if (s === "atlas") return "bg-dbsRed text-white";
    if (s === "aaron") return "bg-sky-600 text-white";
    return "bg-rose-600 text-white";
  }

  function send() {
    if (!prompt.trim()) return;
    const speaker = view === "joint" ? (Math.random() > 0.5 ? "aaron" : "linwei") : view;
    const userMsg: UIMessage = {
      id: `u${thread.length + 1}`,
      speaker,
      audience: view === "joint" ? "joint" : view,
      text: prompt.trim(),
      ts: "now",
    };
    const aiMsg: UIMessage = {
      id: `a${thread.length + 2}`,
      speaker: "atlas",
      audience: view === "joint" ? "joint" : view,
      text: atlasReply(prompt, view),
      ts: "now",
    };
    setThread((t) => [...t, userMsg, aiMsg]);
    setPrompt("");
  }

  const visible = thread.filter((m) => {
    if (view === "joint") return m.audience === "joint";
    return m.audience === "joint" || m.audience === view;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-dbsRed flex items-center gap-2">
            <AtlasAvatar mode={view} size={22} />
            <span>Atlas · couple consultant</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-dbsInk">Always names both of you. Refuses to pick when the call is yours.</h1>
          <p className="text-sm text-dbsGray mt-1 max-w-2xl">
            The avatar shifts shape with the audience: a three-dot constellation when Atlas speaks to the couple, a two-dot pair when speaking to one partner privately. Hue tints match the partner.
          </p>
        </div>
        <ViewSwitcher value={view} onChange={setView} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <aside className="md:col-span-1 space-y-4">
          <div className="bg-white border border-dbsLine rounded-2xl p-4 shadow-soft">
            <div className="text-[10px] font-bold uppercase tracking-widest text-dbsGray">Atlas voice rules</div>
            <ul className="text-xs text-dbsInk mt-2 space-y-1.5 list-disc ml-4">
              <li>Names both partners in joint space. Never "you" alone.</li>
              <li>In private threads, names the partner. Never "your partner" as a generic.</li>
              <li>Refuses values calls. Surfaces the cost of each path instead.</li>
              <li>Discloses category-level by default. Line-item only on consent.</li>
              <li>Joint actions require both taps to commit.</li>
            </ul>
          </div>

          <div className="bg-white border border-dbsLine rounded-2xl p-4 shadow-soft">
            <div className="text-[10px] font-bold uppercase tracking-widest text-dbsGray">Quarterly check-in</div>
            <div className="text-sm font-bold text-dbsInk mt-1">Due 20 Jul</div>
            <p className="text-xs text-dbsGray mt-1">10 questions each, separately. Neither partner sees the other's words. Atlas surfaces patterns only.</p>
            <button className="mt-3 text-xs font-semibold px-3 py-1.5 rounded-md bg-dbsRed text-white hover:bg-dbsRedDark">Start the check-in</button>
          </div>

          <div className="bg-dbsRedLight border border-dbsRed/20 rounded-2xl p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-dbsRedDark">The hard rule</div>
            <p className="text-xs text-dbsInk mt-1">
              Atlas augments, never automates, decisions that carry emotional or relational weight. From the course "Missing Middle": value is in Amplify, Interact, Embody. Not Automate.
            </p>
          </div>
        </aside>

        <main className="md:col-span-2 space-y-3">
          <div className="bg-white border border-dbsLine rounded-2xl p-4 shadow-soft">
            <div className="flex items-center gap-2 pb-2 border-b border-dbsLine">
              <AtlasAvatar mode={view} size={32} />
              <div>
                <div className="text-sm font-bold text-dbsInk">
                  {view === "joint" ? "Joint thread with Aaron and Lin Wei" : view === "aaron" ? `Private thread with ${aaron.name}` : `Private thread with ${linwei.name}`}
                </div>
                <div className="text-[11px] text-dbsGray">
                  {view === "joint" ? "Both partners see every message in this thread." : "Lin Wei does not see this thread, only the aggregate."}
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-3 max-h-[420px] overflow-y-auto pr-1">
              {view !== "joint" && visible.length === 0 && (
                <div className="p-3 rounded-lg border border-dbsLine bg-dbsSurface text-sm italic text-dbsGray">{atlasGreeting(view)}</div>
              )}
              {visible.map((m) => (
                <div key={m.id} className="flex items-start gap-3">
                  {m.speaker === "atlas" ? (
                    <AtlasAvatar mode={m.audience} size={28} />
                  ) : (
                    <div className={`w-7 h-7 rounded-full text-white flex items-center justify-center text-[10px] font-bold ${m.speaker === "aaron" ? "bg-sky-600" : "bg-rose-600"}`}>
                      {m.speaker === "aaron" ? aaron.initials : linwei.initials}
                    </div>
                  )}
                  <div className={`rounded-xl border px-3 py-2 ${speakerBg(m.speaker)} flex-1`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${speakerChip(m.speaker)}`}>
                        {speakerLabel(m.speaker)}
                      </span>
                      <span className="text-[10px] text-dbsGray">{m.ts}</span>
                    </div>
                    <div className="text-sm text-dbsInk">{m.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-end gap-2 border-t border-dbsLine pt-3">
              <textarea
                rows={2}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask Atlas something. Try: 'we are stuck on BTO vs resale'"
                className="flex-1 text-sm border border-dbsLine rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-dbsRed/30"
              />
              <button
                onClick={send}
                className="bg-dbsRed text-white font-semibold px-4 py-2 rounded-md hover:bg-dbsRedDark"
              >
                Send
              </button>
            </div>
            <div className="text-[10px] text-dbsGray mt-1">
              Atlas refuses to pick. It will surface the cost of each path and the values you flagged in your check-in.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
