(function() {
    /*
     Copyright (c) 2018 Glance Networks, Inc.
    */
    var m;
    window.GLANCE = window.GLANCE || {};
    window.GLANCE.VERSION = "4.10.1.22";
    window.GLANCE.PATCH = "";
    var n = navigator.userAgent.toLowerCase(),
        q = n.match(/(edge)[\s\/:]([\w\d\.]+)?/) || n.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || n.match(/(rv):([\w\d\.]+)/) || [null, "unknown", 0];
    "rv" === q[1] && (q[1] = "ie");
    void 0 === m && (m = function(a) {
        return JSON.stringify(a)
    });

    function r(a, c, b) {
        window.addEventListener(a, c, b)
    }

    function t(a, c, b) {
        var d = {};
        d[c] = b;
        a.postMessage(d, "*")
    }

    function v(a, c) {
        window.addEventListener("message", function(b) {
            var d;
            if ("string" === typeof b.data) try {
                d = JSON.parse(b.data)
            } catch (z) {
                return !1
            } else d = b.data;
            void 0 !== d[a] && c(b.source, d[a])
        })
    }
    window.Sarissa && Sarissa._SARISSA_IS_IE && new window.XMLHttpRequest;

    function w(a, c) {
        this.name = a;
        var b;
        if (!(b = c)) {
            var d = new y(window);
            b = d.b.location.hostname;
            for (d = d.b;
                "" === b && d.parent !== d;) b = d.parent.location.hostname, d = d.parent;
            b = A(b)
        }
        this.domain = b
    }
    w.prototype.g = function() {
        var a = this.get();
        return a ? JSON.parse(a) : null
    };
    w.prototype.get = function() {
        return this.c() ? unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(this.name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1")) : null
    };
    w.prototype.f = function() {
        var a = new Date;
        a.setDate(a.getDate() - 1);
        document.cookie = escape(this.name) + "=; expires=" + a.toGMTString() + "; domain=" + this.domain + "; path=/"
    };
    w.prototype.c = function() {
        return (new RegExp("(?:^|;\\s*)" + escape(this.name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie)
    };

    function E(a) {
        this.name = a
    }
    E.prototype.g = function() {
        if (!this.c()) return null;
        var a = localStorage.getItem(this.name);
        return JSON.parse(a)
    };
    E.prototype.get = function() {
        return this.c() ? localStorage.getItem(this.name) : null
    };
    E.prototype.f = function() {
        localStorage.removeItem(this.name);
        localStorage.removeItem(this.name + "_exp")
    };
    E.prototype.c = function() {
        var a = localStorage.getItem(this.name + "_exp");
        if (!a) return !1;
        a = new Date(a);
        return a < new Date ? (this.f(), !1) : !0
    };

    function F(a, c) {
        this.a = [new w(a, c), new E(a)]
    }
    F.prototype.g = function() {
        return this.a[0].g() || this.a[1].g()
    };
    F.prototype.get = function() {
        return this.a[0].get() || this.a[1].get()
    };
    F.prototype.f = function() {
        this.a[0].f();
        this.a[1].f()
    };
    F.prototype.c = function() {
        return this.a[0].c() || this.a[1].c()
    };

    function y(a) {
        this.a = a.document;
        this.b = a;
        var c = [
            ["hidden", "visibilitychange"],
            ["mozHidden", "mozvisibilitychange"],
            ["webkitHidden", "webkitvisibilitychange"],
            ["msHidden", "msvisibilitychange"],
            ["oHidden", "ovisibilitychange"]
        ];
        for (a = 0; a < c.length && !(c[a][0] in document); a++);
    }

    function A(a) {
        var c = new RegExp(/^(?:[a-z]{1,5}:\/\/|)([^\:\?\/]*)/),
            b = a.match(/^\d+\.\d+.\d+.\d+$/),
            c = c.exec(a);
        if (b) return a;
        if (null === c || 2 !== c.length) return "about:" !== a && G("ERR_DOMAINPARSE: " + a), null;
        b = c[1].split(".");
        return 1 === b.length ? (G("ERR_DOMAINPARSE: " + a), null) : 2 === b.length ? b.join(".") : 3 === b.length ? b.slice(1).join(".") : 4 >= b[b.length - 2].length ? b.slice(b.length - 3).join(".") : b.slice(b.length - 2).join(".")
    }
    y.prototype.getElementsByTagName = function(a) {
        return this.a.getElementsByTagName(a)
    };

    function H(a, c, b) {
        var d = a.a.createElement("script");
        b && d.addEventListener("load", b);
        d.setAttribute("type", "text/javascript");
        d.setAttribute("charset", "UTF-8");
        for (b = 0; b < c.length; b++) d.setAttribute(c[b][0], c[b][1]);
        a.a.head.appendChild(d)
    }
    y.prototype.head = function() {
        return void 0 !== this.a.head ? this.a.head : this.getElementsByTagName("head")[0]
    };

    function I(a, c) {
        a.b.addEventListener && (document.readyState.match(/complete/) ? c() : (a.b.addEventListener("load", c), a.a.addEventListener("DOMContentLoaded", c, !1)))
    }
    y.prototype.addEventListener = function(a, c, b) {
        this.a.addEventListener(a, c, b)
    };
    y.prototype.removeEventListener = function(a, c, b) {
        this.a.removeEventListener(a, c, b)
    };

    function G(a) {
        window.console && window.console.log && (window.GLANCE_COBROWSE ? !window.GLANCE_COBROWSE.disableLogging : 1) && window.console.log(a)
    }

    function J() {
        this.listeners = this.a = {}
    };

    function K(a, c) {
        var b;
        a && (b = b || Object.keys(a), b.forEach(function(b) {
            void 0 !== a[b] && (c[b] = a[b])
        }))
    }

    function L(a) {
        var c = {};
        if (!a) return c;
        var b = 0;
        for (a = a.attributes; b < a.length; b++) {
            var d = a[b].nodeName.match(/data-(.*)/);
            d && 2 === d.length && (c[d[1]] = a[b].nodeValue)
        }
        return c
    }

    function P() {
        var a = window.GLANCE_COBROWSE ? window.GLANCE_COBROWSE : {},
            c = document.getElementById("glance-cobrowse"),
            b = L(document.getElementById("cobrowsescript")),
            c = L(c);
        K(b, a);
        K(c, a);
        return a
    };
    var Q = ["4", "10", "1", "22"].slice(0, 3).join(".") + "M";

    function R() {
        this.a = document.getElementById("cobrowsescript") || document.getElementById("glance-cobrowse");
        if (null !== this.a) {
            var a = P();
            K(a, this);
            var c = /\/\/(.*)\//.exec("string" === typeof this.a.src ? this.a.src : a.scriptserver + "/");
            this.h = c && 2 === c.length ? c[1] : "www.glancecdn.net/cobrowse";
            this.h = this.h.replace("/js", "");
            c = (a.oninit || "").split(":");
            this.j = a.groupid || this.a.getAttribute("groupid");
            this.A = a.ws || this.a.getAttribute("ws") || "www.glance.net";
            this.A.match("\\.glance\\.net$");
            this.w = a.ui;
            this.b = {
                i: c[0],
                B: c[1]
            };
            this.v = a.site || this.a.getAttribute("site") || "production";
            this.o = JSON.parse(a.inputevents || "{}");
            this.s = a.presence;
            if (!this.j) throw Error("data-groupid missing");
            a = a.additionalgroupids || "";
            this.l = [this.j].concat(a ? a.split(",") : []);
            this.l = this.l.map(function(a) {
                if (!parseInt(a)) throw Error("data-groupid invalid: " + a);
                return parseInt(a)
            });
            if (!/staging|production/i.test(this.v)) throw Error("data-site invalid");
        }
    };

    function S() {
        return 0 < window.location.href.indexOf("GlanceSession=1")
    };
    window.GLANCE = window.GLANCE || {};
    window.GLANCE.Cobrowse = window.GLANCE.Cobrowse || {};

    function T() {
        function a() {
            if (f.b.i) {
                var a = new F("glance_ssn_info");
                a.g() && ("abandonsession" === f.b.i ? a.f() : "continuesession" === f.b.i && f.b.B !== a.g().ssnid && a.f())
            }
        }

        function c(a) {
            function b(a, b, c) {
                return function(e) {
                    if (e.keyCode === b && e[a + "Key"] && (e = c.match(/showButton|toggleButton|showTerms/) ? "VisitorUI" : "Visitor", !M(e, c))) window.GLANCE.Cobrowse[e][c]()
                }
            }
            for (var c in a)
                if (a.hasOwnProperty(c)) {
                    var e = c.match(/(ctrl|alt|shift)-(\d*)/);
                    !e || 3 > e.length || r("keydown", b(e[1], parseInt(e[2]), a[c]), !0)
                }
        }

        function b() {
            var a =
                document.body;

            function b(a) {
                return function(b) {
                    var c = a.match(/showButton|toggleButton|showTerms/) ? "VisitorUI" : "Visitor";
                    b.stopPropagation();
                    b.preventDefault();
                    if (!M(c, a)) g[c][a]()
                }
            }["glance_button", "data-glancebutton"].forEach(function(c) {
                for (var e = a.querySelectorAll("[" + c + "]"), d = 0; e && d < e.length; d++) {
                    var B = e[d].getAttribute(c);
                    "start" === B && (B = "startSession");
                    e[d].addEventListener("click", b(B))
                }
            })
        }

        function d() {
            return g.Visitor
        }

        function z(a, b) {
            g[b][a] = function(c) {
                h(function() {
                    g[b][a](c)
                }, b)
            }
        }

        function M(a,
            b) {
            if (!l) return !1;
            t(window.top, "forwardevent", {
                namespace: a,
                funcname: b
            });
            return !0
        }

        function h(a, b) {
            b = b || "Visitor";
            if (p.a.getElementById(("glance_" + b).toLowerCase())) g[b].loaded ? a && a() : a && G("SCRIPT_NOT_LOADED:" + b);
            else if (a && (N._onload[b] = a), l || "Visitor" !== b || f.w || h(null, "VisitorUI"), H(p, [
                    ["id", ("glance_" + b).toLowerCase()],
                    ["src", C + "/GlanceCobrowse" + b + "_" + D + ".js"]
                ]), "Visitor" === b) {
                var c, e = document.getElementsByTagName("iframe");
                for (c = 0; c < e.length; c++) e[c].contentWindow && t(e[c].contentWindow, "glance_load", {
                    m: !0
                })
            }
        }
        window.GLANCE.runDiagnostics = function() {
            H(p, [
                ["src", "https://" + f.h + "/js/diagnostics.js"]
            ])
        };
        if (window.localStorage && window.XMLHttpRequest && window.atob) {
            if (!window.addEventListener) return null;
            var l = window.parent !== window,
                p = new y(window),
                O = !1,
                f = new R,
                D = Q,
                g = window.GLANCE.Cobrowse,
                C = "//" + f.h + "/js";
            l || a();
            var u = new J;
            if (g.Loader) G("ERR_DUP_SCRIPTS");
            else {
                var N = {
                    load: function(a) {
                        h(a)
                    },
                    loadScript: function(a, b) {
                        H(p, [
                            ["src", C + "/" + a + "_" + D + ".js"]
                        ], b)
                    },
                    _eventListeners: u,
                    _onload: {},
                    _origpath: window.location.pathname
                };
                v("glance_load", function(a, b) {
                    a !== window.parent && a.parent !== window ? G("UNTRUSTED_LOAD_MSG") : (b.m && h(), b.u && null !== p.a.getElementById("glance_visitor") && t(a, "glance_load", {
                        m: !0
                    }))
                });
                l && t(window.parent, "glance_load", {
                    u: !0
                });
                window.addEventListener("message", function(a) {
                    if ("string" !== typeof a.data) {
                        if (d().loaded) return !0;
                        a.data.glance_invoke && (a.data.origin = a.origin, h(function() {
                            window.postMessage(a.data, window.location.href)
                        }))
                    }
                });
                r("focus", function() {
                    if (d().loaded) return !0;
                    d().inSession() && h()
                });
                g.Visitor = {
                    loaded: !1,
                    inSession: function() {
                        return (new F("glance_ssn_info")).c()
                    },
                    addEventListener: function(a, b) {
                        u.a[a] = u.a[a] || [];
                        u.a[a].push(b)
                    },
                    removeEventListener: function(a, b) {
                        var c, d = u.a[a];
                        void 0 !== d && (c = d.indexOf(b), 0 <= c && d.splice(c, 1))
                    }
                };
                var x = ["showButton", "toggleButton", "showTerms", "setStyle"];
                l || (g.VisitorUI = {}, x.forEach(function(a) {
                    z(a, "VisitorUI")
                }));
                x = x.concat(["startSession", "setStartParams"]);
                x.forEach(function(a) {
                    z(a, "Visitor")
                });
                g.Loader = N;
                l || S() || !d().inSession() || h();
                !l && S() && h(null, "XDOM");
                I(p, function() {
                    document.body && !O && (O = !0, b(), c(f.o), f.s && !l && H(p, [
                        ["src", C + "/GlancePresenceVisitor_" + D + ".js"]
                    ]))
                });
                v("forwardevent", function(a, b) {
                    if (a.top !== window) G("UNTRUSTED_KEYEVT");
                    else window.GLANCE.Cobrowse[b.namespace][b.funcname]()
                })
            }
        } else window.console && window.console.error && window.console.error("ERR_COBROWSE_NOT_SUPP")
    }
    document.getElementById("cobrowsescript") || document.getElementById("glance-cobrowse") ? T() : (G("LOADER_PAGE_NOT_READY"), I(new y(window), T));
}).call(window);