﻿// For an introduction to the Page Control template, see the following documentation:
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

            /*document.getElementById("my_base_img_final").src = roamingSettings.values["Base_pic"];
              document.getElementById("sel_base_pic_final").src = roamingSettings.values["Base_label"];
              document.getElementById("my_flav_img_final").src = roamingSettings.values["flavSel_pic"];
              document.getElementById("my_flav_label_img_final").src = roamingSettings.values["FlavSel_label"];
              document.getElementById("my_boost1_img_final").src = roamingSettings.values["Boost1_pic"];
              document.getElementById("my_boost1_img_label_final").src = roamingSettings.values["Boost1_pic_label"];
              document.getElementById("my_base_name").textContent = "Base: " + roamingSettings.values["Base_name"];
              document.getElementById("my_flav_name").textContent = "Flavor: " + roamingSettings.values["flavSel_name"];
              document.getElementById("my_boost1_name").textContent = "Boost: " + roamingSettings.values["Boost1_name"];*/
            
            //Age.select("240788").read().done(function (result) {
            //    //var id_db = result;
            //    console.log(result);
            //    //for (var i = result; i < 240790; i++) {
            //    //    Age.insert({
            //    //        BasePrice: i,
            //    //        Name: "Guest",
            //    //        Base: 'test',
            //    //        BaseImage: 'Something else',
            //    //        BaseID: '???',
            //    //        id: 240788
            //    //    })
            //    //}

            //    alert(JSON.stringify(result));
            //}, function (err) {
            //    alert("Error: " + err);
            //})

            //var query = Age.select("id", "Base").read().done(function (results) {
            //    alert(JSON.stringify(results));
            //}, function (err) {
            //    alert("Error: " + err);
            //})


//milo: looping for any db to update any part automatically using ids 

//var EditDB = thinkitdrinkitDataClient.getTable("Boost");
//for (var i = 1; i <= 3947; i++) {
//    var query = EditDB.update({
//        id: i,
//        Price: "7"
//    })
//}
                

            roamingSettings.values["went_back"] = true;
            if (roamingSettings.values["went_back_back"]) {
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

                roamingSettings.values["total_price"] = parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values['Boost_total']) + parseFloat(roamingSettings.values["Nutrigenetics_price"]);

                roamingSettings.values["the_complete_total"] += parseFloat(roamingSettings.values["total_price"]);
                //console.log((parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values["Boost1_price"])));
                //console.log(roamingSettings.values["total_price"]);
                //console.log(roamingSettings.values["the_complete_total"]);
                roamingSettings.values["not_cont"] = true;
                roamingSettings.values["went_back"] = false;
            }
            //document.getElementById("tax").textContent = "$" + Math.ceil(((parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values['Boost_total'])) * .0636) * 100) / 100;
            //document.getElementById("product_total").textContent = "$" + (parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values['Boost_total']));
            document.getElementById("product_total").textContent = "$" + roamingSettings.values["the_complete_total"];
            document.getElementById("tax").textContent = "$" + Math.ceil((roamingSettings.values["the_complete_total"] * .0636) * 100) / 100;
            document.getElementById("total").textContent = "$" + Math.ceil(((roamingSettings.values["the_complete_total"] * .0636) + roamingSettings.values["the_complete_total"]) * 100) / 100;
        },

