"use client";

import { Navbar } from "@/components/shared/Navbar/Navbar";
import { Footer } from "@/components/shared/Footer/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

interface LayoutContentProps {
  children: React.ReactNode;
}

export function LayoutContent({ children }: LayoutContentProps) {
  const handleDocumentationClick = () => {
    const element = document.getElementById("docs");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStatusClick = () => {
    const element = document.getElementById("status");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative min-h-screen">
        <Navbar
          onDocumentationClick={handleDocumentationClick}
          onStatusClick={handleStatusClick}
        />
        <main>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
