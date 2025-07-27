"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import type { ThemeFormData } from "~/lib/schemas";
import { api, type ProductTheme } from "~/lib/supabase";
import { cn } from "~/lib/utils";

interface ThemeStepProps {
  form: UseFormReturn<ThemeFormData>;
}

export function ThemeStep({ form }: ThemeStepProps) {
  const [themes, setThemes] = useState<ProductTheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadThemes() {
      try {
        const themesData = await api.getThemes();
        setThemes(themesData);

        // Auto-select the first theme as a reasonable default if none is selected
        if (themesData.length > 0 && !form.getValues("selectedThemeId")) {
          form.setValue("selectedThemeId", themesData[0].id);
        }
      } catch (error) {
        console.error("Failed to load themes:", error);
      } finally {
        setLoading(false);
      }
    }

    loadThemes();
  }, [form]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading themes...</p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="selectedThemeId"
          render={({ field }) => (
            <FormItem>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {themes.map((theme) => (
                  <div key={theme.id} className="relative">
                    <RadioGroupItem
                      value={theme.id}
                      id={theme.id}
                      className="sr-only"
                    />
                    <label
                      htmlFor={theme.id}
                      className={cn(
                        "cursor-pointer block transition-all duration-200",
                        "hover:scale-105 hover:shadow-lg",
                        field.value === theme.id &&
                          "ring-2 ring-primary ring-offset-2",
                      )}
                    >
                      <Card className="overflow-hidden h-full">
                        <div className="aspect-[4/3] relative">
                          {theme.media_refs[0] && (
                            <Image
                              src={theme.media_refs[0]}
                              alt={theme.name}
                              fill
                              className="object-cover"
                            />
                          )}
                          {field.value === theme.id && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <div className="bg-primary text-primary-foreground rounded-full p-2">
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <title>Selected</title>
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            {theme.name}
                          </CardTitle>
                          {theme.prize_adjustment !== 0 && (
                            <div className="text-sm text-muted-foreground">
                              {theme.prize_adjustment > 0 ? "+" : ""}$
                              {theme.prize_adjustment.toFixed(2)} price
                              adjustment
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="pt-0">
                          <CardDescription className="text-sm">
                            {theme.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </label>
                  </div>
                ))}
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        {themes.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No themes available at the moment.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Please contact support if this issue persists.
            </p>
          </div>
        )}
      </div>
    </Form>
  );
}
