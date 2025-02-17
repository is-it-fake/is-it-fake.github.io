import type { Meta, StoryObj } from "@storybook/react";
import { Home, Settings, User, Book, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Shared/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A highly customizable navigation bar component that can be used across different sections of the application.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "transparent", "colored"],
    },
    mobileBreakpoint: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

// Default Marketing Navbar
export const Marketing: Story = {
  args: {
    branding: {
      title: "Company",
      href: "/",
    },
    navigation: [
      {
        items: [
          { label: "Home", href: "/" },
          { label: "Features", href: "/features" },
          { label: "Pricing", href: "/pricing" },
          { label: "About", href: "/about" },
        ],
      },
    ],
    rightContent: (
      <>
        <Button variant="ghost">Sign In</Button>
        <Button>Get Started</Button>
      </>
    ),
  },
};

// Dashboard Navbar
export const Dashboard: Story = {
  args: {
    variant: "default",
    branding: {
      title: "Dashboard",
      href: "/dashboard",
    },
    navigation: [
      {
        items: [
          { label: "Home", href: "/dashboard", icon: Home },
          { label: "Settings", href: "/dashboard/settings", icon: Settings },
          { label: "Profile", href: "/dashboard/profile", icon: User },
        ],
      },
    ],
    rightContent: <Button variant="ghost">Logout</Button>,
    isSticky: true,
  },
};

// Documentation Navbar
export const Documentation: Story = {
  args: {
    variant: "default",
    branding: {
      title: "Docs",
      href: "/docs",
    },
    navigation: [
      {
        items: [
          { label: "Documentation", href: "/docs", icon: Book },
          { label: "API Reference", href: "/docs/api" },
          { label: "GitHub", href: "https://github.com", isExternal: true },
        ],
      },
    ],
    rightContent: (
      <Button variant="outline" size="sm">
        Sign In
      </Button>
    ),
    showDivider: true,
  },
};

// Transparent Navbar
export const Transparent: Story = {
  args: {
    variant: "transparent",
    branding: {
      title: "Brand",
    },
    navigation: [
      {
        items: [
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    rightContent: <Button>Contact Us</Button>,
  },
};

// Colored Navbar
export const Colored: Story = {
  args: {
    variant: "colored",
    backgroundColor: "#000",
    branding: {
      title: "Dark Theme",
    },
    navigation: [
      {
        items: [
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Services", href: "/services" },
        ],
      },
    ],
    rightContent: (
      <Button variant="secondary">
        <LogIn className="mr-2 h-4 w-4" />
        Login
      </Button>
    ),
  },
};
