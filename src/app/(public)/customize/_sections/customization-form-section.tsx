"use client";

import { useState } from "react";

import { CustomizationTimeline } from "~/components/blocks/customization-timeline";
import { MultiStepCustomizationForm } from "~/components/blocks/multi-step-customization-form";
import { cn } from "~/lib/utils";

export function CustomizationFormSection() {
  const steps = ["Memorial Info", "Memorial Kit", "Theme", "Format", "Review"];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Get current step configuration
  const getCurrentStepConfig = () => {
    const stepNames = [
      "Memorial Information",
      "Memorial Kit",
      "Choose Theme",
      "Select Format",
      "Review & Confirm",
    ];

    const stepDescriptions = [
      "Tell us about your loved one to personalize their memorial",
      "Select the products you'd like to include in your memorial kit",
      "Select a beautiful design theme for your memorial products",
      "Choose between digital files or physical prints",
      "Review your selections and confirm your order",
    ];

    return {
      title: stepNames[currentStepIndex] || "Memorial Information",
      description:
        stepDescriptions[currentStepIndex] ||
        "Tell us about your loved one to personalize their memorial",
    };
  };

  const currentStep = getCurrentStepConfig();

  return (
    <section className={cn("relative overflow-hidden")}>
      <div className={cn("border-y")}>
        <div
          className={cn(
            "max-w-7xl mx-auto px-4 py-4 flex flex-col items-center",
          )}
        >
          <CustomizationTimeline
            steps={steps}
            currentStepIndex={currentStepIndex}
          />
        </div>
      </div>
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 pt-16 pb-20 md:pb-28 relative flex flex-col items-center gap-8",
        )}
      >
        <div className={cn("flex flex-col items-center text-center space-y-4")}>
          <h2
            className={cn("text-3xl font-bold font-[--font-playfair-display]")}
          >
            {currentStep.title}
          </h2>
          <p className={cn("text-lg max-w-2xl")}>{currentStep.description}</p>
        </div>
        <MultiStepCustomizationForm
          steps={steps}
          currentStepIndex={currentStepIndex}
          setCurrentStepIndex={setCurrentStepIndex}
        />
      </div>
    </section>
  );
}
