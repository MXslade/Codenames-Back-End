import React, { useState, useEffect, useContext } from "react";
import { TeamList } from "./TeamList";
import { GameBoardCell } from "./GameBoardCell";
import { Button } from "../shared/Button";
import { Title } from "../shared/Title";
import { AuthContext } from "../../App";
import { GameRoomContext } from "./GameRoom";

export const GameBoard: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { config, sendUpdatedConfig } = useContext(GameRoomContext);

  const [isSet, setIsSet] = useState<boolean>(false);
  const [canFinishTurn, setCanFinishTurn] = useState<boolean>(false);

  useEffect(() => {
    if (config && currentUser && currentUser.id) {
      setIsSet(
        config.reds.length > 0 &&
          config.blues.length > 0 &&
          config.bluesCap != null &&
          config.redsCap != null
      );
      if (config.turn === "REDS") {
        if (
          currentUser.id === config.redsCap ||
          config.reds.findIndex((red) => red === currentUser.id) !== -1
        ) {
          setCanFinishTurn(true);
        } else {
          setCanFinishTurn(false);
        }
      } else {
        if (
          currentUser.id === config.bluesCap ||
          config.blues.findIndex((blue) => blue === currentUser.id) !== -1
        ) {
          setCanFinishTurn(true);
        } else {
          setCanFinishTurn(false);
        }
      }
    }
  }, [config, currentUser]);

  const handleStartGameClick = () => {
    if (config) {
      const copyConfig = { ...config, gameStarted: true };
      sendUpdatedConfig(copyConfig);
    }
  };

  const handleFinishTurnClick = () => {
    if (config && currentUser && currentUser.id) {
      if (config.turn === "REDS") {
        if (
          currentUser.id === config.redsCap ||
          config.reds.findIndex((red) => red === currentUser.id) !== -1
        ) {
          sendUpdatedConfig({ ...config, turn: "BLUES" });
        }
      } else {
        if (
          currentUser.id === config.bluesCap ||
          config.blues.findIndex((blue) => blue === currentUser.id) !== -1
        ) {
          sendUpdatedConfig({ ...config, turn: "REDS" });
        }
      }
    }
  };

  return (
    <>
      {config && (
        <div className="w-full h-full flex flex-col">
          {config.gameStarted && (
            <div className="w-full flex items-center justify-center">
              <div className="bg-pink-700 text-white">
                <Title>{config.turn} turn timer</Title>
              </div>
            </div>
          )}
          <div className="w-full h-full grid grid-cols-6 gap-4 p-4 ">
            <div className="col-span-1">
              <TeamList
                members={config.reds}
                teamColor="red"
                cap={config.redsCap}
              />
              {isSet && !config.gameStarted && (
                <Button onClick={handleStartGameClick}>Start Game</Button>
              )}
            </div>
            <div className="col-span-4 grid grid-cols-5 grid-rows-5 gap-4">
              {config.board.map((cell) => (
                <GameBoardCell key={cell.row + " " + cell.col} cell={cell} />
              ))}
            </div>
            <div className="col-span-1">
              <TeamList
                members={config.blues}
                teamColor="blue"
                cap={config.bluesCap}
              />
            </div>
          </div>
          {config.gameStarted && canFinishTurn && (
            <div className="w-full flex items-center justify-center">
              <div className="text-white">
                <Button onClick={handleFinishTurnClick}>Finish Turn</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
