/*!
  Copyright (C) Microsoft. All rights reserved.
  This library is supported for use in Windows Store apps only.
*/
/// <disable>EnableStrictMode.EnforceModulePattern</disable>
"use strict";

var adParams = null;
var prmParams = null;
var pointerDown = false;
var appParams = null;

var MSG_TYPE_SCRIPT = "script";
var MSG_TYPE_ADPARAMS = "adParams";
var MSG_TYPE_PRMPARAMS = "prmParams";
var MSG_TYPE_APPPARAMS = "appParams";
var MSG_TYPE_INIT = "init";
var MSG_TYPE_ERROR = "error";
var MSG_TYPE_SETMAXSIZE = "setMaxSize";
var MSG_TYPE_SETSCREENSIZE = "setScreenSize";
var MSG_TYPE_SETSIZE = "setSize";
var MSG_TYPE_SETSTATE = "setState";
var MSG_TYPE_WIREAPPEVENTS = "wireAppEvents";
var MSG_TYPE_START = "ormmaStart";
var MSG_TYPE_ORMMA_RESPONSE = "ormmaResponse";
var MSG_TYPE_FIRESHAKE = "fireShake";
var MSG_TYPE_UPDATETILTCOORDS = "updateTiltCoords";
var MSG_TYPE_UPDATEORIENTATION = "updateOrienation";
var MSG_TYPE_VIEWABLECHANGE = "viewableChange";
var MSG_TYPE_SETNETWORK = "setNetwork";
var MSG_TYPE_SETLOCALE = "setLocale";
var MSG_TYPE_SETSDKINFO = "setSdkInfo";
var MSG_TYPE_SETCAPABILITY = "setCapability";
var MSG_TYPE_SETADINSTANCESTATE = "setAdInstanceState";
var MSG_TYPE_SETFOCUS = "setFocus";
var MSG_TYPE_ONPOINTERDOWN = "MSPointerDown";
var MSG_TYPE_ONPOINTERUP = "MSPointerUp";
var MSG_TYPE_ONPOINTERMOVE = "MSPointerMove";
var MSG_TYPE_ONMOUSEWHEEL = "MSMouseWheel";
var MSG_TYPE_ONMANIPSTATECHANGED = "MSManipulationStateChanged";
var MSG_TYPE_ADINITIALIZED = "adInitialized";

// If updating this, make sure to also update in ad control.
var EVENT_TYPE_ENUM = {
    All: ~0,
    PointerDown: 1 << 0,
    PointerUp: 1 << 1,
    PointerMove: 1 << 2,
    // 1 << 3, was used by pointer hover but freed up due to TFS #864590
    MouseWheel: 1 << 4,
    ManipulationStateChanged: 1 << 5
    // We can only send a max of 1<<31 events this way.
};

var applicationEventHandlers = {
    onPointerDown: null,
    onPointerUp: null,
    onMouseWheel: null,
    onPointerMove: null,
    onManipulationStateChanged: null
};

function injectJavaScript(scriptTxt) {
    try {
        var scr = document.createElement("script");
        var headID = document.getElementsByTagName("head")[0];
        scr.innerHTML = scriptTxt;
        headID.appendChild(scr);
    }
    catch (err) {
        var message = (err === null || typeof (err) === "undefined") ? "unknown" : err.message;
        reportAdError("error injecting javascript: " + message);
    }
}

