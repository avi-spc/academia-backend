export const timeInWords = (ts) => {
	const convertedTS = new Date(ts.toString()).toUTCString().substring(5, 16);

	return convertedTS;
};

export const formatDate = (ts) => {
	const partials = new Date(ts).toLocaleString().split(',')[0].split('/');

	const formattedDate = `${partials[2]}-${partials[0]}-${partials[1]}`;

	return formattedDate;
};
