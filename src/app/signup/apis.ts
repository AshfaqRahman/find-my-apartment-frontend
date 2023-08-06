import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';


export const SignUpApi = async (data: any) => {
	const res = await axios.post(
        apiUrls.auth.signup,
        {
            params: data
        }
    )
    return res.data
};
