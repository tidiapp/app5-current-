/*!
  Copyright (C) Microsoft. All rights reserved.
  This library is supported for use in Windows Store apps only.
*/
(function(WinJS)
{
    "use strict";
    WinJS.Namespace.define("MicrosoftNSJS.Advertising", {AdControl: WinJS.Class.define(function(element, options)
        {
            var self = this;
            try
            {
                if (element === null || typeof(element) === "undefined")
                {
                    element = document.createElement("div")
                }
                else if (this._isElementAllowed(element))
                {
                    element = element
                }
                else
                {
                    return
                }
                element.winControl = this;
                this._adsGlobalEventManager = new MicrosoftNSJS.Advertising.AdGlobalEventManager;
                this._adSettingsControl = new MicrosoftNSJS.Advertising.AdSettingsControl({
                    flyoutHtmlTemplateURI: "ms-appx:///MSAdvertisingJS/ads/MSASettingsPanel.html", resourceLoaderURI: "MicrosoftAdvertising/UIStrings"
                });
                try
                {
                    this._rendererOptions = new MicrosoftAdvertising.Shared.WinRT.RendererOptions
                }
                catch(err) {}
                this._rendererOptionsUsedInRequest = null;
                this._globalAdEngagedHandler = null;
                this._globalAdDisengagedHandler = null;
                this._ad = null;
                this._applicationId = "";
                this._adUnitId = "";
                this._currentAdHeight = null;
                this._currentAdWidth = null;
                this._isDisposed = false;
                this._errorReportCount = 0;
                this._isAutoRefreshEnabled = true;
                this._isUserEngaged = false;
                this._placement = null;
                this._refreshPeriodSeconds = 60;
                this._refreshTimerId = null;
                this._requestInProgress = false;
                this._timeAtLastRotation = null;
                this._currentCloseBandHeight = this._RESERVED_CLOSE_BAND_HEIGHT;
                this._adContainer = null;
                if (options.enableDefaultImageAd && (options.enableDefaultImageAd === true || options.enableDefaultImageAd === "true"))
                {
                    this._enableDefaultImageAd = true
                }
                else
                {
                    this._enableDefaultImageAd = false
                }
                this._accelerometer = {
                    device: null, tiltHandlers: [], shakeHandlers: []
                };
                this._lastCoords = {
                    x: 0, y: 0, z: 0
                };
                this._viewableChangedTimer = null;
                this._hasViewablility = false;
                this._viewableCheckPeriodMs = 500;
                this._orientationChangedHandler = null;
                this._fadeOptions = {
                    timer: {linear: " cubic-bezier(0,0,1,1)"}, fadeInTimeS: 0.7
                };
                this._sensorOptions = {accelerometer: {reportIntervalMS: 50}};
                this._adInstanceState = null;
                this._onAdRefreshedInternal = null;
                this._onAdRefreshed = null;
                this._onBeforeAdRender = null;
                this._onErrorOccurred = null;
                this._onEngagedChanged = null;
                this._onPointerDown = null;
                this._onPointerUp = null;
                this._onPointerMove = null;
                this._onMouseWheel = null;
                this._onManipulationStateChanged = null;
                this._preventDefaultAppHandlers = false;
                this._applicationEventsMask = 0;
                element.style.breakInside = "avoid";
                element.style.overflow = "hidden";
                if (element.style.position === "")
                {
                    element.style.position = "relative"
                }
                WinJS.UI.setOptions(this, options);
                if (element.id === null || element.id === "")
                {
                    element.id = this._generateUniqueId()
                }
                this._domElement = element;
                this._setupEvents();
                this._showDefaultImageAd();
                setImmediate(function()
                {
                    if (!self._requestInProgress && self._ad === null)
                    {
                        self._refreshInternal()
                    }
                })
            }
            catch(err)
            {
                return
            }
        }, {
            _ORMMA_NETWORK_OFFLINE: "offline", _ORMMA_NETWORK_WIFI: "wifi", _ORMMA_NETWORK_CELL: "cell", _ORMMA_NETWORK_UNKNOWN: "unknown", _ORMMA_RESPONSE_IGNORE: "ignore", _ORMMA_RESPONSE_PROXY: "proxy", _HTTP_HEADER_CACHE_CONTROL: "cache-control", _HTTP_HEADER_VALUE_CACHE_CONTROL_NO_CACHE: "no-cache", _RESERVED_CLOSE_BAND_HEIGHT: 2 * 50, _MIN_AD_REFRESH_INTERVAL_IN_MILLISECONDS_METERED: 60000, _MIN_AD_REFRESH_INTERVAL_IN_MILLISECONDS_UNMETERED: 30000, _MAX_ERROR_REPORT: 20, _MAX_ERROR_REPORT_MESSAGE: "error reporting maximum reached, no more errors will be reported", _MAX_URL_LENGTH: 2048, _ERROR_ENUM: {
                    Unknown: "Unknown", NoAdAvailable: "NoAdAvailable", NetworkConnectionFailure: "NetworkConnectionFailure", ClientConfiguration: "ClientConfiguration", ServerSideError: "ServerSideError", InvalidServerResponse: "InvalidServerResponse", RefreshNotAllowed: "RefreshNotAllowed", Other: "Other"
                }, _ERROR_MESSAGE: {
                    enableDefaultImageAdAlreadyInitialized: "enableDefaultImageAd property can only be initialized during object creation.", enableDefaultImageAdIncorrectContainerSize: "Default image ad unavailable for the current specified ad control size."
                }, _DEFAULT_IMAGES: {
                    _defaultImageName: "DefaultImageAd.png", "300x250": {
                            width: 300, height: 250, url: "ms-appx:///MSAdvertisingJS/ads/images/defaultimageads/300x250/DefaultImageAd.png"
                        }, "160x600": {
                            width: 160, height: 600, url: "ms-appx:///MSAdvertisingJS/ads/images/defaultimageads/160x600/DefaultImageAd.png"
                        }, "250x250": {
                            width: 250, height: 250, url: "ms-appx:///MSAdvertisingJS/ads/images/defaultimageads/250x250/DefaultImageAd.png"
                        }, "728x90": {
                            width: 728, height: 90, url: "ms-appx:///MSAdvertisingJS/ads/images/defaultimageads/728x90/DefaultImageAd.png"
                        }, "300x600": {
                            width: 300, height: 600, url: "ms-appx:///MSAdvertisingJS/ads/images/defaultimageads/300x600/DefaultImageAd.png"
                        }, "250x510": {
                            width: 250, height: 510, url: "ms-appx:///MSAdvertisingJS/ads/images/defaultimageads/250x510/DefaultImageAd.png"
                        }, "1366x768": {
                            width: 1366, height: 768, url: "ms-appx:///MSAdvertisingJS/ads/images/defaultimageads/1366x768/DefaultImageAd.png"
                        }
                }, _EVENT_TYPE_ENUM: {
                    All: ~0, PointerDown: 1, PointerUp: 1 << 1, PointerMove: 1 << 2, MouseWheel: 1 << 4, ManipulationStateChanged: 1 << 5
                }, _USER_TARGETING_OPTION: {
                    AdIdOff: "AdIdOff", GlobalOff: "GlobalOff", LocalOff: "LocalOff", On: "On", NotSignedIn: "NotSignedIn", Unknown: "Unknown"
                }, onAdRefreshed: {
                    get: function()
                    {
                        return this._onAdRefreshed
                    }, set: function(value)
                        {
                            if (typeof(value) === "function" || value === null || typeof(value) === "undefined")
                            {
                                this._onAdRefreshed = value
                            }
                        }
                }, onBeforeAdRender: {
                    get: function()
                    {
                        return this._onBeforeAdRender
                    }, set: function(value)
                        {
                            if (typeof(value) === "function" || value === null || typeof(value) === "undefined")
                            {
                                this._onBeforeAdRender = value
                            }
                        }
                }, onErrorOccurred: {
                    get: function()
                    {
                        return this._onErrorOccurred
                    }, set: function(value)
                        {
                            if (typeof(value) === "function" || value === null || typeof(value) === "undefined")
                            {
                                this._onErrorOccurred = value
                            }
                        }
                }, onEngagedChanged: {
                    get: function()
                    {
                        return this._onEngagedChanged
                    }, set: function(value)
                        {
                            if (typeof(value) === "function" || value === null || typeof(value) === "undefined")
                            {
                                this._onEngagedChanged = value
                            }
                        }
                }, onPointerDown: {
                    get: function()
                    {
                        return this._onPointerDown
                    }, set: function(value)
                        {
                            if (typeof(value) === "function" || value === null || typeof(value) === "undefined")
                            {
                                this._onPointerDown = value;
                                if (typeof(value) === "function")
                                {
                                    this._addApplicationEventType(this._EVENT_TYPE_ENUM.PointerDown);
                                    this._updateApplicationEvents()
                                }
                                else
                                {
                                    this._removeApplicationEventType(this._EVENT_TYPE_ENUM.PointerDown);
                                    this._updateApplicationEvents()
                                }
                            }
                        }
                }, onPointerUp: {
                    get: function()
                    {
                        return this._onPointerUp
                    }, set: function(value)
                        {
                            if (typeof(value) === "function" || value === null || typeof(value) === "undefined")
                            {
                                this._onPointerUp = value;
                                if (typeof(value) === "function")
                                {
                                    this._addApplicationEventType(this._EVENT_TYPE_ENUM.PointerUp)
                                }
                                else
                                {
                                    this._removeApplicationEventType(this._EVENT_TYPE_ENUM.PointerUp)
                                }
                                this._updateApplicationEvents()
                            }
                        }
                }, onMouseWheel: {
                    get: function()
                    {
                        return this._onMouseWheel
                    }, set: function(value)
                        {
                            if (typeof(value) === "function" || value === null || typeof(value) === "undefined")
                            {
                                this._onMouseWheel = value;
                                if (typeof(value) === "function")
                                {
                                    this._addApplicationEventType(this._EVENT_TYPE_ENUM.MouseWheel)
                                }
                                else
                                {
                                    this._removeApplicationEventType(this._EVENT_TYPE_ENUM.MouseWheel)
                                }
                                this._updateApplicationEvents()
                            }
                        }
                }, onPointerMove: {
                    get: function()
                    {
                        return this._onPointerMove
                    }, set: function(value)
                        {
                            if (typeof(value) === "function" || value === null || typeof(value) === "undefined")
                            {
                                this._onPointerMove = value;
                                if (typeof(value) === "function")
                                {
                                    this._addApplicationEventType(this._EVENT_TYPE_ENUM.PointerMove)
                                }
                                else
                                {
                                    this._removeApplicationEventType(this._EVENT_TYPE_ENUM.PointerMove)
                                }
                                this._updateApplicationEvents()
                            }
                        }
                }, onManipulationStateChanged: {
                    get: function()
                    {
                        return this._onManipulationStateChanged
                    }, set: function(value)
                        {
                            if (typeof(value) === "function" || value === null || typeof(value) === "undefined")
                            {
                                this._onManipulationStateChanged = value;
                                if (typeof(value) === "function")
                                {
                                    this._addApplicationEventType(this._EVENT_TYPE_ENUM.ManipulationStateChanged)
                                }
                                else
                                {
                                    this._removeApplicationEventType(this._EVENT_TYPE_ENUM.ManipulationStateChanged)
                                }
                                this._updateApplicationEvents()
                            }
                        }
                }, preventDefaultApplicationEvents: {
                    get: function()
                    {
                        return this._preventDefaultAppHandlers
                    }, set: function(value)
                        {
                            if (this._preventDefaultAppHandlers !== value)
                            {
                                this._preventDefaultAppHandlers = value
                            }
                        }
                }, applicationId: {
                    get: function()
                    {
                        return this._applicationId
                    }, set: function(value)
                        {
                            if (this._applicationId !== value)
                            {
                                this._applicationId = value
                            }
                        }
                }, adUnitId: {
                    get: function()
                    {
                        return this._adUnitId
                    }, set: function(value)
                        {
                            if (this._adUnitId !== value)
                            {
                                this._adUnitId = value
                            }
                        }
                }, isAutoRefreshEnabled: {
                    get: function()
                    {
                        return this._isAutoRefreshEnabled
                    }, set: function(value)
                        {
                            if (this._isAutoRefreshEnabled !== value)
                            {
                                this._isAutoRefreshEnabled = value;
                                if (this._isAutoRefreshEnabled)
                                {
                                    this._scheduleRefresh()
                                }
                                else
                                {
                                    this._unscheduleRefresh()
                                }
                            }
                        }
                }, isEngaged: {get: function()
                    {
                        return this._adContainer && this._adContainer.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.EXPANDED || this._isUserEngaged
                    }}, isSuspended: {get: function()
                    {
                        return this._adContainer && this._adContainer.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.SUSPENDED
                    }}, latitude: {
                    get: function()
                    {
                        return this._latitude
                    }, set: function(value)
                        {
                            if (typeof(value) === "string")
                            {
                                this._latitude = parseFloat(value)
                            }
                            else
                            {
                                this._latitude = value
                            }
                        }
                }, longitude: {
                    get: function()
                    {
                        return this._longitude
                    }, set: function(value)
                        {
                            if (typeof(value) === "string")
                            {
                                this._longitude = parseFloat(value)
                            }
                            else
                            {
                                this._longitude = value
                            }
                        }
                }, enableDefaultImageAd: {
                    get: function()
                    {
                        return this._enableDefaultImageAd
                    }, set: function(value)
                        {
                            if (value + "" !== this._enableDefaultImageAd + "")
                            {
                                this._fireErrorOccurred(this._ERROR_MESSAGE.enableDefaultImageAdAlreadyInitialized, this._ERROR_ENUM.ClientConfiguration)
                            }
                        }
                }, element: {get: function()
                    {
                        return this._domElement
                    }}, addAdTag: function(tagName, tagValue)
                {
                    if (typeof(tagName) === "string" && typeof(tagValue) === "string")
                    {
                        try
                        {
                            this._rendererOptions.addRendererOption(tagName, tagValue)
                        }
                        catch(e)
                        {
                            this._fireErrorOccurred("could not add renderer option or value", this._ERROR_ENUM.Other)
                        }
                    }
                    else
                    {
                        this._fireErrorOccurred("could not add renderer option or value as they were not strings", this._ERROR_ENUM.Other)
                    }
                }, removeAdTag: function(tagName)
                {
                    if (typeof(tagName) === "string")
                    {
                        try
                        {
                            this._rendererOptions.removeRendererOption(tagName)
                        }
                        catch(e)
                        {
                            this._fireErrorOccurred("could not remove renderer option or value", this._ERROR_ENUM.Other)
                        }
                    }
                }, refresh: function()
                {
                    if (this._isAutoRefreshEnabled)
                    {
                        this._fireErrorOccurred("refresh() may not be called when auto-refresh is enabled (isAutoRefreshEnabled=true)", this._ERROR_ENUM.RefreshNotAllowed);
                        return
                    }
                    if (!this._checkIfRefreshIntervalMetAndRaiseError())
                    {
                        return
                    }
                    this._refreshInternal()
                }, suspend: function()
                {
                    if (this._adContainer)
                    {
                        if (this._adContainer.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.EXPANDED)
                        {
                            this._closePopup()
                        }
                        this._adContainer.suspend()
                    }
                    this._unscheduleRefresh()
                }, resume: function()
                {
                    if (this._adContainer)
                    {
                        this._adContainer.resume()
                    }
                    this._scheduleRefresh()
                }, getUserTargetingSetting: function()
                {
                    return new WinJS.Promise(function(comp)
                        {
                            if (MicrosoftAdvertising.Shared.WinRT.UserInfoProvider.isUserOptOutControlVisible() === false)
                            {
                                comp(this._USER_TARGETING_OPTION.AdIdOff)
                            }
                            else
                            {
                                return MicrosoftAdvertising.Shared.WinRT.UserInfoProvider.getGlobalTargetingOptInStateAsync().then(function(globalState)
                                    {
                                        if (globalState === MicrosoftAdvertising.Shared.WinRT.TargetingOptInState.optedIn)
                                        {
                                            MicrosoftAdvertising.Shared.WinRT.UserInfoProvider.getLocalTargetingOptInStateAsync().then(function(localState)
                                            {
                                                if (localState !== MicrosoftAdvertising.Shared.WinRT.TargetingOptInState.optedOut)
                                                {
                                                    comp(this._USER_TARGETING_OPTION.On)
                                                }
                                                else
                                                {
                                                    comp(this._USER_TARGETING_OPTION.LocalOff)
                                                }
                                            }.bind(this))
                                        }
                                        else if (globalState === MicrosoftAdvertising.Shared.WinRT.TargetingOptInState.optedOut)
                                        {
                                            comp(this._USER_TARGETING_OPTION.GlobalOff)
                                        }
                                        else if (globalState === MicrosoftAdvertising.Shared.WinRT.TargetingOptInState.userNotSignedIn)
                                        {
                                            comp(this._USER_TARGETING_OPTION.NotSignedIn)
                                        }
                                        else
                                        {
                                            comp(this._USER_TARGETING_OPTION.Unknown)
                                        }
                                    }.bind(this))
                            }
                        }.bind(this))
                }, dispose: function()
                {
                    try
                    {
                        this._closePopup();
                        if (typeof(this._resizeHandler) === "function")
                        {
                            window.removeEventListener("resize", this._resizeHandler);
                            this._resizeHandler = null
                        }
                        if (typeof(this._domNodeRemovedHandler) === "function")
                        {
                            if (this._domElement !== null)
                            {
                                this._domElement.removeEventListener("DOMNodeRemoved", this._domNodeRemovedHandler)
                            }
                            this._domNodeRemovedHandler = null
                        }
                        if (this._adContainer)
                        {
                            this._adContainer.dispose();
                            this._adContainer = null
                        }
                        this._disposeAccelerometer();
                        this._stopOrientationMonitoring();
                        this._stopViewableChangeMonitoring();
                        this._onAdRefreshedInternal = null;
                        this._onAdRefreshed = null;
                        this._onBeforeAdRender = null;
                        this._onErrorOccurred = null;
                        this._onEngagedChanged = null;
                        this._onPointerDown = null;
                        this._onPointerUp = null;
                        this._onMouseWheel = null;
                        this._onPointerMove = null;
                        this._onManipulationStateChanged = null;
                        this._unscheduleRefresh();
                        this._stopOrientationMonitoring();
                        this._networkInfo.removeEventListener("networkstatuschanged", this._networkChangedEventHandler);
                        this._disposeAdPlacement();
                        this._applicationEventsMask = 0;
                        this._preventDefaultAppHandlers = false;
                        this._adsGlobalEventManager.removeEventListener(MicrosoftNSJS.Advertising.AdGlobalEventManager.EVENT_TYPE.AD_ENGAGED, this._globalAdEngagedHandler);
                        this._adsGlobalEventManager.removeEventListener(MicrosoftNSJS.Advertising.AdGlobalEventManager.EVENT_TYPE.AD_DISENGAGED, this._globalAdDisengagedHandler);
                        this._adsGlobalEventManager.dispose();
                        if (this._domElement !== null)
                        {
                            this._domElement.winControl = null;
                            this._domElement.onresize = null;
                            this._domElement = null
                        }
                        this._rendererOptionsUsedInRequest = null;
                        this._isDisposed = true
                    }
                    catch(err) {}
                }, _checkIfRefreshIntervalMetAndRaiseError: function()
                {
                    var isIntervalMet = false;
                    var refreshInterval = this._MIN_AD_REFRESH_INTERVAL_IN_MILLISECONDS_UNMETERED;
                    if (this._timeAtLastRotation !== null)
                    {
                        try
                        {
                            var connectionProfile = Windows.Networking.Connectivity.NetworkInformation.getInternetConnectionProfile();
                            if (connectionProfile !== null)
                            {
                                var currentConnectionCost = connectionProfile.getConnectionCost();
                                var isMeteredConnection = currentConnectionCost.NetworkCostType === Windows.Networking.Connectivity.NetworkCostType.fixed || currentConnectionCost.NetworkCostType === Windows.Networking.Connectivity.NetworkCostType.variable;
                                refreshInterval = isMeteredConnection ? this._MIN_AD_REFRESH_INTERVAL_IN_MILLISECONDS_METERED : this._MIN_AD_REFRESH_INTERVAL_IN_MILLISECONDS_UNMETERED
                            }
                        }
                        catch(err) {}
                    }
                    else
                    {
                        this._timeAtLastRotation = new Date;
                        return true
                    }
                    isIntervalMet = new Date - this._timeAtLastRotation > refreshInterval;
                    if (!isIntervalMet)
                    {
                        this._fireErrorOccurred("refresh() may not be called more than once every " + refreshInterval / 1000 + " seconds.", this._ERROR_ENUM.RefreshNotAllowed)
                    }
                    return isIntervalMet
                }, _showDefaultImageAd: function()
                {
                    if (this._enableDefaultImageAd && typeof(this._domElement) === "object" && typeof(this._domElement.style) === "object")
                    {
                        var width = this._domElement.offsetWidth;
                        var height = this._domElement.offsetHeight;
                        var image = width + "x" + height;
                        if (typeof(this._DEFAULT_IMAGES[image]) !== "object")
                        {
                            this._fireErrorOccurred(this._ERROR_MESSAGE.enableDefaultImageAdIncorrectContainerSize, this._ERROR_ENUM.ClientConfiguration);
                            this._log("Unable to show default image ad, ad container size mismatch. Width: " + width + " Height: " + height, {fnName: "_showDefaultImageAd"})
                        }
                        else
                        {
                            try
                            {
                                this._domElement.style.backgroundImage = "url('" + this._DEFAULT_IMAGES[image].url + "')";
                                this._domElement.style.backgroundSize = "100% 100%";
                                this._log("_domElement backgroundImage url set to " + this._DEFAULT_IMAGES[image].url, {fnName: "_showDefaultImageAd"});
                                this._log("_domElement backgroundSize set to 100% 100%", {fnName: "_showDefaultImageAd"})
                            }
                            catch(err)
                            {
                                this._log("Exception error: " + err, {fnName: "_showDefaultImageAd"})
                            }
                        }
                    }
                }, _hideDefaultImageAd: function()
                {
                    if (this._enableDefaultImageAd && typeof(this._domElement) === "object" && typeof(this._domElement.style) === "object")
                    {
                        try
                        {
                            this._domElement.style.backgroundImage = "";
                            this._domElement.style.backgroundSize = "";
                            this._log("_domElement backgroundImage url  and backgroundSize cleared", {fnName: "_hideDefaultImageAd"})
                        }
                        catch(err)
                        {
                            this._log("Exception error: " + err, {fnName: "_hideDefaultImageAd"})
                        }
                    }
                }, _getSdkInfo: function()
                {
                    try
                    {
                        var info = MicrosoftAdvertising.Shared.WinRT.SdkInfoProvider.getSdkInfo();
                        return {
                                sdkVersion: info.sdkVersion, client: info.client, runtimeType: info.runtimeType
                            }
                    }
                    catch(err)
                    {
                        return {}
                    }
                }, _refreshInternal: function()
                {
                    if (this._requestInProgress)
                    {
                        this._fireErrorOccurred("refresh triggered but request is already in progress", this._ERROR_ENUM.RefreshNotAllowed);
                        return
                    }
                    this._requestInProgress = true;
                    try
                    {
                        if (Windows.ApplicationModel.DesignMode.designModeEnabled)
                        {
                            this._requestInProgress = false;
                            return
                        }
                    }
                    catch(err) {}
                    if (window !== top)
                    {
                        this._requestInProgress = false;
                        this._fireErrorOccurred("ad control may not be loaded in an iframe", this._ERROR_ENUM.Other);
                        return
                    }
                    if (this._domElement === null || this._domElement.offsetWidth === 0 || this._domElement.offsetHeight === 0)
                    {
                        this._requestInProgress = false;
                        return
                    }
                    if (this._adContainer && this._adContainer.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.EXPANDED)
                    {
                        this._requestInProgress = false;
                        return
                    }
                    if (this._adContainer && this._adContainer.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.SUSPENDED)
                    {
                        this._requestInProgress = false;
                        this._fireErrorOccurred("cannot refresh when suspended", this._ERROR_ENUM.RefreshNotAllowed);
                        return
                    }
                    if (this._isUserEngaged)
                    {
                        this._requestInProgress = false;
                        this._scheduleRefresh();
                        return
                    }
                    if (typeof(window._msAdEngaged) !== "undefined" && window._msAdEngaged)
                    {
                        this._requestInProgress = false;
                        this._scheduleRefresh();
                        return
                    }
                    if (!this._validateParameters())
                    {
                        this._requestInProgress = false;
                        this._scheduleRefresh();
                        return
                    }
                    if (this._adContainer !== null && (document.hidden || !this._adContainer.isOnScreen()))
                    {
                        this._requestInProgress = false;
                        this._fireErrorOccurred("refresh not performed because ad is not on screen", this._ERROR_ENUM.RefreshNotAllowed);
                        this._scheduleRefresh();
                        return
                    }
                    if (this._placement === null)
                    {
                        try
                        {
                            this._placement = new MicrosoftAdvertising.Shared.WinRT.AdPlacement
                        }
                        catch(err)
                        {
                            this._requestInProgress = false;
                            this._fireErrorOccurred("could not initialize AdPlacement", this._ERROR_ENUM.Other);
                            return
                        }
                    }
                    this._placement.applicationId = this._applicationId;
                    this._placement.adUnitId = this._adUnitId;
                    this._placement.latitude = this.latitude;
                    this._placement.longitude = this.longitude;
                    this._placement.width = this._domElement.offsetWidth;
                    this._placement.height = this._domElement.offsetHeight;
                    if (this._rendererOptions !== null && typeof(this._rendererOptions) !== "undefined")
                    {
                        try
                        {
                            this._rendererOptionsUsedInRequest = this._rendererOptions.getOptionsJson()
                        }
                        catch(e)
                        {
                            this._log("error: could not get renderer options as json")
                        }
                        this._placement.adTags = this._rendererOptions.getOptions()
                    }
                    try
                    {
                        var self = this;
                        this._placement.getAdAsync().done(function(ad)
                        {
                            if (ad !== null)
                            {
                                self._adRefreshedCallback(ad)
                            }
                            else
                            {
                                if (!self._isDisposed && self._placement !== null && typeof(self._placement) !== "undefined")
                                {
                                    var error = self._placement.lastError;
                                    self._errorOccurredCallback(error)
                                }
                            }
                        }, function(evt)
                        {
                            if (!self._isDisposed && self._placement !== null && typeof(self._placement) !== "undefined")
                            {
                                var error = self._placement.lastError;
                                self._errorOccurredCallback(error)
                            }
                        });
                        this._timeAtLastRotation = new Date
                    }
                    catch(err)
                    {
                        this._errorOccurredCallback({
                            errorMessage: err.message, errorCode: this._ERROR_ENUM.Other
                        })
                    }
                }, _networkInfo: function()
                {
                    try
                    {
                        return Windows.Networking.Connectivity.NetworkInformation
                    }
                    catch(err) {}
                }(), _networkChangedEventHandler: function(){}, _errorOccurredCallback: function(evt)
                {
                    if (this._isDisposed)
                    {
                        return
                    }
                    if (typeof(evt) !== "object" || evt === null)
                    {
                        this._fireErrorOccurred("Other", this._ERROR_ENUM.Other)
                    }
                    else
                    {
                        this._fireErrorOccurred(evt.errorMessage, evt.errorCode)
                    }
                    this._currentAdHeight = null;
                    this._currentAdWidth = null;
                    this._requestInProgress = false;
                    this._scheduleRefresh()
                }, _adRefreshedCallback: function(ad)
                {
                    if (this._isDisposed)
                    {
                        return
                    }
                    if (ad !== null)
                    {
                        this._onAdReceived(ad)
                    }
                    this._requestInProgress = false;
                    this._scheduleRefresh()
                }, _addApplicationEventType: function(eventType)
                {
                    if (eventType !== null && typeof(eventType) === "number" && (eventType & this._applicationEventsMask) === 0)
                    {
                        this._applicationEventsMask = this._applicationEventsMask | eventType
                    }
                }, _removeApplicationEventType: function(eventType)
                {
                    var off;
                    if (eventType !== null && typeof(eventType) === "number" && (eventType & this._applicationEventsMask) !== 0)
                    {
                        off = eventType ^ (~0);
                        this._applicationEventsMask = this._applicationEventsMask & off
                    }
                }, _updateApplicationEvents: function()
                {
                    if (this._isDisposed === true)
                    {
                        return
                    }
                    if (this._requestInProgress === true)
                    {
                        return
                    }
                    try
                    {
                        if (this._adContainer && this._adContainer.mraidState !== MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.EXPANDED)
                        {
                            this._adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_WIREAPPEVENTS + ":" + JSON.stringify({
                                    events: this._applicationEventsMask, preventDefault: this.preventDefaultApplicationEvents
                                })})
                        }
                    }
                    catch(err)
                    {
                        return
                    }
                }, _onAdReceived: function(ad)
                {
                    if (typeof(ad) !== "undefined" && ad !== null)
                    {
                        var adType = MicrosoftNSJS.Advertising.AdControl.AD_TYPE.poly,
                            adPrmsJSON,
                            promise;
                        this._resetAdControl();
                        this._ad = ad;
                        try
                        {
                            adPrmsJSON = JSON.parse(ad.adParameters);
                            if (adPrmsJSON && typeof(adPrmsJSON.type) === "string" && adPrmsJSON.type.toLowerCase() === MicrosoftNSJS.Advertising.AdControl.AD_TYPE.rrmr)
                            {
                                adType = MicrosoftNSJS.Advertising.AdControl.AD_TYPE.rrmr;
                                if (!adPrmsJSON.htmlPayload)
                                {
                                    throw"Ad payload missing.";
                                }
                            }
                        }
                        catch(err)
                        {
                            this._log("Could not parse out adParameters to JSON, defaulting to polymorphic ad type. Error='{0}'", {
                                err: err, fnName: "_onAdReceived"
                            })
                        }
                        this._currentAdHeight = this._placement.height;
                        this._currentAdWidth = this._placement.width;
                        if (typeof(this._onBeforeAdRender) === "function")
                        {
                            promise = this._onBeforeAdRender(this)
                        }
                        if (adType === MicrosoftNSJS.Advertising.AdControl.AD_TYPE.poly)
                        {
                            if (WinJS.Promise.is(promise))
                            {
                                promise.then(function()
                                {
                                    this._createPolyContainer(ad)
                                }.bind(this))
                            }
                            else
                            {
                                this._createPolyContainer(ad)
                            }
                        }
                        else if (adType === MicrosoftNSJS.Advertising.AdControl.AD_TYPE.rrmr)
                        {
                            if (WinJS.Promise.is(promise))
                            {
                                promise.then(function()
                                {
                                    this._createMraidContainer(ad, adPrmsJSON.htmlPayload)
                                }.bind(this))
                            }
                            else
                            {
                                this._createMraidContainer(ad, adPrmsJSON.htmlPayload)
                            }
                        }
                    }
                }, _readFileContentsAsync: function(uri)
                {
                    return new WinJS.Promise(function(comp, errorHandler)
                        {
                            Windows.Storage.StorageFile.getFileFromApplicationUriAsync(uri).then(function(file)
                            {
                                if (!file)
                                {
                                    throw"Unable to open file.";
                                    return
                                }
                                return Windows.Storage.FileIO.readTextAsync(file)
                            }).then(function(contents)
                            {
                                if (!contents)
                                {
                                    throw"Unable to retrieve contents from file.";
                                    return
                                }
                                comp(contents)
                            }, function(error)
                            {
                                errorHandler(error)
                            }).done(null, function(error)
                            {
                                errorHandler(error)
                            })
                        })
                }, _readNetworkContentsAsync: function(uri)
                {
                    var httpClient;
                    return new WinJS.Promise(function(comp, errorHandler)
                        {
                            if (!uri || uri.length === 0)
                            {
                                throw"Missing required uri parameter";
                            }
                            httpClient = new Windows.Web.Http.HttpClient;
                            httpClient.getAsync(uri).then(function(response)
                            {
                                response.ensureSuccessStatusCode();
                                response.content.readAsStringAsync().then(function(responseText)
                                {
                                    comp(responseText)
                                }.bind(this)).done(function(){}, function(error)
                                {
                                    errorHandler(error)
                                }.bind(this))
                            }.bind(this)).done(function(){}, function(error)
                            {
                                errorHandler(error)
                            }.bind(this))
                        })
                }, _createMraidContainer: function(ad, payloadHTML)
                {
                    var uri = new Windows.Foundation.Uri(MicrosoftNSJS.Advertising.AdControl.MRAID_API_URI);
                    this._readFileContentsAsync(uri).done(function(bootstrapHTML)
                    {
                        var adContainer = new MicrosoftNSJS.Advertising.AdContainer(MicrosoftNSJS.Advertising.AdContainer.TYPE.MRAID);
                        adContainer.create({
                            containerId: this._domElement.id + "_webFrame_" + (+new Date), sourceHTML: bootstrapHTML + payloadHTML, parentElement: this._domElement
                        });
                        adContainer.onAdMessageReceived = function(msg)
                        {
                            this._receiveMessage(msg)
                        }.bind(this);
                        adContainer.onExpandedClosed = function()
                        {
                            this._closePopup()
                        }.bind(this);
                        if (adContainer.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.ERROR)
                        {
                            this._fireErrorOccurred("Unable to create ad container", this._ERROR_ENUM.Other);
                            return
                        }
                        adContainer.onAdContainerLoaded = function(args)
                        {
                            this._adContainerLoaded_Handler(args, ad)
                        }.bind(this)
                    }.bind(this), function(error)
                    {
                        this._log("Could not read bootstrap file. Error='{0}'", {
                            err: error, fnName: "_createMraidContainer"
                        });
                        this._fireErrorOccurred("Unable to create ad container", this._ERROR_ENUM.Other)
                    }.bind(this))
                }, _createPolyContainer: function(ad)
                {
                    var adContainer = new MicrosoftNSJS.Advertising.AdContainer(MicrosoftNSJS.Advertising.AdContainer.TYPE.POLYMORPHIC);
                    adContainer.create({
                        containerId: this._domElement.id + "_webFrame_" + (+new Date), sourceUri: MicrosoftNSJS.Advertising.AdControl.POLY_API_URI, parentElement: this._domElement
                    });
                    adContainer.onAdMessageReceived = function(msg)
                    {
                        this._receiveMessage(msg)
                    }.bind(this);
                    adContainer.onExpandedClosed = function()
                    {
                        this._closePopup()
                    }.bind(this);
                    if (adContainer.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.ERROR)
                    {
                        this._fireErrorOccurred("Unable to create ad container", this._ERROR_ENUM.Other);
                        return
                    }
                    adContainer.onAdContainerLoaded = function(args)
                    {
                        this._adContainerLoaded_Handler(args, ad)
                    }.bind(this)
                }, _adContainerLoaded_Handler: function(args, ad)
                {
                    if (!this._domElement || !args)
                    {
                        return
                    }
                    var container = args.element;
                    if (container.type === MicrosoftNSJS.Advertising.AdContainer.TYPE.POLYMORPHIC || container.type === MicrosoftNSJS.Advertising.AdContainer.TYPE.MRAID)
                    {
                        container.size = container.maxSize = {
                            width: this._domElement.offsetWidth, height: this._domElement.offsetHeight
                        };
                        container.screenSize = {
                            height: document.documentElement.offsetHeight - this._currentCloseBandHeight, width: document.documentElement.offsetWidth
                        };
                        container.initializeOrmma({
                            networkState: this._getNetworkState(), sdkInfo: this._getSdkInfo()
                        });
                        container.mraidState = MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.DEFAULT;
                        container.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_ORMMA_START})
                    }
                    if (container.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.ERROR)
                    {
                        this._fireErrorOccurred("could not create ad container", this._ERROR_ENUM.Other);
                        return
                    }
                    var adContainerToRemove = this._adContainer;
                    this._adContainer = container;
                    this._onAdRefreshedInternal = function()
                    {
                        this._hideDefaultImageAd();
                        if (this._adContainer)
                        {
                            if (adContainerToRemove)
                            {
                                this._adContainer.fadeIn(this._fadeOptions, function()
                                {
                                    adContainerToRemove.dispose();
                                    adContainerToRemove = null
                                })
                            }
                            else
                            {
                                this._adContainer.show()
                            }
                        }
                        this._onAdRefreshedInternal = null
                    }.bind(this);
                    if (container.type === MicrosoftNSJS.Advertising.AdContainer.TYPE.POLYMORPHIC)
                    {
                        this._loadRenderer(this._adContainer, ad).done(function()
                        {
                            container.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_INIT});
                            this._updateApplicationEvents()
                        }.bind(this), function(error)
                        {
                            if (this._adContainer)
                            {
                                this._adContainer.dispose();
                                this._adContainer = null
                            }
                            this._fireErrorOccurred(error, this._ERROR_ENUM.Other)
                        }.bind(this))
                    }
                    if (container.type === MicrosoftNSJS.Advertising.AdContainer.TYPE.MRAID)
                    {
                        container.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_INIT});
                        this._fireAdRefreshed();
                        this._updateApplicationEvents()
                    }
                }, _loadRenderer: function(adContainer, ad)
                {
                    return new WinJS.Promise(function(comp, err)
                        {
                            if (!ad || !ad.rendererUrl || !ad.adParameters)
                            {
                                err("Unable to load ad in ad container.");
                                this._log("Unable to load renderer in container. Missing parameters", {fnName: "_loadRenderer"});
                                this._fireErrorOccurred("Unable to load ad in ad container.", this._ERROR_ENUM.Other);
                                return
                            }
                            var uri = new Windows.Foundation.Uri(ad.rendererUrl);
                            var httpClient = new Windows.Web.Http.HttpClient;
                            httpClient.getAsync(uri).then(function(response)
                            {
                                response.ensureSuccessStatusCode();
                                response.content.readAsStringAsync().then(function(responseText)
                                {
                                    this._rendererContent = responseText;
                                    this._rendererParams = ad.adParameters;
                                    this._prmParams = ad.prmParameters;
                                    if (this._rendererParams !== "")
                                    {
                                        adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_ADPARAMS + ":" + this._rendererParams})
                                    }
                                    if (this._prmParams !== "")
                                    {
                                        adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_PRMPARAMS + ":" + this._prmParams})
                                    }
                                    if (this._rendererOptionsUsedInRequest !== "")
                                    {
                                        adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_APPPARAMS + ":" + this._rendererOptionsUsedInRequest})
                                    }
                                    adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SCRIPT + ":" + this._rendererContent})
                                }.bind(this)).done(function()
                                {
                                    comp()
                                }, function(error)
                                {
                                    this._log("Unable to retrieve ad renderer. Error: {0}", {
                                        err: error, fnName: "_loadRenderer"
                                    });
                                    err("Error loading ad renderer from network.")
                                }.bind(this))
                            }.bind(this)).done(function()
                            {
                                comp()
                            }, function(error)
                            {
                                this._log("Unable to retrieve ad renderer. Error: {0}", {
                                    err: error, fnName: "_loadRenderer"
                                });
                                err("Error loading ad renderer from network.")
                            }.bind(this))
                        }.bind(this))
                }, _resetAdControl: function()
                {
                    this._adInstanceState = null;
                    this._disposeAccelerometer();
                    this._stopOrientationMonitoring();
                    this._stopViewableChangeMonitoring();
                    this._setUseCustomClose(false);
                    this._errorReportCount = 0;
                    this._currentCloseBandHeight = this._RESERVED_CLOSE_BAND_HEIGHT
                }, _generateUniqueId: function()
                {
                    var generatedId = null;
                    var existingElem = null;
                    do
                    {
                        generatedId = "ad" + Math.floor(Math.random() * 10000);
                        existingElem = document.getElementById(generatedId)
                    } while (existingElem !== null);
                    return generatedId
                }, _fireErrorOccurred: function(msg, errorCode)
                {
                    this._log(msg + " (" + errorCode + ")", {fnName: "_fireErrorOccurred"});
                    if (typeof(this._onErrorOccurred) === "function")
                    {
                        this._onErrorOccurred(this, {
                            errorMessage: msg, errorCode: errorCode
                        })
                    }
                }, _firePointerDown: function(msg)
                {
                    if (typeof(this._onPointerDown) === "function")
                    {
                        this._onPointerDown(this, msg)
                    }
                }, _firePointerUp: function()
                {
                    if (typeof(this._onPointerUp) === "function")
                    {
                        this._onPointerUp(this)
                    }
                }, _fireEngagedChanged: function()
                {
                    if (typeof(this._onEngagedChanged) === "function")
                    {
                        this._onEngagedChanged(this)
                    }
                }, _fireMouseWheel: function(evt)
                {
                    if (typeof(this._onMouseWheel) === "function")
                    {
                        this._onMouseWheel(this, evt)
                    }
                }, _firePointerMove: function(evt)
                {
                    if (typeof(this._onPointerMove) === "function")
                    {
                        this._onPointerMove(this, evt)
                    }
                }, _fireManipulationStateChanged: function(evt)
                {
                    if (typeof(this._onManipulationStateChanged) === "function")
                    {
                        this._onManipulationStateChanged(this, evt)
                    }
                }, _fireAdRefreshed: function()
                {
                    if (this._adContainer && this._adContainer.mraidState !== MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.EXPANDED)
                    {
                        if (typeof(this._onAdRefreshedInternal) === "function")
                        {
                            this._onAdRefreshedInternal()
                        }
                        if (typeof(this._onAdRefreshed) === "function")
                        {
                            this._onAdRefreshed(this)
                        }
                    }
                }, _receiveMessage: function(msg)
                {
                    var control = this._domElement.winControl;
                    if (control === null || typeof(control) !== "object" || control._isDisposed)
                    {
                        return
                    }
                    var msgType = null;
                    var msgParams = null;
                    var colonIx = msg.data.indexOf(":");
                    if (colonIx < 0)
                    {
                        msgType = msg.data
                    }
                    else
                    {
                        msgType = msg.data.substr(0, colonIx);
                        msgParams = msg.data.substr(colonIx + 1)
                    }
                    if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_EXPAND)
                    {
                        try
                        {
                            var props = JSON.parse(msgParams);
                            control._expand(props.url)
                        }
                        catch(err)
                        {
                            control._reportError(MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_EXPAND, "unable to parse expand properties as json")
                        }
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_CLOSE)
                    {
                        control._closePopup()
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETEXPANDPROPERTIES)
                    {
                        control._updateExpandProperties(msgParams)
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETUSERENGAGED)
                    {
                        control._processSetUserEngaged(msgParams)
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_ADRENDERED)
                    {
                        control._fireAdRefreshed()
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_INITIALIZED)
                    {}
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_TILT)
                    {
                        control._processTiltMessage(msgParams)
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SHAKE)
                    {
                        control._processShakeMessage(msgParams)
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_GETORIENTATION)
                    {
                        control._processGetOrientationMessage(msgParams)
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_ERROR)
                    {
                        if (control._adContainer && control._adContainer.type === MicrosoftNSJS.Advertising.AdContainer.TYPE.POLYMORPHIC)
                        {
                            control._adContainer.dispose();
                            control._adContainer = null;
                            control._fireErrorOccurred(msgParams, control._ERROR_ENUM.Other)
                        }
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_RESIZE)
                    {
                        if (control._adContainer)
                        {
                            if (control._adContainer.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.DEFAULT)
                            {
                                var resizeProps = JSON.parse(msgParams);
                                control._resize(resizeProps.width, resizeProps.height)
                            }
                            else
                            {
                                control._reportError("resize", "state is not default, current state is:" + control._adContainer.mraidState)
                            }
                        }
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_HIDE)
                    {
                        if (control._adContainer)
                        {
                            if (control._adContainer.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.DEFAULT)
                            {
                                control._resize(0, 0)
                            }
                            else
                            {
                                control._reportError("hide", "state is not default, current state is:" + control._adContainer.mraidState)
                            }
                        }
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SHOW)
                    {
                        if (control._adContainer)
                        {
                            if (control._adContainer.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.HIDDEN)
                            {
                                control._resize(control._adContainer.originalProperties.width, control._adContainer.originalProperties.height)
                            }
                            else
                            {
                                control._reportError("show", "state is not hidden, current state is:" + control._adContainer.mraidState)
                            }
                        }
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_OPEN)
                    {
                        control._processOpenMessage(msgParams)
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_REQUEST)
                    {
                        control._request(JSON.parse(msgParams))
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_VIEWABLECHANGE)
                    {
                        control._processViewableChangeMessage(msgParams)
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_STOREADINSTANCESTATE)
                    {
                        control._storeAdInstanceState(msgParams)
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_ONPOINTERDOWN)
                    {
                        control._firePointerDown(JSON.parse(msgParams))
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_ONPOINTERUP)
                    {
                        control._firePointerUp()
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_USECUSTOMCLOSE)
                    {
                        control._setUseCustomClose(JSON.parse(msgParams))
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_ONMOUSEWHEEL)
                    {
                        control._fireMouseWheel(JSON.parse(msgParams))
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_ONPOINTERMOVE)
                    {
                        control._firePointerMove(JSON.parse(msgParams))
                    }
                    else if (msgType === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_ONMANIPSTATECHANGED)
                    {
                        control._fireManipulationStateChanged(JSON.parse(msgParams))
                    }
                    else
                    {
                        control._reportError("unknown", "unknown action")
                    }
                }, _reportError: function(action, message)
                {
                    if (!this._adContainer)
                    {
                        this._log("Unable to report error, adContainer missing", {fnName: "_reportError"});
                        return
                    }
                    if (this._errorReportCount < this._MAX_ERROR_REPORT)
                    {
                        this._log("Reporting error to ad container. Action:" + action + " , Message: " + message, {fnName: "_reportError"});
                        this._errorReportCount++;
                        message = this._errorReportCount >= this._MAX_ERROR_REPORT ? this._MAX_ERROR_REPORT_MESSAGE : message;
                        this._adContainer.postMessage({
                            msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_ERROR + ":" + JSON.stringify({
                                action: action, message: message
                            }), all: true
                        })
                    }
                }, _setupEvents: function()
                {
                    try
                    {
                        window.addEventListener("message", this._receiveMessage);
                        var self = this;
                        this._domElement.addEventListener("mselementresize", function(e)
                        {
                            self._onResize()
                        });
                        this._resizeHandler = this._onDocumentResize.bind(this);
                        window.addEventListener("resize", this._resizeHandler);
                        this._domNodeRemovedHandler = function(evt)
                        {
                            if (evt.target === this._domElement)
                            {
                                this.dispose()
                            }
                        }.bind(this);
                        this._domElement.addEventListener("DOMNodeRemoved", this._domNodeRemovedHandler);
                        this._networkChangedEventHandler = function(eventArgs)
                        {
                            if (this._adContainer)
                            {
                                this._adContainer.postMessage({
                                    msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETNETWORK + ":" + self._getNetworkState(), all: true
                                })
                            }
                        }.bind(this);
                        this._networkInfo.addEventListener("networkstatuschanged", this._networkChangedEventHandler);
                        if (this._adsGlobalEventManager !== null && typeof(this._adsGlobalEventManager) !== "undefined" && this._adsGlobalEventManager.isInitialized === true)
                        {
                            this._globalAdEngagedHandler = this._adsGlobalEventManager.addEventListener(MicrosoftNSJS.Advertising.AdGlobalEventManager.EVENT_TYPE.AD_ENGAGED, function(engagedAdId)
                            {
                                if (self.element !== null && typeof(self.element !== "undefined") && self.element.id !== engagedAdId)
                                {
                                    self.suspend()
                                }
                            });
                            this._globalAdDisengagedHandler = this._adsGlobalEventManager.addEventListener(MicrosoftNSJS.Advertising.AdGlobalEventManager.EVENT_TYPE.AD_DISENGAGED, function(disengagedAdId)
                            {
                                if (self.element !== null && typeof(self.element !== "undefined") && self.element.id !== disengagedAdId)
                                {
                                    self.resume()
                                }
                            })
                        }
                    }
                    catch(err) {}
                }, _setUseCustomClose: function(flag)
                {
                    var previousCloseBandHeight = this._currentCloseBandHeight;
                    if (flag)
                    {
                        this._currentCloseBandHeight = 0
                    }
                    else
                    {
                        this._currentCloseBandHeight = this._RESERVED_CLOSE_BAND_HEIGHT
                    }
                    if (this._adContainer && previousCloseBandHeight !== this._currentCloseBandHeight)
                    {
                        this._adContainer.screenSize = {
                            height: document.documentElement.offsetHeight - this._currentCloseBandHeight, width: document.documentElement.offsetWidth
                        }
                    }
                }, _disposeAdPlacement: function()
                {
                    if (this._placement !== null)
                    {
                        this._placement.onadrefreshed = null;
                        this._placement.onerroroccurred = null;
                        this._placement = null
                    }
                }, _onDocumentResize: function()
                {
                    var expandProps,
                        expandBounds,
                        screenWidth = document.documentElement.offsetWidth,
                        screenHeight = document.documentElement.offsetHeight;
                    if (this._adContainer)
                    {
                        expandProps = this._adContainer.expandProperties;
                        this._adContainer.screenSize = {
                            height: screenHeight, width: screenWidth
                        };
                        if (expandProps)
                        {
                            if (this._adContainer.type === MicrosoftNSJS.Advertising.AdContainer.TYPE.MRAID)
                            {
                                expandBounds = this._getExpandedBounds({
                                    width: expandProps.width, height: expandProps.height
                                });
                                if (expandProps.width > expandBounds.width || expandProps.height > expandBounds.height)
                                {
                                    expandProps.width = expandBounds.width;
                                    expandProps.height = expandBounds.height
                                }
                            }
                            else
                            {
                                expandBounds = this._getExpandedBounds({
                                    width: screenWidth, height: screenHeight
                                });
                                expandProps.width = expandBounds.width;
                                expandProps.height = expandBounds.height
                            }
                            expandProps.x = expandBounds.x;
                            expandProps.y = expandBounds.y;
                            this._adContainer.expandProperties = expandProps;
                            this._adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETSIZE + ":" + JSON.stringify({
                                    width: expandProps.width, height: expandProps.height
                                })})
                        }
                    }
                }, _onResize: function()
                {
                    var newWidth = this.element.offsetWidth;
                    var newHeight = this.element.offsetHeight;
                    var currentWidth = this._currentAdWidth;
                    var currentHeight = this._currentAdHeight;
                    if (newWidth !== currentWidth || newHeight !== currentHeight)
                    {
                        if (!this._requestInProgress)
                        {
                            this._unscheduleRefresh();
                            this._refreshInternal()
                        }
                        if (this._enableDefaultImageAd)
                        {
                            this._hideDefaultImageAd();
                            this._showDefaultImageAd()
                        }
                        this._log("oldWidth:" + currentWidth + " oldHeight:" + currentHeight + " newWidth:" + newWidth + " newHeight: " + newHeight, {fnName: "_onResize"})
                    }
                    else
                    {
                        this._scheduleRefresh();
                        this._log("no size change detected", {fnName: "_onResize"})
                    }
                }, _updateExpandProperties: function(newExpandProps)
                {
                    var expandedBounds,
                        expandProps;
                    if (!this._adContainer)
                    {
                        this._log("Unable to update expand properties, adContainer missing.", {fnName: "_updateExpandProperties"});
                        return
                    }
                    try
                    {
                        expandProps = JSON.parse(newExpandProps)
                    }
                    catch(err)
                    {
                        this._reportError(MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETEXPANDPROPERTIES, "unable to parse expand properties as json");
                        return
                    }
                    expandedBounds = this._getExpandedBounds(expandProps);
                    expandProps.width = expandedBounds.width;
                    expandProps.height = expandedBounds.height;
                    expandProps.x = expandedBounds.x;
                    expandProps.y = expandedBounds.y;
                    this._adContainer.expandProperties = expandProps
                }, _getExpandedBounds: function(expandProperties)
                {
                    try
                    {
                        var screenHeight = document.documentElement.offsetHeight,
                            screenWidth = document.documentElement.offsetWidth,
                            expandedX = 0,
                            expandedY = 0,
                            expandedHeight = screenHeight - this._currentCloseBandHeight,
                            expandedWidth = screenWidth;
                        if (expandProperties)
                        {
                            expandedWidth = expandProperties.width !== undefined ? expandProperties.width : expandedWidth;
                            expandedHeight = expandProperties.height !== undefined ? expandProperties.height : expandedHeight;
                            if (expandedHeight > screenHeight - this._currentCloseBandHeight)
                            {
                                expandedWidth = Math.floor(expandedWidth * (screenHeight - this._currentCloseBandHeight) / expandedHeight);
                                expandedHeight = screenHeight - this._currentCloseBandHeight
                            }
                            if (expandedWidth > screenWidth)
                            {
                                expandedHeight = Math.floor(expandedHeight * (screenWidth / expandedWidth));
                                expandedWidth = screenWidth
                            }
                            expandedX = (screenWidth - expandedWidth) / 2;
                            expandedY = (screenHeight - expandedHeight) / 2
                        }
                        return {
                                x: expandedX, y: expandedY, width: expandedWidth, height: expandedHeight
                            }
                    }
                    catch(error)
                    {
                        this._log("Unable to calculate expand bounds. Error: {0}", {
                            err: error, fnName: "_getExpandedBounds"
                        });
                        return {
                                x: 0, y: 0, width: 0, height: 0
                            }
                    }
                }, _expand: function(url)
                {
                    if (!this._adContainer)
                    {
                        this._log("Unable to expand, adContainer missing.", {fnName: "_expand"});
                        return
                    }
                    if (!this._adContainer.expandProperties)
                    {
                        this._adContainer.expandProperties = this._getExpandedBounds(this._adContainer.expandProperties)
                    }
                    try
                    {
                        if (this._adContainer.type === MicrosoftNSJS.Advertising.AdContainer.TYPE.POLYMORPHIC)
                        {
                            this._expandPolymorphicContainer(url)
                        }
                        else if (this._adContainer.type === MicrosoftNSJS.Advertising.AdContainer.TYPE.MRAID)
                        {
                            this._expandMraidContainer(url)
                        }
                    }
                    catch(error)
                    {
                        this._log("Unable to expand. Error: {0}", {
                            err: error, fnName: "_expandPolymorphicContainer"
                        })
                    }
                }, _expandPolymorphicContainer: function(url)
                {
                    if (!this._adContainer || this._adContainer.type !== MicrosoftNSJS.Advertising.AdContainer.TYPE.POLYMORPHIC)
                    {
                        this._log("Unable to expand, adContainer missing or of incorrect type.", {fnName: "_expandPolymorphicContainer"});
                        return
                    }
                    this._adContainer.expand(url, {
                        sourceUri: MicrosoftNSJS.Advertising.AdControl.POLY_API_URI, onAdContainerLoaded: function(args)
                            {
                                if (!this._adContainer)
                                {
                                    this._log("Unable to expand, adContainer missing.", {fnName: "_expandPolymorphicContainer"});
                                    return
                                }
                                if (this._adInstanceState !== null)
                                {
                                    this._adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETADINSTANCESTATE + ":" + this._adInstanceState})
                                }
                                this._adContainer.screenSize = this._adContainer.maxSize = {
                                    forceUpdate: true, width: document.documentElement.offsetWidth, height: document.documentElement.offsetHeight - this._currentCloseBandHeight
                                };
                                this._adContainer.size = {
                                    forceUpdate: true, width: this._adContainer.expandProperties.width, height: this._adContainer.expandProperties.height
                                };
                                this._adContainer.initializeOrmma({
                                    networkState: this._getNetworkState(), sdkInfo: this._getSdkInfo()
                                });
                                this._adContainer.mraidState = MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.EXPANDED;
                                this._adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_ORMMA_START});
                                this._loadRenderer(this._adContainer, this._ad).done(function()
                                {
                                    if (!this._adContainer)
                                    {
                                        this._log("Unable to expand, adContainer missing.", {fnName: "_expandPolymorphicContainer"});
                                        return
                                    }
                                    this._adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_INIT});
                                    this._unscheduleRefresh();
                                    try
                                    {
                                        this._adsGlobalEventManager.broadcastEvent(MicrosoftNSJS.Advertising.AdGlobalEventManager.EVENT_TYPE.AD_ENGAGED, this.element.id)
                                    }
                                    catch(error)
                                    {
                                        this._log("Unable to call this._adsGlobalEventManager. Error: {0}", {
                                            err: error, fnName: "_expandPolymorphicContainer"
                                        })
                                    }
                                    window._msAdEngaged = true;
                                    this._fireEngagedChanged()
                                }.bind(this), function(error)
                                {
                                    this._closePopup()
                                }.bind(this))
                            }.bind(this)
                    })
                }, _expandMraidContainer: function(url)
                {
                    var uri,
                        mraidUri,
                        baseElementHTML;
                    if (!this._adContainer || this._adContainer.type !== MicrosoftNSJS.Advertising.AdContainer.TYPE.MRAID)
                    {
                        this._log("Unable to expand, adContainer missing or of incorrect type.", {fnName: "_expandMraidContainer"});
                        return
                    }
                    if (url && url.length > 0)
                    {
                        uri = new Windows.Foundation.Uri(url);
                        if (url.length > this._MAX_URL_LENGTH || typeof(MicrosoftNSJS.Advertising.AdContainer.ALLOWED_URI_SCHEMES[uri.schemeName.toLowerCase()]) === "undefined")
                        {
                            this._log("Unable to expand, url of incorrect scheme or too long.", {fnName: "_expandMraidContainer"});
                            return
                        }
                        this._readNetworkContentsAsync(uri).done(function(contents)
                        {
                            if (contents)
                            {
                                baseElementHTML = MicrosoftNSJS.Advertising.AdControl.BASE_ELEMENT_TEMPLATE.replace("{url}", uri.schemeName + "://" + uri.host);
                                mraidUri = new Windows.Foundation.Uri(MicrosoftNSJS.Advertising.AdControl.MRAID_API_URI),
                                this._readFileContentsAsync(mraidUri).done(function(bootstrapHTML)
                                {
                                    if (bootstrapHTML)
                                    {
                                        if (!this._adContainer)
                                        {
                                            this._log("Unable to expand, adContainer missing.", {fnName: "_expandMraidContainer"});
                                            return
                                        }
                                        this._adContainer.expand(url, {
                                            sourceHTML: bootstrapHTML + baseElementHTML + contents, onAdContainerLoaded: function(args)
                                                {
                                                    this._adContainer.screenSize = this._adContainer.maxSize = {
                                                        forceUpdate: true, width: document.documentElement.offsetWidth, height: document.documentElement.offsetHeight - this._currentCloseBandHeight
                                                    };
                                                    this._adContainer.size = {
                                                        forceUpdate: true, width: this._adContainer.expandProperties.width, height: this._adContainer.expandProperties.height
                                                    };
                                                    this._adContainer.initializeOrmma({
                                                        networkState: this._getNetworkState(), sdkInfo: this._getSdkInfo()
                                                    });
                                                    this._adContainer.mraidState = MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.EXPANDED;
                                                    this._adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_ORMMA_START});
                                                    this._adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_INIT});
                                                    this._unscheduleRefresh();
                                                    window._msAdEngaged = true;
                                                    this._fireEngagedChanged()
                                                }.bind(this)
                                        })
                                    }
                                }.bind(this), function(error)
                                {
                                    this._log("Unable to retrieve mraid API contents. Error: {0}", {
                                        err: error, fnName: "_expandMraidContainer"
                                    })
                                }.bind(this))
                            }
                        }.bind(this), function(error)
                        {
                            this._log("Unable to retrieve url contents. Error: {0}", {
                                err: error, fnName: "_expandMraidContainer"
                            })
                        }.bind(this))
                    }
                    else
                    {
                        this._adContainer.expand(url, {onAdContainerLoaded: function(args)
                            {
                                if (!this._adContainer)
                                {
                                    this._log("Unable to expand, adContainer missing.", {fnName: "_expandMraidContainer"});
                                    return
                                }
                                this._adContainer.mraidState = MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.EXPANDED;
                                this._adContainer.size = {
                                    width: this._adContainer.expandProperties.width, height: this._adContainer.expandProperties.height
                                };
                                this._unscheduleRefresh();
                                window._msAdEngaged = true;
                                this._fireEngagedChanged()
                            }.bind(this)})
                    }
                }, _disposeElement: function(node)
                {
                    if (node !== null && typeof(node) === "object")
                    {
                        try
                        {
                            document.body.removeChild(node);
                            return null
                        }
                        catch(err)
                        {
                            this._log("unable to remove node")
                        }
                    }
                    return node
                }, _closePopup: function()
                {
                    if (!this._adContainer)
                    {
                        return
                    }
                    this._adContainer.close();
                    this._adContainer.maxSize = {
                        width: this._domElement.offsetWidth, height: this._domElement.offsetHeight
                    };
                    if (this._adContainer.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.DEFAULT)
                    {
                        this._scheduleRefresh()
                    }
                    window._msAdEngaged = false;
                    this._fireEngagedChanged();
                    try
                    {
                        this._adsGlobalEventManager.broadcastEvent(MicrosoftNSJS.Advertising.AdGlobalEventManager.EVENT_TYPE.AD_DISENGAGED, this.element.id)
                    }
                    catch(err)
                    {
                        this._log("this._adsGlobalEventManager could not be called")
                    }
                }, _resize: function(width, height)
                {
                    if (width === null || height === null || width === "" || height === "" || isNaN(width + height))
                    {
                        this._reportError("resize", "invalid width or height supplied");
                        return
                    }
                    if (this._adContainer)
                    {
                        if (height === 0 && width === 0)
                        {
                            this._adContainer.close()
                        }
                        else
                        {
                            if (this._adContainer.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.HIDDEN)
                            {
                                this._adContainer.show()
                            }
                            if (this._adContainer.originalProperties.width === width && this._adContainer.originalProperties.height === height)
                            {
                                this._adContainer.size = {
                                    height: height, width: width
                                };
                                this._adContainer.mraidState = MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.DEFAULT
                            }
                            else
                            {
                                this._adContainer.size = {
                                    height: height, width: width
                                };
                                this._adContainer.mraidState = MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.RESIZED
                            }
                        }
                    }
                }, _processSetUserEngaged: function(msgStr)
                {
                    if (msgStr === null || msgStr.indexOf("=") === -1)
                    {
                        this._log("invalid setUserEngaged message: " + msgStr)
                    }
                    else
                    {
                        var msgArray = msgStr.split("=");
                        if (msgArray[0] === "engaged")
                        {
                            var engagedBefore = this.isEngaged;
                            this._isUserEngaged = (msgArray[1] === "true");
                            if (this._isAutoRefreshEnabled)
                            {
                                if (this._isUserEngaged)
                                {
                                    this._unscheduleRefresh()
                                }
                                else
                                {
                                    this._scheduleRefresh()
                                }
                            }
                            if (engagedBefore !== this.isEngaged)
                            {
                                this._fireEngagedChanged()
                            }
                        }
                        else
                        {
                            this._log("invalid setUserEngaged message: " + msgStr)
                        }
                    }
                }, _processTiltMessage: function(msgStr)
                {
                    if (msgStr === null || msgStr.indexOf("=") === -1)
                    {
                        this._log("invalid tilt message: " + msgStr)
                    }
                    else
                    {
                        var msgArray = msgStr.split("=");
                        if (msgArray[0] === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_LISTENER)
                        {
                            if (msgArray[1] === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_VALUESTART)
                            {
                                this._startTiltAccelerometer()
                            }
                            else if (msgArray[1] === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_VALUESTOP)
                            {
                                this._stopTiltAccelerometer()
                            }
                            else
                            {
                                this._log("invalid tilt message: " + msgStr)
                            }
                        }
                        else if (msgArray[0] === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_GETTILT && msgArray[1] === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_REFRESH)
                        {
                            this._getTilt()
                        }
                        else
                        {
                            this._log("invalid tilt message: " + msgStr)
                        }
                    }
                }, _processShakeMessage: function(msgStr)
                {
                    if (msgStr === null || msgStr.indexOf("=") === -1)
                    {
                        this._log("invalid shake message: " + msgStr)
                    }
                    else
                    {
                        var msgArray = msgStr.split("=");
                        if (msgArray[0] === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_LISTENER)
                        {
                            if (msgArray[1] === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_VALUESTART)
                            {
                                this._startShakeAccelerometer()
                            }
                            else if (msgArray[1] === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_VALUESTOP)
                            {
                                this._stopShakeAccelerometer()
                            }
                            else
                            {
                                this._log("invalid shake message: " + msgStr)
                            }
                        }
                        else
                        {
                            this._log("invalid shake message: " + msgStr)
                        }
                    }
                }, _startTiltAccelerometer: function()
                {
                    if (this._checkAndCreateAccelerometer())
                    {
                        try
                        {
                            if (typeof(this._accelerometer.tiltHandlers[this._ad.guid]) === "undefined" || this._accelerometer.tiltHandlers[this._ad.guid] === null)
                            {
                                this._accelerometer.device.addEventListener("readingchanged", this._generateTiltListener())
                            }
                        }
                        catch(err) {}
                    }
                }, _generateTiltListener: function()
                {
                    try
                    {
                        var handler = function(eventArgs)
                            {
                                var coords = this._generateCoordsMessage(eventArgs.reading.accelerationX, eventArgs.reading.accelerationY, eventArgs.reading.accelerationZ);
                                if (this._adContainer)
                                {
                                    this._adContainer.postMessage({
                                        msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_UPDATETILTCOORDS + ":{" + coords + "}", all: true
                                    })
                                }
                            }.bind(this);
                        if (this._accelerometer !== null && typeof(this._accelerometer) !== "undefined")
                        {
                            this._accelerometer.tiltHandlers[this._ad.guid] = handler
                        }
                        return handler
                    }
                    catch(err)
                    {
                        return
                    }
                }, _generateCoordsMessage: function(x, y, z)
                {
                    return '"x":"' + x + '","y":"' + y + '","z":"' + z + '"'
                }, _stopTiltAccelerometer: function()
                {
                    try
                    {
                        var handler = this._accelerometer.tiltHandlers[this._ad.guid];
                        if (handler !== null && typeof(handler) !== "undefined")
                        {
                            this._accelerometer.device.removeEventListener("readingchanged", handler);
                            this._accelerometer.tiltHandlers[this._ad.guid] = null
                        }
                    }
                    catch(err)
                    {
                        this._log("could not stop the tilt accelerometer")
                    }
                }, _startShakeAccelerometer: function()
                {
                    if (this._checkAndCreateAccelerometer())
                    {
                        try
                        {
                            if (typeof(this._accelerometer.shakeHandlers[this._ad.guid]) === "undefined" || this._accelerometer.shakeHandlers[this._ad.guid] === null)
                            {
                                this._accelerometer.device.addEventListener("shaken", this._generateShakeListener())
                            }
                        }
                        catch(err)
                        {
                            this._log("could not start the shake accelerometer")
                        }
                    }
                }, _generateShakeListener: function()
                {
                    var handler = function(eventArgs)
                        {
                            if (this._adContainer)
                            {
                                this._adContainer.postMessage({
                                    msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_FIRESHAKE, all: true
                                })
                            }
                        }.bind(this);
                    if (this._accelerometer !== null && typeof(this._accelerometer) !== "undefined")
                    {
                        this._accelerometer.shakeHandlers[this._ad.guid] = handler
                    }
                    return handler
                }, _stopShakeAccelerometer: function()
                {
                    try
                    {
                        var handler = this._accelerometer.shakeHandlers[this._ad.guid];
                        if (handler !== null && typeof(handler) !== "undefined")
                        {
                            this._accelerometer.device.removeEventListener("shaken", handler);
                            this._accelerometer.shakeHandlers[this._ad.guid] = null
                        }
                    }
                    catch(err)
                    {
                        this._log("could not stop shake accelerometer")
                    }
                }, _getTilt: function()
                {
                    if (this._checkAndCreateAccelerometer())
                    {
                        try
                        {
                            var coords = this._lastCoords;
                            var strCoords = this._generateCoordsMessage(coords.x, coords.y, coords.z);
                            if (this._adContainer)
                            {
                                this._adContainer.postMessage({
                                    msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_UPDATETILTCOORDS + ":{" + strCoords + "}", all: true
                                })
                            }
                            var reading = this._accelerometer.device.getCurrentReading();
                            this._lastCoords = {
                                x: reading.accelerationX, y: reading.accelerationY, z: reading.accelerationZ
                            }
                        }
                        catch(err)
                        {
                            this._log("error in getTilt")
                        }
                    }
                }, _disposeAccelerometer: function()
                {
                    if (this._accelerometer === null)
                    {
                        return
                    }
                    else if (this._accelerometer.device !== null && typeof(this._accelerometer.device) === "object")
                    {
                        this._stopShakeAccelerometer();
                        this._stopTiltAccelerometer()
                    }
                }, _checkAndCreateAccelerometer: function()
                {
                    if (this._accelerometer === null || typeof(this._accelerometer.device) !== "object")
                    {
                        this._accelerometer = {}
                    }
                    try
                    {
                        if (this._accelerometer.device === null || typeof(this._accelerometer.device) !== "object")
                        {
                            this._accelerometer.device = Windows.Devices.Sensors.Accelerometer.getDefault();
                            this._accelerometer.device.reportInterval = this._sensorOptions.accelerometer.reportIntervalMS
                        }
                        if (this._accelerometer.device === null || typeof(this._accelerometer.device) !== "object")
                        {
                            this._log("could not instantiate the accelerometer object, is the sensor online?");
                            return false
                        }
                        return true
                    }
                    catch(err)
                    {
                        return false
                    }
                }, _processOpenMessage: function(msgStr)
                {
                    var data = null,
                        uri = null;
                    try
                    {
                        data = JSON.parse(msgStr);
                        uri = new Windows.Foundation.Uri(data.url);
                        if (data.url.length <= this._MAX_URL_LENGTH && MicrosoftNSJS.Advertising.AdContainer.ALLOWED_URI_SCHEMES[uri.schemeName.toLowerCase()])
                        {
                            Windows.System.Launcher.launchUriAsync(uri)
                        }
                        else
                        {
                            this._reportError("open", "unable to open URL")
                        }
                    }
                    catch(err)
                    {
                        this._reportError("open", "unable to open URL")
                    }
                }, _processViewableChangeMessage: function(msgStr)
                {
                    if (msgStr === null || msgStr.indexOf("=") === -1)
                    {
                        this._log("invalid viewable change message: " + msgStr)
                    }
                    else
                    {
                        var msgArray = msgStr.split("=");
                        if (msgArray[0] === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_LISTENER)
                        {
                            if (msgArray[1] === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_VALUESTART)
                            {
                                this._startViewableChangeMonitoring()
                            }
                            else if (msgArray[1] === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_VALUESTOP)
                            {
                                this._stopViewableChangeMonitoring()
                            }
                            else
                            {
                                this._log("invalid viewable change message: " + msgStr)
                            }
                        }
                        else
                        {
                            this._log("invalid viewably change message: " + msgStr)
                        }
                    }
                }, _storeAdInstanceState: function(adInstanceState)
                {
                    this._adInstanceState = adInstanceState;
                    if (this._adContainer)
                    {
                        if (this._adContainer.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.EXPANDED)
                        {
                            this._adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETADINSTANCESTATE + ":" + this._adInstanceState})
                        }
                    }
                }, _startViewableChangeMonitoring: function()
                {
                    if (this._viewableChangedTimer === null)
                    {
                        this._adContainer && this._adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_VIEWABLECHANGE + ":" + JSON.stringify({viewable: this._adContainer.isViewable()})});
                        this._viewableChangedTimer = window.setInterval(function()
                        {
                            var onScreen = this._adContainer && this._adContainer.isViewable();
                            if (this._hasViewablility !== onScreen)
                            {
                                this._hasViewablility = onScreen;
                                this._adContainer && this._adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_VIEWABLECHANGE + ":" + JSON.stringify({viewable: onScreen})})
                            }
                        }.bind(this), this._viewableCheckPeriodMs)
                    }
                    if (this._adContainer)
                    {
                        this._hasViewablility = this._adContainer.isViewable();
                        this._adContainer.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_VIEWABLECHANGE + ":" + JSON.stringify({viewable: this._hasViewablility})})
                    }
                }, _stopViewableChangeMonitoring: function()
                {
                    if (this._viewableChangedTimer !== null && typeof(this._viewableChangedTimer) === "number")
                    {
                        window.clearInterval(this._viewableChangedTimer);
                        this._viewableChangedTimer = null
                    }
                }, _processGetOrientationMessage: function(msgStr)
                {
                    if (msgStr !== null && msgStr.indexOf("=") !== -1)
                    {
                        var msgArray = msgStr.split("=");
                        if (msgArray[0] === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_LISTENER)
                        {
                            if (msgArray[1] === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_VALUESTART)
                            {
                                this._startOrientationMonitoring()
                            }
                            else if (msgArray[1] === MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_VALUESTOP)
                            {
                                this._stopOrientationMonitoring()
                            }
                            else
                            {
                                this._log("invalid orientation message: " + msgStr)
                            }
                        }
                        else
                        {
                            this._log("invalid orientation message: " + msgStr)
                        }
                    }
                }, _updateOrienation: function()
                {
                    var orientation = -1;
                    try
                    {
                        switch (Windows.Graphics.Display.DisplayProperties.currentOrientation)
                        {
                            case Windows.Graphics.Display.DisplayOrientations.landscape:
                                orientation = 270;
                                break;
                            case Windows.Graphics.Display.DisplayOrientations.landscapeFlipped:
                                orientation = 90;
                                break;
                            case Windows.Graphics.Display.DisplayOrientations.portraitFlipped:
                                orientation = 180;
                                break;
                            case Windows.Graphics.Display.DisplayOrientations.portrait:
                                orientation = 0;
                                break;
                            default:
                                orientation = -1;
                                break
                        }
                        if (this._adContainer)
                        {
                            this._adContainer.postMessage({
                                msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_UPDATEORIENTATION + ":" + JSON.stringify({orientation: orientation}), all: true
                            })
                        }
                    }
                    catch(err)
                    {
                        control._reportError(MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_UPDATEORIENTATION, "Unable to communicate with orientation sensor.")
                    }
                }, _startOrientationMonitoring: function()
                {
                    try
                    {
                        if (typeof(this._orientationChangedHandler) !== "function")
                        {
                            this._orientationChangedHandler = function(evt)
                            {
                                this._updateOrienation()
                            }.bind(this);
                            Windows.Graphics.Display.DisplayProperties.addEventListener("orientationchanged", this._orientationChangedHandler)
                        }
                    }
                    catch(err)
                    {
                        control._reportError(MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_UPDATEORIENTATION, "Unable to communicate with orientation sensor.")
                    }
                }, _stopOrientationMonitoring: function()
                {
                    try
                    {
                        if (typeof(this._orientationChangedHandler) === "function")
                        {
                            Windows.Graphics.Display.DisplayProperties.removeEventListener("orientationchanged", this._orientationChangedHandler);
                            this._orientationChangedHandler = null
                        }
                    }
                    catch(err)
                    {
                        control._reportError(MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_UPDATEORIENTATION, "Unable to communicate with orientation sensor.")
                    }
                }, _scheduleRefresh: function()
                {
                    if (this._isAutoRefreshEnabled && this._refreshTimerId === null)
                    {
                        var self = this;
                        this._refreshTimerId = setTimeout(function()
                        {
                            self._refreshTimerId = null;
                            self._refreshInternal()
                        }, this._refreshPeriodSeconds * 1000)
                    }
                }, _unscheduleRefresh: function()
                {
                    if (this._refreshTimerId !== null)
                    {
                        clearTimeout(this._refreshTimerId);
                        this._refreshTimerId = null
                    }
                }, _request: function(data)
                {
                    if (this._getNetworkState() === this._ORMMA_NETWORK_OFFLINE)
                    {
                        this._reportError(MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_REQUEST, "http request error, network offline");
                        return
                    }
                    try
                    {
                        var self = this;
                        var req = new XMLHttpRequest;
                        if (data.display.toLowerCase() !== this._ORMMA_RESPONSE_IGNORE)
                        {
                            req.onreadystatechange = function()
                            {
                                if (this.readyState === XMLHttpRequest.DONE)
                                {
                                    if (this.status === 200)
                                    {
                                        var responseJSON = {
                                                url: escape(data.url), response: escape(this.responseText)
                                            };
                                        if (self._adContainer)
                                        {
                                            self._adContainer.postMessage({
                                                msg: "ormmaResponse:" + JSON.stringify(responseJSON), all: true
                                            })
                                        }
                                    }
                                    else
                                    {
                                        self._reportError(MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_REQUEST, "error on request to url: " + data.url + ": code " + req.status)
                                    }
                                }
                            }
                        }
                        req.open("GET", data.url, true);
                        req.setRequestHeader(this._HTTP_HEADER_CACHE_CONTROL, this._HTTP_HEADER_VALUE_CACHE_CONTROL_NO_CACHE);
                        req.timeout = 10000;
                        req.send(null)
                    }
                    catch(e)
                    {
                        this._reportError(MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_REQUEST, "http request error: " + e.message)
                    }
                }, _validateParameters: function()
                {
                    if (this._applicationId === null || this._applicationId === "" || this._adUnitId === null || this._adUnitId === "")
                    {
                        this._fireErrorOccurred("ad control requires applicationId and adUnitId properties to be set", this._ERROR_ENUM.ClientConfiguration);
                        return false
                    }
                    if (typeof(this.latitude) !== "undefined" && !this._validateNumber("latitude", this.latitude))
                    {
                        return false
                    }
                    if (typeof(this.longitude) !== "undefined" && !this._validateNumber("longitude", this.longitude))
                    {
                        return false
                    }
                    return true
                }, _validateNumber: function(fieldName, value)
                {
                    if (typeof(value) === "number")
                    {
                        if (isNaN(value))
                        {
                            this._fireErrorOccurred(fieldName + " value is not a valid number (NaN)", this._ERROR_ENUM.ClientConfiguration);
                            return false
                        }
                    }
                    else
                    {
                        this._fireErrorOccurred(fieldName + " value is not a valid type: " + typeof(value), this._ERROR_ENUM.ClientConfiguration);
                        return false
                    }
                    return true
                }, _getNetworkState: function()
                {
                    var wifiThreshold = 1024000;
                    try
                    {
                        var connProfile = this._networkInfo.getInternetConnectionProfile();
                        if (!connProfile || connProfile.getNetworkConnectivityLevel() === Windows.Networking.Connectivity.NetworkConnectivityLevel.none)
                        {
                            return this._ORMMA_NETWORK_OFFLINE
                        }
                        else
                        {
                            var interfaceType = connProfile.networkAdapter.ianaInterfaceType;
                            if (interfaceType === 6 || interfaceType === 71)
                            {
                                return this._ORMMA_NETWORK_WIFI
                            }
                            else
                            {
                                return this._ORMMA_NETWORK_CELL
                            }
                        }
                    }
                    catch(err)
                    {
                        this._log("error getting network state: " + (err !== null && typeof(err) === "object" ? err.message : "???"))
                    }
                    return this._ORMMA_NETWORK_UNKNOWN
                }, _isElementAllowed: function(element)
                {
                    if (element !== null && typeof(element) === "object" && typeof(element.tagName) === "string")
                    {
                        var tagName = element.tagName.toLowerCase();
                        if (tagName === "button" || tagName === "menu" || tagName === "ol" || tagName === "textarea" || tagName === "ul" || tagName === "canvas" || tagName === "embed" || tagName === "html" || tagName === "iframe" || tagName === "img" || tagName === "input" || tagName === "select" || tagName === "video" || tagName === "a")
                        {
                            return false
                        }
                        return true
                    }
                    return false
                }, _log: function(msg, args){}
        }, {
            OBJECT_NAME: "MicrosoftNSJS.Advertising.AdControl", POLY_API_URI: "ms-appx-web:///MSAdvertisingJS/ads/bootstrap.html", MRAID_API_URI: "ms-appx:///MSAdvertisingJS/ads/mraidApi.html", BASE_ELEMENT_TEMPLATE: "<base href='{url}'>", AD_TYPE: {
                    rrmr: "rrmr", poly: "poly"
                }
        })})
})(WinJS);
/*!
  Copyright (C) Microsoft. All rights reserved.
  This library is supported for use in Windows Store apps only.
*/
(function(WinJS)
{
    "use strict";
    var AdSettingsControl = WinJS.Class.define(function(settings)
        {
            if (!this._isNullOrUndefined(window))
            {
                if (this._isNullOrUndefined(window._msAdsAdSettingsControl) || window._msAdsAdSettingsControl.isInitialized !== true)
                {
                    if (!this._isNullOrUndefined(window._msAdsAdSettingsControl) && window._msAdsAdSettingsControl._objectName !== MicrosoftNSJS.Advertising.AdSettingsControl.OBJECT_NAME)
                    {
                        this._logError("window._msAdsAdSettingsControl already exists but is not of correct object type [{0}]. Overwriting.", MicrosoftNSJS.Advertising.AdSettingsControl.OBJECT_NAME)
                    }
                    else if (!this._isNullOrUndefined(window._msAdsAdSettingsControl) && window._msAdsAdSettingsControl.isInitialized === false)
                    {
                        this._logError("warning: window._msAdsAdSettingsControl already exists but is not initialized yet (are all promises complete?). Try again later or dispose and re-create.");
                        return window._msAdsAdSettingsControl
                    }
                    try
                    {
                        this._objectName = MicrosoftNSJS.Advertising.AdSettingsControl.OBJECT_NAME;
                        this._isInitialized = false;
                        window._msAdsAdSettingsControl = this;
                        this._initialize(settings);
                        MicrosoftAdvertising.Shared.WinRT.UserInfoProvider.initialize().then(function()
                        {
                            this._isInitialized = true;
                            this._addSettingsFlyout()
                        }.bind(this), function(err)
                        {
                            this._logError("could not initialize UserInfoProvider. Error:", err);
                            this._dispose()
                        }.bind(this))
                    }
                    catch(err)
                    {
                        this._dispose();
                        this._logError("could not initialize AdSettingsControl error: {0}", err)
                    }
                }
                return window._msAdsAdSettingsControl
            }
        }, {
            _flyoutHtmlTemplateURI: "", _resourceLoader: null, _userInfoProvider: null, _targetingOptInState: null, _eventHandlers: {
                    optToggle_Toggled: null, signInLink_Clicked: null, settingsFlyout_Activated: null
                }, isInitialized: {get: function()
                    {
                        return this._isInitialized
                    }}, dispose: function()
                {
                    try
                    {
                        this._dispose()
                    }
                    catch(err)
                    {
                        try
                        {
                            this._logError("Could not dispose, exception thrown [{0}].", err)
                        }
                        catch(err) {}
                    }
                }, _initialize: function(settings)
                {
                    if (!this._isNullOrUndefined(settings))
                    {
                        if (!this._isNullOrUndefined(settings.flyoutHtmlTemplateURI))
                        {
                            this._flyoutHtmlTemplateURI = settings.flyoutHtmlTemplateURI
                        }
                        if (!this._isNullOrUndefined(settings.resourceLoaderURI))
                        {
                            try
                            {
                                this._resourceLoader = Windows.ApplicationModel.Resources.ResourceLoader(settings.resourceLoaderURI)
                            }
                            catch(err)
                            {
                                this._logError("Could not initialize, error: [{0}].", err)
                            }
                        }
                    }
                    this._userInfoProvider = MicrosoftAdvertising.Shared.WinRT.UserInfoProvider;
                    this._targetingOptInState = MicrosoftAdvertising.Shared.WinRT.TargetingOptInState;
                    this._createSettingsFlyoutEvent()
                }, _addSettingsFlyout: function()
                {
                    WinJS.Application.addEventListener("settings", this._eventHandlers.settingsFlyout_Activated)
                }, _createSettingsFlyoutEvent: function()
                {
                    this._eventHandlers.settingsFlyout_Activated = function(e)
                    {
                        try
                        {
                            if (MicrosoftAdvertising.Shared.WinRT.UserInfoProvider.isUserOptOutControlVisible() === false)
                            {
                                return
                            }
                            var msaAdSettings = {
                                    name: "msaAdSettings", title: this._resourceLoader.getString("AdSettings_CommandText"), href: this._flyoutHtmlTemplateURI
                                };
                            var appSettings = Windows.UI.ApplicationSettings;
                            var command = new appSettings.SettingsCommand(msaAdSettings.name, msaAdSettings.title, function()
                                {
                                    WinJS.UI.SettingsFlyout.showSettings(msaAdSettings.name, msaAdSettings.href)
                                });
                            e.detail.e.request.applicationCommands.append(command);
                            this._wirePanelScript()
                        }
                        catch(err)
                        {
                            this._logError("could not add settings flyout html in WinJS.Application.onsettings handler")
                        }
                    }.bind(this)
                }, _wirePanelScript: function()
                {
                    this._createPageEvents();
                    var page = WinJS.UI.Pages.define(this._flyoutHtmlTemplateURI, {
                            ready: function(element, options)
                            {
                                document.getElementById("optToggle").winControl.addEventListener("change", this._eventHandlers.optToggle_Toggled);
                                document.getElementById("signInLink").addEventListener("click", this._eventHandlers.signInLink_Clicked);
                                this._updateResourceStrings();
                                this._toggleProgress(true);
                                this._userInfoProvider.getGlobalTargetingOptInStateAsync().then(function(state)
                                {
                                    this._updateUI(state)
                                }.bind(this), function(err)
                                {
                                    this._showUnknownState()
                                }.bind(this))
                            }.bind(this), unload: function()
                                {
                                    document.getElementById("optToggle").winControl.removeEventListener("change", this._eventHandlers.optToggle_Toggled);
                                    document.getElementById("signInLink").removeEventListener("click", this._eventHandlers.signInLink_Clicked)
                                }.bind(this)
                        })
                }, _createPageEvents: function()
                {
                    this._eventHandlers.optToggle_Toggled = function(eventInfo)
                    {
                        try
                        {
                            this._userInfoProvider.setLocalTargetingOptInStateAsync(eventInfo.target.winControl.checked)
                        }
                        catch(err)
                        {
                            var toggle = document.getElementById("optToggle");
                            toggle.winControl.checked = !toggle.winControl.checked
                        }
                    }.bind(this);
                    this._eventHandlers.signInLink_Clicked = function(eventInfo)
                    {
                        this._userInfoProvider.requestUserSignInAsync()
                    }.bind(this)
                }, _updateResourceStrings: function()
                {
                    this._updateElementText("mainLabel", "AdSettings_Flyout_Title", this._resourceLoader);
                    this._updateElementText("heading1Label", "AdSettings_Flyout_SectionName", this._resourceLoader);
                    this._updateElementText("signInPrompt1", "AdSettings_Flyout_SignInPrompt1", this._resourceLoader);
                    this._updateElementText("signInLink", "AdSettings_Flyout_SignInPrompt_SignIn", this._resourceLoader);
                    this._updateElementText("signInPrompt2", "AdSettings_Flyout_SignInPrompt2", this._resourceLoader);
                    this._updateElementText("optedOutPrompt1", "AdSettings_Flyout_OptedOut_Message1", this._resourceLoader);
                    this._updateElementText("optOutMoreInfoLink", "AdSettings_Flyout_OptedOut_Message_Here", this._resourceLoader);
                    this._updateElementText("optedOutPrompt2", "AdSettings_Flyout_OptedOut_Message2", this._resourceLoader);
                    this._updateElementText("statusUnknownPrompt", "AdSettings_Flyout_StatusUnknown_Message", this._resourceLoader);
                    var optToggle = document.getElementById("optToggle").winControl;
                    optToggle.title = this._resourceLoader.getString("AdSettings_Flyout_OptInSwitch_Header");
                    optToggle.labelOff = this._resourceLoader.getString("AdSettings_Flyout_OptInSwitch_Off");
                    optToggle.labelOn = this._resourceLoader.getString("AdSettings_Flyout_OptInSwitch_On");
                    this._updateElementText("privacyStatementLink", "AdSettings_Flyout_Privacy", this._resourceLoader)
                }, _updateElementText: function(elementId, resId, resource)
                {
                    try
                    {
                        document.getElementById(elementId).innerText = resource.getString(resId)
                    }
                    catch(err) {}
                }, _updateUI: function(globalOptInState)
                {
                    this._toggleProgress();
                    var toggle = document.getElementById("optToggle");
                    if (globalOptInState === this._targetingOptInState.optedIn)
                    {
                        document.getElementById("optedOutPrompt").style.display = "none";
                        document.getElementById("signInPrompt").style.display = "none";
                        document.getElementById("statusUnknownPrompt").style.display = "none";
                        this._userInfoProvider.getLocalTargetingOptInStateAsync().then(function(state)
                        {
                            if (state !== this._targetingOptInState.optedOut)
                                toggle.winControl.checked = true;
                            else
                                toggle.winControl.checked = false;
                            toggle.winControl.disabled = false;
                            toggle.style.display = "block"
                        }.bind(this))
                    }
                    else if (globalOptInState === this._targetingOptInState.userNotSignedIn)
                    {
                        document.getElementById("optedOutPrompt").style.display = "none";
                        document.getElementById("signInPrompt").style.display = "block";
                        document.getElementById("statusUnknownPrompt").style.display = "none";
                        toggle.winControl.disabled = true;
                        toggle.winControl.checked = false;
                        toggle.style.display = "block"
                    }
                    else if (globalOptInState === this._targetingOptInState.optedOut)
                    {
                        document.getElementById("optedOutPrompt").style.display = "block";
                        document.getElementById("signInPrompt").style.display = "none";
                        document.getElementById("statusUnknownPrompt").style.display = "none";
                        toggle.winControl.disabled = true;
                        toggle.winControl.checked = false;
                        toggle.style.display = "block"
                    }
                    else if (globalOptInState === this._targetingOptInState.unknown)
                    {
                        this._showUnknownState()
                    }
                    else
                    {
                        this._showUnknownState()
                    }
                }, _showUnknownState: function()
                {
                    var toggle = document.getElementById("optToggle");
                    document.getElementById("optedOutPrompt").style.display = "none";
                    document.getElementById("signInPrompt").style.display = "none";
                    document.getElementById("statusUnknownPrompt").style.display = "block";
                    toggle.winControl.disabled = true;
                    toggle.winControl.checked = false;
                    toggle.style.display = "block"
                }, _toggleProgress: function(show)
                {
                    if (show)
                        document.getElementById("progressRing").style.display = "block";
                    else
                        document.getElementById("progressRing").style.display = "none"
                }, _dispose: function()
                {
                    WinJS.Application.removeEventListener("settings", this._eventHandlers.settingsFlyout_Activated);
                    this._isInitialized = false;
                    window._msAdsAdSettingsControl = null
                }, _isNullOrUndefined: function(object)
                {
                    if (typeof(object) === "undefined" || object === null)
                    {
                        return true
                    }
                    return false
                }, _logError: function(message, err){}
        }, {OBJECT_NAME: "MicrosoftNSJS.Advertising.AdSettingsControl"});
    WinJS.Namespace.define("MicrosoftNSJS.Advertising", {AdSettingsControl: AdSettingsControl})
})(WinJS);
/*!
  Copyright (C) Microsoft. All rights reserved.
  This library is supported for use in Windows Store apps only.
*/
(function(WinJS)
{
    "use strict";
    var AdContainer = WinJS.Class.define(function(type)
        {
            if (!type || !MicrosoftNSJS.Advertising.AdContainer.TYPE[type.toUpperCase()])
            {
                this._log("Incorrect container type specified.", {fnName: "AdContainer()"});
                this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.ERROR
            }
            else
            {
                this._type = type;
                this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.INITIALIZED
            }
        }, {
            onAdMessageReceived: null, onAdContainerLoaded: null, onExpandedClosed: null, mraidState: {
                    get: function()
                    {
                        return this._mraidState
                    }, set: function(value)
                        {
                            if (value && this._mraidState !== value)
                            {
                                this._mraidState = value;
                                if (this.type === MicrosoftNSJS.Advertising.AdContainer.TYPE.POLYMORPHIC)
                                {
                                    this.postMessage({
                                        msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETSTATE + ":" + value, all: true
                                    })
                                }
                                else
                                {
                                    this.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETSTATE + ":" + value})
                                }
                            }
                        }
                }, state: {get: function()
                    {
                        return this._state
                    }}, screenSize: {
                    get: function()
                    {
                        return this._screenSize
                    }, set: function(value)
                        {
                            if (value)
                            {
                                if (value.height < 0)
                                {
                                    value.height = 0
                                }
                                if (value.width < 0)
                                {
                                    value.width = 0
                                }
                                if (value.forceUpdate || this._screenSize.width !== value.width || this._screenSize.height !== value.height)
                                {
                                    this._screenSize = {
                                        height: value.height, width: value.width
                                    };
                                    this.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETSCREENSIZE + ":" + JSON.stringify(this._screenSize)})
                                }
                            }
                        }
                }, size: {
                    get: function()
                    {
                        return this._size
                    }, set: function(value)
                        {
                            if (value)
                            {
                                if (value.height < 1)
                                {
                                    value.height = 1
                                }
                                if (value.width < 1)
                                {
                                    value.width = 1
                                }
                                if (value.forceUpdate || this._size.width !== value.width || this._size.height !== value.height)
                                {
                                    this._size = {
                                        width: value.width, height: value.height
                                    };
                                    if (!this._expandedContainer_DOM)
                                    {
                                        this._viewContainer_DOM.width = this._size.width;
                                        this._viewContainer_DOM.height = this._size.height
                                    }
                                    this.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETSIZE + ":" + JSON.stringify(this._size)})
                                }
                            }
                        }
                }, maxSize: {
                    get: function()
                    {
                        return this._maxSize
                    }, set: function(value)
                        {
                            if (value)
                            {
                                if (value.height < 1)
                                {
                                    value.height = 1
                                }
                                if (value.width < 1)
                                {
                                    value.width = 1
                                }
                                if (value.forceUpdate || this._maxSize.width !== value.width || this._maxSize.height !== value.height)
                                {
                                    this._maxSize = {
                                        height: value.height, width: value.width
                                    };
                                    this.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETMAXSIZE + ":" + JSON.stringify(this._maxSize)})
                                }
                            }
                        }
                }, originalProperties: {get: function()
                    {
                        return this._originalProperties
                    }}, expandProperties: {
                    set: function(value)
                    {
                        if (value)
                        {
                            if (value.height < 1)
                            {
                                value.height = 1
                            }
                            if (value.width < 1)
                            {
                                value.width = 1
                            }
                            if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.EXPANDED && this._expandedContainer_DOM)
                            {
                                this._expandedContainer_DOM.width = value.width;
                                this._expandedContainer_DOM.height = value.height;
                                this._expandedContainer_DOM.style.top = value.y + "px";
                                this._expandedContainer_DOM.style.left = value.x + "px"
                            }
                            else if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.EXPANDED && this._viewContainer_DOM)
                            {
                                this._viewContainer_DOM.width = value.width;
                                this._viewContainer_DOM.height = value.height;
                                this._parentElement_DOM.style.width = value.width + "px";
                                this._parentElement_DOM.style.height = value.height + "px";
                                this._parentElement_DOM.style.top = value.y + "px";
                                this._parentElement_DOM.style.left = value.x + "px"
                            }
                            this._expandProperties = value
                        }
                    }, get: function()
                        {
                            return this._expandProperties
                        }
                }, parentElement: {get: function()
                    {
                        return this._parentElement_DOM
                    }}, type: {get: function()
                    {
                        return this._type
                    }}, _viewContainer_DOM: null, _expandedContainer_DOM: null, _overlayDiv_DOM: null, _parentElement_DOM: null, _id: null, _mraidState: null, _type: null, _state: null, _size: {
                    width: 0, height: 0
                }, _maxSize: {
                    width: 0, height: 0
                }, _screenSize: {
                    width: 0, height: 0
                }, _expandProperties: null, _originalProperties: null, create: function(options)
                {
                    if (this._state !== MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.INITIALIZED)
                    {
                        this._log("Ad container is not in correct state, expected=initialized, actual=" + this._state + ".", {fnName: "create"});
                        return
                    }
                    if (!options || typeof(options) !== "object")
                    {
                        this._log("Options parameter is empty.", {fnName: "create"});
                        return
                    }
                    try
                    {
                        this._parentElement_DOM = options.parentElement;
                        var viewContainer = document.createElement("x-ms-webview");
                        viewContainer.id = options.containerId;
                        viewContainer.frameBorder = 0;
                        viewContainer.marginwidth = 0;
                        viewContainer.marginheight = 0;
                        viewContainer.style.position = "absolute";
                        viewContainer.style.visibility = "hidden";
                        viewContainer.style.backgroundColor = "transparent";
                        viewContainer.style.opacity = 0;
                        viewContainer.title = MicrosoftNSJS.Advertising.AdContainer.STRINGS.WEBVIEW_TITLE;
                        viewContainer.addEventListener("MSWebViewScriptNotify", function(args)
                        {
                            this._viewScriptNotify_Handler(args)
                        }.bind(this));
                        viewContainer.addEventListener("MSWebViewNavigationStarting", function(args)
                        {
                            this._viewContainerNavigationStarting_Handler(args)
                        }.bind(this));
                        viewContainer.addEventListener("MSWebViewNavigationCompleted", function(args)
                        {
                            this._viewNavigationCompleted_Handler(args)
                        }.bind(this));
                        viewContainer.addEventListener("MSWebViewFrameNavigationCompleted", function(args)
                        {
                            this._viewNavigationCompleted_Handler(args)
                        }.bind(this));
                        if (options.sourceUri)
                        {
                            this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.LOADING;
                            viewContainer.navigate(options.sourceUri)
                        }
                        else if (options.sourceHTML)
                        {
                            this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.LOADING;
                            viewContainer.navigateToString(options.sourceHTML)
                        }
                        else
                        {
                            this._log("Either sourceUri or sourceHTML must be specified.", {fnName: "create"});
                            this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.ERROR;
                            return
                        }
                        this.mraidState = MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.LOADING;
                        this._originalProperties = {
                            width: this._parentElement_DOM.offsetWidth, height: this._parentElement_DOM.offsetHeight, y: this._parentElement_DOM.style.top, x: this._parentElement_DOM.style.left, zIndex: this._parentElement_DOM.style.zIndex, position: this._parentElement_DOM.style.position
                        };
                        this._parentElement_DOM.appendChild(viewContainer);
                        this._log("x-ms-webview created and added to DOM.", {fnName: "create"});
                        this._id = options.containerId;
                        this._viewContainer_DOM = viewContainer
                    }
                    catch(err)
                    {
                        this._log("Unable to create view container. Error:{0}", {
                            fnName: "create", err: err
                        })
                    }
                }, remove: function()
                {
                    try
                    {
                        if (this._viewContainer_DOM && this._parentElement_DOM)
                        {
                            this._parentElement_DOM.removeChild(this._viewContainer_DOM)
                        }
                        if (this._expandedContainer_DOM)
                        {
                            document.body.removeChild(this._expandedContainer_DOM)
                        }
                        if (this._overlayDiv_DOM)
                        {
                            document.body.removeChild(this._overlayDiv_DOM)
                        }
                    }
                    catch(err)
                    {
                        this._log("Unable to remove view container. Error:{0}", {
                            fnName: "remove", err: err
                        });
                        this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.ERROR;
                        return
                    }
                    this._log("Ad container elements removed from DOM.", {fnName: "remove"});
                    this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.REMOVED
                }, dispose: function()
                {
                    if (this._state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DISPOSED)
                    {
                        this._log("Ad container already disposed.", {fnName: "dispose"});
                        return
                    }
                    if (this._state !== MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.REMOVED)
                    {
                        this.remove()
                    }
                    this._viewContainer_DOM = null;
                    this._expandedContainer_DOM = null;
                    this._parentElement_DOM = null;
                    this._id = null;
                    this._mraidState = null;
                    this._originalProperties = null;
                    this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DISPOSED;
                    this._log("Ad container disposed.", {fnName: "dispose"})
                }, suspend: function()
                {
                    if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.SUSPENDED)
                    {
                        this._log("Cannot suspend. Ad container already suspended.", {fnName: "suspend"});
                        return
                    }
                    if (this.type === MicrosoftNSJS.Advertising.AdContainer.TYPE.POLYMORPHIC)
                    {
                        this.postMessage({
                            msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETSTATE + ":" + MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.SUSPENDED, all: true
                        })
                    }
                    this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.SUSPENDED
                }, resume: function()
                {
                    if (this.state !== MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.SUSPENDED)
                    {
                        this._log("Cannot resume. Ad container not currently suspended.", {fnName: "resume"});
                        return
                    }
                    if (this.type === MicrosoftNSJS.Advertising.AdContainer.TYPE.POLYMORPHIC)
                    {
                        this.postMessage({
                            msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETSTATE + ":" + this.mraidState, all: true
                        })
                    }
                    this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DEFAULT
                }, show: function()
                {
                    if (this._state !== MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DEFAULT)
                    {
                        this._log("Unable to show container in current state. State: ." + this.state, {fnName: "show"});
                        return
                    }
                    this._viewContainer_DOM.style.opacity = 1;
                    this._viewContainer_DOM.style.visibility = "inherit";
                    this._log("View container set to visible.", {fnName: "show"})
                }, fadeIn: function(fadeOptions, callback)
                {
                    if (this._state !== MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DEFAULT)
                    {
                        this._log("Unable to fade in container in current state. State: ." + this._state, {fnName: "fadeIn"});
                        return
                    }
                    try
                    {
                        if (this._viewContainer_DOM)
                        {
                            this._viewContainer_DOM.style.visibility = "inherit";
                            this._viewContainer_DOM.style.transition = "opacity " + fadeOptions.fadeInTimeS + "s" + fadeOptions.timer.linear;
                            this._viewContainer_DOM.style.opacity = 1;
                            if (typeof(callback) === "function")
                            {
                                window.setTimeout(function()
                                {
                                    callback(true)
                                }, fadeOptions.fadeInTimeS * 1000)
                            }
                        }
                        else if (typeof(callback) === "function")
                        {
                            callback(false)
                        }
                    }
                    catch(err)
                    {
                        this._log("Unable to fade in. Error:{0}", {
                            fnName: "fadeIn", err: err
                        })
                    }
                }, postMessage: function(options)
                {
                    if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DISPOSED)
                    {
                        return
                    }
                    if (!options || typeof(options) !== "object")
                    {
                        this._log("Options parameter is empty.", {fnName: "postMessage"});
                        return
                    }
                    if (!options.msg || options.msg === "")
                    {
                        this._log("Options.msg parameter is empty. Nothing to send", {fnName: "postMessage"});
                        return
                    }
                    if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.LOADING || this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.EXPANDING)
                    {
                        this._log("Cannot post message. Control is in " + this.state + " state. msg=" + options.msg, {fnName: "postMessage"});
                        return
                    }
                    var receiveFunctionName = options.receiveFunctionName || "receiveMessage",
                        op,
                        target = "anchor";
                    if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.EXPANDED && this._expandedContainer_DOM)
                    {
                        target = "expanded"
                    }
                    try
                    {
                        if (target === "anchor" || options.all)
                        {
                            if (this._viewContainer_DOM)
                            {
                                op = this._viewContainer_DOM.invokeScriptAsync(receiveFunctionName, options.msg);
                                op.oncomplete = function(e)
                                {
                                    this._log("InvokeScriptAsync mainContainer SUCCESS msg=" + options.msg + "", {fnName: "postMessage"})
                                }.bind(this);
                                op.onerror = function(e)
                                {
                                    this._log("InvokeScriptAsync mainContainer ERROR msg=" + options.msg + "", {fnName: "postMessage"})
                                }.bind(this);
                                op.start()
                            }
                        }
                        if (target === "expanded" || options.all)
                        {
                            if (this._expandedContainer_DOM)
                            {
                                op = this._expandedContainer_DOM.invokeScriptAsync(receiveFunctionName, options.msg);
                                op.oncomplete = function(e)
                                {
                                    this._log("InvokeScriptAsync expandedContainer SUCCESS msg=" + options.msg + "", {fnName: "postMessage"})
                                }.bind(this);
                                op.onerror = function(e)
                                {
                                    this._log("InvokeScriptAsync expandedContainer ERROR msg=" + options.msg + "", {fnName: "postMessage"})
                                }.bind(this);
                                op.start()
                            }
                        }
                    }
                    catch(err)
                    {
                        this._log("InvokeScriptAsync Error:{0}", {
                            fnName: "postMessage", err: err
                        })
                    }
                }, isViewable: function()
                {
                    if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DISPOSED)
                    {
                        return
                    }
                    var opacity;
                    try
                    {
                        if (!this._viewContainer_DOM || !this._viewContainer_DOM.currentStyle)
                        {
                            return false
                        }
                        opacity = parseInt(this._viewContainer_DOM.currentStyle.opacity, 10);
                        if (isNaN(opacity))
                        {
                            opacity = 0
                        }
                        return (this.isOnScreen() && opacity === 1)
                    }
                    catch(err)
                    {
                        this._log("Could not determine if ad container is viewable. Error thrown [{0}]", {
                            fnName: "isViewable", err: err
                        });
                        return false
                    }
                }, isOnScreen: function()
                {
                    if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DISPOSED)
                    {
                        return
                    }
                    if (this._parentElement_DOM === null || this._parentElement_DOM.offsetWidth === 0 || this._parentElement_DOM.offsetHeight === 0 || this.isHidden() || this._viewContainer_DOM.offsetWidth === 0 || this._viewContainer_DOM.offsetHeight === 0)
                    {
                        return false
                    }
                    var adRect = {};
                    try
                    {
                        adRect = this._parentElement_DOM.getBoundingClientRect()
                    }
                    catch(err)
                    {
                        this._log("getBoundingClientRect error thrown. [{0}]", {
                            fnName: "isOnScreen", err: err
                        });
                        return false
                    }
                    var xAllowedOff = this._parentElement_DOM.offsetWidth * MicrosoftNSJS.Advertising.AdContainer.FREACTION_ALLOWED_OFFSCREEN;
                    var yAllowedOff = this._parentElement_DOM.offsetHeight * MicrosoftNSJS.Advertising.AdContainer.FREACTION_ALLOWED_OFFSCREEN;
                    return (adRect.left >= -xAllowedOff) && (adRect.top >= -yAllowedOff) && (adRect.right < document.documentElement.offsetWidth + xAllowedOff) && (adRect.bottom < document.documentElement.offsetHeight + yAllowedOff)
                }, isHidden: function()
                {
                    if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DISPOSED)
                    {
                        return
                    }
                    var tempElem = this._viewContainer_DOM;
                    while (tempElem !== null && typeof(tempElem) === "object" && tempElem.nodeName !== 'BODY')
                    {
                        var vis = typeof(tempElem.style) != "undefined" ? tempElem.style.visibility : "";
                        if (vis === "hidden" || vis === "collapse")
                        {
                            return true
                        }
                        else if (vis === 'visible')
                        {
                            break
                        }
                        else
                        {
                            tempElem = tempElem.parentNode
                        }
                    }
                    return false
                }, close: function()
                {
                    if (this.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.HIDDEN)
                    {
                        return
                    }
                    else if (this.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.EXPANDED)
                    {
                        if (this._expandedContainer_DOM)
                        {
                            document.body.removeChild(this._expandedContainer_DOM);
                            this._expandedContainer_DOM = null
                        }
                        else
                        {
                            this.size = {
                                width: this._originalProperties.width, height: this._originalProperties.height
                            };
                            this._parentElement_DOM.style.top = this._originalProperties.y;
                            this._parentElement_DOM.style.left = this._originalProperties.x;
                            this._parentElement_DOM.style.width = this._originalProperties.width + "px";
                            this._parentElement_DOM.style.height = this._originalProperties.height + "px";
                            this._parentElement_DOM.style.zIndex = this._originalProperties.zIndex;
                            this._parentElement_DOM.style.position = this._originalProperties.position
                        }
                        if (this._overlayDiv_DOM)
                        {
                            document.body.removeChild(this._overlayDiv_DOM);
                            this._overlayDiv_DOM = null
                        }
                        this.mraidState = MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.DEFAULT;
                        this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DEFAULT
                    }
                    else if (this.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.DEFAULT)
                    {
                        this._viewContainer_DOM.style.visibility = "hidden";
                        this.mraidState = MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.HIDDEN
                    }
                    else if (this.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.RESIZED)
                    {
                        this.size = {
                            width: this.originalProperties.width, height: this.originalProperties.height
                        };
                        this.mraidState = MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.DEFAULT
                    }
                }, initializeOrmma: function(options)
                {
                    if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DISPOSED)
                    {
                        return
                    }
                    var locale = "undefined",
                        isAccelerometerPresent = false;
                    if (!options || typeof(options) !== "object" || typeof(options.sdkInfo) !== "object")
                    {
                        this._log("Unable to initialize ormma, missing options arguments.", {fnName: "initializeOrmma"})
                    }
                    try
                    {
                        locale = Windows.Globalization.ApplicationLanguages.languages[0]
                    }
                    catch(error)
                    {
                        this._log("Unable to init locale. Error={0}", {
                            err: error, fnName: "initializeOrmma"
                        })
                    }
                    this.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETLOCALE + ":" + locale});
                    this.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETNETWORK + ":" + options.networkState});
                    this.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETSDKINFO + ":" + JSON.stringify(options.sdkInfo)});
                    try
                    {
                        isAccelerometerPresent = Windows.Devices.Sensors.Accelerometer.getDefault() !== null
                    }
                    catch(err)
                    {
                        this._log("Could not detect accelerometer. Error={0}", {
                            err: err, fnName: "initializeOrmma"
                        })
                    }
                    this.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETCAPABILITY + ":" + JSON.stringify({
                            capability: "tilt", value: isAccelerometerPresent
                        })});
                    this.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETCAPABILITY + ":" + JSON.stringify({
                            capability: "shake", value: isAccelerometerPresent
                        })})
                }, expand: function(url, options)
                {
                    if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DISPOSED)
                    {
                        return
                    }
                    if (this.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.HIDDEN)
                    {
                        return
                    }
                    if (this.mraidState === MicrosoftNSJS.Advertising.AdContainer.MRAID_STATE_TYPE.EXPANDED)
                    {
                        this._log("Unable to expand, already in expanded state.", {fnName: "expand"});
                        return
                    }
                    if (!options)
                    {
                        this._log("Unable to expand, options parameter is empty.", {fnName: "expand"});
                        return
                    }
                    if (this.type === MicrosoftNSJS.Advertising.AdContainer.TYPE.POLYMORPHIC)
                    {
                        this._expandPolymorphic(url, options)
                    }
                    else if (this.type === MicrosoftNSJS.Advertising.AdContainer.TYPE.MRAID)
                    {
                        this._expandMraid(options)
                    }
                }, _expandPolymorphic: function(url, options)
                {
                    try
                    {
                        this._overlayDiv_DOM = this._createOverlayDiv();
                        this._expandedContainer_DOM = this._createExpandedContainer();
                        if (url && url.length != 0)
                        {
                            this._expandedContainer_DOM.addEventListener("MSWebViewNavigationCompleted", function(args)
                            {
                                this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.EXPANDED
                            }.bind(this));
                            this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.EXPANDING;
                            this._expandedContainer_DOM.navigate(url)
                        }
                        else
                        {
                            this._expandedContainer_DOM.addEventListener("MSWebViewNavigationCompleted", function(args)
                            {
                                this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.EXPANDED;
                                if (typeof(options.onAdContainerLoaded) === "function")
                                {
                                    options.onAdContainerLoaded(args)
                                }
                            }.bind(this));
                            this._expandedContainer_DOM.addEventListener("MSWebViewScriptNotify", function(args)
                            {
                                this._viewScriptNotify_Handler(args)
                            }.bind(this));
                            this._expandedContainer_DOM.addEventListener("MSWebViewNavigationStarting", function(args)
                            {
                                this._viewContainerNavigationStarting_Handler(args)
                            }.bind(this));
                            this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.EXPANDING;
                            this._expandedContainer_DOM.navigate(options.sourceUri)
                        }
                        document.body.appendChild(this._overlayDiv_DOM);
                        document.body.appendChild(this._expandedContainer_DOM)
                    }
                    catch(error)
                    {
                        this._log("Unable to expand. Error thrown [{0}]", {
                            fnName: "_expandPolymorphic", err: error
                        })
                    }
                }, _expandMraid: function(options)
                {
                    try
                    {
                        this._overlayDiv_DOM = this._createOverlayDiv();
                        if (options.sourceHTML && options.sourceHTML.length > 0)
                        {
                            this._expandedContainer_DOM = this._createExpandedContainer();
                            this._expandedContainer_DOM.addEventListener("MSWebViewNavigationCompleted", function(args)
                            {
                                this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.EXPANDED;
                                if (typeof(options.onAdContainerLoaded) === "function")
                                {
                                    options.onAdContainerLoaded()
                                }
                            }.bind(this));
                            this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.EXPANDING;
                            this._expandedContainer_DOM.navigateToString(options.sourceHTML);
                            document.body.appendChild(this._expandedContainer_DOM)
                        }
                        else
                        {
                            this._parentElement_DOM.style.position = "absolute";
                            this._parentElement_DOM.style.width = this._expandProperties.width + "px";
                            this._parentElement_DOM.style.height = this._expandProperties.height + "px";
                            this._parentElement_DOM.style.top = this._expandProperties.y + "px";
                            this._parentElement_DOM.style.left = this._expandProperties.x + "px";
                            this._parentElement_DOM.style.zIndex = MicrosoftNSJS.Advertising.AdContainer.EXPANDED_AD_ZINDEX;
                            this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.EXPANDED;
                            if (typeof(options.onAdContainerLoaded) === "function")
                            {
                                options.onAdContainerLoaded()
                            }
                        }
                        document.body.appendChild(this._overlayDiv_DOM)
                    }
                    catch(error)
                    {
                        this._log("Unable to expand. Error thrown [{0}]", {
                            fnName: "_expandPolymorphic", err: error
                        })
                    }
                }, _createExpandedContainer: function()
                {
                    var expandedContainer = document.createElement("x-ms-webview");
                    expandedContainer.id = this._id + "_expandedContainer";
                    expandedContainer.style.top = this._expandProperties.y + "px";
                    expandedContainer.style.left = this._expandProperties.x + "px";
                    expandedContainer.style.zIndex = MicrosoftNSJS.Advertising.AdContainer.EXPANDED_AD_ZINDEX;
                    expandedContainer.style.position = "absolute";
                    expandedContainer.width = this._expandProperties.width;
                    expandedContainer.height = this._expandProperties.height;
                    expandedContainer.marginwidth = 0;
                    expandedContainer.marginheight = 0;
                    expandedContainer.frameBorder = 0;
                    expandedContainer.title = MicrosoftNSJS.Advertising.AdContainer.STRINGS.WEBVIEW_TITLE;
                    expandedContainer.onblur = function(evt)
                    {
                        try
                        {
                            evt.currentTarget.focus()
                        }
                        catch(err) {}
                    };
                    expandedContainer.addEventListener("focus", function()
                    {
                        this.postMessage({msg: MicrosoftNSJS.Advertising.AdContainer.MSG_TYPE_SETFOCUS + ":true"})
                    }.bind(this));
                    return expandedContainer
                }, _createOverlayDiv: function()
                {
                    var overlayDiv = document.createElement("div");
                    overlayDiv.style.zIndex = MicrosoftNSJS.Advertising.AdContainer.EXPANDED_AD_ZINDEX - 1;
                    overlayDiv.style.position = "absolute";
                    overlayDiv.style.top = "0px";
                    overlayDiv.style.left = "0px";
                    overlayDiv.style.width = "100%";
                    overlayDiv.style.height = "100%";
                    overlayDiv.id = this._id + "_overlayDiv";
                    overlayDiv.style.backgroundColor = "#000000";
                    overlayDiv.style.opacity = 0.8;
                    overlayDiv.onclick = function(args)
                    {
                        if (this._expandProperties && !this._expandProperties.useCustomClose && typeof(this.onExpandedClosed) === "function")
                        {
                            this.onExpandedClosed()
                        }
                    }.bind(this);
                    return overlayDiv
                }, _viewScriptNotify_Handler: function(args)
                {
                    if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DISPOSED)
                    {
                        return
                    }
                    this._log("Message received from ad container. Message:'" + args.value + "'", {fnName: "_viewScriptNotify_Handler"});
                    if (typeof(this.onAdMessageReceived) === "function")
                    {
                        this.onAdMessageReceived({
                            containerId: this._id, data: args.value, timeStamp: args.timeStamp
                        })
                    }
                }, _viewNavigationCompleted_Handler: function(args)
                {
                    if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DISPOSED)
                    {
                        return
                    }
                    if (this._state !== MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.LOADING)
                    {
                        this._log("View container navigation occured in incorrect state. Expected: " + MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.LOADING + ", Actual: " + this._state + ".", {fnName: "_viewNavigationCompleted_Handler"});
                        return
                    }
                    this._state = MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DEFAULT;
                    this._log("View container navigation complete.", {fnName: "_viewNavigationCompleted_Handler"});
                    if (typeof(this.onAdContainerLoaded) === "function")
                    {
                        this.onAdContainerLoaded({
                            containerId: this._id, timeStamp: args.timeStamp, element: this
                        })
                    }
                }, _viewContainerNavigationStarting_Handler: function(args)
                {
                    if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.DISPOSED)
                    {
                        return
                    }
                    var uri;
                    if (this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.LOADING || this.state === MicrosoftNSJS.Advertising.AdContainer.STATE_TYPE.EXPANDING || !args)
                    {
                        return
                    }
                    try
                    {
                        args.preventDefault();
                        this._log("View container navigation stopped.", {fnName: "_viewContainerNavigationStarting_Handler"});
                        uri = new Windows.Foundation.Uri(args.uri);
                        if (MicrosoftNSJS.Advertising.AdContainer.ALLOWED_URI_SCHEMES[uri.schemeName.toLowerCase()])
                        {
                            Windows.System.Launcher.launchUriAsync(uri);
                            this._log("View container navigation redirected. Uri:'" + args.uri + "'", {fnName: "_viewContainerNavigationStarting_Handler"})
                        }
                        else
                        {
                            throw"URI Scheme not allowed.";
                        }
                    }
                    catch(error)
                    {
                        this._log("View container navigation handler error. Error: {0}", {
                            err: error, fnName: "_viewContainerNavigationStarting_Handler"
                        })
                    }
                }, _log: function(msg, args){}
        }, {
            OBJECT_NAME: "MicrosoftNSJS.Advertising.AdContainer", FREACTION_ALLOWED_OFFSCREEN: 0.4, TYPE: {
                    MRAID: "MRAID", POLYMORPHIC: "POLYMORPHIC"
                }, STRINGS: {WEBVIEW_TITLE: "Advertisement"}, MRAID_STATE_TYPE: {
                    LOADING: "loading", DEFAULT: "default", EXPANDED: "expanded", HIDDEN: "hidden", RESIZED: "resized"
                }, STATE_TYPE: {
                    ERROR: "error", INITIALIZED: "initialized", LOADING: "loading", DEFAULT: "default", EXPANDING: "expanding", EXPANDED: "expanded", REMOVED: "removed", DISPOSED: "disposed", SUSPENDED: "suspended"
                }, EXPANDED_AD_ZINDEX: 2147483647 - 10, ALLOWED_URI_SCHEMES: {
                    http: "http", https: "https", "ms-windows-store": "ms-windows-store", skype: "skype", microsoftmusic: "microsoftmusic", xboxsmartglass: "xboxsmartglass", xboxgames: "xboxgames", microsoftvideo: "microsoftvideo", bingtravel: "bingtravel", bingweather: "bingweather", bingmaps: "bingmaps", bingfinance: "bingfinance", bingsports: "bingsports", bingfoodanddrink: "bingfoodanddrink", binghealthnfitness: "binghealthnfitness", bingnews: "bingnews"
                }, MSG_TYPE_ADPARAMS: "adParams", MSG_TYPE_PRMPARAMS: "prmParams", MSG_TYPE_APPPARAMS: "appParams", MSG_TYPE_INIT: "init", MSG_TYPE_ORMMA_START: "ormmaStart", MSG_TYPE_SCRIPT: "script", MSG_TYPE_SETMAXSIZE: "setMaxSize", MSG_TYPE_SETSCREENSIZE: "setScreenSize", MSG_TYPE_SETSIZE: "setSize", MSG_TYPE_SETSTATE: "setState", MSG_TYPE_FIRESHAKE: "fireShake", MSG_TYPE_UPDATETILTCOORDS: "updateTiltCoords", MSG_TYPE_UPDATEORIENTATION: "updateOrienation", MSG_TYPE_SETNETWORK: "setNetwork", MSG_TYPE_VIEWABLECHANGE: "viewableChange", MSG_TYPE_SETLOCALE: "setLocale", MSG_TYPE_SETSDKINFO: "setSdkInfo", MSG_TYPE_SETCAPABILITY: "setCapability", MSG_TYPE_SETADINSTANCESTATE: "setAdInstanceState", MSG_TYPE_WIREAPPEVENTS: "wireAppEvents", MSG_TYPE_SETFOCUS: "setFocus", MSG_TYPE_INITIALIZED: "adInitialized", MSG_TYPE_ADRENDERED: "rendered", MSG_TYPE_OPEN: "web", MSG_TYPE_EXPAND: "expand", MSG_TYPE_CLOSE: "close", MSG_TYPE_RESIZE: "resize", MSG_TYPE_HIDE: "hide", MSG_TYPE_SHOW: "show", MSG_TYPE_SETEXPANDPROPERTIES: "setexpandproperties", MSG_TYPE_SETUSERENGAGED: "setuserengaged", MSG_TYPE_TILT: "tilt", MSG_TYPE_SHAKE: "shake", MSG_TYPE_LISTENER: "listener", MSG_TYPE_VALUESTART: "start", MSG_TYPE_VALUESTOP: "stop", MSG_TYPE_GETTILT: "gettilt", MSG_TYPE_GETORIENTATION: "getorientation", MSG_TYPE_REFRESH: "refresh", MSG_TYPE_REQUEST: "request", MSG_TYPE_STOREADINSTANCESTATE: "storeadinstancestate", MSG_TYPE_ONPOINTERDOWN: "MSPointerDown", MSG_TYPE_ONPOINTERUP: "MSPointerUp", MSG_TYPE_USECUSTOMCLOSE: "usecustomclose", MSG_TYPE_ONMOUSEWHEEL: "MSMouseWheel", MSG_TYPE_ONPOINTERMOVE: "MSPointerMove", MSG_TYPE_ONMANIPSTATECHANGED: "MSManipulationStateChanged", MSG_TYPE_ERROR: "error"
        });
    WinJS.Namespace.define("MicrosoftNSJS.Advertising", {AdContainer: AdContainer})
})(WinJS);
/*!
  Copyright (C) Microsoft. All rights reserved.
  This library is supported for use in Windows Store apps only.
*/
(function(WinJS)
{
    "use strict";
    var AdGlobalEventManager = WinJS.Class.define(function()
        {
            if (!this._isNullOrUndefined(window))
            {
                if (this._isNullOrUndefined(window._msAdsGlobalEventManager) || window._msAdsGlobalEventManager.isInitialized !== true)
                {
                    if (!this._isNullOrUndefined(window._msAdsGlobalEventManager) && window._msAdsGlobalEventManager._objectName !== MicrosoftNSJS.Advertising.AdGlobalEventManager.OBJECT_NAME)
                    {
                        this._logError("window._msAdsGlobalEventManager already exists but is not of correct object type [{0}]. Overwriting.", MicrosoftNSJS.Advertising.AdGlobalEventManager.OBJECT_NAME)
                    }
                    this._objectName = MicrosoftNSJS.Advertising.AdGlobalEventManager.OBJECT_NAME;
                    this._isInitialized = true;
                    window._msAdsGlobalEventManager = this
                }
                return window._msAdsGlobalEventManager
            }
        }, {
            isInitialized: {get: function()
                {
                    return this._isInitialized
                }}, _eventListeners: null, _isInitialized: false, addEventListener: function(eventType, listener)
                {
                    if (this._isNullOrUndefined(eventType) || this._isNullOrUndefined(listener))
                    {
                        this._logError("Could not add listener, eventType or listener null or undefined");
                        return
                    }
                    try
                    {
                        this._initializeEventListenersContainer(eventType);
                        this._eventListeners[eventType].push(listener);
                        return listener
                    }
                    catch(err)
                    {
                        this._logError("Could not add listener type '" + eventType + "', exception was thrown [{0}]", err);
                        return null
                    }
                }, removeEventListener: function(eventType, listener)
                {
                    if (this._isNullOrUndefined(eventType) || this._isNullOrUndefined(listener))
                    {
                        this._logError("Could not remove listener, eventType or listener null or undefined.");
                        return
                    }
                    if (!this._eventArrayExists(eventType))
                    {
                        this._logError("Could not remove listener, no listener found for eventType: " + eventType);
                        return null
                    }
                    else
                    {
                        try
                        {
                            var listeners = this._eventListeners[eventType];
                            for (var i = 0; i < listeners.length; i++)
                            {
                                if (listeners[i] === listener)
                                {
                                    var l = listeners.splice(i, 1);
                                    return l[0]
                                }
                            }
                        }
                        catch(err)
                        {
                            this._logError("Could not remove listener, exception was thrown [{0}]", err);
                            return null
                        }
                    }
                }, broadcastEvent: function(eventType, args)
                {
                    if (this._isNullOrUndefined(eventType))
                    {
                        this._logError("Could not broadcast event, eventType null or undefined");
                        return
                    }
                    if (!this._eventArrayExists(eventType))
                    {
                        return
                    }
                    else
                    {
                        var listeners = this._eventListeners[eventType];
                        for (var i = 0; i < listeners.length; i++)
                        {
                            if (!this._isNullOrUndefined(listeners[i]))
                            {
                                listeners[i](args)
                            }
                        }
                    }
                }, dispose: function(force)
                {
                    try
                    {
                        if (force === true)
                        {
                            this._dispose();
                            return
                        }
                        var eventsLeft = false;
                        for (var i in MicrosoftNSJS.Advertising.AdGlobalEventManager.EVENT_TYPE)
                        {
                            if (this._eventArrayExists(MicrosoftNSJS.Advertising.AdGlobalEventManager.EVENT_TYPE[i]) && this._eventListeners[MicrosoftNSJS.Advertising.AdGlobalEventManager.EVENT_TYPE[i]].length > 0)
                            {
                                eventsLeft = true;
                                break
                            }
                        }
                        if (eventsLeft === false)
                        {
                            this._dispose()
                        }
                        else
                        {
                            this._logError("Could not dispose, events collection is not empty.")
                        }
                    }
                    catch(err)
                    {
                        try
                        {
                            this._logError("Could not dispose, exception thrown [{0}].", err)
                        }
                        catch(err) {}
                    }
                }, _dispose: function()
                {
                    this._eventListeners = null;
                    this._isInitialized = false;
                    window._msAdsGlobalEventManager = null
                }, _initializeEventListenersContainer: function(eventType)
                {
                    if (this._eventListeners === null)
                    {
                        this._eventListeners = {};
                        this._eventListeners[eventType] = []
                    }
                    else if (this._isNullOrUndefined(this._eventListeners[eventType]))
                    {
                        this._eventListeners[eventType] = []
                    }
                }, _eventArrayExists: function(eventType)
                {
                    if (this._eventListeners === null || this._eventListeners[eventType] === null || typeof(this._eventListeners[eventType]) === "undefined")
                    {
                        return false
                    }
                    return true
                }, _isNullOrUndefined: function(object)
                {
                    if (typeof(object) === "undefined" || object === null)
                    {
                        return true
                    }
                    return false
                }, _logError: function(message, err){}
        }, {
            OBJECT_NAME: "MicrosoftNSJS.Advertising.AdGlobalEventManager", EVENT_TYPE: {
                    AD_ENGAGED: "msAdEngaged", AD_DISENGAGED: "msAdDisengaged"
                }
        });
    WinJS.Namespace.define("MicrosoftNSJS.Advertising", {AdGlobalEventManager: AdGlobalEventManager})
})(WinJS);
// SIG // Begin signature block
// SIG // MIIamQYJKoZIhvcNAQcCoIIaijCCGoYCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFJCFrT0TuQib
// SIG // jxU9q631DSR4ZaEPoIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AAAz5SeGow5KKoAAAAAAADMwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTEzMDMyNzIw
// SIG // MDgyM1oXDTE0MDYyNzIwMDgyM1owgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpGNTI4LTM3NzctOEE3NjEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAMreyhkPH5ZWgl/YQjLUCG22ncDC7Xw4q1gzrWuB
// SIG // ULiIIQpdr5ctkFrHwy6yTNRjdFj938WJVNALzP2chBF5
// SIG // rKMhIm0z4K7eJUBFkk4NYwgrizfdTwdq3CrPEFqPV12d
// SIG // PfoXYwLGcD67Iu1bsfcyuuRxvHn/+MvpVz90e+byfXxX
// SIG // WC+s0g6o2YjZQB86IkHiCSYCoMzlJc6MZ4PfRviFTcPa
// SIG // Zh7Hc347tHYXpqWgoHRVqOVgGEFiOMdlRqsEFmZW6vmm
// SIG // y0LPXVRkL4H4zzgADxBr4YMujT5I7ElWSuyaafTLDxD7
// SIG // BzRKYmwBjW7HIITKXNFjmR6OXewPpRZIqmveIS8CAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBQAWBs+7cXxBpO+MT02
// SIG // tKwLXTLwgTAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQAC/+OMA+rv
// SIG // fji5uXyfO1KDpPojONQDuGpZtergb4gD9G9RapU6dYXo
// SIG // HNwHxU6dG6jOJEcUJE81d7GcvCd7j11P/AaLl5f5KZv3
// SIG // QB1SgY52SAN+8psXt67ZWyKRYzsyXzX7xpE8zO8OmYA+
// SIG // BpE4E3oMTL4z27/trUHGfBskfBPcCvxLiiAFHQmJkTkH
// SIG // TiFO3mx8cLur8SCO+Jh4YNyLlM9lvpaQD6CchO1ctXxB
// SIG // oGEtvUNnZRoqgtSniln3MuOj58WNsiK7kijYsIxTj2hH
// SIG // R6HYAbDxYRXEF6Et4zpsT2+vPe7eKbBEy8OSZ7oAzg+O
// SIG // Ee/RAoIxSZSYnVFIeK0d1kC2MIIE7DCCA9SgAwIBAgIT
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
// SIG // L54/LlUWa8kTo/0xggSDMIIEfwIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIGcMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBTvrpqcpIr4
// SIG // yruudHLvtdftN49kozA8BgorBgEEAYI3AgEMMS4wLKAM
// SIG // gAoAYQBkAC4AagBzoRyAGmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS8gMA0GCSqGSIb3DQEBAQUABIIBAFlqdheT
// SIG // WFLa2BU6TV/o8CjbG+dy+JjVh6FU0oxd0zlmOwZQThPd
// SIG // 10alFbUOyH0YLcAe5QauAxIcvelcoz0pXLigAayBkuyf
// SIG // hDxBk0+5k1DUDg1yWE8LsSruka+IHHsBj84Ij4mOV+Vx
// SIG // 7ouHTbFy7pV758tgqQyyCjsOJGfO/hkCCP1Fj+EgVD4a
// SIG // Ue5kguBftfqxgS+Q2pafWHCnNbD3hk0RY2sTVquJ7rM2
// SIG // 5qbBY9d4KOYglhtiQR7yBN4bf7O7D9x4pd7Ctv6drdsM
// SIG // KZT2ylzryBwzdnFH6TuNKYVeDuKZTbrUnvDUVXMAX7Af
// SIG // 3sZdu8O5I4p47JigFYkszVtyZR6hggIoMIICJAYJKoZI
// SIG // hvcNAQkGMYICFTCCAhECAQEwgY4wdzELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEhMB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBAhMzAAAAM+UnhqMOSiqAAAAAAAAzMAkG
// SIG // BSsOAwIaBQCgXTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcN
// SIG // AQcBMBwGCSqGSIb3DQEJBTEPFw0xNDA0MjkwMDMyMDZa
// SIG // MCMGCSqGSIb3DQEJBDEWBBRcwjlZyNLoz9Y4MOK0pkqX
// SIG // o3dijDANBgkqhkiG9w0BAQUFAASCAQAEe5oFnAUaIIIG
// SIG // tkqmvaT7x14XcmUZ5Vp49+9Fy08XVLkjHF6TCKVnXQZJ
// SIG // Gv6yZWrGX6+4mwL3sTJFArV6wa/L9t4YOJfUWKyMKNm3
// SIG // iJNpd+qZSZ1DKvgh6i9bZZsVrg9W5PJSgfRZLmC/fLw9
// SIG // ehblkMUDe6re8/OwsnCBMoxR+DJnN7DW+qhdUwrf3DFr
// SIG // Muhm5h6yd1BTgeWN445xLQVUshIfEH/fQnkhipE5zkJQ
// SIG // LW50lFFTeaGHhkO/QTKPA7XZ6kP3n/kLwmmzC+DxvOR6
// SIG // 6XK6T2lk+Uyyru62xGeaGHhcDm9VdFWYDjkjLqk8qKXC
// SIG // ZVXA8aAkmVatvvHqp+XQ
// SIG // End signature block
