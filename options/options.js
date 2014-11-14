'use strict';

var serviceKeys = [];

function serviceKeysClick() {

};

function init() {
	serviceKeys.push(document.getElementById('gl'));
	serviceKeys.push(document.getElementById('yx'));
	serviceKeys.push(document.getElementById('bg'));

	for (var i = 0; i < serviceKeys.length; i++) {
		serviceKeys[i].addEventListener('click', serviceKeysClick);
	}
};

document.addEventListener('DOMContentLoaded', function () {
	// nws = localStorage["n_w_s"].split(',');
	// document.getElementById("buttonSave").addEventListener("click", saveOptions);
	// document.getElementById("buttonCansel").addEventListener("click", canselOptions);
	// document.getElementById("enableAll").addEventListener("click", enableDisableAll);
	// document.getElementById("disableAll").addEventListener("click", enableDisableAll);

	// init();
});