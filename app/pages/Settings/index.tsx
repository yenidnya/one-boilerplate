import { GenericActionCreator, useInjectReducer, useInjectSaga, useSelectedState } from '@app/redux/utils';
import React from 'react';
import { memo, NamedExoticComponent } from 'react';
import { useDispatch } from 'react-redux';
import { SETTINGS_ACTION_TYPES } from './settings.actions';
import { SettingsReducer } from './settings.reducer';
import SettingsModuleSaga from './settings.saga';

const Settings: NamedExoticComponent = memo(() => {
	useInjectSaga({ key: 'SETTINGS', saga: SettingsModuleSaga });
	useInjectReducer({ key: 'SETTINGS', reducer: SettingsReducer });

	const { color } = useSelectedState('SETTINGS') ?? {};
	const dispatch = useDispatch();

	const fire = () => {
		dispatch(
			GenericActionCreator({
				type: SETTINGS_ACTION_TYPES.GET_SETTINGS,
			}),
		);
	};

	return (
		<div>
			<h1>Settings</h1>
			<br />
			color: {color}
			<br />
			<button onClick={fire}>GET</button>
		</div>
	);
});

Settings.displayName = 'Settings';

export default Settings;
