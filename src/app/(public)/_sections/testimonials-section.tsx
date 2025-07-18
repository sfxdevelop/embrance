import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { StarRating } from "~/components/ui/star-rating";
import { cn } from "~/lib/utils";

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Denver, CO • Funeral Program",
    rating: 5,
    content:
      '"The memorial program for my father was absolutely beautiful. The team was so compassionate and delivered exactly what we needed during a difficult time."',
  },
  {
    name: "Michael Chen",
    title: "Denver, CO • Funeral Program",
    rating: 5,
    content:
      '"The memorial program for my father was absolutely beautiful. The team was so compassionate and delivered exactly what we needed during a difficult time."',
  },
  {
    name: "Lisa Rodriguez",
    title: "Denver, CO • Funeral Program",
    rating: 5,
    content:
      '"The memorial program for my father was absolutely beautiful. The team was so compassionate and delivered exactly what we needed during a difficult time."',
  },
];

export function TestimonialsSection() {
  return (
    <section className={cn("relative overflow-hidden")}>
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 py-20 relative flex flex-col items-center gap-16",
        )}
      >
        <div className={cn("text-center space-y-4")}>
          <h2
            className={cn("text-3xl font-bold font-[--font-playfair-display]")}
          >
            What Families Say?
          </h2>
          <p className={cn("text-lg max-w-2xl")}>
            Trusted by thousands of families nationwide.
          </p>
        </div>
        <ul className={cn("flex flex-wrap justify-center gap-4")}>
          {testimonials.map((item) => (
            <Card className={cn("w-full max-w-sm")} key={item.name}>
              <CardHeader>
                <StarRating size="lg" rating={item.rating} />
              </CardHeader>
              <CardContent>
                <p>{item.content}</p>
              </CardContent>
              <CardFooter className={cn("flex-col items-start  gap-2")}>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.title}</CardDescription>
              </CardFooter>
            </Card>
          ))}
        </ul>
      </div>
    </section>
  );
}
