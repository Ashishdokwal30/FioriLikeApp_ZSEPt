sap.ui.define(['com/sotec/nnt/jsd/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'],
    function (BaseController, MessageBox, MessageToast, Fragment, Filter, FilterOperator) {
        return BaseController.extend("com.sotec.nnt.jsd.controller.View2", {
            onInit: function () {
                // alert("welcome To Fiori App")
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("superman").attachMatched(this.harculis, this);
            },
            // RMH :- route Matched handler 
            harculis: function (oEvent) {
                var fruitId = oEvent.getParameter("arguments").fruitId;
                var sPath = '/' + fruitId;
                this.getView().bindElement(sPath,{
                    expand: "To_Supplier"
                });
            },
            onBack: function () {
                var oCurrentView = this.getView();
                var oParentView = oCurrentView.getParent();
                oParentView.to("idView1");

                // for chaning we can write like this      
                // this.getView().getParent().to("idView1")
            },
            //this a global variable in which we pass the value null and then add a "IF Else" condition so in if we give the fragment and ask to opne and else open it with fragment
            onPopupSupplier: null,
            onFilter: function () {
                var that = this;
                if (!that.onPopupSupplier) {
                    //first we call the fragment here so syntex is fragment.load
                    Fragment.load({
                        //here we call the fragment by the name in path
                        name: 'com.sotec.nnt.jsd.Fragments.popup',
                        id: 'Supplier',
                        controller: this
                        //here we call "CallBack" function and ask for promise to open this fragment when the user click the button
                    }).then(function (oFragment) {
                        that.onPopupSupplier = oFragment;
                        that.onPopupSupplier.setTitle("Supplier");
                        //here we tell View that this fragment needs to take model Data
                        that.getView().addDependent(that.onPopupSupplier);
                        that.onPopupSupplier.bindAggregation("items", {
                            path: '/suppliers',
                            template: new sap.m.ObjectListItem({
                                title: '{name}',
                                intro: '{sinceWhen}',
                                number: '{contactNo}'
                            })
                        })
                        that.onPopupSupplier.open();
                    });
                }
                else {
                    this.onPopupSupplier.open();
                }
                //  MessageBox.alert("This Functionality is Under Construction");
            },
            onPopupCity: null,
            oField: null,
            onF4Help: function (oEvent) {
                this.oField = oEvent.getSource();
                var that = this;
                if (!that.onPopupCity) {
                    Fragment.load({
                        name: 'com.sotec.nnt.jsd.Fragments.popup',
                        id: 'City',
                        controller: this
                    }).then(function (oFargment) {
                        that.onPopupCity = oFargment;
                        that.onPopupCity.setTitle("Cities");
                        that.getView().addDependent(that.onPopupCity);
                        that.onPopupCity.bindAggregation("items", {
                            path: '/cities',
                            template: new sap.m.ObjectListItem({
                                title: '{name}',
                                intro: '{famousFor}',
                                number: '{otherName}'
                            })
                        })
                        that.onPopupCity.open();
                    })
                }
                else {
                    that.onPopupCity.open();
                }
                // MessageBox.alert("This Functionality is Under Construction");
            },
            onSearchDialog: function(oEvent){
                //get the search value 
                var sValue = oEvent.getParameter("value");
                //construct a filter from the value 
                var oFilter = new Filter("name", FilterOperator.Contains, sValue);
                //get the object of select dialog control
                var oSelectDialog = oEvent.getSource();
                //inject the filter for binding of items
                oSelectDialog.getBinding("items").filter(oFilter);
            },
            onConfirmPopup: function (oEvent) {
                var sID = oEvent.getSource().getId();
                if (sID.indexOf("City") != -1) {
                    var oSelectedItem = oEvent.getParameter("selectedItem");
                    var sValue = oSelectedItem.getTitle();
                    this.oField.setValue(sValue);
                }
                else{
                    var aFilter = [];
                    // here we have get all the selected items
                    var aItems = oEvent.getParameter("selectedItems");
                    // now we have loop 
                    for (let i = 0; i < aItems.length; i++) {
                        const element = aItems[i];
                        //get the title of supplier
                        var sTitle = element.getTitle();
                        //construct the filter object
                        var oFilter = new Filter("name", FilterOperator.EQ, sTitle);
                        //fill all array of all filter
                        aFilter.push(oFilter);                        
                    }
                    //create a filter with or condition 
                    var oFinalFilter = new Filter({
                        filters : aFilter,
                        and : false
                    });
                    //inject the filter to set the item filtering
                    this.getView().byId("idTabSupplier").getBinding("items").filter(oFinalFilter);
                }
            },
            onSubmit: function () {
                MessageBox.confirm("Would you like to Submit the Details", {
                    title: "Confirmation",
                    onClose: function (status) {
                        if (status === "OK") {
                            MessageToast.show("Your Details are Submited");
                        }
                        else {
                            MessageToast.show("OK!!! Take Your Time")
                        }
                    }
                })
            },
            onSave: function () {
                //if we want get the massage coming from resource model so we have to do these steps

                //first of all we need to call model here
                var oResourceModel = this.getView().getModel("i18n");

                //now we have to call resource bundle becq resource model all files are in bundleUrl.....check manifest.json
                var oBundle = oResourceModel.getResourceBundle();

                //now we get bundle here... now we need to get the Text which we want to show in message box
                var mssSave = oBundle.getText('mssSave', [000001]);
                var mssSaveErr = oBundle.getText('mssSaveError');

                //now here our mssSave data from i18n resouce model comes into var mssSave........
                //and  our mssCancle data from i18n resouce model comes into var mssCancle........
                //and  our mssSaveErr data from i18n resouce model comes into var mssSaveError........

                MessageBox.confirm("Would You Like to Save?", {
                    title: "Confirmation",
                    onClose: function (status) {
                        if (status === "OK") {
                            MessageToast.show(mssSave);
                        }
                        else {
                            MessageToast.show(mssSaveErr);
                        }
                    }
                })
            },
            onCancle: function () {

                //for understand do this.....
                // var oResourceModel = this.getView().getModel("i18n");
                // var oBundle = oResourceModel.getResourceBundle();
                // var mssCancle = oBundle.getText('mssCancle');
                // var mssSaveErr = oBundle.getText('mssSaveError');


                //for chaning do this....
                var oResourceModel = this.getView().getModel("i18n").getResourceBundle();
                var mssCancle = oResourceModel.getText('mssCancle');
                var mssSaveErr = oResourceModel.getText('mssSaveError');
                //and  our mssCancle data from i18n resouce model comes into var mssCancle........
                //and  our mssSaveErr data from i18n resouce model comes into var mssSaveError........

                MessageBox.confirm("Would You Like to Cancle?", {
                    title: "Cancellation",
                    onClose: function (status) {
                        if (status === "OK") {
                            MessageBox.alert(mssCancle);
                        }
                        else {
                            MessageToast.show(mssSaveErr);
                        }
                    }
                })
            },
            onItemPressSupp: function(oEvent){
                // MessageBox.error("This Function will not work now under construction")
                var sPath = oEvent.getParameter("listItem").getBindingContextPath();
                var sIndex = sPath.split("/")[sPath.split("/").length - 1];
                this.oRouter.navTo("ironman",{
                    suppId : sIndex
                });
            },
            onItemPressCities: function(oEvent){
                // MessageBox.error("This Function will not work now under construction")
                var sPath = oEvent.getParameter("listItem").getBindingContextPath();
                var sIndex = sPath.split("/")[sPath.split("/").length - 1];
                this.oRouter.navTo("aquaman",{
                    cityId : sIndex
                });
            }
        });

    });