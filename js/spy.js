(function() {

    'use strict';

    var v = 0.1;
    var isCtrl = false;
    var translate;

    if (!window['translateololo']) {
		window['translateololo'] = true;

        console.log('eeeeeeeeeee');

        var getSelectedText = function() {
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

    	chrome.runtime.sendMessage({ms: 'ololo'}, function(res) {
    		console.log('eee', res.trol);
    	});
    }
})();