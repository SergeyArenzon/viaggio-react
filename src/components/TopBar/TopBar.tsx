import "./TopBar.scss";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import BorderedButton from "../UI/BorderedButton/BorderedButton";
import { useEffect, useState } from 'react';
import logo from '../../assets/images/viaggio-logo.png';
import userIcon from '../../assets/images/user.svg';
import {logout} from '../../store/slices/authSlice';
import { AuthApi } from '../../services/api/index';
import logoutIcon from '../../assets/images/logout.svg';
import Modal from "../UI/Modal/Modal";
import { useAppSelector } from "../../hooks";



export default function TopBar(): JSX.Element {
  const user = useAppSelector((state:any) => state.auth.user)
  const [topBarStyle, setTopBarStyle] = useState('');
  const [showUserDropDown, setShowUserDropDown] = useState(false);

  const dispatch = useDispatch();



  useEffect(() => {
    window.addEventListener('scroll', pop);
    return () => window.removeEventListener('scroll', pop);
  },[]);



  const pop = () => {
    if (window.scrollY > 100) {
      setTopBarStyle('topbar--white');
    }else {
      setTopBarStyle('');
    }
  }

  const logoutHandler = async() => {
    await AuthApi.logout();
    dispatch(logout());

  }

  const closeModal = () => {
    setShowUserDropDown(false)
  }
  
  console.log(user);
  
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
        </ul>
        <div>
        {!user ? <NavLink
            className="topbar__login"
            to="/auth"
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
          >
            <BorderedButton>Login</BorderedButton>
          </NavLink> 
          :
          
          <div className="topbar__user" onClick={() => !showUserDropDown && setShowUserDropDown(true)}>
              <img src={userIcon}/>
              {showUserDropDown && <Modal cb={closeModal}>

                <ul className={`topbar__user-dropdown topbar__user-dropdown--active`} onClick={() => setShowUserDropDown(false)}>
                  <li className="topbar__username">Hi <strong>{user.firstname } {user.lastname}</strong>!</li>
                  <li>Profile</li>
                  <li className="topbar__logout" onClick={logoutHandler}>Logout <img src={logoutIcon}/></li>
                </ul>
              </Modal>}
            </div>
          }

        </div>
      </div>
    </nav>
  );
}
