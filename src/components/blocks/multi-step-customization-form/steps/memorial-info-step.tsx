"use client";

import { format } from "date-fns";
import { CalendarIcon, GalleryHorizontalEndIcon, UserIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import FileUploads from "~/components/blocks/file-uploads";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import type { MemorialInfoFormData } from "~/lib/schemas";
import { cn } from "~/lib/utils";

interface MemorialInfoStepProps {
  form: UseFormReturn<MemorialInfoFormData>;
}

export function MemorialInfoStep({ form }: MemorialInfoStepProps) {
  return (
    <Form {...form}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle
              className={cn(
                "flex items-center gap-3 text-xl text-secondary-foreground",
              )}
            >
              <UserIcon />
              <span>About Your Loved One</span>
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("space-y-6")}>
            <div className={cn("flex items-center gap-4")}>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className={cn("flex-1")}>
                    <FormLabel className={cn("font-semibold")}>
                      <span>Full Name</span>
                      <span className={cn("-ml-1 text-lg text-destructive")}>
                        *
                      </span>
                    </FormLabel>
                    <FormDescription className={cn("text-xs")}>
                      Enter the name exactly as you want it displayed on all
                      memorial products
                    </FormDescription>
                    <FormControl className={cn("h-12 rounded-lg")}>
                      <Input
                        className={cn("placeholder:text-gray-400")}
                        placeholder="e.g., John Michael Smith"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={cn("flex items-center gap-4")}>
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col">
                    <FormLabel className={cn("font-semibold")}>
                      <span>Date of Birth</span>
                    </FormLabel>
                    <FormDescription className={cn("text-xs")}>
                      Optional - Must be in the past if provided
                    </FormDescription>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className={cn("h-12 rounded-lg")}>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-base text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "P")
                            ) : (
                              <span>Select birth date</span>
                            )}
                            <CalendarIcon className="ml-auto size-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(23, 59, 59, 999); // End of today
                            return (
                              date >= today || date < new Date("1900-01-01")
                            );
                          }}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dop"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col">
                    <FormLabel className={cn("font-semibold")}>
                      <span>Date of Passing</span>
                    </FormLabel>
                    <FormDescription className={cn("text-xs")}>
                      Optional - Must be in the past and after Date of Birth if
                      both provided
                    </FormDescription>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className={cn("h-12 rounded-lg")}>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-base text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "P")
                            ) : (
                              <span>Select passing date</span>
                            )}
                            <CalendarIcon className="ml-auto size-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(23, 59, 59, 999); // End of today
                            return (
                              date >= today || date < new Date("1900-01-01")
                            );
                          }}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle
              className={cn(
                "flex items-center gap-3 text-xl text-secondary-foreground",
              )}
            >
              <CalendarIcon />
              <span>Memorial Event Details</span>
              <span className={cn("text-sm font-normal")}>(Required)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("space-y-6")}>
            <div className={cn("flex items-center gap-4")}>
              <FormField
                control={form.control}
                name="dom"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col">
                    <FormLabel className={cn("font-semibold")}>
                      <span>Memorial Date</span>
                      <span className={cn("-ml-1 text-lg text-destructive")}>
                        *
                      </span>
                    </FormLabel>
                    <FormDescription className={cn("text-xs")}>
                      Date of the memorial service or celebration of life (can
                      be any date)
                    </FormDescription>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className={cn("h-12 rounded-lg")}>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-base text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "P")
                            ) : (
                              <span>Select memorial date</span>
                            )}
                            <CalendarIcon className="ml-auto size-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle
              className={cn(
                "flex items-center gap-3 text-xl text-secondary-foreground",
              )}
            >
              <GalleryHorizontalEndIcon />
              <span>Primary Photos</span>
              <span className={cn("-ml-1 text-lg text-destructive")}>*</span>
            </CardTitle>
            <CardDescription className={cn("text-base")}>
              Upload the main photos you'd like to use across your memorial
              products. You can add more specific photos later for individual
              products.
            </CardDescription>
          </CardHeader>
          <CardContent className={cn("space-y-6")}>
            <FormField
              control={form.control}
              name="photos"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUploads
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </Form>
  );
}
