import React from "react";

import Toast from "@/shared/components/Toast";

const EndingToast = ({
  close,
}: {
  close: () => void;
}) => {
  return (
    <Toast className="!min-h-0" close={close}>
      <div className="text-[14px] leading-[134%] font-bold">
        모든 체험을 완료했어요!
        <br />
        AR 콘텐츠는 언제든 다시 즐길 수 있어요
        <br />
        You've completed all experiences!
        <br />
        Enjoy the AR content anytime
      </div>
    </Toast>
  );
};

export default EndingToast;
