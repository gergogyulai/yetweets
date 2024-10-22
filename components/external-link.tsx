import React from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { truncateToDomain } from "@/lib/utils";

export default function ExternalLink({
  href,
  target,
  children,
}: {
  href: string | URL;
  target: "_self" | "_blank" | "_parent" | "_top";
  children: React.ReactNode;
}) {
  const displayDomain = truncateToDomain(href.toString());

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="font-mono">
        <AlertDialogHeader>
          <AlertDialogTitle>You are about to leave the site</AlertDialogTitle>
          <AlertDialogDescription>
            This link leads to an external site ({displayDomain}). Are you sure
            you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Back</AlertDialogCancel>
          <Link
            href={href.toString()}
            target={target}
            rel="noopener noreferrer"
          >
            <AlertDialogAction>Go</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
