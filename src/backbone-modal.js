(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        return define(['underscore', 'backbone'], factory);
    } else if (typeof exports === 'object') {
        return module.exports = factory(require('underscore'), require('backbone'));
    } else {
        return factory(root._, root.Backbone);
    }
}(this, function(_, Backbone) {
    'use strict';

    Backbone.Modal = Backbone.View.extend({
        events: {
            'shown.bs.modal': 'shown',
            'hidden.bs.modal': 'destroy',
            'click #close': 'close',
            'click #confirm': 'confirm'
        },
        attributes: {
            'class': 'modal'
        },
        defaults: {
            title: '',
            body: '',
            footer: '',
            closeIcon: true,
            backdrop: true,
            keyboard: true,
            animation: true,
            className: ''
        },
        template: _.template('<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<% if (title) { %>' +
            '<div class="modal-header">' +
            '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title"><%= title %></h4>' +
            '</div>' +
            '<% } %>' +
            '<% if (body) { %>' +
            '<div class="modal-body">' +
            '<%= body %>' +
            '</div>' +
            '<% } %>' +
            '<% if (footer) { %>' +
            '<div class="modal-footer">' +
            '<%= footer %>' +
            '</div>' +
            '<% } %>' +
            '</div>' +
            '</div>'),
        initialize: function(options) {
            this.options = _.extend(this.defaults, options);

            if (this.options.className) {
                this.attributes.class += ' ' + options.className;
            }

            if (this.options.animation) {
                this.attributes.class += ' fade';
            }

            if (options.body && options.body.$el) {
                this.options.body = options.body.render().$el[0].outerHTML;
            }
        },
        render: function() {
            this.$el.html(this.template({
                title: this.options.title,
                body: this.options.body,
                footer: this.options.footer
            })).attr(this.attributes);

            this.$el.modal(this.options);

            return this;
        },
        shown: function() {

        },
        show: function() {
            this.render();
        },
        hidden: function() {

        },
        destroy: function() {
            this.remove();
        },
        close: function() {
            this.$el.modal('hide');
        },
        confirm: function() {
            this.$el.modal('hide');
        }
    });

    return Backbone.Modal;
}));