import { Clock, MailIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { Logo } from "../_components/logo";

const contactItems = [
  { href: "/", Icon: PhoneIcon, label: "(555) 123-4567" },
  { href: "/", Icon: MailIcon, label: "support@emberfield.com" },
];

const supportItems = [
  { href: "/", label: "FAQ" },
  { href: "/", label: "Ordering Guide" },
  { href: "/", label: "Quality Guarantee" },
];

export function Footer() {
  return (
    <footer className={cn("bg-primary text-secondary/75")}>
      <div className={cn("max-w-7xl mx-auto px-4 py-12")}>
        <div className={cn("flex flex-col md:flex-row gap-6")}>
          <div className={cn("flex-[2] flex flex-col gap-3")}>
            <Logo isInverted />
            <p>
              Creating beautiful, personalized memorial prints to honor your
              loved ones. Our compassionate team is here to help during this
              difficult time.
            </p>
            <p className={cn("flex items-center gap-2")}>
              <Clock className={cn("size-4")} />
              24-hour proof delivery guaranteed
            </p>
          </div>
          <div className={cn("flex-1 flex flex-col gap-4")}>
            <h3 className={cn("text-secondary text-lg font-bold")}>
              Contact Us
            </h3>
            <ul className={cn("flex flex-col gap-2")}>
              {contactItems.map((item) => (
                <li
                  key={item.label}
                  className={cn("flex items-center gap-2 hover:text-secondary")}
                >
                  <item.Icon className={cn("size-4")} />
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={cn("flex-1 flex flex-col gap-4")}>
            <h3 className={cn("text-secondary text-lg font-bold")}>Support</h3>
            <ul className={cn("flex flex-col gap-2")}>
              {supportItems.map((item) => (
                <li
                  key={item.label}
                  className={cn("flex items-center gap-2 hover:text-secondary")}
                >
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator className={cn("my-6")} />
        <p className={cn("text-center text-sm")}>
          © {process.env.NEXT_PUBLIC_APP_COPY_YEAR}{" "}
          {process.env.NEXT_PUBLIC_APP_NAME}. All rights reserved. | Privacy
          Policy | Terms of Service
        </p>
      </div>
    </footer>
  );
}
