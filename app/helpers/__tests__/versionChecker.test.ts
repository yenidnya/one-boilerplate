import semverGreaterThan from '../versionChecker';

describe('VersionChecker', () => {
	it('should return false when version is less than', () => {
		const value = semverGreaterThan('1.0.0', '2.0.0');
		expect(value).toBe(false);
	});

	it('should return true when version is greater than', () => {
		const value = semverGreaterThan('3.0.0', '2.0.0');
		expect(value).toBe(true);
	});

	it('should return false when version is equal', () => {
		const value = semverGreaterThan('3.0.0', '3.0.0');
		expect(value).toBe(false);
	});

	it('should return false if versions are empty', () => {
		const value = semverGreaterThan('', '');
		expect(value).toBe(false);
	});
});
