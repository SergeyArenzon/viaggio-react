import "./TopBar.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BorderedButton from "../UI/BorderedButton/BorderedButton";
import { useEffect, useState } from 'react';
import logo from '../../assets/images/viaggio-logo.png';
import userIcon from '../../assets/images/user.svg';
import {logout} from '../../store/slices/authSlice';
import { AuthApi } from '../../services/api/index';
import logoutIcon from '../../assets/images/logout.svg';
import Modal from "../UI/Modal/Modal";



export default function TopBar(): JSX.Element {
  const user = useSelector((state: any) => state.auth.user);
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
  console.log("topbar",user);

  const closeModal = () => {
    
    setShowUserDropDown(false)
  }
  
  console.log("showUserDropDown",showUserDropDown);

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
                  <li>Profile</li>
                  {/* <li></li> */}
                  <li onClick={logoutHandler}>Logout <img src={logoutIcon}/></li>
                </ul>
              </Modal>}
            </div>
          }

        </div>
      </div>
    </nav>
  );
}
