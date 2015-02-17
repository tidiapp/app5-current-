//https://github.com/kvz/phpjs/blob/master/functions/url/http_build_query.js#L1
function http_build_query(formdata, numeric_prefix, arg_separator) {
    //  discuss at: http://phpjs.org/functions/http_build_query/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Legaev Andrey
    // improved by: Michael White (http://getsprink.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Brett Zamir (http://brett-zamir.me)
    //  revised by: stag019
    //    input by: Dreamer
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)
    //        note: If the value is null, key and value are skipped in the http_build_query of PHP while in phpjs they are not.
    //  depends on: urlencode
    //   example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
    //   returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
    //   example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
    //   returns 2: 'myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&php=hypertext+processor&cow=milk'


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
}

function urldecode(str) {
    //       discuss at: http://phpjs.org/functions/urldecode/
    //             note: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
    //             note: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
    //             note: pages served as UTF-8
    //        example 1: urldecode('Kevin+van+Zonneveld%21');
    //        returns 1: 'Kevin van Zonneveld!'
    //        example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
    //        returns 2: 'http://kevin.vanzonneveld.net/'
    //        example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
    //        returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
    //        example 4: urldecode('%E5%A5%BD%3_4');
    //        returns 4: '\u597d%3_4'

    return decodeURIComponent((str + '')
      .replace(/%(?![\da-f]{2})/gi, function () {
          // PHP tolerates poorly formed escape sequences
          return '%25';
      })
      .replace(/\+/g, '%20'));
}




//function stream_context_create(options, params) {
//    // http://kevin.vanzonneveld.net
//    // +   original by: Brett Zamir (http://brett-zamir.me)
//    // %          note 1: Can be made to work as a wrapper for proprietary contexts as well
//    // *     example 1: var opts = {http:{ method:'GET', header: 'Accept-language: en\r\nCookie: foo=bar\r\n' } };
//    // *     example 1: var context = stream_context_create(opts);
//    // *     example 1: get_resource_type(context);
//    // *     returns 1: 'stream-context'
//    var resource = {};
//    options = options || {};
//    // params.notification is only property currently in PHP for params
//    // BEGIN REDUNDANT
//    this.php_js = this.php_js || {};
//    this.php_js.resourceIdCounter = this.php_js.resourceIdCounter || 0;

//    function PHPJS_Resource(type, id, opener) { // Can reuse the following for other resources, just changing the instantiation
//        // See http://php.net/manual/en/resource.php for types
//        this.type = type;
//        this.id = id;
//        this.opener = opener;
//    }
//    PHPJS_Resource.prototype.toString = function () {
//        return 'Resource id #' + this.id;
//    };
//    PHPJS_Resource.prototype.get_resource_type = function () {
//        return this.type;
//    };
//    PHPJS_Resource.prototype.var_dump = function () {
//        return 'resource(' + this.id + ') of type (' + this.type + ')';
//        // return 'resource('+this.id+'), '+this.type+')'; another format
//    };
//    // END REDUNDANT
//    this.php_js.resourceIdCounter++;

//    resource = new PHPJS_Resource('stream-context', this.php_js.resourceIdCounter, 'stream_context_create');
//    resource.stream_options = options;
//    resource.stream_params = params;

//    return resource;
//}






//function get_resource_type(handle) {
//    // http://kevin.vanzonneveld.net
//    // +   original by: Brett Zamir (http://brett-zamir.me)
//    // *     example 1: get_resource_type('a');
//    // *     returns 1: false
//    var getFuncName = function (fn) {
//        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
//        if (!name) {
//            return '(Anonymous)';
//        }
//        return name[1];
//    };
//    if (!handle || typeof handle !== 'object' || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
//        return false;
//    }

//    return handle.get_resource_type();
//}








