import { Logo } from "@/components/shared/Logo";

export function Footer() {
  return (
    <footer className="border-t border-[#d0d7de] dark:border-[#30363d] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-4">
            <Logo />
            <div className="hidden sm:block h-4 w-px bg-[#d0d7de] dark:bg-[#30363d]" />
            <div className="text-xs sm:text-sm text-[#57606a] dark:text-[#8b949e]">
              © 2024 IsItFake Email Verification
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-xs sm:text-sm text-[#57606a] hover:text-[#0969da] dark:text-[#8b949e] dark:hover:text-[#2f81f7]"
            >
              API
            </a>
            <a
              href="#"
              className="text-xs sm:text-sm text-[#57606a] hover:text-[#0969da] dark:text-[#8b949e] dark:hover:text-[#2f81f7]"
            >
              Status
            </a>
            <a
              href="https://github.com/is-it-fake/is-it-fake.github.io"
              className="text-xs sm:text-sm text-[#57606a] hover:text-[#0969da] dark:text-[#8b949e] dark:hover:text-[#2f81f7]"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
