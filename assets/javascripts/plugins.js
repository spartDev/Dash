// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

/*! Hammer.JS - v1.0.5 - 2013-04-07
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license*/
(function(t, e) {
    "use strict";

    function n() {
        if (!i.READY) {
            i.event.determineEventTypes();
            for (var t in i.gestures) i.gestures.hasOwnProperty(t) && i.detection.register(i.gestures[t]);
            i.event.onTouch(i.DOCUMENT, i.EVENT_MOVE, i.detection.detect), i.event.onTouch(i.DOCUMENT, i.EVENT_END, i.detection.detect), i.READY = !0
        }
    }
    var i = function(t, e) {
        return new i.Instance(t, e || {})
    };
    i.defaults = {
        stop_browser_behavior: {
            userSelect: "none",
            touchAction: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    }, i.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled, i.HAS_TOUCHEVENTS = "ontouchstart" in t, i.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i, i.NO_MOUSEEVENTS = i.HAS_TOUCHEVENTS && navigator.userAgent.match(i.MOBILE_REGEX), i.EVENT_TYPES = {}, i.DIRECTION_DOWN = "down", i.DIRECTION_LEFT = "left", i.DIRECTION_UP = "up", i.DIRECTION_RIGHT = "right", i.POINTER_MOUSE = "mouse", i.POINTER_TOUCH = "touch", i.POINTER_PEN = "pen", i.EVENT_START = "start", i.EVENT_MOVE = "move", i.EVENT_END = "end", i.DOCUMENT = document, i.plugins = {}, i.READY = !1, i.Instance = function(t, e) {
        var r = this;
        return n(), this.element = t, this.enabled = !0, this.options = i.utils.extend(i.utils.extend({}, i.defaults), e || {}), this.options.stop_browser_behavior && i.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior), i.event.onTouch(t, i.EVENT_START, function(t) {
            r.enabled && i.detection.startDetect(r, t)
        }), this
    }, i.Instance.prototype = {
        on: function(t, e) {
            for (var n = t.split(" "), i = 0; n.length > i; i++) this.element.addEventListener(n[i], e, !1);
            return this
        },
        off: function(t, e) {
            for (var n = t.split(" "), i = 0; n.length > i; i++) this.element.removeEventListener(n[i], e, !1);
            return this
        },
        trigger: function(t, e) {
            var n = i.DOCUMENT.createEvent("Event");
            n.initEvent(t, !0, !0), n.gesture = e;
            var r = this.element;
            return i.utils.hasParent(e.target, r) && (r = e.target), r.dispatchEvent(n), this
        },
        enable: function(t) {
            return this.enabled = t, this
        }
    };
    var r = null,
        o = !1,
        s = !1;
    i.event = {
        bindDom: function(t, e, n) {
            for (var i = e.split(" "), r = 0; i.length > r; r++) t.addEventListener(i[r], n, !1)
        },
        onTouch: function(t, e, n) {
            var a = this;
            this.bindDom(t, i.EVENT_TYPES[e], function(c) {
                var u = c.type.toLowerCase();
                if (!u.match(/mouse/) || !s) {
                    (u.match(/touch/) || u.match(/pointerdown/) || u.match(/mouse/) && 1 === c.which) && (o = !0), u.match(/touch|pointer/) && (s = !0);
                    var h = 0;
                    o && (i.HAS_POINTEREVENTS && e != i.EVENT_END ? h = i.PointerEvent.updatePointer(e, c) : u.match(/touch/) ? h = c.touches.length : s || (h = u.match(/up/) ? 0 : 1), h > 0 && e == i.EVENT_END ? e = i.EVENT_MOVE : h || (e = i.EVENT_END), h || null === r ? r = c : c = r, n.call(i.detection, a.collectEventData(t, e, c)), i.HAS_POINTEREVENTS && e == i.EVENT_END && (h = i.PointerEvent.updatePointer(e, c))), h || (r = null, o = !1, s = !1, i.PointerEvent.reset())
                }
            })
        },
        determineEventTypes: function() {
            var t;
            t = i.HAS_POINTEREVENTS ? i.PointerEvent.getEvents() : i.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], i.EVENT_TYPES[i.EVENT_START] = t[0], i.EVENT_TYPES[i.EVENT_MOVE] = t[1], i.EVENT_TYPES[i.EVENT_END] = t[2]
        },
        getTouchList: function(t) {
            return i.HAS_POINTEREVENTS ? i.PointerEvent.getTouchList() : t.touches ? t.touches : [{
                identifier: 1,
                pageX: t.pageX,
                pageY: t.pageY,
                target: t.target
            }]
        },
        collectEventData: function(t, e, n) {
            var r = this.getTouchList(n, e),
                o = i.POINTER_TOUCH;
            return (n.type.match(/mouse/) || i.PointerEvent.matchType(i.POINTER_MOUSE, n)) && (o = i.POINTER_MOUSE), {
                center: i.utils.getCenter(r),
                timeStamp: (new Date).getTime(),
                target: n.target,
                touches: r,
                eventType: e,
                pointerType: o,
                srcEvent: n,
                preventDefault: function() {
                    this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault && this.srcEvent.preventDefault()
                },
                stopPropagation: function() {
                    this.srcEvent.stopPropagation()
                },
                stopDetect: function() {
                    return i.detection.stopDetect()
                }
            }
        }
    }, i.PointerEvent = {
        pointers: {},
        getTouchList: function() {
            var t = this,
                e = [];
            return Object.keys(t.pointers).sort().forEach(function(n) {
                e.push(t.pointers[n])
            }), e
        },
        updatePointer: function(t, e) {
            return t == i.EVENT_END ? this.pointers = {} : (e.identifier = e.pointerId, this.pointers[e.pointerId] = e), Object.keys(this.pointers).length
        },
        matchType: function(t, e) {
            if (!e.pointerType) return !1;
            var n = {};
            return n[i.POINTER_MOUSE] = e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == i.POINTER_MOUSE, n[i.POINTER_TOUCH] = e.pointerType == e.MSPOINTER_TYPE_TOUCH || e.pointerType == i.POINTER_TOUCH, n[i.POINTER_PEN] = e.pointerType == e.MSPOINTER_TYPE_PEN || e.pointerType == i.POINTER_PEN, n[t]
        },
        getEvents: function() {
            return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
        },
        reset: function() {
            this.pointers = {}
        }
    }, i.utils = {
        extend: function(t, n, i) {
            for (var r in n) t[r] !== e && i || (t[r] = n[r]);
            return t
        },
        hasParent: function(t, e) {
            for (; t;) {
                if (t == e) return !0;
                t = t.parentNode
            }
            return !1
        },
        getCenter: function(t) {
            for (var e = [], n = [], i = 0, r = t.length; r > i; i++) e.push(t[i].pageX), n.push(t[i].pageY);
            return {
                pageX: (Math.min.apply(Math, e) + Math.max.apply(Math, e)) / 2,
                pageY: (Math.min.apply(Math, n) + Math.max.apply(Math, n)) / 2
            }
        },
        getVelocity: function(t, e, n) {
            return {
                x: Math.abs(e / t) || 0,
                y: Math.abs(n / t) || 0
            }
        },
        getAngle: function(t, e) {
            var n = e.pageY - t.pageY,
                i = e.pageX - t.pageX;
            return 180 * Math.atan2(n, i) / Math.PI
        },
        getDirection: function(t, e) {
            var n = Math.abs(t.pageX - e.pageX),
                r = Math.abs(t.pageY - e.pageY);
            return n >= r ? t.pageX - e.pageX > 0 ? i.DIRECTION_LEFT : i.DIRECTION_RIGHT : t.pageY - e.pageY > 0 ? i.DIRECTION_UP : i.DIRECTION_DOWN
        },
        getDistance: function(t, e) {
            var n = e.pageX - t.pageX,
                i = e.pageY - t.pageY;
            return Math.sqrt(n * n + i * i)
        },
        getScale: function(t, e) {
            return t.length >= 2 && e.length >= 2 ? this.getDistance(e[0], e[1]) / this.getDistance(t[0], t[1]) : 1
        },
        getRotation: function(t, e) {
            return t.length >= 2 && e.length >= 2 ? this.getAngle(e[1], e[0]) - this.getAngle(t[1], t[0]) : 0
        },
        isVertical: function(t) {
            return t == i.DIRECTION_UP || t == i.DIRECTION_DOWN
        },
        stopDefaultBrowserBehavior: function(t, e) {
            var n, i = ["webkit", "khtml", "moz", "ms", "o", ""];
            if (e && t.style) {
                for (var r = 0; i.length > r; r++)
                    for (var o in e) e.hasOwnProperty(o) && (n = o, i[r] && (n = i[r] + n.substring(0, 1).toUpperCase() + n.substring(1)), t.style[n] = e[o]);
                "none" == e.userSelect && (t.onselectstart = function() {
                    return !1
                })
            }
        }
    }, i.detection = {
        gestures: [],
        current: null,
        previous: null,
        stopped: !1,
        startDetect: function(t, e) {
            this.current || (this.stopped = !1, this.current = {
                inst: t,
                startEvent: i.utils.extend({}, e),
                lastEvent: !1,
                name: ""
            }, this.detect(e))
        },
        detect: function(t) {
            if (this.current && !this.stopped) {
                t = this.extendEventData(t);
                for (var e = this.current.inst.options, n = 0, r = this.gestures.length; r > n; n++) {
                    var o = this.gestures[n];
                    if (!this.stopped && e[o.name] !== !1 && o.handler.call(o, t, this.current.inst) === !1) {
                        this.stopDetect();
                        break
                    }
                }
                return this.current && (this.current.lastEvent = t), t.eventType == i.EVENT_END && !t.touches.length - 1 && this.stopDetect(), t
            }
        },
        stopDetect: function() {
            this.previous = i.utils.extend({}, this.current), this.current = null, this.stopped = !0
        },
        extendEventData: function(t) {
            var e = this.current.startEvent;
            if (e && (t.touches.length != e.touches.length || t.touches === e.touches)) {
                e.touches = [];
                for (var n = 0, r = t.touches.length; r > n; n++) e.touches.push(i.utils.extend({}, t.touches[n]))
            }
            var o = t.timeStamp - e.timeStamp,
                s = t.center.pageX - e.center.pageX,
                a = t.center.pageY - e.center.pageY,
                c = i.utils.getVelocity(o, s, a);
            return i.utils.extend(t, {
                deltaTime: o,
                deltaX: s,
                deltaY: a,
                velocityX: c.x,
                velocityY: c.y,
                distance: i.utils.getDistance(e.center, t.center),
                angle: i.utils.getAngle(e.center, t.center),
                direction: i.utils.getDirection(e.center, t.center),
                scale: i.utils.getScale(e.touches, t.touches),
                rotation: i.utils.getRotation(e.touches, t.touches),
                startEvent: e
            }), t
        },
        register: function(t) {
            var n = t.defaults || {};
            return n[t.name] === e && (n[t.name] = !0), i.utils.extend(i.defaults, n, !0), t.index = t.index || 1e3, this.gestures.push(t), this.gestures.sort(function(t, e) {
                return t.index < e.index ? -1 : t.index > e.index ? 1 : 0
            }), this.gestures
        }
    }, i.gestures = i.gestures || {}, i.gestures.Hold = {
        name: "hold",
        index: 10,
        defaults: {
            hold_timeout: 500,
            hold_threshold: 1
        },
        timer: null,
        handler: function(t, e) {
            switch (t.eventType) {
                case i.EVENT_START:
                    clearTimeout(this.timer), i.detection.current.name = this.name, this.timer = setTimeout(function() {
                        "hold" == i.detection.current.name && e.trigger("hold", t)
                    }, e.options.hold_timeout);
                    break;
                case i.EVENT_MOVE:
                    t.distance > e.options.hold_threshold && clearTimeout(this.timer);
                    break;
                case i.EVENT_END:
                    clearTimeout(this.timer)
            }
        }
    }, i.gestures.Tap = {
        name: "tap",
        index: 100,
        defaults: {
            tap_max_touchtime: 250,
            tap_max_distance: 10,
            tap_always: !0,
            doubletap_distance: 20,
            doubletap_interval: 300
        },
        handler: function(t, e) {
            if (t.eventType == i.EVENT_END) {
                var n = i.detection.previous,
                    r = !1;
                if (t.deltaTime > e.options.tap_max_touchtime || t.distance > e.options.tap_max_distance) return;
                n && "tap" == n.name && t.timeStamp - n.lastEvent.timeStamp < e.options.doubletap_interval && t.distance < e.options.doubletap_distance && (e.trigger("doubletap", t), r = !0), (!r || e.options.tap_always) && (i.detection.current.name = "tap", e.trigger(i.detection.current.name, t))
            }
        }
    }, i.gestures.Swipe = {
        name: "swipe",
        index: 40,
        defaults: {
            swipe_max_touches: 1,
            swipe_velocity: .7
        },
        handler: function(t, e) {
            if (t.eventType == i.EVENT_END) {
                if (e.options.swipe_max_touches > 0 && t.touches.length > e.options.swipe_max_touches) return;
                (t.velocityX > e.options.swipe_velocity || t.velocityY > e.options.swipe_velocity) && (e.trigger(this.name, t), e.trigger(this.name + t.direction, t))
            }
        }
    }, i.gestures.Drag = {
        name: "drag",
        index: 50,
        defaults: {
            drag_min_distance: 10,
            drag_max_touches: 1,
            drag_block_horizontal: !1,
            drag_block_vertical: !1,
            drag_lock_to_axis: !1,
            drag_lock_min_distance: 25
        },
        triggered: !1,
        handler: function(t, n) {
            if (i.detection.current.name != this.name && this.triggered) return n.trigger(this.name + "end", t), this.triggered = !1, e;
            if (!(n.options.drag_max_touches > 0 && t.touches.length > n.options.drag_max_touches)) switch (t.eventType) {
                case i.EVENT_START:
                    this.triggered = !1;
                    break;
                case i.EVENT_MOVE:
                    if (t.distance < n.options.drag_min_distance && i.detection.current.name != this.name) return;
                    i.detection.current.name = this.name, (i.detection.current.lastEvent.drag_locked_to_axis || n.options.drag_lock_to_axis && n.options.drag_lock_min_distance <= t.distance) && (t.drag_locked_to_axis = !0);
                    var r = i.detection.current.lastEvent.direction;
                    t.drag_locked_to_axis && r !== t.direction && (t.direction = i.utils.isVertical(r) ? 0 > t.deltaY ? i.DIRECTION_UP : i.DIRECTION_DOWN : 0 > t.deltaX ? i.DIRECTION_LEFT : i.DIRECTION_RIGHT), this.triggered || (n.trigger(this.name + "start", t), this.triggered = !0), n.trigger(this.name, t), n.trigger(this.name + t.direction, t), (n.options.drag_block_vertical && i.utils.isVertical(t.direction) || n.options.drag_block_horizontal && !i.utils.isVertical(t.direction)) && t.preventDefault();
                    break;
                case i.EVENT_END:
                    this.triggered && n.trigger(this.name + "end", t), this.triggered = !1
            }
        }
    }, i.gestures.Transform = {
        name: "transform",
        index: 45,
        defaults: {
            transform_min_scale: .01,
            transform_min_rotation: 1,
            transform_always_block: !1
        },
        triggered: !1,
        handler: function(t, n) {
            if (i.detection.current.name != this.name && this.triggered) return n.trigger(this.name + "end", t), this.triggered = !1, e;
            if (!(2 > t.touches.length)) switch (n.options.transform_always_block && t.preventDefault(), t.eventType) {
                case i.EVENT_START:
                    this.triggered = !1;
                    break;
                case i.EVENT_MOVE:
                    var r = Math.abs(1 - t.scale),
                        o = Math.abs(t.rotation);
                    if (n.options.transform_min_scale > r && n.options.transform_min_rotation > o) return;
                    i.detection.current.name = this.name, this.triggered || (n.trigger(this.name + "start", t), this.triggered = !0), n.trigger(this.name, t), o > n.options.transform_min_rotation && n.trigger("rotate", t), r > n.options.transform_min_scale && (n.trigger("pinch", t), n.trigger("pinch" + (1 > t.scale ? "in" : "out"), t));
                    break;
                case i.EVENT_END:
                    this.triggered && n.trigger(this.name + "end", t), this.triggered = !1
            }
        }
    }, i.gestures.Touch = {
        name: "touch",
        index: -1 / 0,
        defaults: {
            prevent_default: !1,
            prevent_mouseevents: !1
        },
        handler: function(t, n) {
            return n.options.prevent_mouseevents && t.pointerType == i.POINTER_MOUSE ? (t.stopDetect(), e) : (n.options.prevent_default && t.preventDefault(), t.eventType == i.EVENT_START && n.trigger(this.name, t), e)
        }
    }, i.gestures.Release = {
        name: "release",
        index: 1 / 0,
        handler: function(t, e) {
            t.eventType == i.EVENT_END && e.trigger(this.name, t)
        }
    }, "object" == typeof module && "object" == typeof module.exports ? module.exports = i : (t.Hammer = i, "function" == typeof t.define && t.define.amd && t.define("hammer", [], function() {
        return i
    }))
})(this),
function(t, e) {
    "use strict";
    t !== e && (Hammer.event.bindDom = function(n, i, r) {
        t(n).on(i, function(t) {
            var n = t.originalEvent || t;
            n.pageX === e && (n.pageX = t.pageX, n.pageY = t.pageY), n.target || (n.target = t.target), n.which === e && (n.which = n.button), n.preventDefault || (n.preventDefault = t.preventDefault), n.stopPropagation || (n.stopPropagation = t.stopPropagation), r.call(this, n)
        })
    }, Hammer.Instance.prototype.on = function(e, n) {
        return t(this.element).on(e, n)
    }, Hammer.Instance.prototype.off = function(e, n) {
        return t(this.element).off(e, n)
    }, Hammer.Instance.prototype.trigger = function(e, n) {
        var i = t(this.element);
        return i.has(n.target).length && (i = t(n.target)), i.trigger({
            type: e,
            gesture: n
        })
    }, t.fn.hammer = function(e) {
        return this.each(function() {
            var n = t(this),
                i = n.data("hammer");
            i ? i && e && Hammer.utils.extend(i.options, e) : n.data("hammer", new Hammer(this, e || {}))
        })
    })
}(window.jQuery || window.Zepto);

