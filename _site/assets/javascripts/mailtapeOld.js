$(document).ready(
	function() {

		//cas où l'user clique directement sur l'une des track au lieu du gros play
		$(".playlist").click(function() {
			$("#playButton").fadeOut("slow");
		});


		//scroll automatique si  player non visible par l'user
		$("#playButton").click(function() {
			if ($(window).height() + $(document).scrollTop() <= $('#player').offset().top + $("#player").height() * 3) {
				$("html, body").animate({
					scrollTop: $('#player').offset().top - $(window).height() + $("#player").height() * 3
				}, 1000);
			}
		});

		$("#archivesButton").click(function() {
			$("html, body").animate({
				scrollTop: $('#archives').offset().top
			}, 1000);
		});

		/* Teaser image swap function */
	    $("#logoLink").hover(function () {
	        $("#logo").src = 'img/Logo_Mailtape.gif';
	    }, function () {
	        $("#logo").src = 'img/Logo_Mailtape.png';
	    });

		function setTracksWidth (tracksDuration) {
			var totalDuration = tracksDuration[0]+tracksDuration[1]+tracksDuration[2]+tracksDuration[3]+tracksDuration[4]+tracksDuration[5]+tracksDuration[6];
			var percentUnit = "%";
			for (i=0;i<7;i++){
				$(".track"+(i+1)).width(((tracksDuration[i]/totalDuration)*100-1)+percentUnit);
			}
			
		}

		setTracksWidth(tracksDuration);

		//toDo: sccript de redimensionnement automatique des titres de sons qui pourraient etre trop long et prendre 2 lignes. Probleme vu sur mobile.

	}

);