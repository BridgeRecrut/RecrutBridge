import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes avec Layout global */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Tu peux ajouter d'autres pages ici avec le layout */}
        </Route>

        {/* Routes sans Layout, par exemple Login/Register plein écran */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
