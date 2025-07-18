import Link from "next/link";

import { cn } from "~/lib/utils";
import { Logo } from "../_components/logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/", label: "Products" },
  { href: "/", label: "How It Works" },
  { href: "/", label: "Testimonials" },
  { href: "/", label: "Contact" },
];

export function Header() {
  return (
    <header>
      <nav
        className={cn(
          "max-w-7xl mx-auto px-4 py-4 flex items-center justify-between",
        )}
      >
        <Logo />
        <ul className={cn("hidden md:flex items-center gap-8")}>
          {navItems.slice(1).map((item) => (
            <li key={item.label}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
