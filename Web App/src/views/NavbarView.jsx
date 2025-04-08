import { Button } from "../components/ui/button";

function NavbarView(props) {
	function onClickACB(test) {
		props.onClick(test);
		props.logoutUser();
	}

	return (
		<div className="text-center mt-5">
			{props.authenticated ? "Logged in" : "Logged out"}
			<div className="flex flex-row justify-center gap-2 mt-5">
				{props.items.map((item, index) => (
					<Button key={index} onClick={() => onClickACB(item.name)}>
						{item.name}
					</Button>
				))}
			</div>
		</div>
	);
}

export default NavbarView;
