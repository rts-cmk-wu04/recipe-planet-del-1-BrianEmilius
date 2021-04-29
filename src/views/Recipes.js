// src/views/Recipes.js
import TokenContext from "../contexts/TokenContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";

function Recipes() {
	var token = useContext(TokenContext)[0];
	var [content, setContent] = useState([]);

	useEffect(function() {
		axios.get("http://localhost:1337/recipes")
			.then(response => {
				var filteredList = response.data.filter(item => item.author.id === token.user.id);
				setContent(filteredList);
			});
	}, [setContent, token]);

	return (
		<>
		<Link to="/admin/create-recipe">Create new recipe</Link>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					{content.map(item => {
						return (
							<tr key={item.id}>
								<td>Del <Link to={"/admin/edit-recipe/" + item.id}>Edit</Link></td>
								<td>{ item.title }</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default Recipes;
