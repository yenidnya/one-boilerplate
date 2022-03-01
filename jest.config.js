module.exports = {
	roots: ['<rootDir>', '.'],
	modulePaths: ['<rootDir>', '.'],
	moduleDirectories: ['node_modules'],
	testEnvironment: 'jsdom',
	preset: 'ts-jest/presets/js-with-babel',
	collectCoverageFrom: [
		'app/**/*.{js,jsx,ts,tsx}',
		'!app/**/*.test.{js,jsx,ts,tsx}',
		'!app/app.tsx',
		'!app/i18n.ts',
		'!app/**/*.actions.ts',
		'!app/**/*.lazy.tsx',
		'!app/helpers/request.ts',
		'!app/config/**/*.ts',
		'!app/services/**/*.ts',
		'!app/shared/**/*.ts',
		'!app/containers/CacheBusting/**/*.tsx',
	],
	coverageThreshold: {
		global: {
			statements: 94,
			branches: 85,
			functions: 94,
			lines: 94,
		},
	},
	moduleFileExtensions: ['js', 'ts', 'tsx'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
	moduleDirectories: ['node_modules', 'app'],
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', '<rootDir>/mocks/localStorage.ts'],
	moduleNameMapper: {
		'react-i18next': '<rootDir>/mocks/react-i18n.ts',
		'\\.svg$': '<rootDir>/mocks/svg.ts',
		'^@app(.*)$': '<rootDir>/app$1',
	},
	testRegex: '__tests__/.*\\.test\\.(js|ts(x?))$',
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
		'^.+\\.tsx?$': 'ts-jest',
	},
	snapshotSerializers: [],
	watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
