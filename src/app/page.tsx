"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { EmailChecker } from "@/components/shared/EmailChecker/EmailChecker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { CodeBlock } from "@/components/shared/CodeBlock/CodeBlock";
import codeExamples from "@/data/code-examples.json";

// Motion components
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;

// Shared animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function LandingPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"curl" | "js" | "python" | "node">(
    "curl"
  );
  const [serverStatus, setServerStatus] = useState<"online" | "offline">(
    "online"
  );
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checkServerHealth = async () => {
    try {
      const response = await fetch("https://mail.isitfake.xyz/health");
      if (response.ok) {
        setServerStatus("online");
      } else {
        setServerStatus("offline");
      }
    } catch (error) {
      console.error("Error checking server health:", error);
      setServerStatus("offline");
    }
    setLastChecked(new Date());
  };

  useEffect(() => {
    checkServerHealth();
    // Check health status every 1 hour
    const interval = setInterval(checkServerHealth, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-visible" ref={heroRef}>
        <MotionDiv
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="relative rounded-b-[3rem] bg-gradient-to-b from-background via-[#f6f8fa]/50 dark:via-[#161b22]/50 to-background pb-12 sm:pb-24 pt-24 sm:pt-32 lg:pt-36"
        >
          {/* Background Patterns */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,#0969da_50%,transparent_51%,transparent_100%)] dark:bg-[linear-gradient(to_right,transparent_0%,transparent_49%,#2f81f7_50%,transparent_51%,transparent_100%)] opacity-[0.1] bg-[length:2rem_2rem]" />
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_49%,#0969da_50%,transparent_51%,transparent_100%)] dark:bg-[linear-gradient(transparent_0%,transparent_49%,#2f81f7_50%,transparent_51%,transparent_100%)] opacity-[0.1] bg-[length:2rem_2rem]" />
          <div className="absolute inset-0 bg-[radial-gradient(#0969da_1px,transparent_1px)] dark:bg-[radial-gradient(#2f81f7_1px,transparent_1px)] opacity-[0.1] bg-[size:24px_24px]" />
          <div className="absolute -top-20 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0969da]/[0.08] via-[#0969da]/[0.04] to-background dark:from-[#2f81f7]/[0.08] dark:via-[#2f81f7]/[0.04] rounded-b-3xl" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Left side - Text content */}
                <MotionDiv
                  variants={fadeInUp}
                  className="flex flex-col justify-center space-y-6 sm:space-y-8"
                >
                  <MotionDiv variants={fadeInUp} className="relative w-fit">
                    <div className="absolute -inset-x-1 -inset-y-2 bg-gradient-to-r from-brand/20 to-info/20 blur-xl" />
                    <div className="relative inline-flex items-center gap-2 rounded-full bg-[#f6f8fa] dark:bg-[#161b22] px-4 py-1.5 backdrop-blur-sm">
                      <div className="h-2 w-2 rounded-full bg-[#0969da] dark:bg-[#2f81f7] animate-pulse" />
                      <span className="text-sm font-medium text-[#24292f] dark:text-[#c9d1d9]">
                        IsItFake - Email Verification
                      </span>
                    </div>
                  </MotionDiv>

                  <MotionH2
                    variants={fadeInUp}
                    className="text-gradient max-w-2xl bg-clip-text text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight"
                  >
                    Is it a fake email?
                  </MotionH2>

                  <MotionP
                    variants={fadeInUp}
                    className="max-w-xl text-sm sm:text-base text-[#57606a] dark:text-[#8b949e]"
                  >
                    Quick and easy way to search email information.
                    <br className="hidden sm:inline" />
                    Verify email addresses instantly with our powerful API.
                  </MotionP>
                </MotionDiv>

                {/* Right side - Email checker card */}
                <MotionDiv variants={fadeInUp} className="lg:pt-8">
                  <EmailChecker serverStatus={serverStatus} />
                </MotionDiv>
              </div>
            </div>
          </div>
        </MotionDiv>
      </section>

      {/* API Documentation */}
      <section
        id="docs"
        className="py-24 bg-gradient-to-b from-background via-[#f6f8fa]/50 dark:via-[#161b22]/50 to-background"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              API Documentation
            </h2>

            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "curl" | "js" | "python" | "node")
              }
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <h3 className="text-xl font-semibold mb-4">Code Examples</h3>
                <TabsList>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="js">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="node">Node.js</TabsTrigger>
                </TabsList>
              </div>

              <div className="rounded-lg border border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#161b22] shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#d0d7de] dark:border-[#30363d] px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-destructive/20" />
                    <div className="h-3 w-3 rounded-full bg-warning/20" />
                    <div className="h-3 w-3 rounded-full bg-success/20" />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => {
                      const example =
                        activeTab === "js"
                          ? codeExamples.javascript
                          : codeExamples[activeTab];
                      handleCopy(example.code);
                    }}
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>

                <TabsContent value="curl" className="mt-0">
                  <CodeBlock
                    code={codeExamples.curl.code}
                    language={codeExamples.curl.language}
                    showLineNumbers={false}
                    noBorder
                  />
                </TabsContent>

                <TabsContent value="js" className="mt-0">
                  <CodeBlock
                    code={codeExamples.javascript.code}
                    language={codeExamples.javascript.language}
                    showLineNumbers={false}
                    noBorder
                  />
                </TabsContent>

                <TabsContent value="python" className="mt-0">
                  <CodeBlock
                    code={codeExamples.python.code}
                    language={codeExamples.python.language}
                    showLineNumbers={false}
                    noBorder
                  />
                </TabsContent>

                <TabsContent value="node" className="mt-0">
                  <CodeBlock
                    code={codeExamples.node.code}
                    language={codeExamples.node.language}
                    showLineNumbers={false}
                    noBorder
                  />
                </TabsContent>
              </div>
            </Tabs>

            {/* API Reference */}
            <div className="mt-16 space-y-8">
              <h3 className="text-xl font-semibold">API Reference</h3>

              <div className="space-y-6">
                <div className="rounded-lg bg-[#f6f8fa] dark:bg-[#161b22] shadow-sm p-6 border border-[#d0d7de] dark:border-[#30363d]">
                  <h4 className="text-sm font-medium text-[#24292f] dark:text-[#c9d1d9] mb-4">
                    Endpoint
                  </h4>
                  <div className="font-mono text-sm bg-[#ffffff] dark:bg-[#0d1117] p-4 rounded-md text-left border border-[#d0d7de] dark:border-[#30363d]">
                    <span className="text-[#0969da] dark:text-[#2f81f7]">
                      POST
                    </span>{" "}
                    <span className="text-[#24292f] dark:text-[#c9d1d9]">
                      https://mail.isitfake.xyz/check-email
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#f6f8fa] dark:bg-[#161b22] shadow-sm p-6 border border-[#d0d7de] dark:border-[#30363d]">
                  <h4 className="text-sm font-medium text-[#24292f] dark:text-[#c9d1d9] mb-4">
                    Request Body
                  </h4>
                  <CodeBlock
                    code={codeExamples.request.code}
                    language={codeExamples.request.language}
                    showLineNumbers={false}
                  />
                </div>

                <div className="rounded-lg bg-[#f6f8fa] dark:bg-[#161b22] shadow-sm p-6 border border-[#d0d7de] dark:border-[#30363d]">
                  <h4 className="text-sm font-medium text-[#24292f] dark:text-[#c9d1d9] mb-4">
                    Response
                  </h4>
                  <CodeBlock
                    code={codeExamples.response.code}
                    language={codeExamples.response.language}
                    showLineNumbers={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Status */}
      <section
        id="status"
        className="py-12 bg-gradient-to-b from-[#f6f8fa]/50 to-background dark:from-[#161b22]/50"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg border border-[#d0d7de] bg-white shadow-sm dark:border-[#30363d] dark:bg-[#0d1117] p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-[#24292f] dark:text-[#c9d1d9]">
                    System Status
                  </h3>
                  <p className="text-sm text-[#57606a] dark:text-[#8b949e]">
                    Real-time performance metrics and system health
                  </p>
                </div>
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                    serverStatus === "online"
                      ? "bg-[#ddf4e4] dark:bg-[#1b4721] border-[#a6e9b7] dark:border-[#238636]"
                      : "bg-[#ffebe9] dark:bg-[#442c2d] border-[#ffaba8] dark:border-[#f85149]"
                  } border`}
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      serverStatus === "online"
                        ? "bg-[#1a7f37] dark:bg-[#3fb950]"
                        : "bg-[#cf222e] dark:bg-[#f85149]"
                    } animate-pulse`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      serverStatus === "online"
                        ? "text-[#1a7f37] dark:text-[#3fb950]"
                        : "text-[#cf222e] dark:text-[#f85149]"
                    }`}
                  >
                    {serverStatus === "online"
                      ? "All Systems Operational"
                      : "Systems Offline"}
                  </span>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-[#24292f] dark:text-[#c9d1d9]">
                        API Response Time
                      </h4>
                      <span
                        className={`text-sm font-medium ${
                          serverStatus === "online"
                            ? "text-[#1a7f37] dark:text-[#3fb950]"
                            : "text-[#cf222e] dark:text-[#f85149]"
                        }`}
                      >
                        {serverStatus === "online"
                          ? "Excellent"
                          : "Unavailable"}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[#f6f8fa] dark:bg-[#161b22]">
                      <div
                        className={`h-2 rounded-full ${
                          serverStatus === "online"
                            ? "bg-[#2da44e] dark:bg-[#238636] w-[95%]"
                            : "bg-[#cf222e] dark:bg-[#f85149] w-0"
                        }`}
                      />
                    </div>
                    <p className="text-xs text-[#57606a] dark:text-[#8b949e]">
                      {serverStatus === "online"
                        ? "Average: 120ms"
                        : "Service Unavailable"}
                    </p>
                  </div>
                </div>

                <div className="rounded-md border border-[#d0d7de] dark:border-[#30363d] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-[#24292f] dark:text-[#c9d1d9]">
                      Uptime
                    </h4>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        serverStatus === "online"
                          ? "bg-[#ddf4e4] dark:bg-[#1b4721] text-[#1a7f37] dark:text-[#3fb950]"
                          : "bg-[#ffebe9] dark:bg-[#442c2d] text-[#cf222e] dark:text-[#f85149]"
                      }`}
                    >
                      {serverStatus === "online" ? "99.9%" : "0%"}
                    </span>
                  </div>
                  <p className="text-sm text-[#57606a] dark:text-[#8b949e]">
                    Last 30 days
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#d0d7de] dark:border-[#30363d]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#57606a] dark:text-[#8b949e]">
                      Last checked:
                    </span>
                    <span className="text-sm text-[#24292f] dark:text-[#c9d1d9]">
                      {lastChecked.toLocaleTimeString()}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={checkServerHealth}
                  >
                    Refresh Status
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
