export const isEmpty = (value) => {
	return (
		Object.keys(value).filter((key) => {
			if (value[key] !== null) {
				return value[key].trim() === '';
			} else {
				return true;
			}
		}).length > 0
	);
};
