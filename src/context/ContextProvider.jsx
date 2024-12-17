import { useState } from "react";
import { AppContext } from "./AppContext.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ContextProvider({ children }) {
  const [appUser, setAppUser] = useState(null); // logged-in user
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      localStorage.setItem("token", token);
      localStorage.setItem("appUser", JSON.stringify(user));
      toast.info("log in was successful");
      navigate("/");
    } catch (err) {
      console.log("something went wrong: " + err);
    }
  };
 

  const getProjects = async (id) => {
    setLoading(true);
    const idString = id ? `/${id}` : "";
    try {
      const { data } = await axios
        .get(`${import.meta.env.VITE_API_SERVER}/projects${idString}`)
        .catch((error) => {
          console.error(error);
          toast.warning(error.response.data.error);
        });
      return data;
    } catch (error) {
      toast.error("Something went wrong: " + error);
    } finally {
      setLoading(false);
    }
  };

  const getCommentsByModelAndId = async (payload) => {
    const { model, id } = payload;
    setLoading(true);
    try {
      const { data } = await axios
        .get(`${import.meta.env.VITE_API_SERVER}/comments/${model}/${id}`)
        .catch((error) => {
          console.error(error);
          toast.warning(error.response.data.error);
        });
      return data;
    } catch (error) {
      toast.error("Something went wrong: " + error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (appUser) {
      toast.info("logging out");
      setAppUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("appUser");
    }
  };
  return (
    <AppContext.Provider
      value={{
        appUser,
        loading,
        setAppUser,
        login,
        getProjects,
        getCommentsByModelAndId
     , logout }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default ContextProvider;
