import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { register } from '../../actions/auth';
import { toast } from 'react-toastify';
import { uploadImage } from '../../actions/auth'

const Register = ({ history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [img1, setImg] = useState("");
    const [url, setUrl] = useState("");
    const uploadDetailsOfUser = async (data) => {
        try {

            const res = await register({
                data,
            });

            console.log("Response", res);
            toast.success("Register Success. Please Login.");
            history.push('/login');

        } catch (error) {
            console.log("Error:" + error);
            if (error.response.status === 400) toast.error(error.response.data)
        }
    }

    useEffect(() => {
        if (url) {
            const picUrl=url;
           uploadDetailsOfUser({name,email,password,picUrl});
        }
    }, [url])
    const uploadImg = async () => {
        const data = new FormData();
        data.append("file", img1);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "jadavpur-university");
        try {
            const res = await uploadImage(data);
            console.log(res);
            await setUrl(res.data.url);
        } catch (err) {
            console.log("Error: ", err);
            toast.error(err.response.data);
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(img1){
           await uploadImg();
        }else{
          await uploadDetailsOfUser({name,email,password});
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

                    {/* Profile Picture */}
                    <div className="file-field input-field ">
                        <div className="btn">
                            <span>Profile Picture</span>
                            <input type="file"
                                onChange={(e) => setImg(e.target.files[0])}
                            />
                        </div>
                        <div className="file-path-wrapper ">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>

                    <div className="myPadding">
                        <button onClick={(e) => handleSubmit(e)} disabled={!name || !email || !password } className="btn waves-effect waves-light">Submit</button>

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
