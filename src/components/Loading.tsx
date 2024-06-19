import { Spinner } from "@nextui-org/react";

export default function Loading() {
	return (
		<div className="w-full flex justify-center p-10">
			<Spinner label="Loading..." color="primary" size="lg" />
		</div>
	);
}
