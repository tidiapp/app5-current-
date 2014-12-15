// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var num = 0;
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Base");
    var keepInfo = true;

    WinJS.UI.Pages.define("/pages/base/base.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getBase();
            design.changeTextColor();
            document.getElementById("home").removeAttribute("hidden");
            var id_sel = roamingSettings.values["Id_sel_func"];
            var cat_selected = roamingSettings.values["Cat_picked"];

            //milo: footer history & H1
            if (roamingSettings.values["Cat_picked"] === "Fitness & Exercise") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img5"];
                document.getElementById("choosen_age3").textContent = "Select Your Base For " + roamingSettings.values["Age_name"] + ".";
                document.getElementById("where_you_are2").textContent = "You have choosen " + roamingSettings.values["Age_name"] + "." + " You have 2 steps left.";
            }

            //milo: footer history & H1 
            //milo: Bug fixed here if you go down fitness & Energy, Recovery shows up which is the same as going from Protein catagory, The app was getting confused the path it came from this if else helps with footer cookie issues.  
            if (roamingSettings.values["Cat_picked"] === "Protein" || id_sel == 1 || id_sel == 2 || id_sel == 4 || id_sel == 5 || id_sel == 6) {
                if (roamingSettings.values["Cat_picked"] === "Protein") {
                    //milo: Cat_picked_img2 image from Protein
                    document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img2"];
                    document.getElementById("where_you_are2").textContent = "You have choosen " + roamingSettings.values["Func_name"] + "." + " You have 2 steps left.";

                } else {
                    //milo: Cat_picked_img5 image from Fitness & Exercise
                    //document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img5"];

                }
                document.getElementById("choosen_age3").textContent = "Select Your " + "Protein For " + roamingSettings.values["Func_name"] + ".";
                document.getElementById("func_div").removeAttribute("hidden");
            }

            //milo: footer history & H1
            if (roamingSettings.values["Cat_picked"] === "Competitive Sports") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img4"];
            }

            //milo: footer history & H1
            if (roamingSettings.values["Cat_picked"] === "Energy") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img"];
            }

            //milo: footer history 
            document.getElementById("age_p").textContent = roamingSettings.values["Cat_picked"];
            document.getElementById("home_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("home_p").textContent = roamingSettings.values["Age_name"];
            document.getElementById("home_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("func_p").textContent = roamingSettings.values["Func_name"];
            document.getElementById("func_pic").src = roamingSettings.values["Func_pic"];

            server.base(id_sel, cat_selected);

            document.getElementById("base_price_div").removeAttribute("hidden");
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            //using the removeInfo.js file to delete the last object of the array as long as an item exists
            remove.pop_list(age_data.model.base);
            //milo: removing keepInfo data when back button is used from func page.
            remove.pop_list(age_data.model.info_page4);
            //roamingSettings.values["Count"] = "";
            if (!keepInfo) {
                remove.pop_list(age_data.model.info_page2)
            }
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />
            // TODO: Respond to changes in layout.
        }
    });

    var base3 = "";
    WinJS.Namespace.define("base_clicked", {

        clicked: function (base) {
            remove.pop_list(age_data.model.info_page2);
            var updated_base = base.replace(/^\s+/, '').replace(/\s+$/, '');
            base3 = updated_base;
            server.base_sub(updated_base);
            //milo: if msg "not available please pick another base" stays clear it here when they click on the next boost ( this would be after base_clicked.next_page_flavor fired )
        },

        next_page_flavor: function () {
                keepInfo = true;
                var vendId = document.getElementById("b_vend").innerHTML;
                var vendId_count = document.getElementById("b_vend_count").innerHTML;
                roamingSettings.values["Base_protein"] = false;
                roamingSettings.values["Base_Vend"] = vendId;
                roamingSettings.values["Base_name"] = base3;
                roamingSettings.values["Base_pic"] = document.getElementById("choosen_base_carry").src;
                roamingSettings.values["Base_info"] = document.getElementById("sel_base_info").textContent;
                roamingSettings.values["Base_price"] = document.getElementById("base_price").textContent;
                roamingSettings.values["Base_label"] = document.getElementById("sel_base_pic").src;
                roamingSettings.values["Id_sel_base"] = document.getElementById("id_sel3").textContent;

                //console.log("Base page picked id = " + roamingSettings.values["Id_sel_base"]);
                
            //milo: the following makes a call to vend to check if we have enough product for the order if low it will not allow to move on. 
                if (vendId != "" && vendId != "null") {

                    //

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
                        //console.log("Base Count from VEND ", vendCount);
                        if (vendCount >= 1.00000) {
                            WinJS.Navigation.navigate('pages/boost/boost.html')
                        } else if (vendCount <= 0.00000) {
                            document.getElementById("out_of_stock").removeAttribute("hidden");
                            document.getElementById("out_of_stock").textContent = "OUT OF STOCK, PLEASE PICK ANOTHER BASE";
                            document.getElementById("out_of_stock").style.color = "red";
                            document.getElementById("out_of_stock").style.fontSize = "20px";
                            document.getElementById("out_of_stock").style.marginTop = "120px";
                            document.getElementById("out_of_stock").style.marginLeft = "290px";
                            document.getElementById("out_of_stock").style.position = "Absolute";
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
                    //WinJS.Navigation.navigate('pages/boost/boost.html')
                }
        },

        more_info: function (clicked) {
            roamingSettings.values["Item_choosen"] = clicked;
            roamingSettings.values["Clicked_cat"] = "Base";
            WinJS.Navigation.navigate('pages/item_info/item_info.html');
            keepInfo = true;
        },

        //milo: recvery catagory has a func page and needs to jump 2 some other catagories dont have a func page so just need to jump 1.
        footer_click: function () {
            var id_sel_footer = roamingSettings.values["Id_sel_func"];

            if (id_sel_footer == 25 || id_sel_footer == 26 || id_sel_footer == 27 || id_sel_footer == 28) {
                WinJS.Navigation.back(1);

            } else {
                WinJS.Navigation.back(2);
            }
        },

        footer_click2: function () {
            var cat_selected_footer = roamingSettings.values["Cat_picked"];
            var id_sel_footer = roamingSettings.values["Id_sel_func"];

            if (cat_selected_footer === "Fitness & Exercise" && (id_sel_footer == 25 || id_sel_footer == 26 || id_sel_footer == 27 || id_sel_footer == 28)) {
                WinJS.Navigation.back(2);

            } else {
                WinJS.Navigation.back(3);
            }
        }

    })

})();
