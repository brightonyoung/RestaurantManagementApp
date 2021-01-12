! function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.adminFrame = e() : t.adminFrame = e()
}(this, function() {
    return webpackJsonpadminFrame([0], [function(t, e) {}, function(t, e) {}, function(t, e) {}, function(t, e) {}, function(t, e) {}, , function(t, e, n) {
        "use strict";
        if (n(1), n(2), n(3), n(0), n(4), void 0 === i) var i = window.ToastFrame = {
            accessibleRestaurants: [],
            escapeHtml: function(t) {
                return t ? jQuery("<div />").text(t).html() : ""
            },
            registerOnLogoutClearYourUpdatesState: function() {
                localStorage && $("body").on("click", "a[href='/logout']", function() {
                    localStorage.removeItem("YourUpdates::isCollapse")
                })
            },
            initAnalytics: function() {
                $(".admin-content").on("change", "[data-analytics-section] [data-analytics-field]", function() {
                    var t = $(this),
                        e = t.val(),
                        n = t.closest("[data-analytics-section]"),
                        i = null;
                    jQuery.isNumeric(e) ? i = parseFloat(e) : "boolean" == typeof e ? i = e ? 1 : 0 : "true" === e ? i = 1 : "false" === e && (i = 0), trackFieldChange(n.data("analyticsSection"), t.data("analyticsField"), i)
                })
            },
            initAdminLayout: function(t) {
                function e() {
                    var t = $(window).width(),
                        e = $("#content_spacer");
                    if (t > 979) {
                        var n = $(".navbar").height();
                        0 == e.length && ($(".content").prepend('<div id="content_spacer"></div>'), e = $("#content_spacer")), e.css("height", n), $(".content").css("padding-top", 0)
                    } else e.length > 0 && e.remove(), $(".content").css("padding-top", "")
                }
                $(window).resize(function() {
                    e()
                }), $(function() {
                    function n(t) {
                        var e = t.find(".dropdown-submenu");
                        $(t).scroll(function() {
                            $("#submenuClone").remove()
                        });
                        var n = function() {
                                if (0 == $("#submenuClone").size()) {
                                    var e = $(this).find(".dropdown-menu"),
                                        n = e.clone().attr("id", "submenuClone");
                                    e.hide();
                                    var i = function() {
                                            var t, e, n;
                                            return void 0 === n && (t = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), e = t.children(), n = e.innerWidth() - e.height(99).innerWidth(), t.remove()), n
                                        },
                                        a = $(this).parent().parent().width() - 2 * $(this).parent().width(),
                                        o = $(this).position().top + $(this).parent().parent().height(),
                                        s = $(this).width();
                                    $(this).parent().parent().offset().left + a < 0 ? a = $(this).parent().parent().width() - i() : "auto" == $(this).parent().css("overflow") && (a += i()), n.appendTo(t.parent()), n.css({
                                        top: o,
                                        left: a,
                                        width: s
                                    }).show();
                                    var r = n.height() + n.offset().top - $(window).height() - $(window).scrollTop();
                                    r > 0 && (n.height(n.height() - r - 20), n.css("overflow", "auto"))
                                }
                            },
                            i = function(t) {
                                var e = t.toElement || t.relatedTarget;
                                "submenuClone" != $(e).closest(".dropdown-menu").attr("id") && $("#submenuClone").remove()
                            };
                        $("body").on("mouseleave", "#submenuClone", function(t) {
                            var e = t.toElement || t.relatedTarget;
                            "submenuClone" != $(e).closest(".dropdown-menu").attr("id") && $(this).remove()
                        }), $("body").on("mouseleave", ".dropdown-submenu", function(t) {
                            var e = t.toElement || t.relatedTarget;
                            "submenuClone" == $(e).closest(".dropdown-menu").attr("id") && $(this).trigger("mouseover")
                        }), e.hover(n, i)
                    }

                    function a(t) {
                        if (!($(window).width() <= 979)) {
                            var e = t.parent(),
                                i = e.closest(".nav"),
                                a = e.find(" > .dropdown-menu"),
                                o = $(window).height(),
                                s = i.position().top + i.height() + 20;
                            a.css("overflow", ""), a.css("height", ""), a.height() + s > o && (a.height(o - s), a.css("overflow", "auto"), n(a))
                        }
                    }

                    function o() {
                        return 0 == $("#restaurant-switch-menu").data("loaded") ? ($("#restaurant-switch-menu-loading-title a").text("Loading..."), $.ajax("/restaurantaccess/populateAccessibleRestaurants", {
                            method: "GET",
                            global: !1,
                            dataType: "json",
                            success: function(t) {
                                if (i.accessibleRestaurants = [], t.length > 0) {
                                    $("#restaurant-switch-menu-loading-title").remove();
                                    for (var e = 0; e < t.length; e++) {
                                        var n = t[e],
                                            a = '<li class="search-option"><a href="/account/switchrestaurant?guid=' + i.escapeHtml(n.guid) + '">' + i.escapeHtml(n.name) + "</a></li>";
                                        n.html = a, i.accessibleRestaurants.push(n)
                                    }
                                    $("#restaurant-switch-menu").data("loaded", !0).css("width", "auto"), s(i.accessibleRestaurants, !1)
                                } else $("#restaurant-switch-menu-loading-title a").text("Error. Please try again.")
                            },
                            error: function() {
                                $("#restaurant-switch-menu-loading-title a").text("Error. Please try again.")
                            }
                        })) : $.Deferred().resolve().promise()
                    }

                    function s(t, e) {
                        var n = $("#restaurant-switch-menu");
                        if ($("#restaurant-switch-menu li:not(#restaurant-switch-menu-search, .divider)").remove(), t.length > 800 && !e) n.append('<li id="show-all-restaurants" class="search-option"><a href="">View ' + t.length + " restaurants</a></li>"), $("#show-all-restaurants").click(function(t) {
                            t.stopImmediatePropagation(), t.preventDefault(), s(i.accessibleRestaurants, !0)
                        });
                        else {
                            var o = "";
                            for (var r in t) o += t[r].html;
                            n.append(o)
                        }
                        a($("#switch-toggle"))
                    }

                    function r(t, e) {
                        t = t.toUpperCase();
                        var n = $.isNumeric(t),
                            o = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi,
                            r = o.test(t);
                        if (0 == t.length) s(i.accessibleRestaurants, !1);
                        else {
                            var c = [],
                                u = i.accessibleRestaurants.filter(function(e) {
                                    var i = "";
                                    if (i = n ? e.id : r ? e.guid.toUpperCase() : e.name.toUpperCase(), n && i.toString() === t && c.push(e), i.toString().indexOf(t) !== -1) return e
                                });
                            c.length > 0 ? s(c, !0) : s(u, 13 == e), a($("#switch-toggle"))
                        }
                    }
                    if (e(), $('.navbar ul.nav li.dropdown a[href=""]:not(.dropdown-toggle)').click(function(t) {
                            t.preventDefault(), t.stopPropagation(), $(this).blur()
                        }), $(".navbar-inverse .dropdown-submenu > a").click(function() {
                            $(window).width() <= 979 && $(this).closest(".dropdown-submenu").find(">.dropdown-menu").toggle()
                        }), $(".navbar-inner .dropdown-toggle").click(function() {
                            $(this).is("#switch-toggle") ? o().done(function() {
                                r($("#switch-restaurants-menu .typeahead").val()), a($("#switch-toggle"))
                            }) : a($(this))
                        }), t) {
                        var c = $("#switch-restaurants-menu");
                        c.click(function() {
                            c.find(".typeahead").val(""), setTimeout(function() {
                                c.find(".typeahead").focus()
                            }, 0), c.find("li").show()
                        }), c.find(".typeahead").click(function(t) {
                            t.stopPropagation()
                        }).keyup(function(t) {
                            if (40 != t.which && 38 != t.which && 9 != t.which) {
                                r($(this).val(), t.which)
                            }
                        })
                    }
                    var u;
                    $("#switch-restaurants-menu .dropdown-toggle").click(function() {
                        null != u && (u.removeClass("active"), u = null)
                    }), $("#switch-restaurants-menu .typeahead").keyup(function(t) {
                        null != u && 40 != t.which && 39 != t.which && 38 != t.which && 37 != t.which && 13 != t.which && 9 != t.which && (u.removeClass("active"), u = null)
                    }), $("#switch-restaurants-menu .search-option").on({
                        mouseenter: function() {
                            null != u && u.removeClass("active"), $(this).addClass("active"), u = $(this)
                        }
                    }), $("#switch-restaurants-menu .dropdown-toggle, #switch-restaurants-menu .typeahead").keydown(function(t) {
                        if ($("#switch-restaurants-menu").hasClass("open")) {
                            var e;
                            if (40 == t.which || 9 == t.which && !t.shiftKey) return null == u ? (e = $("#switch-restaurants-menu .search-option:visible").first(), e.length && (e.addClass("active"), u = e)) : (e = u.nextAll(".search-option:visible").first(), e.length && (u.removeClass("active"), e.addClass("active"), u = e)), !1;
                            if (38 == t.which || 9 == t.which && t.shiftKey) return null != u && (e = u.prevAll(".search-option:visible").first(), e.length && (u.removeClass("active"), e.addClass("active"), u = e)), !1;
                            if (13 == t.which && null != u && u.is(":visible")) return window.location = u.find("a").attr("href"), !1
                        }
                    }), i.registerOnLogoutClearYourUpdatesState()
                })
            }
        };
        ! function(t) {
            t.fn.center = function() {
                return this.each(function() {
                    var e = t(this);
                    e.css("position", "absolute"), e.css({
                        margin: "0"
                    }), e.css("top", Math.max(0, (t(window).height() - e.outerHeight()) / 2 + t(window).scrollTop()) + "px"), e.css("left", Math.max(0, (t(window).width() - e.outerWidth()) / 2 + t(window).scrollLeft()) + "px")
                })
            }
        }(jQuery)
    }], [6])
});
//# sourceMappingURL=app-bb759734b677255d6d76.js.map