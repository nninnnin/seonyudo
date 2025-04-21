import type { Metadata } from "next";

import AppWrapper from "@/views/home/components/AppWrapper";
import Analytics from "@/shared/components/Analytics";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Unseeing: 선유동화",
  description:
    "지난해 7월 '선유도의 과거와 현재를 담은 시민 친화적 작품 구현'이라는 주제로 시민들이 선유도공원을 즐기며 떠오른 이야기와 상상의 아이디어(스토리) 공모에서 출발한 모바일 기반 AR 작품입니다.",
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
