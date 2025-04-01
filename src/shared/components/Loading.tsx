import React from "react";

import Overlay from "@/shared/components/Overlay";

const Loading = ({ message }: { message: string }) => {
  return (
    <Overlay>
      <span className="text-white font-bold">
        {message}
      </span>
    </Overlay>
  );
};

export default Loading;
