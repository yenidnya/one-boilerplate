import ROUTES from '@app/shared/routes';
import React from 'react';
import { memo, NamedExoticComponent } from 'react';
import { Link } from 'react-router-dom';

const Dashboard: NamedExoticComponent = memo(() => {
	return (
		<div>
			Dashboard
			<br />
			<Link to={ROUTES.AUTH}>Auth</Link>
			<br />
			<Link to={ROUTES.SETTINGS}>Settings</Link>
		</div>
	);
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
