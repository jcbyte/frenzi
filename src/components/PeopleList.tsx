import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useContext } from "react";
import { UserSettingsContext } from "../globalContexts";
import { currencies, distanceUnits } from "../static";
import { FriendData } from "../types";

// Component displaying the list of friends with there respective unpaid balance and distance
export default function PeopleList({ friendData }: { friendData: FriendData[] }) {
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
			<TableBody>
				{/* For each friend add a record to the row */}
				{friendData.map(({ name, distance }, i) => (
					<TableRow key={i}>
						<TableCell>{name}</TableCell>
						<TableCell>
							{currencies[userSettings.currency]}
							{(distance * userSettings.costPerDistance).toFixed(2)}
						</TableCell>
						<TableCell>
							{distance.toFixed(userSettings.distanceDecimals)}
							{distanceUnits[userSettings.distanceUnit]}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
