'use strict';
var mechanism = {};

window.addEventListener("DOMContentLoaded", function() {


var 
	// mechanism = {},
	currentOptions;

	currentOptions = new Options();
Function.bind = function(t) {
    var that = this;
    return function() {
        that.call(t);
    };
}

chrome.runtime.onMessage.addListener(function(data, sender, sendResponse) {
    if ('upDateOptions-ttm' === data.ttm) {
    	if (!data.options) {
    		sendResponse({ options: currentOptions.getJSON() });	
    	} else {
    		console.log(data.options);
    	}
    } else if ('translate-ttm' === data.ttm) {
        mechanism[currentOptions.get('mechanism')].translate({ text: data.value }, function(t) {
            // console.log('translate -----------------', t);
            // data.text = t;
            sendResponse({ text: t });
            // sendResponse(data);
        });

        // setTimeout(function() {
        //     sendResponse({ text: data.value });
        // }, 1);



        // setTimeout(function() {
        //     sendResponse({ text: data.value });
        // }.bind(this), 1);

    }

    return true;
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (/http/.test(tab.url.split('//')[0])) {
		chrome.tabs.executeScript( tabId, { file: 'js/spy.js', allFrames: true} );	
	}
}); 

chrome.tabs.query( {'status': 'complete'}, function(tabs) {
    tabs.forEach(function(tab) {
    	if (/http/.test(tab.url.split('//')[0])) {
    		chrome.tabs.executeScript( tab.id, { file: 'js/spy.js', allFrames: true} );
    	}
    });
});

});

