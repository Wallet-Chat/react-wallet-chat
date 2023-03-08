import N from "react";
var De = {}, Yr = {};
Yr.byteLength = We;
Yr.toByteArray = je;
Yr.fromByteArray = $e;
var Q = [], z = [], Pe = typeof Uint8Array < "u" ? Uint8Array : Array, Qr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var dr = 0, Le = Qr.length; dr < Le; ++dr)
  Q[dr] = Qr[dr], z[Qr.charCodeAt(dr)] = dr;
z["-".charCodeAt(0)] = 62;
z["_".charCodeAt(0)] = 63;
function we(u) {
  var l = u.length;
  if (l % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var h = u.indexOf("=");
  h === -1 && (h = l);
  var v = h === l ? 0 : 4 - h % 4;
  return [h, v];
}
function We(u) {
  var l = we(u), h = l[0], v = l[1];
  return (h + v) * 3 / 4 - v;
}
function Me(u, l, h) {
  return (l + h) * 3 / 4 - h;
}
function je(u) {
  var l, h = we(u), v = h[0], y = h[1], w = new Pe(Me(u, v, y)), d = 0, a = y > 0 ? v - 4 : v, m;
  for (m = 0; m < a; m += 4)
    l = z[u.charCodeAt(m)] << 18 | z[u.charCodeAt(m + 1)] << 12 | z[u.charCodeAt(m + 2)] << 6 | z[u.charCodeAt(m + 3)], w[d++] = l >> 16 & 255, w[d++] = l >> 8 & 255, w[d++] = l & 255;
  return y === 2 && (l = z[u.charCodeAt(m)] << 2 | z[u.charCodeAt(m + 1)] >> 4, w[d++] = l & 255), y === 1 && (l = z[u.charCodeAt(m)] << 10 | z[u.charCodeAt(m + 1)] << 4 | z[u.charCodeAt(m + 2)] >> 2, w[d++] = l >> 8 & 255, w[d++] = l & 255), w;
}
function Ne(u) {
  return Q[u >> 18 & 63] + Q[u >> 12 & 63] + Q[u >> 6 & 63] + Q[u & 63];
}
function Ye(u, l, h) {
  for (var v, y = [], w = l; w < h; w += 3)
    v = (u[w] << 16 & 16711680) + (u[w + 1] << 8 & 65280) + (u[w + 2] & 255), y.push(Ne(v));
  return y.join("");
}
function $e(u) {
  for (var l, h = u.length, v = h % 3, y = [], w = 16383, d = 0, a = h - v; d < a; d += w)
    y.push(Ye(u, d, d + w > a ? a : d + w));
  return v === 1 ? (l = u[h - 1], y.push(
    Q[l >> 2] + Q[l << 4 & 63] + "=="
  )) : v === 2 && (l = (u[h - 2] << 8) + u[h - 1], y.push(
    Q[l >> 10] + Q[l >> 4 & 63] + Q[l << 2 & 63] + "="
  )), y.join("");
}
var ie = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ie.read = function(u, l, h, v, y) {
  var w, d, a = y * 8 - v - 1, m = (1 << a) - 1, I = m >> 1, g = -7, b = h ? y - 1 : 0, O = h ? -1 : 1, P = u[l + b];
  for (b += O, w = P & (1 << -g) - 1, P >>= -g, g += a; g > 0; w = w * 256 + u[l + b], b += O, g -= 8)
    ;
  for (d = w & (1 << -g) - 1, w >>= -g, g += v; g > 0; d = d * 256 + u[l + b], b += O, g -= 8)
    ;
  if (w === 0)
    w = 1 - I;
  else {
    if (w === m)
      return d ? NaN : (P ? -1 : 1) * (1 / 0);
    d = d + Math.pow(2, v), w = w - I;
  }
  return (P ? -1 : 1) * d * Math.pow(2, w - v);
};
ie.write = function(u, l, h, v, y, w) {
  var d, a, m, I = w * 8 - y - 1, g = (1 << I) - 1, b = g >> 1, O = y === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, P = v ? 0 : w - 1, nr = v ? 1 : -1, ar = l < 0 || l === 0 && 1 / l < 0 ? 1 : 0;
  for (l = Math.abs(l), isNaN(l) || l === 1 / 0 ? (a = isNaN(l) ? 1 : 0, d = g) : (d = Math.floor(Math.log(l) / Math.LN2), l * (m = Math.pow(2, -d)) < 1 && (d--, m *= 2), d + b >= 1 ? l += O / m : l += O * Math.pow(2, 1 - b), l * m >= 2 && (d++, m /= 2), d + b >= g ? (a = 0, d = g) : d + b >= 1 ? (a = (l * m - 1) * Math.pow(2, y), d = d + b) : (a = l * Math.pow(2, b - 1) * Math.pow(2, y), d = 0)); y >= 8; u[h + P] = a & 255, P += nr, a /= 256, y -= 8)
    ;
  for (d = d << y | a, I += y; I > 0; u[h + P] = d & 255, P += nr, d /= 256, I -= 8)
    ;
  u[h + P - nr] |= ar * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  var l = Yr, h = ie, v = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
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
      return b(t);
    }
    return m(t, r, e);
  }
  a.poolSize = 8192;
  function m(t, r, e) {
    if (typeof t == "string")
      return O(t, r);
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
    var o = $r(t);
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
  function I(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function g(t, r, e) {
    return I(t), t <= 0 ? d(t) : r !== void 0 ? typeof e == "string" ? d(t).fill(r, e) : d(t).fill(r) : d(t);
  }
  a.alloc = function(t, r, e) {
    return g(t, r, e);
  };
  function b(t) {
    return I(t), d(t < 0 ? 0 : G(t) | 0);
  }
  a.allocUnsafe = function(t) {
    return b(t);
  }, a.allocUnsafeSlow = function(t) {
    return b(t);
  };
  function O(t, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !a.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var e = Ar(t, r) | 0, n = d(e), o = n.write(t, r);
    return o !== e && (n = n.slice(0, o)), n;
  }
  function P(t) {
    for (var r = t.length < 0 ? 0 : G(t.length) | 0, e = d(r), n = 0; n < r; n += 1)
      e[n] = t[n] & 255;
    return e;
  }
  function nr(t) {
    if (Y(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return ar(r.buffer, r.byteOffset, r.byteLength);
    }
    return P(t);
  }
  function ar(t, r, e) {
    if (r < 0 || t.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < r + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var n;
    return r === void 0 && e === void 0 ? n = new Uint8Array(t) : e === void 0 ? n = new Uint8Array(t, r) : n = new Uint8Array(t, r, e), Object.setPrototypeOf(n, a.prototype), n;
  }
  function $r(t) {
    if (a.isBuffer(t)) {
      var r = G(t.length) | 0, e = d(r);
      return e.length === 0 || t.copy(e, 0, 0, r), e;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || gr(t.length) ? d(0) : P(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return P(t.data);
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
    for (var n = r.length, o = e.length, c = 0, s = Math.min(n, o); c < s; ++c)
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
      var s = r[n];
      if (Y(s, Uint8Array))
        c + s.length > o.length ? a.from(s).copy(o, c) : Uint8Array.prototype.set.call(
          o,
          s,
          c
        );
      else if (a.isBuffer(s))
        s.copy(o, c);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      c += s.length;
    }
    return o;
  };
  function Ar(t, r) {
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
          return Mr(t).length;
        default:
          if (o)
            return n ? -1 : or(t).length;
          r = ("" + r).toLowerCase(), o = !0;
      }
  }
  a.byteLength = Ar;
  function zr(t, r, e) {
    var n = !1;
    if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, r >>>= 0, e <= r))
      return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return Dr(this, r, e);
        case "utf8":
        case "utf-8":
          return H(this, r, e);
        case "ascii":
          return kr(this, r, e);
        case "latin1":
        case "binary":
          return Or(this, r, e);
        case "base64":
          return q(this, r, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Pr(this, r, e);
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
    return r === 0 ? "" : arguments.length === 0 ? H(this, 0, r) : zr.apply(this, arguments);
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
    for (var s = c - o, _ = n - e, R = Math.min(s, _), C = this.slice(o, c), L = r.slice(e, n), A = 0; A < R; ++A)
      if (C[A] !== L[A]) {
        s = C[A], _ = L[A];
        break;
      }
    return s < _ ? -1 : _ < s ? 1 : 0;
  };
  function Cr(t, r, e, n, o) {
    if (t.length === 0)
      return -1;
    if (typeof e == "string" ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, gr(e) && (e = o ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
      if (o)
        return -1;
      e = t.length - 1;
    } else if (e < 0)
      if (o)
        e = 0;
      else
        return -1;
    if (typeof r == "string" && (r = a.from(r, n)), a.isBuffer(r))
      return r.length === 0 ? -1 : Br(t, r, e, n, o);
    if (typeof r == "number")
      return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? o ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : Br(t, [r], e, n, o);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Br(t, r, e, n, o) {
    var c = 1, s = t.length, _ = r.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || r.length < 2)
        return -1;
      c = 2, s /= 2, _ /= 2, e /= 2;
    }
    function R(Er, _r) {
      return c === 1 ? Er[_r] : Er.readUInt16BE(_r * c);
    }
    var C;
    if (o) {
      var L = -1;
      for (C = e; C < s; C++)
        if (R(t, C) === R(r, L === -1 ? 0 : C - L)) {
          if (L === -1 && (L = C), C - L + 1 === _)
            return L * c;
        } else
          L !== -1 && (C -= C - L), L = -1;
    } else
      for (e + _ > s && (e = s - _), C = e; C >= 0; C--) {
        for (var A = !0, lr = 0; lr < _; lr++)
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
    return Cr(this, r, e, n, !0);
  }, a.prototype.lastIndexOf = function(r, e, n) {
    return Cr(this, r, e, n, !1);
  };
  function Vr(t, r, e, n) {
    e = Number(e) || 0;
    var o = t.length - e;
    n ? (n = Number(n), n > o && (n = o)) : n = o;
    var c = r.length;
    n > c / 2 && (n = c / 2);
    for (var s = 0; s < n; ++s) {
      var _ = parseInt(r.substr(s * 2, 2), 16);
      if (gr(_))
        return s;
      t[e + s] = _;
    }
    return s;
  }
  function Ir(t, r, e, n) {
    return ur(or(r, t.length - e), t, e, n);
  }
  function qr(t, r, e, n) {
    return ur(xr(r), t, e, n);
  }
  function Jr(t, r, e, n) {
    return ur(Mr(r), t, e, n);
  }
  function Sr(t, r, e, n) {
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
    for (var s = !1; ; )
      switch (o) {
        case "hex":
          return Vr(this, r, e, n);
        case "utf8":
        case "utf-8":
          return Ir(this, r, e, n);
        case "ascii":
        case "latin1":
        case "binary":
          return qr(this, r, e, n);
        case "base64":
          return Jr(this, r, e, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Sr(this, r, e, n);
        default:
          if (s)
            throw new TypeError("Unknown encoding: " + o);
          o = ("" + o).toLowerCase(), s = !0;
      }
  }, a.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function q(t, r, e) {
    return r === 0 && e === t.length ? l.fromByteArray(t) : l.fromByteArray(t.slice(r, e));
  }
  function H(t, r, e) {
    e = Math.min(t.length, e);
    for (var n = [], o = r; o < e; ) {
      var c = t[o], s = null, _ = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
      if (o + _ <= e) {
        var R, C, L, A;
        switch (_) {
          case 1:
            c < 128 && (s = c);
            break;
          case 2:
            R = t[o + 1], (R & 192) === 128 && (A = (c & 31) << 6 | R & 63, A > 127 && (s = A));
            break;
          case 3:
            R = t[o + 1], C = t[o + 2], (R & 192) === 128 && (C & 192) === 128 && (A = (c & 15) << 12 | (R & 63) << 6 | C & 63, A > 2047 && (A < 55296 || A > 57343) && (s = A));
            break;
          case 4:
            R = t[o + 1], C = t[o + 2], L = t[o + 3], (R & 192) === 128 && (C & 192) === 128 && (L & 192) === 128 && (A = (c & 15) << 18 | (R & 63) << 12 | (C & 63) << 6 | L & 63, A > 65535 && A < 1114112 && (s = A));
        }
      }
      s === null ? (s = 65533, _ = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), n.push(s), o += _;
    }
    return Ur(n);
  }
  var ir = 4096;
  function Ur(t) {
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
  function kr(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var o = r; o < e; ++o)
      n += String.fromCharCode(t[o] & 127);
    return n;
  }
  function Or(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var o = r; o < e; ++o)
      n += String.fromCharCode(t[o]);
    return n;
  }
  function Dr(t, r, e) {
    var n = t.length;
    (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
    for (var o = "", c = r; c < e; ++c)
      o += sr[t[c]];
    return o;
  }
  function Pr(t, r, e) {
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
  function S(t, r, e) {
    if (t % 1 !== 0 || t < 0)
      throw new RangeError("offset is not uint");
    if (t + r > e)
      throw new RangeError("Trying to access beyond buffer length");
  }
  a.prototype.readUintLE = a.prototype.readUIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || S(r, e, this.length);
    for (var o = this[r], c = 1, s = 0; ++s < e && (c *= 256); )
      o += this[r + s] * c;
    return o;
  }, a.prototype.readUintBE = a.prototype.readUIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || S(r, e, this.length);
    for (var o = this[r + --e], c = 1; e > 0 && (c *= 256); )
      o += this[r + --e] * c;
    return o;
  }, a.prototype.readUint8 = a.prototype.readUInt8 = function(r, e) {
    return r = r >>> 0, e || S(r, 1, this.length), this[r];
  }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(r, e) {
    return r = r >>> 0, e || S(r, 2, this.length), this[r] | this[r + 1] << 8;
  }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(r, e) {
    return r = r >>> 0, e || S(r, 2, this.length), this[r] << 8 | this[r + 1];
  }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(r, e) {
    return r = r >>> 0, e || S(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
  }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(r, e) {
    return r = r >>> 0, e || S(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
  }, a.prototype.readIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || S(r, e, this.length);
    for (var o = this[r], c = 1, s = 0; ++s < e && (c *= 256); )
      o += this[r + s] * c;
    return c *= 128, o >= c && (o -= Math.pow(2, 8 * e)), o;
  }, a.prototype.readIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || S(r, e, this.length);
    for (var o = e, c = 1, s = this[r + --o]; o > 0 && (c *= 256); )
      s += this[r + --o] * c;
    return c *= 128, s >= c && (s -= Math.pow(2, 8 * e)), s;
  }, a.prototype.readInt8 = function(r, e) {
    return r = r >>> 0, e || S(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
  }, a.prototype.readInt16LE = function(r, e) {
    r = r >>> 0, e || S(r, 2, this.length);
    var n = this[r] | this[r + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, a.prototype.readInt16BE = function(r, e) {
    r = r >>> 0, e || S(r, 2, this.length);
    var n = this[r + 1] | this[r] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, a.prototype.readInt32LE = function(r, e) {
    return r = r >>> 0, e || S(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
  }, a.prototype.readInt32BE = function(r, e) {
    return r = r >>> 0, e || S(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
  }, a.prototype.readFloatLE = function(r, e) {
    return r = r >>> 0, e || S(r, 4, this.length), h.read(this, r, !0, 23, 4);
  }, a.prototype.readFloatBE = function(r, e) {
    return r = r >>> 0, e || S(r, 4, this.length), h.read(this, r, !1, 23, 4);
  }, a.prototype.readDoubleLE = function(r, e) {
    return r = r >>> 0, e || S(r, 8, this.length), h.read(this, r, !0, 52, 8);
  }, a.prototype.readDoubleBE = function(r, e) {
    return r = r >>> 0, e || S(r, 8, this.length), h.read(this, r, !1, 52, 8);
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
    var s = 1, _ = 0;
    for (this[e] = r & 255; ++_ < n && (s *= 256); )
      this[e + _] = r / s & 255;
    return e + n;
  }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !o) {
      var c = Math.pow(2, 8 * n) - 1;
      M(this, r, e, n, c, 0);
    }
    var s = n - 1, _ = 1;
    for (this[e + s] = r & 255; --s >= 0 && (_ *= 256); )
      this[e + s] = r / _ & 255;
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
    var s = 0, _ = 1, R = 0;
    for (this[e] = r & 255; ++s < n && (_ *= 256); )
      r < 0 && R === 0 && this[e + s - 1] !== 0 && (R = 1), this[e + s] = (r / _ >> 0) - R & 255;
    return e + n;
  }, a.prototype.writeIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var c = Math.pow(2, 8 * n - 1);
      M(this, r, e, n, c - 1, -c);
    }
    var s = n - 1, _ = 1, R = 0;
    for (this[e + s] = r & 255; --s >= 0 && (_ *= 256); )
      r < 0 && R === 0 && this[e + s + 1] !== 0 && (R = 1), this[e + s] = (r / _ >> 0) - R & 255;
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
  function Lr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || vr(t, r, e, 4), h.write(t, r, e, n, 23, 4), e + 4;
  }
  a.prototype.writeFloatLE = function(r, e, n) {
    return Lr(this, r, e, !0, n);
  }, a.prototype.writeFloatBE = function(r, e, n) {
    return Lr(this, r, e, !1, n);
  };
  function Wr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || vr(t, r, e, 8), h.write(t, r, e, n, 52, 8), e + 8;
  }
  a.prototype.writeDoubleLE = function(r, e, n) {
    return Wr(this, r, e, !0, n);
  }, a.prototype.writeDoubleBE = function(r, e, n) {
    return Wr(this, r, e, !1, n);
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
    var s;
    if (typeof r == "number")
      for (s = e; s < n; ++s)
        this[s] = r;
    else {
      var _ = a.isBuffer(r) ? r : a.from(r, o), R = _.length;
      if (R === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (s = 0; s < n - e; ++s)
        this[s + e] = _[s % R];
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
    for (var e, n = t.length, o = null, c = [], s = 0; s < n; ++s) {
      if (e = t.charCodeAt(s), e > 55295 && e < 57344) {
        if (!o) {
          if (e > 56319) {
            (r -= 3) > -1 && c.push(239, 191, 189);
            continue;
          } else if (s + 1 === n) {
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
  function xr(t) {
    for (var r = [], e = 0; e < t.length; ++e)
      r.push(t.charCodeAt(e) & 255);
    return r;
  }
  function fr(t, r) {
    for (var e, n, o, c = [], s = 0; s < t.length && !((r -= 2) < 0); ++s)
      e = t.charCodeAt(s), n = e >> 8, o = e % 256, c.push(o), c.push(n);
    return c;
  }
  function Mr(t) {
    return l.toByteArray(mr(t));
  }
  function ur(t, r, e, n) {
    for (var o = 0; o < n && !(o + e >= r.length || o >= t.length); ++o)
      r[o + e] = t[o];
    return o;
  }
  function Y(t, r) {
    return t instanceof r || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === r.name;
  }
  function gr(t) {
    return t !== t;
  }
  var sr = function() {
    for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
      for (var n = e * 16, o = 0; o < 16; ++o)
        r[n + o] = t[e] + t[o];
    return r;
  }();
})(De);
var Nr = {}, ze = {
  get exports() {
    return Nr;
  },
  set exports(u) {
    Nr = u;
  }
}, k = ze.exports = {}, X, K;
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
function ve(u) {
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
function Ve(u) {
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
var er = [], wr = !1, cr, jr = -1;
function qe() {
  !wr || !cr || (wr = !1, cr.length ? er = cr.concat(er) : jr = -1, er.length && ye());
}
function ye() {
  if (!wr) {
    var u = ve(qe);
    wr = !0;
    for (var l = er.length; l; ) {
      for (cr = er, er = []; ++jr < l; )
        cr && cr[jr].run();
      jr = -1, l = er.length;
    }
    cr = null, wr = !1, Ve(u);
  }
}
k.nextTick = function(u) {
  var l = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var h = 1; h < arguments.length; h++)
      l[h - 1] = arguments[h];
  er.push(new me(u, l)), er.length === 1 && !wr && ve(ye);
};
function me(u, l) {
  this.fun = u, this.array = l;
}
me.prototype.run = function() {
  this.fun.apply(null, this.array);
};
k.title = "browser";
k.browser = !0;
k.env = {};
k.argv = [];
k.version = "";
k.versions = {};
function tr() {
}
k.on = tr;
k.addListener = tr;
k.once = tr;
k.off = tr;
k.removeListener = tr;
k.removeAllListeners = tr;
k.emit = tr;
k.prependListener = tr;
k.prependOnceListener = tr;
k.listeners = function(u) {
  return [];
};
k.binding = function(u) {
  throw new Error("process.binding is not supported");
};
k.cwd = function() {
  return "/";
};
k.chdir = function(u) {
  throw new Error("process.chdir is not supported");
};
k.umask = function() {
  return 0;
};
(function(u) {
  function l() {
    var v = this || self;
    return delete u.prototype.__magic__, v;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return l();
  u.defineProperty(u.prototype, "__magic__", {
    configurable: !0,
    get: l
  });
  var h = __magic__;
  return h;
})(Object);
var Rr = {}, Je = {
  get exports() {
    return Rr;
  },
  set exports(u) {
    Rr = u;
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
function Ge() {
  if (pe)
    return br;
  pe = 1;
  var u = N, l = Symbol.for("react.element"), h = Symbol.for("react.fragment"), v = Object.prototype.hasOwnProperty, y = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(a, m, I) {
    var g, b = {}, O = null, P = null;
    I !== void 0 && (O = "" + I), m.key !== void 0 && (O = "" + m.key), m.ref !== void 0 && (P = m.ref);
    for (g in m)
      v.call(m, g) && !w.hasOwnProperty(g) && (b[g] = m[g]);
    if (a && a.defaultProps)
      for (g in m = a.defaultProps, m)
        b[g] === void 0 && (b[g] = m[g]);
    return { $$typeof: l, type: a, key: O, ref: P, props: b, _owner: y.current };
  }
  return br.Fragment = h, br.jsx = d, br.jsxs = d, br;
}
var Fr = {}, de;
function He() {
  return de || (de = 1, Nr.env.NODE_ENV !== "production" && function() {
    var u = N, l = Symbol.for("react.element"), h = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), a = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), P = Symbol.for("react.offscreen"), nr = Symbol.iterator, ar = "@@iterator";
    function $r(i) {
      if (i === null || typeof i != "object")
        return null;
      var f = nr && i[nr] || i[ar];
      return typeof f == "function" ? f : null;
    }
    var G = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function W(i) {
      {
        for (var f = arguments.length, p = new Array(f > 1 ? f - 1 : 0), x = 1; x < f; x++)
          p[x - 1] = arguments[x];
        Ar("error", i, p);
      }
    }
    function Ar(i, f, p) {
      {
        var x = G.ReactDebugCurrentFrame, T = x.getStackAddendum();
        T !== "" && (f += "%s", p = p.concat([T]));
        var B = p.map(function(F) {
          return String(F);
        });
        B.unshift("Warning: " + f), Function.prototype.apply.call(console[i], console, B);
      }
    }
    var zr = !1, Z = !1, Cr = !1, Br = !1, Vr = !1, Ir;
    Ir = Symbol.for("react.module.reference");
    function qr(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === v || i === w || Vr || i === y || i === I || i === g || Br || i === P || zr || Z || Cr || typeof i == "object" && i !== null && (i.$$typeof === O || i.$$typeof === b || i.$$typeof === d || i.$$typeof === a || i.$$typeof === m || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === Ir || i.getModuleId !== void 0));
    }
    function Jr(i, f, p) {
      var x = i.displayName;
      if (x)
        return x;
      var T = f.displayName || f.name || "";
      return T !== "" ? p + "(" + T + ")" : p;
    }
    function Sr(i) {
      return i.displayName || "Context";
    }
    function q(i) {
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
        case I:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case a:
            var f = i;
            return Sr(f) + ".Consumer";
          case d:
            var p = i;
            return Sr(p._context) + ".Provider";
          case m:
            return Jr(i, i.render, "ForwardRef");
          case b:
            var x = i.displayName || null;
            return x !== null ? x : q(i.type) || "Memo";
          case O: {
            var T = i, B = T._payload, F = T._init;
            try {
              return q(F(B));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var H = Object.assign, ir = 0, Ur, kr, Or, Dr, Pr, S, M;
    function vr() {
    }
    vr.__reactDisabledLog = !0;
    function Lr() {
      {
        if (ir === 0) {
          Ur = console.log, kr = console.info, Or = console.warn, Dr = console.error, Pr = console.group, S = console.groupCollapsed, M = console.groupEnd;
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
    function Wr() {
      {
        if (ir--, ir === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: H({}, i, {
              value: Ur
            }),
            info: H({}, i, {
              value: kr
            }),
            warn: H({}, i, {
              value: Or
            }),
            error: H({}, i, {
              value: Dr
            }),
            group: H({}, i, {
              value: Pr
            }),
            groupCollapsed: H({}, i, {
              value: S
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
            var x = T.stack.trim().match(/\n( *(at )?)/);
            mr = x && x[1] || "";
          }
        return `
` + mr + i;
      }
    }
    var xr = !1, fr;
    {
      var Mr = typeof WeakMap == "function" ? WeakMap : Map;
      fr = new Mr();
    }
    function ur(i, f) {
      if (!i || xr)
        return "";
      {
        var p = fr.get(i);
        if (p !== void 0)
          return p;
      }
      var x;
      xr = !0;
      var T = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var B;
      B = yr.current, yr.current = null, Lr();
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
              x = rr;
            }
            Reflect.construct(i, [], F);
          } else {
            try {
              F.call();
            } catch (rr) {
              x = rr;
            }
            i.call(F.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (rr) {
            x = rr;
          }
          i();
        }
      } catch (rr) {
        if (rr && x && typeof rr.stack == "string") {
          for (var E = rr.stack.split(`
`), j = x.stack.split(`
`), U = E.length - 1, D = j.length - 1; U >= 1 && D >= 0 && E[U] !== j[D]; )
            D--;
          for (; U >= 1 && D >= 0; U--, D--)
            if (E[U] !== j[D]) {
              if (U !== 1 || D !== 1)
                do
                  if (U--, D--, D < 0 || E[U] !== j[D]) {
                    var $ = `
` + E[U].replace(" at new ", " at ");
                    return i.displayName && $.includes("<anonymous>") && ($ = $.replace("<anonymous>", i.displayName)), typeof i == "function" && fr.set(i, $), $;
                  }
                while (U >= 1 && D >= 0);
              break;
            }
        }
      } finally {
        xr = !1, yr.current = B, Wr(), Error.prepareStackTrace = T;
      }
      var pr = i ? i.displayName || i.name : "", he = pr ? or(pr) : "";
      return typeof i == "function" && fr.set(i, he), he;
    }
    function Y(i, f, p) {
      return ur(i, !1);
    }
    function gr(i) {
      var f = i.prototype;
      return !!(f && f.isReactComponent);
    }
    function sr(i, f, p) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return ur(i, gr(i));
      if (typeof i == "string")
        return or(i);
      switch (i) {
        case I:
          return or("Suspense");
        case g:
          return or("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case m:
            return Y(i.render);
          case b:
            return sr(i.type, f, p);
          case O: {
            var x = i, T = x._payload, B = x._init;
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
    function o(i, f, p, x, T) {
      {
        var B = Function.call.bind(t);
        for (var F in i)
          if (B(i, F)) {
            var E = void 0;
            try {
              if (typeof i[F] != "function") {
                var j = Error((x || "React class") + ": " + p + " type `" + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[F] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw j.name = "Invariant Violation", j;
              }
              E = i[F](f, F, x, p, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (U) {
              E = U;
            }
            E && !(E instanceof Error) && (n(T), W("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", x || "React class", p, F, typeof E), n(null)), E instanceof Error && !(E.message in r) && (r[E.message] = !0, n(T), W("Failed %s type: %s", p, E.message), n(null));
          }
      }
    }
    var c = Array.isArray;
    function s(i) {
      return c(i);
    }
    function _(i) {
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
        return W("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", _(i)), C(i);
    }
    var A = G.ReactCurrentOwner, lr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Er, _r, Gr;
    Gr = {};
    function ge(i) {
      if (t.call(i, "ref")) {
        var f = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function Ee(i) {
      if (t.call(i, "key")) {
        var f = Object.getOwnPropertyDescriptor(i, "key").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function _e(i, f) {
      if (typeof i.ref == "string" && A.current && f && A.current.stateNode !== f) {
        var p = q(A.current.type);
        Gr[p] || (W('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', q(A.current.type), i.ref), Gr[p] = !0);
      }
    }
    function be(i, f) {
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
    function Fe(i, f) {
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
    var Te = function(i, f, p, x, T, B, F) {
      var E = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: l,
        // Built-in properties that belong on the element
        type: i,
        key: f,
        ref: p,
        props: F,
        // Record the component responsible for creating this element.
        _owner: B
      };
      return E._store = {}, Object.defineProperty(E._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(E, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: x
      }), Object.defineProperty(E, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: T
      }), Object.freeze && (Object.freeze(E.props), Object.freeze(E)), E;
    };
    function Re(i, f, p, x, T) {
      {
        var B, F = {}, E = null, j = null;
        p !== void 0 && (L(p), E = "" + p), Ee(f) && (L(f.key), E = "" + f.key), ge(f) && (j = f.ref, _e(f, T));
        for (B in f)
          t.call(f, B) && !lr.hasOwnProperty(B) && (F[B] = f[B]);
        if (i && i.defaultProps) {
          var U = i.defaultProps;
          for (B in U)
            F[B] === void 0 && (F[B] = U[B]);
        }
        if (E || j) {
          var D = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          E && be(F, D), j && Fe(F, D);
        }
        return Te(i, E, j, T, x, A.current, F);
      }
    }
    var Hr = G.ReactCurrentOwner, ae = G.ReactDebugCurrentFrame;
    function hr(i) {
      if (i) {
        var f = i._owner, p = sr(i.type, i._source, f ? f.type : null);
        ae.setExtraStackFrame(p);
      } else
        ae.setExtraStackFrame(null);
    }
    var Xr;
    Xr = !1;
    function Kr(i) {
      return typeof i == "object" && i !== null && i.$$typeof === l;
    }
    function ue() {
      {
        if (Hr.current) {
          var i = q(Hr.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
    }
    function Ae(i) {
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
    function Ce(i) {
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
        var p = Ce(f);
        if (ce[p])
          return;
        ce[p] = !0;
        var x = "";
        i && i._owner && i._owner !== Hr.current && (x = " It was passed a child from " + q(i._owner.type) + "."), hr(i), W('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', p, x), hr(null);
      }
    }
    function se(i, f) {
      {
        if (typeof i != "object")
          return;
        if (s(i))
          for (var p = 0; p < i.length; p++) {
            var x = i[p];
            Kr(x) && fe(x, f);
          }
        else if (Kr(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var T = $r(i);
          if (typeof T == "function" && T !== i.entries)
            for (var B = T.call(i), F; !(F = B.next()).done; )
              Kr(F.value) && fe(F.value, f);
        }
      }
    }
    function Be(i) {
      {
        var f = i.type;
        if (f == null || typeof f == "string")
          return;
        var p;
        if (typeof f == "function")
          p = f.propTypes;
        else if (typeof f == "object" && (f.$$typeof === m || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        f.$$typeof === b))
          p = f.propTypes;
        else
          return;
        if (p) {
          var x = q(f);
          o(p, i.props, "prop", x, i);
        } else if (f.PropTypes !== void 0 && !Xr) {
          Xr = !0;
          var T = q(f);
          W("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", T || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && W("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ie(i) {
      {
        for (var f = Object.keys(i.props), p = 0; p < f.length; p++) {
          var x = f[p];
          if (x !== "children" && x !== "key") {
            hr(i), W("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", x), hr(null);
            break;
          }
        }
        i.ref !== null && (hr(i), W("Invalid attribute `ref` supplied to `React.Fragment`."), hr(null));
      }
    }
    function le(i, f, p, x, T, B) {
      {
        var F = qr(i);
        if (!F) {
          var E = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var j = Ae(T);
          j ? E += j : E += ue();
          var U;
          i === null ? U = "null" : s(i) ? U = "array" : i !== void 0 && i.$$typeof === l ? (U = "<" + (q(i.type) || "Unknown") + " />", E = " Did you accidentally export a JSX literal instead of a component?") : U = typeof i, W("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", U, E);
        }
        var D = Re(i, f, p, T, B);
        if (D == null)
          return D;
        if (F) {
          var $ = f.children;
          if ($ !== void 0)
            if (x)
              if (s($)) {
                for (var pr = 0; pr < $.length; pr++)
                  se($[pr], i);
                Object.freeze && Object.freeze($);
              } else
                W("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              se($, i);
        }
        return i === v ? Ie(D) : Be(D), D;
      }
    }
    function Se(i, f, p) {
      return le(i, f, p, !0);
    }
    function Ue(i, f, p) {
      return le(i, f, p, !1);
    }
    var ke = Ue, Oe = Se;
    Fr.Fragment = v, Fr.jsx = ke, Fr.jsxs = Oe;
  }()), Fr;
}
(function(u) {
  Nr.env.NODE_ENV === "production" ? u.exports = Ge() : u.exports = He();
})(Je);
const Xe = Rr.Fragment, V = Rr.jsx, Tr = Rr.jsxs;
var ne = {}, Ke = {
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
    var l = {}.hasOwnProperty;
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
              l.call(w, m) && w[m] && v.push(m);
          }
        }
      }
      return v.join(" ");
    }
    u.exports ? (h.default = h, u.exports = h) : window.classNames = h;
  })();
})(Ke);
const Zr = ne, Qe = "_popupButton__container_13nzo_5", Ze = "_popupButton_13nzo_5", rt = "_icon_13nzo_19", et = "_inactiveIcon_13nzo_27", tt = "_activeIcon_13nzo_31", nt = "_notif_13nzo_35", it = "_pinging_13nzo_39", ot = "_ping_13nzo_39", J = {
  popupButton__container: Qe,
  popupButton: Ze,
  icon: rt,
  inactiveIcon: et,
  activeIcon: tt,
  notif: nt,
  pinging: it,
  ping: ot
};
function at({
  notiVal: u,
  showNoti: l,
  isOpen: h,
  clickHandler: v
}) {
  return /* @__PURE__ */ Tr("div", { className: J.popupButton__container, children: [
    /* @__PURE__ */ Tr(
      "button",
      {
        className: J.popupButton,
        type: "button",
        onClick: v,
        children: [
          /* @__PURE__ */ V(
            "div",
            {
              className: Zr(J.icon, {
                [J.activeIcon]: !h,
                [J.inactiveIcon]: h
              }),
              children: /* @__PURE__ */ V(
                "img",
                {
                  alt: "WalletChat",
                  src: "https://uploads-ssl.webflow.com/62d761bae8bf2da003f57b06/62d761bae8bf2dea68f57b52_walletchat%20logo.png",
                  style: { height: "90%" }
                }
              )
            }
          ),
          /* @__PURE__ */ V(
            "div",
            {
              className: Zr(J.icon, {
                [J.activeIcon]: h,
                [J.inactiveIcon]: !h
              }),
              children: /* @__PURE__ */ V(
                "svg",
                {
                  focusable: "false",
                  viewBox: "0 0 16 14",
                  width: "28",
                  height: "25",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ V(
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
    l && /* @__PURE__ */ Tr(Xe, { children: [
      /* @__PURE__ */ V("span", { className: Zr(J.notif, J.pinging) }),
      /* @__PURE__ */ V("span", { className: J.notif, children: u })
    ] })
  ] });
}
const oe = N.createContext(null);
function lt({
  children: u
}) {
  const [l, h] = N.useState(), v = N.useCallback(
    (w, d) => h((a) => ({ ...a, [w]: d })),
    []
  ), y = N.useMemo(
    () => ({
      widgetState: l || null,
      setWidgetState: v
    }),
    [l, v]
  );
  return /* @__PURE__ */ V(oe.Provider, { value: y, children: u });
}
function ut(u) {
  const h = u.replace("https://", "").replace("http://", "").split("/"), v = h.length, y = h[v - 1], w = h[v - 2];
  if (u.startsWith("looksrare.org"))
    return { itemId: y, contractAddress: w, chain: "ethereum" };
  const d = h[v - 3];
  return v >= 5 ? { itemId: y, contractAddress: w, network: d } : u.startsWith("x2y2.io") && d === "eth" ? { itemId: y, contractAddress: w, network: "ethereum" } : { contractAddress: null, itemId: null, network: null };
}
const xe = {
  "wallet-chat-widget": "_wallet-chat-widget_9zdz0_5",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_9zdz0_1"
}, ct = "http://localhost:5173", re = xe["wallet-chat-widget__container"];
function ht() {
  const u = N.useRef(""), l = N.useRef(null), h = N.useContext(oe), v = h == null ? void 0 : h.widgetState;
  v == null || v.ownerAddress;
  const [y, w] = N.useState(!1), [d, a] = N.useState(0), m = (I) => {
    w((g) => {
      const b = Boolean(g);
      return l.current && !b && (document == null || document.getElementById(re).contentWindow.postMessage(
        { ...l.current, redirect: !0 },
        "*"
      )), l.current = null, !g;
    });
  };
  return N.useEffect(() => {
    const I = () => {
      if (window.location.href === u.current)
        return;
      u.current = window.location.href;
      const O = ut(window.location.href);
      O.network && (l.current = O), document == null || document.getElementById(re).contentWindow.postMessage(O, "*");
    }, g = new MutationObserver(function() {
      I();
    }), b = { subtree: !0, childList: !0 };
    return I(), g.observe(document, b), () => g.disconnect();
  }, []), N.useEffect(() => {
    const I = (g) => {
      const { data: b } = g;
      b.target === "unread_cnt" && a(b.data);
    };
    return window.addEventListener("message", I), () => window.removeEventListener("message", I);
  }, []), h ? /* @__PURE__ */ Tr("div", { className: xe["wallet-chat-widget"], children: [
    /* @__PURE__ */ V(
      "iframe",
      {
        title: "WalletChat",
        name: "WalletChat",
        id: re,
        style: {
          height: y ? "50vh" : "0px",
          width: y ? "15vw" : "0px",
          minHeight: y ? "440px" : "0px",
          minWidth: y ? "500px" : "0px"
        },
        src: ct
      }
    ),
    /* @__PURE__ */ V(
      at,
      {
        notiVal: d,
        showNoti: d > 0,
        isOpen: y,
        clickHandler: m
      }
    )
  ] }) : (console.error(
    "WalletChat: ChatWithOwner component must be rendered within a WalletChatProvider"
  ), null);
}
const ft = ({
  onClick: u,
  children: l
}) => /* @__PURE__ */ V("button", { type: "button", onClick: u, children: l }), pt = ({
  owner: u,
  render: l
}) => {
  const h = N.useContext(oe), v = h == null ? void 0 : h.setWidgetState, y = l ? ({ onClick: w, children: d }) => N.cloneElement(l, { onClick: w }, d) : ft;
  return h ? /* @__PURE__ */ Tr(y, { onClick: () => v("ownerAddr", u), children: [
    /* @__PURE__ */ V(
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
  ] }) : (console.error(
    "WalletChat: ChatWithOwner component must be rendered within a WalletChatProvider"
  ), null);
};
export {
  pt as ChatWithOwner,
  lt as WalletChatProvider,
  ht as WalletChatWidget
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode("._popupButton__container_13nzo_5{position:relative;margin-top:.75rem;height:4rem}._popupButton_13nzo_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / .07)) drop-shadow(0 2px 2px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._icon_13nzo_19{transition-property:transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_13nzo_19 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_13nzo_27{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_13nzo_31{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_13nzo_35{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(219 39 119 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}@keyframes _ping_13nzo_39{75%,to{transform:scale(2);opacity:0}}._pinging_13nzo_39{animation:_ping_13nzo_39 1s cubic-bezier(0,0,.2,1) infinite}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._wallet-chat-widget_9zdz0_5{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;-moz-user-select:none;user-select:none}#_wallet-chat-widget__container_9zdz0_1{transition-property:width,min-width,height,min-height;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / .07)) drop-shadow(0 2px 2px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
