(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        return define(['backbone'], factory);
    } else if (typeof exports === 'object') {
        return module.exports = factory(require('backbone'));
    } else {
        return factory(root.Backbone);
    }
}(this, function(Backbone) {
    'use strict';

    Backbone.Modal = Backbone.View.extend({
        
    });

    return Backbone.Modal;
}));