//'BUG fix for 2nd new order breaking after submit is hit' CODE ABOVE IS FINE...


        unload: function () {
            // TODO: Respond to navigations away from this page.

            roamingSettings.values["I_ordered"] = "yes";
            if (roamingSettings.values["not_cont"]) {
                roamingSettings.values["total_price"] = 0;
                remove.pop_list(age_data.model.continue_order_save);
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
    //console.log(document.getElementById('Cname').value);
    WinJS.Namespace.define("FinalClick", {

        clicked: function () {
            //  console.log(the_full_order);
            // Always catch network exceptions for async methods

            function onError(reason) {
                // Details in reason.Message and ex.HResult.       
            }
            // roamingSettings.values["the_complete_total"] = 0;
            var query = Age.where({
            }).read().done(function (results) {

                function my_curr_date() {
                    var currentDate = new Date()
                    var day = currentDate.getDate();
                    var month = currentDate.getMonth() + 1;
                    var year = currentDate.getFullYear();
                    var my_date = month + "-" + day + "-" + year;
                    return my_date;
                }

                function my_curr_time() {
                    var d = new Date();
                    var theHour = d.getHours();
                    d.getMinutes();
                    d.getSeconds();
                    var mid = "am";
                    if (theHour > 12) {
                        mid = "pm";
                        theHour -= 12;
                    } else if (theHour == 12) {
                        mid = "pm";
                    } else if (theHour == 0) {
                        theHour = 12;
                    }
                    var theTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + mid;
                    return theTime;
                }

//2 boosts
                if (roamingSettings.values["Boost2_price"] > 0 && roamingSettings.values["Boost3_price"] <= 0) {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) }, { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"], tax: (roamingSettings.values["Boost2_price"] * .0636) });
//3 boosts
                } else if (roamingSettings.values["Boost3_price"] > 0 && roamingSettings.values["Boost4_price"] <= 0) {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) }, { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"], tax: (roamingSettings.values["Boost2_price"] * .0636) }, { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"], tax: (roamingSettings.values["Boost3_price"] * .0636) });
//4 boosts
                } else if (roamingSettings.values["Boost4_price"] > 0 && roamingSettings.values["Boost5_price"] <= 0) {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) }, { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"], tax: (roamingSettings.values["Boost2_price"] * .0636) }, { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"], tax: (roamingSettings.values["Boost3_price"] * .0636) }, { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"], tax: (roamingSettings.values["Boost4_price"] * .0636) });
//5 boost
                } else if (roamingSettings.values["Boost5_price"] > 0 && roamingSettings.values["Boost6_price"] <= 0) {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) }, { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"], tax: (roamingSettings.values["Boost2_price"] * .0636) }, { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"], tax: (roamingSettings.values["Boost3_price"] * .0636) }, { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"], tax: (roamingSettings.values["Boost4_price"] * .0636) }, { product_id: roamingSettings.values["Boost5_vend"], quantity: 1, price: roamingSettings.values["Boost5_price"], tax: (roamingSettings.values["Boost5_price"] * .0636) });
//6 boost
                } else if (roamingSettings.values["Boost6_price"] > 0 && roamingSettings.values["Boost7_price"] <= 0) {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) }, { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"], tax: (roamingSettings.values["Boost2_price"] * .0636) }, { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"], tax: (roamingSettings.values["Boost3_price"] * .0636) }, { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"], tax: (roamingSettings.values["Boost4_price"] * .0636) }, { product_id: roamingSettings.values["Boost5_vend"], quantity: 1, price: roamingSettings.values["Boost5_price"], tax: (roamingSettings.values["Boost5_price"] * .0636) }, { product_id: roamingSettings.values["Boost6_vend"], quantity: 1, price: roamingSettings.values["Boost6_price"], tax: (roamingSettings.values["Boost6_price"] * .0636) });
//7 boost
                } else if (roamingSettings.values["Boost7_price"] > 0 && roamingSettings.values["Boost8_price"] <= 0) {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) }, { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"], tax: (roamingSettings.values["Boost2_price"] * .0636) }, { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"], tax: (roamingSettings.values["Boost3_price"] * .0636) }, { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"], tax: (roamingSettings.values["Boost4_price"] * .0636) }, { product_id: roamingSettings.values["Boost5_vend"], quantity: 1, price: roamingSettings.values["Boost5_price"], tax: (roamingSettings.values["Boost5_price"] * .0636) }, { product_id: roamingSettings.values["Boost6_vend"], quantity: 1, price: roamingSettings.values["Boost6_price"], tax: (roamingSettings.values["Boost6_price"] * .0636) }, { product_id: roamingSettings.values["Boost7_vend"], quantity: 1, price: roamingSettings.values["Boost7_price"], tax: (roamingSettings.values["Boost7_price"] * .0636) });
//8 boost
                } else if (roamingSettings.values["Boost8_price"] > 0) {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) }, { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"], tax: (roamingSettings.values["Boost2_price"] * .0636) }, { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"], tax: (roamingSettings.values["Boost3_price"] * .0636) }, { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"], tax: (roamingSettings.values["Boost4_price"] * .0636) }, { product_id: roamingSettings.values["Boost5_vend"], quantity: 1, price: roamingSettings.values["Boost5_price"], tax: (roamingSettings.values["Boost5_price"] * .0636) }, { product_id: roamingSettings.values["Boost6_vend"], quantity: 1, price: roamingSettings.values["Boost6_price"], tax: (roamingSettings.values["Boost6_price"] * .0636) }, { product_id: roamingSettings.values["Boost7_vend"], quantity: 1, price: roamingSettings.values["Boost7_price"], tax: (roamingSettings.values["Boost7_price"] * .0636) }, { product_id: roamingSettings.values["Boost8_vend"], quantity: 1, price: roamingSettings.values["Boost8_price"], tax: (roamingSettings.values["Boost8_price"] * .0636) });
//1 boost
                } else {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                       
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) });
                    console.log("Yes its in here");
                }

