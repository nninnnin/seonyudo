import clsx from "clsx";
import React from "react";

const Dropdown = () => {};

Dropdown.Container = ({
  children,
  showItems,
  className = "",
}: {
  children: React.ReactNode;
  showItems: boolean;
  className?: string;
}) => {
  return (
    <ul className={clsx("w-full", className)}>
      {children}
    </ul>
  );
};

Dropdown.Item = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <li className={clsx("w-full", className)}>
      {children}
    </li>
  );
};

export default Dropdown;
