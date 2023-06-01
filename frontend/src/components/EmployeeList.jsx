import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { axiosInstance } from "../utils/axiosInstance";

const EmployeeList = () => {
    const [employees, setEmployee] = useState([]);
    const navigate = useNavigate();

    // mengambil data employee pada halaman pertama dibuka
    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
            navigate("/");
        }

        if(localStorage.getItem("accessToken")) {
            getEmployees();
        }
    },[]);

    const getEmployees = async() => {
        const response = await axiosInstance.get('http://localhost:5000/employees');
        setEmployee(response.data);
    }

    const deleteEmployee = async(id) => {
        try {
            await axiosInstance.delete(`http://localhost:5000/employees/${id}`);
            getEmployees();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <NavBar />
        <div className="mt-28 flex justify-center">
            <div className="grid">
            <div>
                <Link 
                    to={`/admin/add`}
                    type="button" 
                    className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                        Add New
                </Link>
            </div>
            <div>
                <table className="table-auto text-sm text-left">
                    <thead className="border border-black text-xs uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Positition
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) =>(
                            <tr key={employee.id} className="bg-white border border-black hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                    {index+1}
                                </th>
                                <td className="px-6 py-4">
                                    {employee.name}
                                </td>
                                <td className="px-6 py-4">
                                    {employee.email}
                                </td>
                                <td className="px-6 py-4">
                                    {employee.posisi}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link 
                                        to={`/admin/edit/${employee.id}`} 
                                        type="button" 
                                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Edit</Link>
                                    <button 
                                        type="button" 
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                        onClick={() => deleteEmployee(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        ) )}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        </>
    )
}

export default EmployeeList