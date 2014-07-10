













chrome.tabs.onUpdated.addListener(function(id, loadOptions, tab) {
	// addTab(id, tab, loadOptions);
});
chrome.tabs.onRemoved.addListener(function(id, tab) {
	// removeTab(id);
});
chrome.tabs.onCreated.addListener(function(tab) {
	// addTab(tab.id, tab);
});