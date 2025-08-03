import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import {Toaster} from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synapse",
  description: "AI powered platform, catered towards job-seekers, for mock interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"dark"}>
      <body
          // pattern comes from globals.css
        className={`${monaSans.className} antialiased pattern`}>
        {children}

        <Toaster />
      </body>
    </html>
  );
}
