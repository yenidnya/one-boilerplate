import { createReducer } from '../reducers';

describe('Redux root Reducers', () => {
	it('Should define the root reducer', () => {
		const rootReducer = createReducer();
		expect(rootReducer).toBeDefined();
	});
});
