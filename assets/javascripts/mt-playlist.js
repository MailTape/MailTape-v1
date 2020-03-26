// ici on a toute la machinerie de chargement de la playlist et du musiColor

// module permettant d'insérer les titres des sons directement à partir la liste fournie
function loadTracks() {
	$.each(tracksTitle,function(i,trackTitle){
			$("#track"+(i+1)+"_title_player").html(trackTitle);
			$("#track"+(i+1)+"_title_link").html(trackTitle);
			$("#track"+(i+1)+"_title_featured").html(trackTitle);
	});
}
		
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

// connextion à l'api soundcloud
function connectSC () {
	if(checkSC()) {
		SC.initialize({
		client_id: "5eaa5aae9b1a116f58b43027a7a2206d",
		});
	}
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

// module de gestion de l'api soundcloud afin de jouer les sons directement à partir du stream SC
		
function loadSounds () {	
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
}
