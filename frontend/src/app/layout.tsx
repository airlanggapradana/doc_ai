import Footer from "@/components/Footer";
import "@/styles/globals.css";
import QueryClientProvider from "@/lib/QueryClientProvider";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Doc AI",
  description:
    "A web app that provides health diagnoses using advanced AI technology.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <QueryClientProvider>
        <body>
          {children}
          <Footer />
        </body>
      </QueryClientProvider>
    </html>
  );
}
