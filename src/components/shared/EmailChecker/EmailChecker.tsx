import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Copy, AlertTriangle, Clock } from "lucide-react";
import { ResponsePreview } from "@/components/shared/ResponsePreview/ResponsePreview";

interface EmailCheckerProps {
  serverStatus: "online" | "offline";
}

export function EmailChecker({ serverStatus }: EmailCheckerProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    email: string;
    valid: boolean;
    message: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [localOperatingHours, setLocalOperatingHours] = useState<{
    start: string;
    end: string;
  }>({ start: "", end: "" });

  useEffect(() => {
    // Convert Bangladesh time (UTC+6) to local time
    const convertToLocalTime = () => {
      const now = new Date();
      const bdOffset = 6; // Bangladesh is UTC+6
      const localOffset = -now.getTimezoneOffset() / 60;
      const offsetDiff = localOffset - bdOffset;

      const bdStart = new Date();
      bdStart.setHours(11, 0, 0); // 11:00 AM BD time
      const localStart = new Date(
        bdStart.getTime() + offsetDiff * 60 * 60 * 1000
      );

      const bdEnd = new Date();
      bdEnd.setHours(22, 0, 0); // 10:00 PM BD time
      const localEnd = new Date(bdEnd.getTime() + offsetDiff * 60 * 60 * 1000);

      setLocalOperatingHours({
        start: localStart.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
        end: localEnd.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      });
    };

    convertToLocalTime();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailCheck = async () => {
    setInputError(null);

    if (!email) {
      setInputError("Please enter an email address");
      return;
    }

    if (!validateEmail(email)) {
      setInputError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to check email");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to check email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#d0d7de] dark:border-[#30363d] bg-white dark:bg-[#0d1117] shadow-lg">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {serverStatus === "offline" && (
          <div className="flex flex-col space-y-4 rounded-lg bg-red-50/80 dark:bg-red-900/10 p-4 sm:p-5 border border-red-200 dark:border-red-900/30">
            <div className="flex items-start gap-x-3">
              <div className="rounded-full bg-red-100 dark:bg-red-500/10 p-2 ring-1 ring-red-200 dark:ring-red-500/20">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-red-700 dark:text-red-400">
                  System Offline
                </h4>
                <p className="text-sm leading-relaxed text-red-600/90 dark:text-red-300/90">
                  Our service operates on limited resources (running on a home
                  laptop in Bangladesh) and is available during specific hours.
                  Please try again during operating hours. We appreciate your
                  understanding of our resource constraints.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-md bg-red-100/50 dark:bg-red-500/5 px-4 py-3 border border-red-200/50 dark:border-red-500/10">
              <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
                <span className="text-sm font-medium text-red-700 dark:text-red-400">
                  Operating Hours:
                </span>
                <span className="text-sm text-red-600/90 dark:text-red-300/90">
                  {localOperatingHours.start} - {localOperatingHours.end}
                </span>
              </div>
            </div>
          </div>
        )}

        <h3 className="text-lg font-semibold text-[#24292f] dark:text-[#c9d1d9]">
          Check Email
        </h3>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0969da]/10 to-[#2f81f7]/10 dark:from-[#2f81f7]/10 dark:to-[#58a6ff]/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter email address"
              className={`h-10 sm:h-12 text-sm sm:text-base pr-[4.5rem] sm:pr-[6.5rem] font-mono bg-white dark:bg-[#0d1117] border-[#d0d7de] dark:border-[#30363d] rounded-lg shadow-sm transition-all duration-200 hover:border-[#0969da] dark:hover:border-[#2f81f7] focus:border-[#0969da] dark:focus:border-[#2f81f7] focus:ring-2 focus:ring-[#0969da]/20 dark:focus:ring-[#2f81f7]/20 ${
                inputError
                  ? "border-[#cf222e] dark:border-[#f85149] focus:border-[#cf222e] dark:focus:border-[#f85149] focus:ring-[#cf222e]/20 dark:focus:ring-[#f85149]/20"
                  : ""
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setInputError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEmailCheck();
                }
              }}
              disabled={serverStatus === "offline"}
            />
            {inputError && (
              <div className="absolute -bottom-5 left-0 text-xs text-[#cf222e] dark:text-[#f85149]">
                {inputError}
              </div>
            )}
            <div className="absolute right-1 top-1 flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 sm:h-10 w-8 sm:w-10 px-0 rounded-md text-[#57606a] hover:text-[#24292f] dark:text-[#8b949e] dark:hover:text-[#c9d1d9] hover:bg-[#f6f8fa] dark:hover:bg-[#161b22] transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(email);
                }}
                title="Copy to clipboard"
                disabled={serverStatus === "offline"}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                className={`h-8 sm:h-10 px-3 sm:px-4 rounded-md font-medium transition-all duration-200 ${
                  loading || serverStatus === "offline"
                    ? "bg-[#24292f]/90 dark:bg-[#1f2428]/90 cursor-not-allowed text-white"
                    : "bg-[#24292f] text-white dark:bg-[#1f2428] hover:bg-[#1f2428] dark:hover:bg-[#2d333b] hover:shadow-md hover:shadow-[#24292f]/10 dark:hover:shadow-[#1f2428]/10 active:transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#24292f]/20 dark:focus:ring-[#1f2428]/20"
                }`}
                onClick={handleEmailCheck}
                disabled={loading || serverStatus === "offline"}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 sm:h-4 sm:w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-xs sm:text-sm">Checking</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">Search</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        <ResponsePreview error={error} result={result} />
      </div>
    </div>
  );
}
