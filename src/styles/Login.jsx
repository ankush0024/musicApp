/** @format */

import React from "react";
import { LoginButton, LoginLink } from "../styles/Login.styles";
const CLIENT_ID = "e6b33b875ec341578dcec7acdd58fe00";
const REDIRECT_URI = "http://localhost:3000/";
const Login = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

  return (
    <LoginButton>
      <LoginLink href={AUTH_URL}> Login in with Spotify</LoginLink>
    </LoginButton>
  );
};

export default Login;
