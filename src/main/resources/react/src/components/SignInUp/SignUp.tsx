import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { IUser } from "../../utils/interfaces";
import { ContainerWithBackground } from "../shared/ContainerWithBackground";
import { Input } from "../shared/Input";
import { AuthApi } from "../../utils/api";
import { AuthContext } from "../../App";

export const SignUp: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [user, setUser] = useState<IUser>({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitClick = () => {
    if (
      user.email &&
      user.fullName &&
      user.username &&
      user.password &&
      repeatPassword &&
      user.password === repeatPassword
    ) {
      setIsLoading(true);
      AuthApi.register(user)
        .then((response) => {
          alert("Registration went successful!");
        })
        .catch((error) => {
          alert("Something went bananas!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Redirect to="/profile" />
      ) : (
        <ContainerWithBackground>
          <h1 className="text-4xl">Sign Up</h1>
          <div
            className="flex flex-col bg-yellow-500 rounded-lg border shadow-xl px-6 py-8 mt-4"
            style={{ width: "400px" }}
          >
            <Input
              className="mb-8"
              placeholder="Full Name"
              value={user.fullName}
              onChange={(event) =>
                setUser({ ...user, fullName: event.target.value })
              }
            />
            <Input
              className="mb-8"
              placeholder="Email"
              value={user.email}
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              }
            />
            <Input
              className="mb-8"
              placeholder="Username"
              value={user.username}
              onChange={(event) =>
                setUser({ ...user, username: event.target.value })
              }
            />
            <Input
              className="mb-8"
              placeholder="Password"
              type="password"
              value={user.password}
              onChange={(event) =>
                setUser({ ...user, password: event.target.value })
              }
            />
            <Input
              className="mb-8"
              placeholder="Repeat Password"
              type="password"
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
            />
            <button
              className="bg-pink-700 text-white px-6 py-2 rounded-2xl text-lg font-semibold border-white border-2 hover:bg-pink-800"
              onClick={handleSubmitClick}
            >
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </ContainerWithBackground>
      )}
    </>
  );
};
