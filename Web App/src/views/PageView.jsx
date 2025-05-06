import { ChevronLeft } from "lucide-react";

function PageView(props) {
	function renderTitle() {
		if (props.renderBackButton) {
			return (
				<button className="text-xl font-medium mb-5 flex flex-row text-blue-500  active:opacity-40" onClick={props.onBackButtonClick}>
					<ChevronLeft className="size-7" />
					Go back
				</button>
			);
		} else {
			return <h2 className="text-4xl font-bold mb-5">{props.title}</h2>;
		}
	}

	return (
		<div className="p-5 overflow-scroll h-full">
			{renderTitle()}
			{props.children}
		</div>
	);
}

export default PageView;
