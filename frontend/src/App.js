import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import Home from "./screens/home";
import Login from "./screens/login";
import EditTask from "./screens/edit_task";
import CreateTask from "./screens/create_task";
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import './stylesheets/App.css';

function App() {
  const [user, setUser] = useState({})

  const onSuccessfulLogin = (user) => {
    setUser(user)
    toast.success('Logado com sucesso!')
  }
  
  const LoginRoute = () => (
    <Login onLogin={onSuccessfulLogin} />
  )

  const TasksRoute = () => (
    <Routes>
      <Route path="/" element={<Home onExit={() => setUser(undefined)} />} />
      <Route path="/task" element={<CreateTask />} />
      <Route path="/task/:taskId" element={<EditTask />} />
      {/* <Route path="about" element={<About />} /> */}
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
