import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Chatbot from "./components/Chatbot/Chatbot";
import { SERVER_URL } from "./constants";
import Header from "./layout/Header/Header";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Map3D from "./pages/Map/Map3D";
import Products from "./pages/Products/Products";
import ProductView from "./pages/ProductView/ProductView";
import SignUp from "./pages/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  axios.defaults.baseURL = SERVER_URL;

  const queryParameters = new URLSearchParams(window.location.search);
  const type = queryParameters.get("type");
  const id = queryParameters.get("id");

  console.log("type:", type, "name:", id);
  //http://localhost:3000/?type=qr_code&id=tt
  
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Chatbot />
      {type === "qr_code" ? (
        <div>QR Code ID: {id}</div>
      ) : (
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/map" element={<Map3D />} />
          <Route path="/:id" element={<ProductView />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
