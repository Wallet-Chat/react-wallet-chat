import k from "react";
function ie(u) {
  const l = u.replace("https://", "").replace("http://", "").split("/"), v = l.length, y = l[v - 1].split("?")[0], h = l[v - 2];
  if (u.startsWith("looksrare.org"))
    return { itemId: y, contractAddress: h, network: "ethereum" };
  const d = l[v - 3];
  return v >= 5 ? { itemId: y, contractAddress: h, network: d } : u.startsWith("x2y2.io") && d === "eth" ? { itemId: y, contractAddress: h, network: "ethereum" } : { contractAddress: null, itemId: null, network: null };
}
const dt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseNftFromUrl: ie
}, Symbol.toStringTag, { value: "Module" })), wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var Pe = {}, qr = {};
qr.byteLength = Le;
qr.toByteArray = We;
qr.fromByteArray = Ve;
var tr = [], X = [], Ne = typeof Uint8Array < "u" ? Uint8Array : Array, re = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var xr = 0, De = re.length; xr < De; ++xr)
  tr[xr] = re[xr], X[re.charCodeAt(xr)] = xr;
X["-".charCodeAt(0)] = 62;
X["_".charCodeAt(0)] = 63;
function xe(u) {
  var f = u.length;
  if (f % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var l = u.indexOf("=");
  l === -1 && (l = f);
  var v = l === f ? 0 : 4 - l % 4;
  return [l, v];
}
function Le(u) {
  var f = xe(u), l = f[0], v = f[1];
  return (l + v) * 3 / 4 - v;
}
function Me(u, f, l) {
  return (f + l) * 3 / 4 - l;
}
function We(u) {
  var f, l = xe(u), v = l[0], y = l[1], h = new Ne(Me(u, v, y)), d = 0, a = y > 0 ? v - 4 : v, g;
  for (g = 0; g < a; g += 4)
    f = X[u.charCodeAt(g)] << 18 | X[u.charCodeAt(g + 1)] << 12 | X[u.charCodeAt(g + 2)] << 6 | X[u.charCodeAt(g + 3)], h[d++] = f >> 16 & 255, h[d++] = f >> 8 & 255, h[d++] = f & 255;
  return y === 2 && (f = X[u.charCodeAt(g)] << 2 | X[u.charCodeAt(g + 1)] >> 4, h[d++] = f & 255), y === 1 && (f = X[u.charCodeAt(g)] << 10 | X[u.charCodeAt(g + 1)] << 4 | X[u.charCodeAt(g + 2)] >> 2, h[d++] = f >> 8 & 255, h[d++] = f & 255), h;
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
  var h, d, a = y * 8 - v - 1, g = (1 << a) - 1, A = g >> 1, x = -7, E = l ? y - 1 : 0, T = l ? -1 : 1, U = u[f + E];
  for (E += T, h = U & (1 << -x) - 1, U >>= -x, x += a; x > 0; h = h * 256 + u[f + E], E += T, x -= 8)
    ;
  for (d = h & (1 << -x) - 1, h >>= -x, x += v; x > 0; d = d * 256 + u[f + E], E += T, x -= 8)
    ;
  if (h === 0)
    h = 1 - A;
  else {
    if (h === g)
      return d ? NaN : (U ? -1 : 1) * (1 / 0);
    d = d + Math.pow(2, v), h = h - A;
  }
  return (U ? -1 : 1) * d * Math.pow(2, h - v);
};
ce.write = function(u, f, l, v, y, h) {
  var d, a, g, A = h * 8 - y - 1, x = (1 << A) - 1, E = x >> 1, T = y === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, U = v ? 0 : h - 1, J = v ? 1 : -1, Z = f < 0 || f === 0 && 1 / f < 0 ? 1 : 0;
  for (f = Math.abs(f), isNaN(f) || f === 1 / 0 ? (a = isNaN(f) ? 1 : 0, d = x) : (d = Math.floor(Math.log(f) / Math.LN2), f * (g = Math.pow(2, -d)) < 1 && (d--, g *= 2), d + E >= 1 ? f += T / g : f += T * Math.pow(2, 1 - E), f * g >= 2 && (d++, g /= 2), d + E >= x ? (a = 0, d = x) : d + E >= 1 ? (a = (f * g - 1) * Math.pow(2, y), d = d + E) : (a = f * Math.pow(2, E - 1) * Math.pow(2, y), d = 0)); y >= 8; u[l + U] = a & 255, U += J, a /= 256, y -= 8)
    ;
  for (d = d << y | a, A += y; A > 0; u[l + U] = d & 255, U += J, d /= 256, A -= 8)
    ;
  u[l + U - J] |= Z * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  var f = qr, l = ce, v = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  u.Buffer = a, u.SlowBuffer = V, u.INSPECT_MAX_BYTES = 50;
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
      return T(t, r);
    if (ArrayBuffer.isView(t))
      return J(t);
    if (t == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
      );
    if (G(t, ArrayBuffer) || t && G(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (G(t, SharedArrayBuffer) || t && G(t.buffer, SharedArrayBuffer)))
      return Z(t, r, e);
    if (typeof t == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var n = t.valueOf && t.valueOf();
    if (n != null && n !== t)
      return a.from(n, r, e);
    var o = lr(t);
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
  function E(t) {
    return A(t), d(t < 0 ? 0 : Q(t) | 0);
  }
  a.allocUnsafe = function(t) {
    return E(t);
  }, a.allocUnsafeSlow = function(t) {
    return E(t);
  };
  function T(t, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !a.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var e = b(t, r) | 0, n = d(e), o = n.write(t, r);
    return o !== e && (n = n.slice(0, o)), n;
  }
  function U(t) {
    for (var r = t.length < 0 ? 0 : Q(t.length) | 0, e = d(r), n = 0; n < r; n += 1)
      e[n] = t[n] & 255;
    return e;
  }
  function J(t) {
    if (G(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return Z(r.buffer, r.byteOffset, r.byteLength);
    }
    return U(t);
  }
  function Z(t, r, e) {
    if (r < 0 || t.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < r + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var n;
    return r === void 0 && e === void 0 ? n = new Uint8Array(t) : e === void 0 ? n = new Uint8Array(t, r) : n = new Uint8Array(t, r, e), Object.setPrototypeOf(n, a.prototype), n;
  }
  function lr(t) {
    if (a.isBuffer(t)) {
      var r = Q(t.length) | 0, e = d(r);
      return e.length === 0 || t.copy(e, 0, 0, r), e;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || Fr(t.length) ? d(0) : U(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return U(t.data);
  }
  function Q(t) {
    if (t >= y)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + y.toString(16) + " bytes");
    return t | 0;
  }
  function V(t) {
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
  function b(t, r) {
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
          return fr(t).length;
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
            return n ? -1 : fr(t).length;
          r = ("" + r).toLowerCase(), o = !0;
      }
  }
  a.byteLength = b;
  function L(t, r, e) {
    var n = !1;
    if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, r >>>= 0, e <= r))
      return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return Pr(this, r, e);
        case "utf8":
        case "utf-8":
          return z(this, r, e);
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
  function W(t, r, e) {
    var n = t[r];
    t[r] = t[e], t[e] = n;
  }
  a.prototype.swap16 = function() {
    var r = this.length;
    if (r % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var e = 0; e < r; e += 2)
      W(this, e, e + 1);
    return this;
  }, a.prototype.swap32 = function() {
    var r = this.length;
    if (r % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var e = 0; e < r; e += 4)
      W(this, e, e + 3), W(this, e + 1, e + 2);
    return this;
  }, a.prototype.swap64 = function() {
    var r = this.length;
    if (r % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var e = 0; e < r; e += 8)
      W(this, e, e + 7), W(this, e + 1, e + 6), W(this, e + 2, e + 5), W(this, e + 3, e + 4);
    return this;
  }, a.prototype.toString = function() {
    var r = this.length;
    return r === 0 ? "" : arguments.length === 0 ? z(this, 0, r) : L.apply(this, arguments);
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
    for (var p = c - o, _ = n - e, C = Math.min(p, _), I = this.slice(o, c), M = r.slice(e, n), O = 0; O < C; ++O)
      if (I[O] !== M[O]) {
        p = I[O], _ = M[O];
        break;
      }
    return p < _ ? -1 : _ < p ? 1 : 0;
  };
  function Sr(t, r, e, n, o) {
    if (t.length === 0)
      return -1;
    if (typeof e == "string" ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, Fr(e) && (e = o ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
      if (o)
        return -1;
      e = t.length - 1;
    } else if (e < 0)
      if (o)
        e = 0;
      else
        return -1;
    if (typeof r == "string" && (r = a.from(r, n)), a.isBuffer(r))
      return r.length === 0 ? -1 : nr(t, r, e, n, o);
    if (typeof r == "number")
      return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? o ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : nr(t, [r], e, n, o);
    throw new TypeError("val must be string, number or Buffer");
  }
  function nr(t, r, e, n, o) {
    var c = 1, p = t.length, _ = r.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || r.length < 2)
        return -1;
      c = 2, p /= 2, _ /= 2, e /= 2;
    }
    function C(Wr, Yr) {
      return c === 1 ? Wr[Yr] : Wr.readUInt16BE(Yr * c);
    }
    var I;
    if (o) {
      var M = -1;
      for (I = e; I < p; I++)
        if (C(t, I) === C(r, M === -1 ? 0 : I - M)) {
          if (M === -1 && (M = I), I - M + 1 === _)
            return M * c;
        } else
          M !== -1 && (I -= I - M), M = -1;
    } else
      for (e + _ > p && (e = p - _), I = e; I >= 0; I--) {
        for (var O = !0, vr = 0; vr < _; vr++)
          if (C(t, I + vr) !== C(r, vr)) {
            O = !1;
            break;
          }
        if (O)
          return I;
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
      var _ = parseInt(r.substr(p * 2, 2), 16);
      if (Fr(_))
        return p;
      t[e + p] = _;
    }
    return p;
  }
  function zr(t, r, e, n) {
    return pr(fr(r, t.length - e), t, e, n);
  }
  function Gr(t, r, e, n) {
    return pr(Tr(r), t, e, n);
  }
  function Hr(t, r, e, n) {
    return pr(Mr(r), t, e, n);
  }
  function Kr(t, r, e, n) {
    return pr(dr(r, t.length - e), t, e, n);
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
  function z(t, r, e) {
    e = Math.min(t.length, e);
    for (var n = [], o = r; o < e; ) {
      var c = t[o], p = null, _ = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
      if (o + _ <= e) {
        var C, I, M, O;
        switch (_) {
          case 1:
            c < 128 && (p = c);
            break;
          case 2:
            C = t[o + 1], (C & 192) === 128 && (O = (c & 31) << 6 | C & 63, O > 127 && (p = O));
            break;
          case 3:
            C = t[o + 1], I = t[o + 2], (C & 192) === 128 && (I & 192) === 128 && (O = (c & 15) << 12 | (C & 63) << 6 | I & 63, O > 2047 && (O < 55296 || O > 57343) && (p = O));
            break;
          case 4:
            C = t[o + 1], I = t[o + 2], M = t[o + 3], (C & 192) === 128 && (I & 192) === 128 && (M & 192) === 128 && (O = (c & 15) << 18 | (C & 63) << 12 | (I & 63) << 6 | M & 63, O > 65535 && O < 1114112 && (p = O));
        }
      }
      p === null ? (p = 65533, _ = 1) : p > 65535 && (p -= 65536, n.push(p >>> 10 & 1023 | 55296), p = 56320 | p & 1023), n.push(p), o += _;
    }
    return Or(n);
  }
  var cr = 4096;
  function Or(t) {
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
      o += wr[t[c]];
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
    var p = 0, _ = 1, C = 0;
    for (this[e] = r & 255; ++p < n && (_ *= 256); )
      r < 0 && C === 0 && this[e + p - 1] !== 0 && (C = 1), this[e + p] = (r / _ >> 0) - C & 255;
    return e + n;
  }, a.prototype.writeIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var c = Math.pow(2, 8 * n - 1);
      Y(this, r, e, n, c - 1, -c);
    }
    var p = n - 1, _ = 1, C = 0;
    for (this[e + p] = r & 255; --p >= 0 && (_ *= 256); )
      r < 0 && C === 0 && this[e + p + 1] !== 0 && (C = 1), this[e + p] = (r / _ >> 0) - C & 255;
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
  function br(t, r, e, n, o, c) {
    if (e + n > t.length)
      throw new RangeError("Index out of range");
    if (e < 0)
      throw new RangeError("Index out of range");
  }
  function Dr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || br(t, r, e, 4), l.write(t, r, e, n, 23, 4), e + 4;
  }
  a.prototype.writeFloatLE = function(r, e, n) {
    return Dr(this, r, e, !0, n);
  }, a.prototype.writeFloatBE = function(r, e, n) {
    return Dr(this, r, e, !1, n);
  };
  function Lr(t, r, e, n, o) {
    return r = +r, e = e >>> 0, o || br(t, r, e, 8), l.write(t, r, e, n, 52, 8), e + 8;
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
      var _ = a.isBuffer(r) ? r : a.from(r, o), C = _.length;
      if (C === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (p = 0; p < n - e; ++p)
        this[p + e] = _[p % C];
    }
    return this;
  };
  var Rr = /[^+/0-9A-Za-z-_]/g;
  function Ar(t) {
    if (t = t.split("=")[0], t = t.trim().replace(Rr, ""), t.length < 2)
      return "";
    for (; t.length % 4 !== 0; )
      t = t + "=";
    return t;
  }
  function fr(t, r) {
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
  function Tr(t) {
    for (var r = [], e = 0; e < t.length; ++e)
      r.push(t.charCodeAt(e) & 255);
    return r;
  }
  function dr(t, r) {
    for (var e, n, o, c = [], p = 0; p < t.length && !((r -= 2) < 0); ++p)
      e = t.charCodeAt(p), n = e >> 8, o = e % 256, c.push(o), c.push(n);
    return c;
  }
  function Mr(t) {
    return f.toByteArray(Ar(t));
  }
  function pr(t, r, e, n) {
    for (var o = 0; o < n && !(o + e >= r.length || o >= t.length); ++o)
      r[o + e] = t[o];
    return o;
  }
  function G(t, r) {
    return t instanceof r || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === r.name;
  }
  function Fr(t) {
    return t !== t;
  }
  var wr = function() {
    for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
      for (var n = e * 16, o = 0; o < 16; ++o)
        r[n + o] = t[e] + t[o];
    return r;
  }();
})(Pe);
var Vr = {}, qe = {
  get exports() {
    return Vr;
  },
  set exports(u) {
    Vr = u;
  }
}, N = qe.exports = {}, rr, er;
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
function Je(u) {
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
var or = [], _r = !1, hr, $r = -1;
function ze() {
  !_r || !hr || (_r = !1, hr.length ? or = hr.concat(or) : $r = -1, or.length && Ee());
}
function Ee() {
  if (!_r) {
    var u = me(ze);
    _r = !0;
    for (var f = or.length; f; ) {
      for (hr = or, or = []; ++$r < f; )
        hr && hr[$r].run();
      $r = -1, f = or.length;
    }
    hr = null, _r = !1, Je(u);
  }
}
N.nextTick = function(u) {
  var f = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var l = 1; l < arguments.length; l++)
      f[l - 1] = arguments[l];
  or.push(new _e(u, f)), or.length === 1 && !_r && me(Ee);
};
function _e(u, f) {
  this.fun = u, this.array = f;
}
_e.prototype.run = function() {
  this.fun.apply(null, this.array);
};
N.title = "browser";
N.browser = !0;
N.env = {};
N.argv = [];
N.version = "";
N.versions = {};
function ur() {
}
N.on = ur;
N.addListener = ur;
N.once = ur;
N.off = ur;
N.removeListener = ur;
N.removeAllListeners = ur;
N.emit = ur;
N.prependListener = ur;
N.prependOnceListener = ur;
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
  var l = __magic__;
  return l;
})(Object);
var Br = {}, Ge = {
  get exports() {
    return Br;
  },
  set exports(u) {
    Br = u;
  }
}, mr = {};
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
      var A = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(x) {
        A[x] = x;
      }), Object.keys(Object.assign({}, A)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return ee = y() ? Object.assign : function(h, d) {
    for (var a, g = v(h), A, x = 1; x < arguments.length; x++) {
      a = Object(arguments[x]);
      for (var E in a)
        f.call(a, E) && (g[E] = a[E]);
      if (u) {
        A = u(a);
        for (var T = 0; T < A.length; T++)
          l.call(a, A[T]) && (g[A[T]] = a[A[T]]);
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
    return mr;
  ge = 1, be();
  var u = k, f = 60103;
  if (mr.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var l = Symbol.for;
    f = l("react.element"), mr.Fragment = l("react.fragment");
  }
  var v = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, y = Object.prototype.hasOwnProperty, h = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(a, g, A) {
    var x, E = {}, T = null, U = null;
    A !== void 0 && (T = "" + A), g.key !== void 0 && (T = "" + g.key), g.ref !== void 0 && (U = g.ref);
    for (x in g)
      y.call(g, x) && !h.hasOwnProperty(x) && (E[x] = g[x]);
    if (a && a.defaultProps)
      for (x in g = a.defaultProps, g)
        E[x] === void 0 && (E[x] = g[x]);
    return { $$typeof: f, type: a, key: T, ref: U, props: E, _owner: v.current };
  }
  return mr.jsx = d, mr.jsxs = d, mr;
}
var te = {}, ye;
function Ke() {
  return ye || (ye = 1, function(u) {
    Vr.env.NODE_ENV !== "production" && function() {
      var f = k, l = be(), v = 60103, y = 60106;
      u.Fragment = 60107;
      var h = 60108, d = 60114, a = 60109, g = 60110, A = 60112, x = 60113, E = 60120, T = 60115, U = 60116, J = 60121, Z = 60122, lr = 60117, Q = 60129, V = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var b = Symbol.for;
        v = b("react.element"), y = b("react.portal"), u.Fragment = b("react.fragment"), h = b("react.strict_mode"), d = b("react.profiler"), a = b("react.provider"), g = b("react.context"), A = b("react.forward_ref"), x = b("react.suspense"), E = b("react.suspense_list"), T = b("react.memo"), U = b("react.lazy"), J = b("react.block"), Z = b("react.server.block"), lr = b("react.fundamental"), b("react.scope"), b("react.opaque.id"), Q = b("react.debug_trace_mode"), b("react.offscreen"), V = b("react.legacy_hidden");
      }
      var L = typeof Symbol == "function" && Symbol.iterator, W = "@@iterator";
      function Sr(i) {
        if (i === null || typeof i != "object")
          return null;
        var s = L && i[L] || i[W];
        return typeof s == "function" ? s : null;
      }
      var nr = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function $(i) {
        {
          for (var s = arguments.length, w = new Array(s > 1 ? s - 1 : 0), m = 1; m < s; m++)
            w[m - 1] = arguments[m];
          zr("error", i, w);
        }
      }
      function zr(i, s, w) {
        {
          var m = nr.ReactDebugCurrentFrame, B = m.getStackAddendum();
          B !== "" && (s += "%s", w = w.concat([B]));
          var S = w.map(function(F) {
            return "" + F;
          });
          S.unshift("Warning: " + s), Function.prototype.apply.call(console[i], console, S);
        }
      }
      var Gr = !1;
      function Hr(i) {
        return !!(typeof i == "string" || typeof i == "function" || i === u.Fragment || i === d || i === Q || i === h || i === x || i === E || i === V || Gr || typeof i == "object" && i !== null && (i.$$typeof === U || i.$$typeof === T || i.$$typeof === a || i.$$typeof === g || i.$$typeof === A || i.$$typeof === lr || i.$$typeof === J || i[0] === Z));
      }
      function Kr(i, s, w) {
        var m = s.displayName || s.name || "";
        return i.displayName || (m !== "" ? w + "(" + m + ")" : w);
      }
      function Ur(i) {
        return i.displayName || "Context";
      }
      function z(i) {
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
          case E:
            return "SuspenseList";
        }
        if (typeof i == "object")
          switch (i.$$typeof) {
            case g:
              var s = i;
              return Ur(s) + ".Consumer";
            case a:
              var w = i;
              return Ur(w._context) + ".Provider";
            case A:
              return Kr(i, i.render, "ForwardRef");
            case T:
              return z(i.type);
            case J:
              return z(i._render);
            case U: {
              var m = i, B = m._payload, S = m._init;
              try {
                return z(S(B));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var cr = 0, Or, kr, jr, Pr, Nr, j, Y;
      function br() {
      }
      br.__reactDisabledLog = !0;
      function Dr() {
        {
          if (cr === 0) {
            Or = console.log, kr = console.info, jr = console.warn, Pr = console.error, Nr = console.group, j = console.groupCollapsed, Y = console.groupEnd;
            var i = {
              configurable: !0,
              enumerable: !0,
              value: br,
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
      function Lr() {
        {
          if (cr--, cr === 0) {
            var i = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: l({}, i, {
                value: Or
              }),
              info: l({}, i, {
                value: kr
              }),
              warn: l({}, i, {
                value: jr
              }),
              error: l({}, i, {
                value: Pr
              }),
              group: l({}, i, {
                value: Nr
              }),
              groupCollapsed: l({}, i, {
                value: j
              }),
              groupEnd: l({}, i, {
                value: Y
              })
            });
          }
          cr < 0 && $("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Rr = nr.ReactCurrentDispatcher, Ar;
      function fr(i, s, w) {
        {
          if (Ar === void 0)
            try {
              throw Error();
            } catch (B) {
              var m = B.stack.trim().match(/\n( *(at )?)/);
              Ar = m && m[1] || "";
            }
          return `
` + Ar + i;
        }
      }
      var Tr = !1, dr;
      {
        var Mr = typeof WeakMap == "function" ? WeakMap : Map;
        dr = new Mr();
      }
      function pr(i, s) {
        if (!i || Tr)
          return "";
        {
          var w = dr.get(i);
          if (w !== void 0)
            return w;
        }
        var m;
        Tr = !0;
        var B = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var S;
        S = Rr.current, Rr.current = null, Dr();
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
              } catch (ar) {
                m = ar;
              }
              Reflect.construct(i, [], F);
            } else {
              try {
                F.call();
              } catch (ar) {
                m = ar;
              }
              i.call(F.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (ar) {
              m = ar;
            }
            i();
          }
        } catch (ar) {
          if (ar && m && typeof ar.stack == "string") {
            for (var R = ar.stack.split(`
`), q = m.stack.split(`
`), P = R.length - 1, D = q.length - 1; P >= 1 && D >= 0 && R[P] !== q[D]; )
              D--;
            for (; P >= 1 && D >= 0; P--, D--)
              if (R[P] !== q[D]) {
                if (P !== 1 || D !== 1)
                  do
                    if (P--, D--, D < 0 || R[P] !== q[D]) {
                      var ir = `
` + R[P].replace(" at new ", " at ");
                      return typeof i == "function" && dr.set(i, ir), ir;
                    }
                  while (P >= 1 && D >= 0);
                break;
              }
          }
        } finally {
          Tr = !1, Rr.current = S, Lr(), Error.prepareStackTrace = B;
        }
        var yr = i ? i.displayName || i.name : "", we = yr ? fr(yr) : "";
        return typeof i == "function" && dr.set(i, we), we;
      }
      function G(i, s, w) {
        return pr(i, !1);
      }
      function Fr(i) {
        var s = i.prototype;
        return !!(s && s.isReactComponent);
      }
      function wr(i, s, w) {
        if (i == null)
          return "";
        if (typeof i == "function")
          return pr(i, Fr(i));
        if (typeof i == "string")
          return fr(i);
        switch (i) {
          case x:
            return fr("Suspense");
          case E:
            return fr("SuspenseList");
        }
        if (typeof i == "object")
          switch (i.$$typeof) {
            case A:
              return G(i.render);
            case T:
              return wr(i.type, s, w);
            case J:
              return G(i._render);
            case U: {
              var m = i, B = m._payload, S = m._init;
              try {
                return wr(S(B), s, w);
              } catch {
              }
            }
          }
        return "";
      }
      var t = {}, r = nr.ReactDebugCurrentFrame;
      function e(i) {
        if (i) {
          var s = i._owner, w = wr(i.type, i._source, s ? s.type : null);
          r.setExtraStackFrame(w);
        } else
          r.setExtraStackFrame(null);
      }
      function n(i, s, w, m, B) {
        {
          var S = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var F in i)
            if (S(i, F)) {
              var R = void 0;
              try {
                if (typeof i[F] != "function") {
                  var q = Error((m || "React class") + ": " + w + " type `" + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[F] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw q.name = "Invariant Violation", q;
                }
                R = i[F](s, F, m, w, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (P) {
                R = P;
              }
              R && !(R instanceof Error) && (e(B), $("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", w, F, typeof R), e(null)), R instanceof Error && !(R.message in t) && (t[R.message] = !0, e(B), $("Failed %s type: %s", w, R.message), e(null));
            }
        }
      }
      var o = nr.ReactCurrentOwner, c = Object.prototype.hasOwnProperty, p = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, _, C, I;
      I = {};
      function M(i) {
        if (c.call(i, "ref")) {
          var s = Object.getOwnPropertyDescriptor(i, "ref").get;
          if (s && s.isReactWarning)
            return !1;
        }
        return i.ref !== void 0;
      }
      function O(i) {
        if (c.call(i, "key")) {
          var s = Object.getOwnPropertyDescriptor(i, "key").get;
          if (s && s.isReactWarning)
            return !1;
        }
        return i.key !== void 0;
      }
      function vr(i, s) {
        if (typeof i.ref == "string" && o.current && s && o.current.stateNode !== s) {
          var w = z(o.current.type);
          I[w] || ($('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', z(o.current.type), i.ref), I[w] = !0);
        }
      }
      function Wr(i, s) {
        {
          var w = function() {
            _ || (_ = !0, $("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
          };
          w.isReactWarning = !0, Object.defineProperty(i, "key", {
            get: w,
            configurable: !0
          });
        }
      }
      function Yr(i, s) {
        {
          var w = function() {
            C || (C = !0, $("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
          };
          w.isReactWarning = !0, Object.defineProperty(i, "ref", {
            get: w,
            configurable: !0
          });
        }
      }
      var Te = function(i, s, w, m, B, S, F) {
        var R = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: v,
          // Built-in properties that belong on the element
          type: i,
          key: s,
          ref: w,
          props: F,
          // Record the component responsible for creating this element.
          _owner: S
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
          value: B
        }), Object.freeze && (Object.freeze(R.props), Object.freeze(R)), R;
      };
      function Fe(i, s, w, m, B) {
        {
          var S, F = {}, R = null, q = null;
          w !== void 0 && (R = "" + w), O(s) && (R = "" + s.key), M(s) && (q = s.ref, vr(s, B));
          for (S in s)
            c.call(s, S) && !p.hasOwnProperty(S) && (F[S] = s[S]);
          if (i && i.defaultProps) {
            var P = i.defaultProps;
            for (S in P)
              F[S] === void 0 && (F[S] = P[S]);
          }
          if (R || q) {
            var D = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
            R && Wr(F, D), q && Yr(F, D);
          }
          return Te(i, R, q, B, m, o.current, F);
        }
      }
      var Xr = nr.ReactCurrentOwner, fe = nr.ReactDebugCurrentFrame;
      function gr(i) {
        if (i) {
          var s = i._owner, w = wr(i.type, i._source, s ? s.type : null);
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
            var i = z(Xr.current.type);
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
          i && i._owner && i._owner !== Xr.current && (m = " It was passed a child from " + z(i._owner.type) + "."), gr(i), $('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', w, m), gr(null);
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
            var B = Sr(i);
            if (typeof B == "function" && B !== i.entries)
              for (var S = B.call(i), F; !(F = S.next()).done; )
                Zr(F.value) && pe(F.value, s);
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
          else if (typeof s == "object" && (s.$$typeof === A || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          s.$$typeof === T))
            w = s.propTypes;
          else
            return;
          if (w) {
            var m = z(s);
            n(w, i.props, "prop", m, i);
          } else if (s.PropTypes !== void 0 && !Qr) {
            Qr = !0;
            var B = z(s);
            $("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", B || "Unknown");
          }
          typeof s.getDefaultProps == "function" && !s.getDefaultProps.isReactClassApproved && $("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Se(i) {
        {
          for (var s = Object.keys(i.props), w = 0; w < s.length; w++) {
            var m = s[w];
            if (m !== "children" && m !== "key") {
              gr(i), $("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), gr(null);
              break;
            }
          }
          i.ref !== null && (gr(i), $("Invalid attribute `ref` supplied to `React.Fragment`."), gr(null));
        }
      }
      function de(i, s, w, m, B, S) {
        {
          var F = Hr(i);
          if (!F) {
            var R = "";
            (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var q = Ce(B);
            q ? R += q : R += se();
            var P;
            i === null ? P = "null" : Array.isArray(i) ? P = "array" : i !== void 0 && i.$$typeof === v ? (P = "<" + (z(i.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : P = typeof i, $("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", P, R);
          }
          var D = Fe(i, s, w, B, S);
          if (D == null)
            return D;
          if (F) {
            var ir = s.children;
            if (ir !== void 0)
              if (m)
                if (Array.isArray(ir)) {
                  for (var yr = 0; yr < ir.length; yr++)
                    he(ir[yr], i);
                  Object.freeze && Object.freeze(ir);
                } else
                  $("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                he(ir, i);
          }
          return i === u.Fragment ? Se(D) : Be(D), D;
        }
      }
      function Ue(i, s, w) {
        return de(i, s, w, !0);
      }
      function Oe(i, s, w) {
        return de(i, s, w, !1);
      }
      var ke = Oe, je = Ue;
      u.jsx = ke, u.jsxs = je;
    }();
  }(te)), te;
}
(function(u) {
  Vr.env.NODE_ENV === "production" ? u.exports = He() : u.exports = Ke();
})(Ge);
const Xe = Br.Fragment, K = Br.jsx, Ir = Br.jsxs;
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
const Er = ue, Jr = k.createContext(null);
function vt({
  children: u
}) {
  const [f, l] = k.useState(), v = k.useCallback(
    (h, d) => l((a) => ({ ...a || {}, [h]: d })),
    []
  ), y = k.useMemo(
    () => ({
      widgetState: f || null,
      setWidgetState: v
    }),
    [f, v]
  );
  return /* @__PURE__ */ K(Jr.Provider, { value: y, children: u });
}
const Ze = "_ring_7tcsj_47", rt = "_popupButton__container_7tcsj_5", et = "_popupButton_7tcsj_5", tt = "_icon_7tcsj_23", nt = "_inactiveIcon_7tcsj_31", it = "_activeIcon_7tcsj_35", at = "_notif_7tcsj_39", ot = "_pinging_7tcsj_43", ut = "_ping_7tcsj_43", H = {
  ring: Ze,
  popupButton__container: rt,
  "popupButton__container--open": "_popupButton__container--open_7tcsj_9",
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
  const y = Re(), h = k.useContext(Jr), d = h == null ? void 0 : h.widgetState, a = d == null ? void 0 : d.foundNft, g = a && JSON.parse(a).itemId, A = !l && (a ? !y.includes(a) && !!g : !1), [x, E] = k.useState(A);
  return k.useEffect(() => {
    E(A);
  }, [A]), /* @__PURE__ */ Ir(
    "div",
    {
      className: Er(H.popupButton__container, {
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
        /* @__PURE__ */ Ir(
          "button",
          {
            className: H.popupButton,
            type: "button",
            onClick: (T) => {
              E(!1), a && ct(a), v(T);
            },
            children: [
              /* @__PURE__ */ K(
                "div",
                {
                  className: Er(H.icon, {
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
                  className: Er(H.icon, {
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
        f && /* @__PURE__ */ Ir(Xe, { children: [
          /* @__PURE__ */ K("span", { className: Er(H.notif, H.pinging) }),
          /* @__PURE__ */ K("span", { className: H.notif, children: u })
        ] })
      ]
    }
  );
}
const st = "_ring_q714d_1", Cr = {
  ring: st,
  "wallet-chat-widget": "_wallet-chat-widget_q714d_23",
  "widget-is-open": "_widget-is-open_q714d_9",
  "widget-is-closed": "_widget-is-closed_q714d_13",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_q714d_23",
  "wallet-chat-widget__container--open": "_wallet-chat-widget__container--open_q714d_27"
};
let ne = "https://staging.walletchat.fun";
const Ae = Cr["wallet-chat-widget"];
function sr(u) {
  var l;
  if (typeof document > "u")
    return;
  const f = document == null ? void 0 : document.getElementById(Ae);
  (l = f == null ? void 0 : f.contentWindow) == null || l.postMessage(u, "*");
}
function lt(u) {
  sr({
    target: "origin",
    data: {
      domain: window.location.host,
      origin: window.location.protocol + window.location.host
    }
  }), sr({ target: "sign_in", data: u || null });
}
function gt({
  connectedWallet: u,
  signMessage: f,
  requestSignature: l,
  style: v
}) {
  const y = k.useRef(""), h = k.useRef(null), d = k.useRef(u), a = k.useRef(!1), g = k.useContext(Jr), { widgetState: A, setWidgetState: x } = g || {}, { ownerAddress: E } = A || {}, [T, U] = k.useState(a.current), [J, Z] = k.useState(0), lr = () => {
    U((V) => {
      const b = !!V;
      return h.current && !b && sr({
        target: "nft_info",
        data: { ...h.current, redirect: !0 }
      }), h.current = null, a.current = !b, !b;
    });
  }, Q = k.useCallback(() => {
    u && (T || l) && lt({ ...u, requestSignature: l });
  }, [u, T, l]);
  return k.useEffect(() => {
    Q();
  }, [Q]), k.useEffect(() => {
    if (!(E != null && E.address))
      return;
    const V = E.address, b = ie(window.location.href);
    b.network && (h.current = {
      ...b,
      ownerAddress: V
    }), h.current ? sr({
      target: "nft_info",
      data: { ...h.current, redirect: !0 }
    }) : sr({ target: "nft_info", data: { ownerAddress: V } }), U(!0);
  }, [E]), k.useEffect(() => {
    const V = () => {
      if (window.location.href === y.current)
        return;
      y.current = window.location.href;
      const W = ie(window.location.href);
      x && x("foundNft", JSON.stringify(W)), W.network && (h.current = W), sr({ target: "nft_info", data: W });
    }, b = new MutationObserver(V), L = { subtree: !0, childList: !0 };
    return V(), b.observe(document, L), () => b.disconnect();
  }, [x]), k.useEffect(() => {
    d.current = u;
  }, [u]), k.useEffect(() => {
    const V = (b) => {
      const L = b.data;
      L.target === "url_env" && L.data !== ne && (ne = L.data), L.target === "unread_cnt" && Z(L.data), L.target === "message_to_sign" && f && d.current && f({ message: L.data }).then(
        (W) => W && sr({
          target: "signed_message",
          data: { signature: W, signedMsg: L.data }
        })
      ).catch(
        () => sr({
          target: "signed_message",
          data: { signature: null, signedMsg: L.data }
        })
      ), L.target === "close_widget" && lr(), L.target === "is_signed_in" && !L.data && Q();
    };
    return window.addEventListener("message", V), () => window.removeEventListener("message", V);
  }, [f, Q]), /* @__PURE__ */ Ir(
    "div",
    {
      className: Er(Cr["wallet-chat-widget__container"], {
        [Cr["wallet-chat-widget__container--open"]]: T
      }),
      style: v,
      children: [
        /* @__PURE__ */ K(
          "iframe",
          {
            title: "WalletChat",
            name: "WalletChat",
            id: Ae,
            className: Er("", {
              [Cr["widget-is-open"]]: T,
              [Cr["widget-is-closed"]]: !T
            }),
            src: ne
          }
        ),
        /* @__PURE__ */ K(
          ft,
          {
            notiVal: J,
            showNoti: J > 0,
            isOpen: T,
            clickHandler: lr
          }
        )
      ]
    }
  );
}
const pt = ({
  onClick: u,
  children: f
}) => /* @__PURE__ */ K("button", { type: "button", onClick: u, children: f }), yt = ({
  ownerAddress: u,
  render: f
}) => {
  const l = k.useContext(Jr), v = l == null ? void 0 : l.setWidgetState, y = f ? ({ onClick: h, children: d }) => k.cloneElement(f, { onClick: h }, d) : pt;
  return l ? /* @__PURE__ */ Ir(
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
  yt as ChatWithOwner,
  vt as WalletChatProvider,
  gt as WalletChatWidget,
  wt as types,
  dt as utils
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._ring_7tcsj_47{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._popupButton__container_7tcsj_5{position:relative;margin-top:.75rem;height:4rem;--tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / .15));-webkit-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:margin-top,-webkit-transform;transition-property:margin-top,transform;transition-property:margin-top,transform,-webkit-transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}._popupButton__container--open_7tcsj_9{right:1.5rem;margin-top:-4rem;--tw-translate-y: 100%;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._popupButton__container--open_7tcsj_9{right:0px;margin-top:.75rem;--tw-translate-y: 0px;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._popupButton_7tcsj_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;-webkit-transform-origin:center;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}._icon_7tcsj_23{transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_7tcsj_23 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_7tcsj_31{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_7tcsj_35{--tw-rotate: 0deg;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_7tcsj_39{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(219 39 119 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}@-webkit-keyframes _ping_7tcsj_43{75%,to{-webkit-transform:scale(2);transform:scale(2);opacity:0}}._pinging_7tcsj_43{-webkit-animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite}._ring_7tcsj_47{position:fixed;right:0px;display:inline-flex;height:4rem;width:4rem}@keyframes _ping_7tcsj_43{75%,to{-webkit-transform:scale(2);transform:scale(2);opacity:0}}._ring_7tcsj_47{-webkit-animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity));opacity:.75}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::-webkit-backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._ring_q714d_1{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}#_wallet-chat-widget_q714d_23{transition-property:width,min-width,height,min-height;transition-duration:.25s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(4px 4px 8px rgba(0,0,0,.5));-webkit-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._widget-is-open_q714d_9{height:75vh;min-height:440px;width:calc(100vw - 2rem);--tw-translate-x: -1rem;--tw-translate-y: -.5rem;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._widget-is-open_q714d_9{height:65vh;width:15vw;min-width:440px;--tw-translate-x: 0px;--tw-translate-y: 0px;-webkit-transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._widget-is-closed_q714d_13{height:0px;min-height:0px;width:0px;min-width:0px}._wallet-chat-widget__container_q714d_23{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;user-select:none}._wallet-chat-widget__container--open_q714d_27{bottom:0px;right:0px}@media (min-width: 640px){._wallet-chat-widget__container--open_q714d_27{bottom:.5rem;right:1.5rem}}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
