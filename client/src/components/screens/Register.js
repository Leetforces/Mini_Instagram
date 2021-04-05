import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { register } from '../../actions/auth';
import { toast } from 'react-toastify';

const Register = ({ history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await register({
                name,
                email,
                password,
            });
            console.log("Response", res);
            toast.success("Register Success. Please Login.");
            history.push('/login');
        } catch (error) {
            console.log("Error:" + error);
            if (error.response.status === 400) toast.error(error.response.data)
        }

    }
    return (
        <>
            <div className="myCard">
                <div className="card myAuthCard">
                    <h1 className="brand-logo">MiniInsta Register</h1>
                    <input
                        type="text"
                        placeholder="Enter your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                    />
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
                        <button onClick={(e) => handleSubmit(e)} disabled={!name || !email || !password} className="btn waves-effect waves-light">Submit</button>

                    </div>
                    <h6 className="myPadding">
                        Have an Account? &nbsp;
                        <Link to="/login">Login</Link>

                    </h6>
                </div>
            </div>
        </>
    )
}

export default Register
