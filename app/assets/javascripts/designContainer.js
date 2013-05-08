/**
 * @fileOverview designContainer
 */

(function() {
    Csprite.init("/assets/convertBase64.swf");

    core = core || {};

    var DesignContainer;
    
    /**
     * @constructor
     */
    core.DesignContainer = DesignContainer = function() {
        this.generateElements();
        this.generateCsprite();
        this.delegateTabChange();
        this.delegatelinkAction();
        this.delegateRemoveAction();
    }


    DesignContainer.CONST = {
        CONTAINER: "#desginContainer",
        UNLINKEDCONTAINER: "#unlinkedContainer",
        LINKEDCONTAINER: "#linkedContainer",
        EDITCONTAINER: "#editContainer"
    }

    $.extend(DesignContainer.prototype, {
        /**
         * @private DesignContainer#generateCsprite
         * @private
         * @description init csprite, with linked icons
         */
        generateCsprite: function() {
            var self = this,
                resources;

            self.linkedList = self.linkedContainer.data("list");
            resources = self.linkedList.map(function(item) {
                return {
                    src: item.url,
                    name: item.name
                }
            });
            self.initCsprite(resources);
        },

        /**
         * @private DesignContainer#initCsprite
         */
        initCsprite: function(resources) {
            var sceneOpts,
                canvasOps,
                loaderOps,
                scene;

            sceneOpts = {
                container: "csprite",
                tile: {
                    width: 20,
                    height: 20,
                    paddingX: 10,
                    paddingY: 10
                }
            };

            canvasOps = {
                width: 800,
                height: 600
            };

            loaderOps = {
                resources: resources
            };

            setTimeout(function() {
                self.scene = scene = new Csprite.Scene(sceneOpts, canvasOps, loaderOps);
            }, 3000);
        },

        /**
         * @private
         * @description generate elements
         */
        generateElements: function() {
            this.container = $(DesignContainer.CONST.CONTAINER);
            this.unlinkedContainer = $(DesignContainer.CONST.UNLINKEDCONTAINER);
            this.linkedContainer = $(DesignContainer.CONST.LINKEDCONTAINER);
            this.editContainer = $(DesignContainer.CONST.EDITCONTAINER);
        },

        getSelectedIcons: function() {
            return this.unlinkedContainer.find("input[data-toggle=iconitem]:checked").map(function() {
                return $(this).data("icon");
            }).get();
        },

        /**
         * @private
         * @description link icons
         */
        delegatelinkAction: function() {
            var self = this;

            this.container.delegate("a[data-toggle=linkselected]", "click", function(e) {
                var selectedIcons, sameNameIcons, sendRequest;

                sendRequest = function() {
                    var json = {
                        ids: selectedIcons.map(function(icon) {
                            return icon.id;
                        }),
                        csprite: currentCsprite.id
                    }

                    $.ajax({
                        url: "/csprite/linkicons",
                        type: "post",
                        data: json,
                        success: function(json) {
                            if (json.succ) {
                                self.removeIcons([self.unlinkedContainer], json.icons);
                                self.insertIcons(self.linkedContainer, json.icons, true);
                                setTimeout(function() {
                                    self.toggleTab(DesignContainer.CONST.LINKEDCONTAINER);
                                }, 1000);
                            }
                        }
                    });
                }

                selectedIcons = self.getSelectedIcons();
                sameNameIcons = self.checkSameIcons(self.linkedContainer, selectedIcons);

                if (sameNameIcons.length != 0) {
                    var outHtml = sameNameIcons.map(function(icon) {
                        return icon.name;
                    }).join(",");

                    outHtml = [
                        '<p>below icons alrady exist in linked list, them will be override</p>',
                        outHtml,
                        '<p class="text-warning">continue?</p>'
                    ].join("");

                    core.modal.confirm({
                        title: "You sure continue?",
                        body: outHtml,
                        cb: function(flag) {
                            flag && sendRequest();
                        }
                    })
                } else {
                    sendRequest();
                }
            });
        },

        /**
         * @private
         */
        delegateTabChange: function(index) {
            index = index || 0;

            //render icon list in related container
            this.container.find("a[data-toggle=tab]").on("shown", function(e) {
                var container = $($(this).attr("href")),
                    data = container.data("list"),
                    tpl = container.data("template");

                if (container && data && tpl) {
                    container.find("[data-toggle=listContent]").setTemplateElement(tpl);
                    container.find("[data-toggle=listContent]").processTemplate({"icons": data});
                    container.find("[data-toggle=popover]").popover();
                }
            }).eq(index).tab("show");
        },

        /**
         * @remove
         */
        delegateRemoveAction: function() {
            var self = this;

            this.container.delegate("a[data-toggle=remove]", "click", function(e) {
                var icon, sendRequest, container;

                container = $(this).parents("[data-toggle=list]");

                icon = self.getIcon($(this).data("key"), this);

                if (!icon) {
                    return false;
                }

                sendRequest = function() {
                    var json = {
                        id: icon.id,
                        csprite: currentCsprite.id
                    };

                    $.ajax({
                        url: "/csprite/removeicon",
                        data: json,
                        type: "post",
                        success: function(json) {
                            if (json.succ) {
                                self.removeIcons(container, icon);
                            }
                        }
                    })
                };

                core.modal.confirm({
                    title: "Remove Confirm",
                    body: "Remove" + icon.name,
                    cb: function(flag) {
                        flag && sendRequest();
                    }
                });
            });
        },

        getIcon: function(key, el) {
            var listData = $(el).parents("[data-toggle=list]").data("list");

            return listData.filter(function(icon) {
                return icon.id == key
            })[0];
        },

        /**
         * @private
         * @return {array} sameIcons
         */
        checkSameIcons: function(container, icons) {
            var orignIcons, sameNameIcons;

            orignIcons = container.data("list");

            sameNameIcons = icons.filter(function(i) {
                var exist = orignIcons.some(function(j) {
                    return i.name == j.name;
                });
                return exist;
            });

            return sameNameIcons;
        },

        /**
         * @public
         * @description insert icons into a container
         * @param {bool} force force over
         */
        insertIcons: function(container, icons, force) {
            var orignIcons, sameNameIcons, resultData;

            orignIcons = container.data("list");
            if (!force) {
                sameNameIcons = icons.filter(function(i) {
                    var exist = orignIcons.some(function(j) {
                        return i.name == j.name;
                    });
                    return exist;
                });

                if (sameNameIcons.length != 0) {
                    $(this).trigger("samedatas", [sameNameIcons]);
                    return false;
                }

                resultData = orignIcons.concat(icons);
            } else {
                resultData = icons.slice(0);
                orignIcons.forEach(function(i) {
                    var exist = icons.some(function(j) {
                        return j.name == i.name;
                    });

                    if (!exist) {
                        resultData.push(i);
                    }
                });
            }
            container.data("list", resultData);
        },

        /**
         * @pulic
         * @description remove icons from containers
         */
        removeIcons: function(containers, icons) {
            if (!Array.isArray(containers)) {
                containers = [containers]
            }
            if (!Array.isArray(icons)) {
                icons = [icons]
            }

            containers.forEach(function(container) {
                var dataList = $(container).data("list");

                dataList = dataList.filter(function(l) {
                    var exist = icons.some(function(i) {
                        return i.id == l.id;
                    });
                    if (exist) {
                        container.find("[data-key=" + l.id + "]").parents("li").fadeOut('slow', function() {
                            $(this).remove();
                        });
                    }
                    return !exist;
                });

                $(container).data("list", dataList);
            });
        },

        /**
         * @public
         * @description toggle a tab to show
         */
        toggleTab: function(target) {
            this.container.find("a[href=" + target + "]").tab("show");
        }
    });

})();