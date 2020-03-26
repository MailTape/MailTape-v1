var episodes=[];
var rand;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function loadNextEpisode(episode){
	console.log(episode.track1_link+" "+episode.track1_title);
	tracksURL[0]=episode.track1_link;
	console.log("ici:"+tracksURL[0]);
	tracksTitle[0]=episode.track1_title;
	console.log("ici:"+tracksTitle[0]);

	setTimeout(function() {
		console.log("là:"+tracksURL[0]);
		console.log("là:"+tracksTitle[0]);
		loadTracks();
      	getTracksDuration();
		loadSounds();
  	},1000);

}

function getRandomEpisode() {
	$.getJSON( "/episodes.json", function(data) {
		$.each(data, function(index,value){
			episodes.push(value);
		})
		,
		rand = getRandomInt(episodes.length);
		var episode=episodes[rand]
		loadNextEpisode(episode);
	});
}