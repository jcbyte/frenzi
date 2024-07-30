import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import GenericPage from "../components/GenericPage";
import PeopleList from "../components/PeopleList";
import UnpaidCard from "../components/UnpaidCard";
import { addPerson } from "../firestore/db";
import { UserSettingsContext } from "../globalContexts";
import { DEFAULT_PERSON_DATA } from "../static";
import { roundTo } from "../tools/utils";
import { PersonData } from "../types";

// Function to try and add the new person to firestore
async function tryAddPerson(
	person: string,
	peopleData: PersonData[],
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>
): Promise<void> {
	// If this person already exists locally then throw an exception
	if (peopleData.map((personData: PersonData) => personData.name).includes(person)) {
		throw new Error("Name already exists");
	}

	// Try and add the person to firestore if accepted then add it to the local variable
	return await addPerson(person)
		.then((res) => {
			setPeopleData((prev) => {
				return [...prev, { ...DEFAULT_PERSON_DATA, name: person }];
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
}

export default function DashboardPage({
	asSkeleton = false,
	peopleData,
	setPeopleData,
}: {
	asSkeleton?: boolean;
	peopleData: PersonData[];
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>;
}) {
	const { userSettings } = useContext(UserSettingsContext);

	const [addModalName, setAddModalName] = useState<string>("");
	const {
		isOpen: isAddModalOpen,
		onOpen: onOpenAddModal,
		onClose: onCloseAddModal,
		onOpenChange: onOpenChangeAddModal,
	} = useDisclosure();

	// Total distance by adding up each persons distance (derived state)
	let totalDistance: number = roundTo(
		peopleData.length > 0 ? peopleData.map((person) => person.distance).reduce((acc, x) => acc + x) : 0,
		userSettings.distanceDecimals
	);

	return (
		<>
			<GenericPage>
				<UnpaidCard asSkeleton={asSkeleton} distance={totalDistance} />
				<PeopleList asSkeleton={asSkeleton} peopleData={peopleData} />
				<Button
					color="primary"
					variant="flat"
					className="w-fit min-w-40"
					onClick={() => {
						setAddModalName("");
						onOpenAddModal();
					}}
				>
					Add
				</Button>

				<Modal
					isOpen={isAddModalOpen}
					onOpenChange={onOpenChangeAddModal}
					placement="center"
					backdrop="blur"
					className="dark text-foreground"
				>
					<ModalContent>
						<ModalHeader>Add</ModalHeader>
						<ModalBody>
							<Input
								label="Name"
								className="w-fit min-w-80"
								value={addModalName}
								onValueChange={(newValue) => {
									setAddModalName(newValue);
								}}
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="flat" onPress={onCloseAddModal}>
								Close
							</Button>
							<Button
								color="primary"
								variant="flat"
								onPress={() => {
									// Try and add the person and give the user a toast response
									tryAddPerson(addModalName, peopleData, setPeopleData)
										.then((res) => {
											toast.success("Added");
											onCloseAddModal();
										})
										.catch((err) => {
											toast.error(`Could not add: ${err.message}`);
										});
								}}
							>
								Add
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</GenericPage>
		</>
	);
}
