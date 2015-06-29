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
	handleLineItemPress: function (evt){
		var context = evt.getSource().getBindingContext();
		this.nav.to("Detail", context);
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
			
			var subCatList = this.getSubCatCode(code,oDataAll);
			var filters = [];
			var tblSub = this.getView().byId("tblSub");
			if (subCatList.length > 0 ){
				tblSub.setVisible (true);
				tblSub.bindElement("/");
				
				subCatList.forEach(function(val, i){  
					var sFilter = new sap.ui.model.Filter("code", sap.ui.model.FilterOperator.EQ, val);
					filters.push(sFilter);
				});
				//sFilter = new sap.ui.model.Filter("code", sap.ui.model.FilterOperator.EQ, ["120"]);
				//filters.push(sFilter);
				var binding = this.getView().byId("tblSub").getBinding("items");
				binding.filter(filters);
				
			} else {
				tblSub.setVisible (false);
			}
			
			
			
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
		getSubCatCode: function(parentCode,oDataAll){
			var subList = [];
			var level ;
			//subList.push("111");
			if (parentCode.charAt(2)!="0"){
				level = 3;
			} else if (parentCode.charAt(1)!="0") {
				level = 2;
			} else {
				level =1 ;
			}
			if (level <3 && oDataAll instanceof Array){  
				oDataAll.forEach(function(oValue, i){
					if (level == 1){
						if (oValue.code.charAt(0)==parentCode.charAt(0) && oValue.code.charAt(1)!="0" &&oValue.code.charAt(2)=="0") {
							subList.push(oValue.code);
						}
					}
					if (level == 2){
						if(oValue.code.substr(0,2) == parentCode.substr(0,2) && oValue.code.charAt(2)!="0"){						
							subList.push(oValue.code)
						}
					}
				  });  
				}  
			//subList.push("112");
			return subList;
		}

		
		
});