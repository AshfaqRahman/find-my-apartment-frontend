import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';


export const LoginApi = async (data: any) => {
	const res = await axios.post(
        apiUrls.auth.login, data
    )
    console.log(res)
    return {
        success: res.status === 200,
        data: res.data
    }
};
