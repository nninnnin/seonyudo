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
    capturedPictures.length ===
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

      {isCapturingCompleted && <CaptureComplete />}
    </>
  );
};

ArPage.ArContents = ({
  arContentsUrl,
}: {
  arContentsUrl: string;
}) => {
  const [showArContents, setShowArContents] =
    useState(false);

  const [showDialog, setShowDialog] = useState(true);
  const close = () => setShowDialog(false);

  const { ArContentsIframe, showCaptureButton } =
    useArContents();

  const { addCapturedPicture } = useStore(
    capturedPictureStore
  );

  useArContentsMessages({
    handleARLoaded: () => {
      console.log("AR 로딩 완료!");
      setShowArContents(true);
    },
    handleCapturedImage: (capturedImage) => {
      console.log("캡쳐된 이미지: ", capturedImage);

      addCapturedPicture(blobToUrl(capturedImage));
    },
  });

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

      {!showArContents && (
        <div
          className={clsx(
            "bg-[violet] text-white text-2xl",
            "w-[100vw] h-[100dvh]",
            "fixed top-0 left-0 z-[9999]"
          )}
        >
          로딩중..
        </div>
      )}

      {useMemo(
        () => (
          <ArContentsIframe
            src={arContentsUrl}
            visibility={showArContents}
          />
        ),
        [arContentsUrl, showArContents]
      )}
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
          "flex flex-col items-center justify-center",
          "gap-[10px]",
          "p-[20px]",
          "w-[300px] h-[300px]",
          "bg-white"
        )}
      >
        <h2>AR Guide</h2>

        <p>
          Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Similique quia qui minima
          impedit necessitatibus. Iure eveniet
          asperiores dolor placeat voluptates.
        </p>

        <button
          className="bg-black text-white p-[10px]"
          onClick={close}
        >
          close
        </button>
      </div>
    </Overlay>
  );
};

export default ArPage;
