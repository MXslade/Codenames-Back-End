import React, { useContext, useEffect, useState } from "react";
import { Title } from "../shared/Title";
import { Button } from "../shared/Button";
import { AuthContext } from "../../App";
import { GameRoomContext } from "./GameRoom";
import {
  addElementToFirstArrayAndRemoveFromSecond,
  removeElementIfExistsInArray,
} from "../../utils/functions";

interface Props {
  members: number[];
  teamColor: "red" | "blue";
  cap: number | null;
}

export const TeamList: React.FC<Props> = ({ members, teamColor, cap }) => {
  const { currentUser } = useContext(AuthContext);
  const { config, sendUpdatedConfig, users } = useContext(GameRoomContext);

  const [canJoinAsMember, setCanJoinAsMember] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      const index = members.findIndex((member) => member === currentUser.id);
      setCanJoinAsMember(index === -1);
    }
  }, [currentUser, members]);

  const handleJoinTeamClick = () => {
    if (currentUser && currentUser.id && canJoinAsMember && config) {
      const reds = [...config.reds];
      const blues = [...config.blues];
      let redsCap = config.redsCap;
      let bluesCap = config.bluesCap;

      if (teamColor === "red") {
        addElementToFirstArrayAndRemoveFromSecond(currentUser.id, reds, blues);
      } else {
        addElementToFirstArrayAndRemoveFromSecond(currentUser.id, blues, reds);
      }

      if (redsCap === currentUser.id) {
        redsCap = null;
      }
      if (bluesCap === currentUser.id) {
        bluesCap = null;
      }

      const copyConfig = { ...config, reds, blues, redsCap, bluesCap };
      sendUpdatedConfig(copyConfig);
    }
  };

  const handleJoinAsCapClick = () => {
    if (currentUser && currentUser.id && !cap && config) {
      const reds = [...config.reds];
      const blues = [...config.blues];
      let redsCap = config.redsCap;
      let bluesCap = config.bluesCap;

      removeElementIfExistsInArray(currentUser.id, reds);
      removeElementIfExistsInArray(currentUser.id, blues);

      if (redsCap === currentUser.id) {
        redsCap = null;
      }
      if (bluesCap === currentUser.id) {
        bluesCap = null;
      }

      if (teamColor === "red") {
        redsCap = currentUser.id;
      } else {
        bluesCap = currentUser.id;
      }

      const copyConfig = { ...config, reds, blues, redsCap, bluesCap };
      sendUpdatedConfig(copyConfig);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="bg-pink-700 rounded-t-lg text-white">
        <Title>{teamColor} Team</Title>
      </div>
      {members.length ? (
        <>
          {members.map((member) => (
            <div
              key={member}
              className="w-full border border-black bg-gray-400"
              style={
                member === currentUser?.id
                  ? { backgroundColor: "#A7F3D0" }
                  : undefined
              }
            >
              {users.find((user) => user.id === member)?.fullName}
            </div>
          ))}
        </>
      ) : (
        <div className="w-full border border-black bg-gray-100 px-2 py-1">
          Team is empty
        </div>
      )}

      {canJoinAsMember && config && !config.gameStarted && (
        <Button onClick={handleJoinTeamClick}>Join Team</Button>
      )}

      <div className="bg-pink-700 rounded-t-lg text-white">
        <Title>Team Cap</Title>
      </div>
      {cap ? (
        <div
          className="w-full border border-black bg-gray-100 px-2 py-1"
          style={
            cap === currentUser?.id ? { backgroundColor: "#A7F3D0" } : undefined
          }
        >
          {users.find((user) => user.id === cap)?.fullName}
        </div>
      ) : (
        <>
          <div className="w-full border border-black bg-gray-100 px-2 py-1">
            There is no cap
          </div>
          {config && !config.gameStarted && (
            <Button onClick={handleJoinAsCapClick}>Join As cap</Button>
          )}
        </>
      )}
    </div>
  );
};
