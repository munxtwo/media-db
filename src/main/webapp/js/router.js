var appRouter = Backbone.Router.extend({
	
	routes: {
		"": "home",
		"media": "allmedia",
		"media/:id": "mediaDetails",
//		"list": "mediaList"
	},
	
	initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.render().el);
        $('.carousel').carousel({
        	  interval: 2000
        	});
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
        
        var upcomingMedia = new MediaCollection();
        upcomingMedia.findByStatus("Upcoming");
        upcomingMedia.fetch({
        	success: function(data) {
        		$("#content", this.el).append(new MediaListView({model: data}).render().el);
    		}
        });
//        $("#content", this.el).append(new MediaListView({model: upcomingMedia}).render().el);
//        alert(upcomingMedia);
//        upcomingMedia.fetch({
//        	success: function (data) {
//        		alert(data);
//        	}
//        });
    },
    
    allmedia: function() {
    	var collection = new MediaCollection();
    	collection.fetch({
    		success: function(data) {
    			$("#content").html(new MediaListView({model: data}).render().el);
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
    }

//	mediaList: function() {
//		this.mediaListHeaders = new mediaListHeaders().get("columnNames");
////		alert(this.mediaListHeaders.get("columnNames"));
//		this.mediaListView = new mediaListView({model:this.mediaListHeaders});
////		this.mediaListHeaders.fetch();
//		$('#media').html(this.mediaListView.render().el);
////		$('#media').html('<h1>test</h1>');
//	}
	
});

templateLoader.load(["HomeView", "HeaderView", "MediaListView", "MediaListHeaderItemView", "MediaListItemView", "MediaView"],
	    function () {
	        app = new appRouter();
	        Backbone.history.start();
	    });
