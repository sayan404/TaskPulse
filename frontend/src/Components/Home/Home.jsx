import React from "react";
import "./Home.css";
import logo from "../../assets/Logo.png";
import stat_backg from "../../assets/stat_backg.png";
import { Link } from "react-router-dom";
import welcomeText from '../../Data/data'
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from '@mui/material/Button';

const Home = () => {
    return (
        <>
            <div className="home_main_container">
                <div className="nav_bar">
                    <div className="left_navbar">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="right_navbar">
                        <Link to="/login">
                            <span className="login_signup_button">
                                Login/SignUp <LockOpenIcon sx={{ margin: "auto 0 auto 1vh" }} />
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="middle_container">
                    <div className="left_middle_container">
                        <p className="catchy_text_p_1">
                            Empower Your Productivity , Conquer Tasks with
                            <span className="emphasised_text">TaskPulse</span>
                        </p>
                        <p className="catchy_text_p_2">
                            <CheckCircleIcon sx={{ padding: "1vh" }} />
                            <p>Boost your productivity and take control of your life.</p>
                        </p>
                        <>
                            {welcomeText ? (
                                welcomeText.map((txt, idx) => {
                                    return (<p className="catchy_text_p_2" key={idx}>
                                        <CheckCircleIcon sx={{ padding: "1vh" }} />
                                        <p>{txt.text}</p>
                                    </p>)
                                })
                            ) : (
                                <></>
                            )}
                        </>
                        <Link to='/login' ><Button variant="contained" color="success" sx={{ padding: '1.8vh 4vh', margin: '2vh', font: '500 2vh roboto', borderRadius: '20px' }}>Get Started</Button></Link>
                    </div>
                    <div className="right_middle_container">
                        <img className="right_img" src={stat_backg} alt="stat_backg" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
