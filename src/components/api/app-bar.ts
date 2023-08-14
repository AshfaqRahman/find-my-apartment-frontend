

import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';
import { getCookie } from 'cookies-next';


export const logout = async () => {
    try {

        const res = await axios.post(
            apiUrls.auth.logout, {},
            {
                headers: {
                    Authorization: `${getCookie('token')}`,
                }
            }
        )
        return {
            success: res.status === 200,
            data: res.data
        }

    } catch (error: any) {
        console.log("logout::error", error)
        return {
            success: false,
            message: error.response.data.error
        }
    }
};
