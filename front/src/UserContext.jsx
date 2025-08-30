import { useContext, createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const userLogin = (userData) => {
    setUser(userData);
    console.log("setting user")
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, userLogin, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}