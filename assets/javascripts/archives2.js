$(document).ready(
	function() {

	// init Masonry
	var $grid = $('.grid').masonry({
	  // options...
	});
	// layout Masonry after each image loads
	$grid.imagesLoaded().progress( function() {
	  $grid.masonry('layout');
	});

});