//function file_get_contents(url, flags, context, offset, maxLen) {
//    //  discuss at: http://phpjs.org/functions/file_get_contents/
//    // original by: Legaev Andrey
//    //    input by: Jani Hartikainen
//    //    input by: Raphael (Ao) RUDLER
//    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
//    // improved by: Brett Zamir (http://brett-zamir.me)
//    // bugfixed by: Brett Zamir (http://brett-zamir.me)
//    //        note: This function uses XmlHttpRequest and cannot retrieve resource from different domain without modifications.
//    //        note: Synchronous by default (as in PHP) so may lock up browser. Can
//    //        note: get async by setting a custom "phpjs.async" property to true and "notification" for an
//    //        note: optional callback (both as context params, with responseText, and other JS-specific
//    //        note: request properties available via 'this'). Note that file_get_contents() will not return the text
//    //        note: in such a case (use this.responseText within the callback). Or, consider using
//    //        note: jQuery's: $('#divId').load('http://url') instead.
//    //        note: The context argument is only implemented for http, and only partially (see below for
//    //        note: "Presently unimplemented HTTP context options"); also the arguments passed to
//    //        note: notification are incomplete
//    //        test: skip
//    //   example 1: var buf file_get_contents('http://google.com');
//    //   example 1: buf.indexOf('Google') !== -1
//    //   returns 1: true

//    var tmp, headers = [],
//      newTmp = [],
//      k = 0,
//      i = 0,
//      href = '',
//      pathPos = -1,
//      flagNames = 0,
//      content = null,
//      http_stream = false;
//    var func = function (value) {
//        return value.substring(1) !== '';
//    };

//    // BEGIN REDUNDANT
//    this.php_js = this.php_js || {};
//    this.php_js.ini = this.php_js.ini || {};
//    // END REDUNDANT
//    var ini = this.php_js.ini;
//    context = context || this.php_js.default_streams_context || null;

//    if (!flags) {
//        flags = 0;
//    }
//    var OPTS = {
//        FILE_USE_INCLUDE_PATH: 1,
//        FILE_TEXT: 32,
//        FILE_BINARY: 64
//    };
//    if (typeof flags === 'number') {
//        // Allow for a single string or an array of string flags
//        flagNames = flags;
//    } else {
//        flags = [].concat(flags);
//        for (i = 0; i < flags.length; i++) {
//            if (OPTS[flags[i]]) {
//                flagNames = flagNames | OPTS[flags[i]];
//            }
//        }
//    }

//    if (flagNames & OPTS.FILE_BINARY && (flagNames & OPTS.FILE_TEXT)) {
//        // These flags shouldn't be together
//        throw 'You cannot pass both FILE_BINARY and FILE_TEXT to file_get_contents()';
//    }

//    if ((flagNames & OPTS.FILE_USE_INCLUDE_PATH) && ini.include_path && ini.include_path.local_value) {
//        var slash = ini.include_path.local_value.indexOf('/') !== -1 ? '/' : '\\';
//        url = ini.include_path.local_value + slash + url;
//    } else if (!/^(https?|file):/.test(url)) {
//        // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
//        href = this.window.location.href;
//        pathPos = url.indexOf('/') === 0 ? href.indexOf('/', 8) - 1 : href.lastIndexOf('/');
//        url = href.slice(0, pathPos + 1) + url;
//    }

//    var http_options;
//    if (context) {
//        http_options = context.stream_options && context.stream_options.http;
//        http_stream = !!http_options;
//    }

//    if (!context || !context.stream_options || http_stream) {
//        var req = this.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
//        if (!req) {
//            throw new Error('XMLHttpRequest not supported');
//        }

//        var method = http_stream ? http_options.method : 'GET';
//        var async = !!(context && context.stream_params && context.stream_params['phpjs.async']);

//        if (ini['phpjs.ajaxBypassCache'] && ini['phpjs.ajaxBypassCache'].local_value) {
//            url += (url.match(/\?/) == null ? '?' : '&') + (new Date())
//              .getTime(); // Give optional means of forcing bypass of cache
//        }

