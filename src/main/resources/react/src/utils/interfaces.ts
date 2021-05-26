export interface IRole {
  id?: number;
  name: string;
}

export interface IUser {
  id?: number;
  email: string;
  username: string;
  password: string;
  fullName: string;
  roles?: IRole[];
}

export interface IGameBoardCell {
  row: number;
  column: number;
  color: string;
}

export interface IGameBoardConfig {
  id?: number;
  config: IGameBoardCell[];
}

export interface IGameRoom {
  id?: number;
  name: string;
  config: string | null;
  maxNumberOfPlayers: number;
  language: string;
  active: boolean;
  users: IUser[];
}

export interface ICardDto {
  row: number;
  col: number;
  text: string;
  opened: boolean;
  underneath: "BLUE_AGENT" | "RED_AGENT" | "ORDINARY" | "KILLER";
}

// aka config which I am gonna send back and forth between users and server
export interface IMessageDto {
  gameRoomId: string;
  reds: number[];
  blues: number[];
  board: ICardDto[];
  turn: "REDS" | "BLUES";
  redsCap: number | null;
  bluesCap: number | null;
  gameStarted: boolean;
}
