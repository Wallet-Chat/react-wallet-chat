import { SiweMessage as Le } from "siwe";
import U from "react";
function ne(u) {
  const p = u.replace("https://", "").replace("http://", "").split("/"), y = p.length, g = p[y - 1], h = p[y - 2];
  if (u.startsWith("looksrare.org"))
    return { itemId: g, contractAddress: h, network: "ethereum" };
  const d = p[y - 3];
  return y >= 5 ? { itemId: g, contractAddress: h, network: d } : u.startsWith("x2y2.io") && d === "eth" ? { itemId: g, contractAddress: h, network: "ethereum" } : { contractAddress: null, itemId: null, network: null };
}
function ve(u, c, p) {
  const y = window.location.host, g = window.location.protocol + y, h = "You are signing a plain-text message to prove you own this wallet address. No gas fees or transactions will occur.";
  return new Le({
    domain: y,
    address: u,
    statement: h,
    uri: g,
    version: "1",
    chainId: c,
    nonce: p
  }).prepareMessage();
}
function We(u) {
  return fetch("api.v2.walletchat.fun/v1/welcome", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${u}`
    }
  }).then((c) => c.json()).then(async (c) => (console.log("✅[GET][Welcome]:", c.msg), c.msg)).catch((c) => (console.log("🚨[GET][Welcome]:", c), null));
}
function Ye(u) {
  return fetch(`api.v2.walletchat.fun/users/${u}/nonce`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((c) => c.json()).then(async (c) => (console.log("✅[GET][Nonce]:", c), c.Nonce)).catch((c) => (console.log("🚨[GET][Nonce]:", c), null));
}
const _t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fetchNonce: Ye,
  fetchWelcome: We,
  getSiweMessage: ve,
  parseNftFromUrl: ne
}, Symbol.toStringTag, { value: "Module" })), bt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var $e = {}, Jr = {};
Jr.byteLength = Ge;
Jr.toByteArray = ze;
Jr.fromByteArray = Ke;
var nr = [], X = [], Ve = typeof Uint8Array < "u" ? Uint8Array : Array, te = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var vr = 0, qe = te.length; vr < qe; ++vr)
  nr[vr] = te[vr], X[te.charCodeAt(vr)] = vr;
X["-".charCodeAt(0)] = 62;
X["_".charCodeAt(0)] = 63;
function me(u) {
  var c = u.length;
  if (c % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var p = u.indexOf("=");
  p === -1 && (p = c);
  var y = p === c ? 0 : 4 - p % 4;
  return [p, y];
}
function Ge(u) {
  var c = me(u), p = c[0], y = c[1];
  return (p + y) * 3 / 4 - y;
}
function Je(u, c, p) {
  return (c + p) * 3 / 4 - p;
}
function ze(u) {
  var c, p = me(u), y = p[0], g = p[1], h = new Ve(Je(u, y, g)), d = 0, a = g > 0 ? y - 4 : y, v;
  for (v = 0; v < a; v += 4)
    c = X[u.charCodeAt(v)] << 18 | X[u.charCodeAt(v + 1)] << 12 | X[u.charCodeAt(v + 2)] << 6 | X[u.charCodeAt(v + 3)], h[d++] = c >> 16 & 255, h[d++] = c >> 8 & 255, h[d++] = c & 255;
  return g === 2 && (c = X[u.charCodeAt(v)] << 2 | X[u.charCodeAt(v + 1)] >> 4, h[d++] = c & 255), g === 1 && (c = X[u.charCodeAt(v)] << 10 | X[u.charCodeAt(v + 1)] << 4 | X[u.charCodeAt(v + 2)] >> 2, h[d++] = c >> 8 & 255, h[d++] = c & 255), h;
}
function He(u) {
  return nr[u >> 18 & 63] + nr[u >> 12 & 63] + nr[u >> 6 & 63] + nr[u & 63];
}
function Xe(u, c, p) {
  for (var y, g = [], h = c; h < p; h += 3)
    y = (u[h] << 16 & 16711680) + (u[h + 1] << 8 & 65280) + (u[h + 2] & 255), g.push(He(y));
  return g.join("");
}
function Ke(u) {
  for (var c, p = u.length, y = p % 3, g = [], h = 16383, d = 0, a = p - y; d < a; d += h)
    g.push(Xe(u, d, d + h > a ? a : d + h));
  return y === 1 ? (c = u[p - 1], g.push(
    nr[c >> 2] + nr[c << 4 & 63] + "=="
  )) : y === 2 && (c = (u[p - 2] << 8) + u[p - 1], g.push(
    nr[c >> 10] + nr[c >> 4 & 63] + nr[c << 2 & 63] + "="
  )), g.join("");
}
var ue = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ue.read = function(u, c, p, y, g) {
  var h, d, a = g * 8 - y - 1, v = (1 << a) - 1, B = v >> 1, x = -7, E = p ? g - 1 : 0, O = p ? -1 : 1, k = u[c + E];
  for (E += O, h = k & (1 << -x) - 1, k >>= -x, x += a; x > 0; h = h * 256 + u[c + E], E += O, x -= 8)
    ;
  for (d = h & (1 << -x) - 1, h >>= -x, x += y; x > 0; d = d * 256 + u[c + E], E += O, x -= 8)
    ;
  if (h === 0)
    h = 1 - B;
  else {
    if (h === v)
      return d ? NaN : (k ? -1 : 1) * (1 / 0);
    d = d + Math.pow(2, y), h = h - B;
  }
  return (k ? -1 : 1) * d * Math.pow(2, h - y);
};
ue.write = function(u, c, p, y, g, h) {
  var d, a, v, B = h * 8 - g - 1, x = (1 << B) - 1, E = x >> 1, O = g === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, k = y ? 0 : h - 1, Q = y ? 1 : -1, G = c < 0 || c === 0 && 1 / c < 0 ? 1 : 0;
  for (c = Math.abs(c), isNaN(c) || c === 1 / 0 ? (a = isNaN(c) ? 1 : 0, d = x) : (d = Math.floor(Math.log(c) / Math.LN2), c * (v = Math.pow(2, -d)) < 1 && (d--, v *= 2), d + E >= 1 ? c += O / v : c += O * Math.pow(2, 1 - E), c * v >= 2 && (d++, v /= 2), d + E >= x ? (a = 0, d = x) : d + E >= 1 ? (a = (c * v - 1) * Math.pow(2, g), d = d + E) : (a = c * Math.pow(2, E - 1) * Math.pow(2, g), d = 0)); g >= 8; u[p + k] = a & 255, k += Q, a /= 256, g -= 8)
    ;
  for (d = d << g | a, B += g; B > 0; u[p + k] = d & 255, k += Q, d /= 256, B -= 8)
    ;
  u[p + k - Q] |= G * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  var c = Jr, p = ue, y = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  u.Buffer = a, u.SlowBuffer = R, u.INSPECT_MAX_BYTES = 50;
  var g = 2147483647;
  u.kMaxLength = g, a.TYPED_ARRAY_SUPPORT = h(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
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
      return E(t);
    }
    return v(t, r, e);
  }
  a.poolSize = 8192;
  function v(t, r, e) {
    if (typeof t == "string")
      return O(t, r);
    if (ArrayBuffer.isView(t))
      return Q(t);
    if (t == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
      );
    if (z(t, ArrayBuffer) || t && z(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (z(t, SharedArrayBuffer) || t && z(t.buffer, SharedArrayBuffer)))
      return G(t, r, e);
    if (typeof t == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var n = t.valueOf && t.valueOf();
    if (n != null && n !== t)
      return a.from(n, r, e);
    var o = pr(t);
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
  function B(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function x(t, r, e) {
    return B(t), t <= 0 ? d(t) : r !== void 0 ? typeof e == "string" ? d(t).fill(r, e) : d(t).fill(r) : d(t);
  }
  a.alloc = function(t, r, e) {
    return x(t, r, e);
  };
  function E(t) {
    return B(t), d(t < 0 ? 0 : N(t) | 0);
  }
  a.allocUnsafe = function(t) {
    return E(t);
  }, a.allocUnsafeSlow = function(t) {
    return E(t);
  };
  function O(t, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !a.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var e = Y(t, r) | 0, n = d(e), o = n.write(t, r);
    return o !== e && (n = n.slice(0, o)), n;
  }
  function k(t) {
    for (var r = t.length < 0 ? 0 : N(t.length) | 0, e = d(r), n = 0; n < r; n += 1)
      e[n] = t[n] & 255;
    return e;
  }
  function Q(t) {
    if (z(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return G(r.buffer, r.byteOffset, r.byteLength);
    }
    return k(t);
  }
  function G(t, r, e) {
    if (r < 0 || t.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < r + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var n;
    return r === void 0 && e === void 0 ? n = new Uint8Array(t) : e === void 0 ? n = new Uint8Array(t, r) : n = new Uint8Array(t, r, e), Object.setPrototypeOf(n, a.prototype), n;
  }
  function pr(t) {
    if (a.isBuffer(t)) {
      var r = N(t.length) | 0, e = d(r);
      return e.length === 0 || t.copy(e, 0, 0, r), e;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || Fr(t.length) ? d(0) : k(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return k(t.data);
  }
  function N(t) {
    if (t >= g)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + g.toString(16) + " bytes");
    return t | 0;
  }
  function R(t) {
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
    for (var n = r.length, o = e.length, s = 0, l = Math.min(n, o); s < l; ++s)
      if (r[s] !== e[s]) {
        n = r[s], o = e[s];
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
    var o = a.allocUnsafe(e), s = 0;
    for (n = 0; n < r.length; ++n) {
      var l = r[n];
      if (z(l, Uint8Array))
        s + l.length > o.length ? a.from(l).copy(o, s) : Uint8Array.prototype.set.call(
          o,
          l,
          s
        );
      else if (a.isBuffer(l))
        l.copy(o, s);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      s += l.length;
    }
    return o;
  };
  function Y(t, r) {
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
          return Vr(t).length;
        default:
          if (o)
            return n ? -1 : cr(t).length;
          r = ("" + r).toLowerCase(), o = !0;
      }
  }
  a.byteLength = Y;
  function Z(t, r, e) {
    var n = !1;
    if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, r >>>= 0, e <= r))
      return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return Lr(this, r, e);
        case "utf8":
        case "utf-8":
          return rr(this, r, e);
        case "ascii":
          return Dr(this, r, e);
        case "latin1":
        case "binary":
          return Mr(this, r, e);
        case "base64":
          return K(this, r, e);
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
  function J(t, r, e) {
    var n = t[r];
    t[r] = t[e], t[e] = n;
  }
  a.prototype.swap16 = function() {
    var r = this.length;
    if (r % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var e = 0; e < r; e += 2)
      J(this, e, e + 1);
    return this;
  }, a.prototype.swap32 = function() {
    var r = this.length;
    if (r % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var e = 0; e < r; e += 4)
      J(this, e, e + 3), J(this, e + 1, e + 2);
    return this;
  }, a.prototype.swap64 = function() {
    var r = this.length;
    if (r % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var e = 0; e < r; e += 8)
      J(this, e, e + 7), J(this, e + 1, e + 6), J(this, e + 2, e + 5), J(this, e + 3, e + 4);
    return this;
  }, a.prototype.toString = function() {
    var r = this.length;
    return r === 0 ? "" : arguments.length === 0 ? rr(this, 0, r) : Z.apply(this, arguments);
  }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(r) {
    if (!a.isBuffer(r))
      throw new TypeError("Argument must be a Buffer");
    return this === r ? !0 : a.compare(this, r) === 0;
  }, a.prototype.inspect = function() {
    var r = "", e = u.INSPECT_MAX_BYTES;
    return r = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (r += " ... "), "<Buffer " + r + ">";
  }, y && (a.prototype[y] = a.prototype.inspect), a.prototype.compare = function(r, e, n, o, s) {
    if (z(r, Uint8Array) && (r = a.from(r, r.offset, r.byteLength)), !a.isBuffer(r))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof r
      );
    if (e === void 0 && (e = 0), n === void 0 && (n = r ? r.length : 0), o === void 0 && (o = 0), s === void 0 && (s = this.length), e < 0 || n > r.length || o < 0 || s > this.length)
      throw new RangeError("out of range index");
    if (o >= s && e >= n)
      return 0;
    if (o >= s)
      return -1;
    if (e >= n)
      return 1;
    if (e >>>= 0, n >>>= 0, o >>>= 0, s >>>= 0, this === r)
      return 0;
    for (var l = s - o, b = n - e, S = Math.min(l, b), C = this.slice(o, s), L = r.slice(e, n), A = 0; A < S; ++A)
      if (C[A] !== L[A]) {
        l = C[A], b = L[A];
        break;
      }
    return l < b ? -1 : b < l ? 1 : 0;
  };
  function kr(t, r, e, n, o) {
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
      return r.length === 0 ? -1 : Or(t, r, e, n, o);
    if (typeof r == "number")
      return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? o ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : Or(t, [r], e, n, o);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Or(t, r, e, n, o) {
    var s = 1, l = t.length, b = r.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || r.length < 2)
        return -1;
      s = 2, l /= 2, b /= 2, e /= 2;
    }
    function S(Rr, Sr) {
      return s === 1 ? Rr[Sr] : Rr.readUInt16BE(Sr * s);
    }
    var C;
    if (o) {
      var L = -1;
      for (C = e; C < l; C++)
        if (S(t, C) === S(r, L === -1 ? 0 : C - L)) {
          if (L === -1 && (L = C), C - L + 1 === b)
            return L * s;
        } else
          L !== -1 && (C -= C - L), L = -1;
    } else
      for (e + b > l && (e = l - b), C = e; C >= 0; C--) {
        for (var A = !0, wr = 0; wr < b; wr++)
          if (S(t, C + wr) !== S(r, wr)) {
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
    var s = r.length;
    n > s / 2 && (n = s / 2);
    for (var l = 0; l < n; ++l) {
      var b = parseInt(r.substr(l * 2, 2), 16);
      if (Fr(b))
        return l;
      t[e + l] = b;
    }
    return l;
  }
  function Nr(t, r, e, n) {
    return fr(cr(r, t.length - e), t, e, n);
  }
  function Xr(t, r, e, n) {
    return fr(Tr(r), t, e, n);
  }
  function Kr(t, r, e, n) {
    return fr(Vr(r), t, e, n);
  }
  function jr(t, r, e, n) {
    return fr(hr(r, t.length - e), t, e, n);
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
    var s = this.length - e;
    if ((n === void 0 || n > s) && (n = s), r.length > 0 && (n < 0 || e < 0) || e > this.length)
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
  function K(t, r, e) {
    return r === 0 && e === t.length ? c.fromByteArray(t) : c.fromByteArray(t.slice(r, e));
  }
  function rr(t, r, e) {
    e = Math.min(t.length, e);
    for (var n = [], o = r; o < e; ) {
      var s = t[o], l = null, b = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
      if (o + b <= e) {
        var S, C, L, A;
        switch (b) {
          case 1:
            s < 128 && (l = s);
            break;
          case 2:
            S = t[o + 1], (S & 192) === 128 && (A = (s & 31) << 6 | S & 63, A > 127 && (l = A));
            break;
          case 3:
            S = t[o + 1], C = t[o + 2], (S & 192) === 128 && (C & 192) === 128 && (A = (s & 15) << 12 | (S & 63) << 6 | C & 63, A > 2047 && (A < 55296 || A > 57343) && (l = A));
            break;
          case 4:
            S = t[o + 1], C = t[o + 2], L = t[o + 3], (S & 192) === 128 && (C & 192) === 128 && (L & 192) === 128 && (A = (s & 15) << 18 | (S & 63) << 12 | (C & 63) << 6 | L & 63, A > 65535 && A < 1114112 && (l = A));
        }
      }
      l === null ? (l = 65533, b = 1) : l > 65535 && (l -= 65536, n.push(l >>> 10 & 1023 | 55296), l = 56320 | l & 1023), n.push(l), o += b;
    }
    return Pr(n);
  }
  var ur = 4096;
  function Pr(t) {
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
  function Dr(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var o = r; o < e; ++o)
      n += String.fromCharCode(t[o] & 127);
    return n;
  }
  function Mr(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var o = r; o < e; ++o)
      n += String.fromCharCode(t[o]);
    return n;
  }
  function Lr(t, r, e) {
    var n = t.length;
    (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
    for (var o = "", s = r; s < e; ++s)
      o += dr[t[s]];
    return o;
  }
  function Wr(t, r, e) {
    for (var n = t.slice(r, e), o = "", s = 0; s < n.length - 1; s += 2)
      o += String.fromCharCode(n[s] + n[s + 1] * 256);
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
    for (var o = this[r], s = 1, l = 0; ++l < e && (s *= 256); )
      o += this[r + l] * s;
    return o;
  }, a.prototype.readUintBE = a.prototype.readUIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || j(r, e, this.length);
    for (var o = this[r + --e], s = 1; e > 0 && (s *= 256); )
      o += this[r + --e] * s;
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
    for (var o = this[r], s = 1, l = 0; ++l < e && (s *= 256); )
      o += this[r + l] * s;
    return s *= 128, o >= s && (o -= Math.pow(2, 8 * e)), o;
  }, a.prototype.readIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || j(r, e, this.length);
    for (var o = e, s = 1, l = this[r + --o]; o > 0 && (s *= 256); )
      l += this[r + --o] * s;
    return s *= 128, l >= s && (l -= Math.pow(2, 8 * e)), l;
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
    return r = r >>> 0, e || j(r, 4, this.length), p.read(this, r, !0, 23, 4);
  }, a.prototype.readFloatBE = function(r, e) {
    return r = r >>> 0, e || j(r, 4, this.length), p.read(this, r, !1, 23, 4);
  }, a.prototype.readDoubleLE = function(r, e) {
    return r = r >>> 0, e || j(r, 8, this.length), p.read(this, r, !0, 52, 8);
  }, a.prototype.readDoubleBE = function(r, e) {
    return r = r >>> 0, e || j(r, 8, this.length), p.read(this, r, !1, 52, 8);
  };
  function W(t, r, e, n, o, s) {
    if (!a.isBuffer(t))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (r > o || r < s)
      throw new RangeError('"value" argument is out of bounds');
    if (e + n > t.length)
      throw new RangeError("Index out of range");
  }
  a.prototype.writeUintLE = a.prototype.writeUIntLE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !o) {
      var s = Math.pow(2, 8 * n) - 1;
      W(this, r, e, n, s, 0);
    }
    var l = 1, b = 0;
    for (this[e] = r & 255; ++b < n && (l *= 256); )
      this[e + b] = r / l & 255;
    return e + n;
  }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !o) {
      var s = Math.pow(2, 8 * n) - 1;
      W(this, r, e, n, s, 0);
    }
    var l = n - 1, b = 1;
    for (this[e + l] = r & 255; --l >= 0 && (b *= 256); )
      this[e + l] = r / b & 255;
    return e + n;
  }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(r, e, n) {
    return r = +r, e = e >>> 0, n || W(this, r, e, 1, 255, 0), this[e] = r & 255, e + 1;
  }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || W(this, r, e, 2, 65535, 0), this[e] = r & 255, this[e + 1] = r >>> 8, e + 2;
  }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || W(this, r, e, 2, 65535, 0), this[e] = r >>> 8, this[e + 1] = r & 255, e + 2;
  }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || W(this, r, e, 4, 4294967295, 0), this[e + 3] = r >>> 24, this[e + 2] = r >>> 16, this[e + 1] = r >>> 8, this[e] = r & 255, e + 4;
  }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || W(this, r, e, 4, 4294967295, 0), this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255, e + 4;
  }, a.prototype.writeIntLE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var s = Math.pow(2, 8 * n - 1);
      W(this, r, e, n, s - 1, -s);
    }
    var l = 0, b = 1, S = 0;
    for (this[e] = r & 255; ++l < n && (b *= 256); )
      r < 0 && S === 0 && this[e + l - 1] !== 0 && (S = 1), this[e + l] = (r / b >> 0) - S & 255;
    return e + n;
  }, a.prototype.writeIntBE = function(r, e, n, o) {
    if (r = +r, e = e >>> 0, !o) {
      var s = Math.pow(2, 8 * n - 1);
      W(this, r, e, n, s - 1, -s);
    }
    var l = n - 1, b = 1, S = 0;
    for (this[e + l] = r & 255; --l >= 0 && (b *= 256); )
      r < 0 && S === 0 && this[e + l + 1] !== 0 && (S = 1), this[e + l] = (r / b >> 0) - S & 255;
    return e + n;
  }, a.prototype.writeInt8 = function(r, e, n) {
    return r = +r, e = e >>> 0, n || W(this, r, e, 1, 127, -128), r < 0 && (r = 255 + r + 1), this[e] = r & 255, e + 1;
  }, a.prototype.writeInt16LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || W(this, r, e, 2, 32767, -32768), this[e] = r & 255, this[e + 1] = r >>> 8, e + 2;
  }, a.prototype.writeInt16BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || W(this, r, e, 2, 32767, -32768), this[e] = r >>> 8, this[e + 1] = r & 255, e + 2;
  }, a.prototype.writeInt32LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || W(this, r, e, 4, 2147483647, -2147483648), this[e] = r & 255, this[e + 1] = r >>> 8, this[e + 2] = r >>> 16, this[e + 3] = r >>> 24, e + 4;
  }, a.prototype.writeInt32BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || W(this, r, e, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255, e + 4;
  };
  function Er(t, r, e, n, o, s) {
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
    var s = o - n;
    return this === r && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(e, n, o) : Uint8Array.prototype.set.call(
      r,
      this.subarray(n, o),
      e
    ), s;
  }, a.prototype.fill = function(r, e, n, o) {
    if (typeof r == "string") {
      if (typeof e == "string" ? (o = e, e = 0, n = this.length) : typeof n == "string" && (o = n, n = this.length), o !== void 0 && typeof o != "string")
        throw new TypeError("encoding must be a string");
      if (typeof o == "string" && !a.isEncoding(o))
        throw new TypeError("Unknown encoding: " + o);
      if (r.length === 1) {
        var s = r.charCodeAt(0);
        (o === "utf8" && s < 128 || o === "latin1") && (r = s);
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
      var b = a.isBuffer(r) ? r : a.from(r, o), S = b.length;
      if (S === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (l = 0; l < n - e; ++l)
        this[l + e] = b[l % S];
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
    for (var e, n = t.length, o = null, s = [], l = 0; l < n; ++l) {
      if (e = t.charCodeAt(l), e > 55295 && e < 57344) {
        if (!o) {
          if (e > 56319) {
            (r -= 3) > -1 && s.push(239, 191, 189);
            continue;
          } else if (l + 1 === n) {
            (r -= 3) > -1 && s.push(239, 191, 189);
            continue;
          }
          o = e;
          continue;
        }
        if (e < 56320) {
          (r -= 3) > -1 && s.push(239, 191, 189), o = e;
          continue;
        }
        e = (o - 55296 << 10 | e - 56320) + 65536;
      } else
        o && (r -= 3) > -1 && s.push(239, 191, 189);
      if (o = null, e < 128) {
        if ((r -= 1) < 0)
          break;
        s.push(e);
      } else if (e < 2048) {
        if ((r -= 2) < 0)
          break;
        s.push(
          e >> 6 | 192,
          e & 63 | 128
        );
      } else if (e < 65536) {
        if ((r -= 3) < 0)
          break;
        s.push(
          e >> 12 | 224,
          e >> 6 & 63 | 128,
          e & 63 | 128
        );
      } else if (e < 1114112) {
        if ((r -= 4) < 0)
          break;
        s.push(
          e >> 18 | 240,
          e >> 12 & 63 | 128,
          e >> 6 & 63 | 128,
          e & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return s;
  }
  function Tr(t) {
    for (var r = [], e = 0; e < t.length; ++e)
      r.push(t.charCodeAt(e) & 255);
    return r;
  }
  function hr(t, r) {
    for (var e, n, o, s = [], l = 0; l < t.length && !((r -= 2) < 0); ++l)
      e = t.charCodeAt(l), n = e >> 8, o = e % 256, s.push(o), s.push(n);
    return s;
  }
  function Vr(t) {
    return c.toByteArray(br(t));
  }
  function fr(t, r, e, n) {
    for (var o = 0; o < n && !(o + e >= r.length || o >= t.length); ++o)
      r[o + e] = t[o];
    return o;
  }
  function z(t, r) {
    return t instanceof r || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === r.name;
  }
  function Fr(t) {
    return t !== t;
  }
  var dr = function() {
    for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
      for (var n = e * 16, o = 0; o < 16; ++o)
        r[n + o] = t[e] + t[o];
    return r;
  }();
})($e);
var Gr = {}, Qe = {
  get exports() {
    return Gr;
  },
  set exports(u) {
    Gr = u;
  }
}, D = Qe.exports = {}, er, tr;
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
function xe(u) {
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
function Ze(u) {
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
var or = [], xr = !1, lr, qr = -1;
function rt() {
  !xr || !lr || (xr = !1, lr.length ? or = lr.concat(or) : qr = -1, or.length && Ee());
}
function Ee() {
  if (!xr) {
    var u = xe(rt);
    xr = !0;
    for (var c = or.length; c; ) {
      for (lr = or, or = []; ++qr < c; )
        lr && lr[qr].run();
      qr = -1, c = or.length;
    }
    lr = null, xr = !1, Ze(u);
  }
}
D.nextTick = function(u) {
  var c = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var p = 1; p < arguments.length; p++)
      c[p - 1] = arguments[p];
  or.push(new _e(u, c)), or.length === 1 && !xr && xe(Ee);
};
function _e(u, c) {
  this.fun = u, this.array = c;
}
_e.prototype.run = function() {
  this.fun.apply(null, this.array);
};
D.title = "browser";
D.browser = !0;
D.env = {};
D.argv = [];
D.version = "";
D.versions = {};
function ar() {
}
D.on = ar;
D.addListener = ar;
D.once = ar;
D.off = ar;
D.removeListener = ar;
D.removeAllListeners = ar;
D.emit = ar;
D.prependListener = ar;
D.prependOnceListener = ar;
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
  function c() {
    var y = this || self;
    return delete u.prototype.__magic__, y;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return c();
  u.defineProperty(u.prototype, "__magic__", {
    configurable: !0,
    get: c
  });
  var p = __magic__;
  return p;
})(Object);
var Ur = {}, et = {
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
function tt() {
  if (we)
    return Ar;
  we = 1;
  var u = U, c = Symbol.for("react.element"), p = Symbol.for("react.fragment"), y = Object.prototype.hasOwnProperty, g = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, h = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(a, v, B) {
    var x, E = {}, O = null, k = null;
    B !== void 0 && (O = "" + B), v.key !== void 0 && (O = "" + v.key), v.ref !== void 0 && (k = v.ref);
    for (x in v)
      y.call(v, x) && !h.hasOwnProperty(x) && (E[x] = v[x]);
    if (a && a.defaultProps)
      for (x in v = a.defaultProps, v)
        E[x] === void 0 && (E[x] = v[x]);
    return { $$typeof: c, type: a, key: O, ref: k, props: E, _owner: g.current };
  }
  return Ar.Fragment = p, Ar.jsx = d, Ar.jsxs = d, Ar;
}
var Cr = {}, ye;
function nt() {
  return ye || (ye = 1, Gr.env.NODE_ENV !== "production" && function() {
    var u = U, c = Symbol.for("react.element"), p = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), h = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), a = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), x = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), Q = Symbol.iterator, G = "@@iterator";
    function pr(i) {
      if (i === null || typeof i != "object")
        return null;
      var f = Q && i[Q] || i[G];
      return typeof f == "function" ? f : null;
    }
    var N = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function R(i) {
      {
        for (var f = arguments.length, w = new Array(f > 1 ? f - 1 : 0), m = 1; m < f; m++)
          w[m - 1] = arguments[m];
        Y("error", i, w);
      }
    }
    function Y(i, f, w) {
      {
        var m = N.ReactDebugCurrentFrame, F = m.getStackAddendum();
        F !== "" && (f += "%s", w = w.concat([F]));
        var I = w.map(function(T) {
          return String(T);
        });
        I.unshift("Warning: " + f), Function.prototype.apply.call(console[i], console, I);
      }
    }
    var Z = !1, J = !1, kr = !1, Or = !1, Hr = !1, Nr;
    Nr = Symbol.for("react.module.reference");
    function Xr(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === y || i === h || Hr || i === g || i === B || i === x || Or || i === k || Z || J || kr || typeof i == "object" && i !== null && (i.$$typeof === O || i.$$typeof === E || i.$$typeof === d || i.$$typeof === a || i.$$typeof === v || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === Nr || i.getModuleId !== void 0));
    }
    function Kr(i, f, w) {
      var m = i.displayName;
      if (m)
        return m;
      var F = f.displayName || f.name || "";
      return F !== "" ? w + "(" + F + ")" : w;
    }
    function jr(i) {
      return i.displayName || "Context";
    }
    function K(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && R("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
        return i.displayName || i.name || null;
      if (typeof i == "string")
        return i;
      switch (i) {
        case y:
          return "Fragment";
        case p:
          return "Portal";
        case h:
          return "Profiler";
        case g:
          return "StrictMode";
        case B:
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
            var w = i;
            return jr(w._context) + ".Provider";
          case v:
            return Kr(i, i.render, "ForwardRef");
          case E:
            var m = i.displayName || null;
            return m !== null ? m : K(i.type) || "Memo";
          case O: {
            var F = i, I = F._payload, T = F._init;
            try {
              return K(T(I));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var rr = Object.assign, ur = 0, Pr, Dr, Mr, Lr, Wr, j, W;
    function Er() {
    }
    Er.__reactDisabledLog = !0;
    function Yr() {
      {
        if (ur === 0) {
          Pr = console.log, Dr = console.info, Mr = console.warn, Lr = console.error, Wr = console.group, j = console.groupCollapsed, W = console.groupEnd;
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
    function $r() {
      {
        if (ur--, ur === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: rr({}, i, {
              value: Pr
            }),
            info: rr({}, i, {
              value: Dr
            }),
            warn: rr({}, i, {
              value: Mr
            }),
            error: rr({}, i, {
              value: Lr
            }),
            group: rr({}, i, {
              value: Wr
            }),
            groupCollapsed: rr({}, i, {
              value: j
            }),
            groupEnd: rr({}, i, {
              value: W
            })
          });
        }
        ur < 0 && R("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var _r = N.ReactCurrentDispatcher, br;
    function cr(i, f, w) {
      {
        if (br === void 0)
          try {
            throw Error();
          } catch (F) {
            var m = F.stack.trim().match(/\n( *(at )?)/);
            br = m && m[1] || "";
          }
        return `
` + br + i;
      }
    }
    var Tr = !1, hr;
    {
      var Vr = typeof WeakMap == "function" ? WeakMap : Map;
      hr = new Vr();
    }
    function fr(i, f) {
      if (!i || Tr)
        return "";
      {
        var w = hr.get(i);
        if (w !== void 0)
          return w;
      }
      var m;
      Tr = !0;
      var F = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var I;
      I = _r.current, _r.current = null, Yr();
      try {
        if (f) {
          var T = function() {
            throw Error();
          };
          if (Object.defineProperty(T.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(T, []);
            } catch (ir) {
              m = ir;
            }
            Reflect.construct(i, [], T);
          } else {
            try {
              T.call();
            } catch (ir) {
              m = ir;
            }
            i.call(T.prototype);
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
          for (var _ = ir.stack.split(`
`), $ = m.stack.split(`
`), P = _.length - 1, M = $.length - 1; P >= 1 && M >= 0 && _[P] !== $[M]; )
            M--;
          for (; P >= 1 && M >= 0; P--, M--)
            if (_[P] !== $[M]) {
              if (P !== 1 || M !== 1)
                do
                  if (P--, M--, M < 0 || _[P] !== $[M]) {
                    var H = `
` + _[P].replace(" at new ", " at ");
                    return i.displayName && H.includes("<anonymous>") && (H = H.replace("<anonymous>", i.displayName)), typeof i == "function" && hr.set(i, H), H;
                  }
                while (P >= 1 && M >= 0);
              break;
            }
        }
      } finally {
        Tr = !1, _r.current = I, $r(), Error.prepareStackTrace = F;
      }
      var gr = i ? i.displayName || i.name : "", de = gr ? cr(gr) : "";
      return typeof i == "function" && hr.set(i, de), de;
    }
    function z(i, f, w) {
      return fr(i, !1);
    }
    function Fr(i) {
      var f = i.prototype;
      return !!(f && f.isReactComponent);
    }
    function dr(i, f, w) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return fr(i, Fr(i));
      if (typeof i == "string")
        return cr(i);
      switch (i) {
        case B:
          return cr("Suspense");
        case x:
          return cr("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case v:
            return z(i.render);
          case E:
            return dr(i.type, f, w);
          case O: {
            var m = i, F = m._payload, I = m._init;
            try {
              return dr(I(F), f, w);
            } catch {
            }
          }
        }
      return "";
    }
    var t = Object.prototype.hasOwnProperty, r = {}, e = N.ReactDebugCurrentFrame;
    function n(i) {
      if (i) {
        var f = i._owner, w = dr(i.type, i._source, f ? f.type : null);
        e.setExtraStackFrame(w);
      } else
        e.setExtraStackFrame(null);
    }
    function o(i, f, w, m, F) {
      {
        var I = Function.call.bind(t);
        for (var T in i)
          if (I(i, T)) {
            var _ = void 0;
            try {
              if (typeof i[T] != "function") {
                var $ = Error((m || "React class") + ": " + w + " type `" + T + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[T] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $.name = "Invariant Violation", $;
              }
              _ = i[T](f, T, m, w, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (P) {
              _ = P;
            }
            _ && !(_ instanceof Error) && (n(F), R("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", w, T, typeof _), n(null)), _ instanceof Error && !(_.message in r) && (r[_.message] = !0, n(F), R("Failed %s type: %s", w, _.message), n(null));
          }
      }
    }
    var s = Array.isArray;
    function l(i) {
      return s(i);
    }
    function b(i) {
      {
        var f = typeof Symbol == "function" && Symbol.toStringTag, w = f && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return w;
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
    function L(i) {
      if (S(i))
        return R("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", b(i)), C(i);
    }
    var A = N.ReactCurrentOwner, wr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Rr, Sr, Qr;
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
    function Se(i, f) {
      if (typeof i.ref == "string" && A.current && f && A.current.stateNode !== f) {
        var w = K(A.current.type);
        Qr[w] || (R('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', K(A.current.type), i.ref), Qr[w] = !0);
      }
    }
    function Ae(i, f) {
      {
        var w = function() {
          Rr || (Rr = !0, R("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        w.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: w,
          configurable: !0
        });
      }
    }
    function Ce(i, f) {
      {
        var w = function() {
          Sr || (Sr = !0, R("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", f));
        };
        w.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: w,
          configurable: !0
        });
      }
    }
    var Ie = function(i, f, w, m, F, I, T) {
      var _ = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: c,
        // Built-in properties that belong on the element
        type: i,
        key: f,
        ref: w,
        props: T,
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
        value: F
      }), Object.freeze && (Object.freeze(_.props), Object.freeze(_)), _;
    };
    function Be(i, f, w, m, F) {
      {
        var I, T = {}, _ = null, $ = null;
        w !== void 0 && (L(w), _ = "" + w), Re(f) && (L(f.key), _ = "" + f.key), Fe(f) && ($ = f.ref, Se(f, F));
        for (I in f)
          t.call(f, I) && !wr.hasOwnProperty(I) && (T[I] = f[I]);
        if (i && i.defaultProps) {
          var P = i.defaultProps;
          for (I in P)
            T[I] === void 0 && (T[I] = P[I]);
        }
        if (_ || $) {
          var M = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          _ && Ae(T, M), $ && Ce(T, M);
        }
        return Ie(i, _, $, F, m, A.current, T);
      }
    }
    var Zr = N.ReactCurrentOwner, ce = N.ReactDebugCurrentFrame;
    function yr(i) {
      if (i) {
        var f = i._owner, w = dr(i.type, i._source, f ? f.type : null);
        ce.setExtraStackFrame(w);
      } else
        ce.setExtraStackFrame(null);
    }
    var re;
    re = !1;
    function ee(i) {
      return typeof i == "object" && i !== null && i.$$typeof === c;
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
    function Ue(i) {
      {
        if (i !== void 0) {
          var f = i.fileName.replace(/^.*[\\\/]/, ""), w = i.lineNumber;
          return `

Check your code at ` + f + ":" + w + ".";
        }
        return "";
      }
    }
    var fe = {};
    function ke(i) {
      {
        var f = se();
        if (!f) {
          var w = typeof i == "string" ? i : i.displayName || i.name;
          w && (f = `

Check the top-level render call using <` + w + ">.");
        }
        return f;
      }
    }
    function le(i, f) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var w = ke(f);
        if (fe[w])
          return;
        fe[w] = !0;
        var m = "";
        i && i._owner && i._owner !== Zr.current && (m = " It was passed a child from " + K(i._owner.type) + "."), yr(i), R('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', w, m), yr(null);
      }
    }
    function pe(i, f) {
      {
        if (typeof i != "object")
          return;
        if (l(i))
          for (var w = 0; w < i.length; w++) {
            var m = i[w];
            ee(m) && le(m, f);
          }
        else if (ee(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var F = pr(i);
          if (typeof F == "function" && F !== i.entries)
            for (var I = F.call(i), T; !(T = I.next()).done; )
              ee(T.value) && le(T.value, f);
        }
      }
    }
    function Oe(i) {
      {
        var f = i.type;
        if (f == null || typeof f == "string")
          return;
        var w;
        if (typeof f == "function")
          w = f.propTypes;
        else if (typeof f == "object" && (f.$$typeof === v || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        f.$$typeof === E))
          w = f.propTypes;
        else
          return;
        if (w) {
          var m = K(f);
          o(w, i.props, "prop", m, i);
        } else if (f.PropTypes !== void 0 && !re) {
          re = !0;
          var F = K(f);
          R("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", F || "Unknown");
        }
        typeof f.getDefaultProps == "function" && !f.getDefaultProps.isReactClassApproved && R("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ne(i) {
      {
        for (var f = Object.keys(i.props), w = 0; w < f.length; w++) {
          var m = f[w];
          if (m !== "children" && m !== "key") {
            yr(i), R("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), yr(null);
            break;
          }
        }
        i.ref !== null && (yr(i), R("Invalid attribute `ref` supplied to `React.Fragment`."), yr(null));
      }
    }
    function he(i, f, w, m, F, I) {
      {
        var T = Xr(i);
        if (!T) {
          var _ = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (_ += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var $ = Ue(F);
          $ ? _ += $ : _ += se();
          var P;
          i === null ? P = "null" : l(i) ? P = "array" : i !== void 0 && i.$$typeof === c ? (P = "<" + (K(i.type) || "Unknown") + " />", _ = " Did you accidentally export a JSX literal instead of a component?") : P = typeof i, R("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", P, _);
        }
        var M = Be(i, f, w, F, I);
        if (M == null)
          return M;
        if (T) {
          var H = f.children;
          if (H !== void 0)
            if (m)
              if (l(H)) {
                for (var gr = 0; gr < H.length; gr++)
                  pe(H[gr], i);
                Object.freeze && Object.freeze(H);
              } else
                R("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              pe(H, i);
        }
        return i === y ? Ne(M) : Oe(M), M;
      }
    }
    function je(i, f, w) {
      return he(i, f, w, !0);
    }
    function Pe(i, f, w) {
      return he(i, f, w, !1);
    }
    var De = Pe, Me = je;
    Cr.Fragment = y, Cr.jsx = De, Cr.jsxs = Me;
  }()), Cr;
}
(function(u) {
  Gr.env.NODE_ENV === "production" ? u.exports = tt() : u.exports = nt();
})(et);
const it = Ur.Fragment, q = Ur.jsx, Br = Ur.jsxs;
var ae = {}, ot = {
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
    var c = {}.hasOwnProperty;
    function p() {
      for (var y = [], g = 0; g < arguments.length; g++) {
        var h = arguments[g];
        if (h) {
          var d = typeof h;
          if (d === "string" || d === "number")
            y.push(h);
          else if (Array.isArray(h)) {
            if (h.length) {
              var a = p.apply(null, h);
              a && y.push(a);
            }
          } else if (d === "object") {
            if (h.toString !== Object.prototype.toString && !h.toString.toString().includes("[native code]")) {
              y.push(h.toString());
              continue;
            }
            for (var v in h)
              c.call(h, v) && h[v] && y.push(v);
          }
        }
      }
      return y.join(" ");
    }
    u.exports ? (p.default = p, u.exports = p) : window.classNames = p;
  })();
})(ot);
const mr = ae, zr = U.createContext(null);
function Tt({
  children: u
}) {
  const [c, p] = U.useState(), y = U.useCallback(
    (h, d) => p((a) => ({ ...a || {}, [h]: d })),
    []
  ), g = U.useMemo(
    () => ({
      widgetState: c || null,
      setWidgetState: y
    }),
    [c, y]
  );
  return /* @__PURE__ */ q(zr.Provider, { value: g, children: u });
}
const at = "_ring_7tcsj_47", ut = "_popupButton__container_7tcsj_5", ct = "_popupButton_7tcsj_5", st = "_icon_7tcsj_23", ft = "_inactiveIcon_7tcsj_31", lt = "_activeIcon_7tcsj_35", pt = "_notif_7tcsj_39", ht = "_pinging_7tcsj_43", dt = "_ping_7tcsj_43", V = {
  ring: at,
  popupButton__container: ut,
  "popupButton__container--open": "_popupButton__container--open_7tcsj_9",
  popupButton: ct,
  icon: st,
  inactiveIcon: ft,
  activeIcon: lt,
  notif: pt,
  pinging: ht,
  ping: dt
};
function be() {
  try {
    const u = typeof localStorage < "u" && localStorage.getItem("clickedNfts") || "";
    return u ? JSON.parse(u) : [];
  } catch {
    return [];
  }
}
function wt(u) {
  try {
    const p = [...be(), u];
    typeof localStorage < "u" && localStorage.setItem("clickedNfts", JSON.stringify(p));
  } catch {
    return null;
  }
}
function yt({
  notiVal: u,
  showNoti: c,
  isOpen: p,
  clickHandler: y
}) {
  const g = be(), h = U.useContext(zr), d = h == null ? void 0 : h.widgetState, a = d == null ? void 0 : d.foundNft, v = a && JSON.parse(a).itemId, B = !p && (a ? !g.includes(a) && Boolean(v) : !1), [x, E] = U.useState(B);
  return U.useEffect(() => {
    B && E(!0);
  }, [B]), /* @__PURE__ */ Br(
    "div",
    {
      className: mr(V.popupButton__container, {
        [V["popupButton__container--open"]]: p
      }),
      children: [
        /* @__PURE__ */ q(
          "span",
          {
            className: x ? V.ring : void 0,
            style: { boxShadow: "none" }
          }
        ),
        /* @__PURE__ */ Br(
          "button",
          {
            className: V.popupButton,
            type: "button",
            onClick: (O) => {
              E(!1), a && wt(a), y(O);
            },
            children: [
              /* @__PURE__ */ q(
                "div",
                {
                  className: mr(V.icon, {
                    [V.activeIcon]: !p,
                    [V.inactiveIcon]: p
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
                  className: mr(V.icon, {
                    [V.activeIcon]: p,
                    [V.inactiveIcon]: !p
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
        c && /* @__PURE__ */ Br(it, { children: [
          /* @__PURE__ */ q("span", { className: mr(V.notif, V.pinging) }),
          /* @__PURE__ */ q("span", { className: V.notif, children: u })
        ] })
      ]
    }
  );
}
const gt = "_ring_q714d_1", Ir = {
  ring: gt,
  "wallet-chat-widget": "_wallet-chat-widget_q714d_23",
  "widget-is-open": "_widget-is-open_q714d_9",
  "widget-is-closed": "_widget-is-closed_q714d_13",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_q714d_23",
  "wallet-chat-widget__container--open": "_wallet-chat-widget__container--open_q714d_27"
}, vt = "http://localhost:5173", Te = Ir["wallet-chat-widget"];
function sr(u) {
  var p;
  if (typeof document > "u")
    return;
  const c = document == null ? void 0 : document.getElementById(Te);
  (p = c == null ? void 0 : c.contentWindow) == null || p.postMessage(u, "*");
}
function ge(u) {
  sr({ target: "sign_in", data: u || null });
}
function Ft({
  connectedWallet: u,
  signer: c
}) {
  const p = U.useRef(""), y = U.useRef(null), g = U.useRef(!1), h = U.useRef(u), d = U.useRef(!1), a = U.useContext(zr), { widgetState: v, setWidgetState: B } = a || {}, { ownerAddress: x } = v || {}, [E, O] = U.useState(d.current), [k, Q] = U.useState(0), G = Boolean(c), pr = () => {
    O((N) => {
      const R = Boolean(N);
      return sr({ target: "widget_open", data: !R }), y.current && !R && sr({
        target: "nft_info",
        data: { ...y.current, redirect: !0 }
      }), y.current = null, d.current = !R, !R;
    });
  };
  return U.useEffect(() => {
    (E || G) && !g.current && ge(u && { ...u, requestSignature: G });
  }, [u, E, G]), U.useEffect(() => {
    if (!(x != null && x.address))
      return;
    const N = x.address, R = ne(window.location.href);
    R.network && (y.current = {
      ...R,
      ownerAddress: N
    }), y.current ? sr({
      target: "nft_info",
      data: { ...y.current, redirect: !0 }
    }) : sr({ target: "nft_info", data: { ownerAddress: N } }), O(!0);
  }, [x]), U.useEffect(() => {
    const N = () => {
      if (window.location.href === p.current)
        return;
      p.current = window.location.href;
      const Z = ne(window.location.href);
      B && B("foundNft", JSON.stringify(Z)), Z.network && (y.current = Z), sr({ target: "nft_info", data: Z });
    }, R = new MutationObserver(N), Y = { subtree: !0, childList: !0 };
    return N(), R.observe(document, Y), () => R.disconnect();
  }, []), U.useEffect(() => {
    h.current = u;
  }, [u]), U.useEffect(() => {
    const N = (R) => {
      const { data: Y } = R;
      if (Y.target === "unread_cnt" && Q(Y.data), Y.target === "nonce" && c && h.current) {
        const Z = ve(
          h.current.account,
          h.current.chainId,
          Y.data
        );
        c.signMessage(Z).then(
          (J) => J && sr({ target: "signed_message", data: J })
        );
      }
      Y.closeWidget && pr(), Y.target === "sign_in" && (Y.data ? g.current = Y.true : Y.data === null && (g.current = !1, ge(
        h.current && {
          ...h.current,
          requestSignature: G
        }
      ))), d.current && sr({ target: "widget_open", data: !0 });
    };
    return window.addEventListener("message", N), () => window.removeEventListener("message", N);
  }, [c]), /* @__PURE__ */ Br(
    "div",
    {
      className: mr(Ir["wallet-chat-widget__container"], {
        [Ir["wallet-chat-widget__container--open"]]: E
      }),
      children: [
        /* @__PURE__ */ q(
          "iframe",
          {
            title: "WalletChat",
            name: "WalletChat",
            id: Te,
            className: mr("", {
              [Ir["widget-is-open"]]: E,
              [Ir["widget-is-closed"]]: !E
            }),
            src: vt
          }
        ),
        /* @__PURE__ */ q(
          yt,
          {
            notiVal: k,
            showNoti: k > 0,
            isOpen: E,
            clickHandler: pr
          }
        )
      ]
    }
  );
}
const mt = ({
  onClick: u,
  children: c
}) => /* @__PURE__ */ q("button", { type: "button", onClick: u, children: c }), Rt = ({
  ownerAddress: u,
  render: c
}) => {
  const p = U.useContext(zr), y = p == null ? void 0 : p.setWidgetState, g = c ? ({ onClick: h, children: d }) => U.cloneElement(c, { onClick: h }, d) : mt;
  return p ? /* @__PURE__ */ Br(
    g,
    {
      onClick: () => y && y("ownerAddress", {
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
  Rt as ChatWithOwner,
  Tt as WalletChatProvider,
  Ft as WalletChatWidget,
  bt as types,
  _t as utils
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._ring_7tcsj_47{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._popupButton__container_7tcsj_5{position:relative;margin-top:.75rem;height:4rem;--tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / .15));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:margin-top,transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}._popupButton__container--open_7tcsj_9{right:1.5rem;margin-top:-4rem;--tw-translate-y: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._popupButton__container--open_7tcsj_9{right:0px;margin-top:.75rem;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._popupButton_7tcsj_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}._icon_7tcsj_23{transition-property:transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_7tcsj_23 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_7tcsj_31{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_7tcsj_35{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_7tcsj_39{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(219 39 119 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}._pinging_7tcsj_43{animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite}._ring_7tcsj_47{position:fixed;right:0px;display:inline-flex;height:4rem;width:4rem}@keyframes _ping_7tcsj_43{75%,to{transform:scale(2);opacity:0}}._ring_7tcsj_47{animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity));opacity:.75}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._ring_q714d_1{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}#_wallet-chat-widget_q714d_23{transition-property:width,min-width,height,min-height;transition-duration:.25s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(4px 4px 8px rgba(0,0,0,.5));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._widget-is-open_q714d_9{height:75vh;min-height:440px;width:calc(100vw - 2rem);--tw-translate-x: -1rem;--tw-translate-y: -.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._widget-is-open_q714d_9{height:65vh;width:15vw;min-width:440px;--tw-translate-x: 0px;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._widget-is-closed_q714d_13{height:0px;min-height:0px;width:0px;min-width:0px}._wallet-chat-widget__container_q714d_23{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;-moz-user-select:none;user-select:none}._wallet-chat-widget__container--open_q714d_27{bottom:0px;right:0px}@media (min-width: 640px){._wallet-chat-widget__container--open_q714d_27{bottom:.5rem;right:1.5rem}}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
