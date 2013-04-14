/**
 * @description new action 的一些逻辑
 */
(function() {
	$("#advanceSetting").on("shown", function() {
		$("#advaceSettingBtn i")[0].className = "m-icon-big-swapup";
	}).on("hidden", function() {
		$("#advaceSettingBtn i")[0].className = "m-icon-big-swapdown";
	});


})();