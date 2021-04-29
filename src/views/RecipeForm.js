// src/views/RecipeForm.js
import TokenContext from "../contexts/TokenContext";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function RecipeForm({ mode, id }) {
	var token = useContext(TokenContext)[0];
	var { setValue, handleSubmit, register, formState: { errors } } = useForm();
	var [content, setContent] = useState({});

	function saveRecipe(data) {
		console.log(data);
		mode === "create" && axios.post("http://localhost:1337/recipes", {
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
		});

		mode === "edit" && axios.put("http://localhost:1337/recipes/" + id, {
			title: data.title,
			description: data.description,
			procedure: data.procedure,
			kcal: data.kcal,
			protein: data.protein,
			fat: data.fat,
			carbs: data.carbs,
			author: token.user.id,
			ingredients: data.ingredients
		}, {
			headers: {
				"Authorization": `Bearer ${token.jwt}`
			}
		})
			.then(response => console.log(response));
	}

	useEffect(function() {
		axios.get("http://localhost:1337/recipes/" + id)
			.then(response => setContent(response.data));
	}, [setContent]);

	useEffect(function() {
		if (content) {
			setValue("title", content.title);
			setValue("description", content.description);
			setValue("procedure", content.procedure);
			setValue("kcal", content.kcal);
			setValue("fat", content.fat);
			setValue("protein", content.protein);
			setValue("carbs", content.carbs);
			content.ingredients?.map((ingredient, i) =>
				setValue(`ingredients[${i}]`, ingredient));
		}
	}, [content]);

	return (
		<form onSubmit={handleSubmit(saveRecipe)}>

			<div className="inputGroup">
				<label htmlFor="title">Title</label>
				<input type="text" { ...register("title") } id="title" />
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
					<input type="number" step="0.1" { ...register("kcal") } id="kcal"/>

					<label htmlFor="fat">Fat</label>
					<input type="number" step="0.1" { ...register("fat") } id="fat"/>

					<label htmlFor="protein">Protein</label>
					<input type="number" step="0.1" { ...register("protein") } id="protein"/>

					<label htmlFor="carbs">Carbs</label>
					<input type="number" step="0.1" { ...register("carbs") } id="carbs"/>
				</fieldset>
			</div>

			<div className="inputGroup">
				<fieldset>
					<legend>Ingredients</legend>
					{content.ingredients?.map((ingredient, i) => <input type="text" { ...register(`ingredients[${i}]`) } />)}
				</fieldset>
			</div>

			<button type="submit">Save</button>
		</form>
	)
}

export default RecipeForm;