//        req.open(method, url, async);
//        if (async) {
//            var notification = context.stream_params.notification;
//            if (typeof notification === 'function') {
//                // Fix: make work with req.addEventListener if available: https://developer.mozilla.org/En/Using_XMLHttpRequest
//                if (0 && req.addEventListener) {
//                    // Unimplemented so don't allow to get here
//                    /*
//                    req.addEventListener('progress', updateProgress, false);
//                    req.addEventListener('load', transferComplete, false);
//                    req.addEventListener('error', transferFailed, false);
//                    req.addEventListener('abort', transferCanceled, false);
//                    */
//                } else {
//                    req.onreadystatechange = function (aEvt) {
//                        // aEvt has stopPropagation(), preventDefault(); see https://developer.mozilla.org/en/NsIDOMEvent
//                        // Other XMLHttpRequest properties: multipart, responseXML, status, statusText, upload, withCredentials
//                        /*
//              PHP Constants:
//              STREAM_NOTIFY_RESOLVE   1       A remote address required for this stream has been resolved, or the resolution failed. See severity  for an indication of which happened.
//              STREAM_NOTIFY_CONNECT   2     A connection with an external resource has been established.
//              STREAM_NOTIFY_AUTH_REQUIRED 3     Additional authorization is required to access the specified resource. Typical issued with severity level of STREAM_NOTIFY_SEVERITY_ERR.
//              STREAM_NOTIFY_MIME_TYPE_IS  4     The mime-type of resource has been identified, refer to message for a description of the discovered type.
//              STREAM_NOTIFY_FILE_SIZE_IS  5     The size of the resource has been discovered.
//              STREAM_NOTIFY_REDIRECTED    6     The external resource has redirected the stream to an alternate location. Refer to message .
//              STREAM_NOTIFY_PROGRESS  7     Indicates current progress of the stream transfer in bytes_transferred and possibly bytes_max as well.
//              STREAM_NOTIFY_COMPLETED 8     There is no more data available on the stream.
//              STREAM_NOTIFY_FAILURE   9     A generic error occurred on the stream, consult message and message_code for details.
//              STREAM_NOTIFY_AUTH_RESULT   10     Authorization has been completed (with or without success).
//              STREAM_NOTIFY_SEVERITY_INFO 0     Normal, non-error related, notification.
//              STREAM_NOTIFY_SEVERITY_WARN 1     Non critical error condition. Processing may continue.
//              STREAM_NOTIFY_SEVERITY_ERR  2     A critical error occurred. Processing cannot continue.
//              */
//                        var objContext = {
//                            responseText: req.responseText,
//                            responseXML: req.responseXML,
//                            status: req.status,
//                            statusText: req.statusText,
//                            readyState: req.readyState,
//                            evt: aEvt
//                        }; // properties are not available in PHP, but offered on notification via 'this' for convenience
//                        // notification args: notification_code, severity, message, message_code, bytes_transferred, bytes_max (all int's except string 'message')
//                        // Need to add message, etc.
//                        var bytes_transferred;
//                        switch (req.readyState) {
//                            case 0:
//                                //     UNINITIALIZED     open() has not been called yet.
//                                notification.call(objContext, 0, 0, '', 0, 0, 0);
//                                break;
//                            case 1:
//                                //     LOADING     send() has not been called yet.
//                                notification.call(objContext, 0, 0, '', 0, 0, 0);
//                                break;
//                            case 2:
//                                //     LOADED     send() has been called, and headers and status are available.
//                                notification.call(objContext, 0, 0, '', 0, 0, 0);
//                                break;
//                            case 3:
//                                //     INTERACTIVE     Downloading; responseText holds partial data.
//                                // One character is two bytes
//                                bytes_transferred = req.responseText.length * 2;
//                                notification.call(objContext, 7, 0, '', 0, bytes_transferred, 0);
//                                break;
//                            case 4:
//                                //     COMPLETED     The operation is complete.
//                                if (req.status >= 200 && req.status < 400) {
//                                    // One character is two bytes
//                                    bytes_transferred = req.responseText.length * 2;
//                                    notification.call(objContext, 8, 0, '', req.status, bytes_transferred, 0);
//                                } else if (req.status === 403) {
//                                    // Fix: These two are finished except for message
//                                    notification.call(objContext, 10, 2, '', req.status, 0, 0);
//                                } else {
//                                    // Errors
//                                    notification.call(objContext, 9, 2, '', req.status, 0, 0);
//                                }
//                                break;
//                            default:
//                                throw 'Unrecognized ready state for file_get_contents()';
//                        }
//                    };
//                }
//            }
//        }

