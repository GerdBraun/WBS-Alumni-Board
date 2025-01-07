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
      navigate("/welcome");
    } catch (error) {
      console.log("something went wrong: " + error);
    }
  };

  const logout = () => {
    if (appUser) {
      toast.info("logging out");
      setAppUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("appUser");
      navigate("/");
    }
  };

    const createJob = async (jobData) => {
      const payload = { ...jobData };
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_SERVER}/jobs`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        toast.success("Job created successfully!");
        return response.data;
      } catch (error) {
        console.error("Error creating job:", error);
        toast.error("Failed to create job. Please try again.");
      }
    };

    const updateJob = async (id, jobData) => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_SERVER}/jobs/${id}`,
          jobData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Job updated successfully!");
        return response.data;
      } catch (error) {
        console.error("Error updating job:", error);
        toast.error("Failed to update job. Please try again.");
      }
    };
  
    const deleteJob = async (id) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API_SERVER}/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Job deleted successfully!");
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete job. Please try again.");
      }
    };
    
  

  const addCompany = async (formData) => {
    const { name, file } = formData;
    //console.log({formData});
    const data = { name: name, file: file[0] };
    try {
      await axios
        .post(`${import.meta.env.VITE_API_SERVER}/company/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((error) => {
          console.error(error);
        });

      toast.info("company data was saved successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        appUser,
        loading,
        token,
        setToken,
        setLoading,
        setAppUser,
        login,
        logout,
        signup,
        createJob,
        updateJob,
        deleteJob,
        addCompany,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default ContextProvider;
