! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("UiKit")) : "function" == typeof define && define.amd ? define(["UiKit"], t) : "object" == typeof exports ? exports.adminFrame = t(require("UiKit")) : e.adminFrame = t(e.UiKit)
}(this, function(e) {
    return function(e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
        }
        var r = window.webpackJsonpadminFrame;
        window.webpackJsonpadminFrame = function(n, i, u) {
            for (var a, c, f, s = 0, p = []; s < n.length; s++) c = n[s], o[c] && p.push(o[c][0]), o[c] = 0;
            for (a in i) Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a]);
            for (r && r(n, i, u); p.length;) p.shift()();
            if (u)
                for (s = 0; s < u.length; s++) f = t(t.s = u[s]);
            return f
        };
        var n = {},
            o = {
                1: 0
            };
        return t.e = function(e) {
            function r() {
                i.onerror = i.onload = null, clearTimeout(u);
                var t = o[e];
                0 !== t && (t && t[1](new Error("Loading chunk " + e + " failed.")), o[e] = void 0)
            }
            if (0 === o[e]) return Promise.resolve();
            if (o[e]) return o[e][2];
            var n = document.getElementsByTagName("head")[0],
                i = document.createElement("script");
            i.type = "text/javascript", i.charset = "utf-8", i.async = !0, i.timeout = 12e4, t.nc && i.setAttribute("nonce", t.nc), i.src = t.p + "" + e + "-" + {
                0: "bb759734b677255d6d76"
            }[e] + ".js";
            var u = setTimeout(r, 12e4);
            i.onerror = i.onload = r;
            var a = new Promise(function(t, r) {
                o[e] = [t, r]
            });
            return o[e][2] = a, n.appendChild(i), a
        }, t.m = e, t.c = n, t.i = function(e) {
            return e
        }, t.d = function(e, r, n) {
            t.o(e, r) || Object.defineProperty(e, r, {
                configurable: !1,
                enumerable: !0,
                get: n
            })
        }, t.n = function(e) {
            var r = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return t.d(r, "a", r), r
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "${staticResRoot}/adminFrame/", t.oe = function(e) {
            throw console.error(e), e
        }, t(t.s = 7)
    }({
        5: function(t, r) {
            t.exports = e
        },
        7: function(e, t, r) {
            e.exports = r(5)
        }
    })
});
//# sourceMappingURL=vendor-9c77bf624972a5d413c7.js.map