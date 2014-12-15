// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Flavor");
    var keepInfo = true;

    WinJS.UI.Pages.define("/pages/flav_sel/flav_sel.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getFlavSel();
            design.changeTextColor();
            var id_sel = roamingSettings.values["Id_sel_func"];

            document.getElementById("age_p").textContent = "Age: " + roamingSettings.values["Age_name"];
            document.getElementById("base_p").textContent = "Base: " + roamingSettings.values["Base_name"];

            //milo: footer history 
            if (roamingSettings.values["Cat_picked"] === "Fitness & Exercise") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img5"];
            }
           
            //milo: footer history 
            if (roamingSettings.values["Cat_picked"] === "Energy") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img"];
            }

            //milo: footer history 
            // id_sel might have been for Recovery 
            if (roamingSettings.values["Cat_picked"] === "Protein" || id_sel == 1) {
                if (roamingSettings.values["Cat_picked"] === "Protein") {
                    document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img2"];
                } else {
                    document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img5"];
                }
                document.getElementById("func_div").removeAttribute("hidden");
            }

            //milo: footer history 
            if (roamingSettings.values["Cat_picked"] === "Competitive Sports") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img4"];
            }

            //milo: footer history 
            document.getElementById("age_p").textContent = roamingSettings.values["Cat_picked"];
            document.getElementById("home_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("home_p").textContent = roamingSettings.values["Age_name"];
            document.getElementById("home_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("func_p").textContent = roamingSettings.values["Func_name"];
            document.getElementById("func_pic").src = roamingSettings.values["Func_pic"];

            document.getElementById("base_p").textContent = roamingSettings.values["Base_name"];
            document.getElementById("base_pic").src = roamingSettings.values["Base_pic"];
            document.getElementById("base_price_prev2").textContent = roamingSettings.values["Base_price"];

            document.getElementById("boost_price_prev1").textContent = roamingSettings.values["Boost1_price"];
            document.getElementById("boost_price_prev2").textContent = roamingSettings.values["Boost2_price"];
            document.getElementById("boost_price_prev3").textContent = roamingSettings.values["Boost3_price"];
            document.getElementById("boost_price_prev4").textContent = roamingSettings.values["Boost4_price"];
            document.getElementById("boost_price_prev5").textContent = roamingSettings.values["Boost5_price"];
            document.getElementById("boost_price_prev6").textContent = roamingSettings.values["Boost6_price"];
            document.getElementById("boost_price_prev7").textContent = roamingSettings.values["Boost7_price"];
            document.getElementById("boost_price_prev8").textContent = roamingSettings.values["Boost8_price"];

            document.getElementById("boost_p").textContent = roamingSettings.values["Boost1_name"];
            document.getElementById("boost_p2").textContent = roamingSettings.values["Boost2_name"];
            document.getElementById("boost_p3").textContent = roamingSettings.values["Boost3_name"];
            document.getElementById("boost_p4").textContent = roamingSettings.values["Boost4_name"];
            document.getElementById("boost_p5").textContent = roamingSettings.values["Boost5_name"];
            document.getElementById("boost_p6").textContent = roamingSettings.values["Boost6_name"];
            document.getElementById("boost_p7").textContent = roamingSettings.values["Boost7_name"];
            document.getElementById("boost_p8").textContent = roamingSettings.values["Boost8_name"];

            if (roamingSettings.values["Boost1_name"] != "") { document.getElementById("boost_div").removeAttribute("hidden"); };
            if (roamingSettings.values["Boost2_name"] != "") { document.getElementById("boost_div2").removeAttribute("hidden"); };
            if (roamingSettings.values["Boost3_name"] != "") { document.getElementById("boost_div3").removeAttribute("hidden"); };
            if (roamingSettings.values["Boost4_name"] != "") { document.getElementById("boost_div4").removeAttribute("hidden"); };
            if (roamingSettings.values["Boost5_name"] != "") { document.getElementById("boost_div5").removeAttribute("hidden"); };
            if (roamingSettings.values["Boost6_name"] != "") { document.getElementById("boost_div6").removeAttribute("hidden"); };
            if (roamingSettings.values["Boost7_name"] != "") { document.getElementById("boost_div7").removeAttribute("hidden"); };
            if (roamingSettings.values["Boost8_name"] != "") { document.getElementById("boost_div8").removeAttribute("hidden"); };

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

                roamingSettings.values['Boost_total_footer'] = (parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values["Boost1_price"]) + parseFloat(roamingSettings.values["Boost2_price"]) + parseFloat(roamingSettings.values["Boost3_price"]) + parseFloat(roamingSettings.values["Boost4_price"]) + parseFloat(roamingSettings.values["Boost5_price"]) + parseFloat(roamingSettings.values["Boost6_price"]) + parseFloat(roamingSettings.values["Boost7_price"]) + parseFloat(roamingSettings.values["Boost8_price"]));
                document.getElementById("base_price_total").textContent = roamingSettings.values['Boost_total_footer'];
            }

            //milo: footer history 
            document.getElementById("where_you_are3").textContent = "You have choosen " + roamingSettings.values["Boost_total_num"] + " Boosts.";

            //milo: was looping to show 4 boosts in 1 box
            //document.getElementById("boost_p").innerHTML = roamingSettings.values["Boost1_name"] + "<br>" + roamingSettings.values["Boost2_name"] + "<br>" + roamingSettings.values["Boost3_name"] + "<br>" + roamingSettings.values["Boost4_name"];
            //var boosts = [roamingSettings.values["Boost1_name"], roamingSettings.values["Boost2_name"], roamingSettings.values["Boost3_name"], roamingSettings.values["Boost4_name"], roamingSettings.values["Boost5_name"], roamingSettings.values["Boost6_name"], roamingSettings.values["Boost7_name"], roamingSettings.values["Boost8_name"]];
            //    var text = "";
            //    var i;

            //    for (i = 0; i < boosts.length; i++) {
            //        text += boosts[i] + "<br>";
            //    }
            //    document.getElementById("boost_p").innerHTML = text;

            document.getElementById("flav_sel_header").textContent = "Choose Your " + "Flavor.";

            server.flav_sel();
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
                remove.pop_list(age_data.model.flavor1);
            
            if (!keepInfo) {
                remove.pop_list(age_data.model.info_page4);
            }
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
    var the_choosenFlav = "";
    WinJS.Namespace.define("flav_sel_clicked", {
      
        clicked: function (flav1) {
            var updated_flav1 = flav1.replace(/^\s+/, '').replace(/\s+$/, '');

            remove.pop_list(age_data.model.info_page4);
            the_choosenFlav = updated_flav1;
            server.flav_sel_sub(updated_flav1);
        },

        next_page_boost: function () {
            keepInfo = true;
            roamingSettings.values["FlavSel_name"] = the_choosenFlav;
            roamingSettings.values["FlavSel_pic"] = document.getElementById("hidden_flav_pic").src;
            roamingSettings.values["FlavSel_vend"] = document.getElementById("f_vend").textContent;
            var vendId = roamingSettings.values["FlavSel_vend"];
            var vendId_count = document.getElementById("f_vend_count").textContent;
            roamingSettings.values["FlavSel_info"] = null;
            roamingSettings.values["FlavSel_price"] = 0;
            roamingSettings.values["FlavSel_label"] = document.getElementById("flav_sel_sel_pic").src;

            //milo: the following makes a call to vend to check if we have enough product for the order if low it will not allow to move on. 
            if (vendId != "" && vendId != "null") {

                WinJS.xhr({
                    //milo: using POST but not passing anything to vend until .then at which point it reads the api product inventory count and displays it back.  
                    type: "POST",
                    url: "https://thinkitdrinkit.vendhq.com/api/products",
                    user: "milo@thinkitdrinkit.com",
                    password: "agave2013",
                    headers: { "Content-type": "application/json" },
                    data: JSON.stringify({
                        //milo: in this object its the id part >>> GET /api/register_sales/{id} >>> that VEND wants which is below
                        "id": vendId,
                        "inventory": [{
                        }]
                    }),
                }).then(function sucess(res) {
                    //milo: below allows the real GET which is the count to come back to app. Notes accessing json>>> http://www.mkyong.com/javascript/how-to-access-json-object-in-javascript/
                    var vendCount = JSON.parse(res.responseText).product.inventory[0].count;
                    console.log("Flavor Count from VEND ", vendCount);
                    if (vendCount >= 1.00000) {
                        WinJS.Navigation.navigate('pages/final/final.html')
                    } else if (vendCount <= 0.00000) {
                        document.getElementById("out_of_stock2").removeAttribute("hidden");
                        document.getElementById("out_of_stock2").textContent = "OUT OF STOCK, PLEASE PICK ANOTHER FLAVOR";
                        document.getElementById("out_of_stock2").style.color = "red";
                        document.getElementById("out_of_stock2").style.fontSize = "20px";
                        document.getElementById("out_of_stock2").style.marginTop = "120px";
                        document.getElementById("out_of_stock2").style.marginLeft = "290px";
                        document.getElementById("out_of_stock2").style.position = "Absolute";
                    }
                }, function error(err) {
                    console.log("fail", err.responseText)
                });
            } else if (vendId == "null" || vendId == undefined || vendId == "") {
                document.getElementById("out_of_stock2").removeAttribute("hidden");
                document.getElementById("out_of_stock2").textContent = "ID Missing in DB or Vend product does not exist.";
                document.getElementById("out_of_stock2").style.color = "red";
                document.getElementById("out_of_stock2").style.fontSize = "20px";
                document.getElementById("out_of_stock2").style.marginTop = "120px";
                document.getElementById("out_of_stock2").style.marginLeft = "290px";
                document.getElementById("out_of_stock2").style.position = "Absolute";
                //WinJS.Navigation.navigate('pages/final/final.html')
            }
        },
        more_info: function (clicked) {
            roamingSettings.values["Item_choosen"] = clicked;
            roamingSettings.values["Clicked_cat"] = "Flavor";
            WinJS.Navigation.navigate('pages/item_info/item_info.html');
            keepInfo = true;
        },

        //milo: recvery catagory has a func page and needs to jump 2 some other catagories dont have a func page so just need to jump 1.
        footer_click: function () {
            var id_sel_footer = roamingSettings.values["Id_sel_func"];

            if (id_sel_footer == 25 || id_sel_footer == 26 || id_sel_footer == 27 || id_sel_footer == 28) {
                WinJS.Navigation.back(3);

            } else {
                WinJS.Navigation.back(4);
            }
        }


    })

})();
