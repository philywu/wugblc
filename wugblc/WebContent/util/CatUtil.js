jQuery.sap.declare("com.phily.wugblc.util.CatUtil");

com.phily.wugblc.util.CatUtil = {
		
		getParentCode :  function (value) {
			if (value && value.length == 3) {
				var str = "";
				if(value.charAt(2) !="0") {// final level
					str = value.charAt(0) + value.charAt(1) +"0";
				}else if (value.charAt(1)!="0"){//2nd level
					str = value.charAt(0)  +"00";
				} else { // 1st level
					str = "000" ;
				}
				return str ;
			} else {
				return "NA";
			}
			
			return bundle.getText("StatusText" + value, "?");
		}
		
		
}