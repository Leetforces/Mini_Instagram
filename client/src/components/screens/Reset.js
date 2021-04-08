import React, { useState} from 'react'
import { Link } from 'react-router-dom';
import { resetPassword } from '../../actions/auth';
import { toast } from 'react-toastify';

const Reset = ({history}) => {
    const [email, setEmail] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await resetPassword(email);
            console.log("Response", res);
            toast.success(res.data.data);
            history.push('/login');
            
        } catch (error) {
            console.log("Error:" ,error);
            if (error && error.response && error.response.status === 400) {
                toast.error(error.response.data);

            }
            else{
               toast.error(error);
            }
        }

    }
    return (
        <>
            <div className="myCard">
                <div className="card myAuthCard">
                    <h1 className="brand-logo">MiniInsta Reset Password</h1>
                    <input
                        type="text"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <div className="myPadding">
                        <button onClick={(e) => handleSubmit(e)} disabled={!email} className="btn waves-effect waves-light">Reset Password</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reset;
