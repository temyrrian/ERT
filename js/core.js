'use strict';
var mechanism = {};

window.addEventListener("DOMContentLoaded", function() {


var 
	// mechanism = {},
	currentOptions;

	currentOptions = new Options();





chrome.runtime.onMessage.addListener(function(data, sender, sendResponse) {
    if('upDateOptions' === data.ttm) {
    	if (!data.options) {
    		sendResponse({ options: currentOptions.getJSON()});	
    	} else {
    		console.log(data.options)
    	}
        
    }

    return false;
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

