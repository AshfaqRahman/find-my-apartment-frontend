import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';
import { getCookie } from 'cookies-next';


export const setPreference = async (data: any) => {
    try {
        console.log("setPreference:: ", data)
        const res = await axios.post(
            apiUrls.user.preferece,
            data,
            {
                headers: {
                    Authorization: `${getCookie('token')}`,
                }
            }
        )
        return { data: res.data, success: res.status === 200 }

    } catch (error: any) {
        console.log("setPreference :: error", error);
        if (error.response.status === 500) {
            return {
                success: false,
                message: error.response.data.message,
            }
        }
        // return error.response.data
    }
};
