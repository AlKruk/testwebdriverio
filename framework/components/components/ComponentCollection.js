const Collection = require("../wrappers/Collection");

class ComponentCollection {
	constructor(selector) {
		this.selector = selector;
	}

	async get() {
		if (!this.componentCollection) {
			this.componentCollection = await $$(this.selector);
		}
		return this;
	}

	async getChild(childName) {
		{
			return new Collection(`${this.selector} ${this[childName[0]].selector}`);
		}
	}
}

module.exports = ComponentCollection;