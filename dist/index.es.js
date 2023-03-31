import U from "react";
function ne(u) {
  const p = u.replace("https://", "").replace("http://", "").split("/"), y = p.length, v = p[y - 1].split("?")[0], w = p[y - 2];
  if (u.startsWith("looksrare.org"))
    return { itemId: v, contractAddress: w, network: "ethereum" };
  const d = p[y - 3];
  return y >= 5 ? { itemId: v, contractAddress: w, network: d } : u.startsWith("x2y2.io") && d === "eth" ? { itemId: v, contractAddress: w, network: "ethereum" } : { contractAddress: null, itemId: null, network: null };
}
const vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseNftFromUrl: ne
}, Symbol.toStringTag, { value: "Module" })), gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var Le = {}, zr = {};
zr.byteLength = Ye;
zr.toByteArray = Ve;
zr.fromByteArray = ze;
var nr = [], X = [], Me = typeof Uint8Array < "u" ? Uint8Array : Array, te = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var gr = 0, We = te.length; gr < We; ++gr)
  nr[gr] = te[gr], X[te.charCodeAt(gr)] = gr;
X["-".charCodeAt(0)] = 62;
X["_".charCodeAt(0)] = 63;
function ge(u) {
  var s = u.length;
  if (s % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var p = u.indexOf("=");
  p === -1 && (p = s);
  var y = p === s ? 0 : 4 - p % 4;
  return [p, y];
}
function Ye(u) {
  var s = ge(u), p = s[0], y = s[1];
  return (p + y) * 3 / 4 - y;
}
function $e(u, s, p) {
  return (s + p) * 3 / 4 - p;
}
function Ve(u) {
  var s, p = ge(u), y = p[0], v = p[1], w = new Me($e(u, y, v)), d = 0, a = v > 0 ? y - 4 : y, g;
  for (g = 0; g < a; g += 4)
    s = X[u.charCodeAt(g)] << 18 | X[u.charCodeAt(g + 1)] << 12 | X[u.charCodeAt(g + 2)] << 6 | X[u.charCodeAt(g + 3)], w[d++] = s >> 16 & 255, w[d++] = s >> 8 & 255, w[d++] = s & 255;
  return v === 2 && (s = X[u.charCodeAt(g)] << 2 | X[u.charCodeAt(g + 1)] >> 4, w[d++] = s & 255), v === 1 && (s = X[u.charCodeAt(g)] << 10 | X[u.charCodeAt(g + 1)] << 4 | X[u.charCodeAt(g + 2)] >> 2, w[d++] = s >> 8 & 255, w[d++] = s & 255), w;
}
function qe(u) {
  return nr[u >> 18 & 63] + nr[u >> 12 & 63] + nr[u >> 6 & 63] + nr[u & 63];
}
function Je(u, s, p) {
  for (var y, v = [], w = s; w < p; w += 3)
    y = (u[w] << 16 & 16711680) + (u[w + 1] << 8 & 65280) + (u[w + 2] & 255), v.push(qe(y));
  return v.join("");
}
function ze(u) {
  for (var s, p = u.length, y = p % 3, v = [], w = 16383, d = 0, a = p - y; d < a; d += w)
    v.push(Je(u, d, d + w > a ? a : d + w));
  return y === 1 ? (s = u[p - 1], v.push(
    nr[s >> 2] + nr[s << 4 & 63] + "=="
  )) : y === 2 && (s = (u[p - 2] << 8) + u[p - 1], v.push(
    nr[s >> 10] + nr[s >> 4 & 63] + nr[s << 2 & 63] + "="
  )), v.join("");
}
var ue = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ue.read = function(u, s, p, y, v) {
  var w, d, a = v * 8 - y - 1, g = (1 << a) - 1, k = g >> 1, x = -7, E = p ? v - 1 : 0, B = p ? -1 : 1, O = u[s + E];
  for (E += B, w = O & (1 << -x) - 1, O >>= -x, x += a; x > 0; w = w * 256 + u[s + E], E += B, x -= 8)
    ;
  for (d = w & (1 << -x) - 1, w >>= -x, x += y; x > 0; d = d * 256 + u[s + E], E += B, x -= 8)
    ;
  if (w === 0)
    w = 1 - k;
  else {
    if (w === g)
      return d ? NaN : (O ? -1 : 1) * (1 / 0);
    d = d + Math.pow(2, y), w = w - k;
  }
  return (O ? -1 : 1) * d * Math.pow(2, w - y);
};
ue.write = function(u, s, p, y, v, w) {
  var d, a, g, k = w * 8 - v - 1, x = (1 << k) - 1, E = x >> 1, B = v === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, O = y ? 0 : w - 1, K = y ? 1 : -1, ir = s < 0 || s === 0 && 1 / s < 0 ? 1 : 0;
  for (s = Math.abs(s), isNaN(s) || s === 1 / 0 ? (a = isNaN(s) ? 1 : 0, d = x) : (d = Math.floor(Math.log(s) / Math.LN2), s * (g = Math.pow(2, -d)) < 1 && (d--, g *= 2), d + E >= 1 ? s += B / g : s += B * Math.pow(2, 1 - E), s * g >= 2 && (d++, g /= 2), d + E >= x ? (a = 0, d = x) : d + E >= 1 ? (a = (s * g - 1) * Math.pow(2, v), d = d + E) : (a = s * Math.pow(2, E - 1) * Math.pow(2, v), d = 0)); v >= 8; u[p + O] = a & 255, O += K, a /= 256, v -= 8)
    ;
  for (d = d << v | a, k += v; k > 0; u[p + O] = d & 255, O += K, d /= 256, k -= 8)
    ;
  u[p + O - K] |= ir * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  var s = zr, p = ue, y = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  u.Buffer = a, u.SlowBuffer = S, u.INSPECT_MAX_BYTES = 50;
  var v = 2147483647;
  u.kMaxLength = v, a.TYPED_ARRAY_SUPPORT = w(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
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
    if (t > v)
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
    return g(t, r, e);
  }
  a.poolSize = 8192;
  function g(t, r, e) {
    if (typeof t == "string")
      return B(t, r);
    if (ArrayBuffer.isView(t))
      return K(t);
    if (t == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
      );
    if (G(t, ArrayBuffer) || t && G(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (G(t, SharedArrayBuffer) || t && G(t.buffer, SharedArrayBuffer)))
      return ir(t, r, e);
    if (typeof t == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var n = t.valueOf && t.valueOf();
    if (n != null && n !== t)
      return a.from(n, r, e);
    var o = fr(t);
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
    return g(t, r, e);
  }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
  function k(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function x(t, r, e) {
    return k(t), t <= 0 ? d(t) : r !== void 0 ? typeof e == "string" ? d(t).fill(r, e) : d(t).fill(r) : d(t);
  }
  a.alloc = function(t, r, e) {
    return x(t, r, e);
  };
  function E(t) {
    return k(t), d(t < 0 ? 0 : q(t) | 0);
  }
  a.allocUnsafe = function(t) {
    return E(t);
  }, a.allocUnsafeSlow = function(t) {
    return E(t);
  };
  function B(t, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !a.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var e = M(t, r) | 0, n = d(e), o = n.write(t, r);
    return o !== e && (n = n.slice(0, o)), n;
  }
  function O(t) {
    for (var r = t.length < 0 ? 0 : q(t.length) | 0, e = d(r), n = 0; n < r; n += 1)
      e[n] = t[n] & 255;
    return e;
  }
  function K(t) {
    if (G(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return ir(r.buffer, r.byteOffset, r.byteLength);
    }
    return O(t);
  }
  function ir(t, r, e) {
    if (r < 0 || t.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < r + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var n;
    return r === void 0 && e === void 0 ? n = new Uint8Array(t) : e === void 0 ? n = new Uint8Array(t, r) : n = new Uint8Array(t, r, e), Object.setPrototypeOf(n, a.prototype), n;
  }
  function fr(t) {
    if (a.isBuffer(t)) {
      var r = q(t.length) | 0, e = d(r);
      return e.length === 0 || t.copy(e, 0, 0, r), e;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || Rr(t.length) ? d(0) : O(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return O(t.data);
  }
  function q(t) {
    if (t >= v)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + v.toString(16) + " bytes");
    return t | 0;
  }
  function S(t) {
    return +t != t && (t = 0), a.alloc(+t);
  }
  a.isBuffer = function(r) {
    return r != null && r._isBuffer === !0 && r !== a.prototype;
  }, a.compare = function(r, e) {
    if (G(r, Uint8Array) && (r = a.from(r, r.offset, r.byteLength)), G(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)), !a.isBuffer(r) || !a.isBuffer(e))
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
      if (G(l, Uint8Array))
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
  function M(t, r) {
    if (a.isBuffer(t))
      return t.length;
    if (ArrayBuffer.isView(t) || G(t, ArrayBuffer))
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
          return sr(t).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return e * 2;
        case "hex":
          return e >>> 1;
        case "base64":
          return Vr(t).length;
        default:
          if (o)
            return n ? -1 : sr(t).length;
          r = ("" + r).toLowerCase(), o = !0;
      }
  }
  a.byteLength = M;
  function W(t, r, e) {
    var n = !1;
    if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, r >>>= 0, e <= r))
      return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return Mr(this, r, e);
        case "utf8":
        case "utf-8":
          return Z(this, r, e);
        case "ascii":
          return Pr(this, r, e);
        case "latin1":
        case "binary":
          return Lr(this, r, e);
        case "base64":
          return Q(this, r, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Wr(this, r, e);
        default:
          if (n)
            throw new TypeError("Unknown encoding: " + t);
          t = (t + "").toLowerCase(), n = !0;
      }
  }
  a.prototype._isBuffer = !0;
  function Y(t, r, e) {
    var n = t[r];
    t[r] = t[e], t[e] = n;
  }
  a.prototype.swap16 = function() {
    var r = this.length;
    if (r % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var e = 0; e < r; e += 2)
      Y(this, e, e + 1);
    return this;
  }, a.prototype.swap32 = function() {
    var r = this.length;
    if (r % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var e = 0; e < r; e += 4)
      Y(this, e, e + 3), Y(this, e + 1, e + 2);
    return this;
  }, a.prototype.swap64 = function() {
    var r = this.length;
    if (r % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var e = 0; e < r; e += 8)
      Y(this, e, e + 7), Y(this, e + 1, e + 6), Y(this, e + 2, e + 5), Y(this, e + 3, e + 4);
    return this;
  }, a.prototype.toString = function() {
    var r = this.length;
    return r === 0 ? "" : arguments.length === 0 ? Z(this, 0, r) : W.apply(this, arguments);
  }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(r) {
    if (!a.isBuffer(r))
      throw new TypeError("Argument must be a Buffer");
    return this === r ? !0 : a.compare(this, r) === 0;
  }, a.prototype.inspect = function() {
    var r = "", e = u.INSPECT_MAX_BYTES;
    return r = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (r += " ... "), "<Buffer " + r + ">";
  }, y && (a.prototype[y] = a.prototype.inspect), a.prototype.compare = function(r, e, n, o, c) {
    if (G(r, Uint8Array) && (r = a.from(r, r.offset, r.byteLength)), !a.isBuffer(r))
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
    for (var l = c - o, b = n - e, T = Math.min(l, b), C = this.slice(o, c), L = r.slice(e, n), A = 0; A < T; ++A)
      if (C[A] !== L[A]) {
        l = C[A], b = L[A];
        break;
      }
    return l < b ? -1 : b < l ? 1 : 0;
  };
  function kr(t, r, e, n, o) {
    if (t.length === 0)
      return -1;
    if (typeof e == "string" ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, Rr(e) && (e = o ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
      if (o)
        return -1;
      e = t.length - 1;
    } else if (e < 0)
      if (o)
        e = 0;
      else
        return -1;
    if (typeof r == "string" && (r = a.from(r, n)), a.isBuffer(r))
      return r.length === 0 ? -1 : Or(t, r, e, n, o);
    if (typeof r == "number")
      return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? o ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : Or(t, [r], e, n, o);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Or(t, r, e, n, o) {
    var c = 1, l = t.length, b = r.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || r.length < 2)
        return -1;
      c = 2, l /= 2, b /= 2, e /= 2;
    }
    function T(Tr, Sr) {
      return c === 1 ? Tr[Sr] : Tr.readUInt16BE(Sr * c);
    }
    var C;
    if (o) {
      var L = -1;
      for (C = e; C < l; C++)
        if (T(t, C) === T(r, L === -1 ? 0 : C - L)) {
          if (L === -1 && (L = C), C - L + 1 === b)
            return L * c;
        } else
          L !== -1 && (C -= C - L), L = -1;
    } else
      for (e + b > l && (e = l - b), C = e; C >= 0; C--) {
        for (var A = !0, wr = 0; wr < b; wr++)
          if (T(t, C + wr) !== T(r, wr)) {
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
    return kr(this, r, e, n, !0);
  }, a.prototype.lastIndexOf = function(r, e, n) {
    return kr(this, r, e, n, !1);
  };
  function Hr(t, r, e, n) {
    e = Number(e) || 0;
    var o = t.length - e;
    n ? (n = Number(n), n > o && (n = o)) : n = o;
    var c = r.length;
    n > c / 2 && (n = c / 2);
    for (var l = 0; l < n; ++l) {
      var b = parseInt(r.substr(l * 2, 2), 16);
      if (Rr(b))
        return l;
      t[e + l] = b;
    }
    return l;
  }
  function Nr(t, r, e, n) {
    return lr(sr(r, t.length - e), t, e, n);
  }
  function Xr(t, r, e, n) {
    return lr(Fr(r), t, e, n);
  }
  function Kr(t, r, e, n) {
    return lr(Vr(r), t, e, n);
  }
  function jr(t, r, e, n) {
    return lr(hr(r, t.length - e), t, e, n);
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
          return Nr(this, r, e, n);
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
          return jr(this, r, e, n);
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
  function Q(t, r, e) {
    return r === 0 && e === t.length ? s.fromByteArray(t) : s.fromByteArray(t.slice(r, e));
  }
  function Z(t, r, e) {
    e = Math.min(t.length, e);
    for (var n = [], o = r; o < e; ) {
      var c = t[o], l = null, b = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
      if (o + b <= e) {
        var T, C, L, A;
        switch (b) {
          case 1:
            c < 128 && (l = c);
            break;
          case 2:
            T = t[o + 1], (T & 192) === 128 && (A = (c & 31) << 6 | T & 63, A > 127 && (l = A));
            break;
          case 3:
            T = t[o + 1], C = t[o + 2], (T & 192) === 128 && (C & 192) === 128 && (A = (c & 15) << 12 | (T & 63) << 6 | C & 63, A > 2047 && (A < 55296 || A > 57343) && (l = A));
            break;
          case 4:
            T = t[o + 1], C = t[o + 2], L = t[o + 3], (T & 192) === 128 && (C & 192) === 128 && (L & 192) === 128 && (A = (c & 15) << 18 | (T & 63) << 12 | (C & 63) << 6 | L & 63, A > 65535 && A < 1114112 && (l = A));
        }
      }
      l === null ? (l = 65533, b = 1) : l > 65535 && (l -= 65536, n.push(l >>> 10 & 1023 | 55296), l = 56320 | l & 1023), n.push(l), o += b;
    }
    return Dr(n);
  }
  var cr = 4096;
  function Dr(t) {
    var r = t.length;
    if (r <= cr)
      return String.fromCharCode.apply(String, t);
    for (var e = "", n = 0; n < r; )
      e += String.fromCharCode.apply(
        String,
        t.slice(n, n += cr)
      );
    return e;
  }
  function Pr(t, r, e) {
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
  function Mr(t, r, e) {
    var n = t.length;
    (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
    for (var o = "", c = r; c < e; ++c)
      o += dr[t[c]];
    return o;
  }
  function Wr(t, r, e) {
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
  function N(t, r, e) {
    if (t % 1 !== 0 || t < 0)
      throw new RangeError("offset is not uint");
    if (t + r > e)
      throw new RangeError("Trying to access beyond buffer length");
  }
  a.prototype.readUintLE = a.prototype.readUIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || N(r, e, this.length);
    for (var o = this[r], c = 1, l = 0; ++l < e && (c *= 256); )
      o += this[r + l] * c;
    return o;
  }, a.prototype.readUintBE = a.prototype.readUIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || N(r, e, this.length);
    for (var o = this[r + --e], c = 1; e > 0 && (c *= 256); )
      o += this[r + --e] * c;
    return o;
  }, a.prototype.readUint8 = a.prototype.readUInt8 = function(r, e) {
    return r = r >>> 0, e || N(r, 1, this.length), this[r];
  }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(r, e) {
    return r = r >>> 0, e || N(r, 2, this.length), this[r] | this[r + 1] << 8;
  }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(r, e) {
    return r = r >>> 0, e || N(r, 2, this.length), this[r] << 8 | this[r + 1];
  }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(r, e) {
    return r = r >>> 0, e || N(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
  }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(r, e) {
    return r = r >>> 0, e || N(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
  }, a.prototype.readIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || N(r, e, this.length);
    for (var o = this[r], c = 1, l = 0; ++l < e && (c *= 256); )
      o += this[r + l] * c;
    return c *= 128, o >= c && (o -= Math.pow(2, 8 * e)), o;
  }, a.prototype.readIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || N(r, e, this.length);
    for (var o = e, c = 1, l = this[r + --o]; o > 0 && (c *= 256); )
      l += this[r + --o] * c;
    return c *= 128, l >= c && (l -= Math.pow(2, 8 * e)), l;
  }, a.prototype.readInt8 = function(r, e) {
    return r = r >>> 0, e || N(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
  }, a.prototype.readInt16LE = function(r, e) {
    r = r >>> 0, e || N(r, 2, this.length);
    var n = this[r] | this[r + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, a.prototype.readInt16BE = function(r, e) {
    r = r >>> 0, e || N(r, 2, this.length);
    var n = this[r + 1] | this[r] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, a.prototype.readInt32LE = function(r, e) {
    return r = r >>> 0, e || N(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
  }, a.prototype.readInt32BE = function(r, e) {
    return r = r >>> 0, e || N(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
  }, a.prototype.readFloatLE = function(r, e) {
    return r = r >>> 0, e || N(r, 4, this.length), p.read(this, r, !0, 23, 4);
  }, a.prototype.readFloatBE = function(r, e) {
    return r = r >>> 0, e || N(r, 4, this.length), p.read(this, r, !1, 23, 4);
  }, a.prototype.readDoubleLE = function(r, e) {
    return r = r >>> 0, e || N(r, 8, this.length), p.read(this, r, !0, 52, 8);
  }, a.prototype.readDoubleBE = function(r, e) {
    return r = r >>> 0, e || N(r, 8, this.length), p.read(this, r, !1, 52, 8);
  };
  function $(t, r, e, n, o, c) {
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
      $(this, r, e, n, c, 0);
    }
    var l = 1, b = 0;
    for (this[e] = r & 255; ++b < n && (l *= 256); )
      this[e + b] = r / l & 255;
    return e + n;
  }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !o) {
      var c = Math.pow(2, 8 * n) - 1;
      $(this, r, e, n, c, 0);
    }
    var l = n - 1, b = 1;
    for (this[e + l] = r & 255; --l >= 0 && (b *= 256); )
      this[e + l] = r / b & 255;
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
  }, a.prototype.writeIntLE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var c = Math.pow(2, 8 * n - 1);
      $(this, r, e, n, c - 1, -c);
    }
    var l = 0, b = 1, T = 0;
    for (this[e] = r & 255; ++l < n && (b *= 256); )
      r < 0 && T === 0 && this[e + l - 1] !== 0 && (T = 1), this[e + l] = (r / b >> 0) - T & 255;
    return e + n;
  }, a.prototype.writeIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var c = Math.pow(2, 8 * n - 1);
      $(this, r, e, n, c - 1, -c);
    }
    var l = n - 1, b = 1, T = 0;
    for (this[e + l] = r & 255; --l >= 0 && (b *= 256); )
      r < 0 && T === 0 && this[e + l + 1] !== 0 && (T = 1), this[e + l] = (r / b >> 0) - T & 255;
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
  function Er(t, r, e, n, o, c) {
    if (e + n > t.length)
      throw new RangeError("Index out of range");
    if (e < 0)
      throw new RangeError("Index out of range");
  }
  function Yr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || Er(t, r, e, 4), p.write(t, r, e, n, 23, 4), e + 4;
  }
  a.prototype.writeFloatLE = function(r, e, n) {
    return Yr(this, r, e, !0, n);
  }, a.prototype.writeFloatBE = function(r, e, n) {
    return Yr(this, r, e, !1, n);
  };
  function $r(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || Er(t, r, e, 8), p.write(t, r, e, n, 52, 8), e + 8;
  }
  a.prototype.writeDoubleLE = function(r, e, n) {
    return $r(this, r, e, !0, n);
  }, a.prototype.writeDoubleBE = function(r, e, n) {
    return $r(this, r, e, !1, n);
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
      var b = a.isBuffer(r) ? r : a.from(r, o), T = b.length;
      if (T === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (l = 0; l < n - e; ++l)
        this[l + e] = b[l % T];
    }
    return this;
  };
  var _r = /[^+/0-9A-Za-z-_]/g;
  function br(t) {
    if (t = t.split("=")[0], t = t.trim().replace(_r, ""), t.length < 2)
      return "";
    for (; t.length % 4 !== 0; )
      t = t + "=";
    return t;
  }
  function sr(t, r) {
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
  function Fr(t) {
    for (var r = [], e = 0; e < t.length; ++e)
      r.push(t.charCodeAt(e) & 255);
    return r;
  }
  function hr(t, r) {
    for (var e, n, o, c = [], l = 0; l < t.length && !((r -= 2) < 0); ++l)
      e = t.charCodeAt(l), n = e >> 8, o = e % 256, c.push(o), c.push(n);
    return c;
  }
  function Vr(t) {
    return s.toByteArray(br(t));
  }
  function lr(t, r, e, n) {
    for (var o = 0; o < n && !(o + e >= r.length || o >= t.length); ++o)
      r[o + e] = t[o];
    return o;
  }
  function G(t, r) {
    return t instanceof r || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === r.name;
  }
  function Rr(t) {
    return t !== t;
  }
  var dr = function() {
    for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
      for (var n = e * 16, o = 0; o < 16; ++o)
        r[n + o] = t[e] + t[o];
    return r;
  }();
})(Le);
var Jr = {}, Ge = {
  get exports() {
    return Jr;
  },
  set exports(u) {
    Jr = u;
  }
}, D = Ge.exports = {}, er, tr;
function ie() {
  throw new Error("setTimeout has not been defined");
}
function oe() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? er = setTimeout : er = ie;
  } catch {
    er = ie;
  }
  try {
    typeof clearTimeout == "function" ? tr = clearTimeout : tr = oe;
  } catch {
    tr = oe;
  }
})();
function me(u) {
  if (er === setTimeout)
    return setTimeout(u, 0);
  if ((er === ie || !er) && setTimeout)
    return er = setTimeout, setTimeout(u, 0);
  try {
    return er(u, 0);
  } catch {
    try {
      return er.call(null, u, 0);
    } catch {
      return er.call(this, u, 0);
    }
  }
}
function He(u) {
  if (tr === clearTimeout)
    return clearTimeout(u);
  if ((tr === oe || !tr) && clearTimeout)
    return tr = clearTimeout, clearTimeout(u);
  try {
    return tr(u);
  } catch {
    try {
      return tr.call(null, u);
    } catch {
      return tr.call(this, u);
    }
  }
}
var ar = [], xr = !1, pr, qr = -1;
function Xe() {
  !xr || !pr || (xr = !1, pr.length ? ar = pr.concat(ar) : qr = -1, ar.length && xe());
}
function xe() {
  if (!xr) {
    var u = me(Xe);
    xr = !0;
    for (var s = ar.length; s; ) {
      for (pr = ar, ar = []; ++qr < s; )
        pr && pr[qr].run();
      qr = -1, s = ar.length;
    }
    pr = null, xr = !1, He(u);
  }
}
D.nextTick = function(u) {
  var s = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var p = 1; p < arguments.length; p++)
      s[p - 1] = arguments[p];
  ar.push(new Ee(u, s)), ar.length === 1 && !xr && me(xe);
};
function Ee(u, s) {
  this.fun = u, this.array = s;
}
Ee.prototype.run = function() {
  this.fun.apply(null, this.array);
};
D.title = "browser";
D.browser = !0;
D.env = {};
D.argv = [];
D.version = "";
D.versions = {};
function ur() {
}
D.on = ur;
D.addListener = ur;
D.once = ur;
D.off = ur;
D.removeListener = ur;
D.removeAllListeners = ur;
D.emit = ur;
D.prependListener = ur;
D.prependOnceListener = ur;
D.listeners = function(u) {
  return [];
};
D.binding = function(u) {
  throw new Error("process.binding is not supported");
};
D.cwd = function() {
  return "/";
};
D.chdir = function(u) {
  throw new Error("process.chdir is not supported");
};
D.umask = function() {
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
  var p = __magic__;
  return p;
})(Object);
var Ur = {}, Ke = {
  get exports() {
    return Ur;
  },
  set exports(u) {
    Ur = u;
  }
}, Ar = {};
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
function Qe() {
  if (we)
    return Ar;
  we = 1;
  var u = U, s = Symbol.for("react.element"), p = Symbol.for("react.fragment"), y = Object.prototype.hasOwnProperty, v = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(a, g, k) {
    var x, E = {}, B = null, O = null;
    k !== void 0 && (B = "" + k), g.key !== void 0 && (B = "" + g.key), g.ref !== void 0 && (O = g.ref);
    for (x in g)
      y.call(g, x) && !w.hasOwnProperty(x) && (E[x] = g[x]);
    if (a && a.defaultProps)
      for (x in g = a.defaultProps, g)
        E[x] === void 0 && (E[x] = g[x]);
    return { $$typeof: s, type: a, key: B, ref: O, props: E, _owner: v.current };
  }
  return Ar.Fragment = p, Ar.jsx = d, Ar.jsxs = d, Ar;
}
var Cr = {}, ye;
function Ze() {
  return ye || (ye = 1, Jr.env.NODE_ENV !== "production" && function() {
    var u = U, s = Symbol.for("react.element"), p = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), a = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), x = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), O = Symbol.for("react.offscreen"), K = Symbol.iterator, ir = "@@iterator";
    function fr(i) {
      if (i === null || typeof i != "object")
        return null;
      var f = K && i[K] || i[ir];
      return typeof f == "function" ? f : null;
    }
    var q = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function S(i) {
      {
        for (var f = arguments.length, h = new Array(f > 1 ? f - 1 : 0), m = 1; m < f; m++)
          h[m - 1] = arguments[m];
        M("error", i, h);
      }
    }
    function M(i, f, h) {
      {
        var m = q.ReactDebugCurrentFrame, R = m.getStackAddendum();
        R !== "" && (f += "%s", h = h.concat([R]));
        var I = h.map(function(F) {
          return String(F);
        });
        I.unshift("Warning: " + f), Function.prototype.apply.call(console[i], console, I);
      }
    }
    var W = !1, Y = !1, kr = !1, Or = !1, Hr = !1, Nr;
    Nr = Symbol.for("react.module.reference");
    function Xr(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === y || i === w || Hr || i === v || i === k || i === x || Or || i === O || W || Y || kr || typeof i == "object" && i !== null && (i.$$typeof === B || i.$$typeof === E || i.$$typeof === d || i.$$typeof === a || i.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === Nr || i.getModuleId !== void 0));
    }
    function Kr(i, f, h) {
      var m = i.displayName;
      if (m)
        return m;
      var R = f.displayName || f.name || "";
      return R !== "" ? h + "(" + R + ")" : h;
    }
    function jr(i) {
      return i.displayName || "Context";
    }
    function Q(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
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
        case v:
          return "StrictMode";
        case k:
          return "Suspense";
        case x:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case a:
            var f = i;
            return jr(f) + ".Consumer";
          case d:
            var h = i;
            return jr(h._context) + ".Provider";
          case g:
            return Kr(i, i.render, "ForwardRef");
          case E:
            var m = i.displayName || null;
            return m !== null ? m : Q(i.type) || "Memo";
          case B: {
            var R = i, I = R._payload, F = R._init;
            try {
              return Q(F(I));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Z = Object.assign, cr = 0, Dr, Pr, Lr, Mr, Wr, N, $;
    function Er() {
    }
    Er.__reactDisabledLog = !0;
    function Yr() {
      {
        if (cr === 0) {
          Dr = console.log, Pr = console.info, Lr = console.warn, Mr = console.error, Wr = console.group, N = console.groupCollapsed, $ = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: Er,
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
        cr++;
      }
    }
    function $r() {
      {
        if (cr--, cr === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Z({}, i, {
              value: Dr
            }),
            info: Z({}, i, {
              value: Pr
            }),
            warn: Z({}, i, {
              value: Lr
            }),
            error: Z({}, i, {
              value: Mr
            }),
            group: Z({}, i, {
              value: Wr
            }),
            groupCollapsed: Z({}, i, {
              value: N
            }),
            groupEnd: Z({}, i, {
              value: $
            })
          });
        }
        cr < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var _r = q.ReactCurrentDispatcher, br;
    function sr(i, f, h) {
      {
        if (br === void 0)
          try {
            throw Error();
          } catch (R) {
            var m = R.stack.trim().match(/\n( *(at )?)/);
            br = m && m[1] || "";
          }
        return `
` + br + i;
      }
    }
    var Fr = !1, hr;
    {
      var Vr = typeof WeakMap == "function" ? WeakMap : Map;
      hr = new Vr();
    }
    function lr(i, f) {
      if (!i || Fr)
        return "";
      {
        var h = hr.get(i);
        if (h !== void 0)
          return h;
      }
      var m;
      Fr = !0;
      var R = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var I;
      I = _r.current, _r.current = null, Yr();
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
            } catch (or) {
              m = or;
            }
            Reflect.construct(i, [], F);
          } else {
            try {
              F.call();
            } catch (or) {
              m = or;
            }
            i.call(F.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (or) {
            m = or;
          }
          i();
        }
      } catch (or) {
        if (or && m && typeof or.stack == "string") {
          for (var _ = or.stack.split(`
`), V = m.stack.split(`
`), j = _.length - 1, P = V.length - 1; j >= 1 && P >= 0 && _[j] !== V[P]; )
            P--;
          for (; j >= 1 && P >= 0; j--, P--)
            if (_[j] !== V[P]) {
              if (j !== 1 || P !== 1)
                do
                  if (j--, P--, P < 0 || _[j] !== V[P]) {
                    var H = `
` + _[j].replace(" at new ", " at ");
                    return i.displayName && H.includes("<anonymous>") && (H = H.replace("<anonymous>", i.displayName)), typeof i == "function" && hr.set(i, H), H;
                  }
                while (j >= 1 && P >= 0);
              break;
            }
        }
      } finally {
        Fr = !1, _r.current = I, $r(), Error.prepareStackTrace = R;
      }
      var vr = i ? i.displayName || i.name : "", de = vr ? sr(vr) : "";
      return typeof i == "function" && hr.set(i, de), de;
    }
    function G(i, f, h) {
      return lr(i, !1);
    }
    function Rr(i) {
      var f = i.prototype;
      return !!(f && f.isReactComponent);
    }
    function dr(i, f, h) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return lr(i, Rr(i));
      if (typeof i == "string")
        return sr(i);
      switch (i) {
        case k:
          return sr("Suspense");
        case x:
          return sr("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case g:
            return G(i.render);
          case E:
            return dr(i.type, f, h);
          case B: {
            var m = i, R = m._payload, I = m._init;
            try {
              return dr(I(R), f, h);
            } catch {
            }
          }
        }
      return "";
    }
    var t = Object.prototype.hasOwnProperty, r = {}, e = q.ReactDebugCurrentFrame;
    function n(i) {
      if (i) {
        var f = i._owner, h = dr(i.type, i._source, f ? f.type : null);
        e.setExtraStackFrame(h);
      } else
        e.setExtraStackFrame(null);
    }
    function o(i, f, h, m, R) {
      {
        var I = Function.call.bind(t);
        for (var F in i)
          if (I(i, F)) {
            var _ = void 0;
            try {
              if (typeof i[F] != "function") {
                var V = Error((m || "React class") + ": " + h + " type `" + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[F] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw V.name = "Invariant Violation", V;
              }
              _ = i[F](f, F, m, h, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (j) {
              _ = j;
            }
            _ && !(_ instanceof Error) && (n(R), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", h, F, typeof _), n(null)), _ instanceof Error && !(_.message in r) && (r[_.message] = !0, n(R), S("Failed %s type: %s", h, _.message), n(null));
          }
      }
    }
    var c = Array.isArray;
    function l(i) {
      return c(i);
    }
    function b(i) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, h = f && i[Symbol.toStringTag] || i.constructor.name || "Object";
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
    function L(i) {
      if (T(i))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", b(i)), C(i);
    }
    var A = q.ReactCurrentOwner, wr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Tr, Sr, Qr;
    Qr = {};
    function Fe(i) {
      if (t.call(i, "ref")) {
        var f = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function Re(i) {
      if (t.call(i, "key")) {
        var f = Object.getOwnPropertyDescriptor(i, "key").get;
        if (f && f.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function Te(i, f) {
      if (typeof i.ref == "string" && A.current && f && A.current.stateNode !== f) {
        var h = Q(A.current.type);
        Qr[h] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Q(A.current.type), i.ref), Qr[h] = !0);
      }
    }
    function Se(i, f) {
      {
        var h = function() {
          Tr || (Tr = !0, S("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        h.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: h,
          configurable: !0
        });
      }
    }
    function Ae(i, f) {
      {
        var h = function() {
          Sr || (Sr = !0, S("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        h.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: h,
          configurable: !0
        });
      }
    }
    var Ce = function(i, f, h, m, R, I, F) {
      var _ = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: s,
        // Built-in properties that belong on the element
        type: i,
        key: f,
        ref: h,
        props: F,
        // Record the component responsible for creating this element.
        _owner: I
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
        value: m
      }), Object.defineProperty(_, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: R
      }), Object.freeze && (Object.freeze(_.props), Object.freeze(_)), _;
    };
    function Ie(i, f, h, m, R) {
      {
        var I, F = {}, _ = null, V = null;
        h !== void 0 && (L(h), _ = "" + h), Re(f) && (L(f.key), _ = "" + f.key), Fe(f) && (V = f.ref, Te(f, R));
        for (I in f)
          t.call(f, I) && !wr.hasOwnProperty(I) && (F[I] = f[I]);
        if (i && i.defaultProps) {
          var j = i.defaultProps;
          for (I in j)
            F[I] === void 0 && (F[I] = j[I]);
        }
        if (_ || V) {
          var P = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          _ && Se(F, P), V && Ae(F, P);
        }
        return Ce(i, _, V, R, m, A.current, F);
      }
    }
    var Zr = q.ReactCurrentOwner, ce = q.ReactDebugCurrentFrame;
    function yr(i) {
      if (i) {
        var f = i._owner, h = dr(i.type, i._source, f ? f.type : null);
        ce.setExtraStackFrame(h);
      } else
        ce.setExtraStackFrame(null);
    }
    var re;
    re = !1;
    function ee(i) {
      return typeof i == "object" && i !== null && i.$$typeof === s;
    }
    function se() {
      {
        if (Zr.current) {
          var i = Q(Zr.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
    }
    function Be(i) {
      {
        if (i !== void 0) {
          var f = i.fileName.replace(/^.*[\\\/]/, ""), h = i.lineNumber;
          return `

Check your code at ` + f + ":" + h + ".";
        }
        return "";
      }
    }
    var fe = {};
    function Ue(i) {
      {
        var f = se();
        if (!f) {
          var h = typeof i == "string" ? i : i.displayName || i.name;
          h && (f = `

Check the top-level render call using <` + h + ">.");
        }
        return f;
      }
    }
    function le(i, f) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var h = Ue(f);
        if (fe[h])
          return;
        fe[h] = !0;
        var m = "";
        i && i._owner && i._owner !== Zr.current && (m = " It was passed a child from " + Q(i._owner.type) + "."), yr(i), S('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', h, m), yr(null);
      }
    }
    function pe(i, f) {
      {
        if (typeof i != "object")
          return;
        if (l(i))
          for (var h = 0; h < i.length; h++) {
            var m = i[h];
            ee(m) && le(m, f);
          }
        else if (ee(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var R = fr(i);
          if (typeof R == "function" && R !== i.entries)
            for (var I = R.call(i), F; !(F = I.next()).done; )
              ee(F.value) && le(F.value, f);
        }
      }
    }
    function ke(i) {
      {
        var f = i.type;
        if (f == null || typeof f == "string")
          return;
        var h;
        if (typeof f == "function")
          h = f.propTypes;
        else if (typeof f == "object" && (f.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        f.$$typeof === E))
          h = f.propTypes;
        else
          return;
        if (h) {
          var m = Q(f);
          o(h, i.props, "prop", m, i);
        } else if (f.PropTypes !== void 0 && !re) {
          re = !0;
          var R = Q(f);
          S("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", R || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && S("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Oe(i) {
      {
        for (var f = Object.keys(i.props), h = 0; h < f.length; h++) {
          var m = f[h];
          if (m !== "children" && m !== "key") {
            yr(i), S("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), yr(null);
            break;
          }
        }
        i.ref !== null && (yr(i), S("Invalid attribute `ref` supplied to `React.Fragment`."), yr(null));
      }
    }
    function he(i, f, h, m, R, I) {
      {
        var F = Xr(i);
        if (!F) {
          var _ = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (_ += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var V = Be(R);
          V ? _ += V : _ += se();
          var j;
          i === null ? j = "null" : l(i) ? j = "array" : i !== void 0 && i.$$typeof === s ? (j = "<" + (Q(i.type) || "Unknown") + " />", _ = " Did you accidentally export a JSX literal instead of a component?") : j = typeof i, S("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", j, _);
        }
        var P = Ie(i, f, h, R, I);
        if (P == null)
          return P;
        if (F) {
          var H = f.children;
          if (H !== void 0)
            if (m)
              if (l(H)) {
                for (var vr = 0; vr < H.length; vr++)
                  pe(H[vr], i);
                Object.freeze && Object.freeze(H);
              } else
                S("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              pe(H, i);
        }
        return i === y ? Oe(P) : ke(P), P;
      }
    }
    function Ne(i, f, h) {
      return he(i, f, h, !0);
    }
    function je(i, f, h) {
      return he(i, f, h, !1);
    }
    var De = je, Pe = Ne;
    Cr.Fragment = y, Cr.jsx = De, Cr.jsxs = Pe;
  }()), Cr;
}
(function(u) {
  Jr.env.NODE_ENV === "production" ? u.exports = Qe() : u.exports = Ze();
})(Ke);
const rt = Ur.Fragment, z = Ur.jsx, Br = Ur.jsxs;
var ae = {}, et = {
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
    var s = {}.hasOwnProperty;
    function p() {
      for (var y = [], v = 0; v < arguments.length; v++) {
        var w = arguments[v];
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
            for (var g in w)
              s.call(w, g) && w[g] && y.push(g);
          }
        }
      }
      return y.join(" ");
    }
    u.exports ? (p.default = p, u.exports = p) : window.classNames = p;
  })();
})(et);
const mr = ae, Gr = U.createContext(null);
function mt({
  children: u
}) {
  const [s, p] = U.useState(), y = U.useCallback(
    (w, d) => p((a) => ({ ...a || {}, [w]: d })),
    []
  ), v = U.useMemo(
    () => ({
      widgetState: s || null,
      setWidgetState: y
    }),
    [s, y]
  );
  return /* @__PURE__ */ z(Gr.Provider, { value: v, children: u });
}
const tt = "_ring_7tcsj_47", nt = "_popupButton__container_7tcsj_5", it = "_popupButton_7tcsj_5", ot = "_icon_7tcsj_23", at = "_inactiveIcon_7tcsj_31", ut = "_activeIcon_7tcsj_35", ct = "_notif_7tcsj_39", st = "_pinging_7tcsj_43", ft = "_ping_7tcsj_43", J = {
  ring: tt,
  popupButton__container: nt,
  "popupButton__container--open": "_popupButton__container--open_7tcsj_9",
  popupButton: it,
  icon: ot,
  inactiveIcon: at,
  activeIcon: ut,
  notif: ct,
  pinging: st,
  ping: ft
};
function _e() {
  try {
    const u = typeof localStorage < "u" && localStorage.getItem("clickedNfts") || "";
    return u ? Array.from(new Set(JSON.parse(u))) : [];
  } catch {
    return [];
  }
}
function lt(u) {
  try {
    const p = [..._e(), u];
    typeof localStorage < "u" && localStorage.setItem("clickedNfts", JSON.stringify(p));
  } catch {
    return null;
  }
}
function pt({
  notiVal: u,
  showNoti: s,
  isOpen: p,
  clickHandler: y
}) {
  const v = _e(), w = U.useContext(Gr), d = w == null ? void 0 : w.widgetState, a = d == null ? void 0 : d.foundNft, g = a && JSON.parse(a).itemId, k = !p && (a ? !v.includes(a) && Boolean(g) : !1), [x, E] = U.useState(k);
  return U.useEffect(() => {
    E(k);
  }, [k]), /* @__PURE__ */ Br(
    "div",
    {
      className: mr(J.popupButton__container, {
        [J["popupButton__container--open"]]: p
      }),
      children: [
        /* @__PURE__ */ z(
          "span",
          {
            className: x ? J.ring : void 0,
            style: { boxShadow: "none" }
          }
        ),
        /* @__PURE__ */ Br(
          "button",
          {
            className: J.popupButton,
            type: "button",
            onClick: (B) => {
              E(!1), a && lt(a), y(B);
            },
            children: [
              /* @__PURE__ */ z(
                "div",
                {
                  className: mr(J.icon, {
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
                  className: mr(J.icon, {
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
        s && /* @__PURE__ */ Br(rt, { children: [
          /* @__PURE__ */ z("span", { className: mr(J.notif, J.pinging) }),
          /* @__PURE__ */ z("span", { className: J.notif, children: u })
        ] })
      ]
    }
  );
}
const ht = "_ring_q714d_1", Ir = {
  ring: ht,
  "wallet-chat-widget": "_wallet-chat-widget_q714d_23",
  "widget-is-open": "_widget-is-open_q714d_9",
  "widget-is-closed": "_widget-is-closed_q714d_13",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_q714d_23",
  "wallet-chat-widget__container--open": "_wallet-chat-widget__container--open_q714d_27"
}, dt = "https://staging.walletchat.fun", be = Ir["wallet-chat-widget"];
function rr(u) {
  var p;
  if (typeof document > "u")
    return;
  const s = document == null ? void 0 : document.getElementById(be);
  (p = s == null ? void 0 : s.contentWindow) == null || p.postMessage(u, "*");
}
function ve(u) {
  rr({ target: "sign_in", data: u || null });
}
function xt({
  connectedWallet: u,
  signMessage: s,
  style: p
}) {
  const y = U.useRef(""), v = U.useRef(null), w = U.useRef(!1), d = U.useRef(u), a = U.useRef(!1), g = U.useContext(Gr), { widgetState: k, setWidgetState: x } = g || {}, { ownerAddress: E } = k || {}, [B, O] = U.useState(a.current), [K, ir] = U.useState(0), fr = Boolean(s), q = () => {
    O((S) => {
      const M = Boolean(S);
      return rr({ target: "widget_open", data: !M }), v.current && !M && rr({
        target: "nft_info",
        data: { ...v.current, redirect: !0 }
      }), v.current = null, a.current = !M, !M;
    });
  };
  return U.useEffect(() => {
    (B || fr) && !w.current && ve(
      u && {
        ...u,
        requestSignature: fr
      }
    );
  }, [u, B, fr]), U.useEffect(() => {
    if (!(E != null && E.address))
      return;
    const S = E.address, M = ne(window.location.href);
    M.network && (v.current = {
      ...M,
      ownerAddress: S
    }), v.current ? rr({
      target: "nft_info",
      data: { ...v.current, redirect: !0 }
    }) : rr({ target: "nft_info", data: { ownerAddress: S } }), O(!0);
  }, [E]), U.useEffect(() => {
    const S = () => {
      if (window.location.href === y.current)
        return;
      y.current = window.location.href;
      const Y = ne(window.location.href);
      x && x("foundNft", JSON.stringify(Y)), Y.network && (v.current = Y), rr({ target: "nft_info", data: Y });
    }, M = new MutationObserver(S), W = { subtree: !0, childList: !0 };
    return S(), M.observe(document, W), () => M.disconnect();
  }, [x]), U.useEffect(() => {
    d.current = u;
  }, [u]), U.useEffect(() => {
    const S = (M) => {
      const W = M.data;
      W.target === "unread_cnt" && ir(W.data), W.target === "message_to_sign" && s && d.current && (rr({
        target: "origin",
        data: {
          domain: window.location.host,
          origin: window.location.protocol + window.location.host
        }
      }), s({ message: W.data }).then(
        (Y) => Y && rr({
          target: "signed_message",
          data: { signature: Y, signedMsg: W.data }
        })
      ).catch(
        () => rr({
          target: "signed_message",
          data: { signature: null, signedMsg: W.data }
        })
      )), W.target === "close_widget" && q(), W.target === "is_signed_in" && (W.data ? w.current = W.data : W.data === null && (w.current = !1, ve(d.current))), a.current && rr({ target: "widget_open", data: !0 });
    };
    return window.addEventListener("message", S), () => window.removeEventListener("message", S);
  }, [s]), /* @__PURE__ */ Br(
    "div",
    {
      className: mr(Ir["wallet-chat-widget__container"], {
        [Ir["wallet-chat-widget__container--open"]]: B
      }),
      style: p,
      children: [
        /* @__PURE__ */ z(
          "iframe",
          {
            title: "WalletChat",
            name: "WalletChat",
            id: be,
            className: mr("", {
              [Ir["widget-is-open"]]: B,
              [Ir["widget-is-closed"]]: !B
            }),
            src: dt
          }
        ),
        /* @__PURE__ */ z(
          pt,
          {
            notiVal: K,
            showNoti: K > 0,
            isOpen: B,
            clickHandler: q
          }
        )
      ]
    }
  );
}
const wt = ({
  onClick: u,
  children: s
}) => /* @__PURE__ */ z("button", { type: "button", onClick: u, children: s }), Et = ({
  ownerAddress: u,
  render: s
}) => {
  const p = U.useContext(Gr), y = p == null ? void 0 : p.setWidgetState, v = s ? ({ onClick: w, children: d }) => U.cloneElement(s, { onClick: w }, d) : wt;
  return p ? /* @__PURE__ */ Br(
    v,
    {
      onClick: () => y && y("ownerAddress", {
        address: u,
        lastRequest: Date.now().toString()
      }),
      children: [
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
      ]
    }
  ) : (console.error(
    "WalletChat: ChatWithOwner component must be rendered within a WalletChatProvider"
  ), null);
};
export {
  Et as ChatWithOwner,
  mt as WalletChatProvider,
  xt as WalletChatWidget,
  gt as types,
  vt as utils
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._ring_7tcsj_47{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._popupButton__container_7tcsj_5{position:relative;margin-top:.75rem;height:4rem;--tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / .15));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:margin-top,transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}._popupButton__container--open_7tcsj_9{right:1.5rem;margin-top:-4rem;--tw-translate-y: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._popupButton__container--open_7tcsj_9{right:0px;margin-top:.75rem;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._popupButton_7tcsj_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}._icon_7tcsj_23{transition-property:transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_7tcsj_23 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_7tcsj_31{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_7tcsj_35{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_7tcsj_39{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(219 39 119 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}._pinging_7tcsj_43{animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite}._ring_7tcsj_47{position:fixed;right:0px;display:inline-flex;height:4rem;width:4rem}@keyframes _ping_7tcsj_43{75%,to{transform:scale(2);opacity:0}}._ring_7tcsj_47{animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity));opacity:.75}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._ring_q714d_1{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}#_wallet-chat-widget_q714d_23{transition-property:width,min-width,height,min-height;transition-duration:.25s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(4px 4px 8px rgba(0,0,0,.5));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._widget-is-open_q714d_9{height:75vh;min-height:440px;width:calc(100vw - 2rem);--tw-translate-x: -1rem;--tw-translate-y: -.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._widget-is-open_q714d_9{height:65vh;width:15vw;min-width:440px;--tw-translate-x: 0px;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._widget-is-closed_q714d_13{height:0px;min-height:0px;width:0px;min-width:0px}._wallet-chat-widget__container_q714d_23{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;-moz-user-select:none;user-select:none}._wallet-chat-widget__container--open_q714d_27{bottom:0px;right:0px}@media (min-width: 640px){._wallet-chat-widget__container--open_q714d_27{bottom:.5rem;right:1.5rem}}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
