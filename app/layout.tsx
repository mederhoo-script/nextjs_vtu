import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VTU Services - Buy Data, Airtime, TV & More",
  description: "Purchase airtime, data bundles, TV subscriptions, exam pins and other digital products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
