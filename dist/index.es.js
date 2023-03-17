import U from "react";
var Le = {}, Vr = {};
Vr.byteLength = Me;
Vr.toByteArray = $e;
Vr.fromByteArray = Je;
var er = [], H = [], je = typeof Uint8Array < "u" ? Uint8Array : Array, re = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var vr = 0, We = re.length; vr < We; ++vr)
  er[vr] = re[vr], H[re.charCodeAt(vr)] = vr;
H["-".charCodeAt(0)] = 62;
H["_".charCodeAt(0)] = 63;
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
function Ye(u, f, h) {
  return (f + h) * 3 / 4 - h;
}
function $e(u) {
  var f, h = ve(u), v = h[0], g = h[1], w = new je(Ye(u, v, g)), d = 0, a = g > 0 ? v - 4 : v, y;
  for (y = 0; y < a; y += 4)
    f = H[u.charCodeAt(y)] << 18 | H[u.charCodeAt(y + 1)] << 12 | H[u.charCodeAt(y + 2)] << 6 | H[u.charCodeAt(y + 3)], w[d++] = f >> 16 & 255, w[d++] = f >> 8 & 255, w[d++] = f & 255;
  return g === 2 && (f = H[u.charCodeAt(y)] << 2 | H[u.charCodeAt(y + 1)] >> 4, w[d++] = f & 255), g === 1 && (f = H[u.charCodeAt(y)] << 10 | H[u.charCodeAt(y + 1)] << 4 | H[u.charCodeAt(y + 2)] >> 2, w[d++] = f >> 8 & 255, w[d++] = f & 255), w;
}
function Ve(u) {
  return er[u >> 18 & 63] + er[u >> 12 & 63] + er[u >> 6 & 63] + er[u & 63];
}
function qe(u, f, h) {
  for (var v, g = [], w = f; w < h; w += 3)
    v = (u[w] << 16 & 16711680) + (u[w + 1] << 8 & 65280) + (u[w + 2] & 255), g.push(Ve(v));
  return g.join("");
}
function Je(u) {
  for (var f, h = u.length, v = h % 3, g = [], w = 16383, d = 0, a = h - v; d < a; d += w)
    g.push(qe(u, d, d + w > a ? a : d + w));
  return v === 1 ? (f = u[h - 1], g.push(
    er[f >> 2] + er[f << 4 & 63] + "=="
  )) : v === 2 && (f = (u[h - 2] << 8) + u[h - 1], g.push(
    er[f >> 10] + er[f >> 4 & 63] + er[f << 2 & 63] + "="
  )), g.join("");
}
var oe = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
oe.read = function(u, f, h, v, g) {
  var w, d, a = g * 8 - v - 1, y = (1 << a) - 1, T = y >> 1, x = -7, F = h ? g - 1 : 0, D = h ? -1 : 1, B = u[f + F];
  for (F += D, w = B & (1 << -x) - 1, B >>= -x, x += a; x > 0; w = w * 256 + u[f + F], F += D, x -= 8)
    ;
  for (d = w & (1 << -x) - 1, w >>= -x, x += v; x > 0; d = d * 256 + u[f + F], F += D, x -= 8)
    ;
  if (w === 0)
    w = 1 - T;
  else {
    if (w === y)
      return d ? NaN : (B ? -1 : 1) * (1 / 0);
    d = d + Math.pow(2, v), w = w - T;
  }
  return (B ? -1 : 1) * d * Math.pow(2, w - v);
};
oe.write = function(u, f, h, v, g, w) {
  var d, a, y, T = w * 8 - g - 1, x = (1 << T) - 1, F = x >> 1, D = g === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, B = v ? 0 : w - 1, j = v ? 1 : -1, P = f < 0 || f === 0 && 1 / f < 0 ? 1 : 0;
  for (f = Math.abs(f), isNaN(f) || f === 1 / 0 ? (a = isNaN(f) ? 1 : 0, d = x) : (d = Math.floor(Math.log(f) / Math.LN2), f * (y = Math.pow(2, -d)) < 1 && (d--, y *= 2), d + F >= 1 ? f += D / y : f += D * Math.pow(2, 1 - F), f * y >= 2 && (d++, y /= 2), d + F >= x ? (a = 0, d = x) : d + F >= 1 ? (a = (f * y - 1) * Math.pow(2, g), d = d + F) : (a = f * Math.pow(2, F - 1) * Math.pow(2, g), d = 0)); g >= 8; u[h + B] = a & 255, B += j, a /= 256, g -= 8)
    ;
  for (d = d << g | a, T += g; T > 0; u[h + B] = d & 255, B += j, d /= 256, T -= 8)
    ;
  u[h + B - j] |= P * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  var f = Vr, h = oe, v = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  u.Buffer = a, u.SlowBuffer = M, u.INSPECT_MAX_BYTES = 50;
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
    return y(t, r, e);
  }
  a.poolSize = 8192;
  function y(t, r, e) {
    if (typeof t == "string")
      return D(t, r);
    if (ArrayBuffer.isView(t))
      return j(t);
    if (t == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
      );
    if (J(t, ArrayBuffer) || t && J(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (J(t, SharedArrayBuffer) || t && J(t.buffer, SharedArrayBuffer)))
      return P(t, r, e);
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
    return y(t, r, e);
  }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
  function T(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function x(t, r, e) {
    return T(t), t <= 0 ? d(t) : r !== void 0 ? typeof e == "string" ? d(t).fill(r, e) : d(t).fill(r) : d(t);
  }
  a.alloc = function(t, r, e) {
    return x(t, r, e);
  };
  function F(t) {
    return T(t), d(t < 0 ? 0 : $(t) | 0);
  }
  a.allocUnsafe = function(t) {
    return F(t);
  }, a.allocUnsafeSlow = function(t) {
    return F(t);
  };
  function D(t, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !a.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var e = Sr(t, r) | 0, n = d(e), o = n.write(t, r);
    return o !== e && (n = n.slice(0, o)), n;
  }
  function B(t) {
    for (var r = t.length < 0 ? 0 : $(t.length) | 0, e = d(r), n = 0; n < r; n += 1)
      e[n] = t[n] & 255;
    return e;
  }
  function j(t) {
    if (J(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return P(r.buffer, r.byteOffset, r.byteLength);
    }
    return B(t);
  }
  function P(t, r, e) {
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
      return typeof t.length != "number" || _r(t.length) ? d(0) : B(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return B(t.data);
  }
  function $(t) {
    if (t >= g)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + g.toString(16) + " bytes");
    return t | 0;
  }
  function M(t) {
    return +t != t && (t = 0), a.alloc(+t);
  }
  a.isBuffer = function(r) {
    return r != null && r._isBuffer === !0 && r !== a.prototype;
  }, a.compare = function(r, e) {
    if (J(r, Uint8Array) && (r = a.from(r, r.offset, r.byteLength)), J(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)), !a.isBuffer(r) || !a.isBuffer(e))
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
      if (J(l, Uint8Array))
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
  function Sr(t, r) {
    if (a.isBuffer(t))
      return t.length;
    if (ArrayBuffer.isView(t) || J(t, ArrayBuffer))
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
          return Mr(t).length;
        default:
          if (o)
            return n ? -1 : cr(t).length;
          r = ("" + r).toLowerCase(), o = !0;
      }
  }
  a.byteLength = Sr;
  function Jr(t, r, e) {
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
          return Nr(this, r, e);
        case "latin1":
        case "binary":
          return Dr(this, r, e);
        case "base64":
          return K(this, r, e);
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
    return r === 0 ? "" : arguments.length === 0 ? Q(this, 0, r) : Jr.apply(this, arguments);
  }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(r) {
    if (!a.isBuffer(r))
      throw new TypeError("Argument must be a Buffer");
    return this === r ? !0 : a.compare(this, r) === 0;
  }, a.prototype.inspect = function() {
    var r = "", e = u.INSPECT_MAX_BYTES;
    return r = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (r += " ... "), "<Buffer " + r + ">";
  }, v && (a.prototype[v] = a.prototype.inspect), a.prototype.compare = function(r, e, n, o, c) {
    if (J(r, Uint8Array) && (r = a.from(r, r.offset, r.byteLength)), !a.isBuffer(r))
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
    for (var l = c - o, _ = n - e, A = Math.min(l, _), S = this.slice(o, c), W = r.slice(e, n), I = 0; I < A; ++I)
      if (S[I] !== W[I]) {
        l = S[I], _ = W[I];
        break;
      }
    return l < _ ? -1 : _ < l ? 1 : 0;
  };
  function Cr(t, r, e, n, o) {
    if (t.length === 0)
      return -1;
    if (typeof e == "string" ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, _r(e) && (e = o ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
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
    var c = 1, l = t.length, _ = r.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || r.length < 2)
        return -1;
      c = 2, l /= 2, _ /= 2, e /= 2;
    }
    function A(br, Fr) {
      return c === 1 ? br[Fr] : br.readUInt16BE(Fr * c);
    }
    var S;
    if (o) {
      var W = -1;
      for (S = e; S < l; S++)
        if (A(t, S) === A(r, W === -1 ? 0 : S - W)) {
          if (W === -1 && (W = S), S - W + 1 === _)
            return W * c;
        } else
          W !== -1 && (S -= S - W), W = -1;
    } else
      for (e + _ > l && (e = l - _), S = e; S >= 0; S--) {
        for (var I = !0, pr = 0; pr < _; pr++)
          if (A(t, S + pr) !== A(r, pr)) {
            I = !1;
            break;
          }
        if (I)
          return S;
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
  function zr(t, r, e, n) {
    e = Number(e) || 0;
    var o = t.length - e;
    n ? (n = Number(n), n > o && (n = o)) : n = o;
    var c = r.length;
    n > c / 2 && (n = c / 2);
    for (var l = 0; l < n; ++l) {
      var _ = parseInt(r.substr(l * 2, 2), 16);
      if (_r(_))
        return l;
      t[e + l] = _;
    }
    return l;
  }
  function Ur(t, r, e, n) {
    return fr(cr(r, t.length - e), t, e, n);
  }
  function Gr(t, r, e, n) {
    return fr(Er(r), t, e, n);
  }
  function Hr(t, r, e, n) {
    return fr(Mr(r), t, e, n);
  }
  function kr(t, r, e, n) {
    return fr(lr(r, t.length - e), t, e, n);
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
          return Ur(this, r, e, n);
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
          return kr(this, r, e, n);
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
    return r === 0 && e === t.length ? f.fromByteArray(t) : f.fromByteArray(t.slice(r, e));
  }
  function Q(t, r, e) {
    e = Math.min(t.length, e);
    for (var n = [], o = r; o < e; ) {
      var c = t[o], l = null, _ = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
      if (o + _ <= e) {
        var A, S, W, I;
        switch (_) {
          case 1:
            c < 128 && (l = c);
            break;
          case 2:
            A = t[o + 1], (A & 192) === 128 && (I = (c & 31) << 6 | A & 63, I > 127 && (l = I));
            break;
          case 3:
            A = t[o + 1], S = t[o + 2], (A & 192) === 128 && (S & 192) === 128 && (I = (c & 15) << 12 | (A & 63) << 6 | S & 63, I > 2047 && (I < 55296 || I > 57343) && (l = I));
            break;
          case 4:
            A = t[o + 1], S = t[o + 2], W = t[o + 3], (A & 192) === 128 && (S & 192) === 128 && (W & 192) === 128 && (I = (c & 15) << 18 | (A & 63) << 12 | (S & 63) << 6 | W & 63, I > 65535 && I < 1114112 && (l = I));
        }
      }
      l === null ? (l = 65533, _ = 1) : l > 65535 && (l -= 65536, n.push(l >>> 10 & 1023 | 55296), l = 56320 | l & 1023), n.push(l), o += _;
    }
    return Or(n);
  }
  var ur = 4096;
  function Or(t) {
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
  function Nr(t, r, e) {
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
      o += hr[t[c]];
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
    var l = 0, _ = 1, A = 0;
    for (this[e] = r & 255; ++l < n && (_ *= 256); )
      r < 0 && A === 0 && this[e + l - 1] !== 0 && (A = 1), this[e + l] = (r / _ >> 0) - A & 255;
    return e + n;
  }, a.prototype.writeIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var c = Math.pow(2, 8 * n - 1);
      Y(this, r, e, n, c - 1, -c);
    }
    var l = n - 1, _ = 1, A = 0;
    for (this[e + l] = r & 255; --l >= 0 && (_ *= 256); )
      r < 0 && A === 0 && this[e + l + 1] !== 0 && (A = 1), this[e + l] = (r / _ >> 0) - A & 255;
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
  function gr(t, r, e, n, o, c) {
    if (e + n > t.length)
      throw new RangeError("Index out of range");
    if (e < 0)
      throw new RangeError("Index out of range");
  }
  function jr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || gr(t, r, e, 4), h.write(t, r, e, n, 23, 4), e + 4;
  }
  a.prototype.writeFloatLE = function(r, e, n) {
    return jr(this, r, e, !0, n);
  }, a.prototype.writeFloatBE = function(r, e, n) {
    return jr(this, r, e, !1, n);
  };
  function Wr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || gr(t, r, e, 8), h.write(t, r, e, n, 52, 8), e + 8;
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
      var _ = a.isBuffer(r) ? r : a.from(r, o), A = _.length;
      if (A === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (l = 0; l < n - e; ++l)
        this[l + e] = _[l % A];
    }
    return this;
  };
  var mr = /[^+/0-9A-Za-z-_]/g;
  function xr(t) {
    if (t = t.split("=")[0], t = t.trim().replace(mr, ""), t.length < 2)
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
  function Er(t) {
    for (var r = [], e = 0; e < t.length; ++e)
      r.push(t.charCodeAt(e) & 255);
    return r;
  }
  function lr(t, r) {
    for (var e, n, o, c = [], l = 0; l < t.length && !((r -= 2) < 0); ++l)
      e = t.charCodeAt(l), n = e >> 8, o = e % 256, c.push(o), c.push(n);
    return c;
  }
  function Mr(t) {
    return f.toByteArray(xr(t));
  }
  function fr(t, r, e, n) {
    for (var o = 0; o < n && !(o + e >= r.length || o >= t.length); ++o)
      r[o + e] = t[o];
    return o;
  }
  function J(t, r) {
    return t instanceof r || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === r.name;
  }
  function _r(t) {
    return t !== t;
  }
  var hr = function() {
    for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
      for (var n = e * 16, o = 0; o < 16; ++o)
        r[n + o] = t[e] + t[o];
    return r;
  }();
})(Le);
var $r = {}, ze = {
  get exports() {
    return $r;
  },
  set exports(u) {
    $r = u;
  }
}, N = ze.exports = {}, Z, rr;
function te() {
  throw new Error("setTimeout has not been defined");
}
function ne() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Z = setTimeout : Z = te;
  } catch {
    Z = te;
  }
  try {
    typeof clearTimeout == "function" ? rr = clearTimeout : rr = ne;
  } catch {
    rr = ne;
  }
})();
function ye(u) {
  if (Z === setTimeout)
    return setTimeout(u, 0);
  if ((Z === te || !Z) && setTimeout)
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
  if ((rr === ne || !rr) && clearTimeout)
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
var or = [], yr = !1, sr, Yr = -1;
function He() {
  !yr || !sr || (yr = !1, sr.length ? or = sr.concat(or) : Yr = -1, or.length && ge());
}
function ge() {
  if (!yr) {
    var u = ye(He);
    yr = !0;
    for (var f = or.length; f; ) {
      for (sr = or, or = []; ++Yr < f; )
        sr && sr[Yr].run();
      Yr = -1, f = or.length;
    }
    sr = null, yr = !1, Ge(u);
  }
}
N.nextTick = function(u) {
  var f = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var h = 1; h < arguments.length; h++)
      f[h - 1] = arguments[h];
  or.push(new me(u, f)), or.length === 1 && !yr && ye(ge);
};
function me(u, f) {
  this.fun = u, this.array = f;
}
me.prototype.run = function() {
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
var Ir = {}, Xe = {
  get exports() {
    return Ir;
  },
  set exports(u) {
    Ir = u;
  }
}, Rr = {};
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
function Ke() {
  if (pe)
    return Rr;
  pe = 1;
  var u = U, f = Symbol.for("react.element"), h = Symbol.for("react.fragment"), v = Object.prototype.hasOwnProperty, g = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(a, y, T) {
    var x, F = {}, D = null, B = null;
    T !== void 0 && (D = "" + T), y.key !== void 0 && (D = "" + y.key), y.ref !== void 0 && (B = y.ref);
    for (x in y)
      v.call(y, x) && !w.hasOwnProperty(x) && (F[x] = y[x]);
    if (a && a.defaultProps)
      for (x in y = a.defaultProps, y)
        F[x] === void 0 && (F[x] = y[x]);
    return { $$typeof: f, type: a, key: D, ref: B, props: F, _owner: g.current };
  }
  return Rr.Fragment = h, Rr.jsx = d, Rr.jsxs = d, Rr;
}
var Tr = {}, de;
function Qe() {
  return de || (de = 1, $r.env.NODE_ENV !== "production" && function() {
    var u = U, f = Symbol.for("react.element"), h = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), a = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), x = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), B = Symbol.for("react.offscreen"), j = Symbol.iterator, P = "@@iterator";
    function X(i) {
      if (i === null || typeof i != "object")
        return null;
      var s = j && i[j] || i[P];
      return typeof s == "function" ? s : null;
    }
    var $ = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function M(i) {
      {
        for (var s = arguments.length, p = new Array(s > 1 ? s - 1 : 0), m = 1; m < s; m++)
          p[m - 1] = arguments[m];
        Sr("error", i, p);
      }
    }
    function Sr(i, s, p) {
      {
        var m = $.ReactDebugCurrentFrame, R = m.getStackAddendum();
        R !== "" && (s += "%s", p = p.concat([R]));
        var C = p.map(function(b) {
          return String(b);
        });
        C.unshift("Warning: " + s), Function.prototype.apply.call(console[i], console, C);
      }
    }
    var Jr = !1, tr = !1, Cr = !1, Br = !1, zr = !1, Ur;
    Ur = Symbol.for("react.module.reference");
    function Gr(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === v || i === w || zr || i === g || i === T || i === x || Br || i === B || Jr || tr || Cr || typeof i == "object" && i !== null && (i.$$typeof === D || i.$$typeof === F || i.$$typeof === d || i.$$typeof === a || i.$$typeof === y || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === Ur || i.getModuleId !== void 0));
    }
    function Hr(i, s, p) {
      var m = i.displayName;
      if (m)
        return m;
      var R = s.displayName || s.name || "";
      return R !== "" ? p + "(" + R + ")" : p;
    }
    function kr(i) {
      return i.displayName || "Context";
    }
    function K(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && M("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
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
        case g:
          return "StrictMode";
        case T:
          return "Suspense";
        case x:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case a:
            var s = i;
            return kr(s) + ".Consumer";
          case d:
            var p = i;
            return kr(p._context) + ".Provider";
          case y:
            return Hr(i, i.render, "ForwardRef");
          case F:
            var m = i.displayName || null;
            return m !== null ? m : K(i.type) || "Memo";
          case D: {
            var R = i, C = R._payload, b = R._init;
            try {
              return K(b(C));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Q = Object.assign, ur = 0, Or, Nr, Dr, Pr, Lr, k, Y;
    function gr() {
    }
    gr.__reactDisabledLog = !0;
    function jr() {
      {
        if (ur === 0) {
          Or = console.log, Nr = console.info, Dr = console.warn, Pr = console.error, Lr = console.group, k = console.groupCollapsed, Y = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: gr,
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
    function Wr() {
      {
        if (ur--, ur === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Q({}, i, {
              value: Or
            }),
            info: Q({}, i, {
              value: Nr
            }),
            warn: Q({}, i, {
              value: Dr
            }),
            error: Q({}, i, {
              value: Pr
            }),
            group: Q({}, i, {
              value: Lr
            }),
            groupCollapsed: Q({}, i, {
              value: k
            }),
            groupEnd: Q({}, i, {
              value: Y
            })
          });
        }
        ur < 0 && M("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mr = $.ReactCurrentDispatcher, xr;
    function cr(i, s, p) {
      {
        if (xr === void 0)
          try {
            throw Error();
          } catch (R) {
            var m = R.stack.trim().match(/\n( *(at )?)/);
            xr = m && m[1] || "";
          }
        return `
` + xr + i;
      }
    }
    var Er = !1, lr;
    {
      var Mr = typeof WeakMap == "function" ? WeakMap : Map;
      lr = new Mr();
    }
    function fr(i, s) {
      if (!i || Er)
        return "";
      {
        var p = lr.get(i);
        if (p !== void 0)
          return p;
      }
      var m;
      Er = !0;
      var R = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var C;
      C = mr.current, mr.current = null, jr();
      try {
        if (s) {
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
                    var z = `
` + E[O].replace(" at new ", " at ");
                    return i.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", i.displayName)), typeof i == "function" && lr.set(i, z), z;
                  }
                while (O >= 1 && L >= 0);
              break;
            }
        }
      } finally {
        Er = !1, mr.current = C, Wr(), Error.prepareStackTrace = R;
      }
      var wr = i ? i.displayName || i.name : "", he = wr ? cr(wr) : "";
      return typeof i == "function" && lr.set(i, he), he;
    }
    function J(i, s, p) {
      return fr(i, !1);
    }
    function _r(i) {
      var s = i.prototype;
      return !!(s && s.isReactComponent);
    }
    function hr(i, s, p) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return fr(i, _r(i));
      if (typeof i == "string")
        return cr(i);
      switch (i) {
        case T:
          return cr("Suspense");
        case x:
          return cr("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case y:
            return J(i.render);
          case F:
            return hr(i.type, s, p);
          case D: {
            var m = i, R = m._payload, C = m._init;
            try {
              return hr(C(R), s, p);
            } catch {
            }
          }
        }
      return "";
    }
    var t = Object.prototype.hasOwnProperty, r = {}, e = $.ReactDebugCurrentFrame;
    function n(i) {
      if (i) {
        var s = i._owner, p = hr(i.type, i._source, s ? s.type : null);
        e.setExtraStackFrame(p);
      } else
        e.setExtraStackFrame(null);
    }
    function o(i, s, p, m, R) {
      {
        var C = Function.call.bind(t);
        for (var b in i)
          if (C(i, b)) {
            var E = void 0;
            try {
              if (typeof i[b] != "function") {
                var V = Error((m || "React class") + ": " + p + " type `" + b + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[b] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw V.name = "Invariant Violation", V;
              }
              E = i[b](s, b, m, p, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (O) {
              E = O;
            }
            E && !(E instanceof Error) && (n(R), M("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", p, b, typeof E), n(null)), E instanceof Error && !(E.message in r) && (r[E.message] = !0, n(R), M("Failed %s type: %s", p, E.message), n(null));
          }
      }
    }
    var c = Array.isArray;
    function l(i) {
      return c(i);
    }
    function _(i) {
      {
        var s = typeof Symbol == "function" && Symbol.toStringTag, p = s && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return p;
      }
    }
    function A(i) {
      try {
        return S(i), !1;
      } catch {
        return !0;
      }
    }
    function S(i) {
      return "" + i;
    }
    function W(i) {
      if (A(i))
        return M("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", _(i)), S(i);
    }
    var I = $.ReactCurrentOwner, pr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, br, Fr, Xr;
    Xr = {};
    function be(i) {
      if (t.call(i, "ref")) {
        var s = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (s && s.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function Fe(i) {
      if (t.call(i, "key")) {
        var s = Object.getOwnPropertyDescriptor(i, "key").get;
        if (s && s.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function Re(i, s) {
      if (typeof i.ref == "string" && I.current && s && I.current.stateNode !== s) {
        var p = K(I.current.type);
        Xr[p] || (M('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', K(I.current.type), i.ref), Xr[p] = !0);
      }
    }
    function Te(i, s) {
      {
        var p = function() {
          br || (br = !0, M("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        p.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: p,
          configurable: !0
        });
      }
    }
    function Ae(i, s) {
      {
        var p = function() {
          Fr || (Fr = !0, M("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        p.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: p,
          configurable: !0
        });
      }
    }
    var Ie = function(i, s, p, m, R, C, b) {
      var E = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: f,
        // Built-in properties that belong on the element
        type: i,
        key: s,
        ref: p,
        props: b,
        // Record the component responsible for creating this element.
        _owner: C
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
    function Se(i, s, p, m, R) {
      {
        var C, b = {}, E = null, V = null;
        p !== void 0 && (W(p), E = "" + p), Fe(s) && (W(s.key), E = "" + s.key), be(s) && (V = s.ref, Re(s, R));
        for (C in s)
          t.call(s, C) && !pr.hasOwnProperty(C) && (b[C] = s[C]);
        if (i && i.defaultProps) {
          var O = i.defaultProps;
          for (C in O)
            b[C] === void 0 && (b[C] = O[C]);
        }
        if (E || V) {
          var L = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          E && Te(b, L), V && Ae(b, L);
        }
        return Ie(i, E, V, R, m, I.current, b);
      }
    }
    var Kr = $.ReactCurrentOwner, ae = $.ReactDebugCurrentFrame;
    function dr(i) {
      if (i) {
        var s = i._owner, p = hr(i.type, i._source, s ? s.type : null);
        ae.setExtraStackFrame(p);
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
          var i = K(Kr.current.type);
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
          var s = i.fileName.replace(/^.*[\\\/]/, ""), p = i.lineNumber;
          return `

Check your code at ` + s + ":" + p + ".";
        }
        return "";
      }
    }
    var ce = {};
    function Be(i) {
      {
        var s = ue();
        if (!s) {
          var p = typeof i == "string" ? i : i.displayName || i.name;
          p && (s = `

Check the top-level render call using <` + p + ">.");
        }
        return s;
      }
    }
    function fe(i, s) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var p = Be(s);
        if (ce[p])
          return;
        ce[p] = !0;
        var m = "";
        i && i._owner && i._owner !== Kr.current && (m = " It was passed a child from " + K(i._owner.type) + "."), dr(i), M('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', p, m), dr(null);
      }
    }
    function se(i, s) {
      {
        if (typeof i != "object")
          return;
        if (l(i))
          for (var p = 0; p < i.length; p++) {
            var m = i[p];
            Zr(m) && fe(m, s);
          }
        else if (Zr(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var R = X(i);
          if (typeof R == "function" && R !== i.entries)
            for (var C = R.call(i), b; !(b = C.next()).done; )
              Zr(b.value) && fe(b.value, s);
        }
      }
    }
    function Ue(i) {
      {
        var s = i.type;
        if (s == null || typeof s == "string")
          return;
        var p;
        if (typeof s == "function")
          p = s.propTypes;
        else if (typeof s == "object" && (s.$$typeof === y || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        s.$$typeof === F))
          p = s.propTypes;
        else
          return;
        if (p) {
          var m = K(s);
          o(p, i.props, "prop", m, i);
        } else if (s.PropTypes !== void 0 && !Qr) {
          Qr = !0;
          var R = K(s);
          M("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", R || "Unknown");
        }
        typeof s.getDefaultProps == "function" && !s.getDefaultProps.isReactClassApproved && M("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ke(i) {
      {
        for (var s = Object.keys(i.props), p = 0; p < s.length; p++) {
          var m = s[p];
          if (m !== "children" && m !== "key") {
            dr(i), M("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), dr(null);
            break;
          }
        }
        i.ref !== null && (dr(i), M("Invalid attribute `ref` supplied to `React.Fragment`."), dr(null));
      }
    }
    function le(i, s, p, m, R, C) {
      {
        var b = Gr(i);
        if (!b) {
          var E = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var V = Ce(R);
          V ? E += V : E += ue();
          var O;
          i === null ? O = "null" : l(i) ? O = "array" : i !== void 0 && i.$$typeof === f ? (O = "<" + (K(i.type) || "Unknown") + " />", E = " Did you accidentally export a JSX literal instead of a component?") : O = typeof i, M("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", O, E);
        }
        var L = Se(i, s, p, R, C);
        if (L == null)
          return L;
        if (b) {
          var z = s.children;
          if (z !== void 0)
            if (m)
              if (l(z)) {
                for (var wr = 0; wr < z.length; wr++)
                  se(z[wr], i);
                Object.freeze && Object.freeze(z);
              } else
                M("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              se(z, i);
        }
        return i === v ? ke(L) : Ue(L), L;
      }
    }
    function Oe(i, s, p) {
      return le(i, s, p, !0);
    }
    function Ne(i, s, p) {
      return le(i, s, p, !1);
    }
    var De = Ne, Pe = Oe;
    Tr.Fragment = v, Tr.jsx = De, Tr.jsxs = Pe;
  }()), Tr;
}
(function(u) {
  $r.env.NODE_ENV === "production" ? u.exports = Ke() : u.exports = Qe();
})(Xe);
const Ze = Ir.Fragment, q = Ir.jsx, Ar = Ir.jsxs;
var ie = {}, rt = {
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
      for (var v = [], g = 0; g < arguments.length; g++) {
        var w = arguments[g];
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
            for (var y in w)
              f.call(w, y) && w[y] && v.push(y);
          }
        }
      }
      return v.join(" ");
    }
    u.exports ? (h.default = h, u.exports = h) : window.classNames = h;
  })();
})(rt);
const ee = ie, qr = U.createContext(null);
function yt({
  children: u
}) {
  const [f, h] = U.useState(), v = U.useCallback(
    (w, d) => h((a) => ({ ...a, [w]: d })),
    []
  ), g = U.useMemo(
    () => ({
      widgetState: f || null,
      setWidgetState: v
    }),
    [f, v]
  );
  return /* @__PURE__ */ q(qr.Provider, { value: g, children: u });
}
const et = "_ring_1u7ve_43", tt = "_popupButton__container_1u7ve_5", nt = "_popupButton_1u7ve_5", it = "_icon_1u7ve_19", ot = "_inactiveIcon_1u7ve_27", at = "_activeIcon_1u7ve_31", ut = "_notif_1u7ve_35", ct = "_pinging_1u7ve_39", ft = "_ping_1u7ve_39", G = {
  ring: et,
  popupButton__container: tt,
  popupButton: nt,
  icon: it,
  inactiveIcon: ot,
  activeIcon: at,
  notif: ut,
  pinging: ct,
  ping: ft
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
function lt({
  notiVal: u,
  showNoti: f,
  isOpen: h,
  clickHandler: v
}) {
  const g = xe(), w = U.useContext(qr), d = w == null ? void 0 : w.widgetState, a = d == null ? void 0 : d.foundNft, y = a && JSON.parse(a).itemId, T = !h && (a ? !g.includes(a) && Boolean(y) : !1), [x, F] = U.useState(T);
  return U.useEffect(() => {
    T && F(!0);
  }, [T]), /* @__PURE__ */ Ar("div", { className: G.popupButton__container, children: [
    /* @__PURE__ */ q(
      "span",
      {
        className: x ? G.ring : void 0,
        style: { boxShadow: "none" }
      }
    ),
    /* @__PURE__ */ Ar(
      "button",
      {
        className: G.popupButton,
        type: "button",
        onClick: (D) => {
          F(!1), a && st(a), v(D);
        },
        children: [
          /* @__PURE__ */ q(
            "div",
            {
              className: ee(G.icon, {
                [G.activeIcon]: !h,
                [G.inactiveIcon]: h
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
              className: ee(G.icon, {
                [G.activeIcon]: h,
                [G.inactiveIcon]: !h
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
    f && /* @__PURE__ */ Ar(Ze, { children: [
      /* @__PURE__ */ q("span", { className: ee(G.notif, G.pinging) }),
      /* @__PURE__ */ q("span", { className: G.notif, children: u })
    ] })
  ] });
}
function we(u) {
  const h = u.replace("https://", "").replace("http://", "").split("/"), v = h.length, g = h[v - 1], w = h[v - 2];
  if (u.startsWith("looksrare.org"))
    return { itemId: g, contractAddress: w, chain: "ethereum" };
  const d = h[v - 3];
  return v >= 5 ? { itemId: g, contractAddress: w, network: d } : u.startsWith("x2y2.io") && d === "eth" ? { itemId: g, contractAddress: w, network: "ethereum" } : { contractAddress: null, itemId: null, network: null };
}
const ht = "_ring_1jmwq_1", Ee = {
  ring: ht,
  "wallet-chat-widget": "_wallet-chat-widget_1jmwq_15",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_1jmwq_15"
}, pt = "http://localhost:5173", _e = Ee["wallet-chat-widget"];
function ir(u) {
  var h;
  if (typeof document > "u")
    return;
  const f = document == null ? void 0 : document.getElementById(_e);
  (h = f == null ? void 0 : f.contentWindow) == null || h.postMessage(u, "*");
}
function dt(u) {
  if (typeof u < "u" && u !== null) {
    const f = Boolean(u === window.ethereum);
    ir(f ? {
      target: "sign_in",
      data: { isInjected: f }
    } : {
      target: "sign_in",
      data: {
        connectorOptions: {
          projectId: u.connector._clientId.toString(),
          address: u.connector._accounts[0],
          chainId: u.connector._chainId
        }
      }
    });
  } else
    ir({ target: "sign_in", data: null });
}
function gt({ provider: u }) {
  const f = U.useRef(""), h = U.useRef(null), v = U.useRef(!1), g = U.useRef(!1), w = U.useContext(qr), { widgetState: d, setWidgetState: a } = w || {}, { ownerAddress: y } = d || {}, [T, x] = U.useState(g.current), [F, D] = U.useState(0), B = () => {
    x((j) => {
      const P = Boolean(j);
      return ir({ target: "widget_open", data: !P }), h.current && !P && ir({ ...h.current, redirect: !0 }), h.current = null, g.current = !P, !P;
    });
  };
  return U.useEffect(() => {
    T && !v.current && dt(u || null);
  }, [u, T]), U.useEffect(() => {
    if (!(y != null && y.address))
      return;
    const j = y.address, P = we(window.location.href);
    P.network && (h.current = {
      ...P,
      ownerAddress: j
    }), h.current ? ir({ ...h.current, redirect: !0 }) : ir({ ownerAddress: j }), x(!0);
  }, [y]), U.useEffect(() => {
    const j = () => {
      if (window.location.href === f.current)
        return;
      f.current = window.location.href;
      const $ = we(window.location.href);
      a && a("foundNft", JSON.stringify($)), $.network && (h.current = $), ir($);
    }, P = new MutationObserver(j), X = { subtree: !0, childList: !0 };
    return j(), P.observe(document, X), () => P.disconnect();
  }, []), U.useEffect(() => {
    const j = (P) => {
      const { data: X } = P;
      X.target === "unread_cnt" && D(X.data), X.closeWidget && B(), X.target === "sign_in" && a && (v.current = X.data), g.current && ir({ target: "widget_open", data: !0 });
    };
    return window.addEventListener("message", j), () => window.removeEventListener("message", j);
  }, []), /* @__PURE__ */ Ar("div", { className: Ee["wallet-chat-widget__container"], children: [
    /* @__PURE__ */ q(
      "iframe",
      {
        title: "WalletChat",
        name: "WalletChat",
        id: _e,
        style: {
          height: T ? "60vh" : "0px",
          width: T ? "15vw" : "0px",
          minHeight: T ? "440px" : "0px",
          minWidth: T ? "440px" : "0px"
        },
        src: pt
      }
    ),
    /* @__PURE__ */ q(
      lt,
      {
        notiVal: F,
        showNoti: F > 0,
        isOpen: T,
        clickHandler: B
      }
    )
  ] });
}
const wt = ({
  onClick: u,
  children: f
}) => /* @__PURE__ */ q("button", { type: "button", onClick: u, children: f }), mt = ({
  ownerAddress: u,
  render: f
}) => {
  const h = U.useContext(qr), v = h == null ? void 0 : h.setWidgetState, g = f ? ({ onClick: w, children: d }) => U.cloneElement(f, { onClick: w }, d) : wt;
  return h ? /* @__PURE__ */ Ar(
    g,
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
  mt as ChatWithOwner,
  yt as WalletChatProvider,
  gt as WalletChatWidget
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._ring_1u7ve_43{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._popupButton__container_1u7ve_5{position:relative;margin-top:.75rem;height:4rem;--tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / .15));-webkit-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._popupButton_1u7ve_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;-webkit-transform-origin:center;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}._icon_1u7ve_19{transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_1u7ve_19 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_1u7ve_27{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_1u7ve_31{--tw-rotate: 0deg;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_1u7ve_35{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(219 39 119 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}@-webkit-keyframes _ping_1u7ve_39{75%,to{-webkit-transform:scale(2);transform:scale(2);opacity:0}}._pinging_1u7ve_39{-webkit-animation:_ping_1u7ve_39 1s cubic-bezier(0,0,.2,1) infinite;animation:_ping_1u7ve_39 1s cubic-bezier(0,0,.2,1) infinite}._ring_1u7ve_43{position:fixed;right:0px;display:inline-flex;height:4rem;width:4rem}@keyframes _ping_1u7ve_39{75%,to{-webkit-transform:scale(2);transform:scale(2);opacity:0}}._ring_1u7ve_43{-webkit-animation:_ping_1u7ve_39 1s cubic-bezier(0,0,.2,1) infinite;animation:_ping_1u7ve_39 1s cubic-bezier(0,0,.2,1) infinite;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity));opacity:.75}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::-webkit-backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._ring_1jmwq_1{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}#_wallet-chat-widget_1jmwq_15{transition-property:width,min-width,height,min-height;transition-duration:.25s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(4px 4px 8px rgba(0,0,0,.5));-webkit-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._wallet-chat-widget__container_1jmwq_15{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;user-select:none}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
