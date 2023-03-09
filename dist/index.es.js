import j from "react";
var Pe = {}, $r = {};
$r.byteLength = Me;
$r.toByteArray = Ne;
$r.fromByteArray = Ve;
var Q = [], V = [], Le = typeof Uint8Array < "u" ? Uint8Array : Array, Zr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var dr = 0, We = Zr.length; dr < We; ++dr)
  Q[dr] = Zr[dr], V[Zr.charCodeAt(dr)] = dr;
V["-".charCodeAt(0)] = 62;
V["_".charCodeAt(0)] = 63;
function ve(u) {
  var s = u.length;
  if (s % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var h = u.indexOf("=");
  h === -1 && (h = s);
  var v = h === s ? 0 : 4 - h % 4;
  return [h, v];
}
function Me(u) {
  var s = ve(u), h = s[0], v = s[1];
  return (h + v) * 3 / 4 - v;
}
function je(u, s, h) {
  return (s + h) * 3 / 4 - h;
}
function Ne(u) {
  var s, h = ve(u), v = h[0], y = h[1], w = new Le(je(u, v, y)), d = 0, a = y > 0 ? v - 4 : v, m;
  for (m = 0; m < a; m += 4)
    s = V[u.charCodeAt(m)] << 18 | V[u.charCodeAt(m + 1)] << 12 | V[u.charCodeAt(m + 2)] << 6 | V[u.charCodeAt(m + 3)], w[d++] = s >> 16 & 255, w[d++] = s >> 8 & 255, w[d++] = s & 255;
  return y === 2 && (s = V[u.charCodeAt(m)] << 2 | V[u.charCodeAt(m + 1)] >> 4, w[d++] = s & 255), y === 1 && (s = V[u.charCodeAt(m)] << 10 | V[u.charCodeAt(m + 1)] << 4 | V[u.charCodeAt(m + 2)] >> 2, w[d++] = s >> 8 & 255, w[d++] = s & 255), w;
}
function Ye(u) {
  return Q[u >> 18 & 63] + Q[u >> 12 & 63] + Q[u >> 6 & 63] + Q[u & 63];
}
function $e(u, s, h) {
  for (var v, y = [], w = s; w < h; w += 3)
    v = (u[w] << 16 & 16711680) + (u[w + 1] << 8 & 65280) + (u[w + 2] & 255), y.push(Ye(v));
  return y.join("");
}
function Ve(u) {
  for (var s, h = u.length, v = h % 3, y = [], w = 16383, d = 0, a = h - v; d < a; d += w)
    y.push($e(u, d, d + w > a ? a : d + w));
  return v === 1 ? (s = u[h - 1], y.push(
    Q[s >> 2] + Q[s << 4 & 63] + "=="
  )) : v === 2 && (s = (u[h - 2] << 8) + u[h - 1], y.push(
    Q[s >> 10] + Q[s >> 4 & 63] + Q[s << 2 & 63] + "="
  )), y.join("");
}
var ie = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ie.read = function(u, s, h, v, y) {
  var w, d, a = y * 8 - v - 1, m = (1 << a) - 1, P = m >> 1, x = -7, E = h ? y - 1 : 0, I = h ? -1 : 1, S = u[s + E];
  for (E += I, w = S & (1 << -x) - 1, S >>= -x, x += a; x > 0; w = w * 256 + u[s + E], E += I, x -= 8)
    ;
  for (d = w & (1 << -x) - 1, w >>= -x, x += v; x > 0; d = d * 256 + u[s + E], E += I, x -= 8)
    ;
  if (w === 0)
    w = 1 - P;
  else {
    if (w === m)
      return d ? NaN : (S ? -1 : 1) * (1 / 0);
    d = d + Math.pow(2, v), w = w - P;
  }
  return (S ? -1 : 1) * d * Math.pow(2, w - v);
};
ie.write = function(u, s, h, v, y, w) {
  var d, a, m, P = w * 8 - y - 1, x = (1 << P) - 1, E = x >> 1, I = y === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, S = v ? 0 : w - 1, nr = v ? 1 : -1, ar = s < 0 || s === 0 && 1 / s < 0 ? 1 : 0;
  for (s = Math.abs(s), isNaN(s) || s === 1 / 0 ? (a = isNaN(s) ? 1 : 0, d = x) : (d = Math.floor(Math.log(s) / Math.LN2), s * (m = Math.pow(2, -d)) < 1 && (d--, m *= 2), d + E >= 1 ? s += I / m : s += I * Math.pow(2, 1 - E), s * m >= 2 && (d++, m /= 2), d + E >= x ? (a = 0, d = x) : d + E >= 1 ? (a = (s * m - 1) * Math.pow(2, y), d = d + E) : (a = s * Math.pow(2, E - 1) * Math.pow(2, y), d = 0)); y >= 8; u[h + S] = a & 255, S += nr, a /= 256, y -= 8)
    ;
  for (d = d << y | a, P += y; P > 0; u[h + S] = d & 255, S += nr, d /= 256, P -= 8)
    ;
  u[h + S - nr] |= ar * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  var s = $r, h = ie, v = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  u.Buffer = a, u.SlowBuffer = W, u.INSPECT_MAX_BYTES = 50;
  var y = 2147483647;
  u.kMaxLength = y, a.TYPED_ARRAY_SUPPORT = w(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function w() {
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
  function d(t) {
    if (t > y)
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
      return E(t);
    }
    return m(t, r, e);
  }
  a.poolSize = 8192;
  function m(t, r, e) {
    if (typeof t == "string")
      return I(t, r);
    if (ArrayBuffer.isView(t))
      return nr(t);
    if (t == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
      );
    if (Y(t, ArrayBuffer) || t && Y(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Y(t, SharedArrayBuffer) || t && Y(t.buffer, SharedArrayBuffer)))
      return ar(t, r, e);
    if (typeof t == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var n = t.valueOf && t.valueOf();
    if (n != null && n !== t)
      return a.from(n, r, e);
    var o = Vr(t);
    if (o)
      return o;
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
    return m(t, r, e);
  }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
  function P(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function x(t, r, e) {
    return P(t), t <= 0 ? d(t) : r !== void 0 ? typeof e == "string" ? d(t).fill(r, e) : d(t).fill(r) : d(t);
  }
  a.alloc = function(t, r, e) {
    return x(t, r, e);
  };
  function E(t) {
    return P(t), d(t < 0 ? 0 : G(t) | 0);
  }
  a.allocUnsafe = function(t) {
    return E(t);
  }, a.allocUnsafeSlow = function(t) {
    return E(t);
  };
  function I(t, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !a.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var e = Cr(t, r) | 0, n = d(e), o = n.write(t, r);
    return o !== e && (n = n.slice(0, o)), n;
  }
  function S(t) {
    for (var r = t.length < 0 ? 0 : G(t.length) | 0, e = d(r), n = 0; n < r; n += 1)
      e[n] = t[n] & 255;
    return e;
  }
  function nr(t) {
    if (Y(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return ar(r.buffer, r.byteOffset, r.byteLength);
    }
    return S(t);
  }
  function ar(t, r, e) {
    if (r < 0 || t.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < r + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var n;
    return r === void 0 && e === void 0 ? n = new Uint8Array(t) : e === void 0 ? n = new Uint8Array(t, r) : n = new Uint8Array(t, r, e), Object.setPrototypeOf(n, a.prototype), n;
  }
  function Vr(t) {
    if (a.isBuffer(t)) {
      var r = G(t.length) | 0, e = d(r);
      return e.length === 0 || t.copy(e, 0, 0, r), e;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || xr(t.length) ? d(0) : S(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return S(t.data);
  }
  function G(t) {
    if (t >= y)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + y.toString(16) + " bytes");
    return t | 0;
  }
  function W(t) {
    return +t != t && (t = 0), a.alloc(+t);
  }
  a.isBuffer = function(r) {
    return r != null && r._isBuffer === !0 && r !== a.prototype;
  }, a.compare = function(r, e) {
    if (Y(r, Uint8Array) && (r = a.from(r, r.offset, r.byteLength)), Y(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)), !a.isBuffer(r) || !a.isBuffer(e))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (r === e)
      return 0;
    for (var n = r.length, o = e.length, c = 0, l = Math.min(n, o); c < l; ++c)
      if (r[c] !== e[c]) {
        n = r[c], o = e[c];
        break;
      }
    return n < o ? -1 : o < n ? 1 : 0;
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
    var o = a.allocUnsafe(e), c = 0;
    for (n = 0; n < r.length; ++n) {
      var l = r[n];
      if (Y(l, Uint8Array))
        c + l.length > o.length ? a.from(l).copy(o, c) : Uint8Array.prototype.set.call(
          o,
          l,
          c
        );
      else if (a.isBuffer(l))
        l.copy(o, c);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      c += l.length;
    }
    return o;
  };
  function Cr(t, r) {
    if (a.isBuffer(t))
      return t.length;
    if (ArrayBuffer.isView(t) || Y(t, ArrayBuffer))
      return t.byteLength;
    if (typeof t != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t
      );
    var e = t.length, n = arguments.length > 2 && arguments[2] === !0;
    if (!n && e === 0)
      return 0;
    for (var o = !1; ; )
      switch (r) {
        case "ascii":
        case "latin1":
        case "binary":
          return e;
        case "utf8":
        case "utf-8":
          return or(t).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return e * 2;
        case "hex":
          return e >>> 1;
        case "base64":
          return jr(t).length;
        default:
          if (o)
            return n ? -1 : or(t).length;
          r = ("" + r).toLowerCase(), o = !0;
      }
  }
  a.byteLength = Cr;
  function qr(t, r, e) {
    var n = !1;
    if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, r >>>= 0, e <= r))
      return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return Pr(this, r, e);
        case "utf8":
        case "utf-8":
          return H(this, r, e);
        case "ascii":
          return Or(this, r, e);
        case "latin1":
        case "binary":
          return Dr(this, r, e);
        case "base64":
          return J(this, r, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Lr(this, r, e);
        default:
          if (n)
            throw new TypeError("Unknown encoding: " + t);
          t = (t + "").toLowerCase(), n = !0;
      }
  }
  a.prototype._isBuffer = !0;
  function Z(t, r, e) {
    var n = t[r];
    t[r] = t[e], t[e] = n;
  }
  a.prototype.swap16 = function() {
    var r = this.length;
    if (r % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var e = 0; e < r; e += 2)
      Z(this, e, e + 1);
    return this;
  }, a.prototype.swap32 = function() {
    var r = this.length;
    if (r % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var e = 0; e < r; e += 4)
      Z(this, e, e + 3), Z(this, e + 1, e + 2);
    return this;
  }, a.prototype.swap64 = function() {
    var r = this.length;
    if (r % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var e = 0; e < r; e += 8)
      Z(this, e, e + 7), Z(this, e + 1, e + 6), Z(this, e + 2, e + 5), Z(this, e + 3, e + 4);
    return this;
  }, a.prototype.toString = function() {
    var r = this.length;
    return r === 0 ? "" : arguments.length === 0 ? H(this, 0, r) : qr.apply(this, arguments);
  }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(r) {
    if (!a.isBuffer(r))
      throw new TypeError("Argument must be a Buffer");
    return this === r ? !0 : a.compare(this, r) === 0;
  }, a.prototype.inspect = function() {
    var r = "", e = u.INSPECT_MAX_BYTES;
    return r = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (r += " ... "), "<Buffer " + r + ">";
  }, v && (a.prototype[v] = a.prototype.inspect), a.prototype.compare = function(r, e, n, o, c) {
    if (Y(r, Uint8Array) && (r = a.from(r, r.offset, r.byteLength)), !a.isBuffer(r))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof r
      );
    if (e === void 0 && (e = 0), n === void 0 && (n = r ? r.length : 0), o === void 0 && (o = 0), c === void 0 && (c = this.length), e < 0 || n > r.length || o < 0 || c > this.length)
      throw new RangeError("out of range index");
    if (o >= c && e >= n)
      return 0;
    if (o >= c)
      return -1;
    if (e >= n)
      return 1;
    if (e >>>= 0, n >>>= 0, o >>>= 0, c >>>= 0, this === r)
      return 0;
    for (var l = c - o, b = n - e, R = Math.min(l, b), C = this.slice(o, c), L = r.slice(e, n), A = 0; A < R; ++A)
      if (C[A] !== L[A]) {
        l = C[A], b = L[A];
        break;
      }
    return l < b ? -1 : b < l ? 1 : 0;
  };
  function Br(t, r, e, n, o) {
    if (t.length === 0)
      return -1;
    if (typeof e == "string" ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, xr(e) && (e = o ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
      if (o)
        return -1;
      e = t.length - 1;
    } else if (e < 0)
      if (o)
        e = 0;
      else
        return -1;
    if (typeof r == "string" && (r = a.from(r, n)), a.isBuffer(r))
      return r.length === 0 ? -1 : Ir(t, r, e, n, o);
    if (typeof r == "number")
      return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? o ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : Ir(t, [r], e, n, o);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Ir(t, r, e, n, o) {
    var c = 1, l = t.length, b = r.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || r.length < 2)
        return -1;
      c = 2, l /= 2, b /= 2, e /= 2;
    }
    function R(Er, _r) {
      return c === 1 ? Er[_r] : Er.readUInt16BE(_r * c);
    }
    var C;
    if (o) {
      var L = -1;
      for (C = e; C < l; C++)
        if (R(t, C) === R(r, L === -1 ? 0 : C - L)) {
          if (L === -1 && (L = C), C - L + 1 === b)
            return L * c;
        } else
          L !== -1 && (C -= C - L), L = -1;
    } else
      for (e + b > l && (e = l - b), C = e; C >= 0; C--) {
        for (var A = !0, lr = 0; lr < b; lr++)
          if (R(t, C + lr) !== R(r, lr)) {
            A = !1;
            break;
          }
        if (A)
          return C;
      }
    return -1;
  }
  a.prototype.includes = function(r, e, n) {
    return this.indexOf(r, e, n) !== -1;
  }, a.prototype.indexOf = function(r, e, n) {
    return Br(this, r, e, n, !0);
  }, a.prototype.lastIndexOf = function(r, e, n) {
    return Br(this, r, e, n, !1);
  };
  function Jr(t, r, e, n) {
    e = Number(e) || 0;
    var o = t.length - e;
    n ? (n = Number(n), n > o && (n = o)) : n = o;
    var c = r.length;
    n > c / 2 && (n = c / 2);
    for (var l = 0; l < n; ++l) {
      var b = parseInt(r.substr(l * 2, 2), 16);
      if (xr(b))
        return l;
      t[e + l] = b;
    }
    return l;
  }
  function Sr(t, r, e, n) {
    return ur(or(r, t.length - e), t, e, n);
  }
  function zr(t, r, e, n) {
    return ur(gr(r), t, e, n);
  }
  function Gr(t, r, e, n) {
    return ur(jr(r), t, e, n);
  }
  function Ur(t, r, e, n) {
    return ur(fr(r, t.length - e), t, e, n);
  }
  a.prototype.write = function(r, e, n, o) {
    if (e === void 0)
      o = "utf8", n = this.length, e = 0;
    else if (n === void 0 && typeof e == "string")
      o = e, n = this.length, e = 0;
    else if (isFinite(e))
      e = e >>> 0, isFinite(n) ? (n = n >>> 0, o === void 0 && (o = "utf8")) : (o = n, n = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    var c = this.length - e;
    if ((n === void 0 || n > c) && (n = c), r.length > 0 && (n < 0 || e < 0) || e > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    o || (o = "utf8");
    for (var l = !1; ; )
      switch (o) {
        case "hex":
          return Jr(this, r, e, n);
        case "utf8":
        case "utf-8":
          return Sr(this, r, e, n);
        case "ascii":
        case "latin1":
        case "binary":
          return zr(this, r, e, n);
        case "base64":
          return Gr(this, r, e, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Ur(this, r, e, n);
        default:
          if (l)
            throw new TypeError("Unknown encoding: " + o);
          o = ("" + o).toLowerCase(), l = !0;
      }
  }, a.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function J(t, r, e) {
    return r === 0 && e === t.length ? s.fromByteArray(t) : s.fromByteArray(t.slice(r, e));
  }
  function H(t, r, e) {
    e = Math.min(t.length, e);
    for (var n = [], o = r; o < e; ) {
      var c = t[o], l = null, b = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
      if (o + b <= e) {
        var R, C, L, A;
        switch (b) {
          case 1:
            c < 128 && (l = c);
            break;
          case 2:
            R = t[o + 1], (R & 192) === 128 && (A = (c & 31) << 6 | R & 63, A > 127 && (l = A));
            break;
          case 3:
            R = t[o + 1], C = t[o + 2], (R & 192) === 128 && (C & 192) === 128 && (A = (c & 15) << 12 | (R & 63) << 6 | C & 63, A > 2047 && (A < 55296 || A > 57343) && (l = A));
            break;
          case 4:
            R = t[o + 1], C = t[o + 2], L = t[o + 3], (R & 192) === 128 && (C & 192) === 128 && (L & 192) === 128 && (A = (c & 15) << 18 | (R & 63) << 12 | (C & 63) << 6 | L & 63, A > 65535 && A < 1114112 && (l = A));
        }
      }
      l === null ? (l = 65533, b = 1) : l > 65535 && (l -= 65536, n.push(l >>> 10 & 1023 | 55296), l = 56320 | l & 1023), n.push(l), o += b;
    }
    return kr(n);
  }
  var ir = 4096;
  function kr(t) {
    var r = t.length;
    if (r <= ir)
      return String.fromCharCode.apply(String, t);
    for (var e = "", n = 0; n < r; )
      e += String.fromCharCode.apply(
        String,
        t.slice(n, n += ir)
      );
    return e;
  }
  function Or(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var o = r; o < e; ++o)
      n += String.fromCharCode(t[o] & 127);
    return n;
  }
  function Dr(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var o = r; o < e; ++o)
      n += String.fromCharCode(t[o]);
    return n;
  }
  function Pr(t, r, e) {
    var n = t.length;
    (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
    for (var o = "", c = r; c < e; ++c)
      o += sr[t[c]];
    return o;
  }
  function Lr(t, r, e) {
    for (var n = t.slice(r, e), o = "", c = 0; c < n.length - 1; c += 2)
      o += String.fromCharCode(n[c] + n[c + 1] * 256);
    return o;
  }
  a.prototype.slice = function(r, e) {
    var n = this.length;
    r = ~~r, e = e === void 0 ? n : ~~e, r < 0 ? (r += n, r < 0 && (r = 0)) : r > n && (r = n), e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), e < r && (e = r);
    var o = this.subarray(r, e);
    return Object.setPrototypeOf(o, a.prototype), o;
  };
  function U(t, r, e) {
    if (t % 1 !== 0 || t < 0)
      throw new RangeError("offset is not uint");
    if (t + r > e)
      throw new RangeError("Trying to access beyond buffer length");
  }
  a.prototype.readUintLE = a.prototype.readUIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || U(r, e, this.length);
    for (var o = this[r], c = 1, l = 0; ++l < e && (c *= 256); )
      o += this[r + l] * c;
    return o;
  }, a.prototype.readUintBE = a.prototype.readUIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || U(r, e, this.length);
    for (var o = this[r + --e], c = 1; e > 0 && (c *= 256); )
      o += this[r + --e] * c;
    return o;
  }, a.prototype.readUint8 = a.prototype.readUInt8 = function(r, e) {
    return r = r >>> 0, e || U(r, 1, this.length), this[r];
  }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(r, e) {
    return r = r >>> 0, e || U(r, 2, this.length), this[r] | this[r + 1] << 8;
  }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(r, e) {
    return r = r >>> 0, e || U(r, 2, this.length), this[r] << 8 | this[r + 1];
  }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(r, e) {
    return r = r >>> 0, e || U(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
  }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(r, e) {
    return r = r >>> 0, e || U(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
  }, a.prototype.readIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || U(r, e, this.length);
    for (var o = this[r], c = 1, l = 0; ++l < e && (c *= 256); )
      o += this[r + l] * c;
    return c *= 128, o >= c && (o -= Math.pow(2, 8 * e)), o;
  }, a.prototype.readIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || U(r, e, this.length);
    for (var o = e, c = 1, l = this[r + --o]; o > 0 && (c *= 256); )
      l += this[r + --o] * c;
    return c *= 128, l >= c && (l -= Math.pow(2, 8 * e)), l;
  }, a.prototype.readInt8 = function(r, e) {
    return r = r >>> 0, e || U(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
  }, a.prototype.readInt16LE = function(r, e) {
    r = r >>> 0, e || U(r, 2, this.length);
    var n = this[r] | this[r + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, a.prototype.readInt16BE = function(r, e) {
    r = r >>> 0, e || U(r, 2, this.length);
    var n = this[r + 1] | this[r] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, a.prototype.readInt32LE = function(r, e) {
    return r = r >>> 0, e || U(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
  }, a.prototype.readInt32BE = function(r, e) {
    return r = r >>> 0, e || U(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
  }, a.prototype.readFloatLE = function(r, e) {
    return r = r >>> 0, e || U(r, 4, this.length), h.read(this, r, !0, 23, 4);
  }, a.prototype.readFloatBE = function(r, e) {
    return r = r >>> 0, e || U(r, 4, this.length), h.read(this, r, !1, 23, 4);
  }, a.prototype.readDoubleLE = function(r, e) {
    return r = r >>> 0, e || U(r, 8, this.length), h.read(this, r, !0, 52, 8);
  }, a.prototype.readDoubleBE = function(r, e) {
    return r = r >>> 0, e || U(r, 8, this.length), h.read(this, r, !1, 52, 8);
  };
  function M(t, r, e, n, o, c) {
    if (!a.isBuffer(t))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (r > o || r < c)
      throw new RangeError('"value" argument is out of bounds');
    if (e + n > t.length)
      throw new RangeError("Index out of range");
  }
  a.prototype.writeUintLE = a.prototype.writeUIntLE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !o) {
      var c = Math.pow(2, 8 * n) - 1;
      M(this, r, e, n, c, 0);
    }
    var l = 1, b = 0;
    for (this[e] = r & 255; ++b < n && (l *= 256); )
      this[e + b] = r / l & 255;
    return e + n;
  }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !o) {
      var c = Math.pow(2, 8 * n) - 1;
      M(this, r, e, n, c, 0);
    }
    var l = n - 1, b = 1;
    for (this[e + l] = r & 255; --l >= 0 && (b *= 256); )
      this[e + l] = r / b & 255;
    return e + n;
  }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(r, e, n) {
    return r = +r, e = e >>> 0, n || M(this, r, e, 1, 255, 0), this[e] = r & 255, e + 1;
  }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || M(this, r, e, 2, 65535, 0), this[e] = r & 255, this[e + 1] = r >>> 8, e + 2;
  }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || M(this, r, e, 2, 65535, 0), this[e] = r >>> 8, this[e + 1] = r & 255, e + 2;
  }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || M(this, r, e, 4, 4294967295, 0), this[e + 3] = r >>> 24, this[e + 2] = r >>> 16, this[e + 1] = r >>> 8, this[e] = r & 255, e + 4;
  }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || M(this, r, e, 4, 4294967295, 0), this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255, e + 4;
  }, a.prototype.writeIntLE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var c = Math.pow(2, 8 * n - 1);
      M(this, r, e, n, c - 1, -c);
    }
    var l = 0, b = 1, R = 0;
    for (this[e] = r & 255; ++l < n && (b *= 256); )
      r < 0 && R === 0 && this[e + l - 1] !== 0 && (R = 1), this[e + l] = (r / b >> 0) - R & 255;
    return e + n;
  }, a.prototype.writeIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var c = Math.pow(2, 8 * n - 1);
      M(this, r, e, n, c - 1, -c);
    }
    var l = n - 1, b = 1, R = 0;
    for (this[e + l] = r & 255; --l >= 0 && (b *= 256); )
      r < 0 && R === 0 && this[e + l + 1] !== 0 && (R = 1), this[e + l] = (r / b >> 0) - R & 255;
    return e + n;
  }, a.prototype.writeInt8 = function(r, e, n) {
    return r = +r, e = e >>> 0, n || M(this, r, e, 1, 127, -128), r < 0 && (r = 255 + r + 1), this[e] = r & 255, e + 1;
  }, a.prototype.writeInt16LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || M(this, r, e, 2, 32767, -32768), this[e] = r & 255, this[e + 1] = r >>> 8, e + 2;
  }, a.prototype.writeInt16BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || M(this, r, e, 2, 32767, -32768), this[e] = r >>> 8, this[e + 1] = r & 255, e + 2;
  }, a.prototype.writeInt32LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || M(this, r, e, 4, 2147483647, -2147483648), this[e] = r & 255, this[e + 1] = r >>> 8, this[e + 2] = r >>> 16, this[e + 3] = r >>> 24, e + 4;
  }, a.prototype.writeInt32BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || M(this, r, e, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255, e + 4;
  };
  function vr(t, r, e, n, o, c) {
    if (e + n > t.length)
      throw new RangeError("Index out of range");
    if (e < 0)
      throw new RangeError("Index out of range");
  }
  function Wr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || vr(t, r, e, 4), h.write(t, r, e, n, 23, 4), e + 4;
  }
  a.prototype.writeFloatLE = function(r, e, n) {
    return Wr(this, r, e, !0, n);
  }, a.prototype.writeFloatBE = function(r, e, n) {
    return Wr(this, r, e, !1, n);
  };
  function Mr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || vr(t, r, e, 8), h.write(t, r, e, n, 52, 8), e + 8;
  }
  a.prototype.writeDoubleLE = function(r, e, n) {
    return Mr(this, r, e, !0, n);
  }, a.prototype.writeDoubleBE = function(r, e, n) {
    return Mr(this, r, e, !1, n);
  }, a.prototype.copy = function(r, e, n, o) {
    if (!a.isBuffer(r))
      throw new TypeError("argument should be a Buffer");
    if (n || (n = 0), !o && o !== 0 && (o = this.length), e >= r.length && (e = r.length), e || (e = 0), o > 0 && o < n && (o = n), o === n || r.length === 0 || this.length === 0)
      return 0;
    if (e < 0)
      throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length)
      throw new RangeError("Index out of range");
    if (o < 0)
      throw new RangeError("sourceEnd out of bounds");
    o > this.length && (o = this.length), r.length - e < o - n && (o = r.length - e + n);
    var c = o - n;
    return this === r && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(e, n, o) : Uint8Array.prototype.set.call(
      r,
      this.subarray(n, o),
      e
    ), c;
  }, a.prototype.fill = function(r, e, n, o) {
    if (typeof r == "string") {
      if (typeof e == "string" ? (o = e, e = 0, n = this.length) : typeof n == "string" && (o = n, n = this.length), o !== void 0 && typeof o != "string")
        throw new TypeError("encoding must be a string");
      if (typeof o == "string" && !a.isEncoding(o))
        throw new TypeError("Unknown encoding: " + o);
      if (r.length === 1) {
        var c = r.charCodeAt(0);
        (o === "utf8" && c < 128 || o === "latin1") && (r = c);
      }
    } else
      typeof r == "number" ? r = r & 255 : typeof r == "boolean" && (r = Number(r));
    if (e < 0 || this.length < e || this.length < n)
      throw new RangeError("Out of range index");
    if (n <= e)
      return this;
    e = e >>> 0, n = n === void 0 ? this.length : n >>> 0, r || (r = 0);
    var l;
    if (typeof r == "number")
      for (l = e; l < n; ++l)
        this[l] = r;
    else {
      var b = a.isBuffer(r) ? r : a.from(r, o), R = b.length;
      if (R === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (l = 0; l < n - e; ++l)
        this[l + e] = b[l % R];
    }
    return this;
  };
  var yr = /[^+/0-9A-Za-z-_]/g;
  function mr(t) {
    if (t = t.split("=")[0], t = t.trim().replace(yr, ""), t.length < 2)
      return "";
    for (; t.length % 4 !== 0; )
      t = t + "=";
    return t;
  }
  function or(t, r) {
    r = r || 1 / 0;
    for (var e, n = t.length, o = null, c = [], l = 0; l < n; ++l) {
      if (e = t.charCodeAt(l), e > 55295 && e < 57344) {
        if (!o) {
          if (e > 56319) {
            (r -= 3) > -1 && c.push(239, 191, 189);
            continue;
          } else if (l + 1 === n) {
            (r -= 3) > -1 && c.push(239, 191, 189);
            continue;
          }
          o = e;
          continue;
        }
        if (e < 56320) {
          (r -= 3) > -1 && c.push(239, 191, 189), o = e;
          continue;
        }
        e = (o - 55296 << 10 | e - 56320) + 65536;
      } else
        o && (r -= 3) > -1 && c.push(239, 191, 189);
      if (o = null, e < 128) {
        if ((r -= 1) < 0)
          break;
        c.push(e);
      } else if (e < 2048) {
        if ((r -= 2) < 0)
          break;
        c.push(
          e >> 6 | 192,
          e & 63 | 128
        );
      } else if (e < 65536) {
        if ((r -= 3) < 0)
          break;
        c.push(
          e >> 12 | 224,
          e >> 6 & 63 | 128,
          e & 63 | 128
        );
      } else if (e < 1114112) {
        if ((r -= 4) < 0)
          break;
        c.push(
          e >> 18 | 240,
          e >> 12 & 63 | 128,
          e >> 6 & 63 | 128,
          e & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return c;
  }
  function gr(t) {
    for (var r = [], e = 0; e < t.length; ++e)
      r.push(t.charCodeAt(e) & 255);
    return r;
  }
  function fr(t, r) {
    for (var e, n, o, c = [], l = 0; l < t.length && !((r -= 2) < 0); ++l)
      e = t.charCodeAt(l), n = e >> 8, o = e % 256, c.push(o), c.push(n);
    return c;
  }
  function jr(t) {
    return s.toByteArray(mr(t));
  }
  function ur(t, r, e, n) {
    for (var o = 0; o < n && !(o + e >= r.length || o >= t.length); ++o)
      r[o + e] = t[o];
    return o;
  }
  function Y(t, r) {
    return t instanceof r || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === r.name;
  }
  function xr(t) {
    return t !== t;
  }
  var sr = function() {
    for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
      for (var n = e * 16, o = 0; o < 16; ++o)
        r[n + o] = t[e] + t[o];
    return r;
  }();
})(Pe);
var Yr = {}, qe = {
  get exports() {
    return Yr;
  },
  set exports(u) {
    Yr = u;
  }
}, O = qe.exports = {}, X, K;
function ee() {
  throw new Error("setTimeout has not been defined");
}
function te() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? X = setTimeout : X = ee;
  } catch {
    X = ee;
  }
  try {
    typeof clearTimeout == "function" ? K = clearTimeout : K = te;
  } catch {
    K = te;
  }
})();
function ye(u) {
  if (X === setTimeout)
    return setTimeout(u, 0);
  if ((X === ee || !X) && setTimeout)
    return X = setTimeout, setTimeout(u, 0);
  try {
    return X(u, 0);
  } catch {
    try {
      return X.call(null, u, 0);
    } catch {
      return X.call(this, u, 0);
    }
  }
}
function Je(u) {
  if (K === clearTimeout)
    return clearTimeout(u);
  if ((K === te || !K) && clearTimeout)
    return K = clearTimeout, clearTimeout(u);
  try {
    return K(u);
  } catch {
    try {
      return K.call(null, u);
    } catch {
      return K.call(this, u);
    }
  }
}
var er = [], wr = !1, cr, Nr = -1;
function ze() {
  !wr || !cr || (wr = !1, cr.length ? er = cr.concat(er) : Nr = -1, er.length && me());
}
function me() {
  if (!wr) {
    var u = ye(ze);
    wr = !0;
    for (var s = er.length; s; ) {
      for (cr = er, er = []; ++Nr < s; )
        cr && cr[Nr].run();
      Nr = -1, s = er.length;
    }
    cr = null, wr = !1, Je(u);
  }
}
O.nextTick = function(u) {
  var s = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var h = 1; h < arguments.length; h++)
      s[h - 1] = arguments[h];
  er.push(new ge(u, s)), er.length === 1 && !wr && ye(me);
};
function ge(u, s) {
  this.fun = u, this.array = s;
}
ge.prototype.run = function() {
  this.fun.apply(null, this.array);
};
O.title = "browser";
O.browser = !0;
O.env = {};
O.argv = [];
O.version = "";
O.versions = {};
function tr() {
}
O.on = tr;
O.addListener = tr;
O.once = tr;
O.off = tr;
O.removeListener = tr;
O.removeAllListeners = tr;
O.emit = tr;
O.prependListener = tr;
O.prependOnceListener = tr;
O.listeners = function(u) {
  return [];
};
O.binding = function(u) {
  throw new Error("process.binding is not supported");
};
O.cwd = function() {
  return "/";
};
O.chdir = function(u) {
  throw new Error("process.chdir is not supported");
};
O.umask = function() {
  return 0;
};
(function(u) {
  function s() {
    var v = this || self;
    return delete u.prototype.__magic__, v;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return s();
  u.defineProperty(u.prototype, "__magic__", {
    configurable: !0,
    get: s
  });
  var h = __magic__;
  return h;
})(Object);
var Ar = {}, Ge = {
  get exports() {
    return Ar;
  },
  set exports(u) {
    Ar = u;
  }
}, br = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pe;
function He() {
  if (pe)
    return br;
  pe = 1;
  var u = j, s = Symbol.for("react.element"), h = Symbol.for("react.fragment"), v = Object.prototype.hasOwnProperty, y = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(a, m, P) {
    var x, E = {}, I = null, S = null;
    P !== void 0 && (I = "" + P), m.key !== void 0 && (I = "" + m.key), m.ref !== void 0 && (S = m.ref);
    for (x in m)
      v.call(m, x) && !w.hasOwnProperty(x) && (E[x] = m[x]);
    if (a && a.defaultProps)
      for (x in m = a.defaultProps, m)
        E[x] === void 0 && (E[x] = m[x]);
    return { $$typeof: s, type: a, key: I, ref: S, props: E, _owner: y.current };
  }
  return br.Fragment = h, br.jsx = d, br.jsxs = d, br;
}
var Fr = {}, de;
function Xe() {
  return de || (de = 1, Yr.env.NODE_ENV !== "production" && function() {
    var u = j, s = Symbol.for("react.element"), h = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), a = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), x = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), I = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), nr = Symbol.iterator, ar = "@@iterator";
    function Vr(i) {
      if (i === null || typeof i != "object")
        return null;
      var f = nr && i[nr] || i[ar];
      return typeof f == "function" ? f : null;
    }
    var G = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function W(i) {
      {
        for (var f = arguments.length, p = new Array(f > 1 ? f - 1 : 0), g = 1; g < f; g++)
          p[g - 1] = arguments[g];
        Cr("error", i, p);
      }
    }
    function Cr(i, f, p) {
      {
        var g = G.ReactDebugCurrentFrame, T = g.getStackAddendum();
        T !== "" && (f += "%s", p = p.concat([T]));
        var B = p.map(function(F) {
          return String(F);
        });
        B.unshift("Warning: " + f), Function.prototype.apply.call(console[i], console, B);
      }
    }
    var qr = !1, Z = !1, Br = !1, Ir = !1, Jr = !1, Sr;
    Sr = Symbol.for("react.module.reference");
    function zr(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === v || i === w || Jr || i === y || i === P || i === x || Ir || i === S || qr || Z || Br || typeof i == "object" && i !== null && (i.$$typeof === I || i.$$typeof === E || i.$$typeof === d || i.$$typeof === a || i.$$typeof === m || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === Sr || i.getModuleId !== void 0));
    }
    function Gr(i, f, p) {
      var g = i.displayName;
      if (g)
        return g;
      var T = f.displayName || f.name || "";
      return T !== "" ? p + "(" + T + ")" : p;
    }
    function Ur(i) {
      return i.displayName || "Context";
    }
    function J(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && W("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
        return i.displayName || i.name || null;
      if (typeof i == "string")
        return i;
      switch (i) {
        case v:
          return "Fragment";
        case h:
          return "Portal";
        case w:
          return "Profiler";
        case y:
          return "StrictMode";
        case P:
          return "Suspense";
        case x:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case a:
            var f = i;
            return Ur(f) + ".Consumer";
          case d:
            var p = i;
            return Ur(p._context) + ".Provider";
          case m:
            return Gr(i, i.render, "ForwardRef");
          case E:
            var g = i.displayName || null;
            return g !== null ? g : J(i.type) || "Memo";
          case I: {
            var T = i, B = T._payload, F = T._init;
            try {
              return J(F(B));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var H = Object.assign, ir = 0, kr, Or, Dr, Pr, Lr, U, M;
    function vr() {
    }
    vr.__reactDisabledLog = !0;
    function Wr() {
      {
        if (ir === 0) {
          kr = console.log, Or = console.info, Dr = console.warn, Pr = console.error, Lr = console.group, U = console.groupCollapsed, M = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: vr,
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
        ir++;
      }
    }
    function Mr() {
      {
        if (ir--, ir === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: H({}, i, {
              value: kr
            }),
            info: H({}, i, {
              value: Or
            }),
            warn: H({}, i, {
              value: Dr
            }),
            error: H({}, i, {
              value: Pr
            }),
            group: H({}, i, {
              value: Lr
            }),
            groupCollapsed: H({}, i, {
              value: U
            }),
            groupEnd: H({}, i, {
              value: M
            })
          });
        }
        ir < 0 && W("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var yr = G.ReactCurrentDispatcher, mr;
    function or(i, f, p) {
      {
        if (mr === void 0)
          try {
            throw Error();
          } catch (T) {
            var g = T.stack.trim().match(/\n( *(at )?)/);
            mr = g && g[1] || "";
          }
        return `
` + mr + i;
      }
    }
    var gr = !1, fr;
    {
      var jr = typeof WeakMap == "function" ? WeakMap : Map;
      fr = new jr();
    }
    function ur(i, f) {
      if (!i || gr)
        return "";
      {
        var p = fr.get(i);
        if (p !== void 0)
          return p;
      }
      var g;
      gr = !0;
      var T = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var B;
      B = yr.current, yr.current = null, Wr();
      try {
        if (f) {
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
            } catch (rr) {
              g = rr;
            }
            Reflect.construct(i, [], F);
          } else {
            try {
              F.call();
            } catch (rr) {
              g = rr;
            }
            i.call(F.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (rr) {
            g = rr;
          }
          i();
        }
      } catch (rr) {
        if (rr && g && typeof rr.stack == "string") {
          for (var _ = rr.stack.split(`
`), N = g.stack.split(`
`), k = _.length - 1, D = N.length - 1; k >= 1 && D >= 0 && _[k] !== N[D]; )
            D--;
          for (; k >= 1 && D >= 0; k--, D--)
            if (_[k] !== N[D]) {
              if (k !== 1 || D !== 1)
                do
                  if (k--, D--, D < 0 || _[k] !== N[D]) {
                    var $ = `
` + _[k].replace(" at new ", " at ");
                    return i.displayName && $.includes("<anonymous>") && ($ = $.replace("<anonymous>", i.displayName)), typeof i == "function" && fr.set(i, $), $;
                  }
                while (k >= 1 && D >= 0);
              break;
            }
        }
      } finally {
        gr = !1, yr.current = B, Mr(), Error.prepareStackTrace = T;
      }
      var pr = i ? i.displayName || i.name : "", he = pr ? or(pr) : "";
      return typeof i == "function" && fr.set(i, he), he;
    }
    function Y(i, f, p) {
      return ur(i, !1);
    }
    function xr(i) {
      var f = i.prototype;
      return !!(f && f.isReactComponent);
    }
    function sr(i, f, p) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return ur(i, xr(i));
      if (typeof i == "string")
        return or(i);
      switch (i) {
        case P:
          return or("Suspense");
        case x:
          return or("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case m:
            return Y(i.render);
          case E:
            return sr(i.type, f, p);
          case I: {
            var g = i, T = g._payload, B = g._init;
            try {
              return sr(B(T), f, p);
            } catch {
            }
          }
        }
      return "";
    }
    var t = Object.prototype.hasOwnProperty, r = {}, e = G.ReactDebugCurrentFrame;
    function n(i) {
      if (i) {
        var f = i._owner, p = sr(i.type, i._source, f ? f.type : null);
        e.setExtraStackFrame(p);
      } else
        e.setExtraStackFrame(null);
    }
    function o(i, f, p, g, T) {
      {
        var B = Function.call.bind(t);
        for (var F in i)
          if (B(i, F)) {
            var _ = void 0;
            try {
              if (typeof i[F] != "function") {
                var N = Error((g || "React class") + ": " + p + " type `" + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[F] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw N.name = "Invariant Violation", N;
              }
              _ = i[F](f, F, g, p, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (k) {
              _ = k;
            }
            _ && !(_ instanceof Error) && (n(T), W("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", g || "React class", p, F, typeof _), n(null)), _ instanceof Error && !(_.message in r) && (r[_.message] = !0, n(T), W("Failed %s type: %s", p, _.message), n(null));
          }
      }
    }
    var c = Array.isArray;
    function l(i) {
      return c(i);
    }
    function b(i) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, p = f && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return p;
      }
    }
    function R(i) {
      try {
        return C(i), !1;
      } catch {
        return !0;
      }
    }
    function C(i) {
      return "" + i;
    }
    function L(i) {
      if (R(i))
        return W("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", b(i)), C(i);
    }
    var A = G.ReactCurrentOwner, lr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Er, _r, Hr;
    Hr = {};
    function Ee(i) {
      if (t.call(i, "ref")) {
        var f = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function _e(i) {
      if (t.call(i, "key")) {
        var f = Object.getOwnPropertyDescriptor(i, "key").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function be(i, f) {
      if (typeof i.ref == "string" && A.current && f && A.current.stateNode !== f) {
        var p = J(A.current.type);
        Hr[p] || (W('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', J(A.current.type), i.ref), Hr[p] = !0);
      }
    }
    function Fe(i, f) {
      {
        var p = function() {
          Er || (Er = !0, W("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        p.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: p,
          configurable: !0
        });
      }
    }
    function Te(i, f) {
      {
        var p = function() {
          _r || (_r = !0, W("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        p.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: p,
          configurable: !0
        });
      }
    }
    var Re = function(i, f, p, g, T, B, F) {
      var _ = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: s,
        // Built-in properties that belong on the element
        type: i,
        key: f,
        ref: p,
        props: F,
        // Record the component responsible for creating this element.
        _owner: B
      };
      return _._store = {}, Object.defineProperty(_._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(_, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: g
      }), Object.defineProperty(_, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: T
      }), Object.freeze && (Object.freeze(_.props), Object.freeze(_)), _;
    };
    function Ae(i, f, p, g, T) {
      {
        var B, F = {}, _ = null, N = null;
        p !== void 0 && (L(p), _ = "" + p), _e(f) && (L(f.key), _ = "" + f.key), Ee(f) && (N = f.ref, be(f, T));
        for (B in f)
          t.call(f, B) && !lr.hasOwnProperty(B) && (F[B] = f[B]);
        if (i && i.defaultProps) {
          var k = i.defaultProps;
          for (B in k)
            F[B] === void 0 && (F[B] = k[B]);
        }
        if (_ || N) {
          var D = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          _ && Fe(F, D), N && Te(F, D);
        }
        return Re(i, _, N, T, g, A.current, F);
      }
    }
    var Xr = G.ReactCurrentOwner, ae = G.ReactDebugCurrentFrame;
    function hr(i) {
      if (i) {
        var f = i._owner, p = sr(i.type, i._source, f ? f.type : null);
        ae.setExtraStackFrame(p);
      } else
        ae.setExtraStackFrame(null);
    }
    var Kr;
    Kr = !1;
    function Qr(i) {
      return typeof i == "object" && i !== null && i.$$typeof === s;
    }
    function ue() {
      {
        if (Xr.current) {
          var i = J(Xr.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
    }
    function Ce(i) {
      {
        if (i !== void 0) {
          var f = i.fileName.replace(/^.*[\\\/]/, ""), p = i.lineNumber;
          return `

Check your code at ` + f + ":" + p + ".";
        }
        return "";
      }
    }
    var ce = {};
    function Be(i) {
      {
        var f = ue();
        if (!f) {
          var p = typeof i == "string" ? i : i.displayName || i.name;
          p && (f = `

Check the top-level render call using <` + p + ">.");
        }
        return f;
      }
    }
    function fe(i, f) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var p = Be(f);
        if (ce[p])
          return;
        ce[p] = !0;
        var g = "";
        i && i._owner && i._owner !== Xr.current && (g = " It was passed a child from " + J(i._owner.type) + "."), hr(i), W('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', p, g), hr(null);
      }
    }
    function se(i, f) {
      {
        if (typeof i != "object")
          return;
        if (l(i))
          for (var p = 0; p < i.length; p++) {
            var g = i[p];
            Qr(g) && fe(g, f);
          }
        else if (Qr(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var T = Vr(i);
          if (typeof T == "function" && T !== i.entries)
            for (var B = T.call(i), F; !(F = B.next()).done; )
              Qr(F.value) && fe(F.value, f);
        }
      }
    }
    function Ie(i) {
      {
        var f = i.type;
        if (f == null || typeof f == "string")
          return;
        var p;
        if (typeof f == "function")
          p = f.propTypes;
        else if (typeof f == "object" && (f.$$typeof === m || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        f.$$typeof === E))
          p = f.propTypes;
        else
          return;
        if (p) {
          var g = J(f);
          o(p, i.props, "prop", g, i);
        } else if (f.PropTypes !== void 0 && !Kr) {
          Kr = !0;
          var T = J(f);
          W("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", T || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && W("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Se(i) {
      {
        for (var f = Object.keys(i.props), p = 0; p < f.length; p++) {
          var g = f[p];
          if (g !== "children" && g !== "key") {
            hr(i), W("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", g), hr(null);
            break;
          }
        }
        i.ref !== null && (hr(i), W("Invalid attribute `ref` supplied to `React.Fragment`."), hr(null));
      }
    }
    function le(i, f, p, g, T, B) {
      {
        var F = zr(i);
        if (!F) {
          var _ = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (_ += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var N = Ce(T);
          N ? _ += N : _ += ue();
          var k;
          i === null ? k = "null" : l(i) ? k = "array" : i !== void 0 && i.$$typeof === s ? (k = "<" + (J(i.type) || "Unknown") + " />", _ = " Did you accidentally export a JSX literal instead of a component?") : k = typeof i, W("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", k, _);
        }
        var D = Ae(i, f, p, T, B);
        if (D == null)
          return D;
        if (F) {
          var $ = f.children;
          if ($ !== void 0)
            if (g)
              if (l($)) {
                for (var pr = 0; pr < $.length; pr++)
                  se($[pr], i);
                Object.freeze && Object.freeze($);
              } else
                W("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              se($, i);
        }
        return i === v ? Se(D) : Ie(D), D;
      }
    }
    function Ue(i, f, p) {
      return le(i, f, p, !0);
    }
    function ke(i, f, p) {
      return le(i, f, p, !1);
    }
    var Oe = ke, De = Ue;
    Fr.Fragment = v, Fr.jsx = Oe, Fr.jsxs = De;
  }()), Fr;
}
(function(u) {
  Yr.env.NODE_ENV === "production" ? u.exports = He() : u.exports = Xe();
})(Ge);
const Ke = Ar.Fragment, q = Ar.jsx, Rr = Ar.jsxs;
var ne = {}, Qe = {
  get exports() {
    return ne;
  },
  set exports(u) {
    ne = u;
  }
};
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(u) {
  (function() {
    var s = {}.hasOwnProperty;
    function h() {
      for (var v = [], y = 0; y < arguments.length; y++) {
        var w = arguments[y];
        if (w) {
          var d = typeof w;
          if (d === "string" || d === "number")
            v.push(w);
          else if (Array.isArray(w)) {
            if (w.length) {
              var a = h.apply(null, w);
              a && v.push(a);
            }
          } else if (d === "object") {
            if (w.toString !== Object.prototype.toString && !w.toString.toString().includes("[native code]")) {
              v.push(w.toString());
              continue;
            }
            for (var m in w)
              s.call(w, m) && w[m] && v.push(m);
          }
        }
      }
      return v.join(" ");
    }
    u.exports ? (h.default = h, u.exports = h) : window.classNames = h;
  })();
})(Qe);
const re = ne, Ze = "_popupButton__container_1ud9v_5", rt = "_popupButton_1ud9v_5", et = "_icon_1ud9v_19", tt = "_inactiveIcon_1ud9v_27", nt = "_activeIcon_1ud9v_31", it = "_notif_1ud9v_35", ot = "_pinging_1ud9v_39", at = "_ping_1ud9v_39", z = {
  popupButton__container: Ze,
  popupButton: rt,
  icon: et,
  inactiveIcon: tt,
  activeIcon: nt,
  notif: it,
  pinging: ot,
  ping: at
};
function ut({
  notiVal: u,
  showNoti: s,
  isOpen: h,
  clickHandler: v
}) {
  return /* @__PURE__ */ Rr("div", { className: z.popupButton__container, children: [
    /* @__PURE__ */ Rr(
      "button",
      {
        className: z.popupButton,
        type: "button",
        onClick: v,
        children: [
          /* @__PURE__ */ q(
            "div",
            {
              className: re(z.icon, {
                [z.activeIcon]: !h,
                [z.inactiveIcon]: h
              }),
              children: /* @__PURE__ */ q(
                "img",
                {
                  alt: "WalletChat",
                  src: "https://uploads-ssl.webflow.com/62d761bae8bf2da003f57b06/62d761bae8bf2dea68f57b52_walletchat%20logo.png",
                  style: { height: "90%" }
                }
              )
            }
          ),
          /* @__PURE__ */ q(
            "div",
            {
              className: re(z.icon, {
                [z.activeIcon]: h,
                [z.inactiveIcon]: !h
              }),
              children: /* @__PURE__ */ q(
                "svg",
                {
                  focusable: "false",
                  viewBox: "0 0 16 14",
                  width: "28",
                  height: "25",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ q(
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
    s && /* @__PURE__ */ Rr(Ke, { children: [
      /* @__PURE__ */ q("span", { className: re(z.notif, z.pinging) }),
      /* @__PURE__ */ q("span", { className: z.notif, children: u })
    ] })
  ] });
}
const oe = j.createContext(null);
function lt({
  children: u
}) {
  const [s, h] = j.useState(), v = j.useCallback(
    (w, d) => h((a) => ({ ...a, [w]: d })),
    []
  ), y = j.useMemo(
    () => ({
      widgetState: s || null,
      setWidgetState: v
    }),
    [s, v]
  );
  return /* @__PURE__ */ q(oe.Provider, { value: y, children: u });
}
function we(u) {
  const h = u.replace("https://", "").replace("http://", "").split("/"), v = h.length, y = h[v - 1], w = h[v - 2];
  if (u.startsWith("looksrare.org"))
    return { itemId: y, contractAddress: w, chain: "ethereum" };
  const d = h[v - 3];
  return v >= 5 ? { itemId: y, contractAddress: w, network: d } : u.startsWith("x2y2.io") && d === "eth" ? { itemId: y, contractAddress: w, network: "ethereum" } : { contractAddress: null, itemId: null, network: null };
}
const xe = {
  "wallet-chat-widget": "_wallet-chat-widget_ft9bq_5",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_ft9bq_1"
}, ct = "https://staging.walletchat.fun", Tr = xe["wallet-chat-widget__container"];
function ht() {
  const u = j.useRef(""), s = j.useRef(null), h = j.useContext(oe), v = h == null ? void 0 : h.widgetState, y = v == null ? void 0 : v.ownerAddress, [w, d] = j.useState(!1), [a, m] = j.useState(0), P = (x) => {
    d((E) => {
      const I = Boolean(E);
      return s.current && !I && (document == null || document.getElementById(Tr).contentWindow.postMessage(
        { ...s.current, redirect: !0 },
        "*"
      )), s.current = null, !E;
    });
  };
  return j.useEffect(() => {
    if (!(y != null && y.address))
      return;
    const x = y.address, E = we(window.location.href);
    E.network && (s.current = {
      ...E,
      ownerAddress: x
    }), s.current ? document == null || document.getElementById(Tr).contentWindow.postMessage(
      { ...s.current, redirect: !0 },
      "*"
    ) : document == null || document.getElementById(Tr).contentWindow.postMessage({ ownerAddress: x }, "*"), d(!0);
  }, [y]), j.useEffect(() => {
    const x = () => {
      if (window.location.href === u.current)
        return;
      u.current = window.location.href;
      const S = we(window.location.href);
      S.network && (s.current = S), document == null || document.getElementById(Tr).contentWindow.postMessage(S, "*");
    }, E = new MutationObserver(function() {
      x();
    }), I = { subtree: !0, childList: !0 };
    return x(), E.observe(document, I), () => E.disconnect();
  }, []), j.useEffect(() => {
    const x = (E) => {
      const { data: I } = E;
      I.target === "unread_cnt" && m(I.data);
    };
    return window.addEventListener("message", x), () => window.removeEventListener("message", x);
  }, []), h ? /* @__PURE__ */ Rr("div", { className: xe["wallet-chat-widget"], children: [
    /* @__PURE__ */ q(
      "iframe",
      {
        title: "WalletChat",
        name: "WalletChat",
        id: Tr,
        style: {
          height: w ? "50vh" : "0px",
          width: w ? "15vw" : "0px",
          minHeight: w ? "440px" : "0px",
          minWidth: w ? "500px" : "0px"
        },
        src: ct
      }
    ),
    /* @__PURE__ */ q(
      ut,
      {
        notiVal: a,
        showNoti: a > 0,
        isOpen: w,
        clickHandler: P
      }
    )
  ] }) : (console.error(
    "WalletChat: ChatWithOwner component must be rendered within a WalletChatProvider"
  ), null);
}
const ft = ({
  onClick: u,
  children: s
}) => /* @__PURE__ */ q("button", { type: "button", onClick: u, children: s }), pt = ({
  ownerAddress: u,
  render: s
}) => {
  const h = j.useContext(oe), v = h == null ? void 0 : h.setWidgetState, y = s ? ({ onClick: w, children: d }) => j.cloneElement(s, { onClick: w }, d) : ft;
  return h ? /* @__PURE__ */ Rr(
    y,
    {
      onClick: () => v && v("ownerAddress", {
        address: u,
        lastRequest: Date.now().toString()
      }),
      children: [
        /* @__PURE__ */ q(
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
  pt as ChatWithOwner,
  lt as WalletChatProvider,
  ht as WalletChatWidget
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode("._popupButton__container_1ud9v_5{position:relative;margin-top:.75rem;height:4rem;--tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / .15));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._popupButton_1ud9v_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}._icon_1ud9v_19{transition-property:transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_1ud9v_19 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_1ud9v_27{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_1ud9v_31{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_1ud9v_35{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(219 39 119 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}@keyframes _ping_1ud9v_39{75%,to{transform:scale(2);opacity:0}}._pinging_1ud9v_39{animation:_ping_1ud9v_39 1s cubic-bezier(0,0,.2,1) infinite}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._wallet-chat-widget_ft9bq_5{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;-moz-user-select:none;user-select:none;--tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / .15));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}#_wallet-chat-widget__container_ft9bq_1{transition-property:width,min-width,height,min-height;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / .07)) drop-shadow(0 2px 2px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
