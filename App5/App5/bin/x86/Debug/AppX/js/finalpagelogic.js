(function () {
    "use strict";
    WinJS.Namespace.define("finalpagelogic", {

        arrayPush: function ()
        {
            if (roamingSettings.values["Boost2_price"] > 0 && roamingSettings.values["Boost3_price"] <= 0) {

                    age_data.model.order_final_call.push(
                    { product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"] },
                    { product_id: roamingSettings.values.remove["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"] },
                    { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"] },
                    { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"] })
            }
            else if (roamingSettings.values["Boost3_price"] > 0 && roamingSettings.values["Boost4_price"] <= 0) {

                age_data.model.order_final_call.push(
                    { product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"] },
                    { product_id: roamingSettings.values.remove["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"] },
                    { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"] },
                    { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"] },
                    { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"] })

            }
            else if (
             roamingSettings.values["Boost4_price"] > 0 && roamingSettings.values["Boost5_price"] <= 0) {

               age_data.model.order_final_call.push(
                   { product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"] },
                   { product_id: roamingSettings.values.remove["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"] },
                   { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"] },
                   { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"] },
                   { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"] },
                   { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"] })
           }
           else if (roamingSettings.values["Boost5_price"] > 0 && roamingSettings.values["Boost6_price"] <= 0) {

               age_data.model.order_final_call.push(
                   { product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"] },
                   { product_id: roamingSettings.values.remove["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"] },
                   { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"] },
                   { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"] },
                   { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"] },
                   { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"] },
                   { product_id: roamingSettings.values["Boost5_vend"], quantity: 1, price: roamingSettings.values["Boost5_price"] })

           }
           else if (roamingSettings.values["Boost6_price"] > 0 && roamingSettings.values["Boost7_price"] <= 0) {
            age_data.model.order_final_call.push(
                { product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"] },
                { product_id: roamingSettings.values.remove["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"] },
                { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"] },
                { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"] },
                { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"] },
                { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"] },
                { product_id: roamingSettings.values["Boost5_vend"], quantity: 1, price: roamingSettings.values["Boost5_price"] },
                { product_id: roamingSettings.values["Boost6_vend"], quantity: 1, price: roamingSettings.values["Boost6_price"] })

           }
           else if (roamingSettings.values["Boost7_price"] > 0 && roamingSettings.values["Boost8_price"] <= 0) {
            age_data.model.order_final_call.push(
                { product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"] },
                { product_id: roamingSettings.values.remove["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"] },
                { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"] },
                { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"] },
                { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"] },
                { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"] },
                { product_id: roamingSettings.values["Boost5_vend"], quantity: 1, price: roamingSettings.values["Boost5_price"] },
                { product_id: roamingSettings.values["Boost6_vend"], quantity: 1, price: roamingSettings.values["Boost6_price"] },
                { product_id: roamingSettings.values["Boost7_vend"], quantity: 1, price: roamingSettings.values["Boost7_price"] })
        }
        else if (roamingSettings.values["Boost8_price"] > 0) {
            age_data.model.order_final_call.push(
                { product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"] },
                { product_id: roamingSettings.values.remove["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"] },
                { product_id: roamingSettings.values["Boost1_vend"], quantity: 1, price: roamingSettings.values["Boost1_price"] },
                { product_id: roamingSettings.values["Boost2_vend"], quantity: 1, price: roamingSettings.values["Boost2_price"] },
                { product_id: roamingSettings.values["Boost3_vend"], quantity: 1, price: roamingSettings.values["Boost3_price"] },
                { product_id: roamingSettings.values["Boost4_vend"], quantity: 1, price: roamingSettings.values["Boost4_price"] },
                { product_id: roamingSettings.values["Boost5_vend"], quantity: 1, price: roamingSettings.values["Boost5_price"] },
                { product_id: roamingSettings.values["Boost6_vend"], quantity: 1, price: roamingSettings.values["Boost6_price"] },
                { product_id: roamingSettings.values["Boost7_vend"], quantity: 1, price: roamingSettings.values["Boost7_price"] },
                { product_id: roamingSettings.values["Boost8_vend"], quantity: 1, price: roamingSettings.values["Boost8_price"] })
        } else {
            age_data.model.order_final_call.push(
                { product_id: roamingSettings.values["Base_vend"], quantity: 1, price: roamingSettings.values["Base_price"] },
                { product_id: roamingSettings.values.remove["FlavSel_vend"], quantity: 1, price: roamingSettings.values["FlavSel_price"] },
                { product_id: roamingSettings.values["Boost1_Vend"], quantity: 1, price: roamingSettings.values["Boost1_price"] })
        }
        }

    })
})()