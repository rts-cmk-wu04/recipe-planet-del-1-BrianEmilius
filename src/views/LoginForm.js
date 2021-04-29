// src/views/LoginForm.js
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import { navigate } from "@reach/router";

function LoginForm() {
	var { register, handleSubmit, formState: { errors } } = useForm();
	var [loginError, setLoginError] = useState("");
	var setToken = useContext(TokenContext)[1];

	function login(data) {
		axios.post("http://localhost:1337/auth/local", {
			"identifier": data.email,
			"password": data.password
		})
			.then(response => {
				setToken(response.data);
				if (data.remember) {
					var d = new Date();
  				d.setTime(d.getTime() + (1000*60*60*24*30));
					document.cookie = `rp_token=${JSON.stringify(response.data)}; expires=${d.toUTCString()}`;
				}
				navigate("/admin");
			})
			.catch(function(error) {
				setLoginError("Email or password incorrect. Pl0x fix nao >:D");
			});
	}

	return (
		<main>
			<form onSubmit={handleSubmit(login)} noValidate>
				<div className="inputGroup">
					<label htmlFor="email">Email</label>
					<input type="email" id="email" {...register("email", {required: true})} />
					{ errors.email && <span className="danger">Please complete this field.</span> }
				</div>
				<div className="inputGroup">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" {...register("password", {required: true})} />
					{ errors.password && <span className="danger">Please complete this field.</span> }
				</div>
				<div className="inputGroup">
					<input type="checkbox" {...register("remember")} id="remember"/>
					<label htmlFor="remember">Remember me</label>
				</div>
				<span className="danger">{loginError}</span>
				<button type="submit">Log in</button>
			</form>
		</main>
	);
}

export default LoginForm;
