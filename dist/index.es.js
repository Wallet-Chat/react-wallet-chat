import V from "react";
var Oe = {}, Yr = {};
Yr.byteLength = Le;
Yr.toByteArray = Me;
Yr.fromByteArray = Ye;
var Q = [], $ = [], De = typeof Uint8Array < "u" ? Uint8Array : Array, Qr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var dr = 0, Pe = Qr.length; dr < Pe; ++dr)
  Q[dr] = Qr[dr], $[Qr.charCodeAt(dr)] = dr;
$["-".charCodeAt(0)] = 62;
$["_".charCodeAt(0)] = 63;
function ve(u) {
  var l = u.length;
  if (l % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var p = u.indexOf("=");
  p === -1 && (p = l);
  var w = p === l ? 0 : 4 - p % 4;
  return [p, w];
}
function Le(u) {
  var l = ve(u), p = l[0], w = l[1];
  return (p + w) * 3 / 4 - w;
}
function je(u, l, p) {
  return (l + p) * 3 / 4 - p;
}
function Me(u) {
  var l, p = ve(u), w = p[0], x = p[1], v = new De(je(u, w, x)), d = 0, o = x > 0 ? w - 4 : w, y;
  for (y = 0; y < o; y += 4)
    l = $[u.charCodeAt(y)] << 18 | $[u.charCodeAt(y + 1)] << 12 | $[u.charCodeAt(y + 2)] << 6 | $[u.charCodeAt(y + 3)], v[d++] = l >> 16 & 255, v[d++] = l >> 8 & 255, v[d++] = l & 255;
  return x === 2 && (l = $[u.charCodeAt(y)] << 2 | $[u.charCodeAt(y + 1)] >> 4, v[d++] = l & 255), x === 1 && (l = $[u.charCodeAt(y)] << 10 | $[u.charCodeAt(y + 1)] << 4 | $[u.charCodeAt(y + 2)] >> 2, v[d++] = l >> 8 & 255, v[d++] = l & 255), v;
}
function We(u) {
  return Q[u >> 18 & 63] + Q[u >> 12 & 63] + Q[u >> 6 & 63] + Q[u & 63];
}
function Ne(u, l, p) {
  for (var w, x = [], v = l; v < p; v += 3)
    w = (u[v] << 16 & 16711680) + (u[v + 1] << 8 & 65280) + (u[v + 2] & 255), x.push(We(w));
  return x.join("");
}
function Ye(u) {
  for (var l, p = u.length, w = p % 3, x = [], v = 16383, d = 0, o = p - w; d < o; d += v)
    x.push(Ne(u, d, d + v > o ? o : d + v));
  return w === 1 ? (l = u[p - 1], x.push(
    Q[l >> 2] + Q[l << 4 & 63] + "=="
  )) : w === 2 && (l = (u[p - 2] << 8) + u[p - 1], x.push(
    Q[l >> 10] + Q[l >> 4 & 63] + Q[l << 2 & 63] + "="
  )), x.join("");
}
var ne = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ne.read = function(u, l, p, w, x) {
  var v, d, o = x * 8 - w - 1, y = (1 << o) - 1, k = y >> 1, b = -7, A = p ? x - 1 : 0, M = p ? -1 : 1, D = u[l + A];
  for (A += M, v = D & (1 << -b) - 1, D >>= -b, b += o; b > 0; v = v * 256 + u[l + A], A += M, b -= 8)
    ;
  for (d = v & (1 << -b) - 1, v >>= -b, b += w; b > 0; d = d * 256 + u[l + A], A += M, b -= 8)
    ;
  if (v === 0)
    v = 1 - k;
  else {
    if (v === y)
      return d ? NaN : (D ? -1 : 1) * (1 / 0);
    d = d + Math.pow(2, w), v = v - k;
  }
  return (D ? -1 : 1) * d * Math.pow(2, v - w);
};
ne.write = function(u, l, p, w, x, v) {
  var d, o, y, k = v * 8 - x - 1, b = (1 << k) - 1, A = b >> 1, M = x === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, D = w ? 0 : v - 1, nr = w ? 1 : -1, or = l < 0 || l === 0 && 1 / l < 0 ? 1 : 0;
  for (l = Math.abs(l), isNaN(l) || l === 1 / 0 ? (o = isNaN(l) ? 1 : 0, d = b) : (d = Math.floor(Math.log(l) / Math.LN2), l * (y = Math.pow(2, -d)) < 1 && (d--, y *= 2), d + A >= 1 ? l += M / y : l += M * Math.pow(2, 1 - A), l * y >= 2 && (d++, y /= 2), d + A >= b ? (o = 0, d = b) : d + A >= 1 ? (o = (l * y - 1) * Math.pow(2, x), d = d + A) : (o = l * Math.pow(2, A - 1) * Math.pow(2, x), d = 0)); x >= 8; u[p + D] = o & 255, D += nr, o /= 256, x -= 8)
    ;
  for (d = d << x | o, k += x; k > 0; u[p + D] = d & 255, D += nr, d /= 256, k -= 8)
    ;
  u[p + D - nr] |= or * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  var l = Yr, p = ne, w = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  u.Buffer = o, u.SlowBuffer = L, u.INSPECT_MAX_BYTES = 50;
  var x = 2147483647;
  u.kMaxLength = x, o.TYPED_ARRAY_SUPPORT = v(), !o.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function v() {
    try {
      var t = new Uint8Array(1), r = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(r, Uint8Array.prototype), Object.setPrototypeOf(t, r), t.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(o.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (o.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(o.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (o.isBuffer(this))
        return this.byteOffset;
    }
  });
  function d(t) {
    if (t > x)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
    var r = new Uint8Array(t);
    return Object.setPrototypeOf(r, o.prototype), r;
  }
  function o(t, r, e) {
    if (typeof t == "number") {
      if (typeof r == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return A(t);
    }
    return y(t, r, e);
  }
  o.poolSize = 8192;
  function y(t, r, e) {
    if (typeof t == "string")
      return M(t, r);
    if (ArrayBuffer.isView(t))
      return nr(t);
    if (t == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
      );
    if (N(t, ArrayBuffer) || t && N(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (N(t, SharedArrayBuffer) || t && N(t.buffer, SharedArrayBuffer)))
      return or(t, r, e);
    if (typeof t == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var n = t.valueOf && t.valueOf();
    if (n != null && n !== t)
      return o.from(n, r, e);
    var a = $r(t);
    if (a)
      return a;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof t[Symbol.toPrimitive] == "function")
      return o.from(
        t[Symbol.toPrimitive]("string"),
        r,
        e
      );
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
    );
  }
  o.from = function(t, r, e) {
    return y(t, r, e);
  }, Object.setPrototypeOf(o.prototype, Uint8Array.prototype), Object.setPrototypeOf(o, Uint8Array);
  function k(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function b(t, r, e) {
    return k(t), t <= 0 ? d(t) : r !== void 0 ? typeof e == "string" ? d(t).fill(r, e) : d(t).fill(r) : d(t);
  }
  o.alloc = function(t, r, e) {
    return b(t, r, e);
  };
  function A(t) {
    return k(t), d(t < 0 ? 0 : G(t) | 0);
  }
  o.allocUnsafe = function(t) {
    return A(t);
  }, o.allocUnsafeSlow = function(t) {
    return A(t);
  };
  function M(t, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !o.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var e = Ar(t, r) | 0, n = d(e), a = n.write(t, r);
    return a !== e && (n = n.slice(0, a)), n;
  }
  function D(t) {
    for (var r = t.length < 0 ? 0 : G(t.length) | 0, e = d(r), n = 0; n < r; n += 1)
      e[n] = t[n] & 255;
    return e;
  }
  function nr(t) {
    if (N(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return or(r.buffer, r.byteOffset, r.byteLength);
    }
    return D(t);
  }
  function or(t, r, e) {
    if (r < 0 || t.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < r + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var n;
    return r === void 0 && e === void 0 ? n = new Uint8Array(t) : e === void 0 ? n = new Uint8Array(t, r) : n = new Uint8Array(t, r, e), Object.setPrototypeOf(n, o.prototype), n;
  }
  function $r(t) {
    if (o.isBuffer(t)) {
      var r = G(t.length) | 0, e = d(r);
      return e.length === 0 || t.copy(e, 0, 0, r), e;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || gr(t.length) ? d(0) : D(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return D(t.data);
  }
  function G(t) {
    if (t >= x)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + x.toString(16) + " bytes");
    return t | 0;
  }
  function L(t) {
    return +t != t && (t = 0), o.alloc(+t);
  }
  o.isBuffer = function(r) {
    return r != null && r._isBuffer === !0 && r !== o.prototype;
  }, o.compare = function(r, e) {
    if (N(r, Uint8Array) && (r = o.from(r, r.offset, r.byteLength)), N(e, Uint8Array) && (e = o.from(e, e.offset, e.byteLength)), !o.isBuffer(r) || !o.isBuffer(e))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (r === e)
      return 0;
    for (var n = r.length, a = e.length, f = 0, s = Math.min(n, a); f < s; ++f)
      if (r[f] !== e[f]) {
        n = r[f], a = e[f];
        break;
      }
    return n < a ? -1 : a < n ? 1 : 0;
  }, o.isEncoding = function(r) {
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
  }, o.concat = function(r, e) {
    if (!Array.isArray(r))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (r.length === 0)
      return o.alloc(0);
    var n;
    if (e === void 0)
      for (e = 0, n = 0; n < r.length; ++n)
        e += r[n].length;
    var a = o.allocUnsafe(e), f = 0;
    for (n = 0; n < r.length; ++n) {
      var s = r[n];
      if (N(s, Uint8Array))
        f + s.length > a.length ? o.from(s).copy(a, f) : Uint8Array.prototype.set.call(
          a,
          s,
          f
        );
      else if (o.isBuffer(s))
        s.copy(a, f);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      f += s.length;
    }
    return a;
  };
  function Ar(t, r) {
    if (o.isBuffer(t))
      return t.length;
    if (ArrayBuffer.isView(t) || N(t, ArrayBuffer))
      return t.byteLength;
    if (typeof t != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t
      );
    var e = t.length, n = arguments.length > 2 && arguments[2] === !0;
    if (!n && e === 0)
      return 0;
    for (var a = !1; ; )
      switch (r) {
        case "ascii":
        case "latin1":
        case "binary":
          return e;
        case "utf8":
        case "utf-8":
          return ar(t).length;
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
          if (a)
            return n ? -1 : ar(t).length;
          r = ("" + r).toLowerCase(), a = !0;
      }
  }
  o.byteLength = Ar;
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
  o.prototype._isBuffer = !0;
  function Z(t, r, e) {
    var n = t[r];
    t[r] = t[e], t[e] = n;
  }
  o.prototype.swap16 = function() {
    var r = this.length;
    if (r % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var e = 0; e < r; e += 2)
      Z(this, e, e + 1);
    return this;
  }, o.prototype.swap32 = function() {
    var r = this.length;
    if (r % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var e = 0; e < r; e += 4)
      Z(this, e, e + 3), Z(this, e + 1, e + 2);
    return this;
  }, o.prototype.swap64 = function() {
    var r = this.length;
    if (r % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var e = 0; e < r; e += 8)
      Z(this, e, e + 7), Z(this, e + 1, e + 6), Z(this, e + 2, e + 5), Z(this, e + 3, e + 4);
    return this;
  }, o.prototype.toString = function() {
    var r = this.length;
    return r === 0 ? "" : arguments.length === 0 ? H(this, 0, r) : zr.apply(this, arguments);
  }, o.prototype.toLocaleString = o.prototype.toString, o.prototype.equals = function(r) {
    if (!o.isBuffer(r))
      throw new TypeError("Argument must be a Buffer");
    return this === r ? !0 : o.compare(this, r) === 0;
  }, o.prototype.inspect = function() {
    var r = "", e = u.INSPECT_MAX_BYTES;
    return r = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (r += " ... "), "<Buffer " + r + ">";
  }, w && (o.prototype[w] = o.prototype.inspect), o.prototype.compare = function(r, e, n, a, f) {
    if (N(r, Uint8Array) && (r = o.from(r, r.offset, r.byteLength)), !o.isBuffer(r))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof r
      );
    if (e === void 0 && (e = 0), n === void 0 && (n = r ? r.length : 0), a === void 0 && (a = 0), f === void 0 && (f = this.length), e < 0 || n > r.length || a < 0 || f > this.length)
      throw new RangeError("out of range index");
    if (a >= f && e >= n)
      return 0;
    if (a >= f)
      return -1;
    if (e >= n)
      return 1;
    if (e >>>= 0, n >>>= 0, a >>>= 0, f >>>= 0, this === r)
      return 0;
    for (var s = f - a, E = n - e, T = Math.min(s, E), C = this.slice(a, f), P = r.slice(e, n), R = 0; R < T; ++R)
      if (C[R] !== P[R]) {
        s = C[R], E = P[R];
        break;
      }
    return s < E ? -1 : E < s ? 1 : 0;
  };
  function Cr(t, r, e, n, a) {
    if (t.length === 0)
      return -1;
    if (typeof e == "string" ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, gr(e) && (e = a ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
      if (a)
        return -1;
      e = t.length - 1;
    } else if (e < 0)
      if (a)
        e = 0;
      else
        return -1;
    if (typeof r == "string" && (r = o.from(r, n)), o.isBuffer(r))
      return r.length === 0 ? -1 : Br(t, r, e, n, a);
    if (typeof r == "number")
      return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? a ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : Br(t, [r], e, n, a);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Br(t, r, e, n, a) {
    var f = 1, s = t.length, E = r.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || r.length < 2)
        return -1;
      f = 2, s /= 2, E /= 2, e /= 2;
    }
    function T(Er, _r) {
      return f === 1 ? Er[_r] : Er.readUInt16BE(_r * f);
    }
    var C;
    if (a) {
      var P = -1;
      for (C = e; C < s; C++)
        if (T(t, C) === T(r, P === -1 ? 0 : C - P)) {
          if (P === -1 && (P = C), C - P + 1 === E)
            return P * f;
        } else
          P !== -1 && (C -= C - P), P = -1;
    } else
      for (e + E > s && (e = s - E), C = e; C >= 0; C--) {
        for (var R = !0, lr = 0; lr < E; lr++)
          if (T(t, C + lr) !== T(r, lr)) {
            R = !1;
            break;
          }
        if (R)
          return C;
      }
    return -1;
  }
  o.prototype.includes = function(r, e, n) {
    return this.indexOf(r, e, n) !== -1;
  }, o.prototype.indexOf = function(r, e, n) {
    return Cr(this, r, e, n, !0);
  }, o.prototype.lastIndexOf = function(r, e, n) {
    return Cr(this, r, e, n, !1);
  };
  function Vr(t, r, e, n) {
    e = Number(e) || 0;
    var a = t.length - e;
    n ? (n = Number(n), n > a && (n = a)) : n = a;
    var f = r.length;
    n > f / 2 && (n = f / 2);
    for (var s = 0; s < n; ++s) {
      var E = parseInt(r.substr(s * 2, 2), 16);
      if (gr(E))
        return s;
      t[e + s] = E;
    }
    return s;
  }
  function Sr(t, r, e, n) {
    return ur(ar(r, t.length - e), t, e, n);
  }
  function qr(t, r, e, n) {
    return ur(xr(r), t, e, n);
  }
  function Jr(t, r, e, n) {
    return ur(Mr(r), t, e, n);
  }
  function Ir(t, r, e, n) {
    return ur(cr(r, t.length - e), t, e, n);
  }
  o.prototype.write = function(r, e, n, a) {
    if (e === void 0)
      a = "utf8", n = this.length, e = 0;
    else if (n === void 0 && typeof e == "string")
      a = e, n = this.length, e = 0;
    else if (isFinite(e))
      e = e >>> 0, isFinite(n) ? (n = n >>> 0, a === void 0 && (a = "utf8")) : (a = n, n = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    var f = this.length - e;
    if ((n === void 0 || n > f) && (n = f), r.length > 0 && (n < 0 || e < 0) || e > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    a || (a = "utf8");
    for (var s = !1; ; )
      switch (a) {
        case "hex":
          return Vr(this, r, e, n);
        case "utf8":
        case "utf-8":
          return Sr(this, r, e, n);
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
          return Ir(this, r, e, n);
        default:
          if (s)
            throw new TypeError("Unknown encoding: " + a);
          a = ("" + a).toLowerCase(), s = !0;
      }
  }, o.prototype.toJSON = function() {
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
    for (var n = [], a = r; a < e; ) {
      var f = t[a], s = null, E = f > 239 ? 4 : f > 223 ? 3 : f > 191 ? 2 : 1;
      if (a + E <= e) {
        var T, C, P, R;
        switch (E) {
          case 1:
            f < 128 && (s = f);
            break;
          case 2:
            T = t[a + 1], (T & 192) === 128 && (R = (f & 31) << 6 | T & 63, R > 127 && (s = R));
            break;
          case 3:
            T = t[a + 1], C = t[a + 2], (T & 192) === 128 && (C & 192) === 128 && (R = (f & 15) << 12 | (T & 63) << 6 | C & 63, R > 2047 && (R < 55296 || R > 57343) && (s = R));
            break;
          case 4:
            T = t[a + 1], C = t[a + 2], P = t[a + 3], (T & 192) === 128 && (C & 192) === 128 && (P & 192) === 128 && (R = (f & 15) << 18 | (T & 63) << 12 | (C & 63) << 6 | P & 63, R > 65535 && R < 1114112 && (s = R));
        }
      }
      s === null ? (s = 65533, E = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), n.push(s), a += E;
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
    for (var a = r; a < e; ++a)
      n += String.fromCharCode(t[a] & 127);
    return n;
  }
  function Or(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var a = r; a < e; ++a)
      n += String.fromCharCode(t[a]);
    return n;
  }
  function Dr(t, r, e) {
    var n = t.length;
    (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
    for (var a = "", f = r; f < e; ++f)
      a += sr[t[f]];
    return a;
  }
  function Pr(t, r, e) {
    for (var n = t.slice(r, e), a = "", f = 0; f < n.length - 1; f += 2)
      a += String.fromCharCode(n[f] + n[f + 1] * 256);
    return a;
  }
  o.prototype.slice = function(r, e) {
    var n = this.length;
    r = ~~r, e = e === void 0 ? n : ~~e, r < 0 ? (r += n, r < 0 && (r = 0)) : r > n && (r = n), e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), e < r && (e = r);
    var a = this.subarray(r, e);
    return Object.setPrototypeOf(a, o.prototype), a;
  };
  function S(t, r, e) {
    if (t % 1 !== 0 || t < 0)
      throw new RangeError("offset is not uint");
    if (t + r > e)
      throw new RangeError("Trying to access beyond buffer length");
  }
  o.prototype.readUintLE = o.prototype.readUIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || S(r, e, this.length);
    for (var a = this[r], f = 1, s = 0; ++s < e && (f *= 256); )
      a += this[r + s] * f;
    return a;
  }, o.prototype.readUintBE = o.prototype.readUIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || S(r, e, this.length);
    for (var a = this[r + --e], f = 1; e > 0 && (f *= 256); )
      a += this[r + --e] * f;
    return a;
  }, o.prototype.readUint8 = o.prototype.readUInt8 = function(r, e) {
    return r = r >>> 0, e || S(r, 1, this.length), this[r];
  }, o.prototype.readUint16LE = o.prototype.readUInt16LE = function(r, e) {
    return r = r >>> 0, e || S(r, 2, this.length), this[r] | this[r + 1] << 8;
  }, o.prototype.readUint16BE = o.prototype.readUInt16BE = function(r, e) {
    return r = r >>> 0, e || S(r, 2, this.length), this[r] << 8 | this[r + 1];
  }, o.prototype.readUint32LE = o.prototype.readUInt32LE = function(r, e) {
    return r = r >>> 0, e || S(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
  }, o.prototype.readUint32BE = o.prototype.readUInt32BE = function(r, e) {
    return r = r >>> 0, e || S(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
  }, o.prototype.readIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || S(r, e, this.length);
    for (var a = this[r], f = 1, s = 0; ++s < e && (f *= 256); )
      a += this[r + s] * f;
    return f *= 128, a >= f && (a -= Math.pow(2, 8 * e)), a;
  }, o.prototype.readIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || S(r, e, this.length);
    for (var a = e, f = 1, s = this[r + --a]; a > 0 && (f *= 256); )
      s += this[r + --a] * f;
    return f *= 128, s >= f && (s -= Math.pow(2, 8 * e)), s;
  }, o.prototype.readInt8 = function(r, e) {
    return r = r >>> 0, e || S(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
  }, o.prototype.readInt16LE = function(r, e) {
    r = r >>> 0, e || S(r, 2, this.length);
    var n = this[r] | this[r + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, o.prototype.readInt16BE = function(r, e) {
    r = r >>> 0, e || S(r, 2, this.length);
    var n = this[r + 1] | this[r] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, o.prototype.readInt32LE = function(r, e) {
    return r = r >>> 0, e || S(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
  }, o.prototype.readInt32BE = function(r, e) {
    return r = r >>> 0, e || S(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
  }, o.prototype.readFloatLE = function(r, e) {
    return r = r >>> 0, e || S(r, 4, this.length), p.read(this, r, !0, 23, 4);
  }, o.prototype.readFloatBE = function(r, e) {
    return r = r >>> 0, e || S(r, 4, this.length), p.read(this, r, !1, 23, 4);
  }, o.prototype.readDoubleLE = function(r, e) {
    return r = r >>> 0, e || S(r, 8, this.length), p.read(this, r, !0, 52, 8);
  }, o.prototype.readDoubleBE = function(r, e) {
    return r = r >>> 0, e || S(r, 8, this.length), p.read(this, r, !1, 52, 8);
  };
  function j(t, r, e, n, a, f) {
    if (!o.isBuffer(t))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (r > a || r < f)
      throw new RangeError('"value" argument is out of bounds');
    if (e + n > t.length)
      throw new RangeError("Index out of range");
  }
  o.prototype.writeUintLE = o.prototype.writeUIntLE = function(r, e, n, a) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !a) {
      var f = Math.pow(2, 8 * n) - 1;
      j(this, r, e, n, f, 0);
    }
    var s = 1, E = 0;
    for (this[e] = r & 255; ++E < n && (s *= 256); )
      this[e + E] = r / s & 255;
    return e + n;
  }, o.prototype.writeUintBE = o.prototype.writeUIntBE = function(r, e, n, a) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !a) {
      var f = Math.pow(2, 8 * n) - 1;
      j(this, r, e, n, f, 0);
    }
    var s = n - 1, E = 1;
    for (this[e + s] = r & 255; --s >= 0 && (E *= 256); )
      this[e + s] = r / E & 255;
    return e + n;
  }, o.prototype.writeUint8 = o.prototype.writeUInt8 = function(r, e, n) {
    return r = +r, e = e >>> 0, n || j(this, r, e, 1, 255, 0), this[e] = r & 255, e + 1;
  }, o.prototype.writeUint16LE = o.prototype.writeUInt16LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || j(this, r, e, 2, 65535, 0), this[e] = r & 255, this[e + 1] = r >>> 8, e + 2;
  }, o.prototype.writeUint16BE = o.prototype.writeUInt16BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || j(this, r, e, 2, 65535, 0), this[e] = r >>> 8, this[e + 1] = r & 255, e + 2;
  }, o.prototype.writeUint32LE = o.prototype.writeUInt32LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || j(this, r, e, 4, 4294967295, 0), this[e + 3] = r >>> 24, this[e + 2] = r >>> 16, this[e + 1] = r >>> 8, this[e] = r & 255, e + 4;
  }, o.prototype.writeUint32BE = o.prototype.writeUInt32BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || j(this, r, e, 4, 4294967295, 0), this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255, e + 4;
  }, o.prototype.writeIntLE = function(r, e, n, a) {
    if (r = +r, e = e >>> 0, !a) {
      var f = Math.pow(2, 8 * n - 1);
      j(this, r, e, n, f - 1, -f);
    }
    var s = 0, E = 1, T = 0;
    for (this[e] = r & 255; ++s < n && (E *= 256); )
      r < 0 && T === 0 && this[e + s - 1] !== 0 && (T = 1), this[e + s] = (r / E >> 0) - T & 255;
    return e + n;
  }, o.prototype.writeIntBE = function(r, e, n, a) {
    if (r = +r, e = e >>> 0, !a) {
      var f = Math.pow(2, 8 * n - 1);
      j(this, r, e, n, f - 1, -f);
    }
    var s = n - 1, E = 1, T = 0;
    for (this[e + s] = r & 255; --s >= 0 && (E *= 256); )
      r < 0 && T === 0 && this[e + s + 1] !== 0 && (T = 1), this[e + s] = (r / E >> 0) - T & 255;
    return e + n;
  }, o.prototype.writeInt8 = function(r, e, n) {
    return r = +r, e = e >>> 0, n || j(this, r, e, 1, 127, -128), r < 0 && (r = 255 + r + 1), this[e] = r & 255, e + 1;
  }, o.prototype.writeInt16LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || j(this, r, e, 2, 32767, -32768), this[e] = r & 255, this[e + 1] = r >>> 8, e + 2;
  }, o.prototype.writeInt16BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || j(this, r, e, 2, 32767, -32768), this[e] = r >>> 8, this[e + 1] = r & 255, e + 2;
  }, o.prototype.writeInt32LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || j(this, r, e, 4, 2147483647, -2147483648), this[e] = r & 255, this[e + 1] = r >>> 8, this[e + 2] = r >>> 16, this[e + 3] = r >>> 24, e + 4;
  }, o.prototype.writeInt32BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || j(this, r, e, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255, e + 4;
  };
  function wr(t, r, e, n, a, f) {
    if (e + n > t.length)
      throw new RangeError("Index out of range");
    if (e < 0)
      throw new RangeError("Index out of range");
  }
  function Lr(t, r, e, n, a) {
    return r = +r, e = e >>> 0, a || wr(t, r, e, 4), p.write(t, r, e, n, 23, 4), e + 4;
  }
  o.prototype.writeFloatLE = function(r, e, n) {
    return Lr(this, r, e, !0, n);
  }, o.prototype.writeFloatBE = function(r, e, n) {
    return Lr(this, r, e, !1, n);
  };
  function jr(t, r, e, n, a) {
    return r = +r, e = e >>> 0, a || wr(t, r, e, 8), p.write(t, r, e, n, 52, 8), e + 8;
  }
  o.prototype.writeDoubleLE = function(r, e, n) {
    return jr(this, r, e, !0, n);
  }, o.prototype.writeDoubleBE = function(r, e, n) {
    return jr(this, r, e, !1, n);
  }, o.prototype.copy = function(r, e, n, a) {
    if (!o.isBuffer(r))
      throw new TypeError("argument should be a Buffer");
    if (n || (n = 0), !a && a !== 0 && (a = this.length), e >= r.length && (e = r.length), e || (e = 0), a > 0 && a < n && (a = n), a === n || r.length === 0 || this.length === 0)
      return 0;
    if (e < 0)
      throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length)
      throw new RangeError("Index out of range");
    if (a < 0)
      throw new RangeError("sourceEnd out of bounds");
    a > this.length && (a = this.length), r.length - e < a - n && (a = r.length - e + n);
    var f = a - n;
    return this === r && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(e, n, a) : Uint8Array.prototype.set.call(
      r,
      this.subarray(n, a),
      e
    ), f;
  }, o.prototype.fill = function(r, e, n, a) {
    if (typeof r == "string") {
      if (typeof e == "string" ? (a = e, e = 0, n = this.length) : typeof n == "string" && (a = n, n = this.length), a !== void 0 && typeof a != "string")
        throw new TypeError("encoding must be a string");
      if (typeof a == "string" && !o.isEncoding(a))
        throw new TypeError("Unknown encoding: " + a);
      if (r.length === 1) {
        var f = r.charCodeAt(0);
        (a === "utf8" && f < 128 || a === "latin1") && (r = f);
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
      var E = o.isBuffer(r) ? r : o.from(r, a), T = E.length;
      if (T === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (s = 0; s < n - e; ++s)
        this[s + e] = E[s % T];
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
  function ar(t, r) {
    r = r || 1 / 0;
    for (var e, n = t.length, a = null, f = [], s = 0; s < n; ++s) {
      if (e = t.charCodeAt(s), e > 55295 && e < 57344) {
        if (!a) {
          if (e > 56319) {
            (r -= 3) > -1 && f.push(239, 191, 189);
            continue;
          } else if (s + 1 === n) {
            (r -= 3) > -1 && f.push(239, 191, 189);
            continue;
          }
          a = e;
          continue;
        }
        if (e < 56320) {
          (r -= 3) > -1 && f.push(239, 191, 189), a = e;
          continue;
        }
        e = (a - 55296 << 10 | e - 56320) + 65536;
      } else
        a && (r -= 3) > -1 && f.push(239, 191, 189);
      if (a = null, e < 128) {
        if ((r -= 1) < 0)
          break;
        f.push(e);
      } else if (e < 2048) {
        if ((r -= 2) < 0)
          break;
        f.push(
          e >> 6 | 192,
          e & 63 | 128
        );
      } else if (e < 65536) {
        if ((r -= 3) < 0)
          break;
        f.push(
          e >> 12 | 224,
          e >> 6 & 63 | 128,
          e & 63 | 128
        );
      } else if (e < 1114112) {
        if ((r -= 4) < 0)
          break;
        f.push(
          e >> 18 | 240,
          e >> 12 & 63 | 128,
          e >> 6 & 63 | 128,
          e & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return f;
  }
  function xr(t) {
    for (var r = [], e = 0; e < t.length; ++e)
      r.push(t.charCodeAt(e) & 255);
    return r;
  }
  function cr(t, r) {
    for (var e, n, a, f = [], s = 0; s < t.length && !((r -= 2) < 0); ++s)
      e = t.charCodeAt(s), n = e >> 8, a = e % 256, f.push(a), f.push(n);
    return f;
  }
  function Mr(t) {
    return l.toByteArray(mr(t));
  }
  function ur(t, r, e, n) {
    for (var a = 0; a < n && !(a + e >= r.length || a >= t.length); ++a)
      r[a + e] = t[a];
    return a;
  }
  function N(t, r) {
    return t instanceof r || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === r.name;
  }
  function gr(t) {
    return t !== t;
  }
  var sr = function() {
    for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
      for (var n = e * 16, a = 0; a < 16; ++a)
        r[n + a] = t[e] + t[a];
    return r;
  }();
})(Oe);
var Nr = {}, $e = {
  get exports() {
    return Nr;
  },
  set exports(u) {
    Nr = u;
  }
}, U = $e.exports = {}, X, K;
function re() {
  throw new Error("setTimeout has not been defined");
}
function ee() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? X = setTimeout : X = re;
  } catch {
    X = re;
  }
  try {
    typeof clearTimeout == "function" ? K = clearTimeout : K = ee;
  } catch {
    K = ee;
  }
})();
function we(u) {
  if (X === setTimeout)
    return setTimeout(u, 0);
  if ((X === re || !X) && setTimeout)
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
function ze(u) {
  if (K === clearTimeout)
    return clearTimeout(u);
  if ((K === ee || !K) && clearTimeout)
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
var er = [], vr = !1, fr, Wr = -1;
function Ve() {
  !vr || !fr || (vr = !1, fr.length ? er = fr.concat(er) : Wr = -1, er.length && ye());
}
function ye() {
  if (!vr) {
    var u = we(Ve);
    vr = !0;
    for (var l = er.length; l; ) {
      for (fr = er, er = []; ++Wr < l; )
        fr && fr[Wr].run();
      Wr = -1, l = er.length;
    }
    fr = null, vr = !1, ze(u);
  }
}
U.nextTick = function(u) {
  var l = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var p = 1; p < arguments.length; p++)
      l[p - 1] = arguments[p];
  er.push(new me(u, l)), er.length === 1 && !vr && we(ye);
};
function me(u, l) {
  this.fun = u, this.array = l;
}
me.prototype.run = function() {
  this.fun.apply(null, this.array);
};
U.title = "browser";
U.browser = !0;
U.env = {};
U.argv = [];
U.version = "";
U.versions = {};
function tr() {
}
U.on = tr;
U.addListener = tr;
U.once = tr;
U.off = tr;
U.removeListener = tr;
U.removeAllListeners = tr;
U.emit = tr;
U.prependListener = tr;
U.prependOnceListener = tr;
U.listeners = function(u) {
  return [];
};
U.binding = function(u) {
  throw new Error("process.binding is not supported");
};
U.cwd = function() {
  return "/";
};
U.chdir = function(u) {
  throw new Error("process.chdir is not supported");
};
U.umask = function() {
  return 0;
};
(function(u) {
  function l() {
    var w = this || self;
    return delete u.prototype.__magic__, w;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return l();
  u.defineProperty(u.prototype, "__magic__", {
    configurable: !0,
    get: l
  });
  var p = __magic__;
  return p;
})(Object);
var Rr = {}, qe = {
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
var he;
function Je() {
  if (he)
    return br;
  he = 1;
  var u = V, l = Symbol.for("react.element"), p = Symbol.for("react.fragment"), w = Object.prototype.hasOwnProperty, x = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, v = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(o, y, k) {
    var b, A = {}, M = null, D = null;
    k !== void 0 && (M = "" + k), y.key !== void 0 && (M = "" + y.key), y.ref !== void 0 && (D = y.ref);
    for (b in y)
      w.call(y, b) && !v.hasOwnProperty(b) && (A[b] = y[b]);
    if (o && o.defaultProps)
      for (b in y = o.defaultProps, y)
        A[b] === void 0 && (A[b] = y[b]);
    return { $$typeof: l, type: o, key: M, ref: D, props: A, _owner: x.current };
  }
  return br.Fragment = p, br.jsx = d, br.jsxs = d, br;
}
var Fr = {}, pe;
function Ge() {
  return pe || (pe = 1, Nr.env.NODE_ENV !== "production" && function() {
    var u = V, l = Symbol.for("react.element"), p = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), o = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), A = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), D = Symbol.for("react.offscreen"), nr = Symbol.iterator, or = "@@iterator";
    function $r(i) {
      if (i === null || typeof i != "object")
        return null;
      var c = nr && i[nr] || i[or];
      return typeof c == "function" ? c : null;
    }
    var G = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function L(i) {
      {
        for (var c = arguments.length, h = new Array(c > 1 ? c - 1 : 0), m = 1; m < c; m++)
          h[m - 1] = arguments[m];
        Ar("error", i, h);
      }
    }
    function Ar(i, c, h) {
      {
        var m = G.ReactDebugCurrentFrame, F = m.getStackAddendum();
        F !== "" && (c += "%s", h = h.concat([F]));
        var B = h.map(function(_) {
          return String(_);
        });
        B.unshift("Warning: " + c), Function.prototype.apply.call(console[i], console, B);
      }
    }
    var zr = !1, Z = !1, Cr = !1, Br = !1, Vr = !1, Sr;
    Sr = Symbol.for("react.module.reference");
    function qr(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === w || i === v || Vr || i === x || i === k || i === b || Br || i === D || zr || Z || Cr || typeof i == "object" && i !== null && (i.$$typeof === M || i.$$typeof === A || i.$$typeof === d || i.$$typeof === o || i.$$typeof === y || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === Sr || i.getModuleId !== void 0));
    }
    function Jr(i, c, h) {
      var m = i.displayName;
      if (m)
        return m;
      var F = c.displayName || c.name || "";
      return F !== "" ? h + "(" + F + ")" : h;
    }
    function Ir(i) {
      return i.displayName || "Context";
    }
    function q(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && L("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
        return i.displayName || i.name || null;
      if (typeof i == "string")
        return i;
      switch (i) {
        case w:
          return "Fragment";
        case p:
          return "Portal";
        case v:
          return "Profiler";
        case x:
          return "StrictMode";
        case k:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case o:
            var c = i;
            return Ir(c) + ".Consumer";
          case d:
            var h = i;
            return Ir(h._context) + ".Provider";
          case y:
            return Jr(i, i.render, "ForwardRef");
          case A:
            var m = i.displayName || null;
            return m !== null ? m : q(i.type) || "Memo";
          case M: {
            var F = i, B = F._payload, _ = F._init;
            try {
              return q(_(B));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var H = Object.assign, ir = 0, Ur, kr, Or, Dr, Pr, S, j;
    function wr() {
    }
    wr.__reactDisabledLog = !0;
    function Lr() {
      {
        if (ir === 0) {
          Ur = console.log, kr = console.info, Or = console.warn, Dr = console.error, Pr = console.group, S = console.groupCollapsed, j = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: wr,
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
    function jr() {
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
              value: j
            })
          });
        }
        ir < 0 && L("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var yr = G.ReactCurrentDispatcher, mr;
    function ar(i, c, h) {
      {
        if (mr === void 0)
          try {
            throw Error();
          } catch (F) {
            var m = F.stack.trim().match(/\n( *(at )?)/);
            mr = m && m[1] || "";
          }
        return `
` + mr + i;
      }
    }
    var xr = !1, cr;
    {
      var Mr = typeof WeakMap == "function" ? WeakMap : Map;
      cr = new Mr();
    }
    function ur(i, c) {
      if (!i || xr)
        return "";
      {
        var h = cr.get(i);
        if (h !== void 0)
          return h;
      }
      var m;
      xr = !0;
      var F = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var B;
      B = yr.current, yr.current = null, Lr();
      try {
        if (c) {
          var _ = function() {
            throw Error();
          };
          if (Object.defineProperty(_.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(_, []);
            } catch (rr) {
              m = rr;
            }
            Reflect.construct(i, [], _);
          } else {
            try {
              _.call();
            } catch (rr) {
              m = rr;
            }
            i.call(_.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (rr) {
            m = rr;
          }
          i();
        }
      } catch (rr) {
        if (rr && m && typeof rr.stack == "string") {
          for (var g = rr.stack.split(`
`), W = m.stack.split(`
`), I = g.length - 1, O = W.length - 1; I >= 1 && O >= 0 && g[I] !== W[O]; )
            O--;
          for (; I >= 1 && O >= 0; I--, O--)
            if (g[I] !== W[O]) {
              if (I !== 1 || O !== 1)
                do
                  if (I--, O--, O < 0 || g[I] !== W[O]) {
                    var Y = `
` + g[I].replace(" at new ", " at ");
                    return i.displayName && Y.includes("<anonymous>") && (Y = Y.replace("<anonymous>", i.displayName)), typeof i == "function" && cr.set(i, Y), Y;
                  }
                while (I >= 1 && O >= 0);
              break;
            }
        }
      } finally {
        xr = !1, yr.current = B, jr(), Error.prepareStackTrace = F;
      }
      var pr = i ? i.displayName || i.name : "", le = pr ? ar(pr) : "";
      return typeof i == "function" && cr.set(i, le), le;
    }
    function N(i, c, h) {
      return ur(i, !1);
    }
    function gr(i) {
      var c = i.prototype;
      return !!(c && c.isReactComponent);
    }
    function sr(i, c, h) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return ur(i, gr(i));
      if (typeof i == "string")
        return ar(i);
      switch (i) {
        case k:
          return ar("Suspense");
        case b:
          return ar("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case y:
            return N(i.render);
          case A:
            return sr(i.type, c, h);
          case M: {
            var m = i, F = m._payload, B = m._init;
            try {
              return sr(B(F), c, h);
            } catch {
            }
          }
        }
      return "";
    }
    var t = Object.prototype.hasOwnProperty, r = {}, e = G.ReactDebugCurrentFrame;
    function n(i) {
      if (i) {
        var c = i._owner, h = sr(i.type, i._source, c ? c.type : null);
        e.setExtraStackFrame(h);
      } else
        e.setExtraStackFrame(null);
    }
    function a(i, c, h, m, F) {
      {
        var B = Function.call.bind(t);
        for (var _ in i)
          if (B(i, _)) {
            var g = void 0;
            try {
              if (typeof i[_] != "function") {
                var W = Error((m || "React class") + ": " + h + " type `" + _ + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[_] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw W.name = "Invariant Violation", W;
              }
              g = i[_](c, _, m, h, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (I) {
              g = I;
            }
            g && !(g instanceof Error) && (n(F), L("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", h, _, typeof g), n(null)), g instanceof Error && !(g.message in r) && (r[g.message] = !0, n(F), L("Failed %s type: %s", h, g.message), n(null));
          }
      }
    }
    var f = Array.isArray;
    function s(i) {
      return f(i);
    }
    function E(i) {
      {
        var c = typeof Symbol == "function" && Symbol.toStringTag, h = c && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return h;
      }
    }
    function T(i) {
      try {
        return C(i), !1;
      } catch {
        return !0;
      }
    }
    function C(i) {
      return "" + i;
    }
    function P(i) {
      if (T(i))
        return L("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", E(i)), C(i);
    }
    var R = G.ReactCurrentOwner, lr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Er, _r, Gr;
    Gr = {};
    function xe(i) {
      if (t.call(i, "ref")) {
        var c = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (c && c.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function ge(i) {
      if (t.call(i, "key")) {
        var c = Object.getOwnPropertyDescriptor(i, "key").get;
        if (c && c.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function Ee(i, c) {
      if (typeof i.ref == "string" && R.current && c && R.current.stateNode !== c) {
        var h = q(R.current.type);
        Gr[h] || (L('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', q(R.current.type), i.ref), Gr[h] = !0);
      }
    }
    function _e(i, c) {
      {
        var h = function() {
          Er || (Er = !0, L("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", c));
        };
        h.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: h,
          configurable: !0
        });
      }
    }
    function be(i, c) {
      {
        var h = function() {
          _r || (_r = !0, L("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", c));
        };
        h.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: h,
          configurable: !0
        });
      }
    }
    var Fe = function(i, c, h, m, F, B, _) {
      var g = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: l,
        // Built-in properties that belong on the element
        type: i,
        key: c,
        ref: h,
        props: _,
        // Record the component responsible for creating this element.
        _owner: B
      };
      return g._store = {}, Object.defineProperty(g._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(g, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: m
      }), Object.defineProperty(g, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: F
      }), Object.freeze && (Object.freeze(g.props), Object.freeze(g)), g;
    };
    function Te(i, c, h, m, F) {
      {
        var B, _ = {}, g = null, W = null;
        h !== void 0 && (P(h), g = "" + h), ge(c) && (P(c.key), g = "" + c.key), xe(c) && (W = c.ref, Ee(c, F));
        for (B in c)
          t.call(c, B) && !lr.hasOwnProperty(B) && (_[B] = c[B]);
        if (i && i.defaultProps) {
          var I = i.defaultProps;
          for (B in I)
            _[B] === void 0 && (_[B] = I[B]);
        }
        if (g || W) {
          var O = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          g && _e(_, O), W && be(_, O);
        }
        return Fe(i, g, W, F, m, R.current, _);
      }
    }
    var Hr = G.ReactCurrentOwner, ae = G.ReactDebugCurrentFrame;
    function hr(i) {
      if (i) {
        var c = i._owner, h = sr(i.type, i._source, c ? c.type : null);
        ae.setExtraStackFrame(h);
      } else
        ae.setExtraStackFrame(null);
    }
    var Xr;
    Xr = !1;
    function Kr(i) {
      return typeof i == "object" && i !== null && i.$$typeof === l;
    }
    function oe() {
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
    function Re(i) {
      {
        if (i !== void 0) {
          var c = i.fileName.replace(/^.*[\\\/]/, ""), h = i.lineNumber;
          return `

Check your code at ` + c + ":" + h + ".";
        }
        return "";
      }
    }
    var ue = {};
    function Ae(i) {
      {
        var c = oe();
        if (!c) {
          var h = typeof i == "string" ? i : i.displayName || i.name;
          h && (c = `

Check the top-level render call using <` + h + ">.");
        }
        return c;
      }
    }
    function fe(i, c) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var h = Ae(c);
        if (ue[h])
          return;
        ue[h] = !0;
        var m = "";
        i && i._owner && i._owner !== Hr.current && (m = " It was passed a child from " + q(i._owner.type) + "."), hr(i), L('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', h, m), hr(null);
      }
    }
    function ce(i, c) {
      {
        if (typeof i != "object")
          return;
        if (s(i))
          for (var h = 0; h < i.length; h++) {
            var m = i[h];
            Kr(m) && fe(m, c);
          }
        else if (Kr(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var F = $r(i);
          if (typeof F == "function" && F !== i.entries)
            for (var B = F.call(i), _; !(_ = B.next()).done; )
              Kr(_.value) && fe(_.value, c);
        }
      }
    }
    function Ce(i) {
      {
        var c = i.type;
        if (c == null || typeof c == "string")
          return;
        var h;
        if (typeof c == "function")
          h = c.propTypes;
        else if (typeof c == "object" && (c.$$typeof === y || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        c.$$typeof === A))
          h = c.propTypes;
        else
          return;
        if (h) {
          var m = q(c);
          a(h, i.props, "prop", m, i);
        } else if (c.PropTypes !== void 0 && !Xr) {
          Xr = !0;
          var F = q(c);
          L("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", F || "Unknown");
        }
        typeof c.getDefaultProps == "function" && !c.getDefaultProps.isReactClassApproved && L("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Be(i) {
      {
        for (var c = Object.keys(i.props), h = 0; h < c.length; h++) {
          var m = c[h];
          if (m !== "children" && m !== "key") {
            hr(i), L("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), hr(null);
            break;
          }
        }
        i.ref !== null && (hr(i), L("Invalid attribute `ref` supplied to `React.Fragment`."), hr(null));
      }
    }
    function se(i, c, h, m, F, B) {
      {
        var _ = qr(i);
        if (!_) {
          var g = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (g += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var W = Re(F);
          W ? g += W : g += oe();
          var I;
          i === null ? I = "null" : s(i) ? I = "array" : i !== void 0 && i.$$typeof === l ? (I = "<" + (q(i.type) || "Unknown") + " />", g = " Did you accidentally export a JSX literal instead of a component?") : I = typeof i, L("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", I, g);
        }
        var O = Te(i, c, h, F, B);
        if (O == null)
          return O;
        if (_) {
          var Y = c.children;
          if (Y !== void 0)
            if (m)
              if (s(Y)) {
                for (var pr = 0; pr < Y.length; pr++)
                  ce(Y[pr], i);
                Object.freeze && Object.freeze(Y);
              } else
                L("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ce(Y, i);
        }
        return i === w ? Be(O) : Ce(O), O;
      }
    }
    function Se(i, c, h) {
      return se(i, c, h, !0);
    }
    function Ie(i, c, h) {
      return se(i, c, h, !1);
    }
    var Ue = Ie, ke = Se;
    Fr.Fragment = w, Fr.jsx = Ue, Fr.jsxs = ke;
  }()), Fr;
}
(function(u) {
  Nr.env.NODE_ENV === "production" ? u.exports = Je() : u.exports = Ge();
})(qe);
const He = Rr.Fragment, z = Rr.jsx, Tr = Rr.jsxs;
var te = {}, Xe = {
  get exports() {
    return te;
  },
  set exports(u) {
    te = u;
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
    function p() {
      for (var w = [], x = 0; x < arguments.length; x++) {
        var v = arguments[x];
        if (v) {
          var d = typeof v;
          if (d === "string" || d === "number")
            w.push(v);
          else if (Array.isArray(v)) {
            if (v.length) {
              var o = p.apply(null, v);
              o && w.push(o);
            }
          } else if (d === "object") {
            if (v.toString !== Object.prototype.toString && !v.toString.toString().includes("[native code]")) {
              w.push(v.toString());
              continue;
            }
            for (var y in v)
              l.call(v, y) && v[y] && w.push(y);
          }
        }
      }
      return w.join(" ");
    }
    u.exports ? (p.default = p, u.exports = p) : window.classNames = p;
  })();
})(Xe);
const Zr = te, Ke = "_popupButton__container_13nzo_5", Qe = "_popupButton_13nzo_5", Ze = "_icon_13nzo_19", rt = "_inactiveIcon_13nzo_27", et = "_activeIcon_13nzo_31", tt = "_notif_13nzo_35", nt = "_pinging_13nzo_39", it = "_ping_13nzo_39", J = {
  popupButton__container: Ke,
  popupButton: Qe,
  icon: Ze,
  inactiveIcon: rt,
  activeIcon: et,
  notif: tt,
  pinging: nt,
  ping: it
};
function at({
  notiVal: u,
  showNoti: l,
  isOpen: p,
  clickHandler: w
}) {
  return /* @__PURE__ */ Tr("div", { className: J.popupButton__container, children: [
    /* @__PURE__ */ Tr(
      "button",
      {
        className: J.popupButton,
        type: "button",
        onClick: w,
        children: [
          /* @__PURE__ */ z(
            "div",
            {
              className: Zr(J.icon, {
                [J.activeIcon]: !p,
                [J.inactiveIcon]: p
              }),
              children: /* @__PURE__ */ z(
                "img",
                {
                  alt: "WalletChat",
                  src: "https://uploads-ssl.webflow.com/62d761bae8bf2da003f57b06/62d761bae8bf2dea68f57b52_walletchat%20logo.png",
                  style: { height: "90%" }
                }
              )
            }
          ),
          /* @__PURE__ */ z(
            "div",
            {
              className: Zr(J.icon, {
                [J.activeIcon]: p,
                [J.inactiveIcon]: !p
              }),
              children: /* @__PURE__ */ z(
                "svg",
                {
                  focusable: "false",
                  viewBox: "0 0 16 14",
                  width: "28",
                  height: "25",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ z(
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
    l && /* @__PURE__ */ Tr(He, { children: [
      /* @__PURE__ */ z("span", { className: Zr(J.notif, J.pinging) }),
      /* @__PURE__ */ z("span", { className: J.notif, children: u })
    ] })
  ] });
}
const ie = V.createContext(null);
function ct({
  children: u
}) {
  const [l, p] = V.useState(), w = V.useCallback(
    (v, d) => p((o) => ({ ...o, [v]: d })),
    []
  ), x = V.useMemo(
    () => ({
      widgetState: l || null,
      setWidgetState: w
    }),
    [l, w]
  );
  return /* @__PURE__ */ z(ie.Provider, { value: x, children: u });
}
const de = {
  "wallet-chat-widget": "_wallet-chat-widget_9zdz0_5",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_9zdz0_1"
}, ot = "https://staging.walletchat.fun";
function st() {
  const u = V.useContext(ie), l = u == null ? void 0 : u.widgetState;
  l == null || l.ownerAddress;
  const [p, w] = V.useState(!1), [x, v] = V.useState(0), d = (o) => w((y) => !y);
  return V.useEffect(() => {
    const o = (y) => {
      const { data: k } = y;
      k.target === "unread_cnt" && v(k.data);
    };
    return window.addEventListener("message", o), () => window.removeEventListener("message", o);
  }, []), u ? /* @__PURE__ */ Tr("div", { className: de["wallet-chat-widget"], children: [
    /* @__PURE__ */ z(
      "iframe",
      {
        title: "WalletChat",
        name: "WalletChat",
        id: de["wallet-chat-widget__container"],
        style: {
          height: p ? "50vh" : "0px",
          width: p ? "15vw" : "0px",
          minHeight: p ? "440px" : "0px",
          minWidth: p ? "500px" : "0px"
        },
        src: ot
      }
    ),
    /* @__PURE__ */ z(
      at,
      {
        notiVal: x,
        showNoti: x > 0,
        isOpen: p,
        clickHandler: d
      }
    )
  ] }) : (console.error(
    "WalletChat: ChatWithOwner component must be rendered within a WalletChatProvider"
  ), null);
}
const ut = ({
  onClick: u,
  children: l
}) => /* @__PURE__ */ z("button", { type: "button", onClick: u, children: l }), lt = ({
  owner: u,
  render: l
}) => {
  const p = V.useContext(ie), w = p == null ? void 0 : p.setWidgetState, x = l ? ({ onClick: v, children: d }) => V.cloneElement(l, { onClick: v }, d) : ut;
  return p ? /* @__PURE__ */ Tr(x, { onClick: () => w("ownerAddr", u), children: [
    /* @__PURE__ */ z(
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
  lt as ChatWithOwner,
  ct as WalletChatProvider,
  st as WalletChatWidget
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode("._popupButton__container_13nzo_5{position:relative;margin-top:.75rem;height:4rem}._popupButton_13nzo_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / .07)) drop-shadow(0 2px 2px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._icon_13nzo_19{transition-property:transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_13nzo_19 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_13nzo_27{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_13nzo_31{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_13nzo_35{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(219 39 119 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}@keyframes _ping_13nzo_39{75%,to{transform:scale(2);opacity:0}}._pinging_13nzo_39{animation:_ping_13nzo_39 1s cubic-bezier(0,0,.2,1) infinite}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._wallet-chat-widget_9zdz0_5{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;-moz-user-select:none;user-select:none}#_wallet-chat-widget__container_9zdz0_1{transition-property:width,min-width,height,min-height;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / .07)) drop-shadow(0 2px 2px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
