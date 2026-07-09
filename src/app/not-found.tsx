"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 gradient-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.p
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="text-8xl font-bold text-primary/20 mb-4"
        >
          404
        </motion.p>
        <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className={buttonVariants({ variant: "outline", className: "rounded-xl" })}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Link>
          <Link
            href="/dashboard"
            className={buttonVariants({ className: "rounded-xl" })}
          >
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
