import clsx from "clsx";
import { Button } from "../components/ui/button";

function NavbarView(props) {
	return (
		<div className="flex flex-row justify-evenly gap-2 border-t-1 pb-5">
			{props.tabs.map((tab, index) => (
				<Button
					key={tab.id}
					variant="ghost"
					className={clsx("flex flex-col items-center h-auto ", props.activeTab === tab.id ? "text-primary" : "text-muted-foreground")}
					onClick={() => props.changeTab(tab.id)}
				>
					{tab.icon}
					{tab.name}
				</Button>
			))}
		</div>
	);
}

export default NavbarView;
