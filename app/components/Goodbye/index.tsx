import React from 'react';
import { memo, NamedExoticComponent } from 'react';
import { useTranslation } from 'react-i18next';

const Goodbye: NamedExoticComponent = memo(() => {
	const { t } = useTranslation('global');
	return <div>{t('goodbye')}</div>;
});

Goodbye.displayName = 'Goodbye';

export default Goodbye;
