import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddContact from "./pages/AddContacts/AddContact";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="addContact" element={<AddContact />} />
    </Routes>
  );
}

export default App;
