import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { IGameRoom, IMessageDto, IUser } from "../../utils/interfaces";
import { GameBoard } from "./GameBoard";
import { Modal } from "../shared/Modal";
import { GameRoomApi } from "../../utils/api";

interface IGameRoomContext {
  users: IUser[];
  config: IMessageDto | null;
  sendUpdatedConfig: (config: IMessageDto) => void;
}

export const GameRoomContext = React.createContext<IGameRoomContext>({
  users: [],
  config: null,
  sendUpdatedConfig: () => {},
});

export const GameRoom: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [gameRoom, setGameRoom] = useState<IGameRoom>();
  const [messageDto, setMessageDto] = useState<IMessageDto | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [resultText, setResultText] = useState<string>("");

  const stompClient = useRef<Stomp.Client | null>(null);

  const connect = () => {
    const socket = new SockJS(`http://localhost:8080/game-room/`);
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, (frame: any) => {
      setIsConnected(true);
      stompClient.current?.subscribe(`/game-broadcaster/${id}`, (response) => {
        // TODO
        // Check the config before updating, because it could cause infinite rerenders!
        if (response.body !== JSON.stringify(messageDto)) {
          setMessageDto(JSON.parse(response.body));
        }
      });
    });
  };

  const getGameRoomData = () => {
    GameRoomApi.getGameRoom(parseInt(id))
      .then((response) => {
        // here I get as response as GameRoom
        // config is still in string format, so first of all I need to convert it to Object and use it later
        setGameRoom(response.data);
        setMessageDto(JSON.parse(response.data.config));
      })
      .catch((error) => {
        alert("Something went wrong while fetching data from server!");
      });
  };

  const sendUpdatedConfig = (config: IMessageDto) => {
    if (stompClient.current) {
      stompClient.current.send(
        `/app/update-config/${id}`,
        {},
        JSON.stringify(config)
      );
    }
  };

  const getMissingUsers = (missingUserIds: number[]) => {
    GameRoomApi.getUsersByIds(missingUserIds)
      .then((response) => {
        setUsers([...users].concat(response.data));
      })
      .catch((error) => {
        alert("Something went wrong while loading users data!");
      });
  };

  useEffect(() => {
    connect();
    getGameRoomData();
  }, []);

  useEffect(() => {
    if (messageDto) {
      // check if somebody opened a killer
      let killerIsOpened = false;
      messageDto.board.forEach((cell) => {
        if (cell.underneath === "KILLER" && cell.opened) {
          killerIsOpened = true;
        }
      });
      if (killerIsOpened) {
        console.log(messageDto.turn, "HAS LOST");
        setResultText(`${messageDto.turn} have lost because of KILLER...`);
        setModalVisible(true);
      }

      // check if somebody won
      let numberOfRedAgents = 0;
      let numberOfOpenedRedAgents = 0;
      let numberOfBlueAgents = 0;
      let numberOfOpenedBlueAgents = 0;
      messageDto.board.forEach((cell) => {
        if (cell.underneath === "RED_AGENT") {
          ++numberOfRedAgents;
          numberOfOpenedRedAgents += cell.opened ? 1 : 0;
        }
        if (cell.underneath === "BLUE_AGENT") {
          ++numberOfBlueAgents;
          numberOfOpenedBlueAgents += cell.opened ? 1 : 0;
        }
      });
      if (numberOfOpenedRedAgents === numberOfRedAgents) {
        console.log("REDS WON");
        setResultText(`${messageDto.turn} have won!`);
        setModalVisible(true);
      }
      if (numberOfOpenedBlueAgents === numberOfBlueAgents) {
        console.log("BLUES WON");
        setResultText(`${messageDto.turn} have won!`);
        setModalVisible(true);
      }

      // check for new users
      const missingUserIds: number[] = [];
      messageDto.reds.forEach((red) => {
        const index = users.findIndex((user) => user.id === red);
        if (index === -1) {
          missingUserIds.push(red);
        }
      });
      messageDto.blues.forEach((blue) => {
        const index = users.findIndex((user) => user.id === blue);
        if (index === -1) {
          missingUserIds.push(blue);
        }
      });
      if (
        messageDto.redsCap &&
        users.findIndex((user) => user.id === messageDto.redsCap) === -1
      ) {
        missingUserIds.push(messageDto.redsCap);
      }
      if (
        messageDto.bluesCap &&
        users.findIndex((user) => user.id === messageDto.bluesCap) === -1
      ) {
        missingUserIds.push(messageDto.bluesCap);
      }

      getMissingUsers(missingUserIds);
    }
  }, [messageDto]);

  return (
    <GameRoomContext.Provider
      value={{
        users,
        config: messageDto,
        sendUpdatedConfig,
      }}
    >
      <div className="flex flex-col bg-blue-100" style={{ minHeight: "800px" }}>
        {isConnected && messageDto && <GameBoard />}
      </div>
      <Modal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          history.push("/game-room-list");
        }}
      >
        <div className="px-8 py-4 flex align-center justify-center bg-yellow-500 text-white rounded-lg font-bold text-2xl">
          {resultText}
        </div>
      </Modal>
    </GameRoomContext.Provider>
  );
};
