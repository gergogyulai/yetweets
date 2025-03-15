"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowLeft, RefreshCw, Search } from "lucide-react";
import { motion } from "framer-motion";
import { config } from "@/lib/siteconfig";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height,4.1rem))] flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4 text-foreground">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-2xl flex-col items-center space-y-8 text-center"
      >
        <motion.div
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          whileHover={{ 
            scale: 1.05,
            rotate: [-1, 1, -1, 1, 0],
            transition: { duration: 0.5 }
          }}
        >
          <Image 
            src="/not-found.jpg" 
            width={300} 
            height={300} 
            alt="404" 
            className="rounded-xl shadow-2xl" 
          />
        </motion.div>
        
        <div className="space-y-4">
          <motion.h1 
            className="text-4xl font-bold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Oops! Tweet Not Found
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <p className="text-xl text-muted-foreground">
              {"The tweet you're looking for seems to have flown away."}
            </p>
            <p className="text-muted-foreground">
              This could be because:
            </p>
            <ul className="list-disc text-sm text-muted-foreground mx-auto w-fit text-left">
              <li>{"The tweet doesn't exist in our archive"}</li>
              <li>{"It hasn't been archived yet"}</li>
              <li>The URL may be incorrect</li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg pt-6"
        >
          <Button asChild size={"lg"} className="gap-2 group">
            <Link href="/archive">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Archive
            </Link>
          </Button>
          
          <Button asChild variant="outline" size={"lg"} className="gap-2 group">
            <Link href="/search">
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Search
            </Link>
          </Button>
          
          <Button asChild variant="secondary" size={"lg"} className="gap-2 group">
            <Link href={config.submitGuide} target="_blank">
              <RefreshCw className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              Submit
            </Link>
          </Button>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-muted-foreground pt-8"
        >
          Error Code: 404 - If you believe this is a mistake, please submit an issue on <Link className="underline" href={config.githubWebRepoUrl + "/issues/new"} target="_blank">GitHub</Link>.
        </motion.p>
      </motion.div>
    </div>
  );
}
