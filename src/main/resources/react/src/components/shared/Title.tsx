import React from "react";

export const Title: React.FC = ({ children }) => {
  return (
    <div className="w-full px-4 py-2 flex items-center justify-center uppercase font-bold">
      {children}
    </div>
  );
};