function receiveMessage(msg) {
    try {
        if (typeof (MSG_TYPE_SCRIPT) === "undefined" || typeof (JSON) === "undefined") {
            // If these variables are not defined, it means the iframe has been removed from the document and is being cleaned up.
            // This can occur if ad frames are being repeatedly created/desctroyed very very quickly (not a likely scenario).
            // But if the iframe has been removed, there is no need to process pending messages for it, so just return.
            return;
        }

        var msgType = null;
        var msgContent = null;
        var colonIx = msg.indexOf(":");
        if (colonIx < 0) {
            msgType = msg;
        } else {
            msgType = msg.substr(0, colonIx);
            msgContent = msg.substr(colonIx + 1);
        }

        if (msgType === MSG_TYPE_SCRIPT) {
            if (msgContent !== "") {
                injectJavaScript(msgContent);
            }
        } else if (msgType === MSG_TYPE_ADPARAMS) {
            // The message is a JSON blob containing the ad parameters. These will
            // be passed to the Renderer during initialization.
            if (msgContent !== "") {
                try {
                    adParams = JSON.parse(msgContent);
                }
                catch (err) {
                    reportAdError("Ad params JSON parse error: " + err.message);
                }
            }
        } else if (msgType === MSG_TYPE_PRMPARAMS) {
            // The message is a JSON blob containing the prm parameters. These will
            // be passed to the Renderer during initialization.
            if (msgContent !== "") {
                try {
                    prmParams = JSON.parse(msgContent);
                }
                catch (err) {
                    reportAdError("Prm params JSON parse error: " + err.message);
                }
            }
        } else if (msgType === MSG_TYPE_APPPARAMS) {
            // The message is a JSON blob containing the app parameters. These will
            // be passed to the Renderer during initialization.
            if (msgContent !== "") {
                try {
                    appParams = JSON.parse(msgContent);
                }
                catch (err) {
                    reportAdError("App params JSON parse error: " + err.message);
                }
            }
        } else if (msgType === MSG_TYPE_INIT) {

            if (Ormma.getState() === "expanded") {
                // if we're expanded setup escape key close
                document.addEventListener("keyup", function (e) {
                    /*escape key is code 27*/
                    if (e.keyCode === 27) {
                        Ormma.close();
                    }
                });
                var adBodyEl = document.getElementById("adBody");
                if (adBodyEl !== null) {
                    adBodyEl.focus();
                }
            } else {
                document.addEventListener("keyup", function (e) {
                    if (e.keyCode === 32 || e.keyCode === 13) {
                        Ormma._clicked();
                    }
                });
            }

            try {
                if (typeof (microsoft) !== "undefined" && typeof (msMainAdDiv) !== "undefined") {
                    window.renderer = new microsoft.advertising.renderer();
                    window.renderer.init({ creativeData: adParams, container: msMainAdDiv.id, prm: prmParams, appOptions: appParams });
                    window.renderer.renderAd();
                }
                postToLocal(MSG_TYPE_ADINITIALIZED);
            }
            catch (msg) {
                reportAdError("unable to initialize and load renderer: " + msg);
                return;
            }
        } else if (msgType === MSG_TYPE_SETADINSTANCESTATE) {
            Ormma._setAdInstanceState(msgContent);
        } else {
            if (typeof (Ormma) !== "undefined" && Ormma !== null) {
                if (msgType === MSG_TYPE_SETSIZE) {
                    var size = JSON.parse(msgContent);
                    Ormma._setSize(size.width, size.height);
                } else if (msgType === MSG_TYPE_SETMAXSIZE) {
                    var maxSize = JSON.parse(msgContent);
                    Ormma._maxSize = maxSize;
                } else if (msgType === MSG_TYPE_SETSCREENSIZE) {
                    var screenSize = JSON.parse(msgContent);
                    Ormma._setScreenSize(screenSize.width, screenSize.height);
                } else if (msgType === MSG_TYPE_SETSTATE) {
                    Ormma._setState(msgContent);
                } else if (msgType === MSG_TYPE_SETLOCALE) {
                    Ormma._setLocale(msgContent);
                } else if (msgType === MSG_TYPE_SETSDKINFO) {
                    var sdkInfo = JSON.parse(msgContent);
                    Ormma._setSdkVersion(sdkInfo.sdkVersion, sdkInfo.client, sdkInfo.runtimeType);
                } else if (msgType === MSG_TYPE_SETCAPABILITY) {
                    var capabilityInfo = JSON.parse(msgContent);
                    Ormma._setCapability(capabilityInfo.capability, capabilityInfo.value);
                } else if (msgType === MSG_TYPE_START) {
                    Ormma._init(msgContent);
                } else if (msgType === MSG_TYPE_FIRESHAKE) {
                    Ormma._shake();
                } else if (msgType === MSG_TYPE_ORMMA_RESPONSE) {
                    Ormma._sendResponse(JSON.parse(msgContent));
                } else if (msgType === MSG_TYPE_UPDATETILTCOORDS) {
                    var coords = JSON.parse(msgContent);
                    Ormma._tiltChange(coords);
                } else if (msgType === MSG_TYPE_VIEWABLECHANGE) {
                    var viewable = JSON.parse(msgContent);
                    Ormma._viewableChange(viewable.viewable);
                } else if (msgType === MSG_TYPE_UPDATEORIENTATION) {
                    var orienation = JSON.parse(msgContent);
                    Ormma._setOrientation(orienation.orientation);
                } else if (msgType === MSG_TYPE_SETNETWORK) {
                    Ormma._setNetwork(msgContent);
                } else if (msgType === MSG_TYPE_WIREAPPEVENTS) {
                    var params = JSON.parse(msgContent);
                    _wireApplicationEvents(params);
                } else if (msgType === MSG_TYPE_ERROR) {
                    var errorInfo = JSON.parse(msgContent);
                    Ormma._throwError(errorInfo.action, errorInfo.message);
                } else if (msgType === MSG_TYPE_SETFOCUS) {
                    if (msgContent === "true") {
                        document.body.focus();
                    }
                }
            }
        }
    }
    catch (err) {
        reportAdError("unable to process SDK message, error=" + err);
        //Error during receive message. This is often caused by render ready ads over-writing basic funcitonality. 
    }
}

