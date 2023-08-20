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
    
    return res.data
};
