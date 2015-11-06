//http://msdn.microsoft.com/en-us/library/windows/apps/br212667.aspx
//    (function () {
//        "use strict";

//        var appData = Windows.Storage.ApplicationData.current;
//        var roamingSettings = appData.roamingSettings;

//        WinJS.Namespace.define("vendCalls", {

//            out_of_stock: function (vendId) {
//                WinJS.xhr({
//                    //milo: using POST but not passing anything to vend until .then at which point it reads the api product inventory count and displays it back.  
//                    type: "POST",
//                    url: "https://thinkitdrinkit.vendhq.com/api/products",
//                    user: "milo@thinkitdrinkit.com",
//                    headers: { "Content-type": "application/json" },
//                    //password: "********",
//                    data: JSON.stringify({
//                        //milo: in this object its the id part >>> GET /api/register_sales/{id} >>> that VEND wants which is below
//                        "id": vendId,
//                        "inventory": [{
//                        }]
//                    }),
//                }).then(function sucess(res) {
//                    //milo: below allows the real GET which is the count to come back to app. Notes accessing json>>> http://www.mkyong.com/javascript/how-to-access-json-object-in-javascript/
//                    roamingSettings.values["Count"] = JSON.parse(res.responseText).product.inventory[0].count;
                    
//                }, function error(err) {
//                    console.log("fail", err.responseText)
//                });
//            }

//        });
//    })();