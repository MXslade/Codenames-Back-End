import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ContainerWithBackground } from "../shared/ContainerWithBackground";
import { Input } from "../shared/Input";
import { AuthApi } from "../../utils/api";
import { AuthContext } from "../../App";
import { jwtTokenKeyName } from "../../utils/constants";

export const SignIn: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitClick = () => {
    if (email && password) {
      setIsLoading(true);

      AuthApi.authenticate(email, password)
        .then((response) => {
          localStorage.setItem(jwtTokenKeyName, response.data.jwtToken);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.log("Error!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      alert("Username and password cannot be empty!");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Redirect to="/profile" />
      ) : (
        <ContainerWithBackground>
          <h1 className="text-4xl">Sign In</h1>
          <div
            className="flex flex-col bg-yellow-500 rounded-lg border shadow-xl px-6 py-8 mt-4"
            style={{ width: "400px" }}
          >
            <Input
              className="mb-8"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              className="mb-8"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="bg-pink-700 text-white px-6 py-2 rounded-2xl text-lg font-semibold border-white border-2 hover:bg-pink-800 focus:outline-none"
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
