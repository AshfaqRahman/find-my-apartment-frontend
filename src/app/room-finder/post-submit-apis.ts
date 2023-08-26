import { apiUrls } from "@/lib/apiUrls"
import axios from "axios"

export const PostSubmitApi = async (data: any) => {
    try {
        const res = await axios.post(
            apiUrls.rooms.list, data
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