import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "../styles/login.css";

import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "./../utils/config";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate username
    if (!credentials.username || credentials.username.length < 3) {
      errors.username = "Username must be at least 3 characters long.";
    }

    // Validate email
    if (!credentials.email || !emailRegex.test(credentials.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (credentials.email.startsWith("-")) {
      errors.email = "Email cannot start with a hyphen (-).";
    }

    // Validate password
    if (!credentials.password || credentials.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    return errors;
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({}); // Clear errors if validation passes

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        setErrors({ server: result.message });
        return;
      }

      dispatch({ type: "REGISTER_SUCCESS" });
      alert("User registered successfully");
      navigate("/login");
    } catch (err) {
      setErrors({ server: err.message });
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={registerImg} alt="" />
              </div>
              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      id="username"
                      value={credentials.username}
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <small className="text-danger">{errors.username}</small>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </FormGroup>
                  <FormGroup className="password-field">
                    <div className="d-flex align-items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        required
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className="password-input"
                      />
                      <button
                        type="button"
                        className="btn btn-light ms-2 toggle-password-btn"
                        onClick={toggleShowPassword}
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && (
                      <small className="text-danger">{errors.password}</small>
                    )}
                  </FormGroup>
                  {errors.server && (
                    <div className="text-danger mb-2">{errors.server}</div>
                  )}
                  <Button className="btn secondary_btn auth_btn" type="submit">
                    Create Account
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
