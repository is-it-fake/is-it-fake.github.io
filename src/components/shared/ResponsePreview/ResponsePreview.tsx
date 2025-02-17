import { Check, X } from "lucide-react";
import { CodeBlock } from "@/components/shared/CodeBlock/CodeBlock";

interface ResponsePreviewProps {
  error: string | null;
  result: {
    email: string;
    valid: boolean;
    message: string;
  } | null;
}

export function ResponsePreview({ error, result }: ResponsePreviewProps) {
  return (
    <div className="rounded-lg border border-[#d0d7de] dark:border-[#30363d] bg-white dark:bg-[#0d1117] shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between border-b border-[#d0d7de] dark:border-[#30363d] px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-[#24292f] dark:text-[#c9d1d9]">
            Response Preview
          </h3>
          {result &&
            (result.valid ? (
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ddf4e4] dark:bg-[#1b4721] border border-[#a6e9b7] dark:border-[#238636]">
                <Check className="h-3.5 w-3.5 text-[#1a7f37] dark:text-[#3fb950]" />
                <span className="text-xs font-medium text-[#1a7f37] dark:text-[#3fb950]">
                  Valid Email
                </span>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ffe7e7] dark:bg-[#3d1f1f] border border-[#f85149] dark:border-[#f85149]">
                <X className="h-3.5 w-3.5 text-[#b93f3f] dark:text-[#f85149]" />
                <span className="text-xs font-medium text-[#b93f3f] dark:text-[#f85149]">
                  Invalid Email
                </span>
              </div>
            ))}
        </div>
      </div>
      <div className="divide-y divide-[#d0d7de] dark:divide-[#30363d]">
        <div className="p-3 sm:p-4">
          {error ? (
            <CodeBlock
              code={JSON.stringify({ error }, null, 2)}
              language="json"
              showLineNumbers={false}
            />
          ) : result ? (
            <CodeBlock
              code={JSON.stringify(result, null, 2)}
              language="json"
              showLineNumbers={false}
            />
          ) : (
            <CodeBlock
              code={JSON.stringify(
                {
                  email: "user@example.com",
                  valid: "True or False",
                  message: "Hello World",
                },
                null,
                2
              )}
              language="json"
              showLineNumbers={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
