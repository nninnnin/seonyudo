import type { Metadata } from "next";
import "./globals.css";
import SuspenseWrapper from "@/app/components/SuspenseWrapper";

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
        <SuspenseWrapper>{children}</SuspenseWrapper>
      </body>
    </html>
  );
}
