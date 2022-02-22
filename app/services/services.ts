import endpoints from '@app/services/endpoints';
import { IRequestModel } from '@app/services/types';
import { request } from '@app/helpers/request';
import axios from 'axios';

export const signInService: IRequestModel = data => request.post(endpoints.signIn(), data);
export const getVersionNumber: IRequestModel = () => axios.get(endpoints.getVersionNumber());
export const getSettings: IRequestModel = () => request.get(endpoints.getSettings());
