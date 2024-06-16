import { Button } from "@nextui-org/react";
import "./App.css";
import MyNavbar from "./MyNavbar";
import PeopleList from "./PeopleList";
import UnpaidCard from "./UnpaidCard";
import { testfb } from "./firebase";

export default function App() {
	return (
		<>
			<MyNavbar />

			<div className="flex justify-center w-full">
				<div className="p-4 flex flex-col gap-2">
					<UnpaidCard balance={10.4} distance={46} />
					<PeopleList />
				</div>
			</div>

			<Button onClick={testfb} color="primary">
				Get data
			</Button>
			<br />
		</>
	);
}
