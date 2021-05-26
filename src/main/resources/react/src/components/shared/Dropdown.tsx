import React, { useState } from "react";

interface Props {
  triggers: Array<"click" | "hover">;
  menu: JSX.Element;
}

export const Dropdown: React.FC<Props> = (props) => {
  const { triggers, menu } = props;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleClick = () => {
    if (triggers.indexOf("click") !== -1) {
      setIsVisible(!isVisible);
    }
  };

  const handleMouseEnter = () => {
    if (triggers.indexOf("hover") !== -1) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggers.indexOf("hover") !== -1) {
      setIsVisible(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-full flex items-center"
    >
      {props.children}
      {isVisible && (
        <div
          className="absolute top-9 transform -translate-x-3/4"
          style={{ width: "300px" }}
        >
          {menu}
        </div>
      )}
    </div>
  );
};
