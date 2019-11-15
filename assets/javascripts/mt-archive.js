$(document).ready(
	function() {

		var hoverTimer;
		var notHoverTimer;
		var positionArchivePreview = $('#archivePreview').offset().top;

		var firstEpisodeArtist = $(".ar-link").first().html();
		$(".ar-link").first().html('<svg height="20px" width="20px"  fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><g><path d="M92.7,65.9c-3.9,0-6,2-7.5,3.4c-1.3,1.2-1.9,1.7-3.3,1.7c-1.4,0-2-0.5-3.3-1.7c-1.4-1.3-3.3-3.1-6.6-3.4   c1.1-2.7,1.7-5.6,1.7-8.5c0-13-10.8-23.5-24-23.5s-24,10.6-24,23.5c0,3,0.6,5.8,1.7,8.5c-3.3,0.3-5.2,2-6.6,3.4   c-1.3,1.2-1.9,1.7-3.3,1.7c-1.4,0-2-0.5-3.3-1.7c-1.5-1.4-3.6-3.4-7.5-3.4c-1.7,0-3,1.3-3,3s1.3,3,3,3c1.4,0,2,0.5,3.3,1.7   c1.5,1.4,3.6,3.4,7.5,3.4c3.9,0,5.9-2,7.5-3.4c1.3-1.2,1.9-1.7,3.3-1.7s2,0.5,3.3,1.7c1,1,2.3,2.2,4.3,2.9c0.4,0.2,0.9,0.3,1.3,0.3   c0.6,0.1,1.2,0.2,1.9,0.2c3.9,0,6-2,7.5-3.4c1.3-1.2,1.9-1.7,3.3-1.7c1.4,0,2,0.5,3.3,1.7c1.5,1.4,3.6,3.4,7.5,3.4   c0.7,0,1.3-0.1,1.9-0.2c0.4,0,0.9-0.1,1.3-0.3c1.9-0.7,3.2-1.9,4.2-2.9c1.3-1.2,1.9-1.7,3.3-1.7c1.4,0,2,0.5,3.3,1.7   C76,75.1,78,77,81.9,77s6-2,7.5-3.4c1.3-1.2,1.9-1.7,3.3-1.7c1.7,0,3-1.3,3-3S94.3,65.9,92.7,65.9z"></path><path d="M7,58.4h9.3c1.7,0,3-1.3,3-3s-1.3-3-3-3H7c-1.7,0-3,1.3-3,3S5.3,58.4,7,58.4z"></path><path d="M93.3,52.4H84c-1.7,0-3,1.3-3,3s1.3,3,3,3h9.3c1.7,0,3-1.3,3-3S95,52.4,93.3,52.4z"></path><path d="M46.7,13.7V23c0,1.7,1.3,3,3,3s3-1.3,3-3v-9.3c0-1.7-1.3-3-3-3S46.7,12.1,46.7,13.7z"></path><path d="M20.7,24.5c-1.2-1.2-3.1-1.2-4.2,0c-1.2,1.2-1.2,3.1,0,4.2l6.6,6.6c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9   c1.2-1.2,1.2-3.1,0-4.2L20.7,24.5z"></path><path d="M78.8,24.5l-6.6,6.6c-1.2,1.2-1.2,3.1,0,4.2c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9l6.6-6.6c1.2-1.2,1.2-3.1,0-4.2   C81.8,23.3,79.9,23.3,78.8,24.5z"></path><path d="M85.2,86.3c0-1.7-1.3-3-3-3c-1.4,0-2-0.5-3.3-1.7c-1.5-1.4-3.6-3.4-7.5-3.4c-3.9,0-6,2-7.5,3.4c-1.3,1.2-1.9,1.7-3.3,1.7   c-1.4,0-2-0.5-3.3-1.7c-1.5-1.4-3.6-3.4-7.5-3.4s-6,2-7.5,3.4c-1.3,1.2-1.9,1.7-3.3,1.7s-2-0.5-3.3-1.7c-1.5-1.4-3.6-3.4-7.5-3.4   s-5.9,2-7.5,3.4c-1.3,1.2-1.9,1.7-3.3,1.7c-1.7,0-3,1.3-3,3s1.3,3,3,3c3.9,0,6-2,7.5-3.4c1.3-1.2,1.9-1.7,3.3-1.7   c1.4,0,2,0.5,3.3,1.7c1.5,1.4,3.6,3.4,7.5,3.4c3.9,0,6-2,7.5-3.4c1.3-1.2,1.9-1.7,3.3-1.7c1.4,0,2,0.5,3.3,1.7   c1.5,1.4,3.6,3.4,7.5,3.4c3.9,0,6-2,7.5-3.4c1.3-1.2,1.9-1.7,3.3-1.7c1.4,0,2,0.5,3.3,1.7c1.5,1.4,3.6,3.4,7.5,3.4   C83.9,89.3,85.2,87.9,85.2,86.3z"></path></g></svg>'+'&nbsp'+firstEpisodeArtist);

		var hasHovered=0;

		$( ".ar-div" ).on({
			mouseenter: function() {
				// remplissage des infos de la zone de preview en récupérant les attributs des liens
				var $this=$(this);
				hoverTimer=setTimeout(function(){
					clearTimeout(notHoverTimer);

					// affiche le contour ombré si la box s'affiche alors qu'on a déjà scrollé
					var y = $(window).scrollTop();
					if (y > positionArchivePreview) {
					  $("#archivePreview").addClass('not-top');
					} else {
					  $("#archivePreview").removeClass('not-top');
					}

					// gère le comportement d'affichage de la zone selon qu'on a scrollé ou pas et en lien avec l'introStory
					if (hasHovered==0) {$("#introStory").removeClass("showIt").addClass("hideIt"); $("#archivePreview").removeClass("notHovered").addClass("sticky-top"); hasHovered++;}

					// attend que l'image soit chargé pour l'afficher
					var img = new Image();
					img.onload = function() { $("#archivePreview").find("img").attr("src",$this.find("a").attr("data-preview-guestPic")); }
					img.src = $this.find("a").attr("data-preview-guestPic");
					setTimeout (function(){
						if ($("#archivePreview").find("img").attr("src")!=$this.find("a").attr("data-preview-guestPic"))
							{ $("#archivePreview").find("img").attr("src",""); }
					},10)

					// chargement des infos de texte
					$("#archivePreview").find("h1").text($this.find("a").attr("data-preview-h1"));
					$("#archivePreview").find("h2").text($this.find("a").attr("data-preview-h2"));


					$("#previewPostTracks li").each(function(i){
						$(this).text($this.find("a").attr("data-preview-tracks"+(i+1)+"_title"));
						$(this).attr("class",$this.find("a").attr("data-preview-tracks"+(i+1)+"_color"))
					})

				},10); //timeout helps prevent flickering of all the stuff when mouse navigate over the area. 

			}, 
			mouseleave: function() {
				//console.log("div out");
				clearTimeout(hoverTimer);
				notHoverTimer=setTimeout(function(){
					$("#introStory").removeClass("hideIt").addClass("showIt"); $("#archivePreview").removeClass("sticky-top").addClass("notHovered");
					$("#archivePreview").removeClass('not-top');
					hasHovered=0;
				},500)
			}
		})

		// add shadow to sticky preview
		$(window).on("scroll",function() {
			if (hasHovered==1){
			  var y = $(window).scrollTop();
			  if (y > positionArchivePreview) {
			    $("#archivePreview").addClass('not-top');
			  } else {
			    $("#archivePreview").removeClass('not-top');
			  }
			};
		});

		// this cuty scroll to top button :)
		var clikedOnCuty=0
		$(window).on("scroll",function() {
		  var y = $(window).scrollTop();
		  if (y > 200) {
		  	if (clikedOnCuty==0){
		  		$("#scrollUp").addClass('showIt');
		  	}
		  } else {
		    $("#scrollUp").removeClass('showIt');
		  }
		});

		$("#scrollUp").on("click", function(){
			$("#scrollUp").removeClass('showIt');
			clikedOnCuty++;
			$("html, body").animate({ scrollTop: 0 }, "slow",function(){
				clikedOnCuty=0;
			});
		});
	}
);
