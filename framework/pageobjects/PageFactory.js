const HomePage = require("./pages/HomePage");
const SelectedCategoryPage = require("./pages/SelectedCategoryPage");
const mapList = new Map([
	["Home", {expectedUrl: /^https:\/\/shop\.by\/$/, po: new HomePage()}],
	["SelectedCategoryPage", {expectedUrl: /^https:\/\/shop\.by\/\w+\//, po: new SelectedCategoryPage()}]
]);

class PageFactory {
	constructor() {
	}

	static get pageMap() {
		return mapList;
	}

	static getPageByUrl(url) {
		for (const [key, pageObject] of this.pageMap) {
			if (url.search(pageObject.expectedUrl) !== -1) {
				return pageObject.po;
			}
		}
		throw new Error("page object not found by url");
	}

	static getPageByName(name) {
		return this.pageMap.get(name).po;
	}

	static mapToObjectList() {
		return this.pageMap.values();
	}
}

module.exports = PageFactory;
