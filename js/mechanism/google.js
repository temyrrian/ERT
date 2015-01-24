'use strict';
window.addEventListener("DOMContentLoaded", function() {
mechanism.google = {
	// https://translate.google.com/?q=world&sl=en&tl=ru

    translate: function(v, callback) {
        var request,
            // url = 'http://translate.google.com/translate_a/t?client=t&ie=UTF-8&oe=UTF-8',
            url = 'http://translate.google.com/translate_a/t?client=t',
            post = v.text.length > 100;
        //'&sc=2&ie=UTF-8&oe=UTF-8&uptl=en&alttl=ru&oc=1&otf=2&ssel=0&tsel=6&q=hi';
        post || (url += '&text=' + encodeURIComponent(v.text));
        url += '&hl=' + 'ru'; // v.lang
        url += '&sl=' + 'en'; //v.from
        url += '&tl=' + 'ru'; //v.to


        request = new XMLHttpRequest();
        request.open(post ? "POST" : "GET", url, true);
        post && request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = mechanism.lib.bind(function() {
            if (request.readyState == 4) {
                var result = request.responseText;


                while(/,,/.test(result)) {
                    result = result.replace(/,,/gi, ',[],')
                }
                while(/\[,/.test(result)) {
                    result = result.replace(/\[,/gi, '[[],')
                }
                while(/\{,/.test(result)) {
                    result = result.replace(/\{,/gi, '{null,')
                }
                result = JSON.parse(result);
                callback(this.parse(result));
            }
        }, this);
        request.send(post ? 'q=' + encodeURIComponent(v.text) : null);

    },
    parse: function (value) {
        var i, arr = [],
            result = {
                core: null,
                other: null
            };

        result.core = value[0][0][0];

        if (value[1].length > 0) {
            result.other = [];
            for (i = 0; i < value[1].length; i++) {
                arr = [];
                arr.push(value[1][i][0]);
                arr.push(value[1][i][2]);
                result.other.push(arr);
            }
        }
        return result;
    }
};
});