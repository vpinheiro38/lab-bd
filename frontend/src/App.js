import { Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import Home from "./screens/home";
import Category from "./screens/category";
import Routine from "./screens/routine";
import Login from "./screens/login";
import EditTask from "./screens/edit_task";
import CreateTask from "./screens/create_task";
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import './stylesheets/App.css';
import { useSession } from "./contexts/useSession";

function App() {
  const { user } = useSession();

  // const onSuccessfulLogin = (user) => {
  //   setUser(user)
  //   toast.success('Logado com sucesso!')
  // } onExit={() => setUser(undefined)}
  
  const LoginRoute = () => (
    <Login 
      // onLogin={onSuccessfulLogin}    
    />
  )

  const TasksRoute = () => (
    <Routes>
      <Route path="/" element={<Home  />} /> 
      <Route path="/task" element={<CreateTask />} />
      <Route path="/task/:taskId" element={<EditTask />} />
      <Route path="/category" element={<Category />} />
      <Route path="/routine" element={<Routine />} />
    </Routes>
  )

  return (
    <div className="App">
      {user ? TasksRoute() : LoginRoute()}
      <ToastContainer />
    </div>
  );
}

export default App;
