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
import { useSelector } from "react-redux";
import { translation } from "./translation";

function App() {
  axios.defaults.baseURL = SERVER_URL;

  const queryParameters = new URLSearchParams(window.location.search);
  const type = queryParameters.get("type");
  const id = queryParameters.get("id");
  //http://localhost:3000/?type=qr_code&id=tt
  const { language } = useSelector((state) => state.language);
  return (
    <div className="App">
      <ToastContainer />
      <Header language={translation[language].header} />
      <Chatbot />
      {type === "qr_code" ? (
        <div>QR Code ID: {id}</div>
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
