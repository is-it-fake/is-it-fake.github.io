import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavbarProps {
  onDocumentationClick: () => void;
  onStatusClick: () => void;
}

export function Navbar({ onDocumentationClick, onStatusClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-background/80 border-b border-border/40 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="text-[#57606a] hover:text-[#0969da] dark:text-[#8b949e] dark:hover:text-[#2f81f7]"
              onClick={onDocumentationClick}
            >
              Documentation
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#57606a] hover:text-[#0969da] dark:text-[#8b949e] dark:hover:text-[#2f81f7]"
              onClick={onStatusClick}
            >
              Status
            </Button>
            <a
              href="https://github.com/is-it-fake/is-it-fake.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-[#57606a] hover:text-[#0969da] dark:text-[#8b949e] dark:hover:text-[#2f81f7] transition-colors"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="w-[280px] sm:w-[350px] flex flex-col gap-4 mt-6">
                  <Button
                    variant="ghost"
                    className="justify-start text-[#57606a] hover:text-[#0969da] dark:text-[#8b949e] dark:hover:text-[#2f81f7]"
                    onClick={() => {
                      onDocumentationClick();
                      setIsOpen(false);
                    }}
                  >
                    Documentation
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-[#57606a] hover:text-[#0969da] dark:text-[#8b949e] dark:hover:text-[#2f81f7]"
                    onClick={() => {
                      onStatusClick();
                      setIsOpen(false);
                    }}
                  >
                    Status
                  </Button>
                  <a
                    href="https://github.com/is-it-fake/is-it-fake.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 text-[#57606a] hover:text-[#0969da] dark:text-[#8b949e] dark:hover:text-[#2f81f7] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="h-5 w-5"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
