import { ReactNode } from "react";
import { Providers } from "@/app/providers.tsx";
import Navbar from "@components/navbar/Navbar.tsx";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <Providers>
            <div className={"w-screen h-screen flex flex-col overflow-hidden"}>
              <Navbar />
              {children}
            </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
