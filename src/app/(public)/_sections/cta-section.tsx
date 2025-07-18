import { ArrowRightIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function CTASection() {
  return (
    <section
      className={cn("bg-primary text-secondary/75 relative overflow-hidden")}
    >
      <div
        className={cn("absolute inset-0 opacity-20 bg-cover bg-center")}
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')",
        }}
      />
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 py-20 relative flex flex-col items-center gap-8",
        )}
      >
        <div className={cn("text-center space-y-4")}>
          <h2
            className={cn(
              "text-secondary text-3xl font-bold font-[--font-playfair-display]",
            )}
          >
            Ready to Create a Beautiful Memorial?
          </h2>
          <p className={cn("text-lg max-w-2xl")}>
            Start your order today and receive your digital proof within 24
            hours. Our compassionate team is here to help every step of the way.
          </p>
        </div>
        <Button variant="secondary" size="xl" className={cn("font-bold")}>
          Begin Your Memorial <ArrowRightIcon />
        </Button>
      </div>
    </section>
  );
}
