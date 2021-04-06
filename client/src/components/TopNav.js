import React, { useContext } from 'react'
import { Link,useHistory } from 'react-router-dom';
import { userContext } from '../App';
const TopNav = () => {
    const history =useHistory();
    const { state, dispatch } = useContext(userContext);

    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        localStorage.clear();
        history.push("/login");
    }
    return (
        <>
            <nav >
                <div className="nav-wrapper white colorBlack" >
                   <div style={{display:"flext", justifyContent:"space-around"}} >
                       <Link to={state ? "/" : "/login"} className="brand-logo colorBlack left" >MiniInsta</Link>
                    <ul id="nav-mobile" className="right">
                        {
                            (state === null) && (
                                <>
                                    <li><Link to="register" className="colorBlack">Register</Link></li>
                                    <li><Link to="/login" className="colorBlack">Login</Link></li>
                                </>
                            )
                        }
                        {
                            (state !== null) && (
                                <>
                                    <li><Link to="/createpost" className="colorBlack">Create Post</Link></li>
                                    <li><Link to="/allFollowingPost" className="colorBlack">Following Post</Link></li>
                                    <li><Link to="/profile" className="colorBlack">Profile</Link></li>
                                    <li><button onClick={logout} className="btn waves-effect waves-light white" style={{color:"black"}}>Logout</button></li>
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
