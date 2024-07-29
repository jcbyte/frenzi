import { Navigate, Outlet } from "react-router-dom";

// Component which only shows a child route only if the user is logged in else will be redirected
export default function AuthorisedRoute({ isAuthed, redirect }: { isAuthed: boolean; redirect: string }) {
	return isAuthed ? <Outlet /> : <Navigate to={redirect} />;
}
