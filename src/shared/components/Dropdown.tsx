import clsx from "clsx";
import React, {
  createContext,
  MouseEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import { Pixel } from "@/shared/types";

const Dropdown = () => {};

type SelectedItem = {
  name: string;
  value: string | null;
} | null;

const DropdownContext = createContext<{
  selectedItem: SelectedItem;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<SelectedItem>
  >;
  isOpen: boolean;
  height: Pixel;
  disabled?: boolean;
}>({
  selectedItem: null,
  setSelectedItem: () => {},
  isOpen: false,
  height: "0px",
  disabled: false,
});

Dropdown.Container = ({
  children,
  height,
  className = "",
  onChange = () => {},
  disabled = false,
}: {
  children: React.ReactNode;
  height: Pixel;
  className?: string;
  onChange?: (item: SelectedItem) => void;
  disabled?: boolean;
}) => {
  const [selectedItem, setSelectedItem] =
    useState<SelectedItem>(null);

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const dropdownItems =
      dropdownRef.current?.querySelectorAll("li");

    dropdownItems?.forEach((item) => {
      item.style.setProperty("height", height);
      item.style.setProperty("min-height", height);
      item.style.setProperty("max-height", height);
    });
  }, []);

  return (
    <DropdownContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
        isOpen,
        height,
        disabled,
      }}
    >
      <ul
        ref={dropdownRef}
        className={clsx(
          "w-full",
          "border-[1px] border-solid border-gray-200",
          "overflow-hidden",
          "flex flex-col",
          "relative",
          className
        )}
        style={{ height: isOpen ? "auto" : height }}
        onClick={(e: MouseEvent) => {
          if (disabled) {
            e.stopPropagation();
            return;
          }

          const target = e.target as HTMLElement & {
            name: string;
            value: string;
          };

          if (target.id === "dropdown-indicator") {
            setIsOpen((prev) => !prev);
          }

          if (target.tagName === "LI") {
            if (isOpen) {
              const selectedItem = {
                name: target.dataset.name ?? "",
                value: target.value,
              };

              if (target.onclick) {
                // @ts-ignore
                target.onclick(e);
              }

              setSelectedItem(selectedItem);
              onChange(selectedItem);
              setIsOpen(false);
            } else {
              setIsOpen(true);
            }
          }
        }}
      >
        {children}
      </ul>
    </DropdownContext.Provider>
  );
};

Dropdown.SelectedItem = ({
  className = "",
  indicator,
  defaultValue,
}: {
  className?: string;
  indicator: {
    width: string;
    height: string;
    source: {
      open: string;
      close: string;
    };
  };
  defaultValue?: {
    name: string;
    value: string | null;
  };
}) => {
  const { selectedItem, setSelectedItem, disabled } =
    useContext(DropdownContext);

  const name =
    selectedItem?.name ??
    defaultValue?.name ??
    "선택해주세요";

  const value =
    selectedItem?.value ?? defaultValue?.value ?? null;

  useEffect(() => {
    if (defaultValue) {
      setSelectedItem(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className="relative">
      <Dropdown.Item
        className={className}
        name={name}
        value={value}
      />

      {!disabled && (
        <Dropdown.Indicator
          width={indicator.width}
          height={indicator.height}
          source={indicator.source}
        />
      )}
    </div>
  );
};

Dropdown.Item = ({
  className = "",
  name,
  value,
  onClick = () => {},
  subList,
}: {
  className?: string;
  name: string;
  value: string | null;
  onClick?: () => void;
  subList?: React.ReactNode;
}) => {
  const { height } = useContext(DropdownContext);

  return (
    <motion.li
      className={clsx(
        "w-full",
        "text-[16px] tracking-[-0.408px] leading-[134%] font-bold",
        "flex justify-center items-center",
        "relative",
        className
      )}
      onClick={onClick}
      data-name={name}
      value={value ?? undefined}
      style={{
        height,
      }}
    >
      {name}

      <div style={{}}>{subList}</div>
    </motion.li>
  );
};

Dropdown.Indicator = ({
  width,
  height,
  source,
}: {
  width: string;
  height: string;
  source: {
    open: string;
    close: string;
  };
}) => {
  const { isOpen } = useContext(DropdownContext);

  return (
    <img
      id="dropdown-indicator"
      className={clsx(
        "absolute top-1/2 right-[16px] -translate-y-1/2"
      )}
      src={isOpen ? source.close : source.open}
      style={{
        width,
        height,
      }}
    />
  );
};

export default Dropdown;
