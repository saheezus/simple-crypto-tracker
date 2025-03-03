import { Geist, Geist_Mono } from "next/font/google";
import { Home } from "./components/home.js";
import "./globals.css";
import ReactQueryProvider from "./utils/Providers/ReactQueryProvider.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crypto Tracker",
  description: "A simple tracker for cryptocurrency prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
