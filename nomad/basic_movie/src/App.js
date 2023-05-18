import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/movie/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
