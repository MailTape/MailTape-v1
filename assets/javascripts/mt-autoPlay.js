$(document).ready(
	function() {

	var episodes=[];
	var rand;

	function getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
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

	function loadNextEpisode(episode){
		console.log(episode.title+" "+episode.category+" "+episode.author+" "+episode.episode_URL);
	}

	getRandomEpisode();

});