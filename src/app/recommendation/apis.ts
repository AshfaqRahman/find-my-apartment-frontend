import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';
import { getCookie } from 'cookies-next';


export const getRecommendation = async (data) => {
	try {
        console.log("getRecommendation ::")
        const res = await axios.get(
            apiUrls.recommendation.list,
            {
                params: data,
                headers: {
                    Authorization: `${getCookie('token')}`,
                }
            }
        )

        return { data: res.data.data, success: res.status === 200 }

    } catch (error: any) {
        console.log("getRecommendation :: error", error);
        if (error.response.status === 403) {
            return {
                success: false,
                message: error.response.data.message,
            }
        }
        // return error.response.data
    }
};