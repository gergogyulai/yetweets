"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import findEra from "@/lib/era";

export default function Era({ date }: { date: Date }) {
  const [open, setOpen] = React.useState(false);
  const kanyeEra = findEra(date);
  const eras = Array.isArray(kanyeEra) ? kanyeEra : [kanyeEra];

  const mainEras = eras.slice(0, 3);
  const moreEras = eras.slice(3);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Era</h1>
      <div className="flex flex-wrap gap-2">
        {mainEras.map((era, index) => (
          <Button key={index} variant="outline">
            {era}
          </Button>
        ))}
        {moreEras.length > 0 && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline">+{moreEras.length} More</Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <ScrollArea className="h-72">
                <div className="space-y-2">
                  {moreEras.map((era, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      {era}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
