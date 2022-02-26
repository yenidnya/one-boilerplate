import ROUTES from '@app/shared/routes';
import React from 'react';
import { memo, NamedExoticComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Dashboard: NamedExoticComponent = memo(() => {
	const { t } = useTranslation(['global']);
	return (
		<div>
			<h1>{t('hello')}</h1>
			Dashboard
			<br />
			<Link to={ROUTES.LOGIN}>Login</Link>
			<br />
			<Link to={ROUTES.SETTINGS}>Settings</Link>
		</div>
	);
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
