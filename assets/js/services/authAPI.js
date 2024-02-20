import axios from "axios";
import jwtDecode from "jwt-decode";

function authenticate(credentials) {
	return axios
		.post("http://localhost:8000/api/login_check", credentials)
		.then(response => response.data.token)
		.then(token => {
			// Je stocke le token dans mon localStorage
			window.localStorage.setItem("authToken", token);
			// On prévient Axios qu'on a maintenant un header par défaut sur toutes
			// nos futures requetes HTTP
			setAxiosToken(token);
		});
}

/**
 * Positionne le token JWT sur axios
 */
function setAxiosToken(token) {
	axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place lors du chargement de l'application
 */
function setup() {
	// 1. Voir si on a un token ?
	const token = window.localStorage.getItem("authToken");
	// 2. Si le token est encore valide
	if (token) {
		const { exp: expiration } = jwtDecode(token);
		if (expiration * 1000 > new Date().getTime()) {
			setAxiosToken(token);
		}
	}
}

function isAuthenticated() {
	// 1. Voir si on a un token ?
	const token = window.localStorage.getItem("authToken");
	// 2. Si le token est encore valide
	if (token) {
		const { exp: expiration } = jwtDecode(token);
		return expiration * 1000 > new Date().getTime();
	}
	return false;
}

/**
 * Déconnexion (suppression du token du localStorage et sur Axios)
 */
function logout() {
	window.localStorage.removeItem("authToken");
	delete axios.defaults.headers["Authorization"];
}

export default {
	authenticate,
	setup,
	isAuthenticated,
	logout,
};
