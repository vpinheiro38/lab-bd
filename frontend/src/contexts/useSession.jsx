import { useState, useCallback, useContext, createContext } from "react";

const SessionData = createContext({});

export default function SessionProvider({ children }) {
  const [token, setToken] = useState(0);

  const signIn = useCallback(() => setToken(1), []);
  const signOut = useCallback(() => setToken(0), []);

  return (
    <SessionData.Provider value={{ token, signIn, signOut }}>
      {children}
    </SessionData.Provider>
  );
}

export const useSession = () => useContext(SessionData);
