import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';

import { getCookie } from 'cookies-next';


export const searchApartments = async (data: any) => {
	const res = await axios.get(
        apiUrls.apartments.list,
        {
            params: data,
            headers: {
                Authorization: `${getCookie('token')}`,
            }
        }
    )
    
    return res.data
};

export const find = async (data) => {
    
}