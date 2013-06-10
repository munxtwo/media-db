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
	
	initialize: function(options) {
		this.baseUrl = "./api/media/";
		if (typeof options === "undefined") {
			this.url = this.baseUrl;
		} 
		else {
			this.url = this.baseUrl + options.url;
		}
	},
	
	model: Media,
	
	url: function () {
		return this.url;
	},
	
});
