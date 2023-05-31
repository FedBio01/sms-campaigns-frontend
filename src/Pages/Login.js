import React, {useState} from "react";
const Login = (props) => {

  
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }
    return (
        <div className="auth-form-container">
            <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input vale ={username} type="username" placeholder="Username" id="username" name="username" />
            <label htmlFor="password">Password</label>
            <input vale ={password} type="password" placeholder="xxxxxxxxxx" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        </div>
    )
}

export default Login;