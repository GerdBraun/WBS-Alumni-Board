import { useState } from "react";
import { AppContext } from "./AppContext.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ContextProvider({ children }) {
  const [appUser, setAppUser] = useState(null); // logged-in user
  const navigate = useNavigate();

  const login = async (payload) => {
    const {
      data: { user, token },
    } = await axios
      .post(`${import.meta.env.VITE_API_SERVER}/auth/login`, payload)
      .catch((error) => console.error(error));
    setAppUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("appUser", JSON.stringify(appUser));
    navigate("/");
  };

  return (
    <AppContext.Provider value={{ appUser, setAppUser, login }}>
      {children}
    </AppContext.Provider>
  );
}

export default ContextProvider;
