'use strict';

var mechanism = {};

var file = 'g';



chrome.runtime.onMessage.addListener(function(data, sender, callback) {
    if(data.action == 'translate') {
        
    }

    return false;
});

// chrome.tabs.onUpdated.addListener(function(id, loadOptions, tab) {
//     addTab(id, tab, loadOptions);
// });

chrome.tabs.query( {'status': 'complete'}, function(tabs) {
    tabs.forEach(function(tab) {
        chrome.tabs.executeScript( tab.id, {file: 'js/mechanism/' + file + '.js'} );        
    });
});