import { useParams } from "react-router-dom";

export default function SharedPage() {
	const { author, personIndex: personIndexStr } = useParams();

	return (
		<div>
			SharedPage from {author} for {personIndexStr}
		</div>
	);
}
