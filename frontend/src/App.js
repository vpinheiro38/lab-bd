import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/home";
import Category from "./screens/category";
import Login from "./screens/login";
import "./stylesheets/App.css";

function App() {
  const [token, setToken] = useState(1);

  const LoginRoute = () => <Login />;

  const TasksRoute = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category" element={<Category />} />
      {/* <Route path="about" element={<About />} /> */}
    </Routes>
  );

  return <div className="App">{token ? TasksRoute() : LoginRoute()}</div>;
}

export default App;
