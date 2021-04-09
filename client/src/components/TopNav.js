import React, { useContext, useState,useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../App';
import { searchUser } from '../actions/user';
import Modal from 'react-modal';

const TopNav = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(userContext);
    const [modelIsOpen, setModalIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        localStorage.clear();
        history.push("/login");
    }
    const fetchUsers = async (event) => {
        setSearch(event.target.value);
        const result = await searchUser(event.target.value);
        setData(result.data.user);
        console.log("RESULT===========> ", result.data.user);
    }
    const customStyles = {
        content: {
            height: "70%",
            width: "70%",
            textAlign: "center",
            margin: "0px auto"

        }
    };

 
    return (
        <>
            <nav >
                <div className="nav-wrapper white colorBlack" >
                    <div style={{ display: "flext", justifyContent: "space-around" }} >
                        <Link to={state ? "/" : "/login"} className="brand-logo colorBlack left" >MiniInsta</Link>
                        <ul id="nav-mobile" className="right">
                            {
                                (state === null) && (
                                    <>
                                        <li key="11"><Link to="register" className="colorBlack">Register</Link></li>
                                        <li key="12"><Link to="/login" className="colorBlack">Login</Link></li>
                                        <li key="13"><Link to="/reset" className="colorBlack">Reset Password</Link></li>
                                    </>
                                )
                            }
                            {
                                (state !== null) && (
                                    <>
                                        <li key="18"><button onClick={() => setModalIsOpen(true)}><i className="material-icons">search</i></button></li>
                                        <li key="15"><Link to="/allFollowingPost" className="colorBlack">Following Post</Link></li>
                                        <li key="14"><Link to="/createpost" className="colorBlack">Create Post</Link></li>
                                        <li key="16"><Link to="/profile" className="colorBlack">Profile</Link></li>
                                        <li key="17"><button onClick={logout} className="btn waves-effect waves-light white" style={{ color: "black" }}>Logout</button></li>

                                        <div>

                                            <Modal style={customStyles} isOpen={modelIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                                                <h2>MiniInsta Search</h2>
                                                <input
                                                    type="text"
                                                    placeholder="Search User"
                                                    value={search}
                                                    onChange={(e) => fetchUsers(e)}

                                                />

                                                <ul className="collection">
                                                    {
                                                        data.map((item) => {
                                                            return (
                                                                <li className="collection-item">
                                                                    <Link onClick={() => setModalIsOpen(false)} to={("/profile/" + item._id)} >{item.name}</Link>
                                                                </li>
                                                            )
                                                        })
                                                    }

                                                </ul>
                                            </Modal>
                                        </div>

                                    </>
                                )
                            }


                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
};

export default TopNav;
