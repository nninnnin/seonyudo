"use client";

import clsx from "clsx";
import React from "react";
import { QRCodeSVG } from "qrcode.react";

import Facade from "@/views/home/components/Facade";

const DesktopNotice = () => {
  return (
    <div className="h-[calc(100dvh+176px)] bg-blue-500 text-white">
      <Facade
        imageSource={"/images/statue-bg--5.png"}
        isDesktop={true}
      />

      <DesktopNotice.Container>
        <header></header>
        <DesktopNotice.Panel>
          <div
            className={clsx(
              "w-[491px] text-[20px] font-bold leading-[134%]",
              "flex flex-col gap-[20px]"
            )}
          >
            <p>
              〈Unseeing: 선유동화〉는 선유도공원
              곳곳에 숨겨 놓은 눈에 보이지 않는 상상의
              세계를 AR 기술로 만나는 모바일
              프로젝트입니다. 공모를 통해 선정된 5개의
              시민 아이디어를 바탕으로 동화 같은 풍경을
              만들었습니다.
            </p>
            <p>
              "Unseeing: Seonyu Donghwa" is a mobile
              project that uses AR technology to reveal
              hidden, invisible worlds of imagination
              throughout Seonyudo Park. Based on five
              citizen-submitted ideas selected through
              a public call, we created fairytale-like
              scenes that blend fantasy with the
              landscape.
            </p>
          </div>
          <DesktopNotice.LocationImages />
          <div
            className={clsx(
              "h-[174px]",
              "flex gap-[27px]"
            )}
            style={{
              width: 174 + 338 + 27,
            }}
          >
            <div className="w-[174px] h-[174px] bg-white flex justify-center items-center">
              <QRCodeSVG
                value={location.origin}
                height={142}
                width={142}
              />
            </div>
            <div
              className={clsx(
                "w-[338px]",
                "text-[16px] font-bold leading-[134%]",
                "py-[3px]"
              )}
            >
              〈Unseeing: 선유동화〉는 선유도공원 방문
              후, 모바일 환경에서 경험할 수 있습니다.
              QR코드를 스캔하고 체험을 시작해 보세요!
              <br />
              <br />
              "Unseeing: Seonyu Donghwa" can be
              experienced on your mobile device when
              you visit Seonyudo Park in person. Scan
              the QR code on-site and start the
              experience!
            </div>
          </div>
        </DesktopNotice.Panel>
      </DesktopNotice.Container>
      <DesktopNotice.Footer />
    </div>
  );
};

DesktopNotice.Container = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        "w-[100vw] h-[100dvh]",
        "flex flex-col justify-center items-center"
      )}
    >
      {children}
    </div>
  );
};

DesktopNotice.Panel = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        "w-[664px] overflow-y-auto overflow-x-hidden",
        "bg-black bg-opacity-20",
        "fixed top-[43px] right-[28px]",
        "rounded-[24px]",
        "py-[66px] pl-[40px]",
        "backdrop-blur-[15px]"
      )}
      style={{
        height: `calc(100vh - ${176 + 43 + 35}px)`,
        width: pvw(664),
      }}
    >
      {children}
    </div>
  );
};

DesktopNotice.LocationImages = () => {
  return (
    <div
      className={clsx(
        "desktop-image-container",
        "w-[calc(100%+40px)] overflow-auto",
        "relative left-[-40px]",
        "h-[218px]",
        "my-[55px]",
        "flex gap-[21px]"
      )}
    >
      <img
        className="bg-slate-100"
        width={218}
        height={218}
      />

      <img
        className="bg-slate-100"
        width={218}
        height={218}
      />

      <img
        className="bg-slate-100"
        width={218}
        height={218}
      />

      <img
        className="bg-slate-100"
        width={218}
        height={218}
      />
    </div>
  );
};

DesktopNotice.Footer = () => {
  return (
    <div
      className={clsx(
        "w-full h-[176px] bg-black bg-opacity-30",
        "backdrop:blur-[30px]",
        "pt-[76px] pl-[200px]",
        "font-bold leading-[125%]",
        "flex",
        "text-white text-[12px] tracking-[-0.132px]",
        "overflow-hidden"
      )}
    >
      <p style={{ minWidth: 486 }}>
        이 작품은 서울시 공공미술 프로젝트의 일환으로
        기획, 제작되었습니다.
        <br />
        Unseeing: Seonyu Donghwa was planned and
        created
        <br />
        as part of the Seoul Metropolitan Government’s
        Public Art Project.
      </p>

      <div style={{ minWidth: 257 }}>
        문의처: 02-323-4505
        <br />
        Copyright © 2025 Rebel9. All Rights Reserved.
      </div>

      <div className="flex items-start gap-[24px] ml-[104px]">
        <img width={97} src="/icons/seoul1.svg" />
        <img width={77} src="/icons/seoul2.svg" />
      </div>
    </div>
  );
};

export default DesktopNotice;

function pvw(pixel: number) {
  const standardWidth = 1440;

  return `${(pixel / standardWidth) * 100}vw`;
}
