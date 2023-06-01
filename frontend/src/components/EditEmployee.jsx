import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';


const EditEmployee = () => {
    const [name, setEmpName] = useState("");
    const [email, setEmpEmail] = useState("");
    const [posisi, setEmpPosisi] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    const updateEmployee = async(e) => {
        e.preventDefault();
        try {
            await axiosInstance.patch(`http://localhost:5000/employees/${id}`, {
                name,
                email,
                posisi
            });
            navigate("/admin/home");
        } catch (error) {
            console.log(error);
        }
    }

    const getUserById = async() => {
        const response = await axiosInstance.get(`http://localhost:5000/employees/${id}`);
        setEmpName(response.data.name);
        setEmpEmail(response.data.email);
        setEmpPosisi(response.data.posisi);
    }

    return (
        <div className="m-28">
            <h1 className='text-2xl font-bold text-center'>Edit Employee</h1>
            <div className="m-5 flex justify-center">
            <form onSubmit={updateEmployee}>
                <div className="mb-6">
                    <label for="empName" className="block mb-2 text-sm font-medium text-gray-900 ">Employee Name</label>
                    <input 
                        type="text" 
                        id="empName" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5" 
                        placeholder="John Doe" 
                        value={name} 
                        onChange={(e) => setEmpName(e.target.value)}
                        required/>
                </div>
                <div className="mb-6">
                    <label for="empEmail" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                    <input 
                        type="email" 
                        id="empEmail" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5" placeholder="johndoe@gmail.com" 
                        value={email}
                        onChange={(e) => setEmpEmail(e.target.value)} 
                        required/>
                </div>
                <div className="mb-6">
                    <label for="empPosition" className="block mb-2 text-sm font-medium text-gray-900 ">Position</label>
                    <input 
                        type="text" 
                        id="empPosition" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5" 
                        placeholder="Back-End Developer" 
                        value={posisi}
                        onChange={(e) => setEmpPosisi(e.target.value)} 
                        required/>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3">Submit</button>
                <Link to={`/admin/home`} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel</Link>
            </form>
            </div>
        </div>
    )
}

export default EditEmployee