import "./Login.css";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState("");

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };
  // console.log(formData);  //dev test / debug

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://akademia108.pl/api/social-app/user/login", {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        if (Array.isArray(res.data.username)) {
          setLoginMessage(res.data.username[0]);
        } else if (Array.isArray(res.data.password)) {
          setLoginMessage(res.data.password[0]);
        } else if (res.data.error) {
          setLoginMessage("Incorrect username or password");
        } else {
          // console.log(res.data);
          setLoginMessage("");
          props.setUser(res.data);
          localStorage.setItem(`user`, JSON.stringify(res.data));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="login">
      {props.user && <Navigate to="/" />}
      <form onSubmit={handleSubmit}>
        {loginMessage && <h2>{loginMessage}</h2>}
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
