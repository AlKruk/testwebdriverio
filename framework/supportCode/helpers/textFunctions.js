const logger = require("../../../config/winston.config");

const getPriceValues = async (textArr) => {
	return textArr.map((text, index) => {
		const textWithoutDiscount = text.replace(/до -\d+%/, "").trim();
		let firstPrice, secondPrice;
		try {
			if (!textWithoutDiscount.includes("от")) {
				[fullString, firstPrice] = (/^((?:[1-9]\d{0,2})(?:\s\d{3})*,\d{2}) р\.$/).exec(textWithoutDiscount);
			} else {
				[fullString, firstPrice, secondPrice] = (/^от ((?:[1-9]\d{0,2})(?:\s\d{3})*,\d{2}) до ((?:[1-9]\d{0,2})(?:\s\d{3})*,\d{2}) р\.$/gm).exec(textWithoutDiscount);
				secondPrice = +(secondPrice.replace(/\s/, "").replace(/,/, "."));
			}
			firstPrice = +(firstPrice.replace(/\s/, "").replace(/,/, "."));
			return secondPrice ? [firstPrice, secondPrice] : [firstPrice];
		} catch (e) {
			logger.error(`failed to match prices from ${index} product card in correct format: lowest price-${firstPrice}highest price-${secondPrice}
                full string: ${fullString}`);
			return [NaN];
		}
	}
	);
};

const validateProductNames = async (elementTexts, matchStr) => {
	return elementTexts.map(text => {
		return new RegExp(matchStr).test(text);
	});
};

module.exports = {
	getPriceValues,
	validateProductNames
};