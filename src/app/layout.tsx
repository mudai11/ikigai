import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Ikigai - Watch Anime Online For Free",
  description: "An anime live streaming website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader
          color="#FF0000"
          height={4}
          crawlSpeed={200}
          easing="ease"
          crawl={true}
          speed={200}
          showSpinner={false}
        />
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
