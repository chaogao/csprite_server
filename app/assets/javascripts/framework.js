/**
 * @description dom ready 
 */
(function() {

	$(document).ready(function() {
		/**
		 * @description carousel auto run
		 */
		$(".carousel[run=auto]").carousel();

		/**
		 * @description set mini-height
		 */
		var height = document.documentElement.clientHeight;

		$(".container.container-main").css("min-height", (height - 230) + "px");
	})
})()