"use client"

import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

const Share = ({shareUrl} : {shareUrl: string}) => {
return (
    <div className="flex w-full space-x-2">
        <Input 
          value={shareUrl} 
          readOnly 
          className="flex-grow"
        />
        <Button 
          onClick={() => navigator.clipboard.writeText(shareUrl)}
        >
          Copy
        </Button>
    </div>
  )
}

export default Share