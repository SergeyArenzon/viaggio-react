import './TopBar.scss';
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import BorderedButton from '../UI/BorderedButton/BorderedButton';



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
  
  const location = useLocation();

  return (
    <nav className="topbar">

      <div>LOGO</div>
      <ul className="topbar__items">
        <li>
          <NavLink to="/" style={({ isActive }) => isActive ? {color: "#5F7161"} : {}}>
            <div className="text-black">HOME</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" style={({ isActive }) => isActive ? {color: "#5F7161"} : {}}>
            <div className="text-black">PROFILE</div>
          </NavLink>
        </li>
        <li>
          TEST
        </li>
        <li>
          {user && <div className="text-black">{user.firstName} {user.lastName}</div>}
        </li>
      </ul>
      <div>
        <NavLink className="topbar__login" to="/auth" style={({ isActive }) => isActive ? {color: "#5F7161"} : {}}>
          <BorderedButton>Login</BorderedButton>
        </NavLink>
      </div>
    </nav>
  );
}
