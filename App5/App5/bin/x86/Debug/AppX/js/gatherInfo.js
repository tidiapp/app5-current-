﻿//https://msdn.microsoft.com/en-us/library/windows/apps/hh700774.aspx
(function () {
    "use strict";
    WinJS.Namespace.define("age_data", {
        /* this model will take the needed information being gathered from the json file and store it in a n array that will be used
        to populate the html page*/
        //Milo: also used here for the dataSource data-win-bind="winControl.itemDataSource: age.dataSource" 

        model: WinJS.Binding.as({
            age: new WinJS.Binding.List([
            ]),
            func: new WinJS.Binding.List([
            ]),
            func_home2: new WinJS.Binding.List([
            ]),
            sport: new WinJS.Binding.List([
            ]),
            info_home_sport: new WinJS.Binding.List([
            ]),            
            item_info_sport: new WinJS.Binding.List([
            ]),
            info_sport: new WinJS.Binding.List([
            ]),
            base: new WinJS.Binding.List([
            ]),
            boost: new WinJS.Binding.List([
            ]),
            flavor: new WinJS.Binding.List([
            ]),
            info: new WinJS.Binding.List([
            ]),
            info_page2: new WinJS.Binding.List([
            ]),
            info_page2_func: new WinJS.Binding.List([
            ]),
            info_page2_func_home2: new WinJS.Binding.List([
            ]),
            info_page3: new WinJS.Binding.List([
            ]),
            flavor1: new WinJS.Binding.List([
            ]),
            info_page4: new WinJS.Binding.List([
            ]),
            info_page5: new WinJS.Binding.List([
            ]),
            the_boost_sel: new WinJS.Binding.List([
            ]),
            the_protein: new WinJS.Binding.List([
            ]),
            protein_info: new WinJS.Binding.List([
            ]),
            info_home_bases: new WinJS.Binding.List([
            ]),
            info_home_boost: new WinJS.Binding.List([
            ]),
            info_home_flav: new WinJS.Binding.List([
            ]),
            whole_cat: new WinJS.Binding.List([
            ]),
            info_home_ages: new WinJS.Binding.List([
            ]),
            item_info: new WinJS.Binding.List([
            ]),
            login_user_past: new WinJS.Binding.List([
            ]),
            order_and_name: new WinJS.Binding.List([
            ]),
            continue_order_save: new WinJS.Binding.List([
            ]),
            order_final_call: new WinJS.Binding.List([
            ]),
            order_final_read: new WinJS.Binding.List([
            ]),
            order_final_read2: new WinJS.Binding.List([
            ]),
            order_final_read3: new WinJS.Binding.List([
            ]),
            order_final_read4: new WinJS.Binding.List([
            ]),
            order_final_read5: new WinJS.Binding.List([
            ]),
            order_final_read6: new WinJS.Binding.List([
            ]),
            order_final_read7: new WinJS.Binding.List([
            ]),
            order_final_read8: new WinJS.Binding.List([
            ]),
            order_final_read9: new WinJS.Binding.List([
            ]),
            order_final_read10: new WinJS.Binding.List([
            ])
        })
    })
})();