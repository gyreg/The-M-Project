
M.Model = Backbone.Model.extend(M.Object);


_.extend(M.Model.prototype, {

    _type: 'M.Model',

    defaults: function() {
        return {
            value: ""
        };
    }
});

M.Model.create = M.create;
