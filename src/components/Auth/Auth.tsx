import React, { useState, useRef } from "react";
import { userSchema } from "../../validations/user";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../features/user";


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
    const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      // router.replace('/');
      const res = await response.json();
      return res;
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

    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userData = await response.json();
    dispatch(login(userData.user));
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
    const request = `${process.env.REACT_APP_API_URL}/logout`;
    console.log(request);
    fetch(request, {
      credentials: "include",
    }).then((res) => console.log(res));
    dispatch(logout());
  };


  console.log(user);
  
  return (
    <div>
      <button
        onClick={() => {
          fetch(`${process.env.REACT_APP_API_URL}/user`, {
            credentials: "include",
          });
        }}
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
