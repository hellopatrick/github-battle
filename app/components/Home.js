import React from "react";
import ReactRouter, { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Github Battle: Battle Your Friends... or see some popular repos!</h1>

      <Link className="button" to="/battle">
        Battle
      </Link>
    </div>
  );
}
