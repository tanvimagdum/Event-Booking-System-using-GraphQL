import React, { useRef, useState, useContext } from "react";
import Exam from "../components/navigation/exam";
import Jkl from "../components/navigation/jkl";
import AuthContext from "../context/auth-context";

function AuthPage() {

    const [isLogin, setIsLogin] = useState(true);
    const emailEl = useRef(null);
    const passwordEl = useRef(null);

    const contextType = useContext(AuthContext);

    const switchModeHandler = () => {
        setIsLogin(prevIsLogin => !prevIsLogin);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const email = emailEl.current.value;
        const password = passwordEl.current.value;

        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        };

        if(!isLogin) {
            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {
                            email: "${email}",
                            password: "${password}"
                        }) {
                            _id
                            email
                        }
                    }
                `
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
        <form onSubmit={submitHandler}>
            <div className="container">
                <div className="row mt-3 mx-auto w-50">
                    <div className="col">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" className="form-control" ref={emailEl} id="email"/>
                    </div>
                </div>
                <div className="row mt-3 mx-auto w-50">
                    <div className="col">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" ref={passwordEl} id="password"/>
                    </div>
                </div>
                <div className="row mt-5 mx-auto w-50">
                    <div className="col text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    <div className="col">
                        <button type="button" onClick={switchModeHandler} className="btn btn-primary">
                            Switch to {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </div>
                </div>
            </div>
            {/* <Exam/>
            <Jkl/> */}
        </form>
    );
}

export default AuthPage;