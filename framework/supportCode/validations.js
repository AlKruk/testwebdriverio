const {getPageChild} = require("./actions");
const {validateProductNames, getPriceValues} = require("./helpers/textFunctions");

const validatePricesOnNotebooksPage = async () => {
	const elementCollection = await getPageChild("productCards > priceBlock");
	const elementTexts = await elementCollection.getText();
	return getPriceValues(elementTexts);
};

const validateNamesOnNotebooksPage = async () => {
	const elementCollection = await getPageChild("productCards > nameBlock");
	return elementCollection.getText();
};

module.exports = {
	validatePricesOnNotebooksPage,
	validateNamesOnNotebooksPage
};