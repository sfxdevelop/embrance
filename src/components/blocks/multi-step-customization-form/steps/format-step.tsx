"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import type { FormatFormData } from "~/lib/schemas";
import { api, type ProductFormat } from "~/lib/supabase";
import { cn } from "~/lib/utils";

interface FormatStepProps {
  form: UseFormReturn<FormatFormData>;
}

export function FormatStep({ form }: FormatStepProps) {
  const [formats, setFormats] = useState<ProductFormat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFormats() {
      try {
        const formatsData = await api.getFormats();
        setFormats(formatsData);

        // Auto-select the first format as a reasonable default if none is selected
        if (formatsData.length > 0 && !form.getValues("selectedFormatId")) {
          form.setValue("selectedFormatId", formatsData[0].id);
        }
      } catch (error) {
        console.error("Failed to load formats:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFormats();
  }, [form]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading formats...</p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="selectedFormatId"
          render={({ field }) => (
            <FormItem>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {formats.map((format) => (
                  <div key={format.id} className="relative">
                    <RadioGroupItem
                      value={format.id}
                      id={format.id}
                      className="sr-only"
                    />
                    <label
                      htmlFor={format.id}
                      className={cn(
                        "cursor-pointer block transition-all duration-200",
                        "hover:scale-105 hover:shadow-lg",
                        field.value === format.id &&
                          "ring-2 ring-primary ring-offset-2",
                      )}
                    >
                      <Card className="overflow-hidden h-full">
                        <div className="aspect-[16/9] relative">
                          {format.media_refs[0] && (
                            <Image
                              src={format.media_refs[0]}
                              alt={format.name}
                              fill
                              className="object-cover"
                            />
                          )}
                          {field.value === format.id && (
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
                        <CardHeader>
                          <CardTitle className="text-xl">
                            {format.name}
                          </CardTitle>
                          <CardDescription>
                            {format.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Features:</h4>
                            <ul className="space-y-1">
                              {format.features.map((feature) => (
                                <li
                                  key={feature}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <svg
                                    className="w-4 h-4 text-green-500 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <title>Feature included</title>
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-4 border-t">
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="text-sm">
                                {format.cta_text}
                              </Badge>
                            </div>
                            {format.footer_text && (
                              <p className="text-xs text-muted-foreground mt-2">
                                {format.footer_text}
                              </p>
                            )}
                          </div>
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

        {formats.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No formats available at the moment.
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
