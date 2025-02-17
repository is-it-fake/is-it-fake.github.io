import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "@/components/shared/LayoutContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IsItFake - Email Verification",
  description: "Quick and easy way to verify email addresses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
