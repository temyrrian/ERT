(function() {

    'use strict';

    var isCtrl = false;
    var translate;
    var getSelectedText;
    var upDateOptions;
    var send;
    var options = {};

    if (!window['translateololo']) {
		window['translateololo'] = true;

        console.log('eeeeeeeeeee');


	    

	    send = function(name, objectName, object, callback) {
	    	var obj = { 'ttm': name };
	    	obj[objectName] = object;
    		chrome.runtime.sendMessage(obj, callback);
	    };

	    upDateOptions = function(opt) {
	    	send('upDateOptions', 'options', opt, function(result) {
	    		options = result.options;
	    	});
	    };

    	// chrome.runtime.sendMessage({ttm: 'upDateOptions', options: {qwe: 1, asd: 123}}, function(result) {
    	// 	console.log('eee', result.options);
    	// 	upDateOptions = result.options;
    	// });

		upDateOptions(options);


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
	            
	            console.log(getSelectedText() + '');
	        }
	    });
    }
})();