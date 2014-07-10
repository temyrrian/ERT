'use strict';


// chrome.tabs.executeScript( id, { file : 'js/ert.js' } );


console.log(12312313);







chrome.tabs.onUpdated.addListener(function(id, loadOptions, tab) {
	// addTab(id, tab, loadOptions);
	console.log('onUpdated');
});
chrome.tabs.onRemoved.addListener(function(id, tab) {
	console.log('onRemoved');
	// removeTab(id);
});
chrome.tabs.onCreated.addListener(function(tab) {
	console.log('onCreated');
	// addTab(tab.id, tab);
});