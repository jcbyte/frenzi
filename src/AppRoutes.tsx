import { Route, Routes } from "react-router-dom";
import AuthorisedRoute from "./components/AuthorisedRoute";
import Loading from "./components/Loading";
import MyNavbar from "./components/MyNavbar";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import SettingsPage from "./pages/SettingsPage";
import { FriendData } from "./types";

export default function AppRoutes({
	dataLoaded,
	friendData,
	setFriendData,
}: {
	dataLoaded: boolean;
	friendData: FriendData[];
	setFriendData: React.Dispatch<React.SetStateAction<FriendData[]>>;
}) {
	return (
		<>
			<MyNavbar />

			<Routes>
				{/* These pages can only be viewed if you are logged in otherwise user will be redirected to login page */}
				<Route path="/" element={<AuthorisedRoute redirect="/login" />}>
					{/* Waits until the data is loaded before showing the page */}
					{/* // ? this could/should show skeleton instead of loading circle */}
					<Route
						path=""
						element={
							<Loading
								loaded={dataLoaded}
								once={<DashboardPage friendData={friendData} setFriendData={setFriendData} />}
							/>
						}
					/>
					{/* Waits until the data is loaded before showing the page */}
					{/* // ? this could/should show skeleton instead of loading circle */}
					<Route path="settings" element={<Loading loaded={dataLoaded} once={<SettingsPage />} />} />
				</Route>
				{/* These pages can be viewed if your are logged in or not */}
				<Route path="/login" element={<LoginPage />} />
				<Route path="*" element={<NoPage />} />
			</Routes>
		</>
	);
}
