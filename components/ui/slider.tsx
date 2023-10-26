"use client";

import * as React from "react";
import Image from "next/image";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { christopher } from "@/public/assets";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    orientation="vertical"
    ref={ref}
    className={cn(
      "relative flex w-2 h-40 touch-none select-none items-center justify-center -translate-x-1",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-40 w-2 grow overflow-hidden rounded-full bg-sc-5 dark:bg-dark-4">
      <SliderPrimitive.Range className="bg-primary absolute h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="border-primary block h-10 w-10 rounded-full border-2 bg-background ring-offset-background transition duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
      <Image
        src={christopher}
        alt="christopher"
        height={40}
        width={40}
        className="rounded-full"
      />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
