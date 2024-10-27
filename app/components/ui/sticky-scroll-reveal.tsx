"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LampContainer } from "./lamp";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: JSX.Element;
    description: JSX.Element;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref,
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = ["var(--black)", "var(--gray-950)"];
  const linearGradients = [
    "linear-gradient(to bottom right, #000 , var(--neutral-900) )",
    "linear-gradient(to bottom right,#010101, #bfbfbf))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <>
      <motion.div
        animate={{
          backgroundColor:
            backgroundColors[activeCard % backgroundColors.length],
        }}
        className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10"
        ref={ref}
      >
        <div className="div relative flex flex-col items-start px-4">
          <div className="max-w-2xl">
            {content.map((item, index) => (
              <div key={index} className="my-20">
                <motion.h2
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-2xl font-bold text-slate-100"
                >
                  {item.title}
                </motion.h2>
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-kg text-slate-300 max-w-sm mt-10 text-center"
                >
                  {item.description}
                </motion.div>
              </div>
            ))}
            <div className="h-40" />
          </div>
        </div>
        <div
          className={cn(
            "hidden lg:block h-60 w-80 rounded-md bg-neutral-300 sticky top-10 overflow-hidden p-2",
            contentClassName
          )}
        >
          {content[activeCard].content ?? null}
        </div>
      </motion.div>
    </>
  );
};
