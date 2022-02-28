export const setLocalStorage: (id: string, data: unknown) => void = (id: string, data: unknown) =>
	typeof window !== 'undefined' && localStorage?.setItem(id, JSON.stringify(data));

// @ts-ignore
export const getLocalStorage: <T>(id: string) => T = <T>(id: string): T => {
	if (typeof window !== 'undefined') {
		const item = localStorage?.getItem(id);
		return item ? JSON.parse(item) : null;
	}
};

export const removeFromLocalStorage: (key: string) => void = (key: string) => typeof window !== 'undefined' && localStorage?.removeItem(key);
