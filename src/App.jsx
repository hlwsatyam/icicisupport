import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ViewSms from "./pages/ViewSms";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/viewSms" element={<ViewSms />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
