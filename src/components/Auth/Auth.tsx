import React, { useState, useEffect } from "react";
import { userSchema } from "../../validations/user";
import { useSelector, useDispatch } from "react-redux";
// import { login, logout } from "../../features/user";
import { AuthApi } from "../../services/api/index";
import { useNavigate } from "react-router-dom";
import "./Auth.scss";
import Input from "../UI/Input/Input";
import BorderedButton from "../UI/BorderedButton/BorderedButton";
import logo from '../../assets/images/viaggio-logo.png';
import { logout, login } from '../../store/slices/authSlice'
import Loader from "../UI/Loader/Loader";

export default function Auth() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signUpMode, setSignUpMode] = useState(true);
  const [widthPercent, setSidthPercent] = useState(30);

  // const user = useSelector((state: IUser) => state.user.info);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setSidthPercent(60);
  }, []);



   ////////////////////
  //  Signin method //
  ////////////////////
  const loginHandler = async () => {
    if (email === null || password === null) return;
    setLoading(true);
    const data = {
      email,
      password,
    };

    const response: any = await AuthApi.login(data);
    setLoading(false);
    if (response.status === 200) {
      dispatch(login(response.data.user));
      navigate("/");
    }
  };

  /////////////////////
  //  Signout method //
  /////////////////////
  const registerHandler = async (event: React.FormEvent<HTMLFormElement>) => {

    if (
      email === null ||
      password === null ||
      firstName === null ||
      lastName === null
      ) {
        return;
      }
    setLoading(true);
    const data = {
      email,
      password,
      firstName,
      lastName,
    };
    const isValid = await userSchema.isValid(data);
    
    if (!isValid) {
      alert("Creds isnt valid!");
      setLoading(true);
      return;
    }
    const response: any = await AuthApi.register(data);
    if (response.status === 201) {     
      loginHandler();
    }
  };


  return (
    <div className="auth">
      <div
        className="auth__description"
        style={{ width: `${100 - widthPercent}%` }}
      >
        {/* <p>dfsdfsdfsdfsdfsd</p>
        <p>dfsdfsdfsdfsdfsd</p>
        <p>dfsdfsdfsdfsdfsd</p>
        <p>dfsdfsdfsdfsdfsd</p> */}
      </div>
      <div className="auth__form" style={{ width: `${widthPercent}%` }}>
        {/* <button onClick={() =>  AuthApi.user()}>checkckkk</button>
        <button onClick={logoutHandler}>logout</button>
        <button onClick={logoutHandler}>test</button> */}
        <img className="auth__logo" src={logo} />
        <div className="auth__form-wrapper">
          <p className="auth__title">Welcome to <span>VIAGGIO</span>!</p>
          <form onSubmit={registerHandler}>
            {signUpMode && <React.Fragment>
              <div className="auth__input-container">
                <div className="auth__input-label">First Name</div>
                <Input type="text" setState={setFirstName} />
              </div>
              <div className="auth__input-container">
                <div className="auth__input-label">Last Name</div>
                <Input type="text" setState={setLastName} />
              </div>
            </React.Fragment>}
            <div className="auth__input-container">
              <div className="auth__input-label">Email</div>
              <Input type="email" setState={setEmail} />
            </div>
            <div className="auth__input-container">
              <div className="auth__input-label">Password</div>
              <Input type="password" setState={setPassword} />
            </div>
            <p className="auth__text">Already have an account? <span onClick={() => setSignUpMode(!signUpMode)}>Click Here</span></p>
            <div className="auth__confirm">
              <BorderedButton buttonStyle={`${!loading ? "bordered-button--colored-bg" : "bordered-button--no-hover"} bordered-button--rounded-radius`} clickHandler={signUpMode ? registerHandler : loginHandler}>
                {loading ? <Loader/> :  signUpMode ? "Register" : "Login"}
              </BorderedButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
