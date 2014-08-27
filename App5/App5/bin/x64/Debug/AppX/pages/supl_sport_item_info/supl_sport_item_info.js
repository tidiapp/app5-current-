// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var test1 = "";

    WinJS.UI.Pages.define("/pages/supl_sport_item_info/supl_sport_item_info.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            

            //$('#webview').slimScroll({
            //    position: 'right',
            //    height: '140px',
            //    railVisible: true,
            //    alwaysVisible: true
            //});

//milo: WEBVIEW STUFF COMING FROM WORDPRESS AND IS REFRESHING EVERY 10 MINUTES
            
            //var webviewControl = document.getElementById("webview");
            //webviewControl.navigate("http://storeapp.thinkitdrinkit.com/soccer/");
            


            //$('#sport_info2').width('960').height('550').css('overflow-y', 'auto');
            $('#webview').width('950').height('540');

            $('#link_wrap_remove_stuff').width('560').height('550').css('overflow-y', 'auto');
            $('#webview2').width('550').height('540');

            document.getElementById("scroll_bar").removeAttribute("hidden");
            document.getElementById("scroll_bar").textContent = "SCROLL TO CONTINUE";

            document.getElementById("scroll_bar2").removeAttribute("hidden");
            document.getElementById("scroll_bar2").textContent = "SCROLL TO CONTINUE";




            //document.getElementById("print").addEventListener("click", PrintButtonHandler, false);
            // Register for Print Contract
            registerForPrintContract();

            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getSport_info();

            design.changeTextColor();
            var updated_name = roamingSettings.values["Item_choosen"].replace(/^\s+/, '').replace(/\s+$/, '');
            document.getElementById("item_name").textContent = "Information on " + updated_name + ".";

            server.sport_info(updated_name);

            //$("#main_footer").hide();
            //document.getElementById("link_webview").textContent = updated_name;
            //document.onload = function () {
                
            //   // console.log(document.getElementById("sport_info_info").innerText.replace(/eros/g, "<span>cras</span>"));
            //    if (document.getElementById("sport_info_info2").textContent === "") {
            //        document.getElementById("sport_info_info2").setAttribute("hidden", true)
            //    }
            //    function test() {
            //        document.getElementById("sport_info_info").style.color = "blue";
            //    };
            //    test1 = test();
            //};

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.

            //milo:this helps with reapeating duplicates
            remove.pop_list(age_data.model.item_info_sport);
            remove.pop_list(age_data.model.info_sport);
        },

        updateLayout: function (element) {
            // TODO: Respond to changes in layout.
        }
    });

    function registerForPrintContract() {
        var printManager = Windows.Graphics.Printing.PrintManager.getForCurrentView();
        printManager.onprinttaskrequested = onPrintTaskRequested;
        console.log("Print Contract registered. Use Print button to print.", "sample", "status");
    }
    function onPrintTaskRequested(printEvent) {
        var printTask = printEvent.request.createPrintTask("Print Sample", function (args) {
            args.setSource(MSApp.getHtmlPrintDocumentSource(document));

            // Register the handler for print task completion event
            printTask.oncompleted = onPrintTaskCompleted;
        });
    }
    function onPrintTaskCompleted(printTaskCompletionEvent) {
        // Notify the user about the failure
        if (printTaskCompletionEvent.completion === Windows.Graphics.Printing.PrintTaskCompletion.failed) {
            WinJS.log && WinJS.log("Failed to print.", "sample", "error");
        }
    }
    var beforePrint = function () {
        // Replace with code to be executed just before printing the current document:
        $(".print_charm, .link_wrap").hide();
        $("#win_listview_host .win-listview").height(1150);
        $("#win_listview_host .win-viewport").height(1100).css('overflow-y', 'hidden');

        //$(".print_charm_content").height("100%");
        //$(".win-itembox").height("100%");
        //$(".article").width(1000).height(2000);
    };

    /// <summary>
    /// Executed immediately after printing.
    /// </summary>
    var afterPrint = function () {
        $(".print_charm, .link_wrap").show();
        $("#win_listview_host .win-listview").height(500);
        $("#win_listview_host .win-viewport").height(490).css('overflow-y', 'visible');
        //$(".win-listview").height(580);
        //$(".print_charm_content").height(500);
        //$(".win-itembox").height("100%");
    };

    WinJS.Namespace.define("webview_clicked", {

        clicked1: function () {
            //var updated_name = roamingSettings.values["Item_choosen"].replace(/^\s+/, '').replace(/\s+$/, '');
            if (age_data.model.item_info_sport.length > 0) {
                //document.getElementById("webview2").setAttribute("hidden", true);
                //document.getElementById("webview3").setAttribute("hidden", true);

                //document.getElementById("webview").removeAttribute("hidden");
                //document.getElementById("webview").navigate(event.srcElement.textContent);
                //document.getElementById("webview").addEventListener("MSWebViewNavigationStarting", inner_site_browsing);
            } 
        },

        PrintButtonHandler: function () {
            // Optionally, functions to be executed immediately before and after printing can be configured as following:
            window.document.body.onbeforeprint = beforePrint;
            window.document.body.onafterprint = afterPrint;

            // If the print contract is registered, the print experience is invoked.
            Windows.Graphics.Printing.PrintManager.showPrintUIAsync();
        }

    });

    function inner_site_browsing(e) {
        var Uri = new Windows.Foundation.Uri(e.uri);
        if (Uri.domain != event.srcElement.textContent) {
            e.preventDefault();
        }
    }

    //setTimeout(test1, 5000)
})();
