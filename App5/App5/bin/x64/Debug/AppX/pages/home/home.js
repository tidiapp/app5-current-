﻿(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Age");
    var keepInfo = true;
    var the_sel_age;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getHome();
            design.changeTextColor();
            //roamingSettings.values["I_ordered"] = "no";
            document.getElementById("home").removeAttribute("hidden");
            document.getElementById("more_info_home").setAttribute("hidden", true);
            document.getElementById("shop").setAttribute("hidden", true);

            document.getElementById("choosen_age").textContent = "Select a " + roamingSettings.values["Cat_picked"] + " Category.";
            var the_sel_age = roamingSettings.values["Cat_picked"];

            document.getElementById("age_p").textContent = the_sel_age;


            if (the_sel_age === "Nutritional") {
                //age_pic is really the catagory image that was picked previously
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img"];
                document.getElementById("where_you_are").textContent = "You have choosen the " + roamingSettings.values["Cat_picked"] + " catagory." + " You have 3 steps left.";
            }

            if (the_sel_age === "Protein") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img2"];
                document.getElementById("where_you_are").textContent = "You have choosen the " + roamingSettings.values["Cat_picked"] + " catagory." + " You have 3 steps left.";
                document.getElementById("user_age").textContent = "Protein";
            }

            if (the_sel_age === "Nutrigenetics") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img3"];
                document.getElementById("where_you_are").textContent = "You have choosen the " + roamingSettings.values["Cat_picked"] + " catagory." + " You have 2 steps left.";
                document.getElementById("choosen_age").textContent = "Choose Your Test Kit";
            }
            //gather the infomation from the database and displays it on the sreen
            server.home(the_sel_age);

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.age);
            //using the removeInfo.js file to delete the last object of the array as long as an item exists
            if (!keepInfo) {
                //remove.pop_list(age_data.model.info_page2)
            }
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

   
    // the following namespace will be used to complete all click events on the home.html page
    var _choosen_age = "";

    WinJS.Namespace.define('clicked_me', {
        //the clicked function will show the photo and the more indept information of the clicked age group
        //at the bottem of the home.html page
        clicked: function (me) {          
            var updated_answer = me.replace(/^\s+/, '').replace(/\s+$/, '');
            _choosen_age = updated_answer;
            //gather information from from the database as the user clicks on the diffent ages
            //and then displays that information
            server.home_sub(updated_answer);
        },
        next_page: function () {
            WinJS.Navigation.navigate('pages/func/func.html');
            var appData = Windows.Storage.ApplicationData.current;
            var roamingSettings = appData.roamingSettings;
            roamingSettings.values["Age_name"] = _choosen_age;
            roamingSettings.values["Age_pic"] = document.getElementById("sel_age_pic").src;
            roamingSettings.values["Age_info"] = null;
            roamingSettings.values["Age_price"] = null;
        },
        more_info: function (clicked) {
            var updated_answer = clicked.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Item_choosen"] = updated_answer;
            roamingSettings.values["Clicked_cat"] = "Age"
            WinJS.Navigation.navigate('pages/item_info/item_info.html');
        }
    })
    
})();
