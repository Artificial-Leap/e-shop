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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { changeLanguage } from "../../redux/translateSlice";

const Header = ({ language }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const [headerToggle, setHeaderToggle] = useState(false);
  const [translate, setTranslate] = useState("usa");

  return (
    <div className="container">
      {headerToggle && (
        <div onClick={() => setHeaderToggle(false)} className="overlay"></div>
      )}
      <nav>
        <div className="left-nav">
          <Link className="logo" to={"/"}>
            <h2>Easel Wear</h2>
          </Link>
          <div className={`nav-links ${headerToggle ? "active-nav" : ""}`}>
            <Link to={"/"} onClick={() => setHeaderToggle(false)} href="#">
              {language.link1}
            </Link>
            <Link
              to={"/contact"}
              onClick={() => setHeaderToggle(false)}
              href="#"
            >
              {language.link2}
            </Link>
            <Link to={"/map"} onClick={() => setHeaderToggle(false)} href="#">
              {language.link3}
            </Link>
            <div className="input-div">
              <FontAwesomeIcon icon={faSearch} />
              <input placeholder={language.search} type="text" />
            </div>
            {user.email ? (
              <button
                onClick={() => {
                  dispatch(logout());
                }}
                className="login"
              >
                {language.logout}
              </button>
            ) : (
              <Link
                to={"/login"}
                onClick={() => setHeaderToggle(false)}
                className="login"
              >
                {language.login}
              </Link>
            )}
            <img
              onClick={() => {
                setHeaderToggle(false);
                setTranslate((prev) => {
                  if (prev === "usa") {
                    dispatch(changeLanguage("greek"));
                    return "greece";
                  } else {
                    dispatch(changeLanguage("eng"));
                    return "usa";
                  }
                });
              }}
              src={
                translate === "usa" ? "/assets/usa.webp" : "/assets/greece.png"
              }
              className="translate"
              alt=""
            />
          </div>
        </div>

        <div className="right-nav">
          <Link to={"/cart"} className="cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            <p>{cart.length}</p>
          </Link>
          {user.email ? (
            <button
              onClick={() => {
                dispatch(logout());
              }}
              className="login"
            >
              {language.logout}
            </button>
          ) : (
            <Link to={"/login"} className="login">
              {language.login}
            </Link>
          )}
          <img
            onClick={() => {
              setTranslate((prev) => {
                if (prev === "usa") {
                  dispatch(changeLanguage("greek"));
                  return "greece";
                } else {
                  dispatch(changeLanguage("eng"));
                  return "usa";
                }
              });
            }}
            src={
              translate === "usa" ? "/assets/usa.webp" : "/assets/greece.png"
            }
            className="translate"
            alt=""
          />
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
