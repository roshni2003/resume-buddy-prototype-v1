function e(e, t = String) {
	const n = new URLSearchParams();
	for (const r in e) {
		const i = e[r];
		i !== void 0 && n.set(r, t(i));
	}
	return n.toString();
}
function t(e) {
	return e ? (e === `false` ? !1 : e === `true` ? !0 : e * 0 == 0 && +e + `` === e ? +e : e) : ``;
}
function n(e) {
	const n = new URLSearchParams(e),
		r = Object.create(null);
	for (const [e, i] of n.entries()) {
		const n = r[e];
		n == null ? (r[e] = t(i)) : Array.isArray(n) ? n.push(t(i)) : (r[e] = [n, t(i)]);
	}
	return r;
}
export { e as n, n as t };
