import { useParams } from "react-router-dom";
import { PersonData } from "../types";

export default function PersonPage({
	asSkeleton = false,
	peopleData,
	setPeopleData,
}: {
	asSkeleton: boolean;
	peopleData: PersonData[];
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>;
}) {
	const { person } = useParams();

	// TODO this page
	return <div>PersonPage for {person}</div>;
}
