! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("UiKit")) : "function" == typeof define && define.amd ? define(["UiKit"], t) : "object" == typeof exports ? exports.admin = t(require("UiKit")) : e.admin = t(e.UiKit)
}(this, function(e) {
    return function(e) {
        function t(n) {
            if (r[n]) return r[n].exports;
            var o = r[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports
        }
        var n = window.webpackJsonpadmin;
        window.webpackJsonpadmin = function(r, i, u) {
            for (var c, a, f, s = 0, p = []; s < r.length; s++) a = r[s], o[a] && p.push(o[a][0]), o[a] = 0;
            for (c in i) Object.prototype.hasOwnProperty.call(i, c) && (e[c] = i[c]);
            for (n && n(r, i, u); p.length;) p.shift()();
            if (u)
                for (s = 0; s < u.length; s++) f = t(t.s = u[s]);
            return f
        };
        var r = {},
            o = {
                1: 0
            };
        return t.e = function(e) {
            function n() {
                i.onerror = i.onload = null, clearTimeout(u);
                var t = o[e];
                0 !== t && (t && t[1](new Error("Loading chunk " + e + " failed.")), o[e] = void 0)
            }
            if (0 === o[e]) return Promise.resolve();
            if (o[e]) return o[e][2];
            var r = document.getElementsByTagName("head")[0],
                i = document.createElement("script");
            i.type = "text/javascript", i.charset = "utf-8", i.async = !0, i.timeout = 12e4, t.nc && i.setAttribute("nonce", t.nc), i.src = t.p + "" + e + "-" + {
                0: "9ed8d4486121c7396d97"
            }[e] + ".js";
            var u = setTimeout(n, 12e4);
            i.onerror = i.onload = n;
            var c = new Promise(function(t, n) {
                o[e] = [t, n]
            });
            return o[e][2] = c, r.appendChild(i), c
        }, t.m = e, t.c = r, t.i = function(e) {
            return e
        }, t.d = function(e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }, t.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return t.d(n, "a", n), n
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "${staticResRoot}/admin/", t.oe = function(e) {
            throw console.error(e), e
        }, t(t.s = 8)
    }({
        6: function(t, n) {
            t.exports = e
        },
        8: function(e, t, n) {
            e.exports = n(6)
        }
    })
});
//# sourceMappingURL=vendor-bae15a911d87cba8e2b7.js.map