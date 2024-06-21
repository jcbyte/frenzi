// Component which will show a loading component until the `loaded` state becomes true then will show the given content
export default function Loading({
	loaded,
	before,
	after,
}: {
	loaded: boolean;
	before: JSX.Element;
	after: JSX.Element;
}) {
	return loaded ? after : before;
}
