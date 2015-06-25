jQuery.sap.require("com.phily.wugblc.util.CatUtil");

sap.ui.controller("com.phily.wugblc.view.Detail", {

	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	},
	handleTest : function (evt) {
	console.log("hello test");
	},
	handleParent : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("Detail", context);
		//console.log(evt.getSource().getBindingContext());
	},
	/**
	* Called when a controller is instantiated and its View controls (if available) are already created.
	* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	* @memberOf myfioriui5.testview
	*/
		onInit: function() {
			//var model = this.getModel();
			//console.log(this.getView().getBindingContext());
		},

	/**
	* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	* (NOT before the first rendering! onInit() is used for that one!).
	* @memberOf myfioriui5.testview
	*/
		onBeforeRendering: function() {
			var oModel = this.getView().getModel();
			var context = this.getView().getBindingContext();
			var oDataAll = oModel.getObject("/BalCategory");
			
			
			//console.log(context.getProperty("code"));
			var code = context.getProperty("code");
			//get parentCode
			var parentCode = com.phily.wugblc.util.CatUtil.getParentCode(code);
			var num = -1;
			
			//console.log(parentCode);
			// find sequence of parent category
			if (oDataAll instanceof Array){  
				oDataAll.forEach(function(oValue, i){  
				   
					if(oValue.code == parentCode ){
						num = i;
					}
				  });  
				}  
			if(num>=0){
				//re binding the element for parent category
				
				this.getView().byId("ap").bindElement("/BalCategory/"+num);
				this.getView().byId("btn_parent").bindElement("/BalCategory/"+num);
				//console.log(this.getView().byId("ap").getBindingContext());
			}
			this.getView().byId("tblSub").bindElement("/");
			var filters = [];
			var sFilter = new sap.ui.model.Filter("code", sap.ui.model.FilterOperator.EQ, ["110"]);
			filters.push(sFilter);
			sFilter = new sap.ui.model.Filter("code", sap.ui.model.FilterOperator.EQ, ["120"]);
			filters.push(sFilter);
			var binding = this.getView().byId("tblSub").getBinding("items");
			binding.filter(filters);
			
		},

	/**
	* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	* This hook is the same one that SAPUI5 controls get after being rendered.
	* @memberOf myfioriui5.testview
	*/
		onAfterRendering: function() {
			console.log(this.getView().byId("ap").getText());
			
		},

	/**
	* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	* @memberOf myfioriui5.testview
	*/
//		onExit: function() {
	//
//		}

		
		
});