import "./App.css";
import DashboardLayout from "./components/DashboardLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboardPage";
import ParkingListPage from "./pages/parkingListPage";
import { useEffect } from "react";
import { useParkingsContext } from "hooks/useParking";
import { getLocalStorgeData } from "utils/localStorageUtils";
import { initData } from "utils/initialData";

function App() {
  const { replaceParkings } = useParkingsContext();
  useEffect(() => {
    if (!getLocalStorgeData("parkings")) {
      replaceParkings(initData);
    }
  });

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/parking-list" element={<ParkingListPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
