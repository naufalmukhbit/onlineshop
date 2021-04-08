import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/admin">
					<Admin />
				</Route>
				<Route path="/cart">
					<Cart />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
