window.HomeView = Backbone.View.extend({

    render: function () {
        $(this.el).html(this.template());
//        $('.navbar-search', this.el).append(this.searchresultsView.render().el);
        return this;
    },

});