import React, {useState} from "react";
import swal from 'sweetalert';

const Register = (props) => {

    const [username, setUsername] = useState ();
    const [password, setPassword] = useState ();
    const [email, setEmail] = useState ();
    let credentials = { username, email, password};

    const handleSubmit = async e => {
      e.preventDefault();
      fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
         },
        body: JSON.stringify(credentials)
      })
      .then((data) => data.json())
      .then((data)=>{
        if(data.status != null && data.status!==200)
          alert("fail due to " + data.message);
        else alert(data.text);
      })
      .catch((error) => {
       alert("Registration failed due to: " + error.message);
      });
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
            <input vale ={username} type="username" autoComplete="username" placeholder="username" id="username" name="username"  onChange={e => setUsername(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input vale ={email} type="email" autoComplete="email" placeholder="email" id="email" name="email"  onChange={e => setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input vale ={password} type="password" placeholder="xxxxxxxxxx" id="password" name="password"  onChange={e => setPassword(e.target.value)} />
            <button type="submit">Register</button>
        </form>
        </div>
    )
}
export default Register;