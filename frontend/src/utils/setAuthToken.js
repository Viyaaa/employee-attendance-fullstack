import { axiosInstance } from './axiosInstance';

export const setAuthToken = (token) => {
    if (token) {
        // console.log("----Token: " + token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // console.log("------Token Else: " + token);
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};