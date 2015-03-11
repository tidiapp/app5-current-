(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Age");
    var keepInfo = true;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getHome();
            design.changeTextColor();
            design.getHomeBorders("white");

            //var id = roamingSettings.values["Id_sel_sport"];
            //console.log("Age page picked id READY() = " + roamingSettings.values["Id_sel_age"]);
            //roamingSettings.values["I_ordered"] = "no";
            document.getElementById("home").removeAttribute("hidden");
            document.getElementById("more_info_home").setAttribute("hidden", true);
            document.getElementById("shop").setAttribute("hidden", true);
            var the_sel_age = roamingSettings.values["Cat_picked"];
            document.getElementById("choosen_age").textContent = the_sel_age + ".";
            document.getElementById("age_p").textContent = the_sel_age;
            document.getElementById("where_you_are").textContent = "You have choosen the " + roamingSettings.values["Cat_picked"] + " catagory." + " You have 4 steps left.";

            //milo: footer history & H1
            if (the_sel_age === "Competitive Sports") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img4"];
                document.getElementById("choosen_age").textContent = "Select Your Sport Objective.";
                document.getElementById("home2_div").removeAttribute("hidden");
                document.getElementById("home2_p").textContent = roamingSettings.values["Home2_name"];
                document.getElementById("home2_pic").src = roamingSettings.values["Home2_pic"];
                document.getElementById("where_you_are").textContent = "You have choosen " + roamingSettings.values["Home2_name"] + "." + " You have 3 steps left.";
            }

            //milo: footer history & H1
            if (the_sel_age === "Fitness & Exercise") {
                document.getElementById("choosen_age").textContent = "Physical and daily activity can improve your health, energy, and mood.";
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img5"];
                document.getElementById("where_you_are").textContent = "You have choosen the " + roamingSettings.values["Cat_picked"] + " catagory." + " You have 3 steps left.";
            }

            //milo: footer history & H1
            if (the_sel_age === "Energy") {
                //age_pic is really the catagory image that was picked previously
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img"];
            }

            //milo: footer history & H1
            if (the_sel_age === "Protein") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img2"];
                document.getElementById("choosen_age").innerHTML = roamingSettings.values["Cat_picked"] + ", " + " The foundation (building block) of human nutrition, health and well being.";
            }

            //milo: footer history & H1
            if (the_sel_age === "Nutrigenetic Test") {
                document.getElementById("age_pic").src = roamingSettings.values["Cat_picked_img3"];
                document.getElementById("where_you_are").textContent = "You have choosen the " + roamingSettings.values["Cat_picked"] + " kit catagory.";
                document.getElementById("choosen_age").textContent = "Choose Your Test Kit";
                document.getElementById("nutrigenetics_price_div").removeAttribute("hidden");
                server.finalPageCall();//if this moved to any other page and final page is not after this page then if will have a bug "BasePrice missing" 

//milo: so if other kits or orders are continued this will allow the adding of them all
            }

            server.home(the_sel_age);

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.            
            //using the removeInfo.js file to delete the last object of the array as long as an item exists
            remove.pop_list(age_data.model.age);
            //milo: removing keepInfo data when back button is used from func page.
            remove.pop_list(age_data.model.info_page2_func);
            remove.pop_list(age_data.model.info_page2)
            if (!keepInfo) {
                remove.pop_list(age_data.model.info)
            }
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    // the following namespace will be used to complete all click events on the home.html page
    var _choosen_cat = "";
    var nutrigeneticsPrice = "";

    WinJS.Namespace.define('clicked_me', {
        //the clicked function will show the photo and the more indept information of the clicked age group
        //at the bottem of the home.html page
        clicked: function (me) {          
            var updated_answer = me.replace(/^\s+/, '').replace(/\s+$/, '');
            _choosen_cat = updated_answer;
            server.home_sub(updated_answer);
            //milo: some code does not work well from here 
        },

        next_page: function () {
            keepInfo = false;
            //milo: will not recall if this is missing even though these are gloabaly defined. 
            var appData = Windows.Storage.ApplicationData.current;
            var roamingSettings = appData.roamingSettings;
            var id_sel = document.getElementById("id_sel").textContent;
            var vendId = document.getElementById("b_vend2").innerHTML;

            if (roamingSettings.values["Cat_picked"] === "Nutrigenetic Test") {
                roamingSettings.values["Nutrigenetics_name"] = _choosen_cat;
                roamingSettings.values["Nutrigenetics_vend"] = vendId;
                roamingSettings.values["Nutrigenetics_pic"] = document.getElementById("sel_age_pic").src;
                roamingSettings.values["Nutrigenetics_price"] = document.getElementById("nutrigenetics_price").textContent;
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
                                    document.getElementById("out_of_stock4").removeAttribute("hidden");
                                    document.getElementById("out_of_stock4").textContent = "VEND product does not exist in VENDS website";
                                } else {
                                    var vendCount = JSON.parse(result.responseText).product.inventory[0].count;
                                    //console.log("Base Count from VEND ", vendCount);
                                    if (vendCount >= 1.00000) {
                                        WinJS.Navigation.navigate('pages/final/final.html')
                                    } else if (vendCount <= 0.00000) {//If all works this is the check that looks for missing not enough quantity 
                                        document.getElementById("out_of_stock3").removeAttribute("hidden");
                                        document.getElementById("out_of_stock3").textContent = "OUT OF STOCK, PLEASE PICK ANOTHER KIT";
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
                                                document.getElementById("out_of_stock4").removeAttribute("hidden");
                                                document.getElementById("out_of_stock4").textContent = "VEND product does not exist in VENDS website";
                                            } else {
                                                var vendCount = JSON.parse(result.responseText).product.inventory[0].count;
                                                //console.log("Base Count from VEND ", vendCount);
                                                if (vendCount >= 1.00000) {
                                                    WinJS.Navigation.navigate('pages/final/final.html')
                                                } else if (vendCount <= 0.00000) {//If all works this is the check that looks for missing not enough quantity 
                                                    document.getElementById("out_of_stock3").removeAttribute("hidden");
                                                    document.getElementById("out_of_stock3").textContent = "OUT OF STOCK, PLEASE PICK ANOTHER KIT";
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
                                document.getElementById("out_of_stock4").removeAttribute("hidden");
                                document.getElementById("out_of_stock4").textContent = "VEND product does not exist in VENDS website";
                            } else {
                                var vendCount = JSON.parse(result.responseText).product.inventory[0].count;
                                //console.log("Base Count from VEND ", vendCount);
                                if (vendCount >= 1.00000) {
                                    WinJS.Navigation.navigate('pages/final/final.html')
                                } else if (vendCount <= 0.00000) {//If all works this is the check that looks for missing not enough quantity 
                                    document.getElementById("out_of_stock3").removeAttribute("hidden");
                                    document.getElementById("out_of_stock3").textContent = "OUT OF STOCK, PLEASE PICK ANOTHER KIT";
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
                             }
                         });
                    }
                } else if (vendId == "null" || vendId == undefined || vendId == "") {//id missing in azure db but product in vend exists
                    document.getElementById("out_of_stock4").removeAttribute("hidden");
                    document.getElementById("out_of_stock4").textContent = "ID Missing in Azure DB.";
                }
            }
            //milo: id's coming from Age DB
            else if (id_sel == 25 || id_sel == 26 || id_sel == 27 || id_sel == 28) {
                WinJS.Navigation.navigate('pages/base/base.html');
                var appData = Windows.Storage.ApplicationData.current;
                var roamingSettings = appData.roamingSettings;
                roamingSettings.values["Age_name"] = _choosen_cat;
                roamingSettings.values["Age_pic"] = document.getElementById("sel_age_pic").src;
                roamingSettings.values["Age_info"] = null;
                roamingSettings.values["Age_price"] = null;
                //milo: Id_sel_func is used instead of Id_sel_age since some catagories skip over func.html this helps with alowing to keep the code in base.html working properly. 
                roamingSettings.values["Id_sel_func"] = id_sel;

            } else {
                keepInfo = false;
                WinJS.Navigation.navigate('pages/func/func.html');
                var appData = Windows.Storage.ApplicationData.current;
                var roamingSettings = appData.roamingSettings;
                roamingSettings.values["Age_name"] = _choosen_cat;
                roamingSettings.values["Age_pic"] = document.getElementById("sel_age_pic").src;
                roamingSettings.values["Age_info"] = null;
                roamingSettings.values["Age_price"] = null;
                roamingSettings.values["Id_sel_age"] = id_sel;
            }
        },

        more_info: function (clicked) {
            var updated_answer = clicked.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Item_choosen"] = updated_answer;
            roamingSettings.values["Clicked_cat"] = "Age"
            WinJS.Navigation.navigate('pages/item_info/item_info.html');
        }
    })
    
})();
