$(document).ready(
	function() {

		$('[data-toggle="tooltip"]').tooltip();
		$('[data-toggle="popover"]').popover();

		var page = $("html, body");

		$(".stretchMe").anystretch();

		// changer la classe css sur les éléments du player au moment du lancement pour montrer quel son est joué
		var isPlaying=false;
    	function playTape () {
    		if (!isPlaying) {
	    		isPlaying=true;
	    		$(".notPlaying").addClass("isPlaying").removeClass("notPlaying");
			}
    	}

		$(".playlist").click(function() {
			playTape();
		});

		$("#playButton").click(function() {
			playTape();
		});

		$("#playButtonAsidePlaylist").click(function() {
			playTape();
		});
    	


		// module permettant de fixer le player en haut de l'écran si lecture en cours
		// TODO check au début si déjà à un niveau où le player devrait être collé en haut
		// TODO check état player. si c'est en train de play quid si: - on fait pause OU - on joue une autre track

	    didScroll = false;
	    var navYposition = $('#player').offset().top;
	    $(window).scroll(function() {
	    	if (isPlaying) {
		        didScroll = true;
		        // console.log("hauteur du player: "+$('#player').innerHeight());
		        // console.log("position du player depuis le top :"+($('#player').offset().top));
		    }
	    });
	     
	    setInterval(function() {
	        if ( didScroll ) {
	            didScroll = false;
	            
	            if ($(document).scrollTop() >= navYposition) {
		            $('#player').addClass("navbar-fixed-top");
		            $('body').css("padding-top",$('#player').innerHeight());
		        } else {
		        	$('body').css("padding-top","");
		            $('#player').removeClass("navbar-fixed-top");
		        }
	        }
	    }, 10);
		

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
				SC.get('/resolve', { url: trackURL }, function(track,error){

					if (error) {
						console.error("/!\\"+"Track:"+(i+1)+" "+" NOT FOUND ! You gotta fix this darling ;)");
						$("#track"+(i+1)+"_button").prop("href", "https://s3.eu-west-3.amazonaws.com/mailtapesounds/missingTrack.mp3");
					}

					else if (track.streamable == true) {
						$("#track"+(i+1)+"_link").prop("href", "trackURL");
						$("#track"+(i+1)+"_button").prop("href", track.stream_url+"?client_id=5eaa5aae9b1a116f58b43027a7a2206d");
						console.log("Track:"+(i+1)+" "+track.title+" OK! (Streamable and url updated)");
					} 

					else if (track.streamable == false) {
						console.error("/!\\"+"Track:"+(i+1)+" "+track.title+" NOT STREAMABLE ! You gotta fix this darling ;)");
							// alert("/!\\"+"Track:"+(i+1)+" "+track.title+" NOT STREAMABLE ! You gotta fix this darling ;)");
					}
					
				});
			}

			else if (trackURL.search( 'amazonaws' ) != -1) {
				$("#track"+(i+1)+"_link").removeAttr("href").removeAttr("target").removeAttr("onclick");
				$("#track"+(i+1)+"_link").addClass("linkNotAvailable");
				$("#track"+(i+1)+"_link").attr("title","Sorry, link not available on SoundCloud :(");

				$("#track"+(i+1)+"_button").prop("href", trackURL);
			}

		});

	    		$(".playlist").click(function() {
			$("#playButton").fadeOut("slow");
		});


// signup form validation for iris (byebye MailChimp!)

$("#topbar-signup-form").submit(function(e){
		e.preventDefault(); 

		var name;
		var email;
		
		var $Form = $(this),
		name = $Form.find('input[name="topbar-name"]').val(),
		email = $Form.find('input[name="topbar-email"]').val(),
		url = $Form.attr('action');

		console.log("data before post: "+name+" - "+email+" - "+url)

		$.post(url, {name:name, email:email,list:"2Ac42P4mkTBXOJheBtYLzQ",boolean:"true"},
		  function(data) {
		  		//console.log("data: "+data);
		      if(data)
		      {
		      	if(data=="Some fields are missing.")
		      	{
			      	$("#topbar-status").text("Please fill in your name and email.");
			      	$("#topbar-status").css("color", "red");
		      	}
		      	else if(data=="Invalid email address.")
		      	{
			      	$("#topbar-status").text("Your email address is invalid.");
			      	$("#topbar-status").css("color", "red");
		      	}
		      	else if(data=="Invalid list ID.")
		      	{
			      	$("#topbar-status").text("Your list ID is invalid.");
			      	$("#topbar-status").css("color", "red");
		      	}
		      	else if(data=="Already subscribed.")
		      	{
			      	$("#topbar-status").text("You're already subscribed!");
			      	$("#topbar-status").css("color", "red");
		      	}
		      	else
		      	{
			      	$("#topbar-status").text("Oh yeah "+name+"!");
			      	$("#topbar-status").css("color", "green");
			      	$("#topbar-subscribeButton").fadeOut('slow');
			      	$("#mobile-subscribeButton").fadeOut('slow');
			      	_paq.push(['trackEvent', 'newfollower', 'topbar-signup-form']);

			      	setTimeout(function() {
	    				$('#topbar-subscription-form').fadeOut('slow');
					}, 1000);
		      	}
		      }
		      else
		      {
		      	$("#topbar-status").text("Sorry, unable to subscribe. If you keep seeing this error, please contact us!");
		      	$("#topbar-status").css("color", "red");
		      	//alert("Sorry, unable to subscribe. If you keep seeing this error, please contact us!");
		      }
		  }
		);
	});
	$("#topbar-signup-form").keypress(function(e) {
		    if(e.keyCode == 13) {
		    	e.preventDefault(); 
				$(this).submit();
		    }
		});
	$("#topbar-subscribeButton").click(function(e){
		e.preventDefault(); 
		$("#topbar-signup-form").submit();
	});

