import { Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import GenericPage from "../components/GenericPage";
import UnpaidCard from "../components/UnpaidCard";
import { getSharedPersonsData, getUserSettings } from "../firestore/db";
import { DEFAULT_PERSON_DATA, DEFAULT_SETTINGS } from "../static";
import { PersonData, UserSettings } from "../types";

export default function SharedPage() {
	const { author, personIndex: personIndexStr } = useParams();
	const [personData, setPersonData] = useState<PersonData>(DEFAULT_PERSON_DATA);
	const [authorUserSettings, setAuthorUserSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
	const [asSkeleton, setAsSkeleton] = useState<boolean>(true);

	useEffect(() => {
		if (!author) {
			toast.error(`Could not load user data: Undefined author`);
		} else {
			let getDataPromises: Promise<void>[] = [
				getSharedPersonsData(author, Number(personIndexStr)).then((res) => {
					setPersonData(res);
				}),
				getUserSettings(author).then((res) => {
					setAuthorUserSettings(res);
				}),
			];

			Promise.all(getDataPromises)
				.then((data) => {
					setAsSkeleton(false);
				})
				.catch((err) => {
					toast.error(`Could not load data: ${err.message}`);
				});
		}
	}, []);

	return (
		<>
			<GenericPage>
				<Skeleton isLoaded={!asSkeleton} className="rounded-lg">
					<div className="flex items-end gap-2">
						<p className="text-xl">{personData.name}</p>
						<p className="text-xs text-zinc-400">(Viewing)</p>
					</div>
				</Skeleton>

				<div className="flex gap-2 items-end">
					<UnpaidCard asSkeleton={asSkeleton} distance={personData.distance} overrideSettings={authorUserSettings} />
				</div>
			</GenericPage>
		</>
	);
}
