"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
  redirect,
  useSearchParams,
} from "next/navigation";

import Overlay from "@/shared/components/Overlay";
import ArFrame from "@/features/ar/components/ArFrame";
import useLocation from "@/features/location/hooks/useLocation";

const ArPage = () => {
  const searchParams = useSearchParams();

  const locationName = searchParams?.get("location");
  const { location } = useLocation(locationName ?? "");

  const [hasArContents, setHasArContents] = useState<
    null | boolean
  >(null);

  useEffect(() => {
    if (!location?.arContentsUrl) {
      setHasArContents(false);
    } else {
      setHasArContents(true);
    }
  }, [location]);

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
    </>
  );
};

ArPage.ArContents = ({
  arContentsUrl,
}: {
  arContentsUrl: string;
}) => {
  const [showDialog, setShowDialog] = useState(true);
  const close = () => setShowDialog(false);

  return (
    <>
      {showDialog && <ArPage.ArGuide close={close} />}
      <ArFrame src={arContentsUrl} />
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
