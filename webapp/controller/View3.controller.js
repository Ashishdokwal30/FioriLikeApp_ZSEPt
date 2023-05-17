sap.ui.define(['com/sotec/nnt/jsd/controller/BaseController',
  'sap/ui/core/routing/History'],
  function (BaseController, History) {
    'use strict';
    return BaseController.extend('com.sotec.nnt.jsd.controller.View3', {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("ironman").attachMatched(this.harculis, this);
      },
      //RMH - Route Matched Handler
      harculis: function (oEvent) {
        var supplierId = oEvent.getParameter("arguments").suppId;
        var sPath = 'fruits>/suppliers/' + supplierId;
        this.getView().bindElement(sPath);
      },
      onSelectChart: function(oEvent) {
        var key = oEvent.getSource().getSelectedKey();
        this.getView().byId("idVizFrame").setVizType(key);
      },
      onBack: function () {
        var oHistory, sPreviousHash;

        oHistory = History.getInstance();
        sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          this.getRouter().navTo("spiderman", {}, true /*no history*/);
        }
      },
      onPopupSupp: null,
      oField: null,
      onTitlePress: function (oEvent) {
        this.oField = oEvent.getSource();
        var that = this;
        if (!that.onPopupSupp) {
          Fragment.load({
            name: 'com.sotec.nnt.jsd.Fragments.suppPopup',
            id: 'suppFruit',
            controller: this
          }).then(function (oFargment) {
            that.onPopupSupp = oFargment;
            that.onPopupSupp.setTitle("Supply Fruit");
            that.getView().addDependent(that.onPopupSupp);
            that.onPopupSupp.bindAggregation("items", {
              path: '/suppliers/suppFruits',
              template: new sap.m.ObjectListItem({
                title: '{name}',
                number: '{quantity}'
              })
            })
            that.onPopupSupp.open();
          })
        }
        else {
          that.onPopupSupp.open();
        }
      }
    });

  });