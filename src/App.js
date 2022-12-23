import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Chatbot from "./components/Chatbot/Chatbot";
import { SERVER_URL } from "./constants";
import Header from "./layout/Header/Header";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import ProductView from "./pages/ProductView/ProductView";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  axios.defaults.baseURL = SERVER_URL;
  return (
    <div className="App">
      <Header />
      <Chatbot />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/:id" element={<ProductView />} />
      </Routes>
    </div>
  );
}

export default App;
