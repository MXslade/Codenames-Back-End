import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { IGameRoom } from "../../utils/interfaces";
import { GameRoomApi } from "../../utils/api";
import { Button } from "../shared/Button";
import { Modal } from "../shared/Modal";
import { Input } from "../shared/Input";

const defaultThClass =
  "px-4 py-2 cursor-pointer hover:bg-pink-900 border border-gray-500";
const defaultTdClass = "px-4 py-2 cursor-pointer border border-gray-500";

export const GameRoomList: React.FC = () => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [gameRooms, setGameRooms] = useState<IGameRoom[]>([]);
  const [createRoomModalVisible, setCreateRoomModalVisible] = useState<boolean>(
    false
  );
  const [formData, setFormData] = useState<IGameRoom>({
    name: "",
    language: "",
    config: null,
    active: true,
    maxNumberOfPlayers: 4,
    users: [],
  });

  const getAllRooms = () => {
    setIsLoading(true);
    GameRoomApi.getAllGameRooms()
      .then((response) => {
        const temp = response.data;
        temp.sort((first: any, second: any) => first.id - second.id);
        setGameRooms(response.data);
      })
      .catch((error) => {
        alert("some shit happened");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: event.target.value });
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, language: event.target.value });
  };

  const handleMaxNumberOfPlayersChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      maxNumberOfPlayers: parseInt(event.target.value),
    });
  };

  const handleCreateRoomClick = () => {
    if (formData.name && formData.language && formData.maxNumberOfPlayers) {
      setIsLoading(true);
      GameRoomApi.createGameRoom(formData)
        .then((response) => {
          history.push(`/game-room/${response.data.id}`);
          getAllRooms();
        })
        .catch((error) => {
          alert("Error occurred. Try again later!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      alert("Fill out all fields!");
    }
  };

  const handleGameRoomClick = (gameRoom: IGameRoom) => {
    if (gameRoom.id) {
      history.push(`/game-room/${gameRoom.id}`);
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center bg-yellow-100 flex-col"
        style={{ minHeight: "800px" }}
      >
        <div>
          <Button onClick={() => setCreateRoomModalVisible(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <Button onClick={() => getAllRooms()}>
            <FontAwesomeIcon
              icon={faUndo}
              className={`${isLoading && "animate-spin"}`}
            />
          </Button>
        </div>

        <table>
          <thead className="bg-pink-700 text-white border-2 border-pink-900">
            <tr>
              <th className={defaultThClass}>Id</th>
              <th className={defaultThClass} style={{ minWidth: "150px" }}>
                Name
              </th>
              <th className={defaultThClass}>Language</th>
              <th className={defaultThClass}>Max # Players</th>
            </tr>
          </thead>
          <tbody
            className="bg-pink-200 border-2 border-pink-900"
            style={{ maxHeight: "600px", overflow: "scroll" }}
          >
            {gameRooms.map((gameRoomItem) => (
              <tr
                key={gameRoomItem.id}
                className="hover:bg-blue-300"
                onClick={() => handleGameRoomClick(gameRoomItem)}
              >
                <td className={defaultTdClass}>{gameRoomItem.id}</td>
                <td className={defaultTdClass}>{gameRoomItem.name}</td>
                <td className={defaultTdClass}>{gameRoomItem.language}</td>
                <td className={defaultTdClass}>
                  {gameRoomItem.maxNumberOfPlayers}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        visible={createRoomModalVisible}
        onClose={() => setCreateRoomModalVisible(false)}
      >
        <div
          className="flex flex-col bg-yellow-500 rounded-lg border shadow-xl px-6 py-8 mt-4"
          style={{ width: "400px" }}
        >
          <span className="text-white text-xl mb-8 font-bold">
            Create Game Room
          </span>
          <Input
            className="mb-8"
            placeholder="Name"
            value={formData.name}
            onChange={handleNameChange}
          />
          <Input
            className="mb-8"
            placeholder="Language"
            value={formData.language}
            onChange={handleLanguageChange}
          />
          <Input
            className="mb-8"
            placeholder="Max number of players"
            type="number"
            value={formData.maxNumberOfPlayers}
            onChange={handleMaxNumberOfPlayersChange}
          />
          <Button onClick={handleCreateRoomClick}>
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </Modal>
    </>
  );
};
