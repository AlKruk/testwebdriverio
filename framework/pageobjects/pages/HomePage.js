const AbstractPage = require("./AbstractPage");
const ComputerSection = require("../../components/components/ComputerSection");

class HomePage extends AbstractPage{
	constructor() {
		super();
		this.computerSection = new ComputerSection();
	}
}

module.exports = HomePage;