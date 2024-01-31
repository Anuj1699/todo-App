import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TodoPage from "./pages/TodoPage";
import PrivateRoute from "./component/PrivateRoute";
function App() {
  const isLoggedIn = localStorage.getItem("user");
  return (
    <>
      <div className="bg-amber-400 min-h-screen">
        <Routes>
          <Route path="/login" element={isLoggedIn ? <TodoPage /> : <SignIn />} />
          <Route path="/register" element={isLoggedIn ? <TodoPage /> : <SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<TodoPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
