import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContact from "../../components/MyContact";
import "./AddContact.css";
import { auth, db } from "../../firebase";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
export default function AddContact() {
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState([]);
  const [userContact, setUserContact] = useState({
    name: " ",
    email: " ",
    phone: " ",
  });
  const navigate = useNavigate();
  useEffect(() => {
    fetchContacts();

    // Stop listening for updates when no longer required
  }, []);
  const fetchContacts = () => {
    setContactData([]);
    if (auth.currentUser !== null) {
      const subscriber = db
        .collection("contacts")
        .doc(auth.currentUser.uid)
        .collection("mycontacts")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size !== 0) {
            querySnapshot.forEach((doc) => {
              setContactData((previousData) => [...previousData, doc.data()]);
              console.log(contactData);
            });
            return () => subscriber();
          } else {
          }
        }, []);
    } else {
      navigate("/");
    }
  };
  const submitContact = (name, phone, email) => {
    setLoading(true);
    db.collection("contacts")
      .doc(auth.currentUser.uid)
      .collection("mycontacts")
      .doc()
      .set({
        name: name,
        phone: phone,
        email: email,
      })
      .then(() => {
        console.log("success");
        fetchContacts();
        setLoading(false);
      })
      .catch((error) => {
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
    <div
      style={{
        width: "100%",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ height: "500px", width: "580px" }}>
        <h1> Add Contacts</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            submitContact(
              userContact.name,
              userContact.phone,
              userContact.email
            );
          }}
        >
          <label style={{ display: "inline-block" }}>Name</label>
          <input
            type="text"
            onChange={(e) =>
              setUserContact({ ...userContact, name: e.target.value })
            }
            style={{ display: "inline-block" }}
            placeholder="Enter name"
          ></input>
          <label style={{ display: "inline-block" }}>Ph No</label>
          <input
            type="number"
            onChange={(e) =>
              setUserContact({ ...userContact, phone: e.target.value })
            }
            style={{ display: "inline-block" }}
            placeholder="Enter phone number"
          ></input>
          <label style={{ display: "inline-block" }}>Email</label>
          <input
            onChange={(e) =>
              setUserContact({ ...userContact, email: e.target.value })
            }
            type="email"
            style={{ display: "inline-block" }}
            placeholder="Enter email"
          ></input>

          <input
            value="Save"
            type="submit"
            className="btn"
            style={{ position: "relative" }}
          ></input>
        </form>
      </div>

      <MyContact contactData={contactData}></MyContact>
    </div>
  );
}
