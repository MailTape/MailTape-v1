$(document).ready(
	function() {

		// //console.log("div in");
		// var arImg=$("#archivePreview").find("img").attr("src");
		// //console.log("arImg= "+arImg);
		// var arH1=$("#archivePreview").find("h1").text();
		// //console.log("arH1= "+arH1);
		// var arH2=$("#archivePreview").find("h2").text();
		// //console.log("arH2= "+arH2);
		// var arDescription=$("#previewPostDescription").text();
		// //console.log("arDescription= "+arDescription);
		// var arTracks=$("#previewPostTracks").text();
		
		//$("#previewPostDescription").shave(75);

		var hoverTimer;
		var notHoverTimer;

		var firstEpisodeArtist = $(".ar-link").first().html();
		$(".ar-link").first().html('<svg height="20px" width="20px"  fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><g><path d="M92.7,65.9c-3.9,0-6,2-7.5,3.4c-1.3,1.2-1.9,1.7-3.3,1.7c-1.4,0-2-0.5-3.3-1.7c-1.4-1.3-3.3-3.1-6.6-3.4   c1.1-2.7,1.7-5.6,1.7-8.5c0-13-10.8-23.5-24-23.5s-24,10.6-24,23.5c0,3,0.6,5.8,1.7,8.5c-3.3,0.3-5.2,2-6.6,3.4   c-1.3,1.2-1.9,1.7-3.3,1.7c-1.4,0-2-0.5-3.3-1.7c-1.5-1.4-3.6-3.4-7.5-3.4c-1.7,0-3,1.3-3,3s1.3,3,3,3c1.4,0,2,0.5,3.3,1.7   c1.5,1.4,3.6,3.4,7.5,3.4c3.9,0,5.9-2,7.5-3.4c1.3-1.2,1.9-1.7,3.3-1.7s2,0.5,3.3,1.7c1,1,2.3,2.2,4.3,2.9c0.4,0.2,0.9,0.3,1.3,0.3   c0.6,0.1,1.2,0.2,1.9,0.2c3.9,0,6-2,7.5-3.4c1.3-1.2,1.9-1.7,3.3-1.7c1.4,0,2,0.5,3.3,1.7c1.5,1.4,3.6,3.4,7.5,3.4   c0.7,0,1.3-0.1,1.9-0.2c0.4,0,0.9-0.1,1.3-0.3c1.9-0.7,3.2-1.9,4.2-2.9c1.3-1.2,1.9-1.7,3.3-1.7c1.4,0,2,0.5,3.3,1.7   C76,75.1,78,77,81.9,77s6-2,7.5-3.4c1.3-1.2,1.9-1.7,3.3-1.7c1.7,0,3-1.3,3-3S94.3,65.9,92.7,65.9z"></path><path d="M7,58.4h9.3c1.7,0,3-1.3,3-3s-1.3-3-3-3H7c-1.7,0-3,1.3-3,3S5.3,58.4,7,58.4z"></path><path d="M93.3,52.4H84c-1.7,0-3,1.3-3,3s1.3,3,3,3h9.3c1.7,0,3-1.3,3-3S95,52.4,93.3,52.4z"></path><path d="M46.7,13.7V23c0,1.7,1.3,3,3,3s3-1.3,3-3v-9.3c0-1.7-1.3-3-3-3S46.7,12.1,46.7,13.7z"></path><path d="M20.7,24.5c-1.2-1.2-3.1-1.2-4.2,0c-1.2,1.2-1.2,3.1,0,4.2l6.6,6.6c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9   c1.2-1.2,1.2-3.1,0-4.2L20.7,24.5z"></path><path d="M78.8,24.5l-6.6,6.6c-1.2,1.2-1.2,3.1,0,4.2c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9l6.6-6.6c1.2-1.2,1.2-3.1,0-4.2   C81.8,23.3,79.9,23.3,78.8,24.5z"></path><path d="M85.2,86.3c0-1.7-1.3-3-3-3c-1.4,0-2-0.5-3.3-1.7c-1.5-1.4-3.6-3.4-7.5-3.4c-3.9,0-6,2-7.5,3.4c-1.3,1.2-1.9,1.7-3.3,1.7   c-1.4,0-2-0.5-3.3-1.7c-1.5-1.4-3.6-3.4-7.5-3.4s-6,2-7.5,3.4c-1.3,1.2-1.9,1.7-3.3,1.7s-2-0.5-3.3-1.7c-1.5-1.4-3.6-3.4-7.5-3.4   s-5.9,2-7.5,3.4c-1.3,1.2-1.9,1.7-3.3,1.7c-1.7,0-3,1.3-3,3s1.3,3,3,3c3.9,0,6-2,7.5-3.4c1.3-1.2,1.9-1.7,3.3-1.7   c1.4,0,2,0.5,3.3,1.7c1.5,1.4,3.6,3.4,7.5,3.4c3.9,0,6-2,7.5-3.4c1.3-1.2,1.9-1.7,3.3-1.7c1.4,0,2,0.5,3.3,1.7   c1.5,1.4,3.6,3.4,7.5,3.4c3.9,0,6-2,7.5-3.4c1.3-1.2,1.9-1.7,3.3-1.7c1.4,0,2,0.5,3.3,1.7c1.5,1.4,3.6,3.4,7.5,3.4   C83.9,89.3,85.2,87.9,85.2,86.3z"></path></g></svg>'+'&nbsp'+firstEpisodeArtist);


		var hasHovered=0;

		$( ".ar-div" ).on({
			mouseenter: function() {
				if (hasHovered==0) {$("#introStory").removeClass("showIt").addClass("hideIt"); $("#archivePreview").removeClass("notHovered").addClass("sticky-top"); hasHovered++;}
				var $this=$(this);
				hoverTimer=setTimeout(function(){
					clearTimeout(notHoverTimer);
					$("#archivePreview").find("img").attr("src",$this.find("a").attr("data-preview-guestPic"));
					$("#archivePreview").find("h1").text($this.find("a").attr("data-preview-h1"));
					$("#archivePreview").find("h2").text($this.find("a").attr("data-preview-h2"));
					// $("#previewPostDescription").text($this.find("a").attr("data-preview-p"));
					// $("#previewPostDescription").shave(75);

					$("#previewPostTracks li").each(function(i){
						$(this).text($this.find("a").attr("data-preview-tracks"+(i+1)+"_title"));
						$(this).attr("class",$this.find("a").attr("data-preview-tracks"+(i+1)+"_color"))
					})

					//$("#previewPostTracks").text($this.find("a").attr("data-preview-tracks"));
					//console.log($this.find("a").attr("data-preview-tracks"));
				},10); //timeout helps prevent flicering of all the stuff when mouse navigate over the area. 

			}, 
			mouseleave: function() {
				//console.log("div out");
				clearTimeout(hoverTimer);
				notHoverTimer=setTimeout(function(){
					$("#introStory").removeClass("hideIt").addClass("showIt"); $("#archivePreview").removeClass("sticky-top").addClass("notHovered");
					$("#archivePreview").removeClass('not-top');
					hasHovered=0;
				},3000)
		    	// $("#archivePreview").find("img").attr("src",arImg);
		    	// $("#archivePreview").find("h1").text(arH1);
		    	// $("#archivePreview").find("h2").text(arH2);
		    	// $("#previewPostDescription").text(arDescription);
		    	// $("#previewPostTracks").text(arTracks);
			}
		})

		// add shadow to sticky preview
		var navYposition = $('#archivePreview').offset().top;
		$(window).scroll(function() {
			if (hasHovered==1){
			  var y = $(window).scrollTop();
			  if (y > navYposition) {
			    $("#archivePreview").addClass('not-top');
			  } else {
			    $("#archivePreview").removeClass('not-top');
			  }
			};
		});
	}
);
