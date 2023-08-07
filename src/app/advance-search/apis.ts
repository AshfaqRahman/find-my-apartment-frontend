import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';


export const searchApartments = async (data: any) => {
	const res = await axios.get(
        apiUrls.apartments.list,
        {
            params: data
        }
    )
    
    return res.data
};
