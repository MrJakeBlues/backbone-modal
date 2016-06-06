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
        template: _.template('<div class="modal fade" tabindex="-1" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">Modal title</h4> </div> <div class="modal-body"> <p>One fine body&hellip;</p> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary">Save changes</button> </div> </div><!-- /.modal-content --> </div><!-- /.modal-dialog --> </div><!-- /.modal -->'),
        initialize: function(options) {
            this.render();
        },
        render: function() {
            this.$el.html(this.template());

            return this;
        },
        show: function() {
            this.$('.modal').modal('show');
        }
    });

    return Backbone.Modal;
}));