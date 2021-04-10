import React, { useContext, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../App';
import { searchUser } from '../actions/user';
import Modal from 'react-modal';
import PostAddIcon from '@material-ui/icons/PostAdd';
import {
    Container,
    AppBar,
    Typography,
    Toolbar,
    Button,
    Menu,
    MenuItem,
    TextField,
    Grid,
    Tooltip
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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


    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>

            <Container>
                <AppBar color="white">

                    <Grid container justify="space-around">
                        <Grid item md="4">
                            {/* style={{ flexGrow: 1 }} */}
                            <Typography variant="h3" ><Link to={state ? "/" : "/login"} className="brand-logo colorBlack" >MiniInsta</Link></Typography>
                        </Grid>

                        <Grid item md="7" >
                            <Grid container justify="space-between">

                                {
                                    (state === null) && (
                                        <>
                                            <Button ><Link to="register" className="colorBlack">Register</Link></Button>
                                            <Button><Link to="/login" className="colorBlack">Login</Link></Button>
                                            <Button><Link to="/reset" className="colorBlack">Reset Password</Link></Button>
                                        </>
                                    )
                                }

                                {
                                    (state !== null) && (

                                        <>
                                            <Grid item md='4' style={{ flexGrow: 1 }}>

                                                <Button
                                                    variant="contained"
                                                   
                                                    onClick={() => setModalIsOpen(true)}
                                                    endIcon={<SearchIcon />} >
                                                    Search
                                                </Button>
                                            </Grid>


                                            <Grid item md='8'>
                                                <Grid container justify="space-between">


                                                    {/* <Link to="/allFollowingPost" className="colorBlack"> <SearchIcon /></Link> */}
                                                    <Button><Link to="/allFollowingPost" className="colorBlack">Following Post</Link></Button>
                                                    <Button><Link to="/createpost" className="colorBlack"><Tooltip title="Create Post"><PostAddIcon /></Tooltip></Link></Button>


                                                    {/* menu for profile and logout */}

                                                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                                        <AccountCircleIcon />
                                                    </Button>
                                                    <Menu
                                                        id="simple-menu"
                                                        anchorEl={anchorEl}
                                                        keepMounted
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleClose}
                                                    >
                                                        <MenuItem onClick={handleClose}><Button><Link to="/profile" className="colorBlack">Profile</Link></Button></MenuItem>
                                                        <MenuItem onClick={() => { handleClose(); logout(); }}><Button>Logout</Button></MenuItem>
                                                    </Menu>
                                                </Grid>

                                            </Grid>


                                        </>
                                    )
                                }
                            </Grid>
                        </Grid>



                    </Grid>

                </AppBar>
            </Container>
            <br /><br />

            <br /><br />

            <br /><br />
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
};

export default TopNav;
