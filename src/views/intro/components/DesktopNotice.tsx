"use client";

import clsx from "clsx";
import React, { useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "motion/react";
import { useOverlay } from "@toss/use-overlay";
import { AnimatePresence } from "motion/react";

import Facade from "@/views/home/components/Facade";
import { useDesktopStore } from "@/views/intro/store/desktop";

const DesktopNotice = () => {
  const { hasOverlayPanel } = useDesktopStore();

  useEffect(() => {
    const html = document.querySelector("html");

    html?.style.setProperty("overflow-x", "hidden");
  }, []);

  return (
    <div
      className={clsx(
        "w-[100vw] h-[calc(100dvh+176px)] overflow-x-hidden",
        "bg-blue-500 text-white"
      )}
    >
      <Facade
        imageSource={"/images/statue-bg--desktop.png"}
        isDesktop={true}
      />

      <DesktopNotice.Container>
        <DesktopNotice.Header />

        <div
          className={clsx(
            "absolute bottom-[35px] left-[20px]",
            "leading-[134%] font-bold"
          )}
          style={{
            fontSize: pvw(24, true),
          }}
        >
          SEONYU DONGHWA
        </div>

        <DesktopNotice.Panel
          className={clsx(
            "transition-all duration-300",
            hasOverlayPanel &&
              "translate-y-[-30px] scale-[0.99]"
          )}
          animate={false}
        >
          <div
            className={clsx(
              "font-bold leading-[134%]",
              "flex flex-col gap-[20px]"
            )}
            style={{
              fontSize: pvw(20, true),
              width: pvw(491),
            }}
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
              width: pvw(174 + 338 + 27),
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
                "font-bold leading-[134%]",
                "py-[3px]"
              )}
              style={{
                fontSize: pvw(16, true),
                width: pvw(338),
              }}
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
        "flex flex-col justify-center items-center",
        "relative"
      )}
    >
      {children}
    </div>
  );
};

DesktopNotice.Header = () => {
  return (
    <header
      className={clsx(
        "absolute top-[43px]",
        "w-[50vw] h-[32px]",
        "flex justify-between items-center",
        "font-bold leading-[134%]"
      )}
      style={{
        width: pvw(680),
        left: pvw(20),
        fontSize: pvw(24, true),
      }}
    >
      <div
        onClick={() => {
          location.href = "/desktop";
        }}
      >
        UNSEEING
      </div>

      <div>선유동화</div>
    </header>
  );
};

DesktopNotice.Panel = ({
  children,
  className = "",
  animate,
}: {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}) => {
  return (
    <motion.div
      className={clsx(
        "overflow-y-auto overflow-x-hidden",
        "bg-black bg-opacity-20",
        "absolute top-[43px] right-[28px]",
        "rounded-[24px]",
        "py-[66px] pl-[40px]",
        "backdrop-blur-[15px]",
        className
      )}
      style={{
        height: `calc(100vh - ${43 + 35}px)`,
        width: pvw(664),
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      initial={animate ? { translateX: "150%" } : {}}
      animate={animate ? { translateX: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 29,
      }}
      exit={animate ? { translateX: "150%" } : {}}
    >
      {children}
    </motion.div>
  );
};

DesktopNotice.LocationImages = () => {
  const overlay = useOverlay();
  const { setHasOverlayPanel } = useDesktopStore();

  const handleImageClick =
    (imageSource: string) => () => {
      setHasOverlayPanel(true);

      overlay.open(({ close, isOpen }) => {
        return (
          <AnimatePresence>
            {isOpen && (
              <DesktopNotice.Panel
                className="!px-[46px] !pt-[92px]"
                animate={true}
              >
                <button
                  className={clsx(
                    "outline-none",
                    "w-[44px] h-[44px]",
                    "flex justify-center items-center",
                    "absolute right-[35px] top-[38px]"
                  )}
                  onClick={() => {
                    setHasOverlayPanel(false);
                    close();
                  }}
                >
                  <img
                    width="22"
                    height="22"
                    src="/icons/close--white.svg"
                  />
                </button>

                <img
                  className="w-full"
                  src={imageSource}
                />
              </DesktopNotice.Panel>
            )}
          </AnimatePresence>
        );
      });
    };

  return (
    <div
      className={clsx(
        "desktop-image-container",
        "w-[calc(100%+40px)] overflow-x-auto overflow-y-hidden",
        "relative left-[-40px]",
        "my-[55px]",
        "flex gap-[21px]",
        "scroll-container"
      )}
      style={{
        height: pvw(217),
      }}
    >
      <img
        className="object-cover"
        src={"/images/locations/1.png"}
        onClick={handleImageClick(
          "/images/locations/1.png"
        )}
        style={{
          width: pvw(223),
          height: pvw(218),
        }}
      />

      <img
        className="object-cover"
        src={"/images/locations/2.png"}
        onClick={handleImageClick(
          "/images/locations/2.png"
        )}
        style={{
          width: pvw(223),
          height: pvw(218),
        }}
      />

      <img
        className="object-cover"
        src={"/images/locations/3.png"}
        onClick={handleImageClick(
          "/images/locations/3.png"
        )}
        style={{
          width: pvw(223),
          height: pvw(218),
        }}
      />

      <img
        className="object-cover"
        src={"/images/locations/4.png"}
        onClick={handleImageClick(
          "/images/locations/4.png"
        )}
        style={{
          width: pvw(223),
          height: pvw(218),
        }}
      />

      <img
        className="object-cover"
        src={"/images/locations/5.png"}
        onClick={handleImageClick(
          "/images/locations/5.png"
        )}
        style={{
          width: pvw(223),
          height: pvw(218),
        }}
      />
    </div>
  );
};

DesktopNotice.Footer = () => {
  return (
    <div
      className={clsx(
        "w-full h-[176px] bg-black bg-opacity-30",
        "relative z-[100]",
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

function pvw(pixel: number, takeMin = false) {
  const standardWidth = 1440;

  if (takeMin) {
    return `min(${
      (pixel / standardWidth) * 100
    }vw, ${pixel}px)`;
  }

  return `${(pixel / standardWidth) * 100}vw`;
}
