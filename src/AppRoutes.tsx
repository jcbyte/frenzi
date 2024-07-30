import { Route, Routes } from "react-router-dom";
import AnimatedPage from "./components/AnimatedPage";
import AuthorisedRoute from "./components/AuthorisedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import PersonPage from "./pages/PersonPage";
import SettingsPage from "./pages/SettingsPage";
import SharedPage from "./pages/SharedPage";
import { PersonData } from "./types";

export default function AppRoutes({
	dataLoaded,
	isAuthed,
	peopleData,
	setPeopleData,
}: {
	dataLoaded: boolean;
	isAuthed: boolean;
	peopleData: PersonData[];
	setPeopleData: React.Dispatch<React.SetStateAction<PersonData[]>>;
}) {
	return (
		<>
			{/* Will show skeleton for pages until data is loaded */}
			<div className="flex justify-center w-full">
				<div className="p-4 flex flex-col gap-2">
					<Routes>
						{/* These pages can only be viewed if you are logged in otherwise user will be redirected to login page */}
						<Route path="/" element={<AuthorisedRoute isAuthed={isAuthed} redirect="/login" />}>
							<Route
								path=""
								element={
									<AnimatedPage>
										<DashboardPage asSkeleton={!dataLoaded} peopleData={peopleData} setPeopleData={setPeopleData} />
									</AnimatedPage>
								}
							/>
							<Route
								path="person/:personIndex"
								element={
									<AnimatedPage>
										<PersonPage asSkeleton={!dataLoaded} peopleData={peopleData} setPeopleData={setPeopleData} />
									</AnimatedPage>
								}
							/>
							<Route
								path="settings"
								element={
									<AnimatedPage>
										<SettingsPage asSkeleton={!dataLoaded} />
									</AnimatedPage>
								}
							/>
						</Route>

						{/* These pages can be viewed if your are logged in or not */}
						<Route
							path="/login"
							element={
								<AnimatedPage>
									<LoginPage isAuthed={isAuthed} />
								</AnimatedPage>
							}
						/>
						<Route
							path="/shared/:author/:personIndex"
							element={
								<AnimatedPage>
									<SharedPage />
								</AnimatedPage>
							}
						/>
						<Route
							path="*"
							element={
								<AnimatedPage>
									<NoPage />
								</AnimatedPage>
							}
						/>
					</Routes>
				</div>
			</div>
		</>
	);
}
