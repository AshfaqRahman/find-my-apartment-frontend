import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';


export const getApartment = async (data: any) => {
	
    try {
        console.log("getApartment :: ", data)
        const res = await axios.get(
            `${apiUrls.apartment.get}/${data.apartment_id}`,
            {
                headers: {
                    Authorization: `${data.token}`,
                },
            }
        )
    

        return { data: res.data, success: res.status === 200 }

    } catch (error: any) {
        console.log("getApartment :: error", error);
        if (error.response.status === 403) {
            return {
                success: false,
                message: error.response.data.message,
            }
        }
        // return error.response.data
    }
};
