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

            document.getElementById("age_p").textContent = "Age: " + roamingSettings.values["Age_name"];
            document.getElementById("base_p").textContent = "Base: " + roamingSettings.values["Base_name"];
           

                //milo: footer history 
                if (roamingSettings.values["Cat_picked"] === "Energy") {
                    document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img"];
                }
                //milo: footer history 
                if (roamingSettings.values["Cat_picked"] === "Protein") {
                    document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img2"];
                }
                if (roamingSettings.values["Cat_picked"] === "Specific Sports") {
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
                document.getElementById("base_price_prev").textContent = roamingSettings.values["Base_price"];
                document.getElementById("where_you_are3").textContent = "You have choosen the " + roamingSettings.values["Base_name"] + " Base." + " You have 1 steps left.";

                //document.getElementById("boost_p").textContent = roamingSettings.values["missing      "];
                //document.getElementById("boost_pic").src = roamingSettings.values["missing      must be total"];


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
            var vendId_count = document.getElementById("f_vend_count").textContent;
            roamingSettings.values["FlavSel_info"] = null;
            roamingSettings.values["FlavSel_price"] = null;
            roamingSettings.values["FlavSel_label"] = document.getElementById("flav_sel_sel_pic").src;

            //milo: the following makes a call to vend to check if we have enough product for the order if low it will not allow to move on. 
            if (vendId_count != "" && vendId_count != "null") {

                WinJS.xhr({
                    //milo: using POST but not passing anything to vend until .then at which point it reads the api product inventory count and displays it back.  
                    type: "POST",
                    url: "https://thinkitdrinkit.vendhq.com/api/products",
                    user: "milo@thinkitdrinkit.com",
                    headers: { "Content-type": "application/json" },
                    //password: "********",
                    data: JSON.stringify({
                        //milo: in this object its the id part >>> GET /api/register_sales/{id} >>> that VEND wants which is below
                        "id": vendId_count,
                        "inventory": [{
                        }]
                    }),
                }).then(function sucess(res) {
                    //milo: below allows the real GET which is the count to come back to app. Notes accessing json>>> http://www.mkyong.com/javascript/how-to-access-json-object-in-javascript/
                    var vendCount = JSON.parse(res.responseText).product.inventory[0].count;
                    console.log("Flavor Count from VEND ", vendCount);
                    if (vendCount >= 14.00000) {
                        WinJS.Navigation.navigate('pages/final/final.html')
                    } else if (vendCount <= 13.00000) {
                        document.getElementById("out_of_stock2").removeAttribute("hidden");
                        document.getElementById("out_of_stock2").textContent = "OUT OF STOCK, PLEASE PICK ANOTHER FLAVOR";
                        document.getElementById("out_of_stock2").style.color = "red";
                        document.getElementById("out_of_stock2").style.fontSize = "20px";
                        document.getElementById("out_of_stock2").style.marginTop = "115px";
                        document.getElementById("out_of_stock2").style.marginLeft = "263px";
                        document.getElementById("out_of_stock2").style.position = "Absolute";
                    }
                }, function error(err) {
                    console.log("fail", err.responseText)
                });
            } else {
                WinJS.Navigation.navigate('pages/final/final.html')
            }
        },
        more_info: function (clicked) {
            roamingSettings.values["Item_choosen"] = clicked;
            roamingSettings.values["Clicked_cat"] = "Flavor";
            WinJS.Navigation.navigate('pages/item_info/item_info.html');
            keepInfo = true;
        }

    })

})();
