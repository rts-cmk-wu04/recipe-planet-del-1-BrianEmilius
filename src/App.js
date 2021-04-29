import LoginForm from "./views/LoginForm";
import TokenContext from "./contexts/TokenContext";
import { useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import Dashboard from "./views/Dashboard";

function getCookie(name) {
  var value = `; ${document.cookie}`;
  var parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {
  var tokenState = useState({});

  useEffect(function() {
    var cookie = getCookie("rp_token");
    if (cookie) {
      cookie = JSON.parse(cookie);
      tokenState[1](cookie);
      navigate("/admin");
    }
  }, []);

  return (
    <TokenContext.Provider value={tokenState}>
      <Router>
        <LoginForm path="/" />
        <Dashboard default path="/admin/*" />
      </Router>
    </TokenContext.Provider>
  );
}

export default App;
