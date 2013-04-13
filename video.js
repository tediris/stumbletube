if (Meteor.isClient){

	var visitedIds = [];

	/*
	ID LIST:
	auto: 2
	comedy: 23
	education: 27
	entertainment: 24
	film: 1
	music: 10
	gaming: 20
	style:26
	politics:25
	activism: 29
	people/vlogs: 22
	animals: 15
	science/tech: 28
	sports: 17
	travel: 19
	*/

	$.getScript('swfobject.js', function() {

		video_id = "Q5mHPo2yDG8";
		cat_id = 17;
		url = null;
		API_KEY="AIzaSyBP8mopg68nZjzqaDzmfxxJuVdP8N8DYF8";

		params = { allowScriptAccess: "always" };
		//atts = { id: "ytplayer" };

		var pHeight = $(document).height*0.8;
		console.log(pHeight);

		swfobject.embedSWF(
			//"http://www.youtube.com/v/" + video_id + "?version=3&enablejsapi=1&playerapiid=ytplayer", "ytplayer", "425", "365", "8", null, null, params);
			"http://www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid=ytplayer", "ytplayer", "425", "550", "8", null, null, params);
			//swfobject.embedSWF(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj)

		console.log(ytplayer);


		ytplayer = document.getElementById("ytplayer");
		
		setInterval(checkState, 1000);

		function checkState(){
			var state = ytplayer.getPlayerState();
			if (state === 0){
				nextVid();
			}
		}

		function nextVid(){
			$.get(
				"https://www.googleapis.com/youtube/v3/search?type=video&relatedToVideoId=" + video_id + "&part=snippet&key=" + API_KEY, 
				//"https://www.googleapis.com/youtube/v3/search?q=puppies&part=snippet&key=" + API_KEY,
				function(data){
					var counter = 0;
					while (true){
						var id = data.items[counter].id.videoId;
						if ($.inArray(id, visitedIds) === -1){
							ytplayer.loadVideoById(id);
							video_id = id;
							visitedIds[visitedIds.length] = video_id;
							break;
						} else {
							counter++;
						}
					}

				}

			)
		}
		
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
			console.log(ytplayer.getPlayerState());
		});

		$('#data').click(function () {
			
			
	

			$.get(
				"https://www.googleapis.com/youtube/v3/search?type=video&relatedToVideoId=" + video_id + "&part=snippet&key=" + API_KEY, 
				//"https://www.googleapis.com/youtube/v3/search?q=puppies&part=snippet&key=" + API_KEY,
				function(data){
					var counter = 0;
					while (true){
						var id = data.items[counter].id.videoId;
						if ($.inArray(id, visitedIds) === -1){
							ytplayer.loadVideoById(id);
							video_id = id;
							visitedIds[visitedIds.length] = video_id;
							break;
						} else {
							counter++;
						}
					}


				}

			)
				
			$.get(
				//"https://gdata.youtube.com/feeds/api/videos/" + video_id + "?v=2", //{paramOne : 1, paramX : 'abc'},
				"https://www.googleapis.com/youtube/v3/videos?id=" + video_id + "&key=" + API_KEY + "&part=snippet,contentDetails,statistics,status",
				function(data) {
					console.log(data);
				}
			);
			
		});

		$('#query').click(function () {

			var keywords = $('#search').val();

			$.get(//"https://www.googleapis.com/youtube/v3/search?q=" + keywords + "&part=snippet&key=" + API_KEY,
				"https://www.googleapis.com/youtube/v3/search?type=video&videoCategoryId=" + cat_id + "&part=snippet&key=" + API_KEY,
				function(data){
					console.log(data);
					var id = data.items[0].id.videoId;
					ytplayer.loadVideoById(id);
					video_id = id;
				}

			)

		});

		$('#info').click(function () {
			$.get(
				//"https://gdata.youtube.com/feeds/api/videos/" + video_id + "?v=2", //{paramOne : 1, paramX : 'abc'},
				"https://www.googleapis.com/youtube/v3/videos?id=" + video_id + "&key=" + API_KEY + "&part=snippet,contentDetails,statistics,status",
				function(data) {
					console.log(data);
				}
			);
		});

	});

};