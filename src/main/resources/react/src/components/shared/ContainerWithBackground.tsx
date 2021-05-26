import React, { CSSProperties } from "react";
import backgroundImage from "../../assets/background-image.webp";

interface Props {
  style?: CSSProperties;
}

export const ContainerWithBackground: React.FC<Props> = (props) => {
  const { style } = props;

  return (
    <div
      className="px-10 flex flex-col items-center pt-8 text-white bg-center bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: "800px",
        ...style,
      }}
    >
      {props.children}
    </div>
  );
};
