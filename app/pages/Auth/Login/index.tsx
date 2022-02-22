import { GenericActionCreator } from '@app/redux/utils';
import React, { memo, NamedExoticComponent } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { IGetLoginAction, LOGIN_ACTION_TYPES } from '../auth.actions';

const Login: NamedExoticComponent = memo(() => {
	const dispatch: Dispatch = useDispatch();

	const handleClick = () => {
		dispatch(
			GenericActionCreator<IGetLoginAction>({
				type: LOGIN_ACTION_TYPES.GET_LOGIN,
				data: {
					email: 'foo@gmail.com',
					password: '123456',
				},
			}),
		);
	};

	return (
		<div>
			<h1>Login</h1>
			<button onClick={handleClick}>fire</button>
		</div>
	);
});

export default Login;
