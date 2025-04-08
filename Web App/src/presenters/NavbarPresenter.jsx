import { useDispatch } from "react-redux";
import NavbarView from "../views/NavbarView";
import { useSelector } from "react-redux";
import { logoutUser } from "../model/interface";

function NavbarPresenter(props) {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.interface.authenticated);

	const items = [{ name: "Home" }, { name: "About" }, { name: "Contact" }];

	function onClickACB(item) {
		alert("Clicked on item: " + item);
	}

	function logoutACB() {
		dispatch(logoutUser());
	}

	return <NavbarView items={items} onClick={onClickACB} authenticated={isAuthenticated} logoutUser={logoutACB} />;
}

export default NavbarPresenter;
