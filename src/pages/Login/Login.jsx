import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/userSlice";
import "./Login.css";

const Login = ({ language }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setInputValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = inputValues;
    const registering = await axios
      .post("/login", {
        email,
        password,
      })
      .catch((res) => {
        return { status: 401, message: "Unauthorized" };
      });
    console.log(registering.data);
    if (registering.data.status === "ok") {
      dispatch(login(registering.data.user));
      setInputValues({ email: "", password: "" });
      navigate("/");
    } else {
      alert("Error");
    }
  };
  return (
    <div className="container">
      <div className="login-div">
        <h2>{language.heading}</h2>
        <form>
          <div className="input-div-login">
            <label htmlFor="email">{language.email}</label>
            <input
              name="email"
              onChange={changeHandler}
              type="email"
              id="email"
              value={inputValues.email}
              placeholder={language.email}
            />
          </div>
          <div className="input-div-login">
            <label htmlFor="Password">{language.password}</label>
            <input
              value={inputValues.password}
              type="Password"
              id="Password"
              name="password"
              onChange={changeHandler}
              placeholder={language.password}
            />
          </div>
          <button type="submit" onClick={submitHandler} className="login">
            {language.btn}
          </button>
          <Link to={"/sign-up"}>{language.not}</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
