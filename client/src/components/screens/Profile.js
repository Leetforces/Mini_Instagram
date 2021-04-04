import React, { useEffect, useState ,useContext} from 'react'
import { getMyPost } from '../../actions/auth'
import {userContext} from '../../App';
const Profile = () => {
  const [myProfileData, setProfileData] = useState([]);
  const {state,dispatch} =useContext(userContext);
  console.log("State==========>",state);
  
  useEffect(() => {
    const getMyPost1 = async () => {
      try {
        const res = await getMyPost();
        console.log("Res.data", res.data.data);
        await setProfileData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    getMyPost1();
    console.log("myProfileData=============>",myProfileData);
  }, []);   //[] for 1 time Execute otherwise it go call infinite 
  return (
    <>

      <div style={{ maxWidth: "850px", margin: "0px auto" }}>
        <div className="myProfile">
          <div>
            <img src="https://source.unsplash.com/user/erondu/1600x900" alt="PhotoImg" className="myImg" />
          </div>
          <div>
            <h4>{state?state.name:"loading"}</h4>
            <div className="myProfile1">
              <h6 className="myPadding1">4 posts</h6>
              <h6 className="myPadding1">4 followers</h6>
              <h6 className="myPadding1">4 following</h6>
            </div>
          </div>
        </div>

        {
          myProfileData.map((item) => {
              return (
                <img key={item._id} className="myImg1 myPadding1" src={item.photoUrl} alt={item.title} />
              )
          })
        }
      </div>
    </>
  )
}

export default Profile
