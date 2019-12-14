$(document).ready(
	function() {

		// chargement modules de bootstrap pour afficher les tooltip et modales
		$('[data-toggle="tooltip"]').tooltip()


		// module de check du chargement de l'api Soundcloud
		var alertSC=false;
		function checkSC(){
			if(typeof SC !== 'undefined'){
				return "ok";
			}
			else {
				if (!alertSC){
					$( '<div class="container"><div class="col-12 alert alert-danger" role="alert">😱 Connection to Soundcloud unavailable, some tracks may be missing. Please check your plugins (uBlock, Privatebadger, etc) and allow <strong>connect.soundcloud.com</strong> and <strong>api.soundcloud.com</strong>. Or SoundCloud server is down, <a href="https://isitdownforme.net/connect.soundcloud.com" target="_blank">check it</a>. If you keep seeing this message and don\'t know what to do, feel free to <a href="mailto:crew@mailta.pe">contact us</a>.</div></div>' ).insertAfter("#bigHeader");
					alertSC=true;
				}
				return null;
			}
		}

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

	// connextion à l'api soundcloud
	if(checkSC()) {
		SC.initialize({
		client_id: "5eaa5aae9b1a116f58b43027a7a2206d",
		});
	}

	// module de redimensionnement auto de la taille des tracks dans la playlist en fonction de leur durée
		function setTracksWidth (tracksDuration) {
			var totalDuration = tracksDuration[0]+tracksDuration[1]+tracksDuration[2]+tracksDuration[3]+tracksDuration[4]+tracksDuration[5]+tracksDuration[6];
			var percentUnit = "%";
			for (i=0;i<7;i++){
				$(".track"+(i+1)).width((tracksDuration[i]/totalDuration*100-0.2)+percentUnit);
			}
			//console.log("redimensionnement good sir!");
			
		}

	// module de récupération de la duration de tracks directement à partir de l'api soundcloud
		var	tracksDuration=[1,1,1,1,1,1,1];

	// array contenant les fichiers audios qui ne viendraient pas de soundcloud
		var audios=[];
		var externalAudioCount=0;

		function getTracksDuration () {
			var count = tracksURL.length;
			$.each(tracksURL,function(i,trackURL){
				if (trackURL.search( 'soundcloud' ) != -1) {
					if (checkSC()) {
						SC.get('/resolve', { url: trackURL }, function(track){
						
							if (track.duration) {tracksDuration[i]=track.duration/1000;
							//console.log("GOGO:"+track.duration/1000);
							count--;
							}

							//empêche de casser le musicolor en cas de musique non récupérable en attendant de trouver un fix
							if (count == 0) { //we got all answers (thx Bluxte!)
								setTracksWidth(tracksDuration);
							}
						});
					}
					else {
						// je récupère ici le cas d'erreur au-dessus dans le cas où SC n'est pas reachable
						if (count == 0) {
							setTracksWidth(tracksDuration);
						}
					}
				}

				else { // dans le cas où le fichier ne provient pas de soundcloud
					externalAudioCount++;
					// console.log("nombre de sons hebergés à l'extérieur: "+externalAudioCount);
					if (externalAudioCount < 6) {
						audios[i] = new Audio(trackURL);
						// console.log("socket "+i+" utilisé");
						audios[i].addEventListener('canplaythrough', function() {
							// alert("trackURL: "+audios[i].src+" duration: "+audios[i].duration);
							//console.log("AMZ shit: "+Math.round(audios[i].duration));
						    tracksDuration[i]=Math.round(audios[i].duration);
							count--;
							if (count == 0) { //we got all answers (thx Bluxte!)
								setTracksWidth(tracksDuration);
							}
						});
					}
					else console.warn("Simulatenous socket limitation reached. Won't be able to display musiColor with proportion relative to audio duration.");
				}
			});
		}

		getTracksDuration();


	// module permettant d'insérer les titres des sons directement à partir la liste fournie
		$.each(tracksTitle,function(i,trackTitle){
				$("#track"+(i+1)+"_title_player").html(trackTitle);
				$("#track"+(i+1)+"_title_link").html(trackTitle);
				$("#track"+(i+1)+"_title_featured").html(trackTitle);
			})

	// module de gestion de l'api soundcloud afin de jouer les sons directement à partir du stream SC
			
		$.each(tracksURL,function(i,trackURL){
			if (trackURL.search( 'soundcloud' ) != -1) {
				if (checkSC()) {
					SC.get('/resolve', { url: trackURL }, function(track,error){

						if (error) {
							console.error("/!\\"+"Track:"+(i+1)+" "+" NOT FOUND ! A curator gotta fix this!");
							$("#track"+(i+1)+"_button").prop("href", "https://s3.eu-west-3.amazonaws.com/mailtapesounds/missingTrack.mp3");
						}

						else if (track.streamable == true) {
							$("#track"+(i+1)+"_link").prop("href", "trackURL");
							$("#track"+(i+1)+"_button").prop("href", track.stream_url+"?client_id=5eaa5aae9b1a116f58b43027a7a2206d");
							console.log("Track:"+(i+1)+" "+track.title+" OK! (Streamable and url updated)");
						} 

						else if (track.streamable == false) {
							console.error("/!\\"+"Track:"+(i+1)+" "+track.title+" NOT STREAMABLE ! A curator gotta fix this!");
								// alert("/!\\"+"Track:"+(i+1)+" "+track.title+" NOT STREAMABLE ! You gotta fix this darling ;)");
						}
						
					});
				}
				else
				{
					console.error("/!\\"+"Track:"+(i+1)+" "+" CAN'T BE STREAMED BECAUSE connect.soundcloud.com not reachable ! Check your browser plugins ;)");
					$("#track"+(i+1)+"_button").prop("href", "https://s3.eu-west-3.amazonaws.com/mailtapesounds/missingTrack.mp3");
				}
			}

			else if (trackURL.search( 'amazonaws' ) != -1) {
				$("#track"+(i+1)+"_link").removeAttr("href").removeAttr("target").removeAttr("onclick");
				$("#track"+(i+1)+"_link").addClass("linkNotAvailable");
				$("#track"+(i+1)+"_link").attr("title","Sorry, link not available on SoundCloud :(");

				$("#track"+(i+1)+"_button").prop("href", trackURL);
			}
		});

	    		$(".playlist").on("click",function() {
			$("#playButton").fadeOut("slow");
		});


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

	    var relatedEpisodes_preselection = new Array();

	    for (var i = 0; i < relatedEpisodes_numbers.length ; i++) {
	    	if (relatedEpisodes_numbers[i]) {
	    		relatedEpisodes_preselection[i]=[relatedEpisodes_numbers[i],relatedEpisodes_guestNames[i],relatedEpisodes_URLs[i],relatedEpisodes_guestPics[i],relatedEpisodes_MusiColors[i]];
	    	}
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
