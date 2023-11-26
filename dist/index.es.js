import B from "react";
function ie(u) {
  const l = u.replace("https://", "").replace("http://", "").split("/"), v = l.length, y = l[v - 1].split("?")[0], h = l[v - 2];
  if (u.startsWith("looksrare.org"))
    return { itemId: y, contractAddress: h, network: "ethereum" };
  const d = l[v - 3];
  return v >= 5 ? { itemId: y, contractAddress: h, network: d } : u.startsWith("x2y2.io") && d === "eth" ? { itemId: y, contractAddress: h, network: "ethereum" } : { contractAddress: null, itemId: null, network: null };
}
const wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseNftFromUrl: ie
}, Symbol.toStringTag, { value: "Module" })), vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var je = {}, Jr = {};
Jr.byteLength = De;
Jr.toByteArray = Me;
Jr.fromByteArray = Ve;
var tr = [], Q = [], Ne = typeof Uint8Array < "u" ? Uint8Array : Array, re = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var _r = 0, Le = re.length; _r < Le; ++_r)
  tr[_r] = re[_r], Q[re.charCodeAt(_r)] = _r;
Q["-".charCodeAt(0)] = 62;
Q["_".charCodeAt(0)] = 63;
function xe(u) {
  var f = u.length;
  if (f % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var l = u.indexOf("=");
  l === -1 && (l = f);
  var v = l === f ? 0 : 4 - l % 4;
  return [l, v];
}
function De(u) {
  var f = xe(u), l = f[0], v = f[1];
  return (l + v) * 3 / 4 - v;
}
function We(u, f, l) {
  return (f + l) * 3 / 4 - l;
}
function Me(u) {
  var f, l = xe(u), v = l[0], y = l[1], h = new Ne(We(u, v, y)), d = 0, a = y > 0 ? v - 4 : v, g;
  for (g = 0; g < a; g += 4)
    f = Q[u.charCodeAt(g)] << 18 | Q[u.charCodeAt(g + 1)] << 12 | Q[u.charCodeAt(g + 2)] << 6 | Q[u.charCodeAt(g + 3)], h[d++] = f >> 16 & 255, h[d++] = f >> 8 & 255, h[d++] = f & 255;
  return y === 2 && (f = Q[u.charCodeAt(g)] << 2 | Q[u.charCodeAt(g + 1)] >> 4, h[d++] = f & 255), y === 1 && (f = Q[u.charCodeAt(g)] << 10 | Q[u.charCodeAt(g + 1)] << 4 | Q[u.charCodeAt(g + 2)] >> 2, h[d++] = f >> 8 & 255, h[d++] = f & 255), h;
}
function Ye(u) {
  return tr[u >> 18 & 63] + tr[u >> 12 & 63] + tr[u >> 6 & 63] + tr[u & 63];
}
function $e(u, f, l) {
  for (var v, y = [], h = f; h < l; h += 3)
    v = (u[h] << 16 & 16711680) + (u[h + 1] << 8 & 65280) + (u[h + 2] & 255), y.push(Ye(v));
  return y.join("");
}
function Ve(u) {
  for (var f, l = u.length, v = l % 3, y = [], h = 16383, d = 0, a = l - v; d < a; d += h)
    y.push($e(u, d, d + h > a ? a : d + h));
  return v === 1 ? (f = u[l - 1], y.push(
    tr[f >> 2] + tr[f << 4 & 63] + "=="
  )) : v === 2 && (f = (u[l - 2] << 8) + u[l - 1], y.push(
    tr[f >> 10] + tr[f >> 4 & 63] + tr[f << 2 & 63] + "="
  )), y.join("");
}
var ce = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ce.read = function(u, f, l, v, y) {
  var h, d, a = y * 8 - v - 1, g = (1 << a) - 1, R = g >> 1, x = -7, E = l ? y - 1 : 0, F = l ? -1 : 1, k = u[f + E];
  for (E += F, h = k & (1 << -x) - 1, k >>= -x, x += a; x > 0; h = h * 256 + u[f + E], E += F, x -= 8)
    ;
  for (d = h & (1 << -x) - 1, h >>= -x, x += v; x > 0; d = d * 256 + u[f + E], E += F, x -= 8)
    ;
  if (h === 0)
    h = 1 - R;
  else {
    if (h === g)
      return d ? NaN : (k ? -1 : 1) * (1 / 0);
    d = d + Math.pow(2, v), h = h - R;
  }
  return (k ? -1 : 1) * d * Math.pow(2, h - v);
};
ce.write = function(u, f, l, v, y, h) {
  var d, a, g, R = h * 8 - y - 1, x = (1 << R) - 1, E = x >> 1, F = y === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, k = v ? 0 : h - 1, V = v ? 1 : -1, z = f < 0 || f === 0 && 1 / f < 0 ? 1 : 0;
  for (f = Math.abs(f), isNaN(f) || f === 1 / 0 ? (a = isNaN(f) ? 1 : 0, d = x) : (d = Math.floor(Math.log(f) / Math.LN2), f * (g = Math.pow(2, -d)) < 1 && (d--, g *= 2), d + E >= 1 ? f += F / g : f += F * Math.pow(2, 1 - E), f * g >= 2 && (d++, g /= 2), d + E >= x ? (a = 0, d = x) : d + E >= 1 ? (a = (f * g - 1) * Math.pow(2, y), d = d + E) : (a = f * Math.pow(2, E - 1) * Math.pow(2, y), d = 0)); y >= 8; u[l + k] = a & 255, k += V, a /= 256, y -= 8)
    ;
  for (d = d << y | a, R += y; R > 0; u[l + k] = d & 255, k += V, d /= 256, R -= 8)
    ;
  u[l + k - V] |= z * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  var f = Jr, l = ce, v = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  u.Buffer = a, u.SlowBuffer = pr, u.INSPECT_MAX_BYTES = 50;
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
      return E(t);
    }
    return g(t, r, e);
  }
  a.poolSize = 8192;
  function g(t, r, e) {
    if (typeof t == "string")
      return F(t, r);
    if (ArrayBuffer.isView(t))
      return V(t);
    if (t == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
      );
    if (G(t, ArrayBuffer) || t && G(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (G(t, SharedArrayBuffer) || t && G(t.buffer, SharedArrayBuffer)))
      return z(t, r, e);
    if (typeof t == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var n = t.valueOf && t.valueOf();
    if (n != null && n !== t)
      return a.from(n, r, e);
    var o = Z(t);
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
  function R(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function x(t, r, e) {
    return R(t), t <= 0 ? d(t) : r !== void 0 ? typeof e == "string" ? d(t).fill(r, e) : d(t).fill(r) : d(t);
  }
  a.alloc = function(t, r, e) {
    return x(t, r, e);
  };
  function E(t) {
    return R(t), d(t < 0 ? 0 : nr(t) | 0);
  }
  a.allocUnsafe = function(t) {
    return E(t);
  }, a.allocUnsafeSlow = function(t) {
    return E(t);
  };
  function F(t, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !a.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var e = O(t, r) | 0, n = d(e), o = n.write(t, r);
    return o !== e && (n = n.slice(0, o)), n;
  }
  function k(t) {
    for (var r = t.length < 0 ? 0 : nr(t.length) | 0, e = d(r), n = 0; n < r; n += 1)
      e[n] = t[n] & 255;
    return e;
  }
  function V(t) {
    if (G(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return z(r.buffer, r.byteOffset, r.byteLength);
    }
    return k(t);
  }
  function z(t, r, e) {
    if (r < 0 || t.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < r + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var n;
    return r === void 0 && e === void 0 ? n = new Uint8Array(t) : e === void 0 ? n = new Uint8Array(t, r) : n = new Uint8Array(t, r, e), Object.setPrototypeOf(n, a.prototype), n;
  }
  function Z(t) {
    if (a.isBuffer(t)) {
      var r = nr(t.length) | 0, e = d(r);
      return e.length === 0 || t.copy(e, 0, 0, r), e;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || Br(t.length) ? d(0) : k(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return k(t.data);
  }
  function nr(t) {
    if (t >= y)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + y.toString(16) + " bytes");
    return t | 0;
  }
  function pr(t) {
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
      if (G(p, Uint8Array))
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
          return lr(t).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return e * 2;
        case "hex":
          return e >>> 1;
        case "base64":
          return Yr(t).length;
        default:
          if (o)
            return n ? -1 : lr(t).length;
          r = ("" + r).toLowerCase(), o = !0;
      }
  }
  a.byteLength = O;
  function hr(t, r, e) {
    var n = !1;
    if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, r >>>= 0, e <= r))
      return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return Lr(this, r, e);
        case "utf8":
        case "utf-8":
          return J(this, r, e);
        case "ascii":
          return jr(this, r, e);
        case "latin1":
        case "binary":
          return Nr(this, r, e);
        case "base64":
          return kr(this, r, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Dr(this, r, e);
        default:
          if (n)
            throw new TypeError("Unknown encoding: " + t);
          t = (t + "").toLowerCase(), n = !0;
      }
  }
  a.prototype._isBuffer = !0;
  function X(t, r, e) {
    var n = t[r];
    t[r] = t[e], t[e] = n;
  }
  a.prototype.swap16 = function() {
    var r = this.length;
    if (r % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var e = 0; e < r; e += 2)
      X(this, e, e + 1);
    return this;
  }, a.prototype.swap32 = function() {
    var r = this.length;
    if (r % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var e = 0; e < r; e += 4)
      X(this, e, e + 3), X(this, e + 1, e + 2);
    return this;
  }, a.prototype.swap64 = function() {
    var r = this.length;
    if (r % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var e = 0; e < r; e += 8)
      X(this, e, e + 7), X(this, e + 1, e + 6), X(this, e + 2, e + 5), X(this, e + 3, e + 4);
    return this;
  }, a.prototype.toString = function() {
    var r = this.length;
    return r === 0 ? "" : arguments.length === 0 ? J(this, 0, r) : hr.apply(this, arguments);
  }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(r) {
    if (!a.isBuffer(r))
      throw new TypeError("Argument must be a Buffer");
    return this === r ? !0 : a.compare(this, r) === 0;
  }, a.prototype.inspect = function() {
    var r = "", e = u.INSPECT_MAX_BYTES;
    return r = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (r += " ... "), "<Buffer " + r + ">";
  }, v && (a.prototype[v] = a.prototype.inspect), a.prototype.compare = function(r, e, n, o, c) {
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
    for (var p = c - o, _ = n - e, T = Math.min(p, _), I = this.slice(o, c), M = r.slice(e, n), P = 0; P < T; ++P)
      if (I[P] !== M[P]) {
        p = I[P], _ = M[P];
        break;
      }
    return p < _ ? -1 : _ < p ? 1 : 0;
  };
  function ir(t, r, e, n, o) {
    if (t.length === 0)
      return -1;
    if (typeof e == "string" ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, Br(e) && (e = o ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
      if (o)
        return -1;
      e = t.length - 1;
    } else if (e < 0)
      if (o)
        e = 0;
      else
        return -1;
    if (typeof r == "string" && (r = a.from(r, n)), a.isBuffer(r))
      return r.length === 0 ? -1 : D(t, r, e, n, o);
    if (typeof r == "number")
      return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? o ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : D(t, [r], e, n, o);
    throw new TypeError("val must be string, number or Buffer");
  }
  function D(t, r, e, n, o) {
    var c = 1, p = t.length, _ = r.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || r.length < 2)
        return -1;
      c = 2, p /= 2, _ /= 2, e /= 2;
    }
    function T($r, Vr) {
      return c === 1 ? $r[Vr] : $r.readUInt16BE(Vr * c);
    }
    var I;
    if (o) {
      var M = -1;
      for (I = e; I < p; I++)
        if (T(t, I) === T(r, M === -1 ? 0 : I - M)) {
          if (M === -1 && (M = I), I - M + 1 === _)
            return M * c;
        } else
          M !== -1 && (I -= I - M), M = -1;
    } else
      for (e + _ > p && (e = p - _), I = e; I >= 0; I--) {
        for (var P = !0, xr = 0; xr < _; xr++)
          if (T(t, I + xr) !== T(r, xr)) {
            P = !1;
            break;
          }
        if (P)
          return I;
      }
    return -1;
  }
  a.prototype.includes = function(r, e, n) {
    return this.indexOf(r, e, n) !== -1;
  }, a.prototype.indexOf = function(r, e, n) {
    return ir(this, r, e, n, !0);
  }, a.prototype.lastIndexOf = function(r, e, n) {
    return ir(this, r, e, n, !1);
  };
  function C(t, r, e, n) {
    e = Number(e) || 0;
    var o = t.length - e;
    n ? (n = Number(n), n > o && (n = o)) : n = o;
    var c = r.length;
    n > c / 2 && (n = c / 2);
    for (var p = 0; p < n; ++p) {
      var _ = parseInt(r.substr(p * 2, 2), 16);
      if (Br(_))
        return p;
      t[e + p] = _;
    }
    return p;
  }
  function q(t, r, e, n) {
    return dr(lr(r, t.length - e), t, e, n);
  }
  function fr(t, r, e, n) {
    return dr(Ir(r), t, e, n);
  }
  function Hr(t, r, e, n) {
    return dr(Yr(r), t, e, n);
  }
  function Kr(t, r, e, n) {
    return dr(gr(r, t.length - e), t, e, n);
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
          return C(this, r, e, n);
        case "utf8":
        case "utf-8":
          return q(this, r, e, n);
        case "ascii":
        case "latin1":
        case "binary":
          return fr(this, r, e, n);
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
  function kr(t, r, e) {
    return r === 0 && e === t.length ? f.fromByteArray(t) : f.fromByteArray(t.slice(r, e));
  }
  function J(t, r, e) {
    e = Math.min(t.length, e);
    for (var n = [], o = r; o < e; ) {
      var c = t[o], p = null, _ = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
      if (o + _ <= e) {
        var T, I, M, P;
        switch (_) {
          case 1:
            c < 128 && (p = c);
            break;
          case 2:
            T = t[o + 1], (T & 192) === 128 && (P = (c & 31) << 6 | T & 63, P > 127 && (p = P));
            break;
          case 3:
            T = t[o + 1], I = t[o + 2], (T & 192) === 128 && (I & 192) === 128 && (P = (c & 15) << 12 | (T & 63) << 6 | I & 63, P > 2047 && (P < 55296 || P > 57343) && (p = P));
            break;
          case 4:
            T = t[o + 1], I = t[o + 2], M = t[o + 3], (T & 192) === 128 && (I & 192) === 128 && (M & 192) === 128 && (P = (c & 15) << 18 | (T & 63) << 12 | (I & 63) << 6 | M & 63, P > 65535 && P < 1114112 && (p = P));
        }
      }
      p === null ? (p = 65533, _ = 1) : p > 65535 && (p -= 65536, n.push(p >>> 10 & 1023 | 55296), p = 56320 | p & 1023), n.push(p), o += _;
    }
    return Pr(n);
  }
  var sr = 4096;
  function Pr(t) {
    var r = t.length;
    if (r <= sr)
      return String.fromCharCode.apply(String, t);
    for (var e = "", n = 0; n < r; )
      e += String.fromCharCode.apply(
        String,
        t.slice(n, n += sr)
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
  function Nr(t, r, e) {
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
      o += yr[t[c]];
    return o;
  }
  function Dr(t, r, e) {
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
  function j(t, r, e) {
    if (t % 1 !== 0 || t < 0)
      throw new RangeError("offset is not uint");
    if (t + r > e)
      throw new RangeError("Trying to access beyond buffer length");
  }
  a.prototype.readUintLE = a.prototype.readUIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || j(r, e, this.length);
    for (var o = this[r], c = 1, p = 0; ++p < e && (c *= 256); )
      o += this[r + p] * c;
    return o;
  }, a.prototype.readUintBE = a.prototype.readUIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || j(r, e, this.length);
    for (var o = this[r + --e], c = 1; e > 0 && (c *= 256); )
      o += this[r + --e] * c;
    return o;
  }, a.prototype.readUint8 = a.prototype.readUInt8 = function(r, e) {
    return r = r >>> 0, e || j(r, 1, this.length), this[r];
  }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(r, e) {
    return r = r >>> 0, e || j(r, 2, this.length), this[r] | this[r + 1] << 8;
  }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(r, e) {
    return r = r >>> 0, e || j(r, 2, this.length), this[r] << 8 | this[r + 1];
  }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(r, e) {
    return r = r >>> 0, e || j(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
  }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(r, e) {
    return r = r >>> 0, e || j(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
  }, a.prototype.readIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || j(r, e, this.length);
    for (var o = this[r], c = 1, p = 0; ++p < e && (c *= 256); )
      o += this[r + p] * c;
    return c *= 128, o >= c && (o -= Math.pow(2, 8 * e)), o;
  }, a.prototype.readIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || j(r, e, this.length);
    for (var o = e, c = 1, p = this[r + --o]; o > 0 && (c *= 256); )
      p += this[r + --o] * c;
    return c *= 128, p >= c && (p -= Math.pow(2, 8 * e)), p;
  }, a.prototype.readInt8 = function(r, e) {
    return r = r >>> 0, e || j(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
  }, a.prototype.readInt16LE = function(r, e) {
    r = r >>> 0, e || j(r, 2, this.length);
    var n = this[r] | this[r + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, a.prototype.readInt16BE = function(r, e) {
    r = r >>> 0, e || j(r, 2, this.length);
    var n = this[r + 1] | this[r] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, a.prototype.readInt32LE = function(r, e) {
    return r = r >>> 0, e || j(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
  }, a.prototype.readInt32BE = function(r, e) {
    return r = r >>> 0, e || j(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
  }, a.prototype.readFloatLE = function(r, e) {
    return r = r >>> 0, e || j(r, 4, this.length), l.read(this, r, !0, 23, 4);
  }, a.prototype.readFloatBE = function(r, e) {
    return r = r >>> 0, e || j(r, 4, this.length), l.read(this, r, !1, 23, 4);
  }, a.prototype.readDoubleLE = function(r, e) {
    return r = r >>> 0, e || j(r, 8, this.length), l.read(this, r, !0, 52, 8);
  }, a.prototype.readDoubleBE = function(r, e) {
    return r = r >>> 0, e || j(r, 8, this.length), l.read(this, r, !1, 52, 8);
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
    var p = 1, _ = 0;
    for (this[e] = r & 255; ++_ < n && (p *= 256); )
      this[e + _] = r / p & 255;
    return e + n;
  }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !o) {
      var c = Math.pow(2, 8 * n) - 1;
      Y(this, r, e, n, c, 0);
    }
    var p = n - 1, _ = 1;
    for (this[e + p] = r & 255; --p >= 0 && (_ *= 256); )
      this[e + p] = r / _ & 255;
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
    var p = 0, _ = 1, T = 0;
    for (this[e] = r & 255; ++p < n && (_ *= 256); )
      r < 0 && T === 0 && this[e + p - 1] !== 0 && (T = 1), this[e + p] = (r / _ >> 0) - T & 255;
    return e + n;
  }, a.prototype.writeIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var c = Math.pow(2, 8 * n - 1);
      Y(this, r, e, n, c - 1, -c);
    }
    var p = n - 1, _ = 1, T = 0;
    for (this[e + p] = r & 255; --p >= 0 && (_ *= 256); )
      r < 0 && T === 0 && this[e + p + 1] !== 0 && (T = 1), this[e + p] = (r / _ >> 0) - T & 255;
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
  function Tr(t, r, e, n, o, c) {
    if (e + n > t.length)
      throw new RangeError("Index out of range");
    if (e < 0)
      throw new RangeError("Index out of range");
  }
  function Wr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || Tr(t, r, e, 4), l.write(t, r, e, n, 23, 4), e + 4;
  }
  a.prototype.writeFloatLE = function(r, e, n) {
    return Wr(this, r, e, !0, n);
  }, a.prototype.writeFloatBE = function(r, e, n) {
    return Wr(this, r, e, !1, n);
  };
  function Mr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || Tr(t, r, e, 8), l.write(t, r, e, n, 52, 8), e + 8;
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
    var p;
    if (typeof r == "number")
      for (p = e; p < n; ++p)
        this[p] = r;
    else {
      var _ = a.isBuffer(r) ? r : a.from(r, o), T = _.length;
      if (T === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (p = 0; p < n - e; ++p)
        this[p + e] = _[p % T];
    }
    return this;
  };
  var Fr = /[^+/0-9A-Za-z-_]/g;
  function Cr(t) {
    if (t = t.split("=")[0], t = t.trim().replace(Fr, ""), t.length < 2)
      return "";
    for (; t.length % 4 !== 0; )
      t = t + "=";
    return t;
  }
  function lr(t, r) {
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
  function Ir(t) {
    for (var r = [], e = 0; e < t.length; ++e)
      r.push(t.charCodeAt(e) & 255);
    return r;
  }
  function gr(t, r) {
    for (var e, n, o, c = [], p = 0; p < t.length && !((r -= 2) < 0); ++p)
      e = t.charCodeAt(p), n = e >> 8, o = e % 256, c.push(o), c.push(n);
    return c;
  }
  function Yr(t) {
    return f.toByteArray(Cr(t));
  }
  function dr(t, r, e, n) {
    for (var o = 0; o < n && !(o + e >= r.length || o >= t.length); ++o)
      r[o + e] = t[o];
    return o;
  }
  function G(t, r) {
    return t instanceof r || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === r.name;
  }
  function Br(t) {
    return t !== t;
  }
  var yr = function() {
    for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
      for (var n = e * 16, o = 0; o < 16; ++o)
        r[n + o] = t[e] + t[o];
    return r;
  }();
})(je);
var qr = {}, ze = {
  get exports() {
    return qr;
  },
  set exports(u) {
    qr = u;
  }
}, L = ze.exports = {}, rr, er;
function ae() {
  throw new Error("setTimeout has not been defined");
}
function oe() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? rr = setTimeout : rr = ae;
  } catch {
    rr = ae;
  }
  try {
    typeof clearTimeout == "function" ? er = clearTimeout : er = oe;
  } catch {
    er = oe;
  }
})();
function me(u) {
  if (rr === setTimeout)
    return setTimeout(u, 0);
  if ((rr === ae || !rr) && setTimeout)
    return rr = setTimeout, setTimeout(u, 0);
  try {
    return rr(u, 0);
  } catch {
    try {
      return rr.call(null, u, 0);
    } catch {
      return rr.call(this, u, 0);
    }
  }
}
function qe(u) {
  if (er === clearTimeout)
    return clearTimeout(u);
  if ((er === oe || !er) && clearTimeout)
    return er = clearTimeout, clearTimeout(u);
  try {
    return er(u);
  } catch {
    try {
      return er.call(null, u);
    } catch {
      return er.call(this, u);
    }
  }
}
var ur = [], Ar = !1, vr, zr = -1;
function Je() {
  !Ar || !vr || (Ar = !1, vr.length ? ur = vr.concat(ur) : zr = -1, ur.length && Ee());
}
function Ee() {
  if (!Ar) {
    var u = me(Je);
    Ar = !0;
    for (var f = ur.length; f; ) {
      for (vr = ur, ur = []; ++zr < f; )
        vr && vr[zr].run();
      zr = -1, f = ur.length;
    }
    vr = null, Ar = !1, qe(u);
  }
}
L.nextTick = function(u) {
  var f = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var l = 1; l < arguments.length; l++)
      f[l - 1] = arguments[l];
  ur.push(new _e(u, f)), ur.length === 1 && !Ar && me(Ee);
};
function _e(u, f) {
  this.fun = u, this.array = f;
}
_e.prototype.run = function() {
  this.fun.apply(null, this.array);
};
L.title = "browser";
L.browser = !0;
L.env = {};
L.argv = [];
L.version = "";
L.versions = {};
function cr() {
}
L.on = cr;
L.addListener = cr;
L.once = cr;
L.off = cr;
L.removeListener = cr;
L.removeAllListeners = cr;
L.emit = cr;
L.prependListener = cr;
L.prependOnceListener = cr;
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
  var l = __magic__;
  return l;
})(Object);
var Or = {}, Ge = {
  get exports() {
    return Or;
  },
  set exports(u) {
    Or = u;
  }
}, br = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ee, ve;
function be() {
  if (ve)
    return ee;
  ve = 1;
  var u = Object.getOwnPropertySymbols, f = Object.prototype.hasOwnProperty, l = Object.prototype.propertyIsEnumerable;
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
      var R = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(x) {
        R[x] = x;
      }), Object.keys(Object.assign({}, R)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return ee = y() ? Object.assign : function(h, d) {
    for (var a, g = v(h), R, x = 1; x < arguments.length; x++) {
      a = Object(arguments[x]);
      for (var E in a)
        f.call(a, E) && (g[E] = a[E]);
      if (u) {
        R = u(a);
        for (var F = 0; F < R.length; F++)
          l.call(a, R[F]) && (g[R[F]] = a[R[F]]);
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
var ge;
function He() {
  if (ge)
    return br;
  ge = 1, be();
  var u = B, f = 60103;
  if (br.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var l = Symbol.for;
    f = l("react.element"), br.Fragment = l("react.fragment");
  }
  var v = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, y = Object.prototype.hasOwnProperty, h = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(a, g, R) {
    var x, E = {}, F = null, k = null;
    R !== void 0 && (F = "" + R), g.key !== void 0 && (F = "" + g.key), g.ref !== void 0 && (k = g.ref);
    for (x in g)
      y.call(g, x) && !h.hasOwnProperty(x) && (E[x] = g[x]);
    if (a && a.defaultProps)
      for (x in g = a.defaultProps, g)
        E[x] === void 0 && (E[x] = g[x]);
    return { $$typeof: f, type: a, key: F, ref: k, props: E, _owner: v.current };
  }
  return br.jsx = d, br.jsxs = d, br;
}
var te = {}, ye;
function Ke() {
  return ye || (ye = 1, function(u) {
    qr.env.NODE_ENV !== "production" && function() {
      var f = B, l = be(), v = 60103, y = 60106;
      u.Fragment = 60107;
      var h = 60108, d = 60114, a = 60109, g = 60110, R = 60112, x = 60113, E = 60120, F = 60115, k = 60116, V = 60121, z = 60122, Z = 60117, nr = 60129, pr = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var O = Symbol.for;
        v = O("react.element"), y = O("react.portal"), u.Fragment = O("react.fragment"), h = O("react.strict_mode"), d = O("react.profiler"), a = O("react.provider"), g = O("react.context"), R = O("react.forward_ref"), x = O("react.suspense"), E = O("react.suspense_list"), F = O("react.memo"), k = O("react.lazy"), V = O("react.block"), z = O("react.server.block"), Z = O("react.fundamental"), O("react.scope"), O("react.opaque.id"), nr = O("react.debug_trace_mode"), O("react.offscreen"), pr = O("react.legacy_hidden");
      }
      var hr = typeof Symbol == "function" && Symbol.iterator, X = "@@iterator";
      function ir(i) {
        if (i === null || typeof i != "object")
          return null;
        var s = hr && i[hr] || i[X];
        return typeof s == "function" ? s : null;
      }
      var D = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function C(i) {
        {
          for (var s = arguments.length, w = new Array(s > 1 ? s - 1 : 0), m = 1; m < s; m++)
            w[m - 1] = arguments[m];
          q("error", i, w);
        }
      }
      function q(i, s, w) {
        {
          var m = D.ReactDebugCurrentFrame, S = m.getStackAddendum();
          S !== "" && (s += "%s", w = w.concat([S]));
          var U = w.map(function(A) {
            return "" + A;
          });
          U.unshift("Warning: " + s), Function.prototype.apply.call(console[i], console, U);
        }
      }
      var fr = !1;
      function Hr(i) {
        return !!(typeof i == "string" || typeof i == "function" || i === u.Fragment || i === d || i === nr || i === h || i === x || i === E || i === pr || fr || typeof i == "object" && i !== null && (i.$$typeof === k || i.$$typeof === F || i.$$typeof === a || i.$$typeof === g || i.$$typeof === R || i.$$typeof === Z || i.$$typeof === V || i[0] === z));
      }
      function Kr(i, s, w) {
        var m = s.displayName || s.name || "";
        return i.displayName || (m !== "" ? w + "(" + m + ")" : w);
      }
      function kr(i) {
        return i.displayName || "Context";
      }
      function J(i) {
        if (i == null)
          return null;
        if (typeof i.tag == "number" && C("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof i == "function")
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
          case E:
            return "SuspenseList";
        }
        if (typeof i == "object")
          switch (i.$$typeof) {
            case g:
              var s = i;
              return kr(s) + ".Consumer";
            case a:
              var w = i;
              return kr(w._context) + ".Provider";
            case R:
              return Kr(i, i.render, "ForwardRef");
            case F:
              return J(i.type);
            case V:
              return J(i._render);
            case k: {
              var m = i, S = m._payload, U = m._init;
              try {
                return J(U(S));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var sr = 0, Pr, jr, Nr, Lr, Dr, j, Y;
      function Tr() {
      }
      Tr.__reactDisabledLog = !0;
      function Wr() {
        {
          if (sr === 0) {
            Pr = console.log, jr = console.info, Nr = console.warn, Lr = console.error, Dr = console.group, j = console.groupCollapsed, Y = console.groupEnd;
            var i = {
              configurable: !0,
              enumerable: !0,
              value: Tr,
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
          sr++;
        }
      }
      function Mr() {
        {
          if (sr--, sr === 0) {
            var i = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: l({}, i, {
                value: Pr
              }),
              info: l({}, i, {
                value: jr
              }),
              warn: l({}, i, {
                value: Nr
              }),
              error: l({}, i, {
                value: Lr
              }),
              group: l({}, i, {
                value: Dr
              }),
              groupCollapsed: l({}, i, {
                value: j
              }),
              groupEnd: l({}, i, {
                value: Y
              })
            });
          }
          sr < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Fr = D.ReactCurrentDispatcher, Cr;
      function lr(i, s, w) {
        {
          if (Cr === void 0)
            try {
              throw Error();
            } catch (S) {
              var m = S.stack.trim().match(/\n( *(at )?)/);
              Cr = m && m[1] || "";
            }
          return `
` + Cr + i;
        }
      }
      var Ir = !1, gr;
      {
        var Yr = typeof WeakMap == "function" ? WeakMap : Map;
        gr = new Yr();
      }
      function dr(i, s) {
        if (!i || Ir)
          return "";
        {
          var w = gr.get(i);
          if (w !== void 0)
            return w;
        }
        var m;
        Ir = !0;
        var S = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var U;
        U = Fr.current, Fr.current = null, Wr();
        try {
          if (s) {
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
              } catch (or) {
                m = or;
              }
              Reflect.construct(i, [], A);
            } else {
              try {
                A.call();
              } catch (or) {
                m = or;
              }
              i.call(A.prototype);
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
            for (var b = or.stack.split(`
`), $ = m.stack.split(`
`), N = b.length - 1, W = $.length - 1; N >= 1 && W >= 0 && b[N] !== $[W]; )
              W--;
            for (; N >= 1 && W >= 0; N--, W--)
              if (b[N] !== $[W]) {
                if (N !== 1 || W !== 1)
                  do
                    if (N--, W--, W < 0 || b[N] !== $[W]) {
                      var ar = `
` + b[N].replace(" at new ", " at ");
                      return typeof i == "function" && gr.set(i, ar), ar;
                    }
                  while (N >= 1 && W >= 0);
                break;
              }
          }
        } finally {
          Ir = !1, Fr.current = U, Mr(), Error.prepareStackTrace = S;
        }
        var Er = i ? i.displayName || i.name : "", we = Er ? lr(Er) : "";
        return typeof i == "function" && gr.set(i, we), we;
      }
      function G(i, s, w) {
        return dr(i, !1);
      }
      function Br(i) {
        var s = i.prototype;
        return !!(s && s.isReactComponent);
      }
      function yr(i, s, w) {
        if (i == null)
          return "";
        if (typeof i == "function")
          return dr(i, Br(i));
        if (typeof i == "string")
          return lr(i);
        switch (i) {
          case x:
            return lr("Suspense");
          case E:
            return lr("SuspenseList");
        }
        if (typeof i == "object")
          switch (i.$$typeof) {
            case R:
              return G(i.render);
            case F:
              return yr(i.type, s, w);
            case V:
              return G(i._render);
            case k: {
              var m = i, S = m._payload, U = m._init;
              try {
                return yr(U(S), s, w);
              } catch {
              }
            }
          }
        return "";
      }
      var t = {}, r = D.ReactDebugCurrentFrame;
      function e(i) {
        if (i) {
          var s = i._owner, w = yr(i.type, i._source, s ? s.type : null);
          r.setExtraStackFrame(w);
        } else
          r.setExtraStackFrame(null);
      }
      function n(i, s, w, m, S) {
        {
          var U = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var A in i)
            if (U(i, A)) {
              var b = void 0;
              try {
                if (typeof i[A] != "function") {
                  var $ = Error((m || "React class") + ": " + w + " type `" + A + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[A] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw $.name = "Invariant Violation", $;
                }
                b = i[A](s, A, m, w, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (N) {
                b = N;
              }
              b && !(b instanceof Error) && (e(S), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", w, A, typeof b), e(null)), b instanceof Error && !(b.message in t) && (t[b.message] = !0, e(S), C("Failed %s type: %s", w, b.message), e(null));
            }
        }
      }
      var o = D.ReactCurrentOwner, c = Object.prototype.hasOwnProperty, p = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, _, T, I;
      I = {};
      function M(i) {
        if (c.call(i, "ref")) {
          var s = Object.getOwnPropertyDescriptor(i, "ref").get;
          if (s && s.isReactWarning)
            return !1;
        }
        return i.ref !== void 0;
      }
      function P(i) {
        if (c.call(i, "key")) {
          var s = Object.getOwnPropertyDescriptor(i, "key").get;
          if (s && s.isReactWarning)
            return !1;
        }
        return i.key !== void 0;
      }
      function xr(i, s) {
        if (typeof i.ref == "string" && o.current && s && o.current.stateNode !== s) {
          var w = J(o.current.type);
          I[w] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', J(o.current.type), i.ref), I[w] = !0);
        }
      }
      function $r(i, s) {
        {
          var w = function() {
            _ || (_ = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
          };
          w.isReactWarning = !0, Object.defineProperty(i, "key", {
            get: w,
            configurable: !0
          });
        }
      }
      function Vr(i, s) {
        {
          var w = function() {
            T || (T = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
          };
          w.isReactWarning = !0, Object.defineProperty(i, "ref", {
            get: w,
            configurable: !0
          });
        }
      }
      var Te = function(i, s, w, m, S, U, A) {
        var b = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: v,
          // Built-in properties that belong on the element
          type: i,
          key: s,
          ref: w,
          props: A,
          // Record the component responsible for creating this element.
          _owner: U
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
          value: m
        }), Object.defineProperty(b, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: S
        }), Object.freeze && (Object.freeze(b.props), Object.freeze(b)), b;
      };
      function Fe(i, s, w, m, S) {
        {
          var U, A = {}, b = null, $ = null;
          w !== void 0 && (b = "" + w), P(s) && (b = "" + s.key), M(s) && ($ = s.ref, xr(s, S));
          for (U in s)
            c.call(s, U) && !p.hasOwnProperty(U) && (A[U] = s[U]);
          if (i && i.defaultProps) {
            var N = i.defaultProps;
            for (U in N)
              A[U] === void 0 && (A[U] = N[U]);
          }
          if (b || $) {
            var W = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
            b && $r(A, W), $ && Vr(A, W);
          }
          return Te(i, b, $, S, m, o.current, A);
        }
      }
      var Xr = D.ReactCurrentOwner, fe = D.ReactDebugCurrentFrame;
      function mr(i) {
        if (i) {
          var s = i._owner, w = yr(i.type, i._source, s ? s.type : null);
          fe.setExtraStackFrame(w);
        } else
          fe.setExtraStackFrame(null);
      }
      var Qr;
      Qr = !1;
      function Zr(i) {
        return typeof i == "object" && i !== null && i.$$typeof === v;
      }
      function se() {
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
            var s = i.fileName.replace(/^.*[\\\/]/, ""), w = i.lineNumber;
            return `

Check your code at ` + s + ":" + w + ".";
          }
          return "";
        }
      }
      var le = {};
      function Ie(i) {
        {
          var s = se();
          if (!s) {
            var w = typeof i == "string" ? i : i.displayName || i.name;
            w && (s = `

Check the top-level render call using <` + w + ">.");
          }
          return s;
        }
      }
      function pe(i, s) {
        {
          if (!i._store || i._store.validated || i.key != null)
            return;
          i._store.validated = !0;
          var w = Ie(s);
          if (le[w])
            return;
          le[w] = !0;
          var m = "";
          i && i._owner && i._owner !== Xr.current && (m = " It was passed a child from " + J(i._owner.type) + "."), mr(i), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', w, m), mr(null);
        }
      }
      function he(i, s) {
        {
          if (typeof i != "object")
            return;
          if (Array.isArray(i))
            for (var w = 0; w < i.length; w++) {
              var m = i[w];
              Zr(m) && pe(m, s);
            }
          else if (Zr(i))
            i._store && (i._store.validated = !0);
          else if (i) {
            var S = ir(i);
            if (typeof S == "function" && S !== i.entries)
              for (var U = S.call(i), A; !(A = U.next()).done; )
                Zr(A.value) && pe(A.value, s);
          }
        }
      }
      function Be(i) {
        {
          var s = i.type;
          if (s == null || typeof s == "string")
            return;
          var w;
          if (typeof s == "function")
            w = s.propTypes;
          else if (typeof s == "object" && (s.$$typeof === R || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          s.$$typeof === F))
            w = s.propTypes;
          else
            return;
          if (w) {
            var m = J(s);
            n(w, i.props, "prop", m, i);
          } else if (s.PropTypes !== void 0 && !Qr) {
            Qr = !0;
            var S = J(s);
            C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", S || "Unknown");
          }
          typeof s.getDefaultProps == "function" && !s.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Se(i) {
        {
          for (var s = Object.keys(i.props), w = 0; w < s.length; w++) {
            var m = s[w];
            if (m !== "children" && m !== "key") {
              mr(i), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), mr(null);
              break;
            }
          }
          i.ref !== null && (mr(i), C("Invalid attribute `ref` supplied to `React.Fragment`."), mr(null));
        }
      }
      function de(i, s, w, m, S, U) {
        {
          var A = Hr(i);
          if (!A) {
            var b = "";
            (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (b += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var $ = Ce(S);
            $ ? b += $ : b += se();
            var N;
            i === null ? N = "null" : Array.isArray(i) ? N = "array" : i !== void 0 && i.$$typeof === v ? (N = "<" + (J(i.type) || "Unknown") + " />", b = " Did you accidentally export a JSX literal instead of a component?") : N = typeof i, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", N, b);
          }
          var W = Fe(i, s, w, S, U);
          if (W == null)
            return W;
          if (A) {
            var ar = s.children;
            if (ar !== void 0)
              if (m)
                if (Array.isArray(ar)) {
                  for (var Er = 0; Er < ar.length; Er++)
                    he(ar[Er], i);
                  Object.freeze && Object.freeze(ar);
                } else
                  C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                he(ar, i);
          }
          return i === u.Fragment ? Se(W) : Be(W), W;
        }
      }
      function Ue(i, s, w) {
        return de(i, s, w, !0);
      }
      function Oe(i, s, w) {
        return de(i, s, w, !1);
      }
      var ke = Oe, Pe = Ue;
      u.jsx = ke, u.jsxs = Pe;
    }();
  }(te)), te;
}
(function(u) {
  qr.env.NODE_ENV === "production" ? u.exports = He() : u.exports = Ke();
})(Ge);
const Xe = Or.Fragment, K = Or.jsx, Ur = Or.jsxs;
var ue = {}, Qe = {
  get exports() {
    return ue;
  },
  set exports(u) {
    ue = u;
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
    function l() {
      for (var v = [], y = 0; y < arguments.length; y++) {
        var h = arguments[y];
        if (h) {
          var d = typeof h;
          if (d === "string" || d === "number")
            v.push(h);
          else if (Array.isArray(h)) {
            if (h.length) {
              var a = l.apply(null, h);
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
    u.exports ? (l.default = l, u.exports = l) : window.classNames = l;
  })();
})(Qe);
const Rr = ue, Gr = B.createContext(null);
function gt({
  children: u
}) {
  const [f, l] = B.useState(), v = B.useCallback(
    (h, d) => l((a) => ({ ...a || {}, [h]: d })),
    []
  ), y = B.useMemo(
    () => ({
      widgetState: f || null,
      setWidgetState: v
    }),
    [f, v]
  );
  return /* @__PURE__ */ K(Gr.Provider, { value: y, children: u });
}
const Ze = "_ring_pzwee_47", rt = "_popupButton__container_pzwee_5", et = "_popupButton_pzwee_5", tt = "_icon_pzwee_23", nt = "_inactiveIcon_pzwee_31", it = "_activeIcon_pzwee_35", at = "_notif_pzwee_39", ot = "_pinging_pzwee_43", ut = "_ping_pzwee_43", H = {
  ring: Ze,
  popupButton__container: rt,
  "popupButton__container--open": "_popupButton__container--open_pzwee_9",
  popupButton: et,
  icon: tt,
  inactiveIcon: nt,
  activeIcon: it,
  notif: at,
  pinging: ot,
  ping: ut
};
function Re() {
  try {
    const u = typeof localStorage < "u" && localStorage.getItem("clickedNfts") || "";
    return u ? Array.from(new Set(JSON.parse(u))) : [];
  } catch {
    return [];
  }
}
function ct(u) {
  try {
    const l = [...Re(), u];
    typeof localStorage < "u" && localStorage.setItem("clickedNfts", JSON.stringify(l));
  } catch {
    return null;
  }
}
function ft({
  notiVal: u,
  showNoti: f,
  isOpen: l,
  clickHandler: v
}) {
  const y = Re(), h = B.useContext(Gr), d = h == null ? void 0 : h.widgetState, a = d == null ? void 0 : d.foundNft, g = a && JSON.parse(a).itemId, R = !l && (a ? !y.includes(a) && !!g : !1), [x, E] = B.useState(R);
  return B.useEffect(() => {
    E(R);
  }, [R]), /* @__PURE__ */ Ur(
    "div",
    {
      className: Rr(H.popupButton__container, {
        [H["popupButton__container--open"]]: l
      }),
      children: [
        /* @__PURE__ */ K(
          "span",
          {
            className: x ? H.ring : void 0,
            style: { boxShadow: "none" }
          }
        ),
        /* @__PURE__ */ Ur(
          "button",
          {
            className: H.popupButton,
            type: "button",
            onClick: (F) => {
              E(!1), a && ct(a), v(F);
            },
            children: [
              /* @__PURE__ */ K(
                "div",
                {
                  className: Rr(H.icon, {
                    [H.activeIcon]: !l,
                    [H.inactiveIcon]: l
                  }),
                  children: /* @__PURE__ */ K(
                    "img",
                    {
                      alt: "WalletChat",
                      src: "https://uploads-ssl.webflow.com/62d761bae8bf2da003f57b06/62d761bae8bf2dea68f57b52_walletchat%20logo.png",
                      style: { height: "90%" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ K(
                "div",
                {
                  className: Rr(H.icon, {
                    [H.activeIcon]: l,
                    [H.inactiveIcon]: !l
                  }),
                  children: /* @__PURE__ */ K(
                    "svg",
                    {
                      focusable: "false",
                      viewBox: "0 0 16 14",
                      width: "28",
                      height: "25",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /* @__PURE__ */ K(
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
        f && /* @__PURE__ */ Ur(Xe, { children: [
          /* @__PURE__ */ K("span", { className: Rr(H.notif, H.pinging) }),
          /* @__PURE__ */ K("span", { className: H.notif, children: u })
        ] })
      ]
    }
  );
}
const st = "_ring_q714d_1", Sr = {
  ring: st,
  "wallet-chat-widget": "_wallet-chat-widget_q714d_23",
  "widget-is-open": "_widget-is-open_q714d_9",
  "widget-is-closed": "_widget-is-closed_q714d_13",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_q714d_23",
  "wallet-chat-widget__container--open": "_wallet-chat-widget__container--open_q714d_27"
}, lt = {}.VITE_REACT_APP_APP_URL;
let ne = lt || "https://staging.walletchat.fun";
const Ae = Sr["wallet-chat-widget"];
function wr(u) {
  var l;
  if (typeof document > "u")
    return;
  const f = document == null ? void 0 : document.getElementById(Ae);
  (l = f == null ? void 0 : f.contentWindow) == null || l.postMessage(u, "*");
}
function pt(u) {
  wr({ target: "sign_in", data: u || null });
}
function yt({
  connectedWallet: u,
  signedMessageData: f,
  requestSignature: l,
  connectUrl: v,
  style: y
}) {
  v && (ne = v);
  const [h, d] = B.useState(ne), a = B.useRef(""), g = B.useRef(null), R = B.useRef(u), x = B.useRef(0), E = B.useRef(!1), F = B.useContext(Gr), { widgetState: k, setWidgetState: V } = F || {}, { ownerAddress: z } = k || {}, [Z, nr] = B.useState(E.current), [pr, O] = B.useState(0), hr = B.useRef(""), X = () => {
    nr((D) => {
      const C = !!D;
      return g.current && !C && wr({
        target: "nft_info",
        data: { ...g.current, redirect: !0 }
      }), g.current = null, E.current = !C, !C;
    });
  }, ir = B.useCallback(() => {
    u && (Z || l) && pt({ ...u, requestSignature: l });
  }, [u, Z, l]);
  return B.useEffect(() => {
    ir();
  }, [ir]), B.useEffect(() => {
    if (!(z != null && z.address))
      return;
    const D = z.address, C = ie(window.location.href);
    C.network && (g.current = {
      ...C,
      ownerAddress: D
    }), g.current ? wr({
      target: "nft_info",
      data: { ...g.current, redirect: !0 }
    }) : wr({ target: "nft_info", data: { ownerAddress: D } }), nr(!0);
  }, [z]), B.useEffect(() => {
    f != null && f.signature && f.signature != hr.current && (hr.current = f.signature, wr({ target: "signed_message", data: f }));
  }, [f]), B.useEffect(() => {
    const D = () => {
      if (window.location.href === a.current)
        return;
      a.current = window.location.href;
      const fr = ie(window.location.href);
      V && V("foundNft", JSON.stringify(fr)), fr.network && (g.current = fr), wr({ target: "nft_info", data: fr });
    }, C = new MutationObserver(D), q = { subtree: !0, childList: !0 };
    return D(), C.observe(document, q), () => C.disconnect();
  }, [V]), B.useEffect(() => {
    R.current = u;
  }, [u]), B.useEffect(() => {
    const D = (C) => {
      const q = C.data;
      x.current < 100 && (wr({
        target: "origin",
        data: {
          domain: window.location.host,
          origin: window.location.protocol + window.location.host
        }
      }), x.current++), q.target === "url_env" && q.data !== ne && !v && d(q.data), q.target === "unread_cnt" && O(q.data), q.target === "close_widget" && X(), q.target === "is_signed_in" && !q.data && ir();
    };
    return window.addEventListener("message", D), () => window.removeEventListener("message", D);
  }, [ir]), /* @__PURE__ */ Ur(
    "div",
    {
      className: Rr(Sr["wallet-chat-widget__container"], {
        [Sr["wallet-chat-widget__container--open"]]: Z
      }),
      style: y,
      children: [
        /* @__PURE__ */ K(
          "iframe",
          {
            title: "WalletChat",
            name: "WalletChat",
            id: Ae,
            className: Rr("", {
              [Sr["widget-is-open"]]: Z,
              [Sr["widget-is-closed"]]: !Z
            }),
            src: h
          }
        ),
        /* @__PURE__ */ K(
          ft,
          {
            notiVal: pr,
            showNoti: pr > 0,
            isOpen: Z,
            clickHandler: X
          }
        )
      ]
    }
  );
}
const ht = ({
  onClick: u,
  children: f
}) => /* @__PURE__ */ K("button", { type: "button", onClick: u, children: f }), xt = ({
  ownerAddress: u,
  render: f
}) => {
  const l = B.useContext(Gr), v = l == null ? void 0 : l.setWidgetState, y = f ? ({ onClick: h, children: d }) => B.cloneElement(f, { onClick: h }, d) : ht;
  return l ? /* @__PURE__ */ Ur(
    y,
    {
      onClick: () => v && v("ownerAddress", {
        address: u,
        lastRequest: Date.now().toString()
      }),
      children: [
        /* @__PURE__ */ K(
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
  yt as WalletChatWidget,
  vt as types,
  wt as utils
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._ring_pzwee_47{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._popupButton__container_pzwee_5{position:relative;margin-top:.75rem;height:4rem;--tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / .15));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:margin-top,transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}._popupButton__container--open_pzwee_9{right:1.5rem;margin-top:-4rem;--tw-translate-y: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._popupButton__container--open_pzwee_9{right:0px;margin-top:.75rem;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._popupButton_pzwee_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}._icon_pzwee_23{transition-property:transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_pzwee_23 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_pzwee_31{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_pzwee_35{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_pzwee_39{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(220 38 38 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}._pinging_pzwee_43{animation:_ping_pzwee_43 1s cubic-bezier(0,0,.2,1) infinite}._ring_pzwee_47{position:fixed;right:0px;display:inline-flex;height:4rem;width:4rem}@keyframes _ping_pzwee_43{75%,to{transform:scale(2);opacity:0}}._ring_pzwee_47{animation:_ping_pzwee_43 1s cubic-bezier(0,0,.2,1) infinite;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity));opacity:.75}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._ring_q714d_1{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}#_wallet-chat-widget_q714d_23{transition-property:width,min-width,height,min-height;transition-duration:.25s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(4px 4px 8px rgba(0,0,0,.5));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._widget-is-open_q714d_9{height:75vh;min-height:500px;width:calc(100vw - 2rem);--tw-translate-x: -1rem;--tw-translate-y: -.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._widget-is-open_q714d_9{height:65vh;width:15vw;min-width:440px;--tw-translate-x: 0px;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._widget-is-closed_q714d_13{height:0px;min-height:0px;width:0px;min-width:0px}._wallet-chat-widget__container_q714d_23{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;-moz-user-select:none;user-select:none}._wallet-chat-widget__container--open_q714d_27{bottom:0px;right:0px}@media (min-width: 640px){._wallet-chat-widget__container--open_q714d_27{bottom:.5rem;right:1.5rem}}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
