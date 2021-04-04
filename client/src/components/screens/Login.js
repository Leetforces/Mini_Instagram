import React, { useState,useContext} from 'react'
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import { toast } from 'react-toastify';
import {userContext} from '../../App';

const Login = ({history}) => {
    const {state,dispatch} =useContext(userContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await login({
                email,
                password,
            });
            console.log("Response", res);
            toast.success("Login Success :)");
            console.log(res.data);
            dispatch({
                type:"LOGIN_USER",
                payload:res.data.user,
            })
            localStorage.setItem("jwt",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            
            history.push('/');
        } catch (error) {
            console.log("Error:" + error);
            if (error.response.status === 400) toast.error(error.response.data)
        }

    }
    return (
        <>
            <div className="myCard">
                <div className="card myAuthCard">
                    <h1 className="brand-logo">Instagram Login</h1>
                    <input
                        type="text"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <input
                        type="password"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <div className="myPadding">
                        <button onClick={(e) => handleSubmit(e)} disabled={!email || !password} className="btn waves-effect waves-light">Submit</button>

                    </div>
                    <h6>
                        Don't have an account?
                    <Link to="/register">Register</Link>

                    </h6>
                </div>
            </div>
        </>
    )
}

export default Login
