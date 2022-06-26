import "./TopBar.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import BorderedButton from "../UI/BorderedButton/BorderedButton";
import { useEffect, useState } from 'react';
import logo from '../../assets/images/viaggio-logo.png';

export default function TopBar(): JSX.Element {
  const user = useSelector((state: any) => state);
  const [topBarStyle, setTopBarStyle] = useState('')


  useEffect(() => {
    window.addEventListener('scroll', pop);
    return () => window.removeEventListener('scroll', pop);
  },[]);


  

  // const location = useLocation();
  

  const pop = () => {
    if (window.scrollY > 100) {
      setTopBarStyle('topbar--white');
    }else {
      setTopBarStyle('');
    }
  }

  console.log("topbar",user.auth.user.email);

  

  return (
    <nav className="wrapper">
      <div className={`topbar ${topBarStyle}`}>
        <img src={logo} className="topbar__logo"/>
        <ul className="topbar__items">
          <li>
            <NavLink
              to="/"
              // style={({ isActive }) => (isActive ? { color: "red" } : {})}
              className={({ isActive }) => isActive ? "topbar__items--active" : ""}>
              <div className="text-black">HOME</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => isActive ? "topbar__items--active" : ""}>
              
              <div className="text-black">PROFILE</div>
            </NavLink>
          </li>
          {/* <li>TEST</li> */}
          <li>
            {user && (
              <div className="text-black">
                {user.firstName} {user.lastName}
              </div>
            )}
          </li>
        </ul>
        <div>
         { <NavLink
            className="topbar__login"
            to="/auth"
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
          >
            <BorderedButton>Login</BorderedButton>
          </NavLink>}

          {user && <div className="topbar__user">
            {user.auth.user.email}
            </div>}
        </div>
      </div>
    </nav>
  );
}
