import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useContext } from "react";
import { UserSettingsContext } from "../globalContexts";
import { currencies, distanceUnits } from "../static";
import { DistanceData } from "../types";

export default function PeopleList({ distanceData }: { distanceData: DistanceData }) {
	const { userSettings } = useContext(UserSettingsContext);

	return (
		<Table
			selectionMode="single"
			onRowAction={(key) => alert(`Open ${Object.keys(distanceData)[key as number]}`)}
			className="w-fit min-w-96"
		>
			<TableHeader>
				<TableColumn key={"name"}>Name</TableColumn>
				<TableColumn key={"balance"}>Balance</TableColumn>
				<TableColumn key={"distance"}>Distance</TableColumn>
			</TableHeader>
			<TableBody>
				{Object.entries(distanceData).map(([name, distance]) => (
					<TableRow key={name}>
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
