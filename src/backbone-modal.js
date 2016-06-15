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
        className: 'modal',
        defaults: {
            title: '',
            body: '',
            footer: '',
            closeIcon: true,
            backdrop: true,
            keyboard: true,
            animation: true,
            class: ''
        },
        template: _.template(
            '<div class="modal-dialog">' +
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
            '</div>'
        ),
        buttonTemplate: _.template(
            '<button <% if (className) { %>class="<%= className %>"<% } %> type="button"><%= text %></button>'
        ),
        buttonStyles: {
            'default': 'btn btn-default',
            'primary': 'btn btn-primary',
            'success': 'btn btn-success',
            'info': 'btn btn-info',
            'warning': 'btn btn-warning',
            'danger': 'btn btn-danger',
            'link': 'btn btn-link'
        },
        initialize: function(options) {
            this.attributes = {};
            this.options = _.extend(this.defaults, options);

            if (this.options.class) {
                this.attributes.class = this.className + ' ' + options.class;
            }
            
            if (this.options.animation) {
                this.attributes.class += ' fade';
            }

            if (options.body && options.body.$el) {
                this.options.body = options.body.render().$el[0].outerHTML;
            }

            if (options.buttons && options.buttons.length) {
                var that = this;

                this.footerControls = _.map(options.buttons, function(el) {
                    var className = '';

                    if (that.buttonStyles[el.style]) {
                        className += that.buttonStyles[el.style];
                    }

                    if (el.className) {
                        className += ' ' + el.className;
                    }

                    if (!className) {
                        className += that.buttonStyles['default'];
                    }

                    return that.buttonTemplate({
                        text: el.text,
                        className: className
                    });
                }).join('');
            }
        },
        render: function() {
            this.$el.html(this.template({
                title: this.options.title,
                body: this.options.body,
                footer: this.footerControls
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
            this.undelegateEvents();
            this.$el.removeData().unbind();
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