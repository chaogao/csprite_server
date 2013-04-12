/**
 * @description dom ready 
 */
(function() {
	/**
	 * @description carousel for run attr is auto dom
	 */
	$(".carousel[run=auto]").each(function() {
		$(this).carousel();
	});




})()