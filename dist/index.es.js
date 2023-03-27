import U from "react";
function ne(u) {
  const p = u.replace("https://", "").replace("http://", "").split("/"), y = p.length, g = p[y - 1], w = p[y - 2];
  if (u.startsWith("looksrare.org"))
    return { itemId: g, contractAddress: w, network: "ethereum" };
  const d = p[y - 3];
  return y >= 5 ? { itemId: g, contractAddress: w, network: d } : u.startsWith("x2y2.io") && d === "eth" ? { itemId: g, contractAddress: w, network: "ethereum" } : { contractAddress: null, itemId: null, network: null };
}
const vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseNftFromUrl: ne
}, Symbol.toStringTag, { value: "Module" }));
var Pe = {}, Jr = {};
Jr.byteLength = We;
Jr.toByteArray = $e;
Jr.fromByteArray = Je;
var er = [], H = [], Le = typeof Uint8Array < "u" ? Uint8Array : Array, te = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var yr = 0, Me = te.length; yr < Me; ++yr)
  er[yr] = te[yr], H[te.charCodeAt(yr)] = yr;
H["-".charCodeAt(0)] = 62;
H["_".charCodeAt(0)] = 63;
function ve(u) {
  var f = u.length;
  if (f % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var p = u.indexOf("=");
  p === -1 && (p = f);
  var y = p === f ? 0 : 4 - p % 4;
  return [p, y];
}
function We(u) {
  var f = ve(u), p = f[0], y = f[1];
  return (p + y) * 3 / 4 - y;
}
function Ye(u, f, p) {
  return (f + p) * 3 / 4 - p;
}
function $e(u) {
  var f, p = ve(u), y = p[0], g = p[1], w = new Le(Ye(u, y, g)), d = 0, a = g > 0 ? y - 4 : y, v;
  for (v = 0; v < a; v += 4)
    f = H[u.charCodeAt(v)] << 18 | H[u.charCodeAt(v + 1)] << 12 | H[u.charCodeAt(v + 2)] << 6 | H[u.charCodeAt(v + 3)], w[d++] = f >> 16 & 255, w[d++] = f >> 8 & 255, w[d++] = f & 255;
  return g === 2 && (f = H[u.charCodeAt(v)] << 2 | H[u.charCodeAt(v + 1)] >> 4, w[d++] = f & 255), g === 1 && (f = H[u.charCodeAt(v)] << 10 | H[u.charCodeAt(v + 1)] << 4 | H[u.charCodeAt(v + 2)] >> 2, w[d++] = f >> 8 & 255, w[d++] = f & 255), w;
}
function Ve(u) {
  return er[u >> 18 & 63] + er[u >> 12 & 63] + er[u >> 6 & 63] + er[u & 63];
}
function qe(u, f, p) {
  for (var y, g = [], w = f; w < p; w += 3)
    y = (u[w] << 16 & 16711680) + (u[w + 1] << 8 & 65280) + (u[w + 2] & 255), g.push(Ve(y));
  return g.join("");
}
function Je(u) {
  for (var f, p = u.length, y = p % 3, g = [], w = 16383, d = 0, a = p - y; d < a; d += w)
    g.push(qe(u, d, d + w > a ? a : d + w));
  return y === 1 ? (f = u[p - 1], g.push(
    er[f >> 2] + er[f << 4 & 63] + "=="
  )) : y === 2 && (f = (u[p - 2] << 8) + u[p - 1], g.push(
    er[f >> 10] + er[f >> 4 & 63] + er[f << 2 & 63] + "="
  )), g.join("");
}
var ue = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ue.read = function(u, f, p, y, g) {
  var w, d, a = g * 8 - y - 1, v = (1 << a) - 1, A = v >> 1, x = -7, F = p ? g - 1 : 0, j = p ? -1 : 1, B = u[f + F];
  for (F += j, w = B & (1 << -x) - 1, B >>= -x, x += a; x > 0; w = w * 256 + u[f + F], F += j, x -= 8)
    ;
  for (d = w & (1 << -x) - 1, w >>= -x, x += y; x > 0; d = d * 256 + u[f + F], F += j, x -= 8)
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
ue.write = function(u, f, p, y, g, w) {
  var d, a, v, A = w * 8 - g - 1, x = (1 << A) - 1, F = x >> 1, j = g === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, B = y ? 0 : w - 1, L = y ? 1 : -1, D = f < 0 || f === 0 && 1 / f < 0 ? 1 : 0;
  for (f = Math.abs(f), isNaN(f) || f === 1 / 0 ? (a = isNaN(f) ? 1 : 0, d = x) : (d = Math.floor(Math.log(f) / Math.LN2), f * (v = Math.pow(2, -d)) < 1 && (d--, v *= 2), d + F >= 1 ? f += j / v : f += j * Math.pow(2, 1 - F), f * v >= 2 && (d++, v /= 2), d + F >= x ? (a = 0, d = x) : d + F >= 1 ? (a = (f * v - 1) * Math.pow(2, g), d = d + F) : (a = f * Math.pow(2, F - 1) * Math.pow(2, g), d = 0)); g >= 8; u[p + B] = a & 255, B += L, a /= 256, g -= 8)
    ;
  for (d = d << g | a, A += g; A > 0; u[p + B] = d & 255, B += L, d /= 256, A -= 8)
    ;
  u[p + B - L] |= D * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  var f = Jr, p = ue, y = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
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
      return j(t, r);
    if (ArrayBuffer.isView(t))
      return L(t);
    if (t == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
      );
    if (z(t, ArrayBuffer) || t && z(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (z(t, SharedArrayBuffer) || t && z(t.buffer, SharedArrayBuffer)))
      return D(t, r, e);
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
  function j(t, r) {
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
  function L(t) {
    if (z(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return D(r.buffer, r.byteOffset, r.byteLength);
    }
    return B(t);
  }
  function D(t, r, e) {
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
          return ur(t).length;
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
            return n ? -1 : ur(t).length;
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
          return Lr(this, r, e);
        case "utf8":
        case "utf-8":
          return Q(this, r, e);
        case "ascii":
          return Dr(this, r, e);
        case "latin1":
        case "binary":
          return Pr(this, r, e);
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
        for (var C = !0, hr = 0; hr < _; hr++)
          if (T(t, S + hr) !== T(r, hr)) {
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
    return cr(ur(r, t.length - e), t, e, n);
  }
  function Xr(t, r, e, n) {
    return cr(_r(r), t, e, n);
  }
  function Kr(t, r, e, n) {
    return cr($r(r), t, e, n);
  }
  function Nr(t, r, e, n) {
    return cr(lr(r, t.length - e), t, e, n);
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
    return r === 0 && e === t.length ? f.fromByteArray(t) : f.fromByteArray(t.slice(r, e));
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
    return jr(n);
  }
  var ar = 4096;
  function jr(t) {
    var r = t.length;
    if (r <= ar)
      return String.fromCharCode.apply(String, t);
    for (var e = "", n = 0; n < r; )
      e += String.fromCharCode.apply(
        String,
        t.slice(n, n += ar)
      );
    return e;
  }
  function Dr(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var o = r; o < e; ++o)
      n += String.fromCharCode(t[o] & 127);
    return n;
  }
  function Pr(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var o = r; o < e; ++o)
      n += String.fromCharCode(t[o]);
    return n;
  }
  function Lr(t, r, e) {
    var n = t.length;
    (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
    for (var o = "", c = r; c < e; ++c)
      o += pr[t[c]];
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
    return r = r >>> 0, e || k(r, 4, this.length), p.read(this, r, !0, 23, 4);
  }, a.prototype.readFloatBE = function(r, e) {
    return r = r >>> 0, e || k(r, 4, this.length), p.read(this, r, !1, 23, 4);
  }, a.prototype.readDoubleLE = function(r, e) {
    return r = r >>> 0, e || k(r, 8, this.length), p.read(this, r, !0, 52, 8);
  }, a.prototype.readDoubleBE = function(r, e) {
    return r = r >>> 0, e || k(r, 8, this.length), p.read(this, r, !1, 52, 8);
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
    return r = +r, e = e >>> 0, o || mr(t, r, e, 4), p.write(t, r, e, n, 23, 4), e + 4;
  }
  a.prototype.writeFloatLE = function(r, e, n) {
    return Wr(this, r, e, !0, n);
  }, a.prototype.writeFloatBE = function(r, e, n) {
    return Wr(this, r, e, !1, n);
  };
  function Yr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || mr(t, r, e, 8), p.write(t, r, e, n, 52, 8), e + 8;
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
  function ur(t, r) {
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
    return f.toByteArray(Er(t));
  }
  function cr(t, r, e, n) {
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
  var pr = function() {
    for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
      for (var n = e * 16, o = 0; o < 16; ++o)
        r[n + o] = t[e] + t[o];
    return r;
  }();
})(Pe);
var qr = {}, ze = {
  get exports() {
    return qr;
  },
  set exports(u) {
    qr = u;
  }
}, N = ze.exports = {}, Z, rr;
function ie() {
  throw new Error("setTimeout has not been defined");
}
function oe() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Z = setTimeout : Z = ie;
  } catch {
    Z = ie;
  }
  try {
    typeof clearTimeout == "function" ? rr = clearTimeout : rr = oe;
  } catch {
    rr = oe;
  }
})();
function ge(u) {
  if (Z === setTimeout)
    return setTimeout(u, 0);
  if ((Z === ie || !Z) && setTimeout)
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
  if ((rr === oe || !rr) && clearTimeout)
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
var ir = [], gr = !1, fr, Vr = -1;
function He() {
  !gr || !fr || (gr = !1, fr.length ? ir = fr.concat(ir) : Vr = -1, ir.length && me());
}
function me() {
  if (!gr) {
    var u = ge(He);
    gr = !0;
    for (var f = ir.length; f; ) {
      for (fr = ir, ir = []; ++Vr < f; )
        fr && fr[Vr].run();
      Vr = -1, f = ir.length;
    }
    fr = null, gr = !1, Ge(u);
  }
}
N.nextTick = function(u) {
  var f = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var p = 1; p < arguments.length; p++)
      f[p - 1] = arguments[p];
  ir.push(new xe(u, f)), ir.length === 1 && !gr && ge(me);
};
function xe(u, f) {
  this.fun = u, this.array = f;
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
function or() {
}
N.on = or;
N.addListener = or;
N.once = or;
N.off = or;
N.removeListener = or;
N.removeAllListeners = or;
N.emit = or;
N.prependListener = or;
N.prependOnceListener = or;
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
    var y = this || self;
    return delete u.prototype.__magic__, y;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return f();
  u.defineProperty(u.prototype, "__magic__", {
    configurable: !0,
    get: f
  });
  var p = __magic__;
  return p;
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
var we;
function Ke() {
  if (we)
    return Tr;
  we = 1;
  var u = U, f = Symbol.for("react.element"), p = Symbol.for("react.fragment"), y = Object.prototype.hasOwnProperty, g = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(a, v, A) {
    var x, F = {}, j = null, B = null;
    A !== void 0 && (j = "" + A), v.key !== void 0 && (j = "" + v.key), v.ref !== void 0 && (B = v.ref);
    for (x in v)
      y.call(v, x) && !w.hasOwnProperty(x) && (F[x] = v[x]);
    if (a && a.defaultProps)
      for (x in v = a.defaultProps, v)
        F[x] === void 0 && (F[x] = v[x]);
    return { $$typeof: f, type: a, key: j, ref: B, props: F, _owner: g.current };
  }
  return Tr.Fragment = p, Tr.jsx = d, Tr.jsxs = d, Tr;
}
var Ar = {}, ye;
function Qe() {
  return ye || (ye = 1, qr.env.NODE_ENV !== "production" && function() {
    var u = U, f = Symbol.for("react.element"), p = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), a = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), A = Symbol.for("react.suspense"), x = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), B = Symbol.for("react.offscreen"), L = Symbol.iterator, D = "@@iterator";
    function X(i) {
      if (i === null || typeof i != "object")
        return null;
      var s = L && i[L] || i[D];
      return typeof s == "function" ? s : null;
    }
    var $ = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function W(i) {
      {
        for (var s = arguments.length, h = new Array(s > 1 ? s - 1 : 0), m = 1; m < s; m++)
          h[m - 1] = arguments[m];
        Br("error", i, h);
      }
    }
    function Br(i, s, h) {
      {
        var m = $.ReactDebugCurrentFrame, R = m.getStackAddendum();
        R !== "" && (s += "%s", h = h.concat([R]));
        var I = h.map(function(b) {
          return String(b);
        });
        I.unshift("Warning: " + s), Function.prototype.apply.call(console[i], console, I);
      }
    }
    var Gr = !1, tr = !1, Ur = !1, kr = !1, Hr = !1, Or;
    Or = Symbol.for("react.module.reference");
    function Xr(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === y || i === w || Hr || i === g || i === A || i === x || kr || i === B || Gr || tr || Ur || typeof i == "object" && i !== null && (i.$$typeof === j || i.$$typeof === F || i.$$typeof === d || i.$$typeof === a || i.$$typeof === v || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === Or || i.getModuleId !== void 0));
    }
    function Kr(i, s, h) {
      var m = i.displayName;
      if (m)
        return m;
      var R = s.displayName || s.name || "";
      return R !== "" ? h + "(" + R + ")" : h;
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
        case p:
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
            var s = i;
            return Nr(s) + ".Consumer";
          case d:
            var h = i;
            return Nr(h._context) + ".Provider";
          case v:
            return Kr(i, i.render, "ForwardRef");
          case F:
            var m = i.displayName || null;
            return m !== null ? m : K(i.type) || "Memo";
          case j: {
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
    var Q = Object.assign, ar = 0, jr, Dr, Pr, Lr, Mr, k, Y;
    function mr() {
    }
    mr.__reactDisabledLog = !0;
    function Wr() {
      {
        if (ar === 0) {
          jr = console.log, Dr = console.info, Pr = console.warn, Lr = console.error, Mr = console.group, k = console.groupCollapsed, Y = console.groupEnd;
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
        ar++;
      }
    }
    function Yr() {
      {
        if (ar--, ar === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Q({}, i, {
              value: jr
            }),
            info: Q({}, i, {
              value: Dr
            }),
            warn: Q({}, i, {
              value: Pr
            }),
            error: Q({}, i, {
              value: Lr
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
        ar < 0 && W("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var xr = $.ReactCurrentDispatcher, Er;
    function ur(i, s, h) {
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
    function cr(i, s) {
      if (!i || _r)
        return "";
      {
        var h = lr.get(i);
        if (h !== void 0)
          return h;
      }
      var m;
      _r = !0;
      var R = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var I;
      I = xr.current, xr.current = null, Wr();
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
`), O = E.length - 1, P = V.length - 1; O >= 1 && P >= 0 && E[O] !== V[P]; )
            P--;
          for (; O >= 1 && P >= 0; O--, P--)
            if (E[O] !== V[P]) {
              if (O !== 1 || P !== 1)
                do
                  if (O--, P--, P < 0 || E[O] !== V[P]) {
                    var G = `
` + E[O].replace(" at new ", " at ");
                    return i.displayName && G.includes("<anonymous>") && (G = G.replace("<anonymous>", i.displayName)), typeof i == "function" && lr.set(i, G), G;
                  }
                while (O >= 1 && P >= 0);
              break;
            }
        }
      } finally {
        _r = !1, xr.current = I, Yr(), Error.prepareStackTrace = R;
      }
      var wr = i ? i.displayName || i.name : "", de = wr ? ur(wr) : "";
      return typeof i == "function" && lr.set(i, de), de;
    }
    function z(i, s, h) {
      return cr(i, !1);
    }
    function br(i) {
      var s = i.prototype;
      return !!(s && s.isReactComponent);
    }
    function pr(i, s, h) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return cr(i, br(i));
      if (typeof i == "string")
        return ur(i);
      switch (i) {
        case A:
          return ur("Suspense");
        case x:
          return ur("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case v:
            return z(i.render);
          case F:
            return pr(i.type, s, h);
          case j: {
            var m = i, R = m._payload, I = m._init;
            try {
              return pr(I(R), s, h);
            } catch {
            }
          }
        }
      return "";
    }
    var t = Object.prototype.hasOwnProperty, r = {}, e = $.ReactDebugCurrentFrame;
    function n(i) {
      if (i) {
        var s = i._owner, h = pr(i.type, i._source, s ? s.type : null);
        e.setExtraStackFrame(h);
      } else
        e.setExtraStackFrame(null);
    }
    function o(i, s, h, m, R) {
      {
        var I = Function.call.bind(t);
        for (var b in i)
          if (I(i, b)) {
            var E = void 0;
            try {
              if (typeof i[b] != "function") {
                var V = Error((m || "React class") + ": " + h + " type `" + b + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[b] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw V.name = "Invariant Violation", V;
              }
              E = i[b](s, b, m, h, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (O) {
              E = O;
            }
            E && !(E instanceof Error) && (n(R), W("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", h, b, typeof E), n(null)), E instanceof Error && !(E.message in r) && (r[E.message] = !0, n(R), W("Failed %s type: %s", h, E.message), n(null));
          }
      }
    }
    var c = Array.isArray;
    function l(i) {
      return c(i);
    }
    function _(i) {
      {
        var s = typeof Symbol == "function" && Symbol.toStringTag, h = s && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return h;
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
    var C = $.ReactCurrentOwner, hr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Fr, Rr, Qr;
    Qr = {};
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
      if (typeof i.ref == "string" && C.current && s && C.current.stateNode !== s) {
        var h = K(C.current.type);
        Qr[h] || (W('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', K(C.current.type), i.ref), Qr[h] = !0);
      }
    }
    function Te(i, s) {
      {
        var h = function() {
          Fr || (Fr = !0, W("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        h.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: h,
          configurable: !0
        });
      }
    }
    function Ae(i, s) {
      {
        var h = function() {
          Rr || (Rr = !0, W("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        h.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: h,
          configurable: !0
        });
      }
    }
    var Ce = function(i, s, h, m, R, I, b) {
      var E = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: f,
        // Built-in properties that belong on the element
        type: i,
        key: s,
        ref: h,
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
    function Se(i, s, h, m, R) {
      {
        var I, b = {}, E = null, V = null;
        h !== void 0 && (M(h), E = "" + h), Fe(s) && (M(s.key), E = "" + s.key), be(s) && (V = s.ref, Re(s, R));
        for (I in s)
          t.call(s, I) && !hr.hasOwnProperty(I) && (b[I] = s[I]);
        if (i && i.defaultProps) {
          var O = i.defaultProps;
          for (I in O)
            b[I] === void 0 && (b[I] = O[I]);
        }
        if (E || V) {
          var P = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          E && Te(b, P), V && Ae(b, P);
        }
        return Ce(i, E, V, R, m, C.current, b);
      }
    }
    var Zr = $.ReactCurrentOwner, ce = $.ReactDebugCurrentFrame;
    function dr(i) {
      if (i) {
        var s = i._owner, h = pr(i.type, i._source, s ? s.type : null);
        ce.setExtraStackFrame(h);
      } else
        ce.setExtraStackFrame(null);
    }
    var re;
    re = !1;
    function ee(i) {
      return typeof i == "object" && i !== null && i.$$typeof === f;
    }
    function se() {
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
          var s = i.fileName.replace(/^.*[\\\/]/, ""), h = i.lineNumber;
          return `

Check your code at ` + s + ":" + h + ".";
        }
        return "";
      }
    }
    var fe = {};
    function Be(i) {
      {
        var s = se();
        if (!s) {
          var h = typeof i == "string" ? i : i.displayName || i.name;
          h && (s = `

Check the top-level render call using <` + h + ">.");
        }
        return s;
      }
    }
    function le(i, s) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var h = Be(s);
        if (fe[h])
          return;
        fe[h] = !0;
        var m = "";
        i && i._owner && i._owner !== Zr.current && (m = " It was passed a child from " + K(i._owner.type) + "."), dr(i), W('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', h, m), dr(null);
      }
    }
    function pe(i, s) {
      {
        if (typeof i != "object")
          return;
        if (l(i))
          for (var h = 0; h < i.length; h++) {
            var m = i[h];
            ee(m) && le(m, s);
          }
        else if (ee(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var R = X(i);
          if (typeof R == "function" && R !== i.entries)
            for (var I = R.call(i), b; !(b = I.next()).done; )
              ee(b.value) && le(b.value, s);
        }
      }
    }
    function Ue(i) {
      {
        var s = i.type;
        if (s == null || typeof s == "string")
          return;
        var h;
        if (typeof s == "function")
          h = s.propTypes;
        else if (typeof s == "object" && (s.$$typeof === v || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        s.$$typeof === F))
          h = s.propTypes;
        else
          return;
        if (h) {
          var m = K(s);
          o(h, i.props, "prop", m, i);
        } else if (s.PropTypes !== void 0 && !re) {
          re = !0;
          var R = K(s);
          W("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", R || "Unknown");
        }
        typeof s.getDefaultProps == "function" && !s.getDefaultProps.isReactClassApproved && W("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ke(i) {
      {
        for (var s = Object.keys(i.props), h = 0; h < s.length; h++) {
          var m = s[h];
          if (m !== "children" && m !== "key") {
            dr(i), W("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), dr(null);
            break;
          }
        }
        i.ref !== null && (dr(i), W("Invalid attribute `ref` supplied to `React.Fragment`."), dr(null));
      }
    }
    function he(i, s, h, m, R, I) {
      {
        var b = Xr(i);
        if (!b) {
          var E = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var V = Ie(R);
          V ? E += V : E += se();
          var O;
          i === null ? O = "null" : l(i) ? O = "array" : i !== void 0 && i.$$typeof === f ? (O = "<" + (K(i.type) || "Unknown") + " />", E = " Did you accidentally export a JSX literal instead of a component?") : O = typeof i, W("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", O, E);
        }
        var P = Se(i, s, h, R, I);
        if (P == null)
          return P;
        if (b) {
          var G = s.children;
          if (G !== void 0)
            if (m)
              if (l(G)) {
                for (var wr = 0; wr < G.length; wr++)
                  pe(G[wr], i);
                Object.freeze && Object.freeze(G);
              } else
                W("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              pe(G, i);
        }
        return i === y ? ke(P) : Ue(P), P;
      }
    }
    function Oe(i, s, h) {
      return he(i, s, h, !0);
    }
    function Ne(i, s, h) {
      return he(i, s, h, !1);
    }
    var je = Ne, De = Oe;
    Ar.Fragment = y, Ar.jsx = je, Ar.jsxs = De;
  }()), Ar;
}
(function(u) {
  qr.env.NODE_ENV === "production" ? u.exports = Ke() : u.exports = Qe();
})(Xe);
const Ze = Ir.Fragment, J = Ir.jsx, Sr = Ir.jsxs;
var ae = {}, rt = {
  get exports() {
    return ae;
  },
  set exports(u) {
    ae = u;
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
    function p() {
      for (var y = [], g = 0; g < arguments.length; g++) {
        var w = arguments[g];
        if (w) {
          var d = typeof w;
          if (d === "string" || d === "number")
            y.push(w);
          else if (Array.isArray(w)) {
            if (w.length) {
              var a = p.apply(null, w);
              a && y.push(a);
            }
          } else if (d === "object") {
            if (w.toString !== Object.prototype.toString && !w.toString.toString().includes("[native code]")) {
              y.push(w.toString());
              continue;
            }
            for (var v in w)
              f.call(w, v) && w[v] && y.push(v);
          }
        }
      }
      return y.join(" ");
    }
    u.exports ? (p.default = p, u.exports = p) : window.classNames = p;
  })();
})(rt);
const vr = ae, zr = U.createContext(null);
function gt({
  children: u
}) {
  const [f, p] = U.useState(), y = U.useCallback(
    (w, d) => p((a) => ({ ...a || {}, [w]: d })),
    []
  ), g = U.useMemo(
    () => ({
      widgetState: f || null,
      setWidgetState: y
    }),
    [f, y]
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
    const p = [...Ee(), u];
    typeof localStorage < "u" && localStorage.setItem("clickedNfts", JSON.stringify(p));
  } catch {
    return null;
  }
}
function lt({
  notiVal: u,
  showNoti: f,
  isOpen: p,
  clickHandler: y
}) {
  const g = Ee(), w = U.useContext(zr), d = w == null ? void 0 : w.widgetState, a = d == null ? void 0 : d.foundNft, v = a && JSON.parse(a).itemId, A = !p && (a ? !g.includes(a) && !!v : !1), [x, F] = U.useState(A);
  return U.useEffect(() => {
    A && F(!0);
  }, [A]), /* @__PURE__ */ Sr(
    "div",
    {
      className: vr(q.popupButton__container, {
        [q["popupButton__container--open"]]: p
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
            onClick: (j) => {
              F(!1), a && ft(a), y(j);
            },
            children: [
              /* @__PURE__ */ J(
                "div",
                {
                  className: vr(q.icon, {
                    [q.activeIcon]: !p,
                    [q.inactiveIcon]: p
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
                    [q.activeIcon]: p,
                    [q.inactiveIcon]: !p
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
        f && /* @__PURE__ */ Sr(Ze, { children: [
          /* @__PURE__ */ J("span", { className: vr(q.notif, q.pinging) }),
          /* @__PURE__ */ J("span", { className: q.notif, children: u })
        ] })
      ]
    }
  );
}
const pt = "_ring_q714d_1", Cr = {
  ring: pt,
  "wallet-chat-widget": "_wallet-chat-widget_q714d_23",
  "widget-is-open": "_widget-is-open_q714d_9",
  "widget-is-closed": "_widget-is-closed_q714d_13",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_q714d_23",
  "wallet-chat-widget__container--open": "_wallet-chat-widget__container--open_q714d_27"
}, ht = "https://staging.walletchat.fun", _e = Cr["wallet-chat-widget"];
function sr(u) {
  var p;
  if (typeof document > "u")
    return;
  const f = document == null ? void 0 : document.getElementById(_e);
  (p = f == null ? void 0 : f.contentWindow) == null || p.postMessage(u, "*");
}
function dt(u) {
  sr({ target: "sign_in", data: typeof u < "u" && u !== null ? u : null });
}
function mt({ connectedWallet: u }) {
  const f = U.useRef(""), p = U.useRef(null), y = U.useRef(!1), g = U.useRef(!1), w = U.useContext(zr), { widgetState: d, setWidgetState: a } = w || {}, { ownerAddress: v } = d || {}, [A, x] = U.useState(g.current), [F, j] = U.useState(0), B = () => {
    x((L) => {
      const D = !!L;
      return sr({ target: "widget_open", data: !D }), p.current && !D && sr({ ...p.current, redirect: !0 }), p.current = null, g.current = !D, !D;
    });
  };
  return U.useEffect(() => {
    A && !y.current && dt(u || null);
  }, [u, A]), U.useEffect(() => {
    if (!(v != null && v.address))
      return;
    const L = v.address, D = ne(window.location.href);
    D.network && (p.current = {
      ...D,
      ownerAddress: L
    }), p.current ? sr({ ...p.current, redirect: !0 }) : sr({ ownerAddress: L }), x(!0);
  }, [v]), U.useEffect(() => {
    const L = () => {
      if (window.location.href === f.current)
        return;
      f.current = window.location.href;
      const $ = ne(window.location.href);
      a && a("foundNft", JSON.stringify($)), $.network && (p.current = $), sr($);
    }, D = new MutationObserver(L), X = { subtree: !0, childList: !0 };
    return L(), D.observe(document, X), () => D.disconnect();
  }, []), U.useEffect(() => {
    const L = (D) => {
      const { data: X } = D;
      X.target === "unread_cnt" && j(X.data), X.closeWidget && B(), X.target === "sign_in" && a && (y.current = X.data), g.current && sr({ target: "widget_open", data: !0 });
    };
    return window.addEventListener("message", L), () => window.removeEventListener("message", L);
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
            src: ht
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
  children: f
}) => /* @__PURE__ */ J("button", { type: "button", onClick: u, children: f }), xt = ({
  ownerAddress: u,
  render: f
}) => {
  const p = U.useContext(zr), y = p == null ? void 0 : p.setWidgetState, g = f ? ({ onClick: w, children: d }) => U.cloneElement(f, { onClick: w }, d) : wt;
  return p ? /* @__PURE__ */ Sr(
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
  xt as ChatWithOwner,
  gt as WalletChatProvider,
  mt as WalletChatWidget,
  vt as utils
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._ring_7tcsj_47{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._popupButton__container_7tcsj_5{position:relative;margin-top:.75rem;height:4rem;--tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / .15));-webkit-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:margin-top,-webkit-transform;transition-property:margin-top,transform;transition-property:margin-top,transform,-webkit-transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}._popupButton__container--open_7tcsj_9{right:1.5rem;margin-top:-4rem;--tw-translate-y: 100%;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._popupButton__container--open_7tcsj_9{right:0px;margin-top:.75rem;--tw-translate-y: 0px;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._popupButton_7tcsj_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;-webkit-transform-origin:center;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}._icon_7tcsj_23{transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_7tcsj_23 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_7tcsj_31{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_7tcsj_35{--tw-rotate: 0deg;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_7tcsj_39{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(219 39 119 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}@-webkit-keyframes _ping_7tcsj_43{75%,to{-webkit-transform:scale(2);transform:scale(2);opacity:0}}._pinging_7tcsj_43{-webkit-animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite}._ring_7tcsj_47{position:fixed;right:0px;display:inline-flex;height:4rem;width:4rem}@keyframes _ping_7tcsj_43{75%,to{-webkit-transform:scale(2);transform:scale(2);opacity:0}}._ring_7tcsj_47{-webkit-animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity));opacity:.75}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::-webkit-backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._ring_q714d_1{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}#_wallet-chat-widget_q714d_23{transition-property:width,min-width,height,min-height;transition-duration:.25s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(4px 4px 8px rgba(0,0,0,.5));-webkit-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._widget-is-open_q714d_9{height:75vh;min-height:440px;width:calc(100vw - 2rem);--tw-translate-x: -1rem;--tw-translate-y: -.5rem;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._widget-is-open_q714d_9{height:65vh;width:15vw;min-width:440px;--tw-translate-x: 0px;--tw-translate-y: 0px;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._widget-is-closed_q714d_13{height:0px;min-height:0px;width:0px;min-width:0px}._wallet-chat-widget__container_q714d_23{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;user-select:none}._wallet-chat-widget__container--open_q714d_27{bottom:0px;right:0px}@media (min-width: 640px){._wallet-chat-widget__container--open_q714d_27{bottom:.5rem;right:1.5rem}}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