function reportAdError(msg) {
    postToLocal(MSG_TYPE_ERROR + ":" + msg);
}

function postToLocal(msg) {
    window.external.notify(msg)
}

function _wireApplicationEvents(params) {
    if (params === null || typeof (params) === "undefined") {
        return;
    }

    var eventMask = parseInt(params.events);

    // NOTE: these MUST be attached to window and using bubbling (false param to addEventListener), otherwise the renderer will not be
    //   able to intercept and cancel (stopImmediatePropagation()) on these events if needed!
    //   There renderer will attach to a more down level element (ie: window.document). Because these are in bubbling phase the renderer
    //   will be able to call stopImmediatePropagation and thus the event will stop bubbling at that point. Bubbling events execute
    //   on the lowest level element first.

    if ((eventMask & EVENT_TYPE_ENUM.PointerDown) !== 0 && typeof (applicationEventHandlers.onPointerDown) !== "function") {
        applicationEventHandlers.onPointerDown = function (evt) {
            if (evt.which === 2 && params.preventDefault) {
                evt.preventDefault(); // prevent the default windows handling of mouse wheel, hard code for appex...
            }

            pointerDown = true;
            postToLocal(MSG_TYPE_ONPOINTERDOWN + ":" + JSON.stringify({
                "clientX": evt.clientX,
                "clientY": evt.clientY,
                "pointerType": evt.pointerType,
                "which": evt.which
            }));
        };

        window.addEventListener("MSPointerDown", applicationEventHandlers.onPointerDown, false);
    } else if ((eventMask & EVENT_TYPE_ENUM.PointerDown) === 0 && typeof (applicationEventHandlers.onPointerDown) === "function") {
        window.removeEventListener("MSPointerDown", applicationEventHandlers.onPointerDown, false);
        applicationEventHandlers.onPointerDown = null;
    }

    if ((eventMask & EVENT_TYPE_ENUM.PointerUp) !== 0 && typeof (applicationEventHandlers.onPointerUp) !== "function") {
        applicationEventHandlers.onPointerUp = function (evt) {
            if (evt.type === "MSPointerOut") {
                if (pointerDown) {
                    pointerDown = false;
                    postToLocal(MSG_TYPE_ONPOINTERUP);
                }
            }
            else {
                pointerDown = false;
                postToLocal(MSG_TYPE_ONPOINTERUP);
            }
        };

        window.addEventListener("MSPointerUp", applicationEventHandlers.onPointerUp, false);
        window.addEventListener("MSPointerCancel", applicationEventHandlers.onPointerUp, false);
        window.addEventListener("MSPointerOut", applicationEventHandlers.onPointerUp, false);
        window.addEventListener("MSLostPointerCapture", applicationEventHandlers.onPointerUp, false);
    } else if ((eventMask & EVENT_TYPE_ENUM.PointerUp) === 0 && typeof (applicationEventHandlers.onPointerUp) === "function") {
        window.removeEventListener("MSPointerUp", applicationEventHandlers.onPointerUp, false);
        window.removeEventListener("MSPointerCancel", applicationEventHandlers.onPointerUp, false);
        window.removeEventListener("MSPointerOut", applicationEventHandlers.onPointerUp, false);
        window.removeEventListener("MSLostPointerCapture", applicationEventHandlers.onPointerUp, false);
        applicationEventHandlers.onPointerUp = null;
    }

    if ((eventMask & EVENT_TYPE_ENUM.PointerMove) !== 0 && typeof (applicationEventHandlers.onPointerMove) !== "function") {
        applicationEventHandlers.onPointerMove = function (evt) {
            postToLocal(MSG_TYPE_ONPOINTERMOVE + ":" + JSON.stringify({
                "clientX": evt.clientX,
                "clientY": evt.clientY,
            }));
        };

        window.addEventListener("MSPointerMove", applicationEventHandlers.onPointerMove, false);
    } else if ((eventMask & EVENT_TYPE_ENUM.PointerMove) === 0 && typeof (applicationEventHandlers.onPointerMove) === "function") {
        window.removeEventListener("MSPointerMove", applicationEventHandlers.onPointerMove, false);
        applicationEventHandlers.onPointerMove = null;
    }

    if ((eventMask & EVENT_TYPE_ENUM.ManipulationStateChanged) !== 0 && typeof (applicationEventHandlers.onManipulationStateChanged) !== "function") {
        applicationEventHandlers.onManipulationStateChanged = function (evt) {
            postToLocal(MSG_TYPE_ONMANIPSTATECHANGED + ":" + JSON.stringify({
                "lastState": evt.lastState,
                "currentState": evt.currentState
            }));
        };

        window.addEventListener("MSManipulationStateChanged", applicationEventHandlers.onManipulationStateChanged, false);
    } else if ((eventMask & EVENT_TYPE_ENUM.ManipulationStateChanged) === 0 && typeof (applicationEventHandlers.onManipulationStateChanged) === "function") {
        window.removeEventListener("MSManipulationStateChanged", applicationEventHandlers.onManipulationStateChanged, false);
        applicationEventHandlers.onManipulationStateChanged = null;
    }

    if ((eventMask & EVENT_TYPE_ENUM.MouseWheel) !== 0 && typeof (applicationEventHandlers.onMouseWheel) !== "function") {
        applicationEventHandlers.onMouseWheel = function (evt) {
            if (params.preventDefault) {
                evt.preventDefault(); // prevent the default windows handling of mouse wheel, hard code for appex...
            }

            postToLocal(MSG_TYPE_ONMOUSEWHEEL + ":" + JSON.stringify({
                "clientX": evt.clientX,
                "clientY": evt.clientY,
                "ctrlKey": evt.ctrlKey,
                "wheelDelta": evt.wheelDelta
            }));
        };

        window.addEventListener("mousewheel", applicationEventHandlers.onMouseWheel, false);
    } else if ((eventMask & EVENT_TYPE_ENUM.MouseWheel) === 0 && typeof (applicationEventHandlers.onMouseWheel) === "function") {
        window.removeEventListener("mousewheel", applicationEventHandlers.onMouseWheel, false);
        applicationEventHandlers.onMouseWheel = null;
    }
}
// SIG // Begin signature block
// SIG // MIIapwYJKoZIhvcNAQcCoIIamDCCGpQCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFJudyYpvZTop
// SIG // 18JJ7fn8SbL7q6TcoIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AAA0JDFAyaDBeY0AAAAAADQwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTEzMDMyNzIw
// SIG // MDgyNVoXDTE0MDYyNzIwMDgyNVowgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpCOEVDLTMwQTQtNzE0NDEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAOUaB60KlizUtjRkyzQg8rwEWIKLtQncUtRwn+Jc
// SIG // LOf1aqT1ti6xgYZZAexJbCkEHvU4i1cY9cAyDe00kOzG
// SIG // ReW7igolqu+he4fY8XBnSs1q3OavBZE97QVw60HPq7El
// SIG // ZrurorcY+XgTeHXNizNcfe1nxO0D/SisWGDBe72AjTOT
// SIG // YWIIsY9REmWPQX7E1SXpLWZB00M0+peB+PyHoe05Uh/4
// SIG // 6T7/XoDJBjYH29u5asc3z4a1GktK1CXyx8iNr2FnitpT
// SIG // L/NMHoMsY8qgEFIRuoFYc0KE4zSy7uqTvkyC0H2WC09/
// SIG // L88QXRpFZqsC8V8kAEbBwVXSg3JCIoY6pL6TUAECAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBRfS0LeDLk4oNRmNo1W
// SIG // +3RZSWaBKzAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQAPQlCg1R6t
// SIG // Fz8fCqYrN4pnWC2xME8778JXaexl00zFUHLycyX25IQC
// SIG // xXUccVhDq/HJqo7fym9YPInnL816Nexm19Veuo6fV4aU
// SIG // EKDrUTetV/YneyNPGdjgbXYEJTBhEq2ljqMmtkjlU/JF
// SIG // TsW4iScQnanjzyPpeWyuk2g6GvMTxBS2ejqeQdqZVp7Q
// SIG // 0+AWlpByTK8B9yQG+xkrmLJVzHqf6JI6azF7gPMOnleL
// SIG // t+YFtjklmpeCKTaLOK6uixqs7ufsLr9LLqUHNYHzEyDq
// SIG // tEqTnr+cg1Z/rRUvXClxC5RnOPwwv2Xn9Tne6iLth4yr
// SIG // sju1AcKt4PyOJRUMIr6fDO0dMIIE7DCCA9SgAwIBAgIT
// SIG // MwAAAMps1TISNcThVQABAAAAyjANBgkqhkiG9w0BAQUF
// SIG // ADB5MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSMwIQYDVQQDExpN
// SIG // aWNyb3NvZnQgQ29kZSBTaWduaW5nIFBDQTAeFw0xNDA0
// SIG // MjIxNzM5MDBaFw0xNTA3MjIxNzM5MDBaMIGDMQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMQ0wCwYDVQQLEwRNT1BSMR4wHAYD
// SIG // VQQDExVNaWNyb3NvZnQgQ29ycG9yYXRpb24wggEiMA0G
// SIG // CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCWcV3tBkb6
// SIG // hMudW7dGx7DhtBE5A62xFXNgnOuntm4aPD//ZeM08aal
// SIG // IV5WmWxY5JKhClzC09xSLwxlmiBhQFMxnGyPIX26+f4T
// SIG // UFJglTpbuVildGFBqZTgrSZOTKGXcEknXnxnyk8ecYRG
// SIG // vB1LtuIPxcYnyQfmegqlFwAZTHBFOC2BtFCqxWfR+nm8
// SIG // xcyhcpv0JTSY+FTfEjk4Ei+ka6Wafsdi0dzP7T00+Lnf
// SIG // NTC67HkyqeGprFVNTH9MVsMTC3bxB/nMR6z7iNVSpR4o
// SIG // +j0tz8+EmIZxZRHPhckJRIbhb+ex/KxARKWpiyM/gkmd
// SIG // 1ZZZUBNZGHP/QwytK9R/MEBnAgMBAAGjggFgMIIBXDAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUH17i
// SIG // XVCNVoa+SjzPBOinh7XLv4MwUQYDVR0RBEowSKRGMEQx
// SIG // DTALBgNVBAsTBE1PUFIxMzAxBgNVBAUTKjMxNTk1K2I0
// SIG // MjE4ZjEzLTZmY2EtNDkwZi05YzQ3LTNmYzU1N2RmYzQ0
// SIG // MDAfBgNVHSMEGDAWgBTLEejK0rQWWAHJNy4zFha5TJoK
// SIG // HzBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWND
// SIG // b2RTaWdQQ0FfMDgtMzEtMjAxMC5jcmwwWgYIKwYBBQUH
// SIG // AQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY0NvZFNpZ1BD
// SIG // QV8wOC0zMS0yMDEwLmNydDANBgkqhkiG9w0BAQUFAAOC
// SIG // AQEAd1zr15E9zb17g9mFqbBDnXN8F8kP7Tbbx7UsG177
// SIG // VAU6g3FAgQmit3EmXtZ9tmw7yapfXQMYKh0nfgfpxWUf
// SIG // tc8Nt1THKDhaiOd7wRm2VjK64szLk9uvbg9dRPXUsO8b
// SIG // 1U7Brw7vIJvy4f4nXejF/2H2GdIoCiKd381wgp4Yctgj
// SIG // zHosQ+7/6sDg5h2qnpczAFJvB7jTiGzepAY1p8JThmUR
// SIG // dwmPNVm52IaoAP74MX0s9IwFncDB1XdybOlNWSaD8cKy
// SIG // iFeTNQB8UCu8Wfz+HCk4gtPeUpdFKRhOlludul8bo/En
// SIG // UOoHlehtNA04V9w3KDWVOjic1O1qhV0OIhFeezCCBbww
// SIG // ggOkoAMCAQICCmEzJhoAAAAAADEwDQYJKoZIhvcNAQEF
// SIG // BQAwXzETMBEGCgmSJomT8ixkARkWA2NvbTEZMBcGCgmS
// SIG // JomT8ixkARkWCW1pY3Jvc29mdDEtMCsGA1UEAxMkTWlj
// SIG // cm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5
// SIG // MB4XDTEwMDgzMTIyMTkzMloXDTIwMDgzMTIyMjkzMlow
// SIG // eTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEjMCEGA1UEAxMaTWlj
// SIG // cm9zb2Z0IENvZGUgU2lnbmluZyBQQ0EwggEiMA0GCSqG
// SIG // SIb3DQEBAQUAA4IBDwAwggEKAoIBAQCycllcGTBkvx2a
// SIG // YCAgQpl2U2w+G9ZvzMvx6mv+lxYQ4N86dIMaty+gMuz/
// SIG // 3sJCTiPVcgDbNVcKicquIEn08GisTUuNpb15S3GbRwfa
// SIG // /SXfnXWIz6pzRH/XgdvzvfI2pMlcRdyvrT3gKGiXGqel
// SIG // cnNW8ReU5P01lHKg1nZfHndFg4U4FtBzWwW6Z1KNpbJp
// SIG // L9oZC/6SdCnidi9U3RQwWfjSjWL9y8lfRjFQuScT5EAw
// SIG // z3IpECgixzdOPaAyPZDNoTgGhVxOVoIoKgUyt0vXT2Pn
// SIG // 0i1i8UU956wIAPZGoZ7RW4wmU+h6qkryRs83PDietHdc
// SIG // pReejcsRj1Y8wawJXwPTAgMBAAGjggFeMIIBWjAPBgNV
// SIG // HRMBAf8EBTADAQH/MB0GA1UdDgQWBBTLEejK0rQWWAHJ
// SIG // Ny4zFha5TJoKHzALBgNVHQ8EBAMCAYYwEgYJKwYBBAGC
// SIG // NxUBBAUCAwEAATAjBgkrBgEEAYI3FQIEFgQU/dExTtMm
// SIG // ipXhmGA7qDFvpjy82C0wGQYJKwYBBAGCNxQCBAweCgBT
// SIG // AHUAYgBDAEEwHwYDVR0jBBgwFoAUDqyCYEBWJ5flJRP8
// SIG // KuEKU5VZ5KQwUAYDVR0fBEkwRzBFoEOgQYY/aHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvbWljcm9zb2Z0cm9vdGNlcnQuY3JsMFQGCCsGAQUF
// SIG // BwEBBEgwRjBEBggrBgEFBQcwAoY4aHR0cDovL3d3dy5t
// SIG // aWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3NvZnRS
// SIG // b290Q2VydC5jcnQwDQYJKoZIhvcNAQEFBQADggIBAFk5
// SIG // Pn8mRq/rb0CxMrVq6w4vbqhJ9+tfde1MOy3XQ60L/svp
// SIG // LTGjI8x8UJiAIV2sPS9MuqKoVpzjcLu4tPh5tUly9z7q
// SIG // QX/K4QwXaculnCAt+gtQxFbNLeNK0rxw56gNogOlVuC4
// SIG // iktX8pVCnPHz7+7jhh80PLhWmvBTI4UqpIIck+KUBx3y
// SIG // 4k74jKHK6BOlkU7IG9KPcpUqcW2bGvgc8FPWZ8wi/1wd
// SIG // zaKMvSeyeWNWRKJRzfnpo1hW3ZsCRUQvX/TartSCMm78
// SIG // pJUT5Otp56miLL7IKxAOZY6Z2/Wi+hImCWU4lPF6H0q7
// SIG // 0eFW6NB4lhhcyTUWX92THUmOLb6tNEQc7hAVGgBd3TVb
// SIG // Ic6YxwnuhQ6MT20OE049fClInHLR82zKwexwo1eSV32U
// SIG // jaAbSANa98+jZwp0pTbtLS8XyOZyNxL0b7E8Z4L5UrKN
// SIG // MxZlHg6K3RDeZPRvzkbU0xfpecQEtNP7LN8fip6sCvsT
// SIG // J0Ct5PnhqX9GuwdgR2VgQE6wQuxO7bN2edgKNAltHIAx
// SIG // H+IOVN3lofvlRxCtZJj/UBYufL8FIXrilUEnacOTj5XJ
// SIG // jdibIa4NXJzwoq6GaIMMai27dmsAHZat8hZ79haDJLmI
// SIG // z2qoRzEvmtzjcT3XAH5iR9HOiMm4GPoOco3Boz2vAkBq
// SIG // /2mbluIQqBC0N1AI1sM9MIIGBzCCA++gAwIBAgIKYRZo
// SIG // NAAAAAAAHDANBgkqhkiG9w0BAQUFADBfMRMwEQYKCZIm
// SIG // iZPyLGQBGRYDY29tMRkwFwYKCZImiZPyLGQBGRYJbWlj
// SIG // cm9zb2Z0MS0wKwYDVQQDEyRNaWNyb3NvZnQgUm9vdCBD
// SIG // ZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcNMDcwNDAzMTI1
// SIG // MzA5WhcNMjEwNDAzMTMwMzA5WjB3MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
// SIG // ggEKAoIBAQCfoWyx39tIkip8ay4Z4b3i48WZUSNQrc7d
// SIG // GE4kD+7Rp9FMrXQwIBHrB9VUlRVJlBtCkq6YXDAm2gBr
// SIG // 6Hu97IkHD/cOBJjwicwfyzMkh53y9GccLPx754gd6udO
// SIG // o6HBI1PKjfpFzwnQXq/QsEIEovmmbJNn1yjcRlOwhtDl
// SIG // KEYuJ6yGT1VSDOQDLPtqkJAwbofzWTCd+n7Wl7PoIZd+
// SIG // +NIT8wi3U21StEWQn0gASkdmEScpZqiX5NMGgUqi+YSn
// SIG // EUcUCYKfhO1VeP4Bmh1QCIUAEDBG7bfeI0a7xC1Un68e
// SIG // eEExd8yb3zuDk6FhArUdDbH895uyAc4iS1T/+QXDwiAL
// SIG // AgMBAAGjggGrMIIBpzAPBgNVHRMBAf8EBTADAQH/MB0G
// SIG // A1UdDgQWBBQjNPjZUkZwCu1A+3b7syuwwzWzDzALBgNV
// SIG // HQ8EBAMCAYYwEAYJKwYBBAGCNxUBBAMCAQAwgZgGA1Ud
// SIG // IwSBkDCBjYAUDqyCYEBWJ5flJRP8KuEKU5VZ5KShY6Rh
// SIG // MF8xEzARBgoJkiaJk/IsZAEZFgNjb20xGTAXBgoJkiaJ
// SIG // k/IsZAEZFgltaWNyb3NvZnQxLTArBgNVBAMTJE1pY3Jv
// SIG // c29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eYIQ
// SIG // ea0WoUqgpa1Mc1j0BxMuZTBQBgNVHR8ESTBHMEWgQ6BB
// SIG // hj9odHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtpL2Ny
// SIG // bC9wcm9kdWN0cy9taWNyb3NvZnRyb290Y2VydC5jcmww
// SIG // VAYIKwYBBQUHAQEESDBGMEQGCCsGAQUFBzAChjhodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01p
// SIG // Y3Jvc29mdFJvb3RDZXJ0LmNydDATBgNVHSUEDDAKBggr
// SIG // BgEFBQcDCDANBgkqhkiG9w0BAQUFAAOCAgEAEJeKw1wD
// SIG // RDbd6bStd9vOeVFNAbEudHFbbQwTq86+e4+4LtQSooxt
// SIG // YrhXAstOIBNQmd16QOJXu69YmhzhHQGGrLt48ovQ7DsB
// SIG // 7uK+jwoFyI1I4vBTFd1Pq5Lk541q1YDB5pTyBi+FA+mR
// SIG // KiQicPv2/OR4mS4N9wficLwYTp2OawpylbihOZxnLcVR
// SIG // DupiXD8WmIsgP+IHGjL5zDFKdjE9K3ILyOpwPf+FChPf
// SIG // wgphjvDXuBfrTot/xTUrXqO/67x9C0J71FNyIe4wyrt4
// SIG // ZVxbARcKFA7S2hSY9Ty5ZlizLS/n+YWGzFFW6J1wlGys
// SIG // OUzU9nm/qhh6YinvopspNAZ3GmLJPR5tH4LwC8csu89D
// SIG // s+X57H2146SodDW4TsVxIxImdgs8UoxxWkZDFLyzs7BN
// SIG // Z8ifQv+AeSGAnhUwZuhCEl4ayJ4iIdBD6Svpu/RIzCzU
// SIG // 2DKATCYqSCRfWupW76bemZ3KOm+9gSd0BhHudiG/m4LB
// SIG // J1S2sWo9iaF2YbRuoROmv6pH8BJv/YoybLL+31HIjCPJ
// SIG // Zr2dHYcSZAI9La9Zj7jkIeW1sMpjtHhUBdRBLlCslLCl
// SIG // eKuzoJZ1GtmShxN1Ii8yqAhuoFuMJb+g74TKIdbrHk/J
// SIG // mu5J4PcBZW+JC33Iacjmbuqnl84xKf8OxVtc2E0bodj6
// SIG // L54/LlUWa8kTo/0xggSRMIIEjQIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIGqMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBSSEvdRNV98
// SIG // 820gZwTXzLJQyvDaTDBKBgorBgEEAYI3AgEMMTwwOqAa
// SIG // gBgAYgBvAG8AdABzAHQAcgBhAHAALgBqAHOhHIAaaHR0
// SIG // cDovL3d3dy5taWNyb3NvZnQuY29tLyAwDQYJKoZIhvcN
// SIG // AQEBBQAEggEAA8Gh7X+3VGxfInLtouI0F40NVKoYs7PZ
// SIG // Wx/La8/O4nNIoyiCgePDb4KGUEVqVjYPBGe1vKNRMyCt
// SIG // PAGZxsy4K3FzoIIgy1TrKgFXs/lVI5JaElfuSUT9D0ZI
// SIG // eQpGFh7oM3yATfhAg31czhVOZpyN1vbVsJrFCfD+Ktpc
// SIG // 3Fl+FA7XK69PAkbeWNN+It/wRLlUh1SmCMohF8jaFJpy
// SIG // GpTXW/YMCDl+WpTkCOYb0RpYr51IEMPur73CdCp1e9ew
// SIG // vixkB/H2E9cld8BwphJRzsSCmY8bJZDFuCPt/zQtwfYT
// SIG // /Q/ccDtkV07EvFnK78+mct63WbiVFHRNgHO13u3TY2Ou
// SIG // eaGCAigwggIkBgkqhkiG9w0BCQYxggIVMIICEQIBATCB
// SIG // jjB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQDExhN
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0ECEzMAAAA0JDFA
// SIG // yaDBeY0AAAAAADQwCQYFKw4DAhoFAKBdMBgGCSqGSIb3
// SIG // DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8X
// SIG // DTE0MDQyOTAwMzE1NFowIwYJKoZIhvcNAQkEMRYEFBN1
// SIG // U5CqAPfhuGQQ40JNBlyez0UNMA0GCSqGSIb3DQEBBQUA
// SIG // BIIBALRSbp03TgzNk0bXF4GJp+HADFcmlle+zYrCVGck
// SIG // 0cH4BGkTWsqttj099p9GVqBxXr8/rI3NCKNuI2DF3gN3
// SIG // dKrqXqsEjRopal9j80faqxC0zmhLlVKWGa8moCDkUHiH
// SIG // 3dU20EHMetvgHhESGl38slhRkCd0DlCF3Z7w7D6X6tLq
// SIG // VzOkeafw4oiTlX5fqNy6Q2eUQ77yRsOBwfGwe1Y35yN1
// SIG // Hgg2vX5Sgt0Gy0a9v6WD3J+KtIc50KKJhsecKYnl9A9s
// SIG // TIN4L44cRNpBp+xMYcUyJCHJ5AHWQSa2TaBqzWObJT21
// SIG // 4TrXFaOe4szOZ6tRdKrXD93MHIMOhaq1JZsFq4w=
// SIG // End signature block
