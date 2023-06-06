import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import storage from '../utils/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const AttendanceEmployee = () => {
    const [attendance_date, setDatetime] = useState("");
    const [percent, setPercent] = useState(0);
    const [image, setImageFile] = useState("");
    const [imageSent, setImageSent] = useState("");
    const [empAttend, setEmpAttend] = useState("");
    const [empId, setEmpId] = useState("");
    const [empName, setEmpName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
            navigate("/");
        }

        const currentDate = new Date();
        const formattedDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        setDatetime(formattedDate);
        setEmpId(localStorage.getItem("empId"));
        setEmpName(localStorage.getItem("empName"));
        setEmpAttend(localStorage.getItem("empAttend"));
    }, []);
    
    const logoutUser = async() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("empId");
        localStorage.removeItem("empName");
        localStorage.removeItem("empAttend");
        navigate("/");
    }

    const submitAttendance = async(e) => {
        e.preventDefault();
        try {
            await imgFileUpload();
            // await axios.post(`http://localhost:5000/absen/${empId}`, {
            //     attendance_date,
            //     imageURL
            // });
        } catch (error) {
            console.log(error);
        }
    }

    const imgFileUpload = async(e) => {
        if (!image) {
            alert("Please choose a image first!")
        }

        const storageRef = ref(storage, `/files/${empName}-${attendance_date}`);
        const uploadTask = uploadBytesResumable(storageRef, imageSent);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    axios.post(`http://localhost:5000/absen/${empId}`, {
                        attendance_date,
                        url
                    });
                })
            },
        )
    }
    const imgFileHandler = (e) => {
        if(e.target.files.length !== 0) {
            setImageSent(e.target.files[0]);
            setImageFile(URL.createObjectURL(e.target.files[0]));
        }
    }

    
    return (
        <div className="m-28">
            <h1 className='text-2xl font-bold text-center'>{empName}'s Attendance</h1>
            <h1 className='text-l font-normal text-center'>Last Attend: {empAttend}</h1>
            <div className="m-5 flex justify-center">
            <form onSubmit={submitAttendance}>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium">Attendance Date</label>
                    <input 
                        type="datetime-local" 
                        value={attendance_date} 
                        id="disabled-input-2" 
                        aria-label="disabled input 2" 
                        className="bg-gray-100 border border-gray-300text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" 
                        disabled readOnly />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium" for="image">Upload Photo</label>
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={imgFileHandler}
                        name="image"
                        className="block w-full border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none" 
                        aria-describedby="image_help" 
                        id="image" />
                    <img 
                        src={image}
                        className="object-cover h-48 w-96"
                        alt="img-preview"/>
                    {percent === 0 ? "" : <h5 className='text-md font-medium'>Uploading File: {percent}</h5>}
                </div>
                
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3">Submit</button>
                <button onClick={logoutUser} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mr-3">Log Out</button>
            </form>
            </div>
        </div>
    )
}

export default AttendanceEmployee