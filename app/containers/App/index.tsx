import Dashboard from '@app/pages/Dashboard';
import Settings from '@app/pages/Settings';
import ROUTES from '@app/shared/routes';
import React, { Suspense } from 'react';
import { memo, NamedExoticComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CacheBuster from '@app/containers/CacheBusting';
import { Login } from '@app/pages/Auth/Login/login.lazy';

const App: NamedExoticComponent = memo(() => {
	return (
		<CacheBuster>
			<Suspense fallback={<span>loading </span>}>
				<Switch>
					<Route component={Login} path={ROUTES.LOGIN} exact />
					<Route component={Dashboard} path={ROUTES.MAIN} exact />
					<Route component={Settings} path={ROUTES.SETTINGS} exact />
					{/* 404 fallback */}
					<Redirect to={ROUTES.MAIN} />
				</Switch>
			</Suspense>
		</CacheBuster>
	);
});

App.displayName = 'App';

export default App;
