import React from 'react';
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import {HashRouter, Route, Switch, withRouter} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";

// On apporte le CSS personnalisé
require("../css/app.css");

const App = () => {
	const NavbarWithRouter = withRouter(Navbar);

	return (
			<HashRouter>
				<NavbarWithRouter />

				<main className="container pt-5">
					<Switch>
						<Route path="/invoices" component={InvoicesPage} />
						<Route path="/customers" component={CustomersPage} />
						<Route path="/" component={HomePage} />
					</Switch>
				</main>
			</HashRouter>
	);
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
