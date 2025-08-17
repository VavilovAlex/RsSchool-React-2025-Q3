import { ReactNode } from "react";
import { Providers } from "@/app/providers.tsx";
import Navbar from "@components/navbar/Navbar.tsx";
import "./globals.css";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <div id="root">
          <NextIntlClientProvider locale={locale}>
            <Providers>
              <div
                className={"w-screen h-screen flex flex-col overflow-hidden"}
              >
                <Navbar />
                {children}
              </div>
            </Providers>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
