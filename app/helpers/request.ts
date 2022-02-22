import { ENVIRONMENT } from '@app/config';
import endpoints from '@app/services/endpoints';
import ROUTES from '@app/shared/routes';
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from '@app/helpers/localStorage';
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { IApiErrorSchema } from '@app/shared/types';
import { IAuthResponse } from '@app/pages/Auth/auth';

const request: AxiosInstance = axios.create({
	baseURL: ENVIRONMENT.API_BASE_URI,
	headers: {
		'Content-Type': 'application/json',
	},
});

const loginRoute: string = ROUTES.LOGIN;
const publicRoutes: string[] = [loginRoute];
const currentRoute = location.pathname;

const requestManager: (((req: AxiosRequestConfig) => AxiosRequestConfig) | ((error: unknown) => Promise<never>))[] = [
	(req: AxiosRequestConfig): AxiosRequestConfig => {
		const token = getLocalStorage<IAuthResponse>(ENVIRONMENT.PROJECT_ID)?.access_token;
		const headers: AxiosRequestHeaders = {
			...req.headers,
			'Access-Token': token,
		};
		req.headers = headers;

		return req;
	},
	(error: unknown): Promise<never> => {
		return Promise.reject(error);
	},
];

const responseManager: (((response: AxiosResponse) => Promise<AxiosResponse>) | ((error: any) => AxiosPromise<never>))[] = [
	(response: AxiosResponse): Promise<AxiosResponse> => Promise.resolve(response?.data),
	async (error: any) => {
		const response: AxiosResponse<IApiErrorSchema> = error.response;
		if (response.status === 401 && !publicRoutes.includes(currentRoute)) {
			if (response.data.code === 401) {
				removeFromLocalStorage(ENVIRONMENT.PROJECT_ID);
				window.location.href = loginRoute;
			} else {
				try {
					const { refresh_token, ...rest } = getLocalStorage<IAuthResponse>(ENVIRONMENT.PROJECT_ID);
					const { data } = await request.post<Partial<IAuthResponse>>(endpoints.refreshToken(), {
						refresh_token,
					});

					error.config.headers['Access-Token'] = data.access_token;
					setLocalStorage(ENVIRONMENT.PROJECT_ID, {
						...rest,
						access_token: data.access_token,
						refresh_token: data.refresh_token,
					});

					return await request(error.config);
				} catch (error) {
					removeFromLocalStorage(ENVIRONMENT.PROJECT_ID);
					window.location.href = loginRoute;
				}
			}
		}

		return Promise.reject(error);
	},
];

request.interceptors.request.use(...requestManager);
request.interceptors.response.use(...responseManager);

export { request };
