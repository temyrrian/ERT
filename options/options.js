'use strict';
var container, nws, l, sites = [], buttonSites = [];

function hasClass(el, cls) {
	return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass( el, klass ) {
	if ( klass && !hasClass(el, klass) ) {
		el.className += (el.className ? ' ' : '') + klass;
	}
	return this;
}
function create(node) {
	var _node = document.createElement(node);
	return _node;
}
function setButtonStatus(status) {
	if (status == 'Disable' || hasClass(this, 'Enable')) {
		this.classList.remove('Enable');
		addClass(this, 'Disable');
		this.value = 'false';
		this.childNodes[0].remove();
		this.appendChild(document.createTextNode('Disable'));
	} else if (status == 'Enable' || hasClass(this, 'Disable')) {
		this.classList.remove('Disable');
		addClass(this, 'Enable');
		this.value = 'true';
		this.childNodes[0].remove();
		this.appendChild(document.createTextNode('Enable'));
	}
}
function addElements(par, name) {
	var lp = create('div'),
		rp = create('div'),
		span = create('span'),
		button = create('button'),
		buttonStatus;

	!localStorage[name] && (localStorage[name] = true);
	buttonStatus = (localStorage[name] == "true") ? 'Enable' : 'Disable';

	addClass(lp, 'leftPosition');
	span.appendChild(document.createTextNode(name));
	lp.appendChild(span);
	par.appendChild(lp);

	addClass(rp, 'rightPosition');
	button.addEventListener('click', setButtonStatus);
	button.appendChild(document.createTextNode(buttonStatus));
	button.name = name;
	button.value = localStorage[name];
	button.id = 'sitesButton';
	addClass(button, 'button');
	addClass(button, 'site-button');
	addClass(button, buttonStatus);
	rp.appendChild(button);
	par.appendChild(rp);
	buttonSites.push(button);
}

function saveOptions() {
	for(var i = 0; i < buttonSites.length; i++) {
		localStorage[buttonSites[i].name] = buttonSites[i].value;
	}
}
function canselOptions() {
	for(var i = 0; i < buttonSites.length; i++) {
		if (localStorage[buttonSites[i].name] != buttonSites[i].value) {
			setButtonStatus.call(buttonSites[i], ((localStorage[buttonSites[i].name] == 'true') ? 'Enable' : 'Disable') );
		}
	}
}
function enableDisableAll() {
	var i, curClass = hasClass(this, 'enableAll') ? 'Enable' : 'Disable';
	for (i = 0; i < buttonSites.length; i++) {
		setButtonStatus.call(buttonSites[i], curClass);
	}
}

function init() {
	var i;
	l = nws.length;
	container = document.getElementById('sites');
	for (i = 0; i < l; i++) {
		sites.push({node: document.createElement('div')});
		addClass(sites[i].node, 'site');
		container.appendChild(sites[i].node);
		addElements(sites[i].node, nws[i]);
	}
}

document.addEventListener('DOMContentLoaded', function () {
	nws = localStorage["n_w_s"].split(',');
	document.getElementById("buttonSave").addEventListener("click", saveOptions);
	document.getElementById("buttonCansel").addEventListener("click", canselOptions);
	document.getElementById("enableAll").addEventListener("click", enableDisableAll);
	document.getElementById("disableAll").addEventListener("click", enableDisableAll);

	init();
});