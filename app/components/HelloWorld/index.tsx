import React from 'react';
import { memo, NamedExoticComponent } from 'react';
import { useTranslation } from 'react-i18next';

const HelloWorld: NamedExoticComponent = memo(() => {
	const { t } = useTranslation('global');
	return <div>{t('hello')}</div>;
});

HelloWorld.displayName = 'HelloWorld';

export default HelloWorld;
