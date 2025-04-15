import { useState } from "react";
import AuthenticateView from "../views/AuthenticateView";
import LoadingView from "../views/LoadingView";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../model/interface/authentication";

const apiUrl = import.meta.env.VITE_API_URL;

function AuthenticatePresenter(props) {
	const loading = useSelector((state) => state.interface.authenticateRequest.status === "loading");
	const dispatch = useDispatch();

	const clockName = "Junior's Alarm Clock";
	const users = [
		{
			username: "Jonathan",
			isAdmin: true,
		},
		{
			username: "Mr Cool",
			isAdmin: true,
		},
		{
			username: "J. Junior",
			isAdmin: false,
		},
	];

	function signInACB(username, password) {
		dispatch(authenticateUser({ username, password }));
	}

	function helpACB() {
		console.log(apiUrl + "/api/auth/test");

		fetch(apiUrl + "/api/auth/test", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});
	}

	return loading ? <LoadingView message="Signing In" /> : <AuthenticateView users={users} clockName={clockName} signIn={signInACB} showHelp={helpACB} />;
}

export default AuthenticatePresenter;
