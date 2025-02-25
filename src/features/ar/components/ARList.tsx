import clsx from "clsx";
import React from "react";

const ARList = () => {
  return (
    <ul
      className={clsx(
        "flex-1 w-full",
        "flex flex-col items-center justify-center",
        "gap-[10px]",
        "bg-green-100"
      )}
    >
      <li>1번 AR</li>
      <li>2번 AR</li>
      <li>3번 AR</li>
      <li>4번 AR</li>
      <li>5번 AR</li>
    </ul>
  );
};

export default ARList;
