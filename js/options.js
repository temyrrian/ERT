'use strict';

var Options = function() {
	this.defaultOptions = {
		'mechanism': 'google',
		'with': 'auto',
		'into': 'ru'
	};

	if (!localStorage.getItem('InstantTranslator_ttm')) {
		localStorage.setItem('InstantTranslator_ttm', JSON.stringify(this.defaultOptions));
	}

	this.options = JSON.parse(localStorage.getItem('InstantTranslator_ttm'));
};

Options.prototype.get = function(o) {
	return this.options[o];
};

Options.prototype.set = function(o, v) {
	this.options[o] = v;
	localStorage.setItem('InstantTranslator_ttm', JSON.stringify(this.options));
};

Options.prototype.getJSON = function() {
	return this.options;
};

Options.prototype.setJSON = function(o) {
	for (var i in o) {
		if (!o.hasOwnProperty(i)) {
			continue;
		}
		this.options[i] = o[i];	
	}
	localStorage.setItem('InstantTranslator_ttm', JSON.stringify(this.options));
};
Options.prototype.getDefaultOptions = function() {
	return this.defaultOptions;
}