const {getCurrentPage} = require(".//browserActions");

const getPageChild = async (child) => {
	const currentPageObj = await getCurrentPage();
	return await currentPageObj.getPageElement(child);
};

const scrollToChild = async (child, scrollOptions) => {
	return (await getPageChild(child)).scrollIntoView(scrollOptions);
};

const clickOnChild = async (child) => {
	return (await getPageChild(child)).click(child);
};

const typeInChild = async (child, keys) => {
	return (await getPageChild(child)).sendKeys(keys);
};

const waitForChildBeingDisplayed = async (child, opts) => {
	return (await getPageChild(child)).waitUntilDisplayed(opts);
};

const waitForChildBeingClickable = async (child, opts) => {
	return (await getPageChild(child)).waitUntilClickable(opts);
};

const clickElementFromCollection = async (collection, text) => {
	const elCollection = await getPageChild(collection);
	if (text[0] !== "#") {
		return (await elCollection.getElementByText(text)).click();
	} else {
		return (await elCollection.getElementByIndex(+(text.slice(1)) - 1)).click();
	}
};

module.exports = {
	clickElementFromCollection,
	getPageChild,
	scrollToChild,
	clickOnChild,
	typeInChild,
	waitForChildBeingDisplayed,
	waitForChildBeingClickable
};