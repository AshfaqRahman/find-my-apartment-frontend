import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';
import { getCookie } from 'cookies-next';


export const getMyApartments = async () => {
	try {
        console.log("getMyApartments ::")
        const res = await axios.get(
            apiUrls.apartments.self,
            {
                headers: {
                    Authorization: `${getCookie('token')}`,
                }
            }
        )

        return { data: res.data, success: res.status === 200 }

    } catch (error: any) {
        console.log("getMyApartments :: error", error);
        if (error.response.status === 403) {
            return {
                success: false,
                message: error.response.data.message,
            }
        }
        // return error.response.data
    }
};

export const deleteOneApartment = async () => {
	try {
        console.log("deleteOneApartment ::")
        const res = await axios.delete(
            apiUrls.apartments.self,
            {
                headers: {
                    Authorization: `${getCookie('token')}`,
                }
            }
        )

        return { data: res.data, success: res.status === 200 }

    } catch (error: any) {
        console.log("getMyApartments :: error", error);
        if (error.response.status === 403) {
            return {
                success: false,
                message: error.response.data.message,
            }
        }
        // return error.response.data
    }
};


