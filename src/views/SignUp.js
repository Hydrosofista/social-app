import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //------------------------------------
  // KOMUNIKATY O BŁĘDACH

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signUpMessage, setSignUpMessage] = useState("");
  const [signUpDone, setSignUpDone] = useState(false);

  // Obsługa wysłania formularza
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    console.log("Wysyłam");

    axios
      .post("http://akademia108.pl/api/social-app/user/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        console.log(res.data);
        let resData = res.data;
        if (resData.signedup) {
          setSignUpMessage("Account created");
          setSignUpDone(true);
        } else {
          if (resData.message.username) {
            setSignUpMessage(resData.message.username[0]);
          } else if (resData.message.email) {
            setSignUpMessage(resData.message.email[0]);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const validate = () => {
    let validationErrors = {
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
    };

    // Użytkownik
    if (formData.username.trim().length < 4) {
      validationErrors.username = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username should have at least 4 characters",
      }));
    } else if (!/^[^\s]*$/.test(formData.username.trim())) {
      validationErrors.username = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username should not have empty characters",
      }));
    } else {
      validationErrors.username = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "",
      }));
    }

    // Email
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      validationErrors.email = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
    } else {
      validationErrors.email = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }

    // Hasło
    if (formData.password.trim().length < 6) {
      validationErrors.password = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password should have at least 6 characters",
      }));
    } else if (!/^[^\s]*$/.test(formData.password.trim())) {
      validationErrors.password = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password should not have empty characters",
      }));
    } else if (
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())
    ) {
      validationErrors.password = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password needs to contain at least one special character ! # @ & %",
      }));
    } else {
      validationErrors.password = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }

    // Potwierdzenie hasła
    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      validationErrors.confirmPassword = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords should be the same",
      }));
    } else {
      validationErrors.confirmPassword = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }

    return (
      !validationErrors.username &&
      !validationErrors.email &&
      !validationErrors.password &&
      !validationErrors.confirmPassword
    );
  };

  //------------------------------------
  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  console.log(formData);

  return (
    <div className="signUp">
      <h2>Sign Up</h2>
      {props.user && <Navigate to="/" />}
      <form onSubmit={handleSubmit}>
        {signUpMessage && <h2>{signUpMessage}</h2>}
        {errors.username && <p>{errors.username}</p>}
        <input
          type="text"
          name="username"
          placeholder="User name"
          onChange={handleInputChange}
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        {errors.password && <p>{errors.password}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleInputChange}
        />
        <button className="btn" disabled={signUpDone}>Sign Up</button>
        {signUpDone && <div>
          <Link to='/login' className="btn">Go to login</Link>
          </div>}
      </form>
    </div>
  );
};

export default SignUp;
