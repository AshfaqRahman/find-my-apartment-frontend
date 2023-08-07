import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';


export const findRooms = async (data: any) => {
	const res = await axios.get(
        apiUrls.rooms.list,
        {
            params: data
        }
    )
    return res.data
};
