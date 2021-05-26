import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVk,
  faTelegram,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { Button } from "../shared/Button";

const defaultFooterIconClass = "mx-4 text-3xl hover:text-gray-300";

export const Footer: React.FC = () => {
  return (
    <>
      <div className="flex bg-pink-700 text-white items-center justify-center py-4">
        Here I am gonna list all languages
      </div>
      <div className="flex bg-pink-900 text-white items-center justify-center py-4">
        <Button>Subscribe for news</Button>
        <FontAwesomeIcon icon={faVk} className={defaultFooterIconClass} />
        <FontAwesomeIcon icon={faTelegram} className={defaultFooterIconClass} />
        <FontAwesomeIcon icon={faDiscord} className={defaultFooterIconClass} />
      </div>
    </>
  );
};
