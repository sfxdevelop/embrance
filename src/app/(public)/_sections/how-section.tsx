import { cn } from "~/lib/utils";

const steps = [
  {
    name: "Choose Format",
    content: "Select digital files or physical prints",
  },
  {
    name: "Pick a Theme",
    content: "Choose a beautiful design theme",
  },
  {
    name: "Build Your Kit",
    content: "Select memorial products for your kit",
  },
  {
    name: "Customize",
    content: "Add photos and personalize text",
  },
  {
    name: "Review & Order",
    content: "Get your memorial prints delivered",
  },
];

export function HowSection() {
  return (
    <section className={cn("relative overflow-hidden")}>
      <div
        className={cn("absolute inset-0 opacity-10 bg-cover bg-center")}
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')",
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
            How It Works?
          </h2>
          <p className={cn("text-lg max-w-2xl")}>
            Simple steps to create meaningful memorial prints.
          </p>
        </div>
        <div className={cn("flex flex-wrap justify-center gap-12")}>
          {steps.map((item, index) => (
            <div
              className={cn(
                "flex flex-col items-center text-center gap-3 max-w-xs",
              )}
              key={item.name}
            >
              <div
                className={cn(
                  "size-12 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-xl font-bold",
                )}
              >
                {index + 1}
              </div>
              <h3 className={cn("text-lg font-bold")}>{item.name}</h3>
              <p className={cn("max-w-48 text-sm")}>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
