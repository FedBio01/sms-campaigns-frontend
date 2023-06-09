import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import swal from 'sweetalert'
import {TextField,InputAdornment,FormControl,InputLabel,IconButton,Button,Input,Alert,Stack} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import "./login.css"

async function loginUser(credentials) {
    return fetch('http://10.200.200.4:4000/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    //input
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');

    //input error
    const [usernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    

    const [formValid] = useState();
    const [success] = useState();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const navigate = useNavigate();

    const handlePassword = () => {
      if (
        !password ||
        password.length < 2 ||
        password.length > 20
      ) {
        setPasswordError(true);
        return;
      }
  
      setPasswordError(false);
    };

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
            navigate("/")
          });
        } else {
          swal("Failed", "Wrong", "error");
        }
      }

    return (
      <div className="login-box">
        <h2>Login</h2>
      <div style={{ marginTop: "5px" }}>
        <TextField
          label="Username"
          fullWidth
          error={usernameError}
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          value={username}
          InputProps={{}}
          size="small"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div style={{ marginTop: "5px" }}>
        <FormControl sx={{ width: "100%" }} variant="standard">
          <InputLabel
            error={passwordError}
            htmlFor="standard-adornment-password"
          >
            Password
          </InputLabel>
          <Input
            error={passwordError}
            onBlur={handlePassword}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      

      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={handleSubmit}
        >
          LOGIN
        </Button>
      </div>

      {formValid && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="error" size="small">
            {formValid}
          </Alert>
        </Stack>
      )}

      {success && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="success" size="small">
            {success}
          </Alert>
        </Stack>
      )}

      <div style={{ marginTop: "7px", fontSize: "10px" }} margin="left">
        <br />
        Do you have an account ?{" "}
        <small style={{ textDecoration: "underline", color: "blue" }} onClick={() => {navigate("/signup")}}>
          Sign Up
        </small>
      </div>
    </div>
    )
}

export default Login;