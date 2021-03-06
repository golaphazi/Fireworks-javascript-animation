"use strict";

function CFirework(n, t, i, r, u) {
    fwTotal++;
    this.num = fwTotal;
    this.htmlContainerId = n.toLowerCase();
    this.htmlContainer = document.getElementById(n);
    this.fireColor = t;
    this.startX = i;
    this.startY = r;
    this.fwScale = typeof u != "undefined" ? u : 1;
    this.SVGcanvas = null;
    this.fwContainer = null;
    this.ascendingFireBall = null;
    this.sparks = null;
    this.fastExplosion = null;
    this.particles = null;
    this.shineColor = null;
    this.velX = 0;
    this.velY = -100;
    this.gravity = 40;
    this.timeBeforeExplosion = 1500;
    this.ascendingFireBallRadius = 14;
    this.firstExplosionRadius = 45;
    this.numExplosionParticles = 200;
    this.explosionParticleRadius = 2.5;
    this.explosionVelocity = 180;
    this.explosionDeceleration = .96;
    this.explosionParticlesMaxLifespan = 2e3;
    this.shineRadius = 60;
    this.shineExpansionTime = 800;
    this.shineFadeOutTime = 1100;
    this.useAudio = !1;
    this.audioURL = "Explosion_1.mp3";
    this.separation = 118;
    this.fwCenter = 132
}

function FireworkTimer(n, t, i, r, u, f, e, o) {
    var s = typeof f != "undefined" ? f : !1,
        h = typeof e != "undefined" ? e : 1,
        c = typeof o != "undefined" ? o : 0;
    setTimeout(function() {
        var u = new CFirework(n, t, i, r, h);
        u.useAudio = s;
        u.velX = c;
        u.start()
    }, u)
}
var fwSVGns = "http://www.w3.org/2000/svg",
    fwTotal = 0,
    fwActives = {},
    explosionSoundCreated = !1,
    explosionMP3 = null,
    fwText = "ldfeat1",
    fireworkFx;
