import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../firestore/firebase";

// Component which only shows a child route only if the user is logged in else will be redirected
export default function AuthorisedRoute({ redirect }: { redirect: string }) {
	return isAuth() ? <Outlet /> : <Navigate to={redirect} />;
}
