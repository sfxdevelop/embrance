import type { PropsWithChildren } from "react";

import { ThemeProvider } from "~/components/providers/theme";

export function RootProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
