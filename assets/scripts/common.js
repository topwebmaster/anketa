(function (e, s, g, q, u) {
    var t = 0, p = function () {
        var a = q.userAgent, b = /msie\s\d+/i;
        return 0 < a.search(b) && (a = b.exec(a).toString(), a = a.split(" ")[1], 9 > a) ? (e("html").addClass("lt-ie9"), !0) : !1
    }(), l = "ontouchstart"in g || 0 < q.msMaxTouchPoints;
    Function.prototype.bind || (Function.prototype.bind = function (a) {
        var b = this, c = [].slice;
        if ("function" != typeof b)throw new TypeError;
        var d = c.call(arguments, 1), h = function () {
            if (this instanceof h) {
                var f = function () {
                };
                f.prototype = b.prototype;
                var f = new f, k = b.apply(f, d.concat(c.call(arguments)));
                return Object(k) === k ? k : f
            }
            return b.apply(a, d.concat(c.call(arguments)))
        };
        return h
    });
    var r = function (a, b, c) {
        this.VERSION = "2.0.2";
        this.input = a;
        this.plugin_count = c;
        this.old_to = this.old_from = this.calc_count = this.current_plugin = 0;
        this.raf_id = null;
        this.is_update = this.is_key = this.force_redraw = this.dragging = !1;
        this.is_start = !0;
        this.is_click = this.is_resize = this.is_active = !1;
        this.$cache = {
            win: e(g),
            body: e(s.body),
            input: e(a),
            cont: null,
            rs: null,
            min: null,
            max: null,
            from: null,
            to: null,
            single: null,
            bar: null,
            line: null,
            s_single: null,
            s_from: null,
            s_to: null,
            shad_single: null,
            shad_from: null,
            shad_to: null,
            grid: null,
            grid_labels: []
        };
        a = this.$cache.input;
        a = {
            type: a.data("type"),
            min: a.data("min"),
            max: a.data("max"),
            from: a.data("from"),
            to: a.data("to"),
            step: a.data("step"),
            min_interval: a.data("minInterval"),
            max_interval: a.data("maxInterval"),
            drag_interval: a.data("dragInterval"),
            values: a.data("values"),
            from_fixed: a.data("fromFixed"),
            from_min: a.data("fromMin"),
            from_max: a.data("fromMax"),
            from_shadow: a.data("fromShadow"),
            to_fixed: a.data("toFixed"),
            to_min: a.data("toMin"),
            to_max: a.data("toMax"),
            to_shadow: a.data("toShadow"),
            prettify_enabled: a.data("prettifyEnabled"),
            prettify_separator: a.data("prettifySeparator"),
            force_edges: a.data("forceEdges"),
            keyboard: a.data("keyboard"),
            keyboard_step: a.data("keyboardStep"),
            grid: a.data("grid"),
            grid_margin: a.data("gridMargin"),
            grid_num: a.data("gridNum"),
            grid_snap: a.data("gridSnap"),
            hide_min_max: a.data("hideMinMax"),
            hide_from_to: a.data("hideFromTo"),
            prefix: a.data("prefix"),
            postfix: a.data("postfix"),
            max_postfix: a.data("maxPostfix"),
            decorate_both: a.data("decorateBoth"),
            values_separator: a.data("valuesSeparator"),
            disable: a.data("disable")
        };
        a.values = a.values && a.values.split(",");
        b = e.extend(a, b);
        this.options = e.extend({
            type: "single",
            min: 10,
            max: 100,
            from: null,
            to: null,
            step: 1,
            min_interval: 0,
            max_interval: 0,
            drag_interval: !1,
            values: [],
            p_values: [],
            from_fixed: !1,
            from_min: null,
            from_max: null,
            from_shadow: !1,
            to_fixed: !1,
            to_min: null,
            to_max: null,
            to_shadow: !1,
            prettify_enabled: !0,
            prettify_separator: " ",
            prettify: null,
            force_edges: !1,
            keyboard: !1,
            keyboard_step: 5,
            grid: !1,
            grid_margin: !0,
            grid_num: 4,
            grid_snap: !1,
            hide_min_max: !1,
            hide_from_to: !1,
            prefix: "",
            postfix: "",
            max_postfix: "",
            decorate_both: !0,
            values_separator: " \u2014 ",
            disable: !1,
            onStart: null,
            onChange: null,
            onFinish: null,
            onUpdate: null
        }, b);
        this.validate();
        this.result = {
            input: this.$cache.input,
            slider: null,
            min: this.options.min,
            max: this.options.max,
            from: this.options.from,
            from_percent: 0,
            from_value: null,
            to: this.options.to,
            to_percent: 0,
            to_value: null
        };
        this.coords = {
            x_gap: 0,
            x_pointer: 0,
            w_rs: 0,
            w_rs_old: 0,
            w_handle: 0,
            p_gap: 0,
            p_gap_left: 0,
            p_gap_right: 0,
            p_step: 0,
            p_pointer: 0,
            p_handle: 0,
            p_single: 0,
            p_single_real: 0,
            p_from: 0,
            p_from_real: 0,
            p_to: 0,
            p_to_real: 0,
            p_bar_x: 0,
            p_bar_w: 0,
            grid_gap: 0,
            big_num: 0,
            big: [],
            big_w: [],
            big_p: [],
            big_x: []
        };
        this.labels = {
            w_min: 0,
            w_max: 0,
            w_from: 0,
            w_to: 0,
            w_single: 0,
            p_min: 0,
            p_max: 0,
            p_from: 0,
            p_from_left: 0,
            p_to: 0,
            p_to_left: 0,
            p_single: 0,
            p_single_left: 0
        };
        this.init()
    };
    r.prototype = {
        init: function (a) {
            this.coords.p_step = this.options.step / ((this.options.max - this.options.min) / 100);
            this.target = "base";
            this.toggleInput();
            this.append();
            this.setMinMax();
            if (a) {
                if (this.force_redraw = !0, this.calc(!0), this.options.onUpdate && "function" === typeof this.options.onUpdate)this.options.onUpdate(this.result)
            } else if (this.force_redraw = !0, this.calc(!0), this.options.onStart && "function" === typeof this.options.onStart)this.options.onStart(this.result);
            this.updateScene();
            this.raf_id = requestAnimationFrame(this.updateScene.bind(this))
        }, append: function () {
            this.$cache.input.before('<span class="irs js-irs-' + this.plugin_count + '"></span>');
            this.$cache.input.prop("readonly",
                !0);
            this.$cache.cont = this.$cache.input.prev();
            this.result.slider = this.$cache.cont;
            this.$cache.cont.html('<span class="irs"><span class="irs-line" tabindex="-1"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span><span class="irs-bar"></span>');
            this.$cache.rs =
                this.$cache.cont.find(".irs");
            this.$cache.min = this.$cache.cont.find(".irs-min");
            this.$cache.max = this.$cache.cont.find(".irs-max");
            this.$cache.from = this.$cache.cont.find(".irs-from");
            this.$cache.to = this.$cache.cont.find(".irs-to");
            this.$cache.single = this.$cache.cont.find(".irs-single");
            this.$cache.bar = this.$cache.cont.find(".irs-bar");
            this.$cache.line = this.$cache.cont.find(".irs-line");
            this.$cache.grid = this.$cache.cont.find(".irs-grid");
            "single" === this.options.type ? (this.$cache.cont.append('<span class="irs-bar-edge"></span><span class="irs-shadow shadow-single"></span><span class="irs-slider single"></span>'),
                this.$cache.s_single = this.$cache.cont.find(".single"), this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.shad_single = this.$cache.cont.find(".shadow-single")) : (this.$cache.cont.append('<span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-slider from"></span><span class="irs-slider to"></span>'), this.$cache.s_from = this.$cache.cont.find(".from"), this.$cache.s_to = this.$cache.cont.find(".to"), this.$cache.shad_from =
                this.$cache.cont.find(".shadow-from"), this.$cache.shad_to = this.$cache.cont.find(".shadow-to"));
            this.options.hide_from_to && (this.$cache.from[0].style.display = "none", this.$cache.to[0].style.display = "none", this.$cache.single[0].style.display = "none");
            this.appendGrid();
            this.options.disable ? this.appendDisableMask() : (this.$cache.cont.removeClass("irs-disabled"), this.bindEvents())
        }, appendDisableMask: function () {
            this.$cache.cont.append('<span class="irs-disable-mask"></span>');
            this.$cache.cont.addClass("irs-disabled")
        },
        remove: function () {
            this.$cache.cont.remove();
            this.$cache.cont = null;
            this.$cache.line.off("keydown.irs_" + this.plugin_count);
            l ? (this.$cache.body.off("touchmove.irs_" + this.plugin_count), this.$cache.win.off("touchend.irs_" + this.plugin_count)) : (this.$cache.body.off("mousemove.irs_" + this.plugin_count), this.$cache.win.off("mouseup.irs_" + this.plugin_count), p && (this.$cache.body.off("mouseup.irs_" + this.plugin_count), this.$cache.body.off("mouseleave.irs_" + this.plugin_count)));
            this.$cache.grid_labels = [];
            this.coords.big =
                [];
            this.coords.big_w = [];
            this.coords.big_p = [];
            this.coords.big_x = [];
            cancelAnimationFrame(this.raf_id)
        }, bindEvents: function () {
            if (l) {
                this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this));
                this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this));
                this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                if (this.options.drag_interval && "double" === this.options.type)this.$cache.bar.on("touchstart.irs_" + this.plugin_count,
                    this.pointerDown.bind(this, "both")); else this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                "single" === this.options.type ? (this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))) : (this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_to.on("touchstart.irs_" + this.plugin_count,
                    this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")))
            } else {
                if (this.options.keyboard)this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard"));
                this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this));
                this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));
                p && (this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this)));
                this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                if (this.options.drag_interval && "double" === this.options.type)this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both")); else this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                "single" === this.options.type ? (this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))) : (this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")),
                    this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")))
            }
        }, pointerMove: function (a) {
            this.dragging && (this.coords.x_pointer = (l ? a.originalEvent.touches[0] : a).pageX - this.coords.x_gap, this.calc())
        }, pointerUp: function (a) {
            if (this.current_plugin === this.plugin_count && this.is_active) {
                this.is_active = !1;
                var b = this.options.onFinish && "function" === typeof this.options.onFinish;
                a = e.contains(this.$cache.cont[0], a.target) || this.dragging;
                if (b && a)this.options.onFinish(this.result);
                this.force_redraw = !0;
                this.dragging = !1;
                p && e("*").prop("unselectable", !1)
            }
        }, pointerDown: function (a, b) {
            b.preventDefault();
            var c = l ? b.originalEvent.touches[0] : b;
            if (2 !== b.button) {
                this.current_plugin = this.plugin_count;
                this.target = a;
                this.dragging = this.is_active = !0;
                this.coords.x_gap = this.$cache.rs.offset().left;
                this.coords.x_pointer = c.pageX - this.coords.x_gap;
                this.calcPointer();
                switch (a) {
                    case "single":
                        this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single);
                        break;
                    case "from":
                        this.coords.p_gap =
                            this.toFixed(this.coords.p_pointer - this.coords.p_from);
                        this.$cache.s_from.addClass("type_last");
                        this.$cache.s_to.removeClass("type_last");
                        break;
                    case "to":
                        this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to);
                        this.$cache.s_to.addClass("type_last");
                        this.$cache.s_from.removeClass("type_last");
                        break;
                    case "both":
                        this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from), this.coords.p_gap_right = this.toFixed(this.coords.p_to - this.coords.p_pointer), this.$cache.s_to.removeClass("type_last"),
                            this.$cache.s_from.removeClass("type_last")
                }
                p && e("*").prop("unselectable", !0);
                this.$cache.line.trigger("focus")
            }
        }, pointerClick: function (a, b) {
            b.preventDefault();
            var c = l ? b.originalEvent.touches[0] : b;
            2 !== b.button && (this.current_plugin = this.plugin_count, this.target = a, this.is_click = !0, this.coords.x_gap = this.$cache.rs.offset().left, this.coords.x_pointer = +(c.pageX - this.coords.x_gap).toFixed(), this.force_redraw = !0, this.calc(), this.$cache.line.trigger("focus"))
        }, key: function (a, b) {
            if (!(this.current_plugin !==
                this.plugin_count || b.altKey || b.ctrlKey || b.shiftKey || b.metaKey)) {
                switch (b.which) {
                    case 83:
                    case 65:
                    case 40:
                    case 37:
                        b.preventDefault();
                        this.moveByKey(!1);
                        break;
                    case 87:
                    case 68:
                    case 38:
                    case 39:
                        b.preventDefault(), this.moveByKey(!0)
                }
                return !0
            }
        }, moveByKey: function (a) {
            var b = this.coords.p_pointer, b = a ? b + this.options.keyboard_step : b - this.options.keyboard_step;
            this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * b);
            this.is_key = !0;
            this.calc()
        }, setMinMax: function () {
            this.options.hide_min_max ? (this.$cache.min[0].style.display =
                "none", this.$cache.max[0].style.display = "none") : (this.options.values.length ? (this.$cache.min.html(this.decorate(this.options.p_values[this.options.min])), this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]))) : (this.$cache.min.html(this.decorate(this._prettify(this.options.min), this.options.min)), this.$cache.max.html(this.decorate(this._prettify(this.options.max), this.options.max))), this.labels.w_min = this.$cache.min.outerWidth(!1), this.labels.w_max = this.$cache.max.outerWidth(!1))
        },
        calc: function (a) {
            this.calc_count++;
            if (10 === this.calc_count || a)this.calc_count = 0, this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.coords.w_handle = "single" === this.options.type ? this.$cache.s_single.outerWidth(!1) : this.$cache.s_from.outerWidth(!1);
            if (this.coords.w_rs) {
                this.calcPointer();
                this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100);
                a = 100 - this.coords.p_handle;
                var b = this.toFixed(this.coords.p_pointer - this.coords.p_gap);
                "click" === this.target && (b = this.toFixed(this.coords.p_pointer -
                this.coords.p_handle / 2), this.target = this.chooseHandle(b));
                0 > b ? b = 0 : b > a && (b = a);
                switch (this.target) {
                    case "base":
                        b = (this.options.max - this.options.min) / 100;
                        a = (this.result.from - this.options.min) / b;
                        b = (this.result.to - this.options.min) / b;
                        this.coords.p_single_real = this.toFixed(a);
                        this.coords.p_from_real = this.toFixed(a);
                        this.coords.p_to_real = this.toFixed(b);
                        this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
                        this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real,
                            this.options.from_min, this.options.from_max);
                        this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                        this.coords.p_single = this.toFixed(a - this.coords.p_handle / 100 * a);
                        this.coords.p_from = this.toFixed(a - this.coords.p_handle / 100 * a);
                        this.coords.p_to = this.toFixed(b - this.coords.p_handle / 100 * b);
                        this.target = null;
                        break;
                    case "single":
                        if (this.options.from_fixed)break;
                        this.coords.p_single_real = this.calcWithStep(b / a * 100);
                        this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real,
                            this.options.from_min, this.options.from_max);
                        this.coords.p_single = this.toFixed(this.coords.p_single_real / 100 * a);
                        break;
                    case "from":
                        if (this.options.from_fixed)break;
                        this.coords.p_from_real = this.calcWithStep(b / a * 100);
                        this.coords.p_from_real > this.coords.p_to_real && (this.coords.p_from_real = this.coords.p_to_real);
                        this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                        this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real,
                            "from");
                        this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                        this.coords.p_from = this.toFixed(this.coords.p_from_real / 100 * a);
                        break;
                    case "to":
                        if (this.options.to_fixed)break;
                        this.coords.p_to_real = this.calcWithStep(b / a * 100);
                        this.coords.p_to_real < this.coords.p_from_real && (this.coords.p_to_real = this.coords.p_from_real);
                        this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                        this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real,
                            this.coords.p_from_real, "to");
                        this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                        this.coords.p_to = this.toFixed(this.coords.p_to_real / 100 * a);
                        break;
                    case "both":
                        b = this.toFixed(b + .1 * this.coords.p_handle), this.coords.p_from_real = this.calcWithStep((b - this.coords.p_gap_left) / a * 100), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real,
                            this.coords.p_to_real, "from"), this.coords.p_from = this.toFixed(this.coords.p_from_real / 100 * a), this.coords.p_to_real = this.calcWithStep((b + this.coords.p_gap_right) / a * 100), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to"), this.coords.p_to = this.toFixed(this.coords.p_to_real / 100 * a)
                }
                "single" === this.options.type ? (this.coords.p_bar_x = this.coords.p_handle / 2, this.coords.p_bar_w =
                    this.coords.p_single, this.result.from_percent = this.coords.p_single_real, this.result.from = this.calcReal(this.coords.p_single_real), this.options.values.length && (this.result.from_value = this.options.values[this.result.from])) : (this.coords.p_bar_x = this.toFixed(this.coords.p_from + this.coords.p_handle / 2), this.coords.p_bar_w = this.toFixed(this.coords.p_to - this.coords.p_from), this.result.from_percent = this.coords.p_from_real, this.result.from = this.calcReal(this.coords.p_from_real), this.result.to_percent = this.coords.p_to_real,
                    this.result.to = this.calcReal(this.coords.p_to_real), this.options.values.length && (this.result.from_value = this.options.values[this.result.from], this.result.to_value = this.options.values[this.result.to]));
                this.calcMinMax();
                this.calcLabels()
            }
        }, calcPointer: function () {
            this.coords.w_rs ? (0 > this.coords.x_pointer ? this.coords.x_pointer = 0 : this.coords.x_pointer > this.coords.w_rs && (this.coords.x_pointer = this.coords.w_rs), this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100)) : this.coords.p_pointer =
                0
        }, chooseHandle: function (a) {
            return "single" === this.options.type ? "single" : a >= this.coords.p_from_real + (this.coords.p_to_real - this.coords.p_from_real) / 2 ? "to" : "from"
        }, calcMinMax: function () {
            this.coords.w_rs && (this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100, this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100)
        }, calcLabels: function () {
            this.coords.w_rs && !this.options.hide_from_to && ("single" === this.options.type ? (this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single = this.labels.w_single /
            this.coords.w_rs * 100, this.labels.p_single_left = this.coords.p_single + this.coords.p_handle / 2 - this.labels.p_single / 2) : (this.labels.w_from = this.$cache.from.outerWidth(!1), this.labels.p_from = this.labels.w_from / this.coords.w_rs * 100, this.labels.p_from_left = this.coords.p_from + this.coords.p_handle / 2 - this.labels.p_from / 2, this.labels.p_from_left = this.toFixed(this.labels.p_from_left), this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from), this.labels.w_to = this.$cache.to.outerWidth(!1),
                this.labels.p_to = this.labels.w_to / this.coords.w_rs * 100, this.labels.p_to_left = this.coords.p_to + this.coords.p_handle / 2 - this.labels.p_to / 2, this.labels.p_to_left = this.toFixed(this.labels.p_to_left), this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to), this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single = this.labels.w_single / this.coords.w_rs * 100, this.labels.p_single_left = (this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to) / 2 - this.labels.p_single /
            2, this.labels.p_single_left = this.toFixed(this.labels.p_single_left)), this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single))
        }, updateScene: function () {
            this.drawHandles();
            this.raf_id = requestAnimationFrame(this.updateScene.bind(this))
        }, drawHandles: function () {
            this.coords.w_rs = this.$cache.rs.outerWidth(!1);
            this.coords.w_rs !== this.coords.w_rs_old && (this.target = "base", this.is_resize = !0);
            if (this.coords.w_rs !== this.coords.w_rs_old || this.force_redraw)this.setMinMax(), this.calc(!0),
                this.drawLabels(), this.options.grid && (this.calcGridMargin(), this.calcGridLabels()), this.force_redraw = !0, this.coords.w_rs_old = this.coords.w_rs, this.drawShadow();
            if (this.coords.w_rs && (this.dragging || this.force_redraw || this.is_key)) {
                if (this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) {
                    this.drawLabels();
                    this.$cache.bar[0].style.left = this.coords.p_bar_x + "%";
                    this.$cache.bar[0].style.width = this.coords.p_bar_w + "%";
                    if ("single" === this.options.type)this.$cache.s_single[0].style.left =
                        this.coords.p_single + "%", this.$cache.single[0].style.left = this.labels.p_single_left + "%", this.options.values.length ? (this.$cache.input.prop("value", this.result.from_value), this.$cache.input.data("from", this.result.from_value)) : (this.$cache.input.prop("value", this.result.from), this.$cache.input.data("from", this.result.from)); else {
                        this.$cache.s_from[0].style.left = this.coords.p_from + "%";
                        this.$cache.s_to[0].style.left = this.coords.p_to + "%";
                        if (this.old_from !== this.result.from || this.force_redraw)this.$cache.from[0].style.left =
                            this.labels.p_from_left + "%";
                        if (this.old_to !== this.result.to || this.force_redraw)this.$cache.to[0].style.left = this.labels.p_to_left + "%";
                        this.$cache.single[0].style.left = this.labels.p_single_left + "%";
                        this.options.values.length ? (this.$cache.input.prop("value", this.result.from_value + ";" + this.result.to_value), this.$cache.input.data("from", this.result.from_value), this.$cache.input.data("to", this.result.to_value)) : (this.$cache.input.prop("value", this.result.from + ";" + this.result.to), this.$cache.input.data("from",
                            this.result.from), this.$cache.input.data("to", this.result.to))
                    }
                    this.old_from === this.result.from && this.old_to === this.result.to || this.is_start || this.$cache.input.trigger("change");
                    this.old_from = this.result.from;
                    this.old_to = this.result.to;
                    if (this.options.onChange && "function" === typeof this.options.onChange && !this.is_resize && !this.is_update && !this.is_start)this.options.onChange(this.result);
                    if (this.options.onFinish && "function" === typeof this.options.onFinish && (this.is_key || this.is_click))this.options.onFinish(this.result);
                    this.is_resize = this.is_update = !1
                }
                this.force_redraw = this.is_click = this.is_key = this.is_start = !1
            }
        }, drawLabels: function () {
            var a = this.options.values.length, b = this.options.p_values, c;
            if (!this.options.hide_from_to)if ("single" === this.options.type)a = a ? this.decorate(b[this.result.from]) : this.decorate(this._prettify(this.result.from), this.result.from), this.$cache.single.html(a), this.calcLabels(), this.$cache.min[0].style.visibility = this.labels.p_single_left < this.labels.p_min + 1 ? "hidden" : "visible", this.$cache.max[0].style.visibility =
                this.labels.p_single_left + this.labels.p_single > 100 - this.labels.p_max - 1 ? "hidden" : "visible"; else {
                a ? (this.options.decorate_both ? (a = this.decorate(b[this.result.from]), a += this.options.values_separator, a += this.decorate(b[this.result.to])) : a = this.decorate(b[this.result.from] + this.options.values_separator + b[this.result.to]), c = this.decorate(b[this.result.from]), b = this.decorate(b[this.result.to])) : (this.options.decorate_both ? (a = this.decorate(this._prettify(this.result.from)), a += this.options.values_separator,
                    a += this.decorate(this._prettify(this.result.to))) : a = this.decorate(this._prettify(this.result.from) + this.options.values_separator + this._prettify(this.result.to), this.result.from), c = this.decorate(this._prettify(this.result.from), this.result.from), b = this.decorate(this._prettify(this.result.to), this.result.to));
                this.$cache.single.html(a);
                this.$cache.from.html(c);
                this.$cache.to.html(b);
                this.calcLabels();
                b = Math.min(this.labels.p_single_left, this.labels.p_from_left);
                a = this.labels.p_single_left + this.labels.p_single;
                c = this.labels.p_to_left + this.labels.p_to;
                var d = Math.max(a, c);
                this.labels.p_from_left + this.labels.p_from >= this.labels.p_to_left ? (this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "hidden", this.result.from === this.result.to ? (this.$cache.from[0].style.visibility = "visible", this.$cache.single[0].style.visibility = "hidden", d = c) : (this.$cache.from[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", d = Math.max(a,
                    c))) : (this.$cache.from[0].style.visibility = "visible", this.$cache.to[0].style.visibility = "visible", this.$cache.single[0].style.visibility = "hidden");
                this.$cache.min[0].style.visibility = b < this.labels.p_min + 1 ? "hidden" : "visible";
                this.$cache.max[0].style.visibility = d > 100 - this.labels.p_max - 1 ? "hidden" : "visible"
            }
        }, drawShadow: function () {
            var a = this.options, b = this.$cache, c, d;
            "single" === a.type ? a.from_shadow && (a.from_min || a.from_max) ? (c = this.calcPercent(a.from_min || a.min), d = this.calcPercent(a.from_max || a.max) -
            c, c = this.toFixed(c - this.coords.p_handle / 100 * c), d = this.toFixed(d - this.coords.p_handle / 100 * d), c += this.coords.p_handle / 2, b.shad_single[0].style.display = "block", b.shad_single[0].style.left = c + "%", b.shad_single[0].style.width = d + "%") : b.shad_single[0].style.display = "none" : (a.from_shadow && (a.from_min || a.from_max) ? (c = this.calcPercent(a.from_min || a.min), d = this.calcPercent(a.from_max || a.max) - c, c = this.toFixed(c - this.coords.p_handle / 100 * c), d = this.toFixed(d - this.coords.p_handle / 100 * d), c += this.coords.p_handle / 2,
                b.shad_from[0].style.display = "block", b.shad_from[0].style.left = c + "%", b.shad_from[0].style.width = d + "%") : b.shad_from[0].style.display = "none", a.to_shadow && (a.to_min || a.to_max) ? (c = this.calcPercent(a.to_min || a.min), a = this.calcPercent(a.to_max || a.max) - c, c = this.toFixed(c - this.coords.p_handle / 100 * c), a = this.toFixed(a - this.coords.p_handle / 100 * a), c += this.coords.p_handle / 2, b.shad_to[0].style.display = "block", b.shad_to[0].style.left = c + "%", b.shad_to[0].style.width = a + "%") : b.shad_to[0].style.display = "none")
        }, toggleInput: function () {
            this.$cache.input.toggleClass("irs-hidden-input")
        },
        calcPercent: function (a) {
            return this.toFixed((a - this.options.min) / ((this.options.max - this.options.min) / 100))
        }, calcReal: function (a) {
            var b = this.options.min, c = this.options.max, d = 0;
            0 > b && (d = Math.abs(b), b += d, c += d);
            a = (c - b) / 100 * a + b;
            (b = this.options.step.toString().split(".")[1]) ? a = +a.toFixed(b.length) : (a /= this.options.step, a *= this.options.step, a = +a.toFixed(0));
            d && (a -= d);
            a < this.options.min ? a = this.options.min : a > this.options.max && (a = this.options.max);
            return b ? +a.toFixed(b.length) : this.toFixed(a)
        }, calcWithStep: function (a) {
            var b =
                Math.round(a / this.coords.p_step) * this.coords.p_step;
            100 < b && (b = 100);
            100 === a && (b = 100);
            return this.toFixed(b)
        }, checkMinInterval: function (a, b, c) {
            var d = this.options;
            if (!d.min_interval)return a;
            a = this.calcReal(a);
            b = this.calcReal(b);
            "from" === c ? b - a < d.min_interval && (a = b - d.min_interval) : a - b < d.min_interval && (a = b + d.min_interval);
            return this.calcPercent(a)
        }, checkMaxInterval: function (a, b, c) {
            var d = this.options;
            if (!d.max_interval)return a;
            a = this.calcReal(a);
            b = this.calcReal(b);
            "from" === c ? b - a > d.max_interval && (a = b -
            d.max_interval) : a - b > d.max_interval && (a = b + d.max_interval);
            return this.calcPercent(a)
        }, checkDiapason: function (a, b, c) {
            a = this.calcReal(a);
            var d = this.options;
            b && "number" === typeof b || (b = d.min);
            c && "number" === typeof c || (c = d.max);
            a < b && (a = b);
            a > c && (a = c);
            return this.calcPercent(a)
        }, toFixed: function (a) {
            a = a.toFixed(5);
            return +a
        }, _prettify: function (a) {
            return this.options.prettify_enabled ? this.options.prettify && "function" === typeof this.options.prettify ? this.options.prettify(a) : this.prettify(a) : a
        }, prettify: function (a) {
            return a.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,
                "$1" + this.options.prettify_separator)
        }, checkEdges: function (a, b) {
            if (!this.options.force_edges)return this.toFixed(a);
            0 > a ? a = 0 : a > 100 - b && (a = 100 - b);
            return this.toFixed(a)
        }, validate: function () {
            var a = this.options, b = this.result, c = a.values, d = c.length, h, f;
            "string" === typeof a.min && (a.min = +a.min);
            "string" === typeof a.max && (a.max = +a.max);
            "string" === typeof a.from && (a.from = +a.from);
            "string" === typeof a.to && (a.to = +a.to);
            "string" === typeof a.step && (a.step = +a.step);
            "string" === typeof a.from_min && (a.from_min = +a.from_min);
            "string" === typeof a.from_max && (a.from_max = +a.from_max);
            "string" === typeof a.to_min && (a.to_min = +a.to_min);
            "string" === typeof a.to_max && (a.to_max = +a.to_max);
            "string" === typeof a.keyboard_step && (a.keyboard_step = +a.keyboard_step);
            "string" === typeof a.grid_num && (a.grid_num = +a.grid_num);
            a.max <= a.min && (a.max = a.min ? 2 * a.min : a.min + 1, a.step = 1);
            if (d)for (a.p_values = [], a.min = 0, a.max = d - 1, a.step = 1, a.grid_num = a.max, a.grid_snap = !0, f = 0; f < d; f++)h = +c[f], isNaN(h) ? h = c[f] : (c[f] = h, h = this._prettify(h)), a.p_values.push(h);
            if ("number" !== typeof a.from || isNaN(a.from))a.from = a.min;
            if ("number" !== typeof a.to || isNaN(a.from))a.to = a.max;
            if (a.from < a.min || a.from > a.max)a.from = a.min;
            if (a.to > a.max || a.to < a.min)a.to = a.max;
            "double" === a.type && a.from > a.to && (a.from = a.to);
            if ("number" !== typeof a.step || isNaN(a.step) || !a.step || 0 > a.step)a.step = 1;
            if ("number" !== typeof a.keyboard_step || isNaN(a.keyboard_step) || !a.keyboard_step || 0 > a.keyboard_step)a.keyboard_step = 5;
            a.from_min && a.from < a.from_min && (a.from = a.from_min);
            a.from_max && a.from > a.from_max && (a.from = a.from_max);
            a.to_min && a.to < a.to_min && (a.to = a.to_min);
            a.to_max && a.from > a.to_max && (a.to = a.to_max);
            if (b) {
                b.min !== a.min && (b.min = a.min);
                b.max !== a.max && (b.max = a.max);
                if (b.from < b.min || b.from > b.max)b.from = a.from;
                if (b.to < b.min || b.to > b.max)b.to = a.to
            }
            if ("number" !== typeof a.min_interval || isNaN(a.min_interval) || !a.min_interval || 0 > a.min_interval)a.min_interval = 0;
            if ("number" !== typeof a.max_interval || isNaN(a.max_interval) || !a.max_interval || 0 > a.max_interval)a.max_interval = 0;
            a.min_interval && a.min_interval > a.max - a.min && (a.min_interval =
                a.max - a.min);
            a.max_interval && a.max_interval > a.max - a.min && (a.max_interval = a.max - a.min)
        }, decorate: function (a, b) {
            var c = "", d = this.options;
            d.prefix && (c += d.prefix);
            c += a;
            d.max_postfix && (d.values.length && a === d.p_values[d.max] ? (c += d.max_postfix, d.postfix && (c += " ")) : b === d.max && (c += d.max_postfix, d.postfix && (c += " ")));
            d.postfix && (c += d.postfix);
            return c
        }, updateFrom: function () {
            this.result.from = this.options.from;
            this.result.from_percent = this.calcPercent(this.result.from);
            this.options.values && (this.result.from_value =
                this.options.values[this.result.from])
        }, updateTo: function () {
            this.result.to = this.options.to;
            this.result.to_percent = this.calcPercent(this.result.to);
            this.options.values && (this.result.to_value = this.options.values[this.result.to])
        }, updateResult: function () {
            this.result.min = this.options.min;
            this.result.max = this.options.max;
            this.updateFrom();
            this.updateTo()
        }, appendGrid: function () {
            if (this.options.grid) {
                var a = this.options, b, c;
                b = a.max - a.min;
                var d = a.grid_num, h = 0, f = 0, k = 4, e, g, m = 0, n = "";
                this.calcGridMargin();
                a.grid_snap ?
                    (d = b / a.step, h = this.toFixed(a.step / (b / 100))) : h = this.toFixed(100 / d);
                4 < d && (k = 3);
                7 < d && (k = 2);
                14 < d && (k = 1);
                28 < d && (k = 0);
                for (b = 0; b < d + 1; b++) {
                    e = k;
                    f = this.toFixed(h * b);
                    100 < f && (f = 100, e -= 2, 0 > e && (e = 0));
                    this.coords.big[b] = f;
                    g = (f - h * (b - 1)) / (e + 1);
                    for (c = 1; c <= e && 0 !== f; c++)m = this.toFixed(f - g * c), n += '<span class="irs-grid-pol small" style="left: ' + m + '%"></span>';
                    n += '<span class="irs-grid-pol" style="left: ' + f + '%"></span>';
                    m = this.calcReal(f);
                    m = a.values.length ? a.p_values[m] : this._prettify(m);
                    n += '<span class="irs-grid-text js-grid-text-' +
                    b + '" style="left: ' + f + '%">' + m + "</span>"
                }
                this.coords.big_num = Math.ceil(d + 1);
                this.$cache.cont.addClass("irs-with-grid");
                this.$cache.grid.html(n);
                this.cacheGridLabels()
            }
        }, cacheGridLabels: function () {
            var a, b, c = this.coords.big_num;
            for (b = 0; b < c; b++)a = this.$cache.grid.find(".js-grid-text-" + b), this.$cache.grid_labels.push(a);
            this.calcGridLabels()
        }, calcGridLabels: function () {
            var a, b;
            b = [];
            var c = [], d = this.coords.big_num;
            for (a = 0; a < d; a++)this.coords.big_w[a] = this.$cache.grid_labels[a].outerWidth(!1), this.coords.big_p[a] =
                this.toFixed(this.coords.big_w[a] / this.coords.w_rs * 100), this.coords.big_x[a] = this.toFixed(this.coords.big_p[a] / 2), b[a] = this.toFixed(this.coords.big[a] - this.coords.big_x[a]), c[a] = this.toFixed(b[a] + this.coords.big_p[a]);
            this.options.force_edges && (b[0] < this.coords.grid_gap && (b[0] = this.coords.grid_gap, c[0] = this.toFixed(b[0] + this.coords.big_p[0]), this.coords.big_x[0] = this.coords.grid_gap), c[d - 1] > 100 - this.coords.grid_gap && (c[d - 1] = 100 - this.coords.grid_gap, b[d - 1] = this.toFixed(c[d - 1] - this.coords.big_p[d - 1]),
                this.coords.big_x[d - 1] = this.toFixed(this.coords.big_p[d - 1] - this.coords.grid_gap)));
            this.calcGridCollision(2, b, c);
            this.calcGridCollision(4, b, c);
            for (a = 0; a < d; a++)b = this.$cache.grid_labels[a][0], b.style.marginLeft = -this.coords.big_x[a] + "%"
        }, calcGridCollision: function (a, b, c) {
            var d, e, f, g = this.coords.big_num;
            for (d = 0; d < g; d += a) {
                e = d + a / 2;
                if (e >= g)break;
                f = this.$cache.grid_labels[e][0];
                f.style.visibility = c[d] <= b[e] ? "visible" : "hidden"
            }
        }, calcGridMargin: function () {
            this.options.grid_margin && (this.coords.w_rs = this.$cache.rs.outerWidth(!1),
            this.coords.w_rs && (this.coords.w_handle = "single" === this.options.type ? this.$cache.s_single.outerWidth(!1) : this.$cache.s_from.outerWidth(!1), this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100), this.coords.grid_gap = this.toFixed(this.coords.p_handle / 2 - .1), this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%", this.$cache.grid[0].style.left = this.coords.grid_gap + "%"))
        }, update: function (a) {
            this.is_update = !0;
            this.options = e.extend(this.options, a);
            this.validate();
            this.updateResult(a);
            this.toggleInput();
            this.remove();
            this.init(!0)
        }, reset: function () {
            this.updateResult();
            this.update()
        }, destroy: function () {
            this.toggleInput();
            this.$cache.input.prop("readonly", !1);
            e.data(this.input, "ionRangeSlider", null);
            this.remove();
            this.options = this.input = null
        }
    };
    e.fn.ionRangeSlider = function (a) {
        return this.each(function () {
            e.data(this, "ionRangeSlider") || e.data(this, "ionRangeSlider", new r(this, a, t++))
        })
    };
    (function () {
        for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !g.requestAnimationFrame; ++c)g.requestAnimationFrame =
            g[b[c] + "RequestAnimationFrame"], g.cancelAnimationFrame = g[b[c] + "CancelAnimationFrame"] || g[b[c] + "CancelRequestAnimationFrame"];
        g.requestAnimationFrame || (g.requestAnimationFrame = function (b, c) {
            var f = (new Date).getTime(), e = Math.max(0, 16 - (f - a)), l = g.setTimeout(function () {
                b(f + e)
            }, e);
            a = f + e;
            return l
        });
        g.cancelAnimationFrame || (g.cancelAnimationFrame = function (a) {
            clearTimeout(a)
        })
    })()
})(jQuery, document, window, navigator);
$(function () {

                $("#range").ionRangeSlider({
                    grid_snap:true,
                    from_shadow:true,
                    hide_from_to:true,
                    hide_min_max: true,
                    grid: true,
                    from: 2,
                    values: [
                        "Не умею", "Использую готовые решения","Использую готовые решения</br> и умею их переделывать", "Пишу сложные скрипты"
                    ]
                });

            });
// radio button

function radioYes() {
    var yes = document.getElementById('yes');
    var no = document.getElementById('no');
    yes.style.background='url("assets/images/yes.png") no-repeat';
    no.style.background='url("assets/images/no.png") no-repeat';
}
function radioNo() {
    var yes = document.getElementById('yes');
    var no = document.getElementById('no');
    no.style.background='url("assets/images/yes.png") no-repeat';
    yes.style.background='url("assets/images/no.png") no-repeat';
}

/*function checked(){
    var check = document.getElementById('check');
    check.style.background='url("assets/images/checked.png") no-repeat'


}*/


   

$(document).ready(function(){
$(function(){
    $("input:checkbox:checked").each(
        function(){
        $(this).next("label").addClass("LabelSelected");});//TODO при перезагрузке страницы нужно возвращать в исходное состояние, сейчас остаётся в выбранном состоянии
});

        $(".CheckBoxClass").on("click",function(){
            if($(this).is(":checked")){
                $(this).next("label").addClass("LabelSelected");
            }else{
                $(this).next("label").removeClass("LabelSelected");
            }
        });
    });
