// require pulings for this controller
//= require jquery-jtemplates


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
            button_image_url: "/assets/flash-button-background.png",
            button_width: "100",
            button_height: "36",
            button_placeholder_id: "swfUploadContainer",
            button_text: '<span class="theFont">Upload</span>',
            button_text_style: ".theFont { font-size: 24px; color: #ffffff;}",
            button_text_left_padding: 12,
            button_text_top_padding: 0,
            
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

    /**
     * @description desgin component logic
     */
    if ($("#desginContainer").size() != 0) {
        var desginContainer = $("#desginContainer"),
            unlinkedContainer = $("#unlinkedContainer");
            linkedContainer = $("#linkedContainer");

        desginContainer.find("a[href=#unlinkedContainer], a[href=#linkedContainer]").on("shown", function(e) {
            var container = $($(this).attr("href")),
                data = container.data("list"),
                tpl = container.data("template");

            try {
                container.find("[data-toggle=listContent]").setTemplateElement(tpl);
                container.find("[data-toggle=listContent]").processTemplate({"icons": data});
                container.find("[data-toggle=popover]").popover();
            } catch(e) {
                console.log(e);
            }
        }).first().tab("show");

        /** 点击linkbutton **/
        unlinkedContainer.find("a[data-toggle=linkselected]").on("click", function(e) {
            var selectids, json;

            selectids = unlinkedContainer.find("input[data-toggle=iconitem]:checked").map(function() {
                return $(this).data("key");
            }).get();

            json = {
                ids: selectids,
                csprite: currentCsprite.id
            }

            $.ajax({
                url: "/csprite/linkicons",
                type: "post",
                data: json,
                success: function(json) {
                    if (json.succ) {
                        var linkedList, unlinkedList;

                        unlinkedContainer.find("input[data-toggle=iconitem]:checked").parents("li").remove();

                        unlinkedList = unlinkedContainer.data("list");
                        unlinkedList = unlinkedList.filter(function(l) {
                            var exist = json.icons.some(function(i) {
                                return i.id == l.id;
                            });
                            return !exist;
                        });
                        unlinkedContainer.data("list", unlinkedList);

                        linkedList = linkedContainer.data("list");
                        linkedList = linkedList.concat(json.icons);
                        linkedContainer.data("list", linkedList);
                    }
                }
            });
        });

        /** 点击删除button的回调 **/
        desginContainer.delegate("a[data-toggle=remove]", "click", function(e) {
            var key = $(this).data("key");

            core.modal.confirm({
                title: "删除确认",
                body: "确定要删除吗?",
                cb: function(f) {
                    if (f) {
                        removeIcon(key);
                    }
                }
            });
        });




    }

})();