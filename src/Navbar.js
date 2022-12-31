import { useState } from "react";
import { ReactComponent as Logo } from "./logo copy.svg";
import "./Navbar.css";

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <div className="brand-name">
        <a href="/">
          <Logo />
        </a>
      </div>

      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from Heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
            <a className="navList" href="/">
              Rate
            </a>
          </li>
          <li>
            <a className="navList" href="/pulsereport">
              Activity
            </a>
          </li>
          <li>
            <a className="navList" href="/walk">
              Distance
            </a>
          </li>
          <li>
            <a className="navList" href="/weight">
              Weight
            </a>
          </li>
          <li style={{ marginRight: "90px" }}>
            <a className="navList" href="/sleep">
              Sleep
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
