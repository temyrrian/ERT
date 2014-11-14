'use strict';
window.addEventListener("DOMContentLoaded", function() {
mechanism.lib = {
    bind: function(f, t) {
        return function() {
            f.call(t);
        };
    }
};
});