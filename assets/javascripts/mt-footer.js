$(document).ready(
	function() {
	// zone en savoir plus en footer

	$("#footerLearnMore").on("click",function(){
		$(this).fadeOut('slow');
		$(".footerLearnMoreArea").delay(500).fadeIn(2000);
	// 	page.animate({
				// scrollTop: $(".footerLearnMoreArea").offset().top+1
				// },5000,'easeOutBack',
    // 		, 100);
	});
	
	}
);