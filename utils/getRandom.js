const characters =
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const numbers = "0123456789";

function getRandomString(length) {
	let result = "";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

function getRandomNumber(length) {
	let result = "";
	const charactersLength = numbers.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

module.exports = {
	getRandomString: getRandomString,
	getRandomNumber: getRandomNumber,
};
