import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';

import { getCookie } from 'cookies-next';


export const fetchFacilities = async () => {
	const res = await axios.get(
        apiUrls.fixed_values.facilities,
        {
            headers: {
                Authorization: `${getCookie('token')}`,
            }
        }
    )
    
    return res.data
};

export const fetchKeywords = async () => {
	const res = await axios.get(
        apiUrls.fixed_values.keywords,
        {
            headers: {
                Authorization: `${getCookie('token')}`,
            }
        }
    )
    
    return res.data
};

export const find = async (data) => {
    
}