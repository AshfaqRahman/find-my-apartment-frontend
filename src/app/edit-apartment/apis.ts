import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';
import { getCookie } from 'cookies-next';


export const getUserData = async () => {


    try {
        console.log("getUserData:: ");

        const res = await axios.get(
            apiUrls.user.info,
            {
                headers: {
                    Authorization: `${getCookie('token')}`
                }
            }
        )

        return { data: res.data, success: res.status === 200 }

    } catch (error: any) {
        console.log("getUserData :: error", error);
        if (error.response.status === 500) {
            return {
                success: false,
                message: error.response.data.message,
            }
        }
        // return error.response.data
    }

};


export const getApartment = async (data: any) => {

    try {
        console.log("getApartment :: ", data)
        const res = await axios.get(
            `${apiUrls.apartment.get}/${data.apartment_id}`,
            {
                headers: {
                    Authorization: `${getCookie('token')}`,
                },
            }
        )
        // console.log(res);


        return { data: res.data, success: res.status === 200 }

    } catch (error: any) {
        console.log("getApartment :: error", error);
        if (error.response.status === 403) {
            return {
                success: false,
                message: error.response.data.message,
            }
        }
        // return error.response.data
    }
};



export const saveApartment = async (data: any) => {
    try {
        console.log("saveApartment :: ", data)
        const res = await axios.patch(
            apiUrls.apartment.update,
            data,
            {
                headers: {
                    Authorization: `${getCookie('token')}`,
                }
            }
        )
        return { data: res.data, success: res.status === 200 }

    } catch (error: any) {
        console.log("searchApartments :: error", error);
        if (error.response.status === 500) {
            return {
                success: false,
                message: error.response.data.message,
            }
        }
        // return error.response.data
    }
};

