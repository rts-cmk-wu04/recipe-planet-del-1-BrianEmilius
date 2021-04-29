// src/views/RecipeForm.js
import TokenContext from "../contexts/TokenContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function RecipeForm({ mode }) {
	var token = useContext(TokenContext)[0];
	var { handleSubmit, register, formState: { errors } } = useForm();

	function saveRecipe(data) {
		console.log(data);
		axios.post("http://localhost:1337/recipes", {
			title: data.title,
			description: data.description,
			procedure: data.procedure,
			kcal: data.kcal,
			protein: data.protein,
			fat: data.fat,
			carbs: data.carbs,
			author: token.user.id
		}, {
			headers: {
				"Authorization": `Bearer ${token.jwt}`
			}
		})
	}

	return (
		<form onSubmit={handleSubmit(saveRecipe)}>
			<button type="submit">Save</button>

			<div className="inputGroup">
				<label htmlFor="title">Title</label>
				<input type="text" { ...register("title") } id="title"/>
			</div>
			<div className="inputGroup">
				<label htmlFor="description">Description</label>
				<textarea { ...register("description") } id="description"></textarea>
			</div>
			<div className="inputGroup">
				<label htmlFor="procedure">Procedure</label>
				<textarea { ...register("procedure") } id="procedure"></textarea>
			</div>

			<div className="inputGroup">
				<fieldset>
					<legend>Nutritional facts</legend>
					<label htmlFor="kcal">KCAL</label>
					<input type="number" { ...register("kcal") } id="kcal"/>

					<label htmlFor="fat">Fat</label>
					<input type="number" { ...register("fat") } id="fat"/>

					<label htmlFor="protein">Protein</label>
					<input type="number" { ...register("protein") } id="protein"/>

					<label htmlFor="carbs">Carbs</label>
					<input type="number" { ...register("carbs") } id="carbs"/>
				</fieldset>
			</div>

			<button type="submit">Save</button>
		</form>
	)
}

export default RecipeForm;
