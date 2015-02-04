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
            WinJS.Binding.processAll(element, age_data.model);

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

            if (roamingSettings.values["Boost1_name"] == "" || roamingSettings.values["Boost1_name"] === !undefined) {
                roamingSettings.values["Boost1_price"] = 0
            } else {
                document.getElementById("boost_price1").textContent = "$" + roamingSettings.values["Boost1_price"];
                document.getElementById("my_boost1_name").textContent = roamingSettings.values["Boost1_name"];
                document.getElementById("my_base_img_final").src = roamingSettings.values["Base_pic"];
            };

            if (roamingSettings.values["Boost2_name"] == "" || roamingSettings.values["Boost2_name"] === !undefined) {
                roamingSettings.values["Boost2_price"] = 0
            } else {
                document.getElementById("boost_price2").textContent = "$" + roamingSettings.values["Boost2_price"];
                document.getElementById("my_boost2_name").textContent = roamingSettings.values["Boost2_name"];
            };

            if (roamingSettings.values["Boost3_name"] == "" || roamingSettings.values["Boost3_name"] === !undefined) {
                roamingSettings.values["Boost3_price"] = 0
            } else {
                document.getElementById("boost_price3").textContent = "$" + roamingSettings.values["Boost3_price"];
                document.getElementById("my_boost3_name").textContent = roamingSettings.values["Boost3_name"];
            };

            if (roamingSettings.values["Boost4_name"] == "" || roamingSettings.values["Boost4_name"] === !undefined) {
                roamingSettings.values["Boost4_price"] = 0
            } else {
                document.getElementById("boost_price4").textContent = "$" + roamingSettings.values["Boost4_price"];
                document.getElementById("my_boost4_name").textContent = roamingSettings.values["Boost4_name"];
            };

            if (roamingSettings.values["Boost5_name"] == "" || roamingSettings.values["Boost5_name"] === !undefined) {
                roamingSettings.values["Boost5_price"] = 0
            } else {
                document.getElementById("boost_price5").textContent = "$" + roamingSettings.values["Boost5_price"];
                document.getElementById("my_boost5_name").textContent = roamingSettings.values["Boost5_name"];
            };

            if (roamingSettings.values["Boost6_name"] == "" || roamingSettings.values["Boost6_name"] === !undefined) {
                roamingSettings.values["Boost6_price"] = 0
            } else {
                document.getElementById("boost_price6").textContent = "$" + roamingSettings.values["Boost6_price"];
                document.getElementById("my_boost6_name").textContent = roamingSettings.values["Boost6_name"];
            };

            if (roamingSettings.values["Boost7_name"] == "" || roamingSettings.values["Boost7_name"] === !undefined) {
                roamingSettings.values["Boost7_price"] = 0
            } else {
                document.getElementById("boost_price7").textContent = "$" + roamingSettings.values["Boost7_price"];
                document.getElementById("my_boost7_name").textContent = roamingSettings.values["Boost7_name"];
            };

            if (roamingSettings.values["Boost8_name"] == "" || roamingSettings.values["Boost8_name"] === !undefined) {
                roamingSettings.values["Boost8_price"] = 0
            } else {
                document.getElementById("boost_price8").textContent = "$" + roamingSettings.values["Boost8_price"];
                document.getElementById("my_boost8_name").textContent = roamingSettings.values["Boost8_name"];
            };

            if (roamingSettings.values["Nutrigenetics_name"] == "" || roamingSettings.values["Nutrigenetics_name"] === !undefined) {
                roamingSettings.values["Nutrigenetics_price"] = 0
//milo: figure out what goes here
            };

            if (roamingSettings.values["Base_name"] == "" || roamingSettings.values["Base_name"] === !undefined) {
                roamingSettings.values["Base_price"] = 0
            } else {
                document.getElementById("base_price").textContent = "$" + roamingSettings.values["Base_price"];
                document.getElementById("my_base_name").textContent = roamingSettings.values["Base_name"];
            };

            if (roamingSettings.values["FlavSel_name"] == "" || roamingSettings.values["FlavSel_name"] === !undefined) {
                roamingSettings.values["FlavSel_price"] = 0
            } else {
                document.getElementById("my_flav_name").textContent = roamingSettings.values["FlavSel_name"];
            };

            server.userOrderFinalRead();

                roamingSettings.values['Boost_total'] = (parseFloat(roamingSettings.values["Boost1_price"]) + parseFloat(roamingSettings.values["Boost2_price"]) + parseFloat(roamingSettings.values["Boost3_price"]) + parseFloat(roamingSettings.values["Boost4_price"]) + parseFloat(roamingSettings.values["Boost5_price"]) + parseFloat(roamingSettings.values["Boost6_price"]) + parseFloat(roamingSettings.values["Boost7_price"]) + parseFloat(roamingSettings.values["Boost8_price"]));

                roamingSettings.values["the_complete_total"] = roamingSettings.values["t"] + parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values['Boost_total']) + parseFloat(roamingSettings.values["Nutrigenetics_price"]);

               //roamingSettings.values["the_complete_total"] += parseFloat(roamingSettings.values["total_price"]);
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
            remove.pop_list(age_data.model.order_final_read);
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
                    roamingSettings.values["Boost3_name"] = "none";
                    roamingSettings.values["Boost3_pic"] = "none";
                    roamingSettings.values["Boost3_price"] = 0;
                    roamingSettings.values["Boost3_vend"] = "none";
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
                    roamingSettings.values["Boost2_name"] = "none";
                    roamingSettings.values["Boost2_pic"] = "none";
                    roamingSettings.values["Boost2_price"] = 0;
                    roamingSettings.values["Boost2_vend"] ="none";
                    roamingSettings.values["Boost3_name"] = "none";
                    roamingSettings.values["Boost3_pic"] = "none";
                    roamingSettings.values["Boost3_price"] = 0;
                    roamingSettings.values["Boost3_vend"] = "none";
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
            else if (roamingSettings.values["Boost8_price"] > 0) {
                //milo:allows all to be shown
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
            //console.log("I'm here 2!");
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
        },

        howManyBoosts: function (results) {
            for (var i = 0; i < results.length; i++) {

                if (results[i].OrderNum === 1) {
                    if (results[0].Boost2Price > 0 && results[0].Boost3Price <= 0) {
                        age_data.model.order_final_read.push(
                        {
                            b_name: results[0].BaseName, b_img: results[0].BaseImages, b_price: "$" + results[0].BasePrice,
                            f_name: results[0].FlavName, f_price: "$" + results[0].FlavPrice,
                            bo_name: results[0].BoostName, bo_price: "$" + results[0].BoostPrice,
                            bo2_name: results[0].Boost2Name, bo2_price: "$" + results[0].Boost2Price,
                            order: "ORDER " + results[0].OrderNum
                        })
                        document.getElementById("boost1_div_hide").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide").removeAttribute("hidden");
                    }
                    else if (results[0].Boost3Price > 0 && results[0].Boost4Price <= 0) {
                        age_data.model.order_final_read.push(
                        {
                            b_name: results[0].BaseName, b_img: results[0].BaseImages, b_price: "$" + results[0].BasePrice,
                            f_name: results[0].FlavName, f_price: "$" + results[0].FlavPrice,
                            bo_name: results[0].BoostName, bo_price: "$" + results[0].BoostPrice,
                            bo2_name: results[0].Boost2Name, bo2_price: "$" + results[0].Boost2Price,
                            bo3_name: results[0].Boost3Name, bo3_price: "$" + results[0].Boost3Price,
                            order: "ORDER " + results[0].OrderNum
                        })
                        document.getElementById("boost1_div_hide").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide").removeAttribute("hidden");

                    }
                    else if (results[0].Boost4Price > 0 && results[0].Boost5Price <= 0) {
                        age_data.model.order_final_read.push(
                        {
                            b_name: results[0].BaseName, b_img: results[0].BaseImages, b_price: "$" + results[0].BasePrice,
                            f_name: results[0].FlavName, f_price: "$" + results[0].FlavPrice,
                            bo_name: results[0].BoostName, bo_price: "$" + results[0].BoostPrice,
                            bo2_name: results[0].Boost2Name, bo2_price: "$" + results[0].Boost2Price,
                            bo3_name: results[0].Boost3Name, bo3_price: "$" + results[0].Boost3Price,
                            bo4_name: results[0].Boost4Name, bo4_price: "$" + results[0].Boost4Price,
                            order: "ORDER " + results[0].OrderNum
                        })
                        document.getElementById("boost1_div_hide").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide").removeAttribute("hidden");
                    }
                    else if (results[0].Boost5Price > 0 && results[0].Boost6Price <= 0) {
                        age_data.model.order_final_read.push(
                        {
                            b_name: results[0].BaseName, b_img: results[0].BaseImages, b_price: "$" + results[0].BasePrice,
                            f_name: results[0].FlavName, f_price: "$" + results[0].FlavPrice,
                            bo_name: results[0].BoostName, bo_price: "$" + results[0].BoostPrice,
                            bo2_name: results[0].Boost2Name, bo2_price: "$" + results[0].Boost2Price,
                            bo3_name: results[0].Boost3Name, bo3_price: "$" + results[0].Boost3Price,
                            bo4_name: results[0].Boost4Name, bo4_price: "$" + results[0].Boost4Price,
                            bo5_name: results[0].Boost5Name, bo5_price: "$" + results[0].Boost5Price,
                            order: "ORDER " + results[0].OrderNum
                        })
                        document.getElementById("boost1_div_hide").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide").removeAttribute("hidden");
                        document.getElementById("boost5_div_hide").removeAttribute("hidden");
                    }
                    else if (results[0].Boost6Price > 0 && results[0].Boost7Price <= 0) {
                        age_data.model.order_final_read.push(
                        {
                            b_name: results[0].BaseName, b_img: results[0].BaseImages, b_price: "$" + results[0].BasePrice,
                            f_name: results[0].FlavName, f_price: "$" + results[0].FlavPrice,
                            bo_name: results[0].BoostName, bo_price: "$" + results[0].BoostPrice,
                            bo2_name: results[0].Boost2Name, bo2_price: "$" + results[0].Boost2Price,
                            bo3_name: results[0].Boost3Name, bo3_price: "$" + results[0].Boost3Price,
                            bo4_name: results[0].Boost4Name, bo4_price: "$" + results[0].Boost4Price,
                            bo5_name: results[0].Boost5Name, bo5_price: "$" + results[0].Boost5Price,
                            bo6_name: results[0].Boost6Name, bo6_price: "$" + results[0].Boost6Price,
                            order: "ORDER " + results[0].OrderNum
                        })
                        document.getElementById("boost1_div_hide").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide").removeAttribute("hidden");
                        document.getElementById("boost5_div_hide").removeAttribute("hidden");
                        document.getElementById("boost6_div_hide").removeAttribute("hidden");
                    }
                    else if (results[0].Boost7Price > 0 && results[0].Boost8Price <= 0) {
                        age_data.model.order_final_read.push(
                        {
                            b_name: results[0].BaseName, b_img: results[0].BaseImages, b_price: "$" + results[0].BasePrice,
                            f_name: results[0].FlavName, f_price: "$" + results[0].FlavPrice,
                            bo_name: results[0].BoostName, bo_price: "$" + results[0].BoostPrice,
                            bo2_name: results[0].Boost2Name, bo2_price: "$" + results[0].Boost2Price,
                            bo3_name: results[0].Boost3Name, bo3_price: "$" + results[0].Boost3Price,
                            bo4_name: results[0].Boost4Name, bo4_price: "$" + results[0].Boost4Price,
                            bo5_name: results[0].Boost5Name, bo5_price: "$" + results[0].Boost5Price,
                            bo6_name: results[0].Boost6Name, bo6_price: "$" + results[0].Boost6Price,
                            bo7_name: results[0].Boost7Name, bo7_price: "$" + results[0].Boost7Price,
                            order: "ORDER " + results[0].OrderNum
                        })
                        document.getElementById("boost1_div_hide").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide").removeAttribute("hidden");
                        document.getElementById("boost5_div_hide").removeAttribute("hidden");
                        document.getElementById("boost6_div_hide").removeAttribute("hidden");
                        document.getElementById("boost7_div_hide").removeAttribute("hidden");
                    }
                    else if (results[0].Boost8Price > 0) {
                        age_data.model.order_final_read.push(
                        {
                            b_name: results[0].BaseName, b_img: results[0].BaseImages, b_price: "$" + results[0].BasePrice,
                            f_name: results[0].FlavName, f_price: "$" + results[0].FlavPrice,
                            bo_name: results[0].BoostName, bo_price: "$" + results[0].BoostPrice,
                            bo2_name: results[0].Boost2Name, bo2_price: "$" + results[0].Boost2Price,
                            bo3_name: results[0].Boost3Name, bo3_price: "$" + results[0].Boost3Price,
                            bo4_name: results[0].Boost4Name, bo4_price: "$" + results[0].Boost4Price,
                            bo5_name: results[0].Boost5Name, bo5_price: "$" + results[0].Boost5Price,
                            bo6_name: results[0].Boost6Name, bo6_price: "$" + results[0].Boost6Price,
                            bo7_name: results[0].Boost7Name, bo7_price: "$" + results[0].Boost7Price,
                            bo8_name: results[0].Boost8Name, bo8_price: "$" + results[0].Boost8Price,
                            order: "ORDER " + results[0].OrderNum
                        })
                        document.getElementById("boost1_div_hide").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide").removeAttribute("hidden");
                        document.getElementById("boost5_div_hide").removeAttribute("hidden");
                        document.getElementById("boost6_div_hide").removeAttribute("hidden");
                        document.getElementById("boost7_div_hide").removeAttribute("hidden");
                        document.getElementById("boost8_div_hide").removeAttribute("hidden");
                    }
                    else {
                        age_data.model.order_final_read.push(
                        {
                            b_name: results[0].BaseName, b_img: results[0].BaseImages, b_price: "$" + results[0].BasePrice,
                            f_name: results[0].FlavName, f_price: "$" + results[0].FlavPrice,
                            bo_name: results[0].BoostName, bo_price: "$" + results[0].BoostPrice,
                            order: "ORDER " + results[0].OrderNum
                        })
                        document.getElementById("boost1_div_hide").removeAttribute("hidden");
                    }
//milo 2nd order
                } else if (results[i].OrderNum === 2) {
                    document.getElementById("order2").removeAttribute("hidden");
                    if (results[1].Boost2Price > 0 && results[1].Boost3Price <= 0) {
                        age_data.model.order_final_read2.push(
                        {
                            b_name: results[1].BaseName, b_img: results[1].BaseImages, b_price: "$" + results[1].BasePrice,
                            f_name: results[1].FlavName, f_price: "$" + results[1].FlavPrice,
                            bo_name: results[1].BoostName, bo_price: "$" + results[1].BoostPrice,
                            bo2_name: results[1].Boost2Name, bo2_price: "$" + results[1].Boost2Price,
                            order: "ORDER " + results[1].OrderNum
                        })
                        document.getElementById("boost1_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide2").removeAttribute("hidden");
                    }
                    else if (results[1].Boost3Price > 0 && results[1].Boost4Price <= 0) {
                        age_data.model.order_final_read2.push(
                        {
                            b_name: results[1].BaseName, b_img: results[1].BaseImages, b_price: "$" + results[1].BasePrice,
                            f_name: results[1].FlavName, f_price: "$" + results[1].FlavPrice,
                            bo_name: results[1].BoostName, bo_price: "$" + results[1].BoostPrice,
                            bo2_name: results[1].Boost2Name, bo2_price: "$" + results[1].Boost2Price,
                            bo3_name: results[1].Boost3Name, bo3_price: "$" + results[1].Boost3Price,
                            order: "ORDER " + results[1].OrderNum
                        })
                        document.getElementById("boost1_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide2").removeAttribute("hidden");

                    }
                    else if (results[1].Boost4Price > 0 && results[1].Boost5Price <= 0) {
                        age_data.model.order_final_read2.push(
                        {
                            b_name: results[1].BaseName, b_img: results[1].BaseImages, b_price: "$" + results[1].BasePrice,
                            f_name: results[1].FlavName, f_price: "$" + results[1].FlavPrice,
                            bo_name: results[1].BoostName, bo_price: "$" + results[1].BoostPrice,
                            bo2_name: results[1].Boost2Name, bo2_price: "$" + results[1].Boost2Price,
                            bo3_name: results[1].Boost3Name, bo3_price: "$" + results[1].Boost3Price,
                            bo4_name: results[1].Boost4Name, bo4_price: "$" + results[1].Boost4Price,
                            order: "ORDER " + results[1].OrderNum
                        })
                        document.getElementById("boost1_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide2").removeAttribute("hidden");
                    }
                    else if (results[1].Boost5Price > 0 && results[1].Boost6Price <= 0) {
                        age_data.model.order_final_read2.push(
                        {
                            b_name: results[1].BaseName, b_img: results[1].BaseImages, b_price: "$" + results[1].BasePrice,
                            f_name: results[1].FlavName, f_price: "$" + results[1].FlavPrice,
                            bo_name: results[1].BoostName, bo_price: "$" + results[1].BoostPrice,
                            bo2_name: results[1].Boost2Name, bo2_price: "$" + results[1].Boost2Price,
                            bo3_name: results[1].Boost3Name, bo3_price: "$" + results[1].Boost3Price,
                            bo4_name: results[1].Boost4Name, bo4_price: "$" + results[1].Boost4Price,
                            bo5_name: results[1].Boost5Name, bo5_price: "$" + results[1].Boost5Price,
                            order: "ORDER " + results[1].OrderNum
                        })
                        document.getElementById("boost1_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost5_div_hide2").removeAttribute("hidden");
                    }
                    else if (results[1].Boost6Price > 0 && results[1].Boost7Price <= 0) {
                        age_data.model.order_final_read2.push(
                        {
                            b_name: results[1].BaseName, b_img: results[1].BaseImages, b_price: "$" + results[1].BasePrice,
                            f_name: results[1].FlavName, f_price: "$" + results[1].FlavPrice,
                            bo_name: results[1].BoostName, bo_price: "$" + results[1].BoostPrice,
                            bo2_name: results[1].Boost2Name, bo2_price: "$" + results[1].Boost2Price,
                            bo3_name: results[1].Boost3Name, bo3_price: "$" + results[1].Boost3Price,
                            bo4_name: results[1].Boost4Name, bo4_price: "$" + results[1].Boost4Price,
                            bo5_name: results[1].Boost5Name, bo5_price: "$" + results[1].Boost5Price,
                            bo6_name: results[1].Boost6Name, bo6_price: "$" + results[1].Boost6Price,
                            order: "ORDER " + results[1].OrderNum
                        })
                        document.getElementById("boost1_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost5_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost6_div_hide2").removeAttribute("hidden");
                    }
                    else if (results[1].Boost7Price > 0 && results[1].Boost8Price <= 0) {
                        age_data.model.order_final_read2.push(
                        {
                            b_name: results[1].BaseName, b_img: results[1].BaseImages, b_price: "$" + results[1].BasePrice,
                            f_name: results[1].FlavName, f_price: "$" + results[1].FlavPrice,
                            bo_name: results[1].BoostName, bo_price: "$" + results[1].BoostPrice,
                            bo2_name: results[1].Boost2Name, bo2_price: "$" + results[1].Boost2Price,
                            bo3_name: results[1].Boost3Name, bo3_price: "$" + results[1].Boost3Price,
                            bo4_name: results[1].Boost4Name, bo4_price: "$" + results[1].Boost4Price,
                            bo5_name: results[1].Boost5Name, bo5_price: "$" + results[1].Boost5Price,
                            bo6_name: results[1].Boost6Name, bo6_price: "$" + results[1].Boost6Price,
                            bo7_name: results[1].Boost7Name, bo7_price: "$" + results[1].Boost7Price,
                            order: "ORDER " + results[1].OrderNum
                        })
                        document.getElementById("boost1_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost5_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost6_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost7_div_hide2").removeAttribute("hidden");
                    }
                    else if (results[1].Boost8Price > 0) {
                        age_data.model.order_final_read2.push(
                        {
                            b_name: results[1].BaseName, b_img: results[1].BaseImages, b_price: "$" + results[1].BasePrice,
                            f_name: results[1].FlavName, f_price: "$" + results[1].FlavPrice,
                            bo_name: results[1].BoostName, bo_price: "$" + results[1].BoostPrice,
                            bo2_name: results[1].Boost2Name, bo2_price: "$" + results[1].Boost2Price,
                            bo3_name: results[1].Boost3Name, bo3_price: "$" + results[1].Boost3Price,
                            bo4_name: results[1].Boost4Name, bo4_price: "$" + results[1].Boost4Price,
                            bo5_name: results[1].Boost5Name, bo5_price: "$" + results[1].Boost5Price,
                            bo6_name: results[1].Boost6Name, bo6_price: "$" + results[1].Boost6Price,
                            bo7_name: results[1].Boost7Name, bo7_price: "$" + results[1].Boost7Price,
                            bo8_name: results[1].Boost8Name, bo8_price: "$" + results[1].Boost8Price,
                            order: "ORDER " + results[1].OrderNum
                        })
                        document.getElementById("boost1_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost5_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost6_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost7_div_hide2").removeAttribute("hidden");
                        document.getElementById("boost8_div_hide2").removeAttribute("hidden");
                    }
                    else {
                        age_data.model.order_final_read2.push(
                        {
                            b_name: results[1].BaseName, b_img: results[1].BaseImages, b_price: "$" + results[1].BasePrice,
                            f_name: results[1].FlavName, f_price: "$" + results[1].FlavPrice,
                            bo_name: results[1].BoostName, bo_price: "$" + results[1].BoostPrice,
                            order: "ORDER " + results[1].OrderNum
                        })
                        document.getElementById("boost1_div_hide2").removeAttribute("hidden");
                    }
//milo: 3rd order
                } else if (results[i].OrderNum === 3) {
                    document.getElementById("order3").removeAttribute("hidden");
                    if (results[2].Boost2Price > 0 && results[2].Boost3Price <= 0) {
                        age_data.model.order_final_read3.push(
                        {
                            b_name: results[2].BaseName, b_img: results[2].BaseImages, b_price: "$" + results[2].BasePrice,
                            f_name: results[2].FlavName, f_price: "$" + results[2].FlavPrice,
                            bo_name: results[2].BoostName, bo_price: "$" + results[2].BoostPrice,
                            bo2_name: results[2].Boost2Name, bo2_price: "$" + results[2].Boost2Price,
                            order: "ORDER " + results[2].OrderNum
                        })
                        document.getElementById("boost1_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide3").removeAttribute("hidden");
                    }
                    else if (results[2].Boost3Price > 0 && results[2].Boost4Price <= 0) {
                        age_data.model.order_final_read3.push(
                        {
                            b_name: results[2].BaseName, b_img: results[2].BaseImages, b_price: "$" + results[2].BasePrice,
                            f_name: results[2].FlavName, f_price: "$" + results[2].FlavPrice,
                            bo_name: results[2].BoostName, bo_price: "$" + results[2].BoostPrice,
                            bo2_name: results[2].Boost2Name, bo2_price: "$" + results[2].Boost2Price,
                            bo3_name: results[2].Boost3Name, bo3_price: "$" + results[2].Boost3Price,
                            order: "ORDER " + results[2].OrderNum
                        })
                        document.getElementById("boost1_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide3").removeAttribute("hidden");

                    }
                    else if (results[2].Boost4Price > 0 && results[2].Boost5Price <= 0) {
                        age_data.model.order_final_read3.push(
                        {
                            b_name: results[2].BaseName, b_img: results[2].BaseImages, b_price: "$" + results[2].BasePrice,
                            f_name: results[2].FlavName, f_price: "$" + results[2].FlavPrice,
                            bo_name: results[2].BoostName, bo_price: "$" + results[2].BoostPrice,
                            bo2_name: results[2].Boost2Name, bo2_price: "$" + results[2].Boost2Price,
                            bo3_name: results[2].Boost3Name, bo3_price: "$" + results[2].Boost3Price,
                            bo4_name: results[2].Boost4Name, bo4_price: "$" + results[2].Boost4Price,
                            order: "ORDER " + results[2].OrderNum
                        })
                        document.getElementById("boost1_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide3").removeAttribute("hidden");
                    }
                    else if (results[2].Boost5Price > 0 && results[2].Boost6Price <= 0) {
                        age_data.model.order_final_read3.push(
                        {
                            b_name: results[2].BaseName, b_img: results[2].BaseImages, b_price: "$" + results[2].BasePrice,
                            f_name: results[2].FlavName, f_price: "$" + results[2].FlavPrice,
                            bo_name: results[2].BoostName, bo_price: "$" + results[2].BoostPrice,
                            bo2_name: results[2].Boost2Name, bo2_price: "$" + results[2].Boost2Price,
                            bo3_name: results[2].Boost3Name, bo3_price: "$" + results[2].Boost3Price,
                            bo4_name: results[2].Boost4Name, bo4_price: "$" + results[2].Boost4Price,
                            bo5_name: results[2].Boost5Name, bo5_price: "$" + results[2].Boost5Price,
                            order: "ORDER " + results[2].OrderNum
                        })
                        document.getElementById("boost1_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost5_div_hide3").removeAttribute("hidden");
                    }
                    else if (results[2].Boost6Price > 0 && results[2].Boost7Price <= 0) {
                        age_data.model.order_final_read3.push(
                        {
                            b_name: results[2].BaseName, b_img: results[2].BaseImages, b_price: "$" + results[2].BasePrice,
                            f_name: results[2].FlavName, f_price: "$" + results[2].FlavPrice,
                            bo_name: results[2].BoostName, bo_price: "$" + results[2].BoostPrice,
                            bo2_name: results[2].Boost2Name, bo2_price: "$" + results[2].Boost2Price,
                            bo3_name: results[2].Boost3Name, bo3_price: "$" + results[2].Boost3Price,
                            bo4_name: results[2].Boost4Name, bo4_price: "$" + results[2].Boost4Price,
                            bo5_name: results[2].Boost5Name, bo5_price: "$" + results[2].Boost5Price,
                            bo6_name: results[2].Boost6Name, bo6_price: "$" + results[2].Boost6Price,
                            order: "ORDER " + results[2].OrderNum
                        })
                        document.getElementById("boost1_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost5_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost6_div_hide3").removeAttribute("hidden");
                    }
                    else if (results[2].Boost7Price > 0 && results[2].Boost8Price <= 0) {
                        age_data.model.order_final_read3.push(
                        {
                            b_name: results[2].BaseName, b_img: results[2].BaseImages, b_price: "$" + results[2].BasePrice,
                            f_name: results[2].FlavName, f_price: "$" + results[2].FlavPrice,
                            bo_name: results[2].BoostName, bo_price: "$" + results[2].BoostPrice,
                            bo2_name: results[2].Boost2Name, bo2_price: "$" + results[2].Boost2Price,
                            bo3_name: results[2].Boost3Name, bo3_price: "$" + results[2].Boost3Price,
                            bo4_name: results[2].Boost4Name, bo4_price: "$" + results[2].Boost4Price,
                            bo5_name: results[2].Boost5Name, bo5_price: "$" + results[2].Boost5Price,
                            bo6_name: results[2].Boost6Name, bo6_price: "$" + results[2].Boost6Price,
                            bo7_name: results[2].Boost7Name, bo7_price: "$" + results[2].Boost7Price,
                            order: "ORDER " + results[2].OrderNum
                        })
                        document.getElementById("boost1_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost5_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost6_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost7_div_hide3").removeAttribute("hidden");
                    }
                    else if (results[2].Boost8Price > 0) {
                        age_data.model.order_final_read3.push(
                        {
                            b_name: results[2].BaseName, b_img: results[2].BaseImages, b_price: "$" + results[2].BasePrice,
                            f_name: results[2].FlavName, f_price: "$" + results[2].FlavPrice,
                            bo_name: results[2].BoostName, bo_price: "$" + results[2].BoostPrice,
                            bo2_name: results[2].Boost2Name, bo2_price: "$" + results[2].Boost2Price,
                            bo3_name: results[2].Boost3Name, bo3_price: "$" + results[2].Boost3Price,
                            bo4_name: results[2].Boost4Name, bo4_price: "$" + results[2].Boost4Price,
                            bo5_name: results[2].Boost5Name, bo5_price: "$" + results[2].Boost5Price,
                            bo6_name: results[2].Boost6Name, bo6_price: "$" + results[2].Boost6Price,
                            bo7_name: results[2].Boost7Name, bo7_price: "$" + results[2].Boost7Price,
                            bo8_name: results[2].Boost8Name, bo8_price: "$" + results[2].Boost8Price,
                            order: "ORDER " + results[2].OrderNum
                        })
                        document.getElementById("boost1_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost2_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost3_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost4_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost5_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost6_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost7_div_hide3").removeAttribute("hidden");
                        document.getElementById("boost8_div_hide3").removeAttribute("hidden");
                    }
                    else {
                        age_data.model.order_final_read3.push(
                        {
                            b_name: results[2].BaseName, b_img: results[2].BaseImages, b_price: "$" + results[2].BasePrice,
                            f_name: results[2].FlavName, f_price: "$" + results[2].FlavPrice,
                            bo_name: results[2].BoostName, bo_price: "$" + results[2].BoostPrice,
                            order: "ORDER " + results[2].OrderNum
                        })
                        document.getElementById("boost1_div_hide3").removeAttribute("hidden");
                    }
                }





            }

            //if (age_data.model.order_final_read.length === 1) {
            //    document.getElementById("boost1_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost2_div_hide").removeAttribute("hidden");
            //} else if (age_data.model.order_final_read.length === 2) {
            //    document.getElementById("boost1_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost2_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost3_div_hide").removeAttribute("hidden");
            //} else if (age_data.model.order_final_read.length === 3) {
            //    document.getElementById("boost1_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost2_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost3_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost4_div_hide").removeAttribute("hidden");
            //} else if (age_data.model.order_final_read.length === 4) {
            //    document.getElementById("boost1_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost2_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost3_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost4_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost5_div_hide").removeAttribute("hidden");
            //} else if (age_data.model.order_final_read.length === 5) {
            //    document.getElementById("boost1_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost2_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost3_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost4_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost5_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost6_div_hide").removeAttribute("hidden");
            //} else if (age_data.model.order_final_read.length === 6) {
            //    document.getElementById("boost1_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost2_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost3_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost4_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost5_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost6_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost7_div_hide").removeAttribute("hidden");
            //} else if (age_data.model.order_final_read.length === 7) {
            //    document.getElementById("boost1_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost2_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost3_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost4_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost5_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost6_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost7_div_hide").removeAttribute("hidden");
            //    document.getElementById("boost8_div_hide").removeAttribute("hidden");
            //} else if (age_data.model.order_final_read.length === 0) {
            //    document.getElementById("boost1_div_hide").removeAttribute("hidden");
            //}

        }

    })
})();
