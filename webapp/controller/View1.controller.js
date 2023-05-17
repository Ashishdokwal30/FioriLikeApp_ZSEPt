sap.ui.define(['com/sotec/nnt/jsd/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'],
    function (BaseController, Filter, FilterOperator) {
        'use strict';
        return BaseController.extend("com.sotec.nnt.jsd.controller.View1", {
            onInit: function () {
                // debugger;
              this.oRouter = this.getOwnerComponent().getRouter();
              this.oRouter.getRoute("superman").attachMatched(this.harculis, this);
            },
            //RMH - Routing Matched Handler
            harculis: function (oEvent){
                var fruitId = oEvent.getParameter("arguments").fruitId;
                var sPath = '/fruits/' + fruitId;
                var oList = this.getView().byId("idListView1")
                //need to get all items here
                var aItems = oList.getItems();
                //now loop 
                for (let i = 0; i < aItems.length; i++) {
                    const element = aItems[i];
                    if(element.getBindingContextPath() === sPath){
                        var oItemObject = element;
                        break;
                    }
                }
                //here we get the list control object where selection needs to done
                oList.setSelectedItem(oItemObject)
            },
            onNext: function (myFruitId) {
                this.oRouter.navTo("superman",{
                    fruitId : myFruitId
                });
                //In this we call the current View
                // var oCurrentView = this.getView();


                //here we call parent of the all views
                // var oParentView = oCurrentView.getParent();

                //then switch the view 1 to view2 by give the ID of which view we are calling
                // oParentView.to("idView2");

                //   for chaning we can write like this      
                //   this.getView().getParent().to("idView2")
            },
            onSearch: function (oEvent) {
                //here have to take search value from searchField 
                var sValue = oEvent.getParameter("query");
                //for live change we need to fire if condition
                // if (!sValue) {
                //     var sValue = oEvent.getParameter("newValue")
                // }
                //now we have to create a filter for the search value so that the ui can understand what we want
                // var oFilter1 = new Filter("PRODUCT_ID", FilterOperator.Contains, sValue);
                var oFilter2 = new Filter("CATEGORY", FilterOperator.Contains, sValue);
                // var oFilter3 = new Filter("price", FilterOperator.Contains, sValue);
                // var oFilter4 = new Filter("status", FilterOperator.Contains, sValue);
                // var aFilter = [oFilter1, oFilter2];
                //so for searching 2 items together so we have to do this
                // var oFilter = new Filter({
                //     filters: aFilter,
                //     and: false
                // });
                //now we have to bind the items in list control
                this.getView().byId("idListView1").getBinding("items").filter(oFilter2);
            },
            onDeleteItem: function (oEvent) {
              var oList= this.getView().byId("idListView1");
              var oSelectedItem = oList.getSelectedItems();
              oSelectedItem.forEach(element => {
                oList.removeItem(element)
              });
            },
            onAdd: function(oEvent){
                this.oRouter.navTo("add");
            },
            onSelectItem: function(oEvent){
                //here we have to get the item which was select
                var oItemSelect = oEvent.getParameter("listItem").getBindingContextPath();
                var myFId = oItemSelect.split("/")[oItemSelect.split("/").length - 1];

                //now we have to call the view 2
                // var parentView = this.getView().getParent();
                //here when parent call the view 2 then we have to call this on a page index 1 becq on index 0 our current view is standing
                // var oV2 = parentView.getPages()[1];

                //so here we started doing Master Detail fiori so we make appVIew to split app
            //    var oV2 = this.getView().getParent().getParent().getDetailPage("idView2");

                //here we bind the view 2 element with view 1
                // oV2.bindElement(oItemSelect);

                //for nevigation 
                // debugger;
                this.onNext(myFId);
            }
            // onDelete: function (oEvent) {
            //     //here we have to get that which item is deleting
            //     var OItemToDelete = oEvent.getParameter("listItem");


            //     //we print the data on console
            //     alert (OItemToDelete.getTitle() + " are deleted from the list");


            //     //now we have get the object of list control
            //     //here we use list Id suppose if id will change then what we have to do?
            //     // var oList = this.getView().byId("idListView1");
                
                
            //     //so for that we have to target the source so that ui can umderstand from where this object is orginated
            //     var oList = oEvent.getSource();

            //     //now delete the item from the list control
            //     oList.removeItem(OItemToDelete);
            // },
        });

    });