sap.ui.define(['com/sotec/nnt/jsd/controller/BaseController',
               'sap/ui/core/routing/History',
               'sap/m/MessageBox'],
     function(BaseController, History, MessageBox) {
    'use strict';
    return BaseController.extend('com.sotec.nnt.jsd.controller.View4',{
       onInit: function(){
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("aquaman").attachMatched(this.harculis, this);
       },
       //RMH - Route Matched Handler
       harculis: function(oEvent){
         var cityId = oEvent.getParameter("arguments").cityId;
         var sPath = 'fruits>/cities/' + cityId;
         this.getView().bindElement(sPath);
       },
       onBack: function(){
         var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("spiderman", {}, true /*no history*/);
			}
       }
    }); 
    
});