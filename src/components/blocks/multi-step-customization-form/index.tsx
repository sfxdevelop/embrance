"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  type CompleteFormData,
  type FormatFormData,
  formatSchema,
  type MemorialInfoFormData,
  type MemorialKitFormData,
  memorialInfoSchema,
  memorialKitSchema,
  type ThemeFormData,
  themeSchema,
} from "~/lib/schemas";
import { orderProcessing } from "~/lib/supabase";
import { cn } from "~/lib/utils";
import { FormatStep } from "./steps/format-step";
// Import step components
import { MemorialInfoStep } from "./steps/memorial-info-step";
import { MemorialKitStep } from "./steps/memorial-kit-step";
import { ReviewStep } from "./steps/review-step";
import { ThemeStep } from "./steps/theme-step";

interface MultiStepCustomizationFormProps {
  steps: string[];
  currentStepIndex: number;
  setCurrentStepIndex: (index: number) => void;
}

export function MultiStepCustomizationForm({
  steps,
  currentStepIndex,
  setCurrentStepIndex,
}: Readonly<MultiStepCustomizationFormProps>) {
  // Form state for each step with reasonable defaults
  const [formData, setFormData] = useState<{
    memorialInfo: Partial<MemorialInfoFormData>;
    memorialKit: Partial<MemorialKitFormData>;
    theme: Partial<ThemeFormData>;
    format: Partial<FormatFormData>;
  }>({
    memorialInfo: {
      fullName: "",
      photos: [],
    },
    memorialKit: {
      cartItems: [],
    },
    theme: {
      selectedThemeId: "",
    },
    format: {
      selectedFormatId: "",
    },
  });

  // Individual form instances for each step with defaults
  const memorialInfoForm = useForm<MemorialInfoFormData>({
    resolver: zodResolver(memorialInfoSchema),
    defaultValues: {
      fullName: "",
      photos: [],
      // DOB and DOP are optional but must be in past if provided
      // DOM is required and can be any date
    },
  });

  const memorialKitForm = useForm<MemorialKitFormData>({
    resolver: zodResolver(memorialKitSchema),
    defaultValues: {
      cartItems: [],
    },
  });

  const themeForm = useForm<ThemeFormData>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      selectedThemeId: "",
    },
  });

  const formatForm = useForm<FormatFormData>({
    resolver: zodResolver(formatSchema),
    defaultValues: {
      selectedFormatId: "",
    },
  });

  const validateCurrentStep = async (): Promise<boolean> => {
    switch (currentStepIndex) {
      case 0: {
        // Memorial Info
        const memorialInfoValid = await memorialInfoForm.trigger();
        if (memorialInfoValid) {
          const data = memorialInfoForm.getValues();
          setFormData((prev) => ({ ...prev, memorialInfo: data }));
        }
        return memorialInfoValid;
      }

      case 1: {
        // Memorial Kit
        const memorialKitValid = await memorialKitForm.trigger();
        if (memorialKitValid) {
          const data = memorialKitForm.getValues();
          setFormData((prev) => ({ ...prev, memorialKit: data }));
        }
        return memorialKitValid;
      }

      case 2: {
        // Theme
        const themeValid = await themeForm.trigger();
        if (themeValid) {
          const data = themeForm.getValues();
          setFormData((prev) => ({ ...prev, theme: data }));
        }
        return themeValid;
      }

      case 3: {
        // Format
        const formatValid = await formatForm.trigger();
        if (formatValid) {
          const data = formatForm.getValues();
          setFormData((prev) => ({ ...prev, format: data }));
        }
        return formatValid;
      }

      case 4: // Review
        return true; // Review step doesn't need validation

      default:
        return false;
    }
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSubmit = async () => {
    // Final validation of all steps
    const allValid = await Promise.all([
      memorialInfoForm.trigger(),
      memorialKitForm.trigger(),
      themeForm.trigger(),
      formatForm.trigger(),
    ]);

    if (allValid.every(Boolean)) {
      const completeData: CompleteFormData = {
        memorialInfo: memorialInfoForm.getValues(),
        memorialKit: memorialKitForm.getValues(),
        theme: themeForm.getValues(),
        format: formatForm.getValues(),
      };

      try {
        // TODO: Get actual profile ID from authentication
        const profileId = "temp-profile-id"; // Replace with actual user profile ID

        console.log("Processing order with data:", completeData);

        // Process form submission and create order items
        const orderItems = await orderProcessing.processFormSubmission(
          completeData,
          profileId,
        );

        console.log("Order created successfully:", orderItems);

        // TODO: Redirect to success page or show success message
        alert("Order submitted successfully!");
      } catch (error) {
        console.error("Failed to submit order:", error);
        alert("Failed to submit order. Please try again.");
      }
    }
  };

  const renderCurrentStep = () => {
    switch (currentStepIndex) {
      case 0:
        return <MemorialInfoStep form={memorialInfoForm} />;
      case 1:
        return <MemorialKitStep form={memorialKitForm} />;
      case 2:
        return <ThemeStep form={themeForm} />;
      case 3:
        return <FormatStep form={formatForm} />;
      case 4:
        return <ReviewStep formData={formData as CompleteFormData} />;
      default:
        return null;
    }
  };

  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="space-y-8">
        {renderCurrentStep()}

        {/* Navigation */}
        <div className={cn("flex items-center justify-between pt-6")}>
          <div>
            {!isFirstStep && (
              <Button
                onClick={handleBack}
                variant="outline"
                size="xl"
                className={cn("font-bold")}
              >
                <ArrowLeftIcon />
                <span>Back</span>
              </Button>
            )}
          </div>
          <div>
            {isLastStep ? (
              <Button
                onClick={handleSubmit}
                size="xl"
                className={cn("font-bold")}
              >
                <span>Complete Order</span>
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                size="xl"
                className={cn("font-bold")}
              >
                <span>Continue</span>
                <ArrowRightIcon />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
