// src/components/NavBar.js
import { Link } from "@reach/router";

function NavBar() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/admin/recipes">My Recipes</Link>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
