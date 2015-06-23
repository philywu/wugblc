jQuery.sap.require("com.phily.wugblc.util.Formatter");

sap.ui.controller("com.phily.wugblc.view.Detail", {

	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	}
});