"use client";

import clsx from "clsx";
import Lottie from "react-lottie";
import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  redirect,
  useParams,
  usePathname,
  useRouter,
} from "next/navigation";
import {
  useArContents,
  useArContentsMessages,
} from "@ar-framework/utils";
import { useStore } from "zustand";

import Overlay from "@/shared/components/Overlay";
import useLocation from "@/features/location/hooks/useLocation";
import { LocationSlugs } from "@/features/location/types/location";
import CapturedThumbnails from "@/features/capture/components/CapturedThumbnails";
import {
  blobToUrl,
  capturedPictureStore,
  NUMBER_OF_CAPTURED_PICTURES,
} from "@/features/capture/store";
import CaptureComplete from "@/features/capture/components/CaptureComplete";
import Button from "@/shared/components/Button";
import ArLoading from "@/features/ar/components/Loading";
import { LanguageMap } from "@/shared/types/memex";
import SoundToggler from "@/features/sound/components/SoundToggler";
import { replaceNewlineAsBreak } from "@/shared/utils";
import useSound from "@/features/sound/hooks/useSound";
import captureSpinnerData from "@/features/ar/assets/animation/capture-spinner.json";

const ArPage = () => {
  const params = useParams();
  const locationSlug = params["locationSlug"];

  if (!locationSlug) {
    redirect("/");
  }

  const { location } = useLocation(
    locationSlug as LocationSlugs
  );

  const [hasArContents, setHasArContents] = useState<
    null | boolean
  >(null);

  useEffect(() => {
    if (!location) return;

    if (!location?.arContentsUrl) {
      setHasArContents(false);
    } else {
      setHasArContents(true);
    }
  }, [location]);

  const { capturedPictures } = useStore(
    capturedPictureStore
  );

  const isCapturingCompleted =
    capturedPictures.length >=
    NUMBER_OF_CAPTURED_PICTURES;

  return (
    <div
      className={clsx("w-full h-full")}
      style={{
        background:
          "linear-gradient(180deg, #E4E4DC 0%, #160D78 53.37%)",
      }}
    >
      {hasArContents === false && (
        <ArPage.NoArContents />
      )}

      {hasArContents === true && (
        <>
          <ArPage.ArContents
            arContentsUrl={location!.arContentsUrl}
            guideMessage={location!.guideMessage}
          />

          {!isCapturingCompleted && <SoundToggler />}

          <CapturedThumbnails />

          {isCapturingCompleted && (
            <CaptureComplete
              locationSlug={
                locationSlug as LocationSlugs
              }
            />
          )}
        </>
      )}
    </div>
  );
};

