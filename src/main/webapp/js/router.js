var appRouter = Backbone.Router.extend({
	
	routes: {
		"": "home",
		"media": "allmedia",
		"media/:id": "mediaDetails",
	},
	
	initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.render().el);
        $('.carousel').carousel({
        	  interval: 2000
    	});
        this.title = "";
    },
    
    home: function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!this.homeView) {
            this.homeView = new HomeView();
            this.homeView.render();
        } else {
            this.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        $("#content").html(this.homeView.el);
        this.headerView.select('home-menu');
        $('.carousel').carousel('cycle');
        
        var upcomingMedia = new MediaCollection({url: "status/Upcoming"});
        var that = this;
        upcomingMedia.fetch({
        	success: function(data) {
        		that.title = "List Of Upcoming Series";
                $("#content", this.el).append(new MediaListView({model: data, sidebar: "noshow", title: that.title}).render().el);
    		}
        });

    },
    
    allmedia: function() {
    	var collection = new MediaCollection();
    	var that = this;
    	collection.fetch({
    		success: function(data) {
                var years = _.uniq(collection.pluck("releaseYear"));
                that.title = "List Of All Series";
    			$("#content").html(new MediaListView({model: data, collection: collection, 
    				sidebar: "show", years: years, title: that.title}).render().el);
    		}
    	});

    	this.headerView.select('all-media-menu');
    },
    
    mediaDetails: function(id) {
    	 var media = new Media({id: id});
         media.fetch({
             success: function (data) {
                 // Note that we could also 'recycle' the same instance of EmployeeFullView
                 // instead of creating new instances
                 $('#content').html(new MediaView({model: data}).render().el);
             }
         });
    },
    
});

templateLoader.load(["HomeView", "HeaderView", "MediaListView", "MediaListHeaderItemView", "MediaListItemView", "MediaView"],
	    function () {
	        app = new appRouter();
	        Backbone.history.start();
	    });
