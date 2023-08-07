import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';


export const RegisterApi = async (data: any) => {
	const res = await axios.post(
        apiUrls.auth.register, data
    )
    console.log(res)
    return {
        success: res.status === 201,
        data: res.data
    }
};
