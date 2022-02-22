export default {
	signIn: (): string => `/auth/login`,
	refreshToken: (): string => `/auth/refresh-token`,
	getSettings: (): string => `/settings`,
	getVersionNumber: (): string => `/meta.json?${new Date().getTime()}`,
};
