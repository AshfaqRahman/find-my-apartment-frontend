import HOST from "@/static/host";

export const apiUrls = {
	apartments: {
		list: `${HOST}/api/apartments`,
		add: `${HOST}/api/apartments/add`,
		self: `${HOST}/api/apartments/my/apartments`,
	},
	apartment: {
		get: `${HOST}/api/apartments`,
		update: `${HOST}/api/apartments`,
		delete: `${HOST}/api/apartments`,
	},
	apartment_status: {
		toggle: `${HOST}/api/apartments/status-toggle`,
	},
	wishlist: {
		list: `${HOST}/api/wishlist`,
		add: `${HOST}/api/wishlist/add`,
		remove: `${HOST}/api/wishlist`,
	},
	recommendation: {
		list: `${HOST}/api/recommendation`,
	},

	fixed_values: {
		facilities: `${HOST}/api/fixed-values/facilities`,
		keywords: `${HOST}/api/fixed-values/starpoints`,
	},

	user: {
		preference: `${HOST}/api/user/my-preference`,
		info: `${HOST}/api/user/profile`
	},
	auth: {
		register: `${HOST}/api/auth/register`,
		login: `${HOST}/api/auth/login`,
		logout: `${HOST}/api/auth/logout`,
		checkAuth: `${HOST}/api/auth/is-token-valid`,
		
	},
	rooms: {
		list: `${HOST}/api/posts`,
		post: `${HOST}/api/post`
	},
	explore: {
		list: `${HOST}/api/explore`,
	},
	"chat": {
		"list": `${HOST}/api/message/chatlist`,
		"messages": `${HOST}/api/message/`,
	},
	zonecard: {
		"list": `${HOST}/api/zonecard`
	}
};
