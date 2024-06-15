import { Button } from "@nextui-org/react";
import { useState } from "react";
import "./App.css";
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
			<div className="p-4">
				<UnpaidCard balance={10.4} distance={46} />
			</div>

			<Button onClick={getData} color="primary">
				Get data
			</Button>
			<br />
			{data}
		</>
	);
}
