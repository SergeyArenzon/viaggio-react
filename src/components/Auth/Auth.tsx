import React, { useState, useRef } from "react";
import { userSchema } from "../../validations/user";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../features/user";
import { AuthApi } from '../../services/api/index';
import { useNavigate } from 'react-router-dom';


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


export default function Auth() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [signUpMode, setSignUpMode] = useState(true);

  const user = useSelector((state: IUser) => state.user.info);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  /////////////////////
  //  Signout method //
  /////////////////////
  const registerHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      emailRef.current === null ||
      passwordRef.current === null ||
      firstNameRef.current === null ||
      lastNameRef.current === null
    ) {
      return;
    }
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
    };
    const isValid = await userSchema.isValid(data);

    if (!isValid) {
      alert("Creds isnt valid!");
      return;
    }
    const response: any = await AuthApi.register(data);
    if (response.status === 201) {
      navigate('/');
    }
  };

  ////////////////////
  //  Signin method //
  ////////////////////
  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      emailRef.current === null ||
      passwordRef.current === null
    ) {
      return;
    }
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const response: any = await AuthApi.login(data);
    dispatch(login(response.data.user));
  };

  const signUpForm = (
    <form onSubmit={registerHandler}>
      <input type="email" ref={emailRef}></input>
      <input type="password" ref={passwordRef}></input>
      <input type="text" ref={firstNameRef}></input>
      <input type="text" ref={lastNameRef}></input>
      <button>register</button>
    </form>
  );

  const logInForm = (
    <form onSubmit={loginHandler}>
      <input type="email" ref={emailRef}></input>
      <input type="password" ref={passwordRef}></input>
      <button>login</button>
    </form>
  );


  const logoutHandler = async () => {
    const request = AuthApi.logout();;
    dispatch(logout());
  };

  
  return (
    <div>
      <button
        onClick={() =>  AuthApi.user()}
      >
        checkckkk
      </button>

      <button onClick={logoutHandler}>logout</button>
      <button onClick={logoutHandler}>test</button>

      {signUpMode ? signUpForm : logInForm}
      <button onClick={() => setSignUpMode(!signUpMode)}>Switch</button>
    </div>
  );
}
