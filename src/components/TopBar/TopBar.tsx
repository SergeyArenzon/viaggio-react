import React from "react";
import { Link } from "react-router-dom";

export default function TopBar() : JSX.Element {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <div className="text-white">HOME</div>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <div className="text-white">PROFILE</div>
          </Link>
        </li>

        <Link to="/auth">
          <div className="text-white">Login</div>
        </Link>
      </ul>
    </nav>
  );
}
