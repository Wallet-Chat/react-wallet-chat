import j from "react";
function ce(s) {
  const u = s.replace("https://", "").replace("http://", "").split("/"), p = u.length, h = u[p - 1].split("?")[0], l = u[p - 2];
  if (s.startsWith("looksrare.org"))
    return { itemId: h, contractAddress: l, network: "ethereum" };
  const f = u[p - 3];
  return p >= 5 ? { itemId: h, contractAddress: l, network: f } : s.startsWith("x2y2.io") && f === "eth" ? { itemId: h, contractAddress: l, network: "ethereum" } : { contractAddress: null, itemId: null, network: null };
}
const rn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseNftFromUrl: ce
}, Symbol.toStringTag, { value: "Module" })), en = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function ze(s) {
  if (s.__esModule)
    return s;
  var o = s.default;
  if (typeof o == "function") {
    var u = function p() {
      if (this instanceof p) {
        var h = [null];
        h.push.apply(h, arguments);
        var l = Function.bind.apply(o, h);
        return new l();
      }
      return o.apply(this, arguments);
    };
    u.prototype = o.prototype;
  } else
    u = {};
  return Object.defineProperty(u, "__esModule", { value: !0 }), Object.keys(s).forEach(function(p) {
    var h = Object.getOwnPropertyDescriptor(s, p);
    Object.defineProperty(u, p, h.get ? h : {
      enumerable: !0,
      get: function() {
        return s[p];
      }
    });
  }), u;
}
var Je = {}, Kr = {};
Kr.byteLength = Xe;
Kr.toByteArray = Qe;
Kr.fromByteArray = et;
var or = [], Q = [], Ge = typeof Uint8Array < "u" ? Uint8Array : Array, ue = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Er = 0, He = ue.length; Er < He; ++Er)
  or[Er] = ue[Er], Q[ue.charCodeAt(Er)] = Er;
