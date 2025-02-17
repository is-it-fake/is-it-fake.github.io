import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options } from "rehype-pretty-code";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: FC<CodeBlockProps> = ({
  code,
  language,
  title,
  showLineNumbers = false,
}) => {
  const { theme } = useTheme();
  const [processedCode, setProcessedCode] = useState("");

  useEffect(() => {
    const processCode = async () => {
      // Create a markdown code block with the language
      const markdownCode = `\`\`\`${language}\n${code}\n\`\`\``;

      const options: Options = {
        theme: theme === "dark" ? "github-dark" : "github-light",
        keepBackground: false,
        grid: true,
      };

      // Process the code through rehype-pretty-code
      const result = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePrettyCode, options)
        .use(rehypeStringify)
        .process(markdownCode);

      setProcessedCode(result.toString());
    };

    processCode();
  }, [code, language, theme]);

  return (
    <div className="rounded-lg border border-[#d0d7de] dark:border-[#30363d] bg-white dark:bg-[#0d1117] shadow-sm">
      {title && (
        <div className="flex items-center justify-between border-b border-[#d0d7de] dark:border-[#30363d] px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-destructive/20" />
            <div className="h-3 w-3 rounded-full bg-warning/20" />
            <div className="h-3 w-3 rounded-full bg-success/20" />
          </div>
          <span className="text-xs text-[#57606a] dark:text-[#8b949e]">
            {title}
          </span>
        </div>
      )}
      <div
        data-rehype-pretty-code-fragment=""
        className="overflow-x-auto text-[13px] leading-6"
      >
        <pre
          className="my-0 py-4"
          data-language={language}
          data-theme={theme}
          data-line-numbers={showLineNumbers}
        >
          <code
            className={`language-${language} grid`}
            data-language={language}
            data-theme={theme}
            data-line-numbers={showLineNumbers}
            dangerouslySetInnerHTML={{ __html: processedCode }}
          />
        </pre>
      </div>
    </div>
  );
};
