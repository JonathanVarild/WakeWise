import { Loader } from "lucide-react";

function LoadingView(props) {
	return <div className="flex flex-col items-center justify-center h-screen">
        <Loader className="animate-spin [animation-duration:2s]" size={100} />
        <h2 className="text-5xl font-medium mt-10">{props.message || "Loading"}</h2>
    </div>;
}

export default LoadingView;
