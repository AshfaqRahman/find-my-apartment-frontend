import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';


export const RegisterApi = async (data: any) => {
	const res = await axios.post(
        apiUrls.auth.register,
        {
            params: data
        }
    )
    return res.data
};
