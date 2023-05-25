import "./App.css";
import NavbaraComponent from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Store from "./pages/Store";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import CartProvider from "./CartContext";

function App() {
  return (
    <CartProvider>
      <Container>
        <NavbaraComponent></NavbaraComponent>
        <BrowserRouter>
          <Routes>
            <Route index element={<Store />}></Route>{" "}
            {/* index는 베이직 루트를 가르킴 "/" */}
            <Route path="success" element={<Success />}></Route>
            <Route path="cancel" element={<Cancel />}></Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </CartProvider>
  );
}

export default App;
