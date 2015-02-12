// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    WinJS.UI.Pages.define("/pages/launch_page/launch_page.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            design.launch();
            design.changeTextColor();
            //milo: used to be borderColer = "white"
            document.getElementById("make_drink").style.border = 0;
            document.getElementById("learn_more").style.border = 0;
            document.getElementById("supl_sport").style.border = 0;
            document.getElementById("make_drink2").style.border = 0;
            document.getElementById("make_drink6").style.border = 0;
            document.getElementById("nutrigenetics").style.border = 0;
            document.getElementById("company_name").textContent = "Let's Customize";
            document.getElementById("appBar").winControl.show();
            document.getElementById("more_info_home").setAttribute("hidden", true);
            document.getElementById("shop").setAttribute("hidden", true);
            document.getElementById("home").setAttribute("hidden", true);

            roamingSettings.values["Age_name"] = "",
            roamingSettings.values["Age_pic"] = "",
            roamingSettings.values["Clicked_cat"] = "",
            roamingSettings.values["Cat_picked"] = "",
            roamingSettings.values["Cat_picked_img"] = "",
            roamingSettings.values["Cat_picked_img2"] = "",
            roamingSettings.values["Cat_picked_img3"] = "",
            roamingSettings.values["Cat_picked_img4"] = "",
            roamingSettings.values["Cat_picked_img5"] = "",

            roamingSettings.values["Func_name"] = "",
            roamingSettings.values["Func_pic"] = "",
            roamingSettings.values["Func_info"] = "",
            roamingSettings.values["Func_price"] = "",
            roamingSettings.values["Func_label"] = "",
            roamingSettings.values["Home2_name"] = "",
            roamingSettings.values["Home2_pic"] = "",
            roamingSettings.values["Home2_info"] = "",
            roamingSettings.values["Home2_price"] = "",
            roamingSettings.values["Base_name"] = "",
            roamingSettings.values["Id_sel_base"] = "",
            roamingSettings.values["Base_pic"] = "",
            roamingSettings.values["Base_vend"] = "",
            roamingSettings.values["Base_price"] = "",
            roamingSettings.values["Boost1_name"] = "",
            roamingSettings.values["Boost1_pic"] = "",
            roamingSettings.values["Boost1_vend"] = "",
            roamingSettings.values["Boost1_price"] = "",
            roamingSettings.values["Boost2_name"] = "",
            roamingSettings.values["Boost2_pic"] = "",
            roamingSettings.values["Boost2_vend"] = "",
            roamingSettings.values["Boost2_price"] = "",
            roamingSettings.values["Boost3_name"] = "",
            roamingSettings.values["Boost3_pic"] = "",
            roamingSettings.values["Boost3_vend"] = "",
            roamingSettings.values["Boost3_price"] = "",
            roamingSettings.values["Boost4_name"] = "",
            roamingSettings.values["Boost4_pic"] = "",
            roamingSettings.values["Boost4_vend"] = "",
            roamingSettings.values["Boost4_price"] = "",
            roamingSettings.values["Boost5_name"] = "",
            roamingSettings.values["Boost5_pic"] = "",
            roamingSettings.values["Boost5_vend"] = "",
            roamingSettings.values["Boost5_price"] = "",
            roamingSettings.values["Boost6_name"] = "",
            roamingSettings.values["Boost6_pic"] = "",
            roamingSettings.values["Boost6_vend"] = "",
            roamingSettings.values["Boost6_price"] = "",
            roamingSettings.values["Boost7_name"] = "",
            roamingSettings.values["Boost7_pic"] = "",
            roamingSettings.values["Boost7_vend"] = "",
            roamingSettings.values["Boost7_price"] = "",
            roamingSettings.values["Boost8_name"] = "",
            roamingSettings.values["Boost8_pic"] = "",
            roamingSettings.values["Boost8_vend"] = "",
            roamingSettings.values["Boost8_price"] = "",
            roamingSettings.values["db_url"] = "",

            roamingSettings.values["FlavSel_name"] = "",
            roamingSettings.values["FlavSel_pic"] = "",
            roamingSettings.values["FlavSel_vend"] = "",
            roamingSettings.values["Flav_name"] = "",
            roamingSettings.values["Id_sel_age"] = "",
            roamingSettings.values["Id_sel_sport"] = "",
            roamingSettings.values["Id_sel_func"] = "",
            roamingSettings.values["Boost_total_num"] = "",
            roamingSettings.values["Nutrigenetics_name"] = "",
            roamingSettings.values["Nutrigenetics_pic"] = "",
            roamingSettings.values["Nutrigenetics_price"] = "",
            roamingSettings.values["creat_cust"] = "",
            roamingSettings.values["creat_last"] = ""

            //if (!roamingSettings.values["not_cont"]){
            //    roamingSettings.values["Invoice_number"] = "";
            //}
            
            remove.pop_list(age_data.model.info_page2);
            remove.pop_list(age_data.model.the_boost_sel);
            remove.pop_list(age_data.model.info);
            remove.pop_list(age_data.model.info_sport);
            roamingSettings.values["I_ordered"] = "no";
            if (roamingSettings.values["not_cont"]) {
                roamingSettings.values["the_complete_total"] = 0;         
            }
            if (!roamingSettings.values["not_cont"]) {
                document.getElementById("youcurrentprice").textContent = roamingSettings.values["the_complete_total"];
                document.getElementById("youcurrentprice").removeAttribute("hidden");
                document.getElementById("thewordsforcurrentprice").removeAttribute("hidden");
            }

            learn_more.addEventListener("pointerdown", onPointerDown, false);
            learn_more.addEventListener("pointerup", onPointerUp, false);
            supl_sport2.addEventListener("pointerdown", onPointerDown, false);
            supl_sport2.addEventListener("pointerup", onPointerUp, false);
            supl_sport.addEventListener("pointerdown", onPointerDown, false);
            supl_sport.addEventListener("pointerup", onPointerUp, false);
            make_drink.addEventListener("pointerdown", onPointerDown, false);
            make_drink.addEventListener("pointerup", onPointerUp, false);
            make_drink2.addEventListener("pointerdown", onPointerDown, false);
            make_drink2.addEventListener("pointerup", onPointerUp, false);
            make_drink6.addEventListener("pointerdown", onPointerDown, false);
            make_drink6.addEventListener("pointerup", onPointerUp, false);
            supl_sport3.addEventListener("pointerdown", onPointerDown, false);
            supl_sport3.addEventListener("pointerup", onPointerUp, false);
            supl_sport4.addEventListener("pointerdown", onPointerDown, false);
            supl_sport4.addEventListener("pointerup", onPointerUp, false);
            supl_sport5.addEventListener("pointerdown", onPointerDown, false);
            supl_sport5.addEventListener("pointerup", onPointerUp, false);
            nutrigenetics.addEventListener("pointerdown", onPointerDown, false);
            nutrigenetics.addEventListener("pointerup", onPointerUp, false);


            function onPointerDown(evt) {
                WinJS.UI.Animation.pointerDown(evt.srcElement);
            }

            function onPointerUp(evt) {
                WinJS.UI.Animation.pointerUp(evt.srcElement);
            }





        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            roamingSettings.values["Base_name"] = "",
            roamingSettings.values["Base_pic"] = "",
            roamingSettings.values["Base_vend"] = "",
            roamingSettings.values["Base_price"] = "",
            roamingSettings.values["Boost1_name"] = "",
            roamingSettings.values["Boost1_pic"] = "",
            roamingSettings.values["Boost1_vend"] = "",
            roamingSettings.values["Boost1_price"] = "",
            roamingSettings.values["Boost2_name"] = "",
            roamingSettings.values["Boost2_pic"] = "",
            roamingSettings.values["Boost2_vend"] = "",
            roamingSettings.values["Boost2_price"] = "",
            roamingSettings.values["Boost3_name"] = "",
            roamingSettings.values["Boost3_pic"] = "",
            roamingSettings.values["Boost3_vend"] = "",
            roamingSettings.values["Boost3_price"] = "",
            roamingSettings.values["Boost4_name"] = "",
            roamingSettings.values["Boost4_pic"] = "",
            roamingSettings.values["Boost4_vend"] = "",
            roamingSettings.values["Boost4_price"] = "",
            roamingSettings.values["FlavSel_name"] = "",
            roamingSettings.values["FlavSel_pic"] = "",
            roamingSettings.values["FlavSel_vend"] = "",
            roamingSettings.values["Flav_name"] = ""
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />
            //roamingSettings.values["Base_info"] = document.getElementById("sel_base_info").textContent;
            // TODO: Respond to changes in layout.
        }

    });

    var cat_picked = "";

    WinJS.Namespace.define("cat_clicked", {
        
        next_page: function (me) {

            //WinJS.UI.Animation.pointerDown(document.getElementById("make_drink2")).done( /* Your success and error handlers */
            //   // tool.alert("", "Yup")
            //    );

            var cat_picked = me.replace(/^\s+/, '').replace(/\s+$/, '');

            if(cat_picked === "Competitive Sports"){
                WinJS.Navigation.navigate('pages/home2/home2.html');
                var appData = Windows.Storage.ApplicationData.current;
                var roamingSettings = appData.roamingSettings;
                roamingSettings.values["Cat_picked"] = cat_picked;
                roamingSettings.values["Cat_picked_img4"] = document.getElementById("make_sport_drink_img").src;
    
            } else if (cat_picked === "Energy" || cat_picked === "Weight Management" || cat_picked === "Lifestyle Diets" || cat_picked === "Wellness" || cat_picked === "Beauty") {
                WinJS.Navigation.navigate('pages/base/base.html');
                var appData = Windows.Storage.ApplicationData.current;
                var roamingSettings = appData.roamingSettings;
                roamingSettings.values["Cat_picked"] = cat_picked;
                roamingSettings.values["Cat_picked_img"] = document.getElementById("make_drink_img").src;

            } else {
                WinJS.Navigation.navigate('pages/home/home.html');
                var appData = Windows.Storage.ApplicationData.current;
                var roamingSettings = appData.roamingSettings;
                roamingSettings.values["Cat_picked"] = cat_picked;
                roamingSettings.values["Cat_picked_img2"] = document.getElementById("make_drink_img2").src;
                roamingSettings.values["Cat_picked_img3"] = document.getElementById("nutrigenetics_img").src;
                roamingSettings.values["Cat_picked_img5"] = document.getElementById("make_sport_drink_img2").src;
            }

        },
        //next_page_func: function () {
        //    WinJS.Navigation.navigate('pages/func/func.html');
        //    var appData = Windows.Storage.ApplicationData.current;
        //    var roamingSettings = appData.roamingSettings;
        //    roamingSettings.values["Cat_picked"] = cat_picked;
        //    roamingSettings.values["Cat_picked_img"] = document.getElementById("make_drink_img").src;
        //},

        //next_page_home2: function () {
        //    WinJS.Navigation.navigate('pages/home2/home2.html');
        //    var appData = Windows.Storage.ApplicationData.current;
        //    var roamingSettings = appData.roamingSettings;
        //    roamingSettings.values["Cat_picked"] = cat_picked;
        //    roamingSettings.values["Cat_picked_img"] = document.getElementById("make_drink_img").src;
        //},

        clicked2: function () {
            roamingSettings.values["Clicked_cat"] = document.getElementById("learn_more_title").textContent;
            //console.log(roamingSettings.values["Clicked_cat"]);
        }
    })

})();
