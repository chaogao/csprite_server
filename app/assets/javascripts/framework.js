/**
 * @extend bootstarp
 */
(function() {
    core = {};
    core.modal = {};

    core.modal.confirm = function(option) {
        var title = option.title,
            body = option.body,
            html, domElement;

        html = '<div class="modal">\
                    <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\
                        <h3 data-toggle="header-text"></h3>\
                    </div>\
                    <div class="modal-body"></div>\
                    <div class="modal-footer">\
                        <button class="btn" data-toggle="return">关闭</button>\
                        <button class="btn btn-primary" data-toggle="submit">确定</button>\
                    </div>\
                </div>';

        domElement = $(document.createElement("div"));
        domElement.html(html);
        domElement.find("[data-toggle=header-text]").html(title);
        domElement.find(".modal-body").html(body);

        domElement.modal();

        domElement.delegate("[data-toggle=return]", "click", function() {
            option.cb(false);
            domElement.modal("hide");
        }); 

        domElement.delegate("[data-toggle=submit]", "click", function() {
            option.cb(true);
            domElement.modal("hide");
        }); 

    }
})();





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