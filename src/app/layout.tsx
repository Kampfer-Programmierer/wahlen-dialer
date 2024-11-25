"use client";

import "~/styles/style.css";
import "~/styles/satoshi.css";

import { GeistSans } from "geist/font/sans";
import Sidebar from "~/app/_components/common/Sidebar";
import Header from "~/app/_components/common/Header";

import { TRPCReactProvider } from "~/trpc/react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/auth/login";

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <div className="flex h-auto w-full">
            {!isLoginPage && <Sidebar />}
            <div
              className={`relative flex min-h-screen flex-1 flex-col dark:bg-slate-600 ${
                !isLoginPage 
                  ? "transition-all duration-300 lg:ml-20 " 
                  : "w-full"
              }`}
            >
              {!isLoginPage && <Header />}
              <main className="flex-1 w-full p-4 md:p-6 2xl:p-5 ">
                {children}
              </main>
            </div>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}