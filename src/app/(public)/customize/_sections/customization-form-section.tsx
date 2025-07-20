import { cn } from "~/lib/utils";
import { MultiStepCustomizationForm } from "~/components/forms/multi-step-customization-form";

export function CustomizationFormSection() {
  return (
    <section className={cn("relative overflow-hidden")}>
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 pb-20 md:pb-28 relative flex flex-col items-center gap-8",
        )}
      >
        <div className={cn("flex flex-col items-center text-center space-y-4")}>
          <h2
            className={cn("text-3xl font-bold font-[--font-playfair-display]")}
          >
            Memorial Information
          </h2>
          <p className={cn("text-lg max-w-2xl")}>
            Tell us about your loved one to personalize their memorial
          </p>
        </div>
        <MultiStepCustomizationForm />
      </div>
    </section>
  );
}
