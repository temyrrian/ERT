(function() {

    'use strict';

    var isCtrl = false;

    var translateWindow = null;
    var options = {};
    var lastTranslate = '';

    var translate;
    var getSelectedText;
    var upDateOptions;
    var send;
    var show;
    var hide;
    var createTerminal;
    var changingValues;
    var additionalValues;
    var setCss;
    var create;
    var removeCh;
    var setTranslateWindowEvents;
    var createSelect;
    var createTranslateButton;
    var createControlField;

    var terminal = {
        translateWindow: null,
        top: null,

        from: null,
        to: null,
        buttonsField: null,
        other: null,
        hoverFalg: false,
        fromSelect: null,
        toSelect: null,
        translateButton: null,

        controlField: null,
        lockButtonFlag: false,
        reductionButtonFlag: false
    };

    if (!window.translateololo) {
		window.translateololo = true;

        console.log('eeeeeeeeeee');
	    

	    send = function(name, objectName, object, callback) {
	    	var obj = { 'ttm': name };
	    	if (objectName) {
	    		obj[objectName] = object;
	    	}
    		chrome.runtime.sendMessage(obj, callback);
	    };

        translate = function(v) {
            // send('translate-ttm', 'value', v, function(result) {
            //     console.log('spy');
            //     show(result.text);
            // });
            chrome.runtime.sendMessage({ ttm: 'translate-ttm', value: v }, function(result) {
                lastTranslate = v;
                changingValues(result.text);
            });
        };


	    upDateOptions = function(opt) {
	    	send('upDateOptions-ttm', 'options', opt, function(result) {
	    		options = result.options;
	    	});
	    };

    	// chrome.runtime.sendMessage({ttm: 'upDateOptions', options: {qwe: 1, asd: 123}}, function(result) {
    	// 	console.log('eee', result.options);
    	// 	upDateOptions = result.options;
    	// });


        setCss = function(n, css) {
            if (n) {
                for(var i in css) {
                    n.style[i] = css[i];
                }    
            }
        };

        create = function(element, css) {
            var el = document.createElement(element);
            css && setCss(el, css);
            return el;
        };

        createControlField = function() {
            var fixed, close, small;
            terminal.controlField = create('div', {
                'width': '100%',
                'height': '20px',
                'backgroundColor': '#C58DC9'
            });
            fixed = create('button', {
                'position': 'absolute',
                'left': '0px',
                'border': '0px',
                'margin': '0px',
                'padding': '0px',
                'height': '20px',
                'width': '20px',
                'background-repeat': 'no-repeat',
                'background-size': 'auto 20px',
                'background-position-x': '-2px',
                'background-color': 'transparent',
                'background-image': 'url(' + chrome.extension.getURL('img/castle.gif') + ')'
            });
            fixed.addEventListener('click', function() {
                if (terminal.lockButtonFlag) {
                    terminal.lockButtonFlag = false;
                    fixed.style.backgroundPositionX = '-2px';
                } else {
                    terminal.lockButtonFlag = true;
                    fixed.style.backgroundPositionX = '-42px';
                }
            });
            terminal.controlField.appendChild(fixed);

            close = create('button', {
                'position': 'absolute',
                'border': '1px solid',
                'border-color': 'transparent',
                'right': '0px',
                // 'border': '0px',
                'margin-right': '3px',
                'padding': '0px',
                'height': '18px',
                'width': '18px',
                'background-repeat': 'no-repeat',
                'background-size': 'auto 18px',
                // 'background-position-x': '-2px',
                'background-color': 'transparent',
                'background-image': 'url(' + chrome.extension.getURL('img/cross.png') + ')'
            });
            close.addEventListener('click', function() {
                hide();
            });
            close.addEventListener('mauseover', function() {
                console.log('ee');
                close.style.borderColor = 'red';
            });
            terminal.controlField.appendChild(close);

            small = create('button', {
                'position': 'absolute',
                'border': '1px solid',
                'border-color': 'transparent',
                'left': '20px',
                'margin-right': '3px',
                'padding': '0px',
                'height': '18px',
                'width': '18px',
                'background-repeat': 'no-repeat',
                'background-size': 'auto 18px',
                'background-color': 'transparent',
                'background-image': 'url(' + chrome.extension.getURL('img/max.jpg') + ')'
            });
            // reductionButtonFlag

            small.addEventListener('click', function() {
                if (terminal.reductionButtonFlag) {
                    terminal.reductionButtonFlag = false;
                    setCss(small, {
                        'background-image': 'url(' + chrome.extension.getURL('img/min.jpg') + ')'
                    });
                    setCss(terminal.top, {
                        'display': 'none',
                        'visbility': 'visible'
                    });
                } else {
                    terminal.reductionButtonFlag = true;
                    setCss(small, {
                        'background-image': 'url(' + chrome.extension.getURL('img/max.jpg') + ')'         
                    });
                    setCss(terminal.top, {
                        'display': 'block',
                        'visbility': 'visible'
                    });
                }
            });
            terminal.controlField.appendChild(small);
        };

        createTerminal = function() {
            var div, span, temp, to, from, b, s;
            if (!terminal.translateWindow) {
                terminal.translateWindow = create('div', {
                    'color': 'black',
                    'width': '350px',
                    'height': '300px',
                    'overflow': 'hidden',
                    'position': 'fixed',
                    'right': '20px',
                    'bottom': '20px',
                    'border': '2px solid #7E3274',
                    'border-radius': '3px',
                    'backgroundColor':'#E6F1F5',
                    'boxShadow': '5px 5px 10px'
                });

                hide();

                createControlField();

                terminal.translateWindow.appendChild(terminal.controlField);


                // core window
                div = create('div', { 'height': '280px' });


                // from window
                from = create('div', {
                    'padding-top': '5px',
                    'padding-left': '3px',
                    'padding-right': '3px',
                    'padding-bottom': '5px',
                    'min-height': '60px',
                    'border-bottom': '2px solid #7E3274',
                    'box-sizing': 'border-box'
                });
                div.appendChild(from);

                terminal.from = create('input', {
                    'width': '100%',
                    'box-sizing': 'border-box'
                });
                terminal.from.setAttribute('size', '25');
                terminal.from.setAttribute('type', 'text');
                from.appendChild(terminal.from);
                terminal.top = from;
                // buttons field
                terminal.buttonsField = create('div', {
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-content': 'center',
                    'height': '100%',
                    'padding-top': '3px',
                    'padding-bottom': '3px'
                });
                createSelect('from');
                terminal.buttonsField.appendChild(terminal.fromSelect);
                createSelect('to');
                terminal.buttonsField.appendChild(terminal.toSelect);
                createTranslateButton();
                terminal.buttonsField.appendChild(terminal.translateButton);
                from.appendChild(terminal.buttonsField);


                // to window
                to = create('div', {
                    'overflow-y': 'auto',
                    'overflow-x': 'hidden',
                    'height': '220px'
                });
                div.appendChild(to);

                // wrapper
                temp = create('div', {
                    'padding': '3px'
                });

                terminal.to = create('span', {
                    'width': '100%',
                    'font-size': '25px'
                });

                temp.appendChild(terminal.to);
                to.appendChild(temp);


                terminal.other = create('div', {
                    'padding': '3px',
                    'width': '100%',
                    'box-sizing': 'border-box'

                });

                to.appendChild(terminal.other);
                terminal.translateWindow.appendChild(div);

                setTranslateWindowEvents();

                document.body.appendChild(terminal.translateWindow);
            }
        };

        createTranslateButton = function() {
            var b = create('button');

            b.innerHTML = 'Translate';
            terminal.translateButton = b;
        };

        createSelect = function(v) {
            var s, opt;
            s = create('select', {'margin-right': '3px'});

            opt = create('option');
            opt.appendChild(document.createTextNode('ololo'));
            s.options[s.options.length] = opt;

            opt = create('option');
            opt.appendChild(document.createTextNode('ololo'));
            s.options[s.options.length] = opt;

            opt = create('option');
            opt.appendChild(document.createTextNode('ololo'));
            s.options[s.options.length] = opt;

            terminal[v + 'Select'] = s;
        };

        removeCh = function(node) {
            var i = 0, ch = node.childNodes, l = ch.length;
            if (l > 0) {
                for (; i < l; i++) {
                    node.removeChild(ch[i]);
                }
            }
        };

        additionalValues = function(values) {
            var createBlock, table;

            removeCh(terminal.other);

            if (!values.other) { return; }

            table = create('table', { 'border-top': '1px solid' });

            createBlock = function(arr) {
                var i, td, tr,
                    _window = create('tbody', { 'width': '100%' });

                tr = create('tr', {
                    'white-space': 'nowrap',
                    'width': '100%',
                    'height': '30px',
                    'color': '#9A0887',
                    'text-decoration': 'underline'
                });

                tr.innerHTML = arr[0] + ':';
                _window.appendChild(tr);


                arr[1].forEach(function(el) {
                    tr = create('tr');
                    // tr.addEventListener('mouseover', function() {
                    //     console.log('ololo')
                    //     tr.style.backgroundColor = '#D5D1D5';
                    // });
                    // tr.addEventListener('mouseout', function() {
                    //     tr.style.backgroundColor = '';
                    // });
                    for (i = 0; i < 2; i ++) {
                        if (0 === i) {
                            td = create('td', {
                                'font-style': 'italic',
                                'padding-left': '3px'
                            });
                            console.log ('------', el[i] + ': ')
                            td.innerHTML = el[i] + ': ';
                            tr.appendChild(td);
                        } else {
                            td = create('td', { 'padding-right': '3px' });
                                console.log(el[i]);
                            el[i].forEach(function(str) {
                                td.innerHTML = td.innerHTML + str + ', ';
                            });
                            tr.appendChild(td);
                        }
                    }
                    _window.appendChild(tr);
                });

                return _window;
            };

            values.other.forEach(function(el) {
                table.appendChild(createBlock(el));
            });

            terminal.other.appendChild(table);
        };

        changingValues = function(values) {
            createTerminal();
            console.log('values', values.other);
            terminal.from.value = lastTranslate;
            terminal.to.innerHTML = values.core;

            additionalValues(values);

            show();
        };

        show = function(node) {
            setCss(node || terminal.translateWindow, {
                'display': 'inline-block',
                'visbility': 'visible'
            });
        };
        hide = function(node) {
            setCss(node || terminal.translateWindow, {
                'display': 'none',
                'visbility': 'hidden'
            });
        };

		upDateOptions();

        getSelectedText = function() {
		    var text = "";
		    if (window.getSelection) {
		        text = window.getSelection();
		    } else if (document.getSelection) {
		        text = document.getSelection();
		    } else if (document.selection) {
		        text = document.selection.createRange().text;
		    }
		    return text;
		};

        setTranslateWindowEvents = function() {
            terminal.translateWindow.addEventListener('mouseover', function() {
                terminal.hoverFalg = true;
            });
            terminal.translateWindow.addEventListener('mouseout', function() {
                terminal.hoverFalg = false;
            });
        };

        document.body.addEventListener('click', function(e) {
            if (!terminal.hoverFalg && terminal.translateWindow && e.target != terminal.translateWindow) {
                hide();
            }
        });
		

	    window.addEventListener('keyup', function(e) {
	        if(e.which == 17) {
	        	isCtrl = false;
	        }
	    });

	    window.addEventListener('keydown', function(e) {

	        if(e.which == 17) {
	        	isCtrl = true;
	        }
	        if(e.which == 13 && isCtrl == true) {
                translate(getSelectedText() + '');
	        }
	    });
    }
})();