(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Func = thinkitdrinkitDataClient.getTable("Func");
    var keepInfo = true;
    var the_sel_func;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, func_data.model);
            design.getHome();
            design.changeTextColor();
            //roamingSettings.values["I_ordered"] = "no";
            document.getElementById("home").removeAttribute("hidden");
            document.getElementById("more_info_home").setAttribute("hidden", true);
            document.getElementById("shop").setAttribute("hidden", true);

            document.getElementById("choosen_func").textContent = "Choose your " + roamingSettings.values["Cat_picked"] + " Catagory.";
            var the_sel_func = roamingSettings.values["Cat_picked"];

            document.getElementById("func_p").textContent = the_sel_func;


            if (the_sel_func === "Nutritional") {
                //func_pic is really the catagory image that was picked previously
                document.getElementById("func_pic").src = roamingSettings.values["Cat_picked_img"];
                document.getElementById("where_you_are").textContent = "You have choosen the " + roamingSettings.values["Cat_picked"] + " catagory." + " You have 3 steps left.";
            }

            if (the_sel_func === "Protein") {
                document.getElementById("func_pic").src = roamingSettings.values["Cat_picked_img2"];
                document.getElementById("where_you_are").textContent = "You have choosen the " + roamingSettings.values["Cat_picked"] + " catagory." + " You have 3 steps left.";
            }

            if (the_sel_func === "Nutrigenetics") {
                document.getElementById("func_pic").src = roamingSettings.values["Cat_picked_img3"];
                document.getElementById("where_you_are").textContent = "You have choosen the " + roamingSettings.values["Cat_picked"] + " catagory." + " You have 2 steps left.";
                document.getElementById("choosen_func").textContent = "Choose Your Test Kit";
            }
            //gather the infomation from the database and displays it on the sreen
            server.home(the_sel_func);

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(func_data.model.func);
            //using the removeInfo.js file to delete the last object of the array as long as an item exists
            if (!keepInfo) {
                //remove.pop_list(func_data.model.info_page2)
            }
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

   
    // the following namespace will be used to complete all click events on the home.html page
    var _choosen_func = "";

    WinJS.Namespace.define('clicked_me', {
        //the clicked function will show the photo and the more indept information of the clicked func group
        //at the bottem of the home.html page
        clicked: function (me) {          
            var updated_answer = me.replace(/^\s+/, '').replace(/\s+$/, '');
            _choosen_func = updated_answer;
            //gather information from from the database as the user clicks on the diffent funcs
            //and then displays that information
            server.home_sub(updated_answer);
        },
        next_page: function () {
            WinJS.Navigation.navigate('pages/base/base.html');
            var appData = Windows.Storage.ApplicationData.current;
            var roamingSettings = appData.roamingSettings;
            roamingSettings.values["Func_name"] = _choosen_func;
            roamingSettings.values["Func_pic"] = document.getElementById("sel_func_pic").src;
            roamingSettings.values["Func_info"] = null;
            roamingSettings.values["Func_price"] = null;
        },
        more_info: function (clicked) {
            var updated_answer = clicked.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Item_choosen"] = updated_answer;
            roamingSettings.values["Clicked_cat"] = "Func"
            WinJS.Navigation.navigate('pages/item_info/item_info.html');
        }
    })
    
})();
