import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { auth, db } from "../firebase";
import "bootstrap/dist/css/bootstrap.css";
import "./Register.css";
export default function Register() {
  const navigate = useNavigate();
  const [authData, setData] = useState({
    email: " ",
    password: " ",
    secretcode: " ",
  });
  const [loading, setLoading] = useState(false);
  const signUp = async (email, password, secretcode) => {
    console.log(authData);
    setLoading(true);
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User account created & signed in!");
        db.collection("users")
          .doc(auth.currentUser.uid)
          .set({
            email: email,
            secretcode: secretcode,
          })
          .then(() => {
            setLoading(false);
            navigate("/addContact", { replace: true });
          });
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
        window.alert(error.message);
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
    <div className="main">
      <h2> Sign Up</h2>
      <div style={{ textAlign: "center" }}>
        <p>Already have an account?</p>

        <Link style={{ fontWeight: "normal" }} to="/">
          Sign In
        </Link>
      </div>

      <div className="formdiv">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setData({ ...authData, email: e.target.value })}
        ></input>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setData({ ...authData, password: e.target.value })}
        ></input>
        <label>Secret</label>
        <input
          type="password"
          placeholder="Enter Secret"
          onChange={(e) => setData({ ...authData, secretcode: e.target.value })}
        ></input>
      </div>

      <button
        style={{ position: "relative" }}
        onClick={() =>
          signUp(authData.email, authData.password, authData.secretcode)
        }
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
        Sign Up
      </button>
      <p style={{ color: "grey", marginTop: "10px" }}>
        By clicking the "Sign Up" button, you are creating an account, and you
        agree to the Terms of Use.
      </p>
    </div>
  );
}
