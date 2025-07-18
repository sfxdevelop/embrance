import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { fonts } from "~/lib/fonts";
import { Footer } from "./_layout/footer";
import { Header } from "./_layout/header";
import { RootProvider } from "./provider";

import "./globals.css";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - ${process.env.NEXT_PUBLIC_APP_DESCRIPTION}`,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fonts.playfairDisplay.variable} font-sans antialiased text-secondary-foreground`}
      >
        <RootProvider>
          <Header />
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
