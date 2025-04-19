import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreateCrewmate from "./pages/CreateCrewmate";
import Gallery from "./pages/Gallery";
import CrewmateDetail from "./pages/CrewmateDetail";
import EditCrewmate from "./pages/EditCrewmate";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<CreateCrewmate />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="crewmate/:id" element={<CrewmateDetail />} />
          <Route path="edit/:id" element={<EditCrewmate />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
