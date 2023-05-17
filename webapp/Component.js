sap.ui.define(['sap/ui/core/UIComponent'],
    function (UIComponent) {
        return UIComponent.extend("com.sotec.nnt.jsd.Component", {
            metadata: {
                manifest: "json"
            },
            init: function () {
                //here we initizalize our base class UIComponent so for that
                //we have  to create base class constructor
                UIComponent.prototype.init.apply(this);

                //get the router object from base class
                var oRouter = this.getRouter();
                //now call the initialize == it looks the routing manifest.json
                oRouter.initialize();
            },
            // createContent: function () {
            //     var oView = sap.ui.view("idRootView", {
            //         viewName: "com.sotec.nnt.jsd.view.App",
            //         type: "XML"
            //     });
            //     var oView1 = sap.ui.view("idView1", {
            //         viewName: "com.sotec.nnt.jsd.view.View1",
            //         type: "XML"
            //     });
            //     var oView2 = sap.ui.view("idView2", {
            //         viewName: "com.sotec.nnt.jsd.view.View2",
            //         type: "XML"
            //     });
            //     var oAppCon = oView.byId("idAppCorn");
            //     oAppCon.addMasterPage(oView1).addDetailPage(oView2);
            //     return oView;
            // },
            destroy: function () { }
        });

    }); 