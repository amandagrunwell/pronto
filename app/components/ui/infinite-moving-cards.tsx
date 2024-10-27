"use client";
import { cn } from "@/lib/utils";
import { StarIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useRef, useState } from "react";

export const InfiniteMovingCards = ({
  languages,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  languages: {
    language: string;
    image: JSX.Element;
    star: number;
    years: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [isManualScroll, setIsManualScroll] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  // Handle manual scrolling behavior
  const handleScrollStart = () => {
    setIsManualScroll(true);
    if (scrollerRef.current) {
      scrollerRef.current.style.animationPlayState = "paused";
    }
  };

  const handleScrollEnd = () => {
    setIsManualScroll(false);
    if (scrollerRef.current && !pauseOnHover) {
      scrollerRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScrollStart}
      onMouseUp={handleScrollEnd}
      onTouchEnd={handleScrollEnd}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-x-scroll overflow-y-hidden scrollbar-hide [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && !isManualScroll && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {languages.map((item, idx) => (
          <li
            className="flex flex-row text-grayish-light border-2 border-gray-700 p-3 rounded-2xl items-center space-x-5"
            key={idx}
          >
            <div>{item.image}</div>
            <div className="flex flex-col">
              <div>{item.language}</div>
              <div className="text-xl">
                {item.years} Year{item.years > 1 ? "s" : ""}
              </div>
              <div className="flex flex-row">
                {Array.from({ length: item.star }).map((_, index) => (
                  <StarIcon
                    key={`filled-${index}`}
                    className="w-3 text-yellow-300"
                  />
                ))}
                {Array.from({ length: 10 - item.star }).map((_, index) => (
                  <StarIcon key={`empty-${index}`} className="w-3" />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
