import Link from "next/link";

import {
  ArrowRightIcon,
  ClockIcon,
  HeartIcon,
  ShieldIcon,
  StarIcon,
} from "lucide-react";

import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

const features = [
  {
    icon: <ShieldIcon className={cn("size-6 text-primary")} />,
    name: "Secure & Private",
  },
  {
    icon: <HeartIcon className={cn("size-6 text-primary")} />,
    name: "Handled with Care",
  },
  {
    icon: <StarIcon className={cn("size-6 text-primary")} />,
    name: "Professional Quality",
  },
];

export function HeroSection() {
  return (
    <section className={cn("bg-primary/20 relative overflow-hidden")}>
      <div
        className={cn("absolute inset-0 opacity-20 bg-cover bg-center")}
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')",
        }}
      />
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 py-20 md:py-28 relative flex flex-col items-center gap-8",
        )}
      >
        <div className={cn("text-center space-y-4")}>
          <h2
            className={cn(
              "text-4xl md:text-6xl font-medium font-[--font-playfair-display]",
            )}
          >
            <span className={cn("block")}>Honor Their Memory with</span>
            <span className={cn("block text-primary")}>
              Beautiful Memorial Prints
            </span>
          </h2>
          <p className={cn("text-xl max-w-3xl")}>
            Create personalized memorial posters, funeral programs, and prayer
            cards with our compassionate service. Professional quality prints
            delivered with care and dignity.
          </p>
        </div>
        <div className={cn("flex flex-col items-center gap-12")}>
          <div className={cn("flex flex-col md:flex-row items-center gap-4")}>
            <Link
              href="/customize"
              className={cn(
                buttonVariants({ variant: "default", size: "3xl" }),
                "font-bold",
              )}
            >
              Begin Your Memorial <ArrowRightIcon className={cn("size-5")} />
            </Link>
            <div className={cn("flex items-center gap-2")}>
              <ClockIcon className={cn("size-5")} />
              <p>24-hour proof delivery guaranteed</p>
            </div>
          </div>
          <ul
            className={cn(
              "flex flex-col md:flex-row items-center gap-8 md:gap-36",
            )}
          >
            {features.map((item) => (
              <li className={cn("flex items-center gap-2")} key={item.name}>
                {item.icon}
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
