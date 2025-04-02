"use client";

import React from "react";
import Dropdown from "@/shared/components/Dropdown";

const TestPage = () => {
  return (
    <div>
      <Dropdown.Container
        className="!fixed top-0 left-0"
        height="46px"
      >
        <Dropdown.SelectedItem
          className="bg-green-200"
          indicator={{
            width: "20px",
            height: "20px",
            source: {
              open: "/icons/plus.svg",
              close: "/icons/minus.svg",
            },
          }}
        />

        <Dropdown.Item
          name="첫번째"
          value="abc"
          className="glassmorph p-[18px]"
        />

        <Dropdown.Item
          name="두번째"
          value="def"
          className="glassmorph p-[18px]"
        />

        <Dropdown.Item
          name="세번째"
          value="hig"
          className="glassmorph p-[18px]"
        />
      </Dropdown.Container>

      <Dropdown.Container
        className="!fixed top-1/2 left-0"
        height="46px"
      >
        <Dropdown.SelectedItem
          className="bg-green-200"
          indicator={{
            width: "20px",
            height: "20px",
            source: {
              open: "/icons/plus.svg",
              close: "/icons/minus.svg",
            },
          }}
        />

        <Dropdown.Item
          name="첫번째"
          value="abc"
          className="glassmorph p-[18px]"
        />

        <Dropdown.Item
          name="두번째"
          value="def"
          className="glassmorph p-[18px]"
        />

        <Dropdown.Item
          name="세번째"
          value="hig"
          className="glassmorph p-[18px]"
        />
      </Dropdown.Container>
    </div>
  );
};

export default TestPage;
