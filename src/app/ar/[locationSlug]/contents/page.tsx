"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
  redirect,
  useParams,
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
import { requestDeviceMotionPermission } from "@/features/permission/utils/deviceMotion";
import { introStore } from "@/views/intro/store/intro";

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
    <>
      {hasArContents === false && (
        <ArPage.NoArContents />
      )}

      {hasArContents === true && (
        <ArPage.ArContents
          arContentsUrl={location!.arContentsUrl}
          guideMessage={location!.guideMessage}
        />
      )}

      <SoundToggler />
      <CapturedThumbnails />

      {isCapturingCompleted && (
        <CaptureComplete
          locationSlug={locationSlug as LocationSlugs}
        />
      )}
    </>
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

  const params = useParams();
  const locationSlug = params["locationSlug"];
  const isTransitionGarden = (
    locationSlug as string
  ).includes("transitiongarden");

  const [isArLoaded, setIsArLoaded] = useState(false);

  const [isGifLoaded, setIsGifLoaded] = useState(
    !isTransitionGarden
  );

  const [showDialog, setShowDialog] = useState(true);
  const closeDialog = () => setShowDialog(false);

  const { ArContentsIframe, showCaptureButton } =
    useArContents();

  const { addCapturedPicture, resetCapturedPictures } =
    useStore(capturedPictureStore);

  useArContentsMessages({
    handleARLoaded: () => {
      console.log("AR 로딩 완료!");

      setTimeout(() => {
        setIsArLoaded(true);
      }, 1000);
    },
    handleCapturedImage: (capturedImage) => {
      console.log("캡쳐된 이미지: ", capturedImage);

      addCapturedPicture(blobToUrl(capturedImage));
    },
    handleGifLoaded: () => {
      setIsGifLoaded(true);
    },
  });

  useEffect(() => {
    setShowDialog(true);
    resetCapturedPictures();
  }, []);

  const showArContents = isTransitionGarden
    ? isArLoaded && isGifLoaded
    : isArLoaded;

  return (
    <>
      {showArContents && showDialog && (
        <ArPage.ArGuide
          close={() => {
            showCaptureButton();
            closeDialog();
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

        {showArContents && (
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
            onClick={() => {
              router.back();
            }}
          >
            <img
              className="w-[12px] h-[12px]"
              src="/icons/close.svg"
            />
          </div>
        )}
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
  const router = useRouter();

  const { setHasPermissionError } =
    useStore(introStore);

  return (
    <Overlay>
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
              const deviceMotionPermission =
                await requestDeviceMotionPermission();

              if (
                deviceMotionPermission !== "granted"
              ) {
                const permission =
                  await requestDeviceMotionPermission();

                if (permission === "denied") {
                  setHasPermissionError(true);
                  router.push("/intro");

                  return;
                }
              }

              const iframe =
                document.querySelector("iframe");

              iframe?.contentWindow?.postMessage(
                {
                  type: "ar-guide-closed",
                },
                "*"
              );

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

export const replaceNewlineAsBreak = (str: string) => {
  return str.replaceAll("\n", "<br/>") ?? "";
};

export default ArPage;
