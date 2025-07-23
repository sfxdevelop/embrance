"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  GalleryHorizontalEndIcon,
  UserIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as zod from "zod";

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
import { cn } from "~/lib/utils";

const FormSchema = zod.object({
  fullName: zod.string(),
  dob: zod.date(),
  dop: zod.date(),
  dom: zod.date().optional(),
});

export function MultiStepCustomizationForm() {
  const form = useForm<zod.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: zod.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:w-2/3 space-y-6"
      >
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
                        placeholder="Enter Full Name"
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
                      <span className={cn("-ml-1 text-lg text-destructive")}>
                        *
                      </span>
                    </FormLabel>
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
                              <span>mm/dd/yy</span>
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
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
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
                      <span className={cn("-ml-1 text-lg text-destructive")}>
                        *
                      </span>
                    </FormLabel>
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
                              <span>mm/dd/yy</span>
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
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
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
              <span className={cn("text-sm font-normal")}>
                (Optional, if known)
              </span>
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
                    </FormLabel>
                    <FormDescription className={cn("text-xs")}>
                      Date of the memorial service or celebration of life
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
                              <span>mm/dd/yy</span>
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
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
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
            </CardTitle>
            <CardDescription className={cn("text-base")}>
              Upload the main photos you'd like to use across your memorial
              products. You can add more specific photos later for individual
              products.
            </CardDescription>
          </CardHeader>
          <CardContent className={cn("space-y-6")}>
            <div className={cn("flex items-center gap-4")}>
              <FileUploads />
            </div>
          </CardContent>
        </Card>
        <div className={cn("flex items-center justify-between")}>
          <div>
            <Button
              variant="outline"
              size="xl"
              className={cn("font-bold")}
              type="button"
            >
              <ArrowLeftIcon />
              <span>Back</span>
            </Button>
          </div>
          <div>
            <Button
              disabled
              size="xl"
              className={cn("font-bold")}
              type="button"
            >
              <span>Continue</span>
              <ArrowRightIcon />
            </Button>
            {/* <Button
            size="xl"
            className={cn("font-bold")}
            type="submit">Submit</Button> */}
          </div>
        </div>
      </form>
    </Form>
  );
}
