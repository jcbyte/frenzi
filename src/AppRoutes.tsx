import { Route, Routes } from "react-router-dom";
import AuthorisedRoute from "./components/AuthorisedRoute";
import MyNavbar from "./components/MyNavbar";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import SettingsPage from "./pages/SettingsPage";
import { FriendData } from "./types";

export default function AppRoutes({ dataLoaded, friendData }: { dataLoaded: boolean; friendData: FriendData[] }) {
	return (
		<>
			<MyNavbar />

			<Routes>
				{/* These pages can only be viewed if you are logged in otherwise user will be redirected to login page */}
				<Route path="/" element={<AuthorisedRoute redirect="/login" />}>
					{/* Shows skeleton for pages until data is loaded */}
					<Route path="" element={<DashboardPage asSkeleton={!dataLoaded} friendData={friendData} />} />
					<Route path="settings" element={<SettingsPage asSkeleton={!dataLoaded} />} />
				</Route>
				{/* These pages can be viewed if your are logged in or not */}
				<Route path="/login" element={<LoginPage />} />
				<Route path="*" element={<NoPage />} />
			</Routes>
		</>
	);
}
