import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
});


export const metadata: Metadata = {
 title: "Google Meet: Video Conferencing for Everyone",
  description:
    "Host secure, high-quality video meetings with Google Meet. Stay connected with friends, family, and teams from anywhere.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${poppins.variable} antialiased font-open-sans`}
      >
        {children}
      </body>
    </html>
  );
}
