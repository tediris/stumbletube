if (Meteor.isClient){

	$.getScript('swfobject.js', function() {

		video_id = "D0ZUDvoJFzY";
		url = null;
		API_KEY="AIzaSyBP8mopg68nZjzqaDzmfxxJuVdP8N8DYF8";

		params = { allowScriptAccess: "always" };
		//atts = { id: "ytplayer" };

		swfobject.embedSWF(
			//"http://www.youtube.com/v/" + video_id + "?version=3&enablejsapi=1&playerapiid=ytplayer", "ytplayer", "425", "365", "8", null, null, params);
			"http://www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid=ytplayer", "ytplayer", "425", "365", "8", null, null, params);
			//swfobject.embedSWF(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj)

		console.log(ytplayer);


		ytplayer = document.getElementById("ytplayer");
		
		
		$('#load').click(function() {
			console.log("Play pressed");
			ytplayer.loadVideoById({videoId:video_id, startSeconds:0, suggestedQuality:"320"});
			//url = ytplayer.getVideoUrl();
			console.log(url);
		});

		$('#stop').click(function () {
			ytplayer.pauseVideo();
		});

		$('#resume').click(function () {
			ytplayer.playVideo();
		});

		$('#data').click(function () {
			
			$.get(
				//"https://gdata.youtube.com/feeds/api/videos/" + video_id + "?v=2", //{paramOne : 1, paramX : 'abc'},
				"https://www.googleapis.com/youtube/v3/videos?id=" + video_id + "&key=" + API_KEY + "&part=snippet,contentDetails,statistics,status",
				function(data) {
					console.log(data);
				}
			);
	

			$.get(
				//"https://www.googleapis.com/youtube/v3/search?type=video&relatedToVideoId=" + video_id + "&part=snippet&key=" + API_KEY, 
				"https://www.googleapis.com/youtube/v3/search?q=puppies&part=snippet&key=" + API_KEY,
				//"https://gdata.youtube.com/feeds/api/videos/" + video_id + "/related?v=2",
				function(data){
					var id = data.items[0].id.videoId;
					ytplayer.loadVideoById(id);
					video_id = id;
				}
			);
		});

	});

};