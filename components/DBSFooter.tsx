import Image from "next/image";

export default function DBSFooter() {
  return (
    <footer className="bg-white border-t border-dbsLine mt-12">
      <div className="max-w-6xl mx-auto px-6 py-5 grid md:grid-cols-3 gap-4 text-xs text-dbsGray">
        <div className="flex items-center gap-2">
          <Image src="/dbs-bank-wordmark.png" alt="DBS Bank" width={120} height={28} className="h-6 w-auto object-contain" />
          <span className="opacity-60">·</span>
          <span>Horizon prototype</span>
        </div>
        <div className="md:text-center">
          La Salle Barcelona study tour. Group: Mireia, Daniel, Felipe, Ana, Marc, Joshua.
        </div>
        <div className="md:text-right">
          Built against MAS FEAT, AI Verify, PDPA, EU AI Act Art. 6. Not a real DBS product.
        </div>
      </div>
    </footer>
  );
}
