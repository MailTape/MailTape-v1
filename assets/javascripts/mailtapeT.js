$(document).ready(
	function() {

		$('[data-toggle="tooltip"]').tooltip();
		$('[data-toggle="popover"]').popover();

		var page = $("html, body");

		// TEST en cours de désactivation

		$(".stretchMe").anystretch();

		// permet de faire pointer tous les liens dans un nouvel onglet
		//$('a').attr('target','_blank');
		// désactivé, plus chiant qu'autre chose au final et les gens savent ouvrir un onglet si besoin.

		// $('#bigHeader h1').flowtype({
  //        minimum   : 100,
  //        maximum   : 1110,
  //        minFont   : 12,
  //        maxFont   : 90,
  //        fontRatio : 7 // version fixée pour tt les épisode
  //        // fontRatio : fontRatioBigTitle // Version si on prend le cas par cas épisode
  //        });

		$('#bigHeader h1').fitText(0.7);

		$('#bigHeader h2').flowtype({
         minimum   : 100,
         maximum   : 1110,
         minFont   : 10,
         maxFont   : 30,
         fontRatio : 45 // A modifier au cas par cas ! -- Règle la largeur du titre
         });

		$('#playButton').flowtype({
		 minimum   : 500,
		 maximum   : 1110,
		 minFont   : 30,
		 maxFont   : 100,
		 fontRatio : 6, // A modifier au cas par cas ! -- Règle la largeur du titre
		});

		 $('body').flowtype({
		 minimum   : 300,
		 maximum   : 750,
		 minFont   : 12,
		 maxFont   : 21,
		 fontRatio : 42, // A modifier au cas par cas ! -- Règle la largeur du titre
		});

		$(".musicolorLabel").lettering();
		var isPlaying=false;

    	function playTape () {
    		if (!isPlaying) {
	    		isPlaying=true;
	    		$(".notPlaying").addClass("isPlaying").removeClass("notPlaying");
			}
    	}

    	$("#readMore").click(function() {
    		$("#readMore").fadeOut('slow');
    		page.animate({
				scrollTop: $('#player').offset().top+1
			}, 1000);
    	});

		//cas où l'user clique directement sur l'une des track au lieu du gros play
		$(".playlist").click(function() {
			playTape();
		});


		//scroll automatique si  player non visible par l'user et met aussi en avant mieux le player et l'article qui le suit.
		$("#playButton").click(function() {
			playTape();
		});

		//scroll automatique si  player non visible par l'user et met aussi en avant mieux le player et l'article qui le suit.
		$("#playButtonAsidePlaylist").click(function() {
			playTape();
		});
    	


		// fixage en haut du player lorsqu'on dépasse son niveau au scroll
		// TODO check au début si déjà à un niveau où le player devrait être collé en haut
		// TODO check état player. si c'est en train de play quid si: - on fait pause OU - on joue une autre track

	    didScroll = false;
	    var navYposition = $('#player').offset().top+1;
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
					audios[i] = new Audio(trackURL);
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
				SC.get('/resolve', { url: trackURL }, function(track){
					$("#track"+(i+1)+"_link").prop("href", trackURL);
					if (track.streamable == true) {
						$("#track"+(i+1)+"_button").prop("href", track.stream_url+"?client_id=5eaa5aae9b1a116f58b43027a7a2206d");
						console.log("Track:"+(i+1)+" "+track.title+" OK! (Streamable and url updated)");
					} 
					if (track.streamable == false) {
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

			else {
				console.error("/!\\"+"Track:"+(i+1)+" "+trackURL+" ERROR ! URL Vide ou ne provenant ni de soundcloud, ni de amazon. Check it ;)");
				$("#track"+(i+1)+"_link").addClass("linkNotAvailable");
				$("#track"+(i+1)+"_link").attr("title","Sorry, link not available on SoundCloud :(");
				$("#track"+(i+1)+"_button").prop("href", trackURL);

			}
		//					alert("/!\\"+"Track:"+(i+1)+" "+track.title+" NOT STREAMABLE ! URL NOT MODIFIED !");

		});

	    		$(".playlist").click(function() {
			$("#playButton").fadeOut("slow");
		});

	    // subscribe button intro !

	 //    	// [FROSMO] Detection si on a l'intro displayed ou pas

		// var countInit = 0;

		// function superInit() {
		// 	if ($('#topbar-subscription-intro').length) {
		// 	    $('#topbar-subscription-form').fadeOut("fast");
		// 	    console.log("[FROSMO] topbar-subscription-intro est là je cache la form!");
		// 	} else if (countInit < 100) {
		// 		console.log("[FROSMO] topbar-subscription-intro pas là pour le moment");
		// 	    countInit++;
		// 		window.setTimeout(superInit, 100);
		// 	}
		// }

		// // Premier lancement
		// window.setTimeout(superInit, 100);
	
		// 	// Mini scriptounet pour la topbar subscription en 2 étapes
		// $(document).on('click', '#subscribeButtonIntro',function(){
		// 	console.log("tu clique sur le bouton intro");
		// 	$('#topbar-subscription-intro').fadeOut("fast");
		// 	$('#topbar-subscription-form').fadeIn("slow", function () {
		// 		console.log("je charge ajaxchimp");
		// 		$('#mc-form').ajaxChimp({
		//     	callback: callbackFunction
		//     	});
		//     });
		// });

	//	plugin d'ajaxification du formulaire mailchimp topbarsubscription

		$('#mc-form').ajaxChimp({
	    	callback: callbackFunction
	    });

	    function callbackFunction (resp) {
		    if (resp.result == 'success') {
		    	var prenom = $( "#mc-PRENOM" ).val();
		        $('#mc-form').fadeOut('fast', function() {
		        	$('#footerSubscription-form-text').html("Thank's "+prenom+", you're gonna love Sunday morning. We've just sent you a confirmation email !");
		        	_gaq.push(['_trackEvent', 'CTA Episode', 'Subscribe', 'Submitted info']);
		        	try {mixpanel.track("EP > Top Bar Subscription > Step 2, Subscribed");} catch(e) {}
		        });
		        setTimeout(function() {
	    			$('#footerSubscription').removeClass("hidden-xs").fadeOut('slow');
	    			$('#mc-sidebar').fadeOut('slow'); // fais aussi disparaitre la sidebar de subscription
	    			$('.rightSide h1:nth-of-type(1)').css('margin-top','0'); // fais aussi disparaitre la sidebar de subscription
				}, 7000);
		    }
		}

		//	plugin d'ajaxification du formulaire mailchimp de la sidebar

		$('#mc-sidebar-form').ajaxChimp({
	    	callback: callbackFunctionSidebar
	    });

	    function callbackFunctionSidebar (resp) {
		    if (resp.result == 'success') {
		    	var prenom = $( "#mc-sidebar-PRENOM" ).val();
		        $('#mc-sidebar-form').fadeOut('fast', function() {
		        	if (isFromEmail()) {
		        		$('#mc-sidebar h1').html("You're beautiful !");
		        		$('#mc-sidebar h2').html(prenom+" will receive a confirmation email, be sure to let your dear friend know it's coming from you !");
		        		_gaq.push(['_trackEvent', 'CTA Episode', 'Subscribe', 'Subscribed a friend']);
		        		try{mixpanel.track("EP > Sidebar Friends Subscription > Subscribed a friend");} catch(e) {}
		        	} else {
			        	$('#mc-sidebar h1').html("Yo "+prenom+" !");
			        	$('#mc-sidebar h2').html("Thanks, we've just sent you a confirmation email ;)");
			        	_gaq.push(['_trackEvent', 'CTA Episode', 'Subscribe', 'Subscribed from Sidebar']);
			        	try {mixpanel.track("EP > Sidebar Subscription > Subscribed from sidebar");} catch(e) {};
			        }
		        });
		         setTimeout(function() {
	    			$('#mc-sidebar').fadeOut('slow');
	    			$('.rightSide h1:nth-of-type(1)').css('margin-top','0');
	    			$('#footerSubscription').removeClass("hidden-xs").fadeOut('slow'); // fais aussi disparaitre la topbar de subscription
				}, 7000);
		    }
		}

	// script de lecture des paramètre de l'url
		function getParameterByName(name) {
		    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		        results = regex.exec(location.search);
		    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}

	// detection si l'user provient d'un mail

		function isFromEmail(){
			var utm_source = getParameterByName('utm_source');

			if (utm_source=="MailTape") {
				return true;
			}
		}

	// adaptation layout si user vient du mail

		if (isFromEmail()) {
			console.log("You're coming from our mail ! Hello dear subscriber :)");
			$('#footerSubscription').removeClass("hidden-xs").hide();
			var comingFromMail =true;

			// adaptation sidebar pour inviter ami

			$('#mc-sidebar h1').html("Love is to share");
		    $('#mc-sidebar h2').html("Subscribe a close friend.");
		    $('#mc-sidebar-EMAIL').attr("placeholder", "Your friend's email ?");
		    $('#mc-sidebar-PRENOM').attr("placeholder", "Your friend's name ?");
		    $('#sidebarSubscribeButton').html("Submit");

		}

	// la topbar d'abonnement n'est plus affichée. à voir ce qu'on en fait pour plus tard.
			// $('#topbar-subscription').removeClass("hidden-xs").hide();
			// $("#player").click(function() {
			// 	setTimeout(function(){
			// 		$('#topbar-subscription').addClass("hidden-xs").show();
			// 		page.animate({
			// 			scrollTop: ($(window).scrollTop() + $('#topbar-subscription').outerHeight())
			// 		}, 1);
			// 	},2000);

			// console.log("CUL3:"+$(window).scrollTop() + $('#topbar-subscription').outerHeight());
			// });

	// petit défilement doux et lent qui se déclenche après la lecture pour plonger l'auditeur dans la lecture du texte..
    	var scrolledDown=false;

    	$(".playlist a , #playButtonAsidePlaylist, #playButton").click(function() {

    	 	if (!scrolledDown && $(document).scrollTop()<100) {
	    	 	setTimeout(function(){

	    	 	page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
  					page.stop();
				});

	    		page.animate({
					scrollTop: $("#player").offset().top+1
					}, 20000, 'easeInOutSine' , function(){
						page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
					});
	    		}, 5000);
	    		scrolledDown=true;
    	 	}
    	});

    	$("#footerLearnMore").click(function(){
    		$(this).fadeOut('slow');
			$(".footerLearnMoreArea").delay(500).fadeIn(2000);
    	// 	page.animate({
					// scrollTop: $(".footerLearnMoreArea").offset().top+1
					// },5000,'easeOutBack',
	    // 		, 100);
    	});

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

	var relatedEpisodes = shuffle($(".relatedEpisode")).slice(0, 3);
	relatedEpisodes.fadeIn();

		//toDo: sccript de redimensionnement automatique des titres de sons qui pourraient etre trop long et prendre 2 lignes. Probleme vu sur mobile.
	}
);