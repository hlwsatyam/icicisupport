import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeComp from "../components/HomeComp";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  return <HomeComp />;
}

export default HomePage;
