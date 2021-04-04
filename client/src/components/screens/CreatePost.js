import React, { useState, useEffect } from 'react'
import { createPost, uploadImage } from '../../actions/auth';
import { toast } from 'react-toastify';
const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [img1, setImg] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (url) {
            const postData = async () => {
                // Create Post and send data to backend
                try {
                    console.log("Image Url: ======>", url);
                    if (url) {
                        const res = await createPost({
                            title,
                            body,
                            photoUrl: url,
                        });
                        console.log("Response", res);
                        toast.success("Create Post Successfully:)");
                        await setUrl("");
                        // history.push('/');
                    } else {
                        toast.error("Image upload at https://cloudinary.com/ failed. Try Again. ");
                    }
                } catch (error) {
                    console.log("Error:" + error);
                    toast.error(error.response.data);
                }
            }
            postData();

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
        await uploadImg();
    }
    return (
        <div className="card input-field myInput">
            <input type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input type="text"
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />

            <div className="file-field input-field ">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper ">
                    <input className="file-path validate" type="text" />
                </div>
            </div>


            <div className="myPadding">
                <button disabled={!title || !body || !img1} onClick={(e) => handleSubmit(e)} className="btn waves-effect waves-light">POST</button>
            </div>

        </div>
    )
}

export default CreatePost



