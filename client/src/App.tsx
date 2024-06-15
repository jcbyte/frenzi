import { Button } from "@nextui-org/react";
import { useState } from "react";
import "./App.css";
import MyNavbar from "./MyNavbar";
import PeopleList from "./PeopleList";
import UnpaidCard from "./UnpaidCard";
import { ApiMessage } from "./shared/types";

export default function App() {
	const [data, setData] = useState<string>("Unknown");

	function getData(): void {
		fetch("http://localhost:3001/api")
			.then((res) => {
				console.log(res);
				return res.json();
			})
			.then((data: ApiMessage) => setData(data.message));
	}

	return (
		<>
			<MyNavbar />

			<div className="flex justify-center w-full">
				<div className="p-4 flex flex-col gap-2">
					<UnpaidCard balance={10.4} distance={46} />
					<PeopleList />
				</div>
			</div>

			<Button onClick={getData} color="primary">
				Get data
			</Button>
			<br />
			{data}
		</>
	);
}
