// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var test1 = "";

    WinJS.UI.Pages.define("/pages/item_info/item_info.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.item_info();
            design.changeTextColor();
            var updated_name = roamingSettings.values["Item_choosen"].replace(/^\s+/, '').replace(/\s+$/, '');
            document.getElementById("item_name").textContent = "Information on the " + updated_name + ".";

            server.item_info(updated_name, roamingSettings.values["Clicked_cat"]);

            function isValidUriString(uriString) {
                var uri = null;
                try {
                    uri = new Windows.Foundation.Uri(uriString);
                }
                catch (err) {
                }
                return uri !== null;
            }
            var urlVal = roamingSettings.values["db_url"];
            if (!isValidUriString(urlVal)) {
                console.log("Enter a Start URI", "error");
                return;
            }

                var webviewControl = document.getElementById("webview");
                webviewControl.addEventListener("MSWebViewNavigationStarting", navigationStarting);
                webviewControl.addEventListener("MSWebViewNavigationCompleted", navigationCompleted);
                webviewControl.addEventListener("MSWebViewContentLoading", contentLoading);
                webviewControl.addEventListener("MSWebViewDOMContentLoaded", domContentLoaded);
                webviewControl.addEventListener("MSWebViewUnviewableContentIdentified", unviewableContentIdentified);
                //webviewControl.refresh();
                webviewControl.navigate(roamingSettings.values["db_url"]);
                //console.log("This is a test: " + roamingSettings.values["db_url"]);
                function updateNavigatingState(isNavigating) {
                    document.getElementById("progressRing").style.visibility = (isNavigating ? "visible" : "hidden");
                }
                function navigationStarting(e) {
                    updateNavigatingState(true);
                }
                function contentLoading(e) {
                    console.log("Loading content for " + e.uri + ".\n");
                }
                function domContentLoaded(e) {
                    console.log("Content for " + e.uri + " has finished loading.\n");
                }
                function navigationCompleted(e) {
                    updateNavigatingState(false);
                    if (e.isSuccess) {
                        //console.log("Navigation completed successfully");
                    } else {
                        console.log("Navigation failed with error code " + e.webErrorStatus);
                    }
                }
                function unviewableContentIdentified(e) {
                    updateNavigatingState(false);
                    console.log(e.uri + " cannot be displayed in WebView", "sdksample", "error");
                }
            

            //document.body.innerHTML.replace("eros", "<span id='key_word' onclick=''>Eros<span>")
            //console.log(document.getElementById("item_info_info").innerHTML);
            //console.log(console.log(document.getElementById("item_info_info").textContent))  

            //if (roamingSettings.values["Clicked_cat"] === "Age") {
            //    document.getElementById("item_info_label").setAttribute("hidden", true);
            //}

            //if (updated_name === "Protein") {
            //    document.getElementById("item_info_label").setAttribute("hidden", true);
            //}
           
            document.onload = function () {
                
               // console.log(document.getElementById("item_info_info").innerText.replace(/eros/g, "<span>cras</span>"));
                //if (document.getElementById("item_info_info2").textContent === "") {
                //    document.getElementById("item_info_info2").setAttribute("hidden", true)
                //}
                //if (document.getElementById("item_info_info3").textContent === "") {
                //    document.getElementById("item_info_info3").setAttribute("hidden", true)
                //}
                //function test() {
                //    document.getElementById("item_info_info").style.color = "blue";
                //};
                //test1 = test();

            };
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.item_info);
            // console.log(document.getElementById("item_info_info").innerHTML, "Hope?");
            //roamingSettings.values["db_url"] = "";
                      
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

})();
