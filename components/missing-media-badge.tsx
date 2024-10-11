import { Info } from 'lucide-react'
import React from 'react'
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from './ui/tooltip'

export default function MissingMedia({ hasMissingMedia }: { hasMissingMedia: boolean }) {
  if(!hasMissingMedia) return null
  return (
    <div className='flex items-center gap-1'>
      <div>
        <p className="text-muted-foreground text-sm">missing media</p>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Info size={12} />
          </TooltipTrigger>
          <TooltipContent className=' max-w-80'>
            <p className="text-sm">
              {"This tweet contains image(s) or video(s) that are not available, mediafiles are not yet archived actively."}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}