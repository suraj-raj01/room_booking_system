import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";
import ProtectedRoute from "./utils/ProtectedRoute";
import AllRooms from "./pages/AllRooms";
import AvailableRooms from "./pages/AvailableRooms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<AllRooms />} />
          <Route path="all-rooms" element={<AllRooms />} />
          <Route path="available-rooms" element={<AvailableRooms />} />
        </Route>

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;