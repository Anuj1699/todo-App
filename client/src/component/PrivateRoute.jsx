import { Outlet,Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const currentUser = localStorage.getItem("user"); 
  return (currentUser ? <Outlet/> : <Navigate to={'/login'}/>)
}