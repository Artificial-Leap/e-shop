import axios from "axios";
import { Route, Routes, useLocation } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { translation } from "./translation";
import { useEffect, useState } from "react";

function App() {
  const [isQrInfo, setIsQrInfo] = useState(false);
  const [qrInfo, setQrInfo] = useState("");
  const location = useLocation();
  axios.defaults.baseURL = SERVER_URL;

  //http://localhost:3000/?type=qr_code&id=tt
  useEffect(() => {
    const get_qr_info = async (id) => {
      const resp = await axios.get(SERVER_URL + "/qr_info", { params: { id } });
      console.log(resp.data);
      setQrInfo(resp.data);
    };

    const queryParameters = new URLSearchParams(window.location.search);
    const type = queryParameters.get("type");
    setIsQrInfo(type === "qr_code");
    console.log("infoooooooo");

    if (type === "qr_code") {
      const id = queryParameters.get("id");
      get_qr_info(id);
    }
  }, [location]);

  const { language } = useSelector((state) => state.language);
  return (
    <div className="App">
      <ToastContainer />
      <Header language={translation[language].header} />
      <Chatbot />
      {isQrInfo ? (
        <div>QR Code ID: {qrInfo}</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<Products language={translation[language].products} />}
          />
          <Route
            path="/cart"
            element={<Cart language={translation[language].cart} />}
          />
          <Route
            path="/login"
            element={<Login language={translation[language].login} />}
          />
          <Route
            path="/sign-up"
            element={<SignUp language={translation[language].signup} />}
          />
          <Route
            path="/contact"
            element={<Contact language={translation[language].contact} />}
          />
          <Route
            path="/checkout"
            element={<Checkout language={translation[language].checkout} />}
          />
          <Route
            path="/map"
            element={<Map3D language={translation[language].map} />}
          />
          <Route
            path="/:id"
            element={
              <ProductView
                language={translation[language].products.addtocart}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
