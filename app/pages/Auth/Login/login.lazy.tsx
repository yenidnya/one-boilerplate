import { ComponentPropsWithRef, ExoticComponent, lazy, NamedExoticComponent } from 'react';

export const Login: ExoticComponent<ComponentPropsWithRef<NamedExoticComponent>> & {
	readonly _result: NamedExoticComponent;
} = lazy(() => import(/* webpackChunkName: 'Login' */ '@app/pages/Auth/Login'));
