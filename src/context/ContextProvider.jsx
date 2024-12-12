import { useState } from "react";
import { AppContext } from "./AppContext";

const ContextProvider = ({ children }) => {
  const [appUser, setAppUser] = useState(null); // logged-in user

  return (
    <AppContext.Provider value={{ appUser, setAppUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
