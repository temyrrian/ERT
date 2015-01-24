(function() {

    'use strict';

    // variables
    var isCtrl = false,
        translateWindow = null,
        options = {},
        lastTranslate = '';


    // functions
    var translate,
        getSelectedText,
        upDateOptions,
        send,
        show,
        hide,
        createTerminal,
        changingValues,
        additionalValues,
        setCss,
        create,
        removeCh,
        setTranslateWindowEvents,
        createSelect,
        createTranslateButton,
        createControlField;

    var terminal = {
        translateWindow: null,
        hoverFalg: false,
        controlField: {
            node: null,
            reductionButtonFlag: false,
            castleButtonFlag: false
        },
        from: {
            top: null,
            node: null,
            buttonsField: {
                node: null,
                fromSelect: null,
                toSelect: null,
                translateButton: null
            },
        },
        to: {
            node: null,
            other: null,
        }

    }

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
            terminal.controlField.node = create('div', {
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
                'height': '18px',
                'width': '20px',
                'margin-left': '3px',
                'background-repeat': 'no-repeat',
                'background-size': 'auto 18px',
                'background-color': 'transparent',
                'background-image': 'url(' + chrome.extension.getURL('img/lock_2.png') + ')'
            });
            fixed.addEventListener('click', function() {
                if (terminal.controlField.castleButtonFlag) {
                    terminal.controlField.castleButtonFlag = false;
                    setCss(fixed, {
                        'background-image': 'url(' + chrome.extension.getURL('img/lock_2.png') + ')'
                    });
                } else {
                    terminal.controlField.castleButtonFlag = true;
                    setCss(fixed, {
                        'background-image': 'url(' + chrome.extension.getURL('img/lock.png') + ')'
                    });
                }
            });
            terminal.controlField.node.appendChild(fixed);

            close = create('button', {
                'position': 'absolute',
                'border': '1px solid',
                'border-color': 'transparent',
                'right': '0px',
                'margin-right': '3px',
                'padding': '0px',
                'height': '18px',
                'width': '18px',
                'background-repeat': 'no-repeat',
                'background-size': 'auto 18px',
                'background-color': 'transparent',
                'background-image': 'url(' + chrome.extension.getURL('img/cross.png') + ')'
            });
            close.addEventListener('click', function() {
                hide();
            });
            close.addEventListener('mauseover', function() {
                close.style.borderColor = 'red';
            });
            terminal.controlField.node.appendChild(close);

            small = create('button', {
                'position': 'absolute',
                'border': '1px solid',
                'border-color': 'transparent',
                'left': '20px',
                'margin-left': '3px',
                'padding': '0px',
                'height': '18px',
                'width': '18px',
                'background-repeat': 'no-repeat',
                'background-size': '18px 18px',
                'background-color': 'transparent',
                'background-image': 'url(' + chrome.extension.getURL('img/arrow_up.png') + ')'
            });
            // reductionButtonFlag

            small.addEventListener('click', function() {
                if (terminal.controlField.reductionButtonFlag) {
                    terminal.controlField.reductionButtonFlag = false;
                    setCss(small, {
                        'background-image': 'url(' + chrome.extension.getURL('img/arrow_up.png') + ')'
                    });
                    setCss(terminal.from.top, {
                        'display': 'none',
                        'visbility': 'visible'
                    });
                } else {
                    terminal.controlField.reductionButtonFlag = true;
                    setCss(small, {
                        'background-image': 'url(' + chrome.extension.getURL('img/arrow_down.png') + ')'         
                    });
                    setCss(terminal.from.top, {
                        'display': 'block',
                        'visbility': 'visible'
                    });
                }
            });
            terminal.controlField.node.appendChild(small);
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


                terminal.translateWindow.appendChild(terminal.controlField.node);

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

                terminal.from.node = create('input', {
                    'width': '100%',
                    'box-sizing': 'border-box'
                });
                terminal.from.node.setAttribute('size', '25');
                terminal.from.node.setAttribute('type', 'text');
                from.appendChild(terminal.from.node);
                terminal.from.top = from;
                // buttons field
                terminal.from.buttonsField.node = create('div', {
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-content': 'center',
                    'height': '100%',
                    'padding-top': '3px',
                    'padding-bottom': '3px'
                });
                createSelect('from');
                terminal.from.buttonsField.node.appendChild(terminal.from.buttonsField.fromSelect);
                createSelect('to');
                terminal.from.buttonsField.node.appendChild(terminal.from.buttonsField.toSelect);
                createTranslateButton();
                terminal.from.buttonsField.node.appendChild(terminal.from.buttonsField.translateButton);
                from.appendChild(terminal.from.buttonsField.node);

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

                terminal.to.node = create('span', {
                    'width': '100%',
                    'font-size': '25px'
                });

                temp.appendChild(terminal.to.node);
                to.appendChild(temp);


                terminal.to.other = create('div', {
                    'padding': '3px',
                    'width': '100%',
                    'box-sizing': 'border-box'

                });

                to.appendChild(terminal.to.other);
                terminal.translateWindow.appendChild(div);

                setTranslateWindowEvents();

                document.body.appendChild(terminal.translateWindow);
            }
        };

        createTranslateButton = function() {
            var b = create('button');

            b.innerHTML = 'Translate';
            terminal.from.buttonsField.translateButton = b;
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

            terminal.from.buttonsField[v + 'Select'] = s;
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

            removeCh(terminal.to.other);

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
                            td.innerHTML = el[i] + ': ';
                            tr.appendChild(td);
                        } else {
                            td = create('td', { 'padding-right': '3px' });
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

            terminal.to.other.appendChild(table);
        };

        changingValues = function(values) {
            createTerminal();
            terminal.from.node.value = lastTranslate;
            terminal.to.node.innerHTML = values.core;

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