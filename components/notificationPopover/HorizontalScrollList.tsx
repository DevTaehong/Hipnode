"use client";

import { notificationTabs } from "@/constants";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";

const HorizontalScrollList = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (!containerRef.current) return;

    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="flex cursor-pointer select-none space-x-4 overflow-x-auto"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {notificationTabs.map((tab) => {
        const IconComponent = tab.icon;

        return (
          <Button
            key={tab.title}
            variant="ghost"
            className="flex-none whitespace-nowrap"
          >
            {IconComponent && <IconComponent />}
            {tab.title}
          </Button>
        );
      })}
    </div>
  );
};

export default HorizontalScrollList;
