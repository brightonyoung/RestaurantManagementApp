! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.admin = t() : e.admin = t()
}(this, function() {
    return webpackJsonpadmin([0], [function(e, t) {}, function(e, t) {}, function(e, t) {}, function(e, t) {}, function(e, t) {}, function(e, t) {}, , function(e, t, n) {
        "use strict";

        function i(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }

        function a(e, t, n, i, a) {
            $("#" + e).click(function() {
                var e = $("#" + t),
                    o = $(this).is(":checked");
                o && (n ? i === !1 ? e.hide() : e.slideUp() : i === !1 ? e.show() : e.slideDown()), "function" == typeof a && a.call(this, o && !n)
            })
        }

        function o(e, t, n, i) {
            $("#" + e).click(function() {
                var e = $("#" + t),
                    a = $(this).is(":checked");
                a && (n ? e.prop("disabled", !1) : e.prop("disabled", !0)), "function" == typeof i && i.call(this, a && !n)
            })
        }
        var r = function() {
            function e(e, t) {
                var n = [],
                    i = !0,
                    a = !1,
                    o = void 0;
                try {
                    for (var r, l = e[Symbol.iterator](); !(i = (r = l.next()).done) && (n.push(r.value), !t || n.length !== t); i = !0);
                } catch (e) {
                    a = !0, o = e
                } finally {
                    try {
                        !i && l.return && l.return()
                    } finally {
                        if (a) throw o
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        if (n(2), n(0), n(1), n(5), n(4), n(3), void 0 === l) {
            window._setHash = !0;
            var l = window.Toast = {
                unloading: !1,
                unsavedChanges: !1,
                trackUnsavedChanges: function(e) {
                    e || (e = $(document)), e.find("input,select,textarea").not("#switch-restaurants-menu input,.search-query,#propertySelector,.ignore-changes").change(function() {
                        l.unsavedChanges = !0
                    })
                },
                hasUnsavedChanges: function() {
                    return l.unsavedChanges && $("#save-btn:visible").size() > 0 && !$("#save-btn").attr("disabled")
                },
                confirmUnsavedChangesOnUnload: function() {
                    $(window).on("beforeunload", function() {
                        if (l.hasUnsavedChanges && l.hasUnsavedChanges()) return "You have unsaved changes"
                    })
                },
                escapeHtml: function(e) {
                    return e ? jQuery("<div />").text(e).html() : ""
                },
                formatPosition: function(e) {
                    if (e > 3 && e < 21) return e + "th";
                    switch (e % 10) {
                        case 1:
                            return e + "st";
                        case 2:
                            return e + "nd";
                        case 3:
                            return e + "rd";
                        default:
                            return e + "th"
                    }
                },
                getOrCreateElmtId: function(e) {
                    var t = e.attr("id");
                    return t || (t = "toast_" + (new Date).getTime() + "_" + Math.floor(1e4 * Math.random()), e.attr("id", t)), t
                },
                showTab: function(e) {
                    var t;
                    e ? ("#" != e.charAt(0) && (e = "#" + e), t = $('a[href="' + e + '"][data-toggle=tab]')) : (t = $($("a[data-toggle=tab]")[0]), window._setHash = !1), t.tab("show"), $("#active-tab").val(e), window.scrollTo(0, 0)
                },
                tabFromHash: function() {
                    var e = window.location.hash;
                    e && l.showTab(e)
                },
                initTabs: function() {
                    var e = ".tabbable .nav-stacked a, .tabbable .nav-tabs a";
                    $(e).on("shown", function(e) {
                        window._setHash ? (window.location.hash = e.target.hash, window.scrollTo(0, 0)) : window._setHash = !0
                    });
                    var t = window.location.hash;
                    if (t) {
                        var n = !1;
                        $(e).each(function() {
                            t == this.hash && (n = !0)
                        }), n ? l.showTab(t) : window.location.hash = ""
                    }
                    $(window).hashchange(function() {
                        var e = location.hash;
                        l.showTab(e)
                    });
                    var i = function() {
                            var e = 0;
                            return $(".toast-tabs li").each(function() {
                                e += $(this).outerWidth()
                            }), e
                        },
                        a = function() {
                            var e = i() + 2;
                            if ($(".toast-tabs").width(e), $(".toast-tab-wrapper").outerWidth() < e)
                                if ($(".tabbable > div > .toggle").show(), $(".toast-tabs").parent().parent().hasClass("toast-tab-collapse")) {
                                    var t = $(".toast-tabs li.active"),
                                        n = $(".toast-tab-wrapper").outerWidth();
                                    t.size() > 0 && $(".toast-tab-wrapper").animate({
                                        scrollLeft: Math.max(0, Math.min(e - n, t.position().left - n / 2 + t.width() / 2))
                                    })
                                } else $(".toast-tabs").width("100%");
                            else $(".tabbable > div > .toggle").hide(), $(".toast-tabs").width("100%")
                        },
                        o = function(e) {
                            var t = e.closest(".toast-tab-wrapper").parent();
                            t.addClass("toast-tab-collapse"), t.find(".toggle i").removeClass("icon-chevron-down").addClass("icon-chevron-left"), a()
                        },
                        r = function(e) {
                            e.parent().toggleClass("toast-tab-collapse"), e.find("i").toggleClass("icon-chevron-down icon-chevron-left"), a()
                        };
                    $(window).on("resize", function() {
                        a()
                    }), $(".tabbable .toggle").click(function() {
                        r($(this))
                    }), $('a[data-toggle="tab"]').on("shown", function() {
                        o($(this))
                    }), a(), $(".nav-tabs > li > a").each(function(e, t) {
                        $(t).attr("title", $(t).text())
                    })
                },
                arrayToJqueryParams: function(e, t) {
                    return $.map(t, function(t) {
                        return {
                            name: e,
                            value: t
                        }
                    })
                },
                findMultieditSelected: function(e) {
                    return e.find(":checkbox:checked:not(:disabled):not([data-multiedit-master])")
                },
                enableMultiedit: function(e, t) {
                    function n() {
                        return l.findMultieditSelected(s)
                    }

                    function i() {
                        s.on("click", ":checkbox", function(e) {
                            if (o && e.shiftKey) {
                                var t = s.find(":checkbox:not([data-multiedit-master])"),
                                    n = t.index(this),
                                    r = t.index(o);
                                a(), t.slice(Math.min(n, r), Math.max(n, r) + 1).prop("checked", $(o).is(":checked")), i()
                            }
                            o = this
                        }), s.on("change", ":checkbox", function() {
                            var e = n();
                            c.prop("disabled", 0 == e.length), $.isFunction(t) && t.call(this, {
                                selected: e,
                                selectedCount: e.length
                            })
                        })
                    }

                    function a() {
                        s.off("click", ":checkbox")
                    }
                    var o, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                        d = $("#" + e),
                        s = d.find("table"),
                        c = d.find(".btn.multiedit");
                    r && (s = $("#" + r)), i(), c.click(function(e) {
                        e.preventDefault();
                        var t = $(this),
                            i = n();
                        if (0 != i.length || r) {
                            var a = i.map(function() {
                                return $(this).val()
                            }).get();
                            t.trigger("multiedit" + r, [a])
                        } else alert("Please select at least one item")
                    }), d.find(':checkbox[data-multiedit-master="true"]').click(function() {
                        var e = s.find(":checkbox:not(:disabled)").not(this);
                        a(), $(this).is(":checked") ? e.prop("checked", !0).trigger("change") : e.prop("checked", !1).trigger("change"), i()
                    })
                },
                updateCheckboxContainerStyle: function(e) {
                    e.is(":checked") ? e.parent().addClass("checked") : e.parent().removeClass("checked"), e.prop("disabled") ? e.parent().addClass("disabled") : e.parent().removeClass("disabled")
                },
                updateSelectionListState: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "disabled",
                        n = e.hasClass("disabled");
                    e.find(":checkbox").each(function() {
                        var e = $(this);
                        l.updateCheckboxContainerStyle(e), n ? e.prop(t, !0) : e.prop(t) || e.prop(t, !1)
                    })
                },
                enableSelectionList: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "disabled",
                        n = e ? $(e).find("ul.selection-list") : $("ul.selection-list");
                    n.each(function() {
                        l.updateSelectionListState($(this), t)
                    }), n.on("click", ":checkbox", function(e) {
                        if (e.target.readOnly || e.target.disabled) return !1;
                        var n = $(this).closest("ul");
                        n.hasClass("multiselect") || n.find(":checkbox").not($(this)).prop("checked", !1), !$(this).is(":checked") && n.hasClass("required") && $(this).prop("checked", !0), l.updateSelectionListState(n, t)
                    })
                },
                positionAtBottom: function(e, t) {
                    var n = $(window),
                        i = {
                            top: n.scrollTop(),
                            left: n.scrollLeft()
                        };
                    i.bottom = i.top + n.height();
                    var a = e.offset();
                    a.bottom = a.top + e.outerHeight();
                    var o = !(i.bottom < a.top || i.top > a.bottom);
                    if (t || !o) {
                        var r = a.bottom - n.height() + 10;
                        $("html, body").animate({
                            scrollTop: r
                        })
                    }
                },
                enablePrettyUploads: function() {
                    var e = $("input.pretty-file");
                    e.change(function() {
                        var e = $(this).parent().siblings(".file-display"),
                            t = $(this).parent().siblings(".remove-image"),
                            n = $(this).val();
                        n ? (e.text(n.replace(/.*(\/|\\)/, "")).show(), t.hide()) : (e.hide(), t.show())
                    }), e.closest(".image-selection").find(".remove-image").click(function() {
                        var e = $(this);
                        e.prop("disabled", !0).prev().val("true").end().next().show(), e.parent().find("img").addClass("opacity30"), e.siblings(".pretty-file-button").hide()
                    }), e.closest(".image-selection").find(".remove-image-undo").click(function(e) {
                        e.preventDefault(), $(this).parent().hide().prev().prop("disabled", !1).prev().val("false").prev().show().parent().find("img").removeClass("opacity30")
                    }), void 0 !== $.browser && void 0 !== $.browser.mozilla && $.browser.mozilla && $(".pretty-file-button").click(function(e) {
                        e.currentTarget === this && "INPUT" !== e.target.nodeName && $(this).find("input").click()
                    })
                },
                addSectionEnabler: function(e, t, n, i) {
                    $("#" + e).click(function() {
                        var e = $("#" + t),
                            a = $(this).is(":checked");
                        !a && $(this).closest("ul").hasClass("required") || (a && !n || !a && n ? e[i ? "slideDown" : "show"]() : e[i ? "slideUp" : "hide"]())
                    })
                },
                addTouchSectionEnabler: function(e, t, n, i, o) {
                    a(e + "_true", t, n, i, o), a(e + "_false", t, !n, i, o)
                },
                addTouchSectionDisabler: function(e, t, n, i) {
                    o(e + "_true", t, n, i), o(e + "_false", t, !n, i)
                },
                _deleteEntityTableRow: function(e, t) {
                    e.addClass("deleted");
                    var n = e.find("input.id-param");
                    t ? (n && "true" == n.val() && n.val("false"), e.find("input.deleted-param").val(!0)) : n.length > 0 && (n.data("originalValue") || n.data("originalValue", n.val()), n.val("false")), e.find("input:not(.id-param,.deleted-param),select").prop("disabled", !0), e.find(".select-shell").addClass("disabled"), e.find(".td-checkbox label").addClass("opacity50"), e.find("button:not(.entity-actions)").prop("disabled", !0).addClass("disabled"), e.find("td:not(.td-actions) i").removeClass("opacity70").addClass("opacity20")
                },
                _undeleteEntityTableRow: function(e, t) {
                    e.removeClass("deleted");
                    var n = e.find("input.id-param");
                    t ? n && "false" == n.val() ? n.val("true") : e.find("input.deleted-param").val(!1) : n.length > 0 && n.val(n.data("originalValue")), e.find("input,select").prop("disabled", !1), e.find(".select-shell").removeClass("disabled"), e.find(".td-checkbox label").removeClass("opacity50"), e.find("button").prop("disabled", !1).removeClass("disabled"), e.find("td:not(.td-actions) i").removeClass("opacity20").addClass("opacity70")
                },
                enableEntityTableDelete: function(e, t, n) {
                    e.find("a.remove-entity").off("click.entitydelete").on("click.entitydelete", function() {
                        var e = $(this).closest("tr");
                        if (l._deleteEntityTableRow(e, n), e.hasClass("parent-row")) {
                            var i = e.nextUntil(".parent-row");
                            l._deleteEntityTableRow(i, n)
                        }
                        return l.unsavedChanges = !0, t && t(e, !0), !1
                    }), e.find("a.undo, a.undo-remove-entity").off("click.entitydelete").on("click.entitydelete", function() {
                        l.unsavedChanges = !0;
                        var e = $(this).closest("tr");
                        if (l._undeleteEntityTableRow(e, n), e.hasClass("parent-row")) {
                            var i = e.nextUntil(".parent-row");
                            l._undeleteEntityTableRow(i, n)
                        }
                        t && t(e, !0)
                    })
                },
                enableEntityTableRowTemplate: function(e, t, n, i) {
                    e.click(function() {
                        var e = t.find("tbody tr:not(.placeholder,.template) .id-param").length,
                            a = t.find("tr.template"),
                            o = a.clone().removeClass("template"),
                            r = o.attr("id");
                        "INDEX" == o.attr("index") && o.attr("index", e), r && o.attr("id", r.replace("INDEX", e)), o.find("input,select").each(function() {
                            var t = $(this),
                                n = t.attr("name");
                            n && (t.attr("name", n.replace("INDEX", e)), t.data("forceDisabled") || (t.prop("disabled", !1), t.parent().removeClass("disabled")))
                        }), o.find("option").each(function() {
                            var t = $(this),
                                n = t.attr("value");
                            n && t.attr("value", n.replace("INDEX", e))
                        }), o.find("div").each(function() {
                            var t = $(this),
                                n = t.attr("id");
                            n && t.attr("id", n.replace("INDEX", e))
                        }), 0 === e && t.find(".placeholder").remove(), n && n.call(o, e), a.eq(0).before(o.show());
                        var d = !0;
                        return o.find(":text:visible,select:visible").each(function() {
                            d && "hidden" != this.type && ($(this).focus(), $("td.focus").removeClass("focus"), $(this).closest("td").addClass("focus"), d = !1)
                        }), l.trackUnsavedChanges(o), i && i.call(o, e), !1
                    })
                },
                enableEntityTableInput: function(e, t) {
                    t = void 0 === t || t, e.find('.td-input :text,.td-input input[type="number"]').off(".tdinput").on("focus.tdinput", function() {
                        var e = $(this),
                            t = e.closest("td,th");
                        $("td.focus,th.focus").removeClass("focus"), e[0].disabled || t.addClass("focus")
                    }).on("blur.tdinput", function() {
                        var e = $(this),
                            t = e.closest("td,th");
                        t.removeClass("focus"), t.hasClass("td-input-link") && t.find(".input-param").val() && (t.removeClass("td-input"), t.attr("editing", null), t.find(".input-link").show(), t.find(".input-link:not(.input-link-append)").text(e.val()), t.find(".input-param").hide())
                    }).on("keydown.tdinput", function(e) {
                        if (t && 13 === e.keyCode) {
                            var n = $(this),
                                i = n.closest("td"),
                                a = n.closest("tr"),
                                o = a.find("td").index(i);
                            e.shiftKey ? a.prevAll(":visible").find("td:eq(" + o + ") input:visible").first().focus() : a.nextAll(":visible").find("td:eq(" + o + ") input:visible").first().focus(), e.preventDefault()
                        }
                    }), e.find(".td-input").off(".tdinput").on("click.tdinput", function() {
                        $(this).find(':text,input[type="number"]').focus()
                    }), e.find(".td-input input[type=number]").focus(function() {
                        $(this).on("mousewheel.disableScroll", function(e) {
                            e.preventDefault()
                        })
                    }).blur(function() {
                        $(this).off("mousewheel.disableScroll")
                    }), l.enableEntityTableSelect(e), l.enableEntityTableEditLink(e)
                },
                enableTreePickerForCell: function(e, t) {
                    var n = e.find("input." + (t ? "target" : "owner")),
                        i = e.closest(".picker-parent").find("input." + (t ? "owner" : "target"));
                    e.find(".bootstrap-treepicker.shell").off(".template").on("click.template", function() {
                        l._initializeTreePickerTemplate($(this))
                    }), e.find(".bootstrap-select.select-shell").off(".template").on("click.template", function(e) {
                        $(this).hasClass("disabled") || (l._initializeSelectPickerTemplate($(this)), e.stopPropagation(), e.preventDefault())
                    }), n.off("change.template").on("change.template", function(e, a) {
                        if ("click" === a) {
                            var o = i.parent(),
                                r = [n.val()];
                            l._initializeTreePickerTemplate(o), t ? l._updateLinkedTreepicker(o, r, n, i) : l._updateLinkedTreepicker(o, r, i, n)
                        }
                    })
                },
                enableSelectPickerTemplate: function(e, t) {
                    e.find(".bootstrap-select.select-shell").off(".template").on("click.template", function(e) {
                        $(this).hasClass("disabled") || (l._initializeSelectPickerTemplate($(this), t), e.stopPropagation(), e.preventDefault())
                    })
                },
                enableEntityTableSelect: function(e) {
                    var t = e.prop("tagName");
                    t && "tr" === t.toLowerCase() ? e.find(".td-select select").selectpicker() : e.find("tr:not(.template,.placeholder) .td-select select").selectpicker(), e.find(".bootstrap-treepicker.shell").off(".template").on("click.template", function() {
                        l._initializeTreePickerTemplate($(this))
                    }), e.find(".bootstrap-select.select-shell").off(".template").on("click.template", function(e) {
                        $(this).hasClass("disabled") || (l._initializeSelectPickerTemplate($(this)), e.stopPropagation(), e.preventDefault())
                    }), e.find("input.target").off("change.template").on("change.template", function(e, t) {
                        if ("click" === t) {
                            var n = $(this),
                                i = n.closest(".picker-parent"),
                                a = i.find("input.owner"),
                                o = a.parent(),
                                r = [n.val()];
                            l._initializeTreePickerTemplate(o), l._updateLinkedTreepicker(o, r, n, a)
                        }
                    }), e.find("input.owner").off("change.template").on("change.template", function(e, t) {
                        if ("click" === t) {
                            var n = $(this),
                                i = n.closest(".picker-parent"),
                                a = i.find("input.target"),
                                o = a.parent(),
                                r = [n.val()];
                            l._initializeTreePickerTemplate(o), l._updateLinkedTreepicker(o, r, a, n)
                        }
                    })
                },
                _initializeTreePickerTemplate: function(e) {
                    if (e.hasClass("shell") && !e.hasClass("disabled")) {
                        e.removeClass("shell"), e.append($("#setup-restaurants .dropdown-menu:first").clone());
                        var t = e.find("input"),
                            n = [t.val()];
                        e.treepicker({
                            multiselect: !1,
                            input: t
                        }).treepicker("val", {
                            values: n
                        }), e.trigger("click")
                    }
                },
                _initializeSelectPickerTemplate: function(e, t) {
                    if (e.hasClass("select-shell") && !e.hasClass("disabled")) {
                        var n = e.find("input"),
                            i = $("#" + e.attr("data-template-id")),
                            a = i.clone(),
                            o = n.attr("data-master-id"),
                            r = e.data("cssClass"),
                            d = e.find("button").data("cssClass");
                        a.prop("disabled", !1), a.attr("id", null), a.attr("name", n.attr("name")), t && a.change(t), o ? a.find("option").each(function() {
                            $(this).attr("data-master-id") === o && $(this).prop("selected", !0)
                        }) : a.val(n.val()), e.after(a), e.remove(), l._selectpickerAndOpen(a, null, r, d)
                    }
                },
                _selectpickerAndOpen: function(e, t, n, i) {
                    e.selectpicker(t);
                    var a = e.next();
                    a.click(), a.addClass(n), a.find("button").addClass(i), setTimeout(function() {
                        e.next().addClass("open"), setTimeout(function() {
                            e.prop("multiple") || a.find(".selected a").focus(), a.find("input").focus()
                        }, 10)
                    }, 10)
                },
                enableEntityTableEditLink: function(e) {
                    var t = function(e) {
                            var t = e.closest("tr");
                            "true" == e.attr("editing") || t.hasClass("deleted") || t.hasClass("readonly") || e.find(".input-edit").show()
                        },
                        n = function(e) {
                            e.find(".input-edit").hide()
                        };
                    e.find(".td-input-link").off(".tdlink").on("mouseover.tdlink", function() {
                        t($(this))
                    }).on("mouseout.tdlink", function() {
                        n($(this))
                    }), e.find(".td-input-link .input-link").off(".tdlink").on("focus.tdlink", function() {
                        t($(this).closest("td"))
                    }).on("blur.tdlink", function() {
                        var e = $(this).closest("td").find(".input-edit");
                        setTimeout(function() {
                            e.hasClass("focus") || e.hide()
                        }, 100)
                    }), e.find(".td-input-link .input-edit").off(".tdlink").on("mouseover.tdlink", function() {
                        $(this).addClass("hover")
                    }).on("mouseout.tdlink", function() {
                        $(this).removeClass("hover")
                    }).on("click.tdlink", function() {
                        if (!$(this).hasClass("no-click")) {
                            var t = $(this).closest("td"),
                                n = t.find(".input-param");
                            return t.attr("editing", !0), n.attr("disabled", null).show(), t.addClass("td-input"), l.enableEntityTableInput(e), n.focus(), t.find(".input-link").hide(), t.find(".input-edit").hide(), !1
                        }
                    }).on("focus.tdlink", function() {
                        $(this).addClass("focus")
                    }).on("blur.tdlink", function() {
                        $(this).removeClass("focus").hide()
                    })
                },
                enableEditButton: function(e, t) {
                    t && (t.click(function(t) {
                        if (e.data("editing")) {
                            e.data("editing", !1), e.removeClass("editing-on").addClass("editing-off");
                            var n = $(this).data("edit-text");
                            n || (n = "Edit"), $(this).text(n)
                        } else e.data("editing", !0), e.addClass("editing-on").removeClass("editing-off"), $(this).text("Done");
                        l.updateEditColumns(e), t.preventDefault()
                    }), e.find(".edit-column").hide())
                },
                _reorderFormCollection: function(e, t) {
                    e.find("tbody tr:not(.placeholder)").each(function(e) {
                        $(this).find('input[name^="' + t + '"],select[name^="' + t + '"]').each(function() {
                            $(this).attr("name", $(this).attr("name").replace(/\[\d+\]/, "[" + e + "]"))
                        })
                    })
                },
                enableChildEntityTable: function(e, t, n, i, a, o) {
                    var r = {
                        onDragClass: "info",
                        onDrop: function(n, a) {
                            l._reorderFormCollection(e, t), l.unsavedChanges = !0, i && i(n, a)
                        }
                    };
                    r.dragHandle = "td:first-child", e.tableDnD(r), l.enableEntityTableDelete(e, a, o), l.enableEditButton(e, n)
                },
                enableChildEntityTableOrderColumn: function(e, t, n, i, a, o) {
                    l.enableEntityTableDelete(e, a, o), l.enableEditButton(e, n), e.find(".order-column input").change(function(e) {
                        e.preventDefault();
                        var t = $(this).closest("tr"),
                            n = t.find(".input-ordinal").val(),
                            a = t.attr("data-master-id"),
                            o = t.closest("tbody"),
                            r = a ? o.find('tr[data-master-id="' + a + '"]') : t;
                        isNaN(n) ? r.find(".input-ordinal").val("") : r.find(".input-ordinal").val(n), r.detach(), ("" === n || isNaN(n)) && (n = 1e5), n = parseInt(n);
                        var d = !1;
                        o.find(">tr").each(function() {
                            var e = $(this).find(".input-ordinal").val(),
                                t = $(this).attr("data-master-id");
                            return ("" === e || isNaN(e)) && (e = 1e5), (e = parseInt(e)) < n || (e === n && t < a || (r.insertBefore($(this)), d = !0, !1))
                        }), d || o.append(r), l.unsavedChanges = !0, i && i(t)
                    })
                },
                enableChildEntityAlphabeticalSort: function(e, t, n, i) {
                    i.click(function(i) {
                        i.preventDefault();
                        for (var a, o, r = !0; r;) r = !1, a = void 0, e.find('tr:not(.template)[id^="' + t + '"]').each(function(e, t) {
                            var n = $(t).find(".td-input-link a.input-link").text();
                            if (!a) return a = n, o = t, !0;
                            a.toLowerCase() > n.toLowerCase() && ($(o).detach().insertAfter(t), r = !0), a = n, o = t
                        }), l.unsavedChanges = !0;
                        e.find('tr:not(.template)[id^="' + t + '"]').each(function(e, t) {
                            var i = n + "[" + e + "].";
                            $(t).find("input, select").each(function() {
                                var e = $(this).attr("name").split("].")[1],
                                    t = i + e;
                                $(this).attr("name", t)
                            })
                        })
                    })
                },
                updateOrderColumn: function(e) {
                    var t = parseInt(e.prev().find(".order-column input").val());
                    isNaN(t) && (t = 0), e.find(".order-column input").val(t + 10)
                },
                _updateLinkedTreepicker: function(e, t, n, i) {
                    if (n.val() !== i.val()) {
                        var a = i.val(),
                            o = e.treepicker("ancestors", n.val());
                        $.inArray(a, o) === -1 && e.treepicker("val", {
                            values: t
                        })
                    }
                },
                updateEditColumns: function(e) {
                    e.data("editing") ? e.find(".edit-column").show() : e.find(".edit-column").hide()
                },
                initTableDefaultSelection: function(e, t, n, i) {
                    i = i || ".td-checkbox :checkbox";
                    var a = function() {
                        e.find(i).each(function() {
                            $(this).is(":checked") ? $(this).closest("td").addClass("checked") : $(this).closest("td").removeClass("checked")
                        })
                    };
                    e.on("click", i, function() {
                        var e = $(this),
                            o = e.is(":checked");
                        !("function" == typeof t ? t.call(this) : t) && o && e.closest("table").find(i).not(e).prop("checked", !1), n && !o && e.prop("checked", !0), a()
                    }), a()
                },
                setCheckboxState: function() {
                    var e = $(this),
                        t = e.parent();
                    t.toggleClass("checked", e.is(":checked")), t.toggleClass("disabled", e.is(":disabled"))
                },
                initCheckboxes: function(e) {
                    e.find(":checkbox").each(l.setCheckboxState).change(l.setCheckboxState)
                },
                isTouch: function() {
                    return "ontouchstart" in window || "onmsgesturechange" in window
                },
                isEmbedded: function() {
                    return $("body").hasClass("embedded")
                },
                modalBusy: function() {
                    var e = $(".modal:visible .modal-footer");
                    e.find("img").show(), e.find(".btn").prop("disabled", !0)
                },
                modalReady: function() {
                    var e = $(".modal:visible .modal-footer");
                    e.find("img").hide(), e.find(".btn").prop("disabled", !1)
                },
                strContains: function(e, t) {
                    return e && ~e.toLowerCase().indexOf(t)
                },
                strStartsWith: function(e, t) {
                    return e && 0 === e.toLowerCase().indexOf(t)
                },
                validateEmail: function(e) {
                    return !!e && new RegExp("^[a-zA-Z0-9](?:[\\.\\-+]?[_A-Za-z0-9]){0,53}@[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?){0,4}\\.[a-zA-Z]{2,20}").test(e)
                },
                chooseEntity: function(e, t, n, i, a, o, r, d, s, c, u, p) {
                    function f() {
                        var e = $("#entity-chooser .entity-chooser-left"),
                            t = e.height();
                        t = t - e.find(".entity-search-container").outerHeight() - e.find(".selected-entity-list").outerHeight(), e.find(".entity-list").height(t), e.find(".no-results").height(t)
                    }

                    function h(e) {
                        var t = .8 * $(window).height(),
                            n = e.find(".modal-header"),
                            i = e.find(".modal-body"),
                            a = e.find(".modal-footer"),
                            o = n.outerHeight(),
                            r = i.height(),
                            l = i.outerHeight(),
                            d = a.outerHeight(),
                            s = t - o - d - l + r,
                            c = -t / 2;
                        e.height(t), e.css("margin-top", c + "px"), i.css("max-height", "none").height(s), i.find(".no-entity").css("line-height", s + "px").height(s), i.find(".entity-chooser-left").height(s).find(".selected-entity-list").css("max-height", s / 2 + "px"), i.find(".entity-preview").height(s), f()
                    }

                    function m() {
                        C.empty();
                        var e = b.data("chooserResults");
                        0 === e.length ? (y.prop("disabled", !0), C.hide()) : ($.each(e, function(e, t) {
                            var n = o(t);
                            n.data("entity", t), C.append(n)
                        }), C.show(), y.prop("disabled", !1)), f()
                    }

                    function g(e) {
                        function t(e, t) {
                            var i = e.data("entity");
                            if (b.find(".no-entity").hide(), r) {
                                var a = r.replace("ENTITY_ID", i.id);
                                i.type && (a = a.replace("ENTITY_TYPE", i.type)), b.find(".entity-preview").empty().addClass("loading").show().load(a, function() {
                                    b.find(".entity-preview").removeClass("loading")
                                })
                            }
                            if (d) {
                                var o = d.replace("ENTITY_ID", i.id);
                                i.type && (o = o.replace("ENTITY_TYPE", i.type)), y.prop("disabled", !0), $.getJSON(o, function(e) {
                                    i.previewData = e, n(t, i)
                                }).always(function() {
                                    y.prop("disabled", !1)
                                })
                            } else n(t, i);
                            w.add(C).children().removeClass("current"), e.addClass("current")
                        }

                        function n(e, t) {
                            if (e)
                                if (p) {
                                    var n = b.data("chooserResults");
                                    ~n.indexOf(t) || n.push(t), m()
                                } else b.data("chooserResults", t), y.prop("disabled", !1)
                        }
                        if (k.removeClass("loading"), 0 === e.length) return void k.find(".no-results").show();
                        k.find(".no-results").hide(), $.each(e, function(e, t) {
                            var n = o(t);
                            n.data("entity", t), w.append(n)
                        }), w.on("click.toast", "li", function() {
                            t($(this), !0)
                        }), C.on("click.toast", "li", function(e) {
                            var n = $(this);
                            if (e.pageX - n.offset().left > .94 * n.outerWidth()) {
                                var i = n.index();
                                b.data("chooserResults").splice(i, 1), m()
                            } else t(n, !1)
                        })
                    }

                    function v() {
                        var t = l.menuMgmt.data[e];
                        if (t) {
                            var n = $.trim(S.val()).toLowerCase(),
                                i = b.find(".entity-list li"),
                                a = 0;
                            b.find(".no-results").hide();
                            for (var o = 0; o < t.length; o++) {
                                var r = t[o],
                                    d = i.eq(o);
                                0 === n.length || u(r, n) ? (d.show(), a++) : d.hide()
                            }
                            0 === a && b.find(".no-results").show()
                        }
                    }
                    var b = $("#entity-chooser");
                    b.css("left", "-9999px"), b.find(".help-text p").html("Selecting Deep Copy will create a copy of the selected " + t + " and any items, subgroups, modifier groups, and modifiers it contains. Any changes made to these copies will not impact the originals."), b.find(".no-entity").html(i || "Select from the left to preview"), b.find(".search-query").attr("placeholder", n || "Search..."), b.find(".entity-chooser-left").addClass("loading"), s ? (b.find(".modal-header h3").html("Select " + t + " to copy" || "Select"), b.find("#copy-checkbox").show(), b.find(".copy-checkbox-div").css("display", "inline"), b.find(".copy-tooltip").css("display", "inline")) : (b.find(".modal-header h3").html("Select " + t || "Select"), b.find("#copy-checkbox").hide(), b.find(".copy-checkbox-div").css("display", "none"), b.find(".copy-tooltip").css("display", "none")), b.find(".modal-footer-left .buttons .btn").click(function() {
                        b.find(".modal-footer-left .copy-tooltip .tooltip-background #tooltip-checkbox").prop("checked", !1).change(), b.find(".modal-footer-left .buttons .btn.btn-primary").prop("disabled", !0)
                    }), b.find(".modal-footer-left .copy-tooltip .tooltip-background #tooltip-checkbox").change(function() {
                        b.find(".modal-footer-left .copy-tooltip .tooltip-background #tooltip-checkbox").is(":checked") ? (b.find(".modal-footer-left .copy-tooltip .tooltip-background").css("background-color", "rgba(0,0,0,0.1)"), b.find(".modal-body .help-text").css("visibility", "visible")) : (b.find(".modal-footer-left .copy-tooltip .tooltip-background").css("background-color", "rgba(0,0,0,0.0)"), b.find(".modal-body .help-text").css("visibility", "hidden"))
                    }), b.find(".modal-body .help-text #tooltip-close").click(function() {
                        b.find(".modal-footer-left .copy-tooltip .tooltip-background #tooltip-checkbox").prop("checked", !1).change()
                    });
                    var y = b.find(".modal-footer .btn-primary, .modal-footer-left .buttons .btn.btn-primary");
                    y.on("click.toast", function() {
                        b.modal("hide"), b.find(".modal-body .help-text").css("visibility", "hidden");
                        var e = b.data("chooserResults"),
                            t = b.find("#copy-checkbox").is(":checked");
                        c.call(null, e, t)
                    }), b.data("chooserResults", p ? [] : null);
                    var k = b.find(".entity-chooser-left"),
                        w = k.find(".entity-list"),
                        C = k.find(".selected-entity-list"),
                        T = function() {
                            h(b)
                        };
                    b.on("shown.toast", function() {
                        h(b), b.css("left", ""), $("#entity-chooser .search-query").focus(), l.menuMgmt.data[e] ? g(l.menuMgmt.data[e]) : l.getKeepAliveJson(a, function(t) {
                            t.error ? (alert(t.error), g([])) : (l.menuMgmt.data[e] = t.data, g(t.data), v())
                        })
                    }).on("hidden.toast", function() {
                        b.off("shown.toast"), b.off("hidden.toast"), y.off("click.toast"), $(window).off("resize.toast", T), w.off("click.toast"), C.off("click.toast"), b.find(".entity-list").empty(), b.find(".selected-entity-list").empty().hide(), b.find(".entity-preview").empty().hide(), b.find(".no-entity").text("").show()
                    }), b.modal(), $(window).on("resize.toast", T);
                    var S = b.find(".search-query").val("");
                    u = u || function(e, t) {
                        return l.strContains(e.name, t) || l.strContains(e.info, t)
                    }, S.keyup(function(e) {
                        switch (e.keyCode) {
                            case 40:
                            case 38:
                            case 16:
                            case 17:
                            case 18:
                            case 9:
                            case 13:
                                break;
                            case 27:
                                $(this).val("");
                            default:
                                v()
                        }
                        e.stopPropagation(), e.preventDefault()
                    })
                },
                trimKeepalivePrefix: function(e) {
                    return e.replace(/^[\.=]+/, "")
                },
                ajaxKeepAliveJson: function(e, t, n, i) {
                    jQuery.isFunction(n) && (i = n, n = void 0), e(t, n, function(e, t, n) {
                        if (jQuery.isFunction(i)) {
                            e = l.trimKeepalivePrefix(e);
                            var a = $.parseJSON(e);
                            i.call(this, a, t, n)
                        }
                    }, "text")
                },
                getKeepAliveJson: function(e, t, n) {
                    l.ajaxKeepAliveJson($.get, e, t, n)
                },
                postKeepAliveJson: function(e, t, n) {
                    l.ajaxKeepAliveJson($.post, e, t, n)
                },
                formatting: {
                    formatCommas: function(e) {
                        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                },
                loadRestaurantPickers: function(e, t, n, i, a) {
                    var o = "";
                    if (i === !0) {
                        var r = $(".restaurant-picker");
                        if (r.size() > 0) return l.renderRestaurantPickers(e, r.first().html()), void(a && a.call())
                    }
                    o += '<option class="none-selected-option" value="">Select a restaurant.</option>', $.get("/restaurantaccess/populateAccessibleRestaurantsShardSpecific", {
                        shardGuid: n
                    }, function(n) {
                        for (var i = 0; i < n.length; i++) {
                            var r = n[i],
                                d = r.guid == t;
                            o += '<option value="' + l.escapeHtml(r.guid) + '"' + (d ? "selected" : "") + ">" + l.escapeHtml(r.name) + "</option>"
                        }
                        l.renderRestaurantPickers(e, o), a && a.call()
                    }, "json")
                },
                renderRestaurantPickers: function(e, t) {
                    e.prop("disabled", !1).html(t).addClass("loaded").find(".loading-placeholder").remove()
                },
                init: function(e, t) {
                    l.imageRoot = e, l.staticResRoot = t, l.hasTouch = "ontouchstart" in window || "onmsgesturechange" in window, $("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
                        $(this).parent().hasClass("disabled") && (e.stopImmediatePropagation(), e.preventDefault())
                    }), $(".modal-form-dialog").each(function() {
                        var e = $(this);
                        e.find(".modal-footer .btn-primary").click(function() {
                            e.find("form").filter(":visible:first").submit()
                        })
                    }), l.enablePrettyUploads(), $(document).ajaxError(function(e, t) {
                        l.unloading || (403 == t.status ? alert("You do not have permission to perform the requested action.") : 429 == t.status ? alert("Sorry, you have sent too many requests. Please try again later.") : alert("An error was encountered communicating with the Toast server, please try again or reload the page."))
                    }), $(window).on("beforeunload", function() {
                        l.unloading = !0
                    })
                }
            }
        }
        l.alertMgr = function() {
                function e() {
                    var e = $(".modal:visible .notifications");
                    return 0 === e.length && (e = $("#notifications")), e
                }

                function t(t, n, i) {
                    var a = i || e(),
                        o = $('<div class="alert"><a class="close" data-dismiss="alert">×</a>' + t + "</div>").addClass(n);
                    a.append(o), a.show()
                }
                return {
                    message: function(e, n, i) {
                        t(e, n, i)
                    },
                    error: function(e, n) {
                        t(e, "alert-error", n)
                    },
                    success: function(e, n) {
                        t(e, "alert-success", n)
                    },
                    info: function(e, n) {
                        t(e, "alert-info", n)
                    },
                    warning: function(e, n) {
                        t(e, "", n)
                    },
                    clear: function(t) {
                        (t || e()).empty()
                    }
                }
            }(), l.reporting = function() {
                function e() {
                    var e = $("#report-restaurants");
                    return e.size() > 0 ? e.treepicker("val") : null
                }

                function t(e) {
                    var t = e.indexOf("?") == -1 ? "?" : "&";
                    return $.each(U, function(n, i) {
                        e += t + n + "=" + escape(i), t = "&"
                    }), e
                }

                function n(e, t) {
                    if (e) {
                        var n = t.indexOf("?") == -1 ? "?" : "&",
                            i = !0,
                            a = !1,
                            o = void 0;
                        try {
                            for (var l, d = Object.entries(e)[Symbol.iterator](); !(i = (l = d.next()).done); i = !0) {
                                var s = r(l.value, 2),
                                    c = (s[0], s[1]);
                                t += n + c.name + "=" + escape(c.value), n = "&"
                            }
                        } catch (e) {
                            a = !0, o = e
                        } finally {
                            try {
                                !i && d.return && d.return()
                            } finally {
                                if (a) throw o
                            }
                        }
                    }
                    return t
                }

                function a(e) {
                    var t = "";
                    return $(e + " option:selected").each(function() {
                        t += $(this).val() + ","
                    }), t.indexOf(",", t.length - 1) !== -1 && (t = t.substring(0, t.length - 1)), t
                }

                function o() {
                    U = d()
                }

                function d() {
                    var t = $(".report-options"),
                        n = t.find('.btn-group[data-field="reportDateRange"]'),
                        o = t.find('input[name="reportDateStart"]'),
                        r = t.find('input[name="reportDateEnd"]'),
                        l = {};
                    l.reportDateRange = n.data("value"), "custom" == l.reportDateRange && (l.reportDateStart = o.val(), l.reportDateEnd = r.val());
                    var d = t.find('.btn-group[data-field="reportShard"]');
                    void 0 !== d && (l.reportShard = d.data("value"));
                    var s = t.find('[name="reportEmployee"]').val();
                    "all" != s && void 0 !== s || (s = ""), l.reportEmployeeId = s;
                    var c = t.find('.btn-group[data-field="reportTimeRange"]');
                    c.size() > 0 && (l.reportTimeRange = c.attr("data-value"), l.reportTimeRange === N && (l.reportTimeStart = t.find('input[name="reportTimeStart"]').val(), l.reportTimeEnd = t.find('input[name="reportTimeEnd"]').val()));
                    var u = $('#allrestaurants-dropdown-container ul.dropdown-menu li.selected[data-is-leaf="true"]').map(function(e, t) {
                            return t.dataset.val
                        }),
                        p = [].concat(i(new Set(u.toArray())));
                    return l.numberOfRestaurants = Math.max(1, p.length), l.reportGroupIds = e() || "", $.each(F, function(e, n) {
                        var i = "";
                        0 != t.find(n + ":visible").length && (i = a(n + "-dropdown")), l[e] = i
                    }), l
                }

                function s(e, t) {
                    if (t && t != e.val()) {
                        e.val(t);
                        var n = e.data("datepicker");
                        n && n.update()
                    }
                }

                function c(e, t) {
                    var n = $(".report-options"),
                        i = n.find('input[name="reportDateStart"]'),
                        a = n.find('input[name="reportDateEnd"]');
                    s(i, e), s(a, t)
                }

                function u() {
                    for (var e = 0; e < G.length; e++) $(G[e]).hide();
                    $("#filter-container-hr").css("display", "none")
                }

                function p() {
                    for (var e = 0; e < G.length; e++) $(G[e]).show();
                    l.reporting.shouldShowHr()
                }

                function f(e, t) {
                    if (e === t) return !0;
                    if (null == e || null == t) return !1;
                    if (e.length != t.length) return !1;
                    for (var n = 0; n < e.length; ++n)
                        if (e[n] !== t[n]) return !1;
                    return !0
                }

                function h(e) {
                    if (e.passthroughs && e.passthroughs.link) {
                        var t = e.passthroughs.link;
                        t.prev(".progress-label").remove(), t.find(".spinner").remove(), t.find("img").show()
                    }
                }

                function m(e, t, n) {
                    function i(e) {
                        var t = l.pendingReports[e.targetSpec];
                        return !t || t.contentUrl != e.contentUrl
                    }
                    if (!i(e)) {
                        var a = 100,
                            o = 5e3;
                        t = t || 0;
                        var r = Math.pow(2, t) * a;
                        r = Math.min(o, r), setTimeout(function() {
                            i(e) || $.ajax(e.contentUrl, {
                                type: "GET",
                                global: !1,
                                dataType: "text",
                                success: function(a, o, r) {
                                    if (!i(e)) {
                                        if ("application/json" == r.getResponseHeader("content-type") && a) try {
                                            if (a = $.parseJSON(a), a.status) {
                                                if ("ERROR" === a.status || !("number" != typeof a.status || a.status >= 200 && a.status < 300)) return ($.isFunction(e.handler.error) ? e.handler.error : alert)(a.message || "Error processing report", e), void(i(e) || delete l.pendingReports[e.targetSpec]);
                                                if ("IN_PROGRESS" === a.status) return $.isFunction(e.handler.progress) && e.handler.progress(a.progress, e), a.progress === n && (t += 1), n = a.progress, void m(e, t, a.progress)
                                            }
                                        } catch (t) {
                                            alert(t);
                                            var d = "Error processing report result";
                                            return void($.isFunction(e.handler.error) ? e.handler.error : alert)(d, e)
                                        }
                                        i(e) || delete l.pendingReports[e.targetSpec], e.handler.success(a, e)
                                    }
                                },
                                error: function(n) {
                                    if (!i(e))
                                        if (403 == n.status) m(e, t + 1);
                                        else {
                                            var a = "Error processing report";
                                            ($.isFunction(e.handler.error) ? e.handler.error : alert)(a, e)
                                        }
                                }
                            })
                        }, r)
                    }
                }

                function g(e, t, n, i, a) {
                    function o(e) {
                        var t = "An error was encountered processing the report, please try again or reload the page";
                        if (e.responseText) try {
                            var n = $.parseJSON(e.responseText);
                            n.message && (t = n.message)
                        } catch (e) {}($.isFunction(i.error) ? i.error : alert)(t, r)
                    }
                    var r = {
                        requestUrl: e,
                        targetSpec: n,
                        handler: i,
                        passthroughs: a
                    };
                    $.isFunction(i.beforeRequest) && i.beforeRequest(r), $.ajax(e, {
                        method: "POST",
                        data: t,
                        global: !1,
                        success: function(e, t, i) {
                            var a = i.getResponseHeader("Location");
                            a ? (r.contentUrl = a, l.pendingReports = l.pendingReports || {}, l.pendingReports[n] = r, m(r)) : o(i)
                        },
                        error: o
                    })
                }

                function v() {
                    return $(".report-container .nav-tabs li.active > a")
                }

                function b(n, i) {
                    function a(e) {
                        m.html(e), m.unmask(), m.removeClass("loading"), $(".report-container a[data-toggle=tab]").on("shown", D);
                        var t = v();
                        t.length > 0 && !t.hasClass("no-initial-load") && D.call(t[0]);
                        var n = $(".report-options"),
                            i = n.find('.btn-group[data-field="reportDateRange"]').data("value"),
                            a = n.find("#shard-dropdown-container").parent();
                        o.sharded ? a.show() : a.hide();
                        var r = $("#startDate").val(),
                            d = $("#endDate").val();
                        "custom" == i ? (l.reporting.updateDisplayedDates(r, d, !0), c(y(r), y(d))) : r && l.reporting.updateDisplayedDates(r, d, !1), f(R, b) || (l.reloadEmployees(), R = b), $(window).trigger("reportload", [M])
                    }
                    var o = {
                        timeFilterable: void 0,
                        employeeFilterable: void 0,
                        supportsGroups: void 0,
                        supportsMoreFilters: void 0,
                        async: !1,
                        sharded: !1,
                        firstLoad: !0
                    };
                    if (i && $.extend(o, i), M = n, P = o.async, A = o.sharded, $(window).trigger("beforereportload", [M]), l.extraReportParams) {
                        var r = n.substr(0, n.indexOf("?")),
                            d = l.extraReportParams[r];
                        if (d)
                            for (var s in d) n += n.indexOf("?") >= 0 ? "&" : "?", n += s + "=", n += d[s]
                    }
                    if (void 0 !== o.timeFilterable)
                        if (o.timeFilterable) {
                            var h = $("#time-dropdown-container");
                            h.show(), h.attr("data-value") === N && $("#time-custom-range").show()
                        } else $("#time-dropdown-container,#time-custom-range").hide();
                    void 0 !== o.employeeFilterable && (o.employeeFilterable ? $("#employee-dropdown-container").show() : $("#employee-dropdown-container").hide()), void 0 !== o.supportsGroups && (o.supportsGroups ? $("#allrestaurants-dropdown-container").show() : $("#allrestaurants-dropdown-container").hide()), void 0 !== o.supportsMoreFilters && (o.supportsMoreFilters ? p() : u()), n = t(n), n += "&activeTab=" + o.activeTabReport, o.firstLoad || (n += "&firstLoad=false");
                    var m = $(".report-container");
                    m.empty();
                    var b = e();
                    if (null != b && 0 == b.length) return void m.append($('<div class="no-restaurants">No restaurants are currently selected.<br/>Please make a new selection from the restaurant dropdown in the report filters section.</div>'));
                    m.addClass("loading"), m.mask("Loading..."), $(".btn.load-report").remove();
                    var k = function(e) {
                        m.html('<div class="alert alert-error">' + e + "</div>")
                    };
                    if (o.async) {
                        g(n, null, l.getOrCreateElmtId(m), {
                            success: a,
                            error: k
                        })
                    } else {
                        var w = Date.now();
                        l.reporting.lastReportLoad = w, $.get(n, function(e) {
                            l.reporting.lastReportLoad == w && (e = l.trimKeepalivePrefix(e), a(e))
                        }, "html")
                    }
                }

                function y(e) {
                    var t = e ? e.split("/") : [];
                    return 3 == t.length ? (1 == t[0].length && (t[0] = "0" + t[0]), 1 == t[1].length && (t[1] = "0" + t[1]), 2 == t[2].length && (t[2] = "20" + t[2]), t[0] + "-" + t[1] + "-" + t[2]) : void 0
                }

                function k() {
                    l.reporting.updateDisplayedDates($("#startDate").val(), $("#endDate").val(), !0), $(".report-options .custom-range").css("display", "inline-block").find("input").on("input", function() {
                        l.reporting.highlightUpdateBtn()
                    }), $(".datepicker").on("click", function() {
                        l.reporting.highlightUpdateBtn()
                    })
                }

                function w() {
                    var e = function(e) {
                            return parseFloat(e.replace(/\$|,/g, ""))
                        },
                        t = function(e) {
                            if (!e || 0 == e.length) return 0;
                            var t = e.split(":"),
                                n = Number(t[t.length - 1]);
                            return t.length > 1 && (n += 60 * t[t.length - 2], t.length > 2 && (n += 3600 * t[t.length - 3])), n
                        },
                        n = function(e, t, n) {
                            var i = n(e),
                                a = n(t);
                            return i < a ? -1 : i > a ? 1 : 0
                        };
                    jQuery.fn.dataTableExt.oSort["currency-asc"] = function(t, i) {
                        return n(t, i, e)
                    }, jQuery.fn.dataTableExt.oSort["currency-desc"] = function(t, i) {
                        return n(i, t, e)
                    }, jQuery.fn.dataTableExt.oSort["turntime-asc"] = function(e, i) {
                        return n(e, i, t)
                    }, jQuery.fn.dataTableExt.oSort["turntime-desc"] = function(e, i) {
                        return n(i, e, t)
                    }
                }

                function C() {
                    var e = v();
                    b(M, {
                        async: P,
                        sharded: A,
                        firstLoad: !1,
                        activeTabReport: e.size() > 0 ? e[0].innerText : ""
                    })
                }

                function T() {
                    var t = $(".report-options");
                    t.find(".btn-group").btnGroupDropdown();
                    var n = $("#allrestaurants-dropdown-container");
                    n.length > 0 && n.find(".selected-label").length > 0 && n.find("#report-restaurants").length > 0 && n.find(".selected-label")[0].innerHTML !== n.find("#report-restaurants")[0].getAttribute("value") && n.find(".dropdown-toggle").addClass("dropdown-non-default"), n.find("#report-restaurants").change(function(e) {
                        "report-restaurants" === e.target.id && x()
                    }), t.find('.btn-group[data-field="reportDateRange"] li a').click(function() {
                        "custom" == $(this).data("value") ? k() : ($(this).closest(".btn-group").siblings(".custom-range").hide(), $("input.date-field").datepicker("hide"))
                    }), t.find('.btn-group[data-field="reportName"] li a').click(function(e) {
                        e.preventDefault(), b($(this).attr("href") + "?reportHtml=true", {
                            timeFilterable: $(this).data("timeFilterable"),
                            employeeFilterable: $(this).data("employeeFilterable"),
                            supportsGroups: $(this).data("supportsGroups"),
                            supportsMoreFilters: $(this).data("supportsMoreFilters"),
                            async: $(this).data("async"),
                            sharded: $(this).data("sharded")
                        })
                    }), $("#update-btn").click(function(e) {
                        e.preventDefault(), o(), C(), $("#update-btn").prop("disabled", !0), setTimeout(function() {
                            $("#update-btn").prop("disabled", !1)
                        }, 2e3), $("#update-btn").addClass("btn-default").removeClass("dropdown-non-default")
                    }), $("#adhoc-export-submit-btn").click(function() {
                        var e = $(this).data("url"),
                            t = $("#adhoc-export-email-input").val(),
                            n = $("#adhoc-export-email-token").val();
                        o(), $.ajax({
                            url: l.reporting.augmentReportUrlWithFilters(e + "&recipients=" + t + "&authenticityToken=" + n, !0)
                        }).done(function() {
                            l.alertMgr.clear(), l.alertMgr.success("We are processing your report. An email will be sent to you shortly.")
                        }).fail(function() {
                            l.alertMgr.clear(), l.alertMgr.error("Failed to process email export.")
                        })
                    });
                    var i = function(e) {
                            $(e.target).data("dirty", !0)
                        },
                        a = $("input.date-field");
                    a.datepicker({
                        format: "mm-dd-yyyy"
                    }).click(function() {
                        a.not($(this)).blur()
                    });
                    var r = a.filter("[name=reportDateStart]"),
                        d = a.filter("[name=reportDateEnd]");
                    r.on("changeDate", function(e) {
                        var t = d.data("datepicker");
                        e.date.valueOf() > t.date.valueOf() && (t.date = new Date(e.date), t.setValue(), t.update()), r.data("datepicker").hide(), d[0].focus(), t.show()
                    }), a.on("changeDate", i), a.on("change", i), a.on("blur", function() {
                        $(this).data("dirty") && (x(), $(this).data("dirty", !1))
                    }), "custom" == t.find('.btn-group[data-field="reportDateRange"]').data("value") && k(), t.find('.btn-group[data-field="reportDateRange"] li a').click(function() {
                        l.reporting.highlightUpdateBtn();
                        var e = $("#date-dropdown-container");
                        e.length > 0 && e.find(".dropdown-label").length > 0 && ("Today" !== e.find(".dropdown-label")[0].innerHTML ? e.find(".dropdown-toggle").addClass("dropdown-non-default") : e.find(".dropdown-toggle").removeClass("dropdown-non-default")), x()
                    });
                    var s = t.find('.btn-group[data-field="reportShard"] li a');
                    s && s.on("click", l.reporting.highlightUpdateBtn), t.find('.btn-group[data-field="reportTimeRange"]').attr("data-value") === N && $(".report-options .custom-time-range input").on("input", function() {
                        l.reporting.highlightUpdateBtn()
                    }), t.find('.btn-group[data-field="reportTimeRange"] li a').off("click").click(function(e) {
                        var t = $(this);
                        if (l.reporting.updateCustomTimeOptions(t), e.preventDefault(), "archived" == t.attr("data-value")) return t.closest(".dropdown-menu").find("li a[data-archived=true]").show(), t.hide(), void e.stopImmediatePropagation();
                        l.reporting.highlightUpdateBtn();
                        var n = $("#time-dropdown-container"),
                            i = n.find(".dropdown-label"),
                            a = t.attr("data-value");
                        n.attr("data-value", a), i.html(t.html()), n.length > 0 && n.find(".dropdown-label").length > 0 && (a !== O ? n.find(".dropdown-toggle").addClass("dropdown-non-default") : n.find(".dropdown-toggle").removeClass("dropdown-non-default"))
                    }), $("#filtered-restaurant").bind("DOMSubtreeModified", function() {
                        l.reporting.highlightUpdateBtn();
                        var e = $("#allrestaurants-dropdown-container");
                        e.length > 0 && e.find(".selected-label").length > 0 && e.find("#report-restaurants").length > 0 && (e.find(".selected-label")[0].innerHTML !== e.find("#report-restaurants")[0].getAttribute("value") ? e.find(".dropdown-toggle").addClass("dropdown-non-default") : e.find(".dropdown-toggle").removeClass("dropdown-non-default"))
                    }), R = e(), o()
                }

                function S() {
                    return {
                        enableWeb: !0,
                        enableEmailExport: !0
                    }
                }

                function E(e, t, n) {
                    var i = $(".report-container .tab-pane.active"),
                        a = i.find(".no-web-report-alert"),
                        o = $("#update-btn"),
                        r = !!t,
                        l = t || n;
                    l || !e ? (void 0 !== l && null !== t || (l = 'Please use the <strong>Email Export</strong> button to run this project for the selected date range. <a href="https://toast.force.com/knowledgebase/s/article/End-of-Year-Reporting">Learn More</a>'), a.length > 0 ? a.html(l) : i.prepend('<div class="alert no-web-report-alert">' + l + "</div>"), i.find(".no-web-report-alert").toggleClass("alert-error", r), a.show()) : a.hide(), o.toggle(e), $("#first-load-container").toggle(e)
                }

                function x(e) {
                    var t = $.Deferred(),
                        n = v(),
                        i = n.data("report") || "GENERIC";
                    if (t.done(function(t) {
                            var i = n.attr("adhoc-export-url"),
                                a = i && t.enableEmailExport,
                                o = t.enableWeb || !a;
                            E(o, t.errorMsg, t.warningMsg), _(a, i), t.reportingDatabaseSnapshotDate ? ($("#stale-reporting-data-refresh-date").html(t.reportingDatabaseSnapshotDate), $("#stale-reporting-data-alert").show(), $("#home-stale-reporting-data-refresh-date").html(t.reportingDatabaseSnapshotDate), $("#home-stale-reporting-data-alert").show()) : ($("#stale-reporting-data-alert").hide(), $("#home-stale-reporting-data-alert").hide()), $.isFunction(e) && e({
                                enableWeb: o,
                                enableEmailExport: a,
                                errorMsg: t.errorMsg,
                                warningMsg: t.warningMsg
                            })
                        }), i) {
                        var a = d();
                        a.report = i, $.ajax({
                            url: "/restaurants/admin/reports/executionMetaData",
                            data: a,
                            success: function(e) {
                                var n = {
                                    enableWeb: e.availableFormats.indexOf("WEB") >= 0,
                                    enableEmailExport: e.availableFormats.indexOf("EMAIL_EXPORT") >= 0,
                                    errorMsg: e.errorMsg,
                                    warningMsg: e.warningMsg
                                };
                                "REPORTING" === e.databaseType && (n.reportingDatabaseSnapshotDate = e.reportingDatabaseSnapshotDate), t.resolve(n)
                            },
                            error: function() {
                                t.resolve(S())
                            }
                        })
                    } else t.resolve(S())
                }

                function _(e, t) {
                    var n = $("#adhoc-export-btn"),
                        i = $("#adhoc-export-submit-btn");
                    e ? (n.show(), i.data("url", t)) : (n.hide(), i.data("url", ""))
                }

                function D() {
                    var e = $(this),
                        n = $(e.attr("href")),
                        i = e.data("loadUrl"),
                        a = e.data("async"),
                        o = e.data("sharded"),
                        r = e.data("hideLoadingMask"),
                        d = $(".shard-btn > button");
                    void 0 !== d && d.prop("disabled", !o), x(function(o) {
                        if (!i || o.errorMsg || e.data("loaded") && !e.data("dirty")) e.data("dirty") && (e.removeData("dirty"), n.find(".dataTable").each(function() {
                            $(this).dataTable().fnDraw()
                        }));
                        else if (e.data("loaded", !0), e.removeData("dirty"), o.enableWeb) {
                            var d = function(e) {
                                    n.html(e), n.unmask(), n.removeClass("loading"), n.css("min-height", "")
                                },
                                s = function(e) {
                                    n.html('<div class="alert alert-error">' + e + "</div>")
                                };
                            if (n.css("min-height", "80px"), r !== !0 && (n.addClass("loading"), n.mask("Loading...")), i = t(i), a) {
                                var c = l.getOrCreateElmtId(n),
                                    u = {
                                        success: d,
                                        error: s
                                    };
                                g(i, null, c, u)
                            } else $.get(i, function(e) {
                                e = l.trimKeepalivePrefix(e), d(e)
                            }, "html")
                        }
                    })
                }

                function I(e) {
                    if (e.oInit.excelExportUrl) {
                        $(e.nTableWrapper).on("click", "a.export-link", function(i) {
                            i.preventDefault();
                            var a = $(this),
                                o = a.attr("href");
                            if (o = t(o), e.oInit.fnServerParams) {
                                var r = [];
                                e.oInit.fnServerParams(r), o = n(r, o)
                            }
                            if (a.data("async")) {
                                l.pendingReports = l.pendingReports || {};
                                var d = !1;
                                if ($.each(l.pendingReports, function() {
                                        if (this.requestUrl == o) return d = !0, !1
                                    }), !d) {
                                    g(o, null, "export_" + (new Date).getTime() + "_" + Math.floor(1e4 * Math.random()), j.download, {
                                        link: a
                                    })
                                }
                            } else window.location = o
                        })
                    }
                }
                var M, R, P, A, O = "-2",
                    N = "-1",
                    L = !1,
                    U = {},
                    F = {
                        reportScheduled: "#scheduled-option",
                        reportSource: "#source-option",
                        reportServiceArea: "#service-area-option",
                        reportService: "#service-option",
                        reportRevenueCenter: "#revenue-center-option",
                        reportVoided: "#voided-option",
                        reportDiscount: "#discount-option",
                        reportState: "#state-option",
                        reportDiningOption: "#dining-option-option",
                        reportTaxExempt: "#tax-exempt-option",
                        reportItemTags: "#item-tags-option"
                    },
                    G = ["#more-dropdown-container", "#dining-option-option", "#discount-option", "#revenue-center-option", "#scheduled-option", "#service-area-option", "#service-option", "#source-option", "#state-option", "#tax-exempt-option", "#voided-option"],
                    j = {
                        download: {
                            beforeRequest: function(e) {
                                if (e.passthroughs && e.passthroughs.link) {
                                    var t = e.passthroughs.link;
                                    t.find("img").hide(), t.append('<img src="' + l.staticResRoot + '/images/ajax-loader-small.gif" class="spinner" style="margin-top:8px" />')
                                }
                            },
                            success: function(e, t) {
                                $("<iframe/>").attr({
                                    src: e.downloadUrl,
                                    style: "visibility:hidden;display:none"
                                }).appendTo($("body")), h(t), t.passthroughs && t.passthroughs.success && t.passthroughs.success()
                            },
                            progress: function(e, t) {
                                if (t.passthroughs && t.passthroughs.link) {
                                    var n = t.passthroughs.link,
                                        i = n.prev();
                                    i.is(".progress-label") || (i = $('<div style="float:right;padding:5px;display:none" class="softer progress-label">Processed: <span></span></div>'), i.insertBefore(n));
                                    var a = l.formatting.formatCommas(e);
                                    i.show().find("span").text(a)
                                }
                            },
                            error: function(e, t) {
                                h(t), alert(e, t)
                            }
                        }
                    };
                return {
                    init: function(e, t) {
                        T(), w(), b(e + "?reportHtml=true", t)
                    },
                    highlightUpdateBtn: function() {
                        $("#update-btn,#adhoc-export-btn").addClass("dropdown-non-default").removeClass("btn-default")
                    },
                    reloadReport: function() {
                        C()
                    },
                    exposeEmailExport: function(e, t) {
                        _(e, t)
                    },
                    refreshExecutionMetaData: function(e) {
                        x(e)
                    },
                    reloadReportTab: function(e, t) {
                        var n = $('a[href="#' + e + '"]');
                        n.data("dirty", !0), n.closest("li").hasClass("active") ? D.call(n) : t && n.tab("show")
                    },
                    loadHtmlAsyncReport: function(e, t, n, i) {
                        var a = $("#" + t);
                        g(e, null, t, {
                            success: function(e) {
                                a.html(e), $.isFunction(n) && n()
                            },
                            error: function(e) {
                                a.html('<div class="alert alert-error">' + e + "</div>"), $.isFunction(i) && i()
                            }
                        })
                    },
                    loadAsyncReportDataHandler: function(e, t, n, i, a) {
                        g(e, t, n, i, a)
                    },
                    makeExportAsync: function(e) {
                        $("#" + e).click(function(n) {
                            n.preventDefault();
                            var i = j.download,
                                a = t($(this).attr("href")),
                                o = !1;
                            l.pendingReports = l.pendingReports || {}, $.each(l.pendingReports, function() {
                                if (this.requestUrl == a) return o = !0, !1
                            }), o || g(a, null, e, i)
                        })
                    },
                    asyncFormExportSubmit: function(e, t) {
                        var n = j.download;
                        g(e.attr("action"), e.serialize(), l.getOrCreateElmtId(e), n, {
                            success: t
                        })
                    },
                    updateCustomTimeOptions: function(e) {
                        e.attr("data-value") === N ? $(".report-options .custom-time-range").css("display", "inline-block").find("input").on("input", function() {
                            l.reporting.highlightUpdateBtn()
                        }) : $(".report-options .custom-time-range").hide()
                    },
                    shouldShowHr: function() {
                        var e = $("#filter-container-hr");
                        0 != e.siblings().length && e.css("display", "block")
                    },
                    shouldRemoveHr: function() {
                        var e = $("#filter-container-hr");
                        1 == e.siblings().length && e.css("display", "none")
                    },
                    augmentTable: function(e, t) {
                        var n, i = t.noColumnSelector ? "" : '<"column-selector"C>',
                            a = t.noPerPageSelector ? "" : '<"per-page-selector"l>',
                            o = t.noExportSelector ? "" : '<"excel-export"E>',
                            r = (t.search ? "f" : "") + '<"row"<r>><"row"' + a + o + i + '<"current-page-info"i>>t<"row"<p>>';
                        if ("function" == typeof t.onRowSelected) {
                            var d = t.fnCreatedRow;
                            n = function(e) {
                                var n = arguments;
                                $(e).mouseover(function() {
                                    $(this).addClass("info cursor-pointer")
                                }).mouseout(function() {
                                    $(this).removeClass("info cursor-pointer")
                                }).click(function(e) {
                                    if (!e.target || 0 === $(e.target).closest(".report-cell-link").length) {
                                        var i = Array.prototype.slice.call(n);
                                        i.unshift(e), t.onRowSelected.apply(this, i)
                                    }
                                }), d && d.apply(this, n)
                            }
                        } else n = t.fnCreatedRow;
                        var s = $("#" + e),
                            c = {
                                sDom: r,
                                sWrapper: "dataTables_wrapper form-inline",
                                sPaginationType: "bootstrap",
                                aaSorting: [
                                    [0, "desc"]
                                ],
                                bServerSide: !0,
                                iDisplayLength: 25,
                                oColVis: {
                                    iOverlayFade: 100
                                },
                                bAutoWidth: !1,
                                fnInitComplete: I,
                                fnDrawCallback: function(e) {
                                    var t = $(e.nTableWrapper);
                                    e._iRecordsTotal < e._iDisplayLength ? t.find(".dataTables_paginate").hide() : t.find(".dataTables_paginate").show()
                                },
                                fnCreatedRow: n,
                                fnServerData: function(e, n, i, a) {
                                    function o(e) {
                                        e = e || "Error encountered retrieving results", s.fnProcessingIndicator(!1), alert(e)
                                    }

                                    function r(e) {
                                        var t = $("#" + s[0].id + "_wrapper"),
                                            n = t.find(".excel-export");
                                        1 == n.length && (0 === e.iTotalRecords ? n.hide() : n.show()), i.call(this, e)
                                    }
                                    var d = [],
                                        c = /^(bRegex)|(bSearchable)|(bSortable)/;
                                    if ($.each(n, function(e, t) {
                                            c.test(t.name) || d.push(t)
                                        }), $.each(a.aoColumns, function(e, t) {
                                            d.push({
                                                name: "bVisible_" + e,
                                                value: t.bVisible
                                            })
                                        }), $.each(U, function(e, t) {
                                            d.push({
                                                name: e,
                                                value: t
                                            })
                                        }), t.async) {
                                        g(e, d, s[0].id, {
                                            success: r,
                                            error: o
                                        })
                                    } else a.jqXHR = $.ajax({
                                        dataType: "text",
                                        type: "GET",
                                        url: e,
                                        data: d,
                                        success: function(e) {
                                            e = l.trimKeepalivePrefix(e);
                                            var t = $.parseJSON(e);
                                            void 0 !== t.status ? o(t.message) : r(t)
                                        },
                                        error: function() {
                                            s.fnProcessingIndicator(!1)
                                        }
                                    })
                                },
                                sCookiePrefix: "ToastTable_"
                            };
                        t.stateIdentifier && (c.fnStateSave = function(e, n) {
                            localStorage.setItem("ToastTables_" + t.stateIdentifier, JSON.stringify(n))
                        }, c.fnStateLoad = function() {
                            return JSON.parse(localStorage.getItem("ToastTables_" + t.stateIdentifier))
                        }), t = $.extend(!0, c, t);
                        var u = !1;
                        s.bind("processing", function(e, t, n) {
                            if (n) {
                                if (u) return;
                                s.mask("Loading...", 500), u = !0
                            } else {
                                if (!u) return;
                                s.unmask(), u = !1
                            }
                        });
                        var p = s.dataTable(t);
                        return t.searchDelay > 0 && p.fnSetFilteringDelay(t.searchDelay), t.searchOnEnter === !0 && p.fnSetFilteringOnEnter(), p.bootstrapifyDataTable()
                    },
                    augmentDOMTable: function(e, t) {
                        var n = t.noColumnSelector ? "" : '<"column-selector"C>',
                            i = t.noPageInfo ? "" : '<"current-page-info"i>',
                            a = t.noExportSelector ? "" : '<"excel-export"E>',
                            o = '<"row"<r>><"row"<"per-page-selector"l>' + a + n + i + '>t<"row"<p>>';
                        return t = $.extend(!0, {
                            sDom: o,
                            sWrapper: "dataTables_wrapper form-inline",
                            sPaginationType: "bootstrap",
                            iDisplayLength: 25,
                            oColVis: {
                                iOverlayFade: 100
                            },
                            bAutoWidth: !1,
                            bDestroy: !0,
                            fnInitComplete: I,
                            fnDrawCallback: function(e) {
                                var t = $(e.nTableWrapper);
                                e.fnRecordsTotal() < e._iDisplayLength ? t.find(".dataTables_paginate").hide() : t.find(".dataTables_paginate").show()
                            }
                        }, t), $("#" + e).dataTable(t).bootstrapifyDataTable()
                    },
                    drawChart: function(e) {
                        L ? e.call(l.reporting) : google.setOnLoadCallback(e)
                    },
                    parseChartTimeSeries: function(e, t) {
                        if (!e) return [];
                        var n = $.parseJSON(e),
                            i = [];
                        if (n.dataPoints)
                            for (var a = 0; a < n.dataPoints.length; a++) {
                                var o, r = n.dataPoints[a],
                                    l = [],
                                    d = "" + r.yyyymmdd,
                                    s = d.substring(0, 4),
                                    c = parseInt(d.substring(4, 6), 10) - 1,
                                    u = d.substring(6);
                                o = r.hourOfDay ? new Date(s, c, u, r.hourOfDay) : new Date(s, c, u), l.push(o), l.push(r.value);
                                for (var p = 0; p < r.moreValues.length; p++) l.push(r.moreValues[p]);
                                for (; l.length < t.length;) l.push(0);
                                i.push(l)
                            }
                        return i
                    },
                    googleChartsCallback: function() {
                        L = !0
                    },
                    setReportRestaurant: function(e) {
                        $("#report-restaurants").treepicker("val", [e]), $(".report-container .nav-tabs > li > a").data("dirty", !0)
                    },
                    setReportDates: function(e, t) {
                        var n = $(".report-options"),
                            i = n.find('.btn-group[data-field="reportDateRange"]');
                        i.data("value", "custom"), i.find(".dropdown-label").html("Custom Date"), c(e, t), k(), o(), l.reporting.updateDisplayedDates(e, t, !0)
                    },
                    loadNoInitialLoadTab: function(e, n, i) {
                        e.addClass("loading"), e.mask("Loading..."), l.reporting.loadHtmlAsyncReport(t(n), i, function() {
                            e.unmask(), e.removeClass("loading")
                        }, function() {
                            alert("Error loading report"), e.unmask(), e.removeClass("loading")
                        })
                    },
                    updateDisplayedDates: function(e, t, n) {
                        var i = $("#date-display");
                        n ? i.hide() : (0 == i.length && (i = $('<div id="date-display" class="report-options-label"></div>').appendTo($(".admin-toolbar .admin-col-right").empty())), i.html("From " + e + " to " + t), i.show())
                    },
                    augmentReportUrlWithFilters: function(e) {
                        return t(e)
                    },
                    floatingHeader: function(e) {
                        var t = e + "-header-fixed",
                            n = '<table class="table table-bordered table-striped header-fixed" id="' + t + '"></table>',
                            i = function() {
                                if (a()) {
                                    $("#" + e).after(n);
                                    var i = $("#" + t);
                                    i.css("top", o()), i.css("width", $("#" + e).width());
                                    var r = $("#" + e + " > thead");
                                    i = i.append(r.clone()), $.each(r.find("tr > th"), function(e, t) {
                                        var n = $(t).width();
                                        $(i.find("tr > th")[e]).width(n)
                                    })
                                }
                            },
                            a = function() {
                                return $("#" + e).width() <= (window.innerWidth > 0 ? window.innerWidth : screen.width)
                            },
                            o = function() {
                                var e = $(".navbar-fixed-top").height();
                                return 82 == e ? e : 0
                            };
                        $(window).bind("scroll", function() {
                            var n = $(this).scrollTop(),
                                a = $("#" + e);
                            if (a.length > 0) {
                                var r = a.offset().top - o(),
                                    l = $("#" + t);
                                n >= r ? 0 == l.length && i() : n < r && l.remove()
                            }
                        }), $(window).bind("resize", function() {
                            var n = $("#" + e);
                            if (n.length > 0) {
                                var a = n.offset().top - o(),
                                    r = $("#" + t);
                                $(window).scrollTop() >= a && (r.length > 0 && r.remove(), i())
                            }
                        })
                    }
                }
            }(), l.reporting.labor = function() {
                function e() {
                    r = $("#time-entry"), d = r.find(".template"), s = r.find(".actual"), c = r.find(".modal-footer button"), u = r.find(".modal-footer img")
                }

                function t() {
                    c.prop("disabled", !0), u.show();
                    var e = r.find("form");
                    s.load(e.attr("action"), e.serializeArray(), function(e) {
                        var t = $(e);
                        (t.is("form") || t.find("form").length > 0) && i()
                    })
                }

                function n() {
                    d.show(), s.hide(), r.css("top", ""), $("body").css("overflow", "hidden")
                }

                function i() {
                    d.hide(), s.show();
                    var e = r.find(".date-field");
                    if (2 == e.size()) {
                        e.datepicker({
                            format: "mm-dd-yyyy"
                        });
                        var t = $(".datepicker");
                        t.slice(t.size() - 2).css("z-index", 1050), r.off("hidden").on("hidden", function() {
                            var e = $(".datepicker");
                            e.slice(e.size() - 2).remove()
                        })
                    }
                    r.find("#entry_job_id").change(function() {
                        $("#entry_job_id :selected").attr("data") ? $("#cash-tips").show() : $("#cash-tips").hide()
                    }), r.find("select").bootstrapifySelect();
                    var n = window.innerHeight ? window.innerHeight : $(window).height();
                    if (n < r.height()) {
                        var i = r.find(".actual");
                        i.height(i.height() - r.height() + n - 20), i.css("overflow-y", "auto"), r.css("top", "10px")
                    } else r.offset().top + r.height() > n && r.css("top", (n - r.height()) / 2 + "px");
                    c.prop("disabled", !1), u.hide(), r.on("hidden", function() {
                        $("body").css("overflow", "auto")
                    })
                }

                function a(e, a, o) {
                    n(), e ? (s.load("labor/timeEntry?id=" + e, function(e, t) {
                        "success" === t ? i() : r.modal("hide")
                    }), r.find(".btn-danger").show(), r.find("h3").text("Update Time Entry")) : a ? (s.load("labor/timeEntryUserCreate?rUserId=" + a, function(e, t) {
                        "success" === t ? i() : r.modal("hide")
                    }), r.find(".btn-danger").hide(), r.find("h3").text("Add Time Entry")) : (s.load("labor/timeEntryCreate?previousRestaurantId=" + $("#restaurantId").val() + (null == o ? "" : "&restaurantId=" + o), function(e, n) {
                        "success" === n ? (i(), $("#entry_user_id").change(function() {
                            t()
                        })) : r.modal("hide")
                    }), r.find(".btn-danger").hide(), r.find("h3").text("Add Time Entry")), r.modal()
                }

                function o(e, t) {
                    n(), t ? (s.load("labor/timeEntryBreak?id=" + t + "&entryId=" + e, function(e, t) {
                        "success" === t ? i() : r.modal("hide")
                    }), r.find(".btn-danger").show(), r.find("h3").text("Update Break")) : (s.load("labor/timeEntryBreakCreate?entryId=" + e, function(e, t) {
                        "success" === t ? i() : r.modal("hide")
                    }), r.find(".btn-danger").hide(), r.find("h3").text("Add Break")), r.modal()
                }
                var r, d, s, c, u;
                return {
                    init: function() {
                        e(), r.find(".btn-primary").click(function() {
                            t()
                        }), r.find(".btn-danger").click(function() {
                            "breaks-form" == l.editorCommon.getForm().attr("id") ? confirm("Are you sure you want to delete this break?") && ($("#delete_entry").val("false"), $("#delete_break").val("true"), t()) : confirm("Are you sure you want to delete this time entry?") && ($("#delete_entry").val("true"), $("#delete_break").val("false"), t())
                        })
                    },
                    showEditTimeEntryDialog: function(e) {
                        a(e, null)
                    },
                    showNewTimeEntryDialog: function(e, t) {
                        a(null, t, e)
                    },
                    showEditTimeEntryBreakDialog: function(e, t) {
                        o(e, t)
                    }
                }
            }(), l.ownerTargetEditor = function() {
                return {
                    init: function() {
                        l.enableEntityTableSelect($(".owner-target-container")), $(document).ready(function() {
                            $(".targetLabel").tooltip({
                                container: ".targetLabel"
                            }), $(".ownerLabel").tooltip({
                                container: ".ownerLabel"
                            }), $("#target_input").change(function(e) {
                                var t = document.getElementById("openModalButton");
                                t && (t.value = e.target.value, t.click())
                            })
                        })
                    }
                }
            }, l.auditing = function() {
                var e;
                return {
                    init: function(t, n) {
                        l.editorCommon.init(), e = n
                    },
                    submit: function(t) {
                        $("#audit-div").empty().show(), $("#audit-loading").show(), $("#btn-orders-submit").prop("disabled", !0), $("#btn-restaurant-users-submit").prop("disabled", !0);
                        var n = t ? "ORDERS" : "RESTAURANT_USERS";
                        $('input[name="updatesType"]').val(n);
                        var i = $("#audit-form").serialize();
                        $.get(e, i, function(e) {
                            $("#audit-loading").hide(), $("#audit-div").html(e), $("#btn-orders-submit").prop("disabled", !1), $("#btn-restaurant-users-submit").prop("disabled", !1), $("html,body").animate({
                                scrollTop: $("#anchor").offset().top
                            }, "fast")
                        })
                    }
                }
            }(), l.preModifierEditor = function() {
                return {
                    init: function() {
                        l.editorCommon.init();
                        var e = $("#preModifierEditor-table");
                        l.enableEntityTableRowTemplate($("#add-preModifier-new"), e, void 0, function() {
                            l.enableChildEntityTable(e, "preModifier"), l.editorCommon.updateCheckboxes(e), l.editorCommon.enableColorEditor($(this).find(".color-editor")), $(this).on("click", ".scaleprice :checkbox", function() {
                                var e = $(this).is(":checked") ? "true" : "false";
                                $(this).closest("td").find(":hidden").val(e);
                                var t = $(this).closest("tr").find(".fixedcolumn"),
                                    n = $(this).closest("tr").find(".scalecolumn"),
                                    i = t.find("input"),
                                    a = n.find("input");
                                $(this).is(":checked") ? (n.addClass("fadedin").removeClass("fadedout"), t.removeClass("fadedin").addClass("fadedout"), a.removeAttr("disabled"), i.attr("disabled", "disabled")) : (n.removeClass("fadedin").addClass("fadedout"), t.addClass("fadedin").removeClass("fadedout"), a.attr("disabled", "disabled"), i.removeAttr("disabled"))
                            }), $(this).find("select").selectpicker()
                        }), l.editorCommon.updateCheckboxes(e), e.on("click", ".scaleprice :checkbox", function() {
                            var e = $(this).is(":checked") ? "true" : "false";
                            $(this).closest("td").find(":hidden").val(e);
                            var t = $(this).closest("tr").find(".fixedcolumn"),
                                n = $(this).closest("tr").find(".scalecolumn"),
                                i = t.find("input"),
                                a = n.find("input");
                            $(this).is(":checked") ? (n.addClass("fadedin").removeClass("fadedout"), t.removeClass("fadedin").addClass("fadedout"), a.removeAttr("disabled"), i.attr("disabled", "disabled")) : (n.removeClass("fadedin").addClass("fadedout"), t.addClass("fadedin").removeClass("fadedout"), a.attr("disabled", "disabled"), i.removeAttr("disabled"))
                        }), l.enableChildEntityTable(e, "decoratorGroup.preModifiers"), e.find("tr:not(.template) select").selectpicker()
                    }
                }
            }(), l.glCodes = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), $("i.icon-info-sign").tooltip();
                        var e = $("#glcodes-table");
                        l.enableEntityTableRowTemplate($("#add-glcode-new"), e, void 0, function() {
                            l.enableEntityTableInput($(this)), l.enableEntityTableSelect($(this)), l.enableChildEntityTable(e, "glCodes"), l.updateOrderColumn($(this))
                        }), l.enableChildEntityTable(e, "glCodes", $(".edit-glcodes"), null, null, !0), l.enableEntityTableInput(e), l.enableEntityTableSelect(e);
                        var t = $("#entities-table");
                        l.enableChildEntityTable(t, "entity", $(".edit-entities"), null, null, !0), l.enableEntityTableInput(t), l.enableEntityTableSelect(t);
                        var n = $(".glcode-mappings-table");
                        l.enableEntityTableSelect(n), $("#glbreakdown-selector :checkbox").on("change", function() {
                            var e = $("#" + $(this).val());
                            $(".glbreakdown").not(e).slideUp(), e.slideDown()
                        })
                    }
                }
            }(), l.quickAddUsers = function() {
                return {
                    init: function() {
                        l.editorCommon.init();
                        var e = $("#users-table");
                        l.enableEntityTableRowTemplate($("#add-user"), e, void 0, function() {
                            $(this).find(":text:first").focus(), l.enableEntityTableInput($(this)), l.enableEntityTableSelect($(this))
                        }), l.enableEntityTableInput(e), l.enableEntityTableSelect(e), e.on("click", "a.remove-entity", function() {
                            var e = $(this).closest("tr"),
                                t = e.prev();
                            t.hasClass("error") && t.remove(), e.remove()
                        })
                    }
                }
            }(), l.rewardsConfig = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), l.addTouchSectionEnabler("rewardsConfig_enabled", "rewards-config", !1), l.addTouchSectionEnabler("rewardsConfig_enabled", "redeem-without-program", !0), l.addTouchSectionEnabler("rewardsConfig_enabled", "reward-links", !1), l.addTouchSectionEnabler("rewardsConfig_useCustomDescription", "default-description", !0), l.addTouchSectionEnabler("rewardsConfig_useCustomDescription", "custom-description", !1), l.addTouchSectionEnabler("birthdayRewards_enabled", "birthday-rewards-config", !1), l.addTouchSectionEnabler("birthdayRewards_useCustomDescription", "birthday-rewards-default-desc", !0), l.addTouchSectionEnabler("birthdayRewards_useCustomDescription", "birthdayRewards-custom-description", !1), l.addTouchSectionEnabler("rewardsConfig_fraudAlertsEnabled", "fraud-alerts-email", !1)
                    }
                }
            }(), l.houseAccountHome = function() {
                return {
                    init: function() {
                        l.editorCommon.init()
                    }
                }
            }(), l.houseAccountCreate = function() {
                return {
                    init: function() {
                        l.editorCommon.init()
                    }
                }
            }(), l.invoiceCreate = function() {
                return {
                    init: function() {
                        $("#save-btn").click(function(e) {
                            e.preventDefault(), $('input[name="invoice.restaurantInfo"]').val($("#restaurant-info").val()), $('input[name="invoice.recipientInfo"]').val($("#recipient-info").val()), $('input[name="invoiceDate"]').val($("#invoice-date").html()), $('input[name="dueDate"]').val($("#due-date").html());
                            var t = $("#invoiceForm"),
                                n = 0;
                            for (var i in window.selectedTransactions) window.selectedTransactions[i] && (t.append('<input type="hidden" name="selectedTransactions[' + n + ']" value="' + i + '" /> '), n++);
                            t.submit()
                        })
                    }
                }
            }(), l.deliveryConfig = function() {
                function e(e) {
                    y(), P ? t(e) : n(e)
                }

                function t(e) {
                    x() || p(e.lngLat.lat, e.lngLat.lng, !1, !0)
                }

                function n(e) {
                    x() ? A.length >= O ? alert("Reached maximum number of points.") : i(e.latLng) : p(e.latLng.lat(), e.latLng.lng(), !1, !0)
                }

                function i(e) {
                    D.getPath().push(e);
                    var t = "/public/images/red_pin.png",
                        n = new google.maps.Marker({
                            position: e,
                            map: _,
                            draggable: !0,
                            icon: t
                        });
                    A.push(n), n.setTitle("#" + D.getPath().getLength()), google.maps.event.addListener(n, "click", function() {
                        n.setMap(null);
                        for (var e = 0, t = A.length; e < t && A[e] != n; ++e);
                        A.splice(e, 1), D.getPath().removeAt(e), a()
                    }), google.maps.event.addListener(n, "dragend", function() {
                        for (var e = 0, t = A.length; e < t && A[e] != n; ++e);
                        D.getPath().setAt(e, n.getPosition()), a()
                    }), a()
                }

                function a() {
                    var e = google.maps.geometry.encoding.encodePath(D.getPath());
                    $("#encodedPolygonInput").val(e).trigger("change")
                }

                function o(e) {
                    P ? r(e) : d(e)
                }

                function r(e) {
                    var t = polyline.decode(e);
                    s();
                    var n = [];
                    if (t.forEach(function(e) {
                            return e.reverse()
                        }), t.push(t[0]), n.push(t), n[0][0] && n.length > 0) {
                        var i = {
                            type: "Polygon",
                            coordinates: n
                        };
                        I.add(i)
                    }
                }

                function d(e) {
                    var t = google.maps.geometry.encoding.decodePath(e);
                    s();
                    for (var n in t) i(t[n])
                }

                function s() {
                    $("#encodedPolygonInput").val(""), P ? c() : u()
                }

                function c() {
                    I.deleteAll()
                }

                function u() {
                    for (var e in A) A[e].setMap(null);
                    A = [], D.setMap(null), D = null, D = new google.maps.Polygon({
                        strokeWeight: 3,
                        fillColor: "#5555FF"
                    }), D.setMap(_)
                }

                function p(e, t, n, i) {
                    P ? f(e, t, n, i) : h(e, t, n, i)
                }

                function f(e, t, n, i) {
                    var a = [t, e];
                    if (n && _.jumpTo({
                            center: a,
                            zoom: N
                        }), M && (M.remove(), M = null), i) {
                        var o = document.createElement("div");
                        o.className = "marker", M = new mapboxgl.Marker(o).setLngLat(a).addTo(_)
                    }
                }

                function h(e, t, n, i) {
                    var a = new google.maps.LatLng(e, t);
                    if (n && (_.setCenter(a), _.setZoom(13)), M && (M.setMap(null), M = null), i) {
                        M = new google.maps.Marker({
                            position: a,
                            map: _,
                            icon: "/public/images/restaurant_pin.png",
                            title: "Restaurant"
                        })
                    }
                }

                function m(e) {
                    e && (y(), P ? g(e) : v(e))
                }

                function g(e) {
                    var t = encodeURI(e),
                        n = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + t + ".json";
                    $.ajax({
                        dataType: "json",
                        url: n,
                        data: {
                            access_token: R,
                            limit: 1,
                            types: "address"
                        }
                    }).done(function(e) {
                        var t = e.features;
                        if (t)
                            if (t.length > 0) {
                                if (_)
                                    if (_.jumpTo({
                                            center: [t[0].center[0], t[0].center[1]],
                                            zoom: N
                                        }), M) M.setLngLat([t[0].center[0], t[0].center[1]]);
                                    else {
                                        var n = document.createElement("div");
                                        n.className = "marker", M = new mapboxgl.Marker(n).setLngLat([t[0].center[0], t[0].center[1]]).addTo(_)
                                    }
                            } else b("Sorry, can't find the address.");
                        else b("Sorry, can't find the address.")
                    })
                }

                function v(e) {
                    $.ajax({
                        dataType: "json",
                        url: "https://maps.googleapis.com/maps/api/geocode/json",
                        data: {
                            sensor: !1,
                            address: e,
                            key: R
                        }
                    }).done(function(e) {
                        var t = e.results;
                        if (e.status == google.maps.GeocoderStatus.OK)
                            if (t.length > 0) {
                                var n = new google.maps.LatLng(t[0].geometry.location.lat, t[0].geometry.location.lng);
                                p(n.lat(), n.lng(), !0, !0)
                            } else b("Sorry, can't find the address.");
                        else b("Sorry, can't find the address.")
                    })
                }

                function b(e) {
                    $("#mapAlert").show(), $("#mapAlert").text(e)
                }

                function y() {
                    $("#mapAlert").hide()
                }

                function k(e) {
                    var t = [];
                    e.geometry.coordinates[0].pop(), e.geometry.coordinates[0].forEach(function(e) {
                        return t.push(e)
                    });
                    var n = t.map(function(e) {
                            return [e[0], e[1]].reverse()
                        }),
                        i = polyline.encode(n);
                    $("#encodedPolygonInput").val(i).trigger("change")
                }

                function w() {
                    if (P ? C() : E(), x()) {
                        p($("#restaurantLat").val(), $("#restaurantLng").val(), !0, !0);
                        var e = $("#encodedPolygonInput").val();
                        e && o(e)
                    } else p(42.3532184, -71.0597952, !0, !1)
                }

                function C() {
                    mapboxgl.accessToken = R, _ = new mapboxgl.Map({
                        container: "map-canvas",
                        style: "mapbox://styles/mapbox/streets-v9",
                        zoom: N
                    }), I = new MapboxDraw({
                        displayControlsDefault: !1,
                        controls: {
                            polygon: !0,
                            trash: !0
                        },
                        styles: [{
                            id: "gl-draw-line",
                            type: "line",
                            filter: ["all", ["==", "$type", "LineString"],
                                ["!=", "mode", "static"]
                            ],
                            layout: {
                                "line-cap": "round",
                                "line-join": "round"
                            },
                            paint: {
                                "line-color": "#000",
                                "line-width": 3
                            }
                        }, {
                            id: "gl-draw-polygon-fill",
                            type: "fill",
                            filter: ["all", ["==", "$type", "Polygon"],
                                ["!=", "mode", "static"]
                            ],
                            paint: {
                                "fill-color": "#5555FF",
                                "fill-outline-color": "#5555FF",
                                "fill-opacity": .3
                            }
                        }, {
                            id: "gl-draw-polygon-stroke-active",
                            type: "line",
                            filter: ["all", ["==", "$type", "Polygon"],
                                ["!=", "mode", "static"]
                            ],
                            layout: {
                                "line-cap": "round",
                                "line-join": "round"
                            },
                            paint: {
                                "line-color": "#000",
                                "line-width": 3
                            }
                        }, {
                            id: "gl-draw-polygon-and-line-vertex-halo-active",
                            type: "circle",
                            filter: ["all", ["==", "meta", "vertex"],
                                ["==", "$type", "Point"],
                                ["!=", "mode", "static"]
                            ],
                            paint: {
                                "circle-radius": 5,
                                "circle-color": "#FFF"
                            }
                        }, {
                            id: "gl-draw-polygon-and-line-vertex-active",
                            type: "circle",
                            filter: ["all", ["==", "meta", "vertex"],
                                ["==", "$type", "Point"],
                                ["!=", "mode", "static"]
                            ],
                            paint: {
                                "circle-radius": 3,
                                "circle-color": "#D20C0C"
                            }
                        }, {
                            id: "gl-draw-polygon-midpoints",
                            type: "circle",
                            filter: ["all", ["==", "meta", "midpoint"]],
                            paint: {
                                "circle-radius": 5,
                                "circle-color": "#D20C0C"
                            }
                        }, {
                            id: "gl-draw-line-static",
                            type: "line",
                            filter: ["all", ["==", "$type", "LineString"],
                                ["==", "mode", "static"]
                            ],
                            layout: {
                                "line-cap": "round",
                                "line-join": "round"
                            },
                            paint: {
                                "line-color": "#000",
                                "line-width": 3
                            }
                        }, {
                            id: "gl-draw-polygon-fill-static",
                            type: "fill",
                            filter: ["all", ["==", "$type", "Polygon"],
                                ["==", "mode", "static"]
                            ],
                            paint: {
                                "fill-color": "#000",
                                "fill-outline-color": "#000",
                                "fill-opacity": .1
                            }
                        }, {
                            id: "gl-draw-polygon-stroke-static",
                            type: "line",
                            filter: ["all", ["==", "$type", "Polygon"],
                                ["==", "mode", "static"]
                            ],
                            layout: {
                                "line-cap": "round",
                                "line-join": "round"
                            },
                            paint: {
                                "line-color": "#000",
                                "line-width": 3
                            }
                        }, {
                            id: "gl-draw-polygon-and-line-vertex-halo-static",
                            type: "circle",
                            filter: ["all", ["==", "meta", "vertex"],
                                ["==", "$type", "Point"],
                                ["==", "mode", "static"]
                            ],
                            paint: {
                                "circle-radius": 5,
                                "circle-color": "#FFF"
                            }
                        }, {
                            id: "gl-draw-polygon-and-line-vertex-static",
                            type: "circle",
                            filter: ["all", ["==", "meta", "vertex"],
                                ["==", "$type", "Point"],
                                ["==", "mode", "static"]
                            ],
                            paint: {
                                "circle-radius": 3,
                                "circle-color": "#D20C0C"
                            }
                        }]
                    }), _.addControl(I), _.on("click", function(t) {
                        e(t)
                    }), _.on("draw.create", function(e) {
                        k(e.features[0])
                    }), _.on("draw.update", function(e) {
                        k(e.features[0])
                    }), _.on("draw.modechange", function(e) {
                        T(e)
                    }), MapboxDraw.modes.direct_select.onFeature = function() {
                        _.dragPan.enable()
                    }, _.on("draw.selectionchange", function(e) {
                        S(e)
                    })
                }

                function T(e) {
                    var t = I.getAll();
                    if ("draw_polygon" == I.getMode()) {
                        var n = [],
                            i = t.features[t.features.length - 1].id;
                        t.features.forEach(function(e) {
                            "Polygon" === e.geometry.type && e.id !== i && n.push(e.id)
                        }), I.delete(n)
                    }
                }

                function S(e) {
                    var t = e.features,
                        n = e.points,
                        i = t && t.length > 0,
                        a = n && n.length > 0;
                    i && !a && "direct_select" !== I.getMode() && I.changeMode("direct_select", {
                        featureId: t[0].id
                    })
                }

                function E() {
                    if ("undefined" != typeof google) {
                        var t = {
                            zoom: 8,
                            center: new google.maps.LatLng(42.3532184, -71.0597952),
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            panControl: !1,
                            zoomControl: !0,
                            mapTypeControl: !0,
                            scaleControl: !0,
                            streetViewControl: !1,
                            overviewMapControl: !0
                        };
                        _ = new google.maps.Map(document.getElementById("map-canvas"), t), D = new google.maps.Polygon({
                            strokeWeight: 3,
                            fillColor: "#5555FF"
                        }), D.setMap(_), google.maps.event.addListener(_, "click", e)
                    }
                }

                function x() {
                    return $("#restaurantLat").val() && $("#restaurantLng").val()
                }
                var _, D, I, M, R, P, A = [],
                    O = 200,
                    N = 12;
                return {
                    init: function(e, t) {
                        function n() {
                            g && "" !== u.val() ? p.html(u.val()) : p.html(v)
                        }

                        function i() {
                            var e = T;
                            C && E.val() && "" !== E.val() && (e = E.val(), k && (e += " toasttab.com/curbside/[order-id]")), null != e && (e = e.replace("toasttab.com/curbside/[order-id]", "<a>toasttab.com/curbside/[order-id]</a>")), S.html(e), S.change()
                        }
                        R = e, P = t, l.editorCommon.init();
                        var a = !1,
                            o = $(".no-delivery-hidden"),
                            r = $(".first-party-only"),
                            d = $("#deliveryConfig_deliveryCustomerInfoDisplayType_FULL");
                        $("#deliveryMode_FIRST_PARTY").is(":checked");
                        $("#deliveryMode_THIRD_PARTY").is(":checked") && d.parent().parent().hide();
                        var c = !$("#deliveryMode_NO_DELIVERY").is(":checked");
                        $(":checkbox[name='deliveryMode']").click(function() {
                            var e = $("#deliveryConfig_deliveryCustomerInfoDisplayType_PARTIAL");
                            "FIRST_PARTY" === $(this).val() ? (o.slideDown(), r.slideDown(), d.parent().parent().slideDown(), a || (w(), a = !0)) : "THIRD_PARTY" === $(this).val() ? (o.slideDown(), d.parent().parent().slideUp(), d.attr("checked", !1), d.parent().removeClass("checked"), e.attr("checked", "checked"), e.parent().addClass("checked"), r.slideUp()) : (o.slideUp(), r.slideUp())
                        }), l.addSectionEnabler("deliveryMode_THIRD_PARTY", "daas-config", !1, !0), l.addSectionEnabler("deliveryMode_FIRST_PARTY", "daas-config", !0, !0), l.addSectionEnabler("deliveryMode_NO_DELIVERY", "daas-config", !0, !0), l.addSectionEnabler("deliveryConfig_assignDriverBank_ASSIGN", "delivery-driver-bank-amount", !1, !0), l.addSectionEnabler("deliveryConfig_assignDriverBank_NEVER_ASSIGN", "delivery-driver-bank-amount", !0, !0), l.addSectionEnabler("deliveryConfig_driverReimbursement_ALWAYS_REIMBURSE", "delivery-driver-reimbursement-amount", !1, !0), l.addSectionEnabler("deliveryConfig_driverReimbursement_NEVER_REIMBURSE", "delivery-driver-reimbursement-amount", !0, !0), l.addSectionEnabler("deliveryConfig_autoPrintFutureOrderOptionViewModel_PRINT_IMMEDIATELY", "scheduled-order-send-threshold", !0, !0), l.addSectionEnabler("deliveryConfig_autoPrintFutureOrderOptionViewModel_PRINT_AT_THRESHOLD", "scheduled-order-send-threshold", !1, !0), l.addSectionEnabler("deliveryConfig_autoPrintFutureOrderOptionViewModel_DISABLED", "scheduled-order-send-threshold", !0, !0), l.addTouchSectionEnabler("curbsideArrivalConfig_curbsideArrivalEnabled", "curbside-sms-customization", !1, !0), l.addTouchSectionEnabler("curbsideArrivalConfig_customSMSEnabled", "curbside-custom-sms-message", !1, !1), l.addTouchSectionEnabler("curbsideArrivalConfig_checkInMessageEnabled", "curbside-custom-checkin-message", !1, !1), $("#deliveryConfig_assignDriverBank_NEVER_ASSIGN").click(function() {
                            $("#deliveryConfig_driverBankStartingAmount").val("")
                        }), l.addTouchSectionEnabler("deliveryConfig_onlineOrderThrottlingEnabled", "preparation-times-throttling-alert", !1, !0), l.addTouchSectionEnabler("deliveryConfig_onlineOrderThrottlingEnabled", "takeout-throttling-time", !1, !0), l.addTouchSectionEnabler("deliveryConfig_onlineOrderThrottlingEnabled", "delivery-throttling-time", !1, !0), l.addTouchSectionDisabler("deliveryConfig_onlineOrderThrottlingEnabled", "deliveryConfig_takeoutPreparationTimeMin", !1, !0), l.addTouchSectionDisabler("deliveryConfig_onlineOrderThrottlingEnabled", "deliveryConfig_deliveryPreparationTimeMin", !1, !0);
                        var u = $("#curbsideArrivalConfig_checkInMessage"),
                            p = $("#curbside-spa-message"),
                            f = $("#curbsideArrivalConfig_checkInMessageEnabled_true"),
                            h = $("#curbsideArrivalConfig_checkInMessageEnabled_false"),
                            g = f.is(":checked"),
                            v = u.prop("placeholder");
                        $(function() {
                            u.keyup(function() {
                                n()
                            }), f.change(function() {
                                g = !0, n()
                            }), h.change(function() {
                                g = !1, n()
                            }), n()
                        });
                        var k = void 0,
                            C = void 0,
                            T = void 0,
                            S = $("#messagePreview"),
                            E = $("#curbsideArrivalConfig_customSMS"),
                            x = $("#curbsideArrivalConfig_includeLinkInSMS_true"),
                            _ = $("#curbsideArrivalConfig_customSMSEnabled_true"),
                            D = $("#curbsideArrivalConfig_customSMSEnabled_false");
                        $(function() {
                            k = x.is(":checked"), C = _.is(":checked"), T = E.prop("placeholder"), x.change(function() {
                                k = !!$(this).is(":checked"), i()
                            }), _.change(function() {
                                C = !0, i()
                            }), D.change(function() {
                                C = !1, i()
                            }), E.keyup(function() {
                                i()
                            }), i()
                        }), y(), $("#centerAddress").keyup(function(e) {
                            return 13 != e.keyCode || ($("#centerAddressBtn").click(), !1)
                        }), $("#centerAddressBtn").click(function() {
                            return m($("#centerAddress").val()), !1
                        }), $("#resetPolygonBtn").click(function() {
                            s()
                        }), $("#locateRestaurant").click(function() {
                            return m($("#locateRestaurant").text()), $("#centerAddress").val($("#locateRestaurant").text()), !1
                        }), $("#verifyAddress").click(function() {
                            if (M) {
                                if (P) {
                                    var e = M.getLngLat();
                                    $("#restaurantLat").val(e.lat), $("#restaurantLng").val(e.lng)
                                } else {
                                    var t = M.getPosition().lat(),
                                        n = M.getPosition().lng();
                                    $("#restaurantLat").val(t), $("#restaurantLng").val(n)
                                }
                                $("#isNewGeocode").val("true"), $("#deliveryForm").submit()
                            } else b("Place a marker on the map to verify your restaurant address.")
                        }), c && (w(), a = !0), $("#delivery-receipt-printer").selectpicker(), $("#auto-add-takeout-do").click(function(e) {
                            var t = $(this);
                            if (confirm("This will automatically add a new Takeout dining option. Continue?")) {
                                var n = $("#generateTakeoutDiningOptionForm");
                                t.prop("disabled", !0).data("originalText", t.text()).text("Adding..."), $.post(n.attr("action"), n.serialize(), function(e) {
                                    var n = t.parent();
                                    200 == e.status ? (t.remove(), n.empty(), l.alertMgr.success(e.message, n)) : (t.text(t.data("originalText")).prop("disabled", !1), l.alertMgr.error(e.message, n))
                                }, "json")
                            }
                        })
                    }
                }
            }(), l.consumerAppConfig = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), l.addTouchSectionEnabler("consumerAppConfig_newCuisineType", "cuisine-option", !0, !1), l.addTouchSectionEnabler("consumerAppConfig_newCuisineType", "new-cuisine-input", !1, !0), l.addTouchSectionEnabler("consumerAppConfig_takeoutAppEnabled", "takeout-app-enabled", !1, !1), l.addTouchSectionEnabler("consumerAppConfig_takeoutAppCTAOptOutEnabled", "takeout-app-cta-opt-out-enabled", !1, !1)
                    }
                }
            }(), l.onlineOrderingConfig = function() {
                return {
                    init: function() {
                        function e() {
                            var e = $("#online-ordering-auto-reenable-snooze-selection");
                            "SNOOZE" === $(this).val() ? e.slideDown() : e.slideUp()
                        }

                        function t() {
                            var e = $("#cc-tips-section");
                            r.is(":checked") ? e.slideDown() : e.slideUp()
                        }

                        function n() {
                            a($("#delivery-allow-cc-future"))
                        }

                        function i() {
                            a($("#takeout-allow-cc-future"))
                        }

                        function a(e) {
                            e.find("label").removeClass("checked"), e.find("input").attr("checked", !1)
                        }

                        function o() {
                            $("#onlineOrderingConfig_scheduledOrderMaxDays").val("")
                        }
                        l.editorCommon.init(), $("#approval-mode-selection input").click(function() {
                            $("#approval-mode-rules-config").toggle("RULES" === this.value && this.checked), $("#approval-mode-device-config-message").toggle(!("MANUAL" === this.value && this.checked)), $("#autofire-device-config").toggle(!("MANUAL" === this.value && this.checked))
                        }), l.addTouchSectionEnabler("onlineOrderingConfig_allowSpecialRequests", "special-requests-text-field", !1, !1), l.addTouchSectionEnabler("onlineOrderingConfig_takeoutGuestCommunicationEnabled", "takeout-guest-communication-message", !1, !1), l.addTouchSectionEnabler("onlineOrderingConfig_deliveryGuestCommunicationEnabled", "delivery-guest-communication-message", !1, !1), l.addTouchSectionEnabler("onlineOrderingConfig_curbsideGuestCommunicationEnabled", "curbside-guest-communication-message", !1, !1), l.addTouchSectionEnabler("onlineOrderingConfig_enableScheduling", "scheduling-orders-enabled-section", !1, !1, o), l.addTouchSectionEnabler("onlineOrderingConfig_enableScheduling", "takeout-allow-cc-future", !1, !0, i), l.addTouchSectionEnabler("onlineOrderingConfig_enableScheduling", "delivery-allow-cc-future", !1, !0, n), l.addTouchSectionEnabler("onlineOrderingConfig_enableScheduling", "section-min-lead-time", !1, !1), l.addTouchSectionEnabler("onlineOrderingConfig_standaloneDigitalOrderingEnabled", "approval-mode-section", !0, !1), l.addTouchSectionEnabler("onlineOrderingConfig_standaloneDigitalOrderingEnabled", "standalone-approval-mode-section", !1, !1), l.addTouchSectionEnabler("onlineOrderingConfig_standaloneDigitalOrderingEnabled", "auto-print-kitchen-tickets-section", !1, !1), l.addTouchSectionEnabler("onlineOrderingConfig_scheduledOrderMaxDaysDefault", "scheduling-order-max-days-specified-section", !0, !1, o), $('input[name="onlineOrderingConfigAutoReenableAdminShim.availabilityValue"]').click(e);
                        var r = $(".cc-enabler");
                        r.click(t), $(".td-checkbox :checkbox").each(function() {
                            l.updateCheckboxContainerStyle($(this))
                        }), $(".td-checkbox :checkbox").click(function() {
                            l.updateCheckboxContainerStyle($(this))
                        })
                    }
                }
            }(), l.barcodeConfig = function() {
                return {
                    init: function() {
                        l.editorCommon.init()
                    }
                }
            }(), l.tipDistribution = function() {
                return {
                    init: function() {
                        l.editorCommon.init()
                    }
                }
            }(), l.customerFacingDisplayConfig = function() {
                return {
                    init: function() {
                        l.editorCommon.init()
                    }
                }
            }(), l.masterEditorCommon = function() {
                var e = {};
                return {
                    addColSerializationFn: function(t, n) {
                        e[t] = n
                    },
                    enableEntityActions: function(t) {
                        t.find("a.remove-entity").click(function(e) {
                            e.preventDefault();
                            var t = $(this),
                                n = $(this).siblings("a.undo-remove-entity"),
                                i = t.closest("td"),
                                a = i.closest("tr"),
                                o = i.find(".bootstrap-select");
                            a.addClass("deleted"), t.hide(), n.show(), o.removeClass("open"), i.find("a:not(.undo-remove-entity,.remove-entity)").addClass("disabled")
                        }), t.find("a.undo-remove-entity").click(function(e) {
                            e.preventDefault();
                            var t = $(this),
                                n = $(this).siblings("a.remove-entity"),
                                i = n.closest("td");
                            $(this).closest("tr").removeClass("deleted"), i.find("a").removeClass("disabled"), n.show(), t.hide()
                        }), t.find("a.version-entity").click(function(t) {
                            if (t.preventDefault(), !$(this).hasClass("disabled")) {
                                var n = $("#new-version-dialog");
                                n.find("form .pickers").remove(), n.find("form").append(n.find(".pickers").clone().show());
                                var i = $(this).closest("tr"),
                                    a = i.attr("data-entity-id"),
                                    o = i.closest("table").find("tr[data-master-id=" + i.attr("data-master-id") + "] input.target"),
                                    r = n.find(".control-group.owner .bootstrap-treepicker"),
                                    d = n.find(".control-group.target .bootstrap-treepicker"),
                                    s = n.find(".btn-primary");
                                s.prop("disabled", !0), d.addClass("shell").find(".dropdown-menu").remove(), d.find("input").val(""), r.addClass("shell").find(".dropdown-menu").remove(), r.find("input").val(""), l._initializeTreePickerTemplate(d), l._initializeTreePickerTemplate(r), d.find("li").removeClass("selected"), $.each(o, function() {
                                    d.find("li[data-val=" + $(this).val() + "]").addClass("disabled")
                                });
                                var c = function() {
                                    n.find("form .pickers input.owner").val() && n.find("form .pickers input.target").val() && s.prop("disabled", !1)
                                };
                                n.find("form .pickers input").change(function() {
                                    c()
                                }), s.one("click", function() {
                                    $(this).prop("disabled", !0)
                                }), l.enableEntityTableSelect(n);
                                var u = $('<table class="table table-bordered"/>'),
                                    p = $("<tr/>");
                                u.append($("<tr/>").append(i.closest("table").find("thead th:not(.master-column)").clone())), u.append(p), i.find(">td:not(.master-column)").each(function() {
                                    var t = $(this),
                                        n = $("<td/>");
                                    if (t.data("serializeFn")) {
                                        var i = t.data("serializeFn"),
                                            a = e[i];
                                        n.text(a.call(this))
                                    } else t.hasClass("td-input") ? n.text(t.find("input").val()) : t.hasClass("td-checkbox") ? n.text(t.find(":checkbox").val() ? "Yes" : "No") : t.hasClass("td-select") ? n.text(t.find("select option[selected]").html()) : t.hasClass("td-input-link") ? n.text(t.find(".input-link").text()) : n.text(t.text());
                                    p.append(n)
                                }), n.find(".entity-info").html(u), n.find(".entity-id").val(a), n.find(".icon-info-sign").tooltip(), n.modal().center()
                            }
                        })
                    }
                }
            }(), l.masterDetail = function() {
                return {
                    init: function(e, t) {
                        var n = e.find(".notifications").empty();
                        $("a.version-entity").click(function(t) {
                            if (t.preventDefault(), !$(this).hasClass("disabled")) {
                                e.find(".btn-primary").prop("disabled", !0), e.modal().center()
                            }
                        }), $("a.toggle-archived").click(function(e) {
                            e.preventDefault();
                            var t = $(this),
                                n = t.parent(),
                                i = n.find('[name="toggleArchived"]'),
                                a = n.closest("form");
                            i.val(!0), a.submit()
                        }), e.find("form").submit(function(i) {
                            i.preventDefault(), n.empty(), e.find(".btn-primary").button("loading");
                            var a = $(this).prop("action"),
                                o = $(this).serialize();
                            $.post(a, o, function(n) {
                                var i, a = l.trimKeepalivePrefix(n);
                                if (i = a.match(".$") ? $.parseJSON(a.replace(/\.$/, "")) : $.parseJSON(a), 200 == i.data.status) {
                                    var o = t ? "" : i.data.redirectUrl;
                                    window.location.replace(o)
                                } else l.alertMgr.error(i.data.message), e.find(".btn-primary").button("reset"), e.find(".btn-primary").prop("disabled", !1)
                            })
                        })
                    },
                    enableNewVersionDetailDialog: function(e, t) {
                        var n = $('<div style="font-weight:bold;"></div>');
                        n.append(e), $(".entity-info").html(n), $(".entity-id").val(t)
                    },
                    enableDeletion: function(e, t, n, i, a, o) {
                        $(".delete-entity").click(function() {
                            if (confirm("Are you sure you want to archive this item?")) {
                                $("#save-btn").prop("disabled", !0), $("#archived-text").text("Archiving...").show();
                                var t = $('input[name="authenticityToken"]').val();
                                $.post(e, {
                                    authenticityToken: t,
                                    entityType: n,
                                    entityId: i
                                }, function(e) {
                                    200 === e.status ? location.reload() : ($("#archived-text").hide(), alert(e.message)), $("#save-btn").prop("disabled", !1)
                                })
                            }
                        }), $(".undelete-entity").click(function() {
                            var e = $('input[name="authenticityToken"]').val();
                            $("#archived-text").text("Undoing archive...").show(), $("#save-btn").prop("disabled", !0), $.post(t, {
                                entityType: n,
                                entityId: i,
                                addToType: a,
                                addToId: o,
                                authenticityToken: e
                            }, function(e) {
                                200 === e.status ? location.reload() : alert(e.message), $("#archived-text").hide(), $("#save-btn").prop("disabled", !1)
                            })
                        })
                    },
                    renderReadonly: function() {
                        $("tr:not(.template) div.bootstrap-treepicker:not(.exclude-from-readonly), div.control-group div.bootstrap-treepicker:not(.exclude-from-readonly)").each(function() {
                            var e = $(this).find(".selected-label,").text();
                            if ("No Restaurants Selected" === e) $(this).closest(".control-group").remove();
                            else {
                                var t = '<span style="line-height:30px; margin-left:10px;">' + e + "</span>";
                                $(this).parent().empty().append(t)
                            }
                        }), $(".child-entity-table tr:not(.exclude-from-readonly,.template)").addClass("readonly").find('button:not(.exclude-from-readonly),input:not([type="hidden"], .exclude-from-readonly)').prop("disabled", !0), $("div.select:not(.exclude-from-readonly)").each(function() {
                            var e = $(this).find(".option").text(),
                                t = '<span style="font-weight:bold; line-height:30px;">' + e + "</span>";
                            $(this).parent().empty().append(t)
                        }), $('div.control-group .controls ul,ul.selection-list,input:not([type="hidden"],.search-query,.exclude-from-readonly),textarea:not(.exclude-from-readonly),select:not(.exclude-from-readonly)').addClass("disabled").prop("disabled", !0).css("cursor", "default"), $("div.control-group .controls ul.selection-list > li > label").css("cursor", "default"), $('.td-checkbox input:not([type="hidden"],.exclude-from-readonly)').addClass("disabled").prop("disabled", !0).css("cursor", "default"), $("form div.btn-group:not(.bootstrap-select, .exclude-from-readonly),form button:not(.selectpicker, .exclude-from-readonly),a.remove-entity:not(.exclude-from-readonly), form a.btn:not(.exclude-from-readonly)").remove(), $("div.color-editor .pos-cell").addClass("disabled").click(function(e) {
                            e.stopImmediatePropagation()
                        })
                    }
                }
            }(), l.menuMgmt = function() {
                function e(e, t, n) {
                    $("#" + e).click(function(e) {
                        if (e.target.readOnly) return !1;
                        var i = $("#" + t + "_inherited"),
                            a = $("#" + t),
                            o = $(this).is(":checked"),
                            r = {
                                easing: "swing"
                            };
                        o && (n ? (a.slideUp(r), i.slideDown(r)) : (a.slideDown(r), i.slideUp(r)))
                    })
                }

                function t(e, t, n, i, a, o, r, d, s, c, u, p) {
                    l.chooseEntity(e, t, n, i, l.menuMgmt.baseUrl + a, o, l.menuMgmt.baseUrl + r, d ? l.menuMgmt.baseUrl + d : null, s, c, u, p)
                }
                return {
                    baseUrl: "/restaurants/admin/menus",
                    data: {},
                    setupInheritedSection: function(t, n) {
                        e(t + "_true", n, !0), e(t + "_false", n, !1)
                    },
                    chooseMenuGroup: function(e, n, i, a) {
                        var o = "/listAllMenuGroups";
                        n && (o += "?parentSetId=" + n), t("MenuGroup", "Menu Groups", null, "Select a menu group to preview", o, function(e) {
                            var t = $("<li/>").append($('<div class="entity-name"/>').text(e.name));
                            return t.append($('<div class="entity-shortname muted smaller"></div>').text("POS Name: " + e.shortName)), e.ancestors && t.append($('<div class="entity-info muted smaller"></div>').text(e.ancestors)), e.items && t.append($('<div class="entity-items muted smaller"></div>').text(e.items)), t
                        }, "/menuGroupPreview?id=ENTITY_ID", null, i, a, function(e, t) {
                            return l.strContains(e.name, t) || l.strContains(e.info, t) || l.strContains(e.items, t)
                        }, e)
                    },
                    chooseMenuOption: function(e, n, i, a, o) {
                        var r = "MenuOption",
                            l = "Menu Options",
                            d = "Select a menu option to preview",
                            s = "/listAllMenuOptions";
                        n && (s += "?optionGroupId=" + n), n && i ? s += "&parentSetId=" + i : i && (s += "?parentSetId=" + i);
                        var c = "/getMenuOptionPricingInfo?id=ENTITY_ID";
                        n && (c += "&optionGroupId=" + n), t(r, l, null, d, s, function(e) {
                            var t = $("<li/>").append($('<div class="entity-name"/>').text(e.name));
                            return e.itemName && t.append($('<div class="entity-info muted smaller"></div>').text("Menu item: " + e.itemName)), t.append($('<div class="entity-shortname muted smaller"></div>').text("POS name: " + (e.shortName ? e.shortName : e.itemName))), t.append($('<div class="entity-kitchenname muted smaller"></div>').text("Kitchen name: " + (e.kitchenName ? e.kitchenName : e.itemName))), t
                        }, "/menuOptionPreview?id=ENTITY_ID", c, a, o, null, e)
                    },
                    parseBulkMenuItems: function(e, t) {
                        var n = /^\"([^"])*/gm,
                            i = e.match(n);
                        if (null != i && e === i[0] || "" === e) return [];
                        var a = l.menuMgmt.csvToArray(e, "\t"),
                            o = [];
                        for (var r in a) {
                            var d = a[r];
                            if (0 != d.length && (1 != d.length || 0 != d[0].length))
                                if (null == t || d.length == t) {
                                    for (var s in d) d[s] = d[s].trim();
                                    o.push(d)
                                } else console.log("Invalid import line.")
                        }
                        return o
                    },
                    csvToArray: function(e, t) {
                        t = t || ",";
                        for (var n = new RegExp("(\\" + t + '|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\' + t + "\\r\\n]*))", "gi"), i = [
                                []
                            ], a = null; a = n.exec(e);) {
                            var o = a[1];
                            if (o.length && o != t && i.push([]), a[2]) var r = a[2].replace(new RegExp('""', "g"), '"');
                            else var r = a[3];
                            i[i.length - 1].push(r)
                        }
                        return i
                    },
                    showAddItemBulkDialog: function(e, t, n, i, a) {
                        var o = $("#add-item-bulk-dialog");
                        return o.find(".dialog-title").text(e), o.find(".dialog-description").text(t), $("#add-item-bulk-textarea").attr("placeholder", n), o.off("keyup.bs.modal").on("keyup.bs.modal", "#add-item-bulk-textarea", function() {
                            var e = this.value;
                            if (null != e && e.length > 0) {
                                var t = l.menuMgmt.parseBulkMenuItems(e, i),
                                    n = o.find(".btn-bulk-add");
                                0 == t.length ? n.text("Add") : n.text("Add " + t.length + " Items")
                            }
                        }), $(".btn-bulk-add").off("click.bs.modal").on("click.bs.modal", function() {
                            var e = o.find("#add-item-bulk-textarea"),
                                t = e.val(),
                                n = l.menuMgmt.parseBulkMenuItems(t, i);
                            a && a(n), o.off("click", ".btn-bulk-add"), o.off("keyup", "#add-item-bulk-textarea"), o.modal("hide")
                        }), o.off("hide.bs.modal").on("hide.bs.modal", function() {
                            var e = o.find("#add-item-bulk-textarea");
                            e && e.val("");
                            var t = o.find(".btn-bulk-add");
                            t && t.text("Add").prop("disabled", !1), o.off("hide.bs.modal")
                        }), o.modal(), o
                    },
                    chooseMenuItem: function(e, n, i, a, o) {
                        var r = "MenuItem",
                            l = "Menu Items",
                            d = "Select a menu item to preview",
                            s = "/listAllMenuItems";
                        n && (s += "?groupId=" + n), n && i ? s += "&parentSetId=" + i : i && (s += "?parentSetId=" + i);
                        var c = "/getMenuItemPricingInfo?id=ENTITY_ID";
                        n && (c += "&groupId=" + n), t(r, l, null, d, s, function(e) {
                            var t = $("<li/>").append($('<div class="entity-name"/>').text(e.name));
                            return t.append($('<div class="entity-shortname muted smaller"></div>').text("POS Name: " + (e.shortName ? e.shortName : e.name))), t.append($('<div class="entity-kitchenname muted smaller"></div>').text("Kitchen Name: " + (e.kitchenName ? e.kitchenName : e.name))), t
                        }, "/menuItemPreview?id=ENTITY_ID", c, a, o, null, e)
                    },
                    chooseOptionGroup: function(e, n, i, a) {
                        var o = "/listAllMenuOptionGroups";
                        n && (o += "?parentSetId=" + n), t("MenuOptionGroup", "Modifier Groups", null, "Select a modifier group to preview", o, function(e) {
                            var t = $("<li/>").append($('<div class="entity-name"/>').text(e.name));
                            return t.append($('<div class="entity-shortname muted smaller"></div>').text("POS Name: " + (e.shortName ? e.shortName : e.name))), e.info && t.append($('<div class="entity-info muted smaller"></div>').text(e.restrictions)), e.options && t.append($('<div class="entity-items muted smaller"></div>').text(e.options)), t
                        }, "/menuOptionGroupPreview?id=ENTITY_ID", null, i, a, function(e, t) {
                            return l.strContains(e.name, t) || l.strContains(e.info, t) || l.strContains(e.options, t)
                        }, e)
                    },
                    chooseMenuItemTag: function(e, n, i, a) {
                        var o = "/listAllMenuItemTags";
                        n && (o += "?parentSetId=" + n), t("MenuItemTag", "Tags", null, "Select a tag to preview", o, function(e) {
                            var t = $('<li><div class="entity-name"></div></li>');
                            return t.find("div").text(e.name), t
                        }, "/menuItemTagPreview?id=ENTITY_ID", null, i, a, null, e)
                    },
                    chooseServiceCharge: function(e) {
                        t("ServiceCharge", "Service Charge", null, "Select a service charge to preview", "/listAllServiceCharges", function(e) {
                            var t = $("<li/>").append($('<div class="entity-name"/>').text(e.name));
                            return e.info && t.append($('<div class="entity-info muted smaller"></div>').text(e.info)), t
                        }, "/serviceChargePreview?id=ENTITY_ID", null, !1, e)
                    },
                    initGroupsEditor: function(e) {
                        var t = $("#groups-table");
                        l.enableEntityTableInput(t), l.enableChildEntityTable(t, e, $(".edit-groups")), l.enableChildEntityAlphabeticalSort(t, "group", e, $(".btn-alphabetize-groups")), l.enableEntityTableRowTemplate($(".add-group-simple"), t, null, function() {
                            l.enableChildEntityTable(t, e), l.enableEntityTableInput(t)
                        }), $(".admin-content").on("click", ".add-group-bulk", function(e) {
                            e.preventDefault(), l.menuMgmt.showAddItemBulkDialog("Bulk Add Groups", "Enter new groups on each line", null, 1, function(e) {
                                var n = $(".add-group-simple");
                                for (var i in e) {
                                    n.click();
                                    var a = t.find("tbody tr:not(.placeholder,.template):last input:text:not(:hidden)");
                                    a && 1 == a.length && (a[0].value = e[i][0])
                                }
                            })
                        }), $(".admin-content").on("click", ".add-group-existing", function(n) {
                            n.preventDefault(), l.menuMgmt.chooseMenuGroup(!0, $(this).attr("data-parent-set-id"), !0, function(n, i) {
                                var a = t.find("tbody tr:not(.placeholder,.template)").length;
                                $.each(n, function(n, o) {
                                    var r = $('<tr class="added" id="group-' + o.id + '"><td class="drag-handle edit-column"><div></div></td></tr>'),
                                        d = e + "[" + a + "]";
                                    r.append(l.editorCommon.createInputLink(d + ".copyName", "Name", o.name, o.url).append($('<input type="hidden" class="id-param"></input>').attr("name", d + ".id").val(o.id)).append($('<input type="hidden"></input>').attr("name", d + ".copy").val("true")).append($('<input type="hidden"></input>').attr("name", d + ".deepCopy").val(i || !1))), r.append($('<td class="td-actions edit-column"></td>').append('<a class="remove-entity"><i class="icon-trash opacity70" title="Remove group"></i></a>').append('<a class="undo">undo remove</a>')), 0 === a && t.find("tr.placeholder").remove();
                                    var s = t.find("tr.template");
                                    s ? r.insertBefore(s) : t.find("tbody").append(r), a++, l.enableEntityTableEditLink(r), l.enableEntityTableDelete(r)
                                }), t.tableDnDUpdate(), t.next().show(), l.updateEditColumns(t)
                            })
                        }), $.each([".add-group-new"], function(e, t) {
                            $(".admin-content").on("click", t, function(e) {
                                e.preventDefault();
                                var n = l.editorCommon.getForm();
                                n.append($('<input type="hidden" name="after" />').val(n.find(t).attr("href"))), n.submit()
                            })
                        })
                    },
                    initOptionGroupsEditor: function(e) {
                        function t(e) {
                            return function(t) {
                                t.preventDefault(), l.menuMgmt.chooseOptionGroup(!0, $(this).attr("data-parent-set-id"), e, function(t, o) {
                                    var r = i.find("tbody tr:not(.placeholder,.template)").length;
                                    $.each(t, function(t, d) {
                                        var s = $('<tr class="added" id="option-group-' + d.id + '"><td class="drag-handle edit-column"><div></div></td></tr>'),
                                            c = n + "[" + r + "]";
                                        e ? s.append(l.editorCommon.createInputLink(c + ".copyName", "Name", d.name, d.url).append($('<input type="hidden" class="id-param"></input>').attr("name", c + ".id").val(d.id)).append($('<input type="hidden"></input>').attr("name", c + ".copy").val("true")).append($('<input type="hidden"></input>').attr("name", c + ".deepCopy").val(o || !1))) : s.append(l.editorCommon.createInputLink(c + ".name", "Name", d.name, d.url).append($('<input type="hidden" class="id-param"></input>').attr("name", c + ".id").val(d.id))), s.append(l.editorCommon.createSelect(c + ".requiredMode", d.requiredMode, d.requiredModeTypes)), s.append(l.editorCommon.createCheckbox(c + ".multiSelect", d.multiSelect)), d.minSelections && s.append($('<td><div class="min-selections" ' + (d.multiSelect ? "" : 'style="display:none;"') + ">" + d.minSelections + '</div><div class="min-selections-na" ' + (d.multiSelect ? 'style="display:none;"' : "") + ">n/a</div></td>")), s.append($('<td><div class="max-selections" ' + (d.multiSelect ? "" : 'style="display:none;"') + ">" + d.maxSelections + '</div><div class="max-selections-na" ' + (d.multiSelect ? 'style="display:none;"' : "") + ">n/a</div></td>")), s.append($('<td class="td-actions edit-column"/>')), s.append($('<td class="td-actions edit-column"></td>').append('<a class="remove-entity"><i class="icon-trash opacity70" title="Remove group"></i></a>').append('<a class="undo">undo remove</a>')), 0 === r && i.find("tr.placeholder").remove(), i.find("tbody").append(s), r++, l.enableEntityTableSelect(s), l.enableEntityTableEditLink(s), l.enableEntityTableDelete(s), l.editorCommon.updateCheckboxes(s), a(s)
                                    }), i.tableDnDUpdate(), i.next().show(), l.updateEditColumns(i)
                                })
                            }
                        }
                        var n = e + ".optionGroups",
                            i = $("#modifiers-table");
                        window.checkDefaultModifiers = function(t) {
                            var n = $('#default-options-table tr[inherited="true"]');
                            t || (t = $('[name="' + e + '.inheritGroups"]:checked')), "true" == t.val() ? (n.show(), n.find(":checkbox").prop("disabled", !1), n.find("li>label").removeClass("disabled"), $("#default-options-table tr td").length > 0 && $("#default-options-group").show()) : (n.hide(), n.find(":checkbox").prop("disabled", !0), n.find("li>label").addClass("disabled"), 0 === $('#default-options-table tr[inherited="false"]').length && $("#default-options-group").hide())
                        }, l.enableEntityTableInput(i), l.enableChildEntityTable(i, n, $(".edit-optiongroups")), l.enableChildEntityAlphabeticalSort(i, "optionGroup", n, $(".btn-alphabetize-option-groups"));
                        var a = function(e) {
                            e.find(":checkbox[name$=multiSelect]").change(function() {
                                $(this).closest("td").next().find(".max-selections").toggle(), $(this).closest("td").next().find(".max-selections-na").toggle()
                            })
                        };
                        a(i), l.enableEntityTableRowTemplate($(".add-optiongroup-simple"), i, null, function() {
                            l.enableChildEntityTable(i, n), l.enableEntityTableInput(i), l.editorCommon.updateCheckboxes($(this))
                        }), $(".admin-content").on("click", ".add-optiongroup-bulk", function(e) {
                            e.preventDefault(), l.menuMgmt.showAddItemBulkDialog("Bulk Add Modifier Groups", "Enter new modifier groups on each line", null, 1, function(e) {
                                var t = $(".add-optiongroup-simple");
                                for (var n in e) {
                                    t.click();
                                    var a = i.find("tbody tr:not(.placeholder,.template):last input:text:not(:hidden)");
                                    a && 1 == a.length && (a[0].value = e[n][0])
                                }
                            })
                        }), $(".admin-content").on("click", ".add-optiongroup-existing", t(!1)), $(".admin-content").on("click", ".add-optiongroup-copy", t(!0)), $(".admin-content").on("click", ".add-optiongroup-new", function(e) {
                            e.preventDefault();
                            var t = l.editorCommon.getForm(),
                                n = t.find(".add-optiongroup-new").attr("href");
                            t.append($('<input type="hidden" name="after" />').val(n)), t.submit()
                        }), $("#default-options-table").on("click", ":checkbox.override-toggle", function() {
                            var e = $(this).closest("tr").find("ul.selection-list");
                            $(this).is(":checked") ? e.removeClass("disabled").find(":checkbox").prop("disabled", !1) : e.addClass("disabled"), l.updateSelectionListState(e)
                        }), window.checkDefaultModifiers(), $(':checkbox[name="' + e + '.inheritGroups"]').change(function() {
                            window.checkDefaultModifiers($(this))
                        })
                    },
                    initTagsEditor: function(e) {
                        function t(t, n) {
                            var i = $("#tags-container"),
                                a = i.find(".label").length,
                                o = $('<span class="label label-info"></span>').text(n);
                            o.append($('<i class="icon-remove icon-white"></i>')), o.append($('<input type="hidden"/>').attr("name", e + "[" + a + "].id").val(t)), 0 == a && i.find(".placeholder").remove(), i.append(o), i.append("&nbsp;")
                        }
                        $("#add-tag-existing").click(function(e) {
                            e.preventDefault(), l.menuMgmt.chooseMenuItemTag(!0, $(this).attr("data-parent-set-id"), !1, function(e) {
                                $.each(e, function(e, n) {
                                    t(n.id, n.name)
                                })
                            })
                        }), $("#tags-container").on("click", ".label i.icon-remove", function() {
                            var e = $(this).parent(),
                                t = e.find("input");
                            e.hasClass("deleted") ? (e.removeClass("opacity50 deleted"), t.val(t.data("originalValue"))) : (e.addClass("opacity50 deleted"), t.data("originalValue", t.val()), t.val("false"))
                        }), $("#add-tag-new").click(function() {
                            var e = $(this),
                                n = e.prev().val();
                            if (0 == $.trim(n).length) return void alert("Please enter a tag name");
                            e.button("loading"), $.getJSON(l.menuMgmt.baseUrl + "/ajaxCreateTag", {
                                name: n,
                                restaurantsetid: $(this).attr("data-parent-set-id")
                            }, function(n) {
                                t(n.id, n.name), e.button("reset"), e.prev().val("")
                            })
                        })
                    },
                    init: function() {
                        l.hasTouch = "ontouchstart" in window || "onmsgesturechange" in window, l.enableSelectionList(), l.enablePrettyUploads(), l.editorCommon.enableSaveAndPublishBtns();
                        var e = $(".admin-toolbar .search-query");
                        e.typeahead({
                            source: function(t, n) {
                                t.length > 1 && $.getJSON(l.menuMgmt.baseUrl + "/menuItemSearch?query=" + t, function(t) {
                                    n(t);
                                    var i = e.closest(".form-search").find(".typeahead");
                                    e.off("keydown.typeahead").on("keydown.typeahead", function() {
                                        var e = i.find(".active"),
                                            t = i.height(),
                                            n = e.position().top,
                                            a = n + e.height();
                                        a > t && i.scrollTop(i.scrollTop() + a - t), n < 0 && i.scrollTop(i.scrollTop() + n)
                                    })
                                })
                            },
                            items: 48,
                            updater: function(e) {
                                return window.location = $(e).data("url"), ""
                            }
                        });
                        var t = e.data("typeahead"),
                            n = t.highlighter;
                        t.highlighter = function(e) {
                            var t = e.indexOf("</span>") + 7,
                                i = e.substr(t);
                            return e.substr(0, t) + n.call(this, i)
                        }, $(".form-search").submit(function(e) {
                            return e.preventDefault(), !1
                        }), $(".admin-edit-section i.icon-question-sign").click(function() {
                            $(this).closest("h3").next(".help-block").slideToggle()
                        }), $('.other-versions[data-toggle="popover"]').popover({
                            html: !0
                        })
                    }
                }
            }(), l.menuMgmt.menuItem = function() {
                return {
                    init: function() {
                        l.menuMgmt.init(), l.addTouchSectionEnabler("item_inheritPricing", "nongroup-pricing", !0), l.addTouchSectionEnabler("item_inheritPricing", "location-pricing", !0), l.addTouchSectionEnabler("item_inheritPricing", "group-pricing-warning", !1), l.menuMgmt.pricing.init("item"), l.addTouchSectionEnabler("item_menuSpecificPricing", "menu-pricing"), l.addTouchSectionEnabler("item_inheritGroups", "inherited-option-groups", !1), l.addTouchSectionEnabler("item_inheritCollapseModifierPrices", "collapse-modifier-prices", !0), l.menuMgmt.setupInheritedSection("item_inheritTaxRates", "tax-rates"), l.menuMgmt.setupInheritedSection("item_inheritTaxInclusive", "tax-inclusive"), l.menuMgmt.setupInheritedSection("item_inheritDiningOptionTax", "dining-option-tax"), l.menuMgmt.setupInheritedSection("item_inheritSalesCategory", "categories"), l.menuMgmt.setupInheritedSection("item_deferred", "categories_outer"), l.menuMgmt.setupInheritedSection("item_inheritDiscountable", "discounting"), l.menuMgmt.setupInheritedSection("item_inheritedExcludedFromRewards", "rewards"), l.menuMgmt.setupInheritedSection("item_inheritPrepSequence", "prep-sequence"), l.menuMgmt.setupInheritedSection("item_inheritPrepStations", "prep-stations"), l.menuMgmt.setupInheritedSection("item_inheritBarcodeEmbeddedAmountType", "barcodeAmountType"), l.menuMgmt.setupInheritedSection("item_inheritTareWeight", "tareWeight"), l.menuMgmt.setupInheritedSection("item_inheritUnitOfMeasure", "unitOfMeasure"), l.menuMgmt.setupInheritedSection("item_inheritGrubhubOrderable", "grubhub-orderable"), $(':checkbox[name="itemInventory"]').click(function() {
                            var e = $("#item-quantity");
                            "QUANTITY" == $(this).val() ? e.slideDown() : e.slideUp()
                        }), $("#price-group-select").bootstrapifySelect();
                        var e = $("#nongroup-pricing");
                        $(':checkbox[name="pricingProvider"]').click(function() {
                            var t = $("#group-pricing-warning"),
                                n = $("#price-group-selection");
                            "priceGroup" === $(this).val() ? (t.slideUp(), e.slideUp(), n.slideDown()) : "parent" === $(this).val() ? (t.slideDown(), e.slideUp(), n.slideUp()) : (t.slideUp(), e.slideDown(), n.slideUp()), l.menuMgmt.pricing.updateItemGroupPrices()
                        }), l.menuMgmt.initOptionGroupsEditor("item"), l.menuMgmt.productionItemQuantity.init(), l.menuMgmt.initTagsEditor("item.tags"), l.editorCommon.updateCheckboxes($("body")), l.enableEntityTableInput($("#menu-pricing table"))
                    },
                    setupModifierTaxHandler: function(e) {
                        function t(e) {
                            var t = e.selectionList,
                                n = e.inputSelector;
                            t.removeClass("disabled"), t.find(n).each(function(e) {
                                $(this).prop("readonly", !1)
                            }), l.updateSelectionListState(t, "readonly")
                        }

                        function n(e) {
                            var t = e.selectionList;
                            t.addClass("disabled"), l.updateSelectionListState(t, "readonly")
                        }

                        function i(e) {
                            e.selectionList.on("click", ":checkbox", function(e) {
                                if (e.target.readOnly) return !1;
                                a()
                            })
                        }

                        function a() {
                            var e = $("#item_inheritTaxRates_true").is(":checked"),
                                i = $("#item_modifierTaxBehaviorEnum_INHERITS_PARENT_TAX").is(":checked");
                            e === !0 ? (t(r), n(o)) : (t(o), i !== !0 ? n(r) : t(r))
                        }
                        var o = {
                                selectionList: $("#" + e + "_modifierTaxBehaviorEnum"),
                                inputSelector: "input[name='" + e + ".modifierTaxBehaviorEnum']"
                            },
                            r = {
                                selectionList: $("input[name='" + e + ".inheritTaxRates']").closest("ul.selection-list"),
                                inputSelector: "input[name='" + e + ".inheritTaxRates']"
                            };
                        i(o), i(r), l.enableSelectionList(o.selectionList, "readonly"), a(e)
                    }
                }
            }(), l.menuMgmt.home = function() {
                return {
                    init: function() {
                        l.menuMgmt.init(), $(".copy-entity").click(function(e) {
                            if (e.preventDefault(), !$(this).hasClass("disabled")) {
                                var t = $(this).attr("href"),
                                    n = $("#copy-menu-spinner").clone();
                                n.attr("id", "copy-menu-spinner-displayed"), n.show(), $("#notifications").append(n), $("#notifications").show();
                                var i = $('input[name="authenticityToken"]').val();
                                l.postKeepAliveJson(t, {
                                    authenticityToken: i
                                }, function(e) {
                                    if (n.remove(), "success" == e.message) {
                                        var t = $("#copy-menu-finish").clone(),
                                            i = t.find("a"),
                                            a = i.attr("href");
                                        a += e.data, i.attr("href", a), t.attr("id", "copy-menu-finish-displayed"), t.show(), $("#notifications").append(t), $("#notifications").show()
                                    } else alert("Copy menu failed!")
                                })
                            }
                        })
                    }
                }
            }(), l.menuMgmt.menu = function() {
                return {
                    init: function() {
                        l.menuMgmt.init(), l.addTouchSectionEnabler("menu_availableAllDays", "day-availability", !0), l.addTouchSectionEnabler("menu_availableAllTimes", "time-availability", !0), l.addTouchSectionEnabler("menu_inheritCollapseModifierPrices", "collapse-modifier-prices", !0), l.menuMgmt.initGroupsEditor("menu.groups"), l.menuMgmt.setupInheritedSection("menu_inheritTaxRates", "tax-rates"), l.menuMgmt.setupInheritedSection("menu_inheritTaxInclusive", "tax-inclusive"), l.menuMgmt.setupInheritedSection("menu_inheritDiningOptionTax", "dining-option-tax"), $("select.ampm").bootstrapifySelect()
                    }
                }
            }(), l.menuMgmt.group = function() {
                return {
                    init: function(e, t, n, i) {
                        function a(t) {
                            return function(n) {
                                n.preventDefault(), l.menuMgmt.chooseMenuItem(!0, e, $(this).attr("data-parent-set-id"), t, function(e, n) {
                                    $.each(e, function(e, i) {
                                        var a = o.find("tbody tr:not(.placeholder,.template)").length,
                                            r = $('<tr class="added" id="item-' + i.id + '"><td class="drag-handle edit-column"><div></div></td></tr>'),
                                            d = "group.items[" + a + "]";
                                        t ? r.append(l.editorCommon.createInputLink(d + ".copyName", "Name", i.name, i.url).append($('<input type="hidden" class="id-param"></input>').attr("name", d + ".id").val(i.id)).append($('<input type="hidden"></input>').attr("name", d + ".copy").val("true")).append($('<input type="hidden"></input>').attr("name", d + ".deepCopy").val(n || !1))) : r.append(l.editorCommon.createInputLink(d + ".name", "Name", i.name, i.url).append($('<input type="hidden" class="id-param"></input>').attr("name", d + ".id").val(i.id)));
                                        var s = $('<td class="item-price right" colspan="2"></td>'),
                                            c = i.pricingInfo ? i.pricingInfo : i.previewData.pricingInfo;
                                        c.imgSrc && s.append($('<img class="price-icon" title="' + c.imgTitle + '" src="' + c.imgSrc + '" />')), console.log(i), null != c.basePrice ? t ? s.append($('<input type="hidden">').attr("name", d + ".copyBasePrice").attr("value", c.basePrice)) : s.append($('<input type="hidden">').attr("name", d + ".basePrice").attr("value", c.basePrice)) : t ? s.append($('<input type="hidden">').attr("name", d + ".copyBasePrice").attr("value", null)) : s.append($('<input type="hidden">').attr("name", d + ".basePrice").attr("value", null)), s.append(c.priceValue), r.append(s), r.append($('<td class="edit-column"></td>').append('<i class="icon-copy opacity20" title="Copy item" style="cursor:default;"></i>')), r.append($('<td class="edit-column"></td>').append('<a class="remove-entity"><i class="icon-trash opacity70" title="Remove item"></i></a>').append('<a class="undo">&{"field.table.undoremove"}</a>')), l.enableEntityTableEditLink(r), l.enableEntityTableDelete(r), 0 === a && o.find("tr.placeholder").remove();
                                        var u = o.find("tr.template");
                                        u ? r.insertBefore(u) : o.find("tbody").append(r), o.tableDnDUpdate(), l.enableEntityTableEditLink(r), o.next().show(), l.menuMgmt.pricing.updateItemGroupPrices(), l.updateEditColumns(o)
                                    })
                                })
                            }
                        }
                        l.menuMgmt.init(), l.addTouchSectionEnabler("group_inheritGroups", "inherited-option-groups", !1), l.addTouchSectionEnabler("group_inheritCollapseModifierPrices", "collapse-modifier-prices", !0), l.menuMgmt.setupInheritedSection("group_inheritTaxRates", "tax-rates"), l.menuMgmt.setupInheritedSection("group_inheritTaxInclusive", "tax-inclusive"), l.menuMgmt.setupInheritedSection("group_inheritDiningOptionTax", "dining-option-tax"), l.menuMgmt.setupInheritedSection("group_inheritSalesCategory", "categories"), l.menuMgmt.setupInheritedSection("group_inheritDiscountable", "discounting"), l.menuMgmt.setupInheritedSection("group_inheritedExcludedFromRewards", "rewards"), l.menuMgmt.setupInheritedSection("group_inheritPrepSequence", "prep-sequence"), l.menuMgmt.setupInheritedSection("group_inheritPrepStations", "prep-stations"), l.menuMgmt.setupInheritedSection("group_inheritBarcodeEmbeddedAmountType", "barcodeAmountType"), l.menuMgmt.setupInheritedSection("group_inheritTareWeight", "tareWeight"), l.menuMgmt.setupInheritedSection("group_inheritUnitOfMeasure", "unitOfMeasure"), l.menuMgmt.setupInheritedSection("group_inheritGrubhubOrderable", "grubhub-orderable"), l.enableChildEntityAlphabeticalSort($("#items-table"), "item", "group.items", $(".btn-alphabetize-items")), $(':checkbox[name="group.providesPricing"]').click(function() {
                            var e = $("#group-pricing"),
                                t = $("#pricing-provider"),
                                n = $("#parent-pricing-warning"),
                                i = $("#price-group-selection"),
                                a = "none";
                            "true" === $(this).val() ? (t.slideDown(), "none" === $(':checkbox[name="pricingProvider"][checked="checked"],input[type="hidden"][name="pricingProvider"]').val() ? e.slideDown() : i.slideDown(), t.slideDown(), n.slideUp(), a = "provides") : (t.slideUp(), n.slideUp(), e.slideUp(), i.slideUp(), a = "none"), l.menuMgmt.pricing.updateItemGroupPrices(a)
                        }), $(':checkbox[name="pricingProvider"]').click(function() {
                            var e = $("#group-pricing"),
                                t = $("#parent-pricing-warning"),
                                n = $("#price-group-selection");
                            "priceGroup" === $(this).val() ? (t.slideUp(), e.slideUp(), n.slideDown()) : "parent" === $(this).val() ? (t.slideDown(), e.slideUp(), n.slideUp()) : (t.slideUp(), e.slideDown(), n.slideUp()), l.menuMgmt.pricing.updateItemGroupPrices()
                        }), l.menuMgmt.pricing.initGroup("group", i, t, n), l.menuMgmt.initOptionGroupsEditor("group"), l.menuMgmt.initGroupsEditor("group.subgroups"), l.menuMgmt.initTagsEditor("group.tags");
                        var o = $("#items-table");
                        l.enableEntityTableInput(o), l.enableChildEntityTable(o, "group.items", $(".edit-items")), l.enableEntityTableRowTemplate($(".add-item-simple"), o, null, function() {
                            l.enableChildEntityTable(o, "group.items"), l.enableEntityTableInput(o)
                        }), $(".admin-content").on("click", ".add-item-existing", a(!1)), $(".admin-content").on("click", ".add-item-copy", a(!0)), $.each([".add-item-new"], function(e, t) {
                            $(".admin-content").on("click", t, function(e) {
                                e.preventDefault();
                                var n = l.editorCommon.getForm();
                                n.append($('<input type="hidden" name="after" />').val(n.find(t).attr("href"))), n.submit()
                            })
                        }), $("a.copy-entity").click(function() {
                            l.editorCommon.disableSaveAndPublishBtns()
                        }), l.editorCommon.updateCheckboxes($("body")), $(".admin-content").on("click", ".add-item-bulk", function(e) {
                            e.preventDefault(), l.menuMgmt.showAddItemBulkDialog("Bulk Add Items", "Please paste in from a spreadsheet: Name, Price, POS Name, Kitchen Name, Description, Calories, SKU, PLU", "Name  Price  POS Name  Kitchen Name  Description  Calories  SKU  PLU", null, function(e) {
                                if (e.length > 0) {
                                    var t = $(".add-item-simple");
                                    for (var n in e) {
                                        t.click();
                                        var i = e[n],
                                            a = o.find("tbody tr:not(.placeholder,.template):last input:not(:hidden)");
                                        null != a && 2 == a.length && (a[0].value = i[0], a[1].value = i[1]), i.length >= 3 && o.find("tbody tr:not(.placeholder,.template):last .input-short-name").val(i[2]), i.length >= 4 && o.find("tbody tr:not(.placeholder,.template):last .input-kitchen-name").val(i[3]), i.length >= 5 && o.find("tbody tr:not(.placeholder,.template):last .input-description").val(i[4]), i.length >= 6 && o.find("tbody tr:not(.placeholder,.template):last .input-calories").val(i[5]), i.length >= 7 && o.find("tbody tr:not(.placeholder,.template):last .input-sku").val(i[6]), i.length >= 8 && o.find("tbody tr:not(.placeholder,.template):last .input-plu").val(i[7]);
                                        var r = null,
                                            d = null;
                                        if (i.length >= 10)
                                            for (var s = o.find("tbody tr:not(.placeholder,.template) .id-param").length - 1, c = 6, u = 0; i[c] && "" != i[c];) o.find("tbody tr:not(.placeholder,.template):last").append($('<input type="hidden" name="group.items[' + s + "].newSizeOption[" + u + '].name" value="' + i[c++] + '" />')).append($('<input type="hidden" name="group.items[' + s + "].newSizeOption[" + u++ + '].price" value="' + i[c++] + '" />')), null == r ? r = i[c - 1] : d = i[c - 1];
                                        if (r && d) {
                                            var p = l.menuMgmt.pricing.formatCurrency(r) + " - " + l.menuMgmt.pricing.formatCurrency(d);
                                            o.find("tbody tr:not(.placeholder, .template):last td.td-input.item-price").remove(), o.find("tbody tr:not(.placeholder, .template):last td.currency.item-price").html(p).attr("colspan", 2)
                                        }
                                    }
                                }
                            })
                        })
                    }
                }
            }(), l.menuMgmt.optionGroup = function() {
                return {
                    updatePriceColumns: function(e) {
                        switch (e || (e = $(':checkbox[name="optionGroup.pricingMode"][checked="checked"]').val()), e) {
                            case "ADJUSTS_PRICE":
                                $(".price-column").show();
                                break;
                            default:
                                $(".price-column").hide()
                        }
                    },
                    getSequenceRowText: function(e, t) {
                        return e === t - 1 ? "All additional options" : l.formatPosition(e + 1) + " option"
                    },
                    updateSequenceRowText: function(e) {
                        e.each(function(t, n) {
                            $(n).text(l.menuMgmt.optionGroup.getSequenceRowText(t, e.size()))
                        })
                    },
                    init: function(e) {
                        l.menuMgmt.init(), l.addTouchSectionEnabler("optionGroup_multiSelect", "max-selections", !1), l.addTouchSectionEnabler("optionGroup_multiSelect", "doubleModifiers", !1), l.menuMgmt.setupInheritedSection("optionGroup_inheritGrubhubOrderable", "grubhub-orderable"), $("#optionGroup_minSelections").bootstrapifySelect(), $("#optionGroup_maxSelections").bootstrapifySelect(), l.enableChildEntityAlphabeticalSort($("#modifiers-table"), "menu-option", "optionGroup.options", $(".btn-alphabetize-modifiers")), $(':checkbox[name="optionGroup.requiredMode"], :checkbox[name="optionGroup.multiSelect"]').change(function() {
                            var e = $(':checkbox[name="optionGroup.requiredMode"][value="REQUIRED"]'),
                                t = $("#optionGroup_multiSelect_true"),
                                n = $("#min-selections");
                            e.attr("checked") && t.attr("checked") ? n.slideDown() : n.slideUp()
                        }), $(':checkbox[name="optionGroup.pricingMode"]').click(function() {
                            var e = $(this),
                                t = $("#default-option-settings"),
                                n = $("#modifier-size-strategy"),
                                i = $("#pricing-strategy"),
                                a = $("#location-pricing"),
                                o = e.val();
                            "INCLUDED" == o ? t.slideUp() : t.slideDown(), "FIXED_PRICE" === o ? i.slideDown() : i.slideUp(), "ADJUSTS_PRICE" === o ? n.slideDown() : n.slideUp(), "LOCATION_SPECIFIC_PRICE" === o ? a.slideDown() : a.slideUp(), l.menuMgmt.optionGroup.updatePriceColumns(o), e.closest("ul").find(".previousSelection").removeClass("previousSelection")
                        });
                        var t = $("#location-pricing-table");
                        l.enableEntityTableInput(t), l.enableEntityTableSelect(t), l.enableEntityTableDelete(t), l.menuMgmt.pricing.enablePriceWatching(), l.enableEntityTableRowTemplate($("#add-new-location-price"), t, null, function() {
                            l.enableEntityTableInput($(this)), l.enableEntityTableSelect($(this)), l.enableEntityTableDelete($(this)), $('input[name="hasNonReadonlyPrices"]').val(!0)
                        }), $(':checkbox[name="optionGroup.pricingStrategy"]').click(function() {
                            var e = $(this),
                                t = $("#option-fixed-price"),
                                n = $("#option-sequence-price"),
                                i = $("#option-size-price"),
                                a = $("#option-size-sequence-price"),
                                o = e.val();
                            switch (t.slideUp(), n.slideUp(), i.slideUp(), a.slideUp(), o) {
                                case "DEFAULT":
                                    t.slideDown();
                                    break;
                                case "SEQUENCE_PRICE":
                                    n.slideDown();
                                    break;
                                case "SIZE_PRICE":
                                    i.slideDown();
                                    break;
                                case "SIZE_SEQUENCE_PRICE":
                                    a.slideDown()
                            }
                        }), $(':checkbox[name="optionGroup.defaultOptionsPricingMode"]').click(function() {
                            var e = $(this),
                                t = $("#default-options-swap-pricing-mode");
                            "INCLUDED" != e.val() ? t.slideUp() : t.slideDown()
                        }), $(':checkbox[name="optionGroup.type"]').click(function() {
                            var e = $("#reference-config"),
                                t = $("#manual-config"),
                                n = $('input[name="optionGroup.groupReference.id"]');
                            if ("GROUP_REFERENCE" == $(this).val()) {
                                t.slideUp(), e.slideDown(), n.prop("disabled", !1), $("#pricing-method-info").show();
                                var i = $("#pricing-methods"),
                                    a = i.find(":checkbox:checked");
                                i.find("li:gt(1)").find(":checkbox").prop("disabled", !0), a.closest("li").index() > 1 && (a.prop("checked", !1).addClass("previousSelection"), i.find("li:eq(0) :checkbox").prop("checked", !0)), l.updateSelectionListState(i)
                            } else {
                                e.slideUp(), t.slideDown(), n.prop("disabled", !0), $("#pricing-method-info").hide();
                                var i = $("#pricing-methods");
                                i.find(":checkbox").prop("disabled", !1);
                                var o = i.find(".previousSelection");
                                o.length > 0 && (i.find(":checked").prop("checked", !1), o.removeClass("previousSelection").prop("checked", !0)), l.updateSelectionListState(i)
                            }
                        }), $("#choose-menu-group").click(function() {
                            var e = $(this);
                            l.menuMgmt.chooseMenuGroup(!1, $(this).attr("data-parent-set-id"), !1, function(t) {
                                $('input[name="optionGroup.groupReference.id"]').val(t.id).prop("disabled", !1), $.getJSON(l.menuMgmt.baseUrl + "/listMenuItems?groupId=" + t.id, function(n) {
                                    e.text("Change Group").prev().text(t.name).show();
                                    var i = $("#referenced-items"),
                                        a = i.find("table"),
                                        o = a.find("tbody");
                                    o.empty(), 0 === n.length ? o.append($('<tr class="placeholder"></tr>').append($('<td colspan="2"></td>').text('"' + t.name + '" currently contains no items'))) : $.each(n, function(e, t) {
                                        var n = $("<tr></tr>"),
                                            i = $('<input type="checkbox" name="optionGroup.defaultItems[' + e + '].id"/>').val(t.id);
                                        n.append($('<td class="td-checkbox"></td>').append($("<label></label>").append(i))), n.append($("<td/>").append('<a href="' + t.url + '">').text(t.name).attr("href", t.url)), o.append(n)
                                    }), i.show()
                                }), l.unsavedChanges = !0
                            })
                        });
                        var n = $("#modifiers-table");
                        l.enableEntityTableInput(n), l.enableChildEntityTable(n, "optionGroup.options", $(".edit-options")), l.enableEntityTableRowTemplate($(".add-option-simple"), n, null, function() {
                            l.enableChildEntityTable(n, "optionGroup.options"), l.enableEntityTableInput(n)
                        });
                        var i = function(e, t, i) {
                            l.menuMgmt.chooseMenuOption(!0, t, i, e, function(t, i) {
                                var a = n.find("tbody tr:not(.placeholder,.template)").length;
                                $.each(t, function(t, o) {
                                    var r = $('<tr class="added" id="menu-option-' + o.id + '"><td class="drag-handle edit-column"><div></div></td></tr>'),
                                        d = "optionGroup.options[" + a + "]",
                                        s = $('<input type="checkbox" name="' + d + '.defaultOption"/>').val(!0);
                                    r.append($('<td class="td-checkbox"></td>').append($("<label></label>").append(s)));
                                    var c, u, p;
                                    o.optionName ? (c = d + ".name", u = o.itemName) : (c = d + ".itemName", u = "Name");
                                    var f = o.overridePrice ? o.overridePrice : o.previewData.overridePrice,
                                        h = o.priceRaw ? o.priceRaw : o.previewData.priceRaw,
                                        m = o.pricingInfo ? o.pricingInfo : o.previewData.pricingInfo;
                                    if (e ? (c = d + ".copyName", p = d + ".copyPrice", r.append(l.editorCommon.createInputLink(c, u, o.name, o.url).append($('<input type="hidden" class="id-param"></input>').attr("name", d + ".id").val(o.id)).append($('<input type="hidden"></input>').attr("name", d + ".copy").val("true")).append($('<input type="hidden"></input>').attr("name", d + ".deepCopy").val(i || !1)))) : (r.append(l.editorCommon.createInputLink(c, u, o.name, o.url).append($('<input type="hidden" class="id-param"></input>').attr("name", d + ".id").val(o.id))), p = d + (f ? ".overriddenPrice" : ".itemPrice")), f || h) r.append($('<td class="currency price-column"></td>').text("$")).append($('<td class="td-input right price-column"></td>').append($('<input type="text" placeholder="0.00" />').attr("name", p).val(h)));
                                    else {
                                        var g = $('<td class="right price-column" colspan="2"></td>');
                                        m.imgSrc && g.append($('<img class="price-icon" title="' + m.imgTitle + '" src="' + m.imgSrc + '" />')), g.append(m.priceValue), r.append(g)
                                    }
                                    r.append($('<td class="td-actions edit-column"></td>').append('<a class="remove-entity"><i class="icon-trash opacity70" title="Remove option"></i></a>').append('<a class="undo">undo remove</a>')), 0 === a && n.find("tr.placeholder").remove();
                                    var v = n.find("tr.template");
                                    v ? r.insertBefore(v) : n.find("tbody").append(r), a++, l.enableEntityTableInput(r), l.enableEntityTableEditLink(r), l.enableEntityTableDelete(r)
                                }), n.tableDnDUpdate(), n.next().show(), l.updateEditColumns(n), l.menuMgmt.optionGroup.updatePriceColumns(), l.unsavedChanges = !0
                            })
                        };
                        $(".inherited").each(function() {
                            $(this).click(function() {
                                $("#optionGroup_fixedPrice").focus()
                            })
                        }), $(".admin-content").on("click", ".add-option-existing", function(t) {
                            t.preventDefault(), i(!1, e, $(this).attr("data-parent-set-id"))
                        }), $(".admin-content").on("click", ".add-option-copy", function(t) {
                            t.preventDefault(), i(!0, e, $(this).attr("data-parent-set-id"))
                        }), $(".admin-content").on("click", ".add-option-bulk", function(e) {
                            e.preventDefault(), l.menuMgmt.showAddItemBulkDialog("Bulk Add Modifiers", "Please paste in from a spreadsheet: Name, Price, Calories", "Name  Price  Calories", null, function(e) {
                                var t = $(".add-option-simple");
                                for (var i in e) {
                                    t.click();
                                    var a = e[i],
                                        o = n.find("tbody tr:not(.placeholder,.template):last input:text:not(:hidden)");
                                    if (o)
                                        for (var r = o.length, l = e[i], d = 0; d < Math.min(r, l.length); d++) o[d].value = l[d];
                                    a.length >= 3 && n.find("tbody tr:not(.placeholder,.template):last .input-calories").val(a[2])
                                }
                            })
                        }), $(".admin-content").on("click", ".add-option-item", function(e) {
                            e.preventDefault(), l.menuMgmt.chooseMenuItem(!1, null, $(this).attr("data-parent-set-id"), !1, function(e) {
                                var t = l.editorCommon.getForm(),
                                    n = t.find(".add-option-item").attr("href") + e.id;
                                t.append($('<input type="hidden" name="after" />').val(n)), t.submit()
                            })
                        }), $.each([".add-option-new"], function(e, t) {
                            $(".admin-content").on("click", t, function(e) {
                                e.preventDefault();
                                var n = l.editorCommon.getForm();
                                n.append($('<input type="hidden" name="after" />').val(n.find(t).attr("href"))), n.submit()
                            })
                        });
                        var a = $("#referenced-items table,#manual-options table");
                        l.initTableDefaultSelection(a, function() {
                            return $("#optionGroup_multiSelect_true").is(":checked")
                        }), $("#optionGroup_multiSelect").click(function() {
                            $(this).is(":checked") || a.each(function() {
                                $(this).find("input").filter(":checked:gt(0)").prop("checked", !1)
                            }), updateCheckedStates()
                        })
                    }
                }
            }(), l.menuMgmt.option = function() {
                return {
                    init: function() {
                        l.menuMgmt.init(), l.addTouchSectionEnabler("option_overridePrice", "price-override", !1), l.menuMgmt.setupInheritedSection("option_inheritGrubhubOrderable", "grubhub-orderable"), $("#choose-menu-item").click(function(e) {
                            e.preventDefault(), l.menuMgmt.chooseMenuItem(!1, null, $(this).attr("data-parent-set-id"), !1, function(e) {
                                var t = $("#item-reference-id");
                                t.val(e.id).prop("disabled", !1).next().html(e.name), t.prev().show(), $(".selection-list").addClass("disabled").each(function() {
                                    l.updateSelectionListState($(this))
                                });
                                var n = $(".item-preview-content"),
                                    i = n.find(".entity-preview").empty();
                                i.is(":visible") ? i.load(l.menuMgmt.baseUrl + "/menuItemPreview?id=" + e.id) : ($("#item-preview-toggle").attr("data-item-id", e.id), n.find("> img").show(), $("#item-preview-toggle").removeData("loaded")), l.unsavedChanges = !0
                            })
                        }), $("#item-preview-toggle").click(function() {
                            var e = $(this);
                            e.next().slideToggle().end().find("i").toggle(), e.data("loaded") || (e.data("loaded", !0), e.next().find("> img").hide().end().find(".entity-preview").load(l.menuMgmt.baseUrl + "/menuItemPreview?id=" + e.attr("data-item-id")))
                        })
                    }
                }
            }(), l.menuMgmt.menuItemTags = function() {
                return {
                    init: function() {
                        l.editorCommon.init();
                        var e = $("#tags-table");
                        l.enableEntityTableRowTemplate($("#add-tag-new"), e), l.enableEntityTableDelete(e)
                    }
                }
            }(), l.menuMgmt.pricing = function() {
                return {
                    currencySymbol: void 0,
                    groupPriceRange: void 0,
                    parentGroupPriceRange: void 0,
                    isGroup: !1,
                    formatPrice: function(e) {
                        if (!e) return e;
                        var t = 0;
                        return "string" == typeof e ? t = parseFloat(e.replace(",", "")) : "number" == typeof e && (t = e), t.toFixed(2)
                    },
                    formatCurrency: function(e) {
                        if (!e) return "-";
                        var t = l.menuMgmt.pricing;
                        return t.currencySymbol + t.formatPrice(e)
                    },
                    getPriceRange: function() {
                        var e = l.menuMgmt.pricing,
                            t = Number.MAX_VALUE,
                            n = 0;
                        return $("td.size-price :text").each(function() {
                            var e = parseFloat($(this).val());
                            isNaN(e) || (t = Math.min(t, e), n = Math.max(n, e))
                        }), t === Number.MAX_VALUE ? " - " : t === n ? e.formatCurrency(t) : e.formatCurrency(t) + " - " + e.formatCurrency(n)
                    },
                    updateItemGroupPrices: function(e, t) {
                        e || (e = $(':checkbox[name="group.providesPricing"][checked="checked"]').val(), e = "true" === e ? "provides" : "none"), t || (t = $(':checkbox[name="priceGroup.pricing"][checked="checked"]').val()), "none" === e ? $(".item-price :text").attr("placeholder", "0.00") : $(".item-price :text").attr("placeholder", "inherited")
                    },
                    enablePriceWatching: function() {
                        var e = l.menuMgmt.pricing;
                        $("#base-price,#menu-pricing,td.size-price").find(":text").change(function() {
                            var t = $(this);
                            t.val(e.formatPrice(t.val())), e.isGroup && e.updateItemGroupPrices("provides")
                        })
                    },
                    initGroup: function(e, t, n, i) {
                        var a = l.menuMgmt.pricing;
                        a.currencySymbol = t, a.groupPriceRange = n, a.parentGroupPriceRange = i, a.isGroup = !0, a.init(e), a.updateItemGroupPrices()
                    },
                    init: function(e) {
                        var t = l.menuMgmt.pricing;
                        $(":checkbox.pricing-strategy").click(function() {
                            var e = $("#base-price"),
                                n = $("#size-pricing"),
                                i = $("#menu-pricing"),
                                a = $("#time-pricing"),
                                o = $("#location-pricing"),
                                r = $(this).val();
                            n.slideUp(), i.slideUp(), a.slideUp(), o.slideUp(), "DEFAULT" === r ? e.slideDown() : "SIZE_PRICE" === r ? (e.slideUp(), n.slideDown()) : "MENU_SPECIFIC_PRICE" === r ? (e.slideDown(), i.slideDown()) : "TIME_SPECIFIC_PRICE" === r ? (e.slideDown(), a.slideDown()) : "LOCATION_SPECIFIC_PRICE" === r ? (e.slideUp(), o.slideDown()) : "OPEN_PRICE" === r && e.slideUp(), t.isGroup && t.updateItemGroupPrices("provides", r)
                        }), $("#" + e + "_basePrice").change(function() {
                            var e = $(this).val(),
                                n = parseFloat(e.replace(",", "")),
                                i = t.formatPrice(e);
                            if (e && isNaN(n)) return void $(this).closest(".control-group").addClass("error");
                            $(this).val(i), $(this).closest(".control-group").removeClass("error"), $("#menu-pricing :text").each(function() {
                                $(this).attr("placeholder", i)
                            })
                        });
                        var n = $("#size-pricing-table");
                        l.enableEntityTableInput(n), t.enablePriceWatching(), l.enableEntityTableRowTemplate($("#add-new-size-price"), n, void 0, function() {
                            l.enableEntityTableInput(n), l.enableChildEntityTable(n, e + ".sizeOptions"), t.enablePriceWatching()
                        }), l.enableChildEntityTable(n, e + ".sizeOptions", $(".edit-sizes"));
                        var i = $("#time-pricing");
                        l.enableEntityTableInput(i), l.enableEntityTableSelect(i), l.enableEntityTableDelete(i), l.enableEntityTableRowTemplate($("#add-time-pricing"), i, null, function() {
                            l.enableEntityTableInput($(this)), l.enableEntityTableSelect($(this)), l.enableEntityTableDelete($(this))
                        });
                        var a = $("#location-pricing-table");
                        l.enableEntityTableInput(a), l.enableEntityTableSelect(a), l.enableEntityTableDelete(a), t.enablePriceWatching(), l.enableEntityTableRowTemplate($("#add-new-location-price"), a, null, function() {
                            l.enableEntityTableInput($(this)), l.enableEntityTableSelect($(this)), l.enableEntityTableDelete($(this)), $('input[name="hasNonReadonlyPrices"]').val(!0)
                        }), a.on("change", ".location-price :input", function() {
                            var e = $(this).val(),
                                n = parseFloat(e.replace(",", ""));
                            e > 0 || e < 0 ? $(this).val(t.formatPrice(n)) : 0 == e && $(this).val(t.formatPrice(0).toFixed(2))
                        }), a.on("input", ".location-price :input", function() {
                            var e = $(this).val();
                            if (e && isNaN(e)) return void $(this).addClass("error");
                            $(this).removeClass("error")
                        }), $('.other-versions[data-toggle="popover"]').popover({
                            html: !0
                        })
                    }
                }
            }(), l.menuMgmt.salesCategories = function() {
                return {
                    init: function() {
                        l.editorCommon.init();
                        var e = $("#categories-table");
                        l.enableEntityTableRowTemplate($("#add-category-new"), e, void 0, function() {
                            l.enableEntityTableInput($(this)), l.enableEntityTableSelect($(this)), l.enableChildEntityTable(e, "categories", null, null, null, !0), l.updateOrderColumn($(this))
                        }), l.enableChildEntityTable(e, "categories", $(".edit-categories"), null, null, !0), l.enableEntityTableInput(e), l.enableEntityTableSelect(e);
                        var t = $("#revenue-centers-table");
                        l.initTableDefaultSelection(t, !0), l.enableEntityTableRowTemplate($("#add-center-new"), t, void 0, function() {
                            l.enableEntityTableInput($(this)), l.enableEntityTableSelect($(this)), l.enableChildEntityTable(t, "revenueCenters", null, null, null, !0)
                        }), l.enableChildEntityTable(t, "revenueCenters", $(".edit-centers"), null, null, !0), l.enableEntityTableInput(t)
                    }
                }
            }(), l.menuMgmt.priceGroup = function() {
                return {
                    init: function() {
                        l.editorCommon.init();
                        var e = $("#nongroup-pricing");
                        $("#group_inheritPricing_true").click(function() {
                            e.slideUp()
                        }), $("#group_inheritPricing_false").click(function() {
                            e.slideDown()
                        })
                    }
                }
            }(), l.menuMgmt.prepStations = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), $("i.icon-info-sign").tooltip(), $("#prepStations_table").on("click", ".printing-mode :checkbox", function() {
                            var e = $(this).is(":checked") ? "ON" : "OFFLINE_ONLY";
                            $(this).closest("td").find(":hidden").val(e)
                        }), l.enableEntityTableSelect($("#prepStations_table"))
                    }
                }
            }(), l.menuMgmt.productionItemQuantity = function() {
                return {
                    init: function() {
                        l.editorCommon.init();
                        var e = $("#production-item-quantity-table");
                        l.enableChildEntityTable(e), l.enableEntityTableDelete(e), l.enableEntityTableInput(e), l.enableEntityTableRowTemplate($(".add-production-item-quantity-simple"), e, null, function() {
                            l.enableChildEntityTable(e), l.enableEntityTableDelete(e), l.enableEntityTableInput(e)
                        })
                    }
                }
            }(), l.menuMgmt.kitchenSetup = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), $("i.icon-info-sign").tooltip(), l.editorCommon.updateCheckboxes($("#quick-sms-table")), l.editorCommon.updateCheckboxes($("#table-sms-table")), l.editorCommon.updateCheckboxes($("#online-sms-table")), l.editorCommon.updateCheckboxes($("#kiosk-sms-table"));
                        var e = $("input[name='kitchenSetup.multiStageFulfillment'][value='2']"),
                            t = $("input[name='kitchenSetup.multiStageFulfillment'][value='1']"),
                            n = $("div#fulfillmentTextLevel");
                        e.on("click", function() {
                            n.show()
                        }), t.on("click", function() {
                            n.hide()
                        }), $("#kitchenSetup_kitchenTicketHeaderSpacing").bootstrapifySelect("90px"), $("#kitchenSetup_kitchenTicketFooterSpacing").bootstrapifySelect("90px");
                        var i = $("#warning-config table");
                        l.addTouchSectionEnabler("kitchenSetup_warningConfig_enabledAll", "warning-config", !1), l.editorCommon.updateCheckboxes(i), i.find("select").bootstrapifySelect("90px").change(function() {
                            var e = $(this).closest("tr").find(".td-checkbox :checkbox");
                            e.prop("checked", $(this).val() > 0), l.editorCommon.updateCheckbox(e[0])
                        });
                        var a = $("#ticket-footer-config");
                        l.editorCommon.updateCheckboxes(a), a.find("select").bootstrapifySelect("90px").change(function() {
                            var e = $(this).closest("tr").find(".td-checkbox :checkbox");
                            e.prop("checked", $(this).val() > 0), l.editorCommon.updateCheckbox(e[0])
                        })
                    }
                }
            }(), l.menuMgmt.voidReasons = function() {
                return {
                    init: function() {
                        l.editorCommon.init();
                        var e = $("#voidreasons-table");
                        l.enableChildEntityTable(e, "voidReasons"), l.initTableDefaultSelection(e, !0), l.enableEntityTableRowTemplate($("#add-new-void-reason"), e, null, function() {
                            l.enableEntityTableInput(e), l.enableChildEntityTable(e, "voidReasons")
                        })
                    }
                }
            }(), l.menuMgmt.serviceAreas = function() {
                return {
                    init: function() {
                        l.editorCommon.init();
                        var e = $("#service-areas-table");
                        l.initTableDefaultSelection(e, !1, !0), l.enableChildEntityTable(e, "serviceAreas")
                    }
                }
            }(), l.menuMgmt.serviceArea = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), l.addTouchSectionEnabler("serviceArea_autoGratuity", "auto-gratuity", !1), l.addTouchSectionEnabler("serviceArea_autoSvcCharge", "auto-svc-charge", !1), $("#choose-gratuity,#choose-svc-charge").click(function() {
                            var e = $(this);
                            l.menuMgmt.chooseServiceCharge(function(t) {
                                e.prev().prev().html(t.name + " (" + t.info + ")").show(), $("#gratuity-id").val(t.id)
                            })
                        }), $("#serviceArea_autoGratuityPartySize").selectpicker({
                            width: "auto"
                        })
                    }
                }
            }(), l.menuMgmt.serviceCharges = function() {
                return {
                    init: function() {
                        l.editorCommon.init();
                        var e = $("#service-charges-table");
                        l.enableChildEntityTable(e, "serviceCharges"), $("#add-charge").click(function() {
                            var e = l.editorCommon.getForm();
                            e.append($('<input type="hidden" name="after" />').val($(this).attr("href"))), e.submit()
                        })
                    }
                }
            }(), l.menuMgmt.serviceCharge = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), l.addSectionEnabler("amountType_percent", "charge-percent", !1), l.addSectionEnabler("amountType_percent", "charge-amount", !0), l.addSectionEnabler("amountType_fixed", "charge-percent", !0), l.addSectionEnabler("amountType_fixed", "charge-amount", !1), l.addSectionEnabler("amountType_open", "charge-percent", !0), l.addSectionEnabler("amountType_open", "charge-amount", !0), l.addTouchSectionEnabler("serviceCharge_taxable", "tax-rates-section", !1), l.addSectionEnabler("amountType_percent", "percentageApplicationStrategy-section", !1), l.addSectionEnabler("amountType_fixed", "percentageApplicationStrategy-section", !0), l.addSectionEnabler("amountType_open", "percentageApplicationStrategy-section", !0)
                    }
                }
            }(), l.menuMgmt.discounts = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), l.addTouchSectionEnabler("discounts_openDollarDiscount_active", "open-dollar", !1), l.addTouchSectionEnabler("discounts_openPctDiscount_active", "open-percent", !1), l.addTouchSectionEnabler("discounts_itemCompDiscount_active", "comp-item", !1), l.addTouchSectionEnabler("discounts_checkCompDiscount_active", "comp-check", !1), l.initTableDefaultSelection($("#standard-discounts"), !0);
                        var e = $("#custom-discounts");
                        l.initTableDefaultSelection(e, !0), l.enableEntityTableDelete(e)
                    }
                }
            }(), l.menuMgmt.customDiscount = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), l.addSectionEnabler("selectionType_check", "eligible-items", !0), l.addSectionEnabler("selectionType_item", "eligible-items", !1), l.addSectionEnabler("amountType_percent", "discount-percent", !1), l.addSectionEnabler("amountType_percent", "discount-amount", !0), l.addSectionEnabler("amountType_percent", "single-item-selection", !1), l.addSectionEnabler("amountType_percent", "bogo", !0), l.addSectionEnabler("amountType_fixed", "discount-percent", !0), l.addSectionEnabler("amountType_fixed", "discount-amount", !1), l.addSectionEnabler("amountType_fixed", "single-item-selection", !1), l.addSectionEnabler("amountType_fixed", "bogo", !0), l.addSectionEnabler("actionAmountType_percent", "bogo-discount-percent", !1), l.addSectionEnabler("actionAmountType_percent", "bogo-discount-amount", !0), l.addSectionEnabler("actionAmountType_fixed", "bogo-discount-percent", !0), l.addSectionEnabler("actionAmountType_fixed", "bogo-discount-amount", !1), l.addSectionEnabler("amountType_open_fixed", "discount-amount", !0), l.addSectionEnabler("amountType_open_fixed", "discount-percent", !0), l.addSectionEnabler("amountType_open_fixed", "single-item-selection", !1), l.addSectionEnabler("amountType_open_fixed", "bogo", !0), l.addSectionEnabler("amountType_open_percent", "discount-amount", !0), l.addSectionEnabler("amountType_open_percent", "discount-percent", !0), l.addSectionEnabler("amountType_open_percent", "single-item-selection", !1), l.addSectionEnabler("amountType_open_percent", "bogo", !0), l.addSectionEnabler("amountType_bogo", "discount-amount", !0), l.addSectionEnabler("amountType_bogo", "discount-percent", !0), l.addSectionEnabler("amountType_bogo", "single-item-selection", !0), l.addSectionEnabler("amountType_bogo", "bogo", !1), l.addSectionEnabler("eligibleItems_all", "applicable-items", !0), l.addSectionEnabler("eligibleItems_specific", "applicable-items", !1), l.addSectionEnabler("eligibleItems_all_buy", "applicable-items-buy", !0), l.addSectionEnabler("eligibleItems_specific_buy", "applicable-items-buy", !1), l.addSectionEnabler("eligibleItems_all_get", "applicable-items-get", !0), l.addSectionEnabler("eligibleItems_specific_get", "applicable-items-get", !1), l.addSectionEnabler("enableCheckTrigger_true", "checkTrigger-section", !1), l.addSectionEnabler("enableCheckTrigger_false", "checkTrigger-section", !0), $("#add-discount").click(function(e) {
                            e.preventDefault();
                            var t = l.editorCommon.getForm();
                            t.append($('<input type="hidden" name="after" />').val($(this).attr("href"))), t.submit()
                        })
                    }
                }
            }(), l.menuMgmt.openItems = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), l.enableEntityTableDelete($("#openitems-table")), $("#add-openitem").click(function(e) {
                            e.preventDefault();
                            var t = l.editorCommon.getForm();
                            t.append($('<input type="hidden" name="after" />').val($(this).attr("href"))), t.submit()
                        })
                    }
                }
            }(), l.menuMgmt.openItem = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), l.menuMgmt.setupInheritedSection("openItem_deferred", "categories_outer")
                    }
                }
            }(), l.menuMgmt.portions = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), l.enableEntityTableDelete($("#portions-table")), $("#add-portion").click(function(e) {
                            e.preventDefault();
                            var t = l.editorCommon.getForm();
                            t.append($('<input type="hidden" name="after" />').val($(this).attr("href"))), t.submit()
                        })
                    }
                }
            }(), l.menuMgmt.portion = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), l.menuMgmt.setupInheritedSection("portion_deferred", "categories_outer")
                    }
                }
            }(), l.moveCards = function() {
                return {
                    init: function(e) {
                        l.editorCommon.init();
                        var t = $("#source-restaurant-alert");
                        t.hide();
                        var n = e;
                        $(".search-query").typeahead({
                            minLength: 3,
                            items: 5,
                            source: function(e, t) {
                                e.length > 1 && $.getJSON("/restaurantaccess/populateAccessibleRestaurantsShardSpecific", {
                                    shardGuid: n
                                }, function(n) {
                                    var i = [];
                                    $.map(n, function(t) {
                                        var n;
                                        n = {
                                            id: t.id,
                                            name: t.name,
                                            guid: t.guid,
                                            toString: function() {
                                                return JSON.stringify(this)
                                            },
                                            toLowerCase: function() {
                                                return this.toString().toLowerCase()
                                            },
                                            indexOf: function() {
                                                return String.prototype.indexOf.apply(this.id, arguments)
                                            },
                                            replace: function() {
                                                return String.prototype.replace.apply(this.name, arguments)
                                            },
                                            substr: function() {
                                                return String.prototype.substr.apply(this.name, arguments)
                                            }
                                        }, t.id.toString().indexOf(Number(e)) !== -1 ? i.push(n) : t.guid.toString().indexOf(Number(e)) !== -1 ? i.push(n) : t.name.toString().toLowerCase().indexOf(Number(e.toLowerCase()) !== -1) && i.push(n)
                                    }), t(i)
                                })
                            },
                            updater: function(e) {
                                e = JSON.parse(e), t.empty();
                                var n = '<div class="caption"><h3>' + e.name + "</h3><p><b>Restaurant id: </b>" + e.id + "</p><p><b>Restaurant guid: </b>" + e.guid + '</p><input type="hidden" name="sourceRestaurantId" value="' + e.id + '"/></div>';
                                t.append(n), t.show()
                            },
                            highlighter: function(e) {
                                var t = '<div class="typeahead" style="width: 100%;">';
                                return t += "<div>", t += "<div><strong>" + e.name + "</strong></div>", t += "<div><i>Restaurant id: " + e.id + "</i></div>", t += "<div><i>Restaurant guid: " + e.guid + "</i></div>", t += "</div>", t += "</div>"
                            }
                        })
                    }
                }
            }(), l.kioskConfig = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), $("i.icon-info-sign").tooltip(), l.editorCommon.updateCheckboxes($("#kiosk-sms-table")), l.addTouchSectionEnabler("kioskConfig_shouldShowTippingButtons", "kiosk-tip-percentages"), l.editorCommon.updateCheckboxes($("#kiosk-sms-table")), $("#dining-option-mode-selection input").click(function() {
                            $("#dinein-option").hide(), $("#dine-in-instructions").hide(), $("#takeout-option").hide(), $("#take-out-instructions").hide(), "TAKE_OUT" !== this.value && "BOTH" !== this.value || ($("#takeout-option").show(), $("#take-out-instructions").show(), $("#dining-options-control-label").show()), "DINE_IN" !== this.value && "BOTH" !== this.value || ($("#dinein-option").show(), $("#dine-in-instructions").show(), $("#dining-options-control-label").show())
                        }), l.addTouchSectionEnabler("kioskConfig_serviceChargesEnabled", "kiosk-service-charges"), l.addTouchSectionEnabler("kioskConfig_upsellsEnabled", "kiosk-upsell-items");
                        var e = $("#upsell-table");
                        l.enableEntityTableDelete(e, null, !1), l.addTouchSectionEnabler("kioskConfig_cashPaymentEnabled", "kiosk-cash-payment"), l.addTouchSectionEnabler("kioskConfig_specialRequestsEnabled", "kiosk-special-requests"), $(".search-query").typeahead({
                            minLength: 1,
                            items: 10,
                            source: function(e, t) {
                                e.length > 1 && $.getJSON(l.kioskConfig.baseUrl + "/menuItemSearch?query=" + l.escapeHtml(e), function(e) {
                                    var n = [];
                                    $.map(e, function(e) {
                                        var t;
                                        t = {
                                            itemId: e.itemId,
                                            itemName: e.itemName,
                                            groupId: e.groupId,
                                            groupName: e.groupName,
                                            menuName: e.menuName,
                                            itemURL: e.itemURL,
                                            groupURL: e.groupURL,
                                            toString: function() {
                                                return JSON.stringify(this)
                                            },
                                            toLowerCase: function() {
                                                return this.itemName.toLowerCase()
                                            },
                                            indexOf: function() {
                                                return String.prototype.indexOf.apply(this.itemName, arguments)
                                            },
                                            replace: function() {},
                                            substr: function() {
                                                return String.prototype.substr.apply(this.itemName, arguments)
                                            }
                                        }, n.push(t)
                                    }), t(n)
                                })
                            },
                            updater: function(t) {
                                t = JSON.parse(t), $(".placeholder").hide();
                                var n = e.find("tbody tr:not(.placeholder,.template)").length,
                                    i = e.find(":input").filter(function() {
                                        return this.value == t.itemId
                                    }),
                                    a = e.find(":input").filter(function() {
                                        return this.value == t.groupId
                                    });
                                if (!(i.length && a.length || n >= 5)) {
                                    var o = "upsellItems[" + n + "]",
                                        r = $(".template").clone();
                                    r.find("#upsell-id").attr("name", o + ".id").val("true"), r.find("#upsell-item-id").attr("name", o + ".upsellItem.id").val(l.escapeHtml(t.itemId)), r.find("#upsell-group-id").attr("name", o + ".upsellItemGroup.id").val(l.escapeHtml(t.groupId));
                                    var d = '<a href="' + l.escapeHtml(t.itemURL) + '">' + l.escapeHtml(t.itemName) + "</a>",
                                        s = '<a href="' + l.escapeHtml(t.groupURL) + '">' + l.escapeHtml(t.groupName) + "</a>";
                                    r.find("#upsell-name").append(d), r.find("#upsell-group").append(s), r.removeClass(), r.show(), e.append(r), l.enableEntityTableDelete(r)
                                }
                            },
                            highlighter: function(e) {
                                var t = '<div class="typeahead" style="width: 100%;">';
                                return t += "<div>", t += "<div><strong>" + e.itemName + "</strong></div>", t += "<div>" + e.groupName + " (<i>Menu: " + e.menuName + ")</i></div>", t += "</div>", t += "</div>"
                            }
                        }), $(".form-search").submit(function(e) {
                            return e.preventDefault(), !1
                        })
                    },
                    baseUrl: "/restaurants/admin/kiosk"
                }
            }(), l.guestFeedbackConfig = function() {
                function e(e) {
                    var n = e.find("option:selected"),
                        i = e.closest("tr"),
                        a = i.find(".phone-number");
                    t(i.find(".email"), n.text().includes("Email")), t(a, n.text().includes("SMS"))
                }

                function t(e, t) {
                    t ? (e.parent().addClass("fadedin").removeClass("fadedout"), e.attr("disabled", null)) : (e.parent().addClass("fadedout").removeClass("fadedin"), e.attr("disabled", "disabled"))
                }
                return {
                    init: function() {
                        l.editorCommon.init();
                        var t = function(e) {
                                e.find('select[name*="userGuid"]').change(function() {
                                    var e = $(this),
                                        t = e.find("option:selected"),
                                        n = $(this).closest("tr"),
                                        i = n.find(".user-name"),
                                        a = n.find(".phone-number"),
                                        o = t.data("phone-number"),
                                        r = n.find(".email"),
                                        l = t.data("email");
                                    i.val(t.text()), o ? a.val(o) : a.val(null), l ? r.val(l) : r.val(null)
                                })
                            },
                            n = function(t) {
                                var n = t.find('select[name*="alertNotificationType"]');
                                e(n), n.change(function() {
                                    e($(this))
                                })
                            },
                            i = $("#notification-config-table");
                        l.enableEntityTableRowTemplate($("#add-user-notify"), i, function() {
                            l.enableEntityTableSelect($(this)), l.enableEntityTableInput($(this)), t($(this))
                        }, function() {
                            n(i.find("tr:not(.template)").last())
                        }), l.enableEntityTableDelete(i, null, !1), l.enableEntityTableSelect(i), l.enableEntityTableInput(i), t(i), n(i), l.addTouchSectionEnabler("guestFeedbackConfig_feedbackEnabled", "show-if-feedback-enabled", !1, !0), l.addSectionEnabler("guestFeedbackConfig_notificationType_NO_NOTIFICATION", "users-to-notify", !0, !0), l.addSectionEnabler("guestFeedbackConfig_notificationType_NEGATIVE_FEEDBACK_ONLY", "users-to-notify", !1, !0), l.addSectionEnabler("guestFeedbackConfig_notificationType_ALL_FEEDBACK", "users-to-notify", !1, !0)
                    }
                }
            }(), l.managerAlertConfig = function() {
                return {
                    init: function() {
                        l.addTouchSectionEnabler("enable-feature-toggle", "title-feature", !1, !0)
                    }
                }
            }(), l.configChanges = function() {
                return {
                    init: function() {
                        function e(e) {
                            e.find("td:last").find("a").hide().end().find("div").show()
                        }

                        function t(t) {
                            e(t), t.find(".published-date").text("moments ago"), t.find(":checkbox").prop("checked", !1).trigger("change").prop("disabled", !0)
                        }

                        function n(e) {
                            e.addClass("error"), e.find("a span").text("Error!")
                        }

                        function i(e) {
                            a.prop("disabled", !0), o.addClass("working").find("span").text("Publishing changes...please be patient, this may take a few moments");
                            var i, s = r.find("tbody :checkbox:not(:disabled):not(:checked)"),
                                c = void 0;
                            e ? (c = 0 == s.length, i = $.map(e, function(e) {
                                return {
                                    name: "restaurantId",
                                    value: e
                                }
                            })) : (i = [], c = !0), i.push({
                                name: "all",
                                value: c
                            });
                            var u = $('input[name="authenticityToken"]');
                            u && i.push({
                                name: "authenticityToken",
                                value: u.val()
                            }), r.find(":checkbox").prop("disabled", !0).prop("checked", !1), r.find("a").addClass("disabled"), l.postKeepAliveJson(a.data("publishUrl"), i, function(e) {
                                var i = 200 == e.status;
                                if (i && (!d || c)) return void(window.location.href = "/restaurants/admin");
                                o.removeClass("working alert-info alert-error alert-success"), i ? o.addClass("alert-success").find("span").text(e.message) : o.addClass("alert-error").find("span").text(e.message), d && e.data && ($.each(e.data, function(e, i) {
                                    var a = i.restaurantId,
                                        o = r.find('tr[data-restaurant-id="' + a + '"]');
                                    i.success ? t(o) : n(o)
                                }), r.find("thead :checkbox").prop("disabled", !1), s.each(function() {
                                    $(this).prop("disabled", !1).closest("tr").find("a").removeClass("disabled")
                                }))
                            })
                        }
                        var a = $("#publish-button"),
                            o = $("#publish-status"),
                            r = $("#publishing table"),
                            d = r.length > 0;
                        l.getKeepAliveJson("/restaurants/admin/checkConfigChanges", function(s) {
                            d ? (r.find("tbody tr").each(function() {
                                var t = $(this);
                                s.data.changeDetails[t.attr("data-restaurant-id")] ? (t.find(":checkbox").prop("disabled", !1).prop("checked", !0).trigger("change"), t.find("a").removeClass("disabled").css("visibility", "visible").show()) : e(t)
                            }), l.enableMultiedit("publishing"), r.find("a").click(function(e) {
                                e.preventDefault();
                                var i = $(this);
                                if (!i.hasClass("disabled")) {
                                    var a = i.closest("tr"),
                                        o = $('input[name="authenticityToken"]'),
                                        r = [];
                                    o && r.push({
                                        name: "authenticityToken",
                                        value: o.val()
                                    }), a.find(":checkbox").prop("checked", !1).trigger("change").prop("disabled", !0), i.addClass("disabled").find("img").show(), l.postKeepAliveJson(i.attr("href"), r, function(e) {
                                        i.find("img").hide(), 200 == e.status ? t(a) : (l.alertMgr.error(e.message), n(a))
                                    })
                                }
                            }), a.on("multiedit", function(e, t) {
                                i(t)
                            })) : a.click(function() {
                                i()
                            }), o.find("span").text(s.message), o.removeClass("working"), s.data.hasChanges ? (a.prop("disabled", !1), r.find("thead :checkbox").prop("disabled", !1)) : (o.removeClass("alert-info"), r.find("thead :checkbox").prop("checked", !1))
                        })
                    },
                    continuePublish: function() {
                        var e, t = $("#publish-link"),
                            n = $("#publish-btn");
                        t && (e = t.parent(), e.html("Publishing Changes..."));
                        var i = $('input[name="authenticityToken"]'),
                            a = {};
                        i && (a.authenticityToken = i.val()), l.postKeepAliveJson("/restaurants/admin/quickApplyConfigChanges", a, function(i) {
                            n && n.removeClass("btn-primary"), 200 == i.status ? t && e.html(i.message) : 401 == i.status ? (alert("You must be logged in to perform the requested action."), window.location.replace("")) : (t && e.html(i.message), alert(i.message))
                        })
                    },
                    publishNow: function() {
                        var e = $("#publish-btn");
                        e && e.addClass("disabled"), l.getKeepAliveJson("/restaurants/admin/checkForUnexpectedChanges", function(t) {
                            if (e && e.removeClass("btn-primary"), void 0 != t && t.prompt) {
                                1 == confirm(t.message) ? l.configChanges.continuePublish() : e && e.removeClass("disabled")
                            } else l.configChanges.continuePublish()
                        })
                    }
                }
            }(), l.editorCommon = function() {
                return {
                    getForm: function() {
                        return $(".admin-content form:not(.exclude-from-save)")
                    },
                    updateCheckboxes: function(e) {
                        e.find(".td-checkbox :checkbox").each(function() {
                            $(this).click(function() {
                                l.editorCommon.updateCheckbox(this)
                            }), l.editorCommon.updateCheckbox(this)
                        })
                    },
                    updateCheckbox: function(e) {
                        e.checked ? $(e).closest("td").addClass("checked") : $(e).closest("td").removeClass("checked")
                    },
                    createCheckbox: function(e, t) {
                        var n = $('<input type="checkbox" name="' + e + '"/>').val(!0);
                        return t && n.attr("checked", "checked"), $('<td class="td-checkbox"></td>').append($("<label></label>").append(n).append('<input type="hidden" name="' + e + '" value="false" />'))
                    },
                    createSelect: function(e, t, n) {
                        for (var i = $("<select name=" + e + "></select>"), a = 0; a < n.length; a++) {
                            var o = n[a],
                                r = $('<option value="' + o.value + '">');
                            r.text(o.name), r.append("</option>"), o.selected && r.attr("selected", "true"), i.append(r)
                        }
                        return $('<td class="td-select"></td>').append(i)
                    },
                    createInputLink: function(e, t, n, i) {
                        return $('<td class="td-input-link"></td>').append($("<div></div>").append($('<a class="input-link"></a>').text(n).attr("href", i)).append($('<a class="input-edit" href="#" style="display:none;"><i class="icon-edit"></i></a>')).append($('<input type="text" placeholder="' + t + '" style="display:none;" class="input-param"></input>').attr("name", e).val(n)))
                    },
                    closeColorChoices: function(e) {
                        if (e.find(".popover").length > 0) return e.find(".pos-cell").popover("hide"), !1
                    },
                    getPopover: function() {
                        return {
                            html: !0,
                            placement: "bottom",
                            trigger: "manual",
                            content: function() {
                                return $(this).closest(".pos-cell").next().clone().show().wrap("<div/>").parent().html()
                            }
                        }
                    },
                    setPressState: function(e) {
                        e.find(".pos-cell").mousedown(function() {
                            $(this).addClass("pressed")
                        }).mouseup(function() {
                            $(this).removeClass("pressed")
                        })
                    },
                    enableColorEditor: function(e) {
                        if (!e.hasClass("disabled")) {
                            var t = e.children("input"),
                                n = e.children(".pos-cell"),
                                i = function() {
                                    l.editorCommon.setPressState(e), e.find(".popover .pos-cell").click(function() {
                                        var i = $(this);
                                        e.find(".pos-cell").removeClass("selected"), i.addClass("selected"), n.css("backgroundColor", $(this).css("backgroundColor")).popover("hide"), t.val(i.attr("color")).trigger("change")
                                    })
                                };
                            n.popover(l.editorCommon.getPopover(n)).click(function() {
                                $(this).popover("toggle"), i();
                                var n, a = t.val();
                                return e.find(".popover .pos-cell").each(function() {
                                    n = $(this), n.attr("color") === a && n.addClass("selected")
                                }), !1
                            }), i(), $("body").on("click", function() {
                                l.editorCommon.closeColorChoices(e)
                            })
                        }
                    },
                    enableHexInputColorEditor: function(e) {
                        if (!e.hasClass("disabled")) {
                            var t = e.find(".preview-cell"),
                                n = e.find(".user-input-field"),
                                i = /#([0-9a-fA-F]{6})/,
                                a = function(e) {
                                    return !!i.test(e)
                                },
                                o = function(e) {
                                    return "#" + e.slice(-6)
                                },
                                r = function(e) {
                                    var i = o(e);
                                    t.css("backgroundColor", i).popover("hide"), n.val(i).trigger("change")
                                },
                                d = function() {
                                    l.editorCommon.setPressState(e), e.find(".popover .pos-cell").click(function() {
                                        r($(this).attr("id"))
                                    })
                                };
                            n.keypress(function() {
                                13 != event.keyCode && /[#0-9a-fA-F]/.test(event.key) || event.preventDefault()
                            }), n.on("input", function() {
                                var e = n.val();
                                a(o(e)) && r(o(e))
                            }), t.popover(l.editorCommon.getPopover()).click(function() {
                                return $(this).popover("toggle"), d(), !1
                            }), $("body").on("click", function() {
                                l.editorCommon.closeColorChoices(e.find(".popover"))
                            }), d()
                        }
                    },
                    enableSaveAndPublishBtns: function(e) {
                        $("#save-btn,#save-and-add-btn").click(function(t) {
                            function n() {
                                var e = l.editorCommon.getForm();
                                "save-and-add-btn" == i && (e.find('input[name="after"]').prop("disabled", !0), e.append($('<input type="hidden" name="after" />').val(a))), l.unsavedChanges = !1, e.submit()
                            }
                            if (t.preventDefault(), !$(this).hasClass("disabled") && (null == e || e())) {
                                l.editorCommon.disableSaveAndPublishBtns(), $("#publish-link").closest(".alert").html("Saving Changes...");
                                var i = $(this).attr("id"),
                                    a = $(this).attr("href");
                                n()
                            }
                        }), $("#publish-btn").click(function(e) {
                            e.preventDefault(), $(this).hasClass("disabled") || l.configChanges.publishNow()
                        })
                    },
                    disableSaveAndPublishBtns: function() {
                        $("#save-btn,#save-and-add-btn,#publish-btn").addClass("disabled")
                    },
                    init: function(e) {
                        l.enableSelectionList(), l.editorCommon.enableSaveAndPublishBtns(e), $("#setup-restaurants").change(function() {
                            var e = $(this).treepicker("val"),
                                t = $("#submit-setup-group").show();
                            e && e.length ? t.prop("disabled", !1) : t.prop("disabled", !0)
                        }), $("#submit-setup-group").click(function() {
                            $("#selected-sets-changed").val(!0)
                        })
                    }
                }
            }(), l.posUx = function() {
                return {
                    init: function() {
                        l.editorCommon.init();
                        var e = $("#system-option-groups");
                        l.editorCommon.updateCheckboxes(e), l.enableChildEntityTable(e, "systemOptionGroups"), e = $("#z-report-sections"), l.editorCommon.updateCheckboxes(e), l.enableChildEntityTable(e, "zReportSections"), e = $("#shift-review-sections"), l.editorCommon.updateCheckboxes(e), l.enableChildEntityTable(e, "shiftReviewSections"), e = $("#closed-drawer-report-sections"), l.editorCommon.updateCheckboxes(e), l.enableChildEntityTable(e, "closedDrawerReportSections"), l.addTouchSectionEnabler("config_splitTaxRatesEnabled", "control-group-receiptLabel", !0), l.addTouchSectionEnabler("config_tipConfirmEnabled", "control-group-largeTipsThreshold", !1), l.addTouchSectionEnabler("config_tipsBySalesCategory", "controls-sales-category-tip-percentages", !1), l.addTouchSectionEnabler("config_sendChecksAfterPaymentOnly", "send-buttons", !0), l.addTouchSectionEnabler("config_mustDeclareCashTips", "allow-declare-negative-tips", !1);
                        var t = $("#ssid-table");
                        l.enableEntityTableRowTemplate($("#add-ssid"), t, function() {
                            l.enableEntityTableDelete($(this))
                        }), l.enableEntityTableDelete(t)
                    }
                }
            }(), l.printing = function() {
                function e(e, t) {
                    var n = Array(e + 1).join("a"),
                        i = $("<div/>").text(n);
                    $.each(["font-family", "font-size", "font-style", "font-weight", "font-variant"], function(e, n) {
                        var a = t.css(n);
                        a && i.css(n, a)
                    }), i.css({
                        position: "absolute",
                        left: "-9999px"
                    }), i.appendTo($("body"));
                    var a = i.width();
                    return i.remove(), a
                }

                function t(t) {
                    var n = $(".receipt-lines"),
                        i = n.find("> textarea"),
                        a = e(parseInt(t), i);
                    i.width(a), i.focus(function() {
                        $(this).parent().addClass("focused")
                    }), i.blur(function() {
                        $(this).parent().removeClass("focused")
                    }), n.prev().width(i.innerWidth()).css("margin-left", $(n).css("padding-left")), i.keyup(function() {
                        var e = $(this),
                            t = (e.val().match(/\n/g) || []).length + 1;
                        e.prop("rows") != t && t >= 4 && e.prop("rows", t)
                    })
                }
                var n = "Deleting the cash drawer will remove any existing cash entries and balance information. Are you sure you want to continue?";
                return {
                    initReceiptConfig: function(e) {
                        l.editorCommon.init(), t(e)
                    },
                    initHome: function() {
                        l.editorCommon.init();
                        var e = $("#printers_table");
                        l.enableEntityTableDelete(e, null, !0), l.initCheckboxes(e.find(".td-checkbox > label")), $(".cash-drawer-check-box").change(function() {
                            $(this).is(":checked") ? $(this).siblings(".cash-drawer-count").val("SINGLE_CASHDRAWER") : confirm(n) ? $(this).siblings(".cash-drawer-count").val("NO_CASHDRAWER") : $(this).prop("checked", !0).closest("label").addClass("checked").closest(".td-checkbox").addClass("checked")
                        })
                    },
                    initPrinter: function() {
                        0 == $("#printer_cashDrawer_resetType_MANUAL").prop("checked") && 0 == $("#printer_cashDrawer_resetType_AUTOMATIC").prop("checked") && ($("#printer_cashDrawer_resetType_AUTOMATIC").prop("checked", !0), $("#printer_cashDrawer_balance").prop("value", "0.00")), 0 == $("#printer_secondaryCashDrawer_resetType_MANUAL").prop("checked") && 0 == $("#printer_secondaryCashDrawer_resetType_AUTOMATIC").prop("checked") && ($("#printer_secondaryCashDrawer_resetType_AUTOMATIC").prop("checked", !0), $("#printer_secondaryCashDrawer_balance").prop("value", "0.00")), $("#printer_cashDrawerCount_NO_CASHDRAWER").click(function(e) {
                            $(this).is(":checked") && (confirm(n) || (e.stopImmediatePropagation(), $(this).prop("checked", !1), l.updateSelectionListState($(this).closest("ul.selection-list"))))
                        }), $("#printer_cashDrawerCount_SINGLE_CASHDRAWER").click(function(e) {
                            !$("#printer_cashDrawerCount_NO_CASHDRAWER").prop("checked") && $(this).is(":checked") && (confirm(n) || (e.stopImmediatePropagation(), $(this).prop("checked", !1), l.updateSelectionListState($(this).closest("ul.selection-list"))))
                        }), l.addSectionEnabler("printer_cashDrawerCount_NO_CASHDRAWER", "cash-drawer-fields", !0), l.addSectionEnabler("printer_cashDrawerCount_NO_CASHDRAWER", "secondary-cash-drawer-fields", !0), l.addSectionEnabler("printer_cashDrawerCount_NO_CASHDRAWER", "cash-drawer-delay-field", !0), l.addSectionEnabler("printer_cashDrawerCount_NO_CASHDRAWER", "cash-drawer-name-field", !0), l.addSectionEnabler("printer_cashDrawerCount_SINGLE_CASHDRAWER", "cash-drawer-fields", !1), l.addSectionEnabler("printer_cashDrawerCount_SINGLE_CASHDRAWER", "secondary-cash-drawer-fields", !0), l.addSectionEnabler("printer_cashDrawerCount_SINGLE_CASHDRAWER", "cash-drawer-delay-field", !1), l.addSectionEnabler("printer_cashDrawerCount_SINGLE_CASHDRAWER", "cash-drawer-name-field", !1), l.addSectionEnabler("printer_cashDrawerCount_DOUBLE_CASHDRAWER", "cash-drawer-fields", !1), l.addSectionEnabler("printer_cashDrawerCount_DOUBLE_CASHDRAWER", "secondary-cash-drawer-fields", !1), l.addSectionEnabler("printer_cashDrawerCount_DOUBLE_CASHDRAWER", "cash-drawer-delay-field", !1), l.addSectionEnabler("printer_cashDrawerCount_DOUBLE_CASHDRAWER", "cash-drawer-name-field", !1), l.addSectionEnabler("printer_model_EPSON_T88V", "char-set-dropdown", !1), l.addSectionEnabler("printer_model_EPSON_T20", "char-set-dropdown", !0), l.addSectionEnabler("printer_model_EPSON_U220", "char-set-dropdown", !0), l.addSectionEnabler("printer_model_EPSON_U220_Chinese", "char-set-dropdown", !0), l.addSectionEnabler("printer_model_EPSON_L90", "char-set-dropdown", !0), l.addSectionEnabler("printer_model_EPSON_P80_BT", "char-set-dropdown", !0), l.addSectionEnabler("printer_model_TSP650", "char-set-dropdown", !0), l.addSectionEnabler("printer_model_TSP100", "char-set-dropdown", !0), l.addSectionEnabler("printer_model_SNBC_S80", "char-set-dropdown", !0), l.editorCommon.init(), $("#printer_characterEncoding").selectpicker();
                        var e = $("#printer-devices-table");
                        e && (l.enableEntityTableInput(e), l.enableEntityTableSelect(e), l.enableEntityTableDelete(e, null, !0), l.enableEntityTableRowTemplate($("#add-new-printer-device"), e, null, function() {
                            l.enableEntityTableInput($(this)), l.enableEntityTableSelect($(this)), l.enableEntityTableDelete($(this), null, !0)
                        })), $("#control-group-printer_model li").on("click", function(e) {
                            "EPSON_L90" === e.target.value ? $("#item-label-config").slideDown() : $("#item-label-config").slideUp()
                        }), $("#printer_ticketType_KITCHEN_TICKET").is(":checked") && ($("#printer-item-label-footer-container").hide(), $("#control-group-printer_ticketType_ITEM_LABEL_preview").hide()), $("#printer_ticketType_ITEM_LABEL").click(function() {
                            $("#printer-item-label-footer-container").slideDown(), $("#control-group-printer_ticketType_ITEM_LABEL_preview").slideDown(), t(42)
                        }), $("#printer_ticketType_KITCHEN_TICKET").click(function() {
                            $("#printer-item-label-footer-container").slideUp(), $("#control-group-printer_ticketType_ITEM_LABEL_preview").slideUp()
                        }), t(42)
                    },
                    initFixedSizeReceiptLinesEditor: function(e, t) {
                        function n(n) {
                            var i = n.target.selectionStart,
                                o = n.target.value,
                                r = a(o);
                            if (r.length < e) return !0;
                            for (var l = 0, d = 0; d < r.length; d++)
                                if ((l += r[d].length) >= i) return r[d].length !== t;
                            return !0
                        }

                        function i(e, n, i) {
                            var a = new RegExp(".{1," + t + "}", "g"),
                                o = n.match(a) || n;
                            return o.length > 0 && e.length > 1 && i < e.length - 1 && (o[o.length - 1] = o[o.length - 1] + "\n"), o
                        }

                        function a(e) {
                            if (!e || "" === e) return [];
                            for (var t = e.split("\n"), n = [], a = 0; a < t.length; a++) {
                                var o = t[a],
                                    r = i(t, o, a);
                                n = n.concat(r)
                            }
                            return n
                        }

                        function o(e) {
                            return e.target.selectionStart === e.target.selectionEnd && s.includes(e.key) && !e.altKey && !e.ctrlKey && !e.metaKey
                        }

                        function r(e) {
                            return "Enter" === e.key || 13 === e.which
                        }

                        function l(t) {
                            return a(t.target.value).length < e
                        }

                        function d(e) {
                            for (var n = Math.ceil(e.length / t), i = 0; i < n; i++) {
                                var a = (i + 1) * t;
                                if (e.length > a && " " !== e[a - 1] && "-" !== e[a - 1]) {
                                    var o = " " === e[a - 2] ? " " : "-";
                                    e = e.slice(0, a - 1) + o + e.slice(a - 1)
                                }
                            }
                            return e
                        }
                        $("#printer_customItemLabelFooter").on("keydown", function(e) {
                            return !(o(e) && !n(e)) && (!(r(e) && !l(e)) && void 0)
                        }), $("#printer_customItemLabelFooter").on("keyup", function(e) {
                            for (var t = e.target.value, n = t.split("\n"), a = [], o = 0; o < n.length; o++) {
                                var r = d(n[o]),
                                    l = i(n, r, o);
                                a = a.concat(l)
                            }
                            a.join("") !== e.target.value && $("#printer_customItemLabelFooter").val(a.join(""))
                        });
                        var s = ["Enter", "Tab", " ", "Spacebar", "Divide", "Add", "Multiply", "Decimal", "Subtract", "`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "[", "{", "]", "}", "|", "\\", ";", ":", "'", '"', ",", "<", ">", "/", "?", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
                    }
                }
            }(), l.flatfiles = function() {
                return {
                    initHome: function() {
                        l.editorCommon.init();
                        var e = $("#flatfiles-table");
                        l.enableEntityTableDelete(e), l.initTableDefaultSelection(e, !0, !1)
                    },
                    initEdit: function() {
                        l.editorCommon.init(), $('input[type="text"]')[0].focus()
                    }
                }
            }(), l.jobs = function() {
                function e() {
                    var e = $("#job_defaultWage"),
                        t = e.val(),
                        n = e.closest(".control-group"),
                        i = n.next();
                    e.keyup(function() {
                        e.val() != t ? i.slideDown() : i.slideUp()
                    }), $("#retroactiveDate").datepicker({
                        format: "mm-dd-yyyy"
                    })
                }
                return {
                    initHome: function() {
                        l.editorCommon.init();
                        var e = $("#jobs-table");
                        l.enableEntityTableDelete(e), l.initTableDefaultSelection(e, !0, !1)
                    },
                    initEdit: function(t) {
                        l.editorCommon.init(), l.users.initPermissions(), $('input[type="text"]')[0].focus(), t && e()
                    },
                    initQuickAdd: function() {
                        l.editorCommon.init();
                        var e = $("#jobs-table");
                        l.editorCommon.updateCheckboxes(e), l.enableEntityTableDelete(e), l.enableEntityTableInput(e), l.enableEntityTableSelect(e), l.enableEntityTableRowTemplate($("#add-job"), e, void 0, function() {
                            l.editorCommon.updateCheckboxes(this), l.enableEntityTableInput($(this)), l.enableEntityTableSelect($(this)), l.enableEntityTableDelete($(this))
                        }), $('input[type="text"]')[0].focus()
                    }
                }
            }(), l.users = function() {
                function e() {
                    $('form :text[name^="restaurantUser.jobWageOverrides"]').each(function() {
                        $(this).data("originalVal", $(this).val())
                    }).keyup(function() {
                        $(this).val() != $(this).data("originalVal") ? $(this).attr("wagechanged", "true") : $(this).removeAttr("wagechanged"), $(this).closest("table").find(":text[wagechanged]").length > 0 ? $("#retroactive-wage-change").slideDown() : $("#retroactive-wage-change").slideUp()
                    }), $("#retroactiveDate").datepicker({
                        format: "mm-dd-yyyy"
                    })
                }

                function t() {
                    $("#jobs-table :checkbox").change(function() {
                        l.users.reloadPermissions()
                    }), $("#permissionMask").change(function() {
                        l.users.reloadPermissions()
                    })
                }

                function n(e, t) {
                    var n = e.find("button.inherit"),
                        i = e.find("button.override");
                    return n.toggleClass("active", !t), i.toggleClass("active", t), i
                }

                function i(e, t) {
                    var n = e.parent().prevAll(":hidden");
                    n.prop("disabled", !t), n.trigger("change")
                }

                function a(e) {
                    return e.nextUntil(".permission-group")
                }
                var o = !1,
                    r = !1;
                return {
                    initPermissions: function() {
                        var e = $(".permissions-table"),
                            t = e.find(":hidden[name^=permissionsOverride], :hidden[name^=supportAuthorizationPermissionsOverride]"),
                            d = e.find("button.inherit"),
                            s = e.find("button.override"),
                            c = 0 == t.length;
                        l.initCheckboxes(e.find(".td-checkbox > label")), e.find(".icon-info-sign").each(function() {
                            $(this).tooltip({
                                placement: "right",
                                title: $(this).attr("data-original-title")
                            })
                        }), e.find("tr.permission-group :checkbox").change(function() {
                            if (!o) {
                                r = !0;
                                a($(this).closest("tr")).find(":checkbox:not(:disabled)").prop("checked", $(this).is(":checked")).change(), r = !1
                            }
                        }), e.find("tr.permission-row :checkbox").change(function() {
                            if ($(this).is(":checked")) {
                                if (r) return;
                                var e = $(this).closest("tr"),
                                    t = e.prevAll("tr.permission-group:first");
                                o = !0, c || (n(t, !0), i(t.find("button.override"), !0)), t.find(":checkbox.final").prop("checked", !0).change(), o = !1
                            }
                        }), c || (d.click(function() {
                            i($(this), !1)
                        }), s.click(function() {
                            i($(this), !0)
                        }), t.change(function() {
                            var e = $(this),
                                t = !e.prop("disabled"),
                                l = e.closest("tr").find(":checkbox.final"),
                                d = e.closest("tr"),
                                s = d.is(".permission-group");
                            if (!t) {
                                var c = e.data("inheritedValue");
                                l.prop("checked", c)
                            }
                            if (l.prop("disabled", !t), l.trigger("change"), s && !o) {
                                var u = a(d);
                                r = !0, u.each(function() {
                                    i(n($(this), t), t)
                                }), r = !1
                            }
                        }))
                    },
                    reloadPermissions: function() {
                        var e = $("#permissions"),
                            t = $("#theForm"),
                            n = e.data("previewUrl");
                        if (n) {
                            var i = $("#add-group-perms-btn");
                            e.mask("Updating..."), i.prop("disabled", !0);
                            var a = Date.now();
                            l.users.lastPermsLoad = a;
                            var o = $("#permissions-accordion .accordion-body.collapse.in").attr("data-set-id");
                            $("#perms-accordion-state").val(o), $.post(n, t.serialize(), function(t) {
                                a == l.users.lastPermsLoad && (e.unmask(), i.prop("disabled", !1), e.html(t), l.users.initPermissions())
                            }, "html").fail(function(e) {
                                $("#save-btn").click(), e.preventDefault(), e.stopPropagation()
                            })
                        }
                    },
                    initInvite: function() {
                        l.editorCommon.init(), l.users.initPermissions(), t()
                    },
                    initEdit: function(n) {
                        function i() {
                            if (a) var e = $("#user_email").val().localeCompare(a);
                            if (o) var t = $("#restaurantUser_passcode").val().localeCompare(o);
                            return !e && !t || confirm("Are you sure you want to save these changes? Changes to email address or passcode will log this user out of all active sessions.")
                        }
                        var a = $("#user_email").val(),
                            o = $("#restaurantUser_passcode").val();
                        l.editorCommon.init(n ? i : null), l.users.initPermissions(), $("#user_guid").val() && e(), t()
                    }
                }
            }(), l.payments = function() {
                return {
                    initHome: function() {
                        l.editorCommon.init(), $("i.icon-info-sign").tooltip(), l.editorCommon.updateCheckboxes($("#gift-card-digital-receipt-options"))
                    }
                }
            }(), l.schedule = function() {
                function e(e, t) {
                    var n = $(e).closest("tr");
                    n = n.add(n.nextUntil("tr.primary")), n.each(function(e, n) {
                        t.call(this, $(n))
                    })
                }

                function t(e) {
                    e.find(".td-checkbox :radio").each(function() {
                        $(this).is(":checked") ? $(this).closest("td").addClass("checked") : $(this).closest("td").removeClass("checked")
                    })
                }

                function n(e) {
                    var t = l.schedule.editingRow = $(e).closest("tr"),
                        n = t;
                    n.hasClass("primary") || (n = n.prevAll(".primary:first"));
                    var i = n.find(":text").val(),
                        a = t.find(".service-name").text(),
                        o = $("#hours-picker");
                    o.find(".modal-header h3").text((i || "(no schedule name)") + " > " + a), $.each(["startHour", "startMinute", "endHour", "endMinute"], function(e, n) {
                        var i = t.find(':hidden[name$="' + n + '"]').val();
                        "startHour" != n || i || (i = 12), o.find(':text[name="' + n + '"]').val(i)
                    }), $.each(["startAmPm", "endAmPm"], function(e, n) {
                        var i = t.find(':hidden[name$="' + n + '"]').val();
                        o.find("." + n + " button").removeClass("active").filter("." + i).addClass("active")
                    }), o.find(".stepper-input input").each(function() {
                        $(this).data("previousValue", $(this).val())
                    }), o.on("shown", function() {
                        o.find(":text:first").focus().select()
                    }), o.modal()
                }

                function i(e) {
                    return (e < 10 ? "0" : "") + e
                }
                return {
                    init: function() {
                        l.editorCommon.init();
                        var a = $("#services-table"),
                            o = $("#day-schedules-table"),
                            r = $("#week-schedule-table");
                        l.enableEntityTableRowTemplate($("#add-service"), a, function() {
                            a.next().show()
                        }), l.enableEntityTableDelete(a), l.enableEntityTableRowTemplate($("#add-day-schedule"), o, function() {
                            o.next().show()
                        }), l.initTableDefaultSelection(o, !0, !1), o.on("click", "a.remove-entity", function() {
                            e(this, l._deleteEntityTableRow)
                        }), o.on("click", "a.undo", function() {
                            e(this, l._undeleteEntityTableRow)
                        }), o.on("click", "button", function() {
                            n(this)
                        }), r.on("click", ".td-checkbox :radio", function() {
                            t(r)
                        }), t(r);
                        var d = $("#hours-picker");
                        d.find(".stepper-input button").click(function() {
                            var e = $(this),
                                t = e.siblings("input"),
                                n = parseInt(e.data("step")),
                                a = parseInt(t.data("min")),
                                o = parseInt(t.data("max")),
                                r = t.val();
                            r = r ? parseInt(r) : a;
                            var l = r + n;
                            l < a ? l = o : l > o && (l = a), 59 == o && (l = i(l)), t.val(l)
                        }), d.find(".stepper-input input").keyup(function() {
                            var e = $(this),
                                t = parseInt(e.data("min")),
                                n = parseInt(e.data("max")),
                                i = e.val();
                            i = i ? parseInt(i) : t, i < t || i > n || isNaN(i) ? (alert("Please enter a value between " + t + " and " + n), e.val(e.data("previousValue"))) : e.data("previousValue", i)
                        }), d.find(".modal-footer .btn-primary").click(function() {
                            var e = d.find(".modal-body :text").map(function() {
                                    var e = $(this).val();
                                    return e && !isNaN(parseInt(e)) || (e = $(this).data("min")), parseInt(e)
                                }).get(),
                                t = d.find(".startAmPm .active").text(),
                                n = d.find(".endAmPm .active").text();
                            $.each(["startHour", "startMinute", "endHour", "endMinute"], function(t, n) {
                                l.schedule.editingRow.find(':hidden[name$="' + n + '"]').val(e[t])
                            }), l.schedule.editingRow.find(':hidden[name$="startAmPm"]').val(t), l.schedule.editingRow.find(':hidden[name$="endAmPm"]').val(n);
                            var a = e[0] + ":" + i(e[1]) + " " + t,
                                o = e[2] + ":" + i(e[3]) + " " + n,
                                r = a + " - " + o;
                            l.schedule.editingRow.find(".period-hours span").text(r), l.schedule.editingRow.find(":checkbox").prop("checked", !0).closest("tr").addClass("checked"), d.modal("hide"), l.unsavedChanges = !0
                        })
                    }
                }
            }(), l.checkSearch = {
                processSearch: function(e, t, n) {
                    $("#search-results").load(e, t, n)
                },
                initPagination: function() {
                    $("#search-results").on("click", ".pagination a", function(e) {
                        e.preventDefault();
                        var t = $(this);
                        t.parent().hasClass("disabled") || l.checkSearch.processSearch(t.attr("href"), null)
                    })
                },
                init: function() {
                    l.initTabs(), $(".static-calendar").datepicker({
                        isStatic: !0,
                        daysOnly: !0
                    }).on("changeDate", function(e) {
                        var t = e.date.getMonth() + 1 + "/" + e.date.getDate() + "/" + e.date.getFullYear();
                        $(this).prev().val(t)
                    }), $(".check-actions form").submit(function(e) {
                        e.preventDefault();
                        var t = $(this),
                            n = t.find(".search-btn:visible");
                        n.button("loading"), $("#search-results").empty(), l.checkSearch.processSearch(t.attr("action"), t.serialize(), function() {
                            n.button("reset")
                        })
                    }), l.checkSearch.initPagination(), $("#search-results").on("click", "a.void-payment", function(e) {
                        e.preventDefault();
                        var t = $(this).attr("data-payment-id");
                        if (l.isEmbedded()) {
                            var n = $(this).attr("data-check-id"),
                                i = $(this).attr("data-order-id");
                            window.Android.voidPayment(i, n, t)
                        } else if (confirm("This will void this credit card payment and cannot be undone without re-swiping the card.")) {
                            var a = $(this).closest(".btn-group");
                            a.hide().next().show();
                            var o = $('input[name="authenticityToken"]').val();
                            $.ajax({
                                type: "POST",
                                url: $(this).attr("href"),
                                data: {
                                    id: t,
                                    authenticityToken: o
                                }
                            }).done(function(e) {
                                a.show().next().hide();
                                var t = a.closest("tr"),
                                    n = e.message,
                                    i = "success";
                                200 != e.status && (i = "error"), t.after('<tr><td style="padding-top: 0; border-top-style:none;" colspan="' + t.find(">td").length + '"><div class="alert alert-' + i + '" style="text-align:center;margin:0;">' + n + "</div></td></tr>")
                            })
                        }
                    }), l.receiptOptions.setupReceiptOptionsDialog($("#search-results,#refund-email-options"))
                }
            }, l.receiptOptions = {
                setupReceiptOptionsDialog: function(e) {
                    e.on("click", "a.receipt-text,a.receipt-email", function(e) {
                        e.preventDefault();
                        var t = $("#receipt-info"),
                            n = $(this),
                            i = n.hasClass("receipt-email");
                        t.find(".modal-header h3").text(i ? "Email Receipt" : "Text Receipt");
                        var a, o, r = t.find(".email-vis"),
                            d = t.find(".text-vis");
                        i ? (a = r, o = d) : (a = d, o = r), a.prop("disabled", !1).show(), o.prop("disabled", !0).hide(), l.checkSearch.selectedPaymentId = n.attr("data-payment-id"), t.modal().center(), a.focus(), l.modalReady()
                    });
                    var t = $("#receipt-info");
                    t.find("form").submit(function(e) {
                        e.preventDefault();
                        var n = $(this),
                            i = n.find('input[name="phone"]'),
                            a = n.find('input[name="email"]');
                        if (l.alertMgr.clear(), i.is(":visible")) {
                            var o = i.val();
                            if (o = o.replace(/\D/g, ""), 10 != o.length && (11 != o.length || "1" != o.charAt(0))) return l.alertMgr.error("Please enter a valid phone number"), !1
                        }
                        if (a.is(":visible") && !l.validateEmail(a.val())) return l.alertMgr.error("Please enter a valid email address"), !1;
                        l.modalBusy(), n.find('input[name="paymentId"]').val(l.checkSearch.selectedPaymentId), $.post(n.attr("action"), n.serialize(), function(e) {
                            l.modalReady(), 200 != e.status ? l.alertMgr.error(e.message) : (t.modal("hide"), l.alertMgr.success(e.message), $("body").scrollTop(0))
                        })
                    }), t.find(".modal-footer .btn-primary").click(function() {
                        t.find("form").submit()
                    })
                }
            }, l.cashDrawerReport = {
                load: function(e) {
                    var t = $("#cash-drawer-report");
                    t.addClass("loading"), t.empty(), t.mask("Loading..."), $.ajax({
                        type: "GET",
                        url: l.cashDrawerReport.url
                    }).done(function(n) {
                        t.unmask(), t.removeClass("loading");
                        var i = l.trimKeepalivePrefix(n);
                        $("#cash-drawer-report").html(i), e && $("#" + e).click()
                    })
                }
            }, l.archiveOrders = function() {
                function e(e) {
                    var i = n(e);
                    i === e ? t(e, i.prop("checked")) : t(e, !i.prop("checked"))
                }

                function t(e, t) {
                    var a = n(e),
                        o = a.attr("data-id");
                    t ? (a.prop("checked", !0), l.archiveOrders.selectedOrders[o] = !0) : (a.prop("checked", !1), delete l.archiveOrders.selectedOrders[o]), i()
                }

                function n(e) {
                    return e.is("td") ? e.find("input.order-checkbox") : e.is("input") ? e : null
                }

                function i() {
                    var e = Object.size(l.archiveOrders.selectedOrders),
                        t = "<p>Selected ";
                    t += e + " orders. Total $" + r(), t += "</p>", $("#selection-info").html(t), e > 0 ? $("#archive-btn").prop("disabled", !1) : $("#archive-btn").prop("disabled", !0)
                }

                function a() {
                    var e = $("#archive-orders-confirm-dialog"),
                        t = e.find("#submit-btn"),
                        n = e.find("#cancel-btn");
                    t.attr("disabled", "disabled"), n.attr("disabled", "disabled");
                    var i = s();
                    i.authenticityToken = $('input[name="authenticityToken"]').val(), $.ajax({
                        type: "POST",
                        url: l.archiveOrders.url,
                        data: i
                    }).done(function() {
                        e.modal("hide"), l.archiveOrders.table.fnDraw()
                    })
                }

                function o() {
                    var e = $("#archive-orders-confirm-dialog");
                    e.find("#cancel-btn").prop("disabled", !1), e.modal({
                        backdrop: "static",
                        keyboard: !1
                    }).center(), e.on("hidden", function() {
                        $("body").css("overflow", "auto")
                    });
                    var t = e.find(".modal-body"),
                        n = t.find("#loadingMask"),
                        i = t.find("#content");
                    n.show(), i.empty(), i.load(l.archiveOrders.confirmUrl, s(), function(t, i) {
                        if ("success" === i) {
                            n.hide();
                            var o = Math.min($(window).width() - 10, 800),
                                r = Math.min($(window).height() - 60, 300);
                            e.width(o).find(".modal-body").height(r);
                            var l = e.find("#submit-btn");
                            l.removeAttr("disabled"), l.unbind("click"), l.click(function() {
                                a()
                            })
                        } else e.modal("hide")
                    })
                }

                function r() {
                    for (var e = 0, t = d(), n = 0; n < t.length; n++) {
                        var i = t[n],
                            a = $('input.order-checkbox[data-id="' + i + '"]');
                        e += parseFloat(a.data("totalamount"))
                    }
                    return e.toFixed(2)
                }

                function d() {
                    var e = [];
                    for (var t in l.archiveOrders.selectedOrders) l.archiveOrders.selectedOrders.hasOwnProperty(t) && e.push(t);
                    return e
                }

                function s() {
                    for (var e = d(), t = {}, n = 0; n < e.length; n++) t["ids[" + n + "]"] = e[n];
                    return t
                }
                return Object.size = function(e) {
                    var t, n = 0;
                    for (t in e) e.hasOwnProperty(t) && n++;
                    return n
                }, {
                    selectedOrders: {},
                    init: function(n, i, a) {
                        l.archiveOrders.url = i, l.archiveOrders.confirmUrl = a, l.archiveOrders.selectedOrders = {}, l.archiveOrders.table = n;
                        var r = $("#archive-orders-table");
                        n.fnSettings().aoDrawCallback.push({
                            fn: function() {
                                l.archiveOrders.updateSelections()
                            },
                            sName: "user"
                        }), r.on("click", "td.order-checkbox", function(t) {
                            e($(t.target))
                        });
                        var d = r.find("th.order-checkbox");
                        d.html('<a href="#">Select All</a>'), d.find("a").click(function(e) {
                            return r.find("td.order-checkbox").each(function() {
                                t($(this), !0)
                            }), e.preventDefault(), !1
                        }), $("#archive-btn").click(function() {
                            o()
                        })
                    },
                    renderCheckbox: function(e) {
                        return '<input class="order-checkbox" type="checkbox" data-id="' + e.aData[0] + '" data-totalamount="' + e.aData[18] + '" >'
                    },
                    updateSelections: function() {
                        var e = $("#archive-orders-table"),
                            t = {};
                        e.find("input.order-checkbox").each(function() {
                            var e = $(this).attr("data-id");
                            t[e] = !0, l.archiveOrders.selectedOrders.hasOwnProperty(e) && $(this).prop("checked", !0)
                        });
                        for (var n = d(), a = 0; a < n.length; a++) t.hasOwnProperty(n[a]) || delete l.archiveOrders.selectedOrders[n[a]];
                        i()
                    }
                }
            }(), l.levelupConfig = function() {
                return {
                    init: function() {
                        l.addTouchSectionEnabler("levelupConfig_enabled", "levelup-config-section", !1, !1), $("#open-levelup-auth-dialog").click(function() {
                            var e = $("#levelup-auth-dialog"),
                                t = e.find("#levelup-auth-dialog-submit");
                            t.unbind("click"), t.click(function() {
                                var t = $("#levelup-auth-url").val(),
                                    n = $("#levelupusername").val(),
                                    i = $("#leveluppassword").val(),
                                    a = $('input[name="authenticityToken"]').val();
                                $.ajax({
                                    type: "POST",
                                    url: t,
                                    data: {
                                        levelupusername: n,
                                        leveluppassword: i,
                                        authenticityToken: a
                                    },
                                    global: !1
                                }).done(function(t) {
                                    e.modal("hide"), $("#levelup-config-container").html(t)
                                }).error(function(t) {
                                    e.find("#error-message").text(t.responseText), e.find("#error-message").show()
                                })
                            }), e.modal(), e.find("#error-message").hide(), e.on("hidden", function() {
                                $("body").css("overflow", "auto")
                            })
                        })
                    }
                }
            }(), l.grubhub = function() {
                return {
                    init: function() {
                        $("#save-btn").on("click", function() {
                            document.getElementById("grubhub-submit-btn").click()
                        })
                    }
                }
            }, l.toastPromotions = function() {
                return {
                    bootstrapConfigSaveButton: function() {
                        var e = $("#save-btn");
                        e.on("click", function() {
                            document.getElementById("toast-promotions-submit").click()
                        }), e.removeAttr("href")
                    }
                }
            }, l.toastCompCard = function() {
                return {
                    bootstrapConfigSaveButton: function() {
                        var e = $("#save-btn");
                        e.on("click", function() {
                            document.getElementById("toast-comp-card-submit").click()
                        }), e.removeAttr("href")
                    }
                }
            }, l.refundReasons = function() {
                return {
                    bootstrapConfigSaveButton: function() {
                        var e = $("#save-btn");
                        e.on("click", function() {
                            document.getElementById("refunds-reasons-submit-button").click()
                        }), e.removeAttr("href")
                    }
                }
            }, l.paymentsMgr = function() {
                function e(e) {
                    return parseFloat(e.replace(/\$|,/g, ""))
                }

                function t(e) {
                    return e.find('input[type="submit"]:visible')
                }

                function n(e) {
                    var t = e.val(),
                        n = e.parent().next(),
                        i = e.closest(".control-group");
                    return e.data("origHelp") || e.data("origHelp", n.html()), /[^\d.]/.test(t) ? (n.text("Invalid amount"), i.addClass("error"), !1) : (n.html(e.data("origHelp")), i.removeClass("error"), !0)
                }

                function i(e) {
                    return n(e) && e.val()
                }

                function a(e, n) {
                    e.keydown(function(e) {
                        if (13 == e.keyCode && 0 == n()) return e.preventDefault(), !1
                    }), e.submit(function(i) {
                        if (i.preventDefault(), 0 != n()) {
                            $("#error-msg").hide();
                            var a = t(e);
                            a.button("loading"), $.post(e.attr("action"), e.serialize(), function(e) {
                                if (200 == e.status) {
                                    var t = e.data.redirect;
                                    window.location.href = t
                                } else $("#error-msg").html(e.message).show(), a.button("reset")
                            }, "JSON")
                        }
                    })
                }

                function o() {
                    function e() {
                        return s && c
                    }

                    function o() {
                        if (!e()) return !0;
                        var t = u.find("[name=refundReasonGuid]"),
                            n = t.closest(".control-group"),
                            i = $("#refund-reason-help");
                        return t.val() ? (n.removeClass("error"), i.hide(), !0) : (n.addClass("error"), i.show(), !1)
                    }

                    function r() {
                        return !!i(p) && !!n(f)
                    }

                    function d() {
                        return !!r() && !!o()
                    }
                    var s = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        c = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        u = $(".admin-content form"),
                        p = $("#amount"),
                        f = $("#tipAmount"),
                        h = p.add(f),
                        m = parseFloat(p.data("totalAmount")),
                        g = $("#calculated-total");
                    s && l.enableSelectPickerTemplate(u, function() {
                        return o()
                    }), a(u, d), h.keyup(function() {
                        var e = r(),
                            n = 0;
                        if (!e) return g.text(""), n = void 0, !1;
                        h.each(function() {
                            var e = $(this).val();
                            n += e ? parseFloat(e) : 0
                        }), $("#more-than-total-error-msg").hide(), void 0 !== n && (g.text("$" + n.toFixed(2)), n > m ? ($("#more-than-total-error-msg").show(), t(u).prop("disabled", !0)) : t(u).prop("disabled", !1))
                    })
                }

                function r() {
                    function n() {
                        return $("#adjust-down-error-msg").hide(), !!i(r) && (!(parseFloat(r.val()) < e(d.text())) || ($("#adjust-down-error-msg").show(), !1))
                    }
                    var o = $(".admin-content form"),
                        r = $("#adjustedTipAmount"),
                        l = $("#payment-details-subtotal-paid"),
                        d = $("#payment-details-tip-paid"),
                        s = $("#calculated-total"),
                        c = $("#calculated-charge");
                    a(o, n), r.keyup(function() {
                        if (n()) {
                            var i = e(r.val()) + e(l.text()),
                                a = e(r.val()) - e(d.text());
                            s.text("$" + i.toFixed(2)), c.text("$" + a.toFixed(2)), t(o).prop("disabled", !1)
                        } else s.text(""), c.text(""), t(o).prop("disabled", !0)
                    })
                }

                function d() {
                    function n() {
                        return !!i(l)
                    }

                    function o() {
                        if (n()) {
                            var i = e(d.text()) + e(l.val());
                            s.text("$" + i.toFixed(2)), t(r).prop("disabled", !1)
                        } else s.text(""), t(r).prop("disabled", !0)
                    }
                    var r = $(".admin-content form"),
                        l = $("#tip-amount-input"),
                        d = $("#subtotal-paid"),
                        s = $("#calculated-charge");
                    a(r, n), o(), l.keyup(function() {
                        o()
                    })
                }
                return {
                    initRefund: function(e, t) {
                        o(e, t)
                    },
                    initRefundReceipt: function() {
                        l.receiptOptions.setupReceiptOptionsDialog($("#refund-email-options"))
                    },
                    initTipAdjustment: function() {
                        r()
                    },
                    initVoidReversal: function() {
                        d()
                    }
                }
            }(), l.orderDetail = function() {
                var e = function() {
                        var e = $("#orders-report");
                        e.isDataTable() && e.dataTable().fnStandingRedraw()
                    },
                    t = function(e) {
                        var t = e.find("#order-summary-header").prev();
                        return t.is(".notifications") || (t = $('<div class="notifications"></div>').insertBefore(e.find("#order-summary-header"))), t
                    },
                    n = function(n, i) {
                        var a = n.find("#num-guests"),
                            o = a.val(),
                            r = a.data("url");
                        n.find("#pencil-guests").replaceWith('<img id="spinner-guests" class="spinner" src="' + i + '/images/ajax-loader-small.gif" />'), a.prop("disabled", !0), a.toggleClass("no-edit"), $.getJSON(r, {
                            guests: o
                        }, function(i) {
                            n.find("#spinner-guests").replaceWith('<i id="pencil-guests" class="icon-pencil edit"></i>');
                            var a = t(n);
                            a.empty(), 200 == i.status ? (l.alertMgr.success("Guest number updated successfully", a), e()) : l.alertMgr.error(i.message, a)
                        }), a.prop("disabled", !0)
                    },
                    i = function(n, i) {
                        var a = n.find("#revenue-center-name"),
                            o = n.find("#revenue-center-select"),
                            r = o.find(":selected").val(),
                            d = o.find(":selected").text(),
                            s = o.data("url");
                        n.find("#pencil-center").replaceWith('<img id="spinner-center" class="spinner" src="' + i + '/images/ajax-loader-small.gif" />'), a.text(d), $.getJSON(s, {
                            revenueCenterId: r
                        }, function(i) {
                            n.find("#spinner-center").replaceWith('<i id="pencil-center" class="icon-pencil edit"></i>');
                            var a = t(n);
                            a.empty(), 200 == i.status ? (l.alertMgr.success("Revenue center updated successfully", a), e()) : l.alertMgr.error(i.message, a)
                        })
                    };
                return {
                    init: function(e, t, a, o, r) {
                        e.find("#order-details-item-card").addClass("clickable"), e.find("#order-details-payment-card").addClass("clickable"), e.find("#button-edit-guests").click(function() {
                            var t = e.find("#num-guests");
                            $(this).toggleClass("no-edit"), $(this).children().toggleClass("icon-ok"), $(this).children().toggleClass("icon-pencil"), t.prop("disabled") ? (t.prop("disabled", !1), t.toggleClass("no-edit"), t.select()) : n(e, r), $(this).blur()
                        }), e.find("#button-edit-center").click(function() {
                            var t = e.find("#revenue-center-name"),
                                n = e.find("#revenue-center-select");
                            e.find("#revenue-center-controls").toggleClass("input-append"), $(this).toggleClass("no-edit"), $(this).children().toggleClass("icon-ok"), $(this).children().toggleClass("icon-pencil"), t.hasClass("hidden") && i(e, r), t.toggleClass("hidden"), n.toggleClass("hidden"), $(this).blur()
                        }), e.find("#num-guests").keyup(function() {
                            0 == $(this).val().length ? (e.find("#button-edit-guests").prop("disabled", !0), e.find("#button-edit-guests").children().removeClass("edit")) : (e.find("#button-edit-guests").prop("disabled", !1), e.find("#button-edit-guests").children().addClass("edit"))
                        }), e.find("a.reopen-check").click(function(t) {
                            t.preventDefault();
                            var n = $(this),
                                i = n.next();
                            if (confirm("This will re-open this check and send it to all POS devices.  Continue?")) {
                                n.hide(), i.show();
                                var a = $("#reopenCheckForm");
                                $.post(a.attr("action"), a.serialize(), function(t) {
                                    i.hide();
                                    var a = e.find("#order-summary-header"),
                                        o = a.prev();
                                    o.is(".notifications") || (o = $('<div class="notifications"></div>').insertBefore(a)), 200 == t.status ? (n.prev().text("(Paid)"), l.alertMgr.success("Check re-opened", o)) : (n.show(), l.alertMgr.error(jsonResponse.message, o))
                                }, "json")
                            }
                        }), e.find("a.send-to-devices").click(function(t) {
                            t.preventDefault();
                            var n = $(this),
                                i = n.next();
                            confirm("This will send this order to all POS devices.  Continue?") && (n.hide(), i.show(), $.getJSON(n.attr("href"), function(t) {
                                i.hide();
                                var a = e.find("#order-summary-header"),
                                    o = a.prev();
                                o.is(".notifications") || (o = $('<div class="notifications"></div>').insertBefore(a)), 200 == t.status ? l.alertMgr.success("Order Sent To Devices", o) : (n.show(), l.alertMgr.error(t.message, o))
                            }))
                        }), e.find("a.send-stp-email").click(function(t) {
                            t.preventDefault();
                            var n = $(this),
                                i = n.next(),
                                a = $('input[name="authenticityToken"]').val(),
                                o = n.attr("data-order-id");
                            confirm("This will send an email to the customer reminding them to pay for their OPT Tab. Continue?") && (i.show(), $.ajax({
                                type: "POST",
                                url: n.attr("href"),
                                data: {
                                    id: o,
                                    authenticityToken: a
                                }
                            }).done(function(t) {
                                i.hide();
                                var a = e.find("#order-summary-header"),
                                    o = a.prev();
                                o.is(".notifications") || (o = $('<div class="notifications"></div>').insertBefore(a)), 200 === t.status ? (n.hide(), l.alertMgr.success(t.message, o)) : l.alertMgr.error(t.message, o)
                            }))
                        }), e.find("a.toast-card, .order-details-table tr.clickable").click(function(e) {
                            e.preventDefault(), l.reporting.orderDetails.loadDialogPage(t + $(this).attr("data-toast-card-id"), "Card Details")
                        }), e.find("a.applied-loyalty").click(function(e) {
                            e.preventDefault(), l.reporting.orderDetails.loadDialogPage(a + $(this).attr("data-loyalty-check-id"), "Loyalty Details")
                        }), e.find("a.view-customer-info").click(function(e) {
                            e.preventDefault(), l.reporting.orderDetails.loadDialogPage(o + $(this).attr("data-customer-id"), {
                                title: "Customer Details",
                                async: !0
                            })
                        }), e.find(".order-details-table tr.clickable").hover(function() {
                            $(this).addClass("info")
                        }, function() {
                            $(this).removeClass("info")
                        }), e.find("#revenue-center").bootstrapifySelect(), $('[data-toggle="tooltip"]').tooltip()
                    }
                }
            }(), l.toastNowProductModule = function() {
                return {
                    init: function(e) {
                        $("#feature_TOAST_NOW_ORDERS").click(function(e) {
                            $(this).is(":checked") && (confirm("Enabling Toast Now Orders will disable allowing cash and in store credit card payments for takeout and delivery. Are you sure you want to proceed?") || (e.stopImmediatePropagation(), $(this).prop("checked", !1), l.updateSelectionListState($(this).closest("ul.selection-list"))))
                        })
                    }
                }
            }(), l.restaurantSignup = function() {
                return {
                    init: function() {
                        l.editorCommon.init(), $(".search-query").typeahead({
                            minLength: 1,
                            items: 100,
                            source: function(e, t) {
                                e.length >= 1 ? ($("#mgmt-group-search .spinner").show(), $.getJSON(l.restaurantSignup.baseUrl + "/managementGroupSearch?query=" + l.escapeHtml(e), function(e) {
                                    var n = [];
                                    $.map(e, function(e) {
                                        var t = {
                                            uuid: e.uuid,
                                            name: e.name,
                                            toString: function() {
                                                return JSON.stringify(this)
                                            },
                                            toLowerCase: function() {
                                                return this.name.toLowerCase()
                                            },
                                            indexOf: function() {
                                                return String.prototype.indexOf.apply(this.name, arguments)
                                            },
                                            replace: function() {},
                                            substr: function() {
                                                return String.prototype.substr.apply(this.name, arguments)
                                            }
                                        };
                                        n.push(t)
                                    }), $("#mgmt-group-search .spinner").hide(), t(n)
                                })) : $("#mgmt-group-search .spinner").hide()
                            },
                            updater: function(e) {
                                var t = JSON.parse(e);
                                $("#selected-mgmt-group").html(t.name), $("#selected-mgmt-group-input").val(t.uuid)
                            },
                            highlighter: function(e) {
                                var t = '<div class="typeahead" style="width: 100%;">';
                                return t += "<div>" + e.name + "</div></div>"
                            }
                        })
                    },
                    baseUrl: "/restaurants/account"
                }
            }(), l.orderDetailSummary = function() {
                return {
                    init: function(e, t, n, i) {
                        e.find("a.toast-card").click(function(e) {
                            e.preventDefault(), l.reporting.orderDetails.showDialog(t + $(this).attr("data-toast-card-id"), "Card Details")
                        }), e.find("a.applied-loyalty").click(function(e) {
                            e.preventDefault(), l.reporting.orderDetails.showDialog(n + $(this).attr("data-loyalty-check-id"), "Loyalty Details")
                        }), e.find("a.view-customer-info").click(function(e) {
                            e.preventDefault(), l.reporting.orderDetails.showDialog(i + $(this).attr("data-customer-id"), {
                                title: "Customer Details",
                                async: !0
                            })
                        }), $('[data-toggle="tooltip"]').tooltip(), $("#order-details-section").find(".pagination a").click(function(e) {
                            e.preventDefault();
                            var t = $(this),
                                n = t.attr("href");
                            "#" !== n && l.reporting.loadHtmlAsyncReport(n, "order-details-section")
                        })
                    }
                }
            }(), l.giftCardDetail = function() {
                var e = function(e) {
                        console.log("reloading table: " + e), e.isDataTable() && e.dataTable().fnStandingRedraw()
                    },
                    t = function() {
                        e($("#rewards-cards-table")), e($("#inactive-cards-table")), e($("#gift-cards-table"))
                    },
                    n = function(e) {
                        e.find(".alert").each(function() {
                            $(this).text().length > 1 ? $(this).show() : $(this).hide()
                        })
                    },
                    i = function(e) {
                        e.find("#card").toggle(), e.find("#card-edit").toggle(), e.find("#card-submit").prop("disabled", !1)
                    },
                    a = function(e) {
                        e.find("#info").toggle(), e.find("#info-edit").toggle(), e.find("#info-submit").prop("disabled", !1)
                    },
                    o = function(e) {
                        e.find("#message").toggle(), e.find("#message-edit").toggle(), e.find("#message-submit").prop("disabled", !1)
                    },
                    r = function(e, n) {
                        var i = n.prop("action"),
                            a = n.serialize();
                        $.post(i, a, function(n) {
                            e.html(n), e.animate({
                                scrollTop: 0
                            }, 100, "linear"), t()
                        }, "html")
                    },
                    d = function(e) {
                        var t, n, i = e.find(".tab-pane.active"),
                            a = i.find(".td-adjust-input"),
                            o = a.closest(".tr-adjust"),
                            r = o.data("current-balance");
                        a.hasClass("decimal") ? (t = "" === a.val() || isNaN(a.val()) ? 0 : parseFloat(a.val()), n = parseFloat(r + t).toFixed(2)) : (t = "" === a.val() || isNaN(a.val()) ? 0 : parseInt(a.val()), n = r + t), o.find(".td-adjust-text").text(n)
                    },
                    s = function(e) {
                        $("#adjust-cancel").hide();
                        var t = e.find(".tab-pane.active");
                        e.find("#adjust-button").show(), t.find(".tr-adjust").hide(), t.find("tr.placeholder").show(), e.find("#adjust-submit").hide()
                    },
                    c = function(e) {
                        var t = e.find(".tab-pane.active").prop("id"),
                            n = $("#adjust-div").data("perms");
                        "value" === t && "rewards" == n || "loyalty" === t && "gc" == n || "linked-cards" === t ? $("#adjust-div").hide() : $("#adjust-div").show()
                    },
                    u = function(e) {
                        var i = e.find("#rewards-email-input"),
                            a = e.find("#rewards-email-submit"),
                            o = e.find("[name=authenticityToken]").val(),
                            r = i.val(),
                            l = e.find(".rewards-email-send").prop("checked"),
                            d = i.data("url");
                        a.find(".icon-ok").hide(), a.find("img").show(), a.prop("disabled", !0), $.post(d, {
                            email: r,
                            send: l,
                            authenticityToken: o
                        }, function(o) {
                            e.find(".alert").empty(), 200 == o.status ? (console.log(e, o.message), e.find(".alert-success").text(o.message), t(), e.find("#rewards-email-text").text(r), e.find("#rewards-email-edit").hide(), e.find("#rewards-email").show()) : (e.find(".alert-error").text(o.message), i.select()), a.prop("disabled", !1), n(e), e.animate({
                                scrollTop: 0
                            }, 100, "linear"), a.find(".icon-ok").show(), a.find("img").hide()
                        })
                    },
                    p = function(e) {
                        var i = e.find("#rewards-phone-input"),
                            a = e.find("#rewards-phone-submit"),
                            o = e.find("[name=authenticityToken]").val(),
                            r = i.val(),
                            l = e.find(".rewards-phone-send").prop("checked"),
                            d = i.data("url");
                        a.find(".icon-ok").hide(), a.find("img").show(), a.prop("disabled", !0), $.post(d, {
                            phone: r,
                            send: l,
                            authenticityToken: o
                        }, function(o) {
                            e.find(".alert").empty(), 200 == o.status ? (console.log(e, o.message), e.find(".alert-success").text(o.message), t(), e.find("#rewards-phone-text").text(r), e.find("#rewards-phone-edit").hide(), e.find("#rewards-phone").show()) : (e.find(".alert-error").text(o.message), i.select()), a.prop("disabled", !1), a.find(".icon-ok").show(), a.find("img").hide(), n(e), e.animate({
                                scrollTop: 0
                            }, 100, "linear")
                        })
                    },
                    f = function(e) {
                        e.find("input").css("border-radius", "4px 0 0 4px"), e.find(".add-on").show()
                    },
                    h = function(e) {
                        e.find("input").css("border-radius", "4px"), e.find(".add-on").hide()
                    },
                    m = function(e) {
                        e.find(".input-append").each(function() {
                            h($(this))
                        })
                    };
                return {
                    init: function(e, t, g) {
                        e.find("#gift-card-tabs a").off("click").click(function(t) {
                            t.preventDefault(), $(this).tab("show"), s(e), c(e)
                        }), e.find("#value tbody tr.clickable").hover(function() {
                            $(this).addClass("info")
                        }, function() {
                            $(this).removeClass("info")
                        }).click(function() {
                            l.reporting.orderDetails.loadDialogPage(t + $(this).attr("data-txn-id"), "Order Details")
                        }), e.find("#loyalty tbody tr.clickable").hover(function() {
                            $(this).addClass("info")
                        }, function() {
                            $(this).removeClass("info")
                        }).click(function() {
                            l.reporting.orderDetails.loadDialogPage(g + $(this).attr("data-txn-id"), "Order Details")
                        }), e.find(".link-edit-card").click(function(t) {
                            t.preventDefault(), i(e), $(this).hide()
                        }), e.find("#card-cancel").click(function() {
                            i(e), e.find(".link-edit-card").show()
                        }), e.find(".link-edit-info").click(function(t) {
                            t.preventDefault(), a(e), $(this).hide()
                        }), e.find(".message-edit-link").click(function(t) {
                            t.preventDefault(), o(e), $(this).hide()
                        }), e.find("#info-cancel").click(function() {
                            a(e), e.find(".link-edit-info").show()
                        }), e.find("#message-cancel").click(function() {
                            o(e), e.find("a.message-edit-link").show()
                        }), e.find("#card-submit").click(function(t) {
                            t.preventDefault(), $(this).prop("disabled", !0), $(this).next().show(), r(e, e.find("#card-form"))
                        }), e.find("#info-submit").click(function(t) {
                            t.preventDefault(), $(this).prop("disabled", !0), $(this).next().show(), r(e, e.find("#customer-info-form"))
                        }), e.find("#message-submit").click(function(t) {
                            t.preventDefault(), $(this).prop("disabled", !0), $(this).next().show(), r(e, e.find("#message-form"))
                        }), e.find("#adjust-submit").click(function() {
                            $(this).prop("disabled", !0), r(e, e.find(".tab-pane.active").find("form.adjust"))
                        }), e.find(".td-adjust-input").change(function() {
                            d(e)
                        }).blur(function() {
                            d(e)
                        }).keyup(function() {
                            d(e)
                        }), e.find("#adjust-button").click(function() {
                            $(this).hide();
                            var t = e.find(".tab-pane.active");
                            e.find("#adjust-cancel").show(), t.find(".tr-adjust").show(), t.find("tr.placeholder").hide(), e.find("#adjust-submit").show(), t.find(".td-adjust-input").val(0).select(), d(e)
                        }), e.find("#adjust-cancel").click(function() {
                            s(e)
                        }), e.find("form.adjust").submit(function(e) {
                            e.preventDefault()
                        }), e.find("#link-edit-email").click(function(t) {
                            t.preventDefault(), e.find("#rewards-email").hide(), e.find("#rewards-email-edit").show(), e.find("#rewards-email-input").select()
                        }), e.find("#rewards-email-cancel").click(function() {
                            e.find("#rewards-email").show(), e.find("#rewards-email-edit").hide()
                        }), e.find("#rewards-email-submit").click(function() {
                            u(e)
                        }), e.find("#link-edit-phone").click(function(t) {
                            t.preventDefault(), e.find("#rewards-phone").hide(), e.find("#rewards-phone-edit").show(), e.find("#rewards-phone-input").select()
                        }), e.find("#rewards-phone-cancel").click(function() {
                            e.find("#rewards-phone").show(), e.find("#rewards-phone-edit").hide()
                        }), e.find("#rewards-phone-submit").click(function() {
                            p(e)
                        }), e.find(".close").click(function(e) {
                            e.preventDefault(), $(this).parent().hide()
                        }), e.find("#message-edit .input-append").hover(function() {
                            f($(this))
                        }).mouseout(function() {
                            h($(this))
                        }), e.find(".verify-card,.decline-card").click(function(t) {
                            t.preventDefault(), $("#linked-cards").mask(), r(e, $(this).closest("li").find("form"))
                        }), m(e), n(e), c(e), l.enableEntityTableInput(e.find(".td-adjust-input").closest("tr"))
                    }
                }
            }(),
            function(e) {
                e.fn.bootstrapifySelect = function(t, n, i) {
                    l.bootstrapifySelectCount || (l.bootstrapifySelectCount = 0);
                    var a = function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                            n = "btn ";
                        return n = n.concat(e), n = t ? n.concat(" disabled") : n
                    };
                    return this.each(function(o, r) {
                        var d = e(r);
                        if ("no" !== d.data("convert") && "true" != d.attr("bootstrapified")) {
                            d.attr("bootstrapified", "true"), d.hide().wrap('<div class="btn-group select" id="select-group-' + l.bootstrapifySelectCount + '" />');
                            var s = e("#select-group-" + l.bootstrapifySelectCount),
                                c = d.val() ? d.val() : "&nbsp;",
                                u = (t ? "min-width:" + t + ";" : "") + (n ? "max-width:" + n + ";" : ""),
                                p = u ? 'style="' + u + '"' : "",
                                f = t ? "fixed-width" : "";
                            s.append('<a class=" ' + a(f, i) + '" data-toggle="dropdown" href="javascript:;" ' + p + '><span class="option">' + c + '</span> <span class="caret"></span></a><ul class="dropdown-menu"></ul>'), d.find("option").each(function(t, n) {
                                var i = e('<li><a href="javascript:;" data-value="' + e(n).attr("value") + '"></a></li>');
                                s.find(".dropdown-menu").append(i), e(i).find("a").text(e(n).text()), e(n).attr("selected") && (s.find(".dropdown-menu li:eq(" + t + ")").click(), s.find(".btn:eq(0) .option").text(e(n).text()))
                            }), s.find(".dropdown-menu a").click(function() {
                                d.data("bsChanging", !0), d.val(e(this).attr("data-value")).change(), d.data("bsChanging", !1), s.find(".btn:eq(0) .option").text(e(this).text())
                            }), d.change(function() {
                                if (!d.data("bsChanging")) {
                                    var e = d.find(":selected");
                                    s.find(".btn:eq(0) .option").text(e.text())
                                }
                            }), i && d.attr("disabled", "disabled"), l.bootstrapifySelectCount++
                        }
                    })
                }, e.fn.bootstrapifyDataTable = function() {
                    return this.each(function(t, n) {
                        var i = e(n),
                            a = i.parent(),
                            o = a.find(".dataTables_length select"),
                            r = a.find(".dataTables_filter input"),
                            l = r.parent();
                        i.data("bootstrapified") || (i.data("bootstrapified", !0), o.bootstrapifySelect(), r.addClass("search-query"), r.attr("placeholder", l.text()), l.contents().filter(function() {
                            return 3 == this.nodeType
                        }).remove(), l.append(e('<i class="icon-search opacity50"></i>')))
                    })
                }, e.fn.btnGroupDropdown = function(t) {
                    return this.each(function() {
                        e(this).find("li a").click(function(n) {
                            n.preventDefault();
                            var i = e(this),
                                a = i.closest(".btn-group"),
                                o = i.data("value");
                            a.find(".dropdown-label").html(i.html()), o ? a.data("value", o) : a.removeData("value"), "function" == typeof t && t.call(this, i.data("value"))
                        })
                    })
                }, e.fn.toastSelectPicker = function() {
                    return this.each(function() {
                        var t = e(this);
                        if (t.selectpicker(), t.hasClass("firstSelectsAll")) {
                            if (!t.prop("multiple")) throw new Error("Attempted to use firstSelectsAll without multiple select");
                            var n = function() {
                                var e = t.find("option").first();
                                e.prop("selected") && t.next().find("button .filter-option").text(e.text())
                            };
                            t.priorStateFirstOptionSelected = t.find("option").first().prop("selected"), t.change(function() {
                                var e = t.find("option").first(),
                                    i = t.find("option:selected").length,
                                    a = t.find("option").length;
                                e.prop("selected") && !t.priorStateFirstOptionSelected ? t.selectpicker("selectAll") : !e.prop("selected") && t.priorStateFirstOptionSelected && t.selectpicker("deselectAll"), e.prop("selected") === t.priorStateFirstOptionSelected && (e.prop("selected") && i < a ? e.prop("selected", !1) : e.prop("selected") || i !== a - 1 || e.prop("selected", !0)), t.priorStateFirstOptionSelected = e.prop("selected"), t.selectpicker("refresh"), n()
                            }), n()
                        }
                    })
                }
            }(jQuery),
            function(e) {
                e.fn.getCursorPosition = function() {
                    var e = this.get(0);
                    if (e) {
                        if ("selectionStart" in e) return e.selectionStart;
                        if (document.selection) {
                            e.focus();
                            var t = document.selection.createRange(),
                                n = document.selection.createRange().text.length;
                            return t.moveStart("character", -e.value.length), t.text.length - n
                        }
                    }
                }, e.fn.center = function() {
                    return this.each(function() {
                        var t = e(this);
                        t.css("position", "absolute"), t.css({
                            margin: "0"
                        }), t.css("top", Math.max(0, (e(window).height() - t.outerHeight()) / 2 + e(window).scrollTop()) + "px"), t.css("left", Math.max(0, (e(window).width() - t.outerWidth()) / 2 + e(window).scrollLeft()) + "px")
                    })
                }
            }(jQuery), $(function() {
                l.isTouch() || $("ul.selection-list li label").hover(function() {
                    $(this).addClass("hover")
                }, function() {
                    $(this).removeClass("hover")
                })
            }), $(document).on("click", ".auto-select", function() {
                if (window.getSelection && document.createRange) {
                    var e = window.getSelection(),
                        t = document.createRange();
                    t.selectNodeContents(this), e.removeAllRanges(), e.addRange(t)
                }
            }), l.decodeHTML = function(e) {
                var t = document.createElement("textarea");
                return t.innerHTML = e, t.value
            }
    }], [7])
});
//# sourceMappingURL=app-9ed8d4486121c7396d97.js.map