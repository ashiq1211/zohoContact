import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

export default function MyContact(props) {
  const navigate = useNavigate();

  return (
    <>
      <h1>My Contacts</h1>
      {props.contactData.length === 0 ? (
        <h5>No contacts found!!!</h5>
      ) : (
        <table
          style={{ width: "70%", tableLayout: "fixed", textAlign: "center" }}
        >
          <tr
            style={{ height: "100px", width: "300px", backgroundColor: "grey" }}
          >
            <th>Name</th>
            <th>Ph No</th>
            <th>Email</th>
          </tr>
          {props.contactData.map((item) => (
            <tr key={item.id} style={{ height: "100px", width: "300px" }}>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </table>
      )}
    </>
  );
}
