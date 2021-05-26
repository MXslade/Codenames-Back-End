import React from "react";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";

export const SelectingNicknamePanel: React.FC = () => {
  return (
    <div className="flex rounded-2xl">
      <div className="flex flex-col items-center justify-center bg-white p-4">
        <p className="font-bold text-xl">Welcome to Codenames</p>
        <p>Selected web-site language</p>
        <p>To enter the room, choose a nickname.</p>
        <Input placeholder="Choose your nickname" className="my-4" />
        <Button>Create Room</Button>
      </div>
    </div>
  );
};
