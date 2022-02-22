export const setLocalStorage: (id: string, data: unknown) => void = (id: string, data: unknown) =>
	typeof window !== undefined && localStorage?.setItem(id, JSON.stringify(data));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getLocalStorage: <T>(id: string) => T = <T>(id: string): T => {
	if (typeof window !== undefined) {
		return JSON.parse(localStorage?.getItem(id) ?? '{}');
	}
};

export const removeFromLocalStorage: (key: string) => void = (key: string) => typeof window !== undefined && localStorage?.removeItem(key);
