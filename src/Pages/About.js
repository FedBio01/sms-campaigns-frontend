import React from "react";
import {useNavigate} from "react-router-dom";

function About (){
    let navigate = useNavigate();
    return (
        <div>
            THIS IS THE ABOUT PAGE
            <button onClick={() => {navigate("/login")}}>
                Change to login page</button>
        </div>
    );
}

export default About;