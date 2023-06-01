import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployee from "./components/AddEmployee";
import AdminEmployeeAttendance from "./components/AdminEmployeeAttendance";
import AttendanceEmployee from "./components/AttendanceEmployee";
import EditEmployee from "./components/EditEmployee";
import EmployeeList from "./components/EmployeeList";
import EmployeeListAbsen from "./components/EmployeeListAbsen";
import LoginPage from "./components/LoginPage";
import { setAuthToken } from "./utils/setAuthToken";

function App() {
  useEffect(() => {
    // console.log("LOCAL STORAGE: " + localStorage.getItem('accessToken'));
    if (localStorage.getItem('accessToken')) {
      setAuthToken(localStorage.getItem('accessToken'));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* ABSENSI KARYAWAN */}
        <Route path="/" element={<LoginPage/>} />
        <Route path="employee/absen" element={<AttendanceEmployee />} />

        {/* DASHBOARD ADMIN */}
        <Route path="admin/home" element={<EmployeeList/>} />
        <Route path="admin/add" element={<AddEmployee/>} />
        <Route path="admin/edit/:id" element={<EditEmployee/>} />
        <Route path="admin/absensi" element={<EmployeeListAbsen/>} />
        <Route path="admin/absensi/view/:id" element={<AdminEmployeeAttendance/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;