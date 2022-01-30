$(document).ready(
	function() {

		// signup form validation for iris (byebye MailChimp!)

		// $("#topbar-signup-form").on("submit",function(e){
		// 		e.preventDefault(); 

		// 		var name;
		// 		var email;
				
		// 		var $Form = $(this),
		// 		name = $Form.find('input[name="topbar-name"]').val(),
		// 		email = $Form.find('input[name="topbar-email"]').val(),
		// 		url = $Form.attr('action');

		// 		console.log("data before post: "+name+" - "+email+" - "+url)

		// 		$.post(url, {api_key:"NjeaE2RRCDWHNL2xWXRA", name:name, email:email,list:"QQHvme9rjql67LVRVasnGw",boolean:"true",gdpr:"true",silent:"true"},
		// 		  function(data) {
		// 		  		console.log("data: "+data);
		// 		      if(data)
		// 		      {
		// 		      	if(data=="Some fields are missing.")
		// 		      	{
		// 			      	$("#topbar-status").text("Please fill in your name and email.");
		// 			      	$("#topbar-status").css("color", "red");
		// 		      	}
		// 		      	else if(data=="Invalid email address.")
		// 		      	{
		// 			      	$("#topbar-status").text("Your email address is invalid.");
		// 			      	$("#topbar-status").css("color", "red");
		// 		      	}
		// 		      	else if(data=="Invalid list ID.")
		// 		      	{
		// 			      	$("#topbar-status").text("Your list ID is invalid.");
		// 			      	$("#topbar-status").css("color", "red");
		// 		      	}
		// 		      	else if(data=="Already subscribed.")
		// 		      	{
		// 			      	$("#topbar-status").text("You're already subscribed!");
		// 			      	$("#topbar-status").css("color", "red");
		// 		      	}
		// 		      	else if(data==1)
		// 		      	{
		// 			      	$("#topbar-status").text("Oh yeah "+name+"!");
		// 			      	$("#topbar-status").css("color", "green");
		// 			      	$("#topbar-subscribeButton").fadeOut('slow');
		// 			      	$("#mobile-subscribeButton").fadeOut('slow');
		// 			      	_paq.push(['trackEvent', 'newfollower', 'topbar-signup-form']);

		// 			      	setTimeout(function() {
		// 	    				$('#topbar-subscription-form').fadeOut('slow');
		// 					}, 1000);
		// 		      	}
		// 		      }
		// 		      else
		// 		      {
		// 		      	$("#topbar-status").text("Sorry, unable to subscribe. If you keep seeing this error, please contact us!");
		// 		      	$("#topbar-status").css("color", "red");
		// 		      	//alert("Sorry, unable to subscribe. If you keep seeing this error, please contact us!");
		// 		      }
		// 		  }
		// 		);
		// 	});
		// 	$("#topbar-signup-form").on("keypress",function(e) {
		// 		    if(e.keyCode == 13) {
		// 		    	e.preventDefault(); 
		// 				$(this).trigger("submit");
		// 		    }
		// 		});
		// 	$("#topbar-subscribeButton").on("click",function(e){
		// 		e.preventDefault(); 
		// 		$("#topbar-signup-form").trigger("submit");
		// 	});

		// // same stuff for mobile form


		// $("#mobile-signup-form").on("submit",function(e){
		// 		e.preventDefault(); 
				
		// 		var name;
		// 		var email;

		// 		var $Form = $(this),
		// 		name = $Form.find('input[name="mobile-name"]').val(),
		// 		email = $Form.find('input[name="mobile-email"]').val(),
		// 		url = $Form.attr('action');

		// 		console.log("data before post: "+name+" - "+email+" - "+url)
				
		// 		$.post(url, {api_key:"NjeaE2RRCDWHNL2xWXRA", name:name, email:email,list:"QQHvme9rjql67LVRVasnGw",boolean:"true",gdpr:"true",silent:"true"},
		// 		  function(data) {
		// 		  	console.log("data: "+data);
		// 		      if(data)
		// 		      {
		// 		      	if(data=="Some fields are missing.")
		// 		      	{
		// 			      	$("#mobile-status").text("Please fill in your name and email.");
		// 			      	$("#mobile-status").css("color", "red");
		// 		      	}
		// 		      	else if(data=="Invalid email address.")
		// 		      	{
		// 			      	$("#mobile-status").text("Your email address is invalid.");
		// 			      	$("#mobile-status").css("color", "red");
		// 		      	}
		// 		      	else if(data=="Invalid list ID.")
		// 		      	{
		// 			      	$("#mobile-status").text("Your list ID is invalid.");
		// 			      	$("#mobile-status").css("color", "red");
		// 		      	}
		// 		      	else if(data=="Already subscribed.")
		// 		      	{
		// 			      	$("#mobile-status").text("You're already subscribed!");
		// 			      	$("#mobile-status").css("color", "red");
		// 		      	}
		// 		      	else if(data==1)
		// 		      	{
		// 			      	$("#mobile-status").text("You're now subscribed "+name+"!");
		// 			      	$("#mobile-status").css("color", "green");
		// 			      	_paq.push(['trackEvent', 'newfollower', 'mobile-signup-form']);


		// 			      	setTimeout(function() {
		// 	    				$('#mobile-subscription').fadeOut('slow');
		// 					}, 1000);
		// 		      	}
		// 		      }
		// 		      else
		// 		      {
		// 		      	alert("Sorry, unable to subscribe. If you keep seeing this error, please contact us!");
		// 		      }
		// 		  }
		// 		);
		// 	});

		// 	$("#mobile-signup-form").on("keypress",function(e) {
		// 		    if(e.keyCode == 13) {
		// 		    	e.preventDefault(); 
		// 				$(this).trigger("submit");
		// 		    }
		// 		});
		// 	$("#mobile-subscribeButton").on("click",function(e){
		// 		e.preventDefault(); 
		// 		$("#mobile-signup-form").trigger("submit");
		// 	});


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
	}
);