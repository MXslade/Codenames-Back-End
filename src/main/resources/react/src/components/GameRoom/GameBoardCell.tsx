import React, { useContext, useEffect, useState } from "react";
import { ICardDto } from "../../utils/interfaces";
import { AuthContext } from "../../App";
import { GameRoomContext } from "./GameRoom";

interface Props {
  cell: ICardDto;
  // onClick: (cell: IGameBoardCell) => void;
}

export const GameBoardCell: React.FC<Props> = ({ cell }) => {
  const { currentUser } = useContext(AuthContext);
  const { config, sendUpdatedConfig } = useContext(GameRoomContext);

  const [cellColor, setCellColor] = useState<string>("");

  useEffect(() => {
    if (config && currentUser && currentUser.id) {
      if (
        currentUser.id === config.redsCap ||
        currentUser.id === config.bluesCap
      ) {
        switch (cell.underneath) {
          case "RED_AGENT":
            setCellColor("#EF4444");
            break;
          case "BLUE_AGENT":
            setCellColor("#60A5FA");
            break;
          case "ORDINARY":
            setCellColor("#FEF3C7");
            break;
          case "KILLER":
            setCellColor("black");
            break;
        }
      }
    }
  }, [cell, config, currentUser]);

  const handleCellClick = () => {
    if (config && currentUser && currentUser.id) {
      if (config.turn === "REDS") {
        const index = config.reds.findIndex((red) => red === currentUser.id);
        if (index !== -1) {
          const board = [...config.board];
          board[cell.row * 5 + cell.col] = {
            ...cell,
            opened: true,
          };
          sendUpdatedConfig({ ...config, board });
        }
      } else {
        const index = config.blues.findIndex((blue) => blue === currentUser.id);
        if (index !== -1) {
          const board = [...config.board];
          board[cell.row * 5 + cell.col] = {
            ...cell,
            opened: true,
          };
          sendUpdatedConfig({ ...config, board });
        }
      }
    }
  };

  return (
    <>
      {!cell.opened && config && currentUser && currentUser.id ? (
        <div
          className="w-full h-32 border border-gray-700 flex items-center justify-center uppercase font-bold p-3 rounded-lg bg-yellow-100"
          style={
            cellColor && config.gameStarted
              ? { backgroundColor: cellColor }
              : undefined
          }
          onClick={handleCellClick}
        >
          <div className="w-full h-full border border-black flex items-center justify-center p-2 rounded-lg flex-col">
            <div className="w-full h-full flex items-end mb-1">
              <hr className="w-full bg-gray-500 h-1" />
            </div>
            <div className="w-full h-full bg-white flex items-center justify-center">
              <span>{cell.text}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-32 border border-gray-700 flex items-center justify-center uppercase font-bold p-3 rounded-lg">
          {cell.underneath}
        </div>
      )}
    </>
  );
};
