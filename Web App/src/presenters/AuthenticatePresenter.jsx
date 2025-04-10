import { useState } from "react";
import AuthenticateView from "../views/AuthenticateView";
import LoadingView from "../views/LoadingView";

function AuthenticatePresenter(props) {
	const [loading, setLoading] = useState(false);

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

	function signInACB() {
		setLoading(true);
	}

	function helpACB() {
		
	}

	return (loading ? <LoadingView message="Signing In" /> : <AuthenticateView users={users} clockName={clockName} signIn={signInACB} showHelp={helpACB} /> );
}

export default AuthenticatePresenter;
