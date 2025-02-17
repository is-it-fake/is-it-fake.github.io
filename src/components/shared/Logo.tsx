import Link from "next/link";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-medium">
      <motion.div
        initial={{ scale: 0.8, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="flex items-center justify-center rounded-lg bg-gradient-to-br from-[#0969da] to-[#2f81f7] p-2 text-white shadow-lg dark:from-[#2f81f7] dark:to-[#58a6ff]"
      >
        <Mail className="h-5 w-5" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center"
      >
        <span className="text-lg font-bold text-[#24292f] dark:text-[#c9d1d9]">
          Isit
        </span>
        <span className="text-lg font-bold text-[#0969da] dark:text-[#2f81f7]">
          Fake
        </span>
      </motion.div>
    </Link>
  );
}
