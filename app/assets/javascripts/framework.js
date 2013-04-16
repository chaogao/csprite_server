/**
 * @description dom ready 
 */
(function() {

	$(document).ready(function() {
		/**
		 * @description carousel auto run
		 */
		$(".carousel[run=auto]").each(function() {
			$(this).carousel();
		});

		/**
		 * @description collapse auto run
		 */
		$("collapase[run=auto]").each(function() {
			$(this).collapase();
		});

		/**
		 * @description set mini-height
		 */
		var height = document.documentElement.clientHeight;

		$(".container.container-main").css("min-height", (height - 230) + "px");
	})
})()