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

		$( ".ar-div" ).on({
			mouseenter: function() {
				var $this=$(this);
				hoverTimer=setTimeout(function(){
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
		    	// $("#archivePreview").find("img").attr("src",arImg);
		    	// $("#archivePreview").find("h1").text(arH1);
		    	// $("#archivePreview").find("h2").text(arH2);
		    	// $("#previewPostDescription").text(arDescription);
		    	// $("#previewPostTracks").text(arTracks);
			}
		})
	}
);
