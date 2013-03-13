window.MediaListView = Backbone.View.extend({
	
	tagName: "div",
	
	className: "span12",

	initialize: function() {
		this.columnHeaders = new MediaListHeaders();
	},
	
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		$('#columnHeaders', this.el).append(new MediaListHeaderView({model:this.columnHeaders}).render().el);
		
		_.each(this.model.models, function(media) {
			$('#columnBody', this.el).append(new MediaListItemView({model:media}).render().el);
		}, this);
		
	    return this;
	  }

});

window.MediaListHeaderView = Backbone.View.extend({
	
	tagName: "tr",
	
	render: function() {
		_.each(this.model.get("columnNames"), function(columnNames) {
			$(this.el).append(new MediaListHeaderItemView({model:columnNames}).render().el);
		}, this);
	    return this;
	  }
	
});

window.MediaListHeaderItemView = Backbone.View.extend({
	
	tagName: "th",
	
	render: function() {
	    $(this.el).html(this.template({columnNames:this.model}));
	    return this;
	  }
});

window.MediaListItemView = Backbone.View.extend({
	
	tagName: "tr",
	
	render: function() {
	    $(this.el).html(this.template(this.model.toJSON()));
	    return this;
	  }
	
});