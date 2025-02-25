import React from "react";

import Splash from "@/app/intro/components/Splash";
import WelcomeDialog from "@/app/intro/components/WelcomeDialog";

const IntroPage = () => {
  return (
    <div>
      <Splash></Splash>

      <WelcomeDialog />
    </div>
  );
};

export default IntroPage;
