import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
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
    if (registering.data.status === "ok") {
      alert("Successfully Logged In");
      setInputValues({ email: "", password: "" });
    } else {
      alert("Error");
    }
  };
  return (
    <div className="container">
      <div className="login-div">
        <h2>Sign In</h2>
        <form>
          <div className="input-div-login">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              onChange={changeHandler}
              type="email"
              id="email"
              value={inputValues.email}
              placeholder="Email"
            />
          </div>
          <div className="input-div-login">
            <label htmlFor="Password">Password</label>
            <input
              value={inputValues.password}
              type="Password"
              id="Password"
              name="password"
              onChange={changeHandler}
              placeholder="Password"
            />
          </div>
          <button type="submit" onClick={submitHandler} className="login">
            Login
          </button>
          <Link to={"/sign-up"}>Not a member?</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;