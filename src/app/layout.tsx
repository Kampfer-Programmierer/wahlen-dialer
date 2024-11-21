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

  // Determine if we are on the login page
  const isLoginPage = pathname === "/auth/login";

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <div className="flex">
            {/* Conditionally render the sidebar only if not on login page */}
            {!isLoginPage && <Sidebar />}
            <div
              className={`relative flex min-h-screen dark:bg-slate-600 flex-1 flex-col ${!isLoginPage ? "lg:ml-72.5" : ""}`}
            >
              {/* Conditionally render the header only if not on login page */}
              {!isLoginPage && <Header />}
              <main
                className={`mx-auto  max-w-screen-2xl p-4 md:p-6 2xl:p-10 ${isLoginPage ? "w-full" : ""}`}
              >
                {children}
              </main>
            </div>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
