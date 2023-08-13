import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';

import { getCookie } from 'cookies-next';

export async function searchApartments(data: any) {

    try {

        const res = await axios.get(
            apiUrls.apartments.list,
            {
                params: data,
                headers: {
                    Authorization: `${getCookie('token')}`,
                }
            }
        )

        return { data: res.data, success: res.status === 200 }

    } catch (error: any) {
        console.log("searchApartments :: error", error);
        if (error.response.status === 403) {
            return {
                success: false,
                message: error.response.data.message,
            }
        }
        // return error.response.data
    }
}

export const find = async (data) => {

}