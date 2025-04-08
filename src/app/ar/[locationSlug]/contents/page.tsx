"use client";

import clsx from "clsx";
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { redirect, useParams } from "next/navigation";
import {
  useArContents,
  useArContentsMessages,
} from "@ar-framework/utils";

import Overlay from "@/shared/components/Overlay";
import useLocation from "@/features/location/hooks/useLocation";
import { LocationSlugs } from "@/features/location/types/location";
import CapturedThumbnails from "@/features/capture/components/CapturedThumbnails";
import { useStore } from "zustand";
import {
  blobToUrl,
  capturedPictureStore,
  NUMBER_OF_CAPTURED_PICTURES,
} from "@/features/capture/store";
import CaptureComplete from "@/features/capture/components/CaptureComplete";
import Button from "@/shared/components/Button";
import ArLoading from "@/features/ar/components/Loading";

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
        />
      )}

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
}: {
  arContentsUrl: string;
}) => {
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
  const close = () => setShowDialog(false);

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
            close();
          }}
        />
      )}

      {!showArContents && <ArLoading />}

      <ArContentsIframe
        src={arContentsUrl}
        visibility={showArContents}
      />
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
}: {
  close: () => void;
}) => {
  return (
    <Overlay>
      <div
        className={clsx(
          "flex flex-col items-center justify-between",
          "p-[45px]",
          "gap-[10px]",
          "w-full h-full",
          "bg-black bg-opacity-50"
        )}
      >
        <div
          className={clsx(
            "flex flex-col items-center",
            "body1 text-center text-white"
          )}
        >
          <h2>가이드 메시지가 출력될 자리입니다</h2>
          <h2>Lorem ipsum dolor sit amet elit.</h2>
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
            onClick={() => close()}
          >
            Okay
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default ArPage;