CFirework.prototype.start = function() {
    function h() {
        s || (n.setSVGscale(n.ascendingFireBall, o[t][0], n.fwCenter, n.fwCenter), setTimeout(h, o[t][1]), t = t == o.length - 1 ? 0 : t + 1)
    }

    function a() {
        s = !0;
        n.fwContainer.removeChild(n.ascendingFireBall);
        clearInterval(c);
        n.explosion()
    }

    function v() {
        n.fwContainer.removeChild(n.particles);
        n.fwContainer.removeChild(n.shineColor);
        n.SVGcanvas.removeChild(n.fwContainer);
        fwActives[n.htmlContainerId] = Math.max(0, fwActives[n.htmlContainerId] - 1);
        fwActives[n.htmlContainerId] == 0 && n.htmlContainer.removeChild(n.SVGcanvas)
    }
    var r, i, u, f, e, c;
    fwActives[this.htmlContainerId] = fwActives.hasOwnProperty(this.htmlContainerId) ? fwActives[this.htmlContainerId] + 1 : 1;
    this.separation = Math.round(1.6 * (this.shineRadius + this.ascendingFireBallRadius));
    this.fwCenter = this.ascendingFireBallRadius + this.separation;
    r = this.htmlContainer.getElementsByClassName("fwSVGcanvas");
    r.length > 0 ? this.SVGcanvas = r[0] : (this.SVGcanvas = document.createElementNS(fwSVGns, "svg"), this.SVGcanvas.setAttributeNS(null, "class", "fwSVGcanvas"), this.SVGcanvas.setAttributeNS(null, "width", this.htmlContainer.offsetWidth), this.SVGcanvas.setAttributeNS(null, "height", this.htmlContainer.offsetHeight), this.SVGcanvas.setAttributeNS(null, "style", "display:block; position:absolute"), i = getComputedStyle(this.htmlContainer, null).position.toLowerCase(), i == "absolute" || i == "fixed" || i == "relative" ? (this.SVGcanvas.style.top = "0px", this.SVGcanvas.style.left = "0px") : (u = this.htmlContainer.getBoundingClientRect(), this.SVGcanvas.style.top = u.top + "px", this.SVGcanvas.style.left = u.left + "px"), this.htmlContainer.appendChild(this.SVGcanvas));
    document.getElementById(fwText) != null && (this.fwContainer = document.createElementNS(fwSVGns, "svg"), f = (this.separation + this.ascendingFireBallRadius) * this.fwScale, this.fwContainer.setAttributeNS(null, "x", this.startX - f), this.fwContainer.setAttributeNS(null, "y", this.startY - f), this.fwContainer.setAttributeNS(null, "width", this.separation * 2 * this.fwScale), this.fwContainer.setAttributeNS(null, "height", this.separation * 2 * this.fwScale));
    e = this.separation * 2;
    this.fwContainer.setAttributeNS(null, "viewBox", "0 0 " + e + " " + e);
    this.SVGcanvas.appendChild(this.fwContainer);
    this.useAudio && !explosionSoundCreated && (explosionMP3 = new Audio(this.audioURL), explosionSoundCreated = !0);
    this.createGradient(this.fwContainer, "bigFireGrad" + this.num, [{
        offset: "20%",
        style: "stop-color:#fff;stop-opacity:1"
    }, {
        offset: "45%",
        style: "stop-color:#" + this.fireColor + ";stop-opacity:0.6"
    }, {
        offset: "100%",
        style: "stop-color:#" + this.fireColor + ";stop-opacity:0"
    }]);
    this.createFilter(this.fwContainer, "sparklesGlow" + this.num, "FFFFFF", 2);
    this.createGradient(this.fwContainer, "explosionGrad" + this.num, [{
        offset: "0%",
        style: "stop-color:#fff;stop-opacity:1"
    }, {
        offset: "100%",
        style: "stop-color:#" + this.fireColor + ";stop-opacity:0"
    }]);
    this.createFilter(this.fwContainer, "particlesGlow" + this.num, this.fireColor, 4);
    this.createGradient(this.fwContainer, "backlightGrad" + this.num, [{
        offset: "20%",
        style: "stop-color:#" + this.fireColor + ";stop-opacity:0.3"
    }, {
        offset: "100%",
        style: "stop-color:#" + this.fireColor + ";stop-opacity:0"
    }]);
    this.ascendingFireBall = this.createSVG("circle", "bigFire", {
        cx: this.fwCenter,
        cy: this.fwCenter,
        r: this.ascendingFireBallRadius,
        stroke: "none",
        fill: "url(#bigFireGrad" + this.num + ")"
    });
    this.fwContainer.appendChild(this.ascendingFireBall);
    var l = this.timeBeforeExplosion + Math.max(this.explosionParticlesMaxLifespan, this.shineExpansionTime + this.shineFadeOutTime) + 100,
        y = this.projectileTween(this.fwContainer, l, v, this.gravity, this.velX, this.velY),
        n = this,
        s = !1,
        o = [
            [.85, 85],
            [.6, 30],
            [.85, 120],
            [1, 30]
        ],
        t = 0;
    h();
    this.sparks = document.createElementNS(fwSVGns, "svg");
    this.sparks.setAttributeNS(null, "filter", "url(#sparklesGlow" + this.num + ")");
    this.sparks.setAttributeNS(null, "x", this.separation);
    this.sparks.setAttributeNS(null, "y", this.separation);
    this.fwContainer.appendChild(this.sparks);
    c = setInterval(function() {
        CFirework.prototype.addSpark.call(n)
    }, 5);
    setTimeout(a, this.timeBeforeExplosion)
};
fireworkFx = "thead";
CFirework.prototype.createSVG = function(n, t, i) {
    var r, u;
    if (document.getElementById("zz" + fireworkFx) != null) {
        r = document.createElementNS(fwSVGns, n);
        t != null && r.setAttributeNS(null, "id", t);
        for (u in i) r.setAttributeNS(null, u, i[u]);
        return r
    }
};
CFirework.prototype.createGradient = function(n, t, i) {
    for (var e, r, u, o = this.createSVG("radialGradient", t, {
            cx: "50%",
            cy: "50%",
            r: "50%",
            fx: "50%",
            fy: "50%"
        }), f = 0; f < i.length; f++) {
        e = i[f];
        r = document.createElementNS(fwSVGns, "stop");
        for (u in e) r.hasAttribute(u) || r.setAttribute(u, e[u]);
        o.appendChild(r)
    }
    this.insertDef(n, o)
};
CFirework.prototype.createFilter = function(n, t, i, r) {
    var f = parseInt(i, 16),
        o = (f >> 16 & 255) / 255,
        s = (f >> 8 & 255) / 255,
        h = (f & 255) / 255,
        u = this.createSVG("filter", t, {}),
        l = this.createSVG("feColorMatrix", null, {
            type: "matrix",
            values: "0 0 0 " + o + " " + o + "  0 0 0 " + s + " " + s + "  0 0 0 " + h + " " + h + "  0 0 0 1 0"
        }),
        c;
    u.appendChild(l);
    c = this.createSVG("feGaussianBlur", null, {
        stdDeviation: r,
        result: "coloredBlur"
    });
    u.appendChild(c);
    var e = this.createSVG("feMerge", null, {}),
        a = this.createSVG("feMergeNode", null, {
            "in": "coloredBlur"
        }),
        v = this.createSVG("feMergeNode", null, {
            "in": "SourceGraphic"
        });
    e.appendChild(a);
    e.appendChild(v);
    u.appendChild(e);
    this.insertDef(n, u)
};
CFirework.prototype.insertDef = function(n, t) {
    var i = n.querySelector("defs") || n.insertBefore(document.createElementNS(fwSVGns, "defs"), n.firstChild);
    i.appendChild(t)
};
CFirework.prototype.addSpark = function() {
    function o() {
        n.removeChild(t)
    }
    var i = 400 + Math.random() * 800,
        r = this.velX + Math.random() * 20 - 10,
        u = Math.random() * 80 + 40,
        f = this.ascendingFireBallRadius + Math.random() * 3 - 1.5,
        e = this.ascendingFireBallRadius + Math.random() * 4,
        n = this.sparks,
        t = CFirework.prototype.createCircle.call(this, n, f, e, 1, "FFEEB8");
    this.projectileTween(t, i, o, 0, -r, u, 1, 0)
};
CFirework.prototype.explosion = function() {
    function f(t) {
        15 < t && t < 40 && n.setSVGscale(n.fastExplosion, 1.67, n.fwCenter, n.fwCenter);
        40 <= t && t < 65 && n.setSVGscale(n.fastExplosion, 1, n.fwCenter, n.fwCenter)
    }

    function a(t) {
        var i = Math.min(t / n.shineExpansionTime, 1),
            r = .9 + .7 * i * (2 - i);
        n.shineColor.setAttribute("r", r * n.shineRadius)
    }

    function v() {
        var t = n.animation(n.shineFadeOutTime, y, null)
    }

    function y(t) {
        var i = Math.min(t / n.shineFadeOutTime, 1),
            r = 1 - i * i;
        n.shineColor.setAttribute("fill-opacity", r)
    }
    var n = this,
        u, e, t, l;
    if (document.getElementById("lasttweet") == null) return !0;
    for (this.shineColor = this.createSVG("circle", "shineColor", {
            cx: this.fwCenter,
            cy: this.fwCenter,
            r: this.shineRadius,
            stroke: "none",
            fill: "url(#backlightGrad" + this.num + ")"
        }), this.fwContainer.appendChild(this.shineColor), this.fastExplosion = this.createSVG("circle", "explosion", {
            cx: this.fwCenter,
            cy: this.fwCenter,
            r: this.firstExplosionRadius,
            stroke: "none",
            fill: "url(#explosionGrad" + this.num + ")"
        }), this.fwContainer.appendChild(this.fastExplosion), u = this.animation(65, f, function() {
            n.fwContainer.removeChild(n.fastExplosion)
        }), this.particles = document.createElementNS(fwSVGns, "svg"), this.particles.setAttributeNS(null, "filter", "url(#particlesGlow" + this.num + ")"), e = this.particles, t = 0; t < this.numExplosionParticles; t++) var i = Math.pow(Math.random(), .3) * this.explosionVelocity,
        r = Math.random() * 2 * Math.PI,
        o = i * Math.sin(r),
        s = i * Math.cos(r),
        h = 50 + Math.random() * this.explosionParticlesMaxLifespan,
        c = this.createCircle(this.particles, this.fwCenter, this.fwCenter, this.explosionParticleRadius, "FFFFFF", this.fireColor),
        p = this.explosionParticleTween(c, h, this.explosionParticleRadius, this.explosionDeceleration, o, s);
    this.fwContainer.appendChild(this.particles);
    l = this.animation(this.shineExpansionTime, a, v);
    this.useAudio && (explosionMP3.currentTime = 0, explosionMP3.play())
};
CFirework.prototype.createCircle = function(n, t, i, r, u, f) {
    f = typeof f != "undefined" ? "#" + f : "none";
    var e = document.createElementNS(fwSVGns, "circle");
    return e.setAttributeNS(null, "cx", t), e.setAttributeNS(null, "cy", i), e.setAttributeNS(null, "r", r), e.setAttributeNS(null, "fill", "#" + u), e.setAttributeNS(null, "stroke", f), f != "none" && e.setAttributeNS(null, "stroke-width", .5), n.appendChild(e), e
};
CFirework.prototype.projectileTween = function(n, t, i, r, u, f, e, o) {
    function p(i) {
        var o, p, w, y;
        l = i - a;
        a = i;
        o = l / 1e3;
        f += r * o;
        p = s ? "cx" : "x";
        w = s ? "cy" : "y";
        h.increaseParameter(n, p, u * o);
        h.increaseParameter(n, w, f * o);
        c && (y = e + v * (i / t), s ? n.setAttribute("fill-opacity", y) : n.style.opacity = y)
    }
    var h, y;
    e = typeof e != "undefined" ? e : 1;
    o = typeof o != "undefined" ? o : 1;
    var c = e != o,
        v = o - e,
        l = 0,
        a = 0,
        s = n.nodeName != "svg";
    c && (s ? n.setAttribute("fill-opacity", e + "") : n.style.opacity = e);
    h = this;
    y = this.animation(t, p, i)
};
CFirework.prototype.explosionParticleTween = function(n, t, i, r, u, f) {
    function h(h) {
        var l, a, c;
        e = h - s;
        s = h;
        l = Math.pow(r, e / 17);
        u *= l;
        f *= l;
        a = e / 1e3;
        o.increaseParameter(n, "cx", u * a);
        o.increaseParameter(n, "cy", f * a);
        c = 1 - .9 * (h / t);
        c = Math.max(c, .01);
        n.setAttribute("r", c * i);
        n.setAttribute("stroke-width", .5 * c)
    }
    var o = this,
        e = 0,
        s = 0,
        c = this.animation(t, h, null)
};
CFirework.prototype.animation = function(n, t, i) {
    function u() {
        var e = (new Date).getTime(),
            f;
        r === null && (r = e);
        f = e - r;
        t(f);
        f < n ? setTimeout(u, 15) : i != null && i()
    }
    i = typeof i != "undefined" ? i : null;
    var r = null;
    u()
};
CFirework.prototype.increaseParameter = function(n, t, i) {
    n.setAttribute(t, parseFloat(n.getAttribute(t)) + i)
};
CFirework.prototype.setSVGscale = function(n, t, i, r) {
    n.setAttribute("transform", "scale(" + t + ")");
    n.setAttribute("cx", i + (1 - t) * i / t);
    n.setAttribute("cy", r + (1 - t) * r / t)
};