import { AxiosResponse } from 'axios';

export interface IRequestModel {
	<R, D = void>(data?: D): Promise<AxiosResponse<R>>;
}