// same stuff for mobile form


$("#mobile-signup-form").submit(function(e){
		e.preventDefault(); 
		
		var name;
		var email;

		var $Form = $(this),
		name = $Form.find('input[name="mobile-name"]').val(),
		email = $Form.find('input[name="mobile-email"]').val(),
		url = $Form.attr('action');

		console.log("data before post: "+name+" - "+email+" - "+url)
		
		$.post(url, {name:name, email:email,list:"2Ac42P4mkTBXOJheBtYLzQ",boolean:"true"},
		  function(data) {
		  	console.log("data: "+data);
		      if(data)
		      {
		      	if(data=="Some fields are missing.")
		      	{
			      	$("#mobile-status").text("Please fill in your name and email.");
			      	$("#mobile-status").css("color", "red");
		      	}
		      	else if(data=="Invalid email address.")
		      	{
			      	$("#mobile-status").text("Your email address is invalid.");
			      	$("#mobile-status").css("color", "red");
		      	}
		      	else if(data=="Invalid list ID.")
		      	{
			      	$("#mobile-status").text("Your list ID is invalid.");
			      	$("#mobile-status").css("color", "red");
		      	}
		      	else if(data=="Already subscribed.")
		      	{
			      	$("#mobile-status").text("You're already subscribed!");
			      	$("#mobile-status").css("color", "red");
		      	}
		      	else
		      	{
			      	$("#mobile-status").text("You're now subscribed "+name+"!");
			      	$("#mobile-status").css("color", "green");
			      	_paq.push(['trackEvent', 'newfollower', 'mobile-signup-form']);


			      	setTimeout(function() {
	    				$('#mobile-subscription').fadeOut('slow');
					}, 1000);
		      	}
		      }
		      else
		      {
		      	alert("Sorry, unable to subscribe. If you keep seeing this error, please contact us!");
		      }
		  }
		);
	});

	$("#mobile-signup-form").keypress(function(e) {
		    if(e.keyCode == 13) {
		    	e.preventDefault(); 
				$(this).submit();
		    }
		});
	$("#mobile-subscribeButton").click(function(e){
		e.preventDefault(); 
		$("#mobile-signup-form").submit();
	});


	// script de lecture des paramètre de l'url
		function getParameterByName(name) {
		    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		        results = regex.exec(location.search);
		    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}

	// detection si l'user provient d'un mail

		function isFromEmail(){
			var utm_medium = getParameterByName('utm_medium');

			if (utm_medium=="email") {
				return true;
			}
		}

	// adaptation layout si user vient du mail

		if (isFromEmail()) {
			console.log("You're coming from our mail ! Hello dear subscriber :)");
			$('#topbar-subscription').removeClass("hidden-xs").hide();
			var comingFromMail =true;

		}

// catch erreur lorsque iris (serveur mailing) est dead
$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
  if ( settings.url == "https://iris.mailta.pe/subscribe.php" ) {
    alert("Sorry, unable to subscribe. 😣 If you keep seeing this error, please contact us! > crew@mailta.pe 🙏");
  }
});


// désactivé car pas certain que les gens aiment qu'on leur impose un scroll. A voir si ça influe sur les usages..
	// // petit défilement doux et lent qui se déclenche après la lecture pour plonger l'auditeur dans la lecture du texte..
 //    	var scrolledDown=false;

 //    	$(".playlist a , #playButtonAsidePlaylist, #playButton").click(function() {

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

// zone en savoir plus en footer

    	$("#footerLearnMore").click(function(){
    		$(this).fadeOut('slow');
			$(".footerLearnMoreArea").delay(500).fadeIn(2000);
    	// 	page.animate({
					// scrollTop: $(".footerLearnMoreArea").offset().top+1
					// },5000,'easeOutBack',
	    // 		, 100);
    	});

// mini fleur musicolor
    	var timeoutMusiColorMiniIcon;
    	$("#musiColorMiniIcon").toggle(function(){
    			$(".icon-control").addClass("musiColorHelperVisible");
    			setTracksWidth ([1,1,1,1,1,1,1]);
				$(".musiColorHelper").fadeIn(1000);
				timeoutMusiColorMiniIcon = setTimeout(function() {
					$("#musiColorMiniIcon").click();
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

		//toDo: sccript de redimensionnement automatique des titres de sons qui pourraient etre trop long et prendre 2 lignes. Probleme vu sur mobile.
		
		// affichage de la nouvelle version des credits à partir de l'épisode 200
		if ($("#illustrator").html() != "Illustrator: ") {
			$("#credit").removeClass("hidden");
		}
		else {
			$("#signature").removeClass("hidden");
		}

	}
);