Q["-".charCodeAt(0)] = 62;
Q["_".charCodeAt(0)] = 63;
function Ae(s) {
  var o = s.length;
  if (o % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var u = s.indexOf("=");
  u === -1 && (u = o);
  var p = u === o ? 0 : 4 - u % 4;
  return [u, p];
}
function Xe(s) {
  var o = Ae(s), u = o[0], p = o[1];
  return (u + p) * 3 / 4 - p;
}
function Ke(s, o, u) {
  return (o + u) * 3 / 4 - u;
}
function Qe(s) {
  var o, u = Ae(s), p = u[0], h = u[1], l = new Ge(Ke(s, p, h)), f = 0, a = h > 0 ? p - 4 : p, w;
  for (w = 0; w < a; w += 4)
    o = Q[s.charCodeAt(w)] << 18 | Q[s.charCodeAt(w + 1)] << 12 | Q[s.charCodeAt(w + 2)] << 6 | Q[s.charCodeAt(w + 3)], l[f++] = o >> 16 & 255, l[f++] = o >> 8 & 255, l[f++] = o & 255;
  return h === 2 && (o = Q[s.charCodeAt(w)] << 2 | Q[s.charCodeAt(w + 1)] >> 4, l[f++] = o & 255), h === 1 && (o = Q[s.charCodeAt(w)] << 10 | Q[s.charCodeAt(w + 1)] << 4 | Q[s.charCodeAt(w + 2)] >> 2, l[f++] = o >> 8 & 255, l[f++] = o & 255), l;
}
function Ze(s) {
  return or[s >> 18 & 63] + or[s >> 12 & 63] + or[s >> 6 & 63] + or[s & 63];
}
function rt(s, o, u) {
  for (var p, h = [], l = o; l < u; l += 3)
    p = (s[l] << 16 & 16711680) + (s[l + 1] << 8 & 65280) + (s[l + 2] & 255), h.push(Ze(p));
  return h.join("");
}
function et(s) {
  for (var o, u = s.length, p = u % 3, h = [], l = 16383, f = 0, a = u - p; f < a; f += l)
    h.push(rt(s, f, f + l > a ? a : f + l));
  return p === 1 ? (o = s[u - 1], h.push(
    or[o >> 2] + or[o << 4 & 63] + "=="
  )) : p === 2 && (o = (s[u - 2] << 8) + s[u - 1], h.push(
    or[o >> 10] + or[o >> 4 & 63] + or[o << 2 & 63] + "="
  )), h.join("");
}
var he = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
he.read = function(s, o, u, p, h) {
  var l, f, a = h * 8 - p - 1, w = (1 << a) - 1, _ = w >> 1, x = -7, m = u ? h - 1 : 0, k = u ? -1 : 1, U = s[o + m];
  for (m += k, l = U & (1 << -x) - 1, U >>= -x, x += a; x > 0; l = l * 256 + s[o + m], m += k, x -= 8)
    ;
  for (f = l & (1 << -x) - 1, l >>= -x, x += p; x > 0; f = f * 256 + s[o + m], m += k, x -= 8)
    ;
  if (l === 0)
    l = 1 - _;
  else {
    if (l === w)
      return f ? NaN : (U ? -1 : 1) * (1 / 0);
    f = f + Math.pow(2, p), l = l - _;
  }
  return (U ? -1 : 1) * f * Math.pow(2, l - p);
};
he.write = function(s, o, u, p, h, l) {
  var f, a, w, _ = l * 8 - h - 1, x = (1 << _) - 1, m = x >> 1, k = h === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, U = p ? 0 : l - 1, Y = p ? 1 : -1, Z = o < 0 || o === 0 && 1 / o < 0 ? 1 : 0;
  for (o = Math.abs(o), isNaN(o) || o === 1 / 0 ? (a = isNaN(o) ? 1 : 0, f = x) : (f = Math.floor(Math.log(o) / Math.LN2), o * (w = Math.pow(2, -f)) < 1 && (f--, w *= 2), f + m >= 1 ? o += k / w : o += k * Math.pow(2, 1 - m), o * w >= 2 && (f++, w /= 2), f + m >= x ? (a = 0, f = x) : f + m >= 1 ? (a = (o * w - 1) * Math.pow(2, h), f = f + m) : (a = o * Math.pow(2, m - 1) * Math.pow(2, h), f = 0)); h >= 8; s[u + U] = a & 255, U += Y, a /= 256, h -= 8)
    ;
  for (f = f << h | a, _ += h; _ > 0; s[u + U] = f & 255, U += Y, f /= 256, _ -= 8)
    ;
  s[u + U - Y] |= Z * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(s) {
  var o = Kr, u = he, p = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  s.Buffer = a, s.SlowBuffer = T, s.INSPECT_MAX_BYTES = 50;
  var h = 2147483647;
  s.kMaxLength = h, a.TYPED_ARRAY_SUPPORT = l(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function l() {
    try {
      var t = new Uint8Array(1), r = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(r, Uint8Array.prototype), Object.setPrototypeOf(t, r), t.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(a.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (a.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(a.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (a.isBuffer(this))
        return this.byteOffset;
    }
  });
  function f(t) {
    if (t > h)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
    var r = new Uint8Array(t);
    return Object.setPrototypeOf(r, a.prototype), r;
  }
  function a(t, r, e) {
    if (typeof t == "number") {
      if (typeof r == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return m(t);
    }
    return w(t, r, e);
  }
  a.poolSize = 8192;
  function w(t, r, e) {
    if (typeof t == "string")
      return k(t, r);
    if (ArrayBuffer.isView(t))
      return Y(t);
    if (t == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
      );
    if (X(t, ArrayBuffer) || t && X(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (X(t, SharedArrayBuffer) || t && X(t.buffer, SharedArrayBuffer)))
      return Z(t, r, e);
    if (typeof t == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var n = t.valueOf && t.valueOf();
    if (n != null && n !== t)
      return a.from(n, r, e);
    var c = vr(t);
    if (c)
      return c;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof t[Symbol.toPrimitive] == "function")
      return a.from(
        t[Symbol.toPrimitive]("string"),
        r,
        e
      );
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
    );
  }
  a.from = function(t, r, e) {
    return w(t, r, e);
  }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
  function _(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function x(t, r, e) {
    return _(t), t <= 0 ? f(t) : r !== void 0 ? typeof e == "string" ? f(t).fill(r, e) : f(t).fill(r) : f(t);
  }
  a.alloc = function(t, r, e) {
    return x(t, r, e);
  };
  function m(t) {
    return _(t), f(t < 0 ? 0 : q(t) | 0);
  }
  a.allocUnsafe = function(t) {
    return m(t);
  }, a.allocUnsafeSlow = function(t) {
    return m(t);
  };
  function k(t, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !a.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var e = V(t, r) | 0, n = f(e), c = n.write(t, r);
    return c !== e && (n = n.slice(0, c)), n;
  }
  function U(t) {
    for (var r = t.length < 0 ? 0 : q(t.length) | 0, e = f(r), n = 0; n < r; n += 1)
      e[n] = t[n] & 255;
    return e;
  }
  function Y(t) {
    if (X(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return Z(r.buffer, r.byteOffset, r.byteLength);
    }
    return U(t);
  }
  function Z(t, r, e) {
    if (r < 0 || t.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < r + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var n;
    return r === void 0 && e === void 0 ? n = new Uint8Array(t) : e === void 0 ? n = new Uint8Array(t, r) : n = new Uint8Array(t, r, e), Object.setPrototypeOf(n, a.prototype), n;
  }
  function vr(t) {
    if (a.isBuffer(t)) {
      var r = q(t.length) | 0, e = f(r);
      return e.length === 0 || t.copy(e, 0, 0, r), e;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || Sr(t.length) ? f(0) : U(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return U(t.data);
  }
  function q(t) {
    if (t >= h)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + h.toString(16) + " bytes");
    return t | 0;
  }
  function T(t) {
    return +t != t && (t = 0), a.alloc(+t);
  }
  a.isBuffer = function(r) {
    return r != null && r._isBuffer === !0 && r !== a.prototype;
  }, a.compare = function(r, e) {
    if (X(r, Uint8Array) && (r = a.from(r, r.offset, r.byteLength)), X(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)), !a.isBuffer(r) || !a.isBuffer(e))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (r === e)
      return 0;
    for (var n = r.length, c = e.length, d = 0, g = Math.min(n, c); d < g; ++d)
      if (r[d] !== e[d]) {
        n = r[d], c = e[d];
        break;
      }
    return n < c ? -1 : c < n ? 1 : 0;
  }, a.isEncoding = function(r) {
    switch (String(r).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, a.concat = function(r, e) {
    if (!Array.isArray(r))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (r.length === 0)
      return a.alloc(0);
    var n;
    if (e === void 0)
      for (e = 0, n = 0; n < r.length; ++n)
        e += r[n].length;
    var c = a.allocUnsafe(e), d = 0;
    for (n = 0; n < r.length; ++n) {
      var g = r[n];
      if (X(g, Uint8Array))
        d + g.length > c.length ? a.from(g).copy(c, d) : Uint8Array.prototype.set.call(
          c,
          g,
          d
        );
      else if (a.isBuffer(g))
        g.copy(c, d);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      d += g.length;
    }
    return c;
  };
  function V(t, r) {
    if (a.isBuffer(t))
      return t.length;
    if (ArrayBuffer.isView(t) || X(t, ArrayBuffer))
      return t.byteLength;
    if (typeof t != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t
      );
    var e = t.length, n = arguments.length > 2 && arguments[2] === !0;
    if (!n && e === 0)
      return 0;
    for (var c = !1; ; )
      switch (r) {
        case "ascii":
        case "latin1":
        case "binary":
          return e;
        case "utf8":
        case "utf-8":
          return lr(t).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return e * 2;
        case "hex":
          return e >>> 1;
        case "base64":
          return Hr(t).length;
        default:
          if (c)
            return n ? -1 : lr(t).length;
          r = ("" + r).toLowerCase(), c = !0;
      }
  }
  a.byteLength = V;
  function z(t, r, e) {
    var n = !1;
    if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, r >>>= 0, e <= r))
      return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return qr(this, r, e);
        case "utf8":
        case "utf-8":
          return er(this, r, e);
        case "ascii":
          return Yr(this, r, e);
        case "latin1":
        case "binary":
          return Vr(this, r, e);
        case "base64":
          return rr(this, r, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return zr(this, r, e);
        default:
          if (n)
            throw new TypeError("Unknown encoding: " + t);
          t = (t + "").toLowerCase(), n = !0;
      }
  }
  a.prototype._isBuffer = !0;
  function W(t, r, e) {
    var n = t[r];
    t[r] = t[e], t[e] = n;
  }
  a.prototype.swap16 = function() {
    var r = this.length;
    if (r % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var e = 0; e < r; e += 2)
      W(this, e, e + 1);
    return this;
  }, a.prototype.swap32 = function() {
    var r = this.length;
    if (r % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var e = 0; e < r; e += 4)
      W(this, e, e + 3), W(this, e + 1, e + 2);
    return this;
  }, a.prototype.swap64 = function() {
    var r = this.length;
    if (r % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var e = 0; e < r; e += 8)
      W(this, e, e + 7), W(this, e + 1, e + 6), W(this, e + 2, e + 5), W(this, e + 3, e + 4);
    return this;
  }, a.prototype.toString = function() {
    var r = this.length;
    return r === 0 ? "" : arguments.length === 0 ? er(this, 0, r) : z.apply(this, arguments);
  }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(r) {
    if (!a.isBuffer(r))
      throw new TypeError("Argument must be a Buffer");
    return this === r ? !0 : a.compare(this, r) === 0;
  }, a.prototype.inspect = function() {
    var r = "", e = s.INSPECT_MAX_BYTES;
    return r = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (r += " ... "), "<Buffer " + r + ">";
  }, p && (a.prototype[p] = a.prototype.inspect), a.prototype.compare = function(r, e, n, c, d) {
    if (X(r, Uint8Array) && (r = a.from(r, r.offset, r.byteLength)), !a.isBuffer(r))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof r
      );
    if (e === void 0 && (e = 0), n === void 0 && (n = r ? r.length : 0), c === void 0 && (c = 0), d === void 0 && (d = this.length), e < 0 || n > r.length || c < 0 || d > this.length)
      throw new RangeError("out of range index");
    if (c >= d && e >= n)
      return 0;
    if (c >= d)
      return -1;
    if (e >= n)
      return 1;
    if (e >>>= 0, n >>>= 0, c >>>= 0, d >>>= 0, this === r)
      return 0;
    for (var g = d - c, A = n - e, C = Math.min(g, A), B = this.slice(c, d), L = r.slice(e, n), S = 0; S < C; ++S)
      if (B[S] !== L[S]) {
        g = B[S], A = L[S];
        break;
      }
    return g < A ? -1 : A < g ? 1 : 0;
  };
  function Nr(t, r, e, n, c) {
    if (t.length === 0)
      return -1;
    if (typeof e == "string" ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, Sr(e) && (e = c ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
      if (c)
        return -1;
      e = t.length - 1;
    } else if (e < 0)
      if (c)
        e = 0;
      else
        return -1;
    if (typeof r == "string" && (r = a.from(r, n)), a.isBuffer(r))
      return r.length === 0 ? -1 : Lr(t, r, e, n, c);
    if (typeof r == "number")
      return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? c ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : Lr(t, [r], e, n, c);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Lr(t, r, e, n, c) {
    var d = 1, g = t.length, A = r.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || r.length < 2)
        return -1;
      d = 2, g /= 2, A /= 2, e /= 2;
    }
    function C(Br, Ir) {
      return d === 1 ? Br[Ir] : Br.readUInt16BE(Ir * d);
    }
    var B;
    if (c) {
      var L = -1;
      for (B = e; B < g; B++)
        if (C(t, B) === C(r, L === -1 ? 0 : B - L)) {
          if (L === -1 && (L = B), B - L + 1 === A)
            return L * d;
        } else
          L !== -1 && (B -= B - L), L = -1;
    } else
      for (e + A > g && (e = g - A), B = e; B >= 0; B--) {
        for (var S = !0, yr = 0; yr < A; yr++)
          if (C(t, B + yr) !== C(r, yr)) {
            S = !1;
            break;
          }
        if (S)
          return B;
      }
    return -1;
  }
  a.prototype.includes = function(r, e, n) {
    return this.indexOf(r, e, n) !== -1;
  }, a.prototype.indexOf = function(r, e, n) {
    return Nr(this, r, e, n, !0);
  }, a.prototype.lastIndexOf = function(r, e, n) {
    return Nr(this, r, e, n, !1);
  };
  function re(t, r, e, n) {
    e = Number(e) || 0;
    var c = t.length - e;
    n ? (n = Number(n), n > c && (n = c)) : n = c;
    var d = r.length;
    n > d / 2 && (n = d / 2);
    for (var g = 0; g < n; ++g) {
      var A = parseInt(r.substr(g * 2, 2), 16);
      if (Sr(A))
        return g;
      t[e + g] = A;
    }
    return g;
  }
  function Mr(t, r, e, n) {
    return hr(lr(r, t.length - e), t, e, n);
  }
  function ee(t, r, e, n) {
    return hr(Tr(r), t, e, n);
  }
  function te(t, r, e, n) {
    return hr(Hr(r), t, e, n);
  }
  function Wr(t, r, e, n) {
    return hr(gr(r, t.length - e), t, e, n);
  }
  a.prototype.write = function(r, e, n, c) {
    if (e === void 0)
      c = "utf8", n = this.length, e = 0;
    else if (n === void 0 && typeof e == "string")
      c = e, n = this.length, e = 0;
    else if (isFinite(e))
      e = e >>> 0, isFinite(n) ? (n = n >>> 0, c === void 0 && (c = "utf8")) : (c = n, n = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    var d = this.length - e;
    if ((n === void 0 || n > d) && (n = d), r.length > 0 && (n < 0 || e < 0) || e > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    c || (c = "utf8");
    for (var g = !1; ; )
      switch (c) {
        case "hex":
          return re(this, r, e, n);
        case "utf8":
        case "utf-8":
          return Mr(this, r, e, n);
        case "ascii":
        case "latin1":
        case "binary":
          return ee(this, r, e, n);
        case "base64":
          return te(this, r, e, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Wr(this, r, e, n);
        default:
          if (g)
            throw new TypeError("Unknown encoding: " + c);
          c = ("" + c).toLowerCase(), g = !0;
      }
  }, a.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function rr(t, r, e) {
    return r === 0 && e === t.length ? o.fromByteArray(t) : o.fromByteArray(t.slice(r, e));
  }
  function er(t, r, e) {
    e = Math.min(t.length, e);
    for (var n = [], c = r; c < e; ) {
      var d = t[c], g = null, A = d > 239 ? 4 : d > 223 ? 3 : d > 191 ? 2 : 1;
      if (c + A <= e) {
        var C, B, L, S;
        switch (A) {
          case 1:
            d < 128 && (g = d);
            break;
          case 2:
            C = t[c + 1], (C & 192) === 128 && (S = (d & 31) << 6 | C & 63, S > 127 && (g = S));
            break;
          case 3:
            C = t[c + 1], B = t[c + 2], (C & 192) === 128 && (B & 192) === 128 && (S = (d & 15) << 12 | (C & 63) << 6 | B & 63, S > 2047 && (S < 55296 || S > 57343) && (g = S));
            break;
          case 4:
            C = t[c + 1], B = t[c + 2], L = t[c + 3], (C & 192) === 128 && (B & 192) === 128 && (L & 192) === 128 && (S = (d & 15) << 18 | (C & 63) << 12 | (B & 63) << 6 | L & 63, S > 65535 && S < 1114112 && (g = S));
        }
      }
      g === null ? (g = 65533, A = 1) : g > 65535 && (g -= 65536, n.push(g >>> 10 & 1023 | 55296), g = 56320 | g & 1023), n.push(g), c += A;
    }
    return $r(n);
  }
  var fr = 4096;
  function $r(t) {
    var r = t.length;
    if (r <= fr)
      return String.fromCharCode.apply(String, t);
    for (var e = "", n = 0; n < r; )
      e += String.fromCharCode.apply(
        String,
        t.slice(n, n += fr)
      );
    return e;
  }
  function Yr(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var c = r; c < e; ++c)
      n += String.fromCharCode(t[c] & 127);
    return n;
  }
  function Vr(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var c = r; c < e; ++c)
      n += String.fromCharCode(t[c]);
    return n;
  }
  function qr(t, r, e) {
    var n = t.length;
    (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
    for (var c = "", d = r; d < e; ++d)
      c += wr[t[d]];
    return c;
  }
  function zr(t, r, e) {
    for (var n = t.slice(r, e), c = "", d = 0; d < n.length - 1; d += 2)
      c += String.fromCharCode(n[d] + n[d + 1] * 256);
    return c;
  }
  a.prototype.slice = function(r, e) {
    var n = this.length;
    r = ~~r, e = e === void 0 ? n : ~~e, r < 0 ? (r += n, r < 0 && (r = 0)) : r > n && (r = n), e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), e < r && (e = r);
    var c = this.subarray(r, e);
    return Object.setPrototypeOf(c, a.prototype), c;
  };
  function O(t, r, e) {
    if (t % 1 !== 0 || t < 0)
      throw new RangeError("offset is not uint");
    if (t + r > e)
      throw new RangeError("Trying to access beyond buffer length");
  }
  a.prototype.readUintLE = a.prototype.readUIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || O(r, e, this.length);
    for (var c = this[r], d = 1, g = 0; ++g < e && (d *= 256); )
      c += this[r + g] * d;
    return c;
  }, a.prototype.readUintBE = a.prototype.readUIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || O(r, e, this.length);
    for (var c = this[r + --e], d = 1; e > 0 && (d *= 256); )
      c += this[r + --e] * d;
    return c;
  }, a.prototype.readUint8 = a.prototype.readUInt8 = function(r, e) {
    return r = r >>> 0, e || O(r, 1, this.length), this[r];
  }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(r, e) {
    return r = r >>> 0, e || O(r, 2, this.length), this[r] | this[r + 1] << 8;
  }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(r, e) {
    return r = r >>> 0, e || O(r, 2, this.length), this[r] << 8 | this[r + 1];
  }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(r, e) {
    return r = r >>> 0, e || O(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
  }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(r, e) {
    return r = r >>> 0, e || O(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
  }, a.prototype.readIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || O(r, e, this.length);
    for (var c = this[r], d = 1, g = 0; ++g < e && (d *= 256); )
      c += this[r + g] * d;
    return d *= 128, c >= d && (c -= Math.pow(2, 8 * e)), c;
  }, a.prototype.readIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || O(r, e, this.length);
    for (var c = e, d = 1, g = this[r + --c]; c > 0 && (d *= 256); )
      g += this[r + --c] * d;
    return d *= 128, g >= d && (g -= Math.pow(2, 8 * e)), g;
  }, a.prototype.readInt8 = function(r, e) {
    return r = r >>> 0, e || O(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
  }, a.prototype.readInt16LE = function(r, e) {
    r = r >>> 0, e || O(r, 2, this.length);
    var n = this[r] | this[r + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, a.prototype.readInt16BE = function(r, e) {
    r = r >>> 0, e || O(r, 2, this.length);
    var n = this[r + 1] | this[r] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, a.prototype.readInt32LE = function(r, e) {
    return r = r >>> 0, e || O(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
  }, a.prototype.readInt32BE = function(r, e) {
    return r = r >>> 0, e || O(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
  }, a.prototype.readFloatLE = function(r, e) {
    return r = r >>> 0, e || O(r, 4, this.length), u.read(this, r, !0, 23, 4);
  }, a.prototype.readFloatBE = function(r, e) {
    return r = r >>> 0, e || O(r, 4, this.length), u.read(this, r, !1, 23, 4);
  }, a.prototype.readDoubleLE = function(r, e) {
    return r = r >>> 0, e || O(r, 8, this.length), u.read(this, r, !0, 52, 8);
  }, a.prototype.readDoubleBE = function(r, e) {
    return r = r >>> 0, e || O(r, 8, this.length), u.read(this, r, !1, 52, 8);
  };
  function $(t, r, e, n, c, d) {
    if (!a.isBuffer(t))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (r > c || r < d)
      throw new RangeError('"value" argument is out of bounds');
    if (e + n > t.length)
      throw new RangeError("Index out of range");
  }
  a.prototype.writeUintLE = a.prototype.writeUIntLE = function(r, e, n, c) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !c) {
      var d = Math.pow(2, 8 * n) - 1;
      $(this, r, e, n, d, 0);
    }
    var g = 1, A = 0;
    for (this[e] = r & 255; ++A < n && (g *= 256); )
      this[e + A] = r / g & 255;
    return e + n;
  }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(r, e, n, c) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !c) {
      var d = Math.pow(2, 8 * n) - 1;
      $(this, r, e, n, d, 0);
    }
    var g = n - 1, A = 1;
    for (this[e + g] = r & 255; --g >= 0 && (A *= 256); )
      this[e + g] = r / A & 255;
    return e + n;
  }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(r, e, n) {
    return r = +r, e = e >>> 0, n || $(this, r, e, 1, 255, 0), this[e] = r & 255, e + 1;
  }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || $(this, r, e, 2, 65535, 0), this[e] = r & 255, this[e + 1] = r >>> 8, e + 2;
  }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || $(this, r, e, 2, 65535, 0), this[e] = r >>> 8, this[e + 1] = r & 255, e + 2;
  }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || $(this, r, e, 4, 4294967295, 0), this[e + 3] = r >>> 24, this[e + 2] = r >>> 16, this[e + 1] = r >>> 8, this[e] = r & 255, e + 4;
  }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || $(this, r, e, 4, 4294967295, 0), this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255, e + 4;
  }, a.prototype.writeIntLE = function(r, e, n, c) {
    if (r = +r, e = e >>> 0, !c) {
      var d = Math.pow(2, 8 * n - 1);
      $(this, r, e, n, d - 1, -d);
    }
    var g = 0, A = 1, C = 0;
    for (this[e] = r & 255; ++g < n && (A *= 256); )
      r < 0 && C === 0 && this[e + g - 1] !== 0 && (C = 1), this[e + g] = (r / A >> 0) - C & 255;
    return e + n;
  }, a.prototype.writeIntBE = function(r, e, n, c) {
    if (r = +r, e = e >>> 0, !c) {
      var d = Math.pow(2, 8 * n - 1);
      $(this, r, e, n, d - 1, -d);
    }
    var g = n - 1, A = 1, C = 0;
    for (this[e + g] = r & 255; --g >= 0 && (A *= 256); )
      r < 0 && C === 0 && this[e + g + 1] !== 0 && (C = 1), this[e + g] = (r / A >> 0) - C & 255;
    return e + n;
  }, a.prototype.writeInt8 = function(r, e, n) {
    return r = +r, e = e >>> 0, n || $(this, r, e, 1, 127, -128), r < 0 && (r = 255 + r + 1), this[e] = r & 255, e + 1;
  }, a.prototype.writeInt16LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || $(this, r, e, 2, 32767, -32768), this[e] = r & 255, this[e + 1] = r >>> 8, e + 2;
  }, a.prototype.writeInt16BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || $(this, r, e, 2, 32767, -32768), this[e] = r >>> 8, this[e + 1] = r & 255, e + 2;
  }, a.prototype.writeInt32LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || $(this, r, e, 4, 2147483647, -2147483648), this[e] = r & 255, this[e + 1] = r >>> 8, this[e + 2] = r >>> 16, this[e + 3] = r >>> 24, e + 4;
  }, a.prototype.writeInt32BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || $(this, r, e, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255, e + 4;
  };
  function Fr(t, r, e, n, c, d) {
    if (e + n > t.length)
      throw new RangeError("Index out of range");
    if (e < 0)
      throw new RangeError("Index out of range");
  }
  function Jr(t, r, e, n, c) {
    return r = +r, e = e >>> 0, c || Fr(t, r, e, 4), u.write(t, r, e, n, 23, 4), e + 4;
  }
  a.prototype.writeFloatLE = function(r, e, n) {
    return Jr(this, r, e, !0, n);
  }, a.prototype.writeFloatBE = function(r, e, n) {
    return Jr(this, r, e, !1, n);
  };
  function Gr(t, r, e, n, c) {
    return r = +r, e = e >>> 0, c || Fr(t, r, e, 8), u.write(t, r, e, n, 52, 8), e + 8;
  }
  a.prototype.writeDoubleLE = function(r, e, n) {
    return Gr(this, r, e, !0, n);
  }, a.prototype.writeDoubleBE = function(r, e, n) {
    return Gr(this, r, e, !1, n);
  }, a.prototype.copy = function(r, e, n, c) {
    if (!a.isBuffer(r))
      throw new TypeError("argument should be a Buffer");
    if (n || (n = 0), !c && c !== 0 && (c = this.length), e >= r.length && (e = r.length), e || (e = 0), c > 0 && c < n && (c = n), c === n || r.length === 0 || this.length === 0)
      return 0;
    if (e < 0)
      throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length)
      throw new RangeError("Index out of range");
    if (c < 0)
      throw new RangeError("sourceEnd out of bounds");
    c > this.length && (c = this.length), r.length - e < c - n && (c = r.length - e + n);
    var d = c - n;
    return this === r && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(e, n, c) : Uint8Array.prototype.set.call(
      r,
      this.subarray(n, c),
      e
    ), d;
  }, a.prototype.fill = function(r, e, n, c) {
    if (typeof r == "string") {
      if (typeof e == "string" ? (c = e, e = 0, n = this.length) : typeof n == "string" && (c = n, n = this.length), c !== void 0 && typeof c != "string")
        throw new TypeError("encoding must be a string");
      if (typeof c == "string" && !a.isEncoding(c))
        throw new TypeError("Unknown encoding: " + c);
      if (r.length === 1) {
        var d = r.charCodeAt(0);
        (c === "utf8" && d < 128 || c === "latin1") && (r = d);
      }
    } else
      typeof r == "number" ? r = r & 255 : typeof r == "boolean" && (r = Number(r));
    if (e < 0 || this.length < e || this.length < n)
      throw new RangeError("Out of range index");
    if (n <= e)
      return this;
    e = e >>> 0, n = n === void 0 ? this.length : n >>> 0, r || (r = 0);
    var g;
    if (typeof r == "number")
      for (g = e; g < n; ++g)
        this[g] = r;
    else {
      var A = a.isBuffer(r) ? r : a.from(r, c), C = A.length;
      if (C === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (g = 0; g < n - e; ++g)
        this[g + e] = A[g % C];
    }
    return this;
  };
  var Rr = /[^+/0-9A-Za-z-_]/g;
  function Cr(t) {
    if (t = t.split("=")[0], t = t.trim().replace(Rr, ""), t.length < 2)
      return "";
    for (; t.length % 4 !== 0; )
      t = t + "=";
    return t;
  }
  function lr(t, r) {
    r = r || 1 / 0;
    for (var e, n = t.length, c = null, d = [], g = 0; g < n; ++g) {
      if (e = t.charCodeAt(g), e > 55295 && e < 57344) {
        if (!c) {
          if (e > 56319) {
            (r -= 3) > -1 && d.push(239, 191, 189);
            continue;
          } else if (g + 1 === n) {
            (r -= 3) > -1 && d.push(239, 191, 189);
            continue;
          }
          c = e;
          continue;
        }
        if (e < 56320) {
          (r -= 3) > -1 && d.push(239, 191, 189), c = e;
          continue;
        }
        e = (c - 55296 << 10 | e - 56320) + 65536;
      } else
        c && (r -= 3) > -1 && d.push(239, 191, 189);
      if (c = null, e < 128) {
        if ((r -= 1) < 0)
          break;
        d.push(e);
      } else if (e < 2048) {
        if ((r -= 2) < 0)
          break;
        d.push(
          e >> 6 | 192,
          e & 63 | 128
        );
      } else if (e < 65536) {
        if ((r -= 3) < 0)
          break;
        d.push(
          e >> 12 | 224,
          e >> 6 & 63 | 128,
          e & 63 | 128
        );
      } else if (e < 1114112) {
        if ((r -= 4) < 0)
          break;
        d.push(
          e >> 18 | 240,
          e >> 12 & 63 | 128,
          e >> 6 & 63 | 128,
          e & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return d;
  }
  function Tr(t) {
    for (var r = [], e = 0; e < t.length; ++e)
      r.push(t.charCodeAt(e) & 255);
    return r;
  }
  function gr(t, r) {
    for (var e, n, c, d = [], g = 0; g < t.length && !((r -= 2) < 0); ++g)
      e = t.charCodeAt(g), n = e >> 8, c = e % 256, d.push(c), d.push(n);
    return d;
  }
  function Hr(t) {
    return o.toByteArray(Cr(t));
  }
  function hr(t, r, e, n) {
    for (var c = 0; c < n && !(c + e >= r.length || c >= t.length); ++c)
      r[c + e] = t[c];
    return c;
  }
  function X(t, r) {
    return t instanceof r || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === r.name;
  }
  function Sr(t) {
    return t !== t;
  }
  var wr = function() {
    for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
      for (var n = e * 16, c = 0; c < 16; ++c)
        r[n + c] = t[e] + t[c];
    return r;
  }();
})(Je);
var ar = {}, tt = {
  get exports() {
    return ar;
  },
  set exports(s) {
    ar = s;
  }
}, D = tt.exports = {}, nr, ir;
function fe() {
  throw new Error("setTimeout has not been defined");
}
function le() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? nr = setTimeout : nr = fe;
  } catch {
    nr = fe;
  }
  try {
    typeof clearTimeout == "function" ? ir = clearTimeout : ir = le;
  } catch {
    ir = le;
  }
})();
function Fe(s) {
  if (nr === setTimeout)
    return setTimeout(s, 0);
  if ((nr === fe || !nr) && setTimeout)
    return nr = setTimeout, setTimeout(s, 0);
  try {
    return nr(s, 0);
  } catch {
    try {
      return nr.call(null, s, 0);
    } catch {
      return nr.call(this, s, 0);
    }
  }
}
function nt(s) {
  if (ir === clearTimeout)
    return clearTimeout(s);
  if ((ir === le || !ir) && clearTimeout)
    return ir = clearTimeout, clearTimeout(s);
  try {
    return ir(s);
  } catch {
    try {
      return ir.call(null, s);
    } catch {
      return ir.call(this, s);
    }
  }
}
var sr = [], br = !1, dr, Xr = -1;
function it() {
  !br || !dr || (br = !1, dr.length ? sr = dr.concat(sr) : Xr = -1, sr.length && Re());
}
function Re() {
  if (!br) {
    var s = Fe(it);
    br = !0;
    for (var o = sr.length; o; ) {
      for (dr = sr, sr = []; ++Xr < o; )
        dr && dr[Xr].run();
      Xr = -1, o = sr.length;
    }
    dr = null, br = !1, nt(s);
  }
}
D.nextTick = function(s) {
  var o = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var u = 1; u < arguments.length; u++)
      o[u - 1] = arguments[u];
  sr.push(new Ce(s, o)), sr.length === 1 && !br && Fe(Re);
};
function Ce(s, o) {
  this.fun = s, this.array = o;
}
Ce.prototype.run = function() {
  this.fun.apply(null, this.array);
};
D.title = "browser";
D.browser = !0;
D.env = {};
D.argv = [];
D.version = "";
D.versions = {};
function cr() {
}
D.on = cr;
D.addListener = cr;
D.once = cr;
D.off = cr;
D.removeListener = cr;
D.removeAllListeners = cr;
D.emit = cr;
D.prependListener = cr;
D.prependOnceListener = cr;
D.listeners = function(s) {
  return [];
};
D.binding = function(s) {
  throw new Error("process.binding is not supported");
};
D.cwd = function() {
  return "/";
};
D.chdir = function(s) {
  throw new Error("process.chdir is not supported");
};
D.umask = function() {
  return 0;
};
(function(s) {
  function o() {
    var p = this || self;
    return delete s.prototype.__magic__, p;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return o();
  s.defineProperty(s.prototype, "__magic__", {
    configurable: !0,
    get: o
  });
  var u = __magic__;
  return u;
})(Object);
var Pr = {}, ot = {
  get exports() {
    return Pr;
  },
  set exports(s) {
    Pr = s;
  }
}, kr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ee;
function at() {
  if (Ee)
    return kr;
  Ee = 1;
  var s = j, o = Symbol.for("react.element"), u = Symbol.for("react.fragment"), p = Object.prototype.hasOwnProperty, h = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(a, w, _) {
    var x, m = {}, k = null, U = null;
    _ !== void 0 && (k = "" + _), w.key !== void 0 && (k = "" + w.key), w.ref !== void 0 && (U = w.ref);
    for (x in w)
      p.call(w, x) && !l.hasOwnProperty(x) && (m[x] = w[x]);
    if (a && a.defaultProps)
      for (x in w = a.defaultProps, w)
        m[x] === void 0 && (m[x] = w[x]);
    return { $$typeof: o, type: a, key: k, ref: U, props: m, _owner: h.current };
  }
  return kr.Fragment = u, kr.jsx = f, kr.jsxs = f, kr;
}
var Ur = {}, _e;
function ut() {
  return _e || (_e = 1, ar.env.NODE_ENV !== "production" && function() {
    var s = j, o = Symbol.for("react.element"), u = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), l = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), a = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), x = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), U = Symbol.for("react.offscreen"), Y = Symbol.iterator, Z = "@@iterator";
    function vr(i) {
      if (i === null || typeof i != "object")
        return null;
      var v = Y && i[Y] || i[Z];
      return typeof v == "function" ? v : null;
    }
    var q = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function T(i) {
      {
        for (var v = arguments.length, y = new Array(v > 1 ? v - 1 : 0), E = 1; E < v; E++)
          y[E - 1] = arguments[E];
        V("error", i, y);
      }
    }
    function V(i, v, y) {
      {
        var E = q.ReactDebugCurrentFrame, R = E.getStackAddendum();
        R !== "" && (v += "%s", y = y.concat([R]));
        var I = y.map(function(F) {
          return String(F);
        });
        I.unshift("Warning: " + v), Function.prototype.apply.call(console[i], console, I);
      }
    }
    var z = !1, W = !1, Nr = !1, Lr = !1, re = !1, Mr;
    Mr = Symbol.for("react.module.reference");
    function ee(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === p || i === l || re || i === h || i === _ || i === x || Lr || i === U || z || W || Nr || typeof i == "object" && i !== null && (i.$$typeof === k || i.$$typeof === m || i.$$typeof === f || i.$$typeof === a || i.$$typeof === w || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === Mr || i.getModuleId !== void 0));
    }
    function te(i, v, y) {
      var E = i.displayName;
      if (E)
        return E;
      var R = v.displayName || v.name || "";
      return R !== "" ? y + "(" + R + ")" : y;
    }
    function Wr(i) {
      return i.displayName || "Context";
    }
    function rr(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && T("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
        return i.displayName || i.name || null;
      if (typeof i == "string")
        return i;
      switch (i) {
        case p:
          return "Fragment";
        case u:
          return "Portal";
        case l:
          return "Profiler";
        case h:
          return "StrictMode";
        case _:
          return "Suspense";
        case x:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case a:
            var v = i;
            return Wr(v) + ".Consumer";
          case f:
            var y = i;
            return Wr(y._context) + ".Provider";
          case w:
            return te(i, i.render, "ForwardRef");
          case m:
            var E = i.displayName || null;
            return E !== null ? E : rr(i.type) || "Memo";
          case k: {
            var R = i, I = R._payload, F = R._init;
            try {
              return rr(F(I));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var er = Object.assign, fr = 0, $r, Yr, Vr, qr, zr, O, $;
    function Fr() {
    }
    Fr.__reactDisabledLog = !0;
    function Jr() {
      {
        if (fr === 0) {
          $r = console.log, Yr = console.info, Vr = console.warn, qr = console.error, zr = console.group, O = console.groupCollapsed, $ = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: Fr,
            writable: !0
          };
          Object.defineProperties(console, {
            info: i,
            log: i,
            warn: i,
            error: i,
            group: i,
            groupCollapsed: i,
            groupEnd: i
          });
        }
        fr++;
      }
    }
    function Gr() {
      {
        if (fr--, fr === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: er({}, i, {
              value: $r
            }),
            info: er({}, i, {
              value: Yr
            }),
            warn: er({}, i, {
              value: Vr
            }),
            error: er({}, i, {
              value: qr
            }),
            group: er({}, i, {
              value: zr
            }),
            groupCollapsed: er({}, i, {
              value: O
            }),
            groupEnd: er({}, i, {
              value: $
            })
          });
        }
        fr < 0 && T("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Rr = q.ReactCurrentDispatcher, Cr;
    function lr(i, v, y) {
      {
        if (Cr === void 0)
          try {
            throw Error();
          } catch (R) {
            var E = R.stack.trim().match(/\n( *(at )?)/);
            Cr = E && E[1] || "";
          }
        return `
` + Cr + i;
      }
    }
    var Tr = !1, gr;
    {
      var Hr = typeof WeakMap == "function" ? WeakMap : Map;
      gr = new Hr();
    }
    function hr(i, v) {
      if (!i || Tr)
        return "";
      {
        var y = gr.get(i);
        if (y !== void 0)
          return y;
      }
      var E;
      Tr = !0;
      var R = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var I;
      I = Rr.current, Rr.current = null, Jr();
      try {
        if (v) {
          var F = function() {
            throw Error();
          };
          if (Object.defineProperty(F.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(F, []);
            } catch (ur) {
              E = ur;
            }
            Reflect.construct(i, [], F);
          } else {
            try {
              F.call();
            } catch (ur) {
              E = ur;
            }
            i.call(F.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ur) {
            E = ur;
          }
          i();
        }
      } catch (ur) {
        if (ur && E && typeof ur.stack == "string") {
          for (var b = ur.stack.split(`
`), J = E.stack.split(`
`), P = b.length - 1, N = J.length - 1; P >= 1 && N >= 0 && b[P] !== J[N]; )
            N--;
          for (; P >= 1 && N >= 0; P--, N--)
            if (b[P] !== J[N]) {
              if (P !== 1 || N !== 1)
                do
                  if (P--, N--, N < 0 || b[P] !== J[N]) {
                    var K = `
` + b[P].replace(" at new ", " at ");
                    return i.displayName && K.includes("<anonymous>") && (K = K.replace("<anonymous>", i.displayName)), typeof i == "function" && gr.set(i, K), K;
                  }
                while (P >= 1 && N >= 0);
              break;
            }
        }
      } finally {
        Tr = !1, Rr.current = I, Gr(), Error.prepareStackTrace = R;
      }
      var xr = i ? i.displayName || i.name : "", xe = xr ? lr(xr) : "";
      return typeof i == "function" && gr.set(i, xe), xe;
    }
    function X(i, v, y) {
      return hr(i, !1);
    }
    function Sr(i) {
      var v = i.prototype;
      return !!(v && v.isReactComponent);
    }
    function wr(i, v, y) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return hr(i, Sr(i));
      if (typeof i == "string")
        return lr(i);
      switch (i) {
        case _:
          return lr("Suspense");
        case x:
          return lr("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case w:
            return X(i.render);
          case m:
            return wr(i.type, v, y);
          case k: {
            var E = i, R = E._payload, I = E._init;
            try {
              return wr(I(R), v, y);
            } catch {
            }
          }
        }
      return "";
    }
    var t = Object.prototype.hasOwnProperty, r = {}, e = q.ReactDebugCurrentFrame;
    function n(i) {
      if (i) {
        var v = i._owner, y = wr(i.type, i._source, v ? v.type : null);
        e.setExtraStackFrame(y);
      } else
        e.setExtraStackFrame(null);
    }
    function c(i, v, y, E, R) {
      {
        var I = Function.call.bind(t);
        for (var F in i)
          if (I(i, F)) {
            var b = void 0;
            try {
              if (typeof i[F] != "function") {
                var J = Error((E || "React class") + ": " + y + " type `" + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[F] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw J.name = "Invariant Violation", J;
              }
              b = i[F](v, F, E, y, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (P) {
              b = P;
            }
            b && !(b instanceof Error) && (n(R), T("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", E || "React class", y, F, typeof b), n(null)), b instanceof Error && !(b.message in r) && (r[b.message] = !0, n(R), T("Failed %s type: %s", y, b.message), n(null));
          }
      }
    }
    var d = Array.isArray;
    function g(i) {
      return d(i);
    }
    function A(i) {
      {
        var v = typeof Symbol == "function" && Symbol.toStringTag, y = v && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return y;
      }
    }
    function C(i) {
      try {
        return B(i), !1;
      } catch {
        return !0;
      }
    }
    function B(i) {
      return "" + i;
    }
    function L(i) {
      if (C(i))
        return T("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", A(i)), B(i);
    }
    var S = q.ReactCurrentOwner, yr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Br, Ir, ne;
    ne = {};
    function Ie(i) {
      if (t.call(i, "ref")) {
        var v = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (v && v.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function ke(i) {
      if (t.call(i, "key")) {
        var v = Object.getOwnPropertyDescriptor(i, "key").get;
        if (v && v.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function Ue(i, v) {
      if (typeof i.ref == "string" && S.current && v && S.current.stateNode !== v) {
        var y = rr(S.current.type);
        ne[y] || (T('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', rr(S.current.type), i.ref), ne[y] = !0);
      }
    }
    function je(i, v) {
      {
        var y = function() {
          Br || (Br = !0, T("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", v));
        };
        y.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: y,
          configurable: !0
        });
      }
    }
    function Oe(i, v) {
      {
        var y = function() {
          Ir || (Ir = !0, T("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", v));
        };
        y.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: y,
          configurable: !0
        });
      }
    }
    var Pe = function(i, v, y, E, R, I, F) {
      var b = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: o,
        // Built-in properties that belong on the element
        type: i,
        key: v,
        ref: y,
        props: F,
        // Record the component responsible for creating this element.
        _owner: I
      };
      return b._store = {}, Object.defineProperty(b._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(b, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: E
      }), Object.defineProperty(b, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: R
      }), Object.freeze && (Object.freeze(b.props), Object.freeze(b)), b;
    };
    function De(i, v, y, E, R) {
      {
        var I, F = {}, b = null, J = null;
        y !== void 0 && (L(y), b = "" + y), ke(v) && (L(v.key), b = "" + v.key), Ie(v) && (J = v.ref, Ue(v, R));
        for (I in v)
          t.call(v, I) && !yr.hasOwnProperty(I) && (F[I] = v[I]);
        if (i && i.defaultProps) {
          var P = i.defaultProps;
          for (I in P)
            F[I] === void 0 && (F[I] = P[I]);
        }
        if (b || J) {
          var N = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          b && je(F, N), J && Oe(F, N);
        }
        return Pe(i, b, J, R, E, S.current, F);
      }
    }
    var ie = q.ReactCurrentOwner, de = q.ReactDebugCurrentFrame;
    function mr(i) {
      if (i) {
        var v = i._owner, y = wr(i.type, i._source, v ? v.type : null);
        de.setExtraStackFrame(y);
      } else
        de.setExtraStackFrame(null);
    }
    var oe;
    oe = !1;
    function ae(i) {
      return typeof i == "object" && i !== null && i.$$typeof === o;
    }
    function ve() {
      {
        if (ie.current) {
          var i = rr(ie.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
    }
    function Ne(i) {
      {
        if (i !== void 0) {
          var v = i.fileName.replace(/^.*[\\\/]/, ""), y = i.lineNumber;
          return `

Check your code at ` + v + ":" + y + ".";
        }
        return "";
      }
    }
    var ge = {};
    function Le(i) {
      {
        var v = ve();
        if (!v) {
          var y = typeof i == "string" ? i : i.displayName || i.name;
          y && (v = `

Check the top-level render call using <` + y + ">.");
        }
        return v;
      }
    }
    function we(i, v) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var y = Le(v);
        if (ge[y])
          return;
        ge[y] = !0;
        var E = "";
        i && i._owner && i._owner !== ie.current && (E = " It was passed a child from " + rr(i._owner.type) + "."), mr(i), T('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', y, E), mr(null);
      }
    }
    function ye(i, v) {
      {
        if (typeof i != "object")
          return;
        if (g(i))
          for (var y = 0; y < i.length; y++) {
            var E = i[y];
            ae(E) && we(E, v);
          }
        else if (ae(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var R = vr(i);
          if (typeof R == "function" && R !== i.entries)
            for (var I = R.call(i), F; !(F = I.next()).done; )
              ae(F.value) && we(F.value, v);
        }
      }
    }
    function Me(i) {
      {
        var v = i.type;
        if (v == null || typeof v == "string")
          return;
        var y;
        if (typeof v == "function")
          y = v.propTypes;
        else if (typeof v == "object" && (v.$$typeof === w || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        v.$$typeof === m))
          y = v.propTypes;
        else
          return;
        if (y) {
          var E = rr(v);
          c(y, i.props, "prop", E, i);
        } else if (v.PropTypes !== void 0 && !oe) {
          oe = !0;
          var R = rr(v);
          T("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", R || "Unknown");
        }
        typeof v.getDefaultProps == "function" && !v.getDefaultProps.isReactClassApproved && T("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function We(i) {
      {
        for (var v = Object.keys(i.props), y = 0; y < v.length; y++) {
          var E = v[y];
          if (E !== "children" && E !== "key") {
            mr(i), T("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", E), mr(null);
            break;
          }
        }
        i.ref !== null && (mr(i), T("Invalid attribute `ref` supplied to `React.Fragment`."), mr(null));
      }
    }
    function me(i, v, y, E, R, I) {
      {
        var F = ee(i);
        if (!F) {
          var b = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (b += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var J = Ne(R);
          J ? b += J : b += ve();
          var P;
          i === null ? P = "null" : g(i) ? P = "array" : i !== void 0 && i.$$typeof === o ? (P = "<" + (rr(i.type) || "Unknown") + " />", b = " Did you accidentally export a JSX literal instead of a component?") : P = typeof i, T("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", P, b);
        }
        var N = De(i, v, y, R, I);
        if (N == null)
          return N;
        if (F) {
          var K = v.children;
          if (K !== void 0)
            if (E)
              if (g(K)) {
                for (var xr = 0; xr < K.length; xr++)
                  ye(K[xr], i);
                Object.freeze && Object.freeze(K);
              } else
                T("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ye(K, i);
        }
        return i === p ? We(N) : Me(N), N;
      }
    }
    function $e(i, v, y) {
      return me(i, v, y, !0);
    }
    function Ye(i, v, y) {
      return me(i, v, y, !1);
    }
    var Ve = Ye, qe = $e;
    Ur.Fragment = p, Ur.jsx = Ve, Ur.jsxs = qe;
  }()), Ur;
}
(function(s) {
  ar.env.NODE_ENV === "production" ? s.exports = at() : s.exports = ut();
})(ot);
const st = Pr.Fragment, H = Pr.jsx, Or = Pr.jsxs;
var pe = {}, ct = {
  get exports() {
    return pe;
  },
  set exports(s) {
    pe = s;
  }
};
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(s) {
  (function() {
    var o = {}.hasOwnProperty;
    function u() {
      for (var p = [], h = 0; h < arguments.length; h++) {
        var l = arguments[h];
        if (l) {
          var f = typeof l;
          if (f === "string" || f === "number")
            p.push(l);
          else if (Array.isArray(l)) {
            if (l.length) {
              var a = u.apply(null, l);
              a && p.push(a);
            }
          } else if (f === "object") {
            if (l.toString !== Object.prototype.toString && !l.toString.toString().includes("[native code]")) {
              p.push(l.toString());
              continue;
            }
            for (var w in l)
              o.call(l, w) && l[w] && p.push(w);
          }
        }
      }
      return p.join(" ");
    }
    s.exports ? (u.default = u, s.exports = u) : window.classNames = u;
  })();
})(ct);
const _r = pe, Qr = j.createContext(null);
function tn({
  children: s
}) {
  const [o, u] = j.useState(), p = j.useCallback(
    (l, f) => u((a) => ({ ...a || {}, [l]: f })),
    []
  ), h = j.useMemo(
    () => ({
      widgetState: o || null,
      setWidgetState: p
    }),
    [o, p]
  );
  return /* @__PURE__ */ H(Qr.Provider, { value: h, children: s });
}
const ft = "_ring_7tcsj_47", lt = "_popupButton__container_7tcsj_5", pt = "_popupButton_7tcsj_5", ht = "_icon_7tcsj_23", dt = "_inactiveIcon_7tcsj_31", vt = "_activeIcon_7tcsj_35", gt = "_notif_7tcsj_39", wt = "_pinging_7tcsj_43", yt = "_ping_7tcsj_43", G = {
  ring: ft,
  popupButton__container: lt,
  "popupButton__container--open": "_popupButton__container--open_7tcsj_9",
  popupButton: pt,
  icon: ht,
  inactiveIcon: dt,
  activeIcon: vt,
  notif: gt,
  pinging: wt,
  ping: yt
};
function Te() {
  try {
    const s = typeof localStorage < "u" && localStorage.getItem("clickedNfts") || "";
    return s ? Array.from(new Set(JSON.parse(s))) : [];
  } catch {
    return [];
  }
}
function mt(s) {
  try {
    const u = [...Te(), s];
    typeof localStorage < "u" && localStorage.setItem("clickedNfts", JSON.stringify(u));
  } catch {
    return null;
  }
}
function xt({
  notiVal: s,
  showNoti: o,
  isOpen: u,
  clickHandler: p
}) {
  const h = Te(), l = j.useContext(Qr), f = l == null ? void 0 : l.widgetState, a = f == null ? void 0 : f.foundNft, w = a && JSON.parse(a).itemId, _ = !u && (a ? !h.includes(a) && !!w : !1), [x, m] = j.useState(_);
  return j.useEffect(() => {
    m(_);
  }, [_]), /* @__PURE__ */ Or(
    "div",
    {
      className: _r(G.popupButton__container, {
        [G["popupButton__container--open"]]: u
      }),
      children: [
        /* @__PURE__ */ H(
          "span",
          {
            className: x ? G.ring : void 0,
            style: { boxShadow: "none" }
          }
        ),
        /* @__PURE__ */ Or(
          "button",
          {
            className: G.popupButton,
            type: "button",
            onClick: (k) => {
              m(!1), a && mt(a), p(k);
            },
            children: [
              /* @__PURE__ */ H(
                "div",
                {
                  className: _r(G.icon, {
                    [G.activeIcon]: !u,
                    [G.inactiveIcon]: u
                  }),
                  children: /* @__PURE__ */ H(
                    "img",
                    {
                      alt: "WalletChat",
                      src: "https://uploads-ssl.webflow.com/62d761bae8bf2da003f57b06/62d761bae8bf2dea68f57b52_walletchat%20logo.png",
                      style: { height: "90%" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ H(
                "div",
                {
                  className: _r(G.icon, {
                    [G.activeIcon]: u,
                    [G.inactiveIcon]: !u
                  }),
                  children: /* @__PURE__ */ H(
                    "svg",
                    {
                      focusable: "false",
                      viewBox: "0 0 16 14",
                      width: "28",
                      height: "25",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /* @__PURE__ */ H(
                        "path",
                        {
                          fillRule: "evenodd",
                          clipRule: "evenodd",
                          d: "M.116 4.884l1.768-1.768L8 9.232l6.116-6.116 1.768 1.768L8 12.768.116 4.884z"
                        }
                      )
                    }
                  )
                }
              )
            ]
          }
        ),
        o && /* @__PURE__ */ Or(st, { children: [
          /* @__PURE__ */ H("span", { className: _r(G.notif, G.pinging) }),
          /* @__PURE__ */ H("span", { className: G.notif, children: s })
        ] })
      ]
    }
  );
}
const Et = "_ring_q714d_1", jr = {
  ring: Et,
  "wallet-chat-widget": "_wallet-chat-widget_q714d_23",
  "widget-is-open": "_widget-is-open_q714d_9",
  "widget-is-closed": "_widget-is-closed_q714d_13",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_q714d_23",
  "wallet-chat-widget__container--open": "_wallet-chat-widget__container--open_q714d_27"
};
var Dr = {}, _t = {
  get exports() {
    return Dr;
  },
  set exports(s) {
    Dr = s;
  }
}, bt = null;
const At = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bt
}, Symbol.toStringTag, { value: "Module" })), Ft = /* @__PURE__ */ ze(At);
function tr(s) {
  if (typeof s != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(s));
}
function be(s, o) {
  for (var u = "", p = 0, h = -1, l = 0, f, a = 0; a <= s.length; ++a) {
    if (a < s.length)
      f = s.charCodeAt(a);
    else {
      if (f === 47)
        break;
      f = 47;
    }
    if (f === 47) {
      if (!(h === a - 1 || l === 1))
        if (h !== a - 1 && l === 2) {
          if (u.length < 2 || p !== 2 || u.charCodeAt(u.length - 1) !== 46 || u.charCodeAt(u.length - 2) !== 46) {
            if (u.length > 2) {
              var w = u.lastIndexOf("/");
              if (w !== u.length - 1) {
                w === -1 ? (u = "", p = 0) : (u = u.slice(0, w), p = u.length - 1 - u.lastIndexOf("/")), h = a, l = 0;
                continue;
              }
            } else if (u.length === 2 || u.length === 1) {
              u = "", p = 0, h = a, l = 0;
              continue;
            }
          }
          o && (u.length > 0 ? u += "/.." : u = "..", p = 2);
        } else
          u.length > 0 ? u += "/" + s.slice(h + 1, a) : u = s.slice(h + 1, a), p = a - h - 1;
      h = a, l = 0;
    } else
      f === 46 && l !== -1 ? ++l : l = -1;
  }
  return u;
}
function Rt(s, o) {
  var u = o.dir || o.root, p = o.base || (o.name || "") + (o.ext || "");
  return u ? u === o.root ? u + p : u + s + p : p;
}
var Ar = {
  // path.resolve([from ...], to)
  resolve: function() {
    for (var o = "", u = !1, p, h = arguments.length - 1; h >= -1 && !u; h--) {
      var l;
      h >= 0 ? l = arguments[h] : (p === void 0 && (p = ar.cwd()), l = p), tr(l), l.length !== 0 && (o = l + "/" + o, u = l.charCodeAt(0) === 47);
    }
    return o = be(o, !u), u ? o.length > 0 ? "/" + o : "/" : o.length > 0 ? o : ".";
  },
  normalize: function(o) {
    if (tr(o), o.length === 0)
      return ".";
    var u = o.charCodeAt(0) === 47, p = o.charCodeAt(o.length - 1) === 47;
    return o = be(o, !u), o.length === 0 && !u && (o = "."), o.length > 0 && p && (o += "/"), u ? "/" + o : o;
  },
  isAbsolute: function(o) {
    return tr(o), o.length > 0 && o.charCodeAt(0) === 47;
  },
  join: function() {
    if (arguments.length === 0)
      return ".";
    for (var o, u = 0; u < arguments.length; ++u) {
      var p = arguments[u];
      tr(p), p.length > 0 && (o === void 0 ? o = p : o += "/" + p);
    }
    return o === void 0 ? "." : Ar.normalize(o);
  },
  relative: function(o, u) {
    if (tr(o), tr(u), o === u || (o = Ar.resolve(o), u = Ar.resolve(u), o === u))
      return "";
    for (var p = 1; p < o.length && o.charCodeAt(p) === 47; ++p)
      ;
    for (var h = o.length, l = h - p, f = 1; f < u.length && u.charCodeAt(f) === 47; ++f)
      ;
    for (var a = u.length, w = a - f, _ = l < w ? l : w, x = -1, m = 0; m <= _; ++m) {
      if (m === _) {
        if (w > _) {
          if (u.charCodeAt(f + m) === 47)
            return u.slice(f + m + 1);
          if (m === 0)
            return u.slice(f + m);
        } else
          l > _ && (o.charCodeAt(p + m) === 47 ? x = m : m === 0 && (x = 0));
        break;
      }
      var k = o.charCodeAt(p + m), U = u.charCodeAt(f + m);
      if (k !== U)
        break;
      k === 47 && (x = m);
    }
    var Y = "";
    for (m = p + x + 1; m <= h; ++m)
      (m === h || o.charCodeAt(m) === 47) && (Y.length === 0 ? Y += ".." : Y += "/..");
    return Y.length > 0 ? Y + u.slice(f + x) : (f += x, u.charCodeAt(f) === 47 && ++f, u.slice(f));
  },
  _makeLong: function(o) {
    return o;
  },
  dirname: function(o) {
    if (tr(o), o.length === 0)
      return ".";
    for (var u = o.charCodeAt(0), p = u === 47, h = -1, l = !0, f = o.length - 1; f >= 1; --f)
      if (u = o.charCodeAt(f), u === 47) {
        if (!l) {
          h = f;
          break;
        }
      } else
        l = !1;
    return h === -1 ? p ? "/" : "." : p && h === 1 ? "//" : o.slice(0, h);
  },
  basename: function(o, u) {
    if (u !== void 0 && typeof u != "string")
      throw new TypeError('"ext" argument must be a string');
    tr(o);
    var p = 0, h = -1, l = !0, f;
    if (u !== void 0 && u.length > 0 && u.length <= o.length) {
      if (u.length === o.length && u === o)
        return "";
      var a = u.length - 1, w = -1;
      for (f = o.length - 1; f >= 0; --f) {
        var _ = o.charCodeAt(f);
        if (_ === 47) {
          if (!l) {
            p = f + 1;
            break;
          }
        } else
          w === -1 && (l = !1, w = f + 1), a >= 0 && (_ === u.charCodeAt(a) ? --a === -1 && (h = f) : (a = -1, h = w));
      }
      return p === h ? h = w : h === -1 && (h = o.length), o.slice(p, h);
    } else {
      for (f = o.length - 1; f >= 0; --f)
        if (o.charCodeAt(f) === 47) {
          if (!l) {
            p = f + 1;
            break;
          }
        } else
          h === -1 && (l = !1, h = f + 1);
      return h === -1 ? "" : o.slice(p, h);
    }
  },
  extname: function(o) {
    tr(o);
    for (var u = -1, p = 0, h = -1, l = !0, f = 0, a = o.length - 1; a >= 0; --a) {
      var w = o.charCodeAt(a);
      if (w === 47) {
        if (!l) {
          p = a + 1;
          break;
        }
        continue;
      }
      h === -1 && (l = !1, h = a + 1), w === 46 ? u === -1 ? u = a : f !== 1 && (f = 1) : u !== -1 && (f = -1);
    }
    return u === -1 || h === -1 || // We saw a non-dot character immediately before the dot
    f === 0 || // The (right-most) trimmed path component is exactly '..'
    f === 1 && u === h - 1 && u === p + 1 ? "" : o.slice(u, h);
  },
  format: function(o) {
    if (o === null || typeof o != "object")
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof o);
    return Rt("/", o);
  },
  parse: function(o) {
    tr(o);
    var u = { root: "", dir: "", base: "", ext: "", name: "" };
    if (o.length === 0)
      return u;
    var p = o.charCodeAt(0), h = p === 47, l;
    h ? (u.root = "/", l = 1) : l = 0;
    for (var f = -1, a = 0, w = -1, _ = !0, x = o.length - 1, m = 0; x >= l; --x) {
      if (p = o.charCodeAt(x), p === 47) {
        if (!_) {
          a = x + 1;
          break;
        }
        continue;
      }
      w === -1 && (_ = !1, w = x + 1), p === 46 ? f === -1 ? f = x : m !== 1 && (m = 1) : f !== -1 && (m = -1);
    }
    return f === -1 || w === -1 || // We saw a non-dot character immediately before the dot
    m === 0 || // The (right-most) trimmed path component is exactly '..'
    m === 1 && f === w - 1 && f === a + 1 ? w !== -1 && (a === 0 && h ? u.base = u.name = o.slice(1, w) : u.base = u.name = o.slice(a, w)) : (a === 0 && h ? (u.name = o.slice(1, f), u.base = o.slice(1, w)) : (u.name = o.slice(a, f), u.base = o.slice(a, w)), u.ext = o.slice(f, w)), a > 0 ? u.dir = o.slice(0, a - 1) : h && (u.dir = "/"), u;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
Ar.posix = Ar;
var Ct = Ar, M = {};
M.endianness = function() {
  return "LE";
};
M.hostname = function() {
  return typeof location < "u" ? location.hostname : "";
};
M.loadavg = function() {
  return [];
};
M.uptime = function() {
  return 0;
};
M.freemem = function() {
  return Number.MAX_VALUE;
};
M.totalmem = function() {
  return Number.MAX_VALUE;
};
M.cpus = function() {
  return [];
};
M.type = function() {
  return "Browser";
};
M.release = function() {
  return typeof navigator < "u" ? navigator.appVersion : "";
};
M.networkInterfaces = M.getNetworkInterfaces = function() {
  return {};
};
M.arch = function() {
  return "javascript";
};
M.platform = function() {
  return "browser";
};
M.tmpdir = M.tmpDir = function() {
  return "/tmp";
};
M.EOL = `
`;
M.homedir = function() {
  return "/";
};
const Tt = "dotenv", St = "16.0.3", Bt = "Loads environment variables from .env file", It = "lib/main.js", kt = "lib/main.d.ts", Ut = {
  ".": {
    require: "./lib/main.js",
    types: "./lib/main.d.ts",
    default: "./lib/main.js"
  },
  "./config": "./config.js",
  "./config.js": "./config.js",
  "./lib/env-options": "./lib/env-options.js",
  "./lib/env-options.js": "./lib/env-options.js",
  "./lib/cli-options": "./lib/cli-options.js",
  "./lib/cli-options.js": "./lib/cli-options.js",
  "./package.json": "./package.json"
}, jt = {
  "dts-check": "tsc --project tests/types/tsconfig.json",
  lint: "standard",
  "lint-readme": "standard-markdown",
  pretest: "npm run lint && npm run dts-check",
  test: "tap tests/*.js --100 -Rspec",
  prerelease: "npm test",
  release: "standard-version"
}, Ot = {
  type: "git",
  url: "git://github.com/motdotla/dotenv.git"
}, Pt = [
  "dotenv",
  "env",
  ".env",
  "environment",
  "variables",
  "config",
  "settings"
], Dt = "README.md", Nt = "BSD-2-Clause", Lt = {
  "@types/node": "^17.0.9",
  decache: "^4.6.1",
  dtslint: "^3.7.0",
  sinon: "^12.0.1",
  standard: "^16.0.4",
  "standard-markdown": "^7.1.0",
  "standard-version": "^9.3.2",
  tap: "^15.1.6",
  tar: "^6.1.11",
  typescript: "^4.5.4"
}, Mt = {
  node: ">=12"
}, Wt = {
  name: Tt,
  version: St,
  description: Bt,
  main: It,
  types: kt,
  exports: Ut,
  scripts: jt,
  repository: Ot,
  keywords: Pt,
  readmeFilename: Dt,
  license: Nt,
  devDependencies: Lt,
  engines: Mt
}, $t = Ft, Se = Ct, Yt = M, Vt = Wt, qt = Vt.version, zt = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
function Jt(s) {
  const o = {};
  let u = s.toString();
  u = u.replace(/\r\n?/mg, `
`);
  let p;
  for (; (p = zt.exec(u)) != null; ) {
    const h = p[1];
    let l = p[2] || "";
    l = l.trim();
    const f = l[0];
    l = l.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), f === '"' && (l = l.replace(/\\n/g, `
`), l = l.replace(/\\r/g, "\r")), o[h] = l;
  }
  return o;
}
function se(s) {
  console.log(`[dotenv@${qt}][DEBUG] ${s}`);
}
function Gt(s) {
  return s[0] === "~" ? Se.join(Yt.homedir(), s.slice(1)) : s;
}
function Ht(s) {
  let o = Se.resolve(ar.cwd(), ".env"), u = "utf8";
  const p = !!(s && s.debug), h = !!(s && s.override);
  s && (s.path != null && (o = Gt(s.path)), s.encoding != null && (u = s.encoding));
  try {
    const l = Zr.parse($t.readFileSync(o, { encoding: u }));
    return Object.keys(l).forEach(function(f) {
      Object.prototype.hasOwnProperty.call(ar.env, f) ? (h === !0 && (ar.env[f] = l[f]), p && se(h === !0 ? `"${f}" is already defined in \`process.env\` and WAS overwritten` : `"${f}" is already defined in \`process.env\` and was NOT overwritten`)) : ar.env[f] = l[f];
    }), { parsed: l };
  } catch (l) {
    return p && se(`Failed to load ${o} ${l.message}`), { error: l };
  }
}
const Zr = {
  config: Ht,
  parse: Jt
};
Dr.config = Zr.config;
Dr.parse = Zr.parse;
_t.exports = Zr;
Dr.config({ path: "../../../../" });
const Xt = ar.env.REACT_APP_APP_URL || "https://staging.walletchat.fun", Be = jr["wallet-chat-widget"];
function pr(s) {
  var u;
  if (typeof document > "u")
    return;
  const o = document == null ? void 0 : document.getElementById(Be);
  (u = o == null ? void 0 : o.contentWindow) == null || u.postMessage(s, "*");
}
function Kt(s) {
  pr({
    target: "origin",
    data: {
      domain: window.location.host,
      origin: window.location.protocol + window.location.host
    }
  }), pr({ target: "sign_in", data: s || null });
}
function nn({
  connectedWallet: s,
  signMessage: o,
  style: u
}) {
  const p = j.useRef(""), h = j.useRef(null), l = j.useRef(s), f = j.useRef(!1), a = j.useContext(Qr), { widgetState: w, setWidgetState: _ } = a || {}, { ownerAddress: x } = w || {}, [m, k] = j.useState(f.current), [U, Y] = j.useState(0), Z = !!o, vr = () => {
    k((T) => {
      const V = !!T;
      return h.current && !V && pr({
        target: "nft_info",
        data: { ...h.current, redirect: !0 }
      }), h.current = null, f.current = !V, !V;
    });
  }, q = j.useCallback(() => {
    s && (m || Z) && Kt({ ...s, hasSigner: Z });
  }, [s, m, Z]);
  return j.useEffect(() => {
    q();
  }, [q]), j.useEffect(() => {
    if (!(x != null && x.address))
      return;
    const T = x.address, V = ce(window.location.href);
    V.network && (h.current = {
      ...V,
      ownerAddress: T
    }), h.current ? pr({
      target: "nft_info",
      data: { ...h.current, redirect: !0 }
    }) : pr({ target: "nft_info", data: { ownerAddress: T } }), k(!0);
  }, [x]), j.useEffect(() => {
    const T = () => {
      if (window.location.href === p.current)
        return;
      p.current = window.location.href;
      const W = ce(window.location.href);
      _ && _("foundNft", JSON.stringify(W)), W.network && (h.current = W), pr({ target: "nft_info", data: W });
    }, V = new MutationObserver(T), z = { subtree: !0, childList: !0 };
    return T(), V.observe(document, z), () => V.disconnect();
  }, [_]), j.useEffect(() => {
    l.current = s;
  }, [s]), j.useEffect(() => {
    const T = (V) => {
      const z = V.data;
      z.target === "unread_cnt" && Y(z.data), z.target === "message_to_sign" && o && l.current && o({ message: z.data }).then(
        (W) => W && pr({
          target: "signed_message",
          data: { signature: W, signedMsg: z.data }
        })
      ).catch(
        () => pr({
          target: "signed_message",
          data: { signature: null, signedMsg: z.data }
        })
      ), z.target === "close_widget" && vr(), z.target === "is_signed_in" && !z.data && q();
    };
    return window.addEventListener("message", T), () => window.removeEventListener("message", T);
  }, [o, q]), /* @__PURE__ */ Or(
    "div",
    {
      className: _r(jr["wallet-chat-widget__container"], {
        [jr["wallet-chat-widget__container--open"]]: m
      }),
      style: u,
      children: [
        /* @__PURE__ */ H(
          "iframe",
          {
            title: "WalletChat",
            name: "WalletChat",
            id: Be,
            className: _r("", {
              [jr["widget-is-open"]]: m,
              [jr["widget-is-closed"]]: !m
            }),
            src: Xt
          }
        ),
        /* @__PURE__ */ H(
          xt,
          {
            notiVal: U,
            showNoti: U > 0,
            isOpen: m,
            clickHandler: vr
          }
        )
      ]
    }
  );
}
const Qt = ({
  onClick: s,
  children: o
}) => /* @__PURE__ */ H("button", { type: "button", onClick: s, children: o }), on = ({
  ownerAddress: s,
  render: o
}) => {
  const u = j.useContext(Qr), p = u == null ? void 0 : u.setWidgetState, h = o ? ({ onClick: l, children: f }) => j.cloneElement(o, { onClick: l }, f) : Qt;
  return u ? /* @__PURE__ */ Or(
    h,
    {
      onClick: () => p && p("ownerAddress", {
        address: s,
        lastRequest: Date.now().toString()
      }),
      children: [
        /* @__PURE__ */ H(
          "div",
          {
            style: {
              backgroundImage: "url(https://uploads-ssl.webflow.com/62d761bae8bf2da003f57b06/62d761bae8bf2dea68f57b52_walletchat%20logo.png)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "25px",
              height: "25px"
            }
          }
        ),
        "Chat with owner"
      ]
    }
  ) : (console.error(
    "WalletChat: ChatWithOwner component must be rendered within a WalletChatProvider"
  ), null);
};
export {
  on as ChatWithOwner,
  tn as WalletChatProvider,
  nn as WalletChatWidget,
  en as types,
  rn as utils
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._ring_7tcsj_47{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._popupButton__container_7tcsj_5{position:relative;margin-top:.75rem;height:4rem;--tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / .15));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:margin-top,transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}._popupButton__container--open_7tcsj_9{right:1.5rem;margin-top:-4rem;--tw-translate-y: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._popupButton__container--open_7tcsj_9{right:0px;margin-top:.75rem;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._popupButton_7tcsj_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}._icon_7tcsj_23{transition-property:transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_7tcsj_23 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_7tcsj_31{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_7tcsj_35{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_7tcsj_39{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(219 39 119 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}._pinging_7tcsj_43{animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite}._ring_7tcsj_47{position:fixed;right:0px;display:inline-flex;height:4rem;width:4rem}@keyframes _ping_7tcsj_43{75%,to{transform:scale(2);opacity:0}}._ring_7tcsj_47{animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity));opacity:.75}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._ring_q714d_1{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}#_wallet-chat-widget_q714d_23{transition-property:width,min-width,height,min-height;transition-duration:.25s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(4px 4px 8px rgba(0,0,0,.5));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._widget-is-open_q714d_9{height:75vh;min-height:440px;width:calc(100vw - 2rem);--tw-translate-x: -1rem;--tw-translate-y: -.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._widget-is-open_q714d_9{height:65vh;width:15vw;min-width:440px;--tw-translate-x: 0px;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._widget-is-closed_q714d_13{height:0px;min-height:0px;width:0px;min-width:0px}._wallet-chat-widget__container_q714d_23{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;-moz-user-select:none;user-select:none}._wallet-chat-widget__container--open_q714d_27{bottom:0px;right:0px}@media (min-width: 640px){._wallet-chat-widget__container--open_q714d_27{bottom:.5rem;right:1.5rem}}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
