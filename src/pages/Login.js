import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { auth } from "../firebase";
import "./Login.css";
import { Spinner } from "react-bootstrap";
export default function Login() {
  const [userData, setUserData] = useState({
    email: " ",
    password: " ",
  });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const signIn = async (email, password) => {
    setLoading(true);
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log(" signed in!");
        setLoading(false);
        navigate("/addContact", { replace: true });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }
        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }
        setLoading(false);
        console.error(error);
      });
  };
  return loading ? (
    <Spinner
      animation="grow"
      style={{
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        margin: "auto",
      }}
    ></Spinner>
  ) : (
    <div className="maindiv">
      <h2> Sign In</h2>
      <div style={{ textAlign: "center" }}>
        <p>Don't have an account?</p>

        <Link style={{ fontWeight: "normal" }} to="/register">
          Sign Up
        </Link>
      </div>

      <div className="formdiv">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        ></input>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        ></input>
      </div>
      <div
        style={{ textAlign: "end", marginTop: "20px", marginBottom: "10px" }}
      >
        <Link style={{ color: "blue", fontWeight: "normal" }} to="/">
          Forgot your password?
        </Link>
      </div>

      <button
        onClick={() => signIn(userData.email, userData.password)}
        style={{ position: "relative" }}
      >
        <i
          style={{
            position: "absolute",
            lineHeight: "24px",
            top: "50%",
            marginTop: "-12px",
            left: " 15px",
          }}
          className="fa fa-lock"
          aria-hidden="true"
        ></i>
        Sign In
      </button>
    </div>
  );
}
