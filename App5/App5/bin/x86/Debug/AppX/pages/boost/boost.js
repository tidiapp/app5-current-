﻿// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var _num4 = "";
    var _num3 = "";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Boost");
    var keepInfo = true;
    var boost1Active = false;
    var boost2Active = false;
    var boost3Active = false;
    var thename1 = "";
    var thename2 = "";
    var thename3 = "";
    var thename4 = "";
    var thename5 = "";
    var thename6 = "";
    var thename7 = "";
    var thename8 = "";
    var thename0 = "";

    WinJS.UI.Pages.define("/pages/boost/boost.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            //this removes saved boosts name: bug seems to been holding it in all pages of the app. 
            thename1 = "";
            thename2 = "";
            thename3 = "";
            thename4 = "";
            thename5 = "";
            thename6 = "";
            thename7 = "";
            thename8 = "";
            thename0 = "";

            WinJS.Binding.processAll(element, age_data.model);
            
            if (roamingSettings.values["orderComplete"]) {
                remove.pop_list(age_data.model.the_boost_sel);
            }
            var id_sel = roamingSettings.values["Id_sel_func"];

            design.getBoost();
            design.changeTextColor();
            design.getBoostBorders("white");
            //server.finalPageCall();

            roamingSettings.values["went_back_back"] = false;
            if (roamingSettings.values["went_back"]) {
                roamingSettings.values["went_back_back"] = true;
            }

            if (!roamingSettings.values["not_cont"]) {
                //document.getElementById("price_prev_div_total").setAttribute("hidden");
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
            document.getElementById("where_you_are4").textContent = "You have choosen the " + roamingSettings.values["Base_name"] + " Base." + " You have 1 step left.";

            //milo: footer history 
            if (roamingSettings.values["Cat_picked"] === "Fitness & Exercise") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img5"];
            }

            //milo: footer history 
            if (roamingSettings.values["Cat_picked"] === "Energy" || roamingSettings.values["Cat_picked"] === "Weight Management" || roamingSettings.values["Cat_picked"] === "Lifestyle Diets" || roamingSettings.values["Cat_picked"] === "Functional Health" || roamingSettings.values["Cat_picked"] === "Beauty") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img"];
                document.getElementById("home_div").setAttribute("hidden");
            }
            //milo: footer history 
            if (roamingSettings.values["Cat_picked"] === "Protein" || id_sel == 1 || id_sel == 2 || id_sel == 4 || id_sel == 6) {
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

            document.getElementById("base_price_prev").textContent = roamingSettings.values["Base_price"];
            document.getElementById("base_price_prev2").textContent = roamingSettings.values["Base_price"];

            //milo: show checkout button right away so some can buy without boost picked
            document.getElementById("btn_right").removeAttribute("hidden");

            if (roamingSettings.values["Base_protein"] === true) {
                document.getElementById("flav_div").setAttribute("hidden", true)
                document.getElementById("flav2_div").setAttribute("hidden", true)
            }

            //document.getElementById("theBoostAge").textContent = roamingSettings.values["Age_name"];
//SERVER CALL            
            server.boost(roamingSettings.values["Cat_picked"], roamingSettings.values["Id_sel_func"], roamingSettings.values["Id_sel_sport"], roamingSettings.values["Id_sel_base"]);

            //console.log("Base picked id = " + roamingSettings.values["Id_sel_base"], "Cat picked id = " + roamingSettings.values["Cat_picked"], "Func picked id = " + roamingSettings.values["Id_sel_func"], "Sport picked id = " + roamingSettings.values["Id_sel_sport"]);

            console.log("Cat page picked id     = " + roamingSettings.values["Cat_picked"]);

            if (roamingSettings.values["Func_name"] != "") {
                console.log("Name & id              = " + roamingSettings.values["Func_name"] + " (from func db)" + " id:" + roamingSettings.values["Id_sel_func"]);
            } else if (roamingSettings.values["Age_name"] != "") {
                console.log("Name & id              = " + roamingSettings.values["Age_name"] + " (from age db)" + " id:" + roamingSettings.values["Id_sel_func"]);
            }
            console.log("Sport picked id        = " + roamingSettings.values["Id_sel_sport"]);
            console.log("Base picked id         = " + roamingSettings.values["Id_sel_base"], roamingSettings.values["Base_name"]);

            //milo all if statments save, so when you go to flavor and then back to boost, your picked boosts are still visible.
            if (age_data.model.the_boost_sel.length === 1) {
                thename1 = roamingSettings.values["Boost1_name"];
                //console.log(roamingSettings.values["Boost1_name"] + roamingSettings.values["Boost1_pic"]);
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
    
                document.getElementById("div_boost1_name").textContent = roamingSettings.values["Boost1_name"];
                document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];

                document.getElementById("boost1_div").removeAttribute("hidden");
                document.getElementById("the_test");
                // keepInfo = false;
            } else if (age_data.model.the_boost_sel.length === 2) {
                
                thename1 = roamingSettings.values["Boost1_name"];
                // console.log("one boost " + roamingSettings.values["Boost1_name"] + roamingSettings.values["Boost1_pic"]);
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;

                document.getElementById("div_boost1_name").textContent = roamingSettings.values["Boost1_name"];
                document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];

                document.getElementById("boost1_div").removeAttribute("hidden");
                document.getElementById("the_test");

                // console.log("two boost: " + roamingSettings.values["Boost2_name"] + roamingSettings.values["Boost2_pic"]);
                thename2 = roamingSettings.values["Boost2_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;

                document.getElementById("div_boost2_name").textContent = roamingSettings.values["Boost2_name"];
                document.getElementById("area_img2").src = roamingSettings.values["Boost2_pic"];
                document.getElementById("boost2_div").removeAttribute("hidden");

            } else if (age_data.model.the_boost_sel.length === 3) {
               
                thename1 = roamingSettings.values["Boost1_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("div_boost1_name").textContent = roamingSettings.values["Boost1_name"];
                document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];
                document.getElementById("boost1_div").removeAttribute("hidden");
                document.getElementById("the_test");

                thename2 = roamingSettings.values["Boost2_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("div_boost2_name").textContent = roamingSettings.values["Boost2_name"];
                document.getElementById("area_img2").src = roamingSettings.values["Boost2_pic"];
                document.getElementById("boost2_div").removeAttribute("hidden");

                thename3 = roamingSettings.values["Boost3_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img3").src = roamingSettings.values["Boost3_pic"];
                document.getElementById("boost3_div").removeAttribute("hidden");
                document.getElementById("div_boost3_name").textContent = roamingSettings.values["Boost3_name"];

            } else if (age_data.model.the_boost_sel.length === 4) {

                thename1 = roamingSettings.values["Boost1_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("div_boost1_name").textContent = roamingSettings.values["Boost1_name"];
                document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];
                document.getElementById("boost1_div").removeAttribute("hidden");
                document.getElementById("the_test");

                thename2 = roamingSettings.values["Boost2_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("div_boost2_name").textContent = roamingSettings.values["Boost2_name"];
                document.getElementById("area_img2").src = roamingSettings.values["Boost2_pic"];
                document.getElementById("boost2_div").removeAttribute("hidden");

                thename3 = roamingSettings.values["Boost3_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img3").src = roamingSettings.values["Boost3_pic"];
                document.getElementById("boost3_div").removeAttribute("hidden");
                document.getElementById("div_boost3_name").textContent = roamingSettings.values["Boost3_name"];

                thename4 = roamingSettings.values["Boost4_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img4").src = roamingSettings.values["Boost4_pic"];
                document.getElementById("boost4_div").removeAttribute("hidden");
                document.getElementById("div_boost4_name").textContent = roamingSettings.values["Boost4_name"];

            } else if (age_data.model.the_boost_sel.length === 5) {

                thename1 = roamingSettings.values["Boost1_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("div_boost1_name").textContent = roamingSettings.values["Boost1_name"];
                document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];
                document.getElementById("boost1_div").removeAttribute("hidden");
                document.getElementById("the_test");

                thename2 = roamingSettings.values["Boost2_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("div_boost2_name").textContent = roamingSettings.values["Boost2_name"];
                document.getElementById("area_img2").src = roamingSettings.values["Boost2_pic"];
                document.getElementById("boost2_div").removeAttribute("hidden");

                thename3 = roamingSettings.values["Boost3_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img3").src = roamingSettings.values["Boost3_pic"];
                document.getElementById("boost3_div").removeAttribute("hidden");
                document.getElementById("div_boost3_name").textContent = roamingSettings.values["Boost3_name"];

                thename4 = roamingSettings.values["Boost4_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img4").src = roamingSettings.values["Boost4_pic"];
                document.getElementById("boost4_div").removeAttribute("hidden");
                document.getElementById("div_boost4_name").textContent = roamingSettings.values["Boost4_name"];

                thename5 = roamingSettings.values["Boost5_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img5").src = roamingSettings.values["Boost5_pic"];
                document.getElementBy ("boost5_div").removeAttribute("hidden");
                document.getElementById("div_boost5_name").textContent = roamingSettings.values["Boost5_name"];

            } else if (age_data.model.the_boost_sel.length === 6) {

                thename1 = roamingSettings.values["Boost1_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("div_boost1_name").textContent = roamingSettings.values["Boost1_name"];
                document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];
                document.getElementById("boost1_div").removeAttribute("hidden");
                document.getElementById("the_test");

                thename2 = roamingSettings.values["Boost2_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("div_boost2_name").textContent = roamingSettings.values["Boost2_name"];
                document.getElementById("area_img2").src = roamingSettings.values["Boost2_pic"];
                document.getElementById("boost2_div").removeAttribute("hidden");

                thename3 = roamingSettings.values["Boost3_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img3").src = roamingSettings.values["Boost3_pic"];
                document.getElementById("boost3_div").removeAttribute("hidden");
                document.getElementById("div_boost3_name").textContent = roamingSettings.values["Boost3_name"];

                thename4 = roamingSettings.values["Boost4_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img4").src = roamingSettings.values["Boost4_pic"];
                document.getElementById("boost4_div").removeAttribute("hidden");
                document.getElementById("div_boost4_name").textContent = roamingSettings.values["Boost4_name"];

                thename5 = roamingSettings.values["Boost5_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img5").src = roamingSettings.values["Boost5_pic"];
                document.getElementById("boost5_div").removeAttribute("hidden");
                document.getElementById("div_boost5_name").textContent = roamingSettings.values["Boost5_name"];

                thename6 = roamingSettings.values["Boost6_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img6").src = roamingSettings.values["Boost6_pic"];
                document.getElementById("boost6_div").removeAttribute("hidden");
                document.getElementById("div_boost6_name").textContent = roamingSettings.values["Boost6_name"];

            } else if (age_data.model.the_boost_sel.length === 7) {

                thename1 = roamingSettings.values["Boost1_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("div_boost1_name").textContent = roamingSettings.values["Boost1_name"];
                document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];
                document.getElementById("boost1_div").removeAttribute("hidden");
                document.getElementById("the_test");

                thename2 = roamingSettings.values["Boost2_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("div_boost2_name").textContent = roamingSettings.values["Boost2_name"];
                document.getElementById("area_img2").src = roamingSettings.values["Boost2_pic"];
                document.getElementById("boost2_div").removeAttribute("hidden");

                thename3 = roamingSettings.values["Boost3_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img3").src = roamingSettings.values["Boost3_pic"];
                document.getElementById("boost3_div").removeAttribute("hidden");
                document.getElementById("div_boost3_name").textContent = roamingSettings.values["Boost3_name"];

                thename4 = roamingSettings.values["Boost4_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img4").src = roamingSettings.values["Boost4_pic"];
                document.getElementById("boost4_div").removeAttribute("hidden");
                document.getElementById("div_boost4_name").textContent = roamingSettings.values["Boost4_name"];

                thename5 = roamingSettings.values["Boost5_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img5").src = roamingSettings.values["Boost5_pic"];
                document.getElementById("boost5_div").removeAttribute("hidden");
                document.getElementById("div_boost5_name").textContent = roamingSettings.values["Boost5_name"];

                thename6 = roamingSettings.values["Boost6_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img6").src = roamingSettings.values["Boost6_pic"];
                document.getElementById("boost6_div").removeAttribute("hidden");
                document.getElementById("div_boost6_name").textContent = roamingSettings.values["Boost6_name"];

                thename7 = roamingSettings.values["Boost7_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img7").src = roamingSettings.values["Boost7_pic"];
                document.getElementById("boost7_div").removeAttribute("hidden");
                document.getElementById("div_boost7_name").textContent = roamingSettings.values["Boost7_name"];

            } else if (age_data.model.the_boost_sel.length === 8) {

                thename1 = roamingSettings.values["Boost1_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("div_boost1_name").textContent = roamingSettings.values["Boost1_name"];
                document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];
                document.getElementById("boost1_div").removeAttribute("hidden");
                document.getElementById("the_test");

                thename2 = roamingSettings.values["Boost2_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("div_boost2_name").textContent = roamingSettings.values["Boost2_name"];
                document.getElementById("area_img2").src = roamingSettings.values["Boost2_pic"];
                document.getElementById("boost2_div").removeAttribute("hidden");

                thename3 = roamingSettings.values["Boost3_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img3").src = roamingSettings.values["Boost3_pic"];
                document.getElementById("boost3_div").removeAttribute("hidden");
                document.getElementById("div_boost3_name").textContent = roamingSettings.values["Boost3_name"];

                thename4 = roamingSettings.values["Boost4_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img4").src = roamingSettings.values["Boost4_pic"];
                document.getElementById("boost4_div").removeAttribute("hidden");
                document.getElementById("div_boost4_name").textContent = roamingSettings.values["Boost4_name"];

                thename5 = roamingSettings.values["Boost5_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img5").src = roamingSettings.values["Boost5_pic"];
                document.getElementById("boost5_div").removeAttribute("hidden");
                document.getElementById("div_boost5_name").textContent = roamingSettings.values["Boost5_name"];

                thename6 = roamingSettings.values["Boost6_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img6").src = roamingSettings.values["Boost6_pic"];
                document.getElementById("boost6_div").removeAttribute("hidden");
                document.getElementById("div_boost6_name").textContent = roamingSettings.values["Boost6_name"];

                thename7 = roamingSettings.values["Boost7_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img7").src = roamingSettings.values["Boost7_pic"];
                document.getElementById("boost7_div").removeAttribute("hidden");
                document.getElementById("div_boost7_name").textContent = roamingSettings.values["Boost7_name"];

                thename8 = roamingSettings.values["Boost8_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img8").src = roamingSettings.values["Boost8_pic"];
                document.getElementById("boost8_div").removeAttribute("hidden");
                document.getElementById("div_boost8_name").textContent = roamingSettings.values["Boost8_name"];

            } else if (age_data.model.the_boost_sel.length === 0) {
                //thename0 = roamingSettings.values["Boost0_name"];
                //roamingSettings.values["Boost0_name"] = age_data.model.the_boost_sel.length;
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                //document.getElementById("div_boost1_name").textContent = roamingSettings.values["Boost1_name"];
                //document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];
                document.getElementById("the_test");
            }
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.boost);
            remove.pop_list(age_data.model.info_page5);
            
            if (!keepInfo) {
                remove.pop_list(age_data.model.the_boost_sel);
            }
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />
        
            // TODO: Respond to changes in layout.
        }
    });

    thename1 = "";
    thename2 = "";
    thename3 = "";
    thename4 = "";
    thename5 = "";
    thename6 = "";
    thename7 = "";
    thename8 = "";
    thename0 = "";

    //console.log(thename1, thename2, thename3);

    WinJS.Namespace.define("boost_clicked", {

        clicked: function (id, name) {
   
            remove.pop_list(age_data.model.info_page5);
            //milo: bug fixed, had issue with image and text being pressed were not the same results. dataBaseGather.js has the rest of the logic... 
            //milo: when image is clicked numrical only allowed and id var pass through 
            var updated_id = id.slice(0,9).replace(/[^0-9]/g, '');
            //milo: when h1 is clicked boost word is in the h1 tag passes through
            var updated_id2 = name.replace(/^\s+/, '').replace(/\s*\r\s.*/, '');
            server.boost_sub(updated_id, updated_id2, roamingSettings.values["Cat_picked"], roamingSettings.values["Id_sel_func"], roamingSettings.values["Id_sel_sport"], roamingSettings.values["Id_sel_base"]);

            keepInfo = false;

        },

        //perServing: function (priceAll) {
        //    //milo do not put per_serving into template winjs listview has issues
        //    var perServ = (priceAll /= 15).toFixed(2);

        //    document.getElementById("per_serving").removeAttribute("hidden");
        //    document.getElementById("per_serving").textContent = "$" + perServ + " per serving";
        //    console.log("Milo price per ser " + perServ);
        //},


       //milo: onclick from boost.html takes what was clicked and passes it to variable.
        clicked1: function (name, img, price, vend, label) {

            if (age_data.model.the_boost_sel.length < 8) {
                //console.log(thename1, thename2, thename3, thename4, thename5, thename6, thename7, thename8, thename9);
                //var fix1 = age_data.model.the_boost_sel.length;
                //&& (fix1 > 0 && fix1 < 9)
                if (name === thename1) {
                    document.getElementById("only_one_warning").removeAttribute("hidden");
                } else if (name === thename2) {
                    document.getElementById("only_one_warning").removeAttribute("hidden");
                } else if (name === thename3) {
                    document.getElementById("only_one_warning").removeAttribute("hidden");
                } else if (name === thename4) {
                    document.getElementById("only_one_warning").removeAttribute("hidden");
                } else if (name === thename5) {
                    document.getElementById("only_one_warning").removeAttribute("hidden");
                } else if (name === thename6) {
                    document.getElementById("only_one_warning").removeAttribute("hidden");
                } else if (name === thename7) {
                    document.getElementById("only_one_warning").removeAttribute("hidden");
                } else if (name === thename8) {
                    document.getElementById("only_one_warning").removeAttribute("hidden");
                } else {

//milo VEND check quantity
                    WinJS.xhr({
                        type: "POST",
                        headers: {
                            "Authorization": "Bearer" + " " + roamingSettings.values["Token"],
                            "Content-type": "application/json"
                        },
                        url: "https://thinkitdrinkit.vendhq.com/api/products",
                        data: JSON.stringify({
                            "id": vend,
                            "inventory": [{
                            }]
                        }),

                    }).done(function completed(result) {
                        console.log(result);
                        if (vend != "" && vend != "null") {
                            var vendIdIssue = JSON.parse(result.responseText).product;
                            if (vendIdIssue == undefined) {//Vend product missing entirly even though there might be a id in azures db
                                document.getElementById("out_of_stock4").removeAttribute("hidden");
                                document.getElementById("out_of_stock4").textContent = "VEND product does not exist in VENDS website";
                            } else {
                                var vendCount = "";
                                vendCount = JSON.parse(result.responseText).product.inventory[0].count;
                                //console.log("Boost Inventory from VEND ", JSON.parse(result.responseText).product.inventory);
                                if (vendCount >= 1.00000) {
                                    //WinJS.Navigation.navigate('pages/boost/boost.html')
                                    age_data.model.the_boost_sel.push({ the_name: name, the_pic: img });
                                    document.getElementById("only_one_warning").setAttribute("hidden", true);
                                    //console.log("double " + thename1 +" "+ thename2 +" "+ thename3 +" "+ name)
                                    roamingSettings.values["Boost_total_num"] = age_data.model.the_boost_sel.length;
                                    //if statements should be placed here for the 1 boost condition

                                    if (age_data.model.the_boost_sel.length === 1) {
                                        thename1 = name;
                                        document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                                        document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                                        roamingSettings.values["Boost1_name"] = name;
                                        roamingSettings.values["Boost1_pic"] = img;
                                        roamingSettings.values["Boost1_info"] = null;
                                        roamingSettings.values["Boost1_price"] = price;
                                        roamingSettings.values["Boost1_vend"] = vend;
                                        roamingSettings.values["Boost1_pic_label"] = label;
                                        document.getElementById("div_boost1_name").textContent = name;
                                        document.getElementById("area_img1").src = img;
                                        document.getElementById("boost1_div").removeAttribute("hidden");
                                        document.getElementById("the_test");
                                        console.log(roamingSettings.values["Boost1_name"] + " " + roamingSettings.values["Boost1_pic"]);
                                        keepInfo = false;

                                    } else if (age_data.model.the_boost_sel.length === 2) {
                                        thename2 = name;
                                        document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                                        document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                                        roamingSettings.values["Boost2_name"] = name;
                                        roamingSettings.values["Boost2_pic"] = img;
                                        roamingSettings.values["Boost2_info"] = null;
                                        roamingSettings.values["Boost2_price"] = price;
                                        roamingSettings.values["Boost2_vend"] = vend;
                                        roamingSettings.values["Boost2_pic_label"] = label;
                                        document.getElementById("div_boost2_name").textContent = roamingSettings.values["Boost2_name"];
                                        document.getElementById("area_img2").src = roamingSettings.values["Boost2_pic"];
                                        console.log(roamingSettings.values["Boost2_name"] + roamingSettings.values["Boost2_pic"]);
                                        document.getElementById("boost2_div").removeAttribute("hidden");
                                        document.getElementById("the_test");
                                        keepInfo = false;

                                    } else if (age_data.model.the_boost_sel.length === 3) {
                                        thename3 = name;
                                        document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                                        document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                                        roamingSettings.values["Boost3_name"] = name;
                                        roamingSettings.values["Boost3_pic"] = img;
                                        roamingSettings.values["Boost3_info"] = null;
                                        roamingSettings.values["Boost3_price"] = price;
                                        roamingSettings.values["Boost3_vend"] = vend;
                                        roamingSettings.values["Boost3_pic_label"] = label;
                                        document.getElementById("area_img3").src = roamingSettings.values["Boost3_pic"];
                                        console.log(roamingSettings.values["Boost3_name"] + roamingSettings.values["Boost3_pic"]);
                                        document.getElementById("boost3_div").removeAttribute("hidden");
                                        document.getElementById("div_boost3_name").textContent = name;
                                        document.getElementById("the_test");
                                        keepInfo = false;

                                    } else if (age_data.model.the_boost_sel.length === 4) {
                                        thename4 = name;
                                        document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                                        document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                                        roamingSettings.values["Boost4_name"] = name;
                                        roamingSettings.values["Boost4_pic"] = img;
                                        roamingSettings.values["Boost4_info"] = null;
                                        roamingSettings.values["Boost4_price"] = price;
                                        roamingSettings.values["Boost4_vend"] = vend;
                                        roamingSettings.values["Boost4_pic_label"] = label;
                                        document.getElementById("area_img4").src = roamingSettings.values["Boost4_pic"];
                                        console.log(roamingSettings.values["Boost4_name"] + roamingSettings.values["Boost4_pic"]);
                                        document.getElementById("boost4_div").removeAttribute("hidden");
                                        document.getElementById("div_boost4_name").textContent = name;
                                        document.getElementById("the_test");
                                        keepInfo = false;

                                    } else if (age_data.model.the_boost_sel.length === 5) {
                                        thename5 = name;
                                        document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                                        document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                                        roamingSettings.values["Boost5_name"] = name;
                                        roamingSettings.values["Boost5_pic"] = img;
                                        roamingSettings.values["Boost5_info"] = null;
                                        roamingSettings.values["Boost5_price"] = price;
                                        roamingSettings.values["Boost5_vend"] = vend;
                                        roamingSettings.values["Boost5_pic_label"] = label;
                                        document.getElementById("area_img5").src = roamingSettings.values["Boost5_pic"];
                                        console.log(roamingSettings.values["Boost5_name"] + roamingSettings.values["Boost5_pic"]);
                                        document.getElementById("boost5_div").removeAttribute("hidden");
                                        document.getElementById("div_boost5_name").textContent = name;
                                        document.getElementById("the_test");
                                        keepInfo = false;

                                    } else if (age_data.model.the_boost_sel.length === 6) {
                                        thename6 = name;
                                        document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                                        document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                                        roamingSettings.values["Boost6_name"] = name;
                                        roamingSettings.values["Boost6_pic"] = img;
                                        roamingSettings.values["Boost6_info"] = null;
                                        roamingSettings.values["Boost6_price"] = price;
                                        roamingSettings.values["Boost6_vend"] = vend;
                                        roamingSettings.values["Boost6_pic_label"] = label;
                                        document.getElementById("area_img6").src = roamingSettings.values["Boost6_pic"];
                                        console.log(roamingSettings.values["Boost6_name"] + roamingSettings.values["Boost6_pic"]);
                                        document.getElementById("boost6_div").removeAttribute("hidden");
                                        document.getElementById("div_boost6_name").textContent = name;
                                        document.getElementById("the_test");
                                        keepInfo = false;

                                    } else if (age_data.model.the_boost_sel.length === 7) {
                                        thename7 = name;
                                        document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                                        document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                                        roamingSettings.values["Boost7_name"] = name;
                                        roamingSettings.values["Boost7_pic"] = img;
                                        roamingSettings.values["Boost7_info"] = null;
                                        roamingSettings.values["Boost7_price"] = price;
                                        roamingSettings.values["Boost7_vend"] = vend;
                                        roamingSettings.values["Boost7_pic_label"] = label;
                                        document.getElementById("area_img7").src = roamingSettings.values["Boost7_pic"];
                                        console.log(roamingSettings.values["Boost7_name"] + roamingSettings.values["Boost7_pic"]);
                                        document.getElementById("boost7_div").removeAttribute("hidden");
                                        document.getElementById("div_boost7_name").textContent = name;
                                        document.getElementById("the_test");
                                        keepInfo = false;

                                    } else if (age_data.model.the_boost_sel.length === 8) {
                                        thename8 = name;
                                        document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                                        document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                                        roamingSettings.values["Boost8_name"] = name;
                                        roamingSettings.values["Boost8_pic"] = img;
                                        roamingSettings.values["Boost8_info"] = null;
                                        roamingSettings.values["Boost8_price"] = price;
                                        roamingSettings.values["Boost8_vend"] = vend;
                                        roamingSettings.values["Boost8_pic_label"] = label;
                                        document.getElementById("area_img8").src = roamingSettings.values["Boost8_pic"];
                                        console.log(roamingSettings.values["Boost8_name"] + roamingSettings.values["Boost8_pic"]);
                                        document.getElementById("boost8_div").removeAttribute("hidden");
                                        document.getElementById("div_boost8_name").textContent = name;
                                        document.getElementById("the_test");
                                        keepInfo = false;

                                    }
                                } else if (vendCount <= 0.00000) {//If all works this is the check that looks for missing not enough quantity 
                                    document.getElementById("out_of_stock3").removeAttribute("hidden");
                                    document.getElementById("out_of_stock3").textContent = "OUT OF STOCK, PLEASE PICK ANOTHER BASE";
                                }
                            }
                        } else if (vend == "null" || vend == undefined || vend == "") {//id missing in azure db but product in vend exists
                            document.getElementById("out_of_stock4").removeAttribute("hidden");
                            document.getElementById("out_of_stock4").textContent = "ID Missing in Azure DB.";
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
                                    tool.alert("Go into nutrigenetics page, most likely in base page vend token refresh is commented off", "Vend Token Expired");
                                }
                            });

                }//ends else for duplicate check
            } else {
                document.getElementById("overError").textContent = " Sorry, You May Only Choose 8 Boosts. If You Want To Change Boosts, Please Click the Remove Last Button";
                document.getElementById("overError").style.color = "red";
                document.getElementById("overError").style.fontSize = "30px";
                //document.getElementById("overError").style.marginTop = "100px";
                document.getElementById("overError").style.position = "Absolute";
            }
        },

        release: function () {
            document.getElementById("only_one_warning").setAttribute("hidden", true);
            if (age_data.model.the_boost_sel.length === 1) {
                roamingSettings.values["Boost1_name"] = "";
                roamingSettings.values["Boost1_pic"] = "";
                roamingSettings.values["Boost1_vend"] = "";
                roamingSettings.values["Boost1_info"] = null;
                roamingSettings.values["Boost1_price"] = null;
                roamingSettings.values["Boost1_pic_label"] = "";
                thename1 = "";
                document.getElementById("boost1_div").setAttribute("hidden", true);

            } else if (age_data.model.the_boost_sel.length === 2) {
                roamingSettings.values["Boost2_name"] = "";
                roamingSettings.values["Boost2_pic"] = "";
                roamingSettings.values["Boost2_vend"] = "";
                roamingSettings.values["Boost2_info"] = null;
                roamingSettings.values["Boost2_price"] = null;
                roamingSettings.values["Boost2_pic_label"] = "";
                thename2 = "";
                document.getElementById("boost2_div").setAttribute("hidden", true);

            } else if (age_data.model.the_boost_sel.length === 3) {
                roamingSettings.values["Boost3_name"] = "";
                roamingSettings.values["Boost3_pic"] = "";
                roamingSettings.values["Boost3_vend"] = "";
                roamingSettings.values["Boost3_info"] = null;
                roamingSettings.values["Boost3_price"] = null;
                roamingSettings.values["Boost3_pic_label"] = "";
                thename3 = "";
                document.getElementById("boost3_div").setAttribute("hidden", true);

            } else if (age_data.model.the_boost_sel.length === 4) {
                roamingSettings.values["Boost4_name"] = "";
                roamingSettings.values["Boost4_pic"] = "";
                roamingSettings.values["Boost4_vend"] = "";
                roamingSettings.values["Boost4_info"] = null;
                roamingSettings.values["Boost4_price"] = null;
                roamingSettings.values["Boost4_pic_label"] = "";
                thename4 = "";
                document.getElementById("boost4_div").setAttribute("hidden", true);

            } else if (age_data.model.the_boost_sel.length === 5) {
                roamingSettings.values["Boost5_name"] = "";
                roamingSettings.values["Boost5_pic"] = "";
                roamingSettings.values["Boost5_vend"] = "";
                roamingSettings.values["Boost5_info"] = null;
                roamingSettings.values["Boost5_price"] = null;
                roamingSettings.values["Boost5_pic_label"] = "";
                thename5 = "";
                document.getElementById("boost5_div").setAttribute("hidden", true);

            } else if (age_data.model.the_boost_sel.length === 6) {
                roamingSettings.values["Boost6_name"] = "";
                roamingSettings.values["Boost6_pic"] = "";
                roamingSettings.values["Boost6_vend"] = "";
                roamingSettings.values["Boost6_info"] = null;
                roamingSettings.values["Boost6_price"] = null;
                roamingSettings.values["Boost6_pic_label"] = "";
                thename6 = "";
                document.getElementById("boost6_div").setAttribute("hidden", true);

            } else if (age_data.model.the_boost_sel.length === 7) {
                roamingSettings.values["Boost7_name"] = "";
                roamingSettings.values["Boost7_pic"] = "";
                roamingSettings.values["Boost7_vend"] = "";
                roamingSettings.values["Boost7_info"] = null;
                roamingSettings.values["Boost7_price"] = null;
                roamingSettings.values["Boost7_pic_label"] = "";
                thename7 = "";
                document.getElementById("boost7_div").setAttribute("hidden", true);

            } else if (age_data.model.the_boost_sel.length === 8) {
                roamingSettings.values["Boost8_name"] = "";
                roamingSettings.values["Boost8_pic"] = "";
                roamingSettings.values["Boost8_vend"] = "";
                roamingSettings.values["Boost8_info"] = null;
                roamingSettings.values["Boost8_price"] = null;
                roamingSettings.values["Boost8_pic_label"] = "";
                thename8 = "";
                document.getElementById("boost8_div").setAttribute("hidden", true);
            } 
           
            age_data.model.the_boost_sel.pop();
            document.getElementById("overError").textContent = "";
            document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
            document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
        },
        more_info: function (clicked) {
            roamingSettings.values["Item_choosen"] = clicked;
            roamingSettings.values["Clicked_cat"] = "Boost";
            WinJS.Navigation.navigate('pages/item_info/item_info.html');
            roamingSettings.values["orderComplete"] = false;
            keepInfo = true;
        },

        finalKeepInfo: function () {
            if (age_data.model.the_boost_sel.length === 0) {
                thename0 = age_data.model.the_boost_sel.length;
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                roamingSettings.values["Boost0_name"] = thename0;
                roamingSettings.values["Boost_total_num"] = age_data.model.the_boost_sel.length;
                document.getElementById("the_test");
                keepInfo = false;
            }

            WinJS.Navigation.navigate('pages/flav_sel/flav_sel.html');
            thename1 = "";
            thename2 = "";
            thename3 = "";
            thename4 = "";
            thename5 = "";
            thename6 = "";
            thename7 = "";
            thename8 = "";
            thename0 = "";
            roamingSettings.values["orderComplete"] = false;
            keepInfo = true;
        },

        //milo: recvery catagory has a func page and needs to jump 2 some other catagories dont have a func page so just need to jump 1.
        footer_click: function () {
            var id_sel_footer = roamingSettings.values["Id_sel_func"];

            if (id_sel_footer == 25 || id_sel_footer == 26 || id_sel_footer == 27 || id_sel_footer == 28) {
                WinJS.Navigation.back(2);

            } else {
                WinJS.Navigation.back(3);
            }
        },

        footer_click3: function () {
            var cat_selected_footer = roamingSettings.values["Cat_picked"];
            var id_sel_footer_age = roamingSettings.values["Id_sel_age"];

            if (cat_selected_footer === "Competitive Sports" && id_sel_footer_age == 1) {
                WinJS.Navigation.back(4);
                //milo helps with small bug
                roamingSettings.values["Id_sel_age"] = "";
            } else {
                WinJS.Navigation.back(3);
            }
        }
    })
})();