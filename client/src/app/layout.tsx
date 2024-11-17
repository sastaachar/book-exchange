"use client";

// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { useAppContext } from "../context";
import "react-toastify/dist/ReactToastify.css";
import { getLogger, i18nInit } from "@utils";
import React, { useEffect } from "react";
import { AppWithContext } from "@components/appWithContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const logger = getLogger("home/layout");

const appInit = () => {
  return {
    i18nInitSetup: i18nInit(),
  };
};

const appConfigs = appInit();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setAppConfigLoading } = useAppContext();

  console.log("Rendering");

  // TODO : Move this to server side rendering
  useEffect(() => {
    setAppConfigLoading(true);
    appConfigs.i18nInitSetup
      .then(() => setAppConfigLoading(false))
      .catch(() => setAppConfigLoading(false));
  }, [setAppConfigLoading]);

  logger.log("Rendered");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="appWrapper">
          <AppWithContext>{children}</AppWithContext>
        </div>
      </body>
    </html>
  );
}
