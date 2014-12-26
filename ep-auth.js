(function () {
  var obj = {};

  chrome.runtime.onInstalled.addListener(function (details) {
    obj.google.getToken(function (message) {
      console.log('EP-AUTH:message:', message);
    });
  });

  obj.google = (function () {
    function getToken (sendResponse) {
      // id in the manifest.json file
      chrome.identity.getAuthToken({interactive:true}, function (token) {
        setAccessToken(token);
      });

      function setAccessToken (token) {
        var message = {
          component: 'auth',
          type: 'accesstoken',
          service: 'google',
          token: token
        };
        console.log('EP-AUTH:sending message:', message);
        sendResponse(message);
      };

      return true; // response sent asynchronously
    };

    return {
      getToken: getToken
    };
  })();
})();
