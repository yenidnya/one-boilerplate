const semverGreaterThan = (versionA: string, versionB: string): boolean => {
	const versionsA = versionA?.split(/\./g);
	const versionsB = versionB?.split(/\./g);

	while (versionsA?.length || versionsB?.length) {
		const a = Number(versionsA?.shift());
		const b = Number(versionsB?.shift());

		if (a === b) continue;

		return a > b || isNaN(b);
	}

	return false;
};

export default semverGreaterThan;
