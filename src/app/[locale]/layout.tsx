import { ReactNode } from "react";
import { Providers } from "@/app/providers.tsx";
import Navbar from "@components/navbar/Navbar.tsx";
import "./../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing.ts";
import { notFound } from "next/navigation";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

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
