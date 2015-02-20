(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    WinJS.Namespace.define("tool", {

//milo: classic alert box 
        alert: function (content, title) {//content small text below the title which is like H1
            var msgBox = new Windows.UI.Popups.MessageDialog(content, title);
            msgBox.showAsync();
        },

//milo graying out buttons so they looked cliked 
        grayOut: function () {
            document.getElementById("sub_button").style.opacity = (.2);
        },

//milo more info webview grabbing urls frm db
        moreInfo: function (db_url) {
            //var db_url = document.getElementById("item_info_info");

            var webviewControl = document.getElementById("webview");
            webviewControl.navigate("http://storeapp.thinkitdrinkit.com/soccer/");

        },
    })

})()