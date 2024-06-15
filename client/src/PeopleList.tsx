import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

const columns = [
	{
		key: "name",
		label: "Name",
	},
	{
		key: "balance",
		label: "Balance",
	},
	{
		key: "distance",
		label: "Distance",
	},
];

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
			<TableHeader columns={columns}>
				{columns.map((column) => (
					<TableColumn key={column.key}>{column.label}</TableColumn>
				))}
			</TableHeader>
			<TableBody items={rows}>
				{rows.map((row, i) => (
					<TableRow key={i}>
						{Object.values(row).map((value) => (
							<TableCell>{value}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
