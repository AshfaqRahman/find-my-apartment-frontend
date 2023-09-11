import { apiUrls } from "@/lib/apiUrls";
import axios from "axios";
import { getCookie } from "cookies-next";



export const toggleApartmentStatus = async (data: any) => {
    try {
        console.log("toggleApartmentStatus");
        const res = await axios.post(
            apiUrls.apartment_status.toggle,
            data,
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
export const deleteMyApartment = async (data: any) => {
    try {
        console.log("deleteMyApartment");
        const res = await axios.delete(
            apiUrls.apartment.delete,
            {
                params: {
                    apartment_id: data.apartment_id,
                },
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
