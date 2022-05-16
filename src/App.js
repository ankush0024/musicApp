/** @format */
import React from "react";
import Dashboard from "./styles/Dashboard.styles";
import Login from "./styles/Login";
import { Container } from "./styles/App.styles";
const App = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  return <Container>{code ? <Dashboard code={code} /> : <Login />}</Container>;
};

export default App;
