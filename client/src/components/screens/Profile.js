import React, { useEffect, useState, useContext } from 'react'
import { getMyPost } from '../../actions/auth'
import { userContext } from '../../App';
import { uploadImage } from '../../actions/auth'
import { updatePicInDatabase } from '../../actions/user'
import { toast } from 'react-toastify';
const Profile = () => {
  const [myProfileData, setProfileData] = useState([]);
  const [img1, setImg] = useState("");
  const [url, setUrl] = useState("");
  const { state, dispatch } = useContext(userContext);

  const getMyPost1 = async () => {
    try {
      const res = await getMyPost();
      console.log("Res.data", res.data.data);
      await setProfileData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }
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
  useEffect(() => {
    getMyPost1();
    console.log("myProfilePostData=============>", myProfileData);
  }, []);   //[] for 1 time Execute otherwise it go call infinite 

  const updateProfilePicInDatabase = async (picUrl) => {
    try {
      const user = await updatePicInDatabase(picUrl);
      console.log("UESR IN DATABASE AFTER PROFILE UPDATE========>", user);
      localStorage.setItem("user", JSON.stringify({ ...state, picUrl: user.data.picUrl }));
      dispatch({
        type: "UPDATEPIC", payload: {
          picUrl: user.data.picUrl,
        }
      });
    } catch (err) {
      console.log("Error in Profile Update:", err);
    }
  }
  useEffect(() => {
    if (url) {
      const picUrl = url;
      updateProfilePicInDatabase(picUrl);

    }
  }, [url])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (img1) {
      await uploadImg();
    }
  }
  return (
    <>

      <div style={{ maxWidth: "850px", margin: "0px auto" }}>
        <div className="myProfile">

          <div>
            <img src={(state) ? (state.picUrl) : ""} alt="PhotoImg" className="myImg" />
          </div>
          <div>
            <h4>{state ? state.name : "loading"}</h4>
            <h6>{state ? state.email : "loading"}</h6>
            <div className="myProfile1">
              <h6 className="myPadding1">{(myProfileData) ? myProfileData.length : "0"} posts</h6>
              <h6 className="myPadding1">{(state && state.followers) ? state.followers.length : "0"} followers</h6>
              <h6 className="myPadding1">{(state && state.following) ? state.following.length : "0"} following</h6>
            </div>

          </div>
        </div>
        {/* Profile Picture */}
        <div className="file-field input-field " >
          <div className="btn white" style={{ color: "black" }}>
            <span>Update Pic</span>
            <input type="file"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper ">
            <input className="file-path validate" type="text" />
          </div>
        </div>

        <div className="myPadding">
          <button onClick={(e) => handleSubmit(e)} disabled={!img1} className="btn waves-effect waves-light">Submit</button>

        </div>

        {(myProfileData) && (
          myProfileData.map((item) => {
            return (
              <img key={item._id} className="myImg1 myPadding1" src={item.photoUrl} alt={item.title} />
            )
          })
        )}
      </div>
    </>
  )
}

export default Profile;
