/**
 * @description {new} action 的一些逻辑
 */
(function() {
    $("#advanceSetting").on("shown", function() {
        $("#advaceSettingBtn i")[0].className = "m-icon-big-swapup";
    }).on("hidden", function() {
        $("#advaceSettingBtn i")[0].className = "m-icon-big-swapdown";
    });


})();


/**
 * @description {edit} action 
 */
(function(){
    /**flash uploader **/
    var flashUC = $("#swfUploadContainer"),
    	csrfToken = $("head meta[name=csrf-token]").attr('content');

    if (flashUC.size() != 0) {
        var settings = {
            flash_url : "/assets/swfupload.swf",
            upload_url: "/upload/upload",
            post_params: {"csprite_id": currentCsprite.id, "authenticity_token": csrfToken},
            file_size_limit : "500",
            file_types : "*.jpg; *.png; *.gif",
            file_types_description : "All Images",
            file_upload_limit : 100,
            file_queue_limit : 0,
            custom_settings : {
                progressTarget : "fsUploadProgress",
                cancelButtonId : "btnCancel"
            },
            debug: false,

            // Button settings
            button_width: "100",
            button_height: "36",
            button_placeholder_id: "swfUploadContainer",
            button_text: '<span class="theFont">Upload</span>',
            button_text_style: ".theFont { font-size: 24px; background-color: #FB0}",
            button_text_left_padding: 12,
            button_text_top_padding: 3,
            
            // The event handler functions are defined in handlers.js
            file_queued_handler : fileQueued,
            file_queue_error_handler : fileQueueError,
            file_dialog_complete_handler : fileDialogComplete,
            upload_start_handler : uploadStart,
            upload_progress_handler : uploadProgress,
            upload_error_handler : uploadError,
            upload_success_handler : uploadSuccess,
            upload_complete_handler : uploadComplete,
            queue_complete_handler : queueComplete  // Queue plugin event
        };
        swfu = new SWFUpload(settings);
    }
})();