import {
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";
import useFetchAPI from "./useFetchAPI";

const SessionData = createContext({});

export default function SessionProvider({ children }) {
  const [user, setUser] = useState()
  const [fetchLoginUser, userLoginResponse] = useFetchAPI({ url: 'users/login', method: 'post' })
  const [fetchRegisterUser, registerUserResponse] = useFetchAPI({ url: 'users', method: 'post' })

  useEffect(() => {
    async function loadStorageData() {
      const tmp = JSON.parse(localStorage.getItem("taskmanager:user"));
      const localUser = tmp !== null ? tmp : undefined;
      setUser(localUser);
    }

    loadStorageData();
  }, []);

  useEffect(() => {
    if (!userLoginResponse) return

    if (userLoginResponse.success) {
      setUser(userLoginResponse.data)
      localStorage.setItem("taskmanager:user", userLoginResponse.data)
    }
  }, [userLoginResponse])

  useEffect(() => {
    if (!registerUserResponse) return

    if (registerUserResponse.success) {
      setUser(registerUserResponse.data)
      localStorage.setItem("taskmanager:user", registerUserResponse.data)
    }
  }, [registerUserResponse])

  const register = (name, email, password) => {
    fetchRegisterUser({ data: { name, email, password }, useAxios: true })
  }

  const signIn = (email, password) => {
    fetchLoginUser({ data: { email, password }, useAxios: true })
  }

  const signOut = () => {
    setUser(undefined);
    localStorage.removeItem("taskmanager:user");
  }

  return (
    <SessionData.Provider value={{ user, register, signIn, signOut }}>
      {children}
    </SessionData.Provider>
  );
}

export const useSession = () => useContext(SessionData);
