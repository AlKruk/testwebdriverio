const pageFactory = require("../pageobjects/PageFactory");

const getCurrentPage = async () => pageFactory.getPageByUrl(await browser.getUrl());

const browserSleep = async (sec) => browser.pause(sec * 1000);

const navigateTo = async (url) => browser.url(url);

module.exports = {
	getCurrentPage,
	browserSleep,
	navigateTo
};
