import Link from "next/link";

import {
  ArrowRightIcon,
  CameraIcon,
  PaletteIcon,
  UsersIcon,
} from "lucide-react";

import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

const flow = [
  {
    icon: <CameraIcon className={cn("size-6 text-primary")} />,
    name: "Upload Photos",
  },
  {
    icon: <PaletteIcon className={cn("size-6 text-primary")} />,
    name: "Choose Themes",
  },
  {
    icon: <UsersIcon className={cn("size-6 text-primary")} />,
    name: "Share & Print",
  },
];

export function FlowSection() {
  return (
    <section className={cn("relative overflow-hidden pb-20 md:pb-28")}>
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 py-8 relative flex flex-col items-center gap-8 bg-primary/20 rounded-2xl",
        )}
      >
        <div className={cn("text-center space-y-4")}>
          <h2
            className={cn("text-3xl font-bold font-[--font-playfair-display]")}
          >
            Create a Complete Memorial Package
          </h2>
          <p className={cn("text-lg max-w-2xl")}>
            Combine multiple products for a comprehensive memorial experience.
            Our design team ensures all pieces work together beautifully.
          </p>
        </div>
        <div className={cn("flex flex-col items-center gap-12")}>
          <div className={cn("flex flex-col md:flex-row items-center gap-8")}>
            <Link
              href="/customize"
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "3xl",
                }),
                "font-bold",
              )}
            >
              Start Your Memorial <ArrowRightIcon className={cn("size-5")} />
            </Link>
            <ul className={cn("flex flex-col md:flex-row items-center gap-8")}>
              {flow.map((item) => (
                <li className={cn("flex items-center gap-2")} key={item.name}>
                  {item.icon}
                  <p>{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
