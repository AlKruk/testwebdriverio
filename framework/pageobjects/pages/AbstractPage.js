const FilterSidebar = require("../../components/components/FilterSidebar");
const Footer = require("../../components/components/Footer");
const Collection = require("../../components/wrappers/Collection");

class AbstractPage {

	constructor() {
		this.filterSidebar = new FilterSidebar();
		this.footer = new Footer();
	}

	async getPageElement(alias) {
		const elementNames = alias.split(" > ");
		if (elementNames.length === 1) {
			if("type" in this[elementNames[0]]) {
				return this[elementNames[0]]["type"] === "Collection" ? new Collection(this[elementNames[0]].selector) :
					new Element(this[elementNames[0]].selector);
			}
			return this[elementNames[0]];
		}
		return this[elementNames[0]].getChild(elementNames.slice(1));
	}



}

module.exports = AbstractPage;
