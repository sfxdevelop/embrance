import { cn } from "~/lib/utils";

export function CustomizationFormSection() {
  return (
    <section className={cn("relative overflow-hidden")}>
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 pb-20 md:pb-28 relative flex flex-col items-center gap-8",
        )}
      ></div>
    </section>
  );
}
