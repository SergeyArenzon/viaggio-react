import React, { useState, useRef, useEffect } from 'react';
import { userSchema } from '../../validations/user';




export default function Auth() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const lastNameRef = useRef();
    const firstNameRef = useRef();

    const [loading, setLoading] = useState(true);
    const [signUpMode, setSignUpMode] = useState(true);


    /////////////////////
    //  Signout method //
    /////////////////////
    const registerHandler = async (event) => {
        event.preventDefault();

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
        };
        const isValid = await userSchema.isValid(data);

        if (!isValid) {
            alert('Creds isnt valid!');
            return;
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/location/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.status === 201){
            // router.replace('/');
            const res = await response.json();
            return res;
        }
    };

    ////////////////////
    //  Signin method //
    ////////////////////
    const loginHandler = async (event) => {
        event.preventDefault();

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };


  const response = await fetch(`${process.env.REACT_APP_API_URL}/location/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });


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

    return (
        <div>
            <button onClick={() => {
       fetch(`${process.env.REACT_APP_API_URL}/user`, {credentials: "include"});

      }}>checkckkk</button>
            {signUpMode ? signUpForm : logInForm}
            <button onClick={() => setSignUpMode(!signUpMode)}>Switch</button>
        </div>
    );
}
