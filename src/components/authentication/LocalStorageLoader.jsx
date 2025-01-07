import { useEffect } from "react";
import { useApp } from "../../context/AppContext";

const LocalStorageLoader = () => {
  const { setAppUser, setToken } = useApp();

  useEffect(() => {
    // load theme from local storage
    const themeFromLocalStorage = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", themeFromLocalStorage);

    // load appUser from local storage
    const appUserFromLocalStorage =
      JSON.parse(localStorage.getItem("appUser")) || null;
    setAppUser(appUserFromLocalStorage);

    // load token from local storage
    const tokenFromLocalStorage = localStorage.getItem("token") || null;
    setToken(tokenFromLocalStorage);
  }, []);

  return <>
  {/* no need to render anything */}
  </>;
};

export default LocalStorageLoader;
