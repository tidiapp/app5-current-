// http://msdn.microsoft.com/en-us/library/azure/jj554207.aspx
var thinkitdrinkitDataClient = new WindowsAzure.MobileServiceClient(
                "https://thinkitdrinkitdata.azure-mobile.net/",
                "lJAQKEvRAcYGsFuiggkyaxkkwqcywN52");

// Add a filter that adds a header to prevent caching. This makes sure that the 
// latest data is returned when the 'Refresh; button is clicked.        
var noCachingFilter = function (request, next, callback) {
    if (request.type === 'GET' && !request.headers['If-Modified-Since']) {
        request.headers['If-Modified-Since'] = 'Mon, 27 Mar 1972 00:00:00 GMT';
    }
    next(request, callback);
};