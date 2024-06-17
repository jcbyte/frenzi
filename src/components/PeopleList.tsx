import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { settings } from "../globals";

const rows = [
	{
		name: "Test name 1",
		balance: 2,
		distance: 10,
	},
	{
		name: "test name 2",
		balance: 23,
		distance: 130,
	},
];

export default function PeopleList() {
	return (
		<Table
			selectionMode="single"
			onRowAction={(key) => alert(`Open ${rows[key as number].name}`)}
			className="w-fit min-w-96"
		>
			<TableHeader>
				<TableColumn key={"name"}>Name</TableColumn>
				<TableColumn key={"balance"}>Balance</TableColumn>
				<TableColumn key={"distance"}>Distance</TableColumn>
			</TableHeader>
			<TableBody>
				{rows.map((row, i) => (
					<TableRow key={i}>
						<TableCell>{row.name}</TableCell>
						<TableCell>
							{settings.currencySymbol}
							{row.balance.toFixed(2)}
						</TableCell>
						<TableCell>
							{row.distance.toFixed(settings.distanceDecimals)}
							{settings.distanceSymbol}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
