import GenericPage from "../components/GenericPage";

export default function NoPage() {
	return (
		<>
			<GenericPage>
				<p className="text-6xl">404</p>
				<p className="text-base">Page not found</p>
			</GenericPage>
		</>
	);
}
