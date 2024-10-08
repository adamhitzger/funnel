import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/lib/card";
import AgeBanner from "@/components/age-banner";
import { Toaster } from "react-hot-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";

const font = localFont({
  src: "./fonts/Bold.woff",
  variable: "--font-hussar-bold",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-gradient-to-r from-lime-600 via-yellow-300 to-red-600`}>
        <CartProvider>
          <AgeBanner />
          <div className="min-h-screen flex flex-col">
            <Header />
            {children}
            <Footer />
          </div>
          <Toaster
            toastOptions={{
              style: {
                textAlign: "center",
              }
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
