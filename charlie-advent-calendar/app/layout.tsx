import type { Metadata } from "next";
import { Ribeye, Ribeye_Marrow, Fredoka, Patrick_Hand } from "next/font/google";
import "./globals.css";

const ribeye = Ribeye({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ribeye",
});

const ribeyeMarrow = Ribeye_Marrow({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ribeye-marrow",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fredoka",
});

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrick",
});

export const metadata: Metadata = {
  title: "Pablo's Christmas Advent Calendar 🎄",
  description: "25 days of cozy surprises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ribeye.variable} ${ribeyeMarrow.variable} ${fredoka.variable} ${patrickHand.variable}`}
    >
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" async />
      </head>
      <body className={`${fredoka.className} antialiased bg-[#F9F7F2] text-[#C85A48]`}>
        {children}
      </body>
    </html>
  );
}