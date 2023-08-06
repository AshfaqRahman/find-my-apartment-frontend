import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';


export const LoginApi = async (data: any) => {
	const res = await axios.post(
        apiUrls.auth.login,
        {
            params: data
        }
    )
    return res.data
};
