import { apiUrls } from "@/lib/apiUrls"
import axios from "axios"
import { getCookie } from "cookies-next"

export const PostSubmitApi = async (data: any) => {
    try {
        console.log(data);
        const res = await axios.post(
            apiUrls.rooms.post, data,
            {
                headers: {
                    Authorization: `${getCookie('token')}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        
        return {
            success: res.status === 201,
            data: res.data
        }
    } catch (error: any) {
        console.log("PostSubmit::error", error);
        return {
            success: false,
            message: error.response.data.error
        }
    }
}