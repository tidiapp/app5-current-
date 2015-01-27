// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    //"use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("UserOrders");

    WinJS.UI.Pages.define("/pages/final/final.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            //roamingSettings.values["went_back"] = true;
            design.getFinal();
            design.changeTextColor();
            var theNew = roamingSettings.values["Base_Vend"].replace(/^\s+/, '').replace(/\s+$/, '');
            //milo: looping for any db to update any part automatically using ids 
            //var EditDB = thinkitdrinkitDataClient.getTable("Boost");
            //for (var i = 11468; i <= 11504; i++) {
            //    var query = EditDB.update({
            //        id: i,
            //        //BaseDBbase_id: 147
            //        //Price: "7"
            //        Image: "https://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitappimagesboost/purpose2/optimsmcurrent.png"
            //    })
            //}
                if (roamingSettings.values["Boost1_name"] == "" || roamingSettings.values["Boost1_name"] === !undefined) { roamingSettings.values["Boost1_price"] = 0 };
                if (roamingSettings.values["Boost2_name"] == "" || roamingSettings.values["Boost2_name"] === !undefined) { roamingSettings.values["Boost2_price"] = 0 };
                if (roamingSettings.values["Boost3_name"] == "" || roamingSettings.values["Boost3_name"] === !undefined) { roamingSettings.values["Boost3_price"] = 0 };
                if (roamingSettings.values["Boost4_name"] == "" || roamingSettings.values["Boost4_name"] === !undefined) { roamingSettings.values["Boost4_price"] = 0 };
                if (roamingSettings.values["Boost5_name"] == "" || roamingSettings.values["Boost5_name"] === !undefined) { roamingSettings.values["Boost5_price"] = 0 };
                if (roamingSettings.values["Boost6_name"] == "" || roamingSettings.values["Boost6_name"] === !undefined) { roamingSettings.values["Boost6_price"] = 0 };
                if (roamingSettings.values["Boost7_name"] == "" || roamingSettings.values["Boost7_name"] === !undefined) { roamingSettings.values["Boost7_price"] = 0 };
                if (roamingSettings.values["Boost8_name"] == "" || roamingSettings.values["Boost8_name"] === !undefined) { roamingSettings.values["Boost8_price"] = 0 };
                if (roamingSettings.values["Nutrigenetics_name"] == "" || roamingSettings.values["Nutrigenetics_name"] === !undefined) { roamingSettings.values["Nutrigenetics_price"] = 0 };
                if (roamingSettings.values["Base_name"] == "" || roamingSettings.values["Base_name"] === !undefined) { roamingSettings.values["Base_price"] = 0 };
                if (roamingSettings.values["FlavSel_name"] == "" || roamingSettings.values["FlavSel_name"] === !undefined) { roamingSettings.values["FlavSel_price"] = 0 };

                roamingSettings.values['Boost_total'] = (parseFloat(roamingSettings.values["Boost1_price"]) + parseFloat(roamingSettings.values["Boost2_price"]) + parseFloat(roamingSettings.values["Boost3_price"]) + parseFloat(roamingSettings.values["Boost4_price"]) + parseFloat(roamingSettings.values["Boost5_price"]) + parseFloat(roamingSettings.values["Boost6_price"]) + parseFloat(roamingSettings.values["Boost7_price"]) + parseFloat(roamingSettings.values["Boost8_price"]));

                roamingSettings.values["the_complete_total"] = roamingSettings.values["t"] + parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values['Boost_total']) + parseFloat(roamingSettings.values["Nutrigenetics_price"]);

               // roamingSettings.values["the_complete_total"] += parseFloat(roamingSettings.values["total_price"]);
                roamingSettings.values["not_cont"] = true;

            document.getElementById("product_total").textContent = "$" + roamingSettings.values["the_complete_total"];
            document.getElementById("tax").textContent = "$" + Math.ceil((roamingSettings.values["the_complete_total"] * .0636) * 100) / 100;
            document.getElementById("total").textContent = "$" + Math.ceil(((roamingSettings.values["the_complete_total"] * .0636) + roamingSettings.values["the_complete_total"]) * 100) / 100;
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.

            roamingSettings.values["I_ordered"] = "yes";
            if (roamingSettings.values["not_cont"]) {
                roamingSettings.values["total_price"] = 0;
                remove.pop_list(age_data.model.continue_order_save);
                test_array = [];
                array_t = [];
            } else if (!roamingSettings.values["not_cont"]) {

            }

        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    //storing the invoice number that is being created by the vend whenever a user hits the submit btn
    var backSaved = new WinJS.UI.BackButton()
    var the_order = Array;
    var the_full_order = Array;
 
    WinJS.Namespace.define("FinalClick", {
        clicked: function () {
            // server.userOrderDone();
            var missName = document.getElementById("Cname").value;
            if (missName == null || missName == "") {
                tool.alert("", "Please add your name, thanks");
            } else {
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
                else {
                    roamingSettings.values["Boost2_name"] = 0;
                    roamingSettings.values["Boost2_pic"] = 0;
                    roamingSettings.values["Boost2_price"] = 0;
                    roamingSettings.values["Boost2_vend"] = 0;
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
                if (roamingSettings.values["Nutrigenetics_price"] <= 0 || roamingSettings.values["Nutrigenetics_price"] == "") {
                    roamingSettings.values["Nutrigenetics_name"] = "none";
                    roamingSettings.values["Nutrigenetics_price"] = 0;
                    roamingSettings.values["Nutrigenetics_vend"] = "none";
                    roamingSettings.values["Nutrigenetics_pic"] = "none";
                };
                server.VendPrep();
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
                //grays out submit button
                tool.grayOut();

                function onError(reason) {
                    // Details in reason.Message and ex.HResult.       
                }
            }
                              
        },

        the_continue: function () {
            //2 boosts      
            console.log("This is not the one I'm looking for: :( ")
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
            else {
                roamingSettings.values["Boost2_name"] = 0;
                roamingSettings.values["Boost2_pic"] = 0;
                roamingSettings.values["Boost2_price"] = 0;
                roamingSettings.values["Boost2_vend"] = 0;
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
            if (roamingSettings.values["Nutrigenetics_price"] <= 0 || roamingSettings.values["Nutrigenetics_price"] == "") {
                roamingSettings.values["Nutrigenetics_name"] = "none";
                roamingSettings.values["Nutrigenetics_price"] = 0;
                roamingSettings.values["Nutrigenetics_vend"] = "none";
                roamingSettings.values["Nutrigenetics_pic"] = "none";
            };
            server.contSave()
            if (roamingSettings.values["Boost2_price"] > 0 && roamingSettings.values["Boost3_price"] <= 0) {boostCheck();}
            else if (roamingSettings.values["Boost3_price"] > 0 && roamingSettings.values["Boost4_price"] <= 0) {boostCheck(); }
            else if (roamingSettings.values["Boost4_price"] > 0 && roamingSettings.values["Boost5_price"] <= 0) {boostCheck(); }
            else if (roamingSettings.values["Boost5_price"] > 0 && roamingSettings.values["Boost6_price"] <= 0) {boostCheck(); }
            else if (roamingSettings.values["Boost6_price"] > 0 && roamingSettings.values["Boost7_price"] <= 0) {boostCheck(); }
            else if (roamingSettings.values["Boost7_price"] > 0 && roamingSettings.values["Boost8_price"] <= 0) {boostCheck(); }
            else if (roamingSettings.values["Boost8_price"] > 0) {boostCheck(); }
            else { boostCheck() }
            roamingSettings.values["totalOrderNumber"]++;
            function boostCheck() {
                roamingSettings.values["not_cont"] = false;
                console.log(roamingSettings.values["Base_vend"] + ' ' + roamingSettings.values["Boost1_vend"]);
                roamingSettings.values["went_back"] = true;
                WinJS.Navigation.navigate('pages/launch_page/launch_page.html');
            }
        }
    })
})();
