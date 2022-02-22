export const ENVIRONMENT = {
	PROJECT_ID: process.env.PROJECT_ID ?? 'Not Defined',
	API_BASE_URI: process.env.API_BASE_URI ?? 'Not Defined',
	ENV: process.env.ENV ?? 'Not Defined',
};
export const PRODUCTION = 'production';
export const DEVELOPMENT = 'development';
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
