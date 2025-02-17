import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "@/components/shared/LayoutContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IsItFake - Email Verification",
  description:
    "Quick and easy way to verify email addresses instantly with our powerful API.",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "32x32",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#0969DA",
      },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
  appleWebApp: {
    title: "IsItFake",
    statusBarStyle: "default",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "IsItFake - Email Verification",
    description:
      "Quick and easy way to verify email addresses instantly with our powerful API.",
    url: "https://isitfake.xyz",
    siteName: "IsItFake",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IsItFake - Email Verification",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IsItFake - Email Verification",
    description:
      "Quick and easy way to verify email addresses instantly with our powerful API.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
