import I from "react";
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
var Le = {}, Gr = {};
Gr.byteLength = Ye;
Gr.toByteArray = Ve;
Gr.fromByteArray = ze;
var ir = [], Q = [], Me = typeof Uint8Array < "u" ? Uint8Array : Array, te = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Er = 0, We = te.length; Er < We; ++Er)
  ir[Er] = te[Er], Q[te.charCodeAt(Er)] = Er;
Q["-".charCodeAt(0)] = 62;
Q["_".charCodeAt(0)] = 63;
function ge(u) {
  var f = u.length;
  if (f % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var p = u.indexOf("=");
  p === -1 && (p = f);
  var y = p === f ? 0 : 4 - p % 4;
  return [p, y];
}
function Ye(u) {
  var f = ge(u), p = f[0], y = f[1];
  return (p + y) * 3 / 4 - y;
}
function $e(u, f, p) {
  return (f + p) * 3 / 4 - p;
}
function Ve(u) {
  var f, p = ge(u), y = p[0], v = p[1], w = new Me($e(u, y, v)), d = 0, o = v > 0 ? y - 4 : y, g;
  for (g = 0; g < o; g += 4)
    f = Q[u.charCodeAt(g)] << 18 | Q[u.charCodeAt(g + 1)] << 12 | Q[u.charCodeAt(g + 2)] << 6 | Q[u.charCodeAt(g + 3)], w[d++] = f >> 16 & 255, w[d++] = f >> 8 & 255, w[d++] = f & 255;
  return v === 2 && (f = Q[u.charCodeAt(g)] << 2 | Q[u.charCodeAt(g + 1)] >> 4, w[d++] = f & 255), v === 1 && (f = Q[u.charCodeAt(g)] << 10 | Q[u.charCodeAt(g + 1)] << 4 | Q[u.charCodeAt(g + 2)] >> 2, w[d++] = f >> 8 & 255, w[d++] = f & 255), w;
}
function qe(u) {
  return ir[u >> 18 & 63] + ir[u >> 12 & 63] + ir[u >> 6 & 63] + ir[u & 63];
}
function Je(u, f, p) {
  for (var y, v = [], w = f; w < p; w += 3)
    y = (u[w] << 16 & 16711680) + (u[w + 1] << 8 & 65280) + (u[w + 2] & 255), v.push(qe(y));
  return v.join("");
}
function ze(u) {
  for (var f, p = u.length, y = p % 3, v = [], w = 16383, d = 0, o = p - y; d < o; d += w)
    v.push(Je(u, d, d + w > o ? o : d + w));
  return y === 1 ? (f = u[p - 1], v.push(
    ir[f >> 2] + ir[f << 4 & 63] + "=="
  )) : y === 2 && (f = (u[p - 2] << 8) + u[p - 1], v.push(
    ir[f >> 10] + ir[f >> 4 & 63] + ir[f << 2 & 63] + "="
  )), v.join("");
}
var ue = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ue.read = function(u, f, p, y, v) {
  var w, d, o = v * 8 - y - 1, g = (1 << o) - 1, B = g >> 1, x = -7, F = p ? v - 1 : 0, j = p ? -1 : 1, U = u[f + F];
  for (F += j, w = U & (1 << -x) - 1, U >>= -x, x += o; x > 0; w = w * 256 + u[f + F], F += j, x -= 8)
    ;
  for (d = w & (1 << -x) - 1, w >>= -x, x += y; x > 0; d = d * 256 + u[f + F], F += j, x -= 8)
    ;
  if (w === 0)
    w = 1 - B;
  else {
    if (w === g)
      return d ? NaN : (U ? -1 : 1) * (1 / 0);
    d = d + Math.pow(2, y), w = w - B;
  }
  return (U ? -1 : 1) * d * Math.pow(2, w - y);
};
ue.write = function(u, f, p, y, v, w) {
  var d, o, g, B = w * 8 - v - 1, x = (1 << B) - 1, F = x >> 1, j = v === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, U = y ? 0 : w - 1, q = y ? 1 : -1, J = f < 0 || f === 0 && 1 / f < 0 ? 1 : 0;
  for (f = Math.abs(f), isNaN(f) || f === 1 / 0 ? (o = isNaN(f) ? 1 : 0, d = x) : (d = Math.floor(Math.log(f) / Math.LN2), f * (g = Math.pow(2, -d)) < 1 && (d--, g *= 2), d + F >= 1 ? f += j / g : f += j * Math.pow(2, 1 - F), f * g >= 2 && (d++, g /= 2), d + F >= x ? (o = 0, d = x) : d + F >= 1 ? (o = (f * g - 1) * Math.pow(2, v), d = d + F) : (o = f * Math.pow(2, F - 1) * Math.pow(2, v), d = 0)); v >= 8; u[p + U] = o & 255, U += q, o /= 256, v -= 8)
    ;
  for (d = d << v | o, B += v; B > 0; u[p + U] = d & 255, U += q, d /= 256, B -= 8)
    ;
  u[p + U - q] |= J * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(u) {
  var f = Gr, p = ue, y = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  u.Buffer = o, u.SlowBuffer = L, u.INSPECT_MAX_BYTES = 50;
  var v = 2147483647;
  u.kMaxLength = v, o.TYPED_ARRAY_SUPPORT = w(), !o.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
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
  Object.defineProperty(o.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (o.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(o.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (o.isBuffer(this))
        return this.byteOffset;
    }
  });
  function d(t) {
    if (t > v)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
    var r = new Uint8Array(t);
    return Object.setPrototypeOf(r, o.prototype), r;
  }
  function o(t, r, e) {
    if (typeof t == "number") {
      if (typeof r == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return F(t);
    }
    return g(t, r, e);
  }
  o.poolSize = 8192;
  function g(t, r, e) {
    if (typeof t == "string")
      return j(t, r);
    if (ArrayBuffer.isView(t))
      return q(t);
    if (t == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
      );
    if (X(t, ArrayBuffer) || t && X(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (X(t, SharedArrayBuffer) || t && X(t.buffer, SharedArrayBuffer)))
      return J(t, r, e);
    if (typeof t == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var n = t.valueOf && t.valueOf();
    if (n != null && n !== t)
      return o.from(n, r, e);
    var a = wr(t);
    if (a)
      return a;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof t[Symbol.toPrimitive] == "function")
      return o.from(
        t[Symbol.toPrimitive]("string"),
        r,
        e
      );
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
    );
  }
  o.from = function(t, r, e) {
    return g(t, r, e);
  }, Object.setPrototypeOf(o.prototype, Uint8Array.prototype), Object.setPrototypeOf(o, Uint8Array);
  function B(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function x(t, r, e) {
    return B(t), t <= 0 ? d(t) : r !== void 0 ? typeof e == "string" ? d(t).fill(r, e) : d(t).fill(r) : d(t);
  }
  o.alloc = function(t, r, e) {
    return x(t, r, e);
  };
  function F(t) {
    return B(t), d(t < 0 ? 0 : z(t) | 0);
  }
  o.allocUnsafe = function(t) {
    return F(t);
  }, o.allocUnsafeSlow = function(t) {
    return F(t);
  };
  function j(t, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !o.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var e = pr(t, r) | 0, n = d(e), a = n.write(t, r);
    return a !== e && (n = n.slice(0, a)), n;
  }
  function U(t) {
    for (var r = t.length < 0 ? 0 : z(t.length) | 0, e = d(r), n = 0; n < r; n += 1)
      e[n] = t[n] & 255;
    return e;
  }
  function q(t) {
    if (X(t, Uint8Array)) {
      var r = new Uint8Array(t);
      return J(r.buffer, r.byteOffset, r.byteLength);
    }
    return U(t);
  }
  function J(t, r, e) {
    if (r < 0 || t.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < r + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var n;
    return r === void 0 && e === void 0 ? n = new Uint8Array(t) : e === void 0 ? n = new Uint8Array(t, r) : n = new Uint8Array(t, r, e), Object.setPrototypeOf(n, o.prototype), n;
  }
  function wr(t) {
    if (o.isBuffer(t)) {
      var r = z(t.length) | 0, e = d(r);
      return e.length === 0 || t.copy(e, 0, 0, r), e;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || Sr(t.length) ? d(0) : U(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return U(t.data);
  }
  function z(t) {
    if (t >= v)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + v.toString(16) + " bytes");
    return t | 0;
  }
  function L(t) {
    return +t != t && (t = 0), o.alloc(+t);
  }
  o.isBuffer = function(r) {
    return r != null && r._isBuffer === !0 && r !== o.prototype;
  }, o.compare = function(r, e) {
    if (X(r, Uint8Array) && (r = o.from(r, r.offset, r.byteLength)), X(e, Uint8Array) && (e = o.from(e, e.offset, e.byteLength)), !o.isBuffer(r) || !o.isBuffer(e))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (r === e)
      return 0;
    for (var n = r.length, a = e.length, c = 0, l = Math.min(n, a); c < l; ++c)
      if (r[c] !== e[c]) {
        n = r[c], a = e[c];
        break;
      }
    return n < a ? -1 : a < n ? 1 : 0;
  }, o.isEncoding = function(r) {
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
  }, o.concat = function(r, e) {
    if (!Array.isArray(r))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (r.length === 0)
      return o.alloc(0);
    var n;
    if (e === void 0)
      for (e = 0, n = 0; n < r.length; ++n)
        e += r[n].length;
    var a = o.allocUnsafe(e), c = 0;
    for (n = 0; n < r.length; ++n) {
      var l = r[n];
      if (X(l, Uint8Array))
        c + l.length > a.length ? o.from(l).copy(a, c) : Uint8Array.prototype.set.call(
          a,
          l,
          c
        );
      else if (o.isBuffer(l))
        l.copy(a, c);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      c += l.length;
    }
    return a;
  };
  function pr(t, r) {
    if (o.isBuffer(t))
      return t.length;
    if (ArrayBuffer.isView(t) || X(t, ArrayBuffer))
      return t.byteLength;
    if (typeof t != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t
      );
    var e = t.length, n = arguments.length > 2 && arguments[2] === !0;
    if (!n && e === 0)
      return 0;
    for (var a = !1; ; )
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
          return qr(t).length;
        default:
          if (a)
            return n ? -1 : fr(t).length;
          r = ("" + r).toLowerCase(), a = !0;
      }
  }
  o.byteLength = pr;
  function cr(t, r, e) {
    var n = !1;
    if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, r >>>= 0, e <= r))
      return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return Wr(this, r, e);
        case "utf8":
        case "utf-8":
          return er(this, r, e);
        case "ascii":
          return Lr(this, r, e);
        case "latin1":
        case "binary":
          return Mr(this, r, e);
        case "base64":
          return rr(this, r, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Yr(this, r, e);
        default:
          if (n)
            throw new TypeError("Unknown encoding: " + t);
          t = (t + "").toLowerCase(), n = !0;
      }
  }
  o.prototype._isBuffer = !0;
  function D(t, r, e) {
    var n = t[r];
    t[r] = t[e], t[e] = n;
  }
  o.prototype.swap16 = function() {
    var r = this.length;
    if (r % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var e = 0; e < r; e += 2)
      D(this, e, e + 1);
    return this;
  }, o.prototype.swap32 = function() {
    var r = this.length;
    if (r % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var e = 0; e < r; e += 4)
      D(this, e, e + 3), D(this, e + 1, e + 2);
    return this;
  }, o.prototype.swap64 = function() {
    var r = this.length;
    if (r % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var e = 0; e < r; e += 8)
      D(this, e, e + 7), D(this, e + 1, e + 6), D(this, e + 2, e + 5), D(this, e + 3, e + 4);
    return this;
  }, o.prototype.toString = function() {
    var r = this.length;
    return r === 0 ? "" : arguments.length === 0 ? er(this, 0, r) : cr.apply(this, arguments);
  }, o.prototype.toLocaleString = o.prototype.toString, o.prototype.equals = function(r) {
    if (!o.isBuffer(r))
      throw new TypeError("Argument must be a Buffer");
    return this === r ? !0 : o.compare(this, r) === 0;
  }, o.prototype.inspect = function() {
    var r = "", e = u.INSPECT_MAX_BYTES;
    return r = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (r += " ... "), "<Buffer " + r + ">";
  }, y && (o.prototype[y] = o.prototype.inspect), o.prototype.compare = function(r, e, n, a, c) {
    if (X(r, Uint8Array) && (r = o.from(r, r.offset, r.byteLength)), !o.isBuffer(r))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof r
      );
    if (e === void 0 && (e = 0), n === void 0 && (n = r ? r.length : 0), a === void 0 && (a = 0), c === void 0 && (c = this.length), e < 0 || n > r.length || a < 0 || c > this.length)
      throw new RangeError("out of range index");
    if (a >= c && e >= n)
      return 0;
    if (a >= c)
      return -1;
    if (e >= n)
      return 1;
    if (e >>>= 0, n >>>= 0, a >>>= 0, c >>>= 0, this === r)
      return 0;
    for (var l = c - a, _ = n - e, T = Math.min(l, _), S = this.slice(a, c), W = r.slice(e, n), A = 0; A < T; ++A)
      if (S[A] !== W[A]) {
        l = S[A], _ = W[A];
        break;
      }
    return l < _ ? -1 : _ < l ? 1 : 0;
  };
  function $(t, r, e, n, a) {
    if (t.length === 0)
      return -1;
    if (typeof e == "string" ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, Sr(e) && (e = a ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
      if (a)
        return -1;
      e = t.length - 1;
    } else if (e < 0)
      if (a)
        e = 0;
      else
        return -1;
    if (typeof r == "string" && (r = o.from(r, n)), o.isBuffer(r))
      return r.length === 0 ? -1 : M(t, r, e, n, a);
    if (typeof r == "number")
      return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? a ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : M(t, [r], e, n, a);
    throw new TypeError("val must be string, number or Buffer");
  }
  function M(t, r, e, n, a) {
    var c = 1, l = t.length, _ = r.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || r.length < 2)
        return -1;
      c = 2, l /= 2, _ /= 2, e /= 2;
    }
    function T(Cr, Ir) {
      return c === 1 ? Cr[Ir] : Cr.readUInt16BE(Ir * c);
    }
    var S;
    if (a) {
      var W = -1;
      for (S = e; S < l; S++)
        if (T(t, S) === T(r, W === -1 ? 0 : S - W)) {
          if (W === -1 && (W = S), S - W + 1 === _)
            return W * c;
        } else
          W !== -1 && (S -= S - W), W = -1;
    } else
      for (e + _ > l && (e = l - _), S = e; S >= 0; S--) {
        for (var A = !0, gr = 0; gr < _; gr++)
          if (T(t, S + gr) !== T(r, gr)) {
            A = !1;
            break;
          }
        if (A)
          return S;
      }
    return -1;
  }
  o.prototype.includes = function(r, e, n) {
    return this.indexOf(r, e, n) !== -1;
  }, o.prototype.indexOf = function(r, e, n) {
    return $(this, r, e, n, !0);
  }, o.prototype.lastIndexOf = function(r, e, n) {
    return $(this, r, e, n, !1);
  };
  function Z(t, r, e, n) {
    e = Number(e) || 0;
    var a = t.length - e;
    n ? (n = Number(n), n > a && (n = a)) : n = a;
    var c = r.length;
    n > c / 2 && (n = c / 2);
    for (var l = 0; l < n; ++l) {
      var _ = parseInt(r.substr(l * 2, 2), 16);
      if (Sr(_))
        return l;
      t[e + l] = _;
    }
    return l;
  }
  function jr(t, r, e, n) {
    return hr(fr(r, t.length - e), t, e, n);
  }
  function Xr(t, r, e, n) {
    return hr(Ar(r), t, e, n);
  }
  function Kr(t, r, e, n) {
    return hr(qr(r), t, e, n);
  }
  function Dr(t, r, e, n) {
    return hr(yr(r, t.length - e), t, e, n);
  }
  o.prototype.write = function(r, e, n, a) {
    if (e === void 0)
      a = "utf8", n = this.length, e = 0;
    else if (n === void 0 && typeof e == "string")
      a = e, n = this.length, e = 0;
    else if (isFinite(e))
      e = e >>> 0, isFinite(n) ? (n = n >>> 0, a === void 0 && (a = "utf8")) : (a = n, n = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    var c = this.length - e;
    if ((n === void 0 || n > c) && (n = c), r.length > 0 && (n < 0 || e < 0) || e > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    a || (a = "utf8");
    for (var l = !1; ; )
      switch (a) {
        case "hex":
          return Z(this, r, e, n);
        case "utf8":
        case "utf-8":
          return jr(this, r, e, n);
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
          return Dr(this, r, e, n);
        default:
          if (l)
            throw new TypeError("Unknown encoding: " + a);
          a = ("" + a).toLowerCase(), l = !0;
      }
  }, o.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function rr(t, r, e) {
    return r === 0 && e === t.length ? f.fromByteArray(t) : f.fromByteArray(t.slice(r, e));
  }
  function er(t, r, e) {
    e = Math.min(t.length, e);
    for (var n = [], a = r; a < e; ) {
      var c = t[a], l = null, _ = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
      if (a + _ <= e) {
        var T, S, W, A;
        switch (_) {
          case 1:
            c < 128 && (l = c);
            break;
          case 2:
            T = t[a + 1], (T & 192) === 128 && (A = (c & 31) << 6 | T & 63, A > 127 && (l = A));
            break;
          case 3:
            T = t[a + 1], S = t[a + 2], (T & 192) === 128 && (S & 192) === 128 && (A = (c & 15) << 12 | (T & 63) << 6 | S & 63, A > 2047 && (A < 55296 || A > 57343) && (l = A));
            break;
          case 4:
            T = t[a + 1], S = t[a + 2], W = t[a + 3], (T & 192) === 128 && (S & 192) === 128 && (W & 192) === 128 && (A = (c & 15) << 18 | (T & 63) << 12 | (S & 63) << 6 | W & 63, A > 65535 && A < 1114112 && (l = A));
        }
      }
      l === null ? (l = 65533, _ = 1) : l > 65535 && (l -= 65536, n.push(l >>> 10 & 1023 | 55296), l = 56320 | l & 1023), n.push(l), a += _;
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
  function Lr(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var a = r; a < e; ++a)
      n += String.fromCharCode(t[a] & 127);
    return n;
  }
  function Mr(t, r, e) {
    var n = "";
    e = Math.min(t.length, e);
    for (var a = r; a < e; ++a)
      n += String.fromCharCode(t[a]);
    return n;
  }
  function Wr(t, r, e) {
    var n = t.length;
    (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
    for (var a = "", c = r; c < e; ++c)
      a += vr[t[c]];
    return a;
  }
  function Yr(t, r, e) {
    for (var n = t.slice(r, e), a = "", c = 0; c < n.length - 1; c += 2)
      a += String.fromCharCode(n[c] + n[c + 1] * 256);
    return a;
  }
  o.prototype.slice = function(r, e) {
    var n = this.length;
    r = ~~r, e = e === void 0 ? n : ~~e, r < 0 ? (r += n, r < 0 && (r = 0)) : r > n && (r = n), e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), e < r && (e = r);
    var a = this.subarray(r, e);
    return Object.setPrototypeOf(a, o.prototype), a;
  };
  function k(t, r, e) {
    if (t % 1 !== 0 || t < 0)
      throw new RangeError("offset is not uint");
    if (t + r > e)
      throw new RangeError("Trying to access beyond buffer length");
  }
  o.prototype.readUintLE = o.prototype.readUIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || k(r, e, this.length);
    for (var a = this[r], c = 1, l = 0; ++l < e && (c *= 256); )
      a += this[r + l] * c;
    return a;
  }, o.prototype.readUintBE = o.prototype.readUIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || k(r, e, this.length);
    for (var a = this[r + --e], c = 1; e > 0 && (c *= 256); )
      a += this[r + --e] * c;
    return a;
  }, o.prototype.readUint8 = o.prototype.readUInt8 = function(r, e) {
    return r = r >>> 0, e || k(r, 1, this.length), this[r];
  }, o.prototype.readUint16LE = o.prototype.readUInt16LE = function(r, e) {
    return r = r >>> 0, e || k(r, 2, this.length), this[r] | this[r + 1] << 8;
  }, o.prototype.readUint16BE = o.prototype.readUInt16BE = function(r, e) {
    return r = r >>> 0, e || k(r, 2, this.length), this[r] << 8 | this[r + 1];
  }, o.prototype.readUint32LE = o.prototype.readUInt32LE = function(r, e) {
    return r = r >>> 0, e || k(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
  }, o.prototype.readUint32BE = o.prototype.readUInt32BE = function(r, e) {
    return r = r >>> 0, e || k(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
  }, o.prototype.readIntLE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || k(r, e, this.length);
    for (var a = this[r], c = 1, l = 0; ++l < e && (c *= 256); )
      a += this[r + l] * c;
    return c *= 128, a >= c && (a -= Math.pow(2, 8 * e)), a;
  }, o.prototype.readIntBE = function(r, e, n) {
    r = r >>> 0, e = e >>> 0, n || k(r, e, this.length);
    for (var a = e, c = 1, l = this[r + --a]; a > 0 && (c *= 256); )
      l += this[r + --a] * c;
    return c *= 128, l >= c && (l -= Math.pow(2, 8 * e)), l;
  }, o.prototype.readInt8 = function(r, e) {
    return r = r >>> 0, e || k(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
  }, o.prototype.readInt16LE = function(r, e) {
    r = r >>> 0, e || k(r, 2, this.length);
    var n = this[r] | this[r + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, o.prototype.readInt16BE = function(r, e) {
    r = r >>> 0, e || k(r, 2, this.length);
    var n = this[r + 1] | this[r] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, o.prototype.readInt32LE = function(r, e) {
    return r = r >>> 0, e || k(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
  }, o.prototype.readInt32BE = function(r, e) {
    return r = r >>> 0, e || k(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
  }, o.prototype.readFloatLE = function(r, e) {
    return r = r >>> 0, e || k(r, 4, this.length), p.read(this, r, !0, 23, 4);
  }, o.prototype.readFloatBE = function(r, e) {
    return r = r >>> 0, e || k(r, 4, this.length), p.read(this, r, !1, 23, 4);
  }, o.prototype.readDoubleLE = function(r, e) {
    return r = r >>> 0, e || k(r, 8, this.length), p.read(this, r, !0, 52, 8);
  }, o.prototype.readDoubleBE = function(r, e) {
    return r = r >>> 0, e || k(r, 8, this.length), p.read(this, r, !1, 52, 8);
  };
  function Y(t, r, e, n, a, c) {
    if (!o.isBuffer(t))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (r > a || r < c)
      throw new RangeError('"value" argument is out of bounds');
    if (e + n > t.length)
      throw new RangeError("Index out of range");
  }
  o.prototype.writeUintLE = o.prototype.writeUIntLE = function(r, e, n, a) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !a) {
      var c = Math.pow(2, 8 * n) - 1;
      Y(this, r, e, n, c, 0);
    }
    var l = 1, _ = 0;
    for (this[e] = r & 255; ++_ < n && (l *= 256); )
      this[e + _] = r / l & 255;
    return e + n;
  }, o.prototype.writeUintBE = o.prototype.writeUIntBE = function(r, e, n, a) {
    if (r = +r, e = e >>> 0, n = n >>> 0, !a) {
      var c = Math.pow(2, 8 * n) - 1;
      Y(this, r, e, n, c, 0);
    }
    var l = n - 1, _ = 1;
    for (this[e + l] = r & 255; --l >= 0 && (_ *= 256); )
      this[e + l] = r / _ & 255;
    return e + n;
  }, o.prototype.writeUint8 = o.prototype.writeUInt8 = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 1, 255, 0), this[e] = r & 255, e + 1;
  }, o.prototype.writeUint16LE = o.prototype.writeUInt16LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 2, 65535, 0), this[e] = r & 255, this[e + 1] = r >>> 8, e + 2;
  }, o.prototype.writeUint16BE = o.prototype.writeUInt16BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 2, 65535, 0), this[e] = r >>> 8, this[e + 1] = r & 255, e + 2;
  }, o.prototype.writeUint32LE = o.prototype.writeUInt32LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 4, 4294967295, 0), this[e + 3] = r >>> 24, this[e + 2] = r >>> 16, this[e + 1] = r >>> 8, this[e] = r & 255, e + 4;
  }, o.prototype.writeUint32BE = o.prototype.writeUInt32BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 4, 4294967295, 0), this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255, e + 4;
  }, o.prototype.writeIntLE = function(r, e, n, a) {
    if (r = +r, e = e >>> 0, !a) {
      var c = Math.pow(2, 8 * n - 1);
      Y(this, r, e, n, c - 1, -c);
    }
    var l = 0, _ = 1, T = 0;
    for (this[e] = r & 255; ++l < n && (_ *= 256); )
      r < 0 && T === 0 && this[e + l - 1] !== 0 && (T = 1), this[e + l] = (r / _ >> 0) - T & 255;
    return e + n;
  }, o.prototype.writeIntBE = function(r, e, n, a) {
    if (r = +r, e = e >>> 0, !a) {
      var c = Math.pow(2, 8 * n - 1);
      Y(this, r, e, n, c - 1, -c);
    }
    var l = n - 1, _ = 1, T = 0;
    for (this[e + l] = r & 255; --l >= 0 && (_ *= 256); )
      r < 0 && T === 0 && this[e + l + 1] !== 0 && (T = 1), this[e + l] = (r / _ >> 0) - T & 255;
    return e + n;
  }, o.prototype.writeInt8 = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 1, 127, -128), r < 0 && (r = 255 + r + 1), this[e] = r & 255, e + 1;
  }, o.prototype.writeInt16LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 2, 32767, -32768), this[e] = r & 255, this[e + 1] = r >>> 8, e + 2;
  }, o.prototype.writeInt16BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 2, 32767, -32768), this[e] = r >>> 8, this[e + 1] = r & 255, e + 2;
  }, o.prototype.writeInt32LE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 4, 2147483647, -2147483648), this[e] = r & 255, this[e + 1] = r >>> 8, this[e + 2] = r >>> 16, this[e + 3] = r >>> 24, e + 4;
  }, o.prototype.writeInt32BE = function(r, e, n) {
    return r = +r, e = e >>> 0, n || Y(this, r, e, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255, e + 4;
  };
  function Fr(t, r, e, n, a, c) {
    if (e + n > t.length)
      throw new RangeError("Index out of range");
    if (e < 0)
      throw new RangeError("Index out of range");
  }
  function $r(t, r, e, n, a) {
    return r = +r, e = e >>> 0, a || Fr(t, r, e, 4), p.write(t, r, e, n, 23, 4), e + 4;
  }
  o.prototype.writeFloatLE = function(r, e, n) {
    return $r(this, r, e, !0, n);
  }, o.prototype.writeFloatBE = function(r, e, n) {
    return $r(this, r, e, !1, n);
  };
  function Vr(t, r, e, n, a) {
    return r = +r, e = e >>> 0, a || Fr(t, r, e, 8), p.write(t, r, e, n, 52, 8), e + 8;
  }
  o.prototype.writeDoubleLE = function(r, e, n) {
    return Vr(this, r, e, !0, n);
  }, o.prototype.writeDoubleBE = function(r, e, n) {
    return Vr(this, r, e, !1, n);
  }, o.prototype.copy = function(r, e, n, a) {
    if (!o.isBuffer(r))
      throw new TypeError("argument should be a Buffer");
    if (n || (n = 0), !a && a !== 0 && (a = this.length), e >= r.length && (e = r.length), e || (e = 0), a > 0 && a < n && (a = n), a === n || r.length === 0 || this.length === 0)
      return 0;
    if (e < 0)
      throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length)
      throw new RangeError("Index out of range");
    if (a < 0)
      throw new RangeError("sourceEnd out of bounds");
    a > this.length && (a = this.length), r.length - e < a - n && (a = r.length - e + n);
    var c = a - n;
    return this === r && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(e, n, a) : Uint8Array.prototype.set.call(
      r,
      this.subarray(n, a),
      e
    ), c;
  }, o.prototype.fill = function(r, e, n, a) {
    if (typeof r == "string") {
      if (typeof e == "string" ? (a = e, e = 0, n = this.length) : typeof n == "string" && (a = n, n = this.length), a !== void 0 && typeof a != "string")
        throw new TypeError("encoding must be a string");
      if (typeof a == "string" && !o.isEncoding(a))
        throw new TypeError("Unknown encoding: " + a);
      if (r.length === 1) {
        var c = r.charCodeAt(0);
        (a === "utf8" && c < 128 || a === "latin1") && (r = c);
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
      var _ = o.isBuffer(r) ? r : o.from(r, a), T = _.length;
      if (T === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (l = 0; l < n - e; ++l)
        this[l + e] = _[l % T];
    }
    return this;
  };
  var Rr = /[^+/0-9A-Za-z-_]/g;
  function Tr(t) {
    if (t = t.split("=")[0], t = t.trim().replace(Rr, ""), t.length < 2)
      return "";
    for (; t.length % 4 !== 0; )
      t = t + "=";
    return t;
  }
  function fr(t, r) {
    r = r || 1 / 0;
    for (var e, n = t.length, a = null, c = [], l = 0; l < n; ++l) {
      if (e = t.charCodeAt(l), e > 55295 && e < 57344) {
        if (!a) {
          if (e > 56319) {
            (r -= 3) > -1 && c.push(239, 191, 189);
            continue;
          } else if (l + 1 === n) {
            (r -= 3) > -1 && c.push(239, 191, 189);
            continue;
          }
          a = e;
          continue;
        }
        if (e < 56320) {
          (r -= 3) > -1 && c.push(239, 191, 189), a = e;
          continue;
        }
        e = (a - 55296 << 10 | e - 56320) + 65536;
      } else
        a && (r -= 3) > -1 && c.push(239, 191, 189);
      if (a = null, e < 128) {
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
  function Ar(t) {
    for (var r = [], e = 0; e < t.length; ++e)
      r.push(t.charCodeAt(e) & 255);
    return r;
  }
  function yr(t, r) {
    for (var e, n, a, c = [], l = 0; l < t.length && !((r -= 2) < 0); ++l)
      e = t.charCodeAt(l), n = e >> 8, a = e % 256, c.push(a), c.push(n);
    return c;
  }
  function qr(t) {
    return f.toByteArray(Tr(t));
  }
  function hr(t, r, e, n) {
    for (var a = 0; a < n && !(a + e >= r.length || a >= t.length); ++a)
      r[a + e] = t[a];
    return a;
  }
  function X(t, r) {
    return t instanceof r || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === r.name;
  }
  function Sr(t) {
    return t !== t;
  }
  var vr = function() {
    for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
      for (var n = e * 16, a = 0; a < 16; ++a)
        r[n + a] = t[e] + t[a];
    return r;
  }();
})(Le);
var zr = {}, Ge = {
  get exports() {
    return zr;
  },
  set exports(u) {
    zr = u;
  }
}, N = Ge.exports = {}, tr, nr;
function ie() {
  throw new Error("setTimeout has not been defined");
}
function oe() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? tr = setTimeout : tr = ie;
  } catch {
    tr = ie;
  }
  try {
    typeof clearTimeout == "function" ? nr = clearTimeout : nr = oe;
  } catch {
    nr = oe;
  }
})();
function me(u) {
  if (tr === setTimeout)
    return setTimeout(u, 0);
  if ((tr === ie || !tr) && setTimeout)
    return tr = setTimeout, setTimeout(u, 0);
  try {
    return tr(u, 0);
  } catch {
    try {
      return tr.call(null, u, 0);
    } catch {
      return tr.call(this, u, 0);
    }
  }
}
function He(u) {
  if (nr === clearTimeout)
    return clearTimeout(u);
  if ((nr === oe || !nr) && clearTimeout)
    return nr = clearTimeout, clearTimeout(u);
  try {
    return nr(u);
  } catch {
    try {
      return nr.call(null, u);
    } catch {
      return nr.call(this, u);
    }
  }
}
var ar = [], br = !1, dr, Jr = -1;
function Xe() {
  !br || !dr || (br = !1, dr.length ? ar = dr.concat(ar) : Jr = -1, ar.length && xe());
}
function xe() {
  if (!br) {
    var u = me(Xe);
    br = !0;
    for (var f = ar.length; f; ) {
      for (dr = ar, ar = []; ++Jr < f; )
        dr && dr[Jr].run();
      Jr = -1, f = ar.length;
    }
    dr = null, br = !1, He(u);
  }
}
N.nextTick = function(u) {
  var f = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var p = 1; p < arguments.length; p++)
      f[p - 1] = arguments[p];
  ar.push(new Ee(u, f)), ar.length === 1 && !br && me(xe);
};
function Ee(u, f) {
  this.fun = u, this.array = f;
}
Ee.prototype.run = function() {
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
var Nr = {}, Ke = {
  get exports() {
    return Nr;
  },
  set exports(u) {
    Nr = u;
  }
}, Br = {};
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
    return Br;
  we = 1;
  var u = I, f = Symbol.for("react.element"), p = Symbol.for("react.fragment"), y = Object.prototype.hasOwnProperty, v = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(o, g, B) {
    var x, F = {}, j = null, U = null;
    B !== void 0 && (j = "" + B), g.key !== void 0 && (j = "" + g.key), g.ref !== void 0 && (U = g.ref);
    for (x in g)
      y.call(g, x) && !w.hasOwnProperty(x) && (F[x] = g[x]);
    if (o && o.defaultProps)
      for (x in g = o.defaultProps, g)
        F[x] === void 0 && (F[x] = g[x]);
    return { $$typeof: f, type: o, key: j, ref: U, props: F, _owner: v.current };
  }
  return Br.Fragment = p, Br.jsx = d, Br.jsxs = d, Br;
}
var Ur = {}, ye;
function Ze() {
  return ye || (ye = 1, zr.env.NODE_ENV !== "production" && function() {
    var u = I, f = Symbol.for("react.element"), p = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), o = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), x = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), U = Symbol.for("react.offscreen"), q = Symbol.iterator, J = "@@iterator";
    function wr(i) {
      if (i === null || typeof i != "object")
        return null;
      var s = q && i[q] || i[J];
      return typeof s == "function" ? s : null;
    }
    var z = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function L(i) {
      {
        for (var s = arguments.length, h = new Array(s > 1 ? s - 1 : 0), m = 1; m < s; m++)
          h[m - 1] = arguments[m];
        pr("error", i, h);
      }
    }
    function pr(i, s, h) {
      {
        var m = z.ReactDebugCurrentFrame, R = m.getStackAddendum();
        R !== "" && (s += "%s", h = h.concat([R]));
        var C = h.map(function(b) {
          return String(b);
        });
        C.unshift("Warning: " + s), Function.prototype.apply.call(console[i], console, C);
      }
    }
    var cr = !1, D = !1, $ = !1, M = !1, Z = !1, jr;
    jr = Symbol.for("react.module.reference");
    function Xr(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === y || i === w || Z || i === v || i === B || i === x || M || i === U || cr || D || $ || typeof i == "object" && i !== null && (i.$$typeof === j || i.$$typeof === F || i.$$typeof === d || i.$$typeof === o || i.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === jr || i.getModuleId !== void 0));
    }
    function Kr(i, s, h) {
      var m = i.displayName;
      if (m)
        return m;
      var R = s.displayName || s.name || "";
      return R !== "" ? h + "(" + R + ")" : h;
    }
    function Dr(i) {
      return i.displayName || "Context";
    }
    function rr(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && L("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
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
        case B:
          return "Suspense";
        case x:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case o:
            var s = i;
            return Dr(s) + ".Consumer";
          case d:
            var h = i;
            return Dr(h._context) + ".Provider";
          case g:
            return Kr(i, i.render, "ForwardRef");
          case F:
            var m = i.displayName || null;
            return m !== null ? m : rr(i.type) || "Memo";
          case j: {
            var R = i, C = R._payload, b = R._init;
            try {
              return rr(b(C));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var er = Object.assign, sr = 0, Pr, Lr, Mr, Wr, Yr, k, Y;
    function Fr() {
    }
    Fr.__reactDisabledLog = !0;
    function $r() {
      {
        if (sr === 0) {
          Pr = console.log, Lr = console.info, Mr = console.warn, Wr = console.error, Yr = console.group, k = console.groupCollapsed, Y = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: Fr,
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
    function Vr() {
      {
        if (sr--, sr === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: er({}, i, {
              value: Pr
            }),
            info: er({}, i, {
              value: Lr
            }),
            warn: er({}, i, {
              value: Mr
            }),
            error: er({}, i, {
              value: Wr
            }),
            group: er({}, i, {
              value: Yr
            }),
            groupCollapsed: er({}, i, {
              value: k
            }),
            groupEnd: er({}, i, {
              value: Y
            })
          });
        }
        sr < 0 && L("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Rr = z.ReactCurrentDispatcher, Tr;
    function fr(i, s, h) {
      {
        if (Tr === void 0)
          try {
            throw Error();
          } catch (R) {
            var m = R.stack.trim().match(/\n( *(at )?)/);
            Tr = m && m[1] || "";
          }
        return `
` + Tr + i;
      }
    }
    var Ar = !1, yr;
    {
      var qr = typeof WeakMap == "function" ? WeakMap : Map;
      yr = new qr();
    }
    function hr(i, s) {
      if (!i || Ar)
        return "";
      {
        var h = yr.get(i);
        if (h !== void 0)
          return h;
      }
      var m;
      Ar = !0;
      var R = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var C;
      C = Rr.current, Rr.current = null, $r();
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
            } catch (or) {
              m = or;
            }
            Reflect.construct(i, [], b);
          } else {
            try {
              b.call();
            } catch (or) {
              m = or;
            }
            i.call(b.prototype);
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
          for (var E = or.stack.split(`
`), V = m.stack.split(`
`), O = E.length - 1, P = V.length - 1; O >= 1 && P >= 0 && E[O] !== V[P]; )
            P--;
          for (; O >= 1 && P >= 0; O--, P--)
            if (E[O] !== V[P]) {
              if (O !== 1 || P !== 1)
                do
                  if (O--, P--, P < 0 || E[O] !== V[P]) {
                    var K = `
` + E[O].replace(" at new ", " at ");
                    return i.displayName && K.includes("<anonymous>") && (K = K.replace("<anonymous>", i.displayName)), typeof i == "function" && yr.set(i, K), K;
                  }
                while (O >= 1 && P >= 0);
              break;
            }
        }
      } finally {
        Ar = !1, Rr.current = C, Vr(), Error.prepareStackTrace = R;
      }
      var xr = i ? i.displayName || i.name : "", de = xr ? fr(xr) : "";
      return typeof i == "function" && yr.set(i, de), de;
    }
    function X(i, s, h) {
      return hr(i, !1);
    }
    function Sr(i) {
      var s = i.prototype;
      return !!(s && s.isReactComponent);
    }
    function vr(i, s, h) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return hr(i, Sr(i));
      if (typeof i == "string")
        return fr(i);
      switch (i) {
        case B:
          return fr("Suspense");
        case x:
          return fr("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case g:
            return X(i.render);
          case F:
            return vr(i.type, s, h);
          case j: {
            var m = i, R = m._payload, C = m._init;
            try {
              return vr(C(R), s, h);
            } catch {
            }
          }
        }
      return "";
    }
    var t = Object.prototype.hasOwnProperty, r = {}, e = z.ReactDebugCurrentFrame;
    function n(i) {
      if (i) {
        var s = i._owner, h = vr(i.type, i._source, s ? s.type : null);
        e.setExtraStackFrame(h);
      } else
        e.setExtraStackFrame(null);
    }
    function a(i, s, h, m, R) {
      {
        var C = Function.call.bind(t);
        for (var b in i)
          if (C(i, b)) {
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
            E && !(E instanceof Error) && (n(R), L("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", h, b, typeof E), n(null)), E instanceof Error && !(E.message in r) && (r[E.message] = !0, n(R), L("Failed %s type: %s", h, E.message), n(null));
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
    function W(i) {
      if (T(i))
        return L("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", _(i)), S(i);
    }
    var A = z.ReactCurrentOwner, gr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Cr, Ir, Qr;
    Qr = {};
    function Fe(i) {
      if (t.call(i, "ref")) {
        var s = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (s && s.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function Re(i) {
      if (t.call(i, "key")) {
        var s = Object.getOwnPropertyDescriptor(i, "key").get;
        if (s && s.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function Te(i, s) {
      if (typeof i.ref == "string" && A.current && s && A.current.stateNode !== s) {
        var h = rr(A.current.type);
        Qr[h] || (L('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', rr(A.current.type), i.ref), Qr[h] = !0);
      }
    }
    function Ae(i, s) {
      {
        var h = function() {
          Cr || (Cr = !0, L("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        h.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: h,
          configurable: !0
        });
      }
    }
    function Se(i, s) {
      {
        var h = function() {
          Ir || (Ir = !0, L("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        h.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: h,
          configurable: !0
        });
      }
    }
    var Ce = function(i, s, h, m, R, C, b) {
      var E = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: f,
        // Built-in properties that belong on the element
        type: i,
        key: s,
        ref: h,
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
    function Ie(i, s, h, m, R) {
      {
        var C, b = {}, E = null, V = null;
        h !== void 0 && (W(h), E = "" + h), Re(s) && (W(s.key), E = "" + s.key), Fe(s) && (V = s.ref, Te(s, R));
        for (C in s)
          t.call(s, C) && !gr.hasOwnProperty(C) && (b[C] = s[C]);
        if (i && i.defaultProps) {
          var O = i.defaultProps;
          for (C in O)
            b[C] === void 0 && (b[C] = O[C]);
        }
        if (E || V) {
          var P = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          E && Ae(b, P), V && Se(b, P);
        }
        return Ce(i, E, V, R, m, A.current, b);
      }
    }
    var Zr = z.ReactCurrentOwner, ce = z.ReactDebugCurrentFrame;
    function mr(i) {
      if (i) {
        var s = i._owner, h = vr(i.type, i._source, s ? s.type : null);
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
          var i = rr(Zr.current.type);
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
          var s = i.fileName.replace(/^.*[\\\/]/, ""), h = i.lineNumber;
          return `

Check your code at ` + s + ":" + h + ".";
        }
        return "";
      }
    }
    var fe = {};
    function Ue(i) {
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
        var h = Ue(s);
        if (fe[h])
          return;
        fe[h] = !0;
        var m = "";
        i && i._owner && i._owner !== Zr.current && (m = " It was passed a child from " + rr(i._owner.type) + "."), mr(i), L('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', h, m), mr(null);
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
          var R = wr(i);
          if (typeof R == "function" && R !== i.entries)
            for (var C = R.call(i), b; !(b = C.next()).done; )
              ee(b.value) && le(b.value, s);
        }
      }
    }
    function ke(i) {
      {
        var s = i.type;
        if (s == null || typeof s == "string")
          return;
        var h;
        if (typeof s == "function")
          h = s.propTypes;
        else if (typeof s == "object" && (s.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        s.$$typeof === F))
          h = s.propTypes;
        else
          return;
        if (h) {
          var m = rr(s);
          a(h, i.props, "prop", m, i);
        } else if (s.PropTypes !== void 0 && !re) {
          re = !0;
          var R = rr(s);
          L("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", R || "Unknown");
        }
        typeof s.getDefaultProps == "function" && !s.getDefaultProps.isReactClassApproved && L("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Oe(i) {
      {
        for (var s = Object.keys(i.props), h = 0; h < s.length; h++) {
          var m = s[h];
          if (m !== "children" && m !== "key") {
            mr(i), L("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), mr(null);
            break;
          }
        }
        i.ref !== null && (mr(i), L("Invalid attribute `ref` supplied to `React.Fragment`."), mr(null));
      }
    }
    function he(i, s, h, m, R, C) {
      {
        var b = Xr(i);
        if (!b) {
          var E = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var V = Be(R);
          V ? E += V : E += se();
          var O;
          i === null ? O = "null" : l(i) ? O = "array" : i !== void 0 && i.$$typeof === f ? (O = "<" + (rr(i.type) || "Unknown") + " />", E = " Did you accidentally export a JSX literal instead of a component?") : O = typeof i, L("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", O, E);
        }
        var P = Ie(i, s, h, R, C);
        if (P == null)
          return P;
        if (b) {
          var K = s.children;
          if (K !== void 0)
            if (m)
              if (l(K)) {
                for (var xr = 0; xr < K.length; xr++)
                  pe(K[xr], i);
                Object.freeze && Object.freeze(K);
              } else
                L("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              pe(K, i);
        }
        return i === y ? Oe(P) : ke(P), P;
      }
    }
    function Ne(i, s, h) {
      return he(i, s, h, !0);
    }
    function je(i, s, h) {
      return he(i, s, h, !1);
    }
    var De = je, Pe = Ne;
    Ur.Fragment = y, Ur.jsx = De, Ur.jsxs = Pe;
  }()), Ur;
}
(function(u) {
  zr.env.NODE_ENV === "production" ? u.exports = Qe() : u.exports = Ze();
})(Ke);
const rt = Nr.Fragment, H = Nr.jsx, Or = Nr.jsxs;
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
    var f = {}.hasOwnProperty;
    function p() {
      for (var y = [], v = 0; v < arguments.length; v++) {
        var w = arguments[v];
        if (w) {
          var d = typeof w;
          if (d === "string" || d === "number")
            y.push(w);
          else if (Array.isArray(w)) {
            if (w.length) {
              var o = p.apply(null, w);
              o && y.push(o);
            }
          } else if (d === "object") {
            if (w.toString !== Object.prototype.toString && !w.toString.toString().includes("[native code]")) {
              y.push(w.toString());
              continue;
            }
            for (var g in w)
              f.call(w, g) && w[g] && y.push(g);
          }
        }
      }
      return y.join(" ");
    }
    u.exports ? (p.default = p, u.exports = p) : window.classNames = p;
  })();
})(et);
const _r = ae, Hr = I.createContext(null);
function mt({
  children: u
}) {
  const [f, p] = I.useState(), y = I.useCallback(
    (w, d) => p((o) => ({ ...o || {}, [w]: d })),
    []
  ), v = I.useMemo(
    () => ({
      widgetState: f || null,
      setWidgetState: y
    }),
    [f, y]
  );
  return /* @__PURE__ */ H(Hr.Provider, { value: v, children: u });
}
const tt = "_ring_7tcsj_47", nt = "_popupButton__container_7tcsj_5", it = "_popupButton_7tcsj_5", ot = "_icon_7tcsj_23", at = "_inactiveIcon_7tcsj_31", ut = "_activeIcon_7tcsj_35", ct = "_notif_7tcsj_39", st = "_pinging_7tcsj_43", ft = "_ping_7tcsj_43", G = {
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
  showNoti: f,
  isOpen: p,
  clickHandler: y
}) {
  const v = _e(), w = I.useContext(Hr), d = w == null ? void 0 : w.widgetState, o = d == null ? void 0 : d.foundNft, g = o && JSON.parse(o).itemId, B = !p && (o ? !v.includes(o) && !!g : !1), [x, F] = I.useState(B);
  return I.useEffect(() => {
    F(B);
  }, [B]), /* @__PURE__ */ Or(
    "div",
    {
      className: _r(G.popupButton__container, {
        [G["popupButton__container--open"]]: p
      }),
      children: [
        /* @__PURE__ */ H(
          "span",
          {
            className: x ? G.ring : void 0,
            style: { boxShadow: "none" }
          }
        ),
        /* @__PURE__ */ Or(
          "button",
          {
            className: G.popupButton,
            type: "button",
            onClick: (j) => {
              F(!1), o && lt(o), y(j);
            },
            children: [
              /* @__PURE__ */ H(
                "div",
                {
                  className: _r(G.icon, {
                    [G.activeIcon]: !p,
                    [G.inactiveIcon]: p
                  }),
                  children: /* @__PURE__ */ H(
                    "img",
                    {
                      alt: "WalletChat",
                      src: "https://uploads-ssl.webflow.com/62d761bae8bf2da003f57b06/62d761bae8bf2dea68f57b52_walletchat%20logo.png",
                      style: { height: "90%" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ H(
                "div",
                {
                  className: _r(G.icon, {
                    [G.activeIcon]: p,
                    [G.inactiveIcon]: !p
                  }),
                  children: /* @__PURE__ */ H(
                    "svg",
                    {
                      focusable: "false",
                      viewBox: "0 0 16 14",
                      width: "28",
                      height: "25",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /* @__PURE__ */ H(
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
        f && /* @__PURE__ */ Or(rt, { children: [
          /* @__PURE__ */ H("span", { className: _r(G.notif, G.pinging) }),
          /* @__PURE__ */ H("span", { className: G.notif, children: u })
        ] })
      ]
    }
  );
}
const ht = "_ring_q714d_1", kr = {
  ring: ht,
  "wallet-chat-widget": "_wallet-chat-widget_q714d_23",
  "widget-is-open": "_widget-is-open_q714d_9",
  "widget-is-closed": "_widget-is-closed_q714d_13",
  "wallet-chat-widget__container": "_wallet-chat-widget__container_q714d_23",
  "wallet-chat-widget__container--open": "_wallet-chat-widget__container--open_q714d_27"
}, ve = "https://staging.walletchat.fun", be = kr["wallet-chat-widget"];
function lr(u) {
  var p;
  if (typeof document > "u")
    return;
  const f = document == null ? void 0 : document.getElementById(be);
  (p = f == null ? void 0 : f.contentWindow) == null || p.postMessage(u, "*");
}
function dt(u) {
  lr({ target: "sign_in", data: u || null });
}
function xt({
  connectedWallet: u,
  signMessage: f,
  requestSignature: p,
  style: y
}) {
  const [v, w] = I.useState(ve), d = I.useRef(""), o = I.useRef(null), g = I.useRef(u), B = I.useRef(!1), x = I.useRef(!1), F = I.useContext(Hr), { widgetState: j, setWidgetState: U } = F || {}, { ownerAddress: q } = j || {}, [J, wr] = I.useState(x.current), [z, L] = I.useState(0), pr = () => {
    wr((D) => {
      const $ = !!D;
      return o.current && !$ && lr({
        target: "nft_info",
        data: { ...o.current, redirect: !0 }
      }), o.current = null, x.current = !$, !$;
    });
  }, cr = I.useCallback(() => {
    u && (J || p) && dt({ ...u, requestSignature: p });
  }, [u, J, p]);
  return I.useEffect(() => {
    cr();
  }, [cr]), I.useEffect(() => {
    if (!(q != null && q.address))
      return;
    const D = q.address, $ = ne(window.location.href);
    $.network && (o.current = {
      ...$,
      ownerAddress: D
    }), o.current ? lr({
      target: "nft_info",
      data: { ...o.current, redirect: !0 }
    }) : lr({ target: "nft_info", data: { ownerAddress: D } }), wr(!0);
  }, [q]), I.useEffect(() => {
    const D = () => {
      if (window.location.href === d.current)
        return;
      d.current = window.location.href;
      const Z = ne(window.location.href);
      U && U("foundNft", JSON.stringify(Z)), Z.network && (o.current = Z), lr({ target: "nft_info", data: Z });
    }, $ = new MutationObserver(D), M = { subtree: !0, childList: !0 };
    return D(), $.observe(document, M), () => $.disconnect();
  }, [U]), I.useEffect(() => {
    g.current = u;
  }, [u]), I.useEffect(() => {
    const D = ($) => {
      const M = $.data;
      B.current || lr({
        target: "origin",
        data: {
          domain: window.location.host,
          origin: window.location.protocol + window.location.host
        }
      }), M.target === "url_env" && M.data !== ve && w(M.data), M.target === "unread_cnt" && L(M.data), M.target === "message_to_sign" && f && g.current && f({ message: M.data }).then(
        (Z) => Z && lr({
          target: "signed_message",
          data: { signature: Z, signedMsg: M.data }
        })
      ).catch(
        () => lr({
          target: "signed_message",
          data: { signature: null, signedMsg: M.data }
        })
      ), M.target === "close_widget" && pr(), M.target === "is_signed_in" && !M.data && cr();
    };
    return window.addEventListener("message", D), () => window.removeEventListener("message", D);
  }, [f, cr]), /* @__PURE__ */ Or(
    "div",
    {
      className: _r(kr["wallet-chat-widget__container"], {
        [kr["wallet-chat-widget__container--open"]]: J
      }),
      style: y,
      children: [
        /* @__PURE__ */ H(
          "iframe",
          {
            title: "WalletChat",
            name: "WalletChat",
            id: be,
            className: _r("", {
              [kr["widget-is-open"]]: J,
              [kr["widget-is-closed"]]: !J
            }),
            src: v
          }
        ),
        /* @__PURE__ */ H(
          pt,
          {
            notiVal: z,
            showNoti: z > 0,
            isOpen: J,
            clickHandler: pr
          }
        )
      ]
    }
  );
}
const wt = ({
  onClick: u,
  children: f
}) => /* @__PURE__ */ H("button", { type: "button", onClick: u, children: f }), Et = ({
  ownerAddress: u,
  render: f
}) => {
  const p = I.useContext(Hr), y = p == null ? void 0 : p.setWidgetState, v = f ? ({ onClick: w, children: d }) => I.cloneElement(f, { onClick: w }, d) : wt;
  return p ? /* @__PURE__ */ Or(
    v,
    {
      onClick: () => y && y("ownerAddress", {
        address: u,
        lastRequest: Date.now().toString()
      }),
      children: [
        /* @__PURE__ */ H(
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
