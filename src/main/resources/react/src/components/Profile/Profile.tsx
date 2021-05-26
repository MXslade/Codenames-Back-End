import React, { useContext } from "react";
import {
  faHistory,
  faUserFriends,
  faStar,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuItem } from "../shared/Menu";
import { Input } from "../shared/Input";
import { Button } from "../shared/Button";
import { ContainerWithBackground } from "../shared/ContainerWithBackground";
import { AuthContext } from "../../App";
import avatar from "../../assets/avatar.png";

export const Profile: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser !== null && (
        <ContainerWithBackground>
          <div
            className="grid grid-rows-1 grid-cols-4 gap-4"
            style={{ width: "900px" }}
          >
            <div className="col-span-1">
              <Menu className="text-white">
                <MenuItem>{currentUser.fullName}</MenuItem>
                <MenuItem icon={faHistory}>Game History</MenuItem>
                <MenuItem icon={faUserFriends}>Friends</MenuItem>
                <MenuItem icon={faStar}>Favourite Moments</MenuItem>
                <MenuItem icon={faSlidersH}>Settings</MenuItem>
              </Menu>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col">
                <div className="bg-yellow-500 px-4 py-2 rounded-md text-white">
                  <h2 className="text-xl mb-4">General Information</h2>
                  <div className="grid grid-rows-1 grid-cols-4">
                    <div className="col-span-1">
                      <div className="flex flex-col">
                        <img
                          src={avatar}
                          alt="avatar"
                          className="rounded-full mb-4"
                        />
                        <Button
                          style={{
                            fontSize: "1rem",
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                          }}
                        >
                          Change Avatar
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex items-center mb-4">
                        <label className="w-32 flex justify-end mr-4">
                          Full Name:
                        </label>
                        <Input value={currentUser.fullName} />
                      </div>
                      <div className="flex items-center mb-4">
                        <label className="w-32 flex justify-end mr-4">
                          Email:
                        </label>
                        <Input value={currentUser.email} />
                      </div>
                      {/* <div className="flex items-center mb-4">
                        <label className="w-32 flex justify-end mr-4">
                          Birth Date:
                        </label>
                        <Input value={"4th August 2000"} />
                      </div> */}
                      <div className="flex items-center mb-4">
                        <label className="w-32 flex justify-end mr-4">
                          Username
                        </label>
                        <Input value={currentUser.username} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContainerWithBackground>
      )}
    </>
  );
};
