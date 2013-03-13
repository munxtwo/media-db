window.MediaListHeaders = Backbone.Model.extend({
	
	initialize: function() {
		this.set({columnNames: ["#",
	              "English Name",
	              "Chinese Name",
	              "Year",
	              "# of Episodes",
	              "Stored Location",
	              "Status",
	              "Category",
	              "Type"
		]});
	}
});

window.Media = Backbone.Model.extend({
	
	urlRoot: "./api/media",
	
	defaults: {
		"id": null,
		"engName": "",
		"chineseName": "",
		"releaseYear": "",
		"episodeLength": "",
		"location": "",
		"status": "",
		"mediaType": "",
		"mediaSubType": "",
	}
});

window.MediaCollection = Backbone.Collection.extend({
	
	model: Media,
	
	url: "./api/media",
	
	findByStatus: function (status) {
		
		url: "./api/media/status/" + status;
		console.log('findByStatus: ' + status);
		this.reset();
//        var self = this;
//        $.ajax({
//            url:url,
//            dataType:"json",
//            success:function (data) {
//                console.log("search success: " + data.length);
//                self.reset(data);
//                alert(data.id);
//            }
//        });
	}

});