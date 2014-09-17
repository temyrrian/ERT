'use strict';

var Options = function() {
	var options = {
		mechanism: 'google';
	};

	if (!localStorage.getItem('InstantTranslator_ttm')) {
		localStorage.setItem('InstantTranslator_ttm', JSON.stringify(options));
	}

	this.options = JSON.parse(localStorage.getItem('InstantTranslator_ttm'));
};

Options.prototype.get = function(o) {
	return this.options[o];
};

Options.prototype.set = function(o, v) {
	this.options[o] = v;
	ocalStorage.setItem('InstantTranslator_ttm', JSON.stringify(this.options));
};