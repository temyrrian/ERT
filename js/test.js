'use strict';

window.getSelectedText = function() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection();
    }else if (document.getSelection) {
        text = document.getSelection();
    }else if (document.selection) {
        text = document.selection.createRange().text;
    }
    return text;
};
window.addEventListener("DOMContentLoaded", function() {
    var isCtrl = false;
    window.addEventListener('keyup', function() {
        if(e.which == 17) isCtrl = false;
    });
    window.addEventListener('keydown', function() {
        alert(getSelectedText());
        if(e.which == 17) isCtrl=true;
        if(e.which == 13 && isCtrl == true) {
            // получаем и показываем выделенный текст
            alert(getSelectedText());
        }
    });
});
