"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as zod from "zod";
import { ArrowLeftIcon, ArrowRightIcon, UserIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
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
import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const FormSchema = zod.object({
  fullName: zod.string(),
});

export function MultiStepCustomizationForm() {
  const form = useForm<zod.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
    },
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className={cn("flex items-center gap-3 text-xl")}>
              <UserIcon />
              <span>About Your Loved One</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
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
