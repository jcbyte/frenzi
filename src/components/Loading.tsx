import { Spinner } from "@nextui-org/react";

// Component which will show a loading component until the `loaded` state becomes true then will show the given content
export default function Loading({ loaded, once: elem }: { loaded: boolean; once: JSX.Element }) {
	const Loader = () => (
		<div className="w-full flex justify-center p-10">
			<Spinner label="Loading..." color="primary" size="lg" />
		</div>
	);

	return loaded ? elem : <Loader />;
}
