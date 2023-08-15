import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';
import { getCookie } from 'cookies-next';


export const checkAuth = async () => {
    try {

        const res = await axios.post(
            apiUrls.auth.checkAuth, {},
            {
                headers: {
                    Authorization: `${getCookie('token')}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        return {
            success: res.status === 200,
            data: res.data
        }

    } catch (error: any) {
        console.log("checkAuth::error", error)
        return {
            success: false,
            message: error.response.data.error
        }
    }
};
