import { Button, Modal, ModalContent, ModalFooter, ModalHeader, Skeleton, useDisclosure } from "@nextui-org/react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import UnpaidCard from "../components/UnpaidCard";
import { _removePerson } from "../firestore/db";
import { UserSettingsContext } from "../globalContexts";
import { DEFAULT_PERSON_DATA } from "../static";
import { PersonData } from "../types";

async function tryRemovePerson(
	person: string,
	peopleData: PersonData[],
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>
): Promise<void> {
	// If this person doesn't exists locally then throw an exception
	if (!peopleData.map((personData: PersonData) => personData.name).includes(person)) {
		throw new Error("Person does not exists");
	}

	// Try and remove the person to firestore if accepted then remove them from the local variable
	return await _removePerson(person)
		.then((res) => {
			setPeopleData((prev) => {
				return prev.filter((personData: PersonData) => personData.name != person);
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
}

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
	const navigate = useNavigate();

	const {
		isOpen: isRemoveModalOpen,
		onOpen: onOpenRemoveModal,
		onClose: onCloseRemoveModal,
		onOpenChange: onOpenChangeRemoveModal,
	} = useDisclosure();

	// (derived state)
	let personData: PersonData = !asSkeleton ? peopleData[Number(personIndexStr)] : DEFAULT_PERSON_DATA;

	return (
		<>
			<Skeleton isLoaded={!asSkeleton} className="rounded-lg">
				<p className="text-xl">{personData.name}</p>
			</Skeleton>
			<UnpaidCard
				asSkeleton={asSkeleton}
				balance={personData.distance * userSettings.costPerDistance}
				distance={personData.distance}
			/>
			{/* // TODO change distances/balance panel */}
			<Button color="danger" variant="flat" className="w-fit min-w-40" onClick={onOpenRemoveModal}>
				Remove
			</Button>

			<Modal
				isOpen={isRemoveModalOpen}
				onOpenChange={onOpenChangeRemoveModal}
				placement="center"
				backdrop="blur"
				className="dark text-foreground"
			>
				<ModalContent>
					<ModalHeader>Remove {personData.name}</ModalHeader>
					<ModalFooter>
						<Button color="danger" variant="flat" onPress={onCloseRemoveModal}>
							Cancel
						</Button>
						<Button
							color="primary"
							variant="flat"
							onPress={() => {
								// Try and remove the person and give the user a toast response
								tryRemovePerson(personData.name, peopleData, setPeopleData)
									.then((res) => {
										toast.success("Removed");
										navigate("/");
									})
									.catch((err) => {
										toast.error(`Could not remove: ${err.message}`);
									});
							}}
						>
							Remove
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
