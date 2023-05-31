import React from "react";
import { useParams } from "react-router-dom";


function Profile (){
    let {username} = useParams();
    return (
        <div>
            THIS IS {username} PROFILE PAGE
        </div>
    );
}

export default Profile;