import { Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import UnpaidCard from "../components/UnpaidCard";
import { getSharedPersonsData } from "../firestore/db";
import { DEFAULT_PERSON_DATA } from "../static";
import { PersonData } from "../types";

// TODO skeleton here would be different, because loading separately
// TODO get authors user settings

export default function SharedPage({ asSkeleton = false }: { asSkeleton?: boolean }) {
	const { author, personIndex: personIndexStr } = useParams();
	const [personData, setPersonData] = useState<PersonData>(DEFAULT_PERSON_DATA);

	useEffect(() => {
		if (!author) {
			toast.error(`Could not load user data: Undefined author`);
		} else {
			getSharedPersonsData(author, Number(personIndexStr))
				.then((data) => {
					console.log(data);
					setPersonData(data);
				})
				.catch((err) => {
					toast.error(`Could not load user data: ${err.message}`);
				});
		}
	}, []);

	return (
		<>
			<Skeleton isLoaded={!asSkeleton} className="rounded-lg">
				<p className="text-xl">{personData.name}</p>
			</Skeleton>
			<div className="flex gap-2 items-end">
				<UnpaidCard
					asSkeleton={asSkeleton}
					// balance={personData.distance * userSettings.costPerDistance}
					balance={0}
					distance={personData.distance}
				/>
			</div>
		</>
	);
}
