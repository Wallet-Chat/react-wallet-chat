import k from "react";
function ne(u) {
  const s = u.replace("https://", "").replace("http://", "").split("/"), v = s.length, y = s[v - 1], h = s[v - 2];
  if (u.startsWith("looksrare.org"))
    return { itemId: y, contractAddress: h, network: "ethereum" };
  const d = s[v - 3];
  return v >= 5 ? { itemId: y, contractAddress: h, network: d } : u.startsWith("x2y2.io") && d === "eth" ? { itemId: y, contractAddress: h, network: "ethereum" } : { contractAddress: null, itemId: null, network: null };
}
const dt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseNftFromUrl: ne
}, Symbol.toStringTag, { value: "Module" })), wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var je = {}, Vr = {};
Vr.byteLength = De;
Vr.toByteArray = Me;
Vr.fromByteArray = $e;
var rr = [], K = [], Pe = typeof Uint8Array < "u" ? Uint8Array : Array, re = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var gr = 0, Ne = re.length; gr < Ne; ++gr)
  rr[gr] = re[gr], K[re.charCodeAt(gr)] = gr;
K["-".charCodeAt(0)] = 62;
K["_".charCodeAt(0)] = 63;
function ye(u) {
  var f = u.length;
  if (f % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var s = u.indexOf("=");
  s === -1 && (s = f);
  var v = s === f ? 0 : 4 - s % 4;
  return [s, v];
}
function De(u) {
  var f = ye(u), s = f[0], v = f[1];
  return (s + v) * 3 / 4 - v;
}
function Le(u, f, s) {
  return (f + s) * 3 / 4 - s;
}
function Me(u) {
  var f, s = ye(u), v = s[0], y = s[1], h = new Pe(Le(u, v, y)), d = 0, a = y > 0 ? v - 4 : v, g;
  for (g = 0; g < a; g += 4)
    f = K[u.charCodeAt(g)] << 18 | K[u.charCodeAt(g + 1)] << 12 | K[u.charCodeAt(g + 2)] << 6 | K[u.charCodeAt(g + 3)], h[d++] = f >> 16 & 255, h[d++] = f >> 8 & 255, h[d++] = f & 255;
  return y === 2 && (f = K[u.charCodeAt(g)] << 2 | K[u.charCodeAt(g + 1)] >> 4, h[d++] = f & 255), y === 1 && (f = K[u.charCodeAt(g)] << 10 | K[u.charCodeAt(g + 1)] << 4 | K[u.charCodeAt(g + 2)] >> 2, h[d++] = f >> 8 & 255, h[d++] = f & 255), h;
}
function We(u) {
  return rr[u >> 18 & 63] + rr[u >> 12 & 63] + rr[u >> 6 & 63] + rr[u & 63];
}
function Ye(u, f, s) {
  for (var v, y = [], h = f; h < s; h += 3)
    v = (u[h] << 16 & 16711680) + (u[h + 1] << 8 & 65280) + (u[h + 2] & 255), y.push(We(v));
  return y.join("");
}
function $e(u) {
  for (var f, s = u.length, v = s % 3, y = [], h = 16383, d = 0, a = s - v; d < a; d += h)
    y.push(Ye(u, d, d + h > a ? a : d + h));
  return v === 1 ? (f = u[s - 1], y.push(
    rr[f >> 2] + rr[f << 4 & 63] + "=="
  )) : v === 2 && (f = (u[s - 2] << 8) + u[s - 1], y.push(
    rr[f >> 10] + rr[f >> 4 & 63] + rr[f << 2 & 63] + "="
  )), y.join("");
}
var ue = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ue.read = function(u, f, s, v, y) {
  var h, d, a = y * 8 - v - 1, g = (1 << a) - 1, E = g >> 1, x = -7, _ = s ? y - 1 : 0, F = s ? -1 : 1, S = u[f + _];
  for (_ += F, h = S & (1 << -x) - 1, S >>= -x, x += a; x > 0; h = h * 256 + u[f + _], _ += F, x -= 8)
    ;
  for (d = h & (1 << -x) - 1, h >>= -x, x += v; x > 0; d = d * 256 + u[f + _], _ += F, x -= 8)
    ;
  if (h === 0)
    h = 1 - E;
  else {
    if (h === g)
      return d ? NaN : (S ? -1 : 1) * (1 / 0);
    d = d + Math.pow(2, v), h = h - E;
  }
  return (S ? -1 : 1) * d * Math.pow(2, h - v);
};
ue.write = function(u, f, s, v, y, h) {
  var d, a, g, E = h * 8 - y - 1, x = (1 << E) - 1, _ = x >> 1, F = y === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, S = v ? 0 : h - 1, j = v ? 1 : -1, P = f < 0 || f === 0 && 1 / f < 0 ? 1 : 0;
  for (f = Math.abs(f), isNaN(f) || f === 1 / 0 ? (a = isNaN(f) ? 1 : 0, d = x) : (d = Math.floor(Math.log(f) / Math.LN2), f * (g = Math.pow(2, -d)) < 1 && (d--, g *= 2), d + _ >= 1 ? f += F / g : f += F * Math.pow(2, 1 - _), f * g >= 2 && (d++, g /= 2), d + _ >= x ? (a = 0, d = x) : d + _ >= 1 ? (a = (f * g - 1) * Math.pow(2, y), d = d + _) : (a = f * Math.pow(2, _ - 1) * Math.pow(2, y), d = 0)); y >= 8; u[s + S] = a & 255, S += j, a /= 256, y -= 8)
    ;
  for (d = d << y | a, E += y; E > 0; u[s + S] = d & 255, S += j, d /= 256, E -= 8)
    ;
  u[s + S - j] |= P * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  var f = Vr, s = ue, v = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  u.Buffer = a, u.SlowBuffer = Ir, u.INSPECT_MAX_BYTES = 50;
  var y = 2147483647;
  u.kMaxLength = y, a.TYPED_ARRAY_SUPPORT = h(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function h() {
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
      return _(t);
    }
    return g(t, r, e);
  }
  a.poolSize = 8192;
  function g(t, r, e) {
    if (typeof t == "string")
      return F(t, r);
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
    var o = H(t);
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
  function E(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function x(t, r, e) {
    return E(t), t <= 0 ? d(t) : r !== void 0 ? typeof e == "string" ? d(t).fill(r, e) : d(t).fill(r) : d(t);
  }
  a.alloc = function(t, r, e) {
    return x(t, r, e);
  };
  function _(t) {
    return E(t), d(t < 0 ? 0 : X(t) | 0);
  }
  a.allocUnsafe = function(t) {
    return _(t);
  }, a.allocUnsafeSlow = function(t) {
    return _(t);
  };
  function F(t, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !a.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var e = O(t, r) | 0, n = d(e), o = n.write(t, r);
    return o !== e && (n = n.slice(0, o)), n;
  }
  function S(t) {
    for (var r = t.length < 0 ? 0 : X(t.length) | 0, e = d(r), n = 0; n < r; n += 1)
      e[n] = t[n] & 255;
    return e;
  }
  function j(t) {
    if (J(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return P(r.buffer, r.byteOffset, r.byteLength);
    }
    return S(t);
  }
  function P(t, r, e) {
    if (r < 0 || t.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < r + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var n;
    return r === void 0 && e === void 0 ? n = new Uint8Array(t) : e === void 0 ? n = new Uint8Array(t, r) : n = new Uint8Array(t, r, e), Object.setPrototypeOf(n, a.prototype), n;
  }
  function H(t) {
    if (a.isBuffer(t)) {
      var r = X(t.length) | 0, e = d(r);
      return e.length === 0 || t.copy(e, 0, 0, r), e;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || Ar(t.length) ? d(0) : S(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return S(t.data);
  }
  function X(t) {
    if (t >= y)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + y.toString(16) + " bytes");
    return t | 0;
  }
  function Ir(t) {
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
    for (var n = r.length, o = e.length, c = 0, p = Math.min(n, o); c < p; ++c)
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
      var p = r[n];
      if (J(p, Uint8Array))
        c + p.length > o.length ? a.from(p).copy(o, c) : Uint8Array.prototype.set.call(
          o,
          p,
          c
        );
      else if (a.isBuffer(p))
        p.copy(o, c);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      c += p.length;
    }
    return o;
  };
  function O(t, r) {
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
  a.byteLength = O;
  function Br(t, r, e) {
    var n = !1;
    if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, r >>>= 0, e <= r))
      return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return Pr(this, r, e);
        case "utf8":
        case "utf-8":
          return V(this, r, e);
        case "ascii":
          return kr(this, r, e);
        case "latin1":
        case "binary":
          return jr(this, r, e);
        case "base64":
          return Ur(this, r, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Nr(this, r, e);
        default:
          if (n)
            throw new TypeError("Unknown encoding: " + t);
          t = (t + "").toLowerCase(), n = !0;
      }
  }
  a.prototype._isBuffer = !0;
  function er(t, r, e) {
    var n = t[r];
    t[r] = t[e], t[e] = n;
  }
  a.prototype.swap16 = function() {
    var r = this.length;
    if (r % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var e = 0; e < r; e += 2)
      er(this, e, e + 1);
    return this;
  }, a.prototype.swap32 = function() {
    var r = this.length;
    if (r % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var e = 0; e < r; e += 4)
      er(this, e, e + 3), er(this, e + 1, e + 2);
    return this;
  }, a.prototype.swap64 = function() {
    var r = this.length;
    if (r % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var e = 0; e < r; e += 8)
      er(this, e, e + 7), er(this, e + 1, e + 6), er(this, e + 2, e + 5), er(this, e + 3, e + 4);
    return this;
  }, a.prototype.toString = function() {
    var r = this.length;
    return r === 0 ? "" : arguments.length === 0 ? V(this, 0, r) : Br.apply(this, arguments);
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
    for (var p = c - o, b = n - e, T = Math.min(p, b), C = this.slice(o, c), W = r.slice(e, n), U = 0; U < T; ++U)
      if (C[U] !== W[U]) {
        p = C[U], b = W[U];
        break;
      }
    return p < b ? -1 : b < p ? 1 : 0;
  };
  function Sr(t, r, e, n, o) {
    if (t.length === 0)
      return -1;
    if (typeof e == "string" ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, Ar(e) && (e = o ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
      if (o)
        return -1;
      e = t.length - 1;
    } else if (e < 0)
      if (o)
        e = 0;
      else
        return -1;
    if (typeof r == "string" && (r = a.from(r, n)), a.isBuffer(r))
      return r.length === 0 ? -1 : tr(t, r, e, n, o);
    if (typeof r == "number")
      return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? o ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : tr(t, [r], e, n, o);
    throw new TypeError("val must be string, number or Buffer");
  }
  function tr(t, r, e, n, o) {
    var c = 1, p = t.length, b = r.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || r.length < 2)
        return -1;
      c = 2, p /= 2, b /= 2, e /= 2;
    }
    function T(Wr, Yr) {
      return c === 1 ? Wr[Yr] : Wr.readUInt16BE(Yr * c);
    }
    var C;
    if (o) {
      var W = -1;
      for (C = e; C < p; C++)
        if (T(t, C) === T(r, W === -1 ? 0 : C - W)) {
          if (W === -1 && (W = C), C - W + 1 === b)
            return W * c;
        } else
          W !== -1 && (C -= C - W), W = -1;
    } else
      for (e + b > p && (e = p - b), C = e; C >= 0; C--) {
        for (var U = !0, dr = 0; dr < b; dr++)
          if (T(t, C + dr) !== T(r, dr)) {
            U = !1;
            break;
          }
        if (U)
          return C;
      }
    return -1;
  }
  a.prototype.includes = function(r, e, n) {
    return this.indexOf(r, e, n) !== -1;
  }, a.prototype.indexOf = function(r, e, n) {
    return Sr(this, r, e, n, !0);
  }, a.prototype.lastIndexOf = function(r, e, n) {
    return Sr(this, r, e, n, !1);
  };
  function $(t, r, e, n) {
    e = Number(e) || 0;
    var o = t.length - e;
    n ? (n = Number(n), n > o && (n = o)) : n = o;
    var c = r.length;
    n > c / 2 && (n = c / 2);
    for (var p = 0; p < n; ++p) {
      var b = parseInt(r.substr(p * 2, 2), 16);
      if (Ar(b))
        return p;
      t[e + p] = b;
    }
    return p;
  }
  function zr(t, r, e, n) {
    return fr(cr(r, t.length - e), t, e, n);
  }
  function Gr(t, r, e, n) {
    return fr(Rr(r), t, e, n);
  }
  function Hr(t, r, e, n) {
    return fr(Mr(r), t, e, n);
  }
  function Kr(t, r, e, n) {
    return fr(pr(r, t.length - e), t, e, n);
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
    for (var p = !1; ; )
      switch (o) {
        case "hex":
          return $(this, r, e, n);
        case "utf8":
        case "utf-8":
          return zr(this, r, e, n);
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
          return Kr(this, r, e, n);
        default:
          if (p)
            throw new TypeError("Unknown encoding: " + o);
          o = ("" + o).toLowerCase(), p = !0;
      }
  }, a.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function Ur(t, r, e) {
    return r === 0 && e === t.length ? f.fromByteArray(t) : f.fromByteArray(t.slice(r, e));
  }
  function V(t, r, e) {
    e = Math.min(t.length, e);
    for (var n = [], o = r; o < e; ) {
      var c = t[o], p = null, b = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
      if (o + b <= e) {
        var T, C, W, U;
        switch (b) {
          case 1:
            c < 128 && (p = c);
            break;
          case 2:
            T = t[o + 1], (T & 192) === 128 && (U = (c & 31) << 6 | T & 63, U > 127 && (p = U));
            break;
          case 3:
            T = t[o + 1], C = t[o + 2], (T & 192) === 128 && (C & 192) === 128 && (U = (c & 15) << 12 | (T & 63) << 6 | C & 63, U > 2047 && (U < 55296 || U > 57343) && (p = U));
            break;
          case 4:
            T = t[o + 1], C = t[o + 2], W = t[o + 3], (T & 192) === 128 && (C & 192) === 128 && (W & 192) === 128 && (U = (c & 15) << 18 | (T & 63) << 12 | (C & 63) << 6 | W & 63, U > 65535 && U < 1114112 && (p = U));
        }
      }
      p === null ? (p = 65533, b = 1) : p > 65535 && (p -= 65536, n.push(p >>> 10 & 1023 | 55296), p = 56320 | p & 1023), n.push(p), o += b;
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
  function kr(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var o = r; o < e; ++o)
      n += String.fromCharCode(t[o] & 127);
    return n;
  }
  function jr(t, r, e) {
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
  function Nr(t, r, e) {
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
    for (var o = this[r], c = 1, p = 0; ++p < e && (c *= 256); )
      o += this[r + p] * c;
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
    for (var o = this[r], c = 1, p = 0; ++p < e && (c *= 256); )
      o += this[r + p] * c;
    return c *= 128, o >= c && (o -= Math.pow(2, 8 * e)), o;
  }, a.prototype.readIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || N(r, e, this.length);
    for (var o = e, c = 1, p = this[r + --o]; o > 0 && (c *= 256); )
      p += this[r + --o] * c;
    return c *= 128, p >= c && (p -= Math.pow(2, 8 * e)), p;
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
    return r = r >>> 0, e || N(r, 4, this.length), s.read(this, r, !0, 23, 4);
  }, a.prototype.readFloatBE = function(r, e) {
    return r = r >>> 0, e || N(r, 4, this.length), s.read(this, r, !1, 23, 4);
  }, a.prototype.readDoubleLE = function(r, e) {
    return r = r >>> 0, e || N(r, 8, this.length), s.read(this, r, !0, 52, 8);
  }, a.prototype.readDoubleBE = function(r, e) {
    return r = r >>> 0, e || N(r, 8, this.length), s.read(this, r, !1, 52, 8);
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
    var p = 1, b = 0;
    for (this[e] = r & 255; ++b < n && (p *= 256); )
      this[e + b] = r / p & 255;
    return e + n;
  }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !o) {
      var c = Math.pow(2, 8 * n) - 1;
      Y(this, r, e, n, c, 0);
    }
    var p = n - 1, b = 1;
    for (this[e + p] = r & 255; --p >= 0 && (b *= 256); )
      this[e + p] = r / b & 255;
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
    var p = 0, b = 1, T = 0;
    for (this[e] = r & 255; ++p < n && (b *= 256); )
      r < 0 && T === 0 && this[e + p - 1] !== 0 && (T = 1), this[e + p] = (r / b >> 0) - T & 255;
    return e + n;
  }, a.prototype.writeIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var c = Math.pow(2, 8 * n - 1);
      Y(this, r, e, n, c - 1, -c);
    }
    var p = n - 1, b = 1, T = 0;
    for (this[e + p] = r & 255; --p >= 0 && (b *= 256); )
      r < 0 && T === 0 && this[e + p + 1] !== 0 && (T = 1), this[e + p] = (r / b >> 0) - T & 255;
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
  function Er(t, r, e, n, o, c) {
    if (e + n > t.length)
      throw new RangeError("Index out of range");
    if (e < 0)
      throw new RangeError("Index out of range");
  }
  function Dr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || Er(t, r, e, 4), s.write(t, r, e, n, 23, 4), e + 4;
  }
  a.prototype.writeFloatLE = function(r, e, n) {
    return Dr(this, r, e, !0, n);
  }, a.prototype.writeFloatBE = function(r, e, n) {
    return Dr(this, r, e, !1, n);
  };
  function Lr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || Er(t, r, e, 8), s.write(t, r, e, n, 52, 8), e + 8;
  }
  a.prototype.writeDoubleLE = function(r, e, n) {
    return Lr(this, r, e, !0, n);
  }, a.prototype.writeDoubleBE = function(r, e, n) {
    return Lr(this, r, e, !1, n);
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
    var p;
    if (typeof r == "number")
      for (p = e; p < n; ++p)
        this[p] = r;
    else {
      var b = a.isBuffer(r) ? r : a.from(r, o), T = b.length;
      if (T === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (p = 0; p < n - e; ++p)
        this[p + e] = b[p % T];
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
  function cr(t, r) {
    r = r || 1 / 0;
    for (var e, n = t.length, o = null, c = [], p = 0; p < n; ++p) {
      if (e = t.charCodeAt(p), e > 55295 && e < 57344) {
        if (!o) {
          if (e > 56319) {
            (r -= 3) > -1 && c.push(239, 191, 189);
            continue;
          } else if (p + 1 === n) {
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
  function Rr(t) {
    for (var r = [], e = 0; e < t.length; ++e)
      r.push(t.charCodeAt(e) & 255);
    return r;
  }
  function pr(t, r) {
    for (var e, n, o, c = [], p = 0; p < t.length && !((r -= 2) < 0); ++p)
      e = t.charCodeAt(p), n = e >> 8, o = e % 256, c.push(o), c.push(n);
    return c;
  }
  function Mr(t) {
    return f.toByteArray(br(t));
  }
  function fr(t, r, e, n) {
    for (var o = 0; o < n && !(o + e >= r.length || o >= t.length); ++o)
      r[o + e] = t[o];
    return o;
  }
  function J(t, r) {
    return t instanceof r || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === r.name;
  }
  function Ar(t) {
    return t !== t;
  }
  var hr = function() {
    for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
      for (var n = e * 16, o = 0; o < 16; ++o)
        r[n + o] = t[e] + t[o];
    return r;
  }();
})(je);
var qr = {}, qe = {
  get exports() {
    return qr;
  },
  set exports(u) {
    qr = u;
  }
}, L = qe.exports = {}, Q, Z;
function ie() {
  throw new Error("setTimeout has not been defined");
}
function ae() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Q = setTimeout : Q = ie;
  } catch {
    Q = ie;
  }
  try {
    typeof clearTimeout == "function" ? Z = clearTimeout : Z = ae;
  } catch {
    Z = ae;
  }
})();
function xe(u) {
  if (Q === setTimeout)
    return setTimeout(u, 0);
  if ((Q === ie || !Q) && setTimeout)
    return Q = setTimeout, setTimeout(u, 0);
  try {
    return Q(u, 0);
  } catch {
    try {
      return Q.call(null, u, 0);
    } catch {
      return Q.call(this, u, 0);
    }
  }
}
function Ve(u) {
  if (Z === clearTimeout)
    return clearTimeout(u);
  if ((Z === ae || !Z) && clearTimeout)
    return Z = clearTimeout, clearTimeout(u);
  try {
    return Z(u);
  } catch {
    try {
      return Z.call(null, u);
    } catch {
      return Z.call(this, u);
    }
  }
}
var ar = [], mr = !1, lr, $r = -1;
function Je() {
  !mr || !lr || (mr = !1, lr.length ? ar = lr.concat(ar) : $r = -1, ar.length && me());
}
function me() {
  if (!mr) {
    var u = xe(Je);
    mr = !0;
    for (var f = ar.length; f; ) {
      for (lr = ar, ar = []; ++$r < f; )
        lr && lr[$r].run();
      $r = -1, f = ar.length;
    }
    lr = null, mr = !1, Ve(u);
  }
}
L.nextTick = function(u) {
  var f = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var s = 1; s < arguments.length; s++)
      f[s - 1] = arguments[s];
  ar.push(new Ee(u, f)), ar.length === 1 && !mr && xe(me);
};
function Ee(u, f) {
  this.fun = u, this.array = f;
}
Ee.prototype.run = function() {
  this.fun.apply(null, this.array);
};
L.title = "browser";
L.browser = !0;
L.env = {};
L.argv = [];
L.version = "";
L.versions = {};
function or() {
}
L.on = or;
L.addListener = or;
L.once = or;
L.off = or;
L.removeListener = or;
L.removeAllListeners = or;
L.emit = or;
L.prependListener = or;
L.prependOnceListener = or;
L.listeners = function(u) {
  return [];
};
L.binding = function(u) {
  throw new Error("process.binding is not supported");
};
L.cwd = function() {
  return "/";
};
L.chdir = function(u) {
  throw new Error("process.chdir is not supported");
};
L.umask = function() {
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
  var s = __magic__;
  return s;
})(Object);
var Cr = {}, ze = {
  get exports() {
    return Cr;
  },
  set exports(u) {
    Cr = u;
  }
}, yr = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ee, we;
function _e() {
  if (we)
    return ee;
  we = 1;
  var u = Object.getOwnPropertySymbols, f = Object.prototype.hasOwnProperty, s = Object.prototype.propertyIsEnumerable;
  function v(h) {
    if (h == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(h);
  }
  function y() {
    try {
      if (!Object.assign)
        return !1;
      var h = new String("abc");
      if (h[5] = "de", Object.getOwnPropertyNames(h)[0] === "5")
        return !1;
      for (var d = {}, a = 0; a < 10; a++)
        d["_" + String.fromCharCode(a)] = a;
      var g = Object.getOwnPropertyNames(d).map(function(x) {
        return d[x];
      });
      if (g.join("") !== "0123456789")
        return !1;
      var E = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(x) {
        E[x] = x;
      }), Object.keys(Object.assign({}, E)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return ee = y() ? Object.assign : function(h, d) {
    for (var a, g = v(h), E, x = 1; x < arguments.length; x++) {
      a = Object(arguments[x]);
      for (var _ in a)
        f.call(a, _) && (g[_] = a[_]);
      if (u) {
        E = u(a);
        for (var F = 0; F < E.length; F++)
          s.call(a, E[F]) && (g[E[F]] = a[E[F]]);
      }
    }
    return g;
  }, ee;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ve;
function Ge() {
  if (ve)
    return yr;
  ve = 1, _e();
  var u = k, f = 60103;
  if (yr.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var s = Symbol.for;
    f = s("react.element"), yr.Fragment = s("react.fragment");
  }
  var v = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, y = Object.prototype.hasOwnProperty, h = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(a, g, E) {
    var x, _ = {}, F = null, S = null;
    E !== void 0 && (F = "" + E), g.key !== void 0 && (F = "" + g.key), g.ref !== void 0 && (S = g.ref);
    for (x in g)
      y.call(g, x) && !h.hasOwnProperty(x) && (_[x] = g[x]);
    if (a && a.defaultProps)
      for (x in g = a.defaultProps, g)
        _[x] === void 0 && (_[x] = g[x]);
    return { $$typeof: f, type: a, key: F, ref: S, props: _, _owner: v.current };
  }
  return yr.jsx = d, yr.jsxs = d, yr;
}
var te = {}, ge;
function He() {
  return ge || (ge = 1, function(u) {
    qr.env.NODE_ENV !== "production" && function() {
      var f = k, s = _e(), v = 60103, y = 60106;
      u.Fragment = 60107;
      var h = 60108, d = 60114, a = 60109, g = 60110, E = 60112, x = 60113, _ = 60120, F = 60115, S = 60116, j = 60121, P = 60122, H = 60117, X = 60129, Ir = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var O = Symbol.for;
        v = O("react.element"), y = O("react.portal"), u.Fragment = O("react.fragment"), h = O("react.strict_mode"), d = O("react.profiler"), a = O("react.provider"), g = O("react.context"), E = O("react.forward_ref"), x = O("react.suspense"), _ = O("react.suspense_list"), F = O("react.memo"), S = O("react.lazy"), j = O("react.block"), P = O("react.server.block"), H = O("react.fundamental"), O("react.scope"), O("react.opaque.id"), X = O("react.debug_trace_mode"), O("react.offscreen"), Ir = O("react.legacy_hidden");
      }
      var Br = typeof Symbol == "function" && Symbol.iterator, er = "@@iterator";
      function Sr(i) {
        if (i === null || typeof i != "object")
          return null;
        var l = Br && i[Br] || i[er];
        return typeof l == "function" ? l : null;
      }
      var tr = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function $(i) {
        {
          for (var l = arguments.length, w = new Array(l > 1 ? l - 1 : 0), m = 1; m < l; m++)
            w[m - 1] = arguments[m];
          zr("error", i, w);
        }
      }
      function zr(i, l, w) {
        {
          var m = tr.ReactDebugCurrentFrame, I = m.getStackAddendum();
          I !== "" && (l += "%s", w = w.concat([I]));
          var B = w.map(function(A) {
            return "" + A;
          });
          B.unshift("Warning: " + l), Function.prototype.apply.call(console[i], console, B);
        }
      }
      var Gr = !1;
      function Hr(i) {
        return !!(typeof i == "string" || typeof i == "function" || i === u.Fragment || i === d || i === X || i === h || i === x || i === _ || i === Ir || Gr || typeof i == "object" && i !== null && (i.$$typeof === S || i.$$typeof === F || i.$$typeof === a || i.$$typeof === g || i.$$typeof === E || i.$$typeof === H || i.$$typeof === j || i[0] === P));
      }
      function Kr(i, l, w) {
        var m = l.displayName || l.name || "";
        return i.displayName || (m !== "" ? w + "(" + m + ")" : w);
      }
      function Ur(i) {
        return i.displayName || "Context";
      }
      function V(i) {
        if (i == null)
          return null;
        if (typeof i.tag == "number" && $("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof i == "function")
          return i.displayName || i.name || null;
        if (typeof i == "string")
          return i;
        switch (i) {
          case u.Fragment:
            return "Fragment";
          case y:
            return "Portal";
          case d:
            return "Profiler";
          case h:
            return "StrictMode";
          case x:
            return "Suspense";
          case _:
            return "SuspenseList";
        }
        if (typeof i == "object")
          switch (i.$$typeof) {
            case g:
              var l = i;
              return Ur(l) + ".Consumer";
            case a:
              var w = i;
              return Ur(w._context) + ".Provider";
            case E:
              return Kr(i, i.render, "ForwardRef");
            case F:
              return V(i.type);
            case j:
              return V(i._render);
            case S: {
              var m = i, I = m._payload, B = m._init;
              try {
                return V(B(I));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var ur = 0, Or, kr, jr, Pr, Nr, N, Y;
      function Er() {
      }
      Er.__reactDisabledLog = !0;
      function Dr() {
        {
          if (ur === 0) {
            Or = console.log, kr = console.info, jr = console.warn, Pr = console.error, Nr = console.group, N = console.groupCollapsed, Y = console.groupEnd;
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
          ur++;
        }
      }
      function Lr() {
        {
          if (ur--, ur === 0) {
            var i = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: s({}, i, {
                value: Or
              }),
              info: s({}, i, {
                value: kr
              }),
              warn: s({}, i, {
                value: jr
              }),
              error: s({}, i, {
                value: Pr
              }),
              group: s({}, i, {
                value: Nr
              }),
              groupCollapsed: s({}, i, {
                value: N
              }),
              groupEnd: s({}, i, {
                value: Y
              })
            });
          }
          ur < 0 && $("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var _r = tr.ReactCurrentDispatcher, br;
      function cr(i, l, w) {
        {
          if (br === void 0)
            try {
              throw Error();
            } catch (I) {
              var m = I.stack.trim().match(/\n( *(at )?)/);
              br = m && m[1] || "";
            }
          return `
` + br + i;
        }
      }
      var Rr = !1, pr;
      {
        var Mr = typeof WeakMap == "function" ? WeakMap : Map;
        pr = new Mr();
      }
      function fr(i, l) {
        if (!i || Rr)
          return "";
        {
          var w = pr.get(i);
          if (w !== void 0)
            return w;
        }
        var m;
        Rr = !0;
        var I = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var B;
        B = _r.current, _r.current = null, Dr();
        try {
          if (l) {
            var A = function() {
              throw Error();
            };
            if (Object.defineProperty(A.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(A, []);
              } catch (ir) {
                m = ir;
              }
              Reflect.construct(i, [], A);
            } else {
              try {
                A.call();
              } catch (ir) {
                m = ir;
              }
              i.call(A.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (ir) {
              m = ir;
            }
            i();
          }
        } catch (ir) {
          if (ir && m && typeof ir.stack == "string") {
            for (var R = ir.stack.split(`
`), q = m.stack.split(`
`), D = R.length - 1, M = q.length - 1; D >= 1 && M >= 0 && R[D] !== q[M]; )
              M--;
            for (; D >= 1 && M >= 0; D--, M--)
              if (R[D] !== q[M]) {
                if (D !== 1 || M !== 1)
                  do
                    if (D--, M--, M < 0 || R[D] !== q[M]) {
                      var nr = `
` + R[D].replace(" at new ", " at ");
                      return typeof i == "function" && pr.set(i, nr), nr;
                    }
                  while (D >= 1 && M >= 0);
                break;
              }
          }
        } finally {
          Rr = !1, _r.current = B, Lr(), Error.prepareStackTrace = I;
        }
        var vr = i ? i.displayName || i.name : "", de = vr ? cr(vr) : "";
        return typeof i == "function" && pr.set(i, de), de;
      }
      function J(i, l, w) {
        return fr(i, !1);
      }
      function Ar(i) {
        var l = i.prototype;
        return !!(l && l.isReactComponent);
      }
      function hr(i, l, w) {
        if (i == null)
          return "";
        if (typeof i == "function")
          return fr(i, Ar(i));
        if (typeof i == "string")
          return cr(i);
        switch (i) {
          case x:
            return cr("Suspense");
          case _:
            return cr("SuspenseList");
        }
        if (typeof i == "object")
          switch (i.$$typeof) {
            case E:
              return J(i.render);
            case F:
              return hr(i.type, l, w);
            case j:
              return J(i._render);
            case S: {
              var m = i, I = m._payload, B = m._init;
              try {
                return hr(B(I), l, w);
              } catch {
              }
            }
          }
        return "";
      }
      var t = {}, r = tr.ReactDebugCurrentFrame;
      function e(i) {
        if (i) {
          var l = i._owner, w = hr(i.type, i._source, l ? l.type : null);
          r.setExtraStackFrame(w);
        } else
          r.setExtraStackFrame(null);
      }
      function n(i, l, w, m, I) {
        {
          var B = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var A in i)
            if (B(i, A)) {
              var R = void 0;
              try {
                if (typeof i[A] != "function") {
                  var q = Error((m || "React class") + ": " + w + " type `" + A + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[A] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw q.name = "Invariant Violation", q;
                }
                R = i[A](l, A, m, w, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (D) {
                R = D;
              }
              R && !(R instanceof Error) && (e(I), $("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", w, A, typeof R), e(null)), R instanceof Error && !(R.message in t) && (t[R.message] = !0, e(I), $("Failed %s type: %s", w, R.message), e(null));
            }
        }
      }
      var o = tr.ReactCurrentOwner, c = Object.prototype.hasOwnProperty, p = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, b, T, C;
      C = {};
      function W(i) {
        if (c.call(i, "ref")) {
          var l = Object.getOwnPropertyDescriptor(i, "ref").get;
          if (l && l.isReactWarning)
            return !1;
        }
        return i.ref !== void 0;
      }
      function U(i) {
        if (c.call(i, "key")) {
          var l = Object.getOwnPropertyDescriptor(i, "key").get;
          if (l && l.isReactWarning)
            return !1;
        }
        return i.key !== void 0;
      }
      function dr(i, l) {
        if (typeof i.ref == "string" && o.current && l && o.current.stateNode !== l) {
          var w = V(o.current.type);
          C[w] || ($('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', V(o.current.type), i.ref), C[w] = !0);
        }
      }
      function Wr(i, l) {
        {
          var w = function() {
            b || (b = !0, $("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", l));
          };
          w.isReactWarning = !0, Object.defineProperty(i, "key", {
            get: w,
            configurable: !0
          });
        }
      }
      function Yr(i, l) {
        {
          var w = function() {
            T || (T = !0, $("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", l));
          };
          w.isReactWarning = !0, Object.defineProperty(i, "ref", {
            get: w,
            configurable: !0
          });
        }
      }
      var Ae = function(i, l, w, m, I, B, A) {
        var R = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: v,
          // Built-in properties that belong on the element
          type: i,
          key: l,
          ref: w,
          props: A,
          // Record the component responsible for creating this element.
          _owner: B
        };
        return R._store = {}, Object.defineProperty(R._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(R, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: m
        }), Object.defineProperty(R, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: I
        }), Object.freeze && (Object.freeze(R.props), Object.freeze(R)), R;
      };
      function Te(i, l, w, m, I) {
        {
          var B, A = {}, R = null, q = null;
          w !== void 0 && (R = "" + w), U(l) && (R = "" + l.key), W(l) && (q = l.ref, dr(l, I));
          for (B in l)
            c.call(l, B) && !p.hasOwnProperty(B) && (A[B] = l[B]);
          if (i && i.defaultProps) {
            var D = i.defaultProps;
            for (B in D)
              A[B] === void 0 && (A[B] = D[B]);
          }
          if (R || q) {
            var M = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
            R && Wr(A, M), q && Yr(A, M);
          }
          return Ae(i, R, q, I, m, o.current, A);
        }
      }
      var Xr = tr.ReactCurrentOwner, ce = tr.ReactDebugCurrentFrame;
      function wr(i) {
        if (i) {
          var l = i._owner, w = hr(i.type, i._source, l ? l.type : null);
          ce.setExtraStackFrame(w);
        } else
          ce.setExtraStackFrame(null);
      }
      var Qr;
      Qr = !1;
      function Zr(i) {
        return typeof i == "object" && i !== null && i.$$typeof === v;
      }
      function fe() {
        {
          if (Xr.current) {
            var i = V(Xr.current.type);
            if (i)
              return `

Check the render method of \`` + i + "`.";
          }
          return "";
        }
      }
      function Fe(i) {
        {
          if (i !== void 0) {
            var l = i.fileName.replace(/^.*[\\\/]/, ""), w = i.lineNumber;
            return `

Check your code at ` + l + ":" + w + ".";
          }
          return "";
        }
      }
      var se = {};
      function Ce(i) {
        {
          var l = fe();
          if (!l) {
            var w = typeof i == "string" ? i : i.displayName || i.name;
            w && (l = `

Check the top-level render call using <` + w + ">.");
          }
          return l;
        }
      }
      function le(i, l) {
        {
          if (!i._store || i._store.validated || i.key != null)
            return;
          i._store.validated = !0;
          var w = Ce(l);
          if (se[w])
            return;
          se[w] = !0;
          var m = "";
          i && i._owner && i._owner !== Xr.current && (m = " It was passed a child from " + V(i._owner.type) + "."), wr(i), $('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', w, m), wr(null);
        }
      }
      function pe(i, l) {
        {
          if (typeof i != "object")
            return;
          if (Array.isArray(i))
            for (var w = 0; w < i.length; w++) {
              var m = i[w];
              Zr(m) && le(m, l);
            }
          else if (Zr(i))
            i._store && (i._store.validated = !0);
          else if (i) {
            var I = Sr(i);
            if (typeof I == "function" && I !== i.entries)
              for (var B = I.call(i), A; !(A = B.next()).done; )
                Zr(A.value) && le(A.value, l);
          }
        }
      }
      function Ie(i) {
        {
          var l = i.type;
          if (l == null || typeof l == "string")
            return;
          var w;
          if (typeof l == "function")
            w = l.propTypes;
          else if (typeof l == "object" && (l.$$typeof === E || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          l.$$typeof === F))
            w = l.propTypes;
          else
            return;
          if (w) {
            var m = V(l);
            n(w, i.props, "prop", m, i);
          } else if (l.PropTypes !== void 0 && !Qr) {
            Qr = !0;
            var I = V(l);
            $("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", I || "Unknown");
          }
          typeof l.getDefaultProps == "function" && !l.getDefaultProps.isReactClassApproved && $("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Be(i) {
        {
          for (var l = Object.keys(i.props), w = 0; w < l.length; w++) {
            var m = l[w];
            if (m !== "children" && m !== "key") {
              wr(i), $("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), wr(null);
              break;
            }
          }
          i.ref !== null && (wr(i), $("Invalid attribute `ref` supplied to `React.Fragment`."), wr(null));
        }
      }
      function he(i, l, w, m, I, B) {
        {
          var A = Hr(i);
          if (!A) {
            var R = "";
            (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var q = Fe(I);
            q ? R += q : R += fe();
            var D;
            i === null ? D = "null" : Array.isArray(i) ? D = "array" : i !== void 0 && i.$$typeof === v ? (D = "<" + (V(i.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : D = typeof i, $("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", D, R);
          }
          var M = Te(i, l, w, I, B);
          if (M == null)
            return M;
          if (A) {
            var nr = l.children;
            if (nr !== void 0)
              if (m)
                if (Array.isArray(nr)) {
                  for (var vr = 0; vr < nr.length; vr++)
                    pe(nr[vr], i);
                  Object.freeze && Object.freeze(nr);
                } else
                  $("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                pe(nr, i);
          }
          return i === u.Fragment ? Be(M) : Ie(M), M;
        }
      }
      function Se(i, l, w) {
        return he(i, l, w, !0);
      }
      function Ue(i, l, w) {
        return he(i, l, w, !1);
      }
      var Oe = Ue, ke = Se;
      u.jsx = Oe, u.jsxs = ke;
    }();
  }(te)), te;
}
(function(u) {
  qr.env.NODE_ENV === "production" ? u.exports = Ge() : u.exports = He();
})(ze);
const Ke = Cr.Fragment, G = Cr.jsx, Fr = Cr.jsxs;
var oe = {}, Xe = {
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
    var f = {}.hasOwnProperty;
    function s() {
      for (var v = [], y = 0; y < arguments.length; y++) {
        var h = arguments[y];
        if (h) {
          var d = typeof h;
          if (d === "string" || d === "number")
            v.push(h);
          else if (Array.isArray(h)) {
            if (h.length) {
              var a = s.apply(null, h);
              a && v.push(a);
            }
          } else if (d === "object") {
            if (h.toString !== Object.prototype.toString && !h.toString.toString().includes("[native code]")) {
              v.push(h.toString());
              continue;
            }
            for (var g in h)
              f.call(h, g) && h[g] && v.push(g);
          }
        }
      }
      return v.join(" ");
    }
    u.exports ? (s.default = s, u.exports = s) : window.classNames = s;
  })();
})(Xe);
const xr = oe, Jr = k.createContext(null);
function vt({
  children: u
}) {
  const [f, s] = k.useState(), v = k.useCallback(
    (h, d) => s((a) => ({ ...a || {}, [h]: d })),
    []
  ), y = k.useMemo(
    () => ({
      widgetState: f || null,
      setWidgetState: v
    }),
    [f, v]
  );
  return /* @__PURE__ */ G(Jr.Provider, { value: y, children: u });
}
const Qe = "_ring_7tcsj_47", Ze = "_popupButton__container_7tcsj_5", rt = "_popupButton_7tcsj_5", et = "_icon_7tcsj_23", tt = "_inactiveIcon_7tcsj_31", nt = "_activeIcon_7tcsj_35", it = "_notif_7tcsj_39", at = "_pinging_7tcsj_43", ot = "_ping_7tcsj_43", z = {
  ring: Qe,
  popupButton__container: Ze,
  "popupButton__container--open": "_popupButton__container--open_7tcsj_9",
  popupButton: rt,
  icon: et,
  inactiveIcon: tt,
  activeIcon: nt,
  notif: it,
  pinging: at,
  ping: ot
};
function be() {
  try {
    const u = typeof localStorage < "u" && localStorage.getItem("clickedNfts") || "";
    return u ? JSON.parse(u) : [];
  } catch {
    return [];
  }
}
function ut(u) {
  try {
    const s = [...be(), u];
    typeof localStorage < "u" && localStorage.setItem("clickedNfts", JSON.stringify(s));
  } catch {
    return null;
  }
}
function ct({
  notiVal: u,
  showNoti: f,
  isOpen: s,
  clickHandler: v
}) {
  const y = be(), h = k.useContext(Jr), d = h == null ? void 0 : h.widgetState, a = d == null ? void 0 : d.foundNft, g = a && JSON.parse(a).itemId, E = !s && (a ? !y.includes(a) && !!g : !1), [x, _] = k.useState(E);
  return k.useEffect(() => {
    E && _(!0);
  }, [E]), /* @__PURE__ */ Fr(
    "div",
    {
      className: xr(z.popupButton__container, {
        [z["popupButton__container--open"]]: s
      }),
      children: [
        /* @__PURE__ */ G(
          "span",
          {
            className: x ? z.ring : void 0,
            style: { boxShadow: "none" }
          }
        ),
        /* @__PURE__ */ Fr(
          "button",
          {
            className: z.popupButton,
            type: "button",
            onClick: (F) => {
              _(!1), a && ut(a), v(F);
            },
            children: [
              /* @__PURE__ */ G(
                "div",
                {
                  className: xr(z.icon, {
                    [z.activeIcon]: !s,
                    [z.inactiveIcon]: s
                  }),
                  children: /* @__PURE__ */ G(
                    "img",
                    {
                      alt: "WalletChat",
                      src: "https://uploads-ssl.webflow.com/62d761bae8bf2da003f57b06/62d761bae8bf2dea68f57b52_walletchat%20logo.png",
                      style: { height: "90%" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ G(
                "div",
                {
                  className: xr(z.icon, {
                    [z.activeIcon]: s,
                    [z.inactiveIcon]: !s
                  }),
                  children: /* @__PURE__ */ G(
                    "svg",
                    {
                      focusable: "false",
                      viewBox: "0 0 16 14",
                      width: "28",
                      height: "25",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /* @__PURE__ */ G(
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
        f && /* @__PURE__ */ Fr(Ke, { children: [
          /* @__PURE__ */ G("span", { className: xr(z.notif, z.pinging) }),
          /* @__PURE__ */ G("span", { className: z.notif, children: u })
        ] })
      ]
    }
  );
}
const ft = "_ring_q714d_1", Tr = {
  ring: ft,
  "wallet-chat-widget": "_wallet-chat-widget_q714d_23",
  "widget-is-open": "_widget-is-open_q714d_9",
  "widget-is-closed": "_widget-is-closed_q714d_13",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_q714d_23",
  "wallet-chat-widget__container--open": "_wallet-chat-widget__container--open_q714d_27"
}, st = "https://staging.walletchat.fun", Re = Tr["wallet-chat-widget"];
function sr(u) {
  var s;
  if (typeof document > "u")
    return;
  const f = document == null ? void 0 : document.getElementById(Re);
  (s = f == null ? void 0 : f.contentWindow) == null || s.postMessage(u, "*");
}
function lt(u) {
  sr({ target: "sign_in", data: typeof u < "u" && u !== null ? u : null });
}
function gt({ connectedWallet: u }) {
  const f = k.useRef(""), s = k.useRef(null), v = k.useRef(!1), y = k.useRef(!1), h = k.useContext(Jr), { widgetState: d, setWidgetState: a } = h || {}, { ownerAddress: g } = d || {}, [E, x] = k.useState(y.current), [_, F] = k.useState(0), S = () => {
    x((j) => {
      const P = !!j;
      return sr({ target: "widget_open", data: !P }), s.current && !P && sr({ ...s.current, redirect: !0 }), s.current = null, y.current = !P, !P;
    });
  };
  return k.useEffect(() => {
    E && !v.current && lt(u || null);
  }, [u, E]), k.useEffect(() => {
    if (!(g != null && g.address))
      return;
    const j = g.address, P = ne(window.location.href);
    P.network && (s.current = {
      ...P,
      ownerAddress: j
    }), s.current ? sr({ ...s.current, redirect: !0 }) : sr({ ownerAddress: j }), x(!0);
  }, [g]), k.useEffect(() => {
    const j = () => {
      if (window.location.href === f.current)
        return;
      f.current = window.location.href;
      const X = ne(window.location.href);
      a && a("foundNft", JSON.stringify(X)), X.network && (s.current = X), sr(X);
    }, P = new MutationObserver(j), H = { subtree: !0, childList: !0 };
    return j(), P.observe(document, H), () => P.disconnect();
  }, []), k.useEffect(() => {
    const j = (P) => {
      const { data: H } = P;
      H.target === "unread_cnt" && F(H.data), H.closeWidget && S(), H.target === "sign_in" && a && (v.current = H.data), y.current && sr({ target: "widget_open", data: !0 });
    };
    return window.addEventListener("message", j), () => window.removeEventListener("message", j);
  }, []), /* @__PURE__ */ Fr(
    "div",
    {
      className: xr(Tr["wallet-chat-widget__container"], {
        [Tr["wallet-chat-widget__container--open"]]: E
      }),
      children: [
        /* @__PURE__ */ G(
          "iframe",
          {
            title: "WalletChat",
            name: "WalletChat",
            id: Re,
            className: xr("", {
              [Tr["widget-is-open"]]: E,
              [Tr["widget-is-closed"]]: !E
            }),
            src: st
          }
        ),
        /* @__PURE__ */ G(
          ct,
          {
            notiVal: _,
            showNoti: _ > 0,
            isOpen: E,
            clickHandler: S
          }
        )
      ]
    }
  );
}
const pt = ({
  onClick: u,
  children: f
}) => /* @__PURE__ */ G("button", { type: "button", onClick: u, children: f }), yt = ({
  ownerAddress: u,
  render: f
}) => {
  const s = k.useContext(Jr), v = s == null ? void 0 : s.setWidgetState, y = f ? ({ onClick: h, children: d }) => k.cloneElement(f, { onClick: h }, d) : pt;
  return s ? /* @__PURE__ */ Fr(
    y,
    {
      onClick: () => v && v("ownerAddress", {
        address: u,
        lastRequest: Date.now().toString()
      }),
      children: [
        /* @__PURE__ */ G(
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
  vt as WalletChatProvider,
  gt as WalletChatWidget,
  wt as types,
  dt as utils
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._ring_7tcsj_47{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._popupButton__container_7tcsj_5{position:relative;margin-top:.75rem;height:4rem;--tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / .15));-webkit-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:margin-top,-webkit-transform;transition-property:margin-top,transform;transition-property:margin-top,transform,-webkit-transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}._popupButton__container--open_7tcsj_9{right:1.5rem;margin-top:-4rem;--tw-translate-y: 100%;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._popupButton__container--open_7tcsj_9{right:0px;margin-top:.75rem;--tw-translate-y: 0px;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._popupButton_7tcsj_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;-webkit-transform-origin:center;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}._icon_7tcsj_23{transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_7tcsj_23 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_7tcsj_31{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_7tcsj_35{--tw-rotate: 0deg;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_7tcsj_39{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(219 39 119 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}@-webkit-keyframes _ping_7tcsj_43{75%,to{-webkit-transform:scale(2);transform:scale(2);opacity:0}}._pinging_7tcsj_43{-webkit-animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite}._ring_7tcsj_47{position:fixed;right:0px;display:inline-flex;height:4rem;width:4rem}@keyframes _ping_7tcsj_43{75%,to{-webkit-transform:scale(2);transform:scale(2);opacity:0}}._ring_7tcsj_47{-webkit-animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity));opacity:.75}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::-webkit-backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._ring_q714d_1{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}#_wallet-chat-widget_q714d_23{transition-property:width,min-width,height,min-height;transition-duration:.25s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(4px 4px 8px rgba(0,0,0,.5));-webkit-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._widget-is-open_q714d_9{height:75vh;min-height:440px;width:calc(100vw - 2rem);--tw-translate-x: -1rem;--tw-translate-y: -.5rem;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._widget-is-open_q714d_9{height:65vh;width:15vw;min-width:440px;--tw-translate-x: 0px;--tw-translate-y: 0px;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._widget-is-closed_q714d_13{height:0px;min-height:0px;width:0px;min-width:0px}._wallet-chat-widget__container_q714d_23{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;user-select:none}._wallet-chat-widget__container--open_q714d_27{bottom:0px;right:0px}@media (min-width: 640px){._wallet-chat-widget__container--open_q714d_27{bottom:.5rem;right:1.5rem}}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
