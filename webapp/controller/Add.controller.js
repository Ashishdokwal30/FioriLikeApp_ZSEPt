sap.ui.define(['com/sotec/nnt/jsd/controller/BaseController',
  'sap/ui/model/json/JSONModel',
  'sap/m/MessageBox',
  'sap/m/MessageToast'],
  function (BaseController, JSONModel, MessageBox, MessageToast) {
    'use strict';
    return BaseController.extend("com.sotec.nnt.jsd.controller.Add", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("add").attachMatched(this.harculis, this);
        // debugger;
        this.oLocalModel = new JSONModel();
        this.oLocalModel.setData({
          "nProdData": {
            "PRODUCT_ID": "",
            "TYPE_CODE": "",
            "CATEGORY": "Notebooks",
            "NAME": "",
            "DESCRIPTION": "",
            "SUPPLIER_ID": "0100000051",
            "SUPPLIER_NAME": "TECUM",
            "TAX_TARIF_CODE": "1",
            "MEASURE_UNIT": "EA",
            "PRICE": "0.00",
            "CURRENCY_CODE": "EUR",
            "DIM_UNIT": "CM",
            "PRODUCT_PIC_URL": "/sap/public/bc/NWDEMO_MODEL/IMAGES/NV-1010.jpg"
          }
        });
        this.getView().setModel(this.oLocalModel, "prod");
      },
      harculis: function (oEvent) {
      },
      mode: "Create",
      setMode: function (sMode) {
        this.mode = sMode;
        if (this.mode === "Create") {
          this.getView().byId("idSave").setText("Save")
          this.getView().byId("idDelete").setEnabled(false);
          this.getView().byId("prodId").setEnabled(true);
        } else {
          this.getView().byId("idSave").setText("Update");
          this.getView().byId("idDelete").setEnabled(true);
          this.getView().byId("prodId").setEnabled(false);
        }
      },
      productId: "",
      onEnter: function (oEvent) {
        //get the value given by user in input
        this.productId = oEvent.getParameter("value");
        //get the odata model object
        var oDataModel = this.getView().getModel();
        //since we can't use THIS in callback function so we have put this into a variable
        var that = this;
        //call sap odata to read the single product
        //GET - Get single entity - passing key to it
        debugger;
        oDataModel.read("/ProductSet('" + this.productId + "')", {
          success: function (data) {
            that.oLocalModel.setProperty("/nProdData", data);
            that.setMode("Update");
          },
          error: function (oError) {
            MessageToast.show("Product Not Found !! Please Create !!");
            that.setMode("Create");
          }
        });
        //handle the call back
      },
      onExpensive: function(){
        var category = this.getView().byId("category").setSelectedKey();
        var oDataModel = this.getView().getModel();
        var that = this;
        oDataModel.callFunction("/GetMostExpensiveProduct",{
          urlParameters: {
            "I_CATEGORY": category
          },
          success: function(data){
            that.oLocalModel.setProperty("/nProdData", data);
            that.setMode("Update"); 
          }
        });
      },
      onSave: function () {
        //prepare Payload
        var payload = this.oLocalModel.getProperty("/nProdData");
        //Pre-Check
        if (payload.PRODUCT_ID === "") {
          MessageBox.error("Please Enter the Vaild ID");
          return;
        }
        //get the odata model here
        var oDataModel = this.getView().getModel();
        //Post this data to backend
        if (this.mode === "Create") {
          //POST
          oDataModel.create("/ProductSet", payload, {
            // get the response success or error
            success: function (data) {
              MessageToast.show("Congrats! The Data is successfully Posted to Backend");
            },
            error: function (oError) {
              // debugger;
              MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
            }
          });
        } else {
          //PUT
          debugger;
          oDataModel.update("/ProductSet('" + this.productId + "')", payload, {
            success: function (data) {
              MessageToast.show("congrats!! Your Data is Successfully Updated");
            },
            error: function (oError) {
              MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
            }
          })
        }
      },
      onDelete: function () {
        if(this.productId === ""){
          MessageBox.error("Please Enter the Vaild ID");
          return;
        }
        var oDataModel = this.getView().getModel();
        var that = this;
        MessageBox.confirm("Do you Want to Delete?", {
          onclose: function(status){
            if(status === "OK"){
              var that2 = that;
              oDataModel.remove("/ProductSet('" + that.productId +"')",{
                success: function(){
                  MessageToast.show("Your Product is Deleted");
                  that2.onClear();
                }
              });
            }
          }
        });
      },
      onClear: function () {
        this.setMode("Create");
        this.oLocalModel.setProperty("/nProdData", {
          "PRODUCT_ID": "",
          "TYPE_CODE": "",
          "CATEGORY": "Notebooks",
          "NAME": "",
          "DESCRIPTION": "",
          "SUPPLIER_ID": "0100000051",
          "SUPPLIER_NAME": "TECUM",
          "TAX_TARIF_CODE": "1 ",
          "MEASURE_UNIT": "EA",
          "PRICE": "0.00",
          "CURRENCY_CODE": "EUR",
          "DIM_UNIT": "CM",
          "PRODUCT_PIC_URL": "/sap/public/bc/NWDEMO_MODEL/IMAGES/NV-1010.jpg"
        });
      }
    });
  });