ArPage.ArContents = ({
  arContentsUrl,
  guideMessage,
}: {
  arContentsUrl: string;
  guideMessage: LanguageMap;
}) => {
  const router = useRouter();

  const [isArLoaded, setIsArLoaded] = useState(false);

  const [showDialog, setShowDialog] = useState(true);
  const [showCaptureButton, setShowCaptureButton] =
    useState(false);
  const [showCaptureLoader, setShowCaptureLoader] =
    useState(false);

  const closeDialog = () => setShowDialog(false);

  const { ArContentsIframe, triggerCapture } =
    useArContents();

  const { addCapturedPicture, resetCapturedPictures } =
    useStore(capturedPictureStore);

  const isCapturingRef = useRef(false);

  useArContentsMessages({
    handleARLoaded: () => {
      console.log("AR 로딩 완료!");

      setTimeout(() => {
        setIsArLoaded(true);
      }, 1000);
    },
    handleCapturedImage: (capturedImage) => {
      setShowCaptureLoader(false);
      isCapturingRef.current = false;

      console.log("캡쳐된 이미지: ", capturedImage);

      addCapturedPicture(blobToUrl(capturedImage));
    },
  });

  const { stop } = useSound("/sounds/scape.mp3");

  useEffect(() => {
    setShowDialog(true);
    resetCapturedPictures();

    return () => {
      stop();
    };
  }, []);

  const { capturedPictures } = useStore(
    capturedPictureStore
  );

  const handleCloseClick = () => {
    router.back();
    stop();
  };

  const handleCaptureClick = () => {
    if (isCapturingRef.current) return;

    isCapturingRef.current = true;

    setShowCaptureLoader(true);
    document.body.classList.add("shutter");

    setTimeout(() => {
      document.body.classList.remove("shutter");
    }, 800);

    triggerCapture();
  };

  const showArContents = isArLoaded;

  const isCapturingCompleted =
    capturedPictures.length >=
    NUMBER_OF_CAPTURED_PICTURES;

  return (
    <>
      <div
        key="capture-loader"
        className={clsx(
          "w-[100vw] h-[100dvh] fixed top-0 left-0",
          "bg-black bg-opacity-50",
          "flex justify-center items-center",
          "text-white font-bold",
          showCaptureLoader
            ? "z-[9999] opacity-100"
            : "z-[-1] opacity-0"
        )}
      >
        <Lottie
          width={100}
          height={100}
          options={{
            animationData: captureSpinnerData,
            autoplay: true,
          }}
        />
      </div>

      {showArContents && showDialog && (
        <ArPage.ArGuide
          close={() => {
            closeDialog();
            setShowCaptureButton(true);
          }}
          guideMessage={guideMessage}
        />
      )}

      {!showArContents && <ArLoading />}

      <div
        style={{
          opacity: showArContents ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <ArContentsIframe
          src={arContentsUrl}
          visibility={true}
        />

        {showArContents && !isCapturingCompleted && (
          <ArPage.CloseButton
            onClick={handleCloseClick}
          />
        )}

        <ArPage.CaptureButton
          onClick={handleCaptureClick}
          hidden={!showCaptureButton}
          disabled={false}
        />
      </div>
    </>
  );
};

ArPage.NoArContents = () => {
  const [show, setShow] = useState(true);

  if (!show) {
    return <></>;
  }

  return (
    <Overlay>
      <div
        className={clsx(
          "w-[200px] h-[200px] bg-white",
          "flex flex-col justify-center items-center",
          "gap-[20px]"
        )}
      >
        <p>AR 컨텐츠가 없습니다.</p>

        <button
          onClick={() => {
            setShow(false);
            redirect("/intro");
          }}
        >
          닫기
        </button>
      </div>
    </Overlay>
  );
};

ArPage.ArGuide = ({
  close,
  guideMessage,
}: {
  close: () => void;
  guideMessage: LanguageMap;
}) => {
  const { play: playSound } = useSound(
    "/sounds/scape.mp3"
  );

  const pathname = usePathname();

  const isSeonyuJeongContents =
    pathname.includes("seonyujeong");

  return (
    <Overlay className="!bg-opacity-50">
      <div
        className={clsx(
          "flex flex-col items-center justify-between",
          "pb-[48px] pt-[120px]",
          "gap-[10px]",
          "w-full h-full",
          "bg-black bg-opacity-50"
        )}
      >
        <div
          className={clsx(
            "w-[300px]",
            "flex flex-col items-center",
            "body1 text-center text-white",
            "break-keep"
          )}
        >
          <h2
            dangerouslySetInnerHTML={{
              __html: replaceNewlineAsBreak(
                guideMessage.KO!
              ),
            }}
          ></h2>

          <h2
            dangerouslySetInnerHTML={{
              __html: replaceNewlineAsBreak(
                guideMessage.EN!
              ),
            }}
          ></h2>
        </div>

        <div className="flex flex-col items-center gap-[20px]">
          <p
            className={clsx(
              "flex flex-col gap-[4px]",
              "body2 text-white text-center"
            )}
          >
            <span>안전한 위치에서 체험해 주세요.</span>
            <span>
              Please experience from a safe spot
            </span>
          </p>

          <Button
            iconSource="/icons/thumbsup.svg"
            onClick={async () => {
              const iframe =
                document.querySelector("iframe");

              iframe?.contentWindow?.postMessage(
                {
                  type: "ar-guide-closed",
                },
                "*"
              );

              if (isSeonyuJeongContents) {
                playSound();
              }

              close();
            }}
          >
            Okay
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

ArPage.CloseButton = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <div
      className={clsx(
        "fixed top-[16px] right-[16px] z-[4000]",
        "bg-white",
        "w-[42px] h-[30px]",
        "flex justify-center items-center",
        "px-[11px] pt-[5px] pb-[4px]",
        "rounded-[16px]",
        "select-none"
      )}
      onClick={onClick}
    >
      <img
        className="w-[12px] h-[12px]"
        src="/icons/close.svg"
      />
    </div>
  );
};

ArPage.CaptureButton = ({
  onClick,
  disabled = false,
  hidden = false,
}: {
  onClick: () => void;
  disabled?: boolean;
  hidden?: boolean;
}) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-full",
        "w-[68px] h-[68px]",
        "fixed bottom-[36px] left-1/2 -translate-x-1/2",
        "select-none",
        disabled && "bg-slate-200 pointer-events-none",
        hidden && "hidden"
      )}
      onClick={onClick}
    ></div>
  );
};

export default ArPage;
