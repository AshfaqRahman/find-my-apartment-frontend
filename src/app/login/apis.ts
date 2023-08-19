import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';


export const LoginApi = async (data: any) => {
    try {
        const res = await axios.post(
            apiUrls.auth.login, data,
        )
        return {
            success: res.status === 200,
            data: res.data
        }
        
    } catch (error: any) {
        return {
            success: false,
            message: error.response.data.error
        }
    }
};
