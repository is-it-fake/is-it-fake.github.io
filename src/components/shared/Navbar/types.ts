import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  isExternal?: boolean;
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}

export interface NavbarBranding {
  logo?: React.ReactNode;
  title?: string;
  href?: string;
}

export interface NavbarProps {
  /** Branding configuration for the navbar */
  branding?: NavbarBranding;
  /** Navigation items to be displayed */
  navigation?: NavSection[];
  /** Right side content (e.g., auth buttons, search) */
  rightContent?: React.ReactNode;
  /** Whether to show mobile menu */
  showMobileMenu?: boolean;
  /** Custom class names */
  className?: string;
  /** Whether to make navbar sticky */
  isSticky?: boolean;
  /** Whether to show divider below navbar */
  showDivider?: boolean;
  /** Custom theme variant */
  variant?: "default" | "transparent" | "colored";
  /** Background color for colored variant */
  backgroundColor?: string;
}
