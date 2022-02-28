import { request } from '../request';

describe('axios request instance', () => {
	it('should export an instance', () => {
		expect(request).toBeDefined();
	});
});
