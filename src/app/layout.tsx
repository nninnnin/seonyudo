import type { Metadata } from "next";
import "./globals.css";

import AppWrapper from "@/views/home/components/AppWrapper";

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
    </html>
  );
}