//'BUG fix for 2nd new order breaking after submit is hit' CODE ABOVE IS FINE... loop is where the break happens below before winjs (winjs never fires)
                var test_array = Array();
                var array_t = Array();
                var i = 0;
                var j = 1;
                while (age_data.model.continue_order_save.length > i) {
                    test_array.push(age_data.model.continue_order_save)
                    //console.log(test_array[0].tax);
                    array_t.push({
                        product_id: test_array[i]['_keyMap'][j]['data'].product_id, quantity: 1, price: test_array[i]['_keyMap'][j]['data'].price, tax: test_array[i]['_keyMap'][j]['data'].tax
                    })
                    //console.log(i);
                    i++;
                    j++;
                }
 
                WinJS.xhr({
                    type: "POST",
                    url: "https://thinkitdrinkit.vendhq.com/api/register_sales",
                    headers: { "Content-type": "application/json" },
                    user: "milo@thinkitdrinkit.com",
                    password: "agave2013",
                    data: JSON.stringify({
                        "register_id": "5ecccd41-3cbc-11e3-a29a-bc305bf5da20",
                        "user_name": "",
                        "customer_id": "",
                        "status": "SAVED",
                        "total_price": roamingSettings.values["the_complete_total"],
                        "total_tax": (roamingSettings.values["the_complete_total"] * .0636),
                        "note": document.getElementById('Cname').value,
                        "register_sale_products": array_t
                    }),
                }).then(function sucess(res) {
                    roamingSettings.values["Invoice_number"] = JSON.parse(res.responseText).register_sale.invoice_number;
                    //milo "I_ordered used in login not so important"
                    roamingSettings.values["I_ordered"] = "yes";
                    roamingSettings.values["not_cont"] = true;
                    roamingSettings.values["went_back"] = true;

                    //milo: testing 2nd new order bug, consolelog does not show up here so error is above
                    //console.log("milo: here");

                    //console.log(roamingSettings.values["Invoice_number"]);
                    roamingSettings.values["the_complete_total"] = 0;
                    roamingSettings.values["theComplete"] = document.getElementById("total").textContent;
      
                    Age.insert({//Nothing is being sent to the database yet
                        Name: "Guest",
                        Base: roamingSettings.values["Base_name"],
                        BaseImage: roamingSettings.values["Base_pic"],
                        BaseID: roamingSettings.values["Base_vend"],
                        BasePrice: roamingSettings.values["Base_price"],
                        Age: roamingSettings.values["Age_name"],
                        AgeImage: roamingSettings.values["Age_pic"],
                        Boost1: roamingSettings.values["Boost1_name"],
                        Boost1Image: roamingSettings.values["Boost1_pic"],
                        Boost1ID: roamingSettings.values["Boost1_vend"],
                        Boost1Price: roamingSettings.values["Boost1_price"],
                        Boost2: roamingSettings.values["Boost2_name"],
                        Boost2Image: roamingSettings.values["Boost2_pic"],
                        Boost2ID: roamingSettings.values["Boost2_vend"],
                        Boost2Price: roamingSettings.values["Boost2_price"],
                        Boost3: roamingSettings.values["Boost3_name"],
                        Boost3Image: roamingSettings.values["Boost3_pic"],
                        Boost3ID: roamingSettings.values["Boost3_vend"],
                        Boost3Price: roamingSettings.values["Boost3_price"],

                        Boost4: roamingSettings.values["Boost4_name"],
                        Boost4Image: roamingSettings.values["Boost4_pic"],
                        Boost4ID: roamingSettings.values["Boost4_vend"],
                        Boost4Price: roamingSettings.values["Boost4_price"],

                        Boost5: roamingSettings.values["Boost5_name"],
                        Boost5Image: roamingSettings.values["Boost5_pic"],
                        Boost5ID: roamingSettings.values["Boost5_vend"],
                        Boost5Price: roamingSettings.values["Boost5_price"],

                        Boost6: roamingSettings.values["Boost6_name"],
                        Boost6Image: roamingSettings.values["Boost6_pic"],
                        Boost6ID: roamingSettings.values["Boost6_vend"],
                        Boost6Price: roamingSettings.values["Boost6_price"],

                        Boost7: roamingSettings.values["Boost7_name"],
                        Boost7Image: roamingSettings.values["Boost7_pic"],
                        Boost7ID: roamingSettings.values["Boost7_vend"],
                        Boost7Price: roamingSettings.values["Boost7_price"],

                        Boost8: roamingSettings.values["Boost8_name"],
                        Boost8Image: roamingSettings.values["Boost8_pic"],
                        Boost8ID: roamingSettings.values["Boost8_vend"],
                        Boost8Price: roamingSettings.values["Boost8_price"],

                        FlavName: roamingSettings.values["FlavSel_name"],
                        FlavImage: roamingSettings.values["FlavSel_pic"],
                        FlavID: roamingSettings.values["FlavSel_vend"],
                        Caloric: roamingSettings.values["Flav_name"],
                        TotalPrice: roamingSettings.values["theComplete"],
                        OrderNumber: roamingSettings.values["Invoice_number"],
                        PurchaseDate: my_curr_date(),
                        TimePurchase: my_curr_time()
                    }).done(function (result) {
                        WinJS.Navigation.navigate('pages/thankyou/thankyou.html');
                        roamingSettings.values["continue_shopping"] = false;
                        roamingSettings.values["the_complete_total"] = 0;
                    }), function (err) {
                        console.log(err);
                    }


                }, function error(err) {
                    console.log("fail", err.responseText)
                });

                //function Delayer() {
                    //setTimeout(function () {
                    //}, 3000);
               // }
               // Delayer()
            })
        },//ends clicked name space
        the_continue: function () {

//2 boosts
                if (roamingSettings.values["Boost2_price"] > 0 && roamingSettings.values["Boost3_price"] <= 0) {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) }, { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"], tax: (roamingSettings.values["Boost2_price"] * .0636) });
//3 boosts
                } else if (roamingSettings.values["Boost3_price"] > 0 && roamingSettings.values["Boost4_price"] <= 0) {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) }, { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"], tax: (roamingSettings.values["Boost2_price"] * .0636) }, { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"], tax: (roamingSettings.values["Boost3_price"] * .0636) });
