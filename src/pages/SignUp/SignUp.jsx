import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = ({ language }) => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const changeHandler = (e) => {
    setInputValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password, name } = inputValues;
    if (inputValues.password !== inputValues.confirmPassword)
      return alert("passwords dont match");
    const registering = await axios
      .post("/register", {
        email,
        password,
        username: name,
      })
      .catch((res) => {
        return { status: 401, message: "Unauthorized" };
      });
    if (registering.data.status === "ok") {
      setInputValues({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
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
            <label htmlFor="Username">{language.username}</label>
            <input
              value={inputValues.name}
              onChange={changeHandler}
              name="name"
              type="Username"
              id="Username"
              placeholder={language.username}
            />
          </div>
          <div className="input-div-login">
            <label htmlFor="email">{language.email}</label>
            <input
              value={inputValues.email}
              onChange={changeHandler}
              type="email"
              name="email"
              id="email"
              placeholder={language.email}
            />
          </div>
          <div className="input-div-login">
            <label htmlFor="Password">{language.password}</label>
            <input
              value={inputValues.password}
              onChange={changeHandler}
              type="Password"
              name="password"
              id="Password"
              placeholder={language.password}
            />
          </div>
          <div className="input-div-login">
            <label htmlFor="confirmPassword">{language.cpassword}</label>
            <input
              value={inputValues.confirmPassword}
              onChange={changeHandler}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder={language.cpassword}
            />
          </div>
          <button onClick={submitHandler} type="submit" className="login">
            {language.btn}
          </button>
          <Link to={"/login"}>{language.mem}</Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
