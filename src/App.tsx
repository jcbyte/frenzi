import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/AuthorisedRoute";
import Loading from "./components/Loading";
import MyNavbar from "./components/MyNavbar";
import { auth } from "./firestore/firebase";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
	const [loadingFirebase, setLoadingFirebase] = useState(true);

	useEffect(() => {
		auth.authStateReady().then(() => {
			setLoadingFirebase(false);
		});
	}, []);

	return <>{loadingFirebase ? <Loading /> : <AppLayout />}</>;
}

function AppLayout() {
	return (
		<>
			<MyNavbar />

			<Routes>
				<Route path="/" element={<PrivateRoute />}>
					<Route path="" element={<DashboardPage />} />
				</Route>
				<Route path="/settings" element={<PrivateRoute />}>
					<Route path="" element={<SettingsPage />} />
				</Route>
				<Route path="/login" element={<PrivateRoute notAuthed to="/" />}>
					<Route path="" element={<LoginPage />} />
				</Route>
				<Route path="*" element={<NoPage />} />
			</Routes>

			<Toaster
				toastOptions={{
					className: "",
					style: {
						padding: "16px",
						backgroundColor: "#18181b",
						color: "#ecedee",
					},
				}}
			/>
		</>
	);
}
