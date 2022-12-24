import "./Header.css";
import { useState } from "react";
import {
  faBars,
  faSearch,
  faShoppingCart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { cart } = useSelector((state) => state.products);
  const [headerToggle, setHeaderToggle] = useState(false);

  return (
    <div className="container">
      <nav>
        <div className="left-nav">
          <Link className="logo" to={"/"}>
            <h2>Easel Wear</h2>
          </Link>
          <div className={`nav-links ${headerToggle ? "active-nav" : ""}`}>
            <Link to={"/"} onClick={() => setHeaderToggle(false)} href="#">
              Products
            </Link>
            <Link
              to={"/contact"}
              onClick={() => setHeaderToggle(false)}
              href="#"
            >
              Contact Us
            </Link>
            <Link
              to={"/map"}
              onClick={() => setHeaderToggle(false)}
              href="#"
            >
              Map
            </Link>
            <div className="input-div">
              <FontAwesomeIcon icon={faSearch} />
              <input placeholder="Search" type="text" />
            </div>
            <button onClick={() => setHeaderToggle(false)} className="login">
              Login
            </button>
          </div>
        </div>
        {headerToggle && (
          <div onClick={() => setHeaderToggle(false)} className="overlay"></div>
        )}
        <div className="right-nav">
          <Link to={"/cart"} className="cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            <p>{cart.length}</p>
          </Link>
          <Link to={"/login"} className="login">
            Login
          </Link>
          <FontAwesomeIcon
            style={{ color: headerToggle ? "white" : "var(--dark-blue)" }}
            onClick={() => setHeaderToggle((prev) => !prev)}
            icon={headerToggle ? faXmark : faBars}
            className="header-toggle"
          />
        </div>
      </nav>
    </div>
  );
};

export default Header;
