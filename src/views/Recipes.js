// src/views/Recipes.js
import TokenContext from "../contexts/TokenContext";
import axios from "axios";
import { Link } from "@reach/router";
import React from "react";

class Recipes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			content: []
		};
	}

	static contextType = TokenContext;

	componentDidMount() {
		console.log(this.context)
		axios.get("http://localhost:1337/recipes")
			.then(response => {
				var filteredList = response.data.filter(item => item.author.id === this.context[0].user.id);
				this.setState({ content: filteredList });
			});
	}

	render() {
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
						{this.state.content.map(item => {
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
}

export default Recipes;
