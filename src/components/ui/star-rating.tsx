import { StarIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "size-3",
    md: "size-4",
    lg: "size-5",
  };

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= rating;

        return (
          <StarIcon
            key={starNumber}
            className={cn(
              sizeClasses[size],
              isFilled
                ? "fill-primary text-primary"
                : "fill-secondary text-secondary",
            )}
          />
        );
      })}
    </div>
  );
}
