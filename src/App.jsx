import Movies from "./components/Movies/Movies";
import Navbar from "./components/Navigation/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import RequireNotAuth from "./components/Navigation/RequireNotAuth";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import RequireAuth from "./components/Navigation/RequireAuth";
import Logout from "./components/Auth/Logout";
import Reservations from "./components/Reservations/Reservations";
import RequireAdminAuth from "./components/Navigation/RequireAdminAuth";
import CreateMovie from "./components/CreateMovie/CreateMovie";
import CreateScreening from "./components/CreateScreening/CreateScreening";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route
          path="/login"
          element={
            <RequireNotAuth>
              <Login />
            </RequireNotAuth>
          }
        />
        <Route
          path="/register"
          element={
            <RequireNotAuth>
              <Register />
            </RequireNotAuth>
          }
        />
        <Route
          path="/logout"
          element={
            <RequireAuth>
              <Logout />
            </RequireAuth>
          }
        />
        <Route
          path="/reservations"
          element={
            <RequireAuth>
              <Reservations />
            </RequireAuth>
          }
        />
        <Route
          path="/create_movie"
          element={
            <RequireAdminAuth>
              <CreateMovie />
            </RequireAdminAuth>
          }
        />
        <Route
          path="/create_screening"
          element={
            <RequireAdminAuth>
              <CreateScreening />
            </RequireAdminAuth>
          }
        />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
