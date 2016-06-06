requirejs.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        modal: '../src/backbone-modal',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
});

require([
    'app',
    'bootstrap'
], function(App) {
    'use strict';

    var app = new App();
    document.body.appendChild(app.render().el);
});