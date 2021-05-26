import React from "react";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({ visible, onClose, children }) => {
  return (
    <>
      {visible && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
        >
          <div
            className="absolute inset-0"
            style={{ zIndex: 12 }}
            onClick={onClose}
          ></div>
          <div style={{ zIndex: 123 }}>{children}</div>
        </div>
      )}
    </>
  );
};
