if (Meteor.isClient){

	$.getScript('swfobject.js', function() {

		var params = { allowScriptAccess: "always" };
		var atts = { id: "ytplayer" };

		swfobject.embedSWF(
			"http://www.youtube.com/v/Nlwa0ZWrO8g?version=3&enablejsapi=1", "ytplayer", "425", "365", "8", null, null, params);

	});

};