// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var num = 0;
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Base");
    var keepInfo = true;

    WinJS.UI.Pages.define("/pages/base/base.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getBase();
            design.changeTextColor();
            design.getBaseBoarders("white");
            document.getElementById("home").removeAttribute("hidden");
            var id_sel = roamingSettings.values["Id_sel_func"];
            var cat_selected = roamingSettings.values["Cat_picked"];

            //milo: footer history 
            document.getElementById("age_p").textContent = roamingSettings.values["Cat_picked"];
            document.getElementById("home_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("home_p").textContent = roamingSettings.values["Age_name"];
            document.getElementById("func_p").textContent = roamingSettings.values["Func_name"];
            document.getElementById("func_pic").src = roamingSettings.values["Func_pic"];

            //document.getElementById("id_sel4").textContent;


            //milo: footer history & H1 for Fitness & Excercise
            if (roamingSettings.values["Cat_picked"] === "Fitness & Exercise") {
                //milo: if id_sel is id 1 from age db it is Recovery but id 1 from func db is Strength & Power, depends where you come from for bug fix when coming from Fitness&Excercise>recovery>and pick anyone the ids are from the func page but if coming from protein>recovery>and whatever the ids do not matter couse the roamingSettings.values["Cat_picked"] is protein which in this comment its Fitness the if statemnet is above. 
                if (id_sel == 1 || id_sel == 2 || id_sel == 4 || id_sel == 5 || id_sel == 6) {
                    document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img2"];
                    document.getElementById("where_you_are2").textContent = "You have choosen " + roamingSettings.values["Func_name"] + "." + " You have 2 steps left.";
                    document.getElementById("choosen_age3").textContent = "Select Your " + "Protein For " + roamingSettings.values["Func_name"] + ".";
                    document.getElementById("func_div").removeAttribute("hidden");
                } else {
                    document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img5"];
                    document.getElementById("choosen_age3").textContent = "Select Your Base For " + roamingSettings.values["Age_name"] + ".";
                    document.getElementById("where_you_are2").textContent = "You have choosen " + roamingSettings.values["Age_name"] + "." + " You have 2 steps left.";
                }
            }

            //milo: footer history & H1 for Protein
            //milo: Bug fixed, if you go down fitness & Energy, Recovery shows up which is the same recovery as going from Protein catagory, The app was getting confused the path it came from this helps with footer cookie issues only.  
            if (roamingSettings.values["Cat_picked"] === "Protein") {
                //milo: Cat_picked_img2 image from Protein launch_page.hmtl
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img2"];
                document.getElementById("where_you_are2").textContent = "You have choosen " + roamingSettings.values["Func_name"] + "." + " You have 2 steps left.";
                document.getElementById("choosen_age3").textContent = "Select Your " + "Protein For " + roamingSettings.values["Func_name"] + ".";
                document.getElementById("func_div").removeAttribute("hidden");
            }

            //milo: footer history & H1
            if (roamingSettings.values["Cat_picked"] === "Competitive Sports") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img4"];
                document.getElementById("choosen_age3").textContent = "Select Your Base Blend.";
                document.getElementById("home2_div").removeAttribute("hidden");
                document.getElementById("home2_p").textContent = roamingSettings.values["Home2_name"];
                document.getElementById("home2_pic").src = roamingSettings.values["Home2_pic"];
                if (id_sel == 28 || id_sel == 27){
                    document.getElementById("where_you_are2").textContent = "You have choosen " + roamingSettings.values["Age_name"] + "." + " You have 2 steps left.";
                } else {
                    document.getElementById("func_div").removeAttribute("hidden");
                    document.getElementById("where_you_are2").textContent = "You have choosen " + roamingSettings.values["Func_name"] + "." + " You have 2 steps left.";
                }
            }

            //milo: footer history & H1
            if (roamingSettings.values["Cat_picked"] === "Energy" || roamingSettings.values["Cat_picked"] === "Weight Management" || roamingSettings.values["Cat_picked"] === "Lifestyle Diets" || roamingSettings.values["Cat_picked"] === "Wellness" || roamingSettings.values["Cat_picked"] === "Beauty") {
                document.getElementById("choosen_age3").textContent = "Select Your Base Blend.";
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img"];
                document.getElementById("home_div").setAttribute("hidden");
                document.getElementById("where_you_are2").textContent = "You have choosen " + roamingSettings.values["Cat_picked"] + "." + " You have 2 steps left.";

            }

            server.base(id_sel, cat_selected);

            document.getElementById("base_price_div").removeAttribute("hidden");
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            //using the removeInfo.js file to delete the last object of the array as long as an item exists
            remove.pop_list(age_data.model.base);
            //milo: removing keepInfo data when back button is used from func page.
            remove.pop_list(age_data.model.info_page4);
            //roamingSettings.values["Count"] = "";
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
                keepInfo = true;
                var vendId = document.getElementById("b_vend").innerHTML;
                var vendId_count = document.getElementById("b_vend_count").innerHTML;
                roamingSettings.values["Base_protein"] = false;
                roamingSettings.values["Base_Vend"] = vendId;
                roamingSettings.values["Base_name"] = base3;
                roamingSettings.values["Base_pic"] = document.getElementById("choosen_base_carry").src;
                roamingSettings.values["Base_info"] = document.getElementById("sel_base_info").textContent;
                roamingSettings.values["Base_price"] = document.getElementById("base_price").textContent;
                roamingSettings.values["Base_label"] = document.getElementById("sel_base_pic").src;
                roamingSettings.values["Id_sel_base"] = document.getElementById("id_sel3").textContent;
            //console.log("Base page picked id = " + roamingSettings.values["Id_sel_base"]);



//milo: This is the ONLY PLACE in app VEND NEEDS to LOGIN, saves the info so other pages just use roamingSettings.values["Token"] and refresh token till the refresh token itself expires   
                if (vendId != "" && vendId != "null") {

                    function isValidUriString(uriString) {
                        var uri = null;
                        try {
                            uri = new Windows.Foundation.Uri(uriString);
                        }
                        catch (err) {
                        }
                        return uri !== null;
                    }

                    refreshTokenSwitch();

                    function refreshTokenSwitch() {
                        var data = {};
console.log("Refresh token trigered ");

                        data = {
                            refresh_token: roamingSettings.values["refreshToken"],
                            client_id: "cv2T4BNlCZaaLrCr1aGqY35aqtZT3p5L",
                            client_secret: "G6hgTRflMJFgfsT7A83YOZhopNfWUTvZ",
                            grant_type: "refresh_token",
                            //redirect_uri: "https://thinkitdrinkitdata.azure-mobile.net/"
                        };

                        //milo: http_build_query breaks if I try to add it to a Class currently it works with script link in the base.html and located in the url_functions.js
                        //milo: Build Query to get Access from VEND
                        data = http_build_query(data, '');
                        data = urldecode(data);
console.log("Refresh token query Built for VEND " + data);

                        WinJS.xhr({
                            type: "POST",
                            url: "https://thinkitdrinkit.vendhq.com/api/1.0/token" + "?" + data

                        }).done(function completed(result) {
                            //milo: Results from VEND Token/refresh Token  
console.log("Refresh token results " + result);
                            var vendTokenResults = JSON.parse(result.responseText);
                            var vendToken = vendTokenResults.access_token;
                            var vendRefreshToken = vendTokenResults.refresh_token;
                            roamingSettings.values["Token"] = vendToken;
                            roamingSettings.values["refreshToken"] = vendRefreshToken;
                            var vendTokenType = vendTokenResults.token_type;
console.log("Vend refreshToken from POST " + vendToken);

                            WinJS.xhr({
                                type: "POST",
                                headers: {
                                    "Authorization": vendTokenType + " " + vendToken,
                                    "Content-type": "application/json"
                                },
                                url: "https://thinkitdrinkit.vendhq.com/api/products",
                                data: JSON.stringify({
                                    "id": vendId,
                                    "inventory": [{
                                    }]
                                }),

                            }).done(function completed(result) {
                                console.log(result);

                                var vendIdIssue = JSON.parse(result.responseText).product;
                                if (vendIdIssue == undefined) {//Vend product missing entirly even though there might be a id in azures db
                                    document.getElementById("out_of_stock2").removeAttribute("hidden");
                                    document.getElementById("out_of_stock2").textContent = "VEND product does not exist in VENDS website";
                                    document.getElementById("out_of_stock2").style.color = "red";
                                    document.getElementById("out_of_stock2").style.fontSize = "20px";
                                    document.getElementById("out_of_stock2").style.marginTop = "120px";
                                    document.getElementById("out_of_stock2").style.marginLeft = "290px";
                                    document.getElementById("out_of_stock2").style.position = "Absolute";
                                } else {
                                    var vendCount = JSON.parse(result.responseText).product.inventory[0].count;
                                    //console.log("Base Count from VEND ", vendCount);
                                    if (vendCount >= 1.00000) {
                                        WinJS.Navigation.navigate('pages/boost/boost.html')
                                    } else if (vendCount <= 0.00000) {//If all works this is the check that looks for missing not enough quantity 
                                        document.getElementById("out_of_stock").removeAttribute("hidden");
                                        document.getElementById("out_of_stock").textContent = "OUT OF STOCK, PLEASE PICK ANOTHER BASE";
                                        document.getElementById("out_of_stock").style.color = "red";
                                        document.getElementById("out_of_stock").style.fontSize = "20px";
                                        document.getElementById("out_of_stock").style.marginTop = "120px";
                                        document.getElementById("out_of_stock").style.marginLeft = "290px";
                                        document.getElementById("out_of_stock").style.position = "Absolute";
                                    }
                                }
                            },
                                 function error(err) {
                                     //console.log("GET fail", err.responseText)
                                     if (err.readyState === 0) {
                                         console.log("GET Token Request not initialized ");
                                     }
                                     else if (err.readyState === 1) {
                                         console.log("GET Token Server connection established");
                                     }
                                     else if (err.readyState === 2) {
                                         console.log("GET Token Request received");
                                     }
                                     else if (err.readyState === 3) {
                                         console.log("GET Token Processing request");
                                     }
                                     else if (err.readyState === 4 && err.status === 200) {
                                         console.log("GET Token Request finished response is ready and " + "status 200: OK");
                                     }
                                     else if (err.readyState === 4 && err.status === 400) {
                                         console.log("GET Token Bad Request " + "status 400: Bad Request");
                                     }
                                     else if (err.readyState === 4 && err.status === 404) {
                                         console.log("GET Token Request finished and response is ready but " + "status 404: Page not found");
                                     }
                                 });
                        },
                            function error(err) {
                                //console.log("POST fail", err.responseText)
                                if (err.readyState === 0) {
                                    console.log("POST Request not initialized ");
                                }
                                else if (err.readyState === 1) {
                                    console.log("POST Server connection established");
                                }
                                else if (err.readyState === 2) {
                                    console.log("POST Request received");
                                }
                                else if (err.readyState === 3) {
                                    console.log("POST Processing request");
                                }
                                else if (err.readyState === 4 && err.status === 200) {
                                    console.log("POST Request finished response is ready and " + "status 200: OK");
                                }
                                else if (err.readyState === 4 && err.status === 400) {
                                    console.log("POST Bad Request " + "status 400: Bad Request");
                                }
                                else if (err.readyState === 4 && err.status === 404) {
                                    console.log("POST Request finished and response is ready but " + "status 404: Page not found");
                                }
                            });
                    }

                    //launchAnyServiceWebAuth();
                    //function launchAnyServiceWebAuth() {

//roamingSettings.values["Token"] = "";
//milo: Token expired or empty
                        if (roamingSettings.values["Token"] == undefined || roamingSettings.values["Token"] == "") {
                            var serviceRequestURI = "https://secure.vendhq.com/connect?response_type=code&client_id=cv2T4BNlCZaaLrCr1aGqY35aqtZT3p5L&redirect_uri=https://thinkitdrinkitdata.azure-mobile.net/";

                            if (!isValidUriString(serviceRequestURI)) {
                                console.log("Enter a Start URI", "Web Authentication SDK Sample", "error");
                                return;
                            }

                            var callbackURL = "https://thinkitdrinkitdata.azure-mobile.net/";
                            if (!isValidUriString(callbackURL)) {
                                console.log("Enter an End URI", "Web Authentication SDK Sample", "error");
                                return;
                            }

                            var startURI = new Windows.Foundation.Uri(serviceRequestURI);
                            var endURI = new Windows.Foundation.Uri(callbackURL);
                            Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(//milo this also has a issue if its in a Class being called from another script file
                                Windows.Security.Authentication.Web.WebAuthenticationOptions.none, startURI, endURI)
                                .done(function (result) {

                                    var resultURI = result.responseData;
                                    //document.getElementById("AnyServiceReturnedToken").value = resultURI;
                                    var accessURI = new Windows.Foundation.Uri(resultURI);
                                    var vendQuery = accessURI.queryParsed;
                                    var check = vendQuery[0].name;
                                    var code = vendQuery[0].value;

                                    if (check == "code") {
                                        var data = {};

                                        data = {
                                            code: vendQuery[0].value,
                                            client_id: "cv2T4BNlCZaaLrCr1aGqY35aqtZT3p5L",
                                            client_secret: "G6hgTRflMJFgfsT7A83YOZhopNfWUTvZ",
                                            grant_type: "authorization_code",
                                            redirect_uri: "https://thinkitdrinkitdata.azure-mobile.net/"
                                        };

                                        //milo: http_build_query breaks if I try to add it to a Class currently it works with script link in the base.html and located in the url_functions.js
//milo: Build Query to get Access from VEND
                                        data = http_build_query(data, '');
                                        data = urldecode(data);
console.log("Build of the Query about to send to VEND " + data);
                                        WinJS.xhr({
                                            type: "POST",
                                            url: "https://thinkitdrinkit.vendhq.com/api/1.0/token" + "?" + data

                                        }).done(function completed(result) {
//milo: Results from VEND Token/refresh Token  
                                            console.log(result);
                                            var vendTokenResults = JSON.parse(result.responseText);
                                            var vendToken = vendTokenResults.access_token;
                                            var vendRefreshToken = vendTokenResults.refresh_token;
                                            roamingSettings.values["Token"] = vendToken;
                                            roamingSettings.values["refreshToken"] = vendRefreshToken;
                                            var vendTokenType = vendTokenResults.token_type;
console.log("Vend Token from POST" + vendToken);

                                            WinJS.xhr({
                                                type: "POST",
                                                headers: {
                                                    "Authorization": vendTokenType + " " + vendToken,
                                                    "Content-type": "application/json"
                                                },
                                                url: "https://thinkitdrinkit.vendhq.com/api/products",
                                                data: JSON.stringify({
                                                    "id": vendId,
                                                    "inventory": [{
                                                    }]
                                                }),

                                            }).done(function completed(result) {
                                                console.log(result);

                                                var vendIdIssue = JSON.parse(result.responseText).product;
                                                if (vendIdIssue == undefined) {//Vend product missing entirly even though there might be a id in azures db
                                                    document.getElementById("out_of_stock2").removeAttribute("hidden");
                                                    document.getElementById("out_of_stock2").textContent = "VEND product does not exist in VENDS website";
                                                    document.getElementById("out_of_stock2").style.color = "red";
                                                    document.getElementById("out_of_stock2").style.fontSize = "20px";
                                                    document.getElementById("out_of_stock2").style.marginTop = "120px";
                                                    document.getElementById("out_of_stock2").style.marginLeft = "290px";
                                                    document.getElementById("out_of_stock2").style.position = "Absolute";
                                                } else {
                                                    var vendCount = JSON.parse(result.responseText).product.inventory[0].count;
                                                    //console.log("Base Count from VEND ", vendCount);
                                                    if (vendCount >= 1.00000) {
                                                        WinJS.Navigation.navigate('pages/boost/boost.html')
                                                    } else if (vendCount <= 0.00000) {//If all works this is the check that looks for missing not enough quantity 
                                                        document.getElementById("out_of_stock").removeAttribute("hidden");
                                                        document.getElementById("out_of_stock").textContent = "OUT OF STOCK, PLEASE PICK ANOTHER BASE";
                                                        document.getElementById("out_of_stock").style.color = "red";
                                                        document.getElementById("out_of_stock").style.fontSize = "20px";
                                                        document.getElementById("out_of_stock").style.marginTop = "120px";
                                                        document.getElementById("out_of_stock").style.marginLeft = "290px";
                                                        document.getElementById("out_of_stock").style.position = "Absolute";
                                                    }
                                                }
                                            },
                                                 function error(err) {
                                                     //console.log("GET fail", err.responseText)
                                                     if (err.readyState === 0) {
                                                         console.log("GET Token Request not initialized ");
                                                     }
                                                     else if (err.readyState === 1) {
                                                         console.log("GET Token Server connection established");
                                                     }
                                                     else if (err.readyState === 2) {
                                                         console.log("GET Token Request received");
                                                     }
                                                     else if (err.readyState === 3) {
                                                         console.log("GET Token Processing request");
                                                     }
                                                     else if (err.readyState === 4 && err.status === 200) {
                                                         console.log("GET Token Request finished response is ready and " + "status 200: OK");
                                                     }
                                                     else if (err.readyState === 4 && err.status === 400) {
                                                         console.log("GET Token Bad Request " + "status 400: Bad Request");
                                                     }
                                                     else if (err.readyState === 4 && err.status === 404) {
                                                         console.log("GET Token Request finished and response is ready but " + "status 404: Page not found");
                                                     }
                                                 });
                                        },
                                            function error(err) {
                                                //console.log("POST fail", err.responseText)
                                                if (err.readyState === 0) {
                                                    console.log("POST Request not initialized ");
                                                }
                                                else if (err.readyState === 1) {
                                                    console.log("POST Server connection established");
                                                }
                                                else if (err.readyState === 2) {
                                                    console.log("POST Request received");
                                                }
                                                else if (err.readyState === 3) {
                                                    console.log("POST Processing request");
                                                }
                                                else if (err.readyState === 4 && err.status === 200) {
                                                    console.log("POST Request finished response is ready and " + "status 200: OK");
                                                }
                                                else if (err.readyState === 4 && err.status === 400) {
                                                    console.log("POST Bad Request " + "status 400: Bad Request");
                                                }
                                                else if (err.readyState === 4 && err.status === 404) {
                                                    console.log("POST Request finished and response is ready but " + "status 404: Page not found");
                                                }
                                            });
                                    } else if (check == "error") {
                                        console.log("Requesting authorisation code to VEND Declined access");
                                    }

                                }, function (err) {
                                    console.log("Error returned by WebAuth broker: " + err, "Web Authentication SDK Sample", "error");
                                });


//milo: If Token is not expired sign in automatically. If it is expired but saved in roaming then this will still fire but see it and empty the roaming and fire from launchAnyServiceWebAuth()
                        } else if (roamingSettings.values["Token"] != "" && roamingSettings.values["Token"] != isNaN) {

                            WinJS.xhr({
                                type: "POST",
                                headers: {
                                    "Authorization": "Bearer" + " " + roamingSettings.values["Token"],
                                    "Content-type": "application/json"
                                }, 
                                url: "https://thinkitdrinkit.vendhq.com/api/products",
                                data: JSON.stringify({
                                    "id": vendId,
                                    "inventory": [{
                                    }]
                                }),

                            }).done(function completed(result) {
                                 console.log(result);
                                 //milo: below allows the real GET which is the count to come back to app. Notes accessing json>>> http://www.mkyong.com/javascript/how-to-access-json-object-in-javascript/

                                    var vendIdIssue = JSON.parse(result.responseText).product;
                                    if (vendIdIssue == undefined) {//Vend product missing entirly even though there might be a id in azures db
                                        document.getElementById("out_of_stock2").removeAttribute("hidden");
                                        document.getElementById("out_of_stock2").textContent = "VEND product does not exist in VENDS website";
                                        document.getElementById("out_of_stock2").style.color = "red";
                                        document.getElementById("out_of_stock2").style.fontSize = "20px";
                                        document.getElementById("out_of_stock2").style.marginTop = "120px";
                                        document.getElementById("out_of_stock2").style.marginLeft = "290px";
                                        document.getElementById("out_of_stock2").style.position = "Absolute";
                                    } else {
                                        var vendCount = JSON.parse(result.responseText).product.inventory[0].count;
                                        //console.log("Base Count from VEND ", vendCount);
                                        if (vendCount >= 1.00000) {
                                            WinJS.Navigation.navigate('pages/boost/boost.html')
                                        } else if (vendCount <= 0.00000) {//If all works this is the check that looks for missing not enough quantity 
                                            document.getElementById("out_of_stock").removeAttribute("hidden");
                                            document.getElementById("out_of_stock").textContent = "OUT OF STOCK, PLEASE PICK ANOTHER BASE";
                                            document.getElementById("out_of_stock").style.color = "red";
                                            document.getElementById("out_of_stock").style.fontSize = "20px";
                                            document.getElementById("out_of_stock").style.marginTop = "120px";
                                            document.getElementById("out_of_stock").style.marginLeft = "290px";
                                            document.getElementById("out_of_stock").style.position = "Absolute";
                                        }
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
                                     roamingSettings.values["Token"] = "";
                                     refreshTokenSwitch();
                                     //launchAnyServiceWebAuth();
                                 }
                             });
                        }
                  // }//milo launchAnyServiceWebAuth()

                } else if (vendId == "null" || vendId == undefined || vendId == "") {//id missing in azure db but product in vend exists
                    document.getElementById("out_of_stock2").removeAttribute("hidden");
                    document.getElementById("out_of_stock2").textContent = "ID Missing in Azure DB.";
                    document.getElementById("out_of_stock2").style.color = "red";
                    document.getElementById("out_of_stock2").style.fontSize = "20px";
                    document.getElementById("out_of_stock2").style.marginTop = "120px";
                    document.getElementById("out_of_stock2").style.marginLeft = "290px";
                    document.getElementById("out_of_stock2").style.position = "Absolute";
                }
        },

        more_info: function (clicked) {
            roamingSettings.values["Item_choosen"] = clicked;
            roamingSettings.values["Clicked_cat"] = "Base";
            WinJS.Navigation.navigate('pages/item_info/item_info.html');
            keepInfo = true;
        },

        footer_click2: function () {
            var cat_selected_footer = roamingSettings.values["Cat_picked"];
            var id_sel_footer = roamingSettings.values["Id_sel_func"];

            if (cat_selected_footer === "Fitness & Exercise" && (id_sel_footer == 25 || id_sel_footer == 26 || id_sel_footer == 27 || id_sel_footer == 28)) {
                WinJS.Navigation.back(2);

            } else if (cat_selected_footer === "Competitive Sports" && id_sel_footer == 1) {
                WinJS.Navigation.back(4);

            } else {
                WinJS.Navigation.back(3);
            }
        },

        footer_click3: function () {
            var cat_selected_footer = roamingSettings.values["Cat_picked"];
            var id_sel_footer = roamingSettings.values["Id_sel_age"];

            if (cat_selected_footer === "Competitive Sports" && id_sel_footer == 1) {
                WinJS.Navigation.back(3);

            } else {
                WinJS.Navigation.back(2);
            }
        },

        //milo: recvery catagory has a func page and needs to jump 2 some other catagories dont have a func page so just need to jump 1.
        footer_click: function () {
            var id_sel_footer = roamingSettings.values["Id_sel_func"];

            if (id_sel_footer == 25 || id_sel_footer == 26 || id_sel_footer == 27 || id_sel_footer == 28) {
                WinJS.Navigation.back(1);

            } else {
                WinJS.Navigation.back(2);
            }
        }


    })

})();
