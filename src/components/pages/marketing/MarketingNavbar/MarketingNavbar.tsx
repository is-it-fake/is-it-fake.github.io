"use client";

import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";

export function MarketingNavbar() {
  const marketingNavItems = [
    {
      items: [
        { label: "Home", href: "/" },
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Blog", href: "/blog" },
        { label: "Documentation", href: "/docs" },
      ],
    },
  ];

  return (
    <Navbar
      branding={{
        title: "Vivid",
        href: "/",
      }}
      navigation={marketingNavItems}
      rightContent={
        <>
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </>
      }
      isSticky
      showDivider
      variant="transparent"
      className="supports-[backdrop-filter]:bg-background/60 bg-background/95 backdrop-blur"
    />
  );
}
