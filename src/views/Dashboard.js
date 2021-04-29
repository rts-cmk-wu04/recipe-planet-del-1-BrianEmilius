// src/views/Dashboard.js

import LoginForm from "./LoginForm";
import TokenContext from "../contexts/TokenContext";
import { navigate, Router } from "@reach/router";
import { useContext } from "react";
import AppBar from "../components/AppBar";
import NavBar from "../components/NavBar";
import Recipes from "./Recipes";
import RecipeForm from "./RecipeForm";

function Dashboard() {
  var token = useContext(TokenContext)[0];

  if (!token.jwt) {
    navigate("/");
    return <LoginForm />
  }

  return (
		<>
			<AppBar />
			<NavBar />
			<Router>
				<Recipes path="/admin/recipes" />
				<RecipeForm path="/admin/create-recipe" mode="create" />
				<RecipeForm path="/admin/edit-recipe/:id" mode="edit" />
			</Router>
		</>
	);
}

export default Dashboard;
