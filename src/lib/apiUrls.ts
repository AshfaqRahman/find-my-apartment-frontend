import HOST from "@/static/host";

export const apiUrls = {
	apartments: {
		list: `${HOST}/api/apartments`,
        create: '/api/apartments',
        update: '/api/apartments/:id',
        delete: '/api/apartments/:id',
		add: `${HOST}/api/apartments/add`,
	},

	fixed_values: {
		facilities: `${HOST}/api/fixed-values/facilities`,
		keywords: `${HOST}/api/fixed-values/starpoints`,
	},

	user: {
		upgrade: '/api/user/upgrade',
		modify: '/api/user',
		usage: 'api/user/usage',
	},
	auth: {
		register: `${HOST}/api/auth/register`,
		login: `${HOST}/api/auth/login`,
		logout: `${HOST}/api/auth/logout`,
		checkAuth: `${HOST}/api/auth/is-token-valid`,
		
	},
	expenses: {
		add: '/api/expenses/add',
		modify: '/api/expenses',
		getExpenses: ({ from, to }: { from: string; to: string }) => `/api/expenses?from=${from}&to=${to}`,
	},
	investments: {
		add: '/api/investments/add',
		modify: '/api/investments',
		getInvestments: ({ from, to }: { from: string; to: string }) => `/api/investments?from=${from}&to=${to}`,
	},
	income: {
		add: '/api/income/add',
		modify: '/api/income',
		getIncome: ({ from, to }: { from: string; to: string }) => `/api/income?from=${from}&to=${to}`,
	},
	subscriptions: {
		add: '/api/subscriptions/add',
		modify: '/api/subscriptions',
		getSubscriptions: ({ from, to }: { from: string; to: string }) => `/api/subscriptions?from=${from}&to=${to}`,
	},
	feedback: {
		add: `/api/feedback`,
	},
	rooms: {
		list: `${HOST}/api/posts`,
	}
};
