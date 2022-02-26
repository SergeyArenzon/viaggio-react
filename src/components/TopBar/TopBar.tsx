import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



interface IUser {
  user: {
    info: {
      firstName: string,
      lastName: string,
      email: string,
      _id: string,
      date: string,
    }
  }
}


export default function TopBar() : JSX.Element {

  const user = useSelector((state: IUser) => state.user.info);
  
  

  return (
    <nav>
      <ul className="flex bg-gray-800 justify-between">
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
        <li>
          {user && `${user.firstName} ${user.lastName}` }
        </li>
      </ul>
    </nav>
  );
}
