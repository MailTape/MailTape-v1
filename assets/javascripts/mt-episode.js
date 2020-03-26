$(document).ready(
	function() {

		// chargement modules de bootstrap pour afficher les tooltip et modales
		$('[data-toggle="tooltip"]').tooltip()

		// changer la classe css sur les éléments du player au moment du lancement pour montrer quel son est joué
		var isPlaying=false;
    	function playTape () {
    		if (!isPlaying) {
	    		isPlaying=true;
	    		$(".notPlaying").addClass("isPlaying").removeClass("notPlaying");
	    		$('#player').addClass("sticky-top");
			}
    	}

		$(".playlist").on("click",function() {
			playTape();
		});

		$("#playButton").on("click",function() {
			playTape();
		});

		$("#playButtonAsidePlaylist").on("click",function() {
			playTape();
		});

		// module permettant de fixer le player en haut de l'écran si lecture en cours
		// TODO check au début si déjà à un niveau où le player devrait être collé en haut
		// TODO check état player. si c'est en train de play quid si: - on fait pause OU - on joue une autre track
	
		var navYposition = $('#player').offset().top;
		//console.log("navYposition= "+navYposition);

		$(window).on("scroll",function() {
		  var y = $(window).scrollTop();
		  //console.log("y= "+y);
		  if(isPlaying){

			if (y > navYposition) {	
						
				$("#player").addClass('not-top');
				} else {
				$("#player").removeClass('not-top');
				}

			}
		});
		

		/* Teaser image swap function */
	    $("#logoLink").on("hover",function () {
	        $("#logo").src = '/img/Logo_Mailtape.gif';
	    }, function () {
	        $("#logo").src = '/img/Logo_Mailtape.png';
	    });


	    loadTracks();
	    connectSC();
		getTracksDuration();
		loadSounds();


// désactivé car pas certain que les gens aiment qu'on leur impose un scroll. A voir si ça influe sur les usages..
	// // petit défilement doux et lent qui se déclenche après la lecture pour plonger l'auditeur dans la lecture du texte..
 //    	var scrolledDown=false;
 //		var page = $("html, body");

 //    	$(".playlist a , #playButtonAsidePlaylist, #playButton").on("click",function() {

 //    	 	if (!scrolledDown && $(document).scrollTop()<100) {
	//     	 	setTimeout(function(){

	//     	 	page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
 //  					page.stop();
	// 			});

	//     		page.animate({
	// 				scrollTop: $("#player").offset().top+1
	// 				}, 20000, 'easeInOutSine' , function(){
	// 					page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
	// 				});
	//     		}, 5000);
	//     		scrolledDown=true;
 //    	 	}
 //    	});

// mini fleur musicolor

		// toggle() function deprecated in jQuery 1.9. Here it is then to keep musiColor action working.
		$.fn.toggleClick = function(){
	    	var functions = arguments ;
		    return this.on("click",function(){
		            var iteration = $(this).data('iteration') || 0;
		            functions[iteration].apply(this, arguments);
		            iteration = (iteration + 1) % functions.length ;
		            $(this).data('iteration', iteration);
		    });
		};

    	var timeoutMusiColorMiniIcon;
    	$("#musiColorMiniIcon").toggleClick(function(){
    			$(".icon-control").addClass("musiColorHelperVisible");
    			setTracksWidth ([1,1,1,1,1,1,1]);
				$(".musiColorHelper").fadeIn(1000);
				timeoutMusiColorMiniIcon = setTimeout(function() {
					$("#musiColorMiniIcon").trigger("click");
				},5000);
			}, function() {
				$(".icon-control").removeClass("musiColorHelperVisible");
				setTracksWidth (tracksDuration);
				$(".musiColorHelper").fadeOut(500);
				clearTimeout(timeoutMusiColorMiniIcon);
			}
    	);


	    // select randomly 3 related episodes to display

	    // récupération des épisodes similaires et stockage dans un array pour sélection au hasard

	    if (typeof relatedEpisodes_numbers[0] !== 'undefined') {

		    var relatedEpisodes_preselection = new Array();

		    for (var i = 0; i < relatedEpisodes_numbers.length ; i++) {
	    		relatedEpisodes_preselection[i]=[relatedEpisodes_numbers[i],relatedEpisodes_guestNames[i],relatedEpisodes_URLs[i],relatedEpisodes_guestPics[i],relatedEpisodes_MusiColors[i]];
		    }
			
			// fonction shuffle utilisant the Fisher-Yates shuffle. + d'infos: http://bost.ocks.org/mike/shuffle/
			function shuffle(array) {
		 	 	var m = array.length, t, i;

		 	 // While there remain elements to shuffle…
			  while (m) {

			    // Pick a remaining element…
			    i = Math.floor(Math.random() * m--);

			    // And swap it with the current element.
			    t = array[m];
			    array[m] = array[i];
			    array[i] = t;
			  }

			  return array;
			}

			// extraction dans un array de 3 episodes relatifs parmi la preselection
			var relatedEpisodes_selection = shuffle(relatedEpisodes_preselection).slice(0, 6);

			for (var i = 0; i < 6; i++) {
				$("#relatedEpisode_a_"+(i+1)).attr("data-stretch","//images.weserv.nl/?url=ssl:www.mailta.pe"+relatedEpisodes_selection[i][3]+"&w=400&t=fit&il");
				$("#relatedEpisode_a_"+(i+1)).attr("href",relatedEpisodes_selection[i][2]);
				$("#relatedEpisode_h2_"+(i+1)).html('<span class="re-hash">#'+relatedEpisodes_selection[i][0]+"&nbsp;"+"</span><br/>"+relatedEpisodes_selection[i][1]);
				$("#relatedEpisode_img_"+(i+1)).attr("src","//images.weserv.nl/?url=ssl:www.mailta.pe"+relatedEpisodes_selection[i][4]+"&il");
			}

		}

		// affichage des images avec module d'adaptation responsive
		$(".stretchMe").each(function(index){
			$(this).backstretch($(this).attr('data-stretch'));
		});

		//toDo: sccript de redimensionnement automatique des titres de sons qui pourraient etre trop long et prendre 2 lignes. Probleme vu sur mobile.
		
		// affichage de la nouvelle version des credits à partir de l'épisode 200
		if ($("#illustrator").html() != "Illustrator: ") {
			$("#credit").removeClass("d-none");
		}
		else {
			$("#signature").removeClass("d-none");
		}

	}
);
