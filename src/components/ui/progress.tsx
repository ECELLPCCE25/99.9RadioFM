"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  /*@ts-ignore*/
  indicatorColor,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
<<<<<<< HEAD
        style={{ transform: `translateX(-${100 - (value || 0)}%)`, background:indicatorColor || "auto" }}
=======
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
>>>>>>> ab7343556cfaf925fa7c6bc0a7c79a4429cf88f5
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
