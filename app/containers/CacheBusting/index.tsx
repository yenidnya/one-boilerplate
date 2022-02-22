import { GenericActionCreator, useSelectedState } from '@app/redux/utils';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import packageJson from '../../../package.json';
import { IFetchVersionNumberAction, APP_ACTION_TYPES } from '@app/containers/App/app.actions';

const CacheBuster: React.FC<PropsWithChildren<any>> = props => {
	const dispatch: Dispatch = useDispatch();
	const { loading, isLatestVersion } = useSelectedState('global') ?? {};

	useEffect(() => {
		dispatch(GenericActionCreator<IFetchVersionNumberAction>({ type: APP_ACTION_TYPES.FETCH_VERSION_NUMBER, data: packageJson.version }));
	}, [dispatch]);

	const refreshCacheAndReload = useCallback(() => {
		setTimeout(async () => {
			if (caches) {
				const names = await caches.keys();
				await Promise.all(names.map(name => caches.delete(name)));
			}
			window.location.reload();
		}, 3000);
	}, []);

	useEffect(() => {
		if (!loading && !isLatestVersion) {
			refreshCacheAndReload();
		}
	}, [isLatestVersion, loading, refreshCacheAndReload]);

	return loading ? null : props.children;
};

export default CacheBuster;
