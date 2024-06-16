import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./DashboardPage";
import LoginPage from "./LoginPage";
import MyNavbar from "./MyNavbar";
import NoPage from "./NoPage";

export default function App() {
	return (
		<>
			<MyNavbar />

			<Routes>
				<Route path="/" element={<DashboardPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="*" element={<NoPage />} />
			</Routes>
		</>
	);
}
