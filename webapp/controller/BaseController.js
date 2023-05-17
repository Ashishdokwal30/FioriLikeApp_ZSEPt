sap.ui.define(['sap/ui/core/mvc/Controller',
                 'com/sotec/nnt/jsd/util/lifeSaver'], 
        function(Controller,lifeSaver) {
    'use strict';
    return Controller.extend("com.sotec.nnt.jsd.controller.BaseController",{
        baseFormatter : lifeSaver
    });
    
});