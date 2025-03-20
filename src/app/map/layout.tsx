import React from "react";

import PageHeader from "@/shared/components/PageHeader";

const MapLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <PageHeader />
      {children}
    </>
  );
};

export default MapLayout;
