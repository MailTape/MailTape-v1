$(document).ready(
	function() {

	// $("#bigTitle").fitText(0.6);
	$("#underBigTitle").fitTextV(2.5);
	$(".stretchMe").anystretch();

	$('#playButton').flowtype({
	 minimum   : 679,
	 maximum   : 1110,
	 minFont   : 40,
	 maxFont   : 250,
	 fontRatio : 4, // A modifier au cas par cas ! -- Règle la largeur du titre
	 lineRatio : 0.7 // A modifier au cas par cas ! -- Règle la hauteur de ligne du titre
	});

	 $('body').flowtype({
	 minimum   : 500,
	 maximum   : 1110,
	 minFont   : 12,
	 maxFont   : 28,
	 fontRatio : 65, // A modifier au cas par cas ! -- Règle la largeur du titre
	 lineRatio : 1.8 // A modifier au cas par cas ! -- Règle la hauteur de ligne du titre
	});

	$(".musicolorLabel").lettering();

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
				$( "#archives" ).load( "/Archives.html", function() {
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
	        $("#logo").src = '/img/Logo_Mailtape.gif';
	    }, function () {
	        $("#logo").src = '/img/Logo_Mailtape.png';
	    });

	// connextion à l'api soundcloud
		  SC.initialize({
		    client_id: "5eaa5aae9b1a116f58b43027a7a2206d",
		  });

	// module de redimensionnement auto de la taille des tracks dans la playlist en fonction de leur durée
		function setTracksWidth (tracksDuration) {
			var totalDuration = tracksDuration[0]+tracksDuration[1]+tracksDuration[2]+tracksDuration[3]+tracksDuration[4]+tracksDuration[5]+tracksDuration[6];
			var percentUnit = "%";
			for (i=0;i<7;i++){
				$(".track"+(i+1)).width(((tracksDuration[i]/totalDuration)*100-1)+percentUnit);
			}
			
		}

	// module de récupération de la duration de tracks directement à partir de l'archivpi soundcloud
		var	tracksDuration=[1,1,1,1,1,1,1];

		function getTracksDuration () {
			var count = tracksURL.length
			$.each(tracksURL,function(i,trackURL){
				SC.get('/resolve', { url: trackURL }, function(track){
					tracksDuration[i]=Math.round(track.duration/1000);
					count--;
					if (count == 0)
					//we got all answers (thx Bluxte!)
						{
						setTracksWidth(tracksDuration);
						}
				});
			});
		}

		getTracksDuration();



	// module permettant un affichage progressif des archives au fur et à mesure que l'user scroll
		var archive_n=126;
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

	// module permettant d'insérer les titres des sons directement à partir la liste fournie
		$.each(tracksTitle,function(i,trackTitle){
				$("#track"+(i+1)+"_title_player").html(trackTitle);
				$("#track"+(i+1)+"_title_link").html(trackTitle);
				$("#track"+(i+1)+"_title_featured").html(trackTitle);
			})

	// module de gestion de l'api soundcloud afin de jouer les sons directement à partir du stream SC
			
		$.each(tracksURL,function(i,trackURL){

			SC.get('/resolve', { url: trackURL }, function(track){
				$("#track"+(i+1)+"_link").prop("href", trackURL);
				if (track.streamable == true) {
					$("#track"+(i+1)+"_button").prop("href", track.stream_url+"?client_id=5eaa5aae9b1a116f58b43027a7a2206d");
					console.log("Track:"+(i+1)+" "+track.title+" OK! (Streamable and url updated)");
				} else {
					console.error("/!\\"+"Track:"+(i+1)+" "+track.title+" NOT STREAMABLE ! URL NOT MODIFIED !");
	//					alert("/!\\"+"Track:"+(i+1)+" "+track.title+" NOT STREAMABLE ! URL NOT MODIFIED !");
				}
			});

		});


		//toDo: sccript de redimensionnement automatique des titres de sons qui pourraient etre trop long et prendre 2 lignes. Probleme vu sur mobile.
	}
);