import { apiUrls } from '@/lib/apiUrls';


export const searchApartments = async (data: any) => {
	const res = await fetch(apiUrls.expenses.add, { method: 'POST', body: JSON.stringify(data) });
	if (!res.ok) {
		const error = await res.json();
		throw error;
	}
	return await res.json();
};
