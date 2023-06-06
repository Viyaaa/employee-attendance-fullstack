import { Employee, Attendance } from "../models/EmployeeModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getUsers = async(req, res) => {
    try {
        const response = await Employee.findAll({
            attributes: ['id', 'name', 'email', 'posisi']
        });
        res.status(200).json(response);
    } catch (e) {
        console.log(e.message);
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await Employee.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (e) {
        console.log(e.message);
    }
}

export const createUser = async(req, res) => {
    try {
        await Employee.create(req.body);
        res.status(201).json({msg: "Employee Successfully Created!"});
    } catch (e) {
        console.log(e.message);
    }
}

export const updateUser = async(req, res) => {
    try {
        await Employee.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Employee's Data Updated!"});
    } catch (e) {
        console.log(e.message);
    }
}

export const deleteUser = async(req, res) => {
    try {
        await Employee.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Employee's Data Deleted!"});
    } catch (e) {
        console.log(e.message);
    }
}

export const loginUser = async(req, res) => {
    try {
        const response = await Employee.findOne({
            where: {
                email: req.body.email
            }
        });

        if(response) {
            try {
                const match = await bcrypt.compare(req.body.password, response.dataValues.password);
                if(match){
                    // add session
                    const empId = response.id;
                    const empName = response.name;
                    const isAdmin = response.is_admin;
                    const accessToken = jwt.sign({empId, empName, isAdmin}, process.env.ACCESS_TOKEN_SECRET)

                    if(isAdmin === 0) {
                        const empAbsen = await Attendance.findOne({
                            where: {
                                employeeId: response.id
                            },
                            order: [ [ 'attendance_date', 'DESC' ]],
                        });
                
                        const lastAttend = new Date(empAbsen.attendance_date).toISOString().slice(0, 10);
                        res.status(200).json({lastAttend, empName, empId, accessToken, is_admin: response.is_admin});
                    }

                    res.status(200).json({empName, empId, accessToken, is_admin: response.is_admin});
                } else {
                    res.status(401).json({ message: "Invalid Credentials" });
                }
            } catch (error) {
                res.status(400);
            }
        } else {
            res.status(400);
        }

    } catch (error) {
        console.log(error);
    }
}

export const logoutUser = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;

    
    if(!refreshToken) return res.sendStatus(204);
    const employee = await Employee.findOne({
        where: {
            refresh_token: refreshToken
        }
    });
    if(!employee) return res.sendStatus(204);
    const userId = employee.id;

    await Employee.update({refresh_token: null}, {
        where: {
            id: userId
        }
    });

    // menghapus cookie
    res.clearCookie('refresh_token');
    return res.sendStatus(200);
}

export const addAttendance = async(req, res) => {
    try {
        const response = await Employee.findOne({
            where: {
                id: req.params.id
            }
        });

        if(response) {
            // console.log(req.body);
            await Attendance.create({
                attendance_date: req.body.attendance_date,
                attendance_image: req.body.url,
                employeeId: req.params.id
            });
            res.status(200).json(response);
        } else {
            res.status(401).json(response);
        }
    } catch (error) {
        console.log(error);
    }
}

export const viewAttendance = async(req, res) => {
    try {
        const response = await Attendance.findAll({
            where: {
                employeeId: req.params.id
            }
        });
        res.status(200).json(response);
    }catch (error) {
        console.log(error);
    }
}