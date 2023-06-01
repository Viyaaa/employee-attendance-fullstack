import express from "express";
const router = express.Router();
import { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser, addAttendance, viewAttendance, logoutUser } from "../controller/EmployeeController.js";
import { verifyAdmin } from "../middleware/VerifyToken.js";

router.get('/employees', verifyAdmin, getUsers);
router.get('/employees/:id' ,getUserById);
router.post('/employees' ,createUser);
router.patch('/employees/:id', updateUser);
router.delete('/employees/:id', deleteUser);
router.post('/login', loginUser);
router.delete('/logout', logoutUser);
router.post('/absen/:id', addAttendance);
router.get('/absensi/view/:id', viewAttendance);

export default router;