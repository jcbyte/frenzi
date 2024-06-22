import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import UnpaidCard from "../components/UnpaidCard";
import { UserSettingsContext } from "../globalContexts";
import { DEFAULT_PERSON_DATA } from "../static";
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
	const { userSettings } = useContext(UserSettingsContext);
	const { personIndex: personIndexStr } = useParams();

	// (derived state)
	let personIndex: number = Number(personIndexStr);
	let personData: PersonData = !asSkeleton ? peopleData[personIndex] : DEFAULT_PERSON_DATA;

	return (
		<>
			<UnpaidCard
				asSkeleton={asSkeleton}
				balance={personData.distance * userSettings.costPerDistance}
				distance={personData.distance}
			/>
			{/* // TODO change distances/balance panel */}
			{/* // TODO edit button */}
			<Button
				color="danger"
				variant="flat"
				className="w-fit min-w-40"
				onClick={() => {
					// TODO delete
					console.log("delete");
				}}
			>
				Delete
			</Button>
		</>
	);
}
