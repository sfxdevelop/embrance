import { ArrowRightIcon, PackageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const products = [
  {
    id: 1,
    icon: PackageIcon,
    name: "Memorial Posters",
    description:
      "Beautiful large-format prints perfect for memorial services and celebrations of life.",
    badge: "Most Popular",
    images: [
      "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
      "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
      "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
    ],
    features: [
      '18" × 24" or 24" × 36" sizes',
      "Premium paper or mounted options",
      "Professional framing available",
      "Single photo or collage layouts",
    ],
    startingPrice: "$45",
    link: "#",
  },
  {
    id: 2,
    icon: PackageIcon,
    name: "Funeral Programs",
    description:
      "Traditional bi-fold programs with customizable layouts for memorial services.",
    badge: undefined,
    images: [
      "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
      "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
    ],
    features: [
      '18" × 24" or 24" × 36" sizes',
      "Premium paper or mounted options",
      "Professional framing available",
      "Single photo or collage layouts",
    ],
    startingPrice: "$45",
    link: "#",
  },
  {
    id: 3,
    icon: PackageIcon,
    name: "Prayer Cards",
    description:
      "Wallet-sized memorial cards perfect for sharing with family and friends.",
    badge: undefined,
    images: [
      "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
      "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
      "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
    ],
    features: [
      '18" × 24" or 24" × 36" sizes',
      "Premium paper or mounted options",
      "Professional framing available",
      "Single photo or collage layouts",
    ],
    startingPrice: "$45",
    link: "#",
  },
];

export function ShowcaseSection() {
  return (
    <section className={cn("relative overflow-hidden")}>
      <div className={cn("max-w-7xl mx-auto px-4 py-20 relative space-y-16")}>
        <div className={cn("flex flex-col items-center text-center space-y-4")}>
          <h2
            className={cn("text-3xl font-bold font-[--font-playfair-display]")}
          >
            Our Memorial Products
          </h2>
          <p className={cn("text-lg max-w-2xl")}>
            Choose from our carefully designed collection of memorial products,
            each crafted with dignity and attention to detail
          </p>
        </div>
        <ul className={cn("space-y-12")}>
          {products.map((item, index) => (
            <li
              className={cn(
                "flex flex-col md:flex-row md:items-center gap-8",
                (index + 1) % 2 === 0 && "md:flex-row-reverse",
              )}
              key={item.id}
            >
              <div className={cn("flex-1 space-y-4")}>
                <div
                  className={cn(
                    "rounded-xl overflow-hidden aspect-[4/3] relative",
                  )}
                >
                  {item.badge && (
                    <Badge
                      variant="default"
                      className={cn(
                        "px-2.5 py-1 rounded-2xl text-sm font-semibold absolute top-4 left-4",
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                  <Image
                    src={item.images[0]}
                    alt={`${item.name} Image ${1}`}
                    width={400}
                    height={300}
                    className={cn("w-full h-full object-center object-cover")}
                  />
                </div>
                <ul className={cn("grid grid-cols-2 gap-4")}>
                  {item.images.slice(1).map((image, index) => (
                    <li
                      className={cn("rounded-xl overflow-hidden aspect-[4/3]")}
                      key={image}
                    >
                      <Image
                        src={image}
                        alt={`${item.name} Image ${index + 2}`}
                        width={400}
                        height={300}
                        className={cn(
                          "w-full h-full object-center object-cover",
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className={cn("flex-1 space-y-8")}>
                <div className={cn("space-y-6")}>
                  <div className={cn("space-y-4")}>
                    <div className={cn("flex items-center gap-3")}>
                      <div className={cn("p-2.5 rounded-lg bg-primary/40")}>
                        <item.icon />
                      </div>
                      <h3
                        className={cn(
                          "text-2xl font-bold font-[--font-playfair-display]",
                        )}
                      >
                        {item.name}
                      </h3>
                    </div>
                    <p className={cn("text-lg")}>{item.description}</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold">Features &amp; Options:</h3>
                    <ul className="ml-4 space-y-2 list-disc">
                      {item.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={cn("text-sm")}>Starting at</p>
                    <p className={cn("text-3xl font-bold text-primary")}>
                      {item.startingPrice}
                    </p>
                  </div>
                  <div>
                    <Link
                      className={cn(
                        buttonVariants({ variant: "default", size: "2xl" }),
                        "rounded-lg font-bold",
                      )}
                      href={item.link}
                    >
                      <span>Create Now</span>
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
