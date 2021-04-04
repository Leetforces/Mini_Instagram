import React, { useState, useEffect } from 'react'
import Card from '../Card';
import { getAllPost } from '../../actions/auth'
const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getAllPost1 = async () => {
            try {
                const res = await getAllPost();
                console.log("Res.data", res.data.data);
                setData(res.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        getAllPost1();
    }, []);
    return (
        <>
            {
                data.map((item, index) => {
                    return (
                        <Card
                            value={item}
                            key={item._id}
                        />
                    )
                })
            }

        </>
    )
}

export default Home
