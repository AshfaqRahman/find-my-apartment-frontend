import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';

import { getCookie } from 'cookies-next';


export const fetchFacilities = async () => {
    try {
        const res = await axios.get(
            apiUrls.fixed_values.facilities,
            {
                headers: {
                    Authorization: `${getCookie('token')}`,
                }
            }
        )

        console.log("fetchFacilities", res);

        return {
            data: res.data,
            success: res.status === 200,
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.response.data.message,
        }
    }

};

export const fetchKeywords = async () => {
    try {
        const res = await axios.get(
            apiUrls.fixed_values.keywords,
            {
                headers: {
                    Authorization: `${getCookie('token')}`,
                }
            }
        )
        return {
            data: res.data,
            success: res.status === 200,
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.response.data.message,
        }
    }

};

export const find = async (data) => {

}