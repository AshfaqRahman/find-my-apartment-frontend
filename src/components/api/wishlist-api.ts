import { apiUrls } from "@/lib/apiUrls";
import axios from "axios";
import { getCookie } from "cookies-next";


export const getWishlist = async () => {
    try {
        console.log("getWishlist");
        const res = await axios.get(
            apiUrls.wishlist.list,
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


export const addToWishlist = async (data: any) => {
    try {
        console.log("addToWishlist");
        const res = await axios.post(
            apiUrls.wishlist.add,
            data,
            {
                headers: {
                    Authorization: `${getCookie('token')}`,
                }
            }
        )

        return {
            data: res.data,
            success: res.status === 201,
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.response.data.message,
        }
    }

};

export const removeFromWishlist = async (params: any) => {
    try {
        console.log("removeFromWishlist");
        const res = await axios.delete(
            `${apiUrls.wishlist.remove}/${params.apartment_id}`,
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
