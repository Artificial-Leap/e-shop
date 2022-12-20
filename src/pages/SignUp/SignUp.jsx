import "./SignUp.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
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
      alert("Successfully Registered");
      setInputValues({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      alert("Error");
    }
  };

  return (
    <div className="container">
      <div className="login-div">
        <h2>Sign Up</h2>
        <form>
          <div className="input-div-login">
            <label htmlFor="Username">Username</label>
            <input
              value={inputValues.name}
              onChange={changeHandler}
              name="name"
              type="Username"
              id="Username"
              placeholder="Username"
            />
          </div>
          <div className="input-div-login">
            <label htmlFor="email">Email</label>
            <input
              value={inputValues.email}
              onChange={changeHandler}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="input-div-login">
            <label htmlFor="Password">Password</label>
            <input
              value={inputValues.password}
              onChange={changeHandler}
              type="Password"
              name="password"
              id="Password"
              placeholder="Password"
            />
          </div>
          <div className="input-div-login">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              value={inputValues.confirmPassword}
              onChange={changeHandler}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
          <button onClick={submitHandler} type="submit" className="login">
            Register
          </button>
          <Link to={"/login"}>Already a member?</Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
