import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';


export const findRoommates = async (data: any) => {
	const res = await axios.get(
        apiUrls.roommates.list,
        {
            params: data
        }
    )
    return res.data
};
