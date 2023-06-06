import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import bcrypt from "bcrypt";

const {DataTypes} = Sequelize;

const Employee = db.define('employees', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    posisi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_admin: {
        type: DataTypes.TINYINT,
        defaultValue: false,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName:true
    
});

Employee.beforeCreate(async (employee) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(employee.password, salt);

    employee.password = hashedPassword;
});

const Attendance = db.define('attendances', {
    attendance_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    attendance_image: {
        type: DataTypes.TEXT,
        allowNull: false
    }

})

// Define the association between Employee List and Employee Attendance
Employee.hasMany(Attendance, {
    onDelete: 'CASCADE'
});
Attendance.belongsTo(Employee);

export { Employee, Attendance };

(async()=>{
    await db.sync();
})();