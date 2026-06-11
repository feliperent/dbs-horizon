import "./globals.css";
import type { Metadata } from "next";
import DBSHeader from "@/components/DBSHeader";
import DBSFooter from "@/components/DBSFooter";

export const metadata: Metadata = {
  title: "DBS Horizon",
  description: "Your financial future, motivated and executed. A DBS prototype.",
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
        <DBSHeader />
        <main className="flex-1">{children}</main>
        <DBSFooter />
      </body>
    </html>
  );
}
