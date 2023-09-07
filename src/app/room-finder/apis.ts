import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';

import { getCookie } from 'cookies-next';

export const findRooms = async (data: any) => {
	try {
        console.log("findRooms :: ", data)
        const res = await axios.get(
            apiUrls.rooms.post,
            {
                params: data,
                headers: {
                    Authorization: `${getCookie('token')}`,
                }
            }
        )

        return { data: res.data, success: res.status === 200 }

    } catch (error: any) {
        console.log("findRooms :: error", error);
        if (error.response.status === 403) {
            return {
                success: false,
                message: error.response.data.message,
            }
        }
    }
};
