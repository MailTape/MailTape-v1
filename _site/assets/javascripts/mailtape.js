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

		var archivesLoaded = false;

		$(".archivesButton").click(function() {
			if (archivesLoaded==false) {
				archivesLoaded=true;
				$( "#archives" ).load( "Archives.html", function() {
					$(".stretchMe").anystretch();
					$("html, body").animate({
					scrollTop: $('#archives').offset().top
						}, 1000);
					});
			}
			else
				{$("html, body").animate({
				scrollTop: $('#archives').offset().top
					}, 1000);}
		});

		/* Teaser image swap function */
	    $("#logoLink").hover(function () {
	        $("#logo").src = 'img/Logo_Mailtape.gif';
	    }, function () {
	        $("#logo").src = 'img/Logo_Mailtape.png';
	    });


// module de redimensionnement auto de la taille des tracks dans la playlist en fonction de leur durée
		function setTracksWidth (tracksDuration) {
			var totalDuration = tracksDuration[0]+tracksDuration[1]+tracksDuration[2]+tracksDuration[3]+tracksDuration[4]+tracksDuration[5]+tracksDuration[6];
			var percentUnit = "%";
			for (i=0;i<7;i++){
				$(".track"+(i+1)).width(((tracksDuration[i]/totalDuration)*100-1)+percentUnit);
			}
			
		}

		setTracksWidth(tracksDuration);

// module permettant un affichage progressif des archives au fur et à mesure que l'user scroll
		var archive_n=124;
        $(document).scroll(function() {

        	if (archive_n>0) {
				console.log("hauteur archive"+archive_n+" : "+$("#archive"+archive_n).offset().top);
	        	console.log("hauteur actuelle :"+$(document).scrollTop());
	       		console.log("hauteur actuelle + taille fenêtre :"+($(document).scrollTop()+$(window).height()));


	            if ($("#archive"+archive_n).offset().top <= ($(document).scrollTop()+$(window).height())) {
	                console.log("archive dépassée: "+archive_n+" position : "+$("#archive"+archive_n).offset().top);
	                archive_n=archive_n-10;
	                $("#archive"+archive_n).show();$("#archive"+(archive_n+1)).show();$("#archive"+(archive_n+2)).show();$("#archive"+(archive_n+3)).show();$("#archive"+(archive_n+4)).show();$("#archive"+(archive_n+5)).show();$("#archive"+(archive_n+6)).show();$("#archive"+(archive_n+7)).show();$("#archive"+(archive_n+8)).show();$("#archive"+(archive_n+9)).show();
	                console.log("archive affichée: "+archive_n+" position : "+$("#archive"+archive_n).offset().top);
	            }
	        }
        });


		//toDo: sccript de redimensionnement automatique des titres de sons qui pourraient etre trop long et prendre 2 lignes. Probleme vu sur mobile.

	}

);