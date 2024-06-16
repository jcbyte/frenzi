import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./DashboardPage";
import LoginPage from "./LoginPage";
import MyNavbar from "./MyNavbar";
import NoPage from "./NoPage";
import PrivateRoute from "./PrivatePage";

export default function App() {
	return (
		<>
			<MyNavbar />

			<Routes>
				<Route path="/" element={<PrivateRoute />}>
					<Route path="" element={<DashboardPage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="*" element={<NoPage />} />
			</Routes>

			<Toaster />
		</>
	);
}
