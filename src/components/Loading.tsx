import { CircularProgress } from "@nextui-org/progress";

export default function Loading() {
	return (
		<div className="w-full flex justify-center p-10">
			<CircularProgress label="Loading..." size="lg" color="primary" />
			{/* Should this be a spinner? */}
		</div>
	);
}
