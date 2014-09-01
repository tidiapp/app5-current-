// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var num = 0;
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Base");
    var keepInfo = true;
    var the_sel_age;

    WinJS.UI.Pages.define("/pages/base/base.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getBase();
            design.changeTextColor();
            document.getElementById("home").removeAttribute("hidden");
            var the_sel_age = roamingSettings.values["Func_name"];
            document.getElementById("choosen_age").textContent = "Choose your " + roamingSettings.values["Func_name"] + " Base";

            //milo: footer history 
            if (roamingSettings.values["Cat_picked"] === "Nutritional") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img"];
            }
            //milo: footer history 
            if (roamingSettings.values["Cat_picked"] === "Protein") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img2"];
            }
            //milo: footer history 
            document.getElementById("age_p").textContent = roamingSettings.values["Cat_picked"];
            document.getElementById("home_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("home_p").textContent = roamingSettings.values["Age_name"];
            document.getElementById("home_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("func_p").textContent = roamingSettings.values["Func_name"];
            document.getElementById("func_pic").src = roamingSettings.values["Func_pic"];
            document.getElementById("where_you_are2").textContent = "You have choosen the " + roamingSettings.values["Func_name"] + " Function." + " You have 2 steps left.";

            server.base(the_sel_age);

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.base);
            //using the removeInfo.js file to delete the last object of the array as long as an item exists
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
        },

        next_page_flavor: function () {
            keepInfo = false;
           
            WinJS.Navigation.navigate('pages/flav_sel/flav_sel.html')
            roamingSettings.values["Base_protein"] = false;
            roamingSettings.values["Base_name"] = base3;
            roamingSettings.values["Base_Vend"] = document.getElementById("b_vend").textContent;
            roamingSettings.values["Base_pic"] = document.getElementById("choosen_base_carry").src;
            roamingSettings.values["Base_info"] = document.getElementById("sel_base_info").textContent;
            roamingSettings.values["Base_price"] = document.getElementById("base_price").textContent;
            roamingSettings.values["Base_label"] = document.getElementById("sel_base_pic").src;
            
        },

        more_info: function (clicked) {
            roamingSettings.values["Item_choosen"] = clicked;
            roamingSettings.values["Clicked_cat"] = "Base";
            WinJS.Navigation.navigate('pages/item_info/item_info.html');
            keepInfo = true;
        }
    })

})();
