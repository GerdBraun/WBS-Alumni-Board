import { useState } from "react";
import { AppContext } from "./AppContext.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ContextProvider({ children }) {
  const [appUser, setAppUser] = useState(null); // logged-in user
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (formData) => {
    const { firstName, lastName, email, password } = formData;
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      await axios
        .post(`${import.meta.env.VITE_API_SERVER}/auth/signup`, payload)
        .catch((error) => {
          console.error(error);
          toast.warning(JSON.stringify(error.response.data.error));
        });
      toast.info("Sign up was successful");
      navigate("/login");
    } catch (error) {
      console.log("something went wrong: " + error);
    }
  };

  const login = async (payload) => {
    if (appUser) {
      navigate(-1);
      return toast.warn("already logged in!");
    }
    try {
      const {
        data: { user, token },
      } = await axios
        .post(`${import.meta.env.VITE_API_SERVER}/auth/login`, payload)
        .catch((error) => {
          console.error(error);
          toast.warning(JSON.stringify(error.response.data.error));
        });

      setAppUser(user);
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("appUser", JSON.stringify(user));
      toast.info("log in was successful");
      navigate("/");
    } catch (err) {
      console.log("something went wrong: " + err);
    }
  };

  const logout = () => {
    if (appUser) {
      toast.info("logging out");
      setAppUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("appUser");
    }
  };
  return (
    <AppContext.Provider
      value={{
        appUser,
        loading,
        token,
        setLoading,
        setAppUser,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default ContextProvider;
