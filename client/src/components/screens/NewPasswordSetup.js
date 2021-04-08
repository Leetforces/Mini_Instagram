import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { changePassword } from '../../actions/auth';
import { toast } from 'react-toastify';

const NewPasswordSetup = ({ history }) => {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const { token } = useParams();
    console.log(token);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password1 !== password2) {
            toast.error("Password do not Match.");
        }
        else {
            try {
                const res = await changePassword(password1, token);
                console.log("Response", res);
                toast.success(res.data);
                history.push('/login');

            } catch (error) {
                console.log("Error:", error);
                toast.error(error.response.data);
                if (error && error.response && error.response.status === 400) {
                    toast.error(error.response.data);
                }
                else {
                    toast.error(error);
                }
            }
        }
    }
    return (
        <>
            <div className="myCard">
                <div className="card myAuthCard">
                    <h1 className="brand-logo">MiniInsta Change Password</h1>
                    <input
                        type="password"
                        placeholder="Enter New Password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}

                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}

                    />
                    <div className="myPadding">
                        <button onClick={(e) => handleSubmit(e)} disabled={!password1 || !password2} className="btn waves-effect waves-light">Change Password</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewPasswordSetup;
