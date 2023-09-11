import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import HOST from "@/static/host";


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
        console.log(res);
    

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

// call api/user/:user_id to fetch user
export const getUser = async (user_id: string) => {
    const token = getCookie('token');
    const response = await axios.get(
        `${HOST}/api/user/${user_id}`,
        {
            headers: {
                Authorization: `${token}`,
            },
        });
    //console.log("getUser", response);
    if (response.status !== 200) {
        return {
            success: false,
            message: "Something went wrong",
            data: [],
        }
    }
    return {
        success: true,
        message: "User fetched successfully",
        data: response.data.data,
    }
}
