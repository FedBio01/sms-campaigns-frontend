import React, {useState} from "react";
const Register = (props) => {
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const [email, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }
    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Email</label>
            <input vale ={email} type="email" placeholder="email" id="email" name="email" />
            <label htmlFor="username">Username</label>
            <input vale ={username} type="username" placeholder="username" id="username" name="username" />
            <label htmlFor="password">Password</label>
            <input vale ={password} type="password" placeholder="xxxxxxxxxx" id="password" name="password" />
            <button type="submit">Register</button>
        </form>
        </div>
    )
}
export default Register;