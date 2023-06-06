import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../utils/setAuthToken';

const LoginPage = () => {
    const [email, setLoginEmail] = useState("");
    const [password, setLoginPass] = useState("");
    const navigate = useNavigate();

    // send data to backend to auth
    const submitLogin = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });

            // set access token
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("empId", response.data.empId);
            localStorage.setItem("empName", response.data.empName);
            setAuthToken(response.data.accessToken);

            // link to admin if user is administrator
            if(response.data.is_admin === 1){
                navigate("/admin/home");
            } else if(response.data.is_admin === 0) {
                localStorage.setItem("empAttend", response.data.lastAttend);
                navigate("/employee/absen");
            }
        } catch (error) {
            if(error.response.status === 401) {
                alert("Invalid Credentials");
            };
        }
    }

    return (
        <div className="m-28">
            <h1 className='text-2xl font-bold text-center'>Login Page</h1>
            <div className="m-5 flex justify-center">
            <form onSubmit={submitLogin}>
            <div className="mb-6">
                    <label for="empEmail" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                    <input 
                        type="email" 
                        id="empEmail" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5" placeholder="johndoe@gmail.com" 
                        value={email}
                        onChange={(e) => setLoginEmail(e.target.value)} 
                        required/>
                </div>
                <div className="mb-6">
                    <label for="empName" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <input 
                        type="password" 
                        id="empPassword" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5"
                        value={password}
                        onChange={(e) => {setLoginPass(e.target.value)}} 
                        required/>
                </div>
                
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default LoginPage