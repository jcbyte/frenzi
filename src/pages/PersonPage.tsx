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
	const { personIndex: personIndexStr } = useParams();
	var personIndex: number = Number(personIndexStr);

	// TODO this page
	return <div>PersonPage for {!asSkeleton ? peopleData[personIndex].name : "a skele is loading"}</div>;
}
