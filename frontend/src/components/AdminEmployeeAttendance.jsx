import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import NavBar from './NavBar';

const AdminEmployeeAttendance = () => {
    const [employee, setEmployee] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    // mengambil data employee pada halaman pertama dibuka
    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
            navigate("/");
        }

        if(localStorage.getItem("accessToken")) {
            getEmployeeAttendance();
        }
    },[])

    const getEmployeeAttendance = async() => {
        const response = await axiosInstance.get(`http://localhost:5000/absensi/view/${id}`);
        const data = response.data.map(item => {
        // Convert the datetime string to a Date object
            const date = new Date(item.attendance_date);
            // Convert the date object to a local format string
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        
            // Update the item with the local date format
            return {
                ...item,
                attendance_date: localDate
            };
        });

        setEmployee(data);
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
                                    Attendance Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.map((emp, index) =>(
                                <tr key={emp.id} className="bg-white border border-black hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                        {index+1}
                                    </th>
                                    <td className="px-6 py-4">
                                    <input 
                                        type="datetime-local" 
                                        value={emp.attendance_date} 
                                        id="disabled-input-2" 
                                        aria-label="disabled input 2" 
                                        className="bg-gray-100 border border-gray-300text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" 
                                        disabled readOnly />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link 
                                            to={emp.attendance_image}
                                            target="_blank" 
                                            type="button" 
                                            className="focus:outline-none text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">WFH Img</Link>
                                    </td>
                                </tr>
                            ) )}
                        </tbody>
                    </table>
                </div>
                <div>
                    <Link to={`/admin/absensi`} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 my-3">Exit</Link>
                </div>
            </div>
            </div>
        </>
    )
}

export default AdminEmployeeAttendance