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
            var the_sel_func = roamingSettings.values["Age_name"];
            document.getElementById("choosen_age").textContent = "Whats your " + roamingSettings.values["Age_name"] + " Goal.";
            document.getElementById("home").removeAttribute("hidden");
            //document.getElementById("age_p").textContent = the_sel_func;
            document.getElementById("home1_p").textContent = the_sel_func;

            //document.getElementById("func_price").removeAttribute("hidden");
            //milo: PASSED ON FROM PREVIOS PAGE 
            //roamingSettings.values["Age_name"]
            //roamingSettings.values["Age_pic"]
            //roamingSettings.values["Age_info"]
            //roamingSettings.values["Age_price"]
            if (roamingSettings.values["Cat_picked"] === "Nutritional") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img"];
                document.getElementById("age_p").textContent = roamingSettings.values["Cat_picked"];
            }

            if (roamingSettings.values["Cat_picked"] === "Protein") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img2"];
                document.getElementById("age_p").textContent = roamingSettings.values["Cat_picked"];
            }



            if (roamingSettings.values["Age_name"] === "Sports Protein") {
                //age_pic is really the catagory image that was picked previously
                document.getElementById("home1_p").textContent = roamingSettings.values["Age_name"];
                document.getElementById("home1_pic").src = roamingSettings.values["Age_pic"];

                document.getElementById("where_you_are").textContent = "You have choosen the " + roamingSettings.values["Age_name"] + " function." + " You have 3 steps left.";
            }

            if (roamingSettings.values["Age_name"] === "Lifestyle Protein") {
                document.getElementById("home1_pic").src = roamingSettings.values["Age_pic"];
                document.getElementById("where_you_are").textContent = "You have choosen the " + roamingSettings.values["Age_name"] + " function." + " You have 3 steps left.";
            }

            //if (the_sel_func === "Nutrigenetics") {
            //    document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img3"];
            //    document.getElementById("where_you_are").textContent = "You have choosen the " + roamingSettings.values["Age_name"] + " catagory." + " You have 2 steps left.";
            //    document.getElementById("choosen_age").textContent = "Choose Your Test Kit";
            //}
            //document.getElementById("age_pic").src = roamingSettings.values["Age_pic"];
            //sending the users choosen age to the age_data namespace and then receiving a number that will 
            //be used to access the right object on the array
            server.func(the_sel_func);

            //if (document.getElementById("sel_func_name").textContent === "Protein") {
            //    document.getElementById("item_info_label").setAttribute("hidden", true);
            //}
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.func);
            //using the removeInfo.js file to delete the last object of the array as long as an item exists
            if (!keepInfo) {
                remove.pop_list(age_data.model.info_page2_func)
            }
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

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
                    roamingSettings.values["Func_protein"] = false;
                    roamingSettings.values["Func_name"] = func3;
                    roamingSettings.values["Func_Vend"] = document.getElementById("b_vend").textContent;
                    roamingSettings.values["Func_pic"] = document.getElementById("choosen_func_carry").src;
                    roamingSettings.values["Func_info"] = document.getElementById("sel_func_info").textContent;
                    roamingSettings.values["Func_price"] = document.getElementById("func_price").textContent;
                    //roamingSettings.values["Func_price"] = document.getElementById("func_price").textContent;
                    roamingSettings.values["Func_label"] = document.getElementById("sel_func_pic").src;
        },

        more_info: function (clicked) {
            roamingSettings.values["Item_choosen"] = clicked;
            roamingSettings.values["Clicked_cat"] = "func";
            WinJS.Navigation.navigate('pages/item_info/item_info.html');
            keepInfo = true;
        }
    })

})();
