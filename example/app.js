define([
    'underscore',
    'backbone',
    'modal'
], function(_, Backbone, Modal) {
    return Backbone.View.extend({
        events: {
            'click .show-modal': 'showModal'
        },
        attributes: {
            'class': 'main'
        },
        template: _.template('<div class="main"> <button id="modal" class="show-modal">Show modal</button> </div>'),
        initialize: function() {
        },
        render: function() {
            this.$el.html(this.template);

            return this;
        },
        showModal: function() {
            var modal = new Modal({
                title: 'Title',
                body: 'Body text'
            });
        }
    });
});