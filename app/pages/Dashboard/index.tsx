import ROUTES from '@app/shared/routes';
import React from 'react';
import { memo, NamedExoticComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ArrowLeft from '@app/assets/icons/arrow-left.svg';

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
			<LazyLoadImage alt="to-the-moon" height={776} src="/assets/images/undraw_to-the-moon.png" width={933} />
			<ArrowLeft className="w-8 h-8 text-red-700" />
		</div>
	);
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
