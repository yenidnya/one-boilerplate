import configureStore from '../configureStore';
import { history } from '@app/helpers/history';

describe('Redux ConfigureStore', () => {
	it('Should create a store', () => {
		const store = configureStore(undefined, history);
		expect(store).toBeDefined();
	});
});
