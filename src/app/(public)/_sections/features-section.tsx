import { ClockIcon, FlameIcon, StarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

const features = [
  {
    icon: <ClockIcon className={cn("size-8 text-primary")} />,
    name: "Sarah Johnson",
    content:
      "The memorial program for my father was absolutely beautiful. The team was so compassionate and delivered exactly what we needed during a difficult time.",
  },
  {
    icon: <FlameIcon className={cn("size-8 text-primary")} />,
    name: "Michael Chen",
    content:
      "The memorial program for my father was absolutely beautiful. The team was so compassionate and delivered exactly what we needed during a difficult time.",
  },
  {
    icon: <StarIcon className={cn("size-8 text-primary")} />,
    name: "Lisa Rodriguez",
    content:
      "The memorial program for my father was absolutely beautiful. The team was so compassionate and delivered exactly what we needed during a difficult time.",
  },
];

export function FeaturesSection() {
  return (
    <section className={cn("relative overflow-hidden")}>
      <div
        className={cn("absolute inset-0 opacity-10 bg-cover bg-center")}
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')",
        }}
      />
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 py-20 relative flex flex-col items-center gap-16",
        )}
      >
        <div className={cn("text-center space-y-4")}>
          <h2
            className={cn("text-3xl font-bold font-[--font-playfair-display]")}
          >
            Why Choose Ember Field?
          </h2>
          <p className={cn("text-lg max-w-2xl")}>
            Trusted by families during their most important moments.
          </p>
        </div>
        <ul className={cn("flex flex-wrap justify-center gap-4")}>
          {features.map((item) => (
            <Card className={cn("w-full max-w-sm gap-4")} key={item.name}>
              <CardHeader>{item.icon}</CardHeader>
              <CardContent className={cn("space-y-4")}>
                <CardTitle className={cn("text-primary text-xl")}>
                  {item.name}
                </CardTitle>
                <CardDescription className={cn("text-base")}>
                  {item.content}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </ul>
      </div>
    </section>
  );
}
