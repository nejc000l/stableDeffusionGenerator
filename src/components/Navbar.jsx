import React from "react";
import "../styles/navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="nav">
        <div>
          <img
            className="logo"
            width={100}
            height={90}
            src="https://cdn0.iconfinder.com/data/icons/miscellaneous-16-mix/168/diffusion_spreading_proliferation_dissemination_prevalence_dispersal_-24-256.png"
            alt=""
          />
        </div>
        <div>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
