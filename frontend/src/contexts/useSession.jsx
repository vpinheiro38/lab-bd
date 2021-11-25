import {
  useState,
  useCallback,
  useContext,
  createContext,
  useEffect,
} from "react";

const SessionData = createContext({});

export default function SessionProvider({ children }) {
  const [token, setToken] = useState(0);

  useEffect(() => {
    async function loadStoageData() {
      const tmp = await localStorage.getItem("taskmanager:token");
      const localToken = tmp !== null ? tmp : 0;
      setToken(localToken);
    }

    loadStoageData();
  }, []);

  const signIn = useCallback(async () => {
    try {
      let currentToken = 1;
      setToken(currentToken);
      await localStorage.setItem("taskmanager:token", currentToken);
    } catch (error) {
      alert("Falha ao salvar token");
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setToken(0);
      await localStorage.removeItem("taskmanager:token");
    } catch (error) {
      alert("Falha ao remover token");
    }
  }, []);

  return (
    <SessionData.Provider value={{ token, signIn, signOut }}>
      {children}
    </SessionData.Provider>
  );
}

export const useSession = () => useContext(SessionData);
