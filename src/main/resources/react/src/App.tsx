import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { Footer } from "./components/Footer/Footer";
import { GameRulesPage } from "./components/GameRulesPage/GameRulesPage";
import { SignIn } from "./components/SignInUp/SignIn";
import { SignUp } from "./components/SignInUp/SignUp";
import { Profile } from "./components/Profile/Profile";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { GameRoom } from "./components/GameRoom/GameRoom";
import { IUser } from "./utils/interfaces";
import { AuthApi } from "./utils/api";
import { jwtTokenKeyName } from "./utils/constants";
import { GameRoomList } from "./components/GameRoom/GameRoomList";

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: IUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const AuthContext = React.createContext<IAuthContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  currentUser: null,
  setCurrentUser: () => {},
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      AuthApi.getUserData()
        .then((response) => {
          setCurrentUser(response.data);
        })
        .catch((error) => {
          alert("Something went bananas while loading user data!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated && localStorage.getItem(jwtTokenKeyName) !== null) {
      setIsAuthenticated(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <AuthContext.Provider
          value={{
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated,
            currentUser: currentUser,
            setCurrentUser: setCurrentUser,
          }}
        >
          <Router>
            <NavBar />
            <Switch>
              <Route path="/" exact>
                <LandingPage />
              </Route>
              <Route path="/game-rules" exact>
                <GameRulesPage />
              </Route>
              <Route path="/sign-in" exact>
                <SignIn />
              </Route>
              <Route path="/sign-up" exact>
                <SignUp />
              </Route>
              <PrivateRoute path="/game-room-list" exact>
                <GameRoomList />
              </PrivateRoute>
              <PrivateRoute path="/game-room/:id" exact>
                <GameRoom />
              </PrivateRoute>
              <PrivateRoute path="/profile" exact>
                <Profile />
              </PrivateRoute>
            </Switch>
            <Footer />
          </Router>
        </AuthContext.Provider>
      )}
    </>
  );
};

export default App;
