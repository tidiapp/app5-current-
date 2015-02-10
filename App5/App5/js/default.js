// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    var Age = thinkitdrinkitDataClient.getTable("Age");
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.

                //this changes the theme color of the entire app
                //it accepts some colors written as a string and all in hex
                //www.html-color-codes.info is a good website to obtain hex color values
                roamingSettings.values["the_complete_total"] = 0;
                design.colorChange("#F89B1E", "white");//#F89B1E
                roamingSettings.values["true"] = false;
                roamingSettings.values["not_cont"] = false;
                roamingSettings.values["went_back"] = true;
                roamingSettings.values["totalOrderNumber"] = 0;
                roamingSettings.values["totalOrderNumber1"] = 0;
                roamingSettings.values["i"] = 1;
                roamingSettings.values.remove["Base_name"]
                roamingSettings.values.remove["Base_pic"]
                roamingSettings.values.remove["Base_price"]
                roamingSettings.values.remove["Base_vend"]
                roamingSettings.values.remove["FlavSel_name"]
                roamingSettings.values.remove["FlavSel_pic"]
                roamingSettings.values.remove["FlavSel_price"]
                roamingSettings.values.remove["FlavSel_vend"]
                roamingSettings.values.remove["Boost1_name"]
                roamingSettings.values.remove["Boost1_pic"]
                roamingSettings.values.remove["Boost1_price"]
                roamingSettings.values.remove["Boost1_vend"]
                roamingSettings.values.remove["Boost2_name"]
                roamingSettings.values.remove["Boost2_pic"]
                roamingSettings.values.remove["Boost2_price"]
                roamingSettings.values.remove["Boost2_vend"]
                roamingSettings.values.remove["Boost3_name"]
                roamingSettings.values.remove["Boost3_pic"]
                roamingSettings.values.remove["Boost3_price"]
                roamingSettings.values.remove["Boost3_vend"]
                roamingSettings.values.remove["Boost4_name"]
                roamingSettings.values.remove["Boost4_pic"]
                roamingSettings.values.remove["Boost4_price"]
                roamingSettings.values.remove["Boost4_vend"]
                roamingSettings.values.remove["Boost5_name"]
                roamingSettings.values.remove["Boost5_pic"]
                roamingSettings.values.remove["Boost5_price"]
                roamingSettings.values.remove["Boost5_vend"]
                roamingSettings.values.remove["Boost6_name"]
                roamingSettings.values.remove["Boost6_pic"]
                roamingSettings.values.remove["Boost6_price"]
                roamingSettings.values.remove["Boost6_vend"]
                roamingSettings.values.remove["Boost7_name"]
                roamingSettings.values.remove["Boost7_pic"]
                roamingSettings.values.remove["Boost7price"]
                roamingSettings.values.remove["Boost7_vend"]
                roamingSettings.values.remove["Boost8_name"]
                roamingSettings.values.remove["Boost8_pic"]
                roamingSettings.values.remove["Boost8_price"]
                roamingSettings.values.remove["Boost8_vend"]
                remove.pop_list(age_data.model.order_final_call);
                //This is the normal(default) app color in hex #BA5EB7

            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };
    app.start();

})();
