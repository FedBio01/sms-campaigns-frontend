import React, {useState} from "react";
import {TextField,InputAdornment,FormControl,InputLabel,IconButton,Button,Input} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import swal from 'sweetalert'
import "./signup.css"
import configuration from "../../configuration.json";
const server_ip = configuration.server_ip;

//controllo email valida
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);


const SignUp = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    //input
    const [username, setUsername] = useState ();
    const [password, setPassword] = useState ();
    const [email, setEmail] = useState ();
    let credentials = { username, email, password};

    //input error
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    //onBlur Username
    const handleUsername = () => {
      if (!username) {
        setUsernameError(true);
        return;
      }
  
      setUsernameError(false);
    };

    
     //onBlur Email
    const handleEmail = () => {
       console.log(isEmail(email));
      if (!isEmail(email)) {
          setEmailError(true);
          return;
      }

     setEmailError(false);
    };

  //onBlur Password
  const handlePassword = () => {
    if (
      !password ||
      password.length < 5 ||
      password.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };


  

    const handleSubmit = async e => {
      e.preventDefault();
      fetch(`http://${server_ip}/api/signup`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
         },
        body: JSON.stringify(credentials)
      })
      .then((data) => data.json())
      .then((data)=>{
        if(data.status != null && data.status!==200)
        swal("Error",data.message,"error");
          
        else  swal("Success","","success");
      })
      .catch((error) => {
       alert("Registration failed due to: " + error.message);
      });
    }

    return (
      <div className="signup-box">
        <h2>Signup</h2>
      <div style={{ marginTop: "10px" }}>
        <TextField
          error={usernameError}
          label="Username"
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          size="small"
          value={username}
          InputProps={{}}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          onBlur={handleUsername}
        />
      </div>

      <div style={{ marginTop: "5px" }}>
        <TextField
          label="Email Address"
          fullWidth
          error={emailError}
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          value={email}
          InputProps={{}}
          size="small"
          onBlur={handleEmail}
          onChange={(event) => {
            setEmail(event.target.value);
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
          SignUp
        </Button>
      </div>
    </div>
    )
}
export default SignUp;