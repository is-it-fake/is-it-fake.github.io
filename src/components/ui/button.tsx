import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0969da] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#0969da] text-white hover:bg-[#0969da]/90 dark:bg-[#2f81f7] dark:hover:bg-[#2f81f7]/90",
        destructive:
          "bg-red-500 text-white hover:bg-red-500/90 dark:bg-red-900 dark:hover:bg-red-900/90",
        outline:
          "border border-[#d0d7de] bg-transparent hover:bg-[#f6f8fa] dark:border-[#30363d] dark:hover:bg-[#161b22]",
        secondary:
          "bg-[#f6f8fa] text-[#24292f] hover:bg-[#f3f4f6] dark:bg-[#161b22] dark:text-[#c9d1d9] dark:hover:bg-[#1c2128]",
        ghost:
          "hover:bg-[#f6f8fa] hover:text-[#24292f] dark:hover:bg-[#161b22] dark:hover:text-[#c9d1d9]",
        link: "text-[#0969da] underline-offset-4 hover:underline dark:text-[#2f81f7]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
