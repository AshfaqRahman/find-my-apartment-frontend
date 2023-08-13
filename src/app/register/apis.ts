import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';


export const RegisterApi = async (data: any) => {
    try {

        const res = await axios.post(
            apiUrls.auth.register, data
        )
        return {
            success: res.status === 201,
            data: res.data
        }

    } catch (error: any) {
        console.log("RegisterApi::error", error)
        return {
            success: false,
            message: error.response.data.error
        }
    }
};
