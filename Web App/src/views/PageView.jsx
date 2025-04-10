function PageView(props) {
	return (
		<div className="p-5 overflow-scroll h-full">
			<h2 className="text-4xl font-bold mb-5 ">{props.title}</h2>
			{props.children}
		</div>
	);
}

export default PageView;
