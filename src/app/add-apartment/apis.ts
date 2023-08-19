import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';
import { getCookie } from 'cookies-next';


export const addApartment = async (data: any) => {
    try {
        console.log("add apartment:: ", data)
        const res = await axios.post(
            apiUrls.apartments.add,
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
