import {
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import useFetchAPI from "./useFetchAPI";

const SessionData = createContext({});

export default function SessionProvider({ children }) {
  const [user, setUser] = useState();
  const [fetchUser, userResponse] = useFetchAPI({ url: 'users', method: 'post' })

  useEffect(() => {
    async function loadStorageData() {
      const tmp = await localStorage.getItem("taskmanager:user");
      const localUser = tmp !== null ? tmp : undefined;
      setUser(localUser);
    }

    loadStorageData();
  }, []);

  useEffect(() => {
    if (!userResponse) return

    if (userResponse.success) {
      setUser(userResponse.data)
      localStorage.setItem("taskmanager:user", userResponse.data)
    }
    else
      toast.error(userResponse.message)
  }, [userResponse])

  const signIn = (email, password) => {
    fetchUser({ data: { email, password }, mockResponse: {
      "id": 74,
      "email": "fabio@lopes.dev",
      "name": "Fabio Lopes",
      "created_at": "2021-11-28T02:37:26.000Z",
      "updated_at": "2021-11-28T02:37:26.000Z"
    } })
  }

  const signOut = () => {
    setUser(undefined);
    localStorage.removeItem("taskmanager:user");
  }

  return (
    <SessionData.Provider value={{ user, signIn, signOut }}>
      {children}
    </SessionData.Provider>
  );
}

export const useSession = () => useContext(SessionData);
