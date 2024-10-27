import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface LabelInputContainerProps {
  children: ReactNode;
  className?: string;
}

const LabelInputContainer: FC<LabelInputContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default LabelInputContainer;
