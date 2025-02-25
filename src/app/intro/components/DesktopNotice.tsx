"use client";

import clsx from "clsx";
import React from "react";
import { QRCodeSVG } from "qrcode.react";

const DesktopNotice = () => {
  return (
    <div
      className={clsx(
        "w-[100vw] h-[100dvh] bg-slate-100",
        "flex flex-col justify-center items-center"
      )}
    >
      <p className="mb-[10px] text-center">
        Desktop not supported. <br />
        Please visit on mobile picturing the QR code
        below
      </p>
      <QRCodeSVG value={location.origin} size={180} />
    </div>
  );
};

export default DesktopNotice;
