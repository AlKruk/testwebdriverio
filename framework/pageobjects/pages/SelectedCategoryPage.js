const FilterSidebar = require("../../components/components/FilterSidebar");
const ProductCards = require("../../components/components/ProductCards");
const AbstractPage = require("./AbstractPage");

class SelectedCategoryPage extends AbstractPage {
	constructor() {
		super();
		this.filterSidebar = new FilterSidebar();
		this.productCards = new ProductCards();
	}
}

module.exports = SelectedCategoryPage;