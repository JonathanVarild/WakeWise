import { useEffect, useState } from "react";
import AuthenticateView from "../views/AuthenticateView";
import LoadingView from "../views/LoadingView";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, getAvailableUsers } from "../model/interface/authentication";
import { clearAuthErrors } from "../model/interface";

function AuthenticatePresenter(props) {
	const authIsLoading = useSelector((state) => state.interface.authenticateRequest.status === "loading");
	const reauthIsLoading = useSelector((state) => state.interface.reauthenticateRequest.status === "loading");
	const authError = useSelector((state) => state.interface.authenticateRequest.error);
	const reauthError = useSelector((state) => state.interface.reauthenticateRequest.error);

	const dispatch = useDispatch();

	const clockName = useSelector((state) => state.interface.clockName);
	const users = useSelector((state) => state.interface.availableUsers);

	useEffect(() => {
		dispatch(getAvailableUsers());
	}, [dispatch]);

	function signInACB(username, password) {
		dispatch(authenticateUser({ username, password }));
	}

	function helpACB() {

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
