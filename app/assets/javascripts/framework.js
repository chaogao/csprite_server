/**
 * @description dom ready 
 */
(function() {

	$(document).ready(function() {
		/**
		 * @description carousel for run attr is auto dom
		 */
		$(".carousel[run=auto]").each(function() {
			$(this).carousel();
		});

		/**
		 * @description set mini-height
		 */
		var height = document.documentElement.clientHeight;

		$(".container.container-main").css("min-height", (height - 125) + "px");
	})
})()