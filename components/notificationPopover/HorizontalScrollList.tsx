"use client";

import { notificationTabs } from "@/constants";
import React, { useRef, useState } from "react";

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
      className="flex h-full cursor-pointer select-none justify-center gap-[1.625rem] overflow-x-auto px-8"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {notificationTabs.map((tab) => {
        const IconComponent = tab.icon;

        return (
          <p
            key={tab.title}
            className={`flex h-full items-center justify-start gap-2 whitespace-nowrap pb-2 text-start ${
              tab.active && "border-b border-blue"
            }`}
          >
            {IconComponent && <IconComponent />}
            <span
              className={`semibold-16 ${
                tab.active ? "text-blue" : "text-sc-2 dark:text-sc-3"
              }`}
            >
              {tab.title}
            </span>
          </p>
        );
      })}
    </div>
  );
};

export default HorizontalScrollList;
