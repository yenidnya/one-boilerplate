import { setLocalStorage, getLocalStorage, removeFromLocalStorage } from '../localStorage';
describe('localStorage helpers', () => {
	it('should setLocalStorage', () => {
		const KEY = 'test-0';
		const VALUE = 'foobar';
		setLocalStorage(KEY, VALUE);
		const item = window.localStorage.getItem(KEY);
		expect(item).toBe(`"${VALUE}"`);
	});

	it('should not setLocalStorage when window is undefined', () => {
		const KEY = 'test-2';
		const VALUE = 'toor';
		const windowSpy = jest.spyOn(global as any, 'window', 'get').mockReturnValue(undefined);
		setLocalStorage(KEY, VALUE);
		const item = window?.localStorage?.getItem(KEY);
		expect(item).toBe(undefined);
		windowSpy.mockRestore();
	});

	it('should getLocalStorage', () => {
		const KEY = 'test-1';
		const VALUE = 'toor';
		setLocalStorage(KEY, VALUE);
		const item = getLocalStorage(KEY);
		expect(item).toBe(VALUE);
	});

	it('should return null when window is undefined', () => {
		const KEY = 'test-2';
		const VALUE = 'toor';
		const windowSpy = jest.spyOn(global as any, 'window', 'get').mockReturnValue(undefined);
		setLocalStorage(KEY, VALUE);
		const item = getLocalStorage(KEY);
		expect(item).toBe(undefined);
		windowSpy.mockRestore();
	});

	it('should removeFromLocalStorage', () => {
		const KEY = 'test-3';
		const VALUE = 'root';
		setLocalStorage(KEY, VALUE);
		const itemExists = getLocalStorage(KEY);
		expect(itemExists).toBe(VALUE);
		removeFromLocalStorage(KEY);
		const item = getLocalStorage(KEY);
		expect(item).toBe(null);
	});

	it('should not removeFromLocalStorage when window is undefined', () => {
		const KEY = 'test-4';
		const windowSpy = jest.spyOn(global as any, 'window', 'get').mockReturnValue(undefined);
		removeFromLocalStorage(KEY);
		const item = getLocalStorage(KEY);
		expect(item).toBe(undefined);
		windowSpy.mockRestore();
	});
});
