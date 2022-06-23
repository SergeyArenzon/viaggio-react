import "./TopBar.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import BorderedButton from "../UI/BorderedButton/BorderedButton";
import { useEffect, useState } from 'react';
import logo from '../../assets/images/viaggio-logo.png';

export default function TopBar(): JSX.Element {

  useEffect(() => {
    window.addEventListener('scroll', pop);
    return () => window.removeEventListener('scroll', pop);
  },[]);

  const [topBarStyle, setTopBarStyle] = useState('')
  const user = useSelector((state: IUser) => state.user.info);
  const location = useLocation();


  const pop = () => {
    if (window.scrollY > 100) {
      setTopBarStyle('topbar--white');
    }else {
      setTopBarStyle('');
    }
  }

  console.log("topbar",user);



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
         {!user && <NavLink
            className="topbar__login"
            to="/auth"
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
          >
            <BorderedButton>Login</BorderedButton>
          </NavLink>}

          {user && <div className="topbar__user">
            
            </div>}
        </div>
      </div>
    </nav>
  );
}
