"use client";

import clsx from "clsx";
import {
  useRouter,
  redirect,
  useParams,
} from "next/navigation";
import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import dynamic from "next/dynamic";

import { capturedPictureStore } from "@/features/capture/store";
import { useArCompletionStore } from "@/features/ar/store";
import useLocation from "@/features/location/hooks/useLocation";
import {
  LocationName,
  LocationSlugs,
} from "@/features/location/types/location";
import { recommendationToastStore } from "@/features/map/hooks/useLocationRecommendation";
import useLoadingOverlay from "@/shared/hooks/useLoadingOverlay";
import Button from "@/shared/components/Button";

const CapturedImageCard = dynamic(
  () =>
    import(
      "@/features/capture/components/CapturedImageCard"
    ),
  {
    ssr: false,
  }
);

const SharePage = () => {
  const params = useParams();
  const locationSlug = params["locationSlug"];

  if (!locationSlug) {
    redirect("/");
  }

  const router = useRouter();
  const { openLoadingOverlay } = useLoadingOverlay();
  const { addArCompletedLocations } =
    useArCompletionStore();
  const { setHasSeen } = useStore(
    recommendationToastStore
  );

  const { location } = useLocation(
    locationSlug as LocationSlugs
  );

  const { selectedCardIndex, capturedPictures } =
    useStore(capturedPictureStore);

  useEffect(() => {
    if (!capturedPictures?.length) {
      redirect("/");
    }
  }, [capturedPictures]);

  const [isSharing, setIsSharing] = useState(false);

  const dummy = [
    {
      id: "1",
      url: "/images/captured1.jpg",
    },
    {
      id: "2",
      url: "/images/captured2.jpg",
    },
    {
      id: "3",
      url: "/images/captured3.jpg",
    },
  ];

  const handleBackClick = () => router.back();

  const handleShareClick = async () => {
    if (!navigator.share) {
      alert("다운로드 할 수 없습니다.");
    }

    setIsSharing(true);

    const currentCard = (
      capturedPictures && capturedPictures.length > 0
        ? capturedPictures
        : dummy
    )[selectedCardIndex];

    const response = await fetch(currentCard.url);
    const blob = await response.blob();

    const fileName = `선유도 체험사진-${selectedCardIndex}.png`;

    const file = new File([blob], fileName, {
      type: "image/png",
    });

    navigator
      .share({
        files: [file],
        title: fileName,
        text: fileName,
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error sharing:", error);
        }
      })
      .finally(() => {
        setIsSharing(false);
      });
  };

  const {
    setHelloByCompleted,
    resetArCompletedLocations,
  } = useArCompletionStore();

  // 해당 페이지에 오기만 해도 거점 완료한 것으로 처리
  useEffect(() => {
    if (!location) return;

    addArCompletedLocations(location!.name.KO!);
  }, [location]);

  const handleDoneClick = () => {
    setHasSeen(false);

    // @ts-ignore
    if (location!.slug === "hellobye") {
      setHelloByCompleted(true);
      resetArCompletedLocations();
    }

    openLoadingOverlay("지도를 불러오는 중입니다..");

    router.push("/map");
  };

  const handleSaveClick = () => {
    const currentCard =
      capturedPictures[selectedCardIndex];
    const nameMapper: Record<
      LocationSlugs | (string & {}),
      LocationName
    > = {
      greencolumns: "녹색기둥의 정원",
      purification: "수질정화원",
      seonyujeong: "선유정",
      seonyugyo: "선유도 전망대",
      transitiongarden: "시간의 정원",
      "test-greencolumns": "녹색기둥의 정원",
      "test-purification": "수질정화원",
      "test-seonyujeong": "선유정",
      "test-seonyugyo": "선유도 전망대",
      "test-transitiongarden": "시간의 정원",
    };
    const locationName =
      nameMapper[locationSlug as LocationSlugs];
    const filename = `선유도 ${
      locationName ? `-${locationName}` : ""
    }에서`;
    downloadImage(currentCard.url, filename);
  };

  return (
    <div
      className={clsx(
        "w-full h-full",
        "sharing-background-gradient"
      )}
    >
      <div
        className={clsx(
          "flex justify-between items-center",
          "pt-[3dvh] px-[3dvh]"
        )}
      >
        <SharePage.BackButton
          onClick={handleBackClick}
        />

        <SharePage.CloseButton
          onClick={handleDoneClick}
        />
      </div>

      <h1
        className={clsx(
          "w-full",
          "body1 text-center text-white",
          "fixed top-[13dvh] left-1/2 -translate-x-1/2"
        )}
      >
        <span>사진을 저장하고 공유하세요</span>
        <br />
        <span>Save and share your photos</span>
      </h1>

      <div
        className={clsx(
          "w-[240px] h-[360px]",
          "fixed top-[25dvh] left-1/2 -translate-x-1/2",
          "flex gap-[30px]"
        )}
      >
        {(capturedPictures &&
        capturedPictures.length > 0
          ? capturedPictures
          : dummy
        ).map(({ id, url }, index) => {
          return (
            <CapturedImageCard
              key={`captured-image-${id}`}
              src={url}
              cardIndex={index}
            />
          );
        })}
      </div>

      <div
        className={clsx(
          "fixed bottom-0 left-0",
          "w-full",
          "flex items-center justify-center",
          "gap-[16px]",
          "pb-[5dvh]",
          isSharing && "pointer-events-none"
        )}
      >
        {getMobileOS() === "Android" ? (
          <>
            <Button
              iconSource="/icons/download.svg"
              theme="white"
              onClick={handleSaveClick}
            >
              Save
            </Button>
            <Button
              iconSource="/icons/share.svg"
              theme="white"
              onClick={handleShareClick}
            >
              Share
            </Button>
          </>
        ) : (
          <>
            <Button
              iconSource="/icons/share.svg"
              theme="white"
              onClick={handleShareClick}
            >
              Save / Share
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SharePage;

SharePage.BackButton = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <div
      className={clsx(
        "fixed top-[16px] left-[16px] z-[4000]",
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
        className="w-[16px] h-[16px]"
        src="/icons/caret--left.svg"
      />
    </div>
  );
};

SharePage.CloseButton = ({
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

function getMobileOS() {
  const userAgent =
    navigator.userAgent ||
    navigator.vendor ||
    window.opera;

  // iOS detection
  if (
    /iPad|iPhone|iPod/.test(userAgent) &&
    !window.MSStream
  ) {
    return "iOS";
  }

  // Android detection
  if (/android/i.test(userAgent)) {
    return "Android";
  }

  return "unknown";
}

function downloadImage(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
