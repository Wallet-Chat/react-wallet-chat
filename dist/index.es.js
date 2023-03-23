import U from "react";
var Le = {}, Jr = {};
Jr.byteLength = We;
Jr.toByteArray = $e;
Jr.fromByteArray = Je;
var er = [], H = [], Pe = typeof Uint8Array < "u" ? Uint8Array : Array, te = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var yr = 0, Me = te.length; yr < Me; ++yr)
  er[yr] = te[yr], H[te.charCodeAt(yr)] = yr;
H["-".charCodeAt(0)] = 62;
H["_".charCodeAt(0)] = 63;
function ve(u) {
  var s = u.length;
  if (s % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var h = u.indexOf("=");
  h === -1 && (h = s);
  var y = h === s ? 0 : 4 - h % 4;
  return [h, y];
}
function We(u) {
  var s = ve(u), h = s[0], y = s[1];
  return (h + y) * 3 / 4 - y;
}
function Ye(u, s, h) {
  return (s + h) * 3 / 4 - h;
}
function $e(u) {
  var s, h = ve(u), y = h[0], g = h[1], w = new Pe(Ye(u, y, g)), d = 0, a = g > 0 ? y - 4 : y, v;
  for (v = 0; v < a; v += 4)
    s = H[u.charCodeAt(v)] << 18 | H[u.charCodeAt(v + 1)] << 12 | H[u.charCodeAt(v + 2)] << 6 | H[u.charCodeAt(v + 3)], w[d++] = s >> 16 & 255, w[d++] = s >> 8 & 255, w[d++] = s & 255;
  return g === 2 && (s = H[u.charCodeAt(v)] << 2 | H[u.charCodeAt(v + 1)] >> 4, w[d++] = s & 255), g === 1 && (s = H[u.charCodeAt(v)] << 10 | H[u.charCodeAt(v + 1)] << 4 | H[u.charCodeAt(v + 2)] >> 2, w[d++] = s >> 8 & 255, w[d++] = s & 255), w;
}
function Ve(u) {
  return er[u >> 18 & 63] + er[u >> 12 & 63] + er[u >> 6 & 63] + er[u & 63];
}
function qe(u, s, h) {
  for (var y, g = [], w = s; w < h; w += 3)
    y = (u[w] << 16 & 16711680) + (u[w + 1] << 8 & 65280) + (u[w + 2] & 255), g.push(Ve(y));
  return g.join("");
}
function Je(u) {
  for (var s, h = u.length, y = h % 3, g = [], w = 16383, d = 0, a = h - y; d < a; d += w)
    g.push(qe(u, d, d + w > a ? a : d + w));
  return y === 1 ? (s = u[h - 1], g.push(
    er[s >> 2] + er[s << 4 & 63] + "=="
  )) : y === 2 && (s = (u[h - 2] << 8) + u[h - 1], g.push(
    er[s >> 10] + er[s >> 4 & 63] + er[s << 2 & 63] + "="
  )), g.join("");
}
var ae = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ae.read = function(u, s, h, y, g) {
  var w, d, a = g * 8 - y - 1, v = (1 << a) - 1, A = v >> 1, x = -7, F = h ? g - 1 : 0, D = h ? -1 : 1, B = u[s + F];
  for (F += D, w = B & (1 << -x) - 1, B >>= -x, x += a; x > 0; w = w * 256 + u[s + F], F += D, x -= 8)
    ;
  for (d = w & (1 << -x) - 1, w >>= -x, x += y; x > 0; d = d * 256 + u[s + F], F += D, x -= 8)
    ;
  if (w === 0)
    w = 1 - A;
  else {
    if (w === v)
      return d ? NaN : (B ? -1 : 1) * (1 / 0);
    d = d + Math.pow(2, y), w = w - A;
  }
  return (B ? -1 : 1) * d * Math.pow(2, w - y);
};
ae.write = function(u, s, h, y, g, w) {
  var d, a, v, A = w * 8 - g - 1, x = (1 << A) - 1, F = x >> 1, D = g === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, B = y ? 0 : w - 1, P = y ? 1 : -1, j = s < 0 || s === 0 && 1 / s < 0 ? 1 : 0;
  for (s = Math.abs(s), isNaN(s) || s === 1 / 0 ? (a = isNaN(s) ? 1 : 0, d = x) : (d = Math.floor(Math.log(s) / Math.LN2), s * (v = Math.pow(2, -d)) < 1 && (d--, v *= 2), d + F >= 1 ? s += D / v : s += D * Math.pow(2, 1 - F), s * v >= 2 && (d++, v /= 2), d + F >= x ? (a = 0, d = x) : d + F >= 1 ? (a = (s * v - 1) * Math.pow(2, g), d = d + F) : (a = s * Math.pow(2, F - 1) * Math.pow(2, g), d = 0)); g >= 8; u[h + B] = a & 255, B += P, a /= 256, g -= 8)
    ;
  for (d = d << g | a, A += g; A > 0; u[h + B] = d & 255, B += P, d /= 256, A -= 8)
    ;
  u[h + B - P] |= j * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  var s = Jr, h = ae, y = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  u.Buffer = a, u.SlowBuffer = W, u.INSPECT_MAX_BYTES = 50;
  var g = 2147483647;
  u.kMaxLength = g, a.TYPED_ARRAY_SUPPORT = w(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
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
    if (t > g)
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
      return F(t);
    }
    return v(t, r, e);
  }
  a.poolSize = 8192;
  function v(t, r, e) {
    if (typeof t == "string")
      return D(t, r);
    if (ArrayBuffer.isView(t))
      return P(t);
    if (t == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
      );
    if (z(t, ArrayBuffer) || t && z(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (z(t, SharedArrayBuffer) || t && z(t.buffer, SharedArrayBuffer)))
      return j(t, r, e);
    if (typeof t == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var n = t.valueOf && t.valueOf();
    if (n != null && n !== t)
      return a.from(n, r, e);
    var o = X(t);
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
    return v(t, r, e);
  }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
  function A(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function x(t, r, e) {
    return A(t), t <= 0 ? d(t) : r !== void 0 ? typeof e == "string" ? d(t).fill(r, e) : d(t).fill(r) : d(t);
  }
  a.alloc = function(t, r, e) {
    return x(t, r, e);
  };
  function F(t) {
    return A(t), d(t < 0 ? 0 : $(t) | 0);
  }
  a.allocUnsafe = function(t) {
    return F(t);
  }, a.allocUnsafeSlow = function(t) {
    return F(t);
  };
  function D(t, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !a.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var e = Br(t, r) | 0, n = d(e), o = n.write(t, r);
    return o !== e && (n = n.slice(0, o)), n;
  }
  function B(t) {
    for (var r = t.length < 0 ? 0 : $(t.length) | 0, e = d(r), n = 0; n < r; n += 1)
      e[n] = t[n] & 255;
    return e;
  }
  function P(t) {
    if (z(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return j(r.buffer, r.byteOffset, r.byteLength);
    }
    return B(t);
  }
  function j(t, r, e) {
    if (r < 0 || t.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < r + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var n;
    return r === void 0 && e === void 0 ? n = new Uint8Array(t) : e === void 0 ? n = new Uint8Array(t, r) : n = new Uint8Array(t, r, e), Object.setPrototypeOf(n, a.prototype), n;
  }
  function X(t) {
    if (a.isBuffer(t)) {
      var r = $(t.length) | 0, e = d(r);
      return e.length === 0 || t.copy(e, 0, 0, r), e;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || br(t.length) ? d(0) : B(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return B(t.data);
  }
  function $(t) {
    if (t >= g)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + g.toString(16) + " bytes");
    return t | 0;
  }
  function W(t) {
    return +t != t && (t = 0), a.alloc(+t);
  }
  a.isBuffer = function(r) {
    return r != null && r._isBuffer === !0 && r !== a.prototype;
  }, a.compare = function(r, e) {
    if (z(r, Uint8Array) && (r = a.from(r, r.offset, r.byteLength)), z(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)), !a.isBuffer(r) || !a.isBuffer(e))
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
      if (z(l, Uint8Array))
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
  function Br(t, r) {
    if (a.isBuffer(t))
      return t.length;
    if (ArrayBuffer.isView(t) || z(t, ArrayBuffer))
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
          return cr(t).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return e * 2;
        case "hex":
          return e >>> 1;
        case "base64":
          return $r(t).length;
        default:
          if (o)
            return n ? -1 : cr(t).length;
          r = ("" + r).toLowerCase(), o = !0;
      }
  }
  a.byteLength = Br;
  function Gr(t, r, e) {
    var n = !1;
    if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, r >>>= 0, e <= r))
      return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return Pr(this, r, e);
        case "utf8":
        case "utf-8":
          return Q(this, r, e);
        case "ascii":
          return jr(this, r, e);
        case "latin1":
        case "binary":
          return Lr(this, r, e);
        case "base64":
          return K(this, r, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Mr(this, r, e);
        default:
          if (n)
            throw new TypeError("Unknown encoding: " + t);
          t = (t + "").toLowerCase(), n = !0;
      }
  }
  a.prototype._isBuffer = !0;
  function tr(t, r, e) {
    var n = t[r];
    t[r] = t[e], t[e] = n;
  }
  a.prototype.swap16 = function() {
    var r = this.length;
    if (r % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var e = 0; e < r; e += 2)
      tr(this, e, e + 1);
    return this;
  }, a.prototype.swap32 = function() {
    var r = this.length;
    if (r % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var e = 0; e < r; e += 4)
      tr(this, e, e + 3), tr(this, e + 1, e + 2);
    return this;
  }, a.prototype.swap64 = function() {
    var r = this.length;
    if (r % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var e = 0; e < r; e += 8)
      tr(this, e, e + 7), tr(this, e + 1, e + 6), tr(this, e + 2, e + 5), tr(this, e + 3, e + 4);
    return this;
  }, a.prototype.toString = function() {
    var r = this.length;
    return r === 0 ? "" : arguments.length === 0 ? Q(this, 0, r) : Gr.apply(this, arguments);
  }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(r) {
    if (!a.isBuffer(r))
      throw new TypeError("Argument must be a Buffer");
    return this === r ? !0 : a.compare(this, r) === 0;
  }, a.prototype.inspect = function() {
    var r = "", e = u.INSPECT_MAX_BYTES;
    return r = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (r += " ... "), "<Buffer " + r + ">";
  }, y && (a.prototype[y] = a.prototype.inspect), a.prototype.compare = function(r, e, n, o, c) {
    if (z(r, Uint8Array) && (r = a.from(r, r.offset, r.byteLength)), !a.isBuffer(r))
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
    for (var l = c - o, _ = n - e, T = Math.min(l, _), S = this.slice(o, c), M = r.slice(e, n), C = 0; C < T; ++C)
      if (S[C] !== M[C]) {
        l = S[C], _ = M[C];
        break;
      }
    return l < _ ? -1 : _ < l ? 1 : 0;
  };
  function Ur(t, r, e, n, o) {
    if (t.length === 0)
      return -1;
    if (typeof e == "string" ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, br(e) && (e = o ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
      if (o)
        return -1;
      e = t.length - 1;
    } else if (e < 0)
      if (o)
        e = 0;
      else
        return -1;
    if (typeof r == "string" && (r = a.from(r, n)), a.isBuffer(r))
      return r.length === 0 ? -1 : kr(t, r, e, n, o);
    if (typeof r == "number")
      return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? o ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : kr(t, [r], e, n, o);
    throw new TypeError("val must be string, number or Buffer");
  }
  function kr(t, r, e, n, o) {
    var c = 1, l = t.length, _ = r.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || r.length < 2)
        return -1;
      c = 2, l /= 2, _ /= 2, e /= 2;
    }
    function T(Fr, Rr) {
      return c === 1 ? Fr[Rr] : Fr.readUInt16BE(Rr * c);
    }
    var S;
    if (o) {
      var M = -1;
      for (S = e; S < l; S++)
        if (T(t, S) === T(r, M === -1 ? 0 : S - M)) {
          if (M === -1 && (M = S), S - M + 1 === _)
            return M * c;
        } else
          M !== -1 && (S -= S - M), M = -1;
    } else
      for (e + _ > l && (e = l - _), S = e; S >= 0; S--) {
        for (var C = !0, pr = 0; pr < _; pr++)
          if (T(t, S + pr) !== T(r, pr)) {
            C = !1;
            break;
          }
        if (C)
          return S;
      }
    return -1;
  }
  a.prototype.includes = function(r, e, n) {
    return this.indexOf(r, e, n) !== -1;
  }, a.prototype.indexOf = function(r, e, n) {
    return Ur(this, r, e, n, !0);
  }, a.prototype.lastIndexOf = function(r, e, n) {
    return Ur(this, r, e, n, !1);
  };
  function Hr(t, r, e, n) {
    e = Number(e) || 0;
    var o = t.length - e;
    n ? (n = Number(n), n > o && (n = o)) : n = o;
    var c = r.length;
    n > c / 2 && (n = c / 2);
    for (var l = 0; l < n; ++l) {
      var _ = parseInt(r.substr(l * 2, 2), 16);
      if (br(_))
        return l;
      t[e + l] = _;
    }
    return l;
  }
  function Or(t, r, e, n) {
    return sr(cr(r, t.length - e), t, e, n);
  }
  function Xr(t, r, e, n) {
    return sr(_r(r), t, e, n);
  }
  function Kr(t, r, e, n) {
    return sr($r(r), t, e, n);
  }
  function Nr(t, r, e, n) {
    return sr(lr(r, t.length - e), t, e, n);
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
          return Hr(this, r, e, n);
        case "utf8":
        case "utf-8":
          return Or(this, r, e, n);
        case "ascii":
        case "latin1":
        case "binary":
          return Xr(this, r, e, n);
        case "base64":
          return Kr(this, r, e, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Nr(this, r, e, n);
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
  function K(t, r, e) {
    return r === 0 && e === t.length ? s.fromByteArray(t) : s.fromByteArray(t.slice(r, e));
  }
  function Q(t, r, e) {
    e = Math.min(t.length, e);
    for (var n = [], o = r; o < e; ) {
      var c = t[o], l = null, _ = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
      if (o + _ <= e) {
        var T, S, M, C;
        switch (_) {
          case 1:
            c < 128 && (l = c);
            break;
          case 2:
            T = t[o + 1], (T & 192) === 128 && (C = (c & 31) << 6 | T & 63, C > 127 && (l = C));
            break;
          case 3:
            T = t[o + 1], S = t[o + 2], (T & 192) === 128 && (S & 192) === 128 && (C = (c & 15) << 12 | (T & 63) << 6 | S & 63, C > 2047 && (C < 55296 || C > 57343) && (l = C));
            break;
          case 4:
            T = t[o + 1], S = t[o + 2], M = t[o + 3], (T & 192) === 128 && (S & 192) === 128 && (M & 192) === 128 && (C = (c & 15) << 18 | (T & 63) << 12 | (S & 63) << 6 | M & 63, C > 65535 && C < 1114112 && (l = C));
        }
      }
      l === null ? (l = 65533, _ = 1) : l > 65535 && (l -= 65536, n.push(l >>> 10 & 1023 | 55296), l = 56320 | l & 1023), n.push(l), o += _;
    }
    return Dr(n);
  }
  var ur = 4096;
  function Dr(t) {
    var r = t.length;
    if (r <= ur)
      return String.fromCharCode.apply(String, t);
    for (var e = "", n = 0; n < r; )
      e += String.fromCharCode.apply(
        String,
        t.slice(n, n += ur)
      );
    return e;
  }
  function jr(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var o = r; o < e; ++o)
      n += String.fromCharCode(t[o] & 127);
    return n;
  }
  function Lr(t, r, e) {
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
      o += hr[t[c]];
    return o;
  }
  function Mr(t, r, e) {
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
  function Y(t, r, e, n, o, c) {
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
      Y(this, r, e, n, c, 0);
    }
    var l = 1, _ = 0;
    for (this[e] = r & 255; ++_ < n && (l *= 256); )
      this[e + _] = r / l & 255;
    return e + n;
  }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !o) {
      var c = Math.pow(2, 8 * n) - 1;
      Y(this, r, e, n, c, 0);
    }
    var l = n - 1, _ = 1;
    for (this[e + l] = r & 255; --l >= 0 && (_ *= 256); )
      this[e + l] = r / _ & 255;
    return e + n;
  }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 1, 255, 0), this[e] = r & 255, e + 1;
  }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 2, 65535, 0), this[e] = r & 255, this[e + 1] = r >>> 8, e + 2;
  }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 2, 65535, 0), this[e] = r >>> 8, this[e + 1] = r & 255, e + 2;
  }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 4, 4294967295, 0), this[e + 3] = r >>> 24, this[e + 2] = r >>> 16, this[e + 1] = r >>> 8, this[e] = r & 255, e + 4;
  }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 4, 4294967295, 0), this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255, e + 4;
  }, a.prototype.writeIntLE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var c = Math.pow(2, 8 * n - 1);
      Y(this, r, e, n, c - 1, -c);
    }
    var l = 0, _ = 1, T = 0;
    for (this[e] = r & 255; ++l < n && (_ *= 256); )
      r < 0 && T === 0 && this[e + l - 1] !== 0 && (T = 1), this[e + l] = (r / _ >> 0) - T & 255;
    return e + n;
  }, a.prototype.writeIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var c = Math.pow(2, 8 * n - 1);
      Y(this, r, e, n, c - 1, -c);
    }
    var l = n - 1, _ = 1, T = 0;
    for (this[e + l] = r & 255; --l >= 0 && (_ *= 256); )
      r < 0 && T === 0 && this[e + l + 1] !== 0 && (T = 1), this[e + l] = (r / _ >> 0) - T & 255;
    return e + n;
  }, a.prototype.writeInt8 = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 1, 127, -128), r < 0 && (r = 255 + r + 1), this[e] = r & 255, e + 1;
  }, a.prototype.writeInt16LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 2, 32767, -32768), this[e] = r & 255, this[e + 1] = r >>> 8, e + 2;
  }, a.prototype.writeInt16BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 2, 32767, -32768), this[e] = r >>> 8, this[e + 1] = r & 255, e + 2;
  }, a.prototype.writeInt32LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 4, 2147483647, -2147483648), this[e] = r & 255, this[e + 1] = r >>> 8, this[e + 2] = r >>> 16, this[e + 3] = r >>> 24, e + 4;
  }, a.prototype.writeInt32BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255, e + 4;
  };
  function mr(t, r, e, n, o, c) {
    if (e + n > t.length)
      throw new RangeError("Index out of range");
    if (e < 0)
      throw new RangeError("Index out of range");
  }
  function Wr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || mr(t, r, e, 4), h.write(t, r, e, n, 23, 4), e + 4;
  }
  a.prototype.writeFloatLE = function(r, e, n) {
    return Wr(this, r, e, !0, n);
  }, a.prototype.writeFloatBE = function(r, e, n) {
    return Wr(this, r, e, !1, n);
  };
  function Yr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || mr(t, r, e, 8), h.write(t, r, e, n, 52, 8), e + 8;
  }
  a.prototype.writeDoubleLE = function(r, e, n) {
    return Yr(this, r, e, !0, n);
  }, a.prototype.writeDoubleBE = function(r, e, n) {
    return Yr(this, r, e, !1, n);
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
      var _ = a.isBuffer(r) ? r : a.from(r, o), T = _.length;
      if (T === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (l = 0; l < n - e; ++l)
        this[l + e] = _[l % T];
    }
    return this;
  };
  var xr = /[^+/0-9A-Za-z-_]/g;
  function Er(t) {
    if (t = t.split("=")[0], t = t.trim().replace(xr, ""), t.length < 2)
      return "";
    for (; t.length % 4 !== 0; )
      t = t + "=";
    return t;
  }
  function cr(t, r) {
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
  function _r(t) {
    for (var r = [], e = 0; e < t.length; ++e)
      r.push(t.charCodeAt(e) & 255);
    return r;
  }
  function lr(t, r) {
    for (var e, n, o, c = [], l = 0; l < t.length && !((r -= 2) < 0); ++l)
      e = t.charCodeAt(l), n = e >> 8, o = e % 256, c.push(o), c.push(n);
    return c;
  }
  function $r(t) {
    return s.toByteArray(Er(t));
  }
  function sr(t, r, e, n) {
    for (var o = 0; o < n && !(o + e >= r.length || o >= t.length); ++o)
      r[o + e] = t[o];
    return o;
  }
  function z(t, r) {
    return t instanceof r || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === r.name;
  }
  function br(t) {
    return t !== t;
  }
  var hr = function() {
    for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
      for (var n = e * 16, o = 0; o < 16; ++o)
        r[n + o] = t[e] + t[o];
    return r;
  }();
})(Le);
var qr = {}, ze = {
  get exports() {
    return qr;
  },
  set exports(u) {
    qr = u;
  }
}, N = ze.exports = {}, Z, rr;
function ne() {
  throw new Error("setTimeout has not been defined");
}
function ie() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Z = setTimeout : Z = ne;
  } catch {
    Z = ne;
  }
  try {
    typeof clearTimeout == "function" ? rr = clearTimeout : rr = ie;
  } catch {
    rr = ie;
  }
})();
function ge(u) {
  if (Z === setTimeout)
    return setTimeout(u, 0);
  if ((Z === ne || !Z) && setTimeout)
    return Z = setTimeout, setTimeout(u, 0);
  try {
    return Z(u, 0);
  } catch {
    try {
      return Z.call(null, u, 0);
    } catch {
      return Z.call(this, u, 0);
    }
  }
}
function Ge(u) {
  if (rr === clearTimeout)
    return clearTimeout(u);
  if ((rr === ie || !rr) && clearTimeout)
    return rr = clearTimeout, clearTimeout(u);
  try {
    return rr(u);
  } catch {
    try {
      return rr.call(null, u);
    } catch {
      return rr.call(this, u);
    }
  }
}
var or = [], gr = !1, fr, Vr = -1;
function He() {
  !gr || !fr || (gr = !1, fr.length ? or = fr.concat(or) : Vr = -1, or.length && me());
}
function me() {
  if (!gr) {
    var u = ge(He);
    gr = !0;
    for (var s = or.length; s; ) {
      for (fr = or, or = []; ++Vr < s; )
        fr && fr[Vr].run();
      Vr = -1, s = or.length;
    }
    fr = null, gr = !1, Ge(u);
  }
}
N.nextTick = function(u) {
  var s = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var h = 1; h < arguments.length; h++)
      s[h - 1] = arguments[h];
  or.push(new xe(u, s)), or.length === 1 && !gr && ge(me);
};
function xe(u, s) {
  this.fun = u, this.array = s;
}
xe.prototype.run = function() {
  this.fun.apply(null, this.array);
};
N.title = "browser";
N.browser = !0;
N.env = {};
N.argv = [];
N.version = "";
N.versions = {};
function ar() {
}
N.on = ar;
N.addListener = ar;
N.once = ar;
N.off = ar;
N.removeListener = ar;
N.removeAllListeners = ar;
N.emit = ar;
N.prependListener = ar;
N.prependOnceListener = ar;
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
  function s() {
    var y = this || self;
    return delete u.prototype.__magic__, y;
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
var Ir = {}, Xe = {
  get exports() {
    return Ir;
  },
  set exports(u) {
    Ir = u;
  }
}, Tr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var de;
function Ke() {
  if (de)
    return Tr;
  de = 1;
  var u = U, s = Symbol.for("react.element"), h = Symbol.for("react.fragment"), y = Object.prototype.hasOwnProperty, g = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(a, v, A) {
    var x, F = {}, D = null, B = null;
    A !== void 0 && (D = "" + A), v.key !== void 0 && (D = "" + v.key), v.ref !== void 0 && (B = v.ref);
    for (x in v)
      y.call(v, x) && !w.hasOwnProperty(x) && (F[x] = v[x]);
    if (a && a.defaultProps)
      for (x in v = a.defaultProps, v)
        F[x] === void 0 && (F[x] = v[x]);
    return { $$typeof: s, type: a, key: D, ref: B, props: F, _owner: g.current };
  }
  return Tr.Fragment = h, Tr.jsx = d, Tr.jsxs = d, Tr;
}
var Ar = {}, we;
function Qe() {
  return we || (we = 1, qr.env.NODE_ENV !== "production" && function() {
    var u = U, s = Symbol.for("react.element"), h = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), a = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), A = Symbol.for("react.suspense"), x = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), B = Symbol.for("react.offscreen"), P = Symbol.iterator, j = "@@iterator";
    function X(i) {
      if (i === null || typeof i != "object")
        return null;
      var f = P && i[P] || i[j];
      return typeof f == "function" ? f : null;
    }
    var $ = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function W(i) {
      {
        for (var f = arguments.length, p = new Array(f > 1 ? f - 1 : 0), m = 1; m < f; m++)
          p[m - 1] = arguments[m];
        Br("error", i, p);
      }
    }
    function Br(i, f, p) {
      {
        var m = $.ReactDebugCurrentFrame, R = m.getStackAddendum();
        R !== "" && (f += "%s", p = p.concat([R]));
        var I = p.map(function(b) {
          return String(b);
        });
        I.unshift("Warning: " + f), Function.prototype.apply.call(console[i], console, I);
      }
    }
    var Gr = !1, tr = !1, Ur = !1, kr = !1, Hr = !1, Or;
    Or = Symbol.for("react.module.reference");
    function Xr(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === y || i === w || Hr || i === g || i === A || i === x || kr || i === B || Gr || tr || Ur || typeof i == "object" && i !== null && (i.$$typeof === D || i.$$typeof === F || i.$$typeof === d || i.$$typeof === a || i.$$typeof === v || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === Or || i.getModuleId !== void 0));
    }
    function Kr(i, f, p) {
      var m = i.displayName;
      if (m)
        return m;
      var R = f.displayName || f.name || "";
      return R !== "" ? p + "(" + R + ")" : p;
    }
    function Nr(i) {
      return i.displayName || "Context";
    }
    function K(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && W("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
        return i.displayName || i.name || null;
      if (typeof i == "string")
        return i;
      switch (i) {
        case y:
          return "Fragment";
        case h:
          return "Portal";
        case w:
          return "Profiler";
        case g:
          return "StrictMode";
        case A:
          return "Suspense";
        case x:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case a:
            var f = i;
            return Nr(f) + ".Consumer";
          case d:
            var p = i;
            return Nr(p._context) + ".Provider";
          case v:
            return Kr(i, i.render, "ForwardRef");
          case F:
            var m = i.displayName || null;
            return m !== null ? m : K(i.type) || "Memo";
          case D: {
            var R = i, I = R._payload, b = R._init;
            try {
              return K(b(I));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Q = Object.assign, ur = 0, Dr, jr, Lr, Pr, Mr, k, Y;
    function mr() {
    }
    mr.__reactDisabledLog = !0;
    function Wr() {
      {
        if (ur === 0) {
          Dr = console.log, jr = console.info, Lr = console.warn, Pr = console.error, Mr = console.group, k = console.groupCollapsed, Y = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: mr,
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
        ur++;
      }
    }
    function Yr() {
      {
        if (ur--, ur === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Q({}, i, {
              value: Dr
            }),
            info: Q({}, i, {
              value: jr
            }),
            warn: Q({}, i, {
              value: Lr
            }),
            error: Q({}, i, {
              value: Pr
            }),
            group: Q({}, i, {
              value: Mr
            }),
            groupCollapsed: Q({}, i, {
              value: k
            }),
            groupEnd: Q({}, i, {
              value: Y
            })
          });
        }
        ur < 0 && W("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var xr = $.ReactCurrentDispatcher, Er;
    function cr(i, f, p) {
      {
        if (Er === void 0)
          try {
            throw Error();
          } catch (R) {
            var m = R.stack.trim().match(/\n( *(at )?)/);
            Er = m && m[1] || "";
          }
        return `
` + Er + i;
      }
    }
    var _r = !1, lr;
    {
      var $r = typeof WeakMap == "function" ? WeakMap : Map;
      lr = new $r();
    }
    function sr(i, f) {
      if (!i || _r)
        return "";
      {
        var p = lr.get(i);
        if (p !== void 0)
          return p;
      }
      var m;
      _r = !0;
      var R = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var I;
      I = xr.current, xr.current = null, Wr();
      try {
        if (f) {
          var b = function() {
            throw Error();
          };
          if (Object.defineProperty(b.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(b, []);
            } catch (nr) {
              m = nr;
            }
            Reflect.construct(i, [], b);
          } else {
            try {
              b.call();
            } catch (nr) {
              m = nr;
            }
            i.call(b.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (nr) {
            m = nr;
          }
          i();
        }
      } catch (nr) {
        if (nr && m && typeof nr.stack == "string") {
          for (var E = nr.stack.split(`
`), V = m.stack.split(`
`), O = E.length - 1, L = V.length - 1; O >= 1 && L >= 0 && E[O] !== V[L]; )
            L--;
          for (; O >= 1 && L >= 0; O--, L--)
            if (E[O] !== V[L]) {
              if (O !== 1 || L !== 1)
                do
                  if (O--, L--, L < 0 || E[O] !== V[L]) {
                    var G = `
` + E[O].replace(" at new ", " at ");
                    return i.displayName && G.includes("<anonymous>") && (G = G.replace("<anonymous>", i.displayName)), typeof i == "function" && lr.set(i, G), G;
                  }
                while (O >= 1 && L >= 0);
              break;
            }
        }
      } finally {
        _r = !1, xr.current = I, Yr(), Error.prepareStackTrace = R;
      }
      var wr = i ? i.displayName || i.name : "", pe = wr ? cr(wr) : "";
      return typeof i == "function" && lr.set(i, pe), pe;
    }
    function z(i, f, p) {
      return sr(i, !1);
    }
    function br(i) {
      var f = i.prototype;
      return !!(f && f.isReactComponent);
    }
    function hr(i, f, p) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return sr(i, br(i));
      if (typeof i == "string")
        return cr(i);
      switch (i) {
        case A:
          return cr("Suspense");
        case x:
          return cr("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case v:
            return z(i.render);
          case F:
            return hr(i.type, f, p);
          case D: {
            var m = i, R = m._payload, I = m._init;
            try {
              return hr(I(R), f, p);
            } catch {
            }
          }
        }
      return "";
    }
    var t = Object.prototype.hasOwnProperty, r = {}, e = $.ReactDebugCurrentFrame;
    function n(i) {
      if (i) {
        var f = i._owner, p = hr(i.type, i._source, f ? f.type : null);
        e.setExtraStackFrame(p);
      } else
        e.setExtraStackFrame(null);
    }
    function o(i, f, p, m, R) {
      {
        var I = Function.call.bind(t);
        for (var b in i)
          if (I(i, b)) {
            var E = void 0;
            try {
              if (typeof i[b] != "function") {
                var V = Error((m || "React class") + ": " + p + " type `" + b + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[b] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw V.name = "Invariant Violation", V;
              }
              E = i[b](f, b, m, p, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (O) {
              E = O;
            }
            E && !(E instanceof Error) && (n(R), W("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", p, b, typeof E), n(null)), E instanceof Error && !(E.message in r) && (r[E.message] = !0, n(R), W("Failed %s type: %s", p, E.message), n(null));
          }
      }
    }
    var c = Array.isArray;
    function l(i) {
      return c(i);
    }
    function _(i) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, p = f && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return p;
      }
    }
    function T(i) {
      try {
        return S(i), !1;
      } catch {
        return !0;
      }
    }
    function S(i) {
      return "" + i;
    }
    function M(i) {
      if (T(i))
        return W("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", _(i)), S(i);
    }
    var C = $.ReactCurrentOwner, pr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Fr, Rr, Qr;
    Qr = {};
    function be(i) {
      if (t.call(i, "ref")) {
        var f = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function Fe(i) {
      if (t.call(i, "key")) {
        var f = Object.getOwnPropertyDescriptor(i, "key").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function Re(i, f) {
      if (typeof i.ref == "string" && C.current && f && C.current.stateNode !== f) {
        var p = K(C.current.type);
        Qr[p] || (W('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', K(C.current.type), i.ref), Qr[p] = !0);
      }
    }
    function Te(i, f) {
      {
        var p = function() {
          Fr || (Fr = !0, W("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        p.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: p,
          configurable: !0
        });
      }
    }
    function Ae(i, f) {
      {
        var p = function() {
          Rr || (Rr = !0, W("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        p.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: p,
          configurable: !0
        });
      }
    }
    var Ce = function(i, f, p, m, R, I, b) {
      var E = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: s,
        // Built-in properties that belong on the element
        type: i,
        key: f,
        ref: p,
        props: b,
        // Record the component responsible for creating this element.
        _owner: I
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
        value: m
      }), Object.defineProperty(E, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: R
      }), Object.freeze && (Object.freeze(E.props), Object.freeze(E)), E;
    };
    function Se(i, f, p, m, R) {
      {
        var I, b = {}, E = null, V = null;
        p !== void 0 && (M(p), E = "" + p), Fe(f) && (M(f.key), E = "" + f.key), be(f) && (V = f.ref, Re(f, R));
        for (I in f)
          t.call(f, I) && !pr.hasOwnProperty(I) && (b[I] = f[I]);
        if (i && i.defaultProps) {
          var O = i.defaultProps;
          for (I in O)
            b[I] === void 0 && (b[I] = O[I]);
        }
        if (E || V) {
          var L = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          E && Te(b, L), V && Ae(b, L);
        }
        return Ce(i, E, V, R, m, C.current, b);
      }
    }
    var Zr = $.ReactCurrentOwner, ue = $.ReactDebugCurrentFrame;
    function dr(i) {
      if (i) {
        var f = i._owner, p = hr(i.type, i._source, f ? f.type : null);
        ue.setExtraStackFrame(p);
      } else
        ue.setExtraStackFrame(null);
    }
    var re;
    re = !1;
    function ee(i) {
      return typeof i == "object" && i !== null && i.$$typeof === s;
    }
    function ce() {
      {
        if (Zr.current) {
          var i = K(Zr.current.type);
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
          var f = i.fileName.replace(/^.*[\\\/]/, ""), p = i.lineNumber;
          return `

Check your code at ` + f + ":" + p + ".";
        }
        return "";
      }
    }
    var se = {};
    function Be(i) {
      {
        var f = ce();
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
        if (se[p])
          return;
        se[p] = !0;
        var m = "";
        i && i._owner && i._owner !== Zr.current && (m = " It was passed a child from " + K(i._owner.type) + "."), dr(i), W('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', p, m), dr(null);
      }
    }
    function le(i, f) {
      {
        if (typeof i != "object")
          return;
        if (l(i))
          for (var p = 0; p < i.length; p++) {
            var m = i[p];
            ee(m) && fe(m, f);
          }
        else if (ee(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var R = X(i);
          if (typeof R == "function" && R !== i.entries)
            for (var I = R.call(i), b; !(b = I.next()).done; )
              ee(b.value) && fe(b.value, f);
        }
      }
    }
    function Ue(i) {
      {
        var f = i.type;
        if (f == null || typeof f == "string")
          return;
        var p;
        if (typeof f == "function")
          p = f.propTypes;
        else if (typeof f == "object" && (f.$$typeof === v || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        f.$$typeof === F))
          p = f.propTypes;
        else
          return;
        if (p) {
          var m = K(f);
          o(p, i.props, "prop", m, i);
        } else if (f.PropTypes !== void 0 && !re) {
          re = !0;
          var R = K(f);
          W("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", R || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && W("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ke(i) {
      {
        for (var f = Object.keys(i.props), p = 0; p < f.length; p++) {
          var m = f[p];
          if (m !== "children" && m !== "key") {
            dr(i), W("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), dr(null);
            break;
          }
        }
        i.ref !== null && (dr(i), W("Invalid attribute `ref` supplied to `React.Fragment`."), dr(null));
      }
    }
    function he(i, f, p, m, R, I) {
      {
        var b = Xr(i);
        if (!b) {
          var E = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var V = Ie(R);
          V ? E += V : E += ce();
          var O;
          i === null ? O = "null" : l(i) ? O = "array" : i !== void 0 && i.$$typeof === s ? (O = "<" + (K(i.type) || "Unknown") + " />", E = " Did you accidentally export a JSX literal instead of a component?") : O = typeof i, W("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", O, E);
        }
        var L = Se(i, f, p, R, I);
        if (L == null)
          return L;
        if (b) {
          var G = f.children;
          if (G !== void 0)
            if (m)
              if (l(G)) {
                for (var wr = 0; wr < G.length; wr++)
                  le(G[wr], i);
                Object.freeze && Object.freeze(G);
              } else
                W("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              le(G, i);
        }
        return i === y ? ke(L) : Ue(L), L;
      }
    }
    function Oe(i, f, p) {
      return he(i, f, p, !0);
    }
    function Ne(i, f, p) {
      return he(i, f, p, !1);
    }
    var De = Ne, je = Oe;
    Ar.Fragment = y, Ar.jsx = De, Ar.jsxs = je;
  }()), Ar;
}
(function(u) {
  qr.env.NODE_ENV === "production" ? u.exports = Ke() : u.exports = Qe();
})(Xe);
const Ze = Ir.Fragment, J = Ir.jsx, Sr = Ir.jsxs;
var oe = {}, rt = {
  get exports() {
    return oe;
  },
  set exports(u) {
    oe = u;
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
      for (var y = [], g = 0; g < arguments.length; g++) {
        var w = arguments[g];
        if (w) {
          var d = typeof w;
          if (d === "string" || d === "number")
            y.push(w);
          else if (Array.isArray(w)) {
            if (w.length) {
              var a = h.apply(null, w);
              a && y.push(a);
            }
          } else if (d === "object") {
            if (w.toString !== Object.prototype.toString && !w.toString.toString().includes("[native code]")) {
              y.push(w.toString());
              continue;
            }
            for (var v in w)
              s.call(w, v) && w[v] && y.push(v);
          }
        }
      }
      return y.join(" ");
    }
    u.exports ? (h.default = h, u.exports = h) : window.classNames = h;
  })();
})(rt);
const vr = oe, zr = U.createContext(null);
function vt({
  children: u
}) {
  const [s, h] = U.useState(), y = U.useCallback(
    (w, d) => h((a) => ({ ...a, [w]: d })),
    []
  ), g = U.useMemo(
    () => ({
      widgetState: s || null,
      setWidgetState: y
    }),
    [s, y]
  );
  return /* @__PURE__ */ J(zr.Provider, { value: g, children: u });
}
const et = "_ring_7tcsj_47", tt = "_popupButton__container_7tcsj_5", nt = "_popupButton_7tcsj_5", it = "_icon_7tcsj_23", ot = "_inactiveIcon_7tcsj_31", at = "_activeIcon_7tcsj_35", ut = "_notif_7tcsj_39", ct = "_pinging_7tcsj_43", st = "_ping_7tcsj_43", q = {
  ring: et,
  popupButton__container: tt,
  "popupButton__container--open": "_popupButton__container--open_7tcsj_9",
  popupButton: nt,
  icon: it,
  inactiveIcon: ot,
  activeIcon: at,
  notif: ut,
  pinging: ct,
  ping: st
};
function Ee() {
  try {
    const u = typeof localStorage < "u" && localStorage.getItem("clickedNfts") || "";
    return u ? JSON.parse(u) : [];
  } catch {
    return [];
  }
}
function ft(u) {
  try {
    const h = [...Ee(), u];
    typeof localStorage < "u" && localStorage.setItem("clickedNfts", JSON.stringify(h));
  } catch {
    return null;
  }
}
function lt({
  notiVal: u,
  showNoti: s,
  isOpen: h,
  clickHandler: y
}) {
  const g = Ee(), w = U.useContext(zr), d = w == null ? void 0 : w.widgetState, a = d == null ? void 0 : d.foundNft, v = a && JSON.parse(a).itemId, A = !h && (a ? !g.includes(a) && Boolean(v) : !1), [x, F] = U.useState(A);
  return U.useEffect(() => {
    A && F(!0);
  }, [A]), /* @__PURE__ */ Sr(
    "div",
    {
      className: vr(q.popupButton__container, {
        [q["popupButton__container--open"]]: h
      }),
      children: [
        /* @__PURE__ */ J(
          "span",
          {
            className: x ? q.ring : void 0,
            style: { boxShadow: "none" }
          }
        ),
        /* @__PURE__ */ Sr(
          "button",
          {
            className: q.popupButton,
            type: "button",
            onClick: (D) => {
              F(!1), a && ft(a), y(D);
            },
            children: [
              /* @__PURE__ */ J(
                "div",
                {
                  className: vr(q.icon, {
                    [q.activeIcon]: !h,
                    [q.inactiveIcon]: h
                  }),
                  children: /* @__PURE__ */ J(
                    "img",
                    {
                      alt: "WalletChat",
                      src: "https://uploads-ssl.webflow.com/62d761bae8bf2da003f57b06/62d761bae8bf2dea68f57b52_walletchat%20logo.png",
                      style: { height: "90%" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ J(
                "div",
                {
                  className: vr(q.icon, {
                    [q.activeIcon]: h,
                    [q.inactiveIcon]: !h
                  }),
                  children: /* @__PURE__ */ J(
                    "svg",
                    {
                      focusable: "false",
                      viewBox: "0 0 16 14",
                      width: "28",
                      height: "25",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /* @__PURE__ */ J(
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
        s && /* @__PURE__ */ Sr(Ze, { children: [
          /* @__PURE__ */ J("span", { className: vr(q.notif, q.pinging) }),
          /* @__PURE__ */ J("span", { className: q.notif, children: u })
        ] })
      ]
    }
  );
}
function ye(u) {
  const h = u.replace("https://", "").replace("http://", "").split("/"), y = h.length, g = h[y - 1], w = h[y - 2];
  if (u.startsWith("looksrare.org"))
    return { itemId: g, contractAddress: w, network: "ethereum" };
  const d = h[y - 3];
  return y >= 5 ? { itemId: g, contractAddress: w, network: d } : u.startsWith("x2y2.io") && d === "eth" ? { itemId: g, contractAddress: w, network: "ethereum" } : { contractAddress: null, itemId: null, network: null };
}
const ht = "_ring_q714d_1", Cr = {
  ring: ht,
  "wallet-chat-widget": "_wallet-chat-widget_q714d_23",
  "widget-is-open": "_widget-is-open_q714d_9",
  "widget-is-closed": "_widget-is-closed_q714d_13",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_q714d_23",
  "wallet-chat-widget__container--open": "_wallet-chat-widget__container--open_q714d_27"
}, pt = "https://staging.walletchat.fun", _e = Cr["wallet-chat-widget"];
function ir(u) {
  var h;
  if (typeof document > "u")
    return;
  const s = document == null ? void 0 : document.getElementById(_e);
  (h = s == null ? void 0 : s.contentWindow) == null || h.postMessage(u, "*");
}
function dt(u) {
  if (typeof u < "u" && u !== null) {
    const s = Boolean(
      u === window.ethereum || u.id.toLowerCase() === "metamask"
    );
    ir(s ? {
      target: "sign_in",
      data: { isInjected: s }
    } : {
      target: "sign_in",
      data: {
        connectorOptions: {
          // projectId: clientId.toString(),
          // address: accounts[0],
          // chainId,
        }
      }
    });
  } else
    ir({ target: "sign_in", data: null });
}
function gt({ provider: u }) {
  const s = U.useRef(""), h = U.useRef(null), y = U.useRef(!1), g = U.useRef(!1), w = U.useContext(zr), { widgetState: d, setWidgetState: a } = w || {}, { ownerAddress: v } = d || {}, [A, x] = U.useState(g.current), [F, D] = U.useState(0), B = () => {
    x((P) => {
      const j = Boolean(P);
      return ir({ target: "widget_open", data: !j }), h.current && !j && ir({ ...h.current, redirect: !0 }), h.current = null, g.current = !j, !j;
    });
  };
  return U.useEffect(() => {
    A && !y.current && dt(u || null);
  }, [u, A]), U.useEffect(() => {
    if (!(v != null && v.address))
      return;
    const P = v.address, j = ye(window.location.href);
    j.network && (h.current = {
      ...j,
      ownerAddress: P
    }), h.current ? ir({ ...h.current, redirect: !0 }) : ir({ ownerAddress: P }), x(!0);
  }, [v]), U.useEffect(() => {
    const P = () => {
      if (window.location.href === s.current)
        return;
      s.current = window.location.href;
      const $ = ye(window.location.href);
      a && a("foundNft", JSON.stringify($)), $.network && (h.current = $), ir($);
    }, j = new MutationObserver(P), X = { subtree: !0, childList: !0 };
    return P(), j.observe(document, X), () => j.disconnect();
  }, []), U.useEffect(() => {
    const P = (j) => {
      const { data: X } = j;
      X.target === "unread_cnt" && D(X.data), X.closeWidget && B(), X.target === "sign_in" && a && (y.current = X.data), g.current && ir({ target: "widget_open", data: !0 });
    };
    return window.addEventListener("message", P), () => window.removeEventListener("message", P);
  }, []), /* @__PURE__ */ Sr(
    "div",
    {
      className: vr(Cr["wallet-chat-widget__container"], {
        [Cr["wallet-chat-widget__container--open"]]: A
      }),
      children: [
        /* @__PURE__ */ J(
          "iframe",
          {
            title: "WalletChat",
            name: "WalletChat",
            id: _e,
            className: vr("", {
              [Cr["widget-is-open"]]: A,
              [Cr["widget-is-closed"]]: !A
            }),
            src: pt
          }
        ),
        /* @__PURE__ */ J(
          lt,
          {
            notiVal: F,
            showNoti: F > 0,
            isOpen: A,
            clickHandler: B
          }
        )
      ]
    }
  );
}
const wt = ({
  onClick: u,
  children: s
}) => /* @__PURE__ */ J("button", { type: "button", onClick: u, children: s }), mt = ({
  ownerAddress: u,
  render: s
}) => {
  const h = U.useContext(zr), y = h == null ? void 0 : h.setWidgetState, g = s ? ({ onClick: w, children: d }) => U.cloneElement(s, { onClick: w }, d) : wt;
  return h ? /* @__PURE__ */ Sr(
    g,
    {
      onClick: () => y && y("ownerAddress", {
        address: u,
        lastRequest: Date.now().toString()
      }),
      children: [
        /* @__PURE__ */ J(
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
  mt as ChatWithOwner,
  vt as WalletChatProvider,
  gt as WalletChatWidget
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._ring_7tcsj_47{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._popupButton__container_7tcsj_5{position:relative;margin-top:.75rem;height:4rem;--tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / .15));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:margin-top,transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}._popupButton__container--open_7tcsj_9{right:1.5rem;margin-top:-4rem;--tw-translate-y: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._popupButton__container--open_7tcsj_9{right:0px;margin-top:.75rem;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._popupButton_7tcsj_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}._icon_7tcsj_23{transition-property:transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_7tcsj_23 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_7tcsj_31{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_7tcsj_35{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_7tcsj_39{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(219 39 119 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}._pinging_7tcsj_43{animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite}._ring_7tcsj_47{position:fixed;right:0px;display:inline-flex;height:4rem;width:4rem}@keyframes _ping_7tcsj_43{75%,to{transform:scale(2);opacity:0}}._ring_7tcsj_47{animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity));opacity:.75}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._ring_q714d_1{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}#_wallet-chat-widget_q714d_23{transition-property:width,min-width,height,min-height;transition-duration:.25s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(4px 4px 8px rgba(0,0,0,.5));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._widget-is-open_q714d_9{height:75vh;min-height:440px;width:calc(100vw - 2rem);--tw-translate-x: -1rem;--tw-translate-y: -.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._widget-is-open_q714d_9{height:65vh;width:15vw;min-width:440px;--tw-translate-x: 0px;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._widget-is-closed_q714d_13{height:0px;min-height:0px;width:0px;min-width:0px}._wallet-chat-widget__container_q714d_23{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;-moz-user-select:none;user-select:none}._wallet-chat-widget__container--open_q714d_27{bottom:0px;right:0px}@media (min-width: 640px){._wallet-chat-widget__container--open_q714d_27{bottom:.5rem;right:1.5rem}}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
