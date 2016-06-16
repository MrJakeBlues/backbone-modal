define([
    'underscore',
    'backbone',
    'modal'
], function(_, Backbone, Modal) {
    return Backbone.View.extend({
        events: {
            'click #simple-use': 'simpleUse',
            'click #modal-with-view': 'modalWithView'
        },
        attributes: {
            'class': 'main'
        },
        template: _.template('<div class="main">' +
            '<button id="simple-use" class="btn btn-primary">Simple use</button>' +
            '<button id="modal-with-view" class="btn btn-primary">Modal with View</button>' +
            '</div>'),
        initialize: function() {
        },
        render: function() {
            this.$el.html(this.template);
            return this;
        },
        simpleUse: function() {
            var modal = new Modal({
                title: 'Simple modal',
                body: '<h4>This is simple modal.</h4><p>You can use simple text or template to show body.</p>',
                buttons: [],
                class: 'test'
            });
            modal.show();
        },
        modalWithView: function() {
            var View = Backbone.View.extend({
                template: _.template('<p>Modal with View instance as body</p>'),
                render: function() {
                    this.$el.html(this.template());
                    return this;
                }
            });

            var view = new View();

            var modal = new Modal({
                title: 'Modal with View',
                body: view
            });
            modal.show();
        }
    });
});