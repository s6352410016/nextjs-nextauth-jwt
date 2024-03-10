"use client";

import { Kanit } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import React from "react";
import { Toaster } from 'react-hot-toast';
import { store } from "@/app/store";
import { Provider } from "react-redux";

const kanit = Kanit({
  weight: '300',
  subsets: ['latin'],
  display: 'swap',
});

interface RootLayoutProp {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProp) {
  return (
    <html lang="en" className={kanit.className}>
      <body>
        <Provider store={store}>
          <SessionProvider>
            <Toaster />
            {children}
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