/* Version 2.2.0 */
// http://svgmagic.bitlabs.nl
(function($) {
    $.fn.svgmagic = function(givenoptions) {
        var defaultoptions = {
            preloader: false,
            testmode: false,
            secure: false,
            callback: false,
            backgroundimage: false,
            dumpcache: false
        };
        var options = $.extend(defaultoptions, givenoptions);
        var preloaderTimer = [];
        if (options.testmode || !document.createElement("svg").getAttributeNS) {
            if (typeof JSON == "undefined") {
                if (typeof JSON !== "object") {
                    JSON = {}
                }(function() {
                    "use strict";

                    function f(e) {
                        return e < 10 ? "0" + e : e
                    }

                    function quote(e) {
                        escapable.lastIndex = 0;
                        return escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                            var t = meta[e];
                            return typeof t === "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                        }) + '"' : '"' + e + '"'
                    }

                    function str(e, t) {
                        var n, r, i, s, o = gap,
                            u, a = t[e];
                        if (a && typeof a === "object" && typeof a.toJSON === "function") {
                            a = a.toJSON(e)
                        }
                        if (typeof rep === "function") {
                            a = rep.call(t, e, a)
                        }
                        switch (typeof a) {
                            case "string":
                                return quote(a);
                            case "number":
                                return isFinite(a) ? String(a) : "null";
                            case "boolean":
                            case "null":
                                return String(a);
                            case "object":
                                if (!a) {
                                    return "null"
                                }
                                gap += indent;
                                u = [];
                                if (Object.prototype.toString.apply(a) === "[object Array]") {
                                    s = a.length;
                                    for (n = 0; n < s; n += 1) {
                                        u[n] = str(n, a) || "null"
                                    }
                                    i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]";
                                    gap = o;
                                    return i
                                }
                                if (rep && typeof rep === "object") {
                                    s = rep.length;
                                    for (n = 0; n < s; n += 1) {
                                        if (typeof rep[n] === "string") {
                                            r = rep[n];
                                            i = str(r, a);
                                            if (i) {
                                                u.push(quote(r) + (gap ? ": " : ":") + i)
                                            }
                                        }
                                    }
                                } else {
                                    for (r in a) {
                                        if (Object.prototype.hasOwnProperty.call(a, r)) {
                                            i = str(r, a);
                                            if (i) {
                                                u.push(quote(r) + (gap ? ": " : ":") + i)
                                            }
                                        }
                                    }
                                }
                                i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}";
                                gap = o;
                                return i
                        }
                    }
                    if (typeof Date.prototype.toJSON !== "function") {
                        Date.prototype.toJSON = function() {
                            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
                        };
                        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
                            return this.valueOf()
                        }
                    }
                    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                        gap, indent, meta = {
                            "\b": "\\b",
                            "    ": "\\t",
                            "\n": "\\n",
                            "\f": "\\f",
                            "\r": "\\r",
                            '"': '\\"',
                            "\\": "\\\\"
                        }, rep;
                    if (typeof JSON.stringify !== "function") {
                        JSON.stringify = function(e, t, n) {
                            var r;
                            gap = "";
                            indent = "";
                            if (typeof n === "number") {
                                for (r = 0; r < n; r += 1) {
                                    indent += " "
                                }
                            } else if (typeof n === "string") {
                                indent = n
                            }
                            rep = t;
                            if (t && typeof t !== "function" && (typeof t !== "object" || typeof t.length !== "number")) {
                                throw new Error("JSON.stringify")
                            }
                            return str("", {
                                "": e
                            })
                        }
                    }
                    if (typeof JSON.parse !== "function") {
                        JSON.parse = function(text, reviver) {
                            function walk(e, t) {
                                var n, r, i = e[t];
                                if (i && typeof i === "object") {
                                    for (n in i) {
                                        if (Object.prototype.hasOwnProperty.call(i, n)) {
                                            r = walk(i, n);
                                            if (r !== undefined) {
                                                i[n] = r
                                            } else {
                                                delete i[n]
                                            }
                                        }
                                    }
                                }
                                return reviver.call(e, t, i)
                            }
                            var j;
                            text = String(text);
                            cx.lastIndex = 0;
                            if (cx.test(text)) {
                                text = text.replace(cx, function(e) {
                                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                                })
                            }
                            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                                j = eval("(" + text + ")");
                                return typeof reviver === "function" ? walk({
                                    "": j
                                }, "") : j
                            }
                            throw new SyntaxError("JSON.parse")
                        }
                    }
                })()
            }
            var obj = this,
                images = [],
                domimages = [],
                cssimages = [];
            obj.each(function() {
                if ($(this).attr("src") != undefined) {
                    if ($(this).attr("src").split(".").pop() == "svg") {
                        $obj = $(this);
                        var e = new Image;
                        e.src = $(this).attr("src");
                        images.push(e.src);
                        domimages.push($obj);
                        if (options.preloader != false) {
                            preloaderTimer.push(setTimeout(function() {
                                $obj.attr("src", options.preloader)
                            }, 500))
                        }
                    }
                }
            });
            if (options.backgroundimage) {
                obj.each(function() {
                    if ($(this).css("background-image") != "none" && $(this).css("background-image") != undefined) {
                        var e = $(this).css("background-image").replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
                        if (e.split(".").pop() == "svg") {
                            var t = new Image;
                            t.src = e;
                            images.push(t.src);
                            cssimages.push($(this))
                        }
                    }
                })
            }
            var data = {
                svgsources: images,
                secure: options.secure,
                dumpcache: options.dumpcache
            };
            if (images.length > 0) {
                var i = 0;
                $.ajax({
                    dataType: "jsonp",
                    url: "http://svgmagic.bitlabs.nl/converter.php",
                    data: data,
                    success: function(e) {
                        var t;
                        for (t = 0; t < domimages.length; t++) {
                            clearTimeout(preloaderTimer[t]);
                            domimages[t].attr("src", e.results[t].url)
                        }
                        if (options.backgroundimage) {
                            for (t; t < domimages.length + cssimages.length; t++) {
                                var n = t - domimages.length;
                                cssimages[n].css("background-image", 'url("' + e.results[t].url + '")')
                            }
                        }
                        if (options.callback) {
                            options.callback()
                        }
                    }
                })
            }
        }
    }
})(jQuery)
