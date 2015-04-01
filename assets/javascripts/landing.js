// hello geeky brother, if you see something weird around or got a question shoot me @ImaCrea ;)

$(document).ready(
	function() {

		//FROSMO DETECTE CHANGEMENT BOUTON RELANCE
		var countInitRelance = 0;

		function superInitRelance() {
			if ($('.frosmo_inline').length) {
			    console.log("[FROSMO] Modif boutons de relance effectuée");

			   	$('.relanceButton').click(function() {
		    	$(this).fadeOut();
		    	$('#subscribeButton').click();

	    })
			} else if (countInitRelance < 100) {
				console.log("[FROSMO] Boutons de relance pas modifié pr le moment");
			    countInitRelance++;
				window.setTimeout(superInitRelance, 100);
			}
		}

		// Premier lancement
		window.setTimeout(superInitRelance, 100);

		$(".stretchMe").anystretch();

		// [FROSMO] timer pour détecter si new background
		var countInit=0;
		function frosmoBGInit() {
			if ($('#FROSMOchangeBg').length) {
			    console.log("[FROSMO] Hero background changed, I trigger stretchMe again!");
			    $("#bigHeader").anystretch($('#FROSMOchangeBg').attr('newBG'), {speed: 150});
			    $("#photoCredit").html("Photo credit : <a href=\""+$('#FROSMOchangeBg').attr('creditLink')+"\" target=\"_blank\">"+$('#FROSMOchangeBg').attr('creditAuthor')+"</a>");
			} else if (countInit < 500) {
				console.log("[FROSMO] Hero background not changed, I wait sir :)");
			    countInit++;
				window.setTimeout(frosmoBGInit, 100);
			}
		}

		window.setTimeout(frosmoBGInit, 100);

		 <!-- affichage du grand titre -->

	    $('#bigIntro').fitText(2, {minFontSize: '20px', maxFontSize: '70px' });
	    $('#underBigIntro').fitText(6, {minFontSize: '12px', maxFontSize: '70px' });


	    <!-- motherfuckr color caroussel -->

	    var colors=["Rough","Dreamy","Vibrant","Bliss","Trippy"];

	    var colorRotation = function () {
		    $.each(colors , function(index, color){
	    		setTimeout(function() {
		    		$('#soundColorHero').fadeOut('slow',function(){
					    $(this).html(color).fadeIn('slow');
					    $(this).addClass(color);

					    for (var i = colors.length - 1; i >= 0; i--) {
							if (index!=i) {
								$(this).removeClass(colors[i]);
							};
						};
					});

				}, 3500*(index+1));
	    	});
	    }

	    var timeout = 17500;
	    colorRotation();
	    setInterval(colorRotation, timeout);


		 <!-- affichage et animation de la quote -->

    	$('#quote').flowtype({
        minimum   : 500,
        maximum   : 1200,
        minFont   : 12,
        maxFont   : 25,
        fontRatio : 50 , // A modifier au cas par cas ! -- Règle la largeur du titre
        lineRatio : 1.5 // A modifier au cas par cas ! -- Règle la hauteur de ligne du titre
        });

    	var quote = ["Rain or shine, time to discover some new tunes on Sunday. Great start for a relaxing day.","Hangover recovery.","This is a brilliant concept!","A consistent drip feed of ear candy that comes in just the right doses.","Inspiration.","An eternal flow of discovery on sounds.","Love! Every sunday morning.","MailTape is the reason I wake up every sunday with a smile, music smoothing all the hard week behind me."];
    	var quoteUsers = ["Stephane H, Paris.","Laurent A, Montpellier.","Dwayne L, Brisbane.","Paulina W, Barcelona.","Gioacchino P, Toulouse.","Philibert P, Bordeaux.","Alice O, Rennes.","Barbara M, Quebec."]

    	$.each(quote , function(index, quote){
    		setTimeout(function() {
	    		$('#quoteByHappyUser').fadeOut('slow',function(){
				    $(this).html("<span class=\"quoteSymbol\">\“</span>"+quote+"<span class=\"quoteSymbol\">\“</span>").fadeIn('slow');
				});

			}, 6000*(index+1));
    	});

    	$.each(quoteUsers , function(index, username){
    		setTimeout(function() {
	    		$('#happyUserName').fadeOut('slow',function(){
				    $(this).html(username).fadeIn('slow');
				});

			}, 6000*(index+1));
    	});


		<!-- affichage de notre manifesto -->

    	$('#ourStory').flowtype({
        minimum   : 500,
        maximum   : 1200,
        minFont   : 12,
        maxFont   : 25,
        fontRatio : 37 , // A modifier au cas par cas ! -- Règle la largeur du titre
        lineRatio : 1.5 // A modifier au cas par cas ! -- Règle la hauteur de ligne du titre
        });




	    <!-- Animation submit infos -->

	    var open = false; // thx bluxte for the tip!

	    $('.relanceButton').click(function() {
	    	$(this).fadeOut();
	    	$('#subscribeButton').click();
	    })

	    <!-- Selecteurs archives par couleurs -->

	    $( "#archives" ).load( "/Archives.html", function() {
			$(".stretchMe").anystretch();

			var musiColors = ["rough","dreamy","vibrant","bliss","trippy"];

			$(musiColors).each(function(index,color) {

				$(".selector ."+color).click(function(){

						if ($(".selector ."+color).parent("li").hasClass("selected")) {

							$(".selector ."+color).parent("li").removeClass("selected");
							for (var i = musiColors.length - 1; i >= 0; i--) {
								$(".archive."+musiColors[i]).fadeIn("slow");
								$(".oldies ."+musiColors[i]).fadeIn("slow");
								$(".selector ."+musiColors[i]).parent("li").removeClass("unselected");
							};

						}

						else {

						for (var i = musiColors.length - 1; i >= 0; i--) {
							if (index!=i) {
								$(".archive."+musiColors[i]).fadeOut("slow");
								$(".oldies ."+musiColors[i]).fadeOut("slow");
								$(".selector ."+musiColors[i]).parent("li").addClass("unselected");
								$(".selector ."+musiColors[i]).parent("li").removeClass("selected");
							}
						};

						$(".archive."+color).fadeIn("slow");
						$(".selector ."+color).parent("li").removeClass("unselected");
						$(".selector ."+color).parent("li").addClass("selected");
						$(".oldies ."+color).fadeIn("slow");
					}
				})

			});

			// $(".selector .rough").click(function(){
			// 	$(".archive.rough").fadeIn("slow");
			// 	$(".selector .rough").parent("li").removeClass("unselected");

			// 	$(".archive.trippy").fadeOut("slow");
			// 	$(".archive.bliss").fadeOut("slow");
			// 	$(".archive.vibrant").fadeOut("slow");
			// 	$(".archive.dreamy").fadeOut("slow");

			// 	$(".oldies .rough").fadeIn("slow");
			// 	$(".oldies .trippy").fadeOut("slow");
			// 	$(".oldies .bliss").fadeOut("slow");
			// 	$(".oldies .vibrant").fadeOut("slow");
			// 	$(".oldies .dreamy").fadeOut("slow");

			// 	$(".selector .trippy").parent("li").addClass("unselected");
			// 	$(".selector .bliss").parent("li").addClass("unselected");
			// 	$(".selector .vibrant").parent("li").addClass("unselected");
			// 	$(".selector .dreamy").parent("li").addClass("unselected");
			// })

			// $(".selector .dreamy").click(function(){
			// 	$(".archive.dreamy").fadeIn("slow");
			// 	$(".selector .dreamy").parent("li").removeClass("unselected");

			// 	$(".archive.trippy").fadeOut("slow");
			// 	$(".archive.bliss").fadeOut("slow");
			// 	$(".archive.vibrant").fadeOut("slow");
			// 	$(".archive.rough").fadeOut("slow");

			// 	$(".selector .trippy").parent("li").addClass("unselected");
			// 	$(".selector .bliss").parent("li").addClass("unselected");
			// 	$(".selector .vibrant").parent("li").addClass("unselected");
			// 	$(".selector .rough").parent("li").addClass("unselected");
			// })

		});

	    <!-- formulaire inscription et joli bouton submit -->

	    $('#subscribeButton').click(function() {
    		$("html, body").animate({
				scrollTop: 0
			}, 1000);

	    	if (!open) {
	    	open=true;
	       	$('#subscribeButton').addClass("afterClick");
	       	$( "#subscribeButton" ).removeAttr("onClick");

	    	$('#bigIntro').fadeOut('fast',function(){
			    $(this).html("Amazing, you're gonna love it.").fadeIn('fast');
			});

	    	$('#underBigIntro').fadeOut('fast',function(){
			    $(this).html("Fill this out and we’re good to go. By the way, it’s free and we won’t spam you.").fadeIn('fast');
			});

	    	$('#mc-form').removeAttr( "novalidate" );
	    	$('#mc-EMAIL').slideDown();
	    	$('#mc-PRENOM').slideDown();
	    	$(this).html("Submit");
	    	$('#mc-EMAIL').focus();
	    	return false; //permet d'éviter que ça submit au premier clic en stopant les éventuelles actions qui pourraient être prise en charge par le handler, autre que ce script
	    	}
		})

	    // $('#subscribeButton').mouseup(function() {
	    // 	$(this).delay(500).attr( "type", "submit");
	    // 	})

	    $('#mc-form').ajaxChimp({
	    	callback: callbackFunction
	    });

	    function callbackFunction (resp) {
		    if (resp.result == 'success') {
		    	var prenom = $( "#mc-PRENOM" ).val();
		        $('#mc-form').fadeOut();

		       	$('#bigIntro').fadeOut('fast',function(){
			   		$(this).html("Almost there dear "+prenom+" !").fadeIn('fast');
				});

	    		$('#underBigIntro').fadeOut('fast',function(){
			    	$(this).html("Check your inbox now, we've just sent you a confirmation email.").fadeIn('fast');
			    	_gaq.push(['_trackEvent', 'CTA Landing', 'Subscribe', 'Submitted info on landing']);
			    	try{mixpanel.track("HP > Subscription 1 > Step 2",
    					{ "Subscription Position": "1",
      					  "Step": "2"
      					}
      				);} catch(e) {}
				});
		    }
		}
   }
);