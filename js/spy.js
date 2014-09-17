(function() {

    'use strict';

    var v = 0.1;

    if (!window['translate'] ||
        window['translate'] && v !== window['translate'].version) {
        window['translate'] = {
            version = v;
        };
    }
    chrome.runtime.sendMessage(data, function(res) {});
})();