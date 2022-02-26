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
    <nav className="bg-teal-600">
      <ul className="flex justify-between">
        <li>
          <Link to="/">
            <div className="text-black">HOME</div>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <div className="text-black">PROFILE</div>
          </Link>
        </li>

        <Link to="/auth">
          <div className="text-black">Login</div>
        </Link>
        <li>
          {user && <div className="text-black">{user.firstName} {user.lastName}</div>}
        </li>
      </ul>
    </nav>
  );
}
