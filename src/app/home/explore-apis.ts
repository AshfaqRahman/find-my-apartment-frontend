import { apiUrls } from "@/lib/apiUrls";
import axios from "axios";
import { getCookie } from "cookies-next";

export const ExploreApartments = async () => {
  try {
      const res = await axios.get(apiUrls.explore.list, {
      headers: {
        Authorization: `${getCookie("token")}`,
      },
    });
    return {
      success: res.status === 200,
      data: res.data,
    };
  } catch (error: any) {
    console.log("Explore::error", error);
    return {
      success: false,
      message: error.response.data.error,
    };
  }
}