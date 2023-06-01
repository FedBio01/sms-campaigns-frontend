import React, {useState} from "react";
import swal from 'sweetalert'

async function loginUser(credentials) {
    return fetch('http://10.200.200.6:4000/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

const Login = (props) => {

  
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
          username,
          password
        });
        if ('token' in response) {
          swal("Success", "Good", "success", {
            buttons: false,
            timer: 2000,
          })
          .then((value) => {
            localStorage.setItem('token', response['token']);
            localStorage.setItem('user', JSON.stringify(response['user']));
            window.location.href = "/";
          });
        } else {
          swal("Failed", "Wrong", "error");
        }
      }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input vale ={username} type="username" placeholder="Username" id="username" name="username" onChange={e => setUsername(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input vale ={password} type="password" placeholder="xxxxxxxxxx" id="password" name="password" onChange={e => setPassword(e.target.value)} />
            <button type="submit">Log In</button>
        </form>
        </div>
    )
}

export default Login;