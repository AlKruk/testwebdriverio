const Component = require("./Component");

class FilterSidebar extends Component {
	constructor(selector = ".ModelFilter__ContentBlock") {
		super(selector);
		this.leftPriceInput = {
			type: "Element",
			selector: ".ModelFilter__PriceBlock .ModelFilter__InputLine.ModelFilter__PositionWindowCounter>.ModelFilter__InputSide:nth-child(1) input"
		};
		this.rightPriceInput = {
			type: "Element",
			selector: ".ModelFilter__PriceBlock .ModelFilter__InputLine.ModelFilter__PositionWindowCounter>.ModelFilter__InputSide:nth-child(2) input"
		};
		this.manufacturererShowMoreBtn = {
			type: "Element",
			selector: "#Attr_prof_1000 .ModelFilter__OpenHideAttr.Page__DarkBgWapper>span"
		};
		this.manufacturererCheckboxes = {
			type: "Collection",
			selector: "#Attr_prof_1000 .ModelFilter__SlideLineInner span"
		};
		this.showResultsBtn = {
			type: "Element",
			selector: ".ModelFilter__ParamListBtnSel"
		};
	}
}

module.exports = FilterSidebar;
