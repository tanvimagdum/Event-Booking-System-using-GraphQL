import React, { useRef, useState, useContext } from "react";
import AuthContext from "../context/auth-context";
import '../index.css';

function AuthPage() {

    const [isLogin, setIsLogin] = useState(true);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const contextType = useContext(AuthContext);

    const switchModeHandler = () => {
        setIsLogin(prevIsLogin => !prevIsLogin);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
                query Login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `,
            variables: {
                email: email,
                password: password
            }
        };

        if(!isLogin) {
            requestBody = {
                query: `
                    mutation CreateUser($email: String!, $password: String!) {
                        createUser(userInput: {
                            email: $email,
                            password: $password
                        }) {
                            _id
                            email
                        }
                    }
                `,
                variables: {
                    email: email,
                    password: password
                }
            }
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed!");
            }
            return res.json();
        })
        .then(resData => {
            if (resData.data.login.token) {
                contextType.login(
                    resData.data.login.token,
                    resData.data.login.userId,
                    resData.data.login.tokenExpiration
                );
            }
        })
        .catch(err => {
            console.log(err);
        });

    }

    return (
        <form onSubmit={submitHandler} className="mt-5">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" className="form-control" ref={emailRef} id="email" />
                    </div>
                </div>
                </div>
                <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" ref={passwordRef} id="password" />
                    </div>
                </div>
                </div>
                <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="d-grid mt-3 text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
                </div>
                <div className="row justify-content-center">
                <div className="col-md-6">
                    <p className="text-center mt-3 authstyle">
                    {isLogin ? "Don't have an account?" : "Already registered?"}
                    <button type="button" onClick={switchModeHandler} className="btn btn-link">
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                    </p>
                </div>
                </div>
            </div>
        </form>
    );
}

export default AuthPage;