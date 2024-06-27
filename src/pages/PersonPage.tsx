import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Skeleton,
	useDisclosure,
} from "@nextui-org/react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import PanelGrid from "../components/PanelGrid";
import UnpaidCard from "../components/UnpaidCard";
import { removePerson, updatePersonData } from "../firestore/db";
import { UserSettingsContext } from "../globalContexts";
import { DEFAULT_PERSON_DATA, currencies, distanceUnits } from "../static";
import { roundTo } from "../tools/utils";
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
	return await removePerson(person)
		.then((res) => {
			setPeopleData((prev) => {
				return prev.filter((personData: PersonData) => personData.name !== person);
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
}

// Function to try and update the person in firestore with the updated values
async function trySetPersonData(person: PersonData, setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>) {
	// Try and update firestore if accepted then update the local variable
	return await updatePersonData(person)
		.then((res) => {
			setPeopleData((prev) => {
				return prev.map((personData: PersonData) => (personData.name !== person.name ? personData : person));
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
	asSkeleton?: boolean;
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

	const [setModalDistance, setSetModalDistance] = useState<number | undefined>();
	const [setModalBalance, setSetModalBalance] = useState<number | undefined>();
	const {
		isOpen: isSetModalOpen,
		onOpen: onOpenSetModal,
		onClose: onCloseSetModal,
		onOpenChange: onOpenChangeSetModal,
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
			<PanelGrid asSkeleton={asSkeleton} person={personData} setPeopleData={setPeopleData} />
			<Button
				color="primary"
				variant="flat"
				className="w-fit min-w-80"
				onClick={() => {
					setSetModalDistance(undefined);
					setSetModalBalance(undefined);
					onOpenSetModal();
				}}
			>
				Set Distance
			</Button>
			<Button color="danger" variant="flat" className="mt-4 w-fit min-w-40" onClick={onOpenRemoveModal}>
				Remove
			</Button>

			<Modal
				isOpen={isSetModalOpen}
				onOpenChange={onOpenChangeSetModal}
				placement="center"
				backdrop="blur"
				className="dark text-foreground"
			>
				<ModalContent>
					<ModalHeader>Set {personData.name} Distance</ModalHeader>
					<ModalBody>
						<Input
							label="Distance"
							type="number"
							min={0}
							className="w-fit min-w-80"
							value={setModalDistance ? String(setModalDistance) : ""}
							endContent={distanceUnits[userSettings.distanceUnit]}
							onValueChange={(newValue) => {
								setSetModalDistance(newValue ? roundTo(newValue, userSettings.distanceDecimals) : undefined);
								setSetModalBalance(newValue ? roundTo(Number(newValue) / userSettings.costPerDistance, 2) : undefined);
							}}
						/>
						<Input
							label="Balance"
							type="number"
							min={0}
							className="w-fit min-w-80"
							value={setModalBalance ? String(setModalBalance) : ""}
							startContent={currencies[userSettings.currency]}
							onValueChange={(newValue) => {
								setSetModalBalance(newValue ? roundTo(newValue, 2) : undefined);
								setSetModalDistance(
									newValue
										? roundTo(Number(newValue) * userSettings.costPerDistance, userSettings.distanceDecimals)
										: undefined
								);
							}}
						/>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="flat" onPress={onCloseSetModal}>
							Cancel
						</Button>
						<Button
							color="primary"
							variant="flat"
							onPress={() => {
								// Try and set the persons data
								trySetPersonData({ ...personData, distance: setModalDistance ?? 0 }, setPeopleData)
									.then((res) => {
										// No need for toast feedback as this can be seen directly on card
										onCloseSetModal();
									})
									.catch((err) => {
										toast.error(`Could not set distance: ${err.message}`);
									});
							}}
						>
							Set
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

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
