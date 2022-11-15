export const timeInWords = (ts) => {
	const convertedTS = new Date(ts.toString()).toUTCString().substring(5, 16);

	return convertedTS;
};
