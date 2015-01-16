 (function () {
     "use strict";
     var appData = Windows.Storage.ApplicationData.current;
     var roamingSettings = appData.roamingSettings;

     WinJS.Namespace.define("logic", {
         continueClicked: function () {
             if (roamingSettings.values["Boost2_price"] > 0 && roamingSettings.values["Boost3_price"] <= 0) {
                 roamingSettings.values["Boost3_name"] = 0;
                 roamingSettings.values["Boost3_pic"] = 0;
                 roamingSettings.values["Boost3_price"] = 0;
                 roamingSettings.values["Boost3_vend"] = 0;
                 roamingSettings.values["Boost4_name"] = "none";
                 roamingSettings.values["Boost4_pic"] = "none";
                 roamingSettings.values["Boost4_price"] = 0;
                 roamingSettings.values["Boost4_vend"] = "none";
                 roamingSettings.values["Boost5_name"] = "none";
                 roamingSettings.values["Boost5_pic"] = "none";
                 roamingSettings.values["Boost5_price"] = 0;
                 roamingSettings.values["Boost5_vend"] = "none";
                 roamingSettings.values["Boost6_name"] = "none";
                 roamingSettings.values["Boost6_pic"] = "none";
                 roamingSettings.values["Boost6_price"] = 0;
                 roamingSettings.values["Boost6_vend"] = "none";
                 roamingSettings.values["Boost7_name"] = "none";
                 roamingSettings.values["Boost7_pic"] = "none";
                 roamingSettings.values["Boost7price"] = 0;
                 roamingSettings.values["Boost7_vend"] = "none";
                 roamingSettings.values["Boost8_name"] = "none";
                 roamingSettings.values["Boost8_pic"] = "none";
                 roamingSettings.values["Boost8_price"] = 0;
                 roamingSettings.values["Boost8_vend"] = "none";
             }
             else if (roamingSettings.values["Boost3_price"] > 0 && roamingSettings.values["Boost4_price"] <= 0) {
                 roamingSettings.values["Boost4_name"] = "none";
                 roamingSettings.values["Boost4_pic"] = "none";
                 roamingSettings.values["Boost4_price"] = 0;
                 roamingSettings.values["Boost4_vend"] = "none";
                 roamingSettings.values["Boost5_name"] = "none";
                 roamingSettings.values["Boost5_pic"] = "none";
                 roamingSettings.values["Boost5_price"] = 0;
                 roamingSettings.values["Boost5_vend"] = "none";
                 roamingSettings.values["Boost6_name"] = "none";
                 roamingSettings.values["Boost6_pic"] = "none";
                 roamingSettings.values["Boost6_price"] = 0;
                 roamingSettings.values["Boost6_vend"] = "none";
                 roamingSettings.values["Boost7_name"] = "none";
                 roamingSettings.values["Boost7_pic"] = "none";
                 roamingSettings.values["Boost7price"] = 0;
                 roamingSettings.values["Boost7_vend"] = "none";
                 roamingSettings.values["Boost8_name"] = "none";
                 roamingSettings.values["Boost8_pic"] = "none";
                 roamingSettings.values["Boost8_price"] = 0;
                 roamingSettings.values["Boost8_vend"] = "none";
             }
             else if (roamingSettings.values["Boost4_price"] > 0 && roamingSettings.values["Boost5_price"] <= 0) {
                 roamingSettings.values["Boost5_name"] = "none";
                 roamingSettings.values["Boost5_pic"] = "none";
                 roamingSettings.values["Boost5_price"] = 0;
                 roamingSettings.values["Boost5_vend"] = "none";
                 roamingSettings.values["Boost6_name"] = "none";
                 roamingSettings.values["Boost6_pic"] = "none";
                 roamingSettings.values["Boost6_price"] = 0;
                 roamingSettings.values["Boost6_vend"] = "none";
                 roamingSettings.values["Boost7_name"] = "none";
                 roamingSettings.values["Boost7_pic"] = "none";
                 roamingSettings.values["Boost7price"] = 0;
                 roamingSettings.values["Boost7_vend"] = "none";
                 roamingSettings.values["Boost8_name"] = "none";
                 roamingSettings.values["Boost8_pic"] = "none";
                 roamingSettings.values["Boost8_price"] = 0;
                 roamingSettings.values["Boost8_vend"] = "none";
             }
             else if (roamingSettings.values["Boost5_price"] > 0 && roamingSettings.values["Boost6_price"] <= 0) {
                 roamingSettings.values["Boost6_name"] = "none";
                 roamingSettings.values["Boost6_pic"] = "none";
                 roamingSettings.values["Boost6_price"] = 0;
                 roamingSettings.values["Boost6_vend"] = "none";
                 roamingSettings.values["Boost7_name"] = "none";
                 roamingSettings.values["Boost7_pic"] = "none";
                 roamingSettings.values["Boost7price"] = 0;
                 roamingSettings.values["Boost7_vend"] = "none";
                 roamingSettings.values["Boost8_name"] = "none";
                 roamingSettings.values["Boost8_pic"] = "none";
                 roamingSettings.values["Boost8_price"] = 0;
                 roamingSettings.values["Boost8_vend"] = "none";
             }
             else if (roamingSettings.values["Boost6_price"] > 0 && roamingSettings.values["Boost7_price"] <= 0) {
                 roamingSettings.values["Boost7_name"] = "none";
                 roamingSettings.values["Boost7_pic"] = "none";
                 roamingSettings.values["Boost7price"] = 0;
                 roamingSettings.values["Boost7_vend"] = "none";
                 roamingSettings.values["Boost8_name"] = "none";
                 roamingSettings.values["Boost8_pic"] = "none";
                 roamingSettings.values["Boost8_price"] = 0;
                 roamingSettings.values["Boost8_vend"] = "none";
             }
             else if (roamingSettings.values["Boost7_price"] > 0 && roamingSettings.values["Boost8_price"] <= 0) {
                 roamingSettings.values["Boost8_name"] = "none";
                 roamingSettings.values["Boost8_pic"] = "none";
                 roamingSettings.values["Boost8_price"] = 0;
                 roamingSettings.values["Boost8_vend"] = "none";
             }
             server.contSave()
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
             console.log("This is the one I'm looking for: " + roamingSettings.values.remove["Boost1_name"]);
         }
     })
 })