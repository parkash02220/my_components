import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MySideDrawer from "@/components/MySideDrawer/MySideDrawer";
import { Box } from "@mui/material";
import ReduxProvider from "@/redux/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
        <Box className="main_container">
          {children}
        </Box>
        </ReduxProvider>
      </body>
    </html>
  );
}
