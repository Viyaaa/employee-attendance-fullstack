import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from './NavBar';
import { axiosInstance } from '../utils/axiosInstance';

const EmployeeListAbsen = () => {
    const [employees, setEmployee] = useState([]);

    // mengambil data employee pada halaman pertama dibuka
    useEffect(() => {
        getEmployees();
    },[])

    const getEmployees = async() => {
        const response = await axiosInstance.get('http://localhost:5000/employees');
        setEmployee(response.data);
    }

    return (
        <>
            <NavBar />
            <div className="mt-28 flex justify-center">
            <div className="grid">
            <div>
                <h1 className='text-2xl font-bold my-5'>Daftar Absensi Karyawan</h1>
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
                                        to={`view/${employee.id}`} 
                                        type="button" 
                                        className="focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">View</Link>
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

export default EmployeeListAbsen