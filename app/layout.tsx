import "./globals.css";
import type { Metadata } from "next";
import DBSHeader from "@/components/DBSHeader";
import DBSFooter from "@/components/DBSFooter";
import { CoupleStateProvider } from "@/lib/state";

export const metadata: Metadata = {
  title: "DBS Horizon · Atlas",
  description: "A couple financial mediator on top of DBS. Always names both partners, refuses to pick when the call is theirs.",
  icons: { icon: "/dbs-shield.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <CoupleStateProvider>
          <DBSHeader />
          <main className="flex-1">{children}</main>
          <DBSFooter />
        </CoupleStateProvider>
      </body>
    </html>
  );
}
