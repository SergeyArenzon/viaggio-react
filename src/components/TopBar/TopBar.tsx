import './TopBar.scss';
import { Link } from "react-router-dom";
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
  
  

  return (
    <nav className="topbar">

      <div>LOGO</div>
      <ul>
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
        <li>
          {user && <div className="text-black">{user.firstName} {user.lastName}</div>}
        </li>
      </ul>
      <div>
        <Link to="/auth">
          <BorderedButton>Login</BorderedButton>
        </Link>
      </div>
    </nav>
  );
}
