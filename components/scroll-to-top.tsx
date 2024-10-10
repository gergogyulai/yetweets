"use client"

import { ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ScrollToTop() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 400) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`fixed bottom-6 right-4 ${showScrollButton ? 'visible' : 'hidden'}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button asChild size={"icon"} onClick={scrollToTop}>
              <ChevronUp size={12} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Scroll to top
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}