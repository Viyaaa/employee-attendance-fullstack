import { Employee }  from "../models/EmployeeModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken) return res.sendStatus(401);
        const employee = await Employee.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!employee) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const empId = employee.id;
            const empName = employee.name;
            const accessToken = jwt.sign({empId, empName}, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '20s',
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}