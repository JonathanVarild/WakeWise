import NavbarView from "../views/NavbarView";

function NavbarPresenter(props) {
	const items = [{ name: "Home" }, { name: "About" }, { name: "Contact" }];

	function onClickACB(item) {
		alert("Clicked on item: " + item);
	}

	return <NavbarView items={items} onClick={onClickACB} />;
}

export default NavbarPresenter;
