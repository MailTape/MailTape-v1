$(document).ready(
	function() {

	// $("#bigTitle").fitText(0.6);
	$("#underBigTitle").fitTextV(2.5);
	$(".stretchMe").anystretch();

	// permet de faire pointer tous les liens dans un nouvel onglet
	//$('a').attr('target','_blank');

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


		//scroll automatique si  player non visible par l'user et met aussi en avant mieux le player et l'article qui le suit.
		$("#playButton").click(function() {
			if ($(window).height() + $(document).scrollTop() <= $('#player').offset().top + $("#player").height() * 9) {
				$("html, body").animate({
					scrollTop: $('#player').offset().top - $(window).height() + $("#player").height() * 9
				}, 1000);
			}
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

	// module de récupération de la duration de tracks directement à partir de l'api soundcloud
		var	tracksDuration=[1,1,1,1,1,1,1];

	// array contenant les fichiers audios qui ne viendraient pas de soundcloud
		var audios=[];

		function getTracksDuration () {
			var count = tracksURL.length;
			$.each(tracksURL,function(i,trackURL){
				if (trackURL.search( 'soundcloud' ) != -1) {
					SC.get('/resolve', { url: trackURL }, function(track){
						// console.log(Math.round(track.duration/1000));
						tracksDuration[i]=Math.round(track.duration/1000);
						count--;
						if (count == 0) { //we got all answers (thx Bluxte!)
							setTracksWidth(tracksDuration);
						}
					});
				}
				else { // dans le cas où le fichier ne provient pas de soundcloud
					audios[i] = new Audio(trackURL);
					audios[i].addEventListener('canplaythrough', function() {
						// alert("trackURL: "+audios[i].src+" duration: "+audios[i].duration);
						// console.log("AMZ shit: "+Math.round(audios[i].duration));
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

	    	// [FROSMO] Detection si on a l'intro displayed ou pas

		var countInit = 0;

		function superInit() {
			if ($('#topbar-subscription-intro').length) {
			    $('#topbar-subscription-form').fadeOut("fast");
			    console.log("[FROSMO] topbar-subscription-intro est là je cache la form!");
			} else if (countInit < 100) {
				console.log("[FROSMO] topbar-subscription-intro pas là pour le moment");
			    countInit++;
				window.setTimeout(superInit, 100);
			}
		}

		// Premier lancement
		window.setTimeout(superInit, 100);
	
			// Mini scriptounet pour la topbar subscription en 2 étapes
		$(document).on('click', '#subscribeButtonIntro',function(){
			console.log("tu clique sur le bouton intro");
			$('#topbar-subscription-intro').fadeOut("fast");
			$('#topbar-subscription-form').fadeIn("slow", function () {
				console.log("je charge ajaxchimp");
				$('#mc-form').ajaxChimp({
		    	callback: callbackFunction
		    	});
		    });
		});

	//	plugin d'ajaxification du formulaire mailchimp topbarsubscription

		$('#mc-form').ajaxChimp({
	    	callback: callbackFunction
	    });

	    function callbackFunction (resp) {
		    if (resp.result == 'success') {
		    	var prenom = $( "#mc-PRENOM" ).val();
		        $('#mc-form').fadeOut('fast', function() {
		        	$('#topbar-subscription-form-text').html("Thank's "+prenom+", you're gonna love Sunday morning. We've just sent you a confirmation email !");
		        	_gaq.push(['_trackEvent', 'CTA Episode', 'Subscribe', 'Submitted info']);
		        	mixpanel.track("EP > Top Bar Subscription > Step 2, Subscribed");
		        });
		        setTimeout(function() {
	    			$('#topbar-subscription').removeClass("hidden-xs").fadeOut('slow');
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
		        		mixpanel.track("EP > Sidebar Friends Subscription > Subscribed a friend");
		        	} else {
			        	$('#mc-sidebar h1').html("Yo "+prenom+" !");
			        	$('#mc-sidebar h2').html("Thanks, we've just sent you a confirmation email ;)");
			        	_gaq.push(['_trackEvent', 'CTA Episode', 'Subscribe', 'Subscribed from Sidebar']);
			        	mixpanel.track("EP > Sidebar Subscription > Subscribed from sidebar");
			        }
		        });
		         setTimeout(function() {
	    			$('#mc-sidebar').fadeOut('slow');
	    			$('.rightSide h1:nth-of-type(1)').css('margin-top','0');
	    			$('#topbar-subscription').removeClass("hidden-xs").fadeOut('slow'); // fais aussi disparaitre la topbar de subscription
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
			$('#topbar-subscription').removeClass("hidden-xs").hide();
			var comingFromMail =true;

			// adaptation sidebar pour inviter ami

			$('#mc-sidebar h1').html("Love is to share");
		    $('#mc-sidebar h2').html("Subscribe a close friend.");
		    $('#mc-sidebar-EMAIL').attr("placeholder", "Your friend's email ?");
		    $('#mc-sidebar-PRENOM').attr("placeholder", "Your friend's name ?");
		    $('#sidebarSubscribeButton').html("Submit");

		}




		//toDo: sccript de redimensionnement automatique des titres de sons qui pourraient etre trop long et prendre 2 lignes. Probleme vu sur mobile.
	}
);