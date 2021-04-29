// src/components/AppBar.js
import { Link, Redirect } from "@reach/router";
import TokenContext from "../contexts/TokenContext";
import { useContext } from "react";

function AppBar() {
	var setToken = useContext(TokenContext)[1];

	function logout() {
		var confirm = window.confirm("Are you sure you want to log out?");

		if (confirm) {
			document.cookie = `rp_token=""; expires=${new Date().toUTCString()}`;
			setToken({});
			return <Redirect to="/" />
		}
	}

	return (
		<header>
			<Link to="/admin">Recipe Planet</Link>
			<input type="search" />
			<button onClick={() => logout()}>Log out</button>
		</header>
	);
}

export default AppBar;
