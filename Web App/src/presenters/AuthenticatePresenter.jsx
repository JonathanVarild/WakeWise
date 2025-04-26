import { useEffect, useState } from "react";
import AuthenticateView from "../views/AuthenticateView";
import LoadingView from "../views/LoadingView";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, clearAuthErrors, getAvailableUsers } from "../model/modules/authentication";

function AuthenticatePresenter(props) {
	const authIsLoading = useSelector((state) => state.authentication.authenticateUser.status === "loading");
	const reauthIsLoading = useSelector((state) => state.authentication.reauthenticateUser.status === "loading");
	const authError = useSelector((state) => state.authentication.authenticateUser.error);
	const reauthError = useSelector((state) => state.authentication.reauthenticateUser.error);

	const dispatch = useDispatch();

	const clockName = useSelector((state) => state.authentication.clockName);
	const users = useSelector((state) => state.authentication.availableUsers);

	useEffect(() => {
		dispatch(getAvailableUsers);
	}, [dispatch]);

	function signInACB(username, password) {
		dispatch(authenticateUser({ username, password }));
	}

	function helpACB() {
		console.log("Help clicked");
	}

	function clearErrorsACB() {
		dispatch(clearAuthErrors());
	}

	return authIsLoading || reauthIsLoading || users == null ? (
		<LoadingView message="Loading" />
	) : (
		<AuthenticateView users={users} clockName={clockName} signIn={signInACB} showHelp={helpACB} authError={authError} reauthError={reauthError} clearErrors={clearErrorsACB} />
	);
}

export default AuthenticatePresenter;
