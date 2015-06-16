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
            design.changeTextColor();
            design.getFlavSel();
            design.getFlavSelBorders("white");
            server.finalPageCall();//if this moved to any other page and final page is not after this page then if will have a bug "BasePrice missing"

            var id_sel = roamingSettings.values["Id_sel_func"];

            document.getElementById("age_p").textContent = "Age: " + roamingSettings.values["Age_name"];
            document.getElementById("base_p").textContent = "Base: " + roamingSettings.values["Base_name"];

            //milo: footer history 
            document.getElementById("age_p").textContent = roamingSettings.values["Cat_picked"];
            document.getElementById("home_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("home_p").textContent = roamingSettings.values["Age_name"];
            document.getElementById("home_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("func_p").textContent = roamingSettings.values["Func_name"];
            document.getElementById("func_pic").src = roamingSettings.values["Func_pic"];
            document.getElementById("base_p").textContent = roamingSettings.values["Base_name"];
            document.getElementById("base_pic").src = roamingSettings.values["Base_pic"];

            //milo: footer history 
            if (roamingSettings.values["Cat_picked"] === "Fitness & Exercise") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img5"];
            }
           
            //milo: footer history 
            if (roamingSettings.values["Cat_picked"] === "Energy" || roamingSettings.values["Cat_picked"] === "Weight Management" || roamingSettings.values["Cat_picked"] === "Lifestyle Diets" || roamingSettings.values["Cat_picked"] === "Wellness" || roamingSettings.values["Cat_picked"] === "Beauty") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img"];
                document.getElementById("home_div").setAttribute("hidden");
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
                document.getElementById("home2_div").removeAttribute("hidden");
                document.getElementById("home2_p").textContent = roamingSettings.values["Home2_name"];
                document.getElementById("home2_pic").src = roamingSettings.values["Home2_pic"];

            }

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

            if (roamingSettings.values["Boost1_name"] != "") { document.getElementById("boost_div").removeAttribute("hidden"); document.getElementById("boost_pic").src = roamingSettings.values["Boost1_pic"]; };
            if (roamingSettings.values["Boost2_name"] != "") { document.getElementById("boost_div2").removeAttribute("hidden"); document.getElementById("boost_pic2").src = roamingSettings.values["Boost2_pic"]; };
            if (roamingSettings.values["Boost3_name"] != "") { document.getElementById("boost_div3").removeAttribute("hidden"); document.getElementById("boost_pic3").src = roamingSettings.values["Boost3_pic"]; };
            if (roamingSettings.values["Boost4_name"] != "") { document.getElementById("boost_div4").removeAttribute("hidden"); document.getElementById("boost_pic4").src = roamingSettings.values["Boost4_pic"]; };
            if (roamingSettings.values["Boost5_name"] != "") { document.getElementById("boost_div5").removeAttribute("hidden"); document.getElementById("boost_pic5").src = roamingSettings.values["Boost5_pic"]; };
            if (roamingSettings.values["Boost6_name"] != "") { document.getElementById("boost_div6").removeAttribute("hidden"); document.getElementById("boost_pic6").src = roamingSettings.values["Boost6_pic"]; };
            if (roamingSettings.values["Boost7_name"] != "") { document.getElementById("boost_div7").removeAttribute("hidden"); document.getElementById("boost_pic7").src = roamingSettings.values["Boost7_pic"]; };
            if (roamingSettings.values["Boost8_name"] != "") { document.getElementById("boost_div8").removeAttribute("hidden"); document.getElementById("boost_pic8").src = roamingSettings.values["Boost8_pic"]; };

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

            document.getElementById("flav_sel_header").textContent = "Choose Your " + "Flavor.";
          
            server.flav_sel();

            if (!roamingSettings.values["not_cont"]) {
                //document.getElementById("thewordsforcurrentprice").removeAttribute("hidden");
                //document.getElementById("price_prev_div_total").setAttribute("hidden");
                //document.getElementById("base_price_total").setAttribute("hidden");
            }

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
                remove.pop_list(age_data.model.flavor1);
                roamingSettings.values['Boost_total_footer'] = "";
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
            document.getElementById("hide_this_flav").setAttribute("hidden", true);

        },

        next_page_boost: function () {
            keepInfo = true;
            roamingSettings.values["FlavSel_name"] = the_choosenFlav;
            roamingSettings.values["FlavSel_pic"] = document.getElementById("hidden_flav_pic").src;
            roamingSettings.values["FlavSel_vend"] = document.getElementById("f_vend").textContent;
            var vendId = roamingSettings.values["FlavSel_vend"];
            roamingSettings.values["FlavSel_info"] = null;
            roamingSettings.values["FlavSel_price"] = 0;
            roamingSettings.values["FlavSel_label"] = document.getElementById("flav_sel_sel_pic").src;

            //milo: the following makes a call to vend to check if we have enough product for the order if low it will not allow to move on. 
            if (vendId != "" && vendId != "null") {

                WinJS.xhr({
                    type: "POST",
                    headers: {
                        "Authorization": "Bearer" + " " + roamingSettings.values["Token"],
                        "Content-type": "application/json"
                    },
                    url: "https://thinkitdrinkit.vendhq.com/api/products",
                    data: JSON.stringify({
                        "id": vendId,
                        "inventory": [{
                        }]
                    }),

                }).done(function completed(result) {
                    console.log(result);
                    //milo: below allows the real GET which is the count to come back to app. Notes accessing json>>> http://www.mkyong.com/javascript/how-to-access-json-object-in-javascript/

                    var vendIdIssue = JSON.parse(result.responseText).product;
                    if (vendIdIssue == undefined) {//Vend product missing entirly even though there might be a id in azures db
                        document.getElementById("out_of_stock2").removeAttribute("hidden");
                        document.getElementById("out_of_stock2").textContent = "VEND product does not exist in VENDS website";
                    } else {
                        var vendCount = JSON.parse(result.responseText).product.inventory[0].count;
                        //console.log("Base Count from VEND ", vendCount);
                        if (vendCount >= 1.00000) {
                            WinJS.Navigation.navigate('pages/final/final.html')
                        } else if (vendCount <= 0.00000) {//If all works this is the check that looks for missing not enough quantity 
                            document.getElementById("out_of_stock").removeAttribute("hidden");
                            document.getElementById("out_of_stock").textContent = "OUT OF STOCK, PLEASE PICK ANOTHER BASE";
                        }
                    }
                },
                 function error(err) {
                     // handle error conditions.
                     //console.log("GET fail", err.responseText)
                     if (err.readyState === 0) {
                         console.log("GET Request not initialized ");
                     }
                     else if (err.readyState === 1) {
                         console.log("GET Server connection established");
                     }
                     else if (err.readyState === 2) {
                         console.log("GET Request received");
                     }
                     else if (err.readyState === 3) {
                         console.log("GET Processing request");
                     }
                     else if (err.readyState === 4 && err.status === 200) {
                         console.log("GET Request finished response is ready and " + "status 200: OK");
                     }
                     else if (err.readyState === 4 && err.status === 400) {
                         console.log("GET Bad Request " + "status 400: Bad Request");
                     }
                     else if (err.readyState === 4 && err.status === 404) {
                         console.log("GET Request finished and response is ready but " + "status 404: Page not found");
                     }
                     else if (err.status === 401) {
                         console.log("GET status 401: User ID and password were invalid maybe because of VEND's expired TOKEN");
                         //milo: fires off when VEND expires the token 
                         //roamingSettings.values["Token"] = "";
                         //refreshTokenSwitch();
                     }
                 });
            } else if (vendId == "null" || vendId == undefined || vendId == "") {
                document.getElementById("out_of_stock2").removeAttribute("hidden");
                document.getElementById("out_of_stock2").textContent = "ID Missing in Azure DB.";
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
        },

        footer_click3: function () {
            var cat_selected_footer = roamingSettings.values["Cat_picked"];
            var id_sel_footer = roamingSettings.values["Id_sel_age"];

            if (cat_selected_footer === "Competitive Sports" && id_sel_footer == 1) {
                WinJS.Navigation.back(5);
                //milo: fixes small bug 
                roamingSettings.values["Id_sel_age"] = "";

            } else {
                WinJS.Navigation.back(4);
            }
        },

        footer_click4: function () {
            var cat_selected_footer = roamingSettings.values["Cat_picked"];
            var id_sel_footer = roamingSettings.values["Id_sel_age"];

            if (cat_selected_footer === "Competitive Sports" && id_sel_footer == 1) {
                WinJS.Navigation.back(6);

            } else {
                WinJS.Navigation.back(5);
            }
        }
    })
})();
