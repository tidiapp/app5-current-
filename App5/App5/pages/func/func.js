// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var num = 0;
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Func");
    var keepInfo = true;
    var the_sel_func;

    WinJS.UI.Pages.define("/pages/func/func.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getFunc();
            design.changeTextColor();
            //milo
            var id_sel = roamingSettings.values["Id_sel_age"];
            //console.log("Func page picked id READY() = " + roamingSettings.values["Id_sel_age"]);
            document.getElementById("choosen_age2").textContent = "Select Your " + roamingSettings.values["Age_name"] + " Goal.";
            document.getElementById("home").removeAttribute("hidden");

                //milo: footer history 
                if (roamingSettings.values["Cat_picked"] === "Customize A Functional Drink Mix") {
                    document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img"];
                }
                //milo: footer history 
                if (roamingSettings.values["Cat_picked"] === "Customize A Protein Drink Mix") {
                    document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img2"];
                }
                if (roamingSettings.values["Cat_picked"] === "Customize A Sport Drink Mix") {
                    document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img4"];
                }
                //milo: footer history 
                document.getElementById("age_p").textContent = roamingSettings.values["Cat_picked"];
                document.getElementById("home_pic").src = roamingSettings.values["Age_pic"];
                document.getElementById("home_p").textContent = roamingSettings.values["Age_name"];
                document.getElementById("home_pic").src = roamingSettings.values["Age_pic"];
                document.getElementById("where_you_are1").textContent = "You have choosen the " + roamingSettings.values["Age_name"] + " Goal." + " You have 3 steps left.";

                server.func(id_sel);

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            //using the removeInfo.js file to delete the last object of the array as long as an item exists
            remove.pop_list(age_data.model.func);
            //milo: removing keepInfo data when back button is used from func page.
            remove.pop_list(age_data.model.info_page2)
            if (keepInfo === false) {
                remove.pop_list(age_data.model.info_page2_func);
            } 
        },

        updateLayout: function (element) {
            // TODO: Respond to changes in layout.
        }
    });

    var func3 = "";
    WinJS.Namespace.define("func_clicked", {

        clicked: function (func) {
            remove.pop_list(age_data.model.info_page2_func);
            var updated_func = func.replace(/^\s+/, '').replace(/\s+$/, '');
            func3 = updated_func;
            server.func_sub(updated_func);
        },

        next_page_flavor: function () {
            keepInfo = false;
            WinJS.Navigation.navigate('pages/base/base.html')
            roamingSettings.values["Func_name"] = func3;
            roamingSettings.values["Func_pic"] = document.getElementById("choosen_func_carry").src;
            roamingSettings.values["Func_info"] = document.getElementById("sel_func_info").textContent;
            roamingSettings.values["Func_price"] = document.getElementById("func_price").textContent;
            roamingSettings.values["Func_label"] = document.getElementById("sel_func_pic").src;
            roamingSettings.values["Id_sel_func"] = document.getElementById("id_sel2").textContent;
            console.log("Func page picked id = " + roamingSettings.values["Id_sel_func"]);
        },

        more_info: function (clicked) {
            roamingSettings.values["Item_choosen"] = clicked;
            roamingSettings.values["Clicked_cat"] = "func";
            WinJS.Navigation.navigate('pages/item_info/item_info.html');
            keepInfo = true;
        }
    })

})();