//        if (http_stream) {
//            var sendHeaders = (http_options.header && http_options.header.split(/\r?\n/)) || [];
//            var userAgentSent = false;
//            for (i = 0; i < sendHeaders.length; i++) {
//                var sendHeader = sendHeaders[i];
//                var breakPos = sendHeader.search(/:\s*/);
//                var sendHeaderName = sendHeader.substring(0, breakPos);
//                req.setRequestHeader(sendHeaderName, sendHeader.substring(breakPos + 1));
//                if (sendHeaderName === 'User-Agent') {
//                    userAgentSent = true;
//                }
//            }
//            if (!userAgentSent) {
//                var user_agent = http_options.user_agent || (ini.user_agent && ini.user_agent.local_value);
//                if (user_agent) {
//                    req.setRequestHeader('User-Agent', user_agent);
//                }
//            }
//            content = http_options.content || null;
//            /*
//            // Presently unimplemented HTTP context options
//            // When set to TRUE, the entire URI will be used when constructing the request. (i.e. GET http://www.example.com/path/to/file.html HTTP/1.0). While this is a non-standard request format, some proxy servers require it.
//            var request_fulluri = http_options.request_fulluri || false;
//            // The max number of redirects to follow. Value 1 or less means that no redirects are followed.
//            var max_redirects = http_options.max_redirects || 20;
//            // HTTP protocol version
//            var protocol_version = http_options.protocol_version || 1.0;
//            // Read timeout in seconds, specified by a float
//            var timeout = http_options.timeout || (ini.default_socket_timeout && ini.default_socket_timeout.local_value);
//            // Fetch the content even on failure status codes.
//            var ignore_errors = http_options.ignore_errors || false;
//            */
//        }

//        if (flagNames & OPTS.FILE_TEXT) {
//            // Overrides how encoding is treated (regardless of what is returned from the server)
//            var content_type = 'text/html';
//            if (http_options && http_options['phpjs.override']) {
//                // Fix: Could allow for non-HTTP as well
//                // We use this, e.g., in gettext-related functions if character set
//                content_type = http_options['phpjs.override'];
//                //   overridden earlier by bind_textdomain_codeset()
//            } else {
//                var encoding = (ini['unicode.stream_encoding'] && ini['unicode.stream_encoding'].local_value) ||
//                  'UTF-8';
//                if (http_options && http_options.header && (/^content-type:/im)
//                  .test(http_options.header)) {
//                    // We'll assume a content-type expects its own specified encoding if present
//                    // We let any header encoding stand
//                    content_type = http_options.header.match(/^content-type:\s*(.*)$/im)[1];
//                }
//                if (!(/;\s*charset=/)
//                  .test(content_type)) {
//                    // If no encoding
//                    content_type += '; charset=' + encoding;
//                }
//            }
//            req.overrideMimeType(content_type);
//        }
//            // Default is FILE_BINARY, but for binary, we apparently deviate from PHP in requiring the flag, since many if not
//            //     most people will also want a way to have it be auto-converted into native JavaScript text instead
//        else if (flagNames & OPTS.FILE_BINARY) {
//            // Trick at https://developer.mozilla.org/En/Using_XMLHttpRequest to get binary
//            req.overrideMimeType('text/plain; charset=x-user-defined');
//            // Getting an individual byte then requires:
//            // throw away high-order byte (f7) where x is 0 to responseText.length-1 (see notes in our substr())
//            // responseText.charCodeAt(x) & 0xFF;
//        }

//        try {
//            if (http_options && http_options['phpjs.sendAsBinary']) {
//                // For content sent in a POST or PUT request (use with file_put_contents()?)
//                // In Firefox, only available FF3+
//                req.sendAsBinary(content);
//            } else {
//                req.send(content);
//            }
//        } catch (e) {
//            // catches exception reported in issue #66
//            return false;
//        }

//        tmp = req.getAllResponseHeaders();
//        if (tmp) {
//            tmp = tmp.split('\n');
//            for (k = 0; k < tmp.length; k++) {
//                if (func(tmp[k])) {
//                    newTmp.push(tmp[k]);
//                }
//            }
//            tmp = newTmp;
//            for (i = 0; i < tmp.length; i++) {
//                headers[i] = tmp[i];
//            }
//            // see http://php.net/manual/en/reserved.variables.httpresponseheader.php
//            this.$http_response_header = headers;
//        }

//        if (offset || maxLen) {
//            if (maxLen) {
//                return req.responseText.substr(offset || 0, maxLen);
//            }
//            return req.responseText.substr(offset);
//        }
//        return req.responseText;
//    }
//    return false;
//}