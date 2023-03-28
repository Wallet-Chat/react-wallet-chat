import { SiweMessage as Le } from "siwe";
import B from "react";
function ne(u) {
  const p = u.replace("https://", "").replace("http://", "").split("/"), y = p.length, v = p[y - 1], w = p[y - 2];
  if (u.startsWith("looksrare.org"))
    return { itemId: v, contractAddress: w, network: "ethereum" };
  const d = p[y - 3];
  return y >= 5 ? { itemId: v, contractAddress: w, network: d } : u.startsWith("x2y2.io") && d === "eth" ? { itemId: v, contractAddress: w, network: "ethereum" } : { contractAddress: null, itemId: null, network: null };
}
async function Me(u, s, p, y) {
  const v = window.location.host, w = window.location.protocol + v, d = "You are signing a plain-text message to prove you own this wallet address. No gas fees or transactions will occur.", g = new Le({
    domain: v,
    address: u,
    statement: d,
    uri: w,
    version: "1",
    chainId: s,
    nonce: p
  }).prepareMessage();
  let T;
  try {
    T = await (y == null ? void 0 : y.signMessage(g));
  } catch (x) {
    console.log("🚨[SIWE][Failed or Rejected]:", x);
  }
  return { signature: T, messageToSign: g };
}
const xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  doRequestSignature: Me,
  parseNftFromUrl: ne
}, Symbol.toStringTag, { value: "Module" })), Et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var We = {}, Jr = {};
Jr.byteLength = Ve;
Jr.toByteArray = Je;
Jr.fromByteArray = He;
var er = [], H = [], Ye = typeof Uint8Array < "u" ? Uint8Array : Array, te = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var yr = 0, $e = te.length; yr < $e; ++yr)
  er[yr] = te[yr], H[te.charCodeAt(yr)] = yr;
H["-".charCodeAt(0)] = 62;
H["_".charCodeAt(0)] = 63;
function ge(u) {
  var s = u.length;
  if (s % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var p = u.indexOf("=");
  p === -1 && (p = s);
  var y = p === s ? 0 : 4 - p % 4;
  return [p, y];
}
function Ve(u) {
  var s = ge(u), p = s[0], y = s[1];
  return (p + y) * 3 / 4 - y;
}
function qe(u, s, p) {
  return (s + p) * 3 / 4 - p;
}
function Je(u) {
  var s, p = ge(u), y = p[0], v = p[1], w = new Ye(qe(u, y, v)), d = 0, a = v > 0 ? y - 4 : y, g;
  for (g = 0; g < a; g += 4)
    s = H[u.charCodeAt(g)] << 18 | H[u.charCodeAt(g + 1)] << 12 | H[u.charCodeAt(g + 2)] << 6 | H[u.charCodeAt(g + 3)], w[d++] = s >> 16 & 255, w[d++] = s >> 8 & 255, w[d++] = s & 255;
  return v === 2 && (s = H[u.charCodeAt(g)] << 2 | H[u.charCodeAt(g + 1)] >> 4, w[d++] = s & 255), v === 1 && (s = H[u.charCodeAt(g)] << 10 | H[u.charCodeAt(g + 1)] << 4 | H[u.charCodeAt(g + 2)] >> 2, w[d++] = s >> 8 & 255, w[d++] = s & 255), w;
}
function ze(u) {
  return er[u >> 18 & 63] + er[u >> 12 & 63] + er[u >> 6 & 63] + er[u & 63];
}
function Ge(u, s, p) {
  for (var y, v = [], w = s; w < p; w += 3)
    y = (u[w] << 16 & 16711680) + (u[w + 1] << 8 & 65280) + (u[w + 2] & 255), v.push(ze(y));
  return v.join("");
}
function He(u) {
  for (var s, p = u.length, y = p % 3, v = [], w = 16383, d = 0, a = p - y; d < a; d += w)
    v.push(Ge(u, d, d + w > a ? a : d + w));
  return y === 1 ? (s = u[p - 1], v.push(
    er[s >> 2] + er[s << 4 & 63] + "=="
  )) : y === 2 && (s = (u[p - 2] << 8) + u[p - 1], v.push(
    er[s >> 10] + er[s >> 4 & 63] + er[s << 2 & 63] + "="
  )), v.join("");
}
var ue = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ue.read = function(u, s, p, y, v) {
  var w, d, a = v * 8 - y - 1, g = (1 << a) - 1, T = g >> 1, x = -7, F = p ? v - 1 : 0, k = p ? -1 : 1, O = u[s + F];
  for (F += k, w = O & (1 << -x) - 1, O >>= -x, x += a; x > 0; w = w * 256 + u[s + F], F += k, x -= 8)
    ;
  for (d = w & (1 << -x) - 1, w >>= -x, x += y; x > 0; d = d * 256 + u[s + F], F += k, x -= 8)
    ;
  if (w === 0)
    w = 1 - T;
  else {
    if (w === g)
      return d ? NaN : (O ? -1 : 1) * (1 / 0);
    d = d + Math.pow(2, y), w = w - T;
  }
  return (O ? -1 : 1) * d * Math.pow(2, w - y);
};
ue.write = function(u, s, p, y, v, w) {
  var d, a, g, T = w * 8 - v - 1, x = (1 << T) - 1, F = x >> 1, k = v === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, O = y ? 0 : w - 1, X = y ? 1 : -1, W = s < 0 || s === 0 && 1 / s < 0 ? 1 : 0;
  for (s = Math.abs(s), isNaN(s) || s === 1 / 0 ? (a = isNaN(s) ? 1 : 0, d = x) : (d = Math.floor(Math.log(s) / Math.LN2), s * (g = Math.pow(2, -d)) < 1 && (d--, g *= 2), d + F >= 1 ? s += k / g : s += k * Math.pow(2, 1 - F), s * g >= 2 && (d++, g /= 2), d + F >= x ? (a = 0, d = x) : d + F >= 1 ? (a = (s * g - 1) * Math.pow(2, v), d = d + F) : (a = s * Math.pow(2, F - 1) * Math.pow(2, v), d = 0)); v >= 8; u[p + O] = a & 255, O += X, a /= 256, v -= 8)
    ;
  for (d = d << v | a, T += v; T > 0; u[p + O] = d & 255, O += X, d /= 256, T -= 8)
    ;
  u[p + O - X] |= W * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  var s = Jr, p = ue, y = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  u.Buffer = a, u.SlowBuffer = U, u.INSPECT_MAX_BYTES = 50;
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
      return F(t);
    }
    return g(t, r, e);
  }
  a.poolSize = 8192;
  function g(t, r, e) {
    if (typeof t == "string")
      return k(t, r);
    if (ArrayBuffer.isView(t))
      return X(t);
    if (t == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
      );
    if (z(t, ArrayBuffer) || t && z(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (z(t, SharedArrayBuffer) || t && z(t.buffer, SharedArrayBuffer)))
      return W(t, r, e);
    if (typeof t == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var n = t.valueOf && t.valueOf();
    if (n != null && n !== t)
      return a.from(n, r, e);
    var o = $(t);
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
    return T(t), d(t < 0 ? 0 : P(t) | 0);
  }
  a.allocUnsafe = function(t) {
    return F(t);
  }, a.allocUnsafeSlow = function(t) {
    return F(t);
  };
  function k(t, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !a.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var e = Br(t, r) | 0, n = d(e), o = n.write(t, r);
    return o !== e && (n = n.slice(0, o)), n;
  }
  function O(t) {
    for (var r = t.length < 0 ? 0 : P(t.length) | 0, e = d(r), n = 0; n < r; n += 1)
      e[n] = t[n] & 255;
    return e;
  }
  function X(t) {
    if (z(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return W(r.buffer, r.byteOffset, r.byteLength);
    }
    return O(t);
  }
  function W(t, r, e) {
    if (r < 0 || t.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < r + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var n;
    return r === void 0 && e === void 0 ? n = new Uint8Array(t) : e === void 0 ? n = new Uint8Array(t, r) : n = new Uint8Array(t, r, e), Object.setPrototypeOf(n, a.prototype), n;
  }
  function $(t) {
    if (a.isBuffer(t)) {
      var r = P(t.length) | 0, e = d(r);
      return e.length === 0 || t.copy(e, 0, 0, r), e;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || br(t.length) ? d(0) : O(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return O(t.data);
  }
  function P(t) {
    if (t >= v)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + v.toString(16) + " bytes");
    return t | 0;
  }
  function U(t) {
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
    for (var l = c - o, _ = n - e, S = Math.min(l, _), C = this.slice(o, c), M = r.slice(e, n), A = 0; A < S; ++A)
      if (C[A] !== M[A]) {
        l = C[A], _ = M[A];
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
    function S(Fr, Rr) {
      return c === 1 ? Fr[Rr] : Fr.readUInt16BE(Rr * c);
    }
    var C;
    if (o) {
      var M = -1;
      for (C = e; C < l; C++)
        if (S(t, C) === S(r, M === -1 ? 0 : C - M)) {
          if (M === -1 && (M = C), C - M + 1 === _)
            return M * c;
        } else
          M !== -1 && (C -= C - M), M = -1;
    } else
      for (e + _ > l && (e = l - _), C = e; C >= 0; C--) {
        for (var A = !0, hr = 0; hr < _; hr++)
          if (S(t, C + hr) !== S(r, hr)) {
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
    return r === 0 && e === t.length ? s.fromByteArray(t) : s.fromByteArray(t.slice(r, e));
  }
  function Q(t, r, e) {
    e = Math.min(t.length, e);
    for (var n = [], o = r; o < e; ) {
      var c = t[o], l = null, _ = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
      if (o + _ <= e) {
        var S, C, M, A;
        switch (_) {
          case 1:
            c < 128 && (l = c);
            break;
          case 2:
            S = t[o + 1], (S & 192) === 128 && (A = (c & 31) << 6 | S & 63, A > 127 && (l = A));
            break;
          case 3:
            S = t[o + 1], C = t[o + 2], (S & 192) === 128 && (C & 192) === 128 && (A = (c & 15) << 12 | (S & 63) << 6 | C & 63, A > 2047 && (A < 55296 || A > 57343) && (l = A));
            break;
          case 4:
            S = t[o + 1], C = t[o + 2], M = t[o + 3], (S & 192) === 128 && (C & 192) === 128 && (M & 192) === 128 && (A = (c & 15) << 18 | (S & 63) << 12 | (C & 63) << 6 | M & 63, A > 65535 && A < 1114112 && (l = A));
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
    var l = 0, _ = 1, S = 0;
    for (this[e] = r & 255; ++l < n && (_ *= 256); )
      r < 0 && S === 0 && this[e + l - 1] !== 0 && (S = 1), this[e + l] = (r / _ >> 0) - S & 255;
    return e + n;
  }, a.prototype.writeIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var c = Math.pow(2, 8 * n - 1);
      Y(this, r, e, n, c - 1, -c);
    }
    var l = n - 1, _ = 1, S = 0;
    for (this[e + l] = r & 255; --l >= 0 && (_ *= 256); )
      r < 0 && S === 0 && this[e + l + 1] !== 0 && (S = 1), this[e + l] = (r / _ >> 0) - S & 255;
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
      var _ = a.isBuffer(r) ? r : a.from(r, o), S = _.length;
      if (S === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (l = 0; l < n - e; ++l)
        this[l + e] = _[l % S];
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
    return s.toByteArray(Er(t));
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
})(We);
var qr = {}, Xe = {
  get exports() {
    return qr;
  },
  set exports(u) {
    qr = u;
  }
}, D = Xe.exports = {}, Z, rr;
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
function me(u) {
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
function Ke(u) {
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
function Qe() {
  !gr || !fr || (gr = !1, fr.length ? ir = fr.concat(ir) : Vr = -1, ir.length && xe());
}
function xe() {
  if (!gr) {
    var u = me(Qe);
    gr = !0;
    for (var s = ir.length; s; ) {
      for (fr = ir, ir = []; ++Vr < s; )
        fr && fr[Vr].run();
      Vr = -1, s = ir.length;
    }
    fr = null, gr = !1, Ke(u);
  }
}
D.nextTick = function(u) {
  var s = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var p = 1; p < arguments.length; p++)
      s[p - 1] = arguments[p];
  ir.push(new Ee(u, s)), ir.length === 1 && !gr && me(xe);
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
function or() {
}
D.on = or;
D.addListener = or;
D.once = or;
D.off = or;
D.removeListener = or;
D.removeAllListeners = or;
D.emit = or;
D.prependListener = or;
D.prependOnceListener = or;
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
var Ir = {}, Ze = {
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
function rt() {
  if (we)
    return Tr;
  we = 1;
  var u = B, s = Symbol.for("react.element"), p = Symbol.for("react.fragment"), y = Object.prototype.hasOwnProperty, v = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(a, g, T) {
    var x, F = {}, k = null, O = null;
    T !== void 0 && (k = "" + T), g.key !== void 0 && (k = "" + g.key), g.ref !== void 0 && (O = g.ref);
    for (x in g)
      y.call(g, x) && !w.hasOwnProperty(x) && (F[x] = g[x]);
    if (a && a.defaultProps)
      for (x in g = a.defaultProps, g)
        F[x] === void 0 && (F[x] = g[x]);
    return { $$typeof: s, type: a, key: k, ref: O, props: F, _owner: v.current };
  }
  return Tr.Fragment = p, Tr.jsx = d, Tr.jsxs = d, Tr;
}
var Sr = {}, ye;
function et() {
  return ye || (ye = 1, qr.env.NODE_ENV !== "production" && function() {
    var u = B, s = Symbol.for("react.element"), p = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), a = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), x = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), O = Symbol.for("react.offscreen"), X = Symbol.iterator, W = "@@iterator";
    function $(i) {
      if (i === null || typeof i != "object")
        return null;
      var f = X && i[X] || i[W];
      return typeof f == "function" ? f : null;
    }
    var P = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function U(i) {
      {
        for (var f = arguments.length, h = new Array(f > 1 ? f - 1 : 0), m = 1; m < f; m++)
          h[m - 1] = arguments[m];
        Br("error", i, h);
      }
    }
    function Br(i, f, h) {
      {
        var m = P.ReactDebugCurrentFrame, R = m.getStackAddendum();
        R !== "" && (f += "%s", h = h.concat([R]));
        var I = h.map(function(b) {
          return String(b);
        });
        I.unshift("Warning: " + f), Function.prototype.apply.call(console[i], console, I);
      }
    }
    var Gr = !1, tr = !1, Ur = !1, kr = !1, Hr = !1, Or;
    Or = Symbol.for("react.module.reference");
    function Xr(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === y || i === w || Hr || i === v || i === T || i === x || kr || i === O || Gr || tr || Ur || typeof i == "object" && i !== null && (i.$$typeof === k || i.$$typeof === F || i.$$typeof === d || i.$$typeof === a || i.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === Or || i.getModuleId !== void 0));
    }
    function Kr(i, f, h) {
      var m = i.displayName;
      if (m)
        return m;
      var R = f.displayName || f.name || "";
      return R !== "" ? h + "(" + R + ")" : h;
    }
    function Nr(i) {
      return i.displayName || "Context";
    }
    function K(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && U("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
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
        case T:
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
            var h = i;
            return Nr(h._context) + ".Provider";
          case g:
            return Kr(i, i.render, "ForwardRef");
          case F:
            var m = i.displayName || null;
            return m !== null ? m : K(i.type) || "Memo";
          case k: {
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
    var Q = Object.assign, ar = 0, jr, Dr, Pr, Lr, Mr, N, Y;
    function mr() {
    }
    mr.__reactDisabledLog = !0;
    function Wr() {
      {
        if (ar === 0) {
          jr = console.log, Dr = console.info, Pr = console.warn, Lr = console.error, Mr = console.group, N = console.groupCollapsed, Y = console.groupEnd;
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
              value: N
            }),
            groupEnd: Q({}, i, {
              value: Y
            })
          });
        }
        ar < 0 && U("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var xr = P.ReactCurrentDispatcher, Er;
    function ur(i, f, h) {
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
    function cr(i, f) {
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
`), j = E.length - 1, L = V.length - 1; j >= 1 && L >= 0 && E[j] !== V[L]; )
            L--;
          for (; j >= 1 && L >= 0; j--, L--)
            if (E[j] !== V[L]) {
              if (j !== 1 || L !== 1)
                do
                  if (j--, L--, L < 0 || E[j] !== V[L]) {
                    var G = `
` + E[j].replace(" at new ", " at ");
                    return i.displayName && G.includes("<anonymous>") && (G = G.replace("<anonymous>", i.displayName)), typeof i == "function" && lr.set(i, G), G;
                  }
                while (j >= 1 && L >= 0);
              break;
            }
        }
      } finally {
        _r = !1, xr.current = I, Yr(), Error.prepareStackTrace = R;
      }
      var wr = i ? i.displayName || i.name : "", de = wr ? ur(wr) : "";
      return typeof i == "function" && lr.set(i, de), de;
    }
    function z(i, f, h) {
      return cr(i, !1);
    }
    function br(i) {
      var f = i.prototype;
      return !!(f && f.isReactComponent);
    }
    function pr(i, f, h) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return cr(i, br(i));
      if (typeof i == "string")
        return ur(i);
      switch (i) {
        case T:
          return ur("Suspense");
        case x:
          return ur("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case g:
            return z(i.render);
          case F:
            return pr(i.type, f, h);
          case k: {
            var m = i, R = m._payload, I = m._init;
            try {
              return pr(I(R), f, h);
            } catch {
            }
          }
        }
      return "";
    }
    var t = Object.prototype.hasOwnProperty, r = {}, e = P.ReactDebugCurrentFrame;
    function n(i) {
      if (i) {
        var f = i._owner, h = pr(i.type, i._source, f ? f.type : null);
        e.setExtraStackFrame(h);
      } else
        e.setExtraStackFrame(null);
    }
    function o(i, f, h, m, R) {
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
              E = i[b](f, b, m, h, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (j) {
              E = j;
            }
            E && !(E instanceof Error) && (n(R), U("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", h, b, typeof E), n(null)), E instanceof Error && !(E.message in r) && (r[E.message] = !0, n(R), U("Failed %s type: %s", h, E.message), n(null));
          }
      }
    }
    var c = Array.isArray;
    function l(i) {
      return c(i);
    }
    function _(i) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, h = f && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return h;
      }
    }
    function S(i) {
      try {
        return C(i), !1;
      } catch {
        return !0;
      }
    }
    function C(i) {
      return "" + i;
    }
    function M(i) {
      if (S(i))
        return U("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", _(i)), C(i);
    }
    var A = P.ReactCurrentOwner, hr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Fr, Rr, Qr;
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
        var h = K(A.current.type);
        Qr[h] || (U('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', K(A.current.type), i.ref), Qr[h] = !0);
      }
    }
    function Se(i, f) {
      {
        var h = function() {
          Fr || (Fr = !0, U("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
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
          Rr || (Rr = !0, U("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        h.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: h,
          configurable: !0
        });
      }
    }
    var Ce = function(i, f, h, m, R, I, b) {
      var E = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: s,
        // Built-in properties that belong on the element
        type: i,
        key: f,
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
    function Ie(i, f, h, m, R) {
      {
        var I, b = {}, E = null, V = null;
        h !== void 0 && (M(h), E = "" + h), Re(f) && (M(f.key), E = "" + f.key), Fe(f) && (V = f.ref, Te(f, R));
        for (I in f)
          t.call(f, I) && !hr.hasOwnProperty(I) && (b[I] = f[I]);
        if (i && i.defaultProps) {
          var j = i.defaultProps;
          for (I in j)
            b[I] === void 0 && (b[I] = j[I]);
        }
        if (E || V) {
          var L = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          E && Se(b, L), V && Ae(b, L);
        }
        return Ce(i, E, V, R, m, A.current, b);
      }
    }
    var Zr = P.ReactCurrentOwner, ce = P.ReactDebugCurrentFrame;
    function dr(i) {
      if (i) {
        var f = i._owner, h = pr(i.type, i._source, f ? f.type : null);
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
          var i = K(Zr.current.type);
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
        i && i._owner && i._owner !== Zr.current && (m = " It was passed a child from " + K(i._owner.type) + "."), dr(i), U('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', h, m), dr(null);
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
          var R = $(i);
          if (typeof R == "function" && R !== i.entries)
            for (var I = R.call(i), b; !(b = I.next()).done; )
              ee(b.value) && le(b.value, f);
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
        f.$$typeof === F))
          h = f.propTypes;
        else
          return;
        if (h) {
          var m = K(f);
          o(h, i.props, "prop", m, i);
        } else if (f.PropTypes !== void 0 && !re) {
          re = !0;
          var R = K(f);
          U("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", R || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && U("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Oe(i) {
      {
        for (var f = Object.keys(i.props), h = 0; h < f.length; h++) {
          var m = f[h];
          if (m !== "children" && m !== "key") {
            dr(i), U("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), dr(null);
            break;
          }
        }
        i.ref !== null && (dr(i), U("Invalid attribute `ref` supplied to `React.Fragment`."), dr(null));
      }
    }
    function he(i, f, h, m, R, I) {
      {
        var b = Xr(i);
        if (!b) {
          var E = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var V = Be(R);
          V ? E += V : E += se();
          var j;
          i === null ? j = "null" : l(i) ? j = "array" : i !== void 0 && i.$$typeof === s ? (j = "<" + (K(i.type) || "Unknown") + " />", E = " Did you accidentally export a JSX literal instead of a component?") : j = typeof i, U("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", j, E);
        }
        var L = Ie(i, f, h, R, I);
        if (L == null)
          return L;
        if (b) {
          var G = f.children;
          if (G !== void 0)
            if (m)
              if (l(G)) {
                for (var wr = 0; wr < G.length; wr++)
                  pe(G[wr], i);
                Object.freeze && Object.freeze(G);
              } else
                U("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              pe(G, i);
        }
        return i === y ? Oe(L) : ke(L), L;
      }
    }
    function Ne(i, f, h) {
      return he(i, f, h, !0);
    }
    function je(i, f, h) {
      return he(i, f, h, !1);
    }
    var De = je, Pe = Ne;
    Sr.Fragment = y, Sr.jsx = De, Sr.jsxs = Pe;
  }()), Sr;
}
(function(u) {
  qr.env.NODE_ENV === "production" ? u.exports = rt() : u.exports = et();
})(Ze);
const tt = Ir.Fragment, J = Ir.jsx, Cr = Ir.jsxs;
var ae = {}, nt = {
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
})(nt);
const vr = ae, zr = B.createContext(null);
function _t({
  children: u
}) {
  const [s, p] = B.useState(), y = B.useCallback(
    (w, d) => p((a) => ({ ...a || {}, [w]: d })),
    []
  ), v = B.useMemo(
    () => ({
      widgetState: s || null,
      setWidgetState: y
    }),
    [s, y]
  );
  return /* @__PURE__ */ J(zr.Provider, { value: v, children: u });
}
const it = "_ring_7tcsj_47", ot = "_popupButton__container_7tcsj_5", at = "_popupButton_7tcsj_5", ut = "_icon_7tcsj_23", ct = "_inactiveIcon_7tcsj_31", st = "_activeIcon_7tcsj_35", ft = "_notif_7tcsj_39", lt = "_pinging_7tcsj_43", pt = "_ping_7tcsj_43", q = {
  ring: it,
  popupButton__container: ot,
  "popupButton__container--open": "_popupButton__container--open_7tcsj_9",
  popupButton: at,
  icon: ut,
  inactiveIcon: ct,
  activeIcon: st,
  notif: ft,
  pinging: lt,
  ping: pt
};
function _e() {
  try {
    const u = typeof localStorage < "u" && localStorage.getItem("clickedNfts") || "";
    return u ? JSON.parse(u) : [];
  } catch {
    return [];
  }
}
function ht(u) {
  try {
    const p = [..._e(), u];
    typeof localStorage < "u" && localStorage.setItem("clickedNfts", JSON.stringify(p));
  } catch {
    return null;
  }
}
function dt({
  notiVal: u,
  showNoti: s,
  isOpen: p,
  clickHandler: y
}) {
  const v = _e(), w = B.useContext(zr), d = w == null ? void 0 : w.widgetState, a = d == null ? void 0 : d.foundNft, g = a && JSON.parse(a).itemId, T = !p && (a ? !v.includes(a) && Boolean(g) : !1), [x, F] = B.useState(T);
  return B.useEffect(() => {
    T && F(!0);
  }, [T]), /* @__PURE__ */ Cr(
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
        /* @__PURE__ */ Cr(
          "button",
          {
            className: q.popupButton,
            type: "button",
            onClick: (k) => {
              F(!1), a && ht(a), y(k);
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
        s && /* @__PURE__ */ Cr(tt, { children: [
          /* @__PURE__ */ J("span", { className: vr(q.notif, q.pinging) }),
          /* @__PURE__ */ J("span", { className: q.notif, children: u })
        ] })
      ]
    }
  );
}
const wt = "_ring_q714d_1", Ar = {
  ring: wt,
  "wallet-chat-widget": "_wallet-chat-widget_q714d_23",
  "widget-is-open": "_widget-is-open_q714d_9",
  "widget-is-closed": "_widget-is-closed_q714d_13",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_q714d_23",
  "wallet-chat-widget__container--open": "_wallet-chat-widget__container--open_q714d_27"
}, yt = "https://staging.walletchat.fun", be = Ar["wallet-chat-widget"];
function sr(u) {
  var p;
  if (typeof document > "u")
    return;
  const s = document == null ? void 0 : document.getElementById(be);
  (p = s == null ? void 0 : s.contentWindow) == null || p.postMessage(u, "*");
}
function ve(u) {
  const s = Boolean(
    typeof u < "u" && u !== null
  );
  sr({
    target: "sign_in",
    data: s ? u : null
  });
}
function bt({
  connectedWallet: u
}) {
  const s = B.useRef(""), p = B.useRef(null), y = B.useRef(!1), v = B.useRef(u), w = B.useRef(!1), d = B.useContext(zr), { widgetState: a, setWidgetState: g } = d || {}, { ownerAddress: T } = a || {}, [x, F] = B.useState(w.current), [k, O] = B.useState(0), X = () => {
    F((W) => {
      const $ = Boolean(W);
      return sr({ target: "widget_open", data: !$ }), p.current && !$ && sr({
        target: "nft_info",
        data: { ...p.current, redirect: !0 }
      }), p.current = null, w.current = !$, !$;
    });
  };
  return B.useEffect(() => {
    x && !y.current && ve(u || null);
  }, [u, x]), B.useEffect(() => {
    if (!(T != null && T.address))
      return;
    const W = T.address, $ = ne(window.location.href);
    $.network && (p.current = {
      ...$,
      ownerAddress: W
    }), p.current ? sr({
      target: "nft_info",
      data: { ...p.current, redirect: !0 }
    }) : sr({ target: "nft_info", data: { ownerAddress: W } }), F(!0);
  }, [T]), B.useEffect(() => {
    const W = () => {
      if (window.location.href === s.current)
        return;
      s.current = window.location.href;
      const U = ne(window.location.href);
      g && g("foundNft", JSON.stringify(U)), U.network && (p.current = U), sr({ target: "nft_info", data: U });
    }, $ = new MutationObserver(W), P = { subtree: !0, childList: !0 };
    return W(), $.observe(document, P), () => $.disconnect();
  }, []), B.useEffect(() => {
    v.current = u;
  }, [u]), B.useEffect(() => {
    const W = ($) => {
      const { data: P } = $;
      P.target === "unread_cnt" && O(P.data), P.closeWidget && X(), P.target === "sign_in" && (P.data ? y.current = P.true : P.data === null && (y.current = !1, ve(v.current || null))), w.current && sr({ target: "widget_open", data: !0 });
    };
    return window.addEventListener("message", W), () => window.removeEventListener("message", W);
  }, []), /* @__PURE__ */ Cr(
    "div",
    {
      className: vr(Ar["wallet-chat-widget__container"], {
        [Ar["wallet-chat-widget__container--open"]]: x
      }),
      children: [
        /* @__PURE__ */ J(
          "iframe",
          {
            title: "WalletChat",
            name: "WalletChat",
            id: be,
            className: vr("", {
              [Ar["widget-is-open"]]: x,
              [Ar["widget-is-closed"]]: !x
            }),
            src: yt
          }
        ),
        /* @__PURE__ */ J(
          dt,
          {
            notiVal: k,
            showNoti: k > 0,
            isOpen: x,
            clickHandler: X
          }
        )
      ]
    }
  );
}
const vt = ({
  onClick: u,
  children: s
}) => /* @__PURE__ */ J("button", { type: "button", onClick: u, children: s }), Ft = ({
  ownerAddress: u,
  render: s
}) => {
  const p = B.useContext(zr), y = p == null ? void 0 : p.setWidgetState, v = s ? ({ onClick: w, children: d }) => B.cloneElement(s, { onClick: w }, d) : vt;
  return p ? /* @__PURE__ */ Cr(
    v,
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
  Ft as ChatWithOwner,
  _t as WalletChatProvider,
  bt as WalletChatWidget,
  Et as types,
  xt as utils
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._ring_7tcsj_47{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._popupButton__container_7tcsj_5{position:relative;margin-top:.75rem;height:4rem;--tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / .15));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:margin-top,transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}._popupButton__container--open_7tcsj_9{right:1.5rem;margin-top:-4rem;--tw-translate-y: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._popupButton__container--open_7tcsj_9{right:0px;margin-top:.75rem;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._popupButton_7tcsj_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}._icon_7tcsj_23{transition-property:transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_7tcsj_23 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_7tcsj_31{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_7tcsj_35{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_7tcsj_39{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(219 39 119 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}._pinging_7tcsj_43{animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite}._ring_7tcsj_47{position:fixed;right:0px;display:inline-flex;height:4rem;width:4rem}@keyframes _ping_7tcsj_43{75%,to{transform:scale(2);opacity:0}}._ring_7tcsj_47{animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity));opacity:.75}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._ring_q714d_1{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}#_wallet-chat-widget_q714d_23{transition-property:width,min-width,height,min-height;transition-duration:.25s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(4px 4px 8px rgba(0,0,0,.5));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._widget-is-open_q714d_9{height:75vh;min-height:440px;width:calc(100vw - 2rem);--tw-translate-x: -1rem;--tw-translate-y: -.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._widget-is-open_q714d_9{height:65vh;width:15vw;min-width:440px;--tw-translate-x: 0px;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._widget-is-closed_q714d_13{height:0px;min-height:0px;width:0px;min-width:0px}._wallet-chat-widget__container_q714d_23{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;-moz-user-select:none;user-select:none}._wallet-chat-widget__container--open_q714d_27{bottom:0px;right:0px}@media (min-width: 640px){._wallet-chat-widget__container--open_q714d_27{bottom:.5rem;right:1.5rem}}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
