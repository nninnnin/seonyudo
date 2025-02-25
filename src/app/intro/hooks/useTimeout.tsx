"use client";

import { useEffect, useState } from "react";

const useTimeout = (timeout: number) => {
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsTimeout(true);
    }, timeout);
  }, []);

  return {
    isTimeout,
  };
};

export default useTimeout;
