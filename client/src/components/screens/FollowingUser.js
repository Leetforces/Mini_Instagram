import React, { useState, useEffect } from 'react'
import Card from '../Card';
import { getAllFollowingPost } from '../../actions/auth'
const Home = () => {
    const [data, setData] = useState([]); //data is an Array
    useEffect(() => {
        const getAllFollowingPost1 = async () => {
            try {
                const res = await getAllFollowingPost();
                console.log("Res.data", res.data.data);
                setData(res.data.data);
            } catch (err) {
                console.log("Error in fetching following post:", err);
            }
        }
        getAllFollowingPost1();
    }, []);
    return (
        <>
            {
                (data.length) ? (
                    data.map((item, index) => {
                        return (
                            <Card
                                value={item}
                                key={item._id}
                                data={data}
                                setData={setData}
                            />
                        )
                    })
                ):(
                    <>
                    <div style={{textAlign:"center"}}>
                    <h3>Your are not following anyone.</h3>
                    <h5>Go to others profile and Follow to see the following friends posts.</h5>
                    </div>
                    </>
                )
            }

        </>
    )
}

export default Home
