import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Singleuser from "./Components/Singleuser";
import Register from "./Components/Register";
import Header from "./Components/Header";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/:username" element={<Singleuser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
