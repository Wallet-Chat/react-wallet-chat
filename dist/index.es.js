import L from "react";
var Pe = {}, $r = {};
$r.byteLength = Me;
$r.toByteArray = Ye;
$r.fromByteArray = qe;
var Z = [], z = [], Le = typeof Uint8Array < "u" ? Uint8Array : Array, re = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var dr = 0, We = re.length; dr < We; ++dr)
  Z[dr] = re[dr], z[re.charCodeAt(dr)] = dr;
z["-".charCodeAt(0)] = 62;
z["_".charCodeAt(0)] = 63;
function ve(u) {
  var f = u.length;
  if (f % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var h = u.indexOf("=");
  h === -1 && (h = f);
  var v = h === f ? 0 : 4 - h % 4;
  return [h, v];
}
function Me(u) {
  var f = ve(u), h = f[0], v = f[1];
  return (h + v) * 3 / 4 - v;
}
function je(u, f, h) {
  return (f + h) * 3 / 4 - h;
}
function Ye(u) {
  var f, h = ve(u), v = h[0], y = h[1], w = new Le(je(u, v, y)), p = 0, a = y > 0 ? v - 4 : v, m;
  for (m = 0; m < a; m += 4)
    f = z[u.charCodeAt(m)] << 18 | z[u.charCodeAt(m + 1)] << 12 | z[u.charCodeAt(m + 2)] << 6 | z[u.charCodeAt(m + 3)], w[p++] = f >> 16 & 255, w[p++] = f >> 8 & 255, w[p++] = f & 255;
  return y === 2 && (f = z[u.charCodeAt(m)] << 2 | z[u.charCodeAt(m + 1)] >> 4, w[p++] = f & 255), y === 1 && (f = z[u.charCodeAt(m)] << 10 | z[u.charCodeAt(m + 1)] << 4 | z[u.charCodeAt(m + 2)] >> 2, w[p++] = f >> 8 & 255, w[p++] = f & 255), w;
}
function $e(u) {
  return Z[u >> 18 & 63] + Z[u >> 12 & 63] + Z[u >> 6 & 63] + Z[u & 63];
}
function Ve(u, f, h) {
  for (var v, y = [], w = f; w < h; w += 3)
    v = (u[w] << 16 & 16711680) + (u[w + 1] << 8 & 65280) + (u[w + 2] & 255), y.push($e(v));
  return y.join("");
}
function qe(u) {
  for (var f, h = u.length, v = h % 3, y = [], w = 16383, p = 0, a = h - v; p < a; p += w)
    y.push(Ve(u, p, p + w > a ? a : p + w));
  return v === 1 ? (f = u[h - 1], y.push(
    Z[f >> 2] + Z[f << 4 & 63] + "=="
  )) : v === 2 && (f = (u[h - 2] << 8) + u[h - 1], y.push(
    Z[f >> 10] + Z[f >> 4 & 63] + Z[f << 2 & 63] + "="
  )), y.join("");
}
var oe = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
oe.read = function(u, f, h, v, y) {
  var w, p, a = y * 8 - v - 1, m = (1 << a) - 1, U = m >> 1, _ = -7, x = h ? y - 1 : 0, T = h ? -1 : 1, B = u[f + x];
  for (x += T, w = B & (1 << -_) - 1, B >>= -_, _ += a; _ > 0; w = w * 256 + u[f + x], x += T, _ -= 8)
    ;
  for (p = w & (1 << -_) - 1, w >>= -_, _ += v; _ > 0; p = p * 256 + u[f + x], x += T, _ -= 8)
    ;
  if (w === 0)
    w = 1 - U;
  else {
    if (w === m)
      return p ? NaN : (B ? -1 : 1) * (1 / 0);
    p = p + Math.pow(2, v), w = w - U;
  }
  return (B ? -1 : 1) * p * Math.pow(2, w - v);
};
oe.write = function(u, f, h, v, y, w) {
  var p, a, m, U = w * 8 - y - 1, _ = (1 << U) - 1, x = _ >> 1, T = y === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, B = v ? 0 : w - 1, Y = v ? 1 : -1, ar = f < 0 || f === 0 && 1 / f < 0 ? 1 : 0;
  for (f = Math.abs(f), isNaN(f) || f === 1 / 0 ? (a = isNaN(f) ? 1 : 0, p = _) : (p = Math.floor(Math.log(f) / Math.LN2), f * (m = Math.pow(2, -p)) < 1 && (p--, m *= 2), p + x >= 1 ? f += T / m : f += T * Math.pow(2, 1 - x), f * m >= 2 && (p++, m /= 2), p + x >= _ ? (a = 0, p = _) : p + x >= 1 ? (a = (f * m - 1) * Math.pow(2, y), p = p + x) : (a = f * Math.pow(2, x - 1) * Math.pow(2, y), p = 0)); y >= 8; u[h + B] = a & 255, B += Y, a /= 256, y -= 8)
    ;
  for (p = p << y | a, U += y; U > 0; u[h + B] = p & 255, B += Y, p /= 256, U -= 8)
    ;
  u[h + B - Y] |= ar * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  var f = $r, h = oe, v = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
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
  function p(t) {
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
      return x(t);
    }
    return m(t, r, e);
  }
  a.poolSize = 8192;
  function m(t, r, e) {
    if (typeof t == "string")
      return T(t, r);
    if (ArrayBuffer.isView(t))
      return Y(t);
    if (t == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
      );
    if (V(t, ArrayBuffer) || t && V(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (V(t, SharedArrayBuffer) || t && V(t.buffer, SharedArrayBuffer)))
      return ar(t, r, e);
    if (typeof t == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var n = t.valueOf && t.valueOf();
    if (n != null && n !== t)
      return a.from(n, r, e);
    var o = qr(t);
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
  function U(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function _(t, r, e) {
    return U(t), t <= 0 ? p(t) : r !== void 0 ? typeof e == "string" ? p(t).fill(r, e) : p(t).fill(r) : p(t);
  }
  a.alloc = function(t, r, e) {
    return _(t, r, e);
  };
  function x(t) {
    return U(t), p(t < 0 ? 0 : H(t) | 0);
  }
  a.allocUnsafe = function(t) {
    return x(t);
  }, a.allocUnsafeSlow = function(t) {
    return x(t);
  };
  function T(t, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !a.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var e = Cr(t, r) | 0, n = p(e), o = n.write(t, r);
    return o !== e && (n = n.slice(0, o)), n;
  }
  function B(t) {
    for (var r = t.length < 0 ? 0 : H(t.length) | 0, e = p(r), n = 0; n < r; n += 1)
      e[n] = t[n] & 255;
    return e;
  }
  function Y(t) {
    if (V(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return ar(r.buffer, r.byteOffset, r.byteLength);
    }
    return B(t);
  }
  function ar(t, r, e) {
    if (r < 0 || t.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < r + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var n;
    return r === void 0 && e === void 0 ? n = new Uint8Array(t) : e === void 0 ? n = new Uint8Array(t, r) : n = new Uint8Array(t, r, e), Object.setPrototypeOf(n, a.prototype), n;
  }
  function qr(t) {
    if (a.isBuffer(t)) {
      var r = H(t.length) | 0, e = p(r);
      return e.length === 0 || t.copy(e, 0, 0, r), e;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || xr(t.length) ? p(0) : B(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return B(t.data);
  }
  function H(t) {
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
    if (V(r, Uint8Array) && (r = a.from(r, r.offset, r.byteLength)), V(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)), !a.isBuffer(r) || !a.isBuffer(e))
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
      if (V(l, Uint8Array))
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
    if (ArrayBuffer.isView(t) || V(t, ArrayBuffer))
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
  a.byteLength = Cr;
  function Jr(t, r, e) {
    var n = !1;
    if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, r >>>= 0, e <= r))
      return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return Dr(this, r, e);
        case "utf8":
        case "utf-8":
          return X(this, r, e);
        case "ascii":
          return Or(this, r, e);
        case "latin1":
        case "binary":
          return Nr(this, r, e);
        case "base64":
          return G(this, r, e);
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
  function rr(t, r, e) {
    var n = t[r];
    t[r] = t[e], t[e] = n;
  }
  a.prototype.swap16 = function() {
    var r = this.length;
    if (r % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var e = 0; e < r; e += 2)
      rr(this, e, e + 1);
    return this;
  }, a.prototype.swap32 = function() {
    var r = this.length;
    if (r % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var e = 0; e < r; e += 4)
      rr(this, e, e + 3), rr(this, e + 1, e + 2);
    return this;
  }, a.prototype.swap64 = function() {
    var r = this.length;
    if (r % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var e = 0; e < r; e += 8)
      rr(this, e, e + 7), rr(this, e + 1, e + 6), rr(this, e + 2, e + 5), rr(this, e + 3, e + 4);
    return this;
  }, a.prototype.toString = function() {
    var r = this.length;
    return r === 0 ? "" : arguments.length === 0 ? X(this, 0, r) : Jr.apply(this, arguments);
  }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(r) {
    if (!a.isBuffer(r))
      throw new TypeError("Argument must be a Buffer");
    return this === r ? !0 : a.compare(this, r) === 0;
  }, a.prototype.inspect = function() {
    var r = "", e = u.INSPECT_MAX_BYTES;
    return r = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (r += " ... "), "<Buffer " + r + ">";
  }, v && (a.prototype[v] = a.prototype.inspect), a.prototype.compare = function(r, e, n, o, c) {
    if (V(r, Uint8Array) && (r = a.from(r, r.offset, r.byteLength)), !a.isBuffer(r))
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
    for (var l = c - o, b = n - e, A = Math.min(l, b), I = this.slice(o, c), P = r.slice(e, n), C = 0; C < A; ++C)
      if (I[C] !== P[C]) {
        l = I[C], b = P[C];
        break;
      }
    return l < b ? -1 : b < l ? 1 : 0;
  };
  function Ir(t, r, e, n, o) {
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
      return r.length === 0 ? -1 : Sr(t, r, e, n, o);
    if (typeof r == "number")
      return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? o ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : Sr(t, [r], e, n, o);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Sr(t, r, e, n, o) {
    var c = 1, l = t.length, b = r.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || r.length < 2)
        return -1;
      c = 2, l /= 2, b /= 2, e /= 2;
    }
    function A(Er, _r) {
      return c === 1 ? Er[_r] : Er.readUInt16BE(_r * c);
    }
    var I;
    if (o) {
      var P = -1;
      for (I = e; I < l; I++)
        if (A(t, I) === A(r, P === -1 ? 0 : I - P)) {
          if (P === -1 && (P = I), I - P + 1 === b)
            return P * c;
        } else
          P !== -1 && (I -= I - P), P = -1;
    } else
      for (e + b > l && (e = l - b), I = e; I >= 0; I--) {
        for (var C = !0, lr = 0; lr < b; lr++)
          if (A(t, I + lr) !== A(r, lr)) {
            C = !1;
            break;
          }
        if (C)
          return I;
      }
    return -1;
  }
  a.prototype.includes = function(r, e, n) {
    return this.indexOf(r, e, n) !== -1;
  }, a.prototype.indexOf = function(r, e, n) {
    return Ir(this, r, e, n, !0);
  }, a.prototype.lastIndexOf = function(r, e, n) {
    return Ir(this, r, e, n, !1);
  };
  function zr(t, r, e, n) {
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
  function Br(t, r, e, n) {
    return ur(or(r, t.length - e), t, e, n);
  }
  function Gr(t, r, e, n) {
    return ur(gr(r), t, e, n);
  }
  function Hr(t, r, e, n) {
    return ur(Mr(r), t, e, n);
  }
  function Ur(t, r, e, n) {
    return ur(sr(r, t.length - e), t, e, n);
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
          return zr(this, r, e, n);
        case "utf8":
        case "utf-8":
          return Br(this, r, e, n);
        case "ascii":
        case "latin1":
        case "binary":
          return Gr(this, r, e, n);
        case "base64":
          return Hr(this, r, e, n);
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
  function G(t, r, e) {
    return r === 0 && e === t.length ? f.fromByteArray(t) : f.fromByteArray(t.slice(r, e));
  }
  function X(t, r, e) {
    e = Math.min(t.length, e);
    for (var n = [], o = r; o < e; ) {
      var c = t[o], l = null, b = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
      if (o + b <= e) {
        var A, I, P, C;
        switch (b) {
          case 1:
            c < 128 && (l = c);
            break;
          case 2:
            A = t[o + 1], (A & 192) === 128 && (C = (c & 31) << 6 | A & 63, C > 127 && (l = C));
            break;
          case 3:
            A = t[o + 1], I = t[o + 2], (A & 192) === 128 && (I & 192) === 128 && (C = (c & 15) << 12 | (A & 63) << 6 | I & 63, C > 2047 && (C < 55296 || C > 57343) && (l = C));
            break;
          case 4:
            A = t[o + 1], I = t[o + 2], P = t[o + 3], (A & 192) === 128 && (I & 192) === 128 && (P & 192) === 128 && (C = (c & 15) << 18 | (A & 63) << 12 | (I & 63) << 6 | P & 63, C > 65535 && C < 1114112 && (l = C));
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
  function Nr(t, r, e) {
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
      o += fr[t[c]];
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
  function k(t, r, e) {
    if (t % 1 !== 0 || t < 0)
      throw new RangeError("offset is not uint");
    if (t + r > e)
      throw new RangeError("Trying to access beyond buffer length");
  }
  a.prototype.readUintLE = a.prototype.readUIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || k(r, e, this.length);
    for (var o = this[r], c = 1, l = 0; ++l < e && (c *= 256); )
      o += this[r + l] * c;
    return o;
  }, a.prototype.readUintBE = a.prototype.readUIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || k(r, e, this.length);
    for (var o = this[r + --e], c = 1; e > 0 && (c *= 256); )
      o += this[r + --e] * c;
    return o;
  }, a.prototype.readUint8 = a.prototype.readUInt8 = function(r, e) {
    return r = r >>> 0, e || k(r, 1, this.length), this[r];
  }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(r, e) {
    return r = r >>> 0, e || k(r, 2, this.length), this[r] | this[r + 1] << 8;
  }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(r, e) {
    return r = r >>> 0, e || k(r, 2, this.length), this[r] << 8 | this[r + 1];
  }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(r, e) {
    return r = r >>> 0, e || k(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
  }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(r, e) {
    return r = r >>> 0, e || k(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
  }, a.prototype.readIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || k(r, e, this.length);
    for (var o = this[r], c = 1, l = 0; ++l < e && (c *= 256); )
      o += this[r + l] * c;
    return c *= 128, o >= c && (o -= Math.pow(2, 8 * e)), o;
  }, a.prototype.readIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || k(r, e, this.length);
    for (var o = e, c = 1, l = this[r + --o]; o > 0 && (c *= 256); )
      l += this[r + --o] * c;
    return c *= 128, l >= c && (l -= Math.pow(2, 8 * e)), l;
  }, a.prototype.readInt8 = function(r, e) {
    return r = r >>> 0, e || k(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
  }, a.prototype.readInt16LE = function(r, e) {
    r = r >>> 0, e || k(r, 2, this.length);
    var n = this[r] | this[r + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, a.prototype.readInt16BE = function(r, e) {
    r = r >>> 0, e || k(r, 2, this.length);
    var n = this[r + 1] | this[r] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, a.prototype.readInt32LE = function(r, e) {
    return r = r >>> 0, e || k(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
  }, a.prototype.readInt32BE = function(r, e) {
    return r = r >>> 0, e || k(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
  }, a.prototype.readFloatLE = function(r, e) {
    return r = r >>> 0, e || k(r, 4, this.length), h.read(this, r, !0, 23, 4);
  }, a.prototype.readFloatBE = function(r, e) {
    return r = r >>> 0, e || k(r, 4, this.length), h.read(this, r, !1, 23, 4);
  }, a.prototype.readDoubleLE = function(r, e) {
    return r = r >>> 0, e || k(r, 8, this.length), h.read(this, r, !0, 52, 8);
  }, a.prototype.readDoubleBE = function(r, e) {
    return r = r >>> 0, e || k(r, 8, this.length), h.read(this, r, !1, 52, 8);
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
    var l = 0, b = 1, A = 0;
    for (this[e] = r & 255; ++l < n && (b *= 256); )
      r < 0 && A === 0 && this[e + l - 1] !== 0 && (A = 1), this[e + l] = (r / b >> 0) - A & 255;
    return e + n;
  }, a.prototype.writeIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var c = Math.pow(2, 8 * n - 1);
      M(this, r, e, n, c - 1, -c);
    }
    var l = n - 1, b = 1, A = 0;
    for (this[e + l] = r & 255; --l >= 0 && (b *= 256); )
      r < 0 && A === 0 && this[e + l + 1] !== 0 && (A = 1), this[e + l] = (r / b >> 0) - A & 255;
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
    var l;
    if (typeof r == "number")
      for (l = e; l < n; ++l)
        this[l] = r;
    else {
      var b = a.isBuffer(r) ? r : a.from(r, o), A = b.length;
      if (A === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (l = 0; l < n - e; ++l)
        this[l + e] = b[l % A];
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
  function sr(t, r) {
    for (var e, n, o, c = [], l = 0; l < t.length && !((r -= 2) < 0); ++l)
      e = t.charCodeAt(l), n = e >> 8, o = e % 256, c.push(o), c.push(n);
    return c;
  }
  function Mr(t) {
    return f.toByteArray(mr(t));
  }
  function ur(t, r, e, n) {
    for (var o = 0; o < n && !(o + e >= r.length || o >= t.length); ++o)
      r[o + e] = t[o];
    return o;
  }
  function V(t, r) {
    return t instanceof r || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === r.name;
  }
  function xr(t) {
    return t !== t;
  }
  var fr = function() {
    for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
      for (var n = e * 16, o = 0; o < 16; ++o)
        r[n + o] = t[e] + t[o];
    return r;
  }();
})(Pe);
var Yr = {}, Je = {
  get exports() {
    return Yr;
  },
  set exports(u) {
    Yr = u;
  }
}, N = Je.exports = {}, K, Q;
function te() {
  throw new Error("setTimeout has not been defined");
}
function ne() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? K = setTimeout : K = te;
  } catch {
    K = te;
  }
  try {
    typeof clearTimeout == "function" ? Q = clearTimeout : Q = ne;
  } catch {
    Q = ne;
  }
})();
function ye(u) {
  if (K === setTimeout)
    return setTimeout(u, 0);
  if ((K === te || !K) && setTimeout)
    return K = setTimeout, setTimeout(u, 0);
  try {
    return K(u, 0);
  } catch {
    try {
      return K.call(null, u, 0);
    } catch {
      return K.call(this, u, 0);
    }
  }
}
function ze(u) {
  if (Q === clearTimeout)
    return clearTimeout(u);
  if ((Q === ne || !Q) && clearTimeout)
    return Q = clearTimeout, clearTimeout(u);
  try {
    return Q(u);
  } catch {
    try {
      return Q.call(null, u);
    } catch {
      return Q.call(this, u);
    }
  }
}
var tr = [], wr = !1, cr, jr = -1;
function Ge() {
  !wr || !cr || (wr = !1, cr.length ? tr = cr.concat(tr) : jr = -1, tr.length && me());
}
function me() {
  if (!wr) {
    var u = ye(Ge);
    wr = !0;
    for (var f = tr.length; f; ) {
      for (cr = tr, tr = []; ++jr < f; )
        cr && cr[jr].run();
      jr = -1, f = tr.length;
    }
    cr = null, wr = !1, ze(u);
  }
}
N.nextTick = function(u) {
  var f = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var h = 1; h < arguments.length; h++)
      f[h - 1] = arguments[h];
  tr.push(new ge(u, f)), tr.length === 1 && !wr && ye(me);
};
function ge(u, f) {
  this.fun = u, this.array = f;
}
ge.prototype.run = function() {
  this.fun.apply(null, this.array);
};
N.title = "browser";
N.browser = !0;
N.env = {};
N.argv = [];
N.version = "";
N.versions = {};
function nr() {
}
N.on = nr;
N.addListener = nr;
N.once = nr;
N.off = nr;
N.removeListener = nr;
N.removeAllListeners = nr;
N.emit = nr;
N.prependListener = nr;
N.prependOnceListener = nr;
N.listeners = function(u) {
  return [];
};
N.binding = function(u) {
  throw new Error("process.binding is not supported");
};
N.cwd = function() {
  return "/";
};
N.chdir = function(u) {
  throw new Error("process.chdir is not supported");
};
N.umask = function() {
  return 0;
};
(function(u) {
  function f() {
    var v = this || self;
    return delete u.prototype.__magic__, v;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return f();
  u.defineProperty(u.prototype, "__magic__", {
    configurable: !0,
    get: f
  });
  var h = __magic__;
  return h;
})(Object);
var Ar = {}, He = {
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
function Xe() {
  if (pe)
    return br;
  pe = 1;
  var u = L, f = Symbol.for("react.element"), h = Symbol.for("react.fragment"), v = Object.prototype.hasOwnProperty, y = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(a, m, U) {
    var _, x = {}, T = null, B = null;
    U !== void 0 && (T = "" + U), m.key !== void 0 && (T = "" + m.key), m.ref !== void 0 && (B = m.ref);
    for (_ in m)
      v.call(m, _) && !w.hasOwnProperty(_) && (x[_] = m[_]);
    if (a && a.defaultProps)
      for (_ in m = a.defaultProps, m)
        x[_] === void 0 && (x[_] = m[_]);
    return { $$typeof: f, type: a, key: T, ref: B, props: x, _owner: y.current };
  }
  return br.Fragment = h, br.jsx = p, br.jsxs = p, br;
}
var Fr = {}, de;
function Ke() {
  return de || (de = 1, Yr.env.NODE_ENV !== "production" && function() {
    var u = L, f = Symbol.for("react.element"), h = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), a = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), U = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), B = Symbol.for("react.offscreen"), Y = Symbol.iterator, ar = "@@iterator";
    function qr(i) {
      if (i === null || typeof i != "object")
        return null;
      var s = Y && i[Y] || i[ar];
      return typeof s == "function" ? s : null;
    }
    var H = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function W(i) {
      {
        for (var s = arguments.length, d = new Array(s > 1 ? s - 1 : 0), g = 1; g < s; g++)
          d[g - 1] = arguments[g];
        Cr("error", i, d);
      }
    }
    function Cr(i, s, d) {
      {
        var g = H.ReactDebugCurrentFrame, R = g.getStackAddendum();
        R !== "" && (s += "%s", d = d.concat([R]));
        var S = d.map(function(F) {
          return String(F);
        });
        S.unshift("Warning: " + s), Function.prototype.apply.call(console[i], console, S);
      }
    }
    var Jr = !1, rr = !1, Ir = !1, Sr = !1, zr = !1, Br;
    Br = Symbol.for("react.module.reference");
    function Gr(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === v || i === w || zr || i === y || i === U || i === _ || Sr || i === B || Jr || rr || Ir || typeof i == "object" && i !== null && (i.$$typeof === T || i.$$typeof === x || i.$$typeof === p || i.$$typeof === a || i.$$typeof === m || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === Br || i.getModuleId !== void 0));
    }
    function Hr(i, s, d) {
      var g = i.displayName;
      if (g)
        return g;
      var R = s.displayName || s.name || "";
      return R !== "" ? d + "(" + R + ")" : d;
    }
    function Ur(i) {
      return i.displayName || "Context";
    }
    function G(i) {
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
        case U:
          return "Suspense";
        case _:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case a:
            var s = i;
            return Ur(s) + ".Consumer";
          case p:
            var d = i;
            return Ur(d._context) + ".Provider";
          case m:
            return Hr(i, i.render, "ForwardRef");
          case x:
            var g = i.displayName || null;
            return g !== null ? g : G(i.type) || "Memo";
          case T: {
            var R = i, S = R._payload, F = R._init;
            try {
              return G(F(S));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var X = Object.assign, ir = 0, kr, Or, Nr, Dr, Pr, k, M;
    function vr() {
    }
    vr.__reactDisabledLog = !0;
    function Lr() {
      {
        if (ir === 0) {
          kr = console.log, Or = console.info, Nr = console.warn, Dr = console.error, Pr = console.group, k = console.groupCollapsed, M = console.groupEnd;
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
            log: X({}, i, {
              value: kr
            }),
            info: X({}, i, {
              value: Or
            }),
            warn: X({}, i, {
              value: Nr
            }),
            error: X({}, i, {
              value: Dr
            }),
            group: X({}, i, {
              value: Pr
            }),
            groupCollapsed: X({}, i, {
              value: k
            }),
            groupEnd: X({}, i, {
              value: M
            })
          });
        }
        ir < 0 && W("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var yr = H.ReactCurrentDispatcher, mr;
    function or(i, s, d) {
      {
        if (mr === void 0)
          try {
            throw Error();
          } catch (R) {
            var g = R.stack.trim().match(/\n( *(at )?)/);
            mr = g && g[1] || "";
          }
        return `
` + mr + i;
      }
    }
    var gr = !1, sr;
    {
      var Mr = typeof WeakMap == "function" ? WeakMap : Map;
      sr = new Mr();
    }
    function ur(i, s) {
      if (!i || gr)
        return "";
      {
        var d = sr.get(i);
        if (d !== void 0)
          return d;
      }
      var g;
      gr = !0;
      var R = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var S;
      S = yr.current, yr.current = null, Lr();
      try {
        if (s) {
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
            } catch (er) {
              g = er;
            }
            Reflect.construct(i, [], F);
          } else {
            try {
              F.call();
            } catch (er) {
              g = er;
            }
            i.call(F.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (er) {
            g = er;
          }
          i();
        }
      } catch (er) {
        if (er && g && typeof er.stack == "string") {
          for (var E = er.stack.split(`
`), j = g.stack.split(`
`), O = E.length - 1, D = j.length - 1; O >= 1 && D >= 0 && E[O] !== j[D]; )
            D--;
          for (; O >= 1 && D >= 0; O--, D--)
            if (E[O] !== j[D]) {
              if (O !== 1 || D !== 1)
                do
                  if (O--, D--, D < 0 || E[O] !== j[D]) {
                    var q = `
` + E[O].replace(" at new ", " at ");
                    return i.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", i.displayName)), typeof i == "function" && sr.set(i, q), q;
                  }
                while (O >= 1 && D >= 0);
              break;
            }
        }
      } finally {
        gr = !1, yr.current = S, Wr(), Error.prepareStackTrace = R;
      }
      var pr = i ? i.displayName || i.name : "", he = pr ? or(pr) : "";
      return typeof i == "function" && sr.set(i, he), he;
    }
    function V(i, s, d) {
      return ur(i, !1);
    }
    function xr(i) {
      var s = i.prototype;
      return !!(s && s.isReactComponent);
    }
    function fr(i, s, d) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return ur(i, xr(i));
      if (typeof i == "string")
        return or(i);
      switch (i) {
        case U:
          return or("Suspense");
        case _:
          return or("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case m:
            return V(i.render);
          case x:
            return fr(i.type, s, d);
          case T: {
            var g = i, R = g._payload, S = g._init;
            try {
              return fr(S(R), s, d);
            } catch {
            }
          }
        }
      return "";
    }
    var t = Object.prototype.hasOwnProperty, r = {}, e = H.ReactDebugCurrentFrame;
    function n(i) {
      if (i) {
        var s = i._owner, d = fr(i.type, i._source, s ? s.type : null);
        e.setExtraStackFrame(d);
      } else
        e.setExtraStackFrame(null);
    }
    function o(i, s, d, g, R) {
      {
        var S = Function.call.bind(t);
        for (var F in i)
          if (S(i, F)) {
            var E = void 0;
            try {
              if (typeof i[F] != "function") {
                var j = Error((g || "React class") + ": " + d + " type `" + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[F] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw j.name = "Invariant Violation", j;
              }
              E = i[F](s, F, g, d, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (O) {
              E = O;
            }
            E && !(E instanceof Error) && (n(R), W("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", g || "React class", d, F, typeof E), n(null)), E instanceof Error && !(E.message in r) && (r[E.message] = !0, n(R), W("Failed %s type: %s", d, E.message), n(null));
          }
      }
    }
    var c = Array.isArray;
    function l(i) {
      return c(i);
    }
    function b(i) {
      {
        var s = typeof Symbol == "function" && Symbol.toStringTag, d = s && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return d;
      }
    }
    function A(i) {
      try {
        return I(i), !1;
      } catch {
        return !0;
      }
    }
    function I(i) {
      return "" + i;
    }
    function P(i) {
      if (A(i))
        return W("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", b(i)), I(i);
    }
    var C = H.ReactCurrentOwner, lr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Er, _r, Xr;
    Xr = {};
    function _e(i) {
      if (t.call(i, "ref")) {
        var s = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (s && s.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function be(i) {
      if (t.call(i, "key")) {
        var s = Object.getOwnPropertyDescriptor(i, "key").get;
        if (s && s.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function Fe(i, s) {
      if (typeof i.ref == "string" && C.current && s && C.current.stateNode !== s) {
        var d = G(C.current.type);
        Xr[d] || (W('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', G(C.current.type), i.ref), Xr[d] = !0);
      }
    }
    function Re(i, s) {
      {
        var d = function() {
          Er || (Er = !0, W("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        d.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: d,
          configurable: !0
        });
      }
    }
    function Te(i, s) {
      {
        var d = function() {
          _r || (_r = !0, W("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        d.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: d,
          configurable: !0
        });
      }
    }
    var Ae = function(i, s, d, g, R, S, F) {
      var E = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: f,
        // Built-in properties that belong on the element
        type: i,
        key: s,
        ref: d,
        props: F,
        // Record the component responsible for creating this element.
        _owner: S
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
        value: g
      }), Object.defineProperty(E, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: R
      }), Object.freeze && (Object.freeze(E.props), Object.freeze(E)), E;
    };
    function Ce(i, s, d, g, R) {
      {
        var S, F = {}, E = null, j = null;
        d !== void 0 && (P(d), E = "" + d), be(s) && (P(s.key), E = "" + s.key), _e(s) && (j = s.ref, Fe(s, R));
        for (S in s)
          t.call(s, S) && !lr.hasOwnProperty(S) && (F[S] = s[S]);
        if (i && i.defaultProps) {
          var O = i.defaultProps;
          for (S in O)
            F[S] === void 0 && (F[S] = O[S]);
        }
        if (E || j) {
          var D = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          E && Re(F, D), j && Te(F, D);
        }
        return Ae(i, E, j, R, g, C.current, F);
      }
    }
    var Kr = H.ReactCurrentOwner, ae = H.ReactDebugCurrentFrame;
    function hr(i) {
      if (i) {
        var s = i._owner, d = fr(i.type, i._source, s ? s.type : null);
        ae.setExtraStackFrame(d);
      } else
        ae.setExtraStackFrame(null);
    }
    var Qr;
    Qr = !1;
    function Zr(i) {
      return typeof i == "object" && i !== null && i.$$typeof === f;
    }
    function ue() {
      {
        if (Kr.current) {
          var i = G(Kr.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
    }
    function Ie(i) {
      {
        if (i !== void 0) {
          var s = i.fileName.replace(/^.*[\\\/]/, ""), d = i.lineNumber;
          return `

Check your code at ` + s + ":" + d + ".";
        }
        return "";
      }
    }
    var ce = {};
    function Se(i) {
      {
        var s = ue();
        if (!s) {
          var d = typeof i == "string" ? i : i.displayName || i.name;
          d && (s = `

Check the top-level render call using <` + d + ">.");
        }
        return s;
      }
    }
    function se(i, s) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var d = Se(s);
        if (ce[d])
          return;
        ce[d] = !0;
        var g = "";
        i && i._owner && i._owner !== Kr.current && (g = " It was passed a child from " + G(i._owner.type) + "."), hr(i), W('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', d, g), hr(null);
      }
    }
    function fe(i, s) {
      {
        if (typeof i != "object")
          return;
        if (l(i))
          for (var d = 0; d < i.length; d++) {
            var g = i[d];
            Zr(g) && se(g, s);
          }
        else if (Zr(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var R = qr(i);
          if (typeof R == "function" && R !== i.entries)
            for (var S = R.call(i), F; !(F = S.next()).done; )
              Zr(F.value) && se(F.value, s);
        }
      }
    }
    function Be(i) {
      {
        var s = i.type;
        if (s == null || typeof s == "string")
          return;
        var d;
        if (typeof s == "function")
          d = s.propTypes;
        else if (typeof s == "object" && (s.$$typeof === m || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        s.$$typeof === x))
          d = s.propTypes;
        else
          return;
        if (d) {
          var g = G(s);
          o(d, i.props, "prop", g, i);
        } else if (s.PropTypes !== void 0 && !Qr) {
          Qr = !0;
          var R = G(s);
          W("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", R || "Unknown");
        }
        typeof s.getDefaultProps == "function" && !s.getDefaultProps.isReactClassApproved && W("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ue(i) {
      {
        for (var s = Object.keys(i.props), d = 0; d < s.length; d++) {
          var g = s[d];
          if (g !== "children" && g !== "key") {
            hr(i), W("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", g), hr(null);
            break;
          }
        }
        i.ref !== null && (hr(i), W("Invalid attribute `ref` supplied to `React.Fragment`."), hr(null));
      }
    }
    function le(i, s, d, g, R, S) {
      {
        var F = Gr(i);
        if (!F) {
          var E = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var j = Ie(R);
          j ? E += j : E += ue();
          var O;
          i === null ? O = "null" : l(i) ? O = "array" : i !== void 0 && i.$$typeof === f ? (O = "<" + (G(i.type) || "Unknown") + " />", E = " Did you accidentally export a JSX literal instead of a component?") : O = typeof i, W("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", O, E);
        }
        var D = Ce(i, s, d, R, S);
        if (D == null)
          return D;
        if (F) {
          var q = s.children;
          if (q !== void 0)
            if (g)
              if (l(q)) {
                for (var pr = 0; pr < q.length; pr++)
                  fe(q[pr], i);
                Object.freeze && Object.freeze(q);
              } else
                W("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              fe(q, i);
        }
        return i === v ? Ue(D) : Be(D), D;
      }
    }
    function ke(i, s, d) {
      return le(i, s, d, !0);
    }
    function Oe(i, s, d) {
      return le(i, s, d, !1);
    }
    var Ne = Oe, De = ke;
    Fr.Fragment = v, Fr.jsx = Ne, Fr.jsxs = De;
  }()), Fr;
}
(function(u) {
  Yr.env.NODE_ENV === "production" ? u.exports = Xe() : u.exports = Ke();
})(He);
const Qe = Ar.Fragment, $ = Ar.jsx, Tr = Ar.jsxs;
var ie = {}, Ze = {
  get exports() {
    return ie;
  },
  set exports(u) {
    ie = u;
  }
};
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(u) {
  (function() {
    var f = {}.hasOwnProperty;
    function h() {
      for (var v = [], y = 0; y < arguments.length; y++) {
        var w = arguments[y];
        if (w) {
          var p = typeof w;
          if (p === "string" || p === "number")
            v.push(w);
          else if (Array.isArray(w)) {
            if (w.length) {
              var a = h.apply(null, w);
              a && v.push(a);
            }
          } else if (p === "object") {
            if (w.toString !== Object.prototype.toString && !w.toString.toString().includes("[native code]")) {
              v.push(w.toString());
              continue;
            }
            for (var m in w)
              f.call(w, m) && w[m] && v.push(m);
          }
        }
      }
      return v.join(" ");
    }
    u.exports ? (h.default = h, u.exports = h) : window.classNames = h;
  })();
})(Ze);
const ee = ie, Vr = L.createContext(null);
function wt({
  children: u
}) {
  const [f, h] = L.useState(), v = L.useCallback(
    (w, p) => h((a) => ({ ...a, [w]: p })),
    []
  ), y = L.useMemo(
    () => ({
      widgetState: f || null,
      setWidgetState: v
    }),
    [f, v]
  );
  return /* @__PURE__ */ $(Vr.Provider, { value: y, children: u });
}
const rt = "_ring_1u7ve_43", et = "_popupButton__container_1u7ve_5", tt = "_popupButton_1u7ve_5", nt = "_icon_1u7ve_19", it = "_inactiveIcon_1u7ve_27", ot = "_activeIcon_1u7ve_31", at = "_notif_1u7ve_35", ut = "_pinging_1u7ve_39", ct = "_ping_1u7ve_39", J = {
  ring: rt,
  popupButton__container: et,
  popupButton: tt,
  icon: nt,
  inactiveIcon: it,
  activeIcon: ot,
  notif: at,
  pinging: ut,
  ping: ct
};
function xe() {
  try {
    const u = typeof localStorage < "u" && localStorage.getItem("clickedNfts") || "";
    return u ? JSON.parse(u) : [];
  } catch {
    return [];
  }
}
function st(u) {
  try {
    const h = [...xe(), u];
    typeof localStorage < "u" && localStorage.setItem("clickedNfts", JSON.stringify(h));
  } catch {
    return null;
  }
}
function ft({
  notiVal: u,
  showNoti: f,
  isOpen: h,
  clickHandler: v
}) {
  const y = xe(), w = L.useContext(Vr), p = w == null ? void 0 : w.widgetState, a = p == null ? void 0 : p.foundNft, m = a && JSON.parse(a).itemId, U = !h && (a ? !y.includes(a) && Boolean(m) : !1), [_, x] = L.useState(U);
  return L.useEffect(() => {
    U && x(!0);
  }, [U]), /* @__PURE__ */ Tr("div", { className: J.popupButton__container, children: [
    /* @__PURE__ */ $(
      "span",
      {
        className: _ ? J.ring : void 0,
        style: { boxShadow: "none" }
      }
    ),
    /* @__PURE__ */ Tr(
      "button",
      {
        className: J.popupButton,
        type: "button",
        onClick: (T) => {
          x(!1), a && st(a), v(T);
        },
        children: [
          /* @__PURE__ */ $(
            "div",
            {
              className: ee(J.icon, {
                [J.activeIcon]: !h,
                [J.inactiveIcon]: h
              }),
              children: /* @__PURE__ */ $(
                "img",
                {
                  alt: "WalletChat",
                  src: "https://uploads-ssl.webflow.com/62d761bae8bf2da003f57b06/62d761bae8bf2dea68f57b52_walletchat%20logo.png",
                  style: { height: "90%" }
                }
              )
            }
          ),
          /* @__PURE__ */ $(
            "div",
            {
              className: ee(J.icon, {
                [J.activeIcon]: h,
                [J.inactiveIcon]: !h
              }),
              children: /* @__PURE__ */ $(
                "svg",
                {
                  focusable: "false",
                  viewBox: "0 0 16 14",
                  width: "28",
                  height: "25",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ $(
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
    f && /* @__PURE__ */ Tr(Qe, { children: [
      /* @__PURE__ */ $("span", { className: ee(J.notif, J.pinging) }),
      /* @__PURE__ */ $("span", { className: J.notif, children: u })
    ] })
  ] });
}
function we(u) {
  const h = u.replace("https://", "").replace("http://", "").split("/"), v = h.length, y = h[v - 1], w = h[v - 2];
  if (u.startsWith("looksrare.org"))
    return { itemId: y, contractAddress: w, chain: "ethereum" };
  const p = h[v - 3];
  return v >= 5 ? { itemId: y, contractAddress: w, network: p } : u.startsWith("x2y2.io") && p === "eth" ? { itemId: y, contractAddress: w, network: "ethereum" } : { contractAddress: null, itemId: null, network: null };
}
const lt = "_ring_1jmwq_1", Ee = {
  ring: lt,
  "wallet-chat-widget": "_wallet-chat-widget_1jmwq_15",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_1jmwq_15"
}, ht = "https://staging.walletchat.fun", Rr = Ee["wallet-chat-widget"];
function vt() {
  const u = L.useRef(""), f = L.useRef(null), h = L.useContext(Vr), v = h == null ? void 0 : h.widgetState, y = h == null ? void 0 : h.setWidgetState, w = v == null ? void 0 : v.ownerAddress, [p, a] = L.useState(!1), [m, U] = L.useState(0), _ = (x) => {
    a((T) => {
      const B = Boolean(T);
      return f.current && !B && (document == null || document.getElementById(Rr).contentWindow.postMessage(
        { ...f.current, redirect: !0 },
        "*"
      )), f.current = null, !T;
    });
  };
  return L.useEffect(() => {
    if (!(w != null && w.address))
      return;
    const x = w.address, T = we(window.location.href);
    T.network && (f.current = {
      ...T,
      ownerAddress: x
    }), f.current ? document == null || document.getElementById(Rr).contentWindow.postMessage(
      { ...f.current, redirect: !0 },
      "*"
    ) : document == null || document.getElementById(Rr).contentWindow.postMessage({ ownerAddress: x }, "*"), a(!0);
  }, [w]), L.useEffect(() => {
    const x = () => {
      if (window.location.href === u.current)
        return;
      u.current = window.location.href;
      const Y = we(window.location.href);
      y && y("foundNft", JSON.stringify(Y)), Y.network && (f.current = Y), document == null || document.getElementById(Rr).contentWindow.postMessage(Y, "*");
    }, T = new MutationObserver(x), B = { subtree: !0, childList: !0 };
    return x(), T.observe(document, B), () => T.disconnect();
  }, []), L.useEffect(() => {
    const x = (T) => {
      const { data: B } = T;
      B.target === "unread_cnt" && U(B.data);
    };
    return window.addEventListener("message", x), () => window.removeEventListener("message", x);
  }, []), h ? /* @__PURE__ */ Tr("div", { className: Ee["wallet-chat-widget__container"], children: [
    /* @__PURE__ */ $(
      "iframe",
      {
        title: "WalletChat",
        name: "WalletChat",
        id: Rr,
        style: {
          height: p ? "60vh" : "0px",
          width: p ? "15vw" : "0px",
          minHeight: p ? "440px" : "0px",
          minWidth: p ? "440px" : "0px"
        },
        src: ht
      }
    ),
    /* @__PURE__ */ $(
      ft,
      {
        notiVal: m,
        showNoti: m > 0,
        isOpen: p,
        clickHandler: _
      }
    )
  ] }) : (console.error(
    "WalletChat: ChatWithOwner component must be rendered within a WalletChatProvider"
  ), null);
}
const pt = ({
  onClick: u,
  children: f
}) => /* @__PURE__ */ $("button", { type: "button", onClick: u, children: f }), yt = ({
  ownerAddress: u,
  render: f
}) => {
  const h = L.useContext(Vr), v = h == null ? void 0 : h.setWidgetState, y = f ? ({ onClick: w, children: p }) => L.cloneElement(f, { onClick: w }, p) : pt;
  return h ? /* @__PURE__ */ Tr(
    y,
    {
      onClick: () => v && v("ownerAddress", {
        address: u,
        lastRequest: Date.now().toString()
      }),
      children: [
        /* @__PURE__ */ $(
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
  yt as ChatWithOwner,
  wt as WalletChatProvider,
  vt as WalletChatWidget
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._ring_1u7ve_43{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._popupButton__container_1u7ve_5{position:relative;margin-top:.75rem;height:4rem;--tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / .15));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._popupButton_1u7ve_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}._icon_1u7ve_19{transition-property:transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_1u7ve_19 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_1u7ve_27{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_1u7ve_31{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_1u7ve_35{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(219 39 119 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}._pinging_1u7ve_39{animation:_ping_1u7ve_39 1s cubic-bezier(0,0,.2,1) infinite}._ring_1u7ve_43{position:fixed;right:0px;display:inline-flex;height:4rem;width:4rem}@keyframes _ping_1u7ve_39{75%,to{transform:scale(2);opacity:0}}._ring_1u7ve_43{animation:_ping_1u7ve_39 1s cubic-bezier(0,0,.2,1) infinite;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity));opacity:.75}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._ring_1jmwq_1{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}#_wallet-chat-widget_1jmwq_15{transition-property:width,min-width,height,min-height;transition-duration:.25s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(4px 4px 8px rgba(0,0,0,.5));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._wallet-chat-widget__container_1jmwq_15{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;-moz-user-select:none;user-select:none}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
