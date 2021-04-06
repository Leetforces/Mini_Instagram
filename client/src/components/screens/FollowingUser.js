import React, { useState, useEffect } from 'react'
import Card from '../Card';
import { getAllFollowingPost } from '../../actions/auth'
const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getAllFollowingPost1 = async () => {
            try {
                const res = await getAllFollowingPost();
                console.log("Res.data", res.data.data);
                setData(res.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        getAllFollowingPost1();
    }, []);
    return (
        <>
            {
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
            }

        </>
    )
}

export default Home