//4 boosts
                } else if (roamingSettings.values["Boost4_price"] > 0 && roamingSettings.values["Boost5_price"] <= 0) {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) }, { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"], tax: (roamingSettings.values["Boost2_price"] * .0636) }, { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"], tax: (roamingSettings.values["Boost3_price"] * .0636) }, { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"], tax: (roamingSettings.values["Boost4_price"] * .0636) });
//5 boost
                } else if (roamingSettings.values["Boost5_price"] > 0 && roamingSettings.values["Boost6_price"] <= 0) {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) }, { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"], tax: (roamingSettings.values["Boost2_price"] * .0636) }, { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"], tax: (roamingSettings.values["Boost3_price"] * .0636) }, { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"], tax: (roamingSettings.values["Boost4_price"] * .0636) }, { product_id: roamingSettings.values["Boost5_vend"], quantity: 1, price: roamingSettings.values["Boost5_price"], tax: (roamingSettings.values["Boost5_price"] * .0636) });
//6 boost
                } else if (roamingSettings.values["Boost6_price"] > 0 && roamingSettings.values["Boost7_price"] <= 0) {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) }, { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"], tax: (roamingSettings.values["Boost2_price"] * .0636) }, { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"], tax: (roamingSettings.values["Boost3_price"] * .0636) }, { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"], tax: (roamingSettings.values["Boost4_price"] * .0636) }, { product_id: roamingSettings.values["Boost5_vend"], quantity: 1, price: roamingSettings.values["Boost5_price"], tax: (roamingSettings.values["Boost5_price"] * .0636) }, { product_id: roamingSettings.values["Boost6_vend"], quantity: 1, price: roamingSettings.values["Boost6_price"], tax: (roamingSettings.values["Boost6_price"] * .0636) });
//7 boost
                } else if (roamingSettings.values["Boost7_price"] > 0 && roamingSettings.values["Boost8_price"] <= 0) {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) }, { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"], tax: (roamingSettings.values["Boost2_price"] * .0636) }, { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"], tax: (roamingSettings.values["Boost3_price"] * .0636) }, { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"], tax: (roamingSettings.values["Boost4_price"] * .0636) }, { product_id: roamingSettings.values["Boost5_vend"], quantity: 1, price: roamingSettings.values["Boost5_price"], tax: (roamingSettings.values["Boost5_price"] * .0636) }, { product_id: roamingSettings.values["Boost6_vend"], quantity: 1, price: roamingSettings.values["Boost6_price"], tax: (roamingSettings.values["Boost6_price"] * .0636) }, { product_id: roamingSettings.values["Boost7_vend"], quantity: 1, price: roamingSettings.values["Boost7_price"], tax: (roamingSettings.values["Boost7_price"] * .0636) });
//8 boost
                } else if (roamingSettings.values["Boost8_price"] > 0) {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) }, { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"], tax: (roamingSettings.values["Boost2_price"] * .0636) }, { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"], tax: (roamingSettings.values["Boost3_price"] * .0636) }, { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"], tax: (roamingSettings.values["Boost4_price"] * .0636) }, { product_id: roamingSettings.values["Boost5_vend"], quantity: 1, price: roamingSettings.values["Boost5_price"], tax: (roamingSettings.values["Boost5_price"] * .0636) }, { product_id: roamingSettings.values["Boost6_vend"], quantity: 1, price: roamingSettings.values["Boost6_price"], tax: (roamingSettings.values["Boost6_price"] * .0636) }, { product_id: roamingSettings.values["Boost7_vend"], quantity: 1, price: roamingSettings.values["Boost7_price"], tax: (roamingSettings.values["Boost7_price"] * .0636) }, { product_id: roamingSettings.values["Boost8_vend"], quantity: 1, price: roamingSettings.values["Boost8_price"], tax: (roamingSettings.values["Boost8_price"] * .0636) });
//1 boost
                } else {
                    age_data.model.continue_order_save.push({
                        product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"], tax: (roamingSettings.values["Base_price"] * .0636)
                    }, { product_id: roamingSettings.values["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"], tax: (roamingSettings.values["FlavSel_price"] * .0636) }, { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"], tax: (roamingSettings.values["Boost1_price"] * .0636) });
                }

            roamingSettings.values["not_cont"] = false;
            console.log(roamingSettings.values["Base_vend"] + ' ' + roamingSettings.values["Boost1_vend"]);
            roamingSettings.values["went_back"] = true;
            WinJS.Navigation.navigate('pages/launch_page/launch_page.html');
        },

        grayOut: function () {
            document.getElementById("sub_button").style.opacity = (.2);
        }

    })
})();
