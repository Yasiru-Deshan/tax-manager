import React, { useCallback, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./Context/AuthContext";
import { NotificationContext } from "./Context/NotificationContext";
import Notification from "./Components/Notification";
import getRoutes from "./routes";
import Navbar from "./Components/Navbar";

function App() { 
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [token, setToken] = useState();
  const [name, setName] = useState();
  const [role, setRole] = useState();
  const [userId, setUserId] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);

  const clearNotification = useCallback(() => {
    setNotify(false);
    setMessage(null);
    setError(false);
  }, []);
  const setNotification = useCallback(
    (msg, error) => {
      setMessage(msg);
      setError(error);
      setNotify(true);
      setTimeout(() => {
        clearNotification();
      }, 5000);
    },
    [clearNotification]
  );
  const reloadUser = useCallback((user) => {
    const storedData = JSON.parse(localStorage.getItem("authData"));
    localStorage.setItem(
      "authData",
      JSON.stringify({
        token: storedData.token,
        name: storedData.name,
        id: storedData.id,
        role: storedData.role,
     
        user,
      })
    );

    setUser(user);
  }, []);
  const authenticate = useCallback((token, name, id, role, user) => {
    setToken(token);
    setName(name);
    setUserId(id);

    setUser(user);
    setRole(role);
    localStorage.setItem(
      "authData",
      JSON.stringify({
        token,
        name,
        id,
        role,
     
        user,
      })
    );
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setName(null);
    setUserId(null);
    setUser(null);

    setRole(null);
    localStorage.removeItem("authData");
    localStorage.clear();
    return <redirect to={"/"} />;
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("authData"));
    if (storedData && storedData.token) {
      authenticate(
        storedData.token,
        storedData.name,
        storedData.id,
        storedData.role,
        storedData.organization,
        storedData.user
      );
    }
    setIsLoading(false);
  }, [authenticate]);

  let routes = getRoutes(role, token);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        fullName: name,
        userId: userId,
        role: role,
        user,
        authenticate,
        logout: logout,
        reloadUser,
      }}
    >
      <NotificationContext.Provider
        value={{
          notify,
          message,
          error,
          showNotification: setNotification,
          clearNotification: clearNotification,
        }}
      >
        <BrowserRouter>
          <div className="App">
            {!isLoading && <Navbar toggle={toggle} />}
            <Notification />
            <div>{isLoading ? routes : routes}</div>
            {/* <Footer/> */}
          </div>
        </BrowserRouter>
      </NotificationContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
