import { Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useContext } from "react";
import { UserSettingsContext } from "../globalContexts";
import { currencies, distanceUnits } from "../static";
import { PersonData } from "../types";

// Component displaying the list of people with there respective unpaid balance and distance
export default function PeopleList({
	asSkeleton = false,
	peopleData,
}: {
	asSkeleton: boolean;
	peopleData: PersonData[];
}) {
	const { userSettings } = useContext(UserSettingsContext);

	return (
		<Table
			selectionMode="single"
			onRowAction={(key) => alert(`Open ${key}`) /* // TODO This needs to be implemented*/}
			className="w-fit min-w-96"
			aria-label="People's Miles"
		>
			<TableHeader>
				<TableColumn key={"name"}>Name</TableColumn>
				<TableColumn key={"balance"}>Balance</TableColumn>
				<TableColumn key={"distance"}>Distance</TableColumn>
			</TableHeader>
			<TableBody emptyContent={"No data"}>
				{/* For each person add a record to the row */}
				{(!asSkeleton ? peopleData : Array(3).fill({ name: "*", distance: 0 } as PersonData)).map(
					({ name, distance }: PersonData, i) => (
						<TableRow key={i}>
							<TableCell>
								<Skeleton isLoaded={!asSkeleton} className="rounded-lg">
									{name}
								</Skeleton>
							</TableCell>
							<TableCell>
								<Skeleton isLoaded={!asSkeleton} className="rounded-lg">
									{currencies[userSettings.currency]}
									{(distance * userSettings.costPerDistance).toFixed(2)}
								</Skeleton>
							</TableCell>
							<TableCell>
								<Skeleton isLoaded={!asSkeleton} className="rounded-lg">
									{distance.toFixed(userSettings.distanceDecimals)}
									{distanceUnits[userSettings.distanceUnit]}
								</Skeleton>
							</TableCell>
						</TableRow>
					)
				)}
			</TableBody>
		</Table>
	);
}
