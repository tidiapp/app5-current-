(function () {
    "use strict";
    WinJS.Namespace.define("tool", {

//milo: classic alert box 
        alert: function (content, title) {//content small text below the title which is like H1
            var msgBox = new Windows.UI.Popups.MessageDialog(content, title);
            msgBox.showAsync();
        },

//milo: collects query at end of url and puts it back together
        http_build_query: function (formdata, numeric_prefix, arg_separator) {
            //https://github.com/kvz/phpjs/blob/master/functions/url/http_build_query.js#L1
            //note: If the value is null, key and value are skipped in the http_build_query of PHP while in phpjs they are not.
            //depends on: urlencode
            //example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
            //returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
            //example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
            //returns 2: 'myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&php=hypertext+processor&cow=milk'

            var value, key, tmp = [],
              that = this;

            var _http_build_query_helper = function (key, val, arg_separator) {
                var k, tmp = [];
                if (val === true) {
                    val = '1';
                } else if (val === false) {
                    val = '0';
                }
                if (val != null) {
                    if (typeof val === 'object') {
                        for (k in val) {
                            if (val[k] != null) {
                                tmp.push(_http_build_query_helper(key + '[' + k + ']', val[k], arg_separator));
                            }
                        }
                        return tmp.join(arg_separator);
                    } else if (typeof val !== 'function') {
                        return that.encodeURIComponent(key) + '=' + that.encodeURIComponent(val);
                    } else {
                        throw new Error('There was an error processing for http_build_query().');
                    }
                } else {
                    return '';
                }
            };

            if (!arg_separator) {
                arg_separator = '&';
            }
            for (key in formdata) {
                value = formdata[key];
                if (numeric_prefix && !isNaN(key)) {
                    key = String(numeric_prefix) + key;
                }
                var query = _http_build_query_helper(key, value, arg_separator);
                if (query !== '') {
                    tmp.push(query);
                }
            }

            return tmp.join(arg_separator);

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


            //db_url.navigate(event.srcElement.textContent);
            //document.getElementById("item_info_info").navigate(event.srcElement.textContent);

        }



    })

})()