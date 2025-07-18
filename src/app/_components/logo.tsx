import { FlameIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface LogoProps {
  isInverted?: boolean;
}

export function Logo({ isInverted = false }: Readonly<LogoProps>) {
  return (
    <div className={cn("flex items-center gap-3")}>
      <div
        className={cn(
          "p-2.5 rounded-full bg-primary/20 text-primary",
          isInverted && "bg-secondary",
        )}
      >
        <FlameIcon className={cn("size-8")} />
      </div>
      <div className={cn("font-[--font-playfair-display]")}>
        <h1
          className={cn("text-4xl font-medium", isInverted && "text-secondary")}
        >
          {process.env.NEXT_PUBLIC_APP_NAME}
        </h1>
        <p className={cn("font-medium")}>
          {process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        </p>
      </div>
    </div>
  );
}
