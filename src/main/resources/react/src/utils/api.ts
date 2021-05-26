import axios from "axios";
import { IGameRoom, IUser } from "./interfaces";
import { jwtTokenKeyName } from "./constants";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(jwtTokenKeyName);
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("jwtToken");
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthApi = {
  authenticate(email: string, password: string) {
    return axios.post("http://localhost:8080/auth", {
      email: email,
      password: password,
    });
  },

  register(user: IUser) {
    return instance.post("register", user);
  },

  getUserData() {
    return instance.get("user-data");
  },
};

export const GameRoomApi = {
  getAllGameRooms() {
    return instance.get("game-rooms");
  },
  createGameRoom(gameRoom: IGameRoom) {
    return instance.post("game-rooms", gameRoom);
  },
  getGameRoom(id: number) {
    return instance.get(`game-room/${id}`);
  },
  getUsersByIds(userIds: number[]) {
    return instance.post("users", userIds);
  },
};
