import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';
import { getCookie } from 'cookies-next';


export const getRecommendation = async () => {
	try {
        console.log("getRecommendation ::")
        const res = await axios.get(
            apiUrls.recommendation.list,
            {
                headers: {
                    Authorization: `${getCookie('token')}`,
                }
            }
        )

        return { data: res.data, success: res.status === 200 }

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