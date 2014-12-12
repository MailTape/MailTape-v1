$(document).ready(
	function() {

	// module permettant de ne charger la liste des archives que si l'user le demande en injectant le html de Archives.html dans la page en cours
	console.log("coucou c'est moi les archives :)");
	
		var archivesLoaded = false;

		$(".archivesButton").click(function() {
			if (archivesLoaded==false) {
				console.log("coucou c'est moi les archives chargées :)");
				archivesLoaded=true;
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

	// mise en comment du module d'affichage progressif : ne marche pas bien et alourdi le script

		// var archive_n=episodeNumber;
		// console.log("epis")
	 //    $(document).scroll(function() {

	 //    	if (archive_n>0 && archivesLoaded==true) {
		// 		console.log("hauteur archive"+archive_n+" : "+$("#archive"+archive_n).offset().top);
	 //        	console.log("hauteur actuelle :"+$(document).scrollTop());
	 //       		console.log("hauteur actuelle + taille fenêtre :"+($(document).scrollTop()+$(window).height()));


	 //            if ($("#archive"+archive_n).offset().top <= ($(document).scrollTop()+$(window).height())) {
	 //                console.log("archive dépassée: "+archive_n+" position : "+$("#archive"+archive_n).offset().top);
	 //                archive_n=archive_n-10;
	 //                $("#archive"+archive_n).show();$("#archive"+(archive_n+1)).show();$("#archive"+(archive_n+2)).show();$("#archive"+(archive_n+3)).show();$("#archive"+(archive_n+4)).show();$("#archive"+(archive_n+5)).show();$("#archive"+(archive_n+6)).show();$("#archive"+(archive_n+7)).show();$("#archive"+(archive_n+8)).show();$("#archive"+(archive_n+9)).show();
	 //                console.log("archive affichée: "+archive_n+" position : "+$("#archive"+archive_n).offset().top);
	 //            }
	 //        }
	 //    });
	}
);