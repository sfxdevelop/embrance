import { cn } from "~/lib/utils";

interface CustomizationTimelineProps {
  steps: string[];
  currentStepIndex: number;
}

export function CustomizationTimeline({
  steps,
  currentStepIndex,
}: CustomizationTimelineProps) {
  return (
    <ul className={cn("md:w-2/3 flex items-center justify-between gap-2")}>
      {steps.map((item, index) => {
        return (
          <li key={item} className={cn("flex flex-col items-center gap-1")}>
            <div
              className={cn(
                "size-8 border-2 rounded-full border-primary/35 flex flex-col justify-center items-center text-primary",
                index <= currentStepIndex && "border-primary",
              )}
            >
              {index + 1}
            </div>
            <p
              className={cn(
                "text-xs font-medium",
                index <= currentStepIndex && "text-primary",
              )}
            >
              {item}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
