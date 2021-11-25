import { Routes, Route } from "react-router-dom";
import Home from "./screens/home";
import Category from "./screens/category";
import Routine from "./screens/routine";
import Login from "./screens/login";
import "./stylesheets/App.css";

import { useSession } from "./contexts/useSession";

function App() {
  const { token } = useSession();

  const LoginRoute = () => <Login />;

  const TasksRoute = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category" element={<Category />} />
      <Route path="/routine" element={<Routine />} />
    </Routes>
  );

  return <div className="App">{token ? TasksRoute() : LoginRoute()}</div>;
}

export default App;
