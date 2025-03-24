import type { Metadata } from "next";

import AppWrapper from "@/views/home/components/AppWrapper";
import Analytics from "@/shared/components/Analytics";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "선유도에서",
  description: "AR 체험을 해보자",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AppWrapper>{children}</AppWrapper>
      </body>

      <Analytics />
    </html>
  );
}
