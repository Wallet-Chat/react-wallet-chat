import jt from "react";
function ln(e) {
  const r = e.replace("https://", "").replace("http://", "").split("/"), i = r.length, f = r[i - 1].split("?")[0], o = r[i - 2];
  if (e.startsWith("looksrare.org"))
    return { itemId: f, contractAddress: o, network: "ethereum" };
  const u = r[i - 3];
  return i >= 5 ? { itemId: f, contractAddress: o, network: u } : e.startsWith("x2y2.io") && u === "eth" ? { itemId: f, contractAddress: o, network: "ethereum" } : { contractAddress: null, itemId: null, network: null };
}
const s0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseNftFromUrl: ln
}, Symbol.toStringTag, { value: "Module" })), f0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var In = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Sn = {}, Ci = {};
Ci.byteLength = Hs;
Ci.toByteArray = Js;
Ci.fromByteArray = Ws;
var Vr = [], Cr = [], Gs = typeof Uint8Array < "u" ? Uint8Array : Array, Ji = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var De = 0, zs = Ji.length; De < zs; ++De)
  Vr[De] = Ji[De], Cr[Ji.charCodeAt(De)] = De;
Cr["-".charCodeAt(0)] = 62;
Cr["_".charCodeAt(0)] = 63;
function Fo(e) {
  var t = e.length;
  if (t % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = e.indexOf("=");
  r === -1 && (r = t);
  var i = r === t ? 0 : 4 - r % 4;
  return [r, i];
}
function Hs(e) {
  var t = Fo(e), r = t[0], i = t[1];
  return (r + i) * 3 / 4 - i;
}
function Ks(e, t, r) {
  return (t + r) * 3 / 4 - r;
}
function Js(e) {
  var t, r = Fo(e), i = r[0], f = r[1], o = new Gs(Ks(e, i, f)), u = 0, l = f > 0 ? i - 4 : i, x;
  for (x = 0; x < l; x += 4)
    t = Cr[e.charCodeAt(x)] << 18 | Cr[e.charCodeAt(x + 1)] << 12 | Cr[e.charCodeAt(x + 2)] << 6 | Cr[e.charCodeAt(x + 3)], o[u++] = t >> 16 & 255, o[u++] = t >> 8 & 255, o[u++] = t & 255;
  return f === 2 && (t = Cr[e.charCodeAt(x)] << 2 | Cr[e.charCodeAt(x + 1)] >> 4, o[u++] = t & 255), f === 1 && (t = Cr[e.charCodeAt(x)] << 10 | Cr[e.charCodeAt(x + 1)] << 4 | Cr[e.charCodeAt(x + 2)] >> 2, o[u++] = t >> 8 & 255, o[u++] = t & 255), o;
}
function Ys(e) {
  return Vr[e >> 18 & 63] + Vr[e >> 12 & 63] + Vr[e >> 6 & 63] + Vr[e & 63];
}
function Qs(e, t, r) {
  for (var i, f = [], o = t; o < r; o += 3)
    i = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (e[o + 2] & 255), f.push(Ys(i));
  return f.join("");
}
function Ws(e) {
  for (var t, r = e.length, i = r % 3, f = [], o = 16383, u = 0, l = r - i; u < l; u += o)
    f.push(Qs(e, u, u + o > l ? l : u + o));
  return i === 1 ? (t = e[r - 1], f.push(
    Vr[t >> 2] + Vr[t << 4 & 63] + "=="
  )) : i === 2 && (t = (e[r - 2] << 8) + e[r - 1], f.push(
    Vr[t >> 10] + Vr[t >> 4 & 63] + Vr[t << 2 & 63] + "="
  )), f.join("");
}
var kn = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
kn.read = function(e, t, r, i, f) {
  var o, u, l = f * 8 - i - 1, x = (1 << l) - 1, b = x >> 1, _ = -7, I = r ? f - 1 : 0, P = r ? -1 : 1, B = e[t + I];
  for (I += P, o = B & (1 << -_) - 1, B >>= -_, _ += l; _ > 0; o = o * 256 + e[t + I], I += P, _ -= 8)
    ;
  for (u = o & (1 << -_) - 1, o >>= -_, _ += i; _ > 0; u = u * 256 + e[t + I], I += P, _ -= 8)
    ;
  if (o === 0)
    o = 1 - b;
  else {
    if (o === x)
      return u ? NaN : (B ? -1 : 1) * (1 / 0);
    u = u + Math.pow(2, i), o = o - b;
  }
  return (B ? -1 : 1) * u * Math.pow(2, o - i);
};
kn.write = function(e, t, r, i, f, o) {
  var u, l, x, b = o * 8 - f - 1, _ = (1 << b) - 1, I = _ >> 1, P = f === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, B = i ? 0 : o - 1, O = i ? 1 : -1, q = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
  for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (l = isNaN(t) ? 1 : 0, u = _) : (u = Math.floor(Math.log(t) / Math.LN2), t * (x = Math.pow(2, -u)) < 1 && (u--, x *= 2), u + I >= 1 ? t += P / x : t += P * Math.pow(2, 1 - I), t * x >= 2 && (u++, x /= 2), u + I >= _ ? (l = 0, u = _) : u + I >= 1 ? (l = (t * x - 1) * Math.pow(2, f), u = u + I) : (l = t * Math.pow(2, I - 1) * Math.pow(2, f), u = 0)); f >= 8; e[r + B] = l & 255, B += O, l /= 256, f -= 8)
    ;
  for (u = u << f | l, b += f; b > 0; e[r + B] = u & 255, B += O, u /= 256, b -= 8)
    ;
  e[r + B - O] |= q * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(e) {
  var t = Ci, r = kn, i = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = l, e.SlowBuffer = $, e.INSPECT_MAX_BYTES = 50;
  var f = 2147483647;
  e.kMaxLength = f, l.TYPED_ARRAY_SUPPORT = o(), !l.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function o() {
    try {
      var E = new Uint8Array(1), c = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(c, Uint8Array.prototype), Object.setPrototypeOf(E, c), E.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(l.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (l.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(l.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (l.isBuffer(this))
        return this.byteOffset;
    }
  });
  function u(E) {
    if (E > f)
      throw new RangeError('The value "' + E + '" is invalid for option "size"');
    var c = new Uint8Array(E);
    return Object.setPrototypeOf(c, l.prototype), c;
  }
  function l(E, c, p) {
    if (typeof E == "number") {
      if (typeof c == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return I(E);
    }
    return x(E, c, p);
  }
  l.poolSize = 8192;
  function x(E, c, p) {
    if (typeof E == "string")
      return P(E, c);
    if (ArrayBuffer.isView(E))
      return O(E);
    if (E == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof E
      );
    if (Ft(E, ArrayBuffer) || E && Ft(E.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Ft(E, SharedArrayBuffer) || E && Ft(E.buffer, SharedArrayBuffer)))
      return q(E, c, p);
    if (typeof E == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var N = E.valueOf && E.valueOf();
    if (N != null && N !== E)
      return l.from(N, c, p);
    var k = ot(E);
    if (k)
      return k;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof E[Symbol.toPrimitive] == "function")
      return l.from(
        E[Symbol.toPrimitive]("string"),
        c,
        p
      );
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof E
    );
  }
  l.from = function(E, c, p) {
    return x(E, c, p);
  }, Object.setPrototypeOf(l.prototype, Uint8Array.prototype), Object.setPrototypeOf(l, Uint8Array);
  function b(E) {
    if (typeof E != "number")
      throw new TypeError('"size" argument must be of type number');
    if (E < 0)
      throw new RangeError('The value "' + E + '" is invalid for option "size"');
  }
  function _(E, c, p) {
    return b(E), E <= 0 ? u(E) : c !== void 0 ? typeof p == "string" ? u(E).fill(c, p) : u(E).fill(c) : u(E);
  }
  l.alloc = function(E, c, p) {
    return _(E, c, p);
  };
  function I(E) {
    return b(E), u(E < 0 ? 0 : G(E) | 0);
  }
  l.allocUnsafe = function(E) {
    return I(E);
  }, l.allocUnsafeSlow = function(E) {
    return I(E);
  };
  function P(E, c) {
    if ((typeof c != "string" || c === "") && (c = "utf8"), !l.isEncoding(c))
      throw new TypeError("Unknown encoding: " + c);
    var p = tt(E, c) | 0, N = u(p), k = N.write(E, c);
    return k !== p && (N = N.slice(0, k)), N;
  }
  function B(E) {
    for (var c = E.length < 0 ? 0 : G(E.length) | 0, p = u(c), N = 0; N < c; N += 1)
      p[N] = E[N] & 255;
    return p;
  }
  function O(E) {
    if (Ft(E, Uint8Array)) {
      var c = new Uint8Array(E);
      return q(c.buffer, c.byteOffset, c.byteLength);
    }
    return B(E);
  }
  function q(E, c, p) {
    if (c < 0 || E.byteLength < c)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (E.byteLength < c + (p || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var N;
    return c === void 0 && p === void 0 ? N = new Uint8Array(E) : p === void 0 ? N = new Uint8Array(E, c) : N = new Uint8Array(E, c, p), Object.setPrototypeOf(N, l.prototype), N;
  }
  function ot(E) {
    if (l.isBuffer(E)) {
      var c = G(E.length) | 0, p = u(c);
      return p.length === 0 || E.copy(p, 0, 0, c), p;
    }
    if (E.length !== void 0)
      return typeof E.length != "number" || W(E.length) ? u(0) : B(E);
    if (E.type === "Buffer" && Array.isArray(E.data))
      return B(E.data);
  }
  function G(E) {
    if (E >= f)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + f.toString(16) + " bytes");
    return E | 0;
  }
  function $(E) {
    return +E != E && (E = 0), l.alloc(+E);
  }
  l.isBuffer = function(c) {
    return c != null && c._isBuffer === !0 && c !== l.prototype;
  }, l.compare = function(c, p) {
    if (Ft(c, Uint8Array) && (c = l.from(c, c.offset, c.byteLength)), Ft(p, Uint8Array) && (p = l.from(p, p.offset, p.byteLength)), !l.isBuffer(c) || !l.isBuffer(p))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (c === p)
      return 0;
    for (var N = c.length, k = p.length, C = 0, J = Math.min(N, k); C < J; ++C)
      if (c[C] !== p[C]) {
        N = c[C], k = p[C];
        break;
      }
    return N < k ? -1 : k < N ? 1 : 0;
  }, l.isEncoding = function(c) {
    switch (String(c).toLowerCase()) {
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
  }, l.concat = function(c, p) {
    if (!Array.isArray(c))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (c.length === 0)
      return l.alloc(0);
    var N;
    if (p === void 0)
      for (p = 0, N = 0; N < c.length; ++N)
        p += c[N].length;
    var k = l.allocUnsafe(p), C = 0;
    for (N = 0; N < c.length; ++N) {
      var J = c[N];
      if (Ft(J, Uint8Array))
        C + J.length > k.length ? l.from(J).copy(k, C) : Uint8Array.prototype.set.call(
          k,
          J,
          C
        );
      else if (l.isBuffer(J))
        J.copy(k, C);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      C += J.length;
    }
    return k;
  };
  function tt(E, c) {
    if (l.isBuffer(E))
      return E.length;
    if (ArrayBuffer.isView(E) || Ft(E, ArrayBuffer))
      return E.byteLength;
    if (typeof E != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof E
      );
    var p = E.length, N = arguments.length > 2 && arguments[2] === !0;
    if (!N && p === 0)
      return 0;
    for (var k = !1; ; )
      switch (c) {
        case "ascii":
        case "latin1":
        case "binary":
          return p;
        case "utf8":
        case "utf-8":
          return T(E).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return p * 2;
        case "hex":
          return p >>> 1;
        case "base64":
          return Y(E).length;
        default:
          if (k)
            return N ? -1 : T(E).length;
          c = ("" + c).toLowerCase(), k = !0;
      }
  }
  l.byteLength = tt;
  function gt(E, c, p) {
    var N = !1;
    if ((c === void 0 || c < 0) && (c = 0), c > this.length || ((p === void 0 || p > this.length) && (p = this.length), p <= 0) || (p >>>= 0, c >>>= 0, p <= c))
      return "";
    for (E || (E = "utf8"); ; )
      switch (E) {
        case "hex":
          return A(this, c, p);
        case "utf8":
        case "utf-8":
          return n(this, c, p);
        case "ascii":
          return v(this, c, p);
        case "latin1":
        case "binary":
          return m(this, c, p);
        case "base64":
          return w(this, c, p);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return M(this, c, p);
        default:
          if (N)
            throw new TypeError("Unknown encoding: " + E);
          E = (E + "").toLowerCase(), N = !0;
      }
  }
  l.prototype._isBuffer = !0;
  function st(E, c, p) {
    var N = E[c];
    E[c] = E[p], E[p] = N;
  }
  l.prototype.swap16 = function() {
    var c = this.length;
    if (c % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var p = 0; p < c; p += 2)
      st(this, p, p + 1);
    return this;
  }, l.prototype.swap32 = function() {
    var c = this.length;
    if (c % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var p = 0; p < c; p += 4)
      st(this, p, p + 3), st(this, p + 1, p + 2);
    return this;
  }, l.prototype.swap64 = function() {
    var c = this.length;
    if (c % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var p = 0; p < c; p += 8)
      st(this, p, p + 7), st(this, p + 1, p + 6), st(this, p + 2, p + 5), st(this, p + 3, p + 4);
    return this;
  }, l.prototype.toString = function() {
    var c = this.length;
    return c === 0 ? "" : arguments.length === 0 ? n(this, 0, c) : gt.apply(this, arguments);
  }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(c) {
    if (!l.isBuffer(c))
      throw new TypeError("Argument must be a Buffer");
    return this === c ? !0 : l.compare(this, c) === 0;
  }, l.prototype.inspect = function() {
    var c = "", p = e.INSPECT_MAX_BYTES;
    return c = this.toString("hex", 0, p).replace(/(.{2})/g, "$1 ").trim(), this.length > p && (c += " ... "), "<Buffer " + c + ">";
  }, i && (l.prototype[i] = l.prototype.inspect), l.prototype.compare = function(c, p, N, k, C) {
    if (Ft(c, Uint8Array) && (c = l.from(c, c.offset, c.byteLength)), !l.isBuffer(c))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof c
      );
    if (p === void 0 && (p = 0), N === void 0 && (N = c ? c.length : 0), k === void 0 && (k = 0), C === void 0 && (C = this.length), p < 0 || N > c.length || k < 0 || C > this.length)
      throw new RangeError("out of range index");
    if (k >= C && p >= N)
      return 0;
    if (k >= C)
      return -1;
    if (p >= N)
      return 1;
    if (p >>>= 0, N >>>= 0, k >>>= 0, C >>>= 0, this === c)
      return 0;
    for (var J = C - k, j = N - p, X = Math.min(J, j), Dt = this.slice(k, C), ft = c.slice(p, N), et = 0; et < X; ++et)
      if (Dt[et] !== ft[et]) {
        J = Dt[et], j = ft[et];
        break;
      }
    return J < j ? -1 : j < J ? 1 : 0;
  };
  function lt(E, c, p, N, k) {
    if (E.length === 0)
      return -1;
    if (typeof p == "string" ? (N = p, p = 0) : p > 2147483647 ? p = 2147483647 : p < -2147483648 && (p = -2147483648), p = +p, W(p) && (p = k ? 0 : E.length - 1), p < 0 && (p = E.length + p), p >= E.length) {
      if (k)
        return -1;
      p = E.length - 1;
    } else if (p < 0)
      if (k)
        p = 0;
      else
        return -1;
    if (typeof c == "string" && (c = l.from(c, N)), l.isBuffer(c))
      return c.length === 0 ? -1 : qt(E, c, p, N, k);
    if (typeof c == "number")
      return c = c & 255, typeof Uint8Array.prototype.indexOf == "function" ? k ? Uint8Array.prototype.indexOf.call(E, c, p) : Uint8Array.prototype.lastIndexOf.call(E, c, p) : qt(E, [c], p, N, k);
    throw new TypeError("val must be string, number or Buffer");
  }
  function qt(E, c, p, N, k) {
    var C = 1, J = E.length, j = c.length;
    if (N !== void 0 && (N = String(N).toLowerCase(), N === "ucs2" || N === "ucs-2" || N === "utf16le" || N === "utf-16le")) {
      if (E.length < 2 || c.length < 2)
        return -1;
      C = 2, J /= 2, j /= 2, p /= 2;
    }
    function X(mt, wt) {
      return C === 1 ? mt[wt] : mt.readUInt16BE(wt * C);
    }
    var Dt;
    if (k) {
      var ft = -1;
      for (Dt = p; Dt < J; Dt++)
        if (X(E, Dt) === X(c, ft === -1 ? 0 : Dt - ft)) {
          if (ft === -1 && (ft = Dt), Dt - ft + 1 === j)
            return ft * C;
        } else
          ft !== -1 && (Dt -= Dt - ft), ft = -1;
    } else
      for (p + j > J && (p = J - j), Dt = p; Dt >= 0; Dt--) {
        for (var et = !0, nr = 0; nr < j; nr++)
          if (X(E, Dt + nr) !== X(c, nr)) {
            et = !1;
            break;
          }
        if (et)
          return Dt;
      }
    return -1;
  }
  l.prototype.includes = function(c, p, N) {
    return this.indexOf(c, p, N) !== -1;
  }, l.prototype.indexOf = function(c, p, N) {
    return lt(this, c, p, N, !0);
  }, l.prototype.lastIndexOf = function(c, p, N) {
    return lt(this, c, p, N, !1);
  };
  function Mt(E, c, p, N) {
    p = Number(p) || 0;
    var k = E.length - p;
    N ? (N = Number(N), N > k && (N = k)) : N = k;
    var C = c.length;
    N > C / 2 && (N = C / 2);
    for (var J = 0; J < N; ++J) {
      var j = parseInt(c.substr(J * 2, 2), 16);
      if (W(j))
        return J;
      E[p + J] = j;
    }
    return J;
  }
  function Qt(E, c, p, N) {
    return K(T(c, E.length - p), E, p, N);
  }
  function Ht(E, c, p, N) {
    return K(D(c), E, p, N);
  }
  function nt(E, c, p, N) {
    return K(Y(c), E, p, N);
  }
  function Lt(E, c, p, N) {
    return K(at(c, E.length - p), E, p, N);
  }
  l.prototype.write = function(c, p, N, k) {
    if (p === void 0)
      k = "utf8", N = this.length, p = 0;
    else if (N === void 0 && typeof p == "string")
      k = p, N = this.length, p = 0;
    else if (isFinite(p))
      p = p >>> 0, isFinite(N) ? (N = N >>> 0, k === void 0 && (k = "utf8")) : (k = N, N = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    var C = this.length - p;
    if ((N === void 0 || N > C) && (N = C), c.length > 0 && (N < 0 || p < 0) || p > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    k || (k = "utf8");
    for (var J = !1; ; )
      switch (k) {
        case "hex":
          return Mt(this, c, p, N);
        case "utf8":
        case "utf-8":
          return Qt(this, c, p, N);
        case "ascii":
        case "latin1":
        case "binary":
          return Ht(this, c, p, N);
        case "base64":
          return nt(this, c, p, N);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Lt(this, c, p, N);
        default:
          if (J)
            throw new TypeError("Unknown encoding: " + k);
          k = ("" + k).toLowerCase(), J = !0;
      }
  }, l.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function w(E, c, p) {
    return c === 0 && p === E.length ? t.fromByteArray(E) : t.fromByteArray(E.slice(c, p));
  }
  function n(E, c, p) {
    p = Math.min(E.length, p);
    for (var N = [], k = c; k < p; ) {
      var C = E[k], J = null, j = C > 239 ? 4 : C > 223 ? 3 : C > 191 ? 2 : 1;
      if (k + j <= p) {
        var X, Dt, ft, et;
        switch (j) {
          case 1:
            C < 128 && (J = C);
            break;
          case 2:
            X = E[k + 1], (X & 192) === 128 && (et = (C & 31) << 6 | X & 63, et > 127 && (J = et));
            break;
          case 3:
            X = E[k + 1], Dt = E[k + 2], (X & 192) === 128 && (Dt & 192) === 128 && (et = (C & 15) << 12 | (X & 63) << 6 | Dt & 63, et > 2047 && (et < 55296 || et > 57343) && (J = et));
            break;
          case 4:
            X = E[k + 1], Dt = E[k + 2], ft = E[k + 3], (X & 192) === 128 && (Dt & 192) === 128 && (ft & 192) === 128 && (et = (C & 15) << 18 | (X & 63) << 12 | (Dt & 63) << 6 | ft & 63, et > 65535 && et < 1114112 && (J = et));
        }
      }
      J === null ? (J = 65533, j = 1) : J > 65535 && (J -= 65536, N.push(J >>> 10 & 1023 | 55296), J = 56320 | J & 1023), N.push(J), k += j;
    }
    return h(N);
  }
  var a = 4096;
  function h(E) {
    var c = E.length;
    if (c <= a)
      return String.fromCharCode.apply(String, E);
    for (var p = "", N = 0; N < c; )
      p += String.fromCharCode.apply(
        String,
        E.slice(N, N += a)
      );
    return p;
  }
  function v(E, c, p) {
    var N = "";
    p = Math.min(E.length, p);
    for (var k = c; k < p; ++k)
      N += String.fromCharCode(E[k] & 127);
    return N;
  }
  function m(E, c, p) {
    var N = "";
    p = Math.min(E.length, p);
    for (var k = c; k < p; ++k)
      N += String.fromCharCode(E[k]);
    return N;
  }
  function A(E, c, p) {
    var N = E.length;
    (!c || c < 0) && (c = 0), (!p || p < 0 || p > N) && (p = N);
    for (var k = "", C = c; C < p; ++C)
      k += rt[E[C]];
    return k;
  }
  function M(E, c, p) {
    for (var N = E.slice(c, p), k = "", C = 0; C < N.length - 1; C += 2)
      k += String.fromCharCode(N[C] + N[C + 1] * 256);
    return k;
  }
  l.prototype.slice = function(c, p) {
    var N = this.length;
    c = ~~c, p = p === void 0 ? N : ~~p, c < 0 ? (c += N, c < 0 && (c = 0)) : c > N && (c = N), p < 0 ? (p += N, p < 0 && (p = 0)) : p > N && (p = N), p < c && (p = c);
    var k = this.subarray(c, p);
    return Object.setPrototypeOf(k, l.prototype), k;
  };
  function d(E, c, p) {
    if (E % 1 !== 0 || E < 0)
      throw new RangeError("offset is not uint");
    if (E + c > p)
      throw new RangeError("Trying to access beyond buffer length");
  }
  l.prototype.readUintLE = l.prototype.readUIntLE = function(c, p, N) {
    c = c >>> 0, p = p >>> 0, N || d(c, p, this.length);
    for (var k = this[c], C = 1, J = 0; ++J < p && (C *= 256); )
      k += this[c + J] * C;
    return k;
  }, l.prototype.readUintBE = l.prototype.readUIntBE = function(c, p, N) {
    c = c >>> 0, p = p >>> 0, N || d(c, p, this.length);
    for (var k = this[c + --p], C = 1; p > 0 && (C *= 256); )
      k += this[c + --p] * C;
    return k;
  }, l.prototype.readUint8 = l.prototype.readUInt8 = function(c, p) {
    return c = c >>> 0, p || d(c, 1, this.length), this[c];
  }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(c, p) {
    return c = c >>> 0, p || d(c, 2, this.length), this[c] | this[c + 1] << 8;
  }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(c, p) {
    return c = c >>> 0, p || d(c, 2, this.length), this[c] << 8 | this[c + 1];
  }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(c, p) {
    return c = c >>> 0, p || d(c, 4, this.length), (this[c] | this[c + 1] << 8 | this[c + 2] << 16) + this[c + 3] * 16777216;
  }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(c, p) {
    return c = c >>> 0, p || d(c, 4, this.length), this[c] * 16777216 + (this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3]);
  }, l.prototype.readIntLE = function(c, p, N) {
    c = c >>> 0, p = p >>> 0, N || d(c, p, this.length);
    for (var k = this[c], C = 1, J = 0; ++J < p && (C *= 256); )
      k += this[c + J] * C;
    return C *= 128, k >= C && (k -= Math.pow(2, 8 * p)), k;
  }, l.prototype.readIntBE = function(c, p, N) {
    c = c >>> 0, p = p >>> 0, N || d(c, p, this.length);
    for (var k = p, C = 1, J = this[c + --k]; k > 0 && (C *= 256); )
      J += this[c + --k] * C;
    return C *= 128, J >= C && (J -= Math.pow(2, 8 * p)), J;
  }, l.prototype.readInt8 = function(c, p) {
    return c = c >>> 0, p || d(c, 1, this.length), this[c] & 128 ? (255 - this[c] + 1) * -1 : this[c];
  }, l.prototype.readInt16LE = function(c, p) {
    c = c >>> 0, p || d(c, 2, this.length);
    var N = this[c] | this[c + 1] << 8;
    return N & 32768 ? N | 4294901760 : N;
  }, l.prototype.readInt16BE = function(c, p) {
    c = c >>> 0, p || d(c, 2, this.length);
    var N = this[c + 1] | this[c] << 8;
    return N & 32768 ? N | 4294901760 : N;
  }, l.prototype.readInt32LE = function(c, p) {
    return c = c >>> 0, p || d(c, 4, this.length), this[c] | this[c + 1] << 8 | this[c + 2] << 16 | this[c + 3] << 24;
  }, l.prototype.readInt32BE = function(c, p) {
    return c = c >>> 0, p || d(c, 4, this.length), this[c] << 24 | this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3];
  }, l.prototype.readFloatLE = function(c, p) {
    return c = c >>> 0, p || d(c, 4, this.length), r.read(this, c, !0, 23, 4);
  }, l.prototype.readFloatBE = function(c, p) {
    return c = c >>> 0, p || d(c, 4, this.length), r.read(this, c, !1, 23, 4);
  }, l.prototype.readDoubleLE = function(c, p) {
    return c = c >>> 0, p || d(c, 8, this.length), r.read(this, c, !0, 52, 8);
  }, l.prototype.readDoubleBE = function(c, p) {
    return c = c >>> 0, p || d(c, 8, this.length), r.read(this, c, !1, 52, 8);
  };
  function s(E, c, p, N, k, C) {
    if (!l.isBuffer(E))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (c > k || c < C)
      throw new RangeError('"value" argument is out of bounds');
    if (p + N > E.length)
      throw new RangeError("Index out of range");
  }
  l.prototype.writeUintLE = l.prototype.writeUIntLE = function(c, p, N, k) {
    if (c = +c, p = p >>> 0, N = N >>> 0, !k) {
      var C = Math.pow(2, 8 * N) - 1;
      s(this, c, p, N, C, 0);
    }
    var J = 1, j = 0;
    for (this[p] = c & 255; ++j < N && (J *= 256); )
      this[p + j] = c / J & 255;
    return p + N;
  }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(c, p, N, k) {
    if (c = +c, p = p >>> 0, N = N >>> 0, !k) {
      var C = Math.pow(2, 8 * N) - 1;
      s(this, c, p, N, C, 0);
    }
    var J = N - 1, j = 1;
    for (this[p + J] = c & 255; --J >= 0 && (j *= 256); )
      this[p + J] = c / j & 255;
    return p + N;
  }, l.prototype.writeUint8 = l.prototype.writeUInt8 = function(c, p, N) {
    return c = +c, p = p >>> 0, N || s(this, c, p, 1, 255, 0), this[p] = c & 255, p + 1;
  }, l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function(c, p, N) {
    return c = +c, p = p >>> 0, N || s(this, c, p, 2, 65535, 0), this[p] = c & 255, this[p + 1] = c >>> 8, p + 2;
  }, l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function(c, p, N) {
    return c = +c, p = p >>> 0, N || s(this, c, p, 2, 65535, 0), this[p] = c >>> 8, this[p + 1] = c & 255, p + 2;
  }, l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function(c, p, N) {
    return c = +c, p = p >>> 0, N || s(this, c, p, 4, 4294967295, 0), this[p + 3] = c >>> 24, this[p + 2] = c >>> 16, this[p + 1] = c >>> 8, this[p] = c & 255, p + 4;
  }, l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function(c, p, N) {
    return c = +c, p = p >>> 0, N || s(this, c, p, 4, 4294967295, 0), this[p] = c >>> 24, this[p + 1] = c >>> 16, this[p + 2] = c >>> 8, this[p + 3] = c & 255, p + 4;
  }, l.prototype.writeIntLE = function(c, p, N, k) {
    if (c = +c, p = p >>> 0, !k) {
      var C = Math.pow(2, 8 * N - 1);
      s(this, c, p, N, C - 1, -C);
    }
    var J = 0, j = 1, X = 0;
    for (this[p] = c & 255; ++J < N && (j *= 256); )
      c < 0 && X === 0 && this[p + J - 1] !== 0 && (X = 1), this[p + J] = (c / j >> 0) - X & 255;
    return p + N;
  }, l.prototype.writeIntBE = function(c, p, N, k) {
    if (c = +c, p = p >>> 0, !k) {
      var C = Math.pow(2, 8 * N - 1);
      s(this, c, p, N, C - 1, -C);
    }
    var J = N - 1, j = 1, X = 0;
    for (this[p + J] = c & 255; --J >= 0 && (j *= 256); )
      c < 0 && X === 0 && this[p + J + 1] !== 0 && (X = 1), this[p + J] = (c / j >> 0) - X & 255;
    return p + N;
  }, l.prototype.writeInt8 = function(c, p, N) {
    return c = +c, p = p >>> 0, N || s(this, c, p, 1, 127, -128), c < 0 && (c = 255 + c + 1), this[p] = c & 255, p + 1;
  }, l.prototype.writeInt16LE = function(c, p, N) {
    return c = +c, p = p >>> 0, N || s(this, c, p, 2, 32767, -32768), this[p] = c & 255, this[p + 1] = c >>> 8, p + 2;
  }, l.prototype.writeInt16BE = function(c, p, N) {
    return c = +c, p = p >>> 0, N || s(this, c, p, 2, 32767, -32768), this[p] = c >>> 8, this[p + 1] = c & 255, p + 2;
  }, l.prototype.writeInt32LE = function(c, p, N) {
    return c = +c, p = p >>> 0, N || s(this, c, p, 4, 2147483647, -2147483648), this[p] = c & 255, this[p + 1] = c >>> 8, this[p + 2] = c >>> 16, this[p + 3] = c >>> 24, p + 4;
  }, l.prototype.writeInt32BE = function(c, p, N) {
    return c = +c, p = p >>> 0, N || s(this, c, p, 4, 2147483647, -2147483648), c < 0 && (c = 4294967295 + c + 1), this[p] = c >>> 24, this[p + 1] = c >>> 16, this[p + 2] = c >>> 8, this[p + 3] = c & 255, p + 4;
  };
  function g(E, c, p, N, k, C) {
    if (p + N > E.length)
      throw new RangeError("Index out of range");
    if (p < 0)
      throw new RangeError("Index out of range");
  }
  function H(E, c, p, N, k) {
    return c = +c, p = p >>> 0, k || g(E, c, p, 4), r.write(E, c, p, N, 23, 4), p + 4;
  }
  l.prototype.writeFloatLE = function(c, p, N) {
    return H(this, c, p, !0, N);
  }, l.prototype.writeFloatBE = function(c, p, N) {
    return H(this, c, p, !1, N);
  };
  function y(E, c, p, N, k) {
    return c = +c, p = p >>> 0, k || g(E, c, p, 8), r.write(E, c, p, N, 52, 8), p + 8;
  }
  l.prototype.writeDoubleLE = function(c, p, N) {
    return y(this, c, p, !0, N);
  }, l.prototype.writeDoubleBE = function(c, p, N) {
    return y(this, c, p, !1, N);
  }, l.prototype.copy = function(c, p, N, k) {
    if (!l.isBuffer(c))
      throw new TypeError("argument should be a Buffer");
    if (N || (N = 0), !k && k !== 0 && (k = this.length), p >= c.length && (p = c.length), p || (p = 0), k > 0 && k < N && (k = N), k === N || c.length === 0 || this.length === 0)
      return 0;
    if (p < 0)
      throw new RangeError("targetStart out of bounds");
    if (N < 0 || N >= this.length)
      throw new RangeError("Index out of range");
    if (k < 0)
      throw new RangeError("sourceEnd out of bounds");
    k > this.length && (k = this.length), c.length - p < k - N && (k = c.length - p + N);
    var C = k - N;
    return this === c && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(p, N, k) : Uint8Array.prototype.set.call(
      c,
      this.subarray(N, k),
      p
    ), C;
  }, l.prototype.fill = function(c, p, N, k) {
    if (typeof c == "string") {
      if (typeof p == "string" ? (k = p, p = 0, N = this.length) : typeof N == "string" && (k = N, N = this.length), k !== void 0 && typeof k != "string")
        throw new TypeError("encoding must be a string");
      if (typeof k == "string" && !l.isEncoding(k))
        throw new TypeError("Unknown encoding: " + k);
      if (c.length === 1) {
        var C = c.charCodeAt(0);
        (k === "utf8" && C < 128 || k === "latin1") && (c = C);
      }
    } else
      typeof c == "number" ? c = c & 255 : typeof c == "boolean" && (c = Number(c));
    if (p < 0 || this.length < p || this.length < N)
      throw new RangeError("Out of range index");
    if (N <= p)
      return this;
    p = p >>> 0, N = N === void 0 ? this.length : N >>> 0, c || (c = 0);
    var J;
    if (typeof c == "number")
      for (J = p; J < N; ++J)
        this[J] = c;
    else {
      var j = l.isBuffer(c) ? c : l.from(c, k), X = j.length;
      if (X === 0)
        throw new TypeError('The value "' + c + '" is invalid for argument "value"');
      for (J = 0; J < N - p; ++J)
        this[J + p] = j[J % X];
    }
    return this;
  };
  var R = /[^+/0-9A-Za-z-_]/g;
  function F(E) {
    if (E = E.split("=")[0], E = E.trim().replace(R, ""), E.length < 2)
      return "";
    for (; E.length % 4 !== 0; )
      E = E + "=";
    return E;
  }
  function T(E, c) {
    c = c || 1 / 0;
    for (var p, N = E.length, k = null, C = [], J = 0; J < N; ++J) {
      if (p = E.charCodeAt(J), p > 55295 && p < 57344) {
        if (!k) {
          if (p > 56319) {
            (c -= 3) > -1 && C.push(239, 191, 189);
            continue;
          } else if (J + 1 === N) {
            (c -= 3) > -1 && C.push(239, 191, 189);
            continue;
          }
          k = p;
          continue;
        }
        if (p < 56320) {
          (c -= 3) > -1 && C.push(239, 191, 189), k = p;
          continue;
        }
        p = (k - 55296 << 10 | p - 56320) + 65536;
      } else
        k && (c -= 3) > -1 && C.push(239, 191, 189);
      if (k = null, p < 128) {
        if ((c -= 1) < 0)
          break;
        C.push(p);
      } else if (p < 2048) {
        if ((c -= 2) < 0)
          break;
        C.push(
          p >> 6 | 192,
          p & 63 | 128
        );
      } else if (p < 65536) {
        if ((c -= 3) < 0)
          break;
        C.push(
          p >> 12 | 224,
          p >> 6 & 63 | 128,
          p & 63 | 128
        );
      } else if (p < 1114112) {
        if ((c -= 4) < 0)
          break;
        C.push(
          p >> 18 | 240,
          p >> 12 & 63 | 128,
          p >> 6 & 63 | 128,
          p & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return C;
  }
  function D(E) {
    for (var c = [], p = 0; p < E.length; ++p)
      c.push(E.charCodeAt(p) & 255);
    return c;
  }
  function at(E, c) {
    for (var p, N, k, C = [], J = 0; J < E.length && !((c -= 2) < 0); ++J)
      p = E.charCodeAt(J), N = p >> 8, k = p % 256, C.push(k), C.push(N);
    return C;
  }
  function Y(E) {
    return t.toByteArray(F(E));
  }
  function K(E, c, p, N) {
    for (var k = 0; k < N && !(k + p >= c.length || k >= E.length); ++k)
      c[k + p] = E[k];
    return k;
  }
  function Ft(E, c) {
    return E instanceof c || E != null && E.constructor != null && E.constructor.name != null && E.constructor.name === c.name;
  }
  function W(E) {
    return E !== E;
  }
  var rt = function() {
    for (var E = "0123456789abcdef", c = new Array(256), p = 0; p < 16; ++p)
      for (var N = p * 16, k = 0; k < 16; ++k)
        c[N + k] = E[p] + E[k];
    return c;
  }();
})(Sn);
var Te = {}, js = {
  get exports() {
    return Te;
  },
  set exports(e) {
    Te = e;
  }
}, tr = js.exports = {}, Yr, Qr;
function cn() {
  throw new Error("setTimeout has not been defined");
}
function dn() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Yr = setTimeout : Yr = cn;
  } catch {
    Yr = cn;
  }
  try {
    typeof clearTimeout == "function" ? Qr = clearTimeout : Qr = dn;
  } catch {
    Qr = dn;
  }
})();
function Uo(e) {
  if (Yr === setTimeout)
    return setTimeout(e, 0);
  if ((Yr === cn || !Yr) && setTimeout)
    return Yr = setTimeout, setTimeout(e, 0);
  try {
    return Yr(e, 0);
  } catch {
    try {
      return Yr.call(null, e, 0);
    } catch {
      return Yr.call(this, e, 0);
    }
  }
}
function Vs(e) {
  if (Qr === clearTimeout)
    return clearTimeout(e);
  if ((Qr === dn || !Qr) && clearTimeout)
    return Qr = clearTimeout, clearTimeout(e);
  try {
    return Qr(e);
  } catch {
    try {
      return Qr.call(null, e);
    } catch {
      return Qr.call(this, e);
    }
  }
}
var fe = [], Ke = !1, Be, xi = -1;
function Xs() {
  !Ke || !Be || (Ke = !1, Be.length ? fe = Be.concat(fe) : xi = -1, fe.length && Lo());
}
function Lo() {
  if (!Ke) {
    var e = Uo(Xs);
    Ke = !0;
    for (var t = fe.length; t; ) {
      for (Be = fe, fe = []; ++xi < t; )
        Be && Be[xi].run();
      xi = -1, t = fe.length;
    }
    Be = null, Ke = !1, Vs(e);
  }
}
tr.nextTick = function(e) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var r = 1; r < arguments.length; r++)
      t[r - 1] = arguments[r];
  fe.push(new Do(e, t)), fe.length === 1 && !Ke && Uo(Lo);
};
function Do(e, t) {
  this.fun = e, this.array = t;
}
Do.prototype.run = function() {
  this.fun.apply(null, this.array);
};
tr.title = "browser";
tr.browser = !0;
tr.env = {};
tr.argv = [];
tr.version = "";
tr.versions = {};
function le() {
}
tr.on = le;
tr.addListener = le;
tr.once = le;
tr.off = le;
tr.removeListener = le;
tr.removeAllListeners = le;
tr.emit = le;
tr.prependListener = le;
tr.prependOnceListener = le;
tr.listeners = function(e) {
  return [];
};
tr.binding = function(e) {
  throw new Error("process.binding is not supported");
};
tr.cwd = function() {
  return "/";
};
tr.chdir = function(e) {
  throw new Error("process.chdir is not supported");
};
tr.umask = function() {
  return 0;
};
(function(e) {
  function t() {
    var i = this || self;
    return delete e.prototype.__magic__, i;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return t();
  e.defineProperty(e.prototype, "__magic__", {
    configurable: !0,
    get: t
  });
  var r = __magic__;
  return r;
})(Object);
var li = {}, Zs = {
  get exports() {
    return li;
  },
  set exports(e) {
    li = e;
  }
}, qe = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Yi, Gn;
function qo() {
  if (Gn)
    return Yi;
  Gn = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function i(o) {
    if (o == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(o);
  }
  function f() {
    try {
      if (!Object.assign)
        return !1;
      var o = new String("abc");
      if (o[5] = "de", Object.getOwnPropertyNames(o)[0] === "5")
        return !1;
      for (var u = {}, l = 0; l < 10; l++)
        u["_" + String.fromCharCode(l)] = l;
      var x = Object.getOwnPropertyNames(u).map(function(_) {
        return u[_];
      });
      if (x.join("") !== "0123456789")
        return !1;
      var b = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(_) {
        b[_] = _;
      }), Object.keys(Object.assign({}, b)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Yi = f() ? Object.assign : function(o, u) {
    for (var l, x = i(o), b, _ = 1; _ < arguments.length; _++) {
      l = Object(arguments[_]);
      for (var I in l)
        t.call(l, I) && (x[I] = l[I]);
      if (e) {
        b = e(l);
        for (var P = 0; P < b.length; P++)
          r.call(l, b[P]) && (x[b[P]] = l[b[P]]);
      }
    }
    return x;
  }, Yi;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zn;
function $s() {
  if (zn)
    return qe;
  zn = 1, qo();
  var e = jt, t = 60103;
  if (qe.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var r = Symbol.for;
    t = r("react.element"), qe.Fragment = r("react.fragment");
  }
  var i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, f = Object.prototype.hasOwnProperty, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(l, x, b) {
    var _, I = {}, P = null, B = null;
    b !== void 0 && (P = "" + b), x.key !== void 0 && (P = "" + x.key), x.ref !== void 0 && (B = x.ref);
    for (_ in x)
      f.call(x, _) && !o.hasOwnProperty(_) && (I[_] = x[_]);
    if (l && l.defaultProps)
      for (_ in x = l.defaultProps, x)
        I[_] === void 0 && (I[_] = x[_]);
    return { $$typeof: t, type: l, key: P, ref: B, props: I, _owner: i.current };
  }
  return qe.jsx = u, qe.jsxs = u, qe;
}
var Qi = {}, Hn;
function tf() {
  return Hn || (Hn = 1, function(e) {
    Te.env.NODE_ENV !== "production" && function() {
      var t = jt, r = qo(), i = 60103, f = 60106;
      e.Fragment = 60107;
      var o = 60108, u = 60114, l = 60109, x = 60110, b = 60112, _ = 60113, I = 60120, P = 60115, B = 60116, O = 60121, q = 60122, ot = 60117, G = 60129, $ = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var tt = Symbol.for;
        i = tt("react.element"), f = tt("react.portal"), e.Fragment = tt("react.fragment"), o = tt("react.strict_mode"), u = tt("react.profiler"), l = tt("react.provider"), x = tt("react.context"), b = tt("react.forward_ref"), _ = tt("react.suspense"), I = tt("react.suspense_list"), P = tt("react.memo"), B = tt("react.lazy"), O = tt("react.block"), q = tt("react.server.block"), ot = tt("react.fundamental"), tt("react.scope"), tt("react.opaque.id"), G = tt("react.debug_trace_mode"), tt("react.offscreen"), $ = tt("react.legacy_hidden");
      }
      var gt = typeof Symbol == "function" && Symbol.iterator, st = "@@iterator";
      function lt(S) {
        if (S === null || typeof S != "object")
          return null;
        var z = gt && S[gt] || S[st];
        return typeof z == "function" ? z : null;
      }
      var qt = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function Mt(S) {
        {
          for (var z = arguments.length, L = new Array(z > 1 ? z - 1 : 0), Q = 1; Q < z; Q++)
            L[Q - 1] = arguments[Q];
          Qt("error", S, L);
        }
      }
      function Qt(S, z, L) {
        {
          var Q = qt.ReactDebugCurrentFrame, Gt = Q.getStackAddendum();
          Gt !== "" && (z += "%s", L = L.concat([Gt]));
          var Z = L.map(function(V) {
            return "" + V;
          });
          Z.unshift("Warning: " + z), Function.prototype.apply.call(console[S], console, Z);
        }
      }
      var Ht = !1;
      function nt(S) {
        return !!(typeof S == "string" || typeof S == "function" || S === e.Fragment || S === u || S === G || S === o || S === _ || S === I || S === $ || Ht || typeof S == "object" && S !== null && (S.$$typeof === B || S.$$typeof === P || S.$$typeof === l || S.$$typeof === x || S.$$typeof === b || S.$$typeof === ot || S.$$typeof === O || S[0] === q));
      }
      function Lt(S, z, L) {
        var Q = z.displayName || z.name || "";
        return S.displayName || (Q !== "" ? L + "(" + Q + ")" : L);
      }
      function w(S) {
        return S.displayName || "Context";
      }
      function n(S) {
        if (S == null)
          return null;
        if (typeof S.tag == "number" && Mt("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof S == "function")
          return S.displayName || S.name || null;
        if (typeof S == "string")
          return S;
        switch (S) {
          case e.Fragment:
            return "Fragment";
          case f:
            return "Portal";
          case u:
            return "Profiler";
          case o:
            return "StrictMode";
          case _:
            return "Suspense";
          case I:
            return "SuspenseList";
        }
        if (typeof S == "object")
          switch (S.$$typeof) {
            case x:
              var z = S;
              return w(z) + ".Consumer";
            case l:
              var L = S;
              return w(L._context) + ".Provider";
            case b:
              return Lt(S, S.render, "ForwardRef");
            case P:
              return n(S.type);
            case O:
              return n(S._render);
            case B: {
              var Q = S, Gt = Q._payload, Z = Q._init;
              try {
                return n(Z(Gt));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var a = 0, h, v, m, A, M, d, s;
      function g() {
      }
      g.__reactDisabledLog = !0;
      function H() {
        {
          if (a === 0) {
            h = console.log, v = console.info, m = console.warn, A = console.error, M = console.group, d = console.groupCollapsed, s = console.groupEnd;
            var S = {
              configurable: !0,
              enumerable: !0,
              value: g,
              writable: !0
            };
            Object.defineProperties(console, {
              info: S,
              log: S,
              warn: S,
              error: S,
              group: S,
              groupCollapsed: S,
              groupEnd: S
            });
          }
          a++;
        }
      }
      function y() {
        {
          if (a--, a === 0) {
            var S = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: r({}, S, {
                value: h
              }),
              info: r({}, S, {
                value: v
              }),
              warn: r({}, S, {
                value: m
              }),
              error: r({}, S, {
                value: A
              }),
              group: r({}, S, {
                value: M
              }),
              groupCollapsed: r({}, S, {
                value: d
              }),
              groupEnd: r({}, S, {
                value: s
              })
            });
          }
          a < 0 && Mt("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var R = qt.ReactCurrentDispatcher, F;
      function T(S, z, L) {
        {
          if (F === void 0)
            try {
              throw Error();
            } catch (Gt) {
              var Q = Gt.stack.trim().match(/\n( *(at )?)/);
              F = Q && Q[1] || "";
            }
          return `
` + F + S;
        }
      }
      var D = !1, at;
      {
        var Y = typeof WeakMap == "function" ? WeakMap : Map;
        at = new Y();
      }
      function K(S, z) {
        if (!S || D)
          return "";
        {
          var L = at.get(S);
          if (L !== void 0)
            return L;
        }
        var Q;
        D = !0;
        var Gt = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Z;
        Z = R.current, R.current = null, H();
        try {
          if (z) {
            var V = function() {
              throw Error();
            };
            if (Object.defineProperty(V.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(V, []);
              } catch (Zt) {
                Q = Zt;
              }
              Reflect.construct(S, [], V);
            } else {
              try {
                V.call();
              } catch (Zt) {
                Q = Zt;
              }
              S.call(V.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (Zt) {
              Q = Zt;
            }
            S();
          }
        } catch (Zt) {
          if (Zt && Q && typeof Zt.stack == "string") {
            for (var Bt = Zt.stack.split(`
`), ut = Q.stack.split(`
`), it = Bt.length - 1, Wt = ut.length - 1; it >= 1 && Wt >= 0 && Bt[it] !== ut[Wt]; )
              Wt--;
            for (; it >= 1 && Wt >= 0; it--, Wt--)
              if (Bt[it] !== ut[Wt]) {
                if (it !== 1 || Wt !== 1)
                  do
                    if (it--, Wt--, Wt < 0 || Bt[it] !== ut[Wt]) {
                      var dt = `
` + Bt[it].replace(" at new ", " at ");
                      return typeof S == "function" && at.set(S, dt), dt;
                    }
                  while (it >= 1 && Wt >= 0);
                break;
              }
          }
        } finally {
          D = !1, R.current = Z, y(), Error.prepareStackTrace = Gt;
        }
        var vt = S ? S.displayName || S.name : "", ur = vt ? T(vt) : "";
        return typeof S == "function" && at.set(S, ur), ur;
      }
      function Ft(S, z, L) {
        return K(S, !1);
      }
      function W(S) {
        var z = S.prototype;
        return !!(z && z.isReactComponent);
      }
      function rt(S, z, L) {
        if (S == null)
          return "";
        if (typeof S == "function")
          return K(S, W(S));
        if (typeof S == "string")
          return T(S);
        switch (S) {
          case _:
            return T("Suspense");
          case I:
            return T("SuspenseList");
        }
        if (typeof S == "object")
          switch (S.$$typeof) {
            case b:
              return Ft(S.render);
            case P:
              return rt(S.type, z, L);
            case O:
              return Ft(S._render);
            case B: {
              var Q = S, Gt = Q._payload, Z = Q._init;
              try {
                return rt(Z(Gt), z, L);
              } catch {
              }
            }
          }
        return "";
      }
      var E = {}, c = qt.ReactDebugCurrentFrame;
      function p(S) {
        if (S) {
          var z = S._owner, L = rt(S.type, S._source, z ? z.type : null);
          c.setExtraStackFrame(L);
        } else
          c.setExtraStackFrame(null);
      }
      function N(S, z, L, Q, Gt) {
        {
          var Z = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var V in S)
            if (Z(S, V)) {
              var Bt = void 0;
              try {
                if (typeof S[V] != "function") {
                  var ut = Error((Q || "React class") + ": " + L + " type `" + V + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof S[V] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw ut.name = "Invariant Violation", ut;
                }
                Bt = S[V](z, V, Q, L, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (it) {
                Bt = it;
              }
              Bt && !(Bt instanceof Error) && (p(Gt), Mt("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Q || "React class", L, V, typeof Bt), p(null)), Bt instanceof Error && !(Bt.message in E) && (E[Bt.message] = !0, p(Gt), Mt("Failed %s type: %s", L, Bt.message), p(null));
            }
        }
      }
      var k = qt.ReactCurrentOwner, C = Object.prototype.hasOwnProperty, J = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, j, X, Dt;
      Dt = {};
      function ft(S) {
        if (C.call(S, "ref")) {
          var z = Object.getOwnPropertyDescriptor(S, "ref").get;
          if (z && z.isReactWarning)
            return !1;
        }
        return S.ref !== void 0;
      }
      function et(S) {
        if (C.call(S, "key")) {
          var z = Object.getOwnPropertyDescriptor(S, "key").get;
          if (z && z.isReactWarning)
            return !1;
        }
        return S.key !== void 0;
      }
      function nr(S, z) {
        if (typeof S.ref == "string" && k.current && z && k.current.stateNode !== z) {
          var L = n(k.current.type);
          Dt[L] || (Mt('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', n(k.current.type), S.ref), Dt[L] = !0);
        }
      }
      function mt(S, z) {
        {
          var L = function() {
            j || (j = !0, Mt("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", z));
          };
          L.isReactWarning = !0, Object.defineProperty(S, "key", {
            get: L,
            configurable: !0
          });
        }
      }
      function wt(S, z) {
        {
          var L = function() {
            X || (X = !0, Mt("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", z));
          };
          L.isReactWarning = !0, Object.defineProperty(S, "ref", {
            get: L,
            configurable: !0
          });
        }
      }
      var Ir = function(S, z, L, Q, Gt, Z, V) {
        var Bt = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: i,
          // Built-in properties that belong on the element
          type: S,
          key: z,
          ref: L,
          props: V,
          // Record the component responsible for creating this element.
          _owner: Z
        };
        return Bt._store = {}, Object.defineProperty(Bt._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(Bt, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: Q
        }), Object.defineProperty(Bt, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: Gt
        }), Object.freeze && (Object.freeze(Bt.props), Object.freeze(Bt)), Bt;
      };
      function _t(S, z, L, Q, Gt) {
        {
          var Z, V = {}, Bt = null, ut = null;
          L !== void 0 && (Bt = "" + L), et(z) && (Bt = "" + z.key), ft(z) && (ut = z.ref, nr(z, Gt));
          for (Z in z)
            C.call(z, Z) && !J.hasOwnProperty(Z) && (V[Z] = z[Z]);
          if (S && S.defaultProps) {
            var it = S.defaultProps;
            for (Z in it)
              V[Z] === void 0 && (V[Z] = it[Z]);
          }
          if (Bt || ut) {
            var Wt = typeof S == "function" ? S.displayName || S.name || "Unknown" : S;
            Bt && mt(V, Wt), ut && wt(V, Wt);
          }
          return Ir(S, Bt, ut, Gt, Q, k.current, V);
        }
      }
      var yt = qt.ReactCurrentOwner, gr = qt.ReactDebugCurrentFrame;
      function pt(S) {
        if (S) {
          var z = S._owner, L = rt(S.type, S._source, z ? z.type : null);
          gr.setExtraStackFrame(L);
        } else
          gr.setExtraStackFrame(null);
      }
      var xt;
      xt = !1;
      function cr(S) {
        return typeof S == "object" && S !== null && S.$$typeof === i;
      }
      function At() {
        {
          if (yt.current) {
            var S = n(yt.current.type);
            if (S)
              return `

Check the render method of \`` + S + "`.";
          }
          return "";
        }
      }
      function Et(S) {
        {
          if (S !== void 0) {
            var z = S.fileName.replace(/^.*[\\\/]/, ""), L = S.lineNumber;
            return `

Check your code at ` + z + ":" + L + ".";
          }
          return "";
        }
      }
      var mr = {};
      function Nt(S) {
        {
          var z = At();
          if (!z) {
            var L = typeof S == "string" ? S : S.displayName || S.name;
            L && (z = `

Check the top-level render call using <` + L + ">.");
          }
          return z;
        }
      }
      function bt(S, z) {
        {
          if (!S._store || S._store.validated || S.key != null)
            return;
          S._store.validated = !0;
          var L = Nt(z);
          if (mr[L])
            return;
          mr[L] = !0;
          var Q = "";
          S && S._owner && S._owner !== yt.current && (Q = " It was passed a child from " + n(S._owner.type) + "."), pt(S), Mt('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', L, Q), pt(null);
        }
      }
      function wr(S, z) {
        {
          if (typeof S != "object")
            return;
          if (Array.isArray(S))
            for (var L = 0; L < S.length; L++) {
              var Q = S[L];
              cr(Q) && bt(Q, z);
            }
          else if (cr(S))
            S._store && (S._store.validated = !0);
          else if (S) {
            var Gt = lt(S);
            if (typeof Gt == "function" && Gt !== S.entries)
              for (var Z = Gt.call(S), V; !(V = Z.next()).done; )
                cr(V.value) && bt(V.value, z);
          }
        }
      }
      function It(S) {
        {
          var z = S.type;
          if (z == null || typeof z == "string")
            return;
          var L;
          if (typeof z == "function")
            L = z.propTypes;
          else if (typeof z == "object" && (z.$$typeof === b || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          z.$$typeof === P))
            L = z.propTypes;
          else
            return;
          if (L) {
            var Q = n(z);
            N(L, S.props, "prop", Q, S);
          } else if (z.PropTypes !== void 0 && !xt) {
            xt = !0;
            var Gt = n(z);
            Mt("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Gt || "Unknown");
          }
          typeof z.getDefaultProps == "function" && !z.getDefaultProps.isReactClassApproved && Mt("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function St(S) {
        {
          for (var z = Object.keys(S.props), L = 0; L < z.length; L++) {
            var Q = z[L];
            if (Q !== "children" && Q !== "key") {
              pt(S), Mt("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Q), pt(null);
              break;
            }
          }
          S.ref !== null && (pt(S), Mt("Invalid attribute `ref` supplied to `React.Fragment`."), pt(null));
        }
      }
      function yr(S, z, L, Q, Gt, Z) {
        {
          var V = nt(S);
          if (!V) {
            var Bt = "";
            (S === void 0 || typeof S == "object" && S !== null && Object.keys(S).length === 0) && (Bt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var ut = Et(Gt);
            ut ? Bt += ut : Bt += At();
            var it;
            S === null ? it = "null" : Array.isArray(S) ? it = "array" : S !== void 0 && S.$$typeof === i ? (it = "<" + (n(S.type) || "Unknown") + " />", Bt = " Did you accidentally export a JSX literal instead of a component?") : it = typeof S, Mt("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", it, Bt);
          }
          var Wt = _t(S, z, L, Gt, Z);
          if (Wt == null)
            return Wt;
          if (V) {
            var dt = z.children;
            if (dt !== void 0)
              if (Q)
                if (Array.isArray(dt)) {
                  for (var vt = 0; vt < dt.length; vt++)
                    wr(dt[vt], S);
                  Object.freeze && Object.freeze(dt);
                } else
                  Mt("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                wr(dt, S);
          }
          return S === e.Fragment ? St(Wt) : It(Wt), Wt;
        }
      }
      function kt(S, z, L) {
        return yr(S, z, L, !0);
      }
      function Rt(S, z, L) {
        return yr(S, z, L, !1);
      }
      var Sr = Rt, Pt = kt;
      e.jsx = Sr, e.jsxs = Pt;
    }();
  }(Qi)), Qi;
}
(function(e) {
  Te.env.NODE_ENV === "production" ? e.exports = $s() : e.exports = tf();
})(Zs);
const rf = li.Fragment, br = li.jsx, hi = li.jsxs;
var pn = {}, ef = {
  get exports() {
    return pn;
  },
  set exports(e) {
    pn = e;
  }
};
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(e) {
  (function() {
    var t = {}.hasOwnProperty;
    function r() {
      for (var i = [], f = 0; f < arguments.length; f++) {
        var o = arguments[f];
        if (o) {
          var u = typeof o;
          if (u === "string" || u === "number")
            i.push(o);
          else if (Array.isArray(o)) {
            if (o.length) {
              var l = r.apply(null, o);
              l && i.push(l);
            }
          } else if (u === "object") {
            if (o.toString !== Object.prototype.toString && !o.toString.toString().includes("[native code]")) {
              i.push(o.toString());
              continue;
            }
            for (var x in o)
              t.call(o, x) && o[x] && i.push(x);
          }
        }
      }
      return i.join(" ");
    }
    e.exports ? (r.default = r, e.exports = r) : window.classNames = r;
  })();
})(ef);
const ze = pn, Ti = jt.createContext(null);
function a0({
  children: e
}) {
  const [t, r] = jt.useState(), i = jt.useCallback(
    (o, u) => r((l) => ({ ...l || {}, [o]: u })),
    []
  ), f = jt.useMemo(
    () => ({
      widgetState: t || null,
      setWidgetState: i
    }),
    [t, i]
  );
  return /* @__PURE__ */ br(Ti.Provider, { value: f, children: e });
}
const nf = "_ring_7tcsj_47", of = "_popupButton__container_7tcsj_5", sf = "_popupButton_7tcsj_5", ff = "_icon_7tcsj_23", af = "_inactiveIcon_7tcsj_31", hf = "_activeIcon_7tcsj_35", uf = "_notif_7tcsj_39", lf = "_pinging_7tcsj_43", cf = "_ping_7tcsj_43", xr = {
  ring: nf,
  popupButton__container: of,
  "popupButton__container--open": "_popupButton__container--open_7tcsj_9",
  popupButton: sf,
  icon: ff,
  inactiveIcon: af,
  activeIcon: hf,
  notif: uf,
  pinging: lf,
  ping: cf
};
function Go() {
  try {
    const e = typeof localStorage < "u" && localStorage.getItem("clickedNfts") || "";
    return e ? Array.from(new Set(JSON.parse(e))) : [];
  } catch {
    return [];
  }
}
function df(e) {
  try {
    const r = [...Go(), e];
    typeof localStorage < "u" && localStorage.setItem("clickedNfts", JSON.stringify(r));
  } catch {
    return null;
  }
}
function pf({
  notiVal: e,
  showNoti: t,
  isOpen: r,
  clickHandler: i
}) {
  const f = Go(), o = jt.useContext(Ti), u = o == null ? void 0 : o.widgetState, l = u == null ? void 0 : u.foundNft, x = l && JSON.parse(l).itemId, b = !r && (l ? !f.includes(l) && !!x : !1), [_, I] = jt.useState(b);
  return jt.useEffect(() => {
    I(b);
  }, [b]), /* @__PURE__ */ hi(
    "div",
    {
      className: ze(xr.popupButton__container, {
        [xr["popupButton__container--open"]]: r
      }),
      children: [
        /* @__PURE__ */ br(
          "span",
          {
            className: _ ? xr.ring : void 0,
            style: { boxShadow: "none" }
          }
        ),
        /* @__PURE__ */ hi(
          "button",
          {
            className: xr.popupButton,
            type: "button",
            onClick: (P) => {
              I(!1), l && df(l), i(P);
            },
            children: [
              /* @__PURE__ */ br(
                "div",
                {
                  className: ze(xr.icon, {
                    [xr.activeIcon]: !r,
                    [xr.inactiveIcon]: r
                  }),
                  children: /* @__PURE__ */ br(
                    "img",
                    {
                      alt: "WalletChat",
                      src: "https://uploads-ssl.webflow.com/62d761bae8bf2da003f57b06/62d761bae8bf2dea68f57b52_walletchat%20logo.png",
                      style: { height: "90%" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ br(
                "div",
                {
                  className: ze(xr.icon, {
                    [xr.activeIcon]: r,
                    [xr.inactiveIcon]: !r
                  }),
                  children: /* @__PURE__ */ br(
                    "svg",
                    {
                      focusable: "false",
                      viewBox: "0 0 16 14",
                      width: "28",
                      height: "25",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /* @__PURE__ */ br(
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
        t && /* @__PURE__ */ hi(rf, { children: [
          /* @__PURE__ */ br("span", { className: ze(xr.notif, xr.pinging) }),
          /* @__PURE__ */ br("span", { className: xr.notif, children: e })
        ] })
      ]
    }
  );
}
const vf = "_ring_q714d_1", si = {
  ring: vf,
  "wallet-chat-widget": "_wallet-chat-widget_q714d_23",
  "widget-is-open": "_widget-is-open_q714d_9",
  "widget-is-closed": "_widget-is-closed_q714d_13",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_q714d_23",
  "wallet-chat-widget__container--open": "_wallet-chat-widget__container--open_q714d_27"
};
var vn = {}, gf = {
  get exports() {
    return vn;
  },
  set exports(e) {
    vn = e;
  }
};
(function(e) {
  (function(t, r) {
    function i(w, n) {
      if (!w)
        throw new Error(n || "Assertion failed");
    }
    function f(w, n) {
      w.super_ = n;
      var a = function() {
      };
      a.prototype = n.prototype, w.prototype = new a(), w.prototype.constructor = w;
    }
    function o(w, n, a) {
      if (o.isBN(w))
        return w;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, w !== null && ((n === "le" || n === "be") && (a = n, n = 10), this._init(w || 0, n || 10, a || "be"));
    }
    typeof t == "object" ? t.exports = o : r.BN = o, o.BN = o, o.wordSize = 26;
    var u;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? u = window.Buffer : u = Sn.Buffer;
    } catch {
    }
    o.isBN = function(n) {
      return n instanceof o ? !0 : n !== null && typeof n == "object" && n.constructor.wordSize === o.wordSize && Array.isArray(n.words);
    }, o.max = function(n, a) {
      return n.cmp(a) > 0 ? n : a;
    }, o.min = function(n, a) {
      return n.cmp(a) < 0 ? n : a;
    }, o.prototype._init = function(n, a, h) {
      if (typeof n == "number")
        return this._initNumber(n, a, h);
      if (typeof n == "object")
        return this._initArray(n, a, h);
      a === "hex" && (a = 16), i(a === (a | 0) && a >= 2 && a <= 36), n = n.toString().replace(/\s+/g, "");
      var v = 0;
      n[0] === "-" && (v++, this.negative = 1), v < n.length && (a === 16 ? this._parseHex(n, v, h) : (this._parseBase(n, a, v), h === "le" && this._initArray(this.toArray(), a, h)));
    }, o.prototype._initNumber = function(n, a, h) {
      n < 0 && (this.negative = 1, n = -n), n < 67108864 ? (this.words = [n & 67108863], this.length = 1) : n < 4503599627370496 ? (this.words = [
        n & 67108863,
        n / 67108864 & 67108863
      ], this.length = 2) : (i(n < 9007199254740992), this.words = [
        n & 67108863,
        n / 67108864 & 67108863,
        1
      ], this.length = 3), h === "le" && this._initArray(this.toArray(), a, h);
    }, o.prototype._initArray = function(n, a, h) {
      if (i(typeof n.length == "number"), n.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(n.length / 3), this.words = new Array(this.length);
      for (var v = 0; v < this.length; v++)
        this.words[v] = 0;
      var m, A, M = 0;
      if (h === "be")
        for (v = n.length - 1, m = 0; v >= 0; v -= 3)
          A = n[v] | n[v - 1] << 8 | n[v - 2] << 16, this.words[m] |= A << M & 67108863, this.words[m + 1] = A >>> 26 - M & 67108863, M += 24, M >= 26 && (M -= 26, m++);
      else if (h === "le")
        for (v = 0, m = 0; v < n.length; v += 3)
          A = n[v] | n[v + 1] << 8 | n[v + 2] << 16, this.words[m] |= A << M & 67108863, this.words[m + 1] = A >>> 26 - M & 67108863, M += 24, M >= 26 && (M -= 26, m++);
      return this._strip();
    };
    function l(w, n) {
      var a = w.charCodeAt(n);
      if (a >= 48 && a <= 57)
        return a - 48;
      if (a >= 65 && a <= 70)
        return a - 55;
      if (a >= 97 && a <= 102)
        return a - 87;
      i(!1, "Invalid character in " + w);
    }
    function x(w, n, a) {
      var h = l(w, a);
      return a - 1 >= n && (h |= l(w, a - 1) << 4), h;
    }
    o.prototype._parseHex = function(n, a, h) {
      this.length = Math.ceil((n.length - a) / 6), this.words = new Array(this.length);
      for (var v = 0; v < this.length; v++)
        this.words[v] = 0;
      var m = 0, A = 0, M;
      if (h === "be")
        for (v = n.length - 1; v >= a; v -= 2)
          M = x(n, a, v) << m, this.words[A] |= M & 67108863, m >= 18 ? (m -= 18, A += 1, this.words[A] |= M >>> 26) : m += 8;
      else {
        var d = n.length - a;
        for (v = d % 2 === 0 ? a + 1 : a; v < n.length; v += 2)
          M = x(n, a, v) << m, this.words[A] |= M & 67108863, m >= 18 ? (m -= 18, A += 1, this.words[A] |= M >>> 26) : m += 8;
      }
      this._strip();
    };
    function b(w, n, a, h) {
      for (var v = 0, m = 0, A = Math.min(w.length, a), M = n; M < A; M++) {
        var d = w.charCodeAt(M) - 48;
        v *= h, d >= 49 ? m = d - 49 + 10 : d >= 17 ? m = d - 17 + 10 : m = d, i(d >= 0 && m < h, "Invalid character"), v += m;
      }
      return v;
    }
    o.prototype._parseBase = function(n, a, h) {
      this.words = [0], this.length = 1;
      for (var v = 0, m = 1; m <= 67108863; m *= a)
        v++;
      v--, m = m / a | 0;
      for (var A = n.length - h, M = A % v, d = Math.min(A, A - M) + h, s = 0, g = h; g < d; g += v)
        s = b(n, g, g + v, a), this.imuln(m), this.words[0] + s < 67108864 ? this.words[0] += s : this._iaddn(s);
      if (M !== 0) {
        var H = 1;
        for (s = b(n, g, n.length, a), g = 0; g < M; g++)
          H *= a;
        this.imuln(H), this.words[0] + s < 67108864 ? this.words[0] += s : this._iaddn(s);
      }
      this._strip();
    }, o.prototype.copy = function(n) {
      n.words = new Array(this.length);
      for (var a = 0; a < this.length; a++)
        n.words[a] = this.words[a];
      n.length = this.length, n.negative = this.negative, n.red = this.red;
    };
    function _(w, n) {
      w.words = n.words, w.length = n.length, w.negative = n.negative, w.red = n.red;
    }
    if (o.prototype._move = function(n) {
      _(n, this);
    }, o.prototype.clone = function() {
      var n = new o(null);
      return this.copy(n), n;
    }, o.prototype._expand = function(n) {
      for (; this.length < n; )
        this.words[this.length++] = 0;
      return this;
    }, o.prototype._strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, o.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, typeof Symbol < "u" && typeof Symbol.for == "function")
      try {
        o.prototype[Symbol.for("nodejs.util.inspect.custom")] = I;
      } catch {
        o.prototype.inspect = I;
      }
    else
      o.prototype.inspect = I;
    function I() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var P = [
      "",
      "0",
      "00",
      "000",
      "0000",
      "00000",
      "000000",
      "0000000",
      "00000000",
      "000000000",
      "0000000000",
      "00000000000",
      "000000000000",
      "0000000000000",
      "00000000000000",
      "000000000000000",
      "0000000000000000",
      "00000000000000000",
      "000000000000000000",
      "0000000000000000000",
      "00000000000000000000",
      "000000000000000000000",
      "0000000000000000000000",
      "00000000000000000000000",
      "000000000000000000000000",
      "0000000000000000000000000"
    ], B = [
      0,
      0,
      25,
      16,
      12,
      11,
      10,
      9,
      8,
      8,
      7,
      7,
      7,
      7,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ], O = [
      0,
      0,
      33554432,
      43046721,
      16777216,
      48828125,
      60466176,
      40353607,
      16777216,
      43046721,
      1e7,
      19487171,
      35831808,
      62748517,
      7529536,
      11390625,
      16777216,
      24137569,
      34012224,
      47045881,
      64e6,
      4084101,
      5153632,
      6436343,
      7962624,
      9765625,
      11881376,
      14348907,
      17210368,
      20511149,
      243e5,
      28629151,
      33554432,
      39135393,
      45435424,
      52521875,
      60466176
    ];
    o.prototype.toString = function(n, a) {
      n = n || 10, a = a | 0 || 1;
      var h;
      if (n === 16 || n === "hex") {
        h = "";
        for (var v = 0, m = 0, A = 0; A < this.length; A++) {
          var M = this.words[A], d = ((M << v | m) & 16777215).toString(16);
          m = M >>> 24 - v & 16777215, v += 2, v >= 26 && (v -= 26, A--), m !== 0 || A !== this.length - 1 ? h = P[6 - d.length] + d + h : h = d + h;
        }
        for (m !== 0 && (h = m.toString(16) + h); h.length % a !== 0; )
          h = "0" + h;
        return this.negative !== 0 && (h = "-" + h), h;
      }
      if (n === (n | 0) && n >= 2 && n <= 36) {
        var s = B[n], g = O[n];
        h = "";
        var H = this.clone();
        for (H.negative = 0; !H.isZero(); ) {
          var y = H.modrn(g).toString(n);
          H = H.idivn(g), H.isZero() ? h = y + h : h = P[s - y.length] + y + h;
        }
        for (this.isZero() && (h = "0" + h); h.length % a !== 0; )
          h = "0" + h;
        return this.negative !== 0 && (h = "-" + h), h;
      }
      i(!1, "Base should be between 2 and 36");
    }, o.prototype.toNumber = function() {
      var n = this.words[0];
      return this.length === 2 ? n += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? n += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -n : n;
    }, o.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, u && (o.prototype.toBuffer = function(n, a) {
      return this.toArrayLike(u, n, a);
    }), o.prototype.toArray = function(n, a) {
      return this.toArrayLike(Array, n, a);
    };
    var q = function(n, a) {
      return n.allocUnsafe ? n.allocUnsafe(a) : new n(a);
    };
    o.prototype.toArrayLike = function(n, a, h) {
      this._strip();
      var v = this.byteLength(), m = h || Math.max(1, v);
      i(v <= m, "byte array longer than desired length"), i(m > 0, "Requested array length <= 0");
      var A = q(n, m), M = a === "le" ? "LE" : "BE";
      return this["_toArrayLike" + M](A, v), A;
    }, o.prototype._toArrayLikeLE = function(n, a) {
      for (var h = 0, v = 0, m = 0, A = 0; m < this.length; m++) {
        var M = this.words[m] << A | v;
        n[h++] = M & 255, h < n.length && (n[h++] = M >> 8 & 255), h < n.length && (n[h++] = M >> 16 & 255), A === 6 ? (h < n.length && (n[h++] = M >> 24 & 255), v = 0, A = 0) : (v = M >>> 24, A += 2);
      }
      if (h < n.length)
        for (n[h++] = v; h < n.length; )
          n[h++] = 0;
    }, o.prototype._toArrayLikeBE = function(n, a) {
      for (var h = n.length - 1, v = 0, m = 0, A = 0; m < this.length; m++) {
        var M = this.words[m] << A | v;
        n[h--] = M & 255, h >= 0 && (n[h--] = M >> 8 & 255), h >= 0 && (n[h--] = M >> 16 & 255), A === 6 ? (h >= 0 && (n[h--] = M >> 24 & 255), v = 0, A = 0) : (v = M >>> 24, A += 2);
      }
      if (h >= 0)
        for (n[h--] = v; h >= 0; )
          n[h--] = 0;
    }, Math.clz32 ? o.prototype._countBits = function(n) {
      return 32 - Math.clz32(n);
    } : o.prototype._countBits = function(n) {
      var a = n, h = 0;
      return a >= 4096 && (h += 13, a >>>= 13), a >= 64 && (h += 7, a >>>= 7), a >= 8 && (h += 4, a >>>= 4), a >= 2 && (h += 2, a >>>= 2), h + a;
    }, o.prototype._zeroBits = function(n) {
      if (n === 0)
        return 26;
      var a = n, h = 0;
      return a & 8191 || (h += 13, a >>>= 13), a & 127 || (h += 7, a >>>= 7), a & 15 || (h += 4, a >>>= 4), a & 3 || (h += 2, a >>>= 2), a & 1 || h++, h;
    }, o.prototype.bitLength = function() {
      var n = this.words[this.length - 1], a = this._countBits(n);
      return (this.length - 1) * 26 + a;
    };
    function ot(w) {
      for (var n = new Array(w.bitLength()), a = 0; a < n.length; a++) {
        var h = a / 26 | 0, v = a % 26;
        n[a] = w.words[h] >>> v & 1;
      }
      return n;
    }
    o.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var n = 0, a = 0; a < this.length; a++) {
        var h = this._zeroBits(this.words[a]);
        if (n += h, h !== 26)
          break;
      }
      return n;
    }, o.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, o.prototype.toTwos = function(n) {
      return this.negative !== 0 ? this.abs().inotn(n).iaddn(1) : this.clone();
    }, o.prototype.fromTwos = function(n) {
      return this.testn(n - 1) ? this.notn(n).iaddn(1).ineg() : this.clone();
    }, o.prototype.isNeg = function() {
      return this.negative !== 0;
    }, o.prototype.neg = function() {
      return this.clone().ineg();
    }, o.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, o.prototype.iuor = function(n) {
      for (; this.length < n.length; )
        this.words[this.length++] = 0;
      for (var a = 0; a < n.length; a++)
        this.words[a] = this.words[a] | n.words[a];
      return this._strip();
    }, o.prototype.ior = function(n) {
      return i((this.negative | n.negative) === 0), this.iuor(n);
    }, o.prototype.or = function(n) {
      return this.length > n.length ? this.clone().ior(n) : n.clone().ior(this);
    }, o.prototype.uor = function(n) {
      return this.length > n.length ? this.clone().iuor(n) : n.clone().iuor(this);
    }, o.prototype.iuand = function(n) {
      var a;
      this.length > n.length ? a = n : a = this;
      for (var h = 0; h < a.length; h++)
        this.words[h] = this.words[h] & n.words[h];
      return this.length = a.length, this._strip();
    }, o.prototype.iand = function(n) {
      return i((this.negative | n.negative) === 0), this.iuand(n);
    }, o.prototype.and = function(n) {
      return this.length > n.length ? this.clone().iand(n) : n.clone().iand(this);
    }, o.prototype.uand = function(n) {
      return this.length > n.length ? this.clone().iuand(n) : n.clone().iuand(this);
    }, o.prototype.iuxor = function(n) {
      var a, h;
      this.length > n.length ? (a = this, h = n) : (a = n, h = this);
      for (var v = 0; v < h.length; v++)
        this.words[v] = a.words[v] ^ h.words[v];
      if (this !== a)
        for (; v < a.length; v++)
          this.words[v] = a.words[v];
      return this.length = a.length, this._strip();
    }, o.prototype.ixor = function(n) {
      return i((this.negative | n.negative) === 0), this.iuxor(n);
    }, o.prototype.xor = function(n) {
      return this.length > n.length ? this.clone().ixor(n) : n.clone().ixor(this);
    }, o.prototype.uxor = function(n) {
      return this.length > n.length ? this.clone().iuxor(n) : n.clone().iuxor(this);
    }, o.prototype.inotn = function(n) {
      i(typeof n == "number" && n >= 0);
      var a = Math.ceil(n / 26) | 0, h = n % 26;
      this._expand(a), h > 0 && a--;
      for (var v = 0; v < a; v++)
        this.words[v] = ~this.words[v] & 67108863;
      return h > 0 && (this.words[v] = ~this.words[v] & 67108863 >> 26 - h), this._strip();
    }, o.prototype.notn = function(n) {
      return this.clone().inotn(n);
    }, o.prototype.setn = function(n, a) {
      i(typeof n == "number" && n >= 0);
      var h = n / 26 | 0, v = n % 26;
      return this._expand(h + 1), a ? this.words[h] = this.words[h] | 1 << v : this.words[h] = this.words[h] & ~(1 << v), this._strip();
    }, o.prototype.iadd = function(n) {
      var a;
      if (this.negative !== 0 && n.negative === 0)
        return this.negative = 0, a = this.isub(n), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && n.negative !== 0)
        return n.negative = 0, a = this.isub(n), n.negative = 1, a._normSign();
      var h, v;
      this.length > n.length ? (h = this, v = n) : (h = n, v = this);
      for (var m = 0, A = 0; A < v.length; A++)
        a = (h.words[A] | 0) + (v.words[A] | 0) + m, this.words[A] = a & 67108863, m = a >>> 26;
      for (; m !== 0 && A < h.length; A++)
        a = (h.words[A] | 0) + m, this.words[A] = a & 67108863, m = a >>> 26;
      if (this.length = h.length, m !== 0)
        this.words[this.length] = m, this.length++;
      else if (h !== this)
        for (; A < h.length; A++)
          this.words[A] = h.words[A];
      return this;
    }, o.prototype.add = function(n) {
      var a;
      return n.negative !== 0 && this.negative === 0 ? (n.negative = 0, a = this.sub(n), n.negative ^= 1, a) : n.negative === 0 && this.negative !== 0 ? (this.negative = 0, a = n.sub(this), this.negative = 1, a) : this.length > n.length ? this.clone().iadd(n) : n.clone().iadd(this);
    }, o.prototype.isub = function(n) {
      if (n.negative !== 0) {
        n.negative = 0;
        var a = this.iadd(n);
        return n.negative = 1, a._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(n), this.negative = 1, this._normSign();
      var h = this.cmp(n);
      if (h === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var v, m;
      h > 0 ? (v = this, m = n) : (v = n, m = this);
      for (var A = 0, M = 0; M < m.length; M++)
        a = (v.words[M] | 0) - (m.words[M] | 0) + A, A = a >> 26, this.words[M] = a & 67108863;
      for (; A !== 0 && M < v.length; M++)
        a = (v.words[M] | 0) + A, A = a >> 26, this.words[M] = a & 67108863;
      if (A === 0 && M < v.length && v !== this)
        for (; M < v.length; M++)
          this.words[M] = v.words[M];
      return this.length = Math.max(this.length, M), v !== this && (this.negative = 1), this._strip();
    }, o.prototype.sub = function(n) {
      return this.clone().isub(n);
    };
    function G(w, n, a) {
      a.negative = n.negative ^ w.negative;
      var h = w.length + n.length | 0;
      a.length = h, h = h - 1 | 0;
      var v = w.words[0] | 0, m = n.words[0] | 0, A = v * m, M = A & 67108863, d = A / 67108864 | 0;
      a.words[0] = M;
      for (var s = 1; s < h; s++) {
        for (var g = d >>> 26, H = d & 67108863, y = Math.min(s, n.length - 1), R = Math.max(0, s - w.length + 1); R <= y; R++) {
          var F = s - R | 0;
          v = w.words[F] | 0, m = n.words[R] | 0, A = v * m + H, g += A / 67108864 | 0, H = A & 67108863;
        }
        a.words[s] = H | 0, d = g | 0;
      }
      return d !== 0 ? a.words[s] = d | 0 : a.length--, a._strip();
    }
    var $ = function(n, a, h) {
      var v = n.words, m = a.words, A = h.words, M = 0, d, s, g, H = v[0] | 0, y = H & 8191, R = H >>> 13, F = v[1] | 0, T = F & 8191, D = F >>> 13, at = v[2] | 0, Y = at & 8191, K = at >>> 13, Ft = v[3] | 0, W = Ft & 8191, rt = Ft >>> 13, E = v[4] | 0, c = E & 8191, p = E >>> 13, N = v[5] | 0, k = N & 8191, C = N >>> 13, J = v[6] | 0, j = J & 8191, X = J >>> 13, Dt = v[7] | 0, ft = Dt & 8191, et = Dt >>> 13, nr = v[8] | 0, mt = nr & 8191, wt = nr >>> 13, Ir = v[9] | 0, _t = Ir & 8191, yt = Ir >>> 13, gr = m[0] | 0, pt = gr & 8191, xt = gr >>> 13, cr = m[1] | 0, At = cr & 8191, Et = cr >>> 13, mr = m[2] | 0, Nt = mr & 8191, bt = mr >>> 13, wr = m[3] | 0, It = wr & 8191, St = wr >>> 13, yr = m[4] | 0, kt = yr & 8191, Rt = yr >>> 13, Sr = m[5] | 0, Pt = Sr & 8191, S = Sr >>> 13, z = m[6] | 0, L = z & 8191, Q = z >>> 13, Gt = m[7] | 0, Z = Gt & 8191, V = Gt >>> 13, Bt = m[8] | 0, ut = Bt & 8191, it = Bt >>> 13, Wt = m[9] | 0, dt = Wt & 8191, vt = Wt >>> 13;
      h.negative = n.negative ^ a.negative, h.length = 19, d = Math.imul(y, pt), s = Math.imul(y, xt), s = s + Math.imul(R, pt) | 0, g = Math.imul(R, xt);
      var ur = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (ur >>> 26) | 0, ur &= 67108863, d = Math.imul(T, pt), s = Math.imul(T, xt), s = s + Math.imul(D, pt) | 0, g = Math.imul(D, xt), d = d + Math.imul(y, At) | 0, s = s + Math.imul(y, Et) | 0, s = s + Math.imul(R, At) | 0, g = g + Math.imul(R, Et) | 0;
      var Zt = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Zt >>> 26) | 0, Zt &= 67108863, d = Math.imul(Y, pt), s = Math.imul(Y, xt), s = s + Math.imul(K, pt) | 0, g = Math.imul(K, xt), d = d + Math.imul(T, At) | 0, s = s + Math.imul(T, Et) | 0, s = s + Math.imul(D, At) | 0, g = g + Math.imul(D, Et) | 0, d = d + Math.imul(y, Nt) | 0, s = s + Math.imul(y, bt) | 0, s = s + Math.imul(R, Nt) | 0, g = g + Math.imul(R, bt) | 0;
      var kr = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (kr >>> 26) | 0, kr &= 67108863, d = Math.imul(W, pt), s = Math.imul(W, xt), s = s + Math.imul(rt, pt) | 0, g = Math.imul(rt, xt), d = d + Math.imul(Y, At) | 0, s = s + Math.imul(Y, Et) | 0, s = s + Math.imul(K, At) | 0, g = g + Math.imul(K, Et) | 0, d = d + Math.imul(T, Nt) | 0, s = s + Math.imul(T, bt) | 0, s = s + Math.imul(D, Nt) | 0, g = g + Math.imul(D, bt) | 0, d = d + Math.imul(y, It) | 0, s = s + Math.imul(y, St) | 0, s = s + Math.imul(R, It) | 0, g = g + Math.imul(R, St) | 0;
      var Rr = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Rr >>> 26) | 0, Rr &= 67108863, d = Math.imul(c, pt), s = Math.imul(c, xt), s = s + Math.imul(p, pt) | 0, g = Math.imul(p, xt), d = d + Math.imul(W, At) | 0, s = s + Math.imul(W, Et) | 0, s = s + Math.imul(rt, At) | 0, g = g + Math.imul(rt, Et) | 0, d = d + Math.imul(Y, Nt) | 0, s = s + Math.imul(Y, bt) | 0, s = s + Math.imul(K, Nt) | 0, g = g + Math.imul(K, bt) | 0, d = d + Math.imul(T, It) | 0, s = s + Math.imul(T, St) | 0, s = s + Math.imul(D, It) | 0, g = g + Math.imul(D, St) | 0, d = d + Math.imul(y, kt) | 0, s = s + Math.imul(y, Rt) | 0, s = s + Math.imul(R, kt) | 0, g = g + Math.imul(R, Rt) | 0;
      var Pr = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Pr >>> 26) | 0, Pr &= 67108863, d = Math.imul(k, pt), s = Math.imul(k, xt), s = s + Math.imul(C, pt) | 0, g = Math.imul(C, xt), d = d + Math.imul(c, At) | 0, s = s + Math.imul(c, Et) | 0, s = s + Math.imul(p, At) | 0, g = g + Math.imul(p, Et) | 0, d = d + Math.imul(W, Nt) | 0, s = s + Math.imul(W, bt) | 0, s = s + Math.imul(rt, Nt) | 0, g = g + Math.imul(rt, bt) | 0, d = d + Math.imul(Y, It) | 0, s = s + Math.imul(Y, St) | 0, s = s + Math.imul(K, It) | 0, g = g + Math.imul(K, St) | 0, d = d + Math.imul(T, kt) | 0, s = s + Math.imul(T, Rt) | 0, s = s + Math.imul(D, kt) | 0, g = g + Math.imul(D, Rt) | 0, d = d + Math.imul(y, Pt) | 0, s = s + Math.imul(y, S) | 0, s = s + Math.imul(R, Pt) | 0, g = g + Math.imul(R, S) | 0;
      var we = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (we >>> 26) | 0, we &= 67108863, d = Math.imul(j, pt), s = Math.imul(j, xt), s = s + Math.imul(X, pt) | 0, g = Math.imul(X, xt), d = d + Math.imul(k, At) | 0, s = s + Math.imul(k, Et) | 0, s = s + Math.imul(C, At) | 0, g = g + Math.imul(C, Et) | 0, d = d + Math.imul(c, Nt) | 0, s = s + Math.imul(c, bt) | 0, s = s + Math.imul(p, Nt) | 0, g = g + Math.imul(p, bt) | 0, d = d + Math.imul(W, It) | 0, s = s + Math.imul(W, St) | 0, s = s + Math.imul(rt, It) | 0, g = g + Math.imul(rt, St) | 0, d = d + Math.imul(Y, kt) | 0, s = s + Math.imul(Y, Rt) | 0, s = s + Math.imul(K, kt) | 0, g = g + Math.imul(K, Rt) | 0, d = d + Math.imul(T, Pt) | 0, s = s + Math.imul(T, S) | 0, s = s + Math.imul(D, Pt) | 0, g = g + Math.imul(D, S) | 0, d = d + Math.imul(y, L) | 0, s = s + Math.imul(y, Q) | 0, s = s + Math.imul(R, L) | 0, g = g + Math.imul(R, Q) | 0;
      var ye = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (ye >>> 26) | 0, ye &= 67108863, d = Math.imul(ft, pt), s = Math.imul(ft, xt), s = s + Math.imul(et, pt) | 0, g = Math.imul(et, xt), d = d + Math.imul(j, At) | 0, s = s + Math.imul(j, Et) | 0, s = s + Math.imul(X, At) | 0, g = g + Math.imul(X, Et) | 0, d = d + Math.imul(k, Nt) | 0, s = s + Math.imul(k, bt) | 0, s = s + Math.imul(C, Nt) | 0, g = g + Math.imul(C, bt) | 0, d = d + Math.imul(c, It) | 0, s = s + Math.imul(c, St) | 0, s = s + Math.imul(p, It) | 0, g = g + Math.imul(p, St) | 0, d = d + Math.imul(W, kt) | 0, s = s + Math.imul(W, Rt) | 0, s = s + Math.imul(rt, kt) | 0, g = g + Math.imul(rt, Rt) | 0, d = d + Math.imul(Y, Pt) | 0, s = s + Math.imul(Y, S) | 0, s = s + Math.imul(K, Pt) | 0, g = g + Math.imul(K, S) | 0, d = d + Math.imul(T, L) | 0, s = s + Math.imul(T, Q) | 0, s = s + Math.imul(D, L) | 0, g = g + Math.imul(D, Q) | 0, d = d + Math.imul(y, Z) | 0, s = s + Math.imul(y, V) | 0, s = s + Math.imul(R, Z) | 0, g = g + Math.imul(R, V) | 0;
      var xe = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (xe >>> 26) | 0, xe &= 67108863, d = Math.imul(mt, pt), s = Math.imul(mt, xt), s = s + Math.imul(wt, pt) | 0, g = Math.imul(wt, xt), d = d + Math.imul(ft, At) | 0, s = s + Math.imul(ft, Et) | 0, s = s + Math.imul(et, At) | 0, g = g + Math.imul(et, Et) | 0, d = d + Math.imul(j, Nt) | 0, s = s + Math.imul(j, bt) | 0, s = s + Math.imul(X, Nt) | 0, g = g + Math.imul(X, bt) | 0, d = d + Math.imul(k, It) | 0, s = s + Math.imul(k, St) | 0, s = s + Math.imul(C, It) | 0, g = g + Math.imul(C, St) | 0, d = d + Math.imul(c, kt) | 0, s = s + Math.imul(c, Rt) | 0, s = s + Math.imul(p, kt) | 0, g = g + Math.imul(p, Rt) | 0, d = d + Math.imul(W, Pt) | 0, s = s + Math.imul(W, S) | 0, s = s + Math.imul(rt, Pt) | 0, g = g + Math.imul(rt, S) | 0, d = d + Math.imul(Y, L) | 0, s = s + Math.imul(Y, Q) | 0, s = s + Math.imul(K, L) | 0, g = g + Math.imul(K, Q) | 0, d = d + Math.imul(T, Z) | 0, s = s + Math.imul(T, V) | 0, s = s + Math.imul(D, Z) | 0, g = g + Math.imul(D, V) | 0, d = d + Math.imul(y, ut) | 0, s = s + Math.imul(y, it) | 0, s = s + Math.imul(R, ut) | 0, g = g + Math.imul(R, it) | 0;
      var Ae = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Ae >>> 26) | 0, Ae &= 67108863, d = Math.imul(_t, pt), s = Math.imul(_t, xt), s = s + Math.imul(yt, pt) | 0, g = Math.imul(yt, xt), d = d + Math.imul(mt, At) | 0, s = s + Math.imul(mt, Et) | 0, s = s + Math.imul(wt, At) | 0, g = g + Math.imul(wt, Et) | 0, d = d + Math.imul(ft, Nt) | 0, s = s + Math.imul(ft, bt) | 0, s = s + Math.imul(et, Nt) | 0, g = g + Math.imul(et, bt) | 0, d = d + Math.imul(j, It) | 0, s = s + Math.imul(j, St) | 0, s = s + Math.imul(X, It) | 0, g = g + Math.imul(X, St) | 0, d = d + Math.imul(k, kt) | 0, s = s + Math.imul(k, Rt) | 0, s = s + Math.imul(C, kt) | 0, g = g + Math.imul(C, Rt) | 0, d = d + Math.imul(c, Pt) | 0, s = s + Math.imul(c, S) | 0, s = s + Math.imul(p, Pt) | 0, g = g + Math.imul(p, S) | 0, d = d + Math.imul(W, L) | 0, s = s + Math.imul(W, Q) | 0, s = s + Math.imul(rt, L) | 0, g = g + Math.imul(rt, Q) | 0, d = d + Math.imul(Y, Z) | 0, s = s + Math.imul(Y, V) | 0, s = s + Math.imul(K, Z) | 0, g = g + Math.imul(K, V) | 0, d = d + Math.imul(T, ut) | 0, s = s + Math.imul(T, it) | 0, s = s + Math.imul(D, ut) | 0, g = g + Math.imul(D, it) | 0, d = d + Math.imul(y, dt) | 0, s = s + Math.imul(y, vt) | 0, s = s + Math.imul(R, dt) | 0, g = g + Math.imul(R, vt) | 0;
      var be = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (be >>> 26) | 0, be &= 67108863, d = Math.imul(_t, At), s = Math.imul(_t, Et), s = s + Math.imul(yt, At) | 0, g = Math.imul(yt, Et), d = d + Math.imul(mt, Nt) | 0, s = s + Math.imul(mt, bt) | 0, s = s + Math.imul(wt, Nt) | 0, g = g + Math.imul(wt, bt) | 0, d = d + Math.imul(ft, It) | 0, s = s + Math.imul(ft, St) | 0, s = s + Math.imul(et, It) | 0, g = g + Math.imul(et, St) | 0, d = d + Math.imul(j, kt) | 0, s = s + Math.imul(j, Rt) | 0, s = s + Math.imul(X, kt) | 0, g = g + Math.imul(X, Rt) | 0, d = d + Math.imul(k, Pt) | 0, s = s + Math.imul(k, S) | 0, s = s + Math.imul(C, Pt) | 0, g = g + Math.imul(C, S) | 0, d = d + Math.imul(c, L) | 0, s = s + Math.imul(c, Q) | 0, s = s + Math.imul(p, L) | 0, g = g + Math.imul(p, Q) | 0, d = d + Math.imul(W, Z) | 0, s = s + Math.imul(W, V) | 0, s = s + Math.imul(rt, Z) | 0, g = g + Math.imul(rt, V) | 0, d = d + Math.imul(Y, ut) | 0, s = s + Math.imul(Y, it) | 0, s = s + Math.imul(K, ut) | 0, g = g + Math.imul(K, it) | 0, d = d + Math.imul(T, dt) | 0, s = s + Math.imul(T, vt) | 0, s = s + Math.imul(D, dt) | 0, g = g + Math.imul(D, vt) | 0;
      var Me = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Me >>> 26) | 0, Me &= 67108863, d = Math.imul(_t, Nt), s = Math.imul(_t, bt), s = s + Math.imul(yt, Nt) | 0, g = Math.imul(yt, bt), d = d + Math.imul(mt, It) | 0, s = s + Math.imul(mt, St) | 0, s = s + Math.imul(wt, It) | 0, g = g + Math.imul(wt, St) | 0, d = d + Math.imul(ft, kt) | 0, s = s + Math.imul(ft, Rt) | 0, s = s + Math.imul(et, kt) | 0, g = g + Math.imul(et, Rt) | 0, d = d + Math.imul(j, Pt) | 0, s = s + Math.imul(j, S) | 0, s = s + Math.imul(X, Pt) | 0, g = g + Math.imul(X, S) | 0, d = d + Math.imul(k, L) | 0, s = s + Math.imul(k, Q) | 0, s = s + Math.imul(C, L) | 0, g = g + Math.imul(C, Q) | 0, d = d + Math.imul(c, Z) | 0, s = s + Math.imul(c, V) | 0, s = s + Math.imul(p, Z) | 0, g = g + Math.imul(p, V) | 0, d = d + Math.imul(W, ut) | 0, s = s + Math.imul(W, it) | 0, s = s + Math.imul(rt, ut) | 0, g = g + Math.imul(rt, it) | 0, d = d + Math.imul(Y, dt) | 0, s = s + Math.imul(Y, vt) | 0, s = s + Math.imul(K, dt) | 0, g = g + Math.imul(K, vt) | 0;
      var _e = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (_e >>> 26) | 0, _e &= 67108863, d = Math.imul(_t, It), s = Math.imul(_t, St), s = s + Math.imul(yt, It) | 0, g = Math.imul(yt, St), d = d + Math.imul(mt, kt) | 0, s = s + Math.imul(mt, Rt) | 0, s = s + Math.imul(wt, kt) | 0, g = g + Math.imul(wt, Rt) | 0, d = d + Math.imul(ft, Pt) | 0, s = s + Math.imul(ft, S) | 0, s = s + Math.imul(et, Pt) | 0, g = g + Math.imul(et, S) | 0, d = d + Math.imul(j, L) | 0, s = s + Math.imul(j, Q) | 0, s = s + Math.imul(X, L) | 0, g = g + Math.imul(X, Q) | 0, d = d + Math.imul(k, Z) | 0, s = s + Math.imul(k, V) | 0, s = s + Math.imul(C, Z) | 0, g = g + Math.imul(C, V) | 0, d = d + Math.imul(c, ut) | 0, s = s + Math.imul(c, it) | 0, s = s + Math.imul(p, ut) | 0, g = g + Math.imul(p, it) | 0, d = d + Math.imul(W, dt) | 0, s = s + Math.imul(W, vt) | 0, s = s + Math.imul(rt, dt) | 0, g = g + Math.imul(rt, vt) | 0;
      var Ee = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Ee >>> 26) | 0, Ee &= 67108863, d = Math.imul(_t, kt), s = Math.imul(_t, Rt), s = s + Math.imul(yt, kt) | 0, g = Math.imul(yt, Rt), d = d + Math.imul(mt, Pt) | 0, s = s + Math.imul(mt, S) | 0, s = s + Math.imul(wt, Pt) | 0, g = g + Math.imul(wt, S) | 0, d = d + Math.imul(ft, L) | 0, s = s + Math.imul(ft, Q) | 0, s = s + Math.imul(et, L) | 0, g = g + Math.imul(et, Q) | 0, d = d + Math.imul(j, Z) | 0, s = s + Math.imul(j, V) | 0, s = s + Math.imul(X, Z) | 0, g = g + Math.imul(X, V) | 0, d = d + Math.imul(k, ut) | 0, s = s + Math.imul(k, it) | 0, s = s + Math.imul(C, ut) | 0, g = g + Math.imul(C, it) | 0, d = d + Math.imul(c, dt) | 0, s = s + Math.imul(c, vt) | 0, s = s + Math.imul(p, dt) | 0, g = g + Math.imul(p, vt) | 0;
      var Ne = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Ne >>> 26) | 0, Ne &= 67108863, d = Math.imul(_t, Pt), s = Math.imul(_t, S), s = s + Math.imul(yt, Pt) | 0, g = Math.imul(yt, S), d = d + Math.imul(mt, L) | 0, s = s + Math.imul(mt, Q) | 0, s = s + Math.imul(wt, L) | 0, g = g + Math.imul(wt, Q) | 0, d = d + Math.imul(ft, Z) | 0, s = s + Math.imul(ft, V) | 0, s = s + Math.imul(et, Z) | 0, g = g + Math.imul(et, V) | 0, d = d + Math.imul(j, ut) | 0, s = s + Math.imul(j, it) | 0, s = s + Math.imul(X, ut) | 0, g = g + Math.imul(X, it) | 0, d = d + Math.imul(k, dt) | 0, s = s + Math.imul(k, vt) | 0, s = s + Math.imul(C, dt) | 0, g = g + Math.imul(C, vt) | 0;
      var Ie = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Ie >>> 26) | 0, Ie &= 67108863, d = Math.imul(_t, L), s = Math.imul(_t, Q), s = s + Math.imul(yt, L) | 0, g = Math.imul(yt, Q), d = d + Math.imul(mt, Z) | 0, s = s + Math.imul(mt, V) | 0, s = s + Math.imul(wt, Z) | 0, g = g + Math.imul(wt, V) | 0, d = d + Math.imul(ft, ut) | 0, s = s + Math.imul(ft, it) | 0, s = s + Math.imul(et, ut) | 0, g = g + Math.imul(et, it) | 0, d = d + Math.imul(j, dt) | 0, s = s + Math.imul(j, vt) | 0, s = s + Math.imul(X, dt) | 0, g = g + Math.imul(X, vt) | 0;
      var Se = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Se >>> 26) | 0, Se &= 67108863, d = Math.imul(_t, Z), s = Math.imul(_t, V), s = s + Math.imul(yt, Z) | 0, g = Math.imul(yt, V), d = d + Math.imul(mt, ut) | 0, s = s + Math.imul(mt, it) | 0, s = s + Math.imul(wt, ut) | 0, g = g + Math.imul(wt, it) | 0, d = d + Math.imul(ft, dt) | 0, s = s + Math.imul(ft, vt) | 0, s = s + Math.imul(et, dt) | 0, g = g + Math.imul(et, vt) | 0;
      var ke = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (ke >>> 26) | 0, ke &= 67108863, d = Math.imul(_t, ut), s = Math.imul(_t, it), s = s + Math.imul(yt, ut) | 0, g = Math.imul(yt, it), d = d + Math.imul(mt, dt) | 0, s = s + Math.imul(mt, vt) | 0, s = s + Math.imul(wt, dt) | 0, g = g + Math.imul(wt, vt) | 0;
      var Re = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Re >>> 26) | 0, Re &= 67108863, d = Math.imul(_t, dt), s = Math.imul(_t, vt), s = s + Math.imul(yt, dt) | 0, g = Math.imul(yt, vt);
      var Pe = (M + d | 0) + ((s & 8191) << 13) | 0;
      return M = (g + (s >>> 13) | 0) + (Pe >>> 26) | 0, Pe &= 67108863, A[0] = ur, A[1] = Zt, A[2] = kr, A[3] = Rr, A[4] = Pr, A[5] = we, A[6] = ye, A[7] = xe, A[8] = Ae, A[9] = be, A[10] = Me, A[11] = _e, A[12] = Ee, A[13] = Ne, A[14] = Ie, A[15] = Se, A[16] = ke, A[17] = Re, A[18] = Pe, M !== 0 && (A[19] = M, h.length++), h;
    };
    Math.imul || ($ = G);
    function tt(w, n, a) {
      a.negative = n.negative ^ w.negative, a.length = w.length + n.length;
      for (var h = 0, v = 0, m = 0; m < a.length - 1; m++) {
        var A = v;
        v = 0;
        for (var M = h & 67108863, d = Math.min(m, n.length - 1), s = Math.max(0, m - w.length + 1); s <= d; s++) {
          var g = m - s, H = w.words[g] | 0, y = n.words[s] | 0, R = H * y, F = R & 67108863;
          A = A + (R / 67108864 | 0) | 0, F = F + M | 0, M = F & 67108863, A = A + (F >>> 26) | 0, v += A >>> 26, A &= 67108863;
        }
        a.words[m] = M, h = A, A = v;
      }
      return h !== 0 ? a.words[m] = h : a.length--, a._strip();
    }
    function gt(w, n, a) {
      return tt(w, n, a);
    }
    o.prototype.mulTo = function(n, a) {
      var h, v = this.length + n.length;
      return this.length === 10 && n.length === 10 ? h = $(this, n, a) : v < 63 ? h = G(this, n, a) : v < 1024 ? h = tt(this, n, a) : h = gt(this, n, a), h;
    }, o.prototype.mul = function(n) {
      var a = new o(null);
      return a.words = new Array(this.length + n.length), this.mulTo(n, a);
    }, o.prototype.mulf = function(n) {
      var a = new o(null);
      return a.words = new Array(this.length + n.length), gt(this, n, a);
    }, o.prototype.imul = function(n) {
      return this.clone().mulTo(n, this);
    }, o.prototype.imuln = function(n) {
      var a = n < 0;
      a && (n = -n), i(typeof n == "number"), i(n < 67108864);
      for (var h = 0, v = 0; v < this.length; v++) {
        var m = (this.words[v] | 0) * n, A = (m & 67108863) + (h & 67108863);
        h >>= 26, h += m / 67108864 | 0, h += A >>> 26, this.words[v] = A & 67108863;
      }
      return h !== 0 && (this.words[v] = h, this.length++), a ? this.ineg() : this;
    }, o.prototype.muln = function(n) {
      return this.clone().imuln(n);
    }, o.prototype.sqr = function() {
      return this.mul(this);
    }, o.prototype.isqr = function() {
      return this.imul(this.clone());
    }, o.prototype.pow = function(n) {
      var a = ot(n);
      if (a.length === 0)
        return new o(1);
      for (var h = this, v = 0; v < a.length && a[v] === 0; v++, h = h.sqr())
        ;
      if (++v < a.length)
        for (var m = h.sqr(); v < a.length; v++, m = m.sqr())
          a[v] !== 0 && (h = h.mul(m));
      return h;
    }, o.prototype.iushln = function(n) {
      i(typeof n == "number" && n >= 0);
      var a = n % 26, h = (n - a) / 26, v = 67108863 >>> 26 - a << 26 - a, m;
      if (a !== 0) {
        var A = 0;
        for (m = 0; m < this.length; m++) {
          var M = this.words[m] & v, d = (this.words[m] | 0) - M << a;
          this.words[m] = d | A, A = M >>> 26 - a;
        }
        A && (this.words[m] = A, this.length++);
      }
      if (h !== 0) {
        for (m = this.length - 1; m >= 0; m--)
          this.words[m + h] = this.words[m];
        for (m = 0; m < h; m++)
          this.words[m] = 0;
        this.length += h;
      }
      return this._strip();
    }, o.prototype.ishln = function(n) {
      return i(this.negative === 0), this.iushln(n);
    }, o.prototype.iushrn = function(n, a, h) {
      i(typeof n == "number" && n >= 0);
      var v;
      a ? v = (a - a % 26) / 26 : v = 0;
      var m = n % 26, A = Math.min((n - m) / 26, this.length), M = 67108863 ^ 67108863 >>> m << m, d = h;
      if (v -= A, v = Math.max(0, v), d) {
        for (var s = 0; s < A; s++)
          d.words[s] = this.words[s];
        d.length = A;
      }
      if (A !== 0)
        if (this.length > A)
          for (this.length -= A, s = 0; s < this.length; s++)
            this.words[s] = this.words[s + A];
        else
          this.words[0] = 0, this.length = 1;
      var g = 0;
      for (s = this.length - 1; s >= 0 && (g !== 0 || s >= v); s--) {
        var H = this.words[s] | 0;
        this.words[s] = g << 26 - m | H >>> m, g = H & M;
      }
      return d && g !== 0 && (d.words[d.length++] = g), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, o.prototype.ishrn = function(n, a, h) {
      return i(this.negative === 0), this.iushrn(n, a, h);
    }, o.prototype.shln = function(n) {
      return this.clone().ishln(n);
    }, o.prototype.ushln = function(n) {
      return this.clone().iushln(n);
    }, o.prototype.shrn = function(n) {
      return this.clone().ishrn(n);
    }, o.prototype.ushrn = function(n) {
      return this.clone().iushrn(n);
    }, o.prototype.testn = function(n) {
      i(typeof n == "number" && n >= 0);
      var a = n % 26, h = (n - a) / 26, v = 1 << a;
      if (this.length <= h)
        return !1;
      var m = this.words[h];
      return !!(m & v);
    }, o.prototype.imaskn = function(n) {
      i(typeof n == "number" && n >= 0);
      var a = n % 26, h = (n - a) / 26;
      if (i(this.negative === 0, "imaskn works only with positive numbers"), this.length <= h)
        return this;
      if (a !== 0 && h++, this.length = Math.min(h, this.length), a !== 0) {
        var v = 67108863 ^ 67108863 >>> a << a;
        this.words[this.length - 1] &= v;
      }
      return this._strip();
    }, o.prototype.maskn = function(n) {
      return this.clone().imaskn(n);
    }, o.prototype.iaddn = function(n) {
      return i(typeof n == "number"), i(n < 67108864), n < 0 ? this.isubn(-n) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= n ? (this.words[0] = n - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(n), this.negative = 1, this) : this._iaddn(n);
    }, o.prototype._iaddn = function(n) {
      this.words[0] += n;
      for (var a = 0; a < this.length && this.words[a] >= 67108864; a++)
        this.words[a] -= 67108864, a === this.length - 1 ? this.words[a + 1] = 1 : this.words[a + 1]++;
      return this.length = Math.max(this.length, a + 1), this;
    }, o.prototype.isubn = function(n) {
      if (i(typeof n == "number"), i(n < 67108864), n < 0)
        return this.iaddn(-n);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(n), this.negative = 1, this;
      if (this.words[0] -= n, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var a = 0; a < this.length && this.words[a] < 0; a++)
          this.words[a] += 67108864, this.words[a + 1] -= 1;
      return this._strip();
    }, o.prototype.addn = function(n) {
      return this.clone().iaddn(n);
    }, o.prototype.subn = function(n) {
      return this.clone().isubn(n);
    }, o.prototype.iabs = function() {
      return this.negative = 0, this;
    }, o.prototype.abs = function() {
      return this.clone().iabs();
    }, o.prototype._ishlnsubmul = function(n, a, h) {
      var v = n.length + h, m;
      this._expand(v);
      var A, M = 0;
      for (m = 0; m < n.length; m++) {
        A = (this.words[m + h] | 0) + M;
        var d = (n.words[m] | 0) * a;
        A -= d & 67108863, M = (A >> 26) - (d / 67108864 | 0), this.words[m + h] = A & 67108863;
      }
      for (; m < this.length - h; m++)
        A = (this.words[m + h] | 0) + M, M = A >> 26, this.words[m + h] = A & 67108863;
      if (M === 0)
        return this._strip();
      for (i(M === -1), M = 0, m = 0; m < this.length; m++)
        A = -(this.words[m] | 0) + M, M = A >> 26, this.words[m] = A & 67108863;
      return this.negative = 1, this._strip();
    }, o.prototype._wordDiv = function(n, a) {
      var h = this.length - n.length, v = this.clone(), m = n, A = m.words[m.length - 1] | 0, M = this._countBits(A);
      h = 26 - M, h !== 0 && (m = m.ushln(h), v.iushln(h), A = m.words[m.length - 1] | 0);
      var d = v.length - m.length, s;
      if (a !== "mod") {
        s = new o(null), s.length = d + 1, s.words = new Array(s.length);
        for (var g = 0; g < s.length; g++)
          s.words[g] = 0;
      }
      var H = v.clone()._ishlnsubmul(m, 1, d);
      H.negative === 0 && (v = H, s && (s.words[d] = 1));
      for (var y = d - 1; y >= 0; y--) {
        var R = (v.words[m.length + y] | 0) * 67108864 + (v.words[m.length + y - 1] | 0);
        for (R = Math.min(R / A | 0, 67108863), v._ishlnsubmul(m, R, y); v.negative !== 0; )
          R--, v.negative = 0, v._ishlnsubmul(m, 1, y), v.isZero() || (v.negative ^= 1);
        s && (s.words[y] = R);
      }
      return s && s._strip(), v._strip(), a !== "div" && h !== 0 && v.iushrn(h), {
        div: s || null,
        mod: v
      };
    }, o.prototype.divmod = function(n, a, h) {
      if (i(!n.isZero()), this.isZero())
        return {
          div: new o(0),
          mod: new o(0)
        };
      var v, m, A;
      return this.negative !== 0 && n.negative === 0 ? (A = this.neg().divmod(n, a), a !== "mod" && (v = A.div.neg()), a !== "div" && (m = A.mod.neg(), h && m.negative !== 0 && m.iadd(n)), {
        div: v,
        mod: m
      }) : this.negative === 0 && n.negative !== 0 ? (A = this.divmod(n.neg(), a), a !== "mod" && (v = A.div.neg()), {
        div: v,
        mod: A.mod
      }) : this.negative & n.negative ? (A = this.neg().divmod(n.neg(), a), a !== "div" && (m = A.mod.neg(), h && m.negative !== 0 && m.isub(n)), {
        div: A.div,
        mod: m
      }) : n.length > this.length || this.cmp(n) < 0 ? {
        div: new o(0),
        mod: this
      } : n.length === 1 ? a === "div" ? {
        div: this.divn(n.words[0]),
        mod: null
      } : a === "mod" ? {
        div: null,
        mod: new o(this.modrn(n.words[0]))
      } : {
        div: this.divn(n.words[0]),
        mod: new o(this.modrn(n.words[0]))
      } : this._wordDiv(n, a);
    }, o.prototype.div = function(n) {
      return this.divmod(n, "div", !1).div;
    }, o.prototype.mod = function(n) {
      return this.divmod(n, "mod", !1).mod;
    }, o.prototype.umod = function(n) {
      return this.divmod(n, "mod", !0).mod;
    }, o.prototype.divRound = function(n) {
      var a = this.divmod(n);
      if (a.mod.isZero())
        return a.div;
      var h = a.div.negative !== 0 ? a.mod.isub(n) : a.mod, v = n.ushrn(1), m = n.andln(1), A = h.cmp(v);
      return A < 0 || m === 1 && A === 0 ? a.div : a.div.negative !== 0 ? a.div.isubn(1) : a.div.iaddn(1);
    }, o.prototype.modrn = function(n) {
      var a = n < 0;
      a && (n = -n), i(n <= 67108863);
      for (var h = (1 << 26) % n, v = 0, m = this.length - 1; m >= 0; m--)
        v = (h * v + (this.words[m] | 0)) % n;
      return a ? -v : v;
    }, o.prototype.modn = function(n) {
      return this.modrn(n);
    }, o.prototype.idivn = function(n) {
      var a = n < 0;
      a && (n = -n), i(n <= 67108863);
      for (var h = 0, v = this.length - 1; v >= 0; v--) {
        var m = (this.words[v] | 0) + h * 67108864;
        this.words[v] = m / n | 0, h = m % n;
      }
      return this._strip(), a ? this.ineg() : this;
    }, o.prototype.divn = function(n) {
      return this.clone().idivn(n);
    }, o.prototype.egcd = function(n) {
      i(n.negative === 0), i(!n.isZero());
      var a = this, h = n.clone();
      a.negative !== 0 ? a = a.umod(n) : a = a.clone();
      for (var v = new o(1), m = new o(0), A = new o(0), M = new o(1), d = 0; a.isEven() && h.isEven(); )
        a.iushrn(1), h.iushrn(1), ++d;
      for (var s = h.clone(), g = a.clone(); !a.isZero(); ) {
        for (var H = 0, y = 1; !(a.words[0] & y) && H < 26; ++H, y <<= 1)
          ;
        if (H > 0)
          for (a.iushrn(H); H-- > 0; )
            (v.isOdd() || m.isOdd()) && (v.iadd(s), m.isub(g)), v.iushrn(1), m.iushrn(1);
        for (var R = 0, F = 1; !(h.words[0] & F) && R < 26; ++R, F <<= 1)
          ;
        if (R > 0)
          for (h.iushrn(R); R-- > 0; )
            (A.isOdd() || M.isOdd()) && (A.iadd(s), M.isub(g)), A.iushrn(1), M.iushrn(1);
        a.cmp(h) >= 0 ? (a.isub(h), v.isub(A), m.isub(M)) : (h.isub(a), A.isub(v), M.isub(m));
      }
      return {
        a: A,
        b: M,
        gcd: h.iushln(d)
      };
    }, o.prototype._invmp = function(n) {
      i(n.negative === 0), i(!n.isZero());
      var a = this, h = n.clone();
      a.negative !== 0 ? a = a.umod(n) : a = a.clone();
      for (var v = new o(1), m = new o(0), A = h.clone(); a.cmpn(1) > 0 && h.cmpn(1) > 0; ) {
        for (var M = 0, d = 1; !(a.words[0] & d) && M < 26; ++M, d <<= 1)
          ;
        if (M > 0)
          for (a.iushrn(M); M-- > 0; )
            v.isOdd() && v.iadd(A), v.iushrn(1);
        for (var s = 0, g = 1; !(h.words[0] & g) && s < 26; ++s, g <<= 1)
          ;
        if (s > 0)
          for (h.iushrn(s); s-- > 0; )
            m.isOdd() && m.iadd(A), m.iushrn(1);
        a.cmp(h) >= 0 ? (a.isub(h), v.isub(m)) : (h.isub(a), m.isub(v));
      }
      var H;
      return a.cmpn(1) === 0 ? H = v : H = m, H.cmpn(0) < 0 && H.iadd(n), H;
    }, o.prototype.gcd = function(n) {
      if (this.isZero())
        return n.abs();
      if (n.isZero())
        return this.abs();
      var a = this.clone(), h = n.clone();
      a.negative = 0, h.negative = 0;
      for (var v = 0; a.isEven() && h.isEven(); v++)
        a.iushrn(1), h.iushrn(1);
      do {
        for (; a.isEven(); )
          a.iushrn(1);
        for (; h.isEven(); )
          h.iushrn(1);
        var m = a.cmp(h);
        if (m < 0) {
          var A = a;
          a = h, h = A;
        } else if (m === 0 || h.cmpn(1) === 0)
          break;
        a.isub(h);
      } while (!0);
      return h.iushln(v);
    }, o.prototype.invm = function(n) {
      return this.egcd(n).a.umod(n);
    }, o.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, o.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, o.prototype.andln = function(n) {
      return this.words[0] & n;
    }, o.prototype.bincn = function(n) {
      i(typeof n == "number");
      var a = n % 26, h = (n - a) / 26, v = 1 << a;
      if (this.length <= h)
        return this._expand(h + 1), this.words[h] |= v, this;
      for (var m = v, A = h; m !== 0 && A < this.length; A++) {
        var M = this.words[A] | 0;
        M += m, m = M >>> 26, M &= 67108863, this.words[A] = M;
      }
      return m !== 0 && (this.words[A] = m, this.length++), this;
    }, o.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, o.prototype.cmpn = function(n) {
      var a = n < 0;
      if (this.negative !== 0 && !a)
        return -1;
      if (this.negative === 0 && a)
        return 1;
      this._strip();
      var h;
      if (this.length > 1)
        h = 1;
      else {
        a && (n = -n), i(n <= 67108863, "Number is too big");
        var v = this.words[0] | 0;
        h = v === n ? 0 : v < n ? -1 : 1;
      }
      return this.negative !== 0 ? -h | 0 : h;
    }, o.prototype.cmp = function(n) {
      if (this.negative !== 0 && n.negative === 0)
        return -1;
      if (this.negative === 0 && n.negative !== 0)
        return 1;
      var a = this.ucmp(n);
      return this.negative !== 0 ? -a | 0 : a;
    }, o.prototype.ucmp = function(n) {
      if (this.length > n.length)
        return 1;
      if (this.length < n.length)
        return -1;
      for (var a = 0, h = this.length - 1; h >= 0; h--) {
        var v = this.words[h] | 0, m = n.words[h] | 0;
        if (v !== m) {
          v < m ? a = -1 : v > m && (a = 1);
          break;
        }
      }
      return a;
    }, o.prototype.gtn = function(n) {
      return this.cmpn(n) === 1;
    }, o.prototype.gt = function(n) {
      return this.cmp(n) === 1;
    }, o.prototype.gten = function(n) {
      return this.cmpn(n) >= 0;
    }, o.prototype.gte = function(n) {
      return this.cmp(n) >= 0;
    }, o.prototype.ltn = function(n) {
      return this.cmpn(n) === -1;
    }, o.prototype.lt = function(n) {
      return this.cmp(n) === -1;
    }, o.prototype.lten = function(n) {
      return this.cmpn(n) <= 0;
    }, o.prototype.lte = function(n) {
      return this.cmp(n) <= 0;
    }, o.prototype.eqn = function(n) {
      return this.cmpn(n) === 0;
    }, o.prototype.eq = function(n) {
      return this.cmp(n) === 0;
    }, o.red = function(n) {
      return new nt(n);
    }, o.prototype.toRed = function(n) {
      return i(!this.red, "Already a number in reduction context"), i(this.negative === 0, "red works only with positives"), n.convertTo(this)._forceRed(n);
    }, o.prototype.fromRed = function() {
      return i(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, o.prototype._forceRed = function(n) {
      return this.red = n, this;
    }, o.prototype.forceRed = function(n) {
      return i(!this.red, "Already a number in reduction context"), this._forceRed(n);
    }, o.prototype.redAdd = function(n) {
      return i(this.red, "redAdd works only with red numbers"), this.red.add(this, n);
    }, o.prototype.redIAdd = function(n) {
      return i(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, n);
    }, o.prototype.redSub = function(n) {
      return i(this.red, "redSub works only with red numbers"), this.red.sub(this, n);
    }, o.prototype.redISub = function(n) {
      return i(this.red, "redISub works only with red numbers"), this.red.isub(this, n);
    }, o.prototype.redShl = function(n) {
      return i(this.red, "redShl works only with red numbers"), this.red.shl(this, n);
    }, o.prototype.redMul = function(n) {
      return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, n), this.red.mul(this, n);
    }, o.prototype.redIMul = function(n) {
      return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, n), this.red.imul(this, n);
    }, o.prototype.redSqr = function() {
      return i(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, o.prototype.redISqr = function() {
      return i(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, o.prototype.redSqrt = function() {
      return i(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, o.prototype.redInvm = function() {
      return i(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, o.prototype.redNeg = function() {
      return i(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, o.prototype.redPow = function(n) {
      return i(this.red && !n.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, n);
    };
    var st = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function lt(w, n) {
      this.name = w, this.p = new o(n, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    lt.prototype._tmp = function() {
      var n = new o(null);
      return n.words = new Array(Math.ceil(this.n / 13)), n;
    }, lt.prototype.ireduce = function(n) {
      var a = n, h;
      do
        this.split(a, this.tmp), a = this.imulK(a), a = a.iadd(this.tmp), h = a.bitLength();
      while (h > this.n);
      var v = h < this.n ? -1 : a.ucmp(this.p);
      return v === 0 ? (a.words[0] = 0, a.length = 1) : v > 0 ? a.isub(this.p) : a.strip !== void 0 ? a.strip() : a._strip(), a;
    }, lt.prototype.split = function(n, a) {
      n.iushrn(this.n, 0, a);
    }, lt.prototype.imulK = function(n) {
      return n.imul(this.k);
    };
    function qt() {
      lt.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    f(qt, lt), qt.prototype.split = function(n, a) {
      for (var h = 4194303, v = Math.min(n.length, 9), m = 0; m < v; m++)
        a.words[m] = n.words[m];
      if (a.length = v, n.length <= 9) {
        n.words[0] = 0, n.length = 1;
        return;
      }
      var A = n.words[9];
      for (a.words[a.length++] = A & h, m = 10; m < n.length; m++) {
        var M = n.words[m] | 0;
        n.words[m - 10] = (M & h) << 4 | A >>> 22, A = M;
      }
      A >>>= 22, n.words[m - 10] = A, A === 0 && n.length > 10 ? n.length -= 10 : n.length -= 9;
    }, qt.prototype.imulK = function(n) {
      n.words[n.length] = 0, n.words[n.length + 1] = 0, n.length += 2;
      for (var a = 0, h = 0; h < n.length; h++) {
        var v = n.words[h] | 0;
        a += v * 977, n.words[h] = a & 67108863, a = v * 64 + (a / 67108864 | 0);
      }
      return n.words[n.length - 1] === 0 && (n.length--, n.words[n.length - 1] === 0 && n.length--), n;
    };
    function Mt() {
      lt.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    f(Mt, lt);
    function Qt() {
      lt.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    f(Qt, lt);
    function Ht() {
      lt.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    f(Ht, lt), Ht.prototype.imulK = function(n) {
      for (var a = 0, h = 0; h < n.length; h++) {
        var v = (n.words[h] | 0) * 19 + a, m = v & 67108863;
        v >>>= 26, n.words[h] = m, a = v;
      }
      return a !== 0 && (n.words[n.length++] = a), n;
    }, o._prime = function(n) {
      if (st[n])
        return st[n];
      var a;
      if (n === "k256")
        a = new qt();
      else if (n === "p224")
        a = new Mt();
      else if (n === "p192")
        a = new Qt();
      else if (n === "p25519")
        a = new Ht();
      else
        throw new Error("Unknown prime " + n);
      return st[n] = a, a;
    };
    function nt(w) {
      if (typeof w == "string") {
        var n = o._prime(w);
        this.m = n.p, this.prime = n;
      } else
        i(w.gtn(1), "modulus must be greater than 1"), this.m = w, this.prime = null;
    }
    nt.prototype._verify1 = function(n) {
      i(n.negative === 0, "red works only with positives"), i(n.red, "red works only with red numbers");
    }, nt.prototype._verify2 = function(n, a) {
      i((n.negative | a.negative) === 0, "red works only with positives"), i(
        n.red && n.red === a.red,
        "red works only with red numbers"
      );
    }, nt.prototype.imod = function(n) {
      return this.prime ? this.prime.ireduce(n)._forceRed(this) : (_(n, n.umod(this.m)._forceRed(this)), n);
    }, nt.prototype.neg = function(n) {
      return n.isZero() ? n.clone() : this.m.sub(n)._forceRed(this);
    }, nt.prototype.add = function(n, a) {
      this._verify2(n, a);
      var h = n.add(a);
      return h.cmp(this.m) >= 0 && h.isub(this.m), h._forceRed(this);
    }, nt.prototype.iadd = function(n, a) {
      this._verify2(n, a);
      var h = n.iadd(a);
      return h.cmp(this.m) >= 0 && h.isub(this.m), h;
    }, nt.prototype.sub = function(n, a) {
      this._verify2(n, a);
      var h = n.sub(a);
      return h.cmpn(0) < 0 && h.iadd(this.m), h._forceRed(this);
    }, nt.prototype.isub = function(n, a) {
      this._verify2(n, a);
      var h = n.isub(a);
      return h.cmpn(0) < 0 && h.iadd(this.m), h;
    }, nt.prototype.shl = function(n, a) {
      return this._verify1(n), this.imod(n.ushln(a));
    }, nt.prototype.imul = function(n, a) {
      return this._verify2(n, a), this.imod(n.imul(a));
    }, nt.prototype.mul = function(n, a) {
      return this._verify2(n, a), this.imod(n.mul(a));
    }, nt.prototype.isqr = function(n) {
      return this.imul(n, n.clone());
    }, nt.prototype.sqr = function(n) {
      return this.mul(n, n);
    }, nt.prototype.sqrt = function(n) {
      if (n.isZero())
        return n.clone();
      var a = this.m.andln(3);
      if (i(a % 2 === 1), a === 3) {
        var h = this.m.add(new o(1)).iushrn(2);
        return this.pow(n, h);
      }
      for (var v = this.m.subn(1), m = 0; !v.isZero() && v.andln(1) === 0; )
        m++, v.iushrn(1);
      i(!v.isZero());
      var A = new o(1).toRed(this), M = A.redNeg(), d = this.m.subn(1).iushrn(1), s = this.m.bitLength();
      for (s = new o(2 * s * s).toRed(this); this.pow(s, d).cmp(M) !== 0; )
        s.redIAdd(M);
      for (var g = this.pow(s, v), H = this.pow(n, v.addn(1).iushrn(1)), y = this.pow(n, v), R = m; y.cmp(A) !== 0; ) {
        for (var F = y, T = 0; F.cmp(A) !== 0; T++)
          F = F.redSqr();
        i(T < R);
        var D = this.pow(g, new o(1).iushln(R - T - 1));
        H = H.redMul(D), g = D.redSqr(), y = y.redMul(g), R = T;
      }
      return H;
    }, nt.prototype.invm = function(n) {
      var a = n._invmp(this.m);
      return a.negative !== 0 ? (a.negative = 0, this.imod(a).redNeg()) : this.imod(a);
    }, nt.prototype.pow = function(n, a) {
      if (a.isZero())
        return new o(1).toRed(this);
      if (a.cmpn(1) === 0)
        return n.clone();
      var h = 4, v = new Array(1 << h);
      v[0] = new o(1).toRed(this), v[1] = n;
      for (var m = 2; m < v.length; m++)
        v[m] = this.mul(v[m - 1], n);
      var A = v[0], M = 0, d = 0, s = a.bitLength() % 26;
      for (s === 0 && (s = 26), m = a.length - 1; m >= 0; m--) {
        for (var g = a.words[m], H = s - 1; H >= 0; H--) {
          var y = g >> H & 1;
          if (A !== v[0] && (A = this.sqr(A)), y === 0 && M === 0) {
            d = 0;
            continue;
          }
          M <<= 1, M |= y, d++, !(d !== h && (m !== 0 || H !== 0)) && (A = this.mul(A, v[M]), d = 0, M = 0);
        }
        s = 26;
      }
      return A;
    }, nt.prototype.convertTo = function(n) {
      var a = n.umod(this.m);
      return a === n ? a.clone() : a;
    }, nt.prototype.convertFrom = function(n) {
      var a = n.clone();
      return a.red = null, a;
    }, o.mont = function(n) {
      return new Lt(n);
    };
    function Lt(w) {
      nt.call(this, w), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    f(Lt, nt), Lt.prototype.convertTo = function(n) {
      return this.imod(n.ushln(this.shift));
    }, Lt.prototype.convertFrom = function(n) {
      var a = this.imod(n.mul(this.rinv));
      return a.red = null, a;
    }, Lt.prototype.imul = function(n, a) {
      if (n.isZero() || a.isZero())
        return n.words[0] = 0, n.length = 1, n;
      var h = n.imul(a), v = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), m = h.isub(v).iushrn(this.shift), A = m;
      return m.cmp(this.m) >= 0 ? A = m.isub(this.m) : m.cmpn(0) < 0 && (A = m.iadd(this.m)), A._forceRed(this);
    }, Lt.prototype.mul = function(n, a) {
      if (n.isZero() || a.isZero())
        return new o(0)._forceRed(this);
      var h = n.mul(a), v = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), m = h.isub(v).iushrn(this.shift), A = m;
      return m.cmp(this.m) >= 0 ? A = m.isub(this.m) : m.cmpn(0) < 0 && (A = m.iadd(this.m)), A._forceRed(this);
    }, Lt.prototype.invm = function(n) {
      var a = this.imod(n._invmp(this.m).mul(this.r2));
      return a._forceRed(this);
    };
  })(e, In);
})(gf);
const mf = vn, wf = "logger/5.7.0";
let Kn = !1, Jn = !1;
const Ai = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 };
let Yn = Ai.default, Wi = null;
function yf() {
  try {
    const e = [];
    if (["NFD", "NFC", "NFKD", "NFKC"].forEach((t) => {
      try {
        if ("test".normalize(t) !== "test")
          throw new Error("bad normalize");
      } catch {
        e.push(t);
      }
    }), e.length)
      throw new Error("missing " + e.join(", "));
    if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769))
      throw new Error("broken implementation");
  } catch (e) {
    return e.message;
  }
  return null;
}
const Qn = yf();
var gn;
(function(e) {
  e.DEBUG = "DEBUG", e.INFO = "INFO", e.WARNING = "WARNING", e.ERROR = "ERROR", e.OFF = "OFF";
})(gn || (gn = {}));
var Gr;
(function(e) {
  e.UNKNOWN_ERROR = "UNKNOWN_ERROR", e.NOT_IMPLEMENTED = "NOT_IMPLEMENTED", e.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION", e.NETWORK_ERROR = "NETWORK_ERROR", e.SERVER_ERROR = "SERVER_ERROR", e.TIMEOUT = "TIMEOUT", e.BUFFER_OVERRUN = "BUFFER_OVERRUN", e.NUMERIC_FAULT = "NUMERIC_FAULT", e.MISSING_NEW = "MISSING_NEW", e.INVALID_ARGUMENT = "INVALID_ARGUMENT", e.MISSING_ARGUMENT = "MISSING_ARGUMENT", e.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT", e.CALL_EXCEPTION = "CALL_EXCEPTION", e.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS", e.NONCE_EXPIRED = "NONCE_EXPIRED", e.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED", e.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT", e.TRANSACTION_REPLACED = "TRANSACTION_REPLACED", e.ACTION_REJECTED = "ACTION_REJECTED";
})(Gr || (Gr = {}));
const Wn = "0123456789abcdef";
class U {
  constructor(t) {
    Object.defineProperty(this, "version", {
      enumerable: !0,
      value: t,
      writable: !1
    });
  }
  _log(t, r) {
    const i = t.toLowerCase();
    Ai[i] == null && this.throwArgumentError("invalid log level name", "logLevel", t), !(Yn > Ai[i]) && console.log.apply(console, r);
  }
  debug(...t) {
    this._log(U.levels.DEBUG, t);
  }
  info(...t) {
    this._log(U.levels.INFO, t);
  }
  warn(...t) {
    this._log(U.levels.WARNING, t);
  }
  makeError(t, r, i) {
    if (Jn)
      return this.makeError("censored error", r, {});
    r || (r = U.errors.UNKNOWN_ERROR), i || (i = {});
    const f = [];
    Object.keys(i).forEach((x) => {
      const b = i[x];
      try {
        if (b instanceof Uint8Array) {
          let _ = "";
          for (let I = 0; I < b.length; I++)
            _ += Wn[b[I] >> 4], _ += Wn[b[I] & 15];
          f.push(x + "=Uint8Array(0x" + _ + ")");
        } else
          f.push(x + "=" + JSON.stringify(b));
      } catch {
        f.push(x + "=" + JSON.stringify(i[x].toString()));
      }
    }), f.push(`code=${r}`), f.push(`version=${this.version}`);
    const o = t;
    let u = "";
    switch (r) {
      case Gr.NUMERIC_FAULT: {
        u = "NUMERIC_FAULT";
        const x = t;
        switch (x) {
          case "overflow":
          case "underflow":
          case "division-by-zero":
            u += "-" + x;
            break;
          case "negative-power":
          case "negative-width":
            u += "-unsupported";
            break;
          case "unbound-bitwise-result":
            u += "-unbound-result";
            break;
        }
        break;
      }
      case Gr.CALL_EXCEPTION:
      case Gr.INSUFFICIENT_FUNDS:
      case Gr.MISSING_NEW:
      case Gr.NONCE_EXPIRED:
      case Gr.REPLACEMENT_UNDERPRICED:
      case Gr.TRANSACTION_REPLACED:
      case Gr.UNPREDICTABLE_GAS_LIMIT:
        u = r;
        break;
    }
    u && (t += " [ See: https://links.ethers.org/v5-errors-" + u + " ]"), f.length && (t += " (" + f.join(", ") + ")");
    const l = new Error(t);
    return l.reason = o, l.code = r, Object.keys(i).forEach(function(x) {
      l[x] = i[x];
    }), l;
  }
  throwError(t, r, i) {
    throw this.makeError(t, r, i);
  }
  throwArgumentError(t, r, i) {
    return this.throwError(t, U.errors.INVALID_ARGUMENT, {
      argument: r,
      value: i
    });
  }
  assert(t, r, i, f) {
    t || this.throwError(r, i, f);
  }
  assertArgument(t, r, i, f) {
    t || this.throwArgumentError(r, i, f);
  }
  checkNormalize(t) {
    Qn && this.throwError("platform missing String.prototype.normalize", U.errors.UNSUPPORTED_OPERATION, {
      operation: "String.prototype.normalize",
      form: Qn
    });
  }
  checkSafeUint53(t, r) {
    typeof t == "number" && (r == null && (r = "value not safe"), (t < 0 || t >= 9007199254740991) && this.throwError(r, U.errors.NUMERIC_FAULT, {
      operation: "checkSafeInteger",
      fault: "out-of-safe-range",
      value: t
    }), t % 1 && this.throwError(r, U.errors.NUMERIC_FAULT, {
      operation: "checkSafeInteger",
      fault: "non-integer",
      value: t
    }));
  }
  checkArgumentCount(t, r, i) {
    i ? i = ": " + i : i = "", t < r && this.throwError("missing argument" + i, U.errors.MISSING_ARGUMENT, {
      count: t,
      expectedCount: r
    }), t > r && this.throwError("too many arguments" + i, U.errors.UNEXPECTED_ARGUMENT, {
      count: t,
      expectedCount: r
    });
  }
  checkNew(t, r) {
    (t === Object || t == null) && this.throwError("missing new", U.errors.MISSING_NEW, { name: r.name });
  }
  checkAbstract(t, r) {
    t === r ? this.throwError("cannot instantiate abstract class " + JSON.stringify(r.name) + " directly; use a sub-class", U.errors.UNSUPPORTED_OPERATION, { name: t.name, operation: "new" }) : (t === Object || t == null) && this.throwError("missing new", U.errors.MISSING_NEW, { name: r.name });
  }
  static globalLogger() {
    return Wi || (Wi = new U(wf)), Wi;
  }
  static setCensorship(t, r) {
    if (!t && r && this.globalLogger().throwError("cannot permanently disable censorship", U.errors.UNSUPPORTED_OPERATION, {
      operation: "setCensorship"
    }), Kn) {
      if (!t)
        return;
      this.globalLogger().throwError("error censorship permanent", U.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }
    Jn = !!t, Kn = !!r;
  }
  static setLogLevel(t) {
    const r = Ai[t.toLowerCase()];
    if (r == null) {
      U.globalLogger().warn("invalid log level - " + t);
      return;
    }
    Yn = r;
  }
  static from(t) {
    return new U(t);
  }
}
U.errors = Gr;
U.levels = gn;
const xf = "bytes/5.7.0", $t = new U(xf);
function zo(e) {
  return !!e.toHexString;
}
function Je(e) {
  return e.slice || (e.slice = function() {
    const t = Array.prototype.slice.call(arguments);
    return Je(new Uint8Array(Array.prototype.slice.apply(e, t)));
  }), e;
}
function Rn(e) {
  return Vt(e) && !(e.length % 2) || Oi(e);
}
function jn(e) {
  return typeof e == "number" && e == e && e % 1 === 0;
}
function Oi(e) {
  if (e == null)
    return !1;
  if (e.constructor === Uint8Array)
    return !0;
  if (typeof e == "string" || !jn(e.length) || e.length < 0)
    return !1;
  for (let t = 0; t < e.length; t++) {
    const r = e[t];
    if (!jn(r) || r < 0 || r >= 256)
      return !1;
  }
  return !0;
}
function Ut(e, t) {
  if (t || (t = {}), typeof e == "number") {
    $t.checkSafeUint53(e, "invalid arrayify value");
    const r = [];
    for (; e; )
      r.unshift(e & 255), e = parseInt(String(e / 256));
    return r.length === 0 && r.push(0), Je(new Uint8Array(r));
  }
  if (t.allowMissingPrefix && typeof e == "string" && e.substring(0, 2) !== "0x" && (e = "0x" + e), zo(e) && (e = e.toHexString()), Vt(e)) {
    let r = e.substring(2);
    r.length % 2 && (t.hexPad === "left" ? r = "0" + r : t.hexPad === "right" ? r += "0" : $t.throwArgumentError("hex data is odd-length", "value", e));
    const i = [];
    for (let f = 0; f < r.length; f += 2)
      i.push(parseInt(r.substring(f, f + 2), 16));
    return Je(new Uint8Array(i));
  }
  return Oi(e) ? Je(new Uint8Array(e)) : $t.throwArgumentError("invalid arrayify value", "value", e);
}
function Ce(e) {
  const t = e.map((f) => Ut(f)), r = t.reduce((f, o) => f + o.length, 0), i = new Uint8Array(r);
  return t.reduce((f, o) => (i.set(o, f), f + o.length), 0), Je(i);
}
function Qe(e) {
  let t = Ut(e);
  if (t.length === 0)
    return t;
  let r = 0;
  for (; r < t.length && t[r] === 0; )
    r++;
  return r && (t = t.slice(r)), t;
}
function Af(e, t) {
  e = Ut(e), e.length > t && $t.throwArgumentError("value out of range", "value", arguments[0]);
  const r = new Uint8Array(t);
  return r.set(e, t - e.length), Je(r);
}
function Vt(e, t) {
  return !(typeof e != "string" || !e.match(/^0x[0-9A-Fa-f]*$/) || t && e.length !== 2 + 2 * t);
}
const ji = "0123456789abcdef";
function Tt(e, t) {
  if (t || (t = {}), typeof e == "number") {
    $t.checkSafeUint53(e, "invalid hexlify value");
    let r = "";
    for (; e; )
      r = ji[e & 15] + r, e = Math.floor(e / 16);
    return r.length ? (r.length % 2 && (r = "0" + r), "0x" + r) : "0x00";
  }
  if (typeof e == "bigint")
    return e = e.toString(16), e.length % 2 ? "0x0" + e : "0x" + e;
  if (t.allowMissingPrefix && typeof e == "string" && e.substring(0, 2) !== "0x" && (e = "0x" + e), zo(e))
    return e.toHexString();
  if (Vt(e))
    return e.length % 2 && (t.hexPad === "left" ? e = "0x0" + e.substring(2) : t.hexPad === "right" ? e += "0" : $t.throwArgumentError("hex data is odd-length", "value", e)), e.toLowerCase();
  if (Oi(e)) {
    let r = "0x";
    for (let i = 0; i < e.length; i++) {
      let f = e[i];
      r += ji[(f & 240) >> 4] + ji[f & 15];
    }
    return r;
  }
  return $t.throwArgumentError("invalid hexlify value", "value", e);
}
function Oe(e) {
  if (typeof e != "string")
    e = Tt(e);
  else if (!Vt(e) || e.length % 2)
    return null;
  return (e.length - 2) / 2;
}
function lr(e, t, r) {
  return typeof e != "string" ? e = Tt(e) : (!Vt(e) || e.length % 2) && $t.throwArgumentError("invalid hexData", "value", e), t = 2 + 2 * t, r != null ? "0x" + e.substring(t, 2 + 2 * r) : "0x" + e.substring(t);
}
function Er(e) {
  let t = "0x";
  return e.forEach((r) => {
    t += Tt(r).substring(2);
  }), t;
}
function Pn(e) {
  const t = bf(Tt(e, { hexPad: "left" }));
  return t === "0x" ? "0x0" : t;
}
function bf(e) {
  typeof e != "string" && (e = Tt(e)), Vt(e) || $t.throwArgumentError("invalid hex string", "value", e), e = e.substring(2);
  let t = 0;
  for (; t < e.length && e[t] === "0"; )
    t++;
  return "0x" + e.substring(t);
}
function er(e, t) {
  for (typeof e != "string" ? e = Tt(e) : Vt(e) || $t.throwArgumentError("invalid hex string", "value", e), e.length > 2 * t + 2 && $t.throwArgumentError("value out of range", "value", arguments[1]); e.length < 2 * t + 2; )
    e = "0x0" + e.substring(2);
  return e;
}
function Fi(e) {
  const t = {
    r: "0x",
    s: "0x",
    _vs: "0x",
    recoveryParam: 0,
    v: 0,
    yParityAndS: "0x",
    compact: "0x"
  };
  if (Rn(e)) {
    let r = Ut(e);
    r.length === 64 ? (t.v = 27 + (r[32] >> 7), r[32] &= 127, t.r = Tt(r.slice(0, 32)), t.s = Tt(r.slice(32, 64))) : r.length === 65 ? (t.r = Tt(r.slice(0, 32)), t.s = Tt(r.slice(32, 64)), t.v = r[64]) : $t.throwArgumentError("invalid signature string", "signature", e), t.v < 27 && (t.v === 0 || t.v === 1 ? t.v += 27 : $t.throwArgumentError("signature invalid v byte", "signature", e)), t.recoveryParam = 1 - t.v % 2, t.recoveryParam && (r[32] |= 128), t._vs = Tt(r.slice(32, 64));
  } else {
    if (t.r = e.r, t.s = e.s, t.v = e.v, t.recoveryParam = e.recoveryParam, t._vs = e._vs, t._vs != null) {
      const f = Af(Ut(t._vs), 32);
      t._vs = Tt(f);
      const o = f[0] >= 128 ? 1 : 0;
      t.recoveryParam == null ? t.recoveryParam = o : t.recoveryParam !== o && $t.throwArgumentError("signature recoveryParam mismatch _vs", "signature", e), f[0] &= 127;
      const u = Tt(f);
      t.s == null ? t.s = u : t.s !== u && $t.throwArgumentError("signature v mismatch _vs", "signature", e);
    }
    if (t.recoveryParam == null)
      t.v == null ? $t.throwArgumentError("signature missing v and recoveryParam", "signature", e) : t.v === 0 || t.v === 1 ? t.recoveryParam = t.v : t.recoveryParam = 1 - t.v % 2;
    else if (t.v == null)
      t.v = 27 + t.recoveryParam;
    else {
      const f = t.v === 0 || t.v === 1 ? t.v : 1 - t.v % 2;
      t.recoveryParam !== f && $t.throwArgumentError("signature recoveryParam mismatch v", "signature", e);
    }
    t.r == null || !Vt(t.r) ? $t.throwArgumentError("signature missing or invalid r", "signature", e) : t.r = er(t.r, 32), t.s == null || !Vt(t.s) ? $t.throwArgumentError("signature missing or invalid s", "signature", e) : t.s = er(t.s, 32);
    const r = Ut(t.s);
    r[0] >= 128 && $t.throwArgumentError("signature s out of range", "signature", e), t.recoveryParam && (r[0] |= 128);
    const i = Tt(r);
    t._vs && (Vt(t._vs) || $t.throwArgumentError("signature invalid _vs", "signature", e), t._vs = er(t._vs, 32)), t._vs == null ? t._vs = i : t._vs !== i && $t.throwArgumentError("signature _vs mismatch v and s", "signature", e);
  }
  return t.yParityAndS = t._vs, t.compact = t.r + t.yParityAndS.substring(2), t;
}
const Mf = "bignumber/5.7.0";
var Ni = mf.BN;
const ne = new U(Mf), Vi = {}, Vn = 9007199254740991;
let Xn = !1;
class ct {
  constructor(t, r) {
    t !== Vi && ne.throwError("cannot call constructor directly; use BigNumber.from", U.errors.UNSUPPORTED_OPERATION, {
      operation: "new (BigNumber)"
    }), this._hex = r, this._isBigNumber = !0, Object.freeze(this);
  }
  fromTwos(t) {
    return dr(Kt(this).fromTwos(t));
  }
  toTwos(t) {
    return dr(Kt(this).toTwos(t));
  }
  abs() {
    return this._hex[0] === "-" ? ct.from(this._hex.substring(1)) : this;
  }
  add(t) {
    return dr(Kt(this).add(Kt(t)));
  }
  sub(t) {
    return dr(Kt(this).sub(Kt(t)));
  }
  div(t) {
    return ct.from(t).isZero() && Br("division-by-zero", "div"), dr(Kt(this).div(Kt(t)));
  }
  mul(t) {
    return dr(Kt(this).mul(Kt(t)));
  }
  mod(t) {
    const r = Kt(t);
    return r.isNeg() && Br("division-by-zero", "mod"), dr(Kt(this).umod(r));
  }
  pow(t) {
    const r = Kt(t);
    return r.isNeg() && Br("negative-power", "pow"), dr(Kt(this).pow(r));
  }
  and(t) {
    const r = Kt(t);
    return (this.isNegative() || r.isNeg()) && Br("unbound-bitwise-result", "and"), dr(Kt(this).and(r));
  }
  or(t) {
    const r = Kt(t);
    return (this.isNegative() || r.isNeg()) && Br("unbound-bitwise-result", "or"), dr(Kt(this).or(r));
  }
  xor(t) {
    const r = Kt(t);
    return (this.isNegative() || r.isNeg()) && Br("unbound-bitwise-result", "xor"), dr(Kt(this).xor(r));
  }
  mask(t) {
    return (this.isNegative() || t < 0) && Br("negative-width", "mask"), dr(Kt(this).maskn(t));
  }
  shl(t) {
    return (this.isNegative() || t < 0) && Br("negative-width", "shl"), dr(Kt(this).shln(t));
  }
  shr(t) {
    return (this.isNegative() || t < 0) && Br("negative-width", "shr"), dr(Kt(this).shrn(t));
  }
  eq(t) {
    return Kt(this).eq(Kt(t));
  }
  lt(t) {
    return Kt(this).lt(Kt(t));
  }
  lte(t) {
    return Kt(this).lte(Kt(t));
  }
  gt(t) {
    return Kt(this).gt(Kt(t));
  }
  gte(t) {
    return Kt(this).gte(Kt(t));
  }
  isNegative() {
    return this._hex[0] === "-";
  }
  isZero() {
    return Kt(this).isZero();
  }
  toNumber() {
    try {
      return Kt(this).toNumber();
    } catch {
      Br("overflow", "toNumber", this.toString());
    }
    return null;
  }
  toBigInt() {
    try {
      return BigInt(this.toString());
    } catch {
    }
    return ne.throwError("this platform does not support BigInt", U.errors.UNSUPPORTED_OPERATION, {
      value: this.toString()
    });
  }
  toString() {
    return arguments.length > 0 && (arguments[0] === 10 ? Xn || (Xn = !0, ne.warn("BigNumber.toString does not accept any parameters; base-10 is assumed")) : arguments[0] === 16 ? ne.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", U.errors.UNEXPECTED_ARGUMENT, {}) : ne.throwError("BigNumber.toString does not accept parameters", U.errors.UNEXPECTED_ARGUMENT, {})), Kt(this).toString(10);
  }
  toHexString() {
    return this._hex;
  }
  toJSON(t) {
    return { type: "BigNumber", hex: this.toHexString() };
  }
  static from(t) {
    if (t instanceof ct)
      return t;
    if (typeof t == "string")
      return t.match(/^-?0x[0-9a-f]+$/i) ? new ct(Vi, ci(t)) : t.match(/^-?[0-9]+$/) ? new ct(Vi, ci(new Ni(t))) : ne.throwArgumentError("invalid BigNumber string", "value", t);
    if (typeof t == "number")
      return t % 1 && Br("underflow", "BigNumber.from", t), (t >= Vn || t <= -Vn) && Br("overflow", "BigNumber.from", t), ct.from(String(t));
    const r = t;
    if (typeof r == "bigint")
      return ct.from(r.toString());
    if (Oi(r))
      return ct.from(Tt(r));
    if (r)
      if (r.toHexString) {
        const i = r.toHexString();
        if (typeof i == "string")
          return ct.from(i);
      } else {
        let i = r._hex;
        if (i == null && r.type === "BigNumber" && (i = r.hex), typeof i == "string" && (Vt(i) || i[0] === "-" && Vt(i.substring(1))))
          return ct.from(i);
      }
    return ne.throwArgumentError("invalid BigNumber value", "value", t);
  }
  static isBigNumber(t) {
    return !!(t && t._isBigNumber);
  }
}
function ci(e) {
  if (typeof e != "string")
    return ci(e.toString(16));
  if (e[0] === "-")
    return e = e.substring(1), e[0] === "-" && ne.throwArgumentError("invalid hex", "value", e), e = ci(e), e === "0x00" ? e : "-" + e;
  if (e.substring(0, 2) !== "0x" && (e = "0x" + e), e === "0x")
    return "0x00";
  for (e.length % 2 && (e = "0x0" + e.substring(2)); e.length > 4 && e.substring(0, 4) === "0x00"; )
    e = "0x" + e.substring(4);
  return e;
}
function dr(e) {
  return ct.from(ci(e));
}
function Kt(e) {
  const t = ct.from(e).toHexString();
  return t[0] === "-" ? new Ni("-" + t.substring(3), 16) : new Ni(t.substring(2), 16);
}
function Br(e, t, r) {
  const i = { fault: e, operation: t };
  return r != null && (i.value = r), ne.throwError(e, U.errors.NUMERIC_FAULT, i);
}
function _f(e) {
  return new Ni(e, 36).toString(16);
}
const Ef = "properties/5.7.0";
var Nf = globalThis && globalThis.__awaiter || function(e, t, r, i) {
  function f(o) {
    return o instanceof r ? o : new r(function(u) {
      u(o);
    });
  }
  return new (r || (r = Promise))(function(o, u) {
    function l(_) {
      try {
        b(i.next(_));
      } catch (I) {
        u(I);
      }
    }
    function x(_) {
      try {
        b(i.throw(_));
      } catch (I) {
        u(I);
      }
    }
    function b(_) {
      _.done ? o(_.value) : f(_.value).then(l, x);
    }
    b((i = i.apply(e, t || [])).next());
  });
};
const Ii = new U(Ef);
function Yt(e, t, r) {
  Object.defineProperty(e, t, {
    enumerable: !0,
    value: r,
    writable: !1
  });
}
function fi(e, t) {
  for (let r = 0; r < 32; r++) {
    if (e[t])
      return e[t];
    if (!e.prototype || typeof e.prototype != "object")
      break;
    e = Object.getPrototypeOf(e.prototype).constructor;
  }
  return null;
}
function or(e) {
  return Nf(this, void 0, void 0, function* () {
    const t = Object.keys(e).map((i) => {
      const f = e[i];
      return Promise.resolve(f).then((o) => ({ key: i, value: o }));
    });
    return (yield Promise.all(t)).reduce((i, f) => (i[f.key] = f.value, i), {});
  });
}
function If(e, t) {
  (!e || typeof e != "object") && Ii.throwArgumentError("invalid object", "object", e), Object.keys(e).forEach((r) => {
    t[r] || Ii.throwArgumentError("invalid object key - " + r, "transaction:" + r, e);
  });
}
function pr(e) {
  const t = {};
  for (const r in e)
    t[r] = e[r];
  return t;
}
const Sf = { bigint: !0, boolean: !0, function: !0, number: !0, string: !0 };
function Ho(e) {
  if (e == null || Sf[typeof e])
    return !0;
  if (Array.isArray(e) || typeof e == "object") {
    if (!Object.isFrozen(e))
      return !1;
    const t = Object.keys(e);
    for (let r = 0; r < t.length; r++) {
      let i = null;
      try {
        i = e[t[r]];
      } catch {
        continue;
      }
      if (!Ho(i))
        return !1;
    }
    return !0;
  }
  return Ii.throwArgumentError(`Cannot deepCopy ${typeof e}`, "object", e);
}
function kf(e) {
  if (Ho(e))
    return e;
  if (Array.isArray(e))
    return Object.freeze(e.map((t) => Fe(t)));
  if (typeof e == "object") {
    const t = {};
    for (const r in e) {
      const i = e[r];
      i !== void 0 && Yt(t, r, Fe(i));
    }
    return t;
  }
  return Ii.throwArgumentError(`Cannot deepCopy ${typeof e}`, "object", e);
}
function Fe(e) {
  return kf(e);
}
class Rf {
  constructor(t) {
    for (const r in t)
      this[r] = Fe(t[r]);
  }
}
var mn = {}, Pf = {
  get exports() {
    return mn;
  },
  set exports(e) {
    mn = e;
  }
};
(function(e) {
  (function() {
    var t = "input is invalid type", r = "finalize already called", i = typeof window == "object", f = i ? window : {};
    f.JS_SHA3_NO_WINDOW && (i = !1);
    var o = !i && typeof self == "object", u = !f.JS_SHA3_NO_NODE_JS && typeof Te == "object" && Te.versions && Te.versions.node;
    u ? f = In : o && (f = self);
    var l = !f.JS_SHA3_NO_COMMON_JS && !0 && e.exports, x = !f.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", b = "0123456789abcdef".split(""), _ = [31, 7936, 2031616, 520093696], I = [4, 1024, 262144, 67108864], P = [1, 256, 65536, 16777216], B = [6, 1536, 393216, 100663296], O = [0, 8, 16, 24], q = [
      1,
      0,
      32898,
      0,
      32906,
      2147483648,
      2147516416,
      2147483648,
      32907,
      0,
      2147483649,
      0,
      2147516545,
      2147483648,
      32777,
      2147483648,
      138,
      0,
      136,
      0,
      2147516425,
      0,
      2147483658,
      0,
      2147516555,
      0,
      139,
      2147483648,
      32905,
      2147483648,
      32771,
      2147483648,
      32770,
      2147483648,
      128,
      2147483648,
      32778,
      0,
      2147483658,
      2147483648,
      2147516545,
      2147483648,
      32896,
      2147483648,
      2147483649,
      0,
      2147516424,
      2147483648
    ], ot = [224, 256, 384, 512], G = [128, 256], $ = ["hex", "buffer", "arrayBuffer", "array", "digest"], tt = {
      128: 168,
      256: 136
    };
    (f.JS_SHA3_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(y) {
      return Object.prototype.toString.call(y) === "[object Array]";
    }), x && (f.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(y) {
      return typeof y == "object" && y.buffer && y.buffer.constructor === ArrayBuffer;
    });
    for (var gt = function(y, R, F) {
      return function(T) {
        return new s(y, R, y).update(T)[F]();
      };
    }, st = function(y, R, F) {
      return function(T, D) {
        return new s(y, R, D).update(T)[F]();
      };
    }, lt = function(y, R, F) {
      return function(T, D, at, Y) {
        return n["cshake" + y].update(T, D, at, Y)[F]();
      };
    }, qt = function(y, R, F) {
      return function(T, D, at, Y) {
        return n["kmac" + y].update(T, D, at, Y)[F]();
      };
    }, Mt = function(y, R, F, T) {
      for (var D = 0; D < $.length; ++D) {
        var at = $[D];
        y[at] = R(F, T, at);
      }
      return y;
    }, Qt = function(y, R) {
      var F = gt(y, R, "hex");
      return F.create = function() {
        return new s(y, R, y);
      }, F.update = function(T) {
        return F.create().update(T);
      }, Mt(F, gt, y, R);
    }, Ht = function(y, R) {
      var F = st(y, R, "hex");
      return F.create = function(T) {
        return new s(y, R, T);
      }, F.update = function(T, D) {
        return F.create(D).update(T);
      }, Mt(F, st, y, R);
    }, nt = function(y, R) {
      var F = tt[y], T = lt(y, R, "hex");
      return T.create = function(D, at, Y) {
        return !at && !Y ? n["shake" + y].create(D) : new s(y, R, D).bytepad([at, Y], F);
      }, T.update = function(D, at, Y, K) {
        return T.create(at, Y, K).update(D);
      }, Mt(T, lt, y, R);
    }, Lt = function(y, R) {
      var F = tt[y], T = qt(y, R, "hex");
      return T.create = function(D, at, Y) {
        return new g(y, R, at).bytepad(["KMAC", Y], F).bytepad([D], F);
      }, T.update = function(D, at, Y, K) {
        return T.create(D, Y, K).update(at);
      }, Mt(T, qt, y, R);
    }, w = [
      { name: "keccak", padding: P, bits: ot, createMethod: Qt },
      { name: "sha3", padding: B, bits: ot, createMethod: Qt },
      { name: "shake", padding: _, bits: G, createMethod: Ht },
      { name: "cshake", padding: I, bits: G, createMethod: nt },
      { name: "kmac", padding: I, bits: G, createMethod: Lt }
    ], n = {}, a = [], h = 0; h < w.length; ++h)
      for (var v = w[h], m = v.bits, A = 0; A < m.length; ++A) {
        var M = v.name + "_" + m[A];
        if (a.push(M), n[M] = v.createMethod(m[A], v.padding), v.name !== "sha3") {
          var d = v.name + m[A];
          a.push(d), n[d] = n[M];
        }
      }
    function s(y, R, F) {
      this.blocks = [], this.s = [], this.padding = R, this.outputBits = F, this.reset = !0, this.finalized = !1, this.block = 0, this.start = 0, this.blockCount = 1600 - (y << 1) >> 5, this.byteCount = this.blockCount << 2, this.outputBlocks = F >> 5, this.extraBytes = (F & 31) >> 3;
      for (var T = 0; T < 50; ++T)
        this.s[T] = 0;
    }
    s.prototype.update = function(y) {
      if (this.finalized)
        throw new Error(r);
      var R, F = typeof y;
      if (F !== "string") {
        if (F === "object") {
          if (y === null)
            throw new Error(t);
          if (x && y.constructor === ArrayBuffer)
            y = new Uint8Array(y);
          else if (!Array.isArray(y) && (!x || !ArrayBuffer.isView(y)))
            throw new Error(t);
        } else
          throw new Error(t);
        R = !0;
      }
      for (var T = this.blocks, D = this.byteCount, at = y.length, Y = this.blockCount, K = 0, Ft = this.s, W, rt; K < at; ) {
        if (this.reset)
          for (this.reset = !1, T[0] = this.block, W = 1; W < Y + 1; ++W)
            T[W] = 0;
        if (R)
          for (W = this.start; K < at && W < D; ++K)
            T[W >> 2] |= y[K] << O[W++ & 3];
        else
          for (W = this.start; K < at && W < D; ++K)
            rt = y.charCodeAt(K), rt < 128 ? T[W >> 2] |= rt << O[W++ & 3] : rt < 2048 ? (T[W >> 2] |= (192 | rt >> 6) << O[W++ & 3], T[W >> 2] |= (128 | rt & 63) << O[W++ & 3]) : rt < 55296 || rt >= 57344 ? (T[W >> 2] |= (224 | rt >> 12) << O[W++ & 3], T[W >> 2] |= (128 | rt >> 6 & 63) << O[W++ & 3], T[W >> 2] |= (128 | rt & 63) << O[W++ & 3]) : (rt = 65536 + ((rt & 1023) << 10 | y.charCodeAt(++K) & 1023), T[W >> 2] |= (240 | rt >> 18) << O[W++ & 3], T[W >> 2] |= (128 | rt >> 12 & 63) << O[W++ & 3], T[W >> 2] |= (128 | rt >> 6 & 63) << O[W++ & 3], T[W >> 2] |= (128 | rt & 63) << O[W++ & 3]);
        if (this.lastByteIndex = W, W >= D) {
          for (this.start = W - D, this.block = T[Y], W = 0; W < Y; ++W)
            Ft[W] ^= T[W];
          H(Ft), this.reset = !0;
        } else
          this.start = W;
      }
      return this;
    }, s.prototype.encode = function(y, R) {
      var F = y & 255, T = 1, D = [F];
      for (y = y >> 8, F = y & 255; F > 0; )
        D.unshift(F), y = y >> 8, F = y & 255, ++T;
      return R ? D.push(T) : D.unshift(T), this.update(D), D.length;
    }, s.prototype.encodeString = function(y) {
      var R, F = typeof y;
      if (F !== "string") {
        if (F === "object") {
          if (y === null)
            throw new Error(t);
          if (x && y.constructor === ArrayBuffer)
            y = new Uint8Array(y);
          else if (!Array.isArray(y) && (!x || !ArrayBuffer.isView(y)))
            throw new Error(t);
        } else
          throw new Error(t);
        R = !0;
      }
      var T = 0, D = y.length;
      if (R)
        T = D;
      else
        for (var at = 0; at < y.length; ++at) {
          var Y = y.charCodeAt(at);
          Y < 128 ? T += 1 : Y < 2048 ? T += 2 : Y < 55296 || Y >= 57344 ? T += 3 : (Y = 65536 + ((Y & 1023) << 10 | y.charCodeAt(++at) & 1023), T += 4);
        }
      return T += this.encode(T * 8), this.update(y), T;
    }, s.prototype.bytepad = function(y, R) {
      for (var F = this.encode(R), T = 0; T < y.length; ++T)
        F += this.encodeString(y[T]);
      var D = R - F % R, at = [];
      return at.length = D, this.update(at), this;
    }, s.prototype.finalize = function() {
      if (!this.finalized) {
        this.finalized = !0;
        var y = this.blocks, R = this.lastByteIndex, F = this.blockCount, T = this.s;
        if (y[R >> 2] |= this.padding[R & 3], this.lastByteIndex === this.byteCount)
          for (y[0] = y[F], R = 1; R < F + 1; ++R)
            y[R] = 0;
        for (y[F - 1] |= 2147483648, R = 0; R < F; ++R)
          T[R] ^= y[R];
        H(T);
      }
    }, s.prototype.toString = s.prototype.hex = function() {
      this.finalize();
      for (var y = this.blockCount, R = this.s, F = this.outputBlocks, T = this.extraBytes, D = 0, at = 0, Y = "", K; at < F; ) {
        for (D = 0; D < y && at < F; ++D, ++at)
          K = R[D], Y += b[K >> 4 & 15] + b[K & 15] + b[K >> 12 & 15] + b[K >> 8 & 15] + b[K >> 20 & 15] + b[K >> 16 & 15] + b[K >> 28 & 15] + b[K >> 24 & 15];
        at % y === 0 && (H(R), D = 0);
      }
      return T && (K = R[D], Y += b[K >> 4 & 15] + b[K & 15], T > 1 && (Y += b[K >> 12 & 15] + b[K >> 8 & 15]), T > 2 && (Y += b[K >> 20 & 15] + b[K >> 16 & 15])), Y;
    }, s.prototype.arrayBuffer = function() {
      this.finalize();
      var y = this.blockCount, R = this.s, F = this.outputBlocks, T = this.extraBytes, D = 0, at = 0, Y = this.outputBits >> 3, K;
      T ? K = new ArrayBuffer(F + 1 << 2) : K = new ArrayBuffer(Y);
      for (var Ft = new Uint32Array(K); at < F; ) {
        for (D = 0; D < y && at < F; ++D, ++at)
          Ft[at] = R[D];
        at % y === 0 && H(R);
      }
      return T && (Ft[D] = R[D], K = K.slice(0, Y)), K;
    }, s.prototype.buffer = s.prototype.arrayBuffer, s.prototype.digest = s.prototype.array = function() {
      this.finalize();
      for (var y = this.blockCount, R = this.s, F = this.outputBlocks, T = this.extraBytes, D = 0, at = 0, Y = [], K, Ft; at < F; ) {
        for (D = 0; D < y && at < F; ++D, ++at)
          K = at << 2, Ft = R[D], Y[K] = Ft & 255, Y[K + 1] = Ft >> 8 & 255, Y[K + 2] = Ft >> 16 & 255, Y[K + 3] = Ft >> 24 & 255;
        at % y === 0 && H(R);
      }
      return T && (K = at << 2, Ft = R[D], Y[K] = Ft & 255, T > 1 && (Y[K + 1] = Ft >> 8 & 255), T > 2 && (Y[K + 2] = Ft >> 16 & 255)), Y;
    };
    function g(y, R, F) {
      s.call(this, y, R, F);
    }
    g.prototype = new s(), g.prototype.finalize = function() {
      return this.encode(this.outputBits, !0), s.prototype.finalize.call(this);
    };
    var H = function(y) {
      var R, F, T, D, at, Y, K, Ft, W, rt, E, c, p, N, k, C, J, j, X, Dt, ft, et, nr, mt, wt, Ir, _t, yt, gr, pt, xt, cr, At, Et, mr, Nt, bt, wr, It, St, yr, kt, Rt, Sr, Pt, S, z, L, Q, Gt, Z, V, Bt, ut, it, Wt, dt, vt, ur, Zt, kr, Rr, Pr;
      for (T = 0; T < 48; T += 2)
        D = y[0] ^ y[10] ^ y[20] ^ y[30] ^ y[40], at = y[1] ^ y[11] ^ y[21] ^ y[31] ^ y[41], Y = y[2] ^ y[12] ^ y[22] ^ y[32] ^ y[42], K = y[3] ^ y[13] ^ y[23] ^ y[33] ^ y[43], Ft = y[4] ^ y[14] ^ y[24] ^ y[34] ^ y[44], W = y[5] ^ y[15] ^ y[25] ^ y[35] ^ y[45], rt = y[6] ^ y[16] ^ y[26] ^ y[36] ^ y[46], E = y[7] ^ y[17] ^ y[27] ^ y[37] ^ y[47], c = y[8] ^ y[18] ^ y[28] ^ y[38] ^ y[48], p = y[9] ^ y[19] ^ y[29] ^ y[39] ^ y[49], R = c ^ (Y << 1 | K >>> 31), F = p ^ (K << 1 | Y >>> 31), y[0] ^= R, y[1] ^= F, y[10] ^= R, y[11] ^= F, y[20] ^= R, y[21] ^= F, y[30] ^= R, y[31] ^= F, y[40] ^= R, y[41] ^= F, R = D ^ (Ft << 1 | W >>> 31), F = at ^ (W << 1 | Ft >>> 31), y[2] ^= R, y[3] ^= F, y[12] ^= R, y[13] ^= F, y[22] ^= R, y[23] ^= F, y[32] ^= R, y[33] ^= F, y[42] ^= R, y[43] ^= F, R = Y ^ (rt << 1 | E >>> 31), F = K ^ (E << 1 | rt >>> 31), y[4] ^= R, y[5] ^= F, y[14] ^= R, y[15] ^= F, y[24] ^= R, y[25] ^= F, y[34] ^= R, y[35] ^= F, y[44] ^= R, y[45] ^= F, R = Ft ^ (c << 1 | p >>> 31), F = W ^ (p << 1 | c >>> 31), y[6] ^= R, y[7] ^= F, y[16] ^= R, y[17] ^= F, y[26] ^= R, y[27] ^= F, y[36] ^= R, y[37] ^= F, y[46] ^= R, y[47] ^= F, R = rt ^ (D << 1 | at >>> 31), F = E ^ (at << 1 | D >>> 31), y[8] ^= R, y[9] ^= F, y[18] ^= R, y[19] ^= F, y[28] ^= R, y[29] ^= F, y[38] ^= R, y[39] ^= F, y[48] ^= R, y[49] ^= F, N = y[0], k = y[1], S = y[11] << 4 | y[10] >>> 28, z = y[10] << 4 | y[11] >>> 28, yt = y[20] << 3 | y[21] >>> 29, gr = y[21] << 3 | y[20] >>> 29, Zt = y[31] << 9 | y[30] >>> 23, kr = y[30] << 9 | y[31] >>> 23, kt = y[40] << 18 | y[41] >>> 14, Rt = y[41] << 18 | y[40] >>> 14, Et = y[2] << 1 | y[3] >>> 31, mr = y[3] << 1 | y[2] >>> 31, C = y[13] << 12 | y[12] >>> 20, J = y[12] << 12 | y[13] >>> 20, L = y[22] << 10 | y[23] >>> 22, Q = y[23] << 10 | y[22] >>> 22, pt = y[33] << 13 | y[32] >>> 19, xt = y[32] << 13 | y[33] >>> 19, Rr = y[42] << 2 | y[43] >>> 30, Pr = y[43] << 2 | y[42] >>> 30, ut = y[5] << 30 | y[4] >>> 2, it = y[4] << 30 | y[5] >>> 2, Nt = y[14] << 6 | y[15] >>> 26, bt = y[15] << 6 | y[14] >>> 26, j = y[25] << 11 | y[24] >>> 21, X = y[24] << 11 | y[25] >>> 21, Gt = y[34] << 15 | y[35] >>> 17, Z = y[35] << 15 | y[34] >>> 17, cr = y[45] << 29 | y[44] >>> 3, At = y[44] << 29 | y[45] >>> 3, mt = y[6] << 28 | y[7] >>> 4, wt = y[7] << 28 | y[6] >>> 4, Wt = y[17] << 23 | y[16] >>> 9, dt = y[16] << 23 | y[17] >>> 9, wr = y[26] << 25 | y[27] >>> 7, It = y[27] << 25 | y[26] >>> 7, Dt = y[36] << 21 | y[37] >>> 11, ft = y[37] << 21 | y[36] >>> 11, V = y[47] << 24 | y[46] >>> 8, Bt = y[46] << 24 | y[47] >>> 8, Sr = y[8] << 27 | y[9] >>> 5, Pt = y[9] << 27 | y[8] >>> 5, Ir = y[18] << 20 | y[19] >>> 12, _t = y[19] << 20 | y[18] >>> 12, vt = y[29] << 7 | y[28] >>> 25, ur = y[28] << 7 | y[29] >>> 25, St = y[38] << 8 | y[39] >>> 24, yr = y[39] << 8 | y[38] >>> 24, et = y[48] << 14 | y[49] >>> 18, nr = y[49] << 14 | y[48] >>> 18, y[0] = N ^ ~C & j, y[1] = k ^ ~J & X, y[10] = mt ^ ~Ir & yt, y[11] = wt ^ ~_t & gr, y[20] = Et ^ ~Nt & wr, y[21] = mr ^ ~bt & It, y[30] = Sr ^ ~S & L, y[31] = Pt ^ ~z & Q, y[40] = ut ^ ~Wt & vt, y[41] = it ^ ~dt & ur, y[2] = C ^ ~j & Dt, y[3] = J ^ ~X & ft, y[12] = Ir ^ ~yt & pt, y[13] = _t ^ ~gr & xt, y[22] = Nt ^ ~wr & St, y[23] = bt ^ ~It & yr, y[32] = S ^ ~L & Gt, y[33] = z ^ ~Q & Z, y[42] = Wt ^ ~vt & Zt, y[43] = dt ^ ~ur & kr, y[4] = j ^ ~Dt & et, y[5] = X ^ ~ft & nr, y[14] = yt ^ ~pt & cr, y[15] = gr ^ ~xt & At, y[24] = wr ^ ~St & kt, y[25] = It ^ ~yr & Rt, y[34] = L ^ ~Gt & V, y[35] = Q ^ ~Z & Bt, y[44] = vt ^ ~Zt & Rr, y[45] = ur ^ ~kr & Pr, y[6] = Dt ^ ~et & N, y[7] = ft ^ ~nr & k, y[16] = pt ^ ~cr & mt, y[17] = xt ^ ~At & wt, y[26] = St ^ ~kt & Et, y[27] = yr ^ ~Rt & mr, y[36] = Gt ^ ~V & Sr, y[37] = Z ^ ~Bt & Pt, y[46] = Zt ^ ~Rr & ut, y[47] = kr ^ ~Pr & it, y[8] = et ^ ~N & C, y[9] = nr ^ ~k & J, y[18] = cr ^ ~mt & Ir, y[19] = At ^ ~wt & _t, y[28] = kt ^ ~Et & Nt, y[29] = Rt ^ ~mr & bt, y[38] = V ^ ~Sr & S, y[39] = Bt ^ ~Pt & z, y[48] = Rr ^ ~ut & Wt, y[49] = Pr ^ ~it & dt, y[0] ^= q[T], y[1] ^= q[T + 1];
    };
    if (l)
      e.exports = n;
    else
      for (h = 0; h < a.length; ++h)
        f[a[h]] = n[a[h]];
  })();
})(Pf);
const Bf = mn;
function sr(e) {
  return "0x" + Bf.keccak_256(Ut(e));
}
const Cf = "rlp/5.7.0", Wr = new U(Cf);
function Zn(e) {
  const t = [];
  for (; e; )
    t.unshift(e & 255), e >>= 8;
  return t;
}
function $n(e, t, r) {
  let i = 0;
  for (let f = 0; f < r; f++)
    i = i * 256 + e[t + f];
  return i;
}
function Ko(e) {
  if (Array.isArray(e)) {
    let i = [];
    if (e.forEach(function(o) {
      i = i.concat(Ko(o));
    }), i.length <= 55)
      return i.unshift(192 + i.length), i;
    const f = Zn(i.length);
    return f.unshift(247 + f.length), f.concat(i);
  }
  Rn(e) || Wr.throwArgumentError("RLP object must be BytesLike", "object", e);
  const t = Array.prototype.slice.call(Ut(e));
  if (t.length === 1 && t[0] <= 127)
    return t;
  if (t.length <= 55)
    return t.unshift(128 + t.length), t;
  const r = Zn(t.length);
  return r.unshift(183 + r.length), r.concat(t);
}
function Ui(e) {
  return Tt(Ko(e));
}
function to(e, t, r, i) {
  const f = [];
  for (; r < t + 1 + i; ) {
    const o = Jo(e, r);
    f.push(o.result), r += o.consumed, r > t + 1 + i && Wr.throwError("child data too short", U.errors.BUFFER_OVERRUN, {});
  }
  return { consumed: 1 + i, result: f };
}
function Jo(e, t) {
  if (e.length === 0 && Wr.throwError("data too short", U.errors.BUFFER_OVERRUN, {}), e[t] >= 248) {
    const r = e[t] - 247;
    t + 1 + r > e.length && Wr.throwError("data short segment too short", U.errors.BUFFER_OVERRUN, {});
    const i = $n(e, t + 1, r);
    return t + 1 + r + i > e.length && Wr.throwError("data long segment too short", U.errors.BUFFER_OVERRUN, {}), to(e, t, t + 1 + r, r + i);
  } else if (e[t] >= 192) {
    const r = e[t] - 192;
    return t + 1 + r > e.length && Wr.throwError("data array too short", U.errors.BUFFER_OVERRUN, {}), to(e, t, t + 1, r);
  } else if (e[t] >= 184) {
    const r = e[t] - 183;
    t + 1 + r > e.length && Wr.throwError("data array too short", U.errors.BUFFER_OVERRUN, {});
    const i = $n(e, t + 1, r);
    t + 1 + r + i > e.length && Wr.throwError("data array too short", U.errors.BUFFER_OVERRUN, {});
    const f = Tt(e.slice(t + 1 + r, t + 1 + r + i));
    return { consumed: 1 + r + i, result: f };
  } else if (e[t] >= 128) {
    const r = e[t] - 128;
    t + 1 + r > e.length && Wr.throwError("data too short", U.errors.BUFFER_OVERRUN, {});
    const i = Tt(e.slice(t + 1, t + 1 + r));
    return { consumed: 1 + r, result: i };
  }
  return { consumed: 1, result: Tt(e[t]) };
}
function Bn(e) {
  const t = Ut(e), r = Jo(t, 0);
  return r.consumed !== t.length && Wr.throwArgumentError("invalid rlp data", "data", e), r.result;
}
const Tf = "address/5.7.0", He = new U(Tf);
function ro(e) {
  Vt(e, 20) || He.throwArgumentError("invalid address", "address", e), e = e.toLowerCase();
  const t = e.substring(2).split(""), r = new Uint8Array(40);
  for (let f = 0; f < 40; f++)
    r[f] = t[f].charCodeAt(0);
  const i = Ut(sr(r));
  for (let f = 0; f < 40; f += 2)
    i[f >> 1] >> 4 >= 8 && (t[f] = t[f].toUpperCase()), (i[f >> 1] & 15) >= 8 && (t[f + 1] = t[f + 1].toUpperCase());
  return "0x" + t.join("");
}
const Of = 9007199254740991;
function Ff(e) {
  return Math.log10 ? Math.log10(e) : Math.log(e) / Math.LN10;
}
const Cn = {};
for (let e = 0; e < 10; e++)
  Cn[String(e)] = String(e);
for (let e = 0; e < 26; e++)
  Cn[String.fromCharCode(65 + e)] = String(10 + e);
const eo = Math.floor(Ff(Of));
function Uf(e) {
  e = e.toUpperCase(), e = e.substring(4) + e.substring(0, 2) + "00";
  let t = e.split("").map((i) => Cn[i]).join("");
  for (; t.length >= eo; ) {
    let i = t.substring(0, eo);
    t = parseInt(i, 10) % 97 + t.substring(i.length);
  }
  let r = String(98 - parseInt(t, 10) % 97);
  for (; r.length < 2; )
    r = "0" + r;
  return r;
}
function Kr(e) {
  let t = null;
  if (typeof e != "string" && He.throwArgumentError("invalid address", "address", e), e.match(/^(0x)?[0-9a-fA-F]{40}$/))
    e.substring(0, 2) !== "0x" && (e = "0x" + e), t = ro(e), e.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && t !== e && He.throwArgumentError("bad address checksum", "address", e);
  else if (e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    for (e.substring(2, 4) !== Uf(e) && He.throwArgumentError("bad icap checksum", "address", e), t = _f(e.substring(4)); t.length < 40; )
      t = "0" + t;
    t = ro("0x" + t);
  } else
    He.throwArgumentError("invalid address", "address", e);
  return t;
}
function Lf(e) {
  let t = null;
  try {
    t = Kr(e.from);
  } catch {
    He.throwArgumentError("missing from address", "transaction", e);
  }
  const r = Qe(Ut(ct.from(e.nonce).toHexString()));
  return Kr(lr(sr(Ui([t, r])), 12));
}
const Df = "0x0000000000000000000000000000000000000000", qf = /* @__PURE__ */ ct.from(0), Gf = "0x0000000000000000000000000000000000000000000000000000000000000000", zf = "strings/5.7.0", Yo = new U(zf);
var di;
(function(e) {
  e.current = "", e.NFC = "NFC", e.NFD = "NFD", e.NFKC = "NFKC", e.NFKD = "NFKD";
})(di || (di = {}));
var Mr;
(function(e) {
  e.UNEXPECTED_CONTINUE = "unexpected continuation byte", e.BAD_PREFIX = "bad codepoint prefix", e.OVERRUN = "string overrun", e.MISSING_CONTINUE = "missing continuation byte", e.OUT_OF_RANGE = "out of UTF-8 range", e.UTF16_SURROGATE = "UTF-16 surrogate", e.OVERLONG = "overlong representation";
})(Mr || (Mr = {}));
function Hf(e, t, r, i, f) {
  return Yo.throwArgumentError(`invalid codepoint at offset ${t}; ${e}`, "bytes", r);
}
function Qo(e, t, r, i, f) {
  if (e === Mr.BAD_PREFIX || e === Mr.UNEXPECTED_CONTINUE) {
    let o = 0;
    for (let u = t + 1; u < r.length && r[u] >> 6 === 2; u++)
      o++;
    return o;
  }
  return e === Mr.OVERRUN ? r.length - t - 1 : 0;
}
function Kf(e, t, r, i, f) {
  return e === Mr.OVERLONG ? (i.push(f), 0) : (i.push(65533), Qo(e, t, r));
}
const Jf = Object.freeze({
  error: Hf,
  ignore: Qo,
  replace: Kf
});
function Wo(e, t) {
  t == null && (t = Jf.error), e = Ut(e);
  const r = [];
  let i = 0;
  for (; i < e.length; ) {
    const f = e[i++];
    if (!(f >> 7)) {
      r.push(f);
      continue;
    }
    let o = null, u = null;
    if ((f & 224) === 192)
      o = 1, u = 127;
    else if ((f & 240) === 224)
      o = 2, u = 2047;
    else if ((f & 248) === 240)
      o = 3, u = 65535;
    else {
      (f & 192) === 128 ? i += t(Mr.UNEXPECTED_CONTINUE, i - 1, e, r) : i += t(Mr.BAD_PREFIX, i - 1, e, r);
      continue;
    }
    if (i - 1 + o >= e.length) {
      i += t(Mr.OVERRUN, i - 1, e, r);
      continue;
    }
    let l = f & (1 << 8 - o - 1) - 1;
    for (let x = 0; x < o; x++) {
      let b = e[i];
      if ((b & 192) != 128) {
        i += t(Mr.MISSING_CONTINUE, i, e, r), l = null;
        break;
      }
      l = l << 6 | b & 63, i++;
    }
    if (l !== null) {
      if (l > 1114111) {
        i += t(Mr.OUT_OF_RANGE, i - 1 - o, e, r, l);
        continue;
      }
      if (l >= 55296 && l <= 57343) {
        i += t(Mr.UTF16_SURROGATE, i - 1 - o, e, r, l);
        continue;
      }
      if (l <= u) {
        i += t(Mr.OVERLONG, i - 1 - o, e, r, l);
        continue;
      }
      r.push(l);
    }
  }
  return r;
}
function ae(e, t = di.current) {
  t != di.current && (Yo.checkNormalize(), e = e.normalize(t));
  let r = [];
  for (let i = 0; i < e.length; i++) {
    const f = e.charCodeAt(i);
    if (f < 128)
      r.push(f);
    else if (f < 2048)
      r.push(f >> 6 | 192), r.push(f & 63 | 128);
    else if ((f & 64512) == 55296) {
      i++;
      const o = e.charCodeAt(i);
      if (i >= e.length || (o & 64512) !== 56320)
        throw new Error("invalid utf-8 string");
      const u = 65536 + ((f & 1023) << 10) + (o & 1023);
      r.push(u >> 18 | 240), r.push(u >> 12 & 63 | 128), r.push(u >> 6 & 63 | 128), r.push(u & 63 | 128);
    } else
      r.push(f >> 12 | 224), r.push(f >> 6 & 63 | 128), r.push(f & 63 | 128);
  }
  return Ut(r);
}
function Yf(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function Li(e, t) {
  return Yf(Wo(e, t));
}
function Qf(e, t = di.current) {
  return Wo(ae(e, t));
}
function jo(e) {
  return sr(ae(e));
}
const Vo = "hash/5.7.0";
function Xo(e) {
  e = atob(e);
  const t = [];
  for (let r = 0; r < e.length; r++)
    t.push(e.charCodeAt(r));
  return Ut(t);
}
function Zo(e) {
  e = Ut(e);
  let t = "";
  for (let r = 0; r < e.length; r++)
    t += String.fromCharCode(e[r]);
  return btoa(t);
}
function $o(e, t) {
  t == null && (t = 1);
  const r = [], i = r.forEach, f = function(o, u) {
    i.call(o, function(l) {
      u > 0 && Array.isArray(l) ? f(l, u - 1) : r.push(l);
    });
  };
  return f(e, t), r;
}
function Wf(e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    t[i[0]] = i[1];
  }
  return t;
}
function jf(e) {
  let t = 0;
  function r() {
    return e[t++] << 8 | e[t++];
  }
  let i = r(), f = 1, o = [0, 1];
  for (let st = 1; st < i; st++)
    o.push(f += r());
  let u = r(), l = t;
  t += u;
  let x = 0, b = 0;
  function _() {
    return x == 0 && (b = b << 8 | e[t++], x = 8), b >> --x & 1;
  }
  const I = 31, P = Math.pow(2, I), B = P >>> 1, O = B >> 1, q = P - 1;
  let ot = 0;
  for (let st = 0; st < I; st++)
    ot = ot << 1 | _();
  let G = [], $ = 0, tt = P;
  for (; ; ) {
    let st = Math.floor(((ot - $ + 1) * f - 1) / tt), lt = 0, qt = i;
    for (; qt - lt > 1; ) {
      let Ht = lt + qt >>> 1;
      st < o[Ht] ? qt = Ht : lt = Ht;
    }
    if (lt == 0)
      break;
    G.push(lt);
    let Mt = $ + Math.floor(tt * o[lt] / f), Qt = $ + Math.floor(tt * o[lt + 1] / f) - 1;
    for (; !((Mt ^ Qt) & B); )
      ot = ot << 1 & q | _(), Mt = Mt << 1 & q, Qt = Qt << 1 & q | 1;
    for (; Mt & ~Qt & O; )
      ot = ot & B | ot << 1 & q >>> 1 | _(), Mt = Mt << 1 ^ B, Qt = (Qt ^ B) << 1 | B | 1;
    $ = Mt, tt = 1 + Qt - Mt;
  }
  let gt = i - 4;
  return G.map((st) => {
    switch (st - gt) {
      case 3:
        return gt + 65792 + (e[l++] << 16 | e[l++] << 8 | e[l++]);
      case 2:
        return gt + 256 + (e[l++] << 8 | e[l++]);
      case 1:
        return gt + e[l++];
      default:
        return st - 1;
    }
  });
}
function Vf(e) {
  let t = 0;
  return () => e[t++];
}
function Xf(e) {
  return Vf(jf(e));
}
function Zf(e) {
  return e & 1 ? ~e >> 1 : e >> 1;
}
function $f(e, t) {
  let r = Array(e);
  for (let i = 0; i < e; i++)
    r[i] = 1 + t();
  return r;
}
function io(e, t) {
  let r = Array(e);
  for (let i = 0, f = -1; i < e; i++)
    r[i] = f += 1 + t();
  return r;
}
function ta(e, t) {
  let r = Array(e);
  for (let i = 0, f = 0; i < e; i++)
    r[i] = f += Zf(t());
  return r;
}
function Si(e, t) {
  let r = io(e(), e), i = e(), f = io(i, e), o = $f(i, e);
  for (let u = 0; u < i; u++)
    for (let l = 0; l < o[u]; l++)
      r.push(f[u] + l);
  return t ? r.map((u) => t[u]) : r;
}
function ra(e) {
  let t = [];
  for (; ; ) {
    let r = e();
    if (r == 0)
      break;
    t.push(ia(r, e));
  }
  for (; ; ) {
    let r = e() - 1;
    if (r < 0)
      break;
    t.push(na(r, e));
  }
  return Wf($o(t));
}
function ea(e) {
  let t = [];
  for (; ; ) {
    let r = e();
    if (r == 0)
      break;
    t.push(r);
  }
  return t;
}
function ts(e, t, r) {
  let i = Array(e).fill(void 0).map(() => []);
  for (let f = 0; f < t; f++)
    ta(e, r).forEach((o, u) => i[u].push(o));
  return i;
}
function ia(e, t) {
  let r = 1 + t(), i = t(), f = ea(t), o = ts(f.length, 1 + e, t);
  return $o(o.map((u, l) => {
    const x = u[0], b = u.slice(1);
    return Array(f[l]).fill(void 0).map((_, I) => {
      let P = I * i;
      return [x + I * r, b.map((B) => B + P)];
    });
  }));
}
function na(e, t) {
  let r = 1 + t();
  return ts(r, 1 + e, t).map((f) => [f[0], f.slice(1)]);
}
function oa(e) {
  let t = Si(e).sort((i, f) => i - f);
  return r();
  function r() {
    let i = [];
    for (; ; ) {
      let b = Si(e, t);
      if (b.length == 0)
        break;
      i.push({ set: new Set(b), node: r() });
    }
    i.sort((b, _) => _.set.size - b.set.size);
    let f = e(), o = f % 3;
    f = f / 3 | 0;
    let u = !!(f & 1);
    f >>= 1;
    let l = f == 1, x = f == 2;
    return { branches: i, valid: o, fe0f: u, save: l, check: x };
  }
}
function sa() {
  return Xf(Xo("AEQF2AO2DEsA2wIrAGsBRABxAN8AZwCcAEwAqgA0AGwAUgByADcATAAVAFYAIQAyACEAKAAYAFgAGwAjABQAMAAmADIAFAAfABQAKwATACoADgAbAA8AHQAYABoAGQAxADgALAAoADwAEwA9ABMAGgARAA4ADwAWABMAFgAIAA8AHgQXBYMA5BHJAS8JtAYoAe4AExozi0UAH21tAaMnBT8CrnIyhrMDhRgDygIBUAEHcoFHUPe8AXBjAewCjgDQR8IICIcEcQLwATXCDgzvHwBmBoHNAqsBdBcUAykgDhAMShskMgo8AY8jqAQfAUAfHw8BDw87MioGlCIPBwZCa4ELatMAAMspJVgsDl8AIhckSg8XAHdvTwBcIQEiDT4OPhUqbyECAEoAS34Aej8Ybx83JgT/Xw8gHxZ/7w8RICxPHA9vBw+Pfw8PHwAPFv+fAsAvCc8vEr8ivwD/EQ8Bol8OEBa/A78hrwAPCU8vESNvvwWfHwNfAVoDHr+ZAAED34YaAdJPAK7PLwSEgDLHAGo1Pz8Pvx9fUwMrpb8O/58VTzAPIBoXIyQJNF8hpwIVAT8YGAUADDNBaX3RAMomJCg9EhUeA29MABsZBTMNJipjOhc19gcIDR8bBwQHEggCWi6DIgLuAQYA+BAFCha3A5XiAEsqM7UFFgFLhAMjFTMYE1Klnw74nRVBG/ASCm0BYRN/BrsU3VoWy+S0vV8LQx+vN8gF2AC2AK5EAWwApgYDKmAAroQ0NDQ0AT+OCg7wAAIHRAbpNgVcBV0APTA5BfbPFgMLzcYL/QqqA82eBALKCjQCjqYCht0/k2+OAsXQAoP3ASTKDgDw6ACKAUYCMpIKJpRaAE4A5womABzZvs0REEKiACIQAd5QdAECAj4Ywg/wGqY2AVgAYADYvAoCGAEubA0gvAY2ALAAbpbvqpyEAGAEpgQAJgAG7gAgAEACmghUFwCqAMpAINQIwC4DthRAAPcycKgApoIdABwBfCisABoATwBqASIAvhnSBP8aH/ECeAKXAq40NjgDBTwFYQU6AXs3oABgAD4XNgmcCY1eCl5tIFZeUqGgyoNHABgAEQAaABNwWQAmABMATPMa3T34ADldyprmM1M2XociUQgLzvwAXT3xABgAEQAaABNwIGFAnADD8AAgAD4BBJWzaCcIAIEBFMAWwKoAAdq9BWAF5wLQpALEtQAKUSGkahR4GnJM+gsAwCgeFAiUAECQ0BQuL8AAIAAAADKeIheclvFqQAAETr4iAMxIARMgAMIoHhQIAn0E0pDQFC4HhznoAAAAIAI2C0/4lvFqQAAETgBJJwYCAy4ABgYAFAA8MBKYEH4eRhTkAjYeFcgACAYAeABsOqyQ5gRwDayqugEgaIIAtgoACgDmEABmBAWGme5OBJJA2m4cDeoAmITWAXwrMgOgAGwBCh6CBXYF1Tzg1wKAAFdiuABRAFwAXQBsAG8AdgBrAHYAbwCEAHEwfxQBVE5TEQADVFhTBwBDANILAqcCzgLTApQCrQL6vAAMAL8APLhNBKkE6glGKTAU4Dr4N2EYEwBCkABKk8rHAbYBmwIoAiU4Ajf/Aq4CowCAANIChzgaNBsCsTgeODcFXrgClQKdAqQBiQGYAqsCsjTsNHsfNPA0ixsAWTWiOAMFPDQSNCk2BDZHNow2TTZUNhk28Jk9VzI3QkEoAoICoQKwAqcAQAAxBV4FXbS9BW47YkIXP1ciUqs05DS/FwABUwJW11e6nHuYZmSh/RAYA8oMKvZ8KASoUAJYWAJ6ILAsAZSoqjpgA0ocBIhmDgDWAAawRDQoAAcuAj5iAHABZiR2AIgiHgCaAU68ACxuHAG0ygM8MiZIAlgBdF4GagJqAPZOHAMuBgoATkYAsABiAHgAMLoGDPj0HpKEBAAOJgAuALggTAHWAeAMEDbd20Uege0ADwAWADkAQgA9OHd+2MUQZBBhBgNNDkxxPxUQArEPqwvqERoM1irQ090ANK4H8ANYB/ADWANYB/AH8ANYB/ADWANYA1gDWBwP8B/YxRBkD00EcgWTBZAE2wiIJk4RhgctCNdUEnQjHEwDSgEBIypJITuYMxAlR0wRTQgIATZHbKx9PQNMMbBU+pCnA9AyVDlxBgMedhKlAC8PeCE1uk6DekxxpQpQT7NX9wBFBgASqwAS5gBJDSgAUCwGPQBI4zTYABNGAE2bAE3KAExdGABKaAbgAFBXAFCOAFBJABI2SWdObALDOq0//QomCZhvwHdTBkIQHCemEPgMNAG2ATwN7kvZBPIGPATKH34ZGg/OlZ0Ipi3eDO4m5C6igFsj9iqEBe5L9TzeC05RaQ9aC2YJ5DpkgU8DIgEOIowK3g06CG4Q9ArKbA3mEUYHOgPWSZsApgcCCxIdNhW2JhFirQsKOXgG/Br3C5AmsBMqev0F1BoiBk4BKhsAANAu6IWxWjJcHU9gBgQLJiPIFKlQIQ0mQLh4SRocBxYlqgKSQ3FKiFE3HpQh9zw+DWcuFFF9B/Y8BhlQC4I8n0asRQ8R0z6OPUkiSkwtBDaALDAnjAnQD4YMunxzAVoJIgmyDHITMhEYN8YIOgcaLpclJxYIIkaWYJsE+KAD9BPSAwwFQAlCBxQDthwuEy8VKgUOgSXYAvQ21i60ApBWgQEYBcwPJh/gEFFH4Q7qCJwCZgOEJewALhUiABginAhEZABgj9lTBi7MCMhqbSN1A2gU6GIRdAeSDlgHqBw0FcAc4nDJXgyGCSiksAlcAXYJmgFgBOQICjVcjKEgQmdUi1kYnCBiQUBd/QIyDGYVoES+h3kCjA9sEhwBNgF0BzoNAgJ4Ee4RbBCWCOyGBTW2M/k6JgRQIYQgEgooA1BszwsoJvoM+WoBpBJjAw00PnfvZ6xgtyUX/gcaMsZBYSHyC5NPzgydGsIYQ1QvGeUHwAP0GvQn60FYBgADpAQUOk4z7wS+C2oIjAlAAEoOpBgH2BhrCnKM0QEyjAG4mgNYkoQCcJAGOAcMAGgMiAV65gAeAqgIpAAGANADWAA6Aq4HngAaAIZCAT4DKDABIuYCkAOUCDLMAZYwAfQqBBzEDBYA+DhuSwLDsgKAa2ajBd5ZAo8CSjYBTiYEBk9IUgOwcuIA3ABMBhTgSAEWrEvMG+REAeBwLADIAPwABjYHBkIBzgH0bgC4AWALMgmjtLYBTuoqAIQAFmwB2AKKAN4ANgCA8gFUAE4FWvoF1AJQSgESMhksWGIBvAMgATQBDgB6BsyOpsoIIARuB9QCEBwV4gLvLwe2AgMi4BPOQsYCvd9WADIXUu5eZwqoCqdeaAC0YTQHMnM9UQAPH6k+yAdy/BZIiQImSwBQ5gBQQzSaNTFWSTYBpwGqKQK38AFtqwBI/wK37gK3rQK3sAK6280C0gK33AK3zxAAUEIAUD9SklKDArekArw5AEQAzAHCO147WTteO1k7XjtZO147WTteO1kDmChYI03AVU0oJqkKbV9GYewMpw3VRMk6ShPcYFJgMxPJLbgUwhXPJVcZPhq9JwYl5VUKDwUt1GYxCC00dhe9AEApaYNCY4ceMQpMHOhTklT5LRwAskujM7ANrRsWREEFSHXuYisWDwojAmSCAmJDXE6wXDchAqH4AmiZAmYKAp+FOBwMAmY8AmYnBG8EgAN/FAN+kzkHOXgYOYM6JCQCbB4CMjc4CwJtyAJtr/CLADRoRiwBaADfAOIASwYHmQyOAP8MwwAOtgJ3MAJ2o0ACeUxEAni7Hl3cRa9G9AJ8QAJ6yQJ9CgJ88UgBSH5kJQAsFklZSlwWGErNAtECAtDNSygDiFADh+dExpEzAvKiXQQDA69Lz0wuJgTQTU1NsAKLQAKK2cIcCB5EaAa4Ao44Ao5dQZiCAo7aAo5deVG1UzYLUtVUhgKT/AKTDQDqAB1VH1WwVdEHLBwplocy4nhnRTw6ApegAu+zWCKpAFomApaQApZ9nQCqWa1aCoJOADwClrYClk9cRVzSApnMApllXMtdCBoCnJw5wzqeApwXAp+cAp65iwAeEDIrEAKd8gKekwC2PmE1YfACntQCoG8BqgKeoCACnk+mY8lkKCYsAiewAiZ/AqD8AqBN2AKmMAKlzwKoAAB+AqfzaH1osgAESmodatICrOQCrK8CrWgCrQMCVx4CVd0CseLYAx9PbJgCsr4OArLpGGzhbWRtSWADJc4Ctl08QG6RAylGArhfArlIFgK5K3hwN3DiAr0aAy2zAzISAr6JcgMDM3ICvhtzI3NQAsPMAsMFc4N0TDZGdOEDPKgDPJsDPcACxX0CxkgCxhGKAshqUgLIRQLJUALJLwJkngLd03h6YniveSZL0QMYpGcDAmH1GfSVJXsMXpNevBICz2wCz20wTFTT9BSgAMeuAs90ASrrA04TfkwGAtwoAtuLAtJQA1JdA1NgAQIDVY2AikABzBfuYUZ2AILPg44C2sgC2d+EEYRKpz0DhqYAMANkD4ZyWvoAVgLfZgLeuXR4AuIw7RUB8zEoAfScAfLTiALr9ALpcXoAAur6AurlAPpIAboC7ooC652Wq5cEAu5AA4XhmHpw4XGiAvMEAGoDjheZlAL3FAORbwOSiAL3mQL52gL4Z5odmqy8OJsfA52EAv77ARwAOp8dn7QDBY4DpmsDptoA0sYDBmuhiaIGCgMMSgFgASACtgNGAJwEgLpoBgC8BGzAEowcggCEDC6kdjoAJAM0C5IKRoABZCgiAIzw3AYBLACkfng9ogigkgNmWAN6AEQCvrkEVqTGAwCsBRbAA+4iQkMCHR072jI2PTbUNsk2RjY5NvA23TZKNiU3EDcZN5I+RTxDRTBCJkK5VBYKFhZfwQCWygU3AJBRHpu+OytgNxa61A40GMsYjsn7BVwFXQVcBV0FaAVdBVwFXQVcBV0FXAVdBVwFXUsaCNyKAK4AAQUHBwKU7oICoW1e7jAEzgPxA+YDwgCkBFDAwADABKzAAOxFLhitA1UFTDeyPkM+bj51QkRCuwTQWWQ8X+0AWBYzsACNA8xwzAGm7EZ/QisoCTAbLDs6fnLfb8H2GccsbgFw13M1HAVkBW/Jxsm9CNRO8E8FDD0FBQw9FkcClOYCoMFegpDfADgcMiA2AJQACB8AsigKAIzIEAJKeBIApY5yPZQIAKQiHb4fvj5BKSRPQrZCOz0oXyxgOywfKAnGbgMClQaCAkILXgdeCD9IIGUgQj5fPoY+dT52Ao5CM0dAX9BTVG9SDzFwWTQAbxBzJF/lOEIQQglCCkKJIAls5AcClQICoKPMODEFxhi6KSAbiyfIRrMjtCgdWCAkPlFBIitCsEJRzAbMAV/OEyQzDg0OAQQEJ36i328/Mk9AybDJsQlq3tDRApUKAkFzXf1d/j9uALYP6hCoFgCTGD8kPsFKQiobrm0+zj0KSD8kPnVCRBwMDyJRTHFgMTJa5rwXQiQ2YfI/JD7BMEJEHGINTw4TOFlIRzwJO0icMQpyPyQ+wzJCRBv6DVgnKB01NgUKj2bwYzMqCoBkznBgEF+zYDIocwRIX+NgHj4HICNfh2C4CwdwFWpTG/lgUhYGAwRfv2Ts8mAaXzVgml/XYIJfuWC4HI1gUF9pYJZgMR6ilQHMAOwLAlDRefC0in4AXAEJA6PjCwc0IamOANMMCAECRQDFNRTZBgd+CwQlRA+r6+gLBDEFBnwUBXgKATIArwAGRAAHA3cDdAN2A3kDdwN9A3oDdQN7A30DfAN4A3oDfQAYEAAlAtYASwMAUAFsAHcKAHcAmgB3AHUAdQB2AHVu8UgAygDAAHcAdQB1AHYAdQALCgB3AAsAmgB3AAsCOwB3AAtu8UgAygDAAHgKAJoAdwB3AHUAdQB2AHUAeAB1AHUAdgB1bvFIAMoAwAALCgCaAHcACwB3AAsCOwB3AAtu8UgAygDAAH4ACwGgALcBpwC6AahdAu0COwLtbvFIAMoAwAALCgCaAu0ACwLtAAsCOwLtAAtu8UgAygDAA24ACwNvAAu0VsQAAzsAABCkjUIpAAsAUIusOggWcgMeBxVsGwL67U/2HlzmWOEeOgALASvuAAseAfpKUpnpGgYJDCIZM6YyARUE9ThqAD5iXQgnAJYJPnOzw0ZAEZxEKsIAkA4DhAHnTAIDxxUDK0lxCQlPYgIvIQVYJQBVqE1GakUAKGYiDToSBA1EtAYAXQJYAIF8GgMHRyAAIAjOe9YncekRAA0KACUrjwE7Ayc6AAYWAqaiKG4McEcqANoN3+Mg9TwCBhIkuCny+JwUQ29L008JluRxu3K+oAdqiHOqFH0AG5SUIfUJ5SxCGfxdipRzqTmT4V5Zb+r1Uo4Vm+NqSSEl2mNvR2JhIa8SpYO6ntdwFXHCWTCK8f2+Hxo7uiG3drDycAuKIMP5bhi06ACnqArH1rz4Rqg//lm6SgJGEVbF9xJHISaR6HxqxSnkw6shDnelHKNEfGUXSJRJ1GcsmtJw25xrZMDK9gXSm1/YMkdX4/6NKYOdtk/NQ3/NnDASjTc3fPjIjW/5sVfVObX2oTDWkr1dF9f3kxBsD3/3aQO8hPfRz+e0uEiJqt1161griu7gz8hDDwtpy+F+BWtefnKHZPAxcZoWbnznhJpy0e842j36bcNzGnIEusgGX0a8ZxsnjcSsPDZ09yZ36fCQbriHeQ72JRMILNl6ePPf2HWoVwgWAm1fb3V2sAY0+B6rAXqSwPBgseVmoqsBTSrm91+XasMYYySI8eeRxH3ZvHkMz3BQ5aJ3iUVbYPNM3/7emRtjlsMgv/9VyTsyt/mK+8fgWeT6SoFaclXqn42dAIsvAarF5vNNWHzKSkKQ/8Hfk5ZWK7r9yliOsooyBjRhfkHP4Q2DkWXQi6FG/9r/IwbmkV5T7JSopHKn1pJwm9tb5Ot0oyN1Z2mPpKXHTxx2nlK08fKk1hEYA8WgVVWL5lgx0iTv+KdojJeU23ZDjmiubXOxVXJKKi2Wjuh2HLZOFLiSC7Tls5SMh4f+Pj6xUSrNjFqLGehRNB8lC0QSLNmkJJx/wSG3MnjE9T1CkPwJI0wH2lfzwETIiVqUxg0dfu5q39Gt+hwdcxkhhNvQ4TyrBceof3Mhs/IxFci1HmHr4FMZgXEEczPiGCx0HRwzAqDq2j9AVm1kwN0mRVLWLylgtoPNapF5cY4Y1wJh/e0BBwZj44YgZrDNqvD/9Hv7GFYdUQeDJuQ3EWI4HaKqavU1XjC/n41kT4L79kqGq0kLhdTZvgP3TA3fS0ozVz+5piZsoOtIvBUFoMKbNcmBL6YxxaUAusHB38XrS8dQMnQwJfUUkpRoGr5AUeWicvBTzyK9g77+yCkf5PAysL7r/JjcZgrbvRpMW9iyaxZvKO6ceZN2EwIxKwVFPuvFuiEPGCoagbMo+SpydLrXqBzNCDGFCrO/rkcwa2xhokQZ5CdZ0AsU3JfSqJ6n5I14YA+P/uAgfhPU84Tlw7cEFfp7AEE8ey4sP12PTt4Cods1GRgDOB5xvyiR5m+Bx8O5nBCNctU8BevfV5A08x6RHd5jcwPTMDSZJOedIZ1cGQ704lxbAzqZOP05ZxaOghzSdvFBHYqomATARyAADK4elP8Ly3IrUZKfWh23Xy20uBUmLS4Pfagu9+oyVa2iPgqRP3F2CTUsvJ7+RYnN8fFZbU/HVvxvcFFDKkiTqV5UBZ3Gz54JAKByi9hkKMZJvuGgcSYXFmw08UyoQyVdfTD1/dMkCHXcTGAKeROgArsvmRrQTLUOXioOHGK2QkjHuoYFgXciZoTJd6Fs5q1QX1G+p/e26hYsEf7QZD1nnIyl/SFkNtYYmmBhpBrxl9WbY0YpHWRuw2Ll/tj9mD8P4snVzJl4F9J+1arVeTb9E5r2ILH04qStjxQNwn3m4YNqxmaNbLAqW2TN6LidwuJRqS+NXbtqxoeDXpxeGWmxzSkWxjkyCkX4NQRme6q5SAcC+M7+9ETfA/EwrzQajKakCwYyeunP6ZFlxU2oMEn1Pz31zeStW74G406ZJFCl1wAXIoUKkWotYEpOuXB1uVNxJ63dpJEqfxBeptwIHNrPz8BllZoIcBoXwgfJ+8VAUnVPvRvexnw0Ma/WiGYuJO5y8QTvEYBigFmhUxY5RqzE8OcywN/8m4UYrlaniJO75XQ6KSo9+tWHlu+hMi0UVdiKQp7NelnoZUzNaIyBPVeOwK6GNp+FfHuPOoyhaWuNvTYFkvxscMQWDh+zeFCFkgwbXftiV23ywJ4+uwRqmg9k3KzwIQpzppt8DBBOMbrqwQM5Gb05sEwdKzMiAqOloaA/lr0KA+1pr0/+HiWoiIjHA/wir2nIuS3PeU/ji3O6ZwoxcR1SZ9FhtLC5S0FIzFhbBWcGVP/KpxOPSiUoAdWUpqKH++6Scz507iCcxYI6rdMBICPJZea7OcmeFw5mObJSiqpjg2UoWNIs+cFhyDSt6geV5qgi3FunmwwDoGSMgerFOZGX1m0dMCYo5XOruxO063dwENK9DbnVM9wYFREzh4vyU1WYYJ/LRRp6oxgjqP/X5a8/4Af6p6NWkQferzBmXme0zY/4nwMJm/wd1tIqSwGz+E3xPEAOoZlJit3XddD7/BT1pllzOx+8bmQtANQ/S6fZexc6qi3W+Q2xcmXTUhuS5mpHQRvcxZUN0S5+PL9lXWUAaRZhEH8hTdAcuNMMCuVNKTEGtSUKNi3O6KhSaTzck8csZ2vWRZ+d7mW8c4IKwXIYd25S/zIftPkwPzufjEvOHWVD1m+FjpDVUTV0DGDuHj6QnaEwLu/dEgdLQOg9E1Sro9XHJ8ykLAwtPu+pxqKDuFexqON1sKQm7rwbE1E68UCfA/erovrTCG+DBSNg0l4goDQvZN6uNlbyLpcZAwj2UclycvLpIZMgv4yRlpb3YuMftozorbcGVHt/VeDV3+Fdf1TP0iuaCsPi2G4XeGhsyF1ubVDxkoJhmniQ0/jSg/eYML9KLfnCFgISWkp91eauR3IQvED0nAPXK+6hPCYs+n3+hCZbiskmVMG2da+0EsZPonUeIY8EbfusQXjsK/eFDaosbPjEfQS0RKG7yj5GG69M7MeO1HmiUYocgygJHL6M1qzUDDwUSmr99V7Sdr2F3JjQAJY+F0yH33Iv3+C9M38eML7gTgmNu/r2bUMiPvpYbZ6v1/IaESirBHNa7mPKn4dEmYg7v/+HQgPN1G79jBQ1+soydfDC2r+h2Bl/KIc5KjMK7OH6nb1jLsNf0EHVe2KBiE51ox636uyG6Lho0t3J34L5QY/ilE3mikaF4HKXG1mG1rCevT1Vv6GavltxoQe/bMrpZvRggnBxSEPEeEzkEdOxTnPXHVjUYdw8JYvjB/o7Eegc3Ma+NUxLLnsK0kJlinPmUHzHGtrk5+CAbVzFOBqpyy3QVUnzTDfC/0XD94/okH+OB+i7g9lolhWIjSnfIb+Eq43ZXOWmwvjyV/qqD+t0e+7mTEM74qP/Ozt8nmC7mRpyu63OB4KnUzFc074SqoyPUAgM+/TJGFo6T44EHnQU4X4z6qannVqgw/U7zCpwcmXV1AubIrvOmkKHazJAR55ePjp5tLBsN8vAqs3NAHdcEHOR2xQ0lsNAFzSUuxFQCFYvXLZJdOj9p4fNq6p0HBGUik2YzaI4xySy91KzhQ0+q1hjxvImRwPRf76tChlRkhRCi74NXZ9qUNeIwP+s5p+3m5nwPdNOHgSLD79n7O9m1n1uDHiMntq4nkYwV5OZ1ENbXxFd4PgrlvavZsyUO4MqYlqqn1O8W/I1dEZq5dXhrbETLaZIbC2Kj/Aa/QM+fqUOHdf0tXAQ1huZ3cmWECWSXy/43j35+Mvq9xws7JKseriZ1pEWKc8qlzNrGPUGcVgOa9cPJYIJsGnJTAUsEcDOEVULO5x0rXBijc1lgXEzQQKhROf8zIV82w8eswc78YX11KYLWQRcgHNJElBxfXr72lS2RBSl07qTKorO2uUDZr3sFhYsvnhLZn0A94KRzJ/7DEGIAhW5ZWFpL8gEwu1aLA9MuWZzNwl8Oze9Y+bX+v9gywRVnoB5I/8kXTXU3141yRLYrIOOz6SOnyHNy4SieqzkBXharjfjqq1q6tklaEbA8Qfm2DaIPs7OTq/nvJBjKfO2H9bH2cCMh1+5gspfycu8f/cuuRmtDjyqZ7uCIMyjdV3a+p3fqmXsRx4C8lujezIFHnQiVTXLXuI1XrwN3+siYYj2HHTvESUx8DlOTXpak9qFRK+L3mgJ1WsD7F4cu1aJoFoYQnu+wGDMOjJM3kiBQWHCcvhJ/HRdxodOQp45YZaOTA22Nb4XKCVxqkbwMYFhzYQYIAnCW8FW14uf98jhUG2zrKhQQ0q0CEq0t5nXyvUyvR8DvD69LU+g3i+HFWQMQ8PqZuHD+sNKAV0+M6EJC0szq7rEr7B5bQ8BcNHzvDMc9eqB5ZCQdTf80Obn4uzjwpYU7SISdtV0QGa9D3Wrh2BDQtpBKxaNFV+/Cy2P/Sv+8s7Ud0Fd74X4+o/TNztWgETUapy+majNQ68Lq3ee0ZO48VEbTZYiH1Co4OlfWef82RWeyUXo7woM03PyapGfikTnQinoNq5z5veLpeMV3HCAMTaZmA1oGLAn7XS3XYsz+XK7VMQsc4XKrmDXOLU/pSXVNUq8dIqTba///3x6LiLS6xs1xuCAYSfcQ3+rQgmu7uvf3THKt5Ooo97TqcbRqxx7EASizaQCBQllG/rYxVapMLgtLbZS64w1MDBMXX+PQpBKNwqUKOf2DDRDUXQf9EhOS0Qj4nTmlA8dzSLz/G1d+Ud8MTy/6ghhdiLpeerGY/UlDOfiuqFsMUU5/UYlP+BAmgRLuNpvrUaLlVkrqDievNVEAwF+4CoM1MZTmjxjJMsKJq+u8Zd7tNCUFy6LiyYXRJQ4VyvEQFFaCGKsxIwQkk7EzZ6LTJq2hUuPhvAW+gQnSG6J+MszC+7QCRHcnqDdyNRJ6T9xyS87A6MDutbzKGvGktpbXqtzWtXb9HsfK2cBMomjN9a4y+TaJLnXxAeX/HWzmf4cR4vALt/P4w4qgKY04ml4ZdLOinFYS6cup3G/1ie4+t1eOnpBNlqGqs75ilzkT4+DsZQxNvaSKJ//6zIbbk/M7LOhFmRc/1R+kBtz7JFGdZm/COotIdvQoXpTqP/1uqEUmCb/QWoGLMwO5ANcHzxdY48IGP5+J+zKOTBFZ4Pid+GTM+Wq12MV/H86xEJptBa6T+p3kgpwLedManBHC2GgNrFpoN2xnrMz9WFWX/8/ygSBkavq2Uv7FdCsLEYLu9LLIvAU0bNRDtzYl+/vXmjpIvuJFYjmI0im6QEYqnIeMsNjXG4vIutIGHijeAG/9EDBozKV5cldkHbLxHh25vT+ZEzbhXlqvpzKJwcEgfNwLAKFeo0/pvEE10XDB+EXRTXtSzJozQKFFAJhMxYkVaCW+E9AL7tMeU8acxidHqzb6lX4691UsDpy/LLRmT+epgW56+5Cw8tB4kMUv6s9lh3eRKbyGs+H/4mQMaYzPTf2OOdokEn+zzgvoD3FqNKk8QqGAXVsqcGdXrT62fSPkR2vROFi68A6se86UxRUk4cajfPyCC4G5wDhD+zNq4jodQ4u4n/m37Lr36n4LIAAsVr02dFi9AiwA81MYs2rm4eDlDNmdMRvEKRHfBwW5DdMNp0jPFZMeARqF/wL4XBfd+EMLBfMzpH5GH6NaW+1vrvMdg+VxDzatk3MXgO3ro3P/DpcC6+Mo4MySJhKJhSR01SGGGp5hPWmrrUgrv3lDnP+HhcI3nt3YqBoVAVTBAQT5iuhTg8nvPtd8ZeYj6w1x6RqGUBrSku7+N1+BaasZvjTk64RoIDlL8brpEcJx3OmY7jLoZsswdtmhfC/G21llXhITOwmvRDDeTTPbyASOa16cF5/A1fZAidJpqju3wYAy9avPR1ya6eNp9K8XYrrtuxlqi+bDKwlfrYdR0RRiKRVTLOH85+ZY7XSmzRpfZBJjaTa81VDcJHpZnZnSQLASGYW9l51ZV/h7eVzTi3Hv6hUsgc/51AqJRTkpbFVLXXszoBL8nBX0u/0jBLT8nH+fJePbrwURT58OY+UieRjd1vs04w0VG5VN2U6MoGZkQzKN/ptz0Q366dxoTGmj7i1NQGHi9GgnquXFYdrCfZBmeb7s0T6yrdlZH5cZuwHFyIJ/kAtGsTg0xH5taAAq44BAk1CPk9KVVbqQzrCUiFdF/6gtlPQ8bHHc1G1W92MXGZ5HEHftyLYs8mbD/9xYRUWkHmlM0zC2ilJlnNgV4bfALpQghxOUoZL7VTqtCHIaQSXm+YUMnpkXybnV+A6xlm2CVy8fn0Xlm2XRa0+zzOa21JWWmixfiPMSCZ7qA4rS93VN3pkpF1s5TonQjisHf7iU9ZGvUPOAKZcR1pbeVf/Ul7OhepGCaId9wOtqo7pJ7yLcBZ0pFkOF28y4zEI/kcUNmutBHaQpBdNM8vjCS6HZRokkeo88TBAjGyG7SR+6vUgTcyK9Imalj0kuxz0wmK+byQU11AiJFk/ya5dNduRClcnU64yGu/ieWSeOos1t3ep+RPIWQ2pyTYVbZltTbsb7NiwSi3AV+8KLWk7LxCnfZUetEM8ThnsSoGH38/nyAwFguJp8FjvlHtcWZuU4hPva0rHfr0UhOOJ/F6vS62FW7KzkmRll2HEc7oUq4fyi5T70Vl7YVIfsPHUCdHesf9Lk7WNVWO75JDkYbMI8TOW8JKVtLY9d6UJRITO8oKo0xS+o99Yy04iniGHAaGj88kEWgwv0OrHdY/nr76DOGNS59hXCGXzTKUvDl9iKpLSWYN1lxIeyywdNpTkhay74w2jFT6NS8qkjo5CxA1yfSYwp6AJIZNKIeEK5PJAW7ORgWgwp0VgzYpqovMrWxbu+DGZ6Lhie1RAqpzm8VUzKJOH3mCzWuTOLsN3VT/dv2eeYe9UjbR8YTBsLz7q60VN1sU51k+um1f8JxD5pPhbhSC8rRaB454tmh6YUWrJI3+GWY0qeWioj/tbkYITOkJaeuGt4JrJvHA+l0Gu7kY7XOaa05alMnRWVCXqFgLIwSY4uF59Ue5SU4QKuc/HamDxbr0x6csCetXGoP7Qn1Bk/J9DsynO/UD6iZ1Hyrz+jit0hDCwi/E9OjgKTbB3ZQKQ/0ZOvevfNHG0NK4Aj3Cp7NpRk07RT1i/S0EL93Ag8GRgKI9CfpajKyK6+Jj/PI1KO5/85VAwz2AwzP8FTBb075IxCXv6T9RVvWT2tUaqxDS92zrGUbWzUYk9mSs82pECH+fkqsDt93VW++4YsR/dHCYcQSYTO/KaBMDj9LSD/J/+z20Kq8XvZUAIHtm9hRPP3ItbuAu2Hm5lkPs92pd7kCxgRs0xOVBnZ13ccdA0aunrwv9SdqElJRC3g+oCu+nXyCgmXUs9yMjTMAIHfxZV+aPKcZeUBWt057Xo85Ks1Ir5gzEHCWqZEhrLZMuF11ziGtFQUds/EESajhagzcKsxamcSZxGth4UII+adPhQkUnx2WyN+4YWR+r3f8MnkyGFuR4zjzxJS8WsQYR5PTyRaD9ixa6Mh741nBHbzfjXHskGDq179xaRNrCIB1z1xRfWfjqw2pHc1zk9xlPpL8sQWAIuETZZhbnmL54rceXVNRvUiKrrqIkeogsl0XXb17ylNb0f4GA9Wd44vffEG8FSZGHEL2fbaTGRcSiCeA8PmA/f6Hz8HCS76fXUHwgwkzSwlI71ekZ7Fapmlk/KC+Hs8hUcw3N2LN5LhkVYyizYFl/uPeVP5lsoJHhhfWvvSWruCUW1ZcJOeuTbrDgywJ/qG07gZJplnTvLcYdNaH0KMYOYMGX+rB4NGPFmQsNaIwlWrfCezxre8zXBrsMT+edVLbLqN1BqB76JH4BvZTqUIMfGwPGEn+EnmTV86fPBaYbFL3DFEhjB45CewkXEAtJxk4/Ms2pPXnaRqdky0HOYdcUcE2zcXq4vaIvW2/v0nHFJH2XXe22ueDmq/18XGtELSq85j9X8q0tcNSSKJIX8FTuJF/Pf8j5PhqG2u+osvsLxYrvvfeVJL+4tkcXcr9JV7v0ERmj/X6fM3NC4j6dS1+9Umr2oPavqiAydTZPLMNRGY23LO9zAVDly7jD+70G5TPPLdhRIl4WxcYjLnM+SNcJ26FOrkrISUtPObIz5Zb3AG612krnpy15RMW+1cQjlnWFI6538qky9axd2oJmHIHP08KyP0ubGO+TQNOYuv2uh17yCIvR8VcStw7o1g0NM60sk+8Tq7YfIBJrtp53GkvzXH7OA0p8/n/u1satf/VJhtR1l8Wa6Gmaug7haSpaCaYQax6ta0mkutlb+eAOSG1aobM81D9A4iS1RRlzBBoVX6tU1S6WE2N9ORY6DfeLRC4l9Rvr5h95XDWB2mR1d4WFudpsgVYwiTwT31ljskD8ZyDOlm5DkGh9N/UB/0AI5Xvb8ZBmai2hQ4BWMqFwYnzxwB26YHSOv9WgY3JXnvoN+2R4rqGVh/LLDMtpFP+SpMGJNWvbIl5SOodbCczW2RKleksPoUeGEzrjtKHVdtZA+kfqO+rVx/iclCqwoopepvJpSTDjT+b9GWylGRF8EDbGlw6eUzmJM95Ovoz+kwLX3c2fTjFeYEsE7vUZm3mqdGJuKh2w9/QGSaqRHs99aScGOdDqkFcACoqdbBoQqqjamhH6Q9ng39JCg3lrGJwd50Qk9ovnqBTr8MME7Ps2wiVfygUmPoUBJJfJWX5Nda0nuncbFkA=="));
}
const Di = sa(), fa = new Set(Si(Di)), aa = new Set(Si(Di)), ha = ra(Di), ua = oa(Di), no = 45, oo = 95;
function rs(e) {
  return Qf(e);
}
function la(e) {
  return e.filter((t) => t != 65039);
}
function es(e) {
  for (let t of e.split(".")) {
    let r = rs(t);
    try {
      for (let i = r.lastIndexOf(oo) - 1; i >= 0; i--)
        if (r[i] !== oo)
          throw new Error("underscore only allowed at start");
      if (r.length >= 4 && r.every((i) => i < 128) && r[2] === no && r[3] === no)
        throw new Error("invalid label extension");
    } catch (i) {
      throw new Error(`Invalid label "${t}": ${i.message}`);
    }
  }
  return e;
}
function ca(e) {
  return es(da(e, la));
}
function da(e, t) {
  let r = rs(e).reverse(), i = [];
  for (; r.length; ) {
    let f = va(r);
    if (f) {
      i.push(...t(f));
      continue;
    }
    let o = r.pop();
    if (fa.has(o)) {
      i.push(o);
      continue;
    }
    if (aa.has(o))
      continue;
    let u = ha[o];
    if (u) {
      i.push(...u);
      continue;
    }
    throw new Error(`Disallowed codepoint: 0x${o.toString(16).toUpperCase()}`);
  }
  return es(pa(String.fromCodePoint(...i)));
}
function pa(e) {
  return e.normalize("NFC");
}
function va(e, t) {
  var r;
  let i = ua, f, o, u = [], l = e.length;
  for (t && (t.length = 0); l; ) {
    let x = e[--l];
    if (i = (r = i.branches.find((b) => b.set.has(x))) === null || r === void 0 ? void 0 : r.node, !i)
      break;
    if (i.save)
      o = x;
    else if (i.check && x === o)
      break;
    u.push(x), i.fe0f && (u.push(65039), l > 0 && e[l - 1] == 65039 && l--), i.valid && (f = u.slice(), i.valid == 2 && f.splice(1, 1), t && t.push(...e.slice(l).reverse()), e.length = l);
  }
  return f;
}
const ga = new U(Vo), is = new Uint8Array(32);
is.fill(0);
function so(e) {
  if (e.length === 0)
    throw new Error("invalid ENS name; empty component");
  return e;
}
function ns(e) {
  const t = ae(ca(e)), r = [];
  if (e.length === 0)
    return r;
  let i = 0;
  for (let f = 0; f < t.length; f++)
    t[f] === 46 && (r.push(so(t.slice(i, f))), i = f + 1);
  if (i >= t.length)
    throw new Error("invalid ENS name; empty component");
  return r.push(so(t.slice(i))), r;
}
function bi(e) {
  typeof e != "string" && ga.throwArgumentError("invalid ENS name; not a string", "name", e);
  let t = is;
  const r = ns(e);
  for (; r.length; )
    t = sr(Ce([t, sr(r.pop())]));
  return Tt(t);
}
function ma(e) {
  return Tt(Ce(ns(e).map((t) => {
    if (t.length > 63)
      throw new Error("invalid DNS encoded entry; length exceeds 63 bytes");
    const r = new Uint8Array(t.length + 1);
    return r.set(t, 1), r[0] = r.length - 1, r;
  }))) + "00";
}
var wa = globalThis && globalThis.__awaiter || function(e, t, r, i) {
  function f(o) {
    return o instanceof r ? o : new r(function(u) {
      u(o);
    });
  }
  return new (r || (r = Promise))(function(o, u) {
    function l(_) {
      try {
        b(i.next(_));
      } catch (I) {
        u(I);
      }
    }
    function x(_) {
      try {
        b(i.throw(_));
      } catch (I) {
        u(I);
      }
    }
    function b(_) {
      _.done ? o(_.value) : f(_.value).then(l, x);
    }
    b((i = i.apply(e, t || [])).next());
  });
};
const Xt = new U(Vo), os = new Uint8Array(32);
os.fill(0);
const ya = ct.from(-1), ss = ct.from(0), fs = ct.from(1), xa = ct.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
function Aa(e) {
  const t = Ut(e), r = t.length % 32;
  return r ? Er([t, os.slice(r)]) : Tt(t);
}
const ba = er(fs.toHexString(), 32), Ma = er(ss.toHexString(), 32), fo = {
  name: "string",
  version: "string",
  chainId: "uint256",
  verifyingContract: "address",
  salt: "bytes32"
}, Xi = [
  "name",
  "version",
  "chainId",
  "verifyingContract",
  "salt"
];
function ao(e) {
  return function(t) {
    return typeof t != "string" && Xt.throwArgumentError(`invalid domain value for ${JSON.stringify(e)}`, `domain.${e}`, t), t;
  };
}
const _a = {
  name: ao("name"),
  version: ao("version"),
  chainId: function(e) {
    try {
      return ct.from(e).toString();
    } catch {
    }
    return Xt.throwArgumentError('invalid domain value for "chainId"', "domain.chainId", e);
  },
  verifyingContract: function(e) {
    try {
      return Kr(e).toLowerCase();
    } catch {
    }
    return Xt.throwArgumentError('invalid domain value "verifyingContract"', "domain.verifyingContract", e);
  },
  salt: function(e) {
    try {
      const t = Ut(e);
      if (t.length !== 32)
        throw new Error("bad length");
      return Tt(t);
    } catch {
    }
    return Xt.throwArgumentError('invalid domain value "salt"', "domain.salt", e);
  }
};
function Zi(e) {
  {
    const t = e.match(/^(u?)int(\d*)$/);
    if (t) {
      const r = t[1] === "", i = parseInt(t[2] || "256");
      (i % 8 !== 0 || i > 256 || t[2] && t[2] !== String(i)) && Xt.throwArgumentError("invalid numeric width", "type", e);
      const f = xa.mask(r ? i - 1 : i), o = r ? f.add(fs).mul(ya) : ss;
      return function(u) {
        const l = ct.from(u);
        return (l.lt(o) || l.gt(f)) && Xt.throwArgumentError(`value out-of-bounds for ${e}`, "value", u), er(l.toTwos(256).toHexString(), 32);
      };
    }
  }
  {
    const t = e.match(/^bytes(\d+)$/);
    if (t) {
      const r = parseInt(t[1]);
      return (r === 0 || r > 32 || t[1] !== String(r)) && Xt.throwArgumentError("invalid bytes width", "type", e), function(i) {
        return Ut(i).length !== r && Xt.throwArgumentError(`invalid length for ${e}`, "value", i), Aa(i);
      };
    }
  }
  switch (e) {
    case "address":
      return function(t) {
        return er(Kr(t), 32);
      };
    case "bool":
      return function(t) {
        return t ? ba : Ma;
      };
    case "bytes":
      return function(t) {
        return sr(t);
      };
    case "string":
      return function(t) {
        return jo(t);
      };
  }
  return null;
}
function ho(e, t) {
  return `${e}(${t.map(({ name: r, type: i }) => i + " " + r).join(",")})`;
}
class Ar {
  constructor(t) {
    Yt(this, "types", Object.freeze(Fe(t))), Yt(this, "_encoderCache", {}), Yt(this, "_types", {});
    const r = {}, i = {}, f = {};
    Object.keys(t).forEach((l) => {
      r[l] = {}, i[l] = [], f[l] = {};
    });
    for (const l in t) {
      const x = {};
      t[l].forEach((b) => {
        x[b.name] && Xt.throwArgumentError(`duplicate variable name ${JSON.stringify(b.name)} in ${JSON.stringify(l)}`, "types", t), x[b.name] = !0;
        const _ = b.type.match(/^([^\x5b]*)(\x5b|$)/)[1];
        _ === l && Xt.throwArgumentError(`circular type reference to ${JSON.stringify(_)}`, "types", t), !Zi(_) && (i[_] || Xt.throwArgumentError(`unknown type ${JSON.stringify(_)}`, "types", t), i[_].push(l), r[l][_] = !0);
      });
    }
    const o = Object.keys(i).filter((l) => i[l].length === 0);
    o.length === 0 ? Xt.throwArgumentError("missing primary type", "types", t) : o.length > 1 && Xt.throwArgumentError(`ambiguous primary types or unused types: ${o.map((l) => JSON.stringify(l)).join(", ")}`, "types", t), Yt(this, "primaryType", o[0]);
    function u(l, x) {
      x[l] && Xt.throwArgumentError(`circular type reference to ${JSON.stringify(l)}`, "types", t), x[l] = !0, Object.keys(r[l]).forEach((b) => {
        i[b] && (u(b, x), Object.keys(x).forEach((_) => {
          f[_][b] = !0;
        }));
      }), delete x[l];
    }
    u(this.primaryType, {});
    for (const l in f) {
      const x = Object.keys(f[l]);
      x.sort(), this._types[l] = ho(l, t[l]) + x.map((b) => ho(b, t[b])).join("");
    }
  }
  getEncoder(t) {
    let r = this._encoderCache[t];
    return r || (r = this._encoderCache[t] = this._getEncoder(t)), r;
  }
  _getEncoder(t) {
    {
      const f = Zi(t);
      if (f)
        return f;
    }
    const r = t.match(/^(.*)(\x5b(\d*)\x5d)$/);
    if (r) {
      const f = r[1], o = this.getEncoder(f), u = parseInt(r[3]);
      return (l) => {
        u >= 0 && l.length !== u && Xt.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", l);
        let x = l.map(o);
        return this._types[f] && (x = x.map(sr)), sr(Er(x));
      };
    }
    const i = this.types[t];
    if (i) {
      const f = jo(this._types[t]);
      return (o) => {
        const u = i.map(({ name: l, type: x }) => {
          const b = this.getEncoder(x)(o[l]);
          return this._types[x] ? sr(b) : b;
        });
        return u.unshift(f), Er(u);
      };
    }
    return Xt.throwArgumentError(`unknown type: ${t}`, "type", t);
  }
  encodeType(t) {
    const r = this._types[t];
    return r || Xt.throwArgumentError(`unknown type: ${JSON.stringify(t)}`, "name", t), r;
  }
  encodeData(t, r) {
    return this.getEncoder(t)(r);
  }
  hashStruct(t, r) {
    return sr(this.encodeData(t, r));
  }
  encode(t) {
    return this.encodeData(this.primaryType, t);
  }
  hash(t) {
    return this.hashStruct(this.primaryType, t);
  }
  _visit(t, r, i) {
    if (Zi(t))
      return i(t, r);
    const f = t.match(/^(.*)(\x5b(\d*)\x5d)$/);
    if (f) {
      const u = f[1], l = parseInt(f[3]);
      return l >= 0 && r.length !== l && Xt.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", r), r.map((x) => this._visit(u, x, i));
    }
    const o = this.types[t];
    return o ? o.reduce((u, { name: l, type: x }) => (u[l] = this._visit(x, r[l], i), u), {}) : Xt.throwArgumentError(`unknown type: ${t}`, "type", t);
  }
  visit(t, r) {
    return this._visit(this.primaryType, t, r);
  }
  static from(t) {
    return new Ar(t);
  }
  static getPrimaryType(t) {
    return Ar.from(t).primaryType;
  }
  static hashStruct(t, r, i) {
    return Ar.from(r).hashStruct(t, i);
  }
  static hashDomain(t) {
    const r = [];
    for (const i in t) {
      const f = fo[i];
      f || Xt.throwArgumentError(`invalid typed-data domain key: ${JSON.stringify(i)}`, "domain", t), r.push({ name: i, type: f });
    }
    return r.sort((i, f) => Xi.indexOf(i.name) - Xi.indexOf(f.name)), Ar.hashStruct("EIP712Domain", { EIP712Domain: r }, t);
  }
  static encode(t, r, i) {
    return Er([
      "0x1901",
      Ar.hashDomain(t),
      Ar.from(r).hash(i)
    ]);
  }
  static hash(t, r, i) {
    return sr(Ar.encode(t, r, i));
  }
  // Replaces all address types with ENS names with their looked up address
  static resolveNames(t, r, i, f) {
    return wa(this, void 0, void 0, function* () {
      t = pr(t);
      const o = {};
      t.verifyingContract && !Vt(t.verifyingContract, 20) && (o[t.verifyingContract] = "0x");
      const u = Ar.from(r);
      u.visit(i, (l, x) => (l === "address" && !Vt(x, 20) && (o[x] = "0x"), x));
      for (const l in o)
        o[l] = yield f(l);
      return t.verifyingContract && o[t.verifyingContract] && (t.verifyingContract = o[t.verifyingContract]), i = u.visit(i, (l, x) => l === "address" && o[x] ? o[x] : x), { domain: t, value: i };
    });
  }
  static getPayload(t, r, i) {
    Ar.hashDomain(t);
    const f = {}, o = [];
    Xi.forEach((x) => {
      const b = t[x];
      b != null && (f[x] = _a[x](b), o.push({ name: x, type: fo[x] }));
    });
    const u = Ar.from(r), l = pr(r);
    return l.EIP712Domain ? Xt.throwArgumentError("types must not contain EIP712Domain type", "types.EIP712Domain", r) : l.EIP712Domain = o, u.encode(i), {
      types: l,
      domain: f,
      primaryType: u.primaryType,
      message: u.visit(i, (x, b) => {
        if (x.match(/^bytes(\d*)/))
          return Tt(Ut(b));
        if (x.match(/^u?int/))
          return ct.from(b).toString();
        switch (x) {
          case "address":
            return b.toLowerCase();
          case "bool":
            return !!b;
          case "string":
            return typeof b != "string" && Xt.throwArgumentError("invalid string", "value", b), b;
        }
        return Xt.throwArgumentError("unsupported type", "type", x);
      })
    };
  }
}
const Ea = "abstract-provider/5.7.0";
var Na = globalThis && globalThis.__awaiter || function(e, t, r, i) {
  function f(o) {
    return o instanceof r ? o : new r(function(u) {
      u(o);
    });
  }
  return new (r || (r = Promise))(function(o, u) {
    function l(_) {
      try {
        b(i.next(_));
      } catch (I) {
        u(I);
      }
    }
    function x(_) {
      try {
        b(i.throw(_));
      } catch (I) {
        u(I);
      }
    }
    function b(_) {
      _.done ? o(_.value) : f(_.value).then(l, x);
    }
    b((i = i.apply(e, t || [])).next());
  });
};
const Ia = new U(Ea);
class Sa extends Rf {
  static isForkEvent(t) {
    return !!(t && t._isForkEvent);
  }
}
class Tn {
  constructor() {
    Ia.checkAbstract(new.target, Tn), Yt(this, "_isProvider", !0);
  }
  getFeeData() {
    return Na(this, void 0, void 0, function* () {
      const { block: t, gasPrice: r } = yield or({
        block: this.getBlock("latest"),
        gasPrice: this.getGasPrice().catch((u) => null)
      });
      let i = null, f = null, o = null;
      return t && t.baseFeePerGas && (i = t.baseFeePerGas, o = ct.from("1500000000"), f = t.baseFeePerGas.mul(2).add(o)), { lastBaseFeePerGas: i, maxFeePerGas: f, maxPriorityFeePerGas: o, gasPrice: r };
    });
  }
  // Alias for "on"
  addListener(t, r) {
    return this.on(t, r);
  }
  // Alias for "off"
  removeListener(t, r) {
    return this.off(t, r);
  }
  static isProvider(t) {
    return !!(t && t._isProvider);
  }
}
const ka = "abstract-signer/5.7.0";
var Ur = globalThis && globalThis.__awaiter || function(e, t, r, i) {
  function f(o) {
    return o instanceof r ? o : new r(function(u) {
      u(o);
    });
  }
  return new (r || (r = Promise))(function(o, u) {
    function l(_) {
      try {
        b(i.next(_));
      } catch (I) {
        u(I);
      }
    }
    function x(_) {
      try {
        b(i.throw(_));
      } catch (I) {
        u(I);
      }
    }
    function b(_) {
      _.done ? o(_.value) : f(_.value).then(l, x);
    }
    b((i = i.apply(e, t || [])).next());
  });
};
const Lr = new U(ka), Ra = [
  "accessList",
  "ccipReadEnabled",
  "chainId",
  "customData",
  "data",
  "from",
  "gasLimit",
  "gasPrice",
  "maxFeePerGas",
  "maxPriorityFeePerGas",
  "nonce",
  "to",
  "type",
  "value"
], Pa = [
  U.errors.INSUFFICIENT_FUNDS,
  U.errors.NONCE_EXPIRED,
  U.errors.REPLACEMENT_UNDERPRICED
];
class On {
  ///////////////////
  // Sub-classes MUST call super
  constructor() {
    Lr.checkAbstract(new.target, On), Yt(this, "_isSigner", !0);
  }
  ///////////////////
  // Sub-classes MAY override these
  getBalance(t) {
    return Ur(this, void 0, void 0, function* () {
      return this._checkProvider("getBalance"), yield this.provider.getBalance(this.getAddress(), t);
    });
  }
  getTransactionCount(t) {
    return Ur(this, void 0, void 0, function* () {
      return this._checkProvider("getTransactionCount"), yield this.provider.getTransactionCount(this.getAddress(), t);
    });
  }
  // Populates "from" if unspecified, and estimates the gas for the transaction
  estimateGas(t) {
    return Ur(this, void 0, void 0, function* () {
      this._checkProvider("estimateGas");
      const r = yield or(this.checkTransaction(t));
      return yield this.provider.estimateGas(r);
    });
  }
  // Populates "from" if unspecified, and calls with the transaction
  call(t, r) {
    return Ur(this, void 0, void 0, function* () {
      this._checkProvider("call");
      const i = yield or(this.checkTransaction(t));
      return yield this.provider.call(i, r);
    });
  }
  // Populates all fields in a transaction, signs it and sends it to the network
  sendTransaction(t) {
    return Ur(this, void 0, void 0, function* () {
      this._checkProvider("sendTransaction");
      const r = yield this.populateTransaction(t), i = yield this.signTransaction(r);
      return yield this.provider.sendTransaction(i);
    });
  }
  getChainId() {
    return Ur(this, void 0, void 0, function* () {
      return this._checkProvider("getChainId"), (yield this.provider.getNetwork()).chainId;
    });
  }
  getGasPrice() {
    return Ur(this, void 0, void 0, function* () {
      return this._checkProvider("getGasPrice"), yield this.provider.getGasPrice();
    });
  }
  getFeeData() {
    return Ur(this, void 0, void 0, function* () {
      return this._checkProvider("getFeeData"), yield this.provider.getFeeData();
    });
  }
  resolveName(t) {
    return Ur(this, void 0, void 0, function* () {
      return this._checkProvider("resolveName"), yield this.provider.resolveName(t);
    });
  }
  // Checks a transaction does not contain invalid keys and if
  // no "from" is provided, populates it.
  // - does NOT require a provider
  // - adds "from" is not present
  // - returns a COPY (safe to mutate the result)
  // By default called from: (overriding these prevents it)
  //   - call
  //   - estimateGas
  //   - populateTransaction (and therefor sendTransaction)
  checkTransaction(t) {
    for (const i in t)
      Ra.indexOf(i) === -1 && Lr.throwArgumentError("invalid transaction key: " + i, "transaction", t);
    const r = pr(t);
    return r.from == null ? r.from = this.getAddress() : r.from = Promise.all([
      Promise.resolve(r.from),
      this.getAddress()
    ]).then((i) => (i[0].toLowerCase() !== i[1].toLowerCase() && Lr.throwArgumentError("from address mismatch", "transaction", t), i[0])), r;
  }
  // Populates ALL keys for a transaction and checks that "from" matches
  // this Signer. Should be used by sendTransaction but NOT by signTransaction.
  // By default called from: (overriding these prevents it)
  //   - sendTransaction
  //
  // Notes:
  //  - We allow gasPrice for EIP-1559 as long as it matches maxFeePerGas
  populateTransaction(t) {
    return Ur(this, void 0, void 0, function* () {
      const r = yield or(this.checkTransaction(t));
      r.to != null && (r.to = Promise.resolve(r.to).then((f) => Ur(this, void 0, void 0, function* () {
        if (f == null)
          return null;
        const o = yield this.resolveName(f);
        return o == null && Lr.throwArgumentError("provided ENS name resolves to null", "tx.to", f), o;
      })), r.to.catch((f) => {
      }));
      const i = r.maxFeePerGas != null || r.maxPriorityFeePerGas != null;
      if (r.gasPrice != null && (r.type === 2 || i) ? Lr.throwArgumentError("eip-1559 transaction do not support gasPrice", "transaction", t) : (r.type === 0 || r.type === 1) && i && Lr.throwArgumentError("pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "transaction", t), (r.type === 2 || r.type == null) && r.maxFeePerGas != null && r.maxPriorityFeePerGas != null)
        r.type = 2;
      else if (r.type === 0 || r.type === 1)
        r.gasPrice == null && (r.gasPrice = this.getGasPrice());
      else {
        const f = yield this.getFeeData();
        if (r.type == null)
          if (f.maxFeePerGas != null && f.maxPriorityFeePerGas != null)
            if (r.type = 2, r.gasPrice != null) {
              const o = r.gasPrice;
              delete r.gasPrice, r.maxFeePerGas = o, r.maxPriorityFeePerGas = o;
            } else
              r.maxFeePerGas == null && (r.maxFeePerGas = f.maxFeePerGas), r.maxPriorityFeePerGas == null && (r.maxPriorityFeePerGas = f.maxPriorityFeePerGas);
          else
            f.gasPrice != null ? (i && Lr.throwError("network does not support EIP-1559", U.errors.UNSUPPORTED_OPERATION, {
              operation: "populateTransaction"
            }), r.gasPrice == null && (r.gasPrice = f.gasPrice), r.type = 0) : Lr.throwError("failed to get consistent fee data", U.errors.UNSUPPORTED_OPERATION, {
              operation: "signer.getFeeData"
            });
        else
          r.type === 2 && (r.maxFeePerGas == null && (r.maxFeePerGas = f.maxFeePerGas), r.maxPriorityFeePerGas == null && (r.maxPriorityFeePerGas = f.maxPriorityFeePerGas));
      }
      return r.nonce == null && (r.nonce = this.getTransactionCount("pending")), r.gasLimit == null && (r.gasLimit = this.estimateGas(r).catch((f) => {
        if (Pa.indexOf(f.code) >= 0)
          throw f;
        return Lr.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", U.errors.UNPREDICTABLE_GAS_LIMIT, {
          error: f,
          tx: r
        });
      })), r.chainId == null ? r.chainId = this.getChainId() : r.chainId = Promise.all([
        Promise.resolve(r.chainId),
        this.getChainId()
      ]).then((f) => (f[1] !== 0 && f[0] !== f[1] && Lr.throwArgumentError("chainId address mismatch", "transaction", t), f[0])), yield or(r);
    });
  }
  ///////////////////
  // Sub-classes SHOULD leave these alone
  _checkProvider(t) {
    this.provider || Lr.throwError("missing provider", U.errors.UNSUPPORTED_OPERATION, {
      operation: t || "_checkProvider"
    });
  }
  static isSigner(t) {
    return !!(t && t._isSigner);
  }
}
var wn = {}, Ba = {
  get exports() {
    return wn;
  },
  set exports(e) {
    wn = e;
  }
};
(function(e) {
  (function(t, r) {
    function i(w, n) {
      if (!w)
        throw new Error(n || "Assertion failed");
    }
    function f(w, n) {
      w.super_ = n;
      var a = function() {
      };
      a.prototype = n.prototype, w.prototype = new a(), w.prototype.constructor = w;
    }
    function o(w, n, a) {
      if (o.isBN(w))
        return w;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, w !== null && ((n === "le" || n === "be") && (a = n, n = 10), this._init(w || 0, n || 10, a || "be"));
    }
    typeof t == "object" ? t.exports = o : r.BN = o, o.BN = o, o.wordSize = 26;
    var u;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? u = window.Buffer : u = Sn.Buffer;
    } catch {
    }
    o.isBN = function(n) {
      return n instanceof o ? !0 : n !== null && typeof n == "object" && n.constructor.wordSize === o.wordSize && Array.isArray(n.words);
    }, o.max = function(n, a) {
      return n.cmp(a) > 0 ? n : a;
    }, o.min = function(n, a) {
      return n.cmp(a) < 0 ? n : a;
    }, o.prototype._init = function(n, a, h) {
      if (typeof n == "number")
        return this._initNumber(n, a, h);
      if (typeof n == "object")
        return this._initArray(n, a, h);
      a === "hex" && (a = 16), i(a === (a | 0) && a >= 2 && a <= 36), n = n.toString().replace(/\s+/g, "");
      var v = 0;
      n[0] === "-" && (v++, this.negative = 1), v < n.length && (a === 16 ? this._parseHex(n, v, h) : (this._parseBase(n, a, v), h === "le" && this._initArray(this.toArray(), a, h)));
    }, o.prototype._initNumber = function(n, a, h) {
      n < 0 && (this.negative = 1, n = -n), n < 67108864 ? (this.words = [n & 67108863], this.length = 1) : n < 4503599627370496 ? (this.words = [
        n & 67108863,
        n / 67108864 & 67108863
      ], this.length = 2) : (i(n < 9007199254740992), this.words = [
        n & 67108863,
        n / 67108864 & 67108863,
        1
      ], this.length = 3), h === "le" && this._initArray(this.toArray(), a, h);
    }, o.prototype._initArray = function(n, a, h) {
      if (i(typeof n.length == "number"), n.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(n.length / 3), this.words = new Array(this.length);
      for (var v = 0; v < this.length; v++)
        this.words[v] = 0;
      var m, A, M = 0;
      if (h === "be")
        for (v = n.length - 1, m = 0; v >= 0; v -= 3)
          A = n[v] | n[v - 1] << 8 | n[v - 2] << 16, this.words[m] |= A << M & 67108863, this.words[m + 1] = A >>> 26 - M & 67108863, M += 24, M >= 26 && (M -= 26, m++);
      else if (h === "le")
        for (v = 0, m = 0; v < n.length; v += 3)
          A = n[v] | n[v + 1] << 8 | n[v + 2] << 16, this.words[m] |= A << M & 67108863, this.words[m + 1] = A >>> 26 - M & 67108863, M += 24, M >= 26 && (M -= 26, m++);
      return this._strip();
    };
    function l(w, n) {
      var a = w.charCodeAt(n);
      if (a >= 48 && a <= 57)
        return a - 48;
      if (a >= 65 && a <= 70)
        return a - 55;
      if (a >= 97 && a <= 102)
        return a - 87;
      i(!1, "Invalid character in " + w);
    }
    function x(w, n, a) {
      var h = l(w, a);
      return a - 1 >= n && (h |= l(w, a - 1) << 4), h;
    }
    o.prototype._parseHex = function(n, a, h) {
      this.length = Math.ceil((n.length - a) / 6), this.words = new Array(this.length);
      for (var v = 0; v < this.length; v++)
        this.words[v] = 0;
      var m = 0, A = 0, M;
      if (h === "be")
        for (v = n.length - 1; v >= a; v -= 2)
          M = x(n, a, v) << m, this.words[A] |= M & 67108863, m >= 18 ? (m -= 18, A += 1, this.words[A] |= M >>> 26) : m += 8;
      else {
        var d = n.length - a;
        for (v = d % 2 === 0 ? a + 1 : a; v < n.length; v += 2)
          M = x(n, a, v) << m, this.words[A] |= M & 67108863, m >= 18 ? (m -= 18, A += 1, this.words[A] |= M >>> 26) : m += 8;
      }
      this._strip();
    };
    function b(w, n, a, h) {
      for (var v = 0, m = 0, A = Math.min(w.length, a), M = n; M < A; M++) {
        var d = w.charCodeAt(M) - 48;
        v *= h, d >= 49 ? m = d - 49 + 10 : d >= 17 ? m = d - 17 + 10 : m = d, i(d >= 0 && m < h, "Invalid character"), v += m;
      }
      return v;
    }
    o.prototype._parseBase = function(n, a, h) {
      this.words = [0], this.length = 1;
      for (var v = 0, m = 1; m <= 67108863; m *= a)
        v++;
      v--, m = m / a | 0;
      for (var A = n.length - h, M = A % v, d = Math.min(A, A - M) + h, s = 0, g = h; g < d; g += v)
        s = b(n, g, g + v, a), this.imuln(m), this.words[0] + s < 67108864 ? this.words[0] += s : this._iaddn(s);
      if (M !== 0) {
        var H = 1;
        for (s = b(n, g, n.length, a), g = 0; g < M; g++)
          H *= a;
        this.imuln(H), this.words[0] + s < 67108864 ? this.words[0] += s : this._iaddn(s);
      }
      this._strip();
    }, o.prototype.copy = function(n) {
      n.words = new Array(this.length);
      for (var a = 0; a < this.length; a++)
        n.words[a] = this.words[a];
      n.length = this.length, n.negative = this.negative, n.red = this.red;
    };
    function _(w, n) {
      w.words = n.words, w.length = n.length, w.negative = n.negative, w.red = n.red;
    }
    if (o.prototype._move = function(n) {
      _(n, this);
    }, o.prototype.clone = function() {
      var n = new o(null);
      return this.copy(n), n;
    }, o.prototype._expand = function(n) {
      for (; this.length < n; )
        this.words[this.length++] = 0;
      return this;
    }, o.prototype._strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, o.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, typeof Symbol < "u" && typeof Symbol.for == "function")
      try {
        o.prototype[Symbol.for("nodejs.util.inspect.custom")] = I;
      } catch {
        o.prototype.inspect = I;
      }
    else
      o.prototype.inspect = I;
    function I() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var P = [
      "",
      "0",
      "00",
      "000",
      "0000",
      "00000",
      "000000",
      "0000000",
      "00000000",
      "000000000",
      "0000000000",
      "00000000000",
      "000000000000",
      "0000000000000",
      "00000000000000",
      "000000000000000",
      "0000000000000000",
      "00000000000000000",
      "000000000000000000",
      "0000000000000000000",
      "00000000000000000000",
      "000000000000000000000",
      "0000000000000000000000",
      "00000000000000000000000",
      "000000000000000000000000",
      "0000000000000000000000000"
    ], B = [
      0,
      0,
      25,
      16,
      12,
      11,
      10,
      9,
      8,
      8,
      7,
      7,
      7,
      7,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ], O = [
      0,
      0,
      33554432,
      43046721,
      16777216,
      48828125,
      60466176,
      40353607,
      16777216,
      43046721,
      1e7,
      19487171,
      35831808,
      62748517,
      7529536,
      11390625,
      16777216,
      24137569,
      34012224,
      47045881,
      64e6,
      4084101,
      5153632,
      6436343,
      7962624,
      9765625,
      11881376,
      14348907,
      17210368,
      20511149,
      243e5,
      28629151,
      33554432,
      39135393,
      45435424,
      52521875,
      60466176
    ];
    o.prototype.toString = function(n, a) {
      n = n || 10, a = a | 0 || 1;
      var h;
      if (n === 16 || n === "hex") {
        h = "";
        for (var v = 0, m = 0, A = 0; A < this.length; A++) {
          var M = this.words[A], d = ((M << v | m) & 16777215).toString(16);
          m = M >>> 24 - v & 16777215, v += 2, v >= 26 && (v -= 26, A--), m !== 0 || A !== this.length - 1 ? h = P[6 - d.length] + d + h : h = d + h;
        }
        for (m !== 0 && (h = m.toString(16) + h); h.length % a !== 0; )
          h = "0" + h;
        return this.negative !== 0 && (h = "-" + h), h;
      }
      if (n === (n | 0) && n >= 2 && n <= 36) {
        var s = B[n], g = O[n];
        h = "";
        var H = this.clone();
        for (H.negative = 0; !H.isZero(); ) {
          var y = H.modrn(g).toString(n);
          H = H.idivn(g), H.isZero() ? h = y + h : h = P[s - y.length] + y + h;
        }
        for (this.isZero() && (h = "0" + h); h.length % a !== 0; )
          h = "0" + h;
        return this.negative !== 0 && (h = "-" + h), h;
      }
      i(!1, "Base should be between 2 and 36");
    }, o.prototype.toNumber = function() {
      var n = this.words[0];
      return this.length === 2 ? n += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? n += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -n : n;
    }, o.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, u && (o.prototype.toBuffer = function(n, a) {
      return this.toArrayLike(u, n, a);
    }), o.prototype.toArray = function(n, a) {
      return this.toArrayLike(Array, n, a);
    };
    var q = function(n, a) {
      return n.allocUnsafe ? n.allocUnsafe(a) : new n(a);
    };
    o.prototype.toArrayLike = function(n, a, h) {
      this._strip();
      var v = this.byteLength(), m = h || Math.max(1, v);
      i(v <= m, "byte array longer than desired length"), i(m > 0, "Requested array length <= 0");
      var A = q(n, m), M = a === "le" ? "LE" : "BE";
      return this["_toArrayLike" + M](A, v), A;
    }, o.prototype._toArrayLikeLE = function(n, a) {
      for (var h = 0, v = 0, m = 0, A = 0; m < this.length; m++) {
        var M = this.words[m] << A | v;
        n[h++] = M & 255, h < n.length && (n[h++] = M >> 8 & 255), h < n.length && (n[h++] = M >> 16 & 255), A === 6 ? (h < n.length && (n[h++] = M >> 24 & 255), v = 0, A = 0) : (v = M >>> 24, A += 2);
      }
      if (h < n.length)
        for (n[h++] = v; h < n.length; )
          n[h++] = 0;
    }, o.prototype._toArrayLikeBE = function(n, a) {
      for (var h = n.length - 1, v = 0, m = 0, A = 0; m < this.length; m++) {
        var M = this.words[m] << A | v;
        n[h--] = M & 255, h >= 0 && (n[h--] = M >> 8 & 255), h >= 0 && (n[h--] = M >> 16 & 255), A === 6 ? (h >= 0 && (n[h--] = M >> 24 & 255), v = 0, A = 0) : (v = M >>> 24, A += 2);
      }
      if (h >= 0)
        for (n[h--] = v; h >= 0; )
          n[h--] = 0;
    }, Math.clz32 ? o.prototype._countBits = function(n) {
      return 32 - Math.clz32(n);
    } : o.prototype._countBits = function(n) {
      var a = n, h = 0;
      return a >= 4096 && (h += 13, a >>>= 13), a >= 64 && (h += 7, a >>>= 7), a >= 8 && (h += 4, a >>>= 4), a >= 2 && (h += 2, a >>>= 2), h + a;
    }, o.prototype._zeroBits = function(n) {
      if (n === 0)
        return 26;
      var a = n, h = 0;
      return a & 8191 || (h += 13, a >>>= 13), a & 127 || (h += 7, a >>>= 7), a & 15 || (h += 4, a >>>= 4), a & 3 || (h += 2, a >>>= 2), a & 1 || h++, h;
    }, o.prototype.bitLength = function() {
      var n = this.words[this.length - 1], a = this._countBits(n);
      return (this.length - 1) * 26 + a;
    };
    function ot(w) {
      for (var n = new Array(w.bitLength()), a = 0; a < n.length; a++) {
        var h = a / 26 | 0, v = a % 26;
        n[a] = w.words[h] >>> v & 1;
      }
      return n;
    }
    o.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var n = 0, a = 0; a < this.length; a++) {
        var h = this._zeroBits(this.words[a]);
        if (n += h, h !== 26)
          break;
      }
      return n;
    }, o.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, o.prototype.toTwos = function(n) {
      return this.negative !== 0 ? this.abs().inotn(n).iaddn(1) : this.clone();
    }, o.prototype.fromTwos = function(n) {
      return this.testn(n - 1) ? this.notn(n).iaddn(1).ineg() : this.clone();
    }, o.prototype.isNeg = function() {
      return this.negative !== 0;
    }, o.prototype.neg = function() {
      return this.clone().ineg();
    }, o.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, o.prototype.iuor = function(n) {
      for (; this.length < n.length; )
        this.words[this.length++] = 0;
      for (var a = 0; a < n.length; a++)
        this.words[a] = this.words[a] | n.words[a];
      return this._strip();
    }, o.prototype.ior = function(n) {
      return i((this.negative | n.negative) === 0), this.iuor(n);
    }, o.prototype.or = function(n) {
      return this.length > n.length ? this.clone().ior(n) : n.clone().ior(this);
    }, o.prototype.uor = function(n) {
      return this.length > n.length ? this.clone().iuor(n) : n.clone().iuor(this);
    }, o.prototype.iuand = function(n) {
      var a;
      this.length > n.length ? a = n : a = this;
      for (var h = 0; h < a.length; h++)
        this.words[h] = this.words[h] & n.words[h];
      return this.length = a.length, this._strip();
    }, o.prototype.iand = function(n) {
      return i((this.negative | n.negative) === 0), this.iuand(n);
    }, o.prototype.and = function(n) {
      return this.length > n.length ? this.clone().iand(n) : n.clone().iand(this);
    }, o.prototype.uand = function(n) {
      return this.length > n.length ? this.clone().iuand(n) : n.clone().iuand(this);
    }, o.prototype.iuxor = function(n) {
      var a, h;
      this.length > n.length ? (a = this, h = n) : (a = n, h = this);
      for (var v = 0; v < h.length; v++)
        this.words[v] = a.words[v] ^ h.words[v];
      if (this !== a)
        for (; v < a.length; v++)
          this.words[v] = a.words[v];
      return this.length = a.length, this._strip();
    }, o.prototype.ixor = function(n) {
      return i((this.negative | n.negative) === 0), this.iuxor(n);
    }, o.prototype.xor = function(n) {
      return this.length > n.length ? this.clone().ixor(n) : n.clone().ixor(this);
    }, o.prototype.uxor = function(n) {
      return this.length > n.length ? this.clone().iuxor(n) : n.clone().iuxor(this);
    }, o.prototype.inotn = function(n) {
      i(typeof n == "number" && n >= 0);
      var a = Math.ceil(n / 26) | 0, h = n % 26;
      this._expand(a), h > 0 && a--;
      for (var v = 0; v < a; v++)
        this.words[v] = ~this.words[v] & 67108863;
      return h > 0 && (this.words[v] = ~this.words[v] & 67108863 >> 26 - h), this._strip();
    }, o.prototype.notn = function(n) {
      return this.clone().inotn(n);
    }, o.prototype.setn = function(n, a) {
      i(typeof n == "number" && n >= 0);
      var h = n / 26 | 0, v = n % 26;
      return this._expand(h + 1), a ? this.words[h] = this.words[h] | 1 << v : this.words[h] = this.words[h] & ~(1 << v), this._strip();
    }, o.prototype.iadd = function(n) {
      var a;
      if (this.negative !== 0 && n.negative === 0)
        return this.negative = 0, a = this.isub(n), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && n.negative !== 0)
        return n.negative = 0, a = this.isub(n), n.negative = 1, a._normSign();
      var h, v;
      this.length > n.length ? (h = this, v = n) : (h = n, v = this);
      for (var m = 0, A = 0; A < v.length; A++)
        a = (h.words[A] | 0) + (v.words[A] | 0) + m, this.words[A] = a & 67108863, m = a >>> 26;
      for (; m !== 0 && A < h.length; A++)
        a = (h.words[A] | 0) + m, this.words[A] = a & 67108863, m = a >>> 26;
      if (this.length = h.length, m !== 0)
        this.words[this.length] = m, this.length++;
      else if (h !== this)
        for (; A < h.length; A++)
          this.words[A] = h.words[A];
      return this;
    }, o.prototype.add = function(n) {
      var a;
      return n.negative !== 0 && this.negative === 0 ? (n.negative = 0, a = this.sub(n), n.negative ^= 1, a) : n.negative === 0 && this.negative !== 0 ? (this.negative = 0, a = n.sub(this), this.negative = 1, a) : this.length > n.length ? this.clone().iadd(n) : n.clone().iadd(this);
    }, o.prototype.isub = function(n) {
      if (n.negative !== 0) {
        n.negative = 0;
        var a = this.iadd(n);
        return n.negative = 1, a._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(n), this.negative = 1, this._normSign();
      var h = this.cmp(n);
      if (h === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var v, m;
      h > 0 ? (v = this, m = n) : (v = n, m = this);
      for (var A = 0, M = 0; M < m.length; M++)
        a = (v.words[M] | 0) - (m.words[M] | 0) + A, A = a >> 26, this.words[M] = a & 67108863;
      for (; A !== 0 && M < v.length; M++)
        a = (v.words[M] | 0) + A, A = a >> 26, this.words[M] = a & 67108863;
      if (A === 0 && M < v.length && v !== this)
        for (; M < v.length; M++)
          this.words[M] = v.words[M];
      return this.length = Math.max(this.length, M), v !== this && (this.negative = 1), this._strip();
    }, o.prototype.sub = function(n) {
      return this.clone().isub(n);
    };
    function G(w, n, a) {
      a.negative = n.negative ^ w.negative;
      var h = w.length + n.length | 0;
      a.length = h, h = h - 1 | 0;
      var v = w.words[0] | 0, m = n.words[0] | 0, A = v * m, M = A & 67108863, d = A / 67108864 | 0;
      a.words[0] = M;
      for (var s = 1; s < h; s++) {
        for (var g = d >>> 26, H = d & 67108863, y = Math.min(s, n.length - 1), R = Math.max(0, s - w.length + 1); R <= y; R++) {
          var F = s - R | 0;
          v = w.words[F] | 0, m = n.words[R] | 0, A = v * m + H, g += A / 67108864 | 0, H = A & 67108863;
        }
        a.words[s] = H | 0, d = g | 0;
      }
      return d !== 0 ? a.words[s] = d | 0 : a.length--, a._strip();
    }
    var $ = function(n, a, h) {
      var v = n.words, m = a.words, A = h.words, M = 0, d, s, g, H = v[0] | 0, y = H & 8191, R = H >>> 13, F = v[1] | 0, T = F & 8191, D = F >>> 13, at = v[2] | 0, Y = at & 8191, K = at >>> 13, Ft = v[3] | 0, W = Ft & 8191, rt = Ft >>> 13, E = v[4] | 0, c = E & 8191, p = E >>> 13, N = v[5] | 0, k = N & 8191, C = N >>> 13, J = v[6] | 0, j = J & 8191, X = J >>> 13, Dt = v[7] | 0, ft = Dt & 8191, et = Dt >>> 13, nr = v[8] | 0, mt = nr & 8191, wt = nr >>> 13, Ir = v[9] | 0, _t = Ir & 8191, yt = Ir >>> 13, gr = m[0] | 0, pt = gr & 8191, xt = gr >>> 13, cr = m[1] | 0, At = cr & 8191, Et = cr >>> 13, mr = m[2] | 0, Nt = mr & 8191, bt = mr >>> 13, wr = m[3] | 0, It = wr & 8191, St = wr >>> 13, yr = m[4] | 0, kt = yr & 8191, Rt = yr >>> 13, Sr = m[5] | 0, Pt = Sr & 8191, S = Sr >>> 13, z = m[6] | 0, L = z & 8191, Q = z >>> 13, Gt = m[7] | 0, Z = Gt & 8191, V = Gt >>> 13, Bt = m[8] | 0, ut = Bt & 8191, it = Bt >>> 13, Wt = m[9] | 0, dt = Wt & 8191, vt = Wt >>> 13;
      h.negative = n.negative ^ a.negative, h.length = 19, d = Math.imul(y, pt), s = Math.imul(y, xt), s = s + Math.imul(R, pt) | 0, g = Math.imul(R, xt);
      var ur = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (ur >>> 26) | 0, ur &= 67108863, d = Math.imul(T, pt), s = Math.imul(T, xt), s = s + Math.imul(D, pt) | 0, g = Math.imul(D, xt), d = d + Math.imul(y, At) | 0, s = s + Math.imul(y, Et) | 0, s = s + Math.imul(R, At) | 0, g = g + Math.imul(R, Et) | 0;
      var Zt = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Zt >>> 26) | 0, Zt &= 67108863, d = Math.imul(Y, pt), s = Math.imul(Y, xt), s = s + Math.imul(K, pt) | 0, g = Math.imul(K, xt), d = d + Math.imul(T, At) | 0, s = s + Math.imul(T, Et) | 0, s = s + Math.imul(D, At) | 0, g = g + Math.imul(D, Et) | 0, d = d + Math.imul(y, Nt) | 0, s = s + Math.imul(y, bt) | 0, s = s + Math.imul(R, Nt) | 0, g = g + Math.imul(R, bt) | 0;
      var kr = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (kr >>> 26) | 0, kr &= 67108863, d = Math.imul(W, pt), s = Math.imul(W, xt), s = s + Math.imul(rt, pt) | 0, g = Math.imul(rt, xt), d = d + Math.imul(Y, At) | 0, s = s + Math.imul(Y, Et) | 0, s = s + Math.imul(K, At) | 0, g = g + Math.imul(K, Et) | 0, d = d + Math.imul(T, Nt) | 0, s = s + Math.imul(T, bt) | 0, s = s + Math.imul(D, Nt) | 0, g = g + Math.imul(D, bt) | 0, d = d + Math.imul(y, It) | 0, s = s + Math.imul(y, St) | 0, s = s + Math.imul(R, It) | 0, g = g + Math.imul(R, St) | 0;
      var Rr = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Rr >>> 26) | 0, Rr &= 67108863, d = Math.imul(c, pt), s = Math.imul(c, xt), s = s + Math.imul(p, pt) | 0, g = Math.imul(p, xt), d = d + Math.imul(W, At) | 0, s = s + Math.imul(W, Et) | 0, s = s + Math.imul(rt, At) | 0, g = g + Math.imul(rt, Et) | 0, d = d + Math.imul(Y, Nt) | 0, s = s + Math.imul(Y, bt) | 0, s = s + Math.imul(K, Nt) | 0, g = g + Math.imul(K, bt) | 0, d = d + Math.imul(T, It) | 0, s = s + Math.imul(T, St) | 0, s = s + Math.imul(D, It) | 0, g = g + Math.imul(D, St) | 0, d = d + Math.imul(y, kt) | 0, s = s + Math.imul(y, Rt) | 0, s = s + Math.imul(R, kt) | 0, g = g + Math.imul(R, Rt) | 0;
      var Pr = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Pr >>> 26) | 0, Pr &= 67108863, d = Math.imul(k, pt), s = Math.imul(k, xt), s = s + Math.imul(C, pt) | 0, g = Math.imul(C, xt), d = d + Math.imul(c, At) | 0, s = s + Math.imul(c, Et) | 0, s = s + Math.imul(p, At) | 0, g = g + Math.imul(p, Et) | 0, d = d + Math.imul(W, Nt) | 0, s = s + Math.imul(W, bt) | 0, s = s + Math.imul(rt, Nt) | 0, g = g + Math.imul(rt, bt) | 0, d = d + Math.imul(Y, It) | 0, s = s + Math.imul(Y, St) | 0, s = s + Math.imul(K, It) | 0, g = g + Math.imul(K, St) | 0, d = d + Math.imul(T, kt) | 0, s = s + Math.imul(T, Rt) | 0, s = s + Math.imul(D, kt) | 0, g = g + Math.imul(D, Rt) | 0, d = d + Math.imul(y, Pt) | 0, s = s + Math.imul(y, S) | 0, s = s + Math.imul(R, Pt) | 0, g = g + Math.imul(R, S) | 0;
      var we = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (we >>> 26) | 0, we &= 67108863, d = Math.imul(j, pt), s = Math.imul(j, xt), s = s + Math.imul(X, pt) | 0, g = Math.imul(X, xt), d = d + Math.imul(k, At) | 0, s = s + Math.imul(k, Et) | 0, s = s + Math.imul(C, At) | 0, g = g + Math.imul(C, Et) | 0, d = d + Math.imul(c, Nt) | 0, s = s + Math.imul(c, bt) | 0, s = s + Math.imul(p, Nt) | 0, g = g + Math.imul(p, bt) | 0, d = d + Math.imul(W, It) | 0, s = s + Math.imul(W, St) | 0, s = s + Math.imul(rt, It) | 0, g = g + Math.imul(rt, St) | 0, d = d + Math.imul(Y, kt) | 0, s = s + Math.imul(Y, Rt) | 0, s = s + Math.imul(K, kt) | 0, g = g + Math.imul(K, Rt) | 0, d = d + Math.imul(T, Pt) | 0, s = s + Math.imul(T, S) | 0, s = s + Math.imul(D, Pt) | 0, g = g + Math.imul(D, S) | 0, d = d + Math.imul(y, L) | 0, s = s + Math.imul(y, Q) | 0, s = s + Math.imul(R, L) | 0, g = g + Math.imul(R, Q) | 0;
      var ye = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (ye >>> 26) | 0, ye &= 67108863, d = Math.imul(ft, pt), s = Math.imul(ft, xt), s = s + Math.imul(et, pt) | 0, g = Math.imul(et, xt), d = d + Math.imul(j, At) | 0, s = s + Math.imul(j, Et) | 0, s = s + Math.imul(X, At) | 0, g = g + Math.imul(X, Et) | 0, d = d + Math.imul(k, Nt) | 0, s = s + Math.imul(k, bt) | 0, s = s + Math.imul(C, Nt) | 0, g = g + Math.imul(C, bt) | 0, d = d + Math.imul(c, It) | 0, s = s + Math.imul(c, St) | 0, s = s + Math.imul(p, It) | 0, g = g + Math.imul(p, St) | 0, d = d + Math.imul(W, kt) | 0, s = s + Math.imul(W, Rt) | 0, s = s + Math.imul(rt, kt) | 0, g = g + Math.imul(rt, Rt) | 0, d = d + Math.imul(Y, Pt) | 0, s = s + Math.imul(Y, S) | 0, s = s + Math.imul(K, Pt) | 0, g = g + Math.imul(K, S) | 0, d = d + Math.imul(T, L) | 0, s = s + Math.imul(T, Q) | 0, s = s + Math.imul(D, L) | 0, g = g + Math.imul(D, Q) | 0, d = d + Math.imul(y, Z) | 0, s = s + Math.imul(y, V) | 0, s = s + Math.imul(R, Z) | 0, g = g + Math.imul(R, V) | 0;
      var xe = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (xe >>> 26) | 0, xe &= 67108863, d = Math.imul(mt, pt), s = Math.imul(mt, xt), s = s + Math.imul(wt, pt) | 0, g = Math.imul(wt, xt), d = d + Math.imul(ft, At) | 0, s = s + Math.imul(ft, Et) | 0, s = s + Math.imul(et, At) | 0, g = g + Math.imul(et, Et) | 0, d = d + Math.imul(j, Nt) | 0, s = s + Math.imul(j, bt) | 0, s = s + Math.imul(X, Nt) | 0, g = g + Math.imul(X, bt) | 0, d = d + Math.imul(k, It) | 0, s = s + Math.imul(k, St) | 0, s = s + Math.imul(C, It) | 0, g = g + Math.imul(C, St) | 0, d = d + Math.imul(c, kt) | 0, s = s + Math.imul(c, Rt) | 0, s = s + Math.imul(p, kt) | 0, g = g + Math.imul(p, Rt) | 0, d = d + Math.imul(W, Pt) | 0, s = s + Math.imul(W, S) | 0, s = s + Math.imul(rt, Pt) | 0, g = g + Math.imul(rt, S) | 0, d = d + Math.imul(Y, L) | 0, s = s + Math.imul(Y, Q) | 0, s = s + Math.imul(K, L) | 0, g = g + Math.imul(K, Q) | 0, d = d + Math.imul(T, Z) | 0, s = s + Math.imul(T, V) | 0, s = s + Math.imul(D, Z) | 0, g = g + Math.imul(D, V) | 0, d = d + Math.imul(y, ut) | 0, s = s + Math.imul(y, it) | 0, s = s + Math.imul(R, ut) | 0, g = g + Math.imul(R, it) | 0;
      var Ae = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Ae >>> 26) | 0, Ae &= 67108863, d = Math.imul(_t, pt), s = Math.imul(_t, xt), s = s + Math.imul(yt, pt) | 0, g = Math.imul(yt, xt), d = d + Math.imul(mt, At) | 0, s = s + Math.imul(mt, Et) | 0, s = s + Math.imul(wt, At) | 0, g = g + Math.imul(wt, Et) | 0, d = d + Math.imul(ft, Nt) | 0, s = s + Math.imul(ft, bt) | 0, s = s + Math.imul(et, Nt) | 0, g = g + Math.imul(et, bt) | 0, d = d + Math.imul(j, It) | 0, s = s + Math.imul(j, St) | 0, s = s + Math.imul(X, It) | 0, g = g + Math.imul(X, St) | 0, d = d + Math.imul(k, kt) | 0, s = s + Math.imul(k, Rt) | 0, s = s + Math.imul(C, kt) | 0, g = g + Math.imul(C, Rt) | 0, d = d + Math.imul(c, Pt) | 0, s = s + Math.imul(c, S) | 0, s = s + Math.imul(p, Pt) | 0, g = g + Math.imul(p, S) | 0, d = d + Math.imul(W, L) | 0, s = s + Math.imul(W, Q) | 0, s = s + Math.imul(rt, L) | 0, g = g + Math.imul(rt, Q) | 0, d = d + Math.imul(Y, Z) | 0, s = s + Math.imul(Y, V) | 0, s = s + Math.imul(K, Z) | 0, g = g + Math.imul(K, V) | 0, d = d + Math.imul(T, ut) | 0, s = s + Math.imul(T, it) | 0, s = s + Math.imul(D, ut) | 0, g = g + Math.imul(D, it) | 0, d = d + Math.imul(y, dt) | 0, s = s + Math.imul(y, vt) | 0, s = s + Math.imul(R, dt) | 0, g = g + Math.imul(R, vt) | 0;
      var be = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (be >>> 26) | 0, be &= 67108863, d = Math.imul(_t, At), s = Math.imul(_t, Et), s = s + Math.imul(yt, At) | 0, g = Math.imul(yt, Et), d = d + Math.imul(mt, Nt) | 0, s = s + Math.imul(mt, bt) | 0, s = s + Math.imul(wt, Nt) | 0, g = g + Math.imul(wt, bt) | 0, d = d + Math.imul(ft, It) | 0, s = s + Math.imul(ft, St) | 0, s = s + Math.imul(et, It) | 0, g = g + Math.imul(et, St) | 0, d = d + Math.imul(j, kt) | 0, s = s + Math.imul(j, Rt) | 0, s = s + Math.imul(X, kt) | 0, g = g + Math.imul(X, Rt) | 0, d = d + Math.imul(k, Pt) | 0, s = s + Math.imul(k, S) | 0, s = s + Math.imul(C, Pt) | 0, g = g + Math.imul(C, S) | 0, d = d + Math.imul(c, L) | 0, s = s + Math.imul(c, Q) | 0, s = s + Math.imul(p, L) | 0, g = g + Math.imul(p, Q) | 0, d = d + Math.imul(W, Z) | 0, s = s + Math.imul(W, V) | 0, s = s + Math.imul(rt, Z) | 0, g = g + Math.imul(rt, V) | 0, d = d + Math.imul(Y, ut) | 0, s = s + Math.imul(Y, it) | 0, s = s + Math.imul(K, ut) | 0, g = g + Math.imul(K, it) | 0, d = d + Math.imul(T, dt) | 0, s = s + Math.imul(T, vt) | 0, s = s + Math.imul(D, dt) | 0, g = g + Math.imul(D, vt) | 0;
      var Me = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Me >>> 26) | 0, Me &= 67108863, d = Math.imul(_t, Nt), s = Math.imul(_t, bt), s = s + Math.imul(yt, Nt) | 0, g = Math.imul(yt, bt), d = d + Math.imul(mt, It) | 0, s = s + Math.imul(mt, St) | 0, s = s + Math.imul(wt, It) | 0, g = g + Math.imul(wt, St) | 0, d = d + Math.imul(ft, kt) | 0, s = s + Math.imul(ft, Rt) | 0, s = s + Math.imul(et, kt) | 0, g = g + Math.imul(et, Rt) | 0, d = d + Math.imul(j, Pt) | 0, s = s + Math.imul(j, S) | 0, s = s + Math.imul(X, Pt) | 0, g = g + Math.imul(X, S) | 0, d = d + Math.imul(k, L) | 0, s = s + Math.imul(k, Q) | 0, s = s + Math.imul(C, L) | 0, g = g + Math.imul(C, Q) | 0, d = d + Math.imul(c, Z) | 0, s = s + Math.imul(c, V) | 0, s = s + Math.imul(p, Z) | 0, g = g + Math.imul(p, V) | 0, d = d + Math.imul(W, ut) | 0, s = s + Math.imul(W, it) | 0, s = s + Math.imul(rt, ut) | 0, g = g + Math.imul(rt, it) | 0, d = d + Math.imul(Y, dt) | 0, s = s + Math.imul(Y, vt) | 0, s = s + Math.imul(K, dt) | 0, g = g + Math.imul(K, vt) | 0;
      var _e = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (_e >>> 26) | 0, _e &= 67108863, d = Math.imul(_t, It), s = Math.imul(_t, St), s = s + Math.imul(yt, It) | 0, g = Math.imul(yt, St), d = d + Math.imul(mt, kt) | 0, s = s + Math.imul(mt, Rt) | 0, s = s + Math.imul(wt, kt) | 0, g = g + Math.imul(wt, Rt) | 0, d = d + Math.imul(ft, Pt) | 0, s = s + Math.imul(ft, S) | 0, s = s + Math.imul(et, Pt) | 0, g = g + Math.imul(et, S) | 0, d = d + Math.imul(j, L) | 0, s = s + Math.imul(j, Q) | 0, s = s + Math.imul(X, L) | 0, g = g + Math.imul(X, Q) | 0, d = d + Math.imul(k, Z) | 0, s = s + Math.imul(k, V) | 0, s = s + Math.imul(C, Z) | 0, g = g + Math.imul(C, V) | 0, d = d + Math.imul(c, ut) | 0, s = s + Math.imul(c, it) | 0, s = s + Math.imul(p, ut) | 0, g = g + Math.imul(p, it) | 0, d = d + Math.imul(W, dt) | 0, s = s + Math.imul(W, vt) | 0, s = s + Math.imul(rt, dt) | 0, g = g + Math.imul(rt, vt) | 0;
      var Ee = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Ee >>> 26) | 0, Ee &= 67108863, d = Math.imul(_t, kt), s = Math.imul(_t, Rt), s = s + Math.imul(yt, kt) | 0, g = Math.imul(yt, Rt), d = d + Math.imul(mt, Pt) | 0, s = s + Math.imul(mt, S) | 0, s = s + Math.imul(wt, Pt) | 0, g = g + Math.imul(wt, S) | 0, d = d + Math.imul(ft, L) | 0, s = s + Math.imul(ft, Q) | 0, s = s + Math.imul(et, L) | 0, g = g + Math.imul(et, Q) | 0, d = d + Math.imul(j, Z) | 0, s = s + Math.imul(j, V) | 0, s = s + Math.imul(X, Z) | 0, g = g + Math.imul(X, V) | 0, d = d + Math.imul(k, ut) | 0, s = s + Math.imul(k, it) | 0, s = s + Math.imul(C, ut) | 0, g = g + Math.imul(C, it) | 0, d = d + Math.imul(c, dt) | 0, s = s + Math.imul(c, vt) | 0, s = s + Math.imul(p, dt) | 0, g = g + Math.imul(p, vt) | 0;
      var Ne = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Ne >>> 26) | 0, Ne &= 67108863, d = Math.imul(_t, Pt), s = Math.imul(_t, S), s = s + Math.imul(yt, Pt) | 0, g = Math.imul(yt, S), d = d + Math.imul(mt, L) | 0, s = s + Math.imul(mt, Q) | 0, s = s + Math.imul(wt, L) | 0, g = g + Math.imul(wt, Q) | 0, d = d + Math.imul(ft, Z) | 0, s = s + Math.imul(ft, V) | 0, s = s + Math.imul(et, Z) | 0, g = g + Math.imul(et, V) | 0, d = d + Math.imul(j, ut) | 0, s = s + Math.imul(j, it) | 0, s = s + Math.imul(X, ut) | 0, g = g + Math.imul(X, it) | 0, d = d + Math.imul(k, dt) | 0, s = s + Math.imul(k, vt) | 0, s = s + Math.imul(C, dt) | 0, g = g + Math.imul(C, vt) | 0;
      var Ie = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Ie >>> 26) | 0, Ie &= 67108863, d = Math.imul(_t, L), s = Math.imul(_t, Q), s = s + Math.imul(yt, L) | 0, g = Math.imul(yt, Q), d = d + Math.imul(mt, Z) | 0, s = s + Math.imul(mt, V) | 0, s = s + Math.imul(wt, Z) | 0, g = g + Math.imul(wt, V) | 0, d = d + Math.imul(ft, ut) | 0, s = s + Math.imul(ft, it) | 0, s = s + Math.imul(et, ut) | 0, g = g + Math.imul(et, it) | 0, d = d + Math.imul(j, dt) | 0, s = s + Math.imul(j, vt) | 0, s = s + Math.imul(X, dt) | 0, g = g + Math.imul(X, vt) | 0;
      var Se = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Se >>> 26) | 0, Se &= 67108863, d = Math.imul(_t, Z), s = Math.imul(_t, V), s = s + Math.imul(yt, Z) | 0, g = Math.imul(yt, V), d = d + Math.imul(mt, ut) | 0, s = s + Math.imul(mt, it) | 0, s = s + Math.imul(wt, ut) | 0, g = g + Math.imul(wt, it) | 0, d = d + Math.imul(ft, dt) | 0, s = s + Math.imul(ft, vt) | 0, s = s + Math.imul(et, dt) | 0, g = g + Math.imul(et, vt) | 0;
      var ke = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (ke >>> 26) | 0, ke &= 67108863, d = Math.imul(_t, ut), s = Math.imul(_t, it), s = s + Math.imul(yt, ut) | 0, g = Math.imul(yt, it), d = d + Math.imul(mt, dt) | 0, s = s + Math.imul(mt, vt) | 0, s = s + Math.imul(wt, dt) | 0, g = g + Math.imul(wt, vt) | 0;
      var Re = (M + d | 0) + ((s & 8191) << 13) | 0;
      M = (g + (s >>> 13) | 0) + (Re >>> 26) | 0, Re &= 67108863, d = Math.imul(_t, dt), s = Math.imul(_t, vt), s = s + Math.imul(yt, dt) | 0, g = Math.imul(yt, vt);
      var Pe = (M + d | 0) + ((s & 8191) << 13) | 0;
      return M = (g + (s >>> 13) | 0) + (Pe >>> 26) | 0, Pe &= 67108863, A[0] = ur, A[1] = Zt, A[2] = kr, A[3] = Rr, A[4] = Pr, A[5] = we, A[6] = ye, A[7] = xe, A[8] = Ae, A[9] = be, A[10] = Me, A[11] = _e, A[12] = Ee, A[13] = Ne, A[14] = Ie, A[15] = Se, A[16] = ke, A[17] = Re, A[18] = Pe, M !== 0 && (A[19] = M, h.length++), h;
    };
    Math.imul || ($ = G);
    function tt(w, n, a) {
      a.negative = n.negative ^ w.negative, a.length = w.length + n.length;
      for (var h = 0, v = 0, m = 0; m < a.length - 1; m++) {
        var A = v;
        v = 0;
        for (var M = h & 67108863, d = Math.min(m, n.length - 1), s = Math.max(0, m - w.length + 1); s <= d; s++) {
          var g = m - s, H = w.words[g] | 0, y = n.words[s] | 0, R = H * y, F = R & 67108863;
          A = A + (R / 67108864 | 0) | 0, F = F + M | 0, M = F & 67108863, A = A + (F >>> 26) | 0, v += A >>> 26, A &= 67108863;
        }
        a.words[m] = M, h = A, A = v;
      }
      return h !== 0 ? a.words[m] = h : a.length--, a._strip();
    }
    function gt(w, n, a) {
      return tt(w, n, a);
    }
    o.prototype.mulTo = function(n, a) {
      var h, v = this.length + n.length;
      return this.length === 10 && n.length === 10 ? h = $(this, n, a) : v < 63 ? h = G(this, n, a) : v < 1024 ? h = tt(this, n, a) : h = gt(this, n, a), h;
    }, o.prototype.mul = function(n) {
      var a = new o(null);
      return a.words = new Array(this.length + n.length), this.mulTo(n, a);
    }, o.prototype.mulf = function(n) {
      var a = new o(null);
      return a.words = new Array(this.length + n.length), gt(this, n, a);
    }, o.prototype.imul = function(n) {
      return this.clone().mulTo(n, this);
    }, o.prototype.imuln = function(n) {
      var a = n < 0;
      a && (n = -n), i(typeof n == "number"), i(n < 67108864);
      for (var h = 0, v = 0; v < this.length; v++) {
        var m = (this.words[v] | 0) * n, A = (m & 67108863) + (h & 67108863);
        h >>= 26, h += m / 67108864 | 0, h += A >>> 26, this.words[v] = A & 67108863;
      }
      return h !== 0 && (this.words[v] = h, this.length++), a ? this.ineg() : this;
    }, o.prototype.muln = function(n) {
      return this.clone().imuln(n);
    }, o.prototype.sqr = function() {
      return this.mul(this);
    }, o.prototype.isqr = function() {
      return this.imul(this.clone());
    }, o.prototype.pow = function(n) {
      var a = ot(n);
      if (a.length === 0)
        return new o(1);
      for (var h = this, v = 0; v < a.length && a[v] === 0; v++, h = h.sqr())
        ;
      if (++v < a.length)
        for (var m = h.sqr(); v < a.length; v++, m = m.sqr())
          a[v] !== 0 && (h = h.mul(m));
      return h;
    }, o.prototype.iushln = function(n) {
      i(typeof n == "number" && n >= 0);
      var a = n % 26, h = (n - a) / 26, v = 67108863 >>> 26 - a << 26 - a, m;
      if (a !== 0) {
        var A = 0;
        for (m = 0; m < this.length; m++) {
          var M = this.words[m] & v, d = (this.words[m] | 0) - M << a;
          this.words[m] = d | A, A = M >>> 26 - a;
        }
        A && (this.words[m] = A, this.length++);
      }
      if (h !== 0) {
        for (m = this.length - 1; m >= 0; m--)
          this.words[m + h] = this.words[m];
        for (m = 0; m < h; m++)
          this.words[m] = 0;
        this.length += h;
      }
      return this._strip();
    }, o.prototype.ishln = function(n) {
      return i(this.negative === 0), this.iushln(n);
    }, o.prototype.iushrn = function(n, a, h) {
      i(typeof n == "number" && n >= 0);
      var v;
      a ? v = (a - a % 26) / 26 : v = 0;
      var m = n % 26, A = Math.min((n - m) / 26, this.length), M = 67108863 ^ 67108863 >>> m << m, d = h;
      if (v -= A, v = Math.max(0, v), d) {
        for (var s = 0; s < A; s++)
          d.words[s] = this.words[s];
        d.length = A;
      }
      if (A !== 0)
        if (this.length > A)
          for (this.length -= A, s = 0; s < this.length; s++)
            this.words[s] = this.words[s + A];
        else
          this.words[0] = 0, this.length = 1;
      var g = 0;
      for (s = this.length - 1; s >= 0 && (g !== 0 || s >= v); s--) {
        var H = this.words[s] | 0;
        this.words[s] = g << 26 - m | H >>> m, g = H & M;
      }
      return d && g !== 0 && (d.words[d.length++] = g), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, o.prototype.ishrn = function(n, a, h) {
      return i(this.negative === 0), this.iushrn(n, a, h);
    }, o.prototype.shln = function(n) {
      return this.clone().ishln(n);
    }, o.prototype.ushln = function(n) {
      return this.clone().iushln(n);
    }, o.prototype.shrn = function(n) {
      return this.clone().ishrn(n);
    }, o.prototype.ushrn = function(n) {
      return this.clone().iushrn(n);
    }, o.prototype.testn = function(n) {
      i(typeof n == "number" && n >= 0);
      var a = n % 26, h = (n - a) / 26, v = 1 << a;
      if (this.length <= h)
        return !1;
      var m = this.words[h];
      return !!(m & v);
    }, o.prototype.imaskn = function(n) {
      i(typeof n == "number" && n >= 0);
      var a = n % 26, h = (n - a) / 26;
      if (i(this.negative === 0, "imaskn works only with positive numbers"), this.length <= h)
        return this;
      if (a !== 0 && h++, this.length = Math.min(h, this.length), a !== 0) {
        var v = 67108863 ^ 67108863 >>> a << a;
        this.words[this.length - 1] &= v;
      }
      return this._strip();
    }, o.prototype.maskn = function(n) {
      return this.clone().imaskn(n);
    }, o.prototype.iaddn = function(n) {
      return i(typeof n == "number"), i(n < 67108864), n < 0 ? this.isubn(-n) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= n ? (this.words[0] = n - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(n), this.negative = 1, this) : this._iaddn(n);
    }, o.prototype._iaddn = function(n) {
      this.words[0] += n;
      for (var a = 0; a < this.length && this.words[a] >= 67108864; a++)
        this.words[a] -= 67108864, a === this.length - 1 ? this.words[a + 1] = 1 : this.words[a + 1]++;
      return this.length = Math.max(this.length, a + 1), this;
    }, o.prototype.isubn = function(n) {
      if (i(typeof n == "number"), i(n < 67108864), n < 0)
        return this.iaddn(-n);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(n), this.negative = 1, this;
      if (this.words[0] -= n, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var a = 0; a < this.length && this.words[a] < 0; a++)
          this.words[a] += 67108864, this.words[a + 1] -= 1;
      return this._strip();
    }, o.prototype.addn = function(n) {
      return this.clone().iaddn(n);
    }, o.prototype.subn = function(n) {
      return this.clone().isubn(n);
    }, o.prototype.iabs = function() {
      return this.negative = 0, this;
    }, o.prototype.abs = function() {
      return this.clone().iabs();
    }, o.prototype._ishlnsubmul = function(n, a, h) {
      var v = n.length + h, m;
      this._expand(v);
      var A, M = 0;
      for (m = 0; m < n.length; m++) {
        A = (this.words[m + h] | 0) + M;
        var d = (n.words[m] | 0) * a;
        A -= d & 67108863, M = (A >> 26) - (d / 67108864 | 0), this.words[m + h] = A & 67108863;
      }
      for (; m < this.length - h; m++)
        A = (this.words[m + h] | 0) + M, M = A >> 26, this.words[m + h] = A & 67108863;
      if (M === 0)
        return this._strip();
      for (i(M === -1), M = 0, m = 0; m < this.length; m++)
        A = -(this.words[m] | 0) + M, M = A >> 26, this.words[m] = A & 67108863;
      return this.negative = 1, this._strip();
    }, o.prototype._wordDiv = function(n, a) {
      var h = this.length - n.length, v = this.clone(), m = n, A = m.words[m.length - 1] | 0, M = this._countBits(A);
      h = 26 - M, h !== 0 && (m = m.ushln(h), v.iushln(h), A = m.words[m.length - 1] | 0);
      var d = v.length - m.length, s;
      if (a !== "mod") {
        s = new o(null), s.length = d + 1, s.words = new Array(s.length);
        for (var g = 0; g < s.length; g++)
          s.words[g] = 0;
      }
      var H = v.clone()._ishlnsubmul(m, 1, d);
      H.negative === 0 && (v = H, s && (s.words[d] = 1));
      for (var y = d - 1; y >= 0; y--) {
        var R = (v.words[m.length + y] | 0) * 67108864 + (v.words[m.length + y - 1] | 0);
        for (R = Math.min(R / A | 0, 67108863), v._ishlnsubmul(m, R, y); v.negative !== 0; )
          R--, v.negative = 0, v._ishlnsubmul(m, 1, y), v.isZero() || (v.negative ^= 1);
        s && (s.words[y] = R);
      }
      return s && s._strip(), v._strip(), a !== "div" && h !== 0 && v.iushrn(h), {
        div: s || null,
        mod: v
      };
    }, o.prototype.divmod = function(n, a, h) {
      if (i(!n.isZero()), this.isZero())
        return {
          div: new o(0),
          mod: new o(0)
        };
      var v, m, A;
      return this.negative !== 0 && n.negative === 0 ? (A = this.neg().divmod(n, a), a !== "mod" && (v = A.div.neg()), a !== "div" && (m = A.mod.neg(), h && m.negative !== 0 && m.iadd(n)), {
        div: v,
        mod: m
      }) : this.negative === 0 && n.negative !== 0 ? (A = this.divmod(n.neg(), a), a !== "mod" && (v = A.div.neg()), {
        div: v,
        mod: A.mod
      }) : this.negative & n.negative ? (A = this.neg().divmod(n.neg(), a), a !== "div" && (m = A.mod.neg(), h && m.negative !== 0 && m.isub(n)), {
        div: A.div,
        mod: m
      }) : n.length > this.length || this.cmp(n) < 0 ? {
        div: new o(0),
        mod: this
      } : n.length === 1 ? a === "div" ? {
        div: this.divn(n.words[0]),
        mod: null
      } : a === "mod" ? {
        div: null,
        mod: new o(this.modrn(n.words[0]))
      } : {
        div: this.divn(n.words[0]),
        mod: new o(this.modrn(n.words[0]))
      } : this._wordDiv(n, a);
    }, o.prototype.div = function(n) {
      return this.divmod(n, "div", !1).div;
    }, o.prototype.mod = function(n) {
      return this.divmod(n, "mod", !1).mod;
    }, o.prototype.umod = function(n) {
      return this.divmod(n, "mod", !0).mod;
    }, o.prototype.divRound = function(n) {
      var a = this.divmod(n);
      if (a.mod.isZero())
        return a.div;
      var h = a.div.negative !== 0 ? a.mod.isub(n) : a.mod, v = n.ushrn(1), m = n.andln(1), A = h.cmp(v);
      return A < 0 || m === 1 && A === 0 ? a.div : a.div.negative !== 0 ? a.div.isubn(1) : a.div.iaddn(1);
    }, o.prototype.modrn = function(n) {
      var a = n < 0;
      a && (n = -n), i(n <= 67108863);
      for (var h = (1 << 26) % n, v = 0, m = this.length - 1; m >= 0; m--)
        v = (h * v + (this.words[m] | 0)) % n;
      return a ? -v : v;
    }, o.prototype.modn = function(n) {
      return this.modrn(n);
    }, o.prototype.idivn = function(n) {
      var a = n < 0;
      a && (n = -n), i(n <= 67108863);
      for (var h = 0, v = this.length - 1; v >= 0; v--) {
        var m = (this.words[v] | 0) + h * 67108864;
        this.words[v] = m / n | 0, h = m % n;
      }
      return this._strip(), a ? this.ineg() : this;
    }, o.prototype.divn = function(n) {
      return this.clone().idivn(n);
    }, o.prototype.egcd = function(n) {
      i(n.negative === 0), i(!n.isZero());
      var a = this, h = n.clone();
      a.negative !== 0 ? a = a.umod(n) : a = a.clone();
      for (var v = new o(1), m = new o(0), A = new o(0), M = new o(1), d = 0; a.isEven() && h.isEven(); )
        a.iushrn(1), h.iushrn(1), ++d;
      for (var s = h.clone(), g = a.clone(); !a.isZero(); ) {
        for (var H = 0, y = 1; !(a.words[0] & y) && H < 26; ++H, y <<= 1)
          ;
        if (H > 0)
          for (a.iushrn(H); H-- > 0; )
            (v.isOdd() || m.isOdd()) && (v.iadd(s), m.isub(g)), v.iushrn(1), m.iushrn(1);
        for (var R = 0, F = 1; !(h.words[0] & F) && R < 26; ++R, F <<= 1)
          ;
        if (R > 0)
          for (h.iushrn(R); R-- > 0; )
            (A.isOdd() || M.isOdd()) && (A.iadd(s), M.isub(g)), A.iushrn(1), M.iushrn(1);
        a.cmp(h) >= 0 ? (a.isub(h), v.isub(A), m.isub(M)) : (h.isub(a), A.isub(v), M.isub(m));
      }
      return {
        a: A,
        b: M,
        gcd: h.iushln(d)
      };
    }, o.prototype._invmp = function(n) {
      i(n.negative === 0), i(!n.isZero());
      var a = this, h = n.clone();
      a.negative !== 0 ? a = a.umod(n) : a = a.clone();
      for (var v = new o(1), m = new o(0), A = h.clone(); a.cmpn(1) > 0 && h.cmpn(1) > 0; ) {
        for (var M = 0, d = 1; !(a.words[0] & d) && M < 26; ++M, d <<= 1)
          ;
        if (M > 0)
          for (a.iushrn(M); M-- > 0; )
            v.isOdd() && v.iadd(A), v.iushrn(1);
        for (var s = 0, g = 1; !(h.words[0] & g) && s < 26; ++s, g <<= 1)
          ;
        if (s > 0)
          for (h.iushrn(s); s-- > 0; )
            m.isOdd() && m.iadd(A), m.iushrn(1);
        a.cmp(h) >= 0 ? (a.isub(h), v.isub(m)) : (h.isub(a), m.isub(v));
      }
      var H;
      return a.cmpn(1) === 0 ? H = v : H = m, H.cmpn(0) < 0 && H.iadd(n), H;
    }, o.prototype.gcd = function(n) {
      if (this.isZero())
        return n.abs();
      if (n.isZero())
        return this.abs();
      var a = this.clone(), h = n.clone();
      a.negative = 0, h.negative = 0;
      for (var v = 0; a.isEven() && h.isEven(); v++)
        a.iushrn(1), h.iushrn(1);
      do {
        for (; a.isEven(); )
          a.iushrn(1);
        for (; h.isEven(); )
          h.iushrn(1);
        var m = a.cmp(h);
        if (m < 0) {
          var A = a;
          a = h, h = A;
        } else if (m === 0 || h.cmpn(1) === 0)
          break;
        a.isub(h);
      } while (!0);
      return h.iushln(v);
    }, o.prototype.invm = function(n) {
      return this.egcd(n).a.umod(n);
    }, o.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, o.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, o.prototype.andln = function(n) {
      return this.words[0] & n;
    }, o.prototype.bincn = function(n) {
      i(typeof n == "number");
      var a = n % 26, h = (n - a) / 26, v = 1 << a;
      if (this.length <= h)
        return this._expand(h + 1), this.words[h] |= v, this;
      for (var m = v, A = h; m !== 0 && A < this.length; A++) {
        var M = this.words[A] | 0;
        M += m, m = M >>> 26, M &= 67108863, this.words[A] = M;
      }
      return m !== 0 && (this.words[A] = m, this.length++), this;
    }, o.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, o.prototype.cmpn = function(n) {
      var a = n < 0;
      if (this.negative !== 0 && !a)
        return -1;
      if (this.negative === 0 && a)
        return 1;
      this._strip();
      var h;
      if (this.length > 1)
        h = 1;
      else {
        a && (n = -n), i(n <= 67108863, "Number is too big");
        var v = this.words[0] | 0;
        h = v === n ? 0 : v < n ? -1 : 1;
      }
      return this.negative !== 0 ? -h | 0 : h;
    }, o.prototype.cmp = function(n) {
      if (this.negative !== 0 && n.negative === 0)
        return -1;
      if (this.negative === 0 && n.negative !== 0)
        return 1;
      var a = this.ucmp(n);
      return this.negative !== 0 ? -a | 0 : a;
    }, o.prototype.ucmp = function(n) {
      if (this.length > n.length)
        return 1;
      if (this.length < n.length)
        return -1;
      for (var a = 0, h = this.length - 1; h >= 0; h--) {
        var v = this.words[h] | 0, m = n.words[h] | 0;
        if (v !== m) {
          v < m ? a = -1 : v > m && (a = 1);
          break;
        }
      }
      return a;
    }, o.prototype.gtn = function(n) {
      return this.cmpn(n) === 1;
    }, o.prototype.gt = function(n) {
      return this.cmp(n) === 1;
    }, o.prototype.gten = function(n) {
      return this.cmpn(n) >= 0;
    }, o.prototype.gte = function(n) {
      return this.cmp(n) >= 0;
    }, o.prototype.ltn = function(n) {
      return this.cmpn(n) === -1;
    }, o.prototype.lt = function(n) {
      return this.cmp(n) === -1;
    }, o.prototype.lten = function(n) {
      return this.cmpn(n) <= 0;
    }, o.prototype.lte = function(n) {
      return this.cmp(n) <= 0;
    }, o.prototype.eqn = function(n) {
      return this.cmpn(n) === 0;
    }, o.prototype.eq = function(n) {
      return this.cmp(n) === 0;
    }, o.red = function(n) {
      return new nt(n);
    }, o.prototype.toRed = function(n) {
      return i(!this.red, "Already a number in reduction context"), i(this.negative === 0, "red works only with positives"), n.convertTo(this)._forceRed(n);
    }, o.prototype.fromRed = function() {
      return i(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, o.prototype._forceRed = function(n) {
      return this.red = n, this;
    }, o.prototype.forceRed = function(n) {
      return i(!this.red, "Already a number in reduction context"), this._forceRed(n);
    }, o.prototype.redAdd = function(n) {
      return i(this.red, "redAdd works only with red numbers"), this.red.add(this, n);
    }, o.prototype.redIAdd = function(n) {
      return i(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, n);
    }, o.prototype.redSub = function(n) {
      return i(this.red, "redSub works only with red numbers"), this.red.sub(this, n);
    }, o.prototype.redISub = function(n) {
      return i(this.red, "redISub works only with red numbers"), this.red.isub(this, n);
    }, o.prototype.redShl = function(n) {
      return i(this.red, "redShl works only with red numbers"), this.red.shl(this, n);
    }, o.prototype.redMul = function(n) {
      return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, n), this.red.mul(this, n);
    }, o.prototype.redIMul = function(n) {
      return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, n), this.red.imul(this, n);
    }, o.prototype.redSqr = function() {
      return i(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, o.prototype.redISqr = function() {
      return i(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, o.prototype.redSqrt = function() {
      return i(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, o.prototype.redInvm = function() {
      return i(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, o.prototype.redNeg = function() {
      return i(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, o.prototype.redPow = function(n) {
      return i(this.red && !n.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, n);
    };
    var st = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function lt(w, n) {
      this.name = w, this.p = new o(n, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    lt.prototype._tmp = function() {
      var n = new o(null);
      return n.words = new Array(Math.ceil(this.n / 13)), n;
    }, lt.prototype.ireduce = function(n) {
      var a = n, h;
      do
        this.split(a, this.tmp), a = this.imulK(a), a = a.iadd(this.tmp), h = a.bitLength();
      while (h > this.n);
      var v = h < this.n ? -1 : a.ucmp(this.p);
      return v === 0 ? (a.words[0] = 0, a.length = 1) : v > 0 ? a.isub(this.p) : a.strip !== void 0 ? a.strip() : a._strip(), a;
    }, lt.prototype.split = function(n, a) {
      n.iushrn(this.n, 0, a);
    }, lt.prototype.imulK = function(n) {
      return n.imul(this.k);
    };
    function qt() {
      lt.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    f(qt, lt), qt.prototype.split = function(n, a) {
      for (var h = 4194303, v = Math.min(n.length, 9), m = 0; m < v; m++)
        a.words[m] = n.words[m];
      if (a.length = v, n.length <= 9) {
        n.words[0] = 0, n.length = 1;
        return;
      }
      var A = n.words[9];
      for (a.words[a.length++] = A & h, m = 10; m < n.length; m++) {
        var M = n.words[m] | 0;
        n.words[m - 10] = (M & h) << 4 | A >>> 22, A = M;
      }
      A >>>= 22, n.words[m - 10] = A, A === 0 && n.length > 10 ? n.length -= 10 : n.length -= 9;
    }, qt.prototype.imulK = function(n) {
      n.words[n.length] = 0, n.words[n.length + 1] = 0, n.length += 2;
      for (var a = 0, h = 0; h < n.length; h++) {
        var v = n.words[h] | 0;
        a += v * 977, n.words[h] = a & 67108863, a = v * 64 + (a / 67108864 | 0);
      }
      return n.words[n.length - 1] === 0 && (n.length--, n.words[n.length - 1] === 0 && n.length--), n;
    };
    function Mt() {
      lt.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    f(Mt, lt);
    function Qt() {
      lt.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    f(Qt, lt);
    function Ht() {
      lt.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    f(Ht, lt), Ht.prototype.imulK = function(n) {
      for (var a = 0, h = 0; h < n.length; h++) {
        var v = (n.words[h] | 0) * 19 + a, m = v & 67108863;
        v >>>= 26, n.words[h] = m, a = v;
      }
      return a !== 0 && (n.words[n.length++] = a), n;
    }, o._prime = function(n) {
      if (st[n])
        return st[n];
      var a;
      if (n === "k256")
        a = new qt();
      else if (n === "p224")
        a = new Mt();
      else if (n === "p192")
        a = new Qt();
      else if (n === "p25519")
        a = new Ht();
      else
        throw new Error("Unknown prime " + n);
      return st[n] = a, a;
    };
    function nt(w) {
      if (typeof w == "string") {
        var n = o._prime(w);
        this.m = n.p, this.prime = n;
      } else
        i(w.gtn(1), "modulus must be greater than 1"), this.m = w, this.prime = null;
    }
    nt.prototype._verify1 = function(n) {
      i(n.negative === 0, "red works only with positives"), i(n.red, "red works only with red numbers");
    }, nt.prototype._verify2 = function(n, a) {
      i((n.negative | a.negative) === 0, "red works only with positives"), i(
        n.red && n.red === a.red,
        "red works only with red numbers"
      );
    }, nt.prototype.imod = function(n) {
      return this.prime ? this.prime.ireduce(n)._forceRed(this) : (_(n, n.umod(this.m)._forceRed(this)), n);
    }, nt.prototype.neg = function(n) {
      return n.isZero() ? n.clone() : this.m.sub(n)._forceRed(this);
    }, nt.prototype.add = function(n, a) {
      this._verify2(n, a);
      var h = n.add(a);
      return h.cmp(this.m) >= 0 && h.isub(this.m), h._forceRed(this);
    }, nt.prototype.iadd = function(n, a) {
      this._verify2(n, a);
      var h = n.iadd(a);
      return h.cmp(this.m) >= 0 && h.isub(this.m), h;
    }, nt.prototype.sub = function(n, a) {
      this._verify2(n, a);
      var h = n.sub(a);
      return h.cmpn(0) < 0 && h.iadd(this.m), h._forceRed(this);
    }, nt.prototype.isub = function(n, a) {
      this._verify2(n, a);
      var h = n.isub(a);
      return h.cmpn(0) < 0 && h.iadd(this.m), h;
    }, nt.prototype.shl = function(n, a) {
      return this._verify1(n), this.imod(n.ushln(a));
    }, nt.prototype.imul = function(n, a) {
      return this._verify2(n, a), this.imod(n.imul(a));
    }, nt.prototype.mul = function(n, a) {
      return this._verify2(n, a), this.imod(n.mul(a));
    }, nt.prototype.isqr = function(n) {
      return this.imul(n, n.clone());
    }, nt.prototype.sqr = function(n) {
      return this.mul(n, n);
    }, nt.prototype.sqrt = function(n) {
      if (n.isZero())
        return n.clone();
      var a = this.m.andln(3);
      if (i(a % 2 === 1), a === 3) {
        var h = this.m.add(new o(1)).iushrn(2);
        return this.pow(n, h);
      }
      for (var v = this.m.subn(1), m = 0; !v.isZero() && v.andln(1) === 0; )
        m++, v.iushrn(1);
      i(!v.isZero());
      var A = new o(1).toRed(this), M = A.redNeg(), d = this.m.subn(1).iushrn(1), s = this.m.bitLength();
      for (s = new o(2 * s * s).toRed(this); this.pow(s, d).cmp(M) !== 0; )
        s.redIAdd(M);
      for (var g = this.pow(s, v), H = this.pow(n, v.addn(1).iushrn(1)), y = this.pow(n, v), R = m; y.cmp(A) !== 0; ) {
        for (var F = y, T = 0; F.cmp(A) !== 0; T++)
          F = F.redSqr();
        i(T < R);
        var D = this.pow(g, new o(1).iushln(R - T - 1));
        H = H.redMul(D), g = D.redSqr(), y = y.redMul(g), R = T;
      }
      return H;
    }, nt.prototype.invm = function(n) {
      var a = n._invmp(this.m);
      return a.negative !== 0 ? (a.negative = 0, this.imod(a).redNeg()) : this.imod(a);
    }, nt.prototype.pow = function(n, a) {
      if (a.isZero())
        return new o(1).toRed(this);
      if (a.cmpn(1) === 0)
        return n.clone();
      var h = 4, v = new Array(1 << h);
      v[0] = new o(1).toRed(this), v[1] = n;
      for (var m = 2; m < v.length; m++)
        v[m] = this.mul(v[m - 1], n);
      var A = v[0], M = 0, d = 0, s = a.bitLength() % 26;
      for (s === 0 && (s = 26), m = a.length - 1; m >= 0; m--) {
        for (var g = a.words[m], H = s - 1; H >= 0; H--) {
          var y = g >> H & 1;
          if (A !== v[0] && (A = this.sqr(A)), y === 0 && M === 0) {
            d = 0;
            continue;
          }
          M <<= 1, M |= y, d++, !(d !== h && (m !== 0 || H !== 0)) && (A = this.mul(A, v[M]), d = 0, M = 0);
        }
        s = 26;
      }
      return A;
    }, nt.prototype.convertTo = function(n) {
      var a = n.umod(this.m);
      return a === n ? a.clone() : a;
    }, nt.prototype.convertFrom = function(n) {
      var a = n.clone();
      return a.red = null, a;
    }, o.mont = function(n) {
      return new Lt(n);
    };
    function Lt(w) {
      nt.call(this, w), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    f(Lt, nt), Lt.prototype.convertTo = function(n) {
      return this.imod(n.ushln(this.shift));
    }, Lt.prototype.convertFrom = function(n) {
      var a = this.imod(n.mul(this.rinv));
      return a.red = null, a;
    }, Lt.prototype.imul = function(n, a) {
      if (n.isZero() || a.isZero())
        return n.words[0] = 0, n.length = 1, n;
      var h = n.imul(a), v = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), m = h.isub(v).iushrn(this.shift), A = m;
      return m.cmp(this.m) >= 0 ? A = m.isub(this.m) : m.cmpn(0) < 0 && (A = m.iadd(this.m)), A._forceRed(this);
    }, Lt.prototype.mul = function(n, a) {
      if (n.isZero() || a.isZero())
        return new o(0)._forceRed(this);
      var h = n.mul(a), v = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), m = h.isub(v).iushrn(this.shift), A = m;
      return m.cmp(this.m) >= 0 ? A = m.isub(this.m) : m.cmpn(0) < 0 && (A = m.iadd(this.m)), A._forceRed(this);
    }, Lt.prototype.invm = function(n) {
      var a = this.imod(n._invmp(this.m).mul(this.r2));
      return a._forceRed(this);
    };
  })(e, In);
})(Ba);
const Ot = wn;
var zr = {}, Jt = {}, vi = as;
function as(e, t) {
  if (!e)
    throw new Error(t || "Assertion failed");
}
as.equal = function(t, r, i) {
  if (t != r)
    throw new Error(i || "Assertion failed: " + t + " != " + r);
};
var yn = {}, uo = {
  get exports() {
    return yn;
  },
  set exports(e) {
    yn = e;
  }
};
typeof Object.create == "function" ? uo.exports = function(t, r) {
  r && (t.super_ = r, t.prototype = Object.create(r.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : uo.exports = function(t, r) {
  if (r) {
    t.super_ = r;
    var i = function() {
    };
    i.prototype = r.prototype, t.prototype = new i(), t.prototype.constructor = t;
  }
};
var Ca = vi, Ta = yn;
Jt.inherits = Ta;
function Oa(e, t) {
  return (e.charCodeAt(t) & 64512) !== 55296 || t < 0 || t + 1 >= e.length ? !1 : (e.charCodeAt(t + 1) & 64512) === 56320;
}
function Fa(e, t) {
  if (Array.isArray(e))
    return e.slice();
  if (!e)
    return [];
  var r = [];
  if (typeof e == "string")
    if (t) {
      if (t === "hex")
        for (e = e.replace(/[^a-z0-9]+/ig, ""), e.length % 2 !== 0 && (e = "0" + e), f = 0; f < e.length; f += 2)
          r.push(parseInt(e[f] + e[f + 1], 16));
    } else
      for (var i = 0, f = 0; f < e.length; f++) {
        var o = e.charCodeAt(f);
        o < 128 ? r[i++] = o : o < 2048 ? (r[i++] = o >> 6 | 192, r[i++] = o & 63 | 128) : Oa(e, f) ? (o = 65536 + ((o & 1023) << 10) + (e.charCodeAt(++f) & 1023), r[i++] = o >> 18 | 240, r[i++] = o >> 12 & 63 | 128, r[i++] = o >> 6 & 63 | 128, r[i++] = o & 63 | 128) : (r[i++] = o >> 12 | 224, r[i++] = o >> 6 & 63 | 128, r[i++] = o & 63 | 128);
      }
  else
    for (f = 0; f < e.length; f++)
      r[f] = e[f] | 0;
  return r;
}
Jt.toArray = Fa;
function Ua(e) {
  for (var t = "", r = 0; r < e.length; r++)
    t += us(e[r].toString(16));
  return t;
}
Jt.toHex = Ua;
function hs(e) {
  var t = e >>> 24 | e >>> 8 & 65280 | e << 8 & 16711680 | (e & 255) << 24;
  return t >>> 0;
}
Jt.htonl = hs;
function La(e, t) {
  for (var r = "", i = 0; i < e.length; i++) {
    var f = e[i];
    t === "little" && (f = hs(f)), r += ls(f.toString(16));
  }
  return r;
}
Jt.toHex32 = La;
function us(e) {
  return e.length === 1 ? "0" + e : e;
}
Jt.zero2 = us;
function ls(e) {
  return e.length === 7 ? "0" + e : e.length === 6 ? "00" + e : e.length === 5 ? "000" + e : e.length === 4 ? "0000" + e : e.length === 3 ? "00000" + e : e.length === 2 ? "000000" + e : e.length === 1 ? "0000000" + e : e;
}
Jt.zero8 = ls;
function Da(e, t, r, i) {
  var f = r - t;
  Ca(f % 4 === 0);
  for (var o = new Array(f / 4), u = 0, l = t; u < o.length; u++, l += 4) {
    var x;
    i === "big" ? x = e[l] << 24 | e[l + 1] << 16 | e[l + 2] << 8 | e[l + 3] : x = e[l + 3] << 24 | e[l + 2] << 16 | e[l + 1] << 8 | e[l], o[u] = x >>> 0;
  }
  return o;
}
Jt.join32 = Da;
function qa(e, t) {
  for (var r = new Array(e.length * 4), i = 0, f = 0; i < e.length; i++, f += 4) {
    var o = e[i];
    t === "big" ? (r[f] = o >>> 24, r[f + 1] = o >>> 16 & 255, r[f + 2] = o >>> 8 & 255, r[f + 3] = o & 255) : (r[f + 3] = o >>> 24, r[f + 2] = o >>> 16 & 255, r[f + 1] = o >>> 8 & 255, r[f] = o & 255);
  }
  return r;
}
Jt.split32 = qa;
function Ga(e, t) {
  return e >>> t | e << 32 - t;
}
Jt.rotr32 = Ga;
function za(e, t) {
  return e << t | e >>> 32 - t;
}
Jt.rotl32 = za;
function Ha(e, t) {
  return e + t >>> 0;
}
Jt.sum32 = Ha;
function Ka(e, t, r) {
  return e + t + r >>> 0;
}
Jt.sum32_3 = Ka;
function Ja(e, t, r, i) {
  return e + t + r + i >>> 0;
}
Jt.sum32_4 = Ja;
function Ya(e, t, r, i, f) {
  return e + t + r + i + f >>> 0;
}
Jt.sum32_5 = Ya;
function Qa(e, t, r, i) {
  var f = e[t], o = e[t + 1], u = i + o >>> 0, l = (u < i ? 1 : 0) + r + f;
  e[t] = l >>> 0, e[t + 1] = u;
}
Jt.sum64 = Qa;
function Wa(e, t, r, i) {
  var f = t + i >>> 0, o = (f < t ? 1 : 0) + e + r;
  return o >>> 0;
}
Jt.sum64_hi = Wa;
function ja(e, t, r, i) {
  var f = t + i;
  return f >>> 0;
}
Jt.sum64_lo = ja;
function Va(e, t, r, i, f, o, u, l) {
  var x = 0, b = t;
  b = b + i >>> 0, x += b < t ? 1 : 0, b = b + o >>> 0, x += b < o ? 1 : 0, b = b + l >>> 0, x += b < l ? 1 : 0;
  var _ = e + r + f + u + x;
  return _ >>> 0;
}
Jt.sum64_4_hi = Va;
function Xa(e, t, r, i, f, o, u, l) {
  var x = t + i + o + l;
  return x >>> 0;
}
Jt.sum64_4_lo = Xa;
function Za(e, t, r, i, f, o, u, l, x, b) {
  var _ = 0, I = t;
  I = I + i >>> 0, _ += I < t ? 1 : 0, I = I + o >>> 0, _ += I < o ? 1 : 0, I = I + l >>> 0, _ += I < l ? 1 : 0, I = I + b >>> 0, _ += I < b ? 1 : 0;
  var P = e + r + f + u + x + _;
  return P >>> 0;
}
Jt.sum64_5_hi = Za;
function $a(e, t, r, i, f, o, u, l, x, b) {
  var _ = t + i + o + l + b;
  return _ >>> 0;
}
Jt.sum64_5_lo = $a;
function th(e, t, r) {
  var i = t << 32 - r | e >>> r;
  return i >>> 0;
}
Jt.rotr64_hi = th;
function rh(e, t, r) {
  var i = e << 32 - r | t >>> r;
  return i >>> 0;
}
Jt.rotr64_lo = rh;
function eh(e, t, r) {
  return e >>> r;
}
Jt.shr64_hi = eh;
function ih(e, t, r) {
  var i = e << 32 - r | t >>> r;
  return i >>> 0;
}
Jt.shr64_lo = ih;
var Xe = {}, lo = Jt, nh = vi;
function qi() {
  this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
}
Xe.BlockHash = qi;
qi.prototype.update = function(t, r) {
  if (t = lo.toArray(t, r), this.pending ? this.pending = this.pending.concat(t) : this.pending = t, this.pendingTotal += t.length, this.pending.length >= this._delta8) {
    t = this.pending;
    var i = t.length % this._delta8;
    this.pending = t.slice(t.length - i, t.length), this.pending.length === 0 && (this.pending = null), t = lo.join32(t, 0, t.length - i, this.endian);
    for (var f = 0; f < t.length; f += this._delta32)
      this._update(t, f, f + this._delta32);
  }
  return this;
};
qi.prototype.digest = function(t) {
  return this.update(this._pad()), nh(this.pending === null), this._digest(t);
};
qi.prototype._pad = function() {
  var t = this.pendingTotal, r = this._delta8, i = r - (t + this.padLength) % r, f = new Array(i + this.padLength);
  f[0] = 128;
  for (var o = 1; o < i; o++)
    f[o] = 0;
  if (t <<= 3, this.endian === "big") {
    for (var u = 8; u < this.padLength; u++)
      f[o++] = 0;
    f[o++] = 0, f[o++] = 0, f[o++] = 0, f[o++] = 0, f[o++] = t >>> 24 & 255, f[o++] = t >>> 16 & 255, f[o++] = t >>> 8 & 255, f[o++] = t & 255;
  } else
    for (f[o++] = t & 255, f[o++] = t >>> 8 & 255, f[o++] = t >>> 16 & 255, f[o++] = t >>> 24 & 255, f[o++] = 0, f[o++] = 0, f[o++] = 0, f[o++] = 0, u = 8; u < this.padLength; u++)
      f[o++] = 0;
  return f;
};
var Ze = {}, ie = {}, oh = Jt, Xr = oh.rotr32;
function sh(e, t, r, i) {
  if (e === 0)
    return cs(t, r, i);
  if (e === 1 || e === 3)
    return ps(t, r, i);
  if (e === 2)
    return ds(t, r, i);
}
ie.ft_1 = sh;
function cs(e, t, r) {
  return e & t ^ ~e & r;
}
ie.ch32 = cs;
function ds(e, t, r) {
  return e & t ^ e & r ^ t & r;
}
ie.maj32 = ds;
function ps(e, t, r) {
  return e ^ t ^ r;
}
ie.p32 = ps;
function fh(e) {
  return Xr(e, 2) ^ Xr(e, 13) ^ Xr(e, 22);
}
ie.s0_256 = fh;
function ah(e) {
  return Xr(e, 6) ^ Xr(e, 11) ^ Xr(e, 25);
}
ie.s1_256 = ah;
function hh(e) {
  return Xr(e, 7) ^ Xr(e, 18) ^ e >>> 3;
}
ie.g0_256 = hh;
function uh(e) {
  return Xr(e, 17) ^ Xr(e, 19) ^ e >>> 10;
}
ie.g1_256 = uh;
var We = Jt, lh = Xe, ch = ie, $i = We.rotl32, ri = We.sum32, dh = We.sum32_5, ph = ch.ft_1, vs = lh.BlockHash, vh = [
  1518500249,
  1859775393,
  2400959708,
  3395469782
];
function te() {
  if (!(this instanceof te))
    return new te();
  vs.call(this), this.h = [
    1732584193,
    4023233417,
    2562383102,
    271733878,
    3285377520
  ], this.W = new Array(80);
}
We.inherits(te, vs);
var gh = te;
te.blockSize = 512;
te.outSize = 160;
te.hmacStrength = 80;
te.padLength = 64;
te.prototype._update = function(t, r) {
  for (var i = this.W, f = 0; f < 16; f++)
    i[f] = t[r + f];
  for (; f < i.length; f++)
    i[f] = $i(i[f - 3] ^ i[f - 8] ^ i[f - 14] ^ i[f - 16], 1);
  var o = this.h[0], u = this.h[1], l = this.h[2], x = this.h[3], b = this.h[4];
  for (f = 0; f < i.length; f++) {
    var _ = ~~(f / 20), I = dh($i(o, 5), ph(_, u, l, x), b, i[f], vh[_]);
    b = x, x = l, l = $i(u, 30), u = o, o = I;
  }
  this.h[0] = ri(this.h[0], o), this.h[1] = ri(this.h[1], u), this.h[2] = ri(this.h[2], l), this.h[3] = ri(this.h[3], x), this.h[4] = ri(this.h[4], b);
};
te.prototype._digest = function(t) {
  return t === "hex" ? We.toHex32(this.h, "big") : We.split32(this.h, "big");
};
var je = Jt, mh = Xe, $e = ie, wh = vi, Dr = je.sum32, yh = je.sum32_4, xh = je.sum32_5, Ah = $e.ch32, bh = $e.maj32, Mh = $e.s0_256, _h = $e.s1_256, Eh = $e.g0_256, Nh = $e.g1_256, gs = mh.BlockHash, Ih = [
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
];
function re() {
  if (!(this instanceof re))
    return new re();
  gs.call(this), this.h = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ], this.k = Ih, this.W = new Array(64);
}
je.inherits(re, gs);
var ms = re;
re.blockSize = 512;
re.outSize = 256;
re.hmacStrength = 192;
re.padLength = 64;
re.prototype._update = function(t, r) {
  for (var i = this.W, f = 0; f < 16; f++)
    i[f] = t[r + f];
  for (; f < i.length; f++)
    i[f] = yh(Nh(i[f - 2]), i[f - 7], Eh(i[f - 15]), i[f - 16]);
  var o = this.h[0], u = this.h[1], l = this.h[2], x = this.h[3], b = this.h[4], _ = this.h[5], I = this.h[6], P = this.h[7];
  for (wh(this.k.length === i.length), f = 0; f < i.length; f++) {
    var B = xh(P, _h(b), Ah(b, _, I), this.k[f], i[f]), O = Dr(Mh(o), bh(o, u, l));
    P = I, I = _, _ = b, b = Dr(x, B), x = l, l = u, u = o, o = Dr(B, O);
  }
  this.h[0] = Dr(this.h[0], o), this.h[1] = Dr(this.h[1], u), this.h[2] = Dr(this.h[2], l), this.h[3] = Dr(this.h[3], x), this.h[4] = Dr(this.h[4], b), this.h[5] = Dr(this.h[5], _), this.h[6] = Dr(this.h[6], I), this.h[7] = Dr(this.h[7], P);
};
re.prototype._digest = function(t) {
  return t === "hex" ? je.toHex32(this.h, "big") : je.split32(this.h, "big");
};
var xn = Jt, ws = ms;
function he() {
  if (!(this instanceof he))
    return new he();
  ws.call(this), this.h = [
    3238371032,
    914150663,
    812702999,
    4144912697,
    4290775857,
    1750603025,
    1694076839,
    3204075428
  ];
}
xn.inherits(he, ws);
var Sh = he;
he.blockSize = 512;
he.outSize = 224;
he.hmacStrength = 192;
he.padLength = 64;
he.prototype._digest = function(t) {
  return t === "hex" ? xn.toHex32(this.h.slice(0, 7), "big") : xn.split32(this.h.slice(0, 7), "big");
};
var vr = Jt, kh = Xe, Rh = vi, Zr = vr.rotr64_hi, $r = vr.rotr64_lo, ys = vr.shr64_hi, xs = vr.shr64_lo, de = vr.sum64, tn = vr.sum64_hi, rn = vr.sum64_lo, Ph = vr.sum64_4_hi, Bh = vr.sum64_4_lo, Ch = vr.sum64_5_hi, Th = vr.sum64_5_lo, As = kh.BlockHash, Oh = [
  1116352408,
  3609767458,
  1899447441,
  602891725,
  3049323471,
  3964484399,
  3921009573,
  2173295548,
  961987163,
  4081628472,
  1508970993,
  3053834265,
  2453635748,
  2937671579,
  2870763221,
  3664609560,
  3624381080,
  2734883394,
  310598401,
  1164996542,
  607225278,
  1323610764,
  1426881987,
  3590304994,
  1925078388,
  4068182383,
  2162078206,
  991336113,
  2614888103,
  633803317,
  3248222580,
  3479774868,
  3835390401,
  2666613458,
  4022224774,
  944711139,
  264347078,
  2341262773,
  604807628,
  2007800933,
  770255983,
  1495990901,
  1249150122,
  1856431235,
  1555081692,
  3175218132,
  1996064986,
  2198950837,
  2554220882,
  3999719339,
  2821834349,
  766784016,
  2952996808,
  2566594879,
  3210313671,
  3203337956,
  3336571891,
  1034457026,
  3584528711,
  2466948901,
  113926993,
  3758326383,
  338241895,
  168717936,
  666307205,
  1188179964,
  773529912,
  1546045734,
  1294757372,
  1522805485,
  1396182291,
  2643833823,
  1695183700,
  2343527390,
  1986661051,
  1014477480,
  2177026350,
  1206759142,
  2456956037,
  344077627,
  2730485921,
  1290863460,
  2820302411,
  3158454273,
  3259730800,
  3505952657,
  3345764771,
  106217008,
  3516065817,
  3606008344,
  3600352804,
  1432725776,
  4094571909,
  1467031594,
  275423344,
  851169720,
  430227734,
  3100823752,
  506948616,
  1363258195,
  659060556,
  3750685593,
  883997877,
  3785050280,
  958139571,
  3318307427,
  1322822218,
  3812723403,
  1537002063,
  2003034995,
  1747873779,
  3602036899,
  1955562222,
  1575990012,
  2024104815,
  1125592928,
  2227730452,
  2716904306,
  2361852424,
  442776044,
  2428436474,
  593698344,
  2756734187,
  3733110249,
  3204031479,
  2999351573,
  3329325298,
  3815920427,
  3391569614,
  3928383900,
  3515267271,
  566280711,
  3940187606,
  3454069534,
  4118630271,
  4000239992,
  116418474,
  1914138554,
  174292421,
  2731055270,
  289380356,
  3203993006,
  460393269,
  320620315,
  685471733,
  587496836,
  852142971,
  1086792851,
  1017036298,
  365543100,
  1126000580,
  2618297676,
  1288033470,
  3409855158,
  1501505948,
  4234509866,
  1607167915,
  987167468,
  1816402316,
  1246189591
];
function Jr() {
  if (!(this instanceof Jr))
    return new Jr();
  As.call(this), this.h = [
    1779033703,
    4089235720,
    3144134277,
    2227873595,
    1013904242,
    4271175723,
    2773480762,
    1595750129,
    1359893119,
    2917565137,
    2600822924,
    725511199,
    528734635,
    4215389547,
    1541459225,
    327033209
  ], this.k = Oh, this.W = new Array(160);
}
vr.inherits(Jr, As);
var bs = Jr;
Jr.blockSize = 1024;
Jr.outSize = 512;
Jr.hmacStrength = 192;
Jr.padLength = 128;
Jr.prototype._prepareBlock = function(t, r) {
  for (var i = this.W, f = 0; f < 32; f++)
    i[f] = t[r + f];
  for (; f < i.length; f += 2) {
    var o = Yh(i[f - 4], i[f - 3]), u = Qh(i[f - 4], i[f - 3]), l = i[f - 14], x = i[f - 13], b = Kh(i[f - 30], i[f - 29]), _ = Jh(i[f - 30], i[f - 29]), I = i[f - 32], P = i[f - 31];
    i[f] = Ph(
      o,
      u,
      l,
      x,
      b,
      _,
      I,
      P
    ), i[f + 1] = Bh(
      o,
      u,
      l,
      x,
      b,
      _,
      I,
      P
    );
  }
};
Jr.prototype._update = function(t, r) {
  this._prepareBlock(t, r);
  var i = this.W, f = this.h[0], o = this.h[1], u = this.h[2], l = this.h[3], x = this.h[4], b = this.h[5], _ = this.h[6], I = this.h[7], P = this.h[8], B = this.h[9], O = this.h[10], q = this.h[11], ot = this.h[12], G = this.h[13], $ = this.h[14], tt = this.h[15];
  Rh(this.k.length === i.length);
  for (var gt = 0; gt < i.length; gt += 2) {
    var st = $, lt = tt, qt = zh(P, B), Mt = Hh(P, B), Qt = Fh(P, B, O, q, ot), Ht = Uh(P, B, O, q, ot, G), nt = this.k[gt], Lt = this.k[gt + 1], w = i[gt], n = i[gt + 1], a = Ch(
      st,
      lt,
      qt,
      Mt,
      Qt,
      Ht,
      nt,
      Lt,
      w,
      n
    ), h = Th(
      st,
      lt,
      qt,
      Mt,
      Qt,
      Ht,
      nt,
      Lt,
      w,
      n
    );
    st = qh(f, o), lt = Gh(f, o), qt = Lh(f, o, u, l, x), Mt = Dh(f, o, u, l, x, b);
    var v = tn(st, lt, qt, Mt), m = rn(st, lt, qt, Mt);
    $ = ot, tt = G, ot = O, G = q, O = P, q = B, P = tn(_, I, a, h), B = rn(I, I, a, h), _ = x, I = b, x = u, b = l, u = f, l = o, f = tn(a, h, v, m), o = rn(a, h, v, m);
  }
  de(this.h, 0, f, o), de(this.h, 2, u, l), de(this.h, 4, x, b), de(this.h, 6, _, I), de(this.h, 8, P, B), de(this.h, 10, O, q), de(this.h, 12, ot, G), de(this.h, 14, $, tt);
};
Jr.prototype._digest = function(t) {
  return t === "hex" ? vr.toHex32(this.h, "big") : vr.split32(this.h, "big");
};
function Fh(e, t, r, i, f) {
  var o = e & r ^ ~e & f;
  return o < 0 && (o += 4294967296), o;
}
function Uh(e, t, r, i, f, o) {
  var u = t & i ^ ~t & o;
  return u < 0 && (u += 4294967296), u;
}
function Lh(e, t, r, i, f) {
  var o = e & r ^ e & f ^ r & f;
  return o < 0 && (o += 4294967296), o;
}
function Dh(e, t, r, i, f, o) {
  var u = t & i ^ t & o ^ i & o;
  return u < 0 && (u += 4294967296), u;
}
function qh(e, t) {
  var r = Zr(e, t, 28), i = Zr(t, e, 2), f = Zr(t, e, 7), o = r ^ i ^ f;
  return o < 0 && (o += 4294967296), o;
}
function Gh(e, t) {
  var r = $r(e, t, 28), i = $r(t, e, 2), f = $r(t, e, 7), o = r ^ i ^ f;
  return o < 0 && (o += 4294967296), o;
}
function zh(e, t) {
  var r = Zr(e, t, 14), i = Zr(e, t, 18), f = Zr(t, e, 9), o = r ^ i ^ f;
  return o < 0 && (o += 4294967296), o;
}
function Hh(e, t) {
  var r = $r(e, t, 14), i = $r(e, t, 18), f = $r(t, e, 9), o = r ^ i ^ f;
  return o < 0 && (o += 4294967296), o;
}
function Kh(e, t) {
  var r = Zr(e, t, 1), i = Zr(e, t, 8), f = ys(e, t, 7), o = r ^ i ^ f;
  return o < 0 && (o += 4294967296), o;
}
function Jh(e, t) {
  var r = $r(e, t, 1), i = $r(e, t, 8), f = xs(e, t, 7), o = r ^ i ^ f;
  return o < 0 && (o += 4294967296), o;
}
function Yh(e, t) {
  var r = Zr(e, t, 19), i = Zr(t, e, 29), f = ys(e, t, 6), o = r ^ i ^ f;
  return o < 0 && (o += 4294967296), o;
}
function Qh(e, t) {
  var r = $r(e, t, 19), i = $r(t, e, 29), f = xs(e, t, 6), o = r ^ i ^ f;
  return o < 0 && (o += 4294967296), o;
}
var An = Jt, Ms = bs;
function ue() {
  if (!(this instanceof ue))
    return new ue();
  Ms.call(this), this.h = [
    3418070365,
    3238371032,
    1654270250,
    914150663,
    2438529370,
    812702999,
    355462360,
    4144912697,
    1731405415,
    4290775857,
    2394180231,
    1750603025,
    3675008525,
    1694076839,
    1203062813,
    3204075428
  ];
}
An.inherits(ue, Ms);
var Wh = ue;
ue.blockSize = 1024;
ue.outSize = 384;
ue.hmacStrength = 192;
ue.padLength = 128;
ue.prototype._digest = function(t) {
  return t === "hex" ? An.toHex32(this.h.slice(0, 12), "big") : An.split32(this.h.slice(0, 12), "big");
};
Ze.sha1 = gh;
Ze.sha224 = Sh;
Ze.sha256 = ms;
Ze.sha384 = Wh;
Ze.sha512 = bs;
var _s = {}, Ue = Jt, jh = Xe, mi = Ue.rotl32, co = Ue.sum32, ei = Ue.sum32_3, po = Ue.sum32_4, Es = jh.BlockHash;
function ee() {
  if (!(this instanceof ee))
    return new ee();
  Es.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
}
Ue.inherits(ee, Es);
_s.ripemd160 = ee;
ee.blockSize = 512;
ee.outSize = 160;
ee.hmacStrength = 192;
ee.padLength = 64;
ee.prototype._update = function(t, r) {
  for (var i = this.h[0], f = this.h[1], o = this.h[2], u = this.h[3], l = this.h[4], x = i, b = f, _ = o, I = u, P = l, B = 0; B < 80; B++) {
    var O = co(
      mi(
        po(i, vo(B, f, o, u), t[Zh[B] + r], Vh(B)),
        tu[B]
      ),
      l
    );
    i = l, l = u, u = mi(o, 10), o = f, f = O, O = co(
      mi(
        po(x, vo(79 - B, b, _, I), t[$h[B] + r], Xh(B)),
        ru[B]
      ),
      P
    ), x = P, P = I, I = mi(_, 10), _ = b, b = O;
  }
  O = ei(this.h[1], o, I), this.h[1] = ei(this.h[2], u, P), this.h[2] = ei(this.h[3], l, x), this.h[3] = ei(this.h[4], i, b), this.h[4] = ei(this.h[0], f, _), this.h[0] = O;
};
ee.prototype._digest = function(t) {
  return t === "hex" ? Ue.toHex32(this.h, "little") : Ue.split32(this.h, "little");
};
function vo(e, t, r, i) {
  return e <= 15 ? t ^ r ^ i : e <= 31 ? t & r | ~t & i : e <= 47 ? (t | ~r) ^ i : e <= 63 ? t & i | r & ~i : t ^ (r | ~i);
}
function Vh(e) {
  return e <= 15 ? 0 : e <= 31 ? 1518500249 : e <= 47 ? 1859775393 : e <= 63 ? 2400959708 : 2840853838;
}
function Xh(e) {
  return e <= 15 ? 1352829926 : e <= 31 ? 1548603684 : e <= 47 ? 1836072691 : e <= 63 ? 2053994217 : 0;
}
var Zh = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  7,
  4,
  13,
  1,
  10,
  6,
  15,
  3,
  12,
  0,
  9,
  5,
  2,
  14,
  11,
  8,
  3,
  10,
  14,
  4,
  9,
  15,
  8,
  1,
  2,
  7,
  0,
  6,
  13,
  11,
  5,
  12,
  1,
  9,
  11,
  10,
  0,
  8,
  12,
  4,
  13,
  3,
  7,
  15,
  14,
  5,
  6,
  2,
  4,
  0,
  5,
  9,
  7,
  12,
  2,
  10,
  14,
  1,
  3,
  8,
  11,
  6,
  15,
  13
], $h = [
  5,
  14,
  7,
  0,
  9,
  2,
  11,
  4,
  13,
  6,
  15,
  8,
  1,
  10,
  3,
  12,
  6,
  11,
  3,
  7,
  0,
  13,
  5,
  10,
  14,
  15,
  8,
  12,
  4,
  9,
  1,
  2,
  15,
  5,
  1,
  3,
  7,
  14,
  6,
  9,
  11,
  8,
  12,
  2,
  10,
  0,
  4,
  13,
  8,
  6,
  4,
  1,
  3,
  11,
  15,
  0,
  5,
  12,
  2,
  13,
  9,
  7,
  10,
  14,
  12,
  15,
  10,
  4,
  1,
  5,
  8,
  7,
  6,
  2,
  13,
  14,
  0,
  3,
  9,
  11
], tu = [
  11,
  14,
  15,
  12,
  5,
  8,
  7,
  9,
  11,
  13,
  14,
  15,
  6,
  7,
  9,
  8,
  7,
  6,
  8,
  13,
  11,
  9,
  7,
  15,
  7,
  12,
  15,
  9,
  11,
  7,
  13,
  12,
  11,
  13,
  6,
  7,
  14,
  9,
  13,
  15,
  14,
  8,
  13,
  6,
  5,
  12,
  7,
  5,
  11,
  12,
  14,
  15,
  14,
  15,
  9,
  8,
  9,
  14,
  5,
  6,
  8,
  6,
  5,
  12,
  9,
  15,
  5,
  11,
  6,
  8,
  13,
  12,
  5,
  12,
  13,
  14,
  11,
  8,
  5,
  6
], ru = [
  8,
  9,
  9,
  11,
  13,
  15,
  15,
  5,
  7,
  7,
  8,
  11,
  14,
  14,
  12,
  6,
  9,
  13,
  15,
  7,
  12,
  8,
  9,
  11,
  7,
  7,
  12,
  7,
  6,
  15,
  13,
  11,
  9,
  7,
  15,
  11,
  8,
  6,
  6,
  14,
  12,
  13,
  5,
  14,
  13,
  13,
  7,
  5,
  15,
  5,
  8,
  11,
  14,
  14,
  6,
  14,
  6,
  9,
  12,
  9,
  12,
  5,
  15,
  8,
  8,
  5,
  12,
  9,
  12,
  5,
  14,
  6,
  8,
  13,
  6,
  5,
  15,
  13,
  11,
  11
], eu = Jt, iu = vi;
function Ve(e, t, r) {
  if (!(this instanceof Ve))
    return new Ve(e, t, r);
  this.Hash = e, this.blockSize = e.blockSize / 8, this.outSize = e.outSize / 8, this.inner = null, this.outer = null, this._init(eu.toArray(t, r));
}
var nu = Ve;
Ve.prototype._init = function(t) {
  t.length > this.blockSize && (t = new this.Hash().update(t).digest()), iu(t.length <= this.blockSize);
  for (var r = t.length; r < this.blockSize; r++)
    t.push(0);
  for (r = 0; r < t.length; r++)
    t[r] ^= 54;
  for (this.inner = new this.Hash().update(t), r = 0; r < t.length; r++)
    t[r] ^= 106;
  this.outer = new this.Hash().update(t);
};
Ve.prototype.update = function(t, r) {
  return this.inner.update(t, r), this;
};
Ve.prototype.digest = function(t) {
  return this.outer.update(this.inner.digest()), this.outer.digest(t);
};
(function(e) {
  var t = e;
  t.utils = Jt, t.common = Xe, t.sha = Ze, t.ripemd = _s, t.hmac = nu, t.sha1 = t.sha.sha1, t.sha256 = t.sha.sha256, t.sha224 = t.sha.sha224, t.sha384 = t.sha.sha384, t.sha512 = t.sha.sha512, t.ripemd160 = t.ripemd.ripemd160;
})(zr);
function ti(e, t, r) {
  return r = {
    path: t,
    exports: {},
    require: function(i, f) {
      return ou(i, f ?? r.path);
    }
  }, e(r, r.exports), r.exports;
}
function ou() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var Fn = Ns;
function Ns(e, t) {
  if (!e)
    throw new Error(t || "Assertion failed");
}
Ns.equal = function(t, r, i) {
  if (t != r)
    throw new Error(i || "Assertion failed: " + t + " != " + r);
};
var Hr = ti(function(e, t) {
  var r = t;
  function i(u, l) {
    if (Array.isArray(u))
      return u.slice();
    if (!u)
      return [];
    var x = [];
    if (typeof u != "string") {
      for (var b = 0; b < u.length; b++)
        x[b] = u[b] | 0;
      return x;
    }
    if (l === "hex") {
      u = u.replace(/[^a-z0-9]+/ig, ""), u.length % 2 !== 0 && (u = "0" + u);
      for (var b = 0; b < u.length; b += 2)
        x.push(parseInt(u[b] + u[b + 1], 16));
    } else
      for (var b = 0; b < u.length; b++) {
        var _ = u.charCodeAt(b), I = _ >> 8, P = _ & 255;
        I ? x.push(I, P) : x.push(P);
      }
    return x;
  }
  r.toArray = i;
  function f(u) {
    return u.length === 1 ? "0" + u : u;
  }
  r.zero2 = f;
  function o(u) {
    for (var l = "", x = 0; x < u.length; x++)
      l += f(u[x].toString(16));
    return l;
  }
  r.toHex = o, r.encode = function(l, x) {
    return x === "hex" ? o(l) : l;
  };
}), Nr = ti(function(e, t) {
  var r = t;
  r.assert = Fn, r.toArray = Hr.toArray, r.zero2 = Hr.zero2, r.toHex = Hr.toHex, r.encode = Hr.encode;
  function i(x, b, _) {
    var I = new Array(Math.max(x.bitLength(), _) + 1);
    I.fill(0);
    for (var P = 1 << b + 1, B = x.clone(), O = 0; O < I.length; O++) {
      var q, ot = B.andln(P - 1);
      B.isOdd() ? (ot > (P >> 1) - 1 ? q = (P >> 1) - ot : q = ot, B.isubn(q)) : q = 0, I[O] = q, B.iushrn(1);
    }
    return I;
  }
  r.getNAF = i;
  function f(x, b) {
    var _ = [
      [],
      []
    ];
    x = x.clone(), b = b.clone();
    for (var I = 0, P = 0, B; x.cmpn(-I) > 0 || b.cmpn(-P) > 0; ) {
      var O = x.andln(3) + I & 3, q = b.andln(3) + P & 3;
      O === 3 && (O = -1), q === 3 && (q = -1);
      var ot;
      O & 1 ? (B = x.andln(7) + I & 7, (B === 3 || B === 5) && q === 2 ? ot = -O : ot = O) : ot = 0, _[0].push(ot);
      var G;
      q & 1 ? (B = b.andln(7) + P & 7, (B === 3 || B === 5) && O === 2 ? G = -q : G = q) : G = 0, _[1].push(G), 2 * I === ot + 1 && (I = 1 - I), 2 * P === G + 1 && (P = 1 - P), x.iushrn(1), b.iushrn(1);
    }
    return _;
  }
  r.getJSF = f;
  function o(x, b, _) {
    var I = "_" + b;
    x.prototype[b] = function() {
      return this[I] !== void 0 ? this[I] : this[I] = _.call(this);
    };
  }
  r.cachedProperty = o;
  function u(x) {
    return typeof x == "string" ? r.toArray(x, "hex") : x;
  }
  r.parseBytes = u;
  function l(x) {
    return new Ot(x, "hex", "le");
  }
  r.intFromLE = l;
}), ki = Nr.getNAF, su = Nr.getJSF, Ri = Nr.assert;
function me(e, t) {
  this.type = e, this.p = new Ot(t.p, 16), this.red = t.prime ? Ot.red(t.prime) : Ot.mont(this.p), this.zero = new Ot(0).toRed(this.red), this.one = new Ot(1).toRed(this.red), this.two = new Ot(2).toRed(this.red), this.n = t.n && new Ot(t.n, 16), this.g = t.g && this.pointFromJSON(t.g, t.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
  var r = this.n && this.p.div(this.n);
  !r || r.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red));
}
var Le = me;
me.prototype.point = function() {
  throw new Error("Not implemented");
};
me.prototype.validate = function() {
  throw new Error("Not implemented");
};
me.prototype._fixedNafMul = function(t, r) {
  Ri(t.precomputed);
  var i = t._getDoubles(), f = ki(r, 1, this._bitLength), o = (1 << i.step + 1) - (i.step % 2 === 0 ? 2 : 1);
  o /= 3;
  var u = [], l, x;
  for (l = 0; l < f.length; l += i.step) {
    x = 0;
    for (var b = l + i.step - 1; b >= l; b--)
      x = (x << 1) + f[b];
    u.push(x);
  }
  for (var _ = this.jpoint(null, null, null), I = this.jpoint(null, null, null), P = o; P > 0; P--) {
    for (l = 0; l < u.length; l++)
      x = u[l], x === P ? I = I.mixedAdd(i.points[l]) : x === -P && (I = I.mixedAdd(i.points[l].neg()));
    _ = _.add(I);
  }
  return _.toP();
};
me.prototype._wnafMul = function(t, r) {
  var i = 4, f = t._getNAFPoints(i);
  i = f.wnd;
  for (var o = f.points, u = ki(r, i, this._bitLength), l = this.jpoint(null, null, null), x = u.length - 1; x >= 0; x--) {
    for (var b = 0; x >= 0 && u[x] === 0; x--)
      b++;
    if (x >= 0 && b++, l = l.dblp(b), x < 0)
      break;
    var _ = u[x];
    Ri(_ !== 0), t.type === "affine" ? _ > 0 ? l = l.mixedAdd(o[_ - 1 >> 1]) : l = l.mixedAdd(o[-_ - 1 >> 1].neg()) : _ > 0 ? l = l.add(o[_ - 1 >> 1]) : l = l.add(o[-_ - 1 >> 1].neg());
  }
  return t.type === "affine" ? l.toP() : l;
};
me.prototype._wnafMulAdd = function(t, r, i, f, o) {
  var u = this._wnafT1, l = this._wnafT2, x = this._wnafT3, b = 0, _, I, P;
  for (_ = 0; _ < f; _++) {
    P = r[_];
    var B = P._getNAFPoints(t);
    u[_] = B.wnd, l[_] = B.points;
  }
  for (_ = f - 1; _ >= 1; _ -= 2) {
    var O = _ - 1, q = _;
    if (u[O] !== 1 || u[q] !== 1) {
      x[O] = ki(i[O], u[O], this._bitLength), x[q] = ki(i[q], u[q], this._bitLength), b = Math.max(x[O].length, b), b = Math.max(x[q].length, b);
      continue;
    }
    var ot = [
      r[O],
      /* 1 */
      null,
      /* 3 */
      null,
      /* 5 */
      r[q]
      /* 7 */
    ];
    r[O].y.cmp(r[q].y) === 0 ? (ot[1] = r[O].add(r[q]), ot[2] = r[O].toJ().mixedAdd(r[q].neg())) : r[O].y.cmp(r[q].y.redNeg()) === 0 ? (ot[1] = r[O].toJ().mixedAdd(r[q]), ot[2] = r[O].add(r[q].neg())) : (ot[1] = r[O].toJ().mixedAdd(r[q]), ot[2] = r[O].toJ().mixedAdd(r[q].neg()));
    var G = [
      -3,
      /* -1 -1 */
      -1,
      /* -1 0 */
      -5,
      /* -1 1 */
      -7,
      /* 0 -1 */
      0,
      /* 0 0 */
      7,
      /* 0 1 */
      5,
      /* 1 -1 */
      1,
      /* 1 0 */
      3
      /* 1 1 */
    ], $ = su(i[O], i[q]);
    for (b = Math.max($[0].length, b), x[O] = new Array(b), x[q] = new Array(b), I = 0; I < b; I++) {
      var tt = $[0][I] | 0, gt = $[1][I] | 0;
      x[O][I] = G[(tt + 1) * 3 + (gt + 1)], x[q][I] = 0, l[O] = ot;
    }
  }
  var st = this.jpoint(null, null, null), lt = this._wnafT4;
  for (_ = b; _ >= 0; _--) {
    for (var qt = 0; _ >= 0; ) {
      var Mt = !0;
      for (I = 0; I < f; I++)
        lt[I] = x[I][_] | 0, lt[I] !== 0 && (Mt = !1);
      if (!Mt)
        break;
      qt++, _--;
    }
    if (_ >= 0 && qt++, st = st.dblp(qt), _ < 0)
      break;
    for (I = 0; I < f; I++) {
      var Qt = lt[I];
      Qt !== 0 && (Qt > 0 ? P = l[I][Qt - 1 >> 1] : Qt < 0 && (P = l[I][-Qt - 1 >> 1].neg()), P.type === "affine" ? st = st.mixedAdd(P) : st = st.add(P));
    }
  }
  for (_ = 0; _ < f; _++)
    l[_] = null;
  return o ? st : st.toP();
};
function Or(e, t) {
  this.curve = e, this.type = t, this.precomputed = null;
}
me.BasePoint = Or;
Or.prototype.eq = function() {
  throw new Error("Not implemented");
};
Or.prototype.validate = function() {
  return this.curve.validate(this);
};
me.prototype.decodePoint = function(t, r) {
  t = Nr.toArray(t, r);
  var i = this.p.byteLength();
  if ((t[0] === 4 || t[0] === 6 || t[0] === 7) && t.length - 1 === 2 * i) {
    t[0] === 6 ? Ri(t[t.length - 1] % 2 === 0) : t[0] === 7 && Ri(t[t.length - 1] % 2 === 1);
    var f = this.point(
      t.slice(1, 1 + i),
      t.slice(1 + i, 1 + 2 * i)
    );
    return f;
  } else if ((t[0] === 2 || t[0] === 3) && t.length - 1 === i)
    return this.pointFromX(t.slice(1, 1 + i), t[0] === 3);
  throw new Error("Unknown point format");
};
Or.prototype.encodeCompressed = function(t) {
  return this.encode(t, !0);
};
Or.prototype._encode = function(t) {
  var r = this.curve.p.byteLength(), i = this.getX().toArray("be", r);
  return t ? [this.getY().isEven() ? 2 : 3].concat(i) : [4].concat(i, this.getY().toArray("be", r));
};
Or.prototype.encode = function(t, r) {
  return Nr.encode(this._encode(r), t);
};
Or.prototype.precompute = function(t) {
  if (this.precomputed)
    return this;
  var r = {
    doubles: null,
    naf: null,
    beta: null
  };
  return r.naf = this._getNAFPoints(8), r.doubles = this._getDoubles(4, t), r.beta = this._getBeta(), this.precomputed = r, this;
};
Or.prototype._hasDoubles = function(t) {
  if (!this.precomputed)
    return !1;
  var r = this.precomputed.doubles;
  return r ? r.points.length >= Math.ceil((t.bitLength() + 1) / r.step) : !1;
};
Or.prototype._getDoubles = function(t, r) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  for (var i = [this], f = this, o = 0; o < r; o += t) {
    for (var u = 0; u < t; u++)
      f = f.dbl();
    i.push(f);
  }
  return {
    step: t,
    points: i
  };
};
Or.prototype._getNAFPoints = function(t) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;
  for (var r = [this], i = (1 << t) - 1, f = i === 1 ? null : this.dbl(), o = 1; o < i; o++)
    r[o] = r[o - 1].add(f);
  return {
    wnd: t,
    points: r
  };
};
Or.prototype._getBeta = function() {
  return null;
};
Or.prototype.dblp = function(t) {
  for (var r = this, i = 0; i < t; i++)
    r = r.dbl();
  return r;
};
var Un = ti(function(e) {
  typeof Object.create == "function" ? e.exports = function(r, i) {
    i && (r.super_ = i, r.prototype = Object.create(i.prototype, {
      constructor: {
        value: r,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : e.exports = function(r, i) {
    if (i) {
      r.super_ = i;
      var f = function() {
      };
      f.prototype = i.prototype, r.prototype = new f(), r.prototype.constructor = r;
    }
  };
}), fu = Nr.assert;
function Fr(e) {
  Le.call(this, "short", e), this.a = new Ot(e.a, 16).toRed(this.red), this.b = new Ot(e.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(e), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
}
Un(Fr, Le);
var au = Fr;
Fr.prototype._getEndomorphism = function(t) {
  if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
    var r, i;
    if (t.beta)
      r = new Ot(t.beta, 16).toRed(this.red);
    else {
      var f = this._getEndoRoots(this.p);
      r = f[0].cmp(f[1]) < 0 ? f[0] : f[1], r = r.toRed(this.red);
    }
    if (t.lambda)
      i = new Ot(t.lambda, 16);
    else {
      var o = this._getEndoRoots(this.n);
      this.g.mul(o[0]).x.cmp(this.g.x.redMul(r)) === 0 ? i = o[0] : (i = o[1], fu(this.g.mul(i).x.cmp(this.g.x.redMul(r)) === 0));
    }
    var u;
    return t.basis ? u = t.basis.map(function(l) {
      return {
        a: new Ot(l.a, 16),
        b: new Ot(l.b, 16)
      };
    }) : u = this._getEndoBasis(i), {
      beta: r,
      lambda: i,
      basis: u
    };
  }
};
Fr.prototype._getEndoRoots = function(t) {
  var r = t === this.p ? this.red : Ot.mont(t), i = new Ot(2).toRed(r).redInvm(), f = i.redNeg(), o = new Ot(3).toRed(r).redNeg().redSqrt().redMul(i), u = f.redAdd(o).fromRed(), l = f.redSub(o).fromRed();
  return [u, l];
};
Fr.prototype._getEndoBasis = function(t) {
  for (var r = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), i = t, f = this.n.clone(), o = new Ot(1), u = new Ot(0), l = new Ot(0), x = new Ot(1), b, _, I, P, B, O, q, ot = 0, G, $; i.cmpn(0) !== 0; ) {
    var tt = f.div(i);
    G = f.sub(tt.mul(i)), $ = l.sub(tt.mul(o));
    var gt = x.sub(tt.mul(u));
    if (!I && G.cmp(r) < 0)
      b = q.neg(), _ = o, I = G.neg(), P = $;
    else if (I && ++ot === 2)
      break;
    q = G, f = i, i = G, l = o, o = $, x = u, u = gt;
  }
  B = G.neg(), O = $;
  var st = I.sqr().add(P.sqr()), lt = B.sqr().add(O.sqr());
  return lt.cmp(st) >= 0 && (B = b, O = _), I.negative && (I = I.neg(), P = P.neg()), B.negative && (B = B.neg(), O = O.neg()), [
    { a: I, b: P },
    { a: B, b: O }
  ];
};
Fr.prototype._endoSplit = function(t) {
  var r = this.endo.basis, i = r[0], f = r[1], o = f.b.mul(t).divRound(this.n), u = i.b.neg().mul(t).divRound(this.n), l = o.mul(i.a), x = u.mul(f.a), b = o.mul(i.b), _ = u.mul(f.b), I = t.sub(l).sub(x), P = b.add(_).neg();
  return { k1: I, k2: P };
};
Fr.prototype.pointFromX = function(t, r) {
  t = new Ot(t, 16), t.red || (t = t.toRed(this.red));
  var i = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b), f = i.redSqrt();
  if (f.redSqr().redSub(i).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var o = f.fromRed().isOdd();
  return (r && !o || !r && o) && (f = f.redNeg()), this.point(t, f);
};
Fr.prototype.validate = function(t) {
  if (t.inf)
    return !0;
  var r = t.x, i = t.y, f = this.a.redMul(r), o = r.redSqr().redMul(r).redIAdd(f).redIAdd(this.b);
  return i.redSqr().redISub(o).cmpn(0) === 0;
};
Fr.prototype._endoWnafMulAdd = function(t, r, i) {
  for (var f = this._endoWnafT1, o = this._endoWnafT2, u = 0; u < t.length; u++) {
    var l = this._endoSplit(r[u]), x = t[u], b = x._getBeta();
    l.k1.negative && (l.k1.ineg(), x = x.neg(!0)), l.k2.negative && (l.k2.ineg(), b = b.neg(!0)), f[u * 2] = x, f[u * 2 + 1] = b, o[u * 2] = l.k1, o[u * 2 + 1] = l.k2;
  }
  for (var _ = this._wnafMulAdd(1, f, o, u * 2, i), I = 0; I < u * 2; I++)
    f[I] = null, o[I] = null;
  return _;
};
function ir(e, t, r, i) {
  Le.BasePoint.call(this, e, "affine"), t === null && r === null ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new Ot(t, 16), this.y = new Ot(r, 16), i && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1);
}
Un(ir, Le.BasePoint);
Fr.prototype.point = function(t, r, i) {
  return new ir(this, t, r, i);
};
Fr.prototype.pointFromJSON = function(t, r) {
  return ir.fromJSON(this, t, r);
};
ir.prototype._getBeta = function() {
  if (this.curve.endo) {
    var t = this.precomputed;
    if (t && t.beta)
      return t.beta;
    var r = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (t) {
      var i = this.curve, f = function(o) {
        return i.point(o.x.redMul(i.endo.beta), o.y);
      };
      t.beta = r, r.precomputed = {
        beta: null,
        naf: t.naf && {
          wnd: t.naf.wnd,
          points: t.naf.points.map(f)
        },
        doubles: t.doubles && {
          step: t.doubles.step,
          points: t.doubles.points.map(f)
        }
      };
    }
    return r;
  }
};
ir.prototype.toJSON = function() {
  return this.precomputed ? [this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  }] : [this.x, this.y];
};
ir.fromJSON = function(t, r, i) {
  typeof r == "string" && (r = JSON.parse(r));
  var f = t.point(r[0], r[1], i);
  if (!r[2])
    return f;
  function o(l) {
    return t.point(l[0], l[1], i);
  }
  var u = r[2];
  return f.precomputed = {
    beta: null,
    doubles: u.doubles && {
      step: u.doubles.step,
      points: [f].concat(u.doubles.points.map(o))
    },
    naf: u.naf && {
      wnd: u.naf.wnd,
      points: [f].concat(u.naf.points.map(o))
    }
  }, f;
};
ir.prototype.inspect = function() {
  return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
};
ir.prototype.isInfinity = function() {
  return this.inf;
};
ir.prototype.add = function(t) {
  if (this.inf)
    return t;
  if (t.inf)
    return this;
  if (this.eq(t))
    return this.dbl();
  if (this.neg().eq(t))
    return this.curve.point(null, null);
  if (this.x.cmp(t.x) === 0)
    return this.curve.point(null, null);
  var r = this.y.redSub(t.y);
  r.cmpn(0) !== 0 && (r = r.redMul(this.x.redSub(t.x).redInvm()));
  var i = r.redSqr().redISub(this.x).redISub(t.x), f = r.redMul(this.x.redSub(i)).redISub(this.y);
  return this.curve.point(i, f);
};
ir.prototype.dbl = function() {
  if (this.inf)
    return this;
  var t = this.y.redAdd(this.y);
  if (t.cmpn(0) === 0)
    return this.curve.point(null, null);
  var r = this.curve.a, i = this.x.redSqr(), f = t.redInvm(), o = i.redAdd(i).redIAdd(i).redIAdd(r).redMul(f), u = o.redSqr().redISub(this.x.redAdd(this.x)), l = o.redMul(this.x.redSub(u)).redISub(this.y);
  return this.curve.point(u, l);
};
ir.prototype.getX = function() {
  return this.x.fromRed();
};
ir.prototype.getY = function() {
  return this.y.fromRed();
};
ir.prototype.mul = function(t) {
  return t = new Ot(t, 16), this.isInfinity() ? this : this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [t]) : this.curve._wnafMul(this, t);
};
ir.prototype.mulAdd = function(t, r, i) {
  var f = [this, r], o = [t, i];
  return this.curve.endo ? this.curve._endoWnafMulAdd(f, o) : this.curve._wnafMulAdd(1, f, o, 2);
};
ir.prototype.jmulAdd = function(t, r, i) {
  var f = [this, r], o = [t, i];
  return this.curve.endo ? this.curve._endoWnafMulAdd(f, o, !0) : this.curve._wnafMulAdd(1, f, o, 2, !0);
};
ir.prototype.eq = function(t) {
  return this === t || this.inf === t.inf && (this.inf || this.x.cmp(t.x) === 0 && this.y.cmp(t.y) === 0);
};
ir.prototype.neg = function(t) {
  if (this.inf)
    return this;
  var r = this.curve.point(this.x, this.y.redNeg());
  if (t && this.precomputed) {
    var i = this.precomputed, f = function(o) {
      return o.neg();
    };
    r.precomputed = {
      naf: i.naf && {
        wnd: i.naf.wnd,
        points: i.naf.points.map(f)
      },
      doubles: i.doubles && {
        step: i.doubles.step,
        points: i.doubles.points.map(f)
      }
    };
  }
  return r;
};
ir.prototype.toJ = function() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);
  var t = this.curve.jpoint(this.x, this.y, this.curve.one);
  return t;
};
function fr(e, t, r, i) {
  Le.BasePoint.call(this, e, "jacobian"), t === null && r === null && i === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new Ot(0)) : (this.x = new Ot(t, 16), this.y = new Ot(r, 16), this.z = new Ot(i, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
}
Un(fr, Le.BasePoint);
Fr.prototype.jpoint = function(t, r, i) {
  return new fr(this, t, r, i);
};
fr.prototype.toP = function() {
  if (this.isInfinity())
    return this.curve.point(null, null);
  var t = this.z.redInvm(), r = t.redSqr(), i = this.x.redMul(r), f = this.y.redMul(r).redMul(t);
  return this.curve.point(i, f);
};
fr.prototype.neg = function() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};
fr.prototype.add = function(t) {
  if (this.isInfinity())
    return t;
  if (t.isInfinity())
    return this;
  var r = t.z.redSqr(), i = this.z.redSqr(), f = this.x.redMul(r), o = t.x.redMul(i), u = this.y.redMul(r.redMul(t.z)), l = t.y.redMul(i.redMul(this.z)), x = f.redSub(o), b = u.redSub(l);
  if (x.cmpn(0) === 0)
    return b.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var _ = x.redSqr(), I = _.redMul(x), P = f.redMul(_), B = b.redSqr().redIAdd(I).redISub(P).redISub(P), O = b.redMul(P.redISub(B)).redISub(u.redMul(I)), q = this.z.redMul(t.z).redMul(x);
  return this.curve.jpoint(B, O, q);
};
fr.prototype.mixedAdd = function(t) {
  if (this.isInfinity())
    return t.toJ();
  if (t.isInfinity())
    return this;
  var r = this.z.redSqr(), i = this.x, f = t.x.redMul(r), o = this.y, u = t.y.redMul(r).redMul(this.z), l = i.redSub(f), x = o.redSub(u);
  if (l.cmpn(0) === 0)
    return x.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var b = l.redSqr(), _ = b.redMul(l), I = i.redMul(b), P = x.redSqr().redIAdd(_).redISub(I).redISub(I), B = x.redMul(I.redISub(P)).redISub(o.redMul(_)), O = this.z.redMul(l);
  return this.curve.jpoint(P, B, O);
};
fr.prototype.dblp = function(t) {
  if (t === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!t)
    return this.dbl();
  var r;
  if (this.curve.zeroA || this.curve.threeA) {
    var i = this;
    for (r = 0; r < t; r++)
      i = i.dbl();
    return i;
  }
  var f = this.curve.a, o = this.curve.tinv, u = this.x, l = this.y, x = this.z, b = x.redSqr().redSqr(), _ = l.redAdd(l);
  for (r = 0; r < t; r++) {
    var I = u.redSqr(), P = _.redSqr(), B = P.redSqr(), O = I.redAdd(I).redIAdd(I).redIAdd(f.redMul(b)), q = u.redMul(P), ot = O.redSqr().redISub(q.redAdd(q)), G = q.redISub(ot), $ = O.redMul(G);
    $ = $.redIAdd($).redISub(B);
    var tt = _.redMul(x);
    r + 1 < t && (b = b.redMul(B)), u = ot, x = tt, _ = $;
  }
  return this.curve.jpoint(u, _.redMul(o), x);
};
fr.prototype.dbl = function() {
  return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
};
fr.prototype._zeroDbl = function() {
  var t, r, i;
  if (this.zOne) {
    var f = this.x.redSqr(), o = this.y.redSqr(), u = o.redSqr(), l = this.x.redAdd(o).redSqr().redISub(f).redISub(u);
    l = l.redIAdd(l);
    var x = f.redAdd(f).redIAdd(f), b = x.redSqr().redISub(l).redISub(l), _ = u.redIAdd(u);
    _ = _.redIAdd(_), _ = _.redIAdd(_), t = b, r = x.redMul(l.redISub(b)).redISub(_), i = this.y.redAdd(this.y);
  } else {
    var I = this.x.redSqr(), P = this.y.redSqr(), B = P.redSqr(), O = this.x.redAdd(P).redSqr().redISub(I).redISub(B);
    O = O.redIAdd(O);
    var q = I.redAdd(I).redIAdd(I), ot = q.redSqr(), G = B.redIAdd(B);
    G = G.redIAdd(G), G = G.redIAdd(G), t = ot.redISub(O).redISub(O), r = q.redMul(O.redISub(t)).redISub(G), i = this.y.redMul(this.z), i = i.redIAdd(i);
  }
  return this.curve.jpoint(t, r, i);
};
fr.prototype._threeDbl = function() {
  var t, r, i;
  if (this.zOne) {
    var f = this.x.redSqr(), o = this.y.redSqr(), u = o.redSqr(), l = this.x.redAdd(o).redSqr().redISub(f).redISub(u);
    l = l.redIAdd(l);
    var x = f.redAdd(f).redIAdd(f).redIAdd(this.curve.a), b = x.redSqr().redISub(l).redISub(l);
    t = b;
    var _ = u.redIAdd(u);
    _ = _.redIAdd(_), _ = _.redIAdd(_), r = x.redMul(l.redISub(b)).redISub(_), i = this.y.redAdd(this.y);
  } else {
    var I = this.z.redSqr(), P = this.y.redSqr(), B = this.x.redMul(P), O = this.x.redSub(I).redMul(this.x.redAdd(I));
    O = O.redAdd(O).redIAdd(O);
    var q = B.redIAdd(B);
    q = q.redIAdd(q);
    var ot = q.redAdd(q);
    t = O.redSqr().redISub(ot), i = this.y.redAdd(this.z).redSqr().redISub(P).redISub(I);
    var G = P.redSqr();
    G = G.redIAdd(G), G = G.redIAdd(G), G = G.redIAdd(G), r = O.redMul(q.redISub(t)).redISub(G);
  }
  return this.curve.jpoint(t, r, i);
};
fr.prototype._dbl = function() {
  var t = this.curve.a, r = this.x, i = this.y, f = this.z, o = f.redSqr().redSqr(), u = r.redSqr(), l = i.redSqr(), x = u.redAdd(u).redIAdd(u).redIAdd(t.redMul(o)), b = r.redAdd(r);
  b = b.redIAdd(b);
  var _ = b.redMul(l), I = x.redSqr().redISub(_.redAdd(_)), P = _.redISub(I), B = l.redSqr();
  B = B.redIAdd(B), B = B.redIAdd(B), B = B.redIAdd(B);
  var O = x.redMul(P).redISub(B), q = i.redAdd(i).redMul(f);
  return this.curve.jpoint(I, O, q);
};
fr.prototype.trpl = function() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);
  var t = this.x.redSqr(), r = this.y.redSqr(), i = this.z.redSqr(), f = r.redSqr(), o = t.redAdd(t).redIAdd(t), u = o.redSqr(), l = this.x.redAdd(r).redSqr().redISub(t).redISub(f);
  l = l.redIAdd(l), l = l.redAdd(l).redIAdd(l), l = l.redISub(u);
  var x = l.redSqr(), b = f.redIAdd(f);
  b = b.redIAdd(b), b = b.redIAdd(b), b = b.redIAdd(b);
  var _ = o.redIAdd(l).redSqr().redISub(u).redISub(x).redISub(b), I = r.redMul(_);
  I = I.redIAdd(I), I = I.redIAdd(I);
  var P = this.x.redMul(x).redISub(I);
  P = P.redIAdd(P), P = P.redIAdd(P);
  var B = this.y.redMul(_.redMul(b.redISub(_)).redISub(l.redMul(x)));
  B = B.redIAdd(B), B = B.redIAdd(B), B = B.redIAdd(B);
  var O = this.z.redAdd(l).redSqr().redISub(i).redISub(x);
  return this.curve.jpoint(P, B, O);
};
fr.prototype.mul = function(t, r) {
  return t = new Ot(t, r), this.curve._wnafMul(this, t);
};
fr.prototype.eq = function(t) {
  if (t.type === "affine")
    return this.eq(t.toJ());
  if (this === t)
    return !0;
  var r = this.z.redSqr(), i = t.z.redSqr();
  if (this.x.redMul(i).redISub(t.x.redMul(r)).cmpn(0) !== 0)
    return !1;
  var f = r.redMul(this.z), o = i.redMul(t.z);
  return this.y.redMul(o).redISub(t.y.redMul(f)).cmpn(0) === 0;
};
fr.prototype.eqXToP = function(t) {
  var r = this.z.redSqr(), i = t.toRed(this.curve.red).redMul(r);
  if (this.x.cmp(i) === 0)
    return !0;
  for (var f = t.clone(), o = this.curve.redN.redMul(r); ; ) {
    if (f.iadd(this.curve.n), f.cmp(this.curve.p) >= 0)
      return !1;
    if (i.redIAdd(o), this.x.cmp(i) === 0)
      return !0;
  }
};
fr.prototype.inspect = function() {
  return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
};
fr.prototype.isInfinity = function() {
  return this.z.cmpn(0) === 0;
};
var Mi = ti(function(e, t) {
  var r = t;
  r.base = Le, r.short = au, r.mont = /*RicMoo:ethers:require(./mont)*/
  null, r.edwards = /*RicMoo:ethers:require(./edwards)*/
  null;
}), _i = ti(function(e, t) {
  var r = t, i = Nr.assert;
  function f(l) {
    l.type === "short" ? this.curve = new Mi.short(l) : l.type === "edwards" ? this.curve = new Mi.edwards(l) : this.curve = new Mi.mont(l), this.g = this.curve.g, this.n = this.curve.n, this.hash = l.hash, i(this.g.validate(), "Invalid curve"), i(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
  }
  r.PresetCurve = f;
  function o(l, x) {
    Object.defineProperty(r, l, {
      configurable: !0,
      enumerable: !0,
      get: function() {
        var b = new f(x);
        return Object.defineProperty(r, l, {
          configurable: !0,
          enumerable: !0,
          value: b
        }), b;
      }
    });
  }
  o("p192", {
    type: "short",
    prime: "p192",
    p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
    b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
    n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
    hash: zr.sha256,
    gRed: !1,
    g: [
      "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
      "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
    ]
  }), o("p224", {
    type: "short",
    prime: "p224",
    p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
    b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
    n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
    hash: zr.sha256,
    gRed: !1,
    g: [
      "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
      "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
    ]
  }), o("p256", {
    type: "short",
    prime: null,
    p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
    a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
    b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
    n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
    hash: zr.sha256,
    gRed: !1,
    g: [
      "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
      "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
    ]
  }), o("p384", {
    type: "short",
    prime: null,
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
    a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
    b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
    n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
    hash: zr.sha384,
    gRed: !1,
    g: [
      "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
      "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
    ]
  }), o("p521", {
    type: "short",
    prime: null,
    p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
    a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
    b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
    n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
    hash: zr.sha512,
    gRed: !1,
    g: [
      "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
      "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
    ]
  }), o("curve25519", {
    type: "mont",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "76d06",
    b: "1",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: zr.sha256,
    gRed: !1,
    g: [
      "9"
    ]
  }), o("ed25519", {
    type: "edwards",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "-1",
    c: "1",
    // -121665 * (121666^(-1)) (mod P)
    d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: zr.sha256,
    gRed: !1,
    g: [
      "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
      // 4/5
      "6666666666666666666666666666666666666666666666666666666666666658"
    ]
  });
  var u;
  try {
    u = /*RicMoo:ethers:require(./precomputed/secp256k1)*/
    null.crash();
  } catch {
    u = void 0;
  }
  o("secp256k1", {
    type: "short",
    prime: "k256",
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
    a: "0",
    b: "7",
    n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
    h: "1",
    hash: zr.sha256,
    // Precomputed endomorphism
    beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
    lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
    basis: [
      {
        a: "3086d221a7d46bcde86c90e49284eb15",
        b: "-e4437ed6010e88286f547fa90abfe4c3"
      },
      {
        a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
        b: "3086d221a7d46bcde86c90e49284eb15"
      }
    ],
    gRed: !1,
    g: [
      "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
      "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
      u
    ]
  });
});
function ge(e) {
  if (!(this instanceof ge))
    return new ge(e);
  this.hash = e.hash, this.predResist = !!e.predResist, this.outLen = this.hash.outSize, this.minEntropy = e.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
  var t = Hr.toArray(e.entropy, e.entropyEnc || "hex"), r = Hr.toArray(e.nonce, e.nonceEnc || "hex"), i = Hr.toArray(e.pers, e.persEnc || "hex");
  Fn(
    t.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ), this._init(t, r, i);
}
var Is = ge;
ge.prototype._init = function(t, r, i) {
  var f = t.concat(r).concat(i);
  this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
  for (var o = 0; o < this.V.length; o++)
    this.K[o] = 0, this.V[o] = 1;
  this._update(f), this._reseed = 1, this.reseedInterval = 281474976710656;
};
ge.prototype._hmac = function() {
  return new zr.hmac(this.hash, this.K);
};
ge.prototype._update = function(t) {
  var r = this._hmac().update(this.V).update([0]);
  t && (r = r.update(t)), this.K = r.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac().update(this.V).digest());
};
ge.prototype.reseed = function(t, r, i, f) {
  typeof r != "string" && (f = i, i = r, r = null), t = Hr.toArray(t, r), i = Hr.toArray(i, f), Fn(
    t.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ), this._update(t.concat(i || [])), this._reseed = 1;
};
ge.prototype.generate = function(t, r, i, f) {
  if (this._reseed > this.reseedInterval)
    throw new Error("Reseed is required");
  typeof r != "string" && (f = i, i = r, r = null), i && (i = Hr.toArray(i, f || "hex"), this._update(i));
  for (var o = []; o.length < t; )
    this.V = this._hmac().update(this.V).digest(), o = o.concat(this.V);
  var u = o.slice(0, t);
  return this._update(i), this._reseed++, Hr.encode(u, r);
};
var bn = Nr.assert;
function hr(e, t) {
  this.ec = e, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc);
}
var Ln = hr;
hr.fromPublic = function(t, r, i) {
  return r instanceof hr ? r : new hr(t, {
    pub: r,
    pubEnc: i
  });
};
hr.fromPrivate = function(t, r, i) {
  return r instanceof hr ? r : new hr(t, {
    priv: r,
    privEnc: i
  });
};
hr.prototype.validate = function() {
  var t = this.getPublic();
  return t.isInfinity() ? { result: !1, reason: "Invalid public key" } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" };
};
hr.prototype.getPublic = function(t, r) {
  return typeof t == "string" && (r = t, t = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), r ? this.pub.encode(r, t) : this.pub;
};
hr.prototype.getPrivate = function(t) {
  return t === "hex" ? this.priv.toString(16, 2) : this.priv;
};
hr.prototype._importPrivate = function(t, r) {
  this.priv = new Ot(t, r || 16), this.priv = this.priv.umod(this.ec.curve.n);
};
hr.prototype._importPublic = function(t, r) {
  if (t.x || t.y) {
    this.ec.curve.type === "mont" ? bn(t.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && bn(t.x && t.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(t.x, t.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(t, r);
};
hr.prototype.derive = function(t) {
  return t.validate() || bn(t.validate(), "public point not validated"), t.mul(this.priv).getX();
};
hr.prototype.sign = function(t, r, i) {
  return this.ec.sign(t, this, r, i);
};
hr.prototype.verify = function(t, r) {
  return this.ec.verify(t, r, this);
};
hr.prototype.inspect = function() {
  return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
var hu = Nr.assert;
function Gi(e, t) {
  if (e instanceof Gi)
    return e;
  this._importDER(e, t) || (hu(e.r && e.s, "Signature without r or s"), this.r = new Ot(e.r, 16), this.s = new Ot(e.s, 16), e.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam);
}
var zi = Gi;
function uu() {
  this.place = 0;
}
function en(e, t) {
  var r = e[t.place++];
  if (!(r & 128))
    return r;
  var i = r & 15;
  if (i === 0 || i > 4)
    return !1;
  for (var f = 0, o = 0, u = t.place; o < i; o++, u++)
    f <<= 8, f |= e[u], f >>>= 0;
  return f <= 127 ? !1 : (t.place = u, f);
}
function go(e) {
  for (var t = 0, r = e.length - 1; !e[t] && !(e[t + 1] & 128) && t < r; )
    t++;
  return t === 0 ? e : e.slice(t);
}
Gi.prototype._importDER = function(t, r) {
  t = Nr.toArray(t, r);
  var i = new uu();
  if (t[i.place++] !== 48)
    return !1;
  var f = en(t, i);
  if (f === !1 || f + i.place !== t.length || t[i.place++] !== 2)
    return !1;
  var o = en(t, i);
  if (o === !1)
    return !1;
  var u = t.slice(i.place, o + i.place);
  if (i.place += o, t[i.place++] !== 2)
    return !1;
  var l = en(t, i);
  if (l === !1 || t.length !== l + i.place)
    return !1;
  var x = t.slice(i.place, l + i.place);
  if (u[0] === 0)
    if (u[1] & 128)
      u = u.slice(1);
    else
      return !1;
  if (x[0] === 0)
    if (x[1] & 128)
      x = x.slice(1);
    else
      return !1;
  return this.r = new Ot(u), this.s = new Ot(x), this.recoveryParam = null, !0;
};
function nn(e, t) {
  if (t < 128) {
    e.push(t);
    return;
  }
  var r = 1 + (Math.log(t) / Math.LN2 >>> 3);
  for (e.push(r | 128); --r; )
    e.push(t >>> (r << 3) & 255);
  e.push(t);
}
Gi.prototype.toDER = function(t) {
  var r = this.r.toArray(), i = this.s.toArray();
  for (r[0] & 128 && (r = [0].concat(r)), i[0] & 128 && (i = [0].concat(i)), r = go(r), i = go(i); !i[0] && !(i[1] & 128); )
    i = i.slice(1);
  var f = [2];
  nn(f, r.length), f = f.concat(r), f.push(2), nn(f, i.length);
  var o = f.concat(i), u = [48];
  return nn(u, o.length), u = u.concat(o), Nr.encode(u, t);
};
var lu = (
  /*RicMoo:ethers:require(brorand)*/
  function() {
    throw new Error("unsupported");
  }
), Ss = Nr.assert;
function Tr(e) {
  if (!(this instanceof Tr))
    return new Tr(e);
  typeof e == "string" && (Ss(
    Object.prototype.hasOwnProperty.call(_i, e),
    "Unknown curve " + e
  ), e = _i[e]), e instanceof _i.PresetCurve && (e = { curve: e }), this.curve = e.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = e.curve.g, this.g.precompute(e.curve.n.bitLength() + 1), this.hash = e.hash || e.curve.hash;
}
var cu = Tr;
Tr.prototype.keyPair = function(t) {
  return new Ln(this, t);
};
Tr.prototype.keyFromPrivate = function(t, r) {
  return Ln.fromPrivate(this, t, r);
};
Tr.prototype.keyFromPublic = function(t, r) {
  return Ln.fromPublic(this, t, r);
};
Tr.prototype.genKeyPair = function(t) {
  t || (t = {});
  for (var r = new Is({
    hash: this.hash,
    pers: t.pers,
    persEnc: t.persEnc || "utf8",
    entropy: t.entropy || lu(this.hash.hmacStrength),
    entropyEnc: t.entropy && t.entropyEnc || "utf8",
    nonce: this.n.toArray()
  }), i = this.n.byteLength(), f = this.n.sub(new Ot(2)); ; ) {
    var o = new Ot(r.generate(i));
    if (!(o.cmp(f) > 0))
      return o.iaddn(1), this.keyFromPrivate(o);
  }
};
Tr.prototype._truncateToN = function(t, r) {
  var i = t.byteLength() * 8 - this.n.bitLength();
  return i > 0 && (t = t.ushrn(i)), !r && t.cmp(this.n) >= 0 ? t.sub(this.n) : t;
};
Tr.prototype.sign = function(t, r, i, f) {
  typeof i == "object" && (f = i, i = null), f || (f = {}), r = this.keyFromPrivate(r, i), t = this._truncateToN(new Ot(t, 16));
  for (var o = this.n.byteLength(), u = r.getPrivate().toArray("be", o), l = t.toArray("be", o), x = new Is({
    hash: this.hash,
    entropy: u,
    nonce: l,
    pers: f.pers,
    persEnc: f.persEnc || "utf8"
  }), b = this.n.sub(new Ot(1)), _ = 0; ; _++) {
    var I = f.k ? f.k(_) : new Ot(x.generate(this.n.byteLength()));
    if (I = this._truncateToN(I, !0), !(I.cmpn(1) <= 0 || I.cmp(b) >= 0)) {
      var P = this.g.mul(I);
      if (!P.isInfinity()) {
        var B = P.getX(), O = B.umod(this.n);
        if (O.cmpn(0) !== 0) {
          var q = I.invm(this.n).mul(O.mul(r.getPrivate()).iadd(t));
          if (q = q.umod(this.n), q.cmpn(0) !== 0) {
            var ot = (P.getY().isOdd() ? 1 : 0) | (B.cmp(O) !== 0 ? 2 : 0);
            return f.canonical && q.cmp(this.nh) > 0 && (q = this.n.sub(q), ot ^= 1), new zi({ r: O, s: q, recoveryParam: ot });
          }
        }
      }
    }
  }
};
Tr.prototype.verify = function(t, r, i, f) {
  t = this._truncateToN(new Ot(t, 16)), i = this.keyFromPublic(i, f), r = new zi(r, "hex");
  var o = r.r, u = r.s;
  if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0 || u.cmpn(1) < 0 || u.cmp(this.n) >= 0)
    return !1;
  var l = u.invm(this.n), x = l.mul(t).umod(this.n), b = l.mul(o).umod(this.n), _;
  return this.curve._maxwellTrick ? (_ = this.g.jmulAdd(x, i.getPublic(), b), _.isInfinity() ? !1 : _.eqXToP(o)) : (_ = this.g.mulAdd(x, i.getPublic(), b), _.isInfinity() ? !1 : _.getX().umod(this.n).cmp(o) === 0);
};
Tr.prototype.recoverPubKey = function(e, t, r, i) {
  Ss((3 & r) === r, "The recovery param is more than two bits"), t = new zi(t, i);
  var f = this.n, o = new Ot(e), u = t.r, l = t.s, x = r & 1, b = r >> 1;
  if (u.cmp(this.curve.p.umod(this.curve.n)) >= 0 && b)
    throw new Error("Unable to find sencond key candinate");
  b ? u = this.curve.pointFromX(u.add(this.curve.n), x) : u = this.curve.pointFromX(u, x);
  var _ = t.r.invm(f), I = f.sub(o).mul(_).umod(f), P = l.mul(_).umod(f);
  return this.g.mulAdd(I, u, P);
};
Tr.prototype.getKeyRecoveryParam = function(e, t, r, i) {
  if (t = new zi(t, i), t.recoveryParam !== null)
    return t.recoveryParam;
  for (var f = 0; f < 4; f++) {
    var o;
    try {
      o = this.recoverPubKey(e, t, f);
    } catch {
      continue;
    }
    if (o.eq(r))
      return f;
  }
  throw new Error("Unable to find valid recovery factor");
};
var du = ti(function(e, t) {
  var r = t;
  r.version = "6.5.4", r.utils = Nr, r.rand = /*RicMoo:ethers:require(brorand)*/
  function() {
    throw new Error("unsupported");
  }, r.curve = Mi, r.curves = _i, r.ec = cu, r.eddsa = /*RicMoo:ethers:require(./elliptic/eddsa)*/
  null;
}), pu = du.ec;
const vu = "signing-key/5.7.0", Mn = new U(vu);
let on = null;
function jr() {
  return on || (on = new pu("secp256k1")), on;
}
class gu {
  constructor(t) {
    Yt(this, "curve", "secp256k1"), Yt(this, "privateKey", Tt(t)), Oe(this.privateKey) !== 32 && Mn.throwArgumentError("invalid private key", "privateKey", "[[ REDACTED ]]");
    const r = jr().keyFromPrivate(Ut(this.privateKey));
    Yt(this, "publicKey", "0x" + r.getPublic(!1, "hex")), Yt(this, "compressedPublicKey", "0x" + r.getPublic(!0, "hex")), Yt(this, "_isSigningKey", !0);
  }
  _addPoint(t) {
    const r = jr().keyFromPublic(Ut(this.publicKey)), i = jr().keyFromPublic(Ut(t));
    return "0x" + r.pub.add(i.pub).encodeCompressed("hex");
  }
  signDigest(t) {
    const r = jr().keyFromPrivate(Ut(this.privateKey)), i = Ut(t);
    i.length !== 32 && Mn.throwArgumentError("bad digest length", "digest", t);
    const f = r.sign(i, { canonical: !0 });
    return Fi({
      recoveryParam: f.recoveryParam,
      r: er("0x" + f.r.toString(16), 32),
      s: er("0x" + f.s.toString(16), 32)
    });
  }
  computeSharedSecret(t) {
    const r = jr().keyFromPrivate(Ut(this.privateKey)), i = jr().keyFromPublic(Ut(ks(t)));
    return er("0x" + r.derive(i.getPublic()).toString(16), 32);
  }
  static isSigningKey(t) {
    return !!(t && t._isSigningKey);
  }
}
function mu(e, t) {
  const r = Fi(t), i = { r: Ut(r.r), s: Ut(r.s) };
  return "0x" + jr().recoverPubKey(Ut(e), i, r.recoveryParam).encode("hex", !1);
}
function ks(e, t) {
  const r = Ut(e);
  if (r.length === 32) {
    const i = new gu(r);
    return t ? "0x" + jr().keyFromPrivate(r).getPublic(!0, "hex") : i.publicKey;
  } else {
    if (r.length === 33)
      return t ? Tt(r) : "0x" + jr().keyFromPublic(r).getPublic(!1, "hex");
    if (r.length === 65)
      return t ? "0x" + jr().keyFromPublic(r).getPublic(!0, "hex") : Tt(r);
  }
  return Mn.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
}
const wu = "transactions/5.7.0", ce = new U(wu);
var mo;
(function(e) {
  e[e.legacy = 0] = "legacy", e[e.eip2930 = 1] = "eip2930", e[e.eip1559 = 2] = "eip1559";
})(mo || (mo = {}));
function Dn(e) {
  return e === "0x" ? null : Kr(e);
}
function ar(e) {
  return e === "0x" ? qf : ct.from(e);
}
function yu(e) {
  const t = ks(e);
  return Kr(lr(sr(lr(t, 1)), 12));
}
function Rs(e, t) {
  return yu(mu(Ut(e), t));
}
function _r(e, t) {
  const r = Qe(ct.from(e).toHexString());
  return r.length > 32 && ce.throwArgumentError("invalid length for " + t, "transaction:" + t, e), r;
}
function sn(e, t) {
  return {
    address: Kr(e),
    storageKeys: (t || []).map((r, i) => (Oe(r) !== 32 && ce.throwArgumentError("invalid access list storageKey", `accessList[${e}:${i}]`, r), r.toLowerCase()))
  };
}
function gi(e) {
  if (Array.isArray(e))
    return e.map((r, i) => Array.isArray(r) ? (r.length > 2 && ce.throwArgumentError("access list expected to be [ address, storageKeys[] ]", `value[${i}]`, r), sn(r[0], r[1])) : sn(r.address, r.storageKeys));
  const t = Object.keys(e).map((r) => {
    const i = e[r].reduce((f, o) => (f[o] = !0, f), {});
    return sn(r, Object.keys(i).sort());
  });
  return t.sort((r, i) => r.address.localeCompare(i.address)), t;
}
function Ps(e) {
  return gi(e).map((t) => [t.address, t.storageKeys]);
}
function xu(e, t) {
  if (e.gasPrice != null) {
    const i = ct.from(e.gasPrice), f = ct.from(e.maxFeePerGas || 0);
    i.eq(f) || ce.throwArgumentError("mismatch EIP-1559 gasPrice != maxFeePerGas", "tx", {
      gasPrice: i,
      maxFeePerGas: f
    });
  }
  const r = [
    _r(e.chainId || 0, "chainId"),
    _r(e.nonce || 0, "nonce"),
    _r(e.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    _r(e.maxFeePerGas || 0, "maxFeePerGas"),
    _r(e.gasLimit || 0, "gasLimit"),
    e.to != null ? Kr(e.to) : "0x",
    _r(e.value || 0, "value"),
    e.data || "0x",
    Ps(e.accessList || [])
  ];
  if (t) {
    const i = Fi(t);
    r.push(_r(i.recoveryParam, "recoveryParam")), r.push(Qe(i.r)), r.push(Qe(i.s));
  }
  return Er(["0x02", Ui(r)]);
}
function Au(e, t) {
  const r = [
    _r(e.chainId || 0, "chainId"),
    _r(e.nonce || 0, "nonce"),
    _r(e.gasPrice || 0, "gasPrice"),
    _r(e.gasLimit || 0, "gasLimit"),
    e.to != null ? Kr(e.to) : "0x",
    _r(e.value || 0, "value"),
    e.data || "0x",
    Ps(e.accessList || [])
  ];
  if (t) {
    const i = Fi(t);
    r.push(_r(i.recoveryParam, "recoveryParam")), r.push(Qe(i.r)), r.push(Qe(i.s));
  }
  return Er(["0x01", Ui(r)]);
}
function Bs(e, t, r) {
  try {
    const i = ar(t[0]).toNumber();
    if (i !== 0 && i !== 1)
      throw new Error("bad recid");
    e.v = i;
  } catch {
    ce.throwArgumentError("invalid v for transaction type: 1", "v", t[0]);
  }
  e.r = er(t[1], 32), e.s = er(t[2], 32);
  try {
    const i = sr(r(e));
    e.from = Rs(i, { r: e.r, s: e.s, recoveryParam: e.v });
  } catch {
  }
}
function bu(e) {
  const t = Bn(e.slice(1));
  t.length !== 9 && t.length !== 12 && ce.throwArgumentError("invalid component count for transaction type: 2", "payload", Tt(e));
  const r = ar(t[2]), i = ar(t[3]), f = {
    type: 2,
    chainId: ar(t[0]).toNumber(),
    nonce: ar(t[1]).toNumber(),
    maxPriorityFeePerGas: r,
    maxFeePerGas: i,
    gasPrice: null,
    gasLimit: ar(t[4]),
    to: Dn(t[5]),
    value: ar(t[6]),
    data: t[7],
    accessList: gi(t[8])
  };
  return t.length === 9 || (f.hash = sr(e), Bs(f, t.slice(9), xu)), f;
}
function Mu(e) {
  const t = Bn(e.slice(1));
  t.length !== 8 && t.length !== 11 && ce.throwArgumentError("invalid component count for transaction type: 1", "payload", Tt(e));
  const r = {
    type: 1,
    chainId: ar(t[0]).toNumber(),
    nonce: ar(t[1]).toNumber(),
    gasPrice: ar(t[2]),
    gasLimit: ar(t[3]),
    to: Dn(t[4]),
    value: ar(t[5]),
    data: t[6],
    accessList: gi(t[7])
  };
  return t.length === 8 || (r.hash = sr(e), Bs(r, t.slice(8), Au)), r;
}
function _u(e) {
  const t = Bn(e);
  t.length !== 9 && t.length !== 6 && ce.throwArgumentError("invalid raw transaction", "rawTransaction", e);
  const r = {
    nonce: ar(t[0]).toNumber(),
    gasPrice: ar(t[1]),
    gasLimit: ar(t[2]),
    to: Dn(t[3]),
    value: ar(t[4]),
    data: t[5],
    chainId: 0
  };
  if (t.length === 6)
    return r;
  try {
    r.v = ct.from(t[6]).toNumber();
  } catch {
    return r;
  }
  if (r.r = er(t[7], 32), r.s = er(t[8], 32), ct.from(r.r).isZero() && ct.from(r.s).isZero())
    r.chainId = r.v, r.v = 0;
  else {
    r.chainId = Math.floor((r.v - 35) / 2), r.chainId < 0 && (r.chainId = 0);
    let i = r.v - 27;
    const f = t.slice(0, 6);
    r.chainId !== 0 && (f.push(Tt(r.chainId)), f.push("0x"), f.push("0x"), i -= r.chainId * 2 + 8);
    const o = sr(Ui(f));
    try {
      r.from = Rs(o, { r: Tt(r.r), s: Tt(r.s), recoveryParam: i });
    } catch {
    }
    r.hash = sr(e);
  }
  return r.type = null, r;
}
function Eu(e) {
  const t = Ut(e);
  if (t[0] > 127)
    return _u(t);
  switch (t[0]) {
    case 1:
      return Mu(t);
    case 2:
      return bu(t);
  }
  return ce.throwError(`unsupported transaction type: ${t[0]}`, U.errors.UNSUPPORTED_OPERATION, {
    operation: "parseTransaction",
    transactionType: t[0]
  });
}
class Cs {
  constructor(t) {
    Yt(this, "alphabet", t), Yt(this, "base", t.length), Yt(this, "_alphabetMap", {}), Yt(this, "_leader", t.charAt(0));
    for (let r = 0; r < t.length; r++)
      this._alphabetMap[t.charAt(r)] = r;
  }
  encode(t) {
    let r = Ut(t);
    if (r.length === 0)
      return "";
    let i = [0];
    for (let o = 0; o < r.length; ++o) {
      let u = r[o];
      for (let l = 0; l < i.length; ++l)
        u += i[l] << 8, i[l] = u % this.base, u = u / this.base | 0;
      for (; u > 0; )
        i.push(u % this.base), u = u / this.base | 0;
    }
    let f = "";
    for (let o = 0; r[o] === 0 && o < r.length - 1; ++o)
      f += this._leader;
    for (let o = i.length - 1; o >= 0; --o)
      f += this.alphabet[i[o]];
    return f;
  }
  decode(t) {
    if (typeof t != "string")
      throw new TypeError("Expected String");
    let r = [];
    if (t.length === 0)
      return new Uint8Array(r);
    r.push(0);
    for (let i = 0; i < t.length; i++) {
      let f = this._alphabetMap[t[i]];
      if (f === void 0)
        throw new Error("Non-base" + this.base + " character");
      let o = f;
      for (let u = 0; u < r.length; ++u)
        o += r[u] * this.base, r[u] = o & 255, o >>= 8;
      for (; o > 0; )
        r.push(o & 255), o >>= 8;
    }
    for (let i = 0; t[i] === this._leader && i < t.length - 1; ++i)
      r.push(0);
    return Ut(new Uint8Array(r.reverse()));
  }
}
new Cs("abcdefghijklmnopqrstuvwxyz234567");
const _n = new Cs("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
function wo(e) {
  return "0x" + zr.sha256().update(Ut(e)).digest("hex");
}
const Nu = "networks/5.7.1", yo = new U(Nu);
function Iu(e) {
  return e && typeof e.renetwork == "function";
}
function se(e) {
  const t = function(r, i) {
    i == null && (i = {});
    const f = [];
    if (r.InfuraProvider && i.infura !== "-")
      try {
        f.push(new r.InfuraProvider(e, i.infura));
      } catch {
      }
    if (r.EtherscanProvider && i.etherscan !== "-")
      try {
        f.push(new r.EtherscanProvider(e, i.etherscan));
      } catch {
      }
    if (r.AlchemyProvider && i.alchemy !== "-")
      try {
        f.push(new r.AlchemyProvider(e, i.alchemy));
      } catch {
      }
    if (r.PocketProvider && i.pocket !== "-") {
      const o = ["goerli", "ropsten", "rinkeby", "sepolia"];
      try {
        const u = new r.PocketProvider(e, i.pocket);
        u.network && o.indexOf(u.network.name) === -1 && f.push(u);
      } catch {
      }
    }
    if (r.CloudflareProvider && i.cloudflare !== "-")
      try {
        f.push(new r.CloudflareProvider(e));
      } catch {
      }
    if (r.AnkrProvider && i.ankr !== "-")
      try {
        const o = ["ropsten"], u = new r.AnkrProvider(e, i.ankr);
        u.network && o.indexOf(u.network.name) === -1 && f.push(u);
      } catch {
      }
    if (f.length === 0)
      return null;
    if (r.FallbackProvider) {
      let o = 1;
      return i.quorum != null ? o = i.quorum : e === "homestead" && (o = 2), new r.FallbackProvider(f, o);
    }
    return f[0];
  };
  return t.renetwork = function(r) {
    return se(r);
  }, t;
}
function Pi(e, t) {
  const r = function(i, f) {
    return i.JsonRpcProvider ? new i.JsonRpcProvider(e, t) : null;
  };
  return r.renetwork = function(i) {
    return Pi(e, i);
  }, r;
}
const xo = {
  chainId: 1,
  ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  name: "homestead",
  _defaultProvider: se("homestead")
}, Ao = {
  chainId: 3,
  ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  name: "ropsten",
  _defaultProvider: se("ropsten")
}, bo = {
  chainId: 63,
  name: "classicMordor",
  _defaultProvider: Pi("https://www.ethercluster.com/mordor", "classicMordor")
}, wi = {
  unspecified: { chainId: 0, name: "unspecified" },
  homestead: xo,
  mainnet: xo,
  morden: { chainId: 2, name: "morden" },
  ropsten: Ao,
  testnet: Ao,
  rinkeby: {
    chainId: 4,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "rinkeby",
    _defaultProvider: se("rinkeby")
  },
  kovan: {
    chainId: 42,
    name: "kovan",
    _defaultProvider: se("kovan")
  },
  goerli: {
    chainId: 5,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "goerli",
    _defaultProvider: se("goerli")
  },
  kintsugi: { chainId: 1337702, name: "kintsugi" },
  sepolia: {
    chainId: 11155111,
    name: "sepolia",
    _defaultProvider: se("sepolia")
  },
  // ETC (See: #351)
  classic: {
    chainId: 61,
    name: "classic",
    _defaultProvider: Pi("https://www.ethercluster.com/etc", "classic")
  },
  classicMorden: { chainId: 62, name: "classicMorden" },
  classicMordor: bo,
  classicTestnet: bo,
  classicKotti: {
    chainId: 6,
    name: "classicKotti",
    _defaultProvider: Pi("https://www.ethercluster.com/kotti", "classicKotti")
  },
  xdai: { chainId: 100, name: "xdai" },
  matic: {
    chainId: 137,
    name: "matic",
    _defaultProvider: se("matic")
  },
  maticmum: { chainId: 80001, name: "maticmum" },
  optimism: {
    chainId: 10,
    name: "optimism",
    _defaultProvider: se("optimism")
  },
  "optimism-kovan": { chainId: 69, name: "optimism-kovan" },
  "optimism-goerli": { chainId: 420, name: "optimism-goerli" },
  arbitrum: { chainId: 42161, name: "arbitrum" },
  "arbitrum-rinkeby": { chainId: 421611, name: "arbitrum-rinkeby" },
  "arbitrum-goerli": { chainId: 421613, name: "arbitrum-goerli" },
  bnb: { chainId: 56, name: "bnb" },
  bnbt: { chainId: 97, name: "bnbt" }
};
function Su(e) {
  if (e == null)
    return null;
  if (typeof e == "number") {
    for (const i in wi) {
      const f = wi[i];
      if (f.chainId === e)
        return {
          name: f.name,
          chainId: f.chainId,
          ensAddress: f.ensAddress || null,
          _defaultProvider: f._defaultProvider || null
        };
    }
    return {
      chainId: e,
      name: "unknown"
    };
  }
  if (typeof e == "string") {
    const i = wi[e];
    return i == null ? null : {
      name: i.name,
      chainId: i.chainId,
      ensAddress: i.ensAddress,
      _defaultProvider: i._defaultProvider || null
    };
  }
  const t = wi[e.name];
  if (!t)
    return typeof e.chainId != "number" && yo.throwArgumentError("invalid network chainId", "network", e), e;
  e.chainId !== 0 && e.chainId !== t.chainId && yo.throwArgumentError("network chainId mismatch", "network", e);
  let r = e._defaultProvider || null;
  return r == null && t._defaultProvider && (Iu(t._defaultProvider) ? r = t._defaultProvider.renetwork(e) : r = t._defaultProvider), {
    name: e.name,
    chainId: t.chainId,
    ensAddress: e.ensAddress || t.ensAddress || null,
    _defaultProvider: r
  };
}
const ku = "web/5.7.1";
var Ru = globalThis && globalThis.__awaiter || function(e, t, r, i) {
  function f(o) {
    return o instanceof r ? o : new r(function(u) {
      u(o);
    });
  }
  return new (r || (r = Promise))(function(o, u) {
    function l(_) {
      try {
        b(i.next(_));
      } catch (I) {
        u(I);
      }
    }
    function x(_) {
      try {
        b(i.throw(_));
      } catch (I) {
        u(I);
      }
    }
    function b(_) {
      _.done ? o(_.value) : f(_.value).then(l, x);
    }
    b((i = i.apply(e, t || [])).next());
  });
};
function Pu(e, t) {
  return Ru(this, void 0, void 0, function* () {
    t == null && (t = {});
    const r = {
      method: t.method || "GET",
      headers: t.headers || {},
      body: t.body || void 0
    };
    if (t.skipFetchSetup !== !0 && (r.mode = "cors", r.cache = "no-cache", r.credentials = "same-origin", r.redirect = "follow", r.referrer = "client"), t.fetchOptions != null) {
      const u = t.fetchOptions;
      u.mode && (r.mode = u.mode), u.cache && (r.cache = u.cache), u.credentials && (r.credentials = u.credentials), u.redirect && (r.redirect = u.redirect), u.referrer && (r.referrer = u.referrer);
    }
    const i = yield fetch(e, r), f = yield i.arrayBuffer(), o = {};
    return i.headers.forEach ? i.headers.forEach((u, l) => {
      o[l.toLowerCase()] = u;
    }) : i.headers.keys().forEach((u) => {
      o[u.toLowerCase()] = i.headers.get(u);
    }), {
      headers: o,
      statusCode: i.status,
      statusMessage: i.statusText,
      body: Ut(new Uint8Array(f))
    };
  });
}
var Bu = globalThis && globalThis.__awaiter || function(e, t, r, i) {
  function f(o) {
    return o instanceof r ? o : new r(function(u) {
      u(o);
    });
  }
  return new (r || (r = Promise))(function(o, u) {
    function l(_) {
      try {
        b(i.next(_));
      } catch (I) {
        u(I);
      }
    }
    function x(_) {
      try {
        b(i.throw(_));
      } catch (I) {
        u(I);
      }
    }
    function b(_) {
      _.done ? o(_.value) : f(_.value).then(l, x);
    }
    b((i = i.apply(e, t || [])).next());
  });
};
const qr = new U(ku);
function Mo(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
function pe(e, t) {
  if (e == null)
    return null;
  if (typeof e == "string")
    return e;
  if (Rn(e)) {
    if (t && (t.split("/")[0] === "text" || t.split(";")[0].trim() === "application/json"))
      try {
        return Li(e);
      } catch {
      }
    return Tt(e);
  }
  return e;
}
function Cu(e) {
  return ae(e.replace(/%([0-9a-f][0-9a-f])/gi, (t, r) => String.fromCharCode(parseInt(r, 16))));
}
function Tu(e, t, r) {
  const i = typeof e == "object" && e.throttleLimit != null ? e.throttleLimit : 12;
  qr.assertArgument(i > 0 && i % 1 === 0, "invalid connection throttle limit", "connection.throttleLimit", i);
  const f = typeof e == "object" ? e.throttleCallback : null, o = typeof e == "object" && typeof e.throttleSlotInterval == "number" ? e.throttleSlotInterval : 100;
  qr.assertArgument(o > 0 && o % 1 === 0, "invalid connection throttle slot interval", "connection.throttleSlotInterval", o);
  const u = typeof e == "object" ? !!e.errorPassThrough : !1, l = {};
  let x = null;
  const b = {
    method: "GET"
  };
  let _ = !1, I = 2 * 60 * 1e3;
  if (typeof e == "string")
    x = e;
  else if (typeof e == "object") {
    if ((e == null || e.url == null) && qr.throwArgumentError("missing URL", "connection.url", e), x = e.url, typeof e.timeout == "number" && e.timeout > 0 && (I = e.timeout), e.headers)
      for (const G in e.headers)
        l[G.toLowerCase()] = { key: G, value: String(e.headers[G]) }, ["if-none-match", "if-modified-since"].indexOf(G.toLowerCase()) >= 0 && (_ = !0);
    if (b.allowGzip = !!e.allowGzip, e.user != null && e.password != null) {
      x.substring(0, 6) !== "https:" && e.allowInsecureAuthentication !== !0 && qr.throwError("basic authentication requires a secure https url", U.errors.INVALID_ARGUMENT, { argument: "url", url: x, user: e.user, password: "[REDACTED]" });
      const G = e.user + ":" + e.password;
      l.authorization = {
        key: "Authorization",
        value: "Basic " + Zo(ae(G))
      };
    }
    e.skipFetchSetup != null && (b.skipFetchSetup = !!e.skipFetchSetup), e.fetchOptions != null && (b.fetchOptions = pr(e.fetchOptions));
  }
  const P = new RegExp("^data:([^;:]*)?(;base64)?,(.*)$", "i"), B = x ? x.match(P) : null;
  if (B)
    try {
      const G = {
        statusCode: 200,
        statusMessage: "OK",
        headers: { "content-type": B[1] || "text/plain" },
        body: B[2] ? Xo(B[3]) : Cu(B[3])
      };
      let $ = G.body;
      return r && ($ = r(G.body, G)), Promise.resolve($);
    } catch (G) {
      qr.throwError("processing response error", U.errors.SERVER_ERROR, {
        body: pe(B[1], B[2]),
        error: G,
        requestBody: null,
        requestMethod: "GET",
        url: x
      });
    }
  t && (b.method = "POST", b.body = t, l["content-type"] == null && (l["content-type"] = { key: "Content-Type", value: "application/octet-stream" }), l["content-length"] == null && (l["content-length"] = { key: "Content-Length", value: String(t.length) }));
  const O = {};
  Object.keys(l).forEach((G) => {
    const $ = l[G];
    O[$.key] = $.value;
  }), b.headers = O;
  const q = function() {
    let G = null;
    return { promise: new Promise(function(gt, st) {
      I && (G = setTimeout(() => {
        G != null && (G = null, st(qr.makeError("timeout", U.errors.TIMEOUT, {
          requestBody: pe(b.body, O["content-type"]),
          requestMethod: b.method,
          timeout: I,
          url: x
        })));
      }, I));
    }), cancel: function() {
      G != null && (clearTimeout(G), G = null);
    } };
  }(), ot = function() {
    return Bu(this, void 0, void 0, function* () {
      for (let G = 0; G < i; G++) {
        let $ = null;
        try {
          if ($ = yield Pu(x, b), G < i) {
            if ($.statusCode === 301 || $.statusCode === 302) {
              const gt = $.headers.location || "";
              if (b.method === "GET" && gt.match(/^https:/)) {
                x = $.headers.location;
                continue;
              }
            } else if ($.statusCode === 429) {
              let gt = !0;
              if (f && (gt = yield f(G, x)), gt) {
                let st = 0;
                const lt = $.headers["retry-after"];
                typeof lt == "string" && lt.match(/^[1-9][0-9]*$/) ? st = parseInt(lt) * 1e3 : st = o * parseInt(String(Math.random() * Math.pow(2, G))), yield Mo(st);
                continue;
              }
            }
          }
        } catch (gt) {
          $ = gt.response, $ == null && (q.cancel(), qr.throwError("missing response", U.errors.SERVER_ERROR, {
            requestBody: pe(b.body, O["content-type"]),
            requestMethod: b.method,
            serverError: gt,
            url: x
          }));
        }
        let tt = $.body;
        if (_ && $.statusCode === 304 ? tt = null : !u && ($.statusCode < 200 || $.statusCode >= 300) && (q.cancel(), qr.throwError("bad response", U.errors.SERVER_ERROR, {
          status: $.statusCode,
          headers: $.headers,
          body: pe(tt, $.headers ? $.headers["content-type"] : null),
          requestBody: pe(b.body, O["content-type"]),
          requestMethod: b.method,
          url: x
        })), r)
          try {
            const gt = yield r(tt, $);
            return q.cancel(), gt;
          } catch (gt) {
            if (gt.throttleRetry && G < i) {
              let st = !0;
              if (f && (st = yield f(G, x)), st) {
                const lt = o * parseInt(String(Math.random() * Math.pow(2, G)));
                yield Mo(lt);
                continue;
              }
            }
            q.cancel(), qr.throwError("processing response error", U.errors.SERVER_ERROR, {
              body: pe(tt, $.headers ? $.headers["content-type"] : null),
              error: gt,
              requestBody: pe(b.body, O["content-type"]),
              requestMethod: b.method,
              url: x
            });
          }
        return q.cancel(), tt;
      }
      return qr.throwError("failed response", U.errors.SERVER_ERROR, {
        requestBody: pe(b.body, O["content-type"]),
        requestMethod: b.method,
        url: x
      });
    });
  }();
  return Promise.race([q.promise, ot]);
}
function qn(e, t, r) {
  let i = (o, u) => {
    let l = null;
    if (o != null)
      try {
        l = JSON.parse(Li(o));
      } catch (x) {
        qr.throwError("invalid JSON", U.errors.SERVER_ERROR, {
          body: o,
          error: x
        });
      }
    return r && (l = r(l, u)), l;
  }, f = null;
  if (t != null) {
    f = ae(t);
    const o = typeof e == "string" ? { url: e } : pr(e);
    o.headers ? Object.keys(o.headers).filter((l) => l.toLowerCase() === "content-type").length !== 0 || (o.headers = pr(o.headers), o.headers["content-type"] = "application/json") : o.headers = { "content-type": "application/json" }, e = o;
  }
  return Tu(e, f, i);
}
function ai(e, t) {
  return t || (t = {}), t = pr(t), t.floor == null && (t.floor = 0), t.ceiling == null && (t.ceiling = 1e4), t.interval == null && (t.interval = 250), new Promise(function(r, i) {
    let f = null, o = !1;
    const u = () => o ? !1 : (o = !0, f && clearTimeout(f), !0);
    t.timeout && (f = setTimeout(() => {
      u() && i(new Error("timeout"));
    }, t.timeout));
    const l = t.retryLimit;
    let x = 0;
    function b() {
      return e().then(function(_) {
        if (_ !== void 0)
          u() && r(_);
        else if (t.oncePoll)
          t.oncePoll.once("poll", b);
        else if (t.onceBlock)
          t.onceBlock.once("block", b);
        else if (!o) {
          if (x++, x > l) {
            u() && i(new Error("retry limit reached"));
            return;
          }
          let I = t.interval * parseInt(String(Math.random() * Math.pow(2, x)));
          I < t.floor && (I = t.floor), I > t.ceiling && (I = t.ceiling), setTimeout(b, I);
        }
        return null;
      }, function(_) {
        u() && i(_);
      });
    }
    b();
  });
}
var Bi = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", En = {};
for (var yi = 0; yi < Bi.length; yi++) {
  var fn = Bi.charAt(yi);
  if (En[fn] !== void 0)
    throw new TypeError(fn + " is ambiguous");
  En[fn] = yi;
}
function Ye(e) {
  var t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function Ts(e) {
  for (var t = 1, r = 0; r < e.length; ++r) {
    var i = e.charCodeAt(r);
    if (i < 33 || i > 126)
      return "Invalid prefix (" + e + ")";
    t = Ye(t) ^ i >> 5;
  }
  for (t = Ye(t), r = 0; r < e.length; ++r) {
    var f = e.charCodeAt(r);
    t = Ye(t) ^ f & 31;
  }
  return t;
}
function Ou(e, t, r) {
  if (r = r || 90, e.length + 7 + t.length > r)
    throw new TypeError("Exceeds length limit");
  e = e.toLowerCase();
  var i = Ts(e);
  if (typeof i == "string")
    throw new Error(i);
  for (var f = e + "1", o = 0; o < t.length; ++o) {
    var u = t[o];
    if (u >> 5)
      throw new Error("Non 5-bit word");
    i = Ye(i) ^ u, f += Bi.charAt(u);
  }
  for (o = 0; o < 6; ++o)
    i = Ye(i);
  for (i ^= 1, o = 0; o < 6; ++o) {
    var l = i >> (5 - o) * 5 & 31;
    f += Bi.charAt(l);
  }
  return f;
}
function Os(e, t) {
  if (t = t || 90, e.length < 8)
    return e + " too short";
  if (e.length > t)
    return "Exceeds length limit";
  var r = e.toLowerCase(), i = e.toUpperCase();
  if (e !== r && e !== i)
    return "Mixed-case string " + e;
  e = r;
  var f = e.lastIndexOf("1");
  if (f === -1)
    return "No separator character for " + e;
  if (f === 0)
    return "Missing prefix for " + e;
  var o = e.slice(0, f), u = e.slice(f + 1);
  if (u.length < 6)
    return "Data too short";
  var l = Ts(o);
  if (typeof l == "string")
    return l;
  for (var x = [], b = 0; b < u.length; ++b) {
    var _ = u.charAt(b), I = En[_];
    if (I === void 0)
      return "Unknown character " + _;
    l = Ye(l) ^ I, !(b + 6 >= u.length) && x.push(I);
  }
  return l !== 1 ? "Invalid checksum for " + e : { prefix: o, words: x };
}
function Fu() {
  var e = Os.apply(null, arguments);
  if (typeof e == "object")
    return e;
}
function Uu(e) {
  var t = Os.apply(null, arguments);
  if (typeof t == "object")
    return t;
  throw new Error(t);
}
function Hi(e, t, r, i) {
  for (var f = 0, o = 0, u = (1 << r) - 1, l = [], x = 0; x < e.length; ++x)
    for (f = f << t | e[x], o += t; o >= r; )
      o -= r, l.push(f >> o & u);
  if (i)
    o > 0 && l.push(f << r - o & u);
  else {
    if (o >= t)
      return "Excess padding";
    if (f << r - o & u)
      return "Non-zero padding";
  }
  return l;
}
function Lu(e) {
  var t = Hi(e, 8, 5, !0);
  if (Array.isArray(t))
    return t;
}
function Du(e) {
  var t = Hi(e, 8, 5, !0);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function qu(e) {
  var t = Hi(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function Gu(e) {
  var t = Hi(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
var _o = {
  decodeUnsafe: Fu,
  decode: Uu,
  encode: Ou,
  toWordsUnsafe: Lu,
  toWords: Du,
  fromWordsUnsafe: qu,
  fromWords: Gu
};
const Ki = "providers/5.7.2", ii = new U(Ki);
class ht {
  constructor() {
    this.formats = this.getDefaultFormats();
  }
  getDefaultFormats() {
    const t = {}, r = this.address.bind(this), i = this.bigNumber.bind(this), f = this.blockTag.bind(this), o = this.data.bind(this), u = this.hash.bind(this), l = this.hex.bind(this), x = this.number.bind(this), b = this.type.bind(this), _ = (I) => this.data(I, !0);
    return t.transaction = {
      hash: u,
      type: b,
      accessList: ht.allowNull(this.accessList.bind(this), null),
      blockHash: ht.allowNull(u, null),
      blockNumber: ht.allowNull(x, null),
      transactionIndex: ht.allowNull(x, null),
      confirmations: ht.allowNull(x, null),
      from: r,
      // either (gasPrice) or (maxPriorityFeePerGas + maxFeePerGas)
      // must be set
      gasPrice: ht.allowNull(i),
      maxPriorityFeePerGas: ht.allowNull(i),
      maxFeePerGas: ht.allowNull(i),
      gasLimit: i,
      to: ht.allowNull(r, null),
      value: i,
      nonce: x,
      data: o,
      r: ht.allowNull(this.uint256),
      s: ht.allowNull(this.uint256),
      v: ht.allowNull(x),
      creates: ht.allowNull(r, null),
      raw: ht.allowNull(o)
    }, t.transactionRequest = {
      from: ht.allowNull(r),
      nonce: ht.allowNull(x),
      gasLimit: ht.allowNull(i),
      gasPrice: ht.allowNull(i),
      maxPriorityFeePerGas: ht.allowNull(i),
      maxFeePerGas: ht.allowNull(i),
      to: ht.allowNull(r),
      value: ht.allowNull(i),
      data: ht.allowNull(_),
      type: ht.allowNull(x),
      accessList: ht.allowNull(this.accessList.bind(this), null)
    }, t.receiptLog = {
      transactionIndex: x,
      blockNumber: x,
      transactionHash: u,
      address: r,
      topics: ht.arrayOf(u),
      data: o,
      logIndex: x,
      blockHash: u
    }, t.receipt = {
      to: ht.allowNull(this.address, null),
      from: ht.allowNull(this.address, null),
      contractAddress: ht.allowNull(r, null),
      transactionIndex: x,
      // should be allowNull(hash), but broken-EIP-658 support is handled in receipt
      root: ht.allowNull(l),
      gasUsed: i,
      logsBloom: ht.allowNull(o),
      blockHash: u,
      transactionHash: u,
      logs: ht.arrayOf(this.receiptLog.bind(this)),
      blockNumber: x,
      confirmations: ht.allowNull(x, null),
      cumulativeGasUsed: i,
      effectiveGasPrice: ht.allowNull(i),
      status: ht.allowNull(x),
      type: b
    }, t.block = {
      hash: ht.allowNull(u),
      parentHash: u,
      number: x,
      timestamp: x,
      nonce: ht.allowNull(l),
      difficulty: this.difficulty.bind(this),
      gasLimit: i,
      gasUsed: i,
      miner: ht.allowNull(r),
      extraData: o,
      transactions: ht.allowNull(ht.arrayOf(u)),
      baseFeePerGas: ht.allowNull(i)
    }, t.blockWithTransactions = pr(t.block), t.blockWithTransactions.transactions = ht.allowNull(ht.arrayOf(this.transactionResponse.bind(this))), t.filter = {
      fromBlock: ht.allowNull(f, void 0),
      toBlock: ht.allowNull(f, void 0),
      blockHash: ht.allowNull(u, void 0),
      address: ht.allowNull(r, void 0),
      topics: ht.allowNull(this.topics.bind(this), void 0)
    }, t.filterLog = {
      blockNumber: ht.allowNull(x),
      blockHash: ht.allowNull(u),
      transactionIndex: x,
      removed: ht.allowNull(this.boolean.bind(this)),
      address: r,
      data: ht.allowFalsish(o, "0x"),
      topics: ht.arrayOf(u),
      transactionHash: u,
      logIndex: x
    }, t;
  }
  accessList(t) {
    return gi(t || []);
  }
  // Requires a BigNumberish that is within the IEEE754 safe integer range; returns a number
  // Strict! Used on input.
  number(t) {
    return t === "0x" ? 0 : ct.from(t).toNumber();
  }
  type(t) {
    return t === "0x" || t == null ? 0 : ct.from(t).toNumber();
  }
  // Strict! Used on input.
  bigNumber(t) {
    return ct.from(t);
  }
  // Requires a boolean, "true" or  "false"; returns a boolean
  boolean(t) {
    if (typeof t == "boolean")
      return t;
    if (typeof t == "string") {
      if (t = t.toLowerCase(), t === "true")
        return !0;
      if (t === "false")
        return !1;
    }
    throw new Error("invalid boolean - " + t);
  }
  hex(t, r) {
    return typeof t == "string" && (!r && t.substring(0, 2) !== "0x" && (t = "0x" + t), Vt(t)) ? t.toLowerCase() : ii.throwArgumentError("invalid hash", "value", t);
  }
  data(t, r) {
    const i = this.hex(t, r);
    if (i.length % 2 !== 0)
      throw new Error("invalid data; odd-length - " + t);
    return i;
  }
  // Requires an address
  // Strict! Used on input.
  address(t) {
    return Kr(t);
  }
  callAddress(t) {
    if (!Vt(t, 32))
      return null;
    const r = Kr(lr(t, 12));
    return r === Df ? null : r;
  }
  contractAddress(t) {
    return Lf(t);
  }
  // Strict! Used on input.
  blockTag(t) {
    if (t == null)
      return "latest";
    if (t === "earliest")
      return "0x0";
    switch (t) {
      case "earliest":
        return "0x0";
      case "latest":
      case "pending":
      case "safe":
      case "finalized":
        return t;
    }
    if (typeof t == "number" || Vt(t))
      return Pn(t);
    throw new Error("invalid blockTag");
  }
  // Requires a hash, optionally requires 0x prefix; returns prefixed lowercase hash.
  hash(t, r) {
    const i = this.hex(t, r);
    return Oe(i) !== 32 ? ii.throwArgumentError("invalid hash", "value", t) : i;
  }
  // Returns the difficulty as a number, or if too large (i.e. PoA network) null
  difficulty(t) {
    if (t == null)
      return null;
    const r = ct.from(t);
    try {
      return r.toNumber();
    } catch {
    }
    return null;
  }
  uint256(t) {
    if (!Vt(t))
      throw new Error("invalid uint256");
    return er(t, 32);
  }
  _block(t, r) {
    t.author != null && t.miner == null && (t.miner = t.author);
    const i = t._difficulty != null ? t._difficulty : t.difficulty, f = ht.check(r, t);
    return f._difficulty = i == null ? null : ct.from(i), f;
  }
  block(t) {
    return this._block(t, this.formats.block);
  }
  blockWithTransactions(t) {
    return this._block(t, this.formats.blockWithTransactions);
  }
  // Strict! Used on input.
  transactionRequest(t) {
    return ht.check(this.formats.transactionRequest, t);
  }
  transactionResponse(t) {
    t.gas != null && t.gasLimit == null && (t.gasLimit = t.gas), t.to && ct.from(t.to).isZero() && (t.to = "0x0000000000000000000000000000000000000000"), t.input != null && t.data == null && (t.data = t.input), t.to == null && t.creates == null && (t.creates = this.contractAddress(t)), (t.type === 1 || t.type === 2) && t.accessList == null && (t.accessList = []);
    const r = ht.check(this.formats.transaction, t);
    if (t.chainId != null) {
      let i = t.chainId;
      Vt(i) && (i = ct.from(i).toNumber()), r.chainId = i;
    } else {
      let i = t.networkId;
      i == null && r.v == null && (i = t.chainId), Vt(i) && (i = ct.from(i).toNumber()), typeof i != "number" && r.v != null && (i = (r.v - 35) / 2, i < 0 && (i = 0), i = parseInt(i)), typeof i != "number" && (i = 0), r.chainId = i;
    }
    return r.blockHash && r.blockHash.replace(/0/g, "") === "x" && (r.blockHash = null), r;
  }
  transaction(t) {
    return Eu(t);
  }
  receiptLog(t) {
    return ht.check(this.formats.receiptLog, t);
  }
  receipt(t) {
    const r = ht.check(this.formats.receipt, t);
    if (r.root != null)
      if (r.root.length <= 4) {
        const i = ct.from(r.root).toNumber();
        i === 0 || i === 1 ? (r.status != null && r.status !== i && ii.throwArgumentError("alt-root-status/status mismatch", "value", { root: r.root, status: r.status }), r.status = i, delete r.root) : ii.throwArgumentError("invalid alt-root-status", "value.root", r.root);
      } else
        r.root.length !== 66 && ii.throwArgumentError("invalid root hash", "value.root", r.root);
    return r.status != null && (r.byzantium = !0), r;
  }
  topics(t) {
    return Array.isArray(t) ? t.map((r) => this.topics(r)) : t != null ? this.hash(t, !0) : null;
  }
  filter(t) {
    return ht.check(this.formats.filter, t);
  }
  filterLog(t) {
    return ht.check(this.formats.filterLog, t);
  }
  static check(t, r) {
    const i = {};
    for (const f in t)
      try {
        const o = t[f](r[f]);
        o !== void 0 && (i[f] = o);
      } catch (o) {
        throw o.checkKey = f, o.checkValue = r[f], o;
      }
    return i;
  }
  // if value is null-ish, nullValue is returned
  static allowNull(t, r) {
    return function(i) {
      return i == null ? r : t(i);
    };
  }
  // If value is false-ish, replaceValue is returned
  static allowFalsish(t, r) {
    return function(i) {
      return i ? t(i) : r;
    };
  }
  // Requires an Array satisfying check
  static arrayOf(t) {
    return function(r) {
      if (!Array.isArray(r))
        throw new Error("not an array");
      const i = [];
      return r.forEach(function(f) {
        i.push(t(f));
      }), i;
    };
  }
}
var Ct = globalThis && globalThis.__awaiter || function(e, t, r, i) {
  function f(o) {
    return o instanceof r ? o : new r(function(u) {
      u(o);
    });
  }
  return new (r || (r = Promise))(function(o, u) {
    function l(_) {
      try {
        b(i.next(_));
      } catch (I) {
        u(I);
      }
    }
    function x(_) {
      try {
        b(i.throw(_));
      } catch (I) {
        u(I);
      }
    }
    function b(_) {
      _.done ? o(_.value) : f(_.value).then(l, x);
    }
    b((i = i.apply(e, t || [])).next());
  });
};
const zt = new U(Ki), zu = 10;
function Eo(e) {
  return e == null ? "null" : (Oe(e) !== 32 && zt.throwArgumentError("invalid topic", "topic", e), e.toLowerCase());
}
function No(e) {
  for (e = e.slice(); e.length > 0 && e[e.length - 1] == null; )
    e.pop();
  return e.map((t) => {
    if (Array.isArray(t)) {
      const r = {};
      t.forEach((f) => {
        r[Eo(f)] = !0;
      });
      const i = Object.keys(r);
      return i.sort(), i.join("|");
    } else
      return Eo(t);
  }).join("&");
}
function Hu(e) {
  return e === "" ? [] : e.split(/&/g).map((t) => {
    if (t === "")
      return [];
    const r = t.split("|").map((i) => i === "null" ? null : i);
    return r.length === 1 ? r[0] : r;
  });
}
function Ge(e) {
  if (typeof e == "string") {
    if (e = e.toLowerCase(), Oe(e) === 32)
      return "tx:" + e;
    if (e.indexOf(":") === -1)
      return e;
  } else {
    if (Array.isArray(e))
      return "filter:*:" + No(e);
    if (Sa.isForkEvent(e))
      throw zt.warn("not implemented"), new Error("not implemented");
    if (e && typeof e == "object")
      return "filter:" + (e.address || "*") + ":" + No(e.topics || []);
  }
  throw new Error("invalid event - " + e);
}
function ni() {
  return (/* @__PURE__ */ new Date()).getTime();
}
function Io(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
const Ku = ["block", "network", "pending", "poll"];
class Ju {
  constructor(t, r, i) {
    Yt(this, "tag", t), Yt(this, "listener", r), Yt(this, "once", i), this._lastBlockNumber = -2, this._inflight = !1;
  }
  get event() {
    switch (this.type) {
      case "tx":
        return this.hash;
      case "filter":
        return this.filter;
    }
    return this.tag;
  }
  get type() {
    return this.tag.split(":")[0];
  }
  get hash() {
    const t = this.tag.split(":");
    return t[0] !== "tx" ? null : t[1];
  }
  get filter() {
    const t = this.tag.split(":");
    if (t[0] !== "filter")
      return null;
    const r = t[1], i = Hu(t[2]), f = {};
    return i.length > 0 && (f.topics = i), r && r !== "*" && (f.address = r), f;
  }
  pollable() {
    return this.tag.indexOf(":") >= 0 || Ku.indexOf(this.tag) >= 0;
  }
}
const Yu = {
  0: { symbol: "btc", p2pkh: 0, p2sh: 5, prefix: "bc" },
  2: { symbol: "ltc", p2pkh: 48, p2sh: 50, prefix: "ltc" },
  3: { symbol: "doge", p2pkh: 30, p2sh: 22 },
  60: { symbol: "eth", ilk: "eth" },
  61: { symbol: "etc", ilk: "eth" },
  700: { symbol: "xdai", ilk: "eth" }
};
function an(e) {
  return er(ct.from(e).toHexString(), 32);
}
function So(e) {
  return _n.encode(Ce([e, lr(wo(wo(e)), 0, 4)]));
}
const Fs = new RegExp("^(ipfs)://(.*)$", "i"), ko = [
  new RegExp("^(https)://(.*)$", "i"),
  new RegExp("^(data):(.*)$", "i"),
  Fs,
  new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i")
];
function Ei(e, t) {
  try {
    return Li(pi(e, t));
  } catch {
  }
  return null;
}
function pi(e, t) {
  if (e === "0x")
    return null;
  const r = ct.from(lr(e, t, t + 32)).toNumber(), i = ct.from(lr(e, r, r + 32)).toNumber();
  return lr(e, r + 32, r + 32 + i);
}
function hn(e) {
  return e.match(/^ipfs:\/\/ipfs\//i) ? e = e.substring(12) : e.match(/^ipfs:\/\//i) ? e = e.substring(7) : zt.throwArgumentError("unsupported IPFS format", "link", e), `https://gateway.ipfs.io/ipfs/${e}`;
}
function Ro(e) {
  const t = Ut(e);
  if (t.length > 32)
    throw new Error("internal; should not happen");
  const r = new Uint8Array(32);
  return r.set(t, 32 - t.length), r;
}
function Qu(e) {
  if (e.length % 32 === 0)
    return e;
  const t = new Uint8Array(Math.ceil(e.length / 32) * 32);
  return t.set(e), t;
}
function Us(e) {
  const t = [];
  let r = 0;
  for (let i = 0; i < e.length; i++)
    t.push(null), r += 32;
  for (let i = 0; i < e.length; i++) {
    const f = Ut(e[i]);
    t[i] = Ro(r), t.push(Ro(f.length)), t.push(Qu(f)), r += 32 + Math.ceil(f.length / 32) * 32;
  }
  return Er(t);
}
class Po {
  // The resolvedAddress is only for creating a ReverseLookup resolver
  constructor(t, r, i, f) {
    Yt(this, "provider", t), Yt(this, "name", i), Yt(this, "address", t.formatter.address(r)), Yt(this, "_resolvedAddress", f);
  }
  supportsWildcard() {
    return this._supportsEip2544 || (this._supportsEip2544 = this.provider.call({
      to: this.address,
      data: "0x01ffc9a79061b92300000000000000000000000000000000000000000000000000000000"
    }).then((t) => ct.from(t).eq(1)).catch((t) => {
      if (t.code === U.errors.CALL_EXCEPTION)
        return !1;
      throw this._supportsEip2544 = null, t;
    })), this._supportsEip2544;
  }
  _fetch(t, r) {
    return Ct(this, void 0, void 0, function* () {
      const i = {
        to: this.address,
        ccipReadEnabled: !0,
        data: Er([t, bi(this.name), r || "0x"])
      };
      let f = !1;
      (yield this.supportsWildcard()) && (f = !0, i.data = Er(["0x9061b923", Us([ma(this.name), i.data])]));
      try {
        let o = yield this.provider.call(i);
        return Ut(o).length % 32 === 4 && zt.throwError("resolver threw error", U.errors.CALL_EXCEPTION, {
          transaction: i,
          data: o
        }), f && (o = pi(o, 0)), o;
      } catch (o) {
        if (o.code === U.errors.CALL_EXCEPTION)
          return null;
        throw o;
      }
    });
  }
  _fetchBytes(t, r) {
    return Ct(this, void 0, void 0, function* () {
      const i = yield this._fetch(t, r);
      return i != null ? pi(i, 0) : null;
    });
  }
  _getAddress(t, r) {
    const i = Yu[String(t)];
    if (i == null && zt.throwError(`unsupported coin type: ${t}`, U.errors.UNSUPPORTED_OPERATION, {
      operation: `getAddress(${t})`
    }), i.ilk === "eth")
      return this.provider.formatter.address(r);
    const f = Ut(r);
    if (i.p2pkh != null) {
      const o = r.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);
      if (o) {
        const u = parseInt(o[1], 16);
        if (o[2].length === u * 2 && u >= 1 && u <= 75)
          return So(Ce([[i.p2pkh], "0x" + o[2]]));
      }
    }
    if (i.p2sh != null) {
      const o = r.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);
      if (o) {
        const u = parseInt(o[1], 16);
        if (o[2].length === u * 2 && u >= 1 && u <= 75)
          return So(Ce([[i.p2sh], "0x" + o[2]]));
      }
    }
    if (i.prefix != null) {
      const o = f[1];
      let u = f[0];
      if (u === 0 ? o !== 20 && o !== 32 && (u = -1) : u = -1, u >= 0 && f.length === 2 + o && o >= 1 && o <= 75) {
        const l = _o.toWords(f.slice(2));
        return l.unshift(u), _o.encode(i.prefix, l);
      }
    }
    return null;
  }
  getAddress(t) {
    return Ct(this, void 0, void 0, function* () {
      if (t == null && (t = 60), t === 60)
        try {
          const f = yield this._fetch("0x3b3b57de");
          return f === "0x" || f === Gf ? null : this.provider.formatter.callAddress(f);
        } catch (f) {
          if (f.code === U.errors.CALL_EXCEPTION)
            return null;
          throw f;
        }
      const r = yield this._fetchBytes("0xf1cb7e06", an(t));
      if (r == null || r === "0x")
        return null;
      const i = this._getAddress(t, r);
      return i == null && zt.throwError("invalid or unsupported coin data", U.errors.UNSUPPORTED_OPERATION, {
        operation: `getAddress(${t})`,
        coinType: t,
        data: r
      }), i;
    });
  }
  getAvatar() {
    return Ct(this, void 0, void 0, function* () {
      const t = [{ type: "name", content: this.name }];
      try {
        const r = yield this.getText("avatar");
        if (r == null)
          return null;
        for (let i = 0; i < ko.length; i++) {
          const f = r.match(ko[i]);
          if (f == null)
            continue;
          const o = f[1].toLowerCase();
          switch (o) {
            case "https":
              return t.push({ type: "url", content: r }), { linkage: t, url: r };
            case "data":
              return t.push({ type: "data", content: r }), { linkage: t, url: r };
            case "ipfs":
              return t.push({ type: "ipfs", content: r }), { linkage: t, url: hn(r) };
            case "erc721":
            case "erc1155": {
              const u = o === "erc721" ? "0xc87b56dd" : "0x0e89341c";
              t.push({ type: o, content: r });
              const l = this._resolvedAddress || (yield this.getAddress()), x = (f[2] || "").split("/");
              if (x.length !== 2)
                return null;
              const b = yield this.provider.formatter.address(x[0]), _ = er(ct.from(x[1]).toHexString(), 32);
              if (o === "erc721") {
                const q = this.provider.formatter.callAddress(yield this.provider.call({
                  to: b,
                  data: Er(["0x6352211e", _])
                }));
                if (l !== q)
                  return null;
                t.push({ type: "owner", content: q });
              } else if (o === "erc1155") {
                const q = ct.from(yield this.provider.call({
                  to: b,
                  data: Er(["0x00fdd58e", er(l, 32), _])
                }));
                if (q.isZero())
                  return null;
                t.push({ type: "balance", content: q.toString() });
              }
              const I = {
                to: this.provider.formatter.address(x[0]),
                data: Er([u, _])
              };
              let P = Ei(yield this.provider.call(I), 0);
              if (P == null)
                return null;
              t.push({ type: "metadata-url-base", content: P }), o === "erc1155" && (P = P.replace("{id}", _.substring(2)), t.push({ type: "metadata-url-expanded", content: P })), P.match(/^ipfs:/i) && (P = hn(P)), t.push({ type: "metadata-url", content: P });
              const B = yield qn(P);
              if (!B)
                return null;
              t.push({ type: "metadata", content: JSON.stringify(B) });
              let O = B.image;
              if (typeof O != "string")
                return null;
              if (!O.match(/^(https:\/\/|data:)/i)) {
                if (O.match(Fs) == null)
                  return null;
                t.push({ type: "url-ipfs", content: O }), O = hn(O);
              }
              return t.push({ type: "url", content: O }), { linkage: t, url: O };
            }
          }
        }
      } catch {
      }
      return null;
    });
  }
  getContentHash() {
    return Ct(this, void 0, void 0, function* () {
      const t = yield this._fetchBytes("0xbc1c58d1");
      if (t == null || t === "0x")
        return null;
      const r = t.match(/^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
      if (r) {
        const u = parseInt(r[3], 16);
        if (r[4].length === u * 2)
          return "ipfs://" + _n.encode("0x" + r[1]);
      }
      const i = t.match(/^0xe5010172(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
      if (i) {
        const u = parseInt(i[3], 16);
        if (i[4].length === u * 2)
          return "ipns://" + _n.encode("0x" + i[1]);
      }
      const f = t.match(/^0xe40101fa011b20([0-9a-f]*)$/);
      if (f && f[1].length === 32 * 2)
        return "bzz://" + f[1];
      const o = t.match(/^0x90b2c605([0-9a-f]*)$/);
      if (o && o[1].length === 34 * 2) {
        const u = { "=": "", "+": "-", "/": "_" };
        return "sia://" + Zo("0x" + o[1]).replace(/[=+\/]/g, (x) => u[x]);
      }
      return zt.throwError("invalid or unsupported content hash data", U.errors.UNSUPPORTED_OPERATION, {
        operation: "getContentHash()",
        data: t
      });
    });
  }
  getText(t) {
    return Ct(this, void 0, void 0, function* () {
      let r = ae(t);
      r = Ce([an(64), an(r.length), r]), r.length % 32 !== 0 && (r = Ce([r, er("0x", 32 - t.length % 32)]));
      const i = yield this._fetchBytes("0x59d1d43c", Tt(r));
      return i == null || i === "0x" ? null : Li(i);
    });
  }
}
let un = null, Wu = 1;
class ju extends Tn {
  /**
   *  ready
   *
   *  A Promise<Network> that resolves only once the provider is ready.
   *
   *  Sub-classes that call the super with a network without a chainId
   *  MUST set this. Standard named networks have a known chainId.
   *
   */
  constructor(t) {
    if (super(), this._events = [], this._emitted = { block: -2 }, this.disableCcipRead = !1, this.formatter = new.target.getFormatter(), Yt(this, "anyNetwork", t === "any"), this.anyNetwork && (t = this.detectNetwork()), t instanceof Promise)
      this._networkPromise = t, t.catch((r) => {
      }), this._ready().catch((r) => {
      });
    else {
      const r = fi(new.target, "getNetwork")(t);
      r ? (Yt(this, "_network", r), this.emit("network", r, null)) : zt.throwArgumentError("invalid network", "network", t);
    }
    this._maxInternalBlockNumber = -1024, this._lastBlockNumber = -2, this._maxFilterBlockRange = 10, this._pollingInterval = 4e3, this._fastQueryDate = 0;
  }
  _ready() {
    return Ct(this, void 0, void 0, function* () {
      if (this._network == null) {
        let t = null;
        if (this._networkPromise)
          try {
            t = yield this._networkPromise;
          } catch {
          }
        t == null && (t = yield this.detectNetwork()), t || zt.throwError("no network detected", U.errors.UNKNOWN_ERROR, {}), this._network == null && (this.anyNetwork ? this._network = t : Yt(this, "_network", t), this.emit("network", t, null));
      }
      return this._network;
    });
  }
  // This will always return the most recently established network.
  // For "any", this can change (a "network" event is emitted before
  // any change is reflected); otherwise this cannot change
  get ready() {
    return ai(() => this._ready().then((t) => t, (t) => {
      if (!(t.code === U.errors.NETWORK_ERROR && t.event === "noNetwork"))
        throw t;
    }));
  }
  // @TODO: Remove this and just create a singleton formatter
  static getFormatter() {
    return un == null && (un = new ht()), un;
  }
  // @TODO: Remove this and just use getNetwork
  static getNetwork(t) {
    return Su(t ?? "homestead");
  }
  ccipReadFetch(t, r, i) {
    return Ct(this, void 0, void 0, function* () {
      if (this.disableCcipRead || i.length === 0)
        return null;
      const f = t.to.toLowerCase(), o = r.toLowerCase(), u = [];
      for (let l = 0; l < i.length; l++) {
        const x = i[l], b = x.replace("{sender}", f).replace("{data}", o), _ = x.indexOf("{data}") >= 0 ? null : JSON.stringify({ data: o, sender: f }), I = yield qn({ url: b, errorPassThrough: !0 }, _, (B, O) => (B.status = O.statusCode, B));
        if (I.data)
          return I.data;
        const P = I.message || "unknown error";
        if (I.status >= 400 && I.status < 500)
          return zt.throwError(`response not found during CCIP fetch: ${P}`, U.errors.SERVER_ERROR, { url: x, errorMessage: P });
        u.push(P);
      }
      return zt.throwError(`error encountered during CCIP fetch: ${u.map((l) => JSON.stringify(l)).join(", ")}`, U.errors.SERVER_ERROR, {
        urls: i,
        errorMessages: u
      });
    });
  }
  // Fetches the blockNumber, but will reuse any result that is less
  // than maxAge old or has been requested since the last request
  _getInternalBlockNumber(t) {
    return Ct(this, void 0, void 0, function* () {
      if (yield this._ready(), t > 0)
        for (; this._internalBlockNumber; ) {
          const f = this._internalBlockNumber;
          try {
            const o = yield f;
            if (ni() - o.respTime <= t)
              return o.blockNumber;
            break;
          } catch {
            if (this._internalBlockNumber === f)
              break;
          }
        }
      const r = ni(), i = or({
        blockNumber: this.perform("getBlockNumber", {}),
        networkError: this.getNetwork().then((f) => null, (f) => f)
      }).then(({ blockNumber: f, networkError: o }) => {
        if (o)
          throw this._internalBlockNumber === i && (this._internalBlockNumber = null), o;
        const u = ni();
        return f = ct.from(f).toNumber(), f < this._maxInternalBlockNumber && (f = this._maxInternalBlockNumber), this._maxInternalBlockNumber = f, this._setFastBlockNumber(f), { blockNumber: f, reqTime: r, respTime: u };
      });
      return this._internalBlockNumber = i, i.catch((f) => {
        this._internalBlockNumber === i && (this._internalBlockNumber = null);
      }), (yield i).blockNumber;
    });
  }
  poll() {
    return Ct(this, void 0, void 0, function* () {
      const t = Wu++, r = [];
      let i = null;
      try {
        i = yield this._getInternalBlockNumber(100 + this.pollingInterval / 2);
      } catch (f) {
        this.emit("error", f);
        return;
      }
      if (this._setFastBlockNumber(i), this.emit("poll", t, i), i === this._lastBlockNumber) {
        this.emit("didPoll", t);
        return;
      }
      if (this._emitted.block === -2 && (this._emitted.block = i - 1), Math.abs(this._emitted.block - i) > 1e3)
        zt.warn(`network block skew detected; skipping block events (emitted=${this._emitted.block} blockNumber${i})`), this.emit("error", zt.makeError("network block skew detected", U.errors.NETWORK_ERROR, {
          blockNumber: i,
          event: "blockSkew",
          previousBlockNumber: this._emitted.block
        })), this.emit("block", i);
      else
        for (let f = this._emitted.block + 1; f <= i; f++)
          this.emit("block", f);
      this._emitted.block !== i && (this._emitted.block = i, Object.keys(this._emitted).forEach((f) => {
        if (f === "block")
          return;
        const o = this._emitted[f];
        o !== "pending" && i - o > 12 && delete this._emitted[f];
      })), this._lastBlockNumber === -2 && (this._lastBlockNumber = i - 1), this._events.forEach((f) => {
        switch (f.type) {
          case "tx": {
            const o = f.hash;
            let u = this.getTransactionReceipt(o).then((l) => (!l || l.blockNumber == null || (this._emitted["t:" + o] = l.blockNumber, this.emit(o, l)), null)).catch((l) => {
              this.emit("error", l);
            });
            r.push(u);
            break;
          }
          case "filter": {
            if (!f._inflight) {
              f._inflight = !0, f._lastBlockNumber === -2 && (f._lastBlockNumber = i - 1);
              const o = f.filter;
              o.fromBlock = f._lastBlockNumber + 1, o.toBlock = i;
              const u = o.toBlock - this._maxFilterBlockRange;
              u > o.fromBlock && (o.fromBlock = u), o.fromBlock < 0 && (o.fromBlock = 0);
              const l = this.getLogs(o).then((x) => {
                f._inflight = !1, x.length !== 0 && x.forEach((b) => {
                  b.blockNumber > f._lastBlockNumber && (f._lastBlockNumber = b.blockNumber), this._emitted["b:" + b.blockHash] = b.blockNumber, this._emitted["t:" + b.transactionHash] = b.blockNumber, this.emit(o, b);
                });
              }).catch((x) => {
                this.emit("error", x), f._inflight = !1;
              });
              r.push(l);
            }
            break;
          }
        }
      }), this._lastBlockNumber = i, Promise.all(r).then(() => {
        this.emit("didPoll", t);
      }).catch((f) => {
        this.emit("error", f);
      });
    });
  }
  // Deprecated; do not use this
  resetEventsBlock(t) {
    this._lastBlockNumber = t - 1, this.polling && this.poll();
  }
  get network() {
    return this._network;
  }
  // This method should query the network if the underlying network
  // can change, such as when connected to a JSON-RPC backend
  detectNetwork() {
    return Ct(this, void 0, void 0, function* () {
      return zt.throwError("provider does not support network detection", U.errors.UNSUPPORTED_OPERATION, {
        operation: "provider.detectNetwork"
      });
    });
  }
  getNetwork() {
    return Ct(this, void 0, void 0, function* () {
      const t = yield this._ready(), r = yield this.detectNetwork();
      if (t.chainId !== r.chainId) {
        if (this.anyNetwork)
          return this._network = r, this._lastBlockNumber = -2, this._fastBlockNumber = null, this._fastBlockNumberPromise = null, this._fastQueryDate = 0, this._emitted.block = -2, this._maxInternalBlockNumber = -1024, this._internalBlockNumber = null, this.emit("network", r, t), yield Io(0), this._network;
        const i = zt.makeError("underlying network changed", U.errors.NETWORK_ERROR, {
          event: "changed",
          network: t,
          detectedNetwork: r
        });
        throw this.emit("error", i), i;
      }
      return t;
    });
  }
  get blockNumber() {
    return this._getInternalBlockNumber(100 + this.pollingInterval / 2).then((t) => {
      this._setFastBlockNumber(t);
    }, (t) => {
    }), this._fastBlockNumber != null ? this._fastBlockNumber : -1;
  }
  get polling() {
    return this._poller != null;
  }
  set polling(t) {
    t && !this._poller ? (this._poller = setInterval(() => {
      this.poll();
    }, this.pollingInterval), this._bootstrapPoll || (this._bootstrapPoll = setTimeout(() => {
      this.poll(), this._bootstrapPoll = setTimeout(() => {
        this._poller || this.poll(), this._bootstrapPoll = null;
      }, this.pollingInterval);
    }, 0))) : !t && this._poller && (clearInterval(this._poller), this._poller = null);
  }
  get pollingInterval() {
    return this._pollingInterval;
  }
  set pollingInterval(t) {
    if (typeof t != "number" || t <= 0 || parseInt(String(t)) != t)
      throw new Error("invalid polling interval");
    this._pollingInterval = t, this._poller && (clearInterval(this._poller), this._poller = setInterval(() => {
      this.poll();
    }, this._pollingInterval));
  }
  _getFastBlockNumber() {
    const t = ni();
    return t - this._fastQueryDate > 2 * this._pollingInterval && (this._fastQueryDate = t, this._fastBlockNumberPromise = this.getBlockNumber().then((r) => ((this._fastBlockNumber == null || r > this._fastBlockNumber) && (this._fastBlockNumber = r), this._fastBlockNumber))), this._fastBlockNumberPromise;
  }
  _setFastBlockNumber(t) {
    this._fastBlockNumber != null && t < this._fastBlockNumber || (this._fastQueryDate = ni(), (this._fastBlockNumber == null || t > this._fastBlockNumber) && (this._fastBlockNumber = t, this._fastBlockNumberPromise = Promise.resolve(t)));
  }
  waitForTransaction(t, r, i) {
    return Ct(this, void 0, void 0, function* () {
      return this._waitForTransaction(t, r ?? 1, i || 0, null);
    });
  }
  _waitForTransaction(t, r, i, f) {
    return Ct(this, void 0, void 0, function* () {
      const o = yield this.getTransactionReceipt(t);
      return (o ? o.confirmations : 0) >= r ? o : new Promise((u, l) => {
        const x = [];
        let b = !1;
        const _ = function() {
          return b ? !0 : (b = !0, x.forEach((P) => {
            P();
          }), !1);
        }, I = (P) => {
          P.confirmations < r || _() || u(P);
        };
        if (this.on(t, I), x.push(() => {
          this.removeListener(t, I);
        }), f) {
          let P = f.startBlock, B = null;
          const O = (q) => Ct(this, void 0, void 0, function* () {
            b || (yield Io(1e3), this.getTransactionCount(f.from).then((ot) => Ct(this, void 0, void 0, function* () {
              if (!b) {
                if (ot <= f.nonce)
                  P = q;
                else {
                  {
                    const G = yield this.getTransaction(t);
                    if (G && G.blockNumber != null)
                      return;
                  }
                  for (B == null && (B = P - 3, B < f.startBlock && (B = f.startBlock)); B <= q; ) {
                    if (b)
                      return;
                    const G = yield this.getBlockWithTransactions(B);
                    for (let $ = 0; $ < G.transactions.length; $++) {
                      const tt = G.transactions[$];
                      if (tt.hash === t)
                        return;
                      if (tt.from === f.from && tt.nonce === f.nonce) {
                        if (b)
                          return;
                        const gt = yield this.waitForTransaction(tt.hash, r);
                        if (_())
                          return;
                        let st = "replaced";
                        tt.data === f.data && tt.to === f.to && tt.value.eq(f.value) ? st = "repriced" : tt.data === "0x" && tt.from === tt.to && tt.value.isZero() && (st = "cancelled"), l(zt.makeError("transaction was replaced", U.errors.TRANSACTION_REPLACED, {
                          cancelled: st === "replaced" || st === "cancelled",
                          reason: st,
                          replacement: this._wrapTransaction(tt),
                          hash: t,
                          receipt: gt
                        }));
                        return;
                      }
                    }
                    B++;
                  }
                }
                b || this.once("block", O);
              }
            }), (ot) => {
              b || this.once("block", O);
            }));
          });
          if (b)
            return;
          this.once("block", O), x.push(() => {
            this.removeListener("block", O);
          });
        }
        if (typeof i == "number" && i > 0) {
          const P = setTimeout(() => {
            _() || l(zt.makeError("timeout exceeded", U.errors.TIMEOUT, { timeout: i }));
          }, i);
          P.unref && P.unref(), x.push(() => {
            clearTimeout(P);
          });
        }
      });
    });
  }
  getBlockNumber() {
    return Ct(this, void 0, void 0, function* () {
      return this._getInternalBlockNumber(0);
    });
  }
  getGasPrice() {
    return Ct(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const t = yield this.perform("getGasPrice", {});
      try {
        return ct.from(t);
      } catch (r) {
        return zt.throwError("bad result from backend", U.errors.SERVER_ERROR, {
          method: "getGasPrice",
          result: t,
          error: r
        });
      }
    });
  }
  getBalance(t, r) {
    return Ct(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const i = yield or({
        address: this._getAddress(t),
        blockTag: this._getBlockTag(r)
      }), f = yield this.perform("getBalance", i);
      try {
        return ct.from(f);
      } catch (o) {
        return zt.throwError("bad result from backend", U.errors.SERVER_ERROR, {
          method: "getBalance",
          params: i,
          result: f,
          error: o
        });
      }
    });
  }
  getTransactionCount(t, r) {
    return Ct(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const i = yield or({
        address: this._getAddress(t),
        blockTag: this._getBlockTag(r)
      }), f = yield this.perform("getTransactionCount", i);
      try {
        return ct.from(f).toNumber();
      } catch (o) {
        return zt.throwError("bad result from backend", U.errors.SERVER_ERROR, {
          method: "getTransactionCount",
          params: i,
          result: f,
          error: o
        });
      }
    });
  }
  getCode(t, r) {
    return Ct(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const i = yield or({
        address: this._getAddress(t),
        blockTag: this._getBlockTag(r)
      }), f = yield this.perform("getCode", i);
      try {
        return Tt(f);
      } catch (o) {
        return zt.throwError("bad result from backend", U.errors.SERVER_ERROR, {
          method: "getCode",
          params: i,
          result: f,
          error: o
        });
      }
    });
  }
  getStorageAt(t, r, i) {
    return Ct(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const f = yield or({
        address: this._getAddress(t),
        blockTag: this._getBlockTag(i),
        position: Promise.resolve(r).then((u) => Pn(u))
      }), o = yield this.perform("getStorageAt", f);
      try {
        return Tt(o);
      } catch (u) {
        return zt.throwError("bad result from backend", U.errors.SERVER_ERROR, {
          method: "getStorageAt",
          params: f,
          result: o,
          error: u
        });
      }
    });
  }
  // This should be called by any subclass wrapping a TransactionResponse
  _wrapTransaction(t, r, i) {
    if (r != null && Oe(r) !== 32)
      throw new Error("invalid response - sendTransaction");
    const f = t;
    return r != null && t.hash !== r && zt.throwError("Transaction hash mismatch from Provider.sendTransaction.", U.errors.UNKNOWN_ERROR, { expectedHash: t.hash, returnedHash: r }), f.wait = (o, u) => Ct(this, void 0, void 0, function* () {
      o == null && (o = 1), u == null && (u = 0);
      let l;
      o !== 0 && i != null && (l = {
        data: t.data,
        from: t.from,
        nonce: t.nonce,
        to: t.to,
        value: t.value,
        startBlock: i
      });
      const x = yield this._waitForTransaction(t.hash, o, u, l);
      return x == null && o === 0 ? null : (this._emitted["t:" + t.hash] = x.blockNumber, x.status === 0 && zt.throwError("transaction failed", U.errors.CALL_EXCEPTION, {
        transactionHash: t.hash,
        transaction: t,
        receipt: x
      }), x);
    }), f;
  }
  sendTransaction(t) {
    return Ct(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const r = yield Promise.resolve(t).then((o) => Tt(o)), i = this.formatter.transaction(t);
      i.confirmations == null && (i.confirmations = 0);
      const f = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
      try {
        const o = yield this.perform("sendTransaction", { signedTransaction: r });
        return this._wrapTransaction(i, o, f);
      } catch (o) {
        throw o.transaction = i, o.transactionHash = i.hash, o;
      }
    });
  }
  _getTransactionRequest(t) {
    return Ct(this, void 0, void 0, function* () {
      const r = yield t, i = {};
      return ["from", "to"].forEach((f) => {
        r[f] != null && (i[f] = Promise.resolve(r[f]).then((o) => o ? this._getAddress(o) : null));
      }), ["gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "value"].forEach((f) => {
        r[f] != null && (i[f] = Promise.resolve(r[f]).then((o) => o ? ct.from(o) : null));
      }), ["type"].forEach((f) => {
        r[f] != null && (i[f] = Promise.resolve(r[f]).then((o) => o ?? null));
      }), r.accessList && (i.accessList = this.formatter.accessList(r.accessList)), ["data"].forEach((f) => {
        r[f] != null && (i[f] = Promise.resolve(r[f]).then((o) => o ? Tt(o) : null));
      }), this.formatter.transactionRequest(yield or(i));
    });
  }
  _getFilter(t) {
    return Ct(this, void 0, void 0, function* () {
      t = yield t;
      const r = {};
      return t.address != null && (r.address = this._getAddress(t.address)), ["blockHash", "topics"].forEach((i) => {
        t[i] != null && (r[i] = t[i]);
      }), ["fromBlock", "toBlock"].forEach((i) => {
        t[i] != null && (r[i] = this._getBlockTag(t[i]));
      }), this.formatter.filter(yield or(r));
    });
  }
  _call(t, r, i) {
    return Ct(this, void 0, void 0, function* () {
      i >= zu && zt.throwError("CCIP read exceeded maximum redirections", U.errors.SERVER_ERROR, {
        redirects: i,
        transaction: t
      });
      const f = t.to, o = yield this.perform("call", { transaction: t, blockTag: r });
      if (i >= 0 && r === "latest" && f != null && o.substring(0, 10) === "0x556f1830" && Oe(o) % 32 === 4)
        try {
          const u = lr(o, 4), l = lr(u, 0, 32);
          ct.from(l).eq(f) || zt.throwError("CCIP Read sender did not match", U.errors.CALL_EXCEPTION, {
            name: "OffchainLookup",
            signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
            transaction: t,
            data: o
          });
          const x = [], b = ct.from(lr(u, 32, 64)).toNumber(), _ = ct.from(lr(u, b, b + 32)).toNumber(), I = lr(u, b + 32);
          for (let G = 0; G < _; G++) {
            const $ = Ei(I, G * 32);
            $ == null && zt.throwError("CCIP Read contained corrupt URL string", U.errors.CALL_EXCEPTION, {
              name: "OffchainLookup",
              signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
              transaction: t,
              data: o
            }), x.push($);
          }
          const P = pi(u, 64);
          ct.from(lr(u, 100, 128)).isZero() || zt.throwError("CCIP Read callback selector included junk", U.errors.CALL_EXCEPTION, {
            name: "OffchainLookup",
            signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
            transaction: t,
            data: o
          });
          const B = lr(u, 96, 100), O = pi(u, 128), q = yield this.ccipReadFetch(t, P, x);
          q == null && zt.throwError("CCIP Read disabled or provided no URLs", U.errors.CALL_EXCEPTION, {
            name: "OffchainLookup",
            signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
            transaction: t,
            data: o
          });
          const ot = {
            to: f,
            data: Er([B, Us([q, O])])
          };
          return this._call(ot, r, i + 1);
        } catch (u) {
          if (u.code === U.errors.SERVER_ERROR)
            throw u;
        }
      try {
        return Tt(o);
      } catch (u) {
        return zt.throwError("bad result from backend", U.errors.SERVER_ERROR, {
          method: "call",
          params: { transaction: t, blockTag: r },
          result: o,
          error: u
        });
      }
    });
  }
  call(t, r) {
    return Ct(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const i = yield or({
        transaction: this._getTransactionRequest(t),
        blockTag: this._getBlockTag(r),
        ccipReadEnabled: Promise.resolve(t.ccipReadEnabled)
      });
      return this._call(i.transaction, i.blockTag, i.ccipReadEnabled ? 0 : -1);
    });
  }
  estimateGas(t) {
    return Ct(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const r = yield or({
        transaction: this._getTransactionRequest(t)
      }), i = yield this.perform("estimateGas", r);
      try {
        return ct.from(i);
      } catch (f) {
        return zt.throwError("bad result from backend", U.errors.SERVER_ERROR, {
          method: "estimateGas",
          params: r,
          result: i,
          error: f
        });
      }
    });
  }
  _getAddress(t) {
    return Ct(this, void 0, void 0, function* () {
      t = yield t, typeof t != "string" && zt.throwArgumentError("invalid address or ENS name", "name", t);
      const r = yield this.resolveName(t);
      return r == null && zt.throwError("ENS name not configured", U.errors.UNSUPPORTED_OPERATION, {
        operation: `resolveName(${JSON.stringify(t)})`
      }), r;
    });
  }
  _getBlock(t, r) {
    return Ct(this, void 0, void 0, function* () {
      yield this.getNetwork(), t = yield t;
      let i = -128;
      const f = {
        includeTransactions: !!r
      };
      if (Vt(t, 32))
        f.blockHash = t;
      else
        try {
          f.blockTag = yield this._getBlockTag(t), Vt(f.blockTag) && (i = parseInt(f.blockTag.substring(2), 16));
        } catch {
          zt.throwArgumentError("invalid block hash or block tag", "blockHashOrBlockTag", t);
        }
      return ai(() => Ct(this, void 0, void 0, function* () {
        const o = yield this.perform("getBlock", f);
        if (o == null)
          return f.blockHash != null && this._emitted["b:" + f.blockHash] == null || f.blockTag != null && i > this._emitted.block ? null : void 0;
        if (r) {
          let u = null;
          for (let x = 0; x < o.transactions.length; x++) {
            const b = o.transactions[x];
            if (b.blockNumber == null)
              b.confirmations = 0;
            else if (b.confirmations == null) {
              u == null && (u = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval));
              let _ = u - b.blockNumber + 1;
              _ <= 0 && (_ = 1), b.confirmations = _;
            }
          }
          const l = this.formatter.blockWithTransactions(o);
          return l.transactions = l.transactions.map((x) => this._wrapTransaction(x)), l;
        }
        return this.formatter.block(o);
      }), { oncePoll: this });
    });
  }
  getBlock(t) {
    return this._getBlock(t, !1);
  }
  getBlockWithTransactions(t) {
    return this._getBlock(t, !0);
  }
  getTransaction(t) {
    return Ct(this, void 0, void 0, function* () {
      yield this.getNetwork(), t = yield t;
      const r = { transactionHash: this.formatter.hash(t, !0) };
      return ai(() => Ct(this, void 0, void 0, function* () {
        const i = yield this.perform("getTransaction", r);
        if (i == null)
          return this._emitted["t:" + t] == null ? null : void 0;
        const f = this.formatter.transactionResponse(i);
        if (f.blockNumber == null)
          f.confirmations = 0;
        else if (f.confirmations == null) {
          let u = (yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval)) - f.blockNumber + 1;
          u <= 0 && (u = 1), f.confirmations = u;
        }
        return this._wrapTransaction(f);
      }), { oncePoll: this });
    });
  }
  getTransactionReceipt(t) {
    return Ct(this, void 0, void 0, function* () {
      yield this.getNetwork(), t = yield t;
      const r = { transactionHash: this.formatter.hash(t, !0) };
      return ai(() => Ct(this, void 0, void 0, function* () {
        const i = yield this.perform("getTransactionReceipt", r);
        if (i == null)
          return this._emitted["t:" + t] == null ? null : void 0;
        if (i.blockHash == null)
          return;
        const f = this.formatter.receipt(i);
        if (f.blockNumber == null)
          f.confirmations = 0;
        else if (f.confirmations == null) {
          let u = (yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval)) - f.blockNumber + 1;
          u <= 0 && (u = 1), f.confirmations = u;
        }
        return f;
      }), { oncePoll: this });
    });
  }
  getLogs(t) {
    return Ct(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const r = yield or({ filter: this._getFilter(t) }), i = yield this.perform("getLogs", r);
      return i.forEach((f) => {
        f.removed == null && (f.removed = !1);
      }), ht.arrayOf(this.formatter.filterLog.bind(this.formatter))(i);
    });
  }
  getEtherPrice() {
    return Ct(this, void 0, void 0, function* () {
      return yield this.getNetwork(), this.perform("getEtherPrice", {});
    });
  }
  _getBlockTag(t) {
    return Ct(this, void 0, void 0, function* () {
      if (t = yield t, typeof t == "number" && t < 0) {
        t % 1 && zt.throwArgumentError("invalid BlockTag", "blockTag", t);
        let r = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
        return r += t, r < 0 && (r = 0), this.formatter.blockTag(r);
      }
      return this.formatter.blockTag(t);
    });
  }
  getResolver(t) {
    return Ct(this, void 0, void 0, function* () {
      let r = t;
      for (; ; ) {
        if (r === "" || r === "." || t !== "eth" && r === "eth")
          return null;
        const i = yield this._getResolver(r, "getResolver");
        if (i != null) {
          const f = new Po(this, i, t);
          return r !== t && !(yield f.supportsWildcard()) ? null : f;
        }
        r = r.split(".").slice(1).join(".");
      }
    });
  }
  _getResolver(t, r) {
    return Ct(this, void 0, void 0, function* () {
      r == null && (r = "ENS");
      const i = yield this.getNetwork();
      i.ensAddress || zt.throwError("network does not support ENS", U.errors.UNSUPPORTED_OPERATION, { operation: r, network: i.name });
      try {
        const f = yield this.call({
          to: i.ensAddress,
          data: "0x0178b8bf" + bi(t).substring(2)
        });
        return this.formatter.callAddress(f);
      } catch {
      }
      return null;
    });
  }
  resolveName(t) {
    return Ct(this, void 0, void 0, function* () {
      t = yield t;
      try {
        return Promise.resolve(this.formatter.address(t));
      } catch (i) {
        if (Vt(t))
          throw i;
      }
      typeof t != "string" && zt.throwArgumentError("invalid ENS name", "name", t);
      const r = yield this.getResolver(t);
      return r ? yield r.getAddress() : null;
    });
  }
  lookupAddress(t) {
    return Ct(this, void 0, void 0, function* () {
      t = yield t, t = this.formatter.address(t);
      const r = t.substring(2).toLowerCase() + ".addr.reverse", i = yield this._getResolver(r, "lookupAddress");
      if (i == null)
        return null;
      const f = Ei(yield this.call({
        to: i,
        data: "0x691f3431" + bi(r).substring(2)
      }), 0);
      return (yield this.resolveName(f)) != t ? null : f;
    });
  }
  getAvatar(t) {
    return Ct(this, void 0, void 0, function* () {
      let r = null;
      if (Vt(t)) {
        const o = this.formatter.address(t).substring(2).toLowerCase() + ".addr.reverse", u = yield this._getResolver(o, "getAvatar");
        if (!u)
          return null;
        r = new Po(this, u, o);
        try {
          const l = yield r.getAvatar();
          if (l)
            return l.url;
        } catch (l) {
          if (l.code !== U.errors.CALL_EXCEPTION)
            throw l;
        }
        try {
          const l = Ei(yield this.call({
            to: u,
            data: "0x691f3431" + bi(o).substring(2)
          }), 0);
          r = yield this.getResolver(l);
        } catch (l) {
          if (l.code !== U.errors.CALL_EXCEPTION)
            throw l;
          return null;
        }
      } else if (r = yield this.getResolver(t), !r)
        return null;
      const i = yield r.getAvatar();
      return i == null ? null : i.url;
    });
  }
  perform(t, r) {
    return zt.throwError(t + " not implemented", U.errors.NOT_IMPLEMENTED, { operation: t });
  }
  _startEvent(t) {
    this.polling = this._events.filter((r) => r.pollable()).length > 0;
  }
  _stopEvent(t) {
    this.polling = this._events.filter((r) => r.pollable()).length > 0;
  }
  _addEventListener(t, r, i) {
    const f = new Ju(Ge(t), r, i);
    return this._events.push(f), this._startEvent(f), this;
  }
  on(t, r) {
    return this._addEventListener(t, r, !1);
  }
  once(t, r) {
    return this._addEventListener(t, r, !0);
  }
  emit(t, ...r) {
    let i = !1, f = [], o = Ge(t);
    return this._events = this._events.filter((u) => u.tag !== o ? !0 : (setTimeout(() => {
      u.listener.apply(this, r);
    }, 0), i = !0, u.once ? (f.push(u), !1) : !0)), f.forEach((u) => {
      this._stopEvent(u);
    }), i;
  }
  listenerCount(t) {
    if (!t)
      return this._events.length;
    let r = Ge(t);
    return this._events.filter((i) => i.tag === r).length;
  }
  listeners(t) {
    if (t == null)
      return this._events.map((i) => i.listener);
    let r = Ge(t);
    return this._events.filter((i) => i.tag === r).map((i) => i.listener);
  }
  off(t, r) {
    if (r == null)
      return this.removeAllListeners(t);
    const i = [];
    let f = !1, o = Ge(t);
    return this._events = this._events.filter((u) => u.tag !== o || u.listener != r || f ? !0 : (f = !0, i.push(u), !1)), i.forEach((u) => {
      this._stopEvent(u);
    }), this;
  }
  removeAllListeners(t) {
    let r = [];
    if (t == null)
      r = this._events, this._events = [];
    else {
      const i = Ge(t);
      this._events = this._events.filter((f) => f.tag !== i ? !0 : (r.push(f), !1));
    }
    return r.forEach((i) => {
      this._stopEvent(i);
    }), this;
  }
}
var oe = globalThis && globalThis.__awaiter || function(e, t, r, i) {
  function f(o) {
    return o instanceof r ? o : new r(function(u) {
      u(o);
    });
  }
  return new (r || (r = Promise))(function(o, u) {
    function l(_) {
      try {
        b(i.next(_));
      } catch (I) {
        u(I);
      }
    }
    function x(_) {
      try {
        b(i.throw(_));
      } catch (I) {
        u(I);
      }
    }
    function b(_) {
      _.done ? o(_.value) : f(_.value).then(l, x);
    }
    b((i = i.apply(e, t || [])).next());
  });
};
const rr = new U(Ki), Vu = ["call", "estimateGas"];
function ui(e, t) {
  if (e == null)
    return null;
  if (typeof e.message == "string" && e.message.match("reverted")) {
    const r = Vt(e.data) ? e.data : null;
    if (!t || r)
      return { message: e.message, data: r };
  }
  if (typeof e == "object") {
    for (const r in e) {
      const i = ui(e[r], t);
      if (i)
        return i;
    }
    return null;
  }
  if (typeof e == "string")
    try {
      return ui(JSON.parse(e), t);
    } catch {
    }
  return null;
}
function Ls(e, t, r) {
  const i = r.transaction || r.signedTransaction;
  if (e === "call") {
    const o = ui(t, !0);
    if (o)
      return o.data;
    rr.throwError("missing revert data in call exception; Transaction reverted without a reason string", U.errors.CALL_EXCEPTION, {
      data: "0x",
      transaction: i,
      error: t
    });
  }
  if (e === "estimateGas") {
    let o = ui(t.body, !1);
    o == null && (o = ui(t, !1)), o && rr.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", U.errors.UNPREDICTABLE_GAS_LIMIT, {
      reason: o.message,
      method: e,
      transaction: i,
      error: t
    });
  }
  let f = t.message;
  throw t.code === U.errors.SERVER_ERROR && t.error && typeof t.error.message == "string" ? f = t.error.message : typeof t.body == "string" ? f = t.body : typeof t.responseText == "string" && (f = t.responseText), f = (f || "").toLowerCase(), f.match(/insufficient funds|base fee exceeds gas limit|InsufficientFunds/i) && rr.throwError("insufficient funds for intrinsic transaction cost", U.errors.INSUFFICIENT_FUNDS, {
    error: t,
    method: e,
    transaction: i
  }), f.match(/nonce (is )?too low/i) && rr.throwError("nonce has already been used", U.errors.NONCE_EXPIRED, {
    error: t,
    method: e,
    transaction: i
  }), f.match(/replacement transaction underpriced|transaction gas price.*too low/i) && rr.throwError("replacement fee too low", U.errors.REPLACEMENT_UNDERPRICED, {
    error: t,
    method: e,
    transaction: i
  }), f.match(/only replay-protected/i) && rr.throwError("legacy pre-eip-155 transactions not supported", U.errors.UNSUPPORTED_OPERATION, {
    error: t,
    method: e,
    transaction: i
  }), Vu.indexOf(e) >= 0 && f.match(/gas required exceeds allowance|always failing transaction|execution reverted|revert/) && rr.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", U.errors.UNPREDICTABLE_GAS_LIMIT, {
    error: t,
    method: e,
    transaction: i
  }), t;
}
function Bo(e) {
  return new Promise(function(t) {
    setTimeout(t, e);
  });
}
function Xu(e) {
  if (e.error) {
    const t = new Error(e.error.message);
    throw t.code = e.error.code, t.data = e.error.data, t;
  }
  return e.result;
}
function oi(e) {
  return e && e.toLowerCase();
}
const Nn = {};
class Ds extends On {
  constructor(t, r, i) {
    if (super(), t !== Nn)
      throw new Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner");
    Yt(this, "provider", r), i == null && (i = 0), typeof i == "string" ? (Yt(this, "_address", this.provider.formatter.address(i)), Yt(this, "_index", null)) : typeof i == "number" ? (Yt(this, "_index", i), Yt(this, "_address", null)) : rr.throwArgumentError("invalid address or index", "addressOrIndex", i);
  }
  connect(t) {
    return rr.throwError("cannot alter JSON-RPC Signer connection", U.errors.UNSUPPORTED_OPERATION, {
      operation: "connect"
    });
  }
  connectUnchecked() {
    return new Zu(Nn, this.provider, this._address || this._index);
  }
  getAddress() {
    return this._address ? Promise.resolve(this._address) : this.provider.send("eth_accounts", []).then((t) => (t.length <= this._index && rr.throwError("unknown account #" + this._index, U.errors.UNSUPPORTED_OPERATION, {
      operation: "getAddress"
    }), this.provider.formatter.address(t[this._index])));
  }
  sendUncheckedTransaction(t) {
    t = pr(t);
    const r = this.getAddress().then((i) => (i && (i = i.toLowerCase()), i));
    if (t.gasLimit == null) {
      const i = pr(t);
      i.from = r, t.gasLimit = this.provider.estimateGas(i);
    }
    return t.to != null && (t.to = Promise.resolve(t.to).then((i) => oe(this, void 0, void 0, function* () {
      if (i == null)
        return null;
      const f = yield this.provider.resolveName(i);
      return f == null && rr.throwArgumentError("provided ENS name resolves to null", "tx.to", i), f;
    }))), or({
      tx: or(t),
      sender: r
    }).then(({ tx: i, sender: f }) => {
      i.from != null ? i.from.toLowerCase() !== f && rr.throwArgumentError("from address mismatch", "transaction", t) : i.from = f;
      const o = this.provider.constructor.hexlifyTransaction(i, { from: !0 });
      return this.provider.send("eth_sendTransaction", [o]).then((u) => u, (u) => (typeof u.message == "string" && u.message.match(/user denied/i) && rr.throwError("user rejected transaction", U.errors.ACTION_REJECTED, {
        action: "sendTransaction",
        transaction: i
      }), Ls("sendTransaction", u, o)));
    });
  }
  signTransaction(t) {
    return rr.throwError("signing transactions is unsupported", U.errors.UNSUPPORTED_OPERATION, {
      operation: "signTransaction"
    });
  }
  sendTransaction(t) {
    return oe(this, void 0, void 0, function* () {
      const r = yield this.provider._getInternalBlockNumber(100 + 2 * this.provider.pollingInterval), i = yield this.sendUncheckedTransaction(t);
      try {
        return yield ai(() => oe(this, void 0, void 0, function* () {
          const f = yield this.provider.getTransaction(i);
          if (f !== null)
            return this.provider._wrapTransaction(f, i, r);
        }), { oncePoll: this.provider });
      } catch (f) {
        throw f.transactionHash = i, f;
      }
    });
  }
  signMessage(t) {
    return oe(this, void 0, void 0, function* () {
      const r = typeof t == "string" ? ae(t) : t, i = yield this.getAddress();
      try {
        return yield this.provider.send("personal_sign", [Tt(r), i.toLowerCase()]);
      } catch (f) {
        throw typeof f.message == "string" && f.message.match(/user denied/i) && rr.throwError("user rejected signing", U.errors.ACTION_REJECTED, {
          action: "signMessage",
          from: i,
          messageData: t
        }), f;
      }
    });
  }
  _legacySignMessage(t) {
    return oe(this, void 0, void 0, function* () {
      const r = typeof t == "string" ? ae(t) : t, i = yield this.getAddress();
      try {
        return yield this.provider.send("eth_sign", [i.toLowerCase(), Tt(r)]);
      } catch (f) {
        throw typeof f.message == "string" && f.message.match(/user denied/i) && rr.throwError("user rejected signing", U.errors.ACTION_REJECTED, {
          action: "_legacySignMessage",
          from: i,
          messageData: t
        }), f;
      }
    });
  }
  _signTypedData(t, r, i) {
    return oe(this, void 0, void 0, function* () {
      const f = yield Ar.resolveNames(t, r, i, (u) => this.provider.resolveName(u)), o = yield this.getAddress();
      try {
        return yield this.provider.send("eth_signTypedData_v4", [
          o.toLowerCase(),
          JSON.stringify(Ar.getPayload(f.domain, r, f.value))
        ]);
      } catch (u) {
        throw typeof u.message == "string" && u.message.match(/user denied/i) && rr.throwError("user rejected signing", U.errors.ACTION_REJECTED, {
          action: "_signTypedData",
          from: o,
          messageData: { domain: f.domain, types: r, value: f.value }
        }), u;
      }
    });
  }
  unlock(t) {
    return oe(this, void 0, void 0, function* () {
      const r = this.provider, i = yield this.getAddress();
      return r.send("personal_unlockAccount", [i.toLowerCase(), t, null]);
    });
  }
}
class Zu extends Ds {
  sendTransaction(t) {
    return this.sendUncheckedTransaction(t).then((r) => ({
      hash: r,
      nonce: null,
      gasLimit: null,
      gasPrice: null,
      data: null,
      value: null,
      chainId: null,
      confirmations: 0,
      from: null,
      wait: (i) => this.provider.waitForTransaction(r, i)
    }));
  }
}
const $u = {
  chainId: !0,
  data: !0,
  gasLimit: !0,
  gasPrice: !0,
  nonce: !0,
  to: !0,
  value: !0,
  type: !0,
  accessList: !0,
  maxFeePerGas: !0,
  maxPriorityFeePerGas: !0
};
class t0 extends ju {
  constructor(t, r) {
    let i = r;
    i == null && (i = new Promise((f, o) => {
      setTimeout(() => {
        this.detectNetwork().then((u) => {
          f(u);
        }, (u) => {
          o(u);
        });
      }, 0);
    })), super(i), t || (t = fi(this.constructor, "defaultUrl")()), typeof t == "string" ? Yt(this, "connection", Object.freeze({
      url: t
    })) : Yt(this, "connection", Object.freeze(pr(t))), this._nextId = 42;
  }
  get _cache() {
    return this._eventLoopCache == null && (this._eventLoopCache = {}), this._eventLoopCache;
  }
  static defaultUrl() {
    return "http://localhost:8545";
  }
  detectNetwork() {
    return this._cache.detectNetwork || (this._cache.detectNetwork = this._uncachedDetectNetwork(), setTimeout(() => {
      this._cache.detectNetwork = null;
    }, 0)), this._cache.detectNetwork;
  }
  _uncachedDetectNetwork() {
    return oe(this, void 0, void 0, function* () {
      yield Bo(0);
      let t = null;
      try {
        t = yield this.send("eth_chainId", []);
      } catch {
        try {
          t = yield this.send("net_version", []);
        } catch {
        }
      }
      if (t != null) {
        const r = fi(this.constructor, "getNetwork");
        try {
          return r(ct.from(t).toNumber());
        } catch (i) {
          return rr.throwError("could not detect network", U.errors.NETWORK_ERROR, {
            chainId: t,
            event: "invalidNetwork",
            serverError: i
          });
        }
      }
      return rr.throwError("could not detect network", U.errors.NETWORK_ERROR, {
        event: "noNetwork"
      });
    });
  }
  getSigner(t) {
    return new Ds(Nn, this, t);
  }
  getUncheckedSigner(t) {
    return this.getSigner(t).connectUnchecked();
  }
  listAccounts() {
    return this.send("eth_accounts", []).then((t) => t.map((r) => this.formatter.address(r)));
  }
  send(t, r) {
    const i = {
      method: t,
      params: r,
      id: this._nextId++,
      jsonrpc: "2.0"
    };
    this.emit("debug", {
      action: "request",
      request: Fe(i),
      provider: this
    });
    const f = ["eth_chainId", "eth_blockNumber"].indexOf(t) >= 0;
    if (f && this._cache[t])
      return this._cache[t];
    const o = qn(this.connection, JSON.stringify(i), Xu).then((u) => (this.emit("debug", {
      action: "response",
      request: i,
      response: u,
      provider: this
    }), u), (u) => {
      throw this.emit("debug", {
        action: "response",
        error: u,
        request: i,
        provider: this
      }), u;
    });
    return f && (this._cache[t] = o, setTimeout(() => {
      this._cache[t] = null;
    }, 0)), o;
  }
  prepareRequest(t, r) {
    switch (t) {
      case "getBlockNumber":
        return ["eth_blockNumber", []];
      case "getGasPrice":
        return ["eth_gasPrice", []];
      case "getBalance":
        return ["eth_getBalance", [oi(r.address), r.blockTag]];
      case "getTransactionCount":
        return ["eth_getTransactionCount", [oi(r.address), r.blockTag]];
      case "getCode":
        return ["eth_getCode", [oi(r.address), r.blockTag]];
      case "getStorageAt":
        return ["eth_getStorageAt", [oi(r.address), er(r.position, 32), r.blockTag]];
      case "sendTransaction":
        return ["eth_sendRawTransaction", [r.signedTransaction]];
      case "getBlock":
        return r.blockTag ? ["eth_getBlockByNumber", [r.blockTag, !!r.includeTransactions]] : r.blockHash ? ["eth_getBlockByHash", [r.blockHash, !!r.includeTransactions]] : null;
      case "getTransaction":
        return ["eth_getTransactionByHash", [r.transactionHash]];
      case "getTransactionReceipt":
        return ["eth_getTransactionReceipt", [r.transactionHash]];
      case "call":
        return ["eth_call", [fi(this.constructor, "hexlifyTransaction")(r.transaction, { from: !0 }), r.blockTag]];
      case "estimateGas":
        return ["eth_estimateGas", [fi(this.constructor, "hexlifyTransaction")(r.transaction, { from: !0 })]];
      case "getLogs":
        return r.filter && r.filter.address != null && (r.filter.address = oi(r.filter.address)), ["eth_getLogs", [r.filter]];
    }
    return null;
  }
  perform(t, r) {
    return oe(this, void 0, void 0, function* () {
      if (t === "call" || t === "estimateGas") {
        const f = r.transaction;
        if (f && f.type != null && ct.from(f.type).isZero() && f.maxFeePerGas == null && f.maxPriorityFeePerGas == null) {
          const o = yield this.getFeeData();
          o.maxFeePerGas == null && o.maxPriorityFeePerGas == null && (r = pr(r), r.transaction = pr(f), delete r.transaction.type);
        }
      }
      const i = this.prepareRequest(t, r);
      i == null && rr.throwError(t + " not implemented", U.errors.NOT_IMPLEMENTED, { operation: t });
      try {
        return yield this.send(i[0], i[1]);
      } catch (f) {
        return Ls(t, f, r);
      }
    });
  }
  _startEvent(t) {
    t.tag === "pending" && this._startPending(), super._startEvent(t);
  }
  _startPending() {
    if (this._pendingFilter != null)
      return;
    const t = this, r = this.send("eth_newPendingTransactionFilter", []);
    this._pendingFilter = r, r.then(function(i) {
      function f() {
        t.send("eth_getFilterChanges", [i]).then(function(o) {
          if (t._pendingFilter != r)
            return null;
          let u = Promise.resolve();
          return o.forEach(function(l) {
            t._emitted["t:" + l.toLowerCase()] = "pending", u = u.then(function() {
              return t.getTransaction(l).then(function(x) {
                return t.emit("pending", x), null;
              });
            });
          }), u.then(function() {
            return Bo(1e3);
          });
        }).then(function() {
          if (t._pendingFilter != r) {
            t.send("eth_uninstallFilter", [i]);
            return;
          }
          return setTimeout(function() {
            f();
          }, 0), null;
        }).catch((o) => {
        });
      }
      return f(), i;
    }).catch((i) => {
    });
  }
  _stopEvent(t) {
    t.tag === "pending" && this.listenerCount("pending") === 0 && (this._pendingFilter = null), super._stopEvent(t);
  }
  // Convert an ethers.js transaction into a JSON-RPC transaction
  //  - gasLimit => gas
  //  - All values hexlified
  //  - All numeric values zero-striped
  //  - All addresses are lowercased
  // NOTE: This allows a TransactionRequest, but all values should be resolved
  //       before this is called
  // @TODO: This will likely be removed in future versions and prepareRequest
  //        will be the preferred method for this.
  static hexlifyTransaction(t, r) {
    const i = pr($u);
    if (r)
      for (const o in r)
        r[o] && (i[o] = !0);
    If(t, i);
    const f = {};
    return ["chainId", "gasLimit", "gasPrice", "type", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "value"].forEach(function(o) {
      if (t[o] == null)
        return;
      const u = Pn(ct.from(t[o]));
      o === "gasLimit" && (o = "gas"), f[o] = u;
    }), ["from", "to", "data"].forEach(function(o) {
      t[o] != null && (f[o] = Tt(t[o]));
    }), t.accessList && (f.accessList = gi(t.accessList)), f;
  }
}
const Co = new U(Ki);
let r0 = 1;
function To(e, t) {
  const r = "Web3LegacyFetcher";
  return function(i, f) {
    const o = {
      method: i,
      params: f,
      id: r0++,
      jsonrpc: "2.0"
    };
    return new Promise((u, l) => {
      this.emit("debug", {
        action: "request",
        fetcher: r,
        request: Fe(o),
        provider: this
      }), t(o, (x, b) => {
        if (x)
          return this.emit("debug", {
            action: "response",
            fetcher: r,
            error: x,
            request: o,
            provider: this
          }), l(x);
        if (this.emit("debug", {
          action: "response",
          fetcher: r,
          request: o,
          response: b,
          provider: this
        }), b.error) {
          const _ = new Error(b.error.message);
          return _.code = b.error.code, _.data = b.error.data, l(_);
        }
        u(b.result);
      });
    });
  };
}
function e0(e) {
  return function(t, r) {
    r == null && (r = []);
    const i = { method: t, params: r };
    return this.emit("debug", {
      action: "request",
      fetcher: "Eip1193Fetcher",
      request: Fe(i),
      provider: this
    }), e.request(i).then((f) => (this.emit("debug", {
      action: "response",
      fetcher: "Eip1193Fetcher",
      request: i,
      response: f,
      provider: this
    }), f), (f) => {
      throw this.emit("debug", {
        action: "response",
        fetcher: "Eip1193Fetcher",
        request: i,
        error: f,
        provider: this
      }), f;
    });
  };
}
class i0 extends t0 {
  constructor(t, r) {
    t == null && Co.throwArgumentError("missing provider", "provider", t);
    let i = null, f = null, o = null;
    typeof t == "function" ? (i = "unknown:", f = t) : (i = t.host || t.path || "", !i && t.isMetaMask && (i = "metamask"), o = t, t.request ? (i === "" && (i = "eip-1193:"), f = e0(t)) : t.sendAsync ? f = To(t, t.sendAsync.bind(t)) : t.send ? f = To(t, t.send.bind(t)) : Co.throwArgumentError("unsupported provider", "provider", t), i || (i = "unknown:")), super(i, r), Yt(this, "jsonRpcFetchFunc", f), Yt(this, "provider", o);
  }
  send(t, r) {
    return this.jsonRpcFetchFunc(t, r);
  }
}
let Oo = {}.VITE_REACT_APP_APP_URL || "https://staging.walletchat.fun";
const qs = si["wallet-chat-widget"];
function ve(e) {
  var r;
  if (typeof document > "u")
    return;
  const t = document == null ? void 0 : document.getElementById(qs);
  (r = t == null ? void 0 : t.contentWindow) == null || r.postMessage(e, "*");
}
function h0({
  connectedWallet: e,
  signedMessageData: t,
  requestSignature: r,
  style: i
}) {
  const [f, o] = jt.useState(Oo), u = jt.useRef(""), l = jt.useRef(null), x = jt.useRef(e), b = jt.useRef(0), _ = jt.useRef(!1), I = jt.useContext(Ti), { widgetState: P, setWidgetState: B } = I || {}, { ownerAddress: O } = P || {}, [q, ot] = jt.useState(_.current), [G, $] = jt.useState(0), tt = jt.useRef(""), [gt, st] = jt.useState({ signature: "", msgToSign: "", account: "", walletName: "", chainId: 1 });
  async function lt(Ht) {
    ve({ target: "sign_in", data: Ht || null });
  }
  async function qt() {
    const Ht = new i0(window.ethereum);
    console.log("ethersProvider: ", Ht);
    const nt = await Ht.getSigner();
    console.log("signer: ", nt);
    const Lt = "Hello World";
    nt.signMessage(Lt).then((w) => {
      console.log("Signature Done: ", w);
      let n;
      n = {
        msgToSign: Lt,
        signature: w,
        walletName: e == null ? void 0 : e.walletName,
        account: e == null ? void 0 : e.account,
        chainId: e == null ? void 0 : e.chainId
      }, st(n);
    }).catch((w) => {
      console.error("🚨[Signature]:", w);
    });
  }
  const Mt = () => {
    ot((Ht) => {
      const nt = !!Ht;
      return l.current && !nt && ve({
        target: "nft_info",
        data: { ...l.current, redirect: !0 }
      }), l.current = null, _.current = !nt, !nt;
    });
  }, Qt = jt.useCallback(() => {
    e && (q || r) && lt({ ...e, requestSignature: r });
  }, [e, q, r]);
  return jt.useEffect(() => {
    Qt();
  }, [Qt]), jt.useEffect(() => {
    if (!(O != null && O.address))
      return;
    const Ht = O.address, nt = ln(window.location.href);
    nt.network && (l.current = {
      ...nt,
      ownerAddress: Ht
    }), l.current ? ve({
      target: "nft_info",
      data: { ...l.current, redirect: !0 }
    }) : ve({ target: "nft_info", data: { ownerAddress: Ht } }), ot(!0);
  }, [O]), jt.useEffect(() => {
    console.log("---signed_message entry ---", t), t != null && t.signature && t.signature != tt.current && (tt.current = t.signature, console.log("---signed_message ---", t), ve({ target: "signed_message", data: t }));
  }, [t]), jt.useEffect(() => {
    console.log("---signed_message entry ---", t), gt != null && gt.signature && (tt.current = gt.signature, console.log("---signed_message ---", t), ve({ target: "signed_message", data: gt }));
  }, [gt]), jt.useEffect(() => {
    const Ht = () => {
      if (window.location.href === u.current)
        return;
      u.current = window.location.href;
      const w = ln(window.location.href);
      B && B("foundNft", JSON.stringify(w)), w.network && (l.current = w), ve({ target: "nft_info", data: w });
    }, nt = new MutationObserver(Ht), Lt = { subtree: !0, childList: !0 };
    return Ht(), nt.observe(document, Lt), () => nt.disconnect();
  }, [B]), jt.useEffect(() => {
    x.current = e;
  }, [e]), jt.useEffect(() => {
    const Ht = (nt) => {
      const Lt = nt.data;
      b.current < 100 && (ve({
        target: "origin",
        data: {
          domain: window.location.host,
          origin: window.location.protocol + window.location.host
        }
      }), b.current++), Lt.target === "url_env" && Lt.data !== Oo && !{}.VITE_REACT_APP_APP_URL && o(Lt.data), Lt.target === "unread_cnt" && $(Lt.data), Lt.target === "close_widget" && Mt(), Lt.target === "do_parent_sign_in" && qt(), Lt.target === "is_signed_in" && !Lt.data && Qt();
    };
    return window.addEventListener("message", Ht), () => window.removeEventListener("message", Ht);
  }, [Qt]), /* @__PURE__ */ hi(
    "div",
    {
      className: ze(si["wallet-chat-widget__container"], {
        [si["wallet-chat-widget__container--open"]]: q
      }),
      style: i,
      children: [
        /* @__PURE__ */ br(
          "iframe",
          {
            title: "WalletChat",
            name: "WalletChat",
            id: qs,
            className: ze("", {
              [si["widget-is-open"]]: q,
              [si["widget-is-closed"]]: !q
            }),
            src: f
          }
        ),
        /* @__PURE__ */ br(
          pf,
          {
            notiVal: G,
            showNoti: G > 0,
            isOpen: q,
            clickHandler: Mt
          }
        )
      ]
    }
  );
}
const n0 = ({
  onClick: e,
  children: t
}) => /* @__PURE__ */ br("button", { type: "button", onClick: e, children: t }), u0 = ({
  ownerAddress: e,
  render: t
}) => {
  const r = jt.useContext(Ti), i = r == null ? void 0 : r.setWidgetState, f = t ? ({ onClick: o, children: u }) => jt.cloneElement(t, { onClick: o }, u) : n0;
  return r ? /* @__PURE__ */ hi(
    f,
    {
      onClick: () => i && i("ownerAddress", {
        address: e,
        lastRequest: Date.now().toString()
      }),
      children: [
        /* @__PURE__ */ br(
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
  u0 as ChatWithOwner,
  a0 as WalletChatProvider,
  h0 as WalletChatWidget,
  f0 as types,
  s0 as utils
};
(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._ring_7tcsj_47{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}._popupButton__container_7tcsj_5{position:relative;margin-top:.75rem;height:4rem;--tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / .15));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:margin-top,transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}._popupButton__container--open_7tcsj_9{right:1.5rem;margin-top:-4rem;--tw-translate-y: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._popupButton__container--open_7tcsj_9{right:0px;margin-top:.75rem;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._popupButton_7tcsj_5{position:absolute;top:0px;right:0px;height:4rem;width:4rem;transform-origin:center;cursor:pointer;overflow:hidden;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}._icon_7tcsj_23{transition-property:transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-timing-function:linear;display:flex;height:100%;width:100%;cursor:pointer;align-items:center;justify-content:center}._icon_7tcsj_23 svg{height:2rem;width:1.75rem;fill:#fff}._inactiveIcon_7tcsj_31{position:absolute;--tw-rotate: 30deg;--tw-scale-x: 0;--tw-scale-y: 0;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0}._activeIcon_7tcsj_35{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}._notif_7tcsj_39{pointer-events:none;position:absolute;top:-.5rem;right:-.5rem;height:1.75rem;width:1.75rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(219 39 119 / var(--tw-bg-opacity));text-align:center;font-size:.875rem;line-height:1.25rem;font-weight:700;line-height:1.5;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}._pinging_7tcsj_43{animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite}._ring_7tcsj_47{position:fixed;right:0px;display:inline-flex;height:4rem;width:4rem}@keyframes _ping_7tcsj_43{75%,to{transform:scale(2);opacity:0}}._ring_7tcsj_47{animation:_ping_7tcsj_43 1s cubic-bezier(0,0,.2,1) infinite;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity));opacity:.75}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }._ring_q714d_1{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}#_wallet-chat-widget_q714d_23{transition-property:width,min-width,height,min-height;transition-duration:.25s;transition-timing-function:cubic-bezier(.4,0,.2,1);overflow-x:hidden;overflow-y:hidden;border-radius:1rem;--tw-drop-shadow: drop-shadow(4px 4px 8px rgba(0,0,0,.5));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}._widget-is-open_q714d_9{height:75vh;min-height:500px;width:calc(100vw - 2rem);--tw-translate-x: -1rem;--tw-translate-y: -.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 640px){._widget-is-open_q714d_9{height:65vh;width:15vw;min-width:440px;--tw-translate-x: 0px;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}._widget-is-closed_q714d_13{height:0px;min-height:0px;width:0px;min-width:0px}._wallet-chat-widget__container_q714d_23{position:fixed;bottom:.5rem;right:1.5rem;z-index:1000;-webkit-user-select:none;-moz-user-select:none;user-select:none}._wallet-chat-widget__container--open_q714d_27{bottom:0px;right:0px}@media (min-width: 640px){._wallet-chat-widget__container--open_q714d_27{bottom:.5rem;right:1.5rem}}")),document.head.appendChild(t)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
