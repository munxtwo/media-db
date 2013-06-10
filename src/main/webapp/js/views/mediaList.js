window.MediaListView = Backbone.View.extend({
	
	tagName: "div",
	
	className: "row",

	events: {
		"click .year": "filterByYear",
		"click .all": "render",
	},

	initialize: function() {
		this.columnHeaders = new MediaListHeaders();
		this.title = this.options.title;
	},
	
	render: function() {
		$(this.el).html(this.template({model:this.model, sidebar:this.options.sidebar, years:this.options.years, title:this.title}));
		
		_.each(this.options.years, function(year) {
			$('#years', this.el).append(new YearListView({model:year}).render().el);
		}, this);

		$('#columnHeaders', this.el).append(new MediaListHeaderView({model:this.columnHeaders}).render().el);
		
		_.each(this.model.models, function(media) {
			$('#columnBody', this.el).append(new MediaListItemView({model:media}).render().el);
		}, this);
		
	    return this;
	},
	  
	filterByYear: function() {
		var id = arguments[0].currentTarget.id;
		this.title = "List of Series in " + id; 
		$("h1").html(this.title);
		
		$('.nav-pills li').removeClass('active');
        $('.' + id).addClass('active');

        var filtered = this.collection.filter(function(media) {
        	return media.get("releaseYear") == id;
        });
        
        $('#columnBody', this.el).empty();
        _.each(filtered, function(media) {
        	$('#columnBody', this.el).append(new MediaListItemView({model:media}).render().el);
        }, this);
        
	},

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

window.YearListView = Backbone.View.extend({

	tagName: "li",

	initialize: function() {
		this.year = this.model;
	},

	render: function() {
		$(this.el).attr('id', '' + this.year).addClass('year ' + this.year).html(_.template("<a href='#media'><%=year%></a>", {year:this.model}));
		return this;
	}
});