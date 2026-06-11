import { o as e, t } from "./jsx-runtime-D7jARjhZ.js";
import { n as oe, t as se } from "./qss-BbplFIp1.js";
import { t as n } from "./react-BZSX5Bs9.js";
import {
	T as _,
	t as A,
	C as a,
	W as b,
	d as C,
	F as c,
	k as D,
	L as d,
	j as E,
	o as ee,
	M as f,
	R as g,
	P as h,
	B as i,
	x as ie,
	r as k,
	O as m,
	v as ne,
	m as O,
	D as o,
	N as p,
	A as r,
	w as re,
	b as S,
	E as s,
	i as T,
	p as te,
	H as u,
	U as v,
	h as w,
	_ as x,
	V as y,
} from "./useStore-KX9e-E04.js";
import { c as j, o as M, r as N } from "./with-selector-DTFISeXP.js";

function ce() {
	try {
		return typeof window < `u` && typeof window.sessionStorage == `object` ? window.sessionStorage : void 0;
	} catch {
		return;
	}
}
var le = `tsr-scroll-restoration-v1_3`;
function ue() {
	const e = ce();
	if (!e) return null;
	let t = {};
	try {
		const n = JSON.parse(e.getItem(`tsr-scroll-restoration-v1_3`) || `{}`);
		i(n) && (t = n);
	} catch {}
	return {
		get state() {
			return t;
		},
		set: (e) => {
			t = d(e, t) || t;
		},
		persist: () => {
			try {
				e.setItem(le, JSON.stringify(t));
			} catch {}
		},
	};
}
var de = ue(),
	fe = (e) => e.state.__TSR_key || e.href;
function pe(e) {
	let t = [],
		n;
	for (; (n = e.parentNode); )
		t.push(`${e.tagName}:nth-child(${Array.prototype.indexOf.call(n.children, e) + 1})`), (e = n);
	return `${t.reverse().join(` > `)}`.toLowerCase();
}
var P = !1,
	F = `window`,
	me = `data-scroll-restoration-id`;
function he(e, t) {
	if (!de) return;
	const n = de;
	if (((t ?? e.options.scrollRestoration ?? !1) && (e.isScrollRestoring = !0), e.isScrollRestorationSetup || !n))
		return;
	(e.isScrollRestorationSetup = !0), (P = !1);
	const r = e.options.getScrollRestorationKey || fe,
		a = new Map();
	window.history.scrollRestoration = `manual`;
	const o = (t) => {
			if (!(P || !e.isScrollRestoring))
				if (t.target === document || t.target === window)
					a.set(F, { scrollX: window.scrollX || 0, scrollY: window.scrollY || 0 });
				else {
					const e = t.target;
					a.set(e, { scrollX: e.scrollLeft || 0, scrollY: e.scrollTop || 0 });
				}
		},
		s = (t) => {
			if (!e.isScrollRestoring || !t || a.size === 0 || !n) return;
			const r = (n.state[t] ||= {});
			for (const [e, t] of a) {
				let n;
				if (e === F) n = F;
				else if (e.isConnected) {
					const t = e.getAttribute(me);
					n = t ? `[${me}="${t}"]` : pe(e);
				}
				n && (r[n] = t);
			}
		};
	document.addEventListener(`scroll`, o, !0),
		e.subscribe(`onBeforeLoad`, (e) => {
			s(e.fromLocation ? r(e.fromLocation) : void 0), a.clear();
		}),
		window.addEventListener(`pagehide`, () => {
			s(r(e.stores.resolvedLocation.get() ?? e.stores.location.get())), n.persist();
		}),
		e.subscribe(`onRendered`, (t) => {
			const o = r(t.toLocation),
				s = e.options.scrollRestorationBehavior,
				c = e.options.scrollToTopSelectors;
			if ((a.clear(), !e.resetNextScroll)) {
				e.resetNextScroll = !0;
				return;
			}
			if (
				!(
					typeof e.options.scrollRestoration == `function` &&
					!e.options.scrollRestoration({ location: e.latestLocation })
				)
			) {
				P = !0;
				try {
					let t = e.isScrollRestoring ? n.state[o] : void 0,
						r = !1;
					if (t)
						for (const e in t) {
							const n = t[e];
							if (!i(n)) continue;
							const { scrollX: a, scrollY: o } = n;
							if (!(!Number.isFinite(a) || !Number.isFinite(o))) {
								if (e === F) window.scrollTo({ top: o, left: a, behavior: s }), (r = !0);
								else if (e) {
									let t;
									try {
										t = document.querySelector(e);
									} catch {
										continue;
									}
									t && ((t.scrollLeft = a), (t.scrollTop = o), (r = !0));
								}
							}
						}
					if (!r) {
						const t = e.history.location.hash.slice(1);
						if (t) {
							const e = window.history.state?.__hashScrollIntoViewOptions ?? !0;
							if (e) {
								const n = document.getElementById(t);
								n && n.scrollIntoView(e);
							}
						} else {
							const e = { top: 0, left: 0, behavior: s };
							if ((window.scrollTo(e), c))
								for (const t of c) {
									if (t === F) continue;
									const n = typeof t == `function` ? t() : document.querySelector(t);
									n && n.scrollTo(e);
								}
						}
					}
				} finally {
					P = !1;
				}
				e.isScrollRestoring && n.set((e) => ((e[o] ||= {}), e));
			}
		});
}
var ge = ve(JSON.parse),
	_e = ye(JSON.stringify, JSON.parse);
function ve(e) {
	return (t) => {
		t[0] === `?` && (t = t.substring(1));
		const n = se(t);
		for (const t in n) {
			const r = n[t];
			if (typeof r == `string`)
				try {
					n[t] = e(r);
				} catch {}
		}
		return n;
	};
}
function ye(e, t) {
	const n = typeof t == `function`;
	function r(r) {
		if (typeof r == `object` && r)
			try {
				return e(r);
			} catch {}
		else if (n && typeof r == `string`)
			try {
				return t(r), e(r);
			} catch {}
		return r;
	}
	return (e) => {
		const t = oe(e, r);
		return t ? `?${t}` : ``;
	};
}
function be(e) {
	return {
		input: ({ url: t }) => {
			for (const n of e) t = I(n, t);
			return t;
		},
		output: ({ url: t }) => {
			for (let n = e.length - 1; n >= 0; n--) t = Se(e[n], t);
			return t;
		},
	};
}
function xe(e) {
	const t = ie(e.basepath),
		n = `/${t}`,
		r = `${n}/`,
		i = e.caseSensitive ? n : n.toLowerCase(),
		a = e.caseSensitive ? r : r.toLowerCase();
	return {
		input: ({ url: t }) => {
			const r = e.caseSensitive ? t.pathname : t.pathname.toLowerCase();
			return r === i ? (t.pathname = `/`) : r.startsWith(a) && (t.pathname = t.pathname.slice(n.length)), t;
		},
		output: ({ url: e }) => ((e.pathname = ne([`/`, t, e.pathname])), e),
	};
}
function I(e, t) {
	const n = e?.input?.({ url: t });
	if (n) {
		if (typeof n == `string`) return new URL(n);
		if (n instanceof URL) return n;
	}
	return t;
}
function Se(e, t) {
	const n = e?.output?.({ url: t });
	if (n) {
		if (typeof n == `string`) return new URL(n);
		if (n instanceof URL) return n;
	}
	return t;
}
function Ce(e) {
	let t = e;
	return {
		get() {
			return t;
		},
		set(e) {
			t = d(e, t);
		},
	};
}
function we(e) {
	return {
		get() {
			return e();
		},
	};
}
function Te(e, t) {
	const { createMutableStore: n, createReadonlyStore: r, batch: i, init: a } = t,
		o = new Map(),
		s = new Map(),
		c = new Map(),
		l = n(e.status),
		u = n(e.loadedAt),
		d = n(e.isLoading),
		f = n(e.isTransitioning),
		p = n(e.location),
		m = n(e.resolvedLocation),
		h = n(e.statusCode),
		g = n(e.redirect),
		_ = n([]),
		v = n([]),
		y = n([]),
		b = r(() => L(o, _.get())),
		x = r(() => L(s, v.get())),
		S = r(() => L(c, y.get())),
		C = r(() => _.get()[0]),
		w = r(() => _.get().some((e) => o.get(e)?.get().status === `pending`)),
		T = r(() => ({ locationHref: p.get().href, resolvedLocationHref: m.get()?.href, status: l.get() })),
		E = r(() => ({
			status: l.get(),
			loadedAt: u.get(),
			isLoading: d.get(),
			isTransitioning: f.get(),
			matches: b.get(),
			location: p.get(),
			resolvedLocation: m.get(),
			statusCode: h.get(),
			redirect: g.get(),
		})),
		O = D(64);
	function ee(e) {
		let t = O.get(e);
		return (
			t ||
				((t = r(() => {
					const t = _.get();
					for (const n of t) {
						const t = o.get(n);
						if (t && t.routeId === e) return t.get();
					}
				})),
				O.set(e, t)),
			t
		);
	}
	const te = {
		status: l,
		loadedAt: u,
		isLoading: d,
		isTransitioning: f,
		location: p,
		resolvedLocation: m,
		statusCode: h,
		redirect: g,
		matchesId: _,
		pendingIds: v,
		cachedIds: y,
		matches: b,
		pendingMatches: x,
		cachedMatches: S,
		firstId: C,
		hasPending: w,
		matchRouteDeps: T,
		matchStores: o,
		pendingMatchStores: s,
		cachedMatchStores: c,
		__store: E,
		getRouteMatchStore: ee,
		setMatches: k,
		setPending: A,
		setCached: ne,
	};
	k(e.matches), a?.(te);
	function k(e) {
		R(e, o, _, n, i);
	}
	function A(e) {
		R(e, s, v, n, i);
	}
	function ne(e) {
		R(e, c, y, n, i);
	}
	return te;
}
function L(e, t) {
	const n = [];
	for (const r of t) {
		const t = e.get(r);
		t && n.push(t.get());
	}
	return n;
}
function R(e, t, n, r, i) {
	const a = e.map((e) => e.id),
		o = new Set(a);
	i(() => {
		for (const e of t.keys()) o.has(e) || t.delete(e);
		for (const n of e) {
			const e = t.get(n.id);
			if (!e) {
				const e = r(n);
				(e.routeId = n.routeId), t.set(n.id, e);
				continue;
			}
			(e.routeId = n.routeId), e.get() !== n && e.set(n);
		}
		E(n.get(), a) || n.set(a);
	});
}
var Ee = (e) => {
		if (!e.rendered) return (e.rendered = !0), e.onReady?.();
	},
	De = (e) => e.stores.matchesId.get().some((t) => e.stores.matchStores.get(t)?.get()._forcePending),
	z = (e, t) => !!(e.preload && !e.router.stores.matchStores.has(t)),
	B = (e, t, n = !0) => {
		const r = { ...(e.router.options.context ?? {}) },
			i = n ? t : t - 1;
		for (let t = 0; t <= i; t++) {
			const n = e.matches[t];
			if (!n) continue;
			const i = e.router.getMatch(n.id);
			i && Object.assign(r, i.__routeContext, i.__beforeLoadContext);
		}
		return r;
	},
	Oe = (e, t) => {
		if (!e.matches.length) return;
		let n = t.routeId,
			r = e.matches.findIndex((t) => t.routeId === e.router.routeTree.id),
			i = r >= 0 ? r : 0,
			a = n ? e.matches.findIndex((e) => e.routeId === n) : (e.firstBadMatchIndex ?? e.matches.length - 1);
		a < 0 && (a = i);
		for (let t = a; t >= 0; t--) {
			const n = e.matches[t];
			if (e.router.looseRoutesById[n.routeId].options.notFoundComponent) return t;
		}
		return n ? a : i;
	},
	V = (e, t, n) => {
		if (!(!N(n) && !M(n)))
			throw N(n) && n.redirectHandled && !n.options.reloadDocument
				? n
				: (t &&
						(t._nonReactive.beforeLoadPromise?.resolve(),
						t._nonReactive.loaderPromise?.resolve(),
						(t._nonReactive.beforeLoadPromise = void 0),
						(t._nonReactive.loaderPromise = void 0),
						(t._nonReactive.error = n),
						e.updateMatch(t.id, (r) => ({
							...r,
							status: N(n) ? `redirected` : M(n) ? `notFound` : r.status === `pending` ? `success` : r.status,
							context: B(e, t.index),
							isFetching: !1,
							error: n,
						})),
						M(n) && !n.routeId && (n.routeId = t.routeId),
						t._nonReactive.loadPromise?.resolve()),
					N(n) &&
						((e.rendered = !0),
						(n.options._fromLocation = e.location),
						(n.redirectHandled = !0),
						(n = e.router.resolveRedirect(n))),
					n);
	},
	ke = (e, t) => {
		const n = e.router.getMatch(t);
		return !!(!n || n._nonReactive.dehydrated);
	},
	Ae = (e, t, n) => {
		const r = B(e, n);
		e.updateMatch(t, (e) => ({ ...e, context: r }));
	},
	H = (e, t, n, r) => {
		const { id: i, routeId: a } = e.matches[t],
			o = e.router.looseRoutesById[a];
		if (n instanceof Promise) throw n;
		(n.routerCode = r), (e.firstBadMatchIndex ??= t), V(e, e.router.getMatch(i), n);
		try {
			o.options.onError?.(n);
		} catch (t) {
			(n = t), V(e, e.router.getMatch(i), n);
		}
		e.updateMatch(
			i,
			(e) => (
				e._nonReactive.beforeLoadPromise?.resolve(),
				(e._nonReactive.beforeLoadPromise = void 0),
				e._nonReactive.loadPromise?.resolve(),
				{
					...e,
					error: n,
					status: `error`,
					isFetching: !1,
					updatedAt: Date.now(),
					abortController: new AbortController(),
				}
			),
		),
			!e.preload && !N(n) && !M(n) && (e.serialError ??= n);
	},
	je = (e, t, n, r) => {
		if (r._nonReactive.pendingTimeout !== void 0) return;
		const i = n.options.pendingMs ?? e.router.options.defaultPendingMs;
		if (
			e.onReady &&
			!z(e, t) &&
			(n.options.loader || n.options.beforeLoad || Ve(n)) &&
			typeof i == `number` &&
			i !== 1 / 0 &&
			(n.options.pendingComponent ?? e.router.options?.defaultPendingComponent)
		) {
			const t = setTimeout(() => {
				Ee(e);
			}, i);
			r._nonReactive.pendingTimeout = t;
		}
	},
	Me = (e, t, n) => {
		const r = e.router.getMatch(t);
		if (!r._nonReactive.beforeLoadPromise && !r._nonReactive.loaderPromise) return;
		je(e, t, n, r);
		const i = () => {
			const n = e.router.getMatch(t);
			n.preload && (n.status === `redirected` || n.status === `notFound`) && V(e, n, n.error);
		};
		return r._nonReactive.beforeLoadPromise ? r._nonReactive.beforeLoadPromise.then(i) : i();
	},
	Ne = (e, t, n, r) => {
		let i = e.router.getMatch(t),
			a = i._nonReactive.loadPromise;
		i._nonReactive.loadPromise = f(() => {
			a?.resolve(), (a = void 0);
		});
		const { paramsError: o, searchError: s } = i;
		o && H(e, n, o, `PARSE_PARAMS`), s && H(e, n, s, `VALIDATE_SEARCH`), je(e, t, r, i);
		let c = new AbortController(),
			l = !1,
			u = () => {
				l ||
					((l = !0),
					e.updateMatch(t, (e) => ({
						...e,
						isFetching: `beforeLoad`,
						fetchCount: e.fetchCount + 1,
						abortController: c,
					})));
			},
			d = () => {
				i._nonReactive.beforeLoadPromise?.resolve(),
					(i._nonReactive.beforeLoadPromise = void 0),
					e.updateMatch(t, (e) => ({ ...e, isFetching: !1 }));
			};
		if (!r.options.beforeLoad) {
			e.router.batch(() => {
				u(), d();
			});
			return;
		}
		i._nonReactive.beforeLoadPromise = f();
		let p = { ...B(e, n, !1), ...i.__routeContext },
			{ search: m, params: h, cause: g } = i,
			_ = z(e, t),
			v = {
				search: m,
				abortController: c,
				params: h,
				preload: _,
				context: p,
				location: e.location,
				navigate: (t) => e.router.navigate({ ...t, _fromLocation: e.location }),
				buildLocation: e.router.buildLocation,
				cause: _ ? `preload` : g,
				matches: e.matches,
				routeId: r.id,
				...e.router.options.additionalContext,
			},
			b = (r) => {
				if (r === void 0) {
					e.router.batch(() => {
						u(), d();
					});
					return;
				}
				(N(r) || M(r)) && (u(), H(e, n, r, `BEFORE_LOAD`)),
					e.router.batch(() => {
						u(), e.updateMatch(t, (e) => ({ ...e, __beforeLoadContext: r })), d();
					});
			},
			x;
		try {
			if (((x = r.options.beforeLoad(v)), y(x)))
				return (
					u(),
					x
						.catch((t) => {
							H(e, n, t, `BEFORE_LOAD`);
						})
						.then(b)
				);
		} catch (t) {
			u(), H(e, n, t, `BEFORE_LOAD`);
		}
		b(x);
	},
	Pe = (e, t) => {
		const { id: n, routeId: r } = e.matches[t],
			i = e.router.looseRoutesById[r],
			a = () => s(),
			o = () => Ne(e, n, t, i),
			s = () => {
				if (ke(e, n)) return;
				const t = Me(e, n, i);
				return y(t) ? t.then(o) : o();
			};
		return a();
	},
	Fe = (e, t, n) => {
		const r = e.router.getMatch(t);
		if (!r || (!n.options.head && !n.options.scripts && !n.options.headers)) return;
		const i = { ssr: e.router.options.ssr, matches: e.matches, match: r, params: r.params, loaderData: r.loaderData };
		return Promise.all([n.options.head?.(i), n.options.scripts?.(i), n.options.headers?.(i)]).then(([e, t, n]) => ({
			meta: e?.meta,
			links: e?.links,
			headScripts: e?.scripts,
			headers: n,
			scripts: t,
			styles: e?.styles,
		}));
	},
	Ie = (e, t, n, r, i) => {
		const a = t[r - 1],
			{ params: o, loaderDeps: s, abortController: c, cause: l } = e.router.getMatch(n),
			u = B(e, r),
			d = z(e, n);
		return {
			params: o,
			deps: s,
			preload: !!d,
			parentMatchPromise: a,
			abortController: c,
			context: u,
			location: e.location,
			navigate: (t) => e.router.navigate({ ...t, _fromLocation: e.location }),
			cause: d ? `preload` : l,
			route: i,
			...e.router.options.additionalContext,
		};
	},
	Le = async (e, t, n, r, i) => {
		try {
			const a = e.router.getMatch(n);
			try {
				U(i);
				const o = i.options.loader,
					s = typeof o == `function` ? o : o?.handler,
					c = s?.(Ie(e, t, n, r, i)),
					l = !!s && y(c);
				if (
					((l ||
						i._lazyPromise ||
						i._componentsPromise ||
						i.options.head ||
						i.options.scripts ||
						i.options.headers ||
						a._nonReactive.minPendingPromise) &&
						e.updateMatch(n, (e) => ({ ...e, isFetching: `loader` })),
					s)
				) {
					const t = l ? await c : c;
					V(e, e.router.getMatch(n), t), t !== void 0 && e.updateMatch(n, (e) => ({ ...e, loaderData: t }));
				}
				i._lazyPromise && (await i._lazyPromise);
				const u = a._nonReactive.minPendingPromise;
				u && (await u),
					i._componentsPromise && (await i._componentsPromise),
					e.updateMatch(n, (t) => ({
						...t,
						error: void 0,
						context: B(e, r),
						status: `success`,
						isFetching: !1,
						updatedAt: Date.now(),
					}));
			} catch (t) {
				let o = t;
				if (o?.name === `AbortError`) {
					if (a.abortController.signal.aborted) {
						a._nonReactive.loaderPromise?.resolve(), (a._nonReactive.loaderPromise = void 0);
						return;
					}
					e.updateMatch(n, (t) => ({
						...t,
						status: t.status === `pending` ? `success` : t.status,
						isFetching: !1,
						context: B(e, r),
					}));
					return;
				}
				const s = a._nonReactive.minPendingPromise;
				s && (await s), M(t) && (await i.options.notFoundComponent?.preload?.()), V(e, e.router.getMatch(n), t);
				try {
					i.options.onError?.(t);
				} catch (t) {
					(o = t), V(e, e.router.getMatch(n), t);
				}
				!N(o) && !M(o) && (await U(i, [`errorComponent`])),
					e.updateMatch(n, (t) => ({ ...t, error: o, context: B(e, r), status: `error`, isFetching: !1 }));
			}
		} catch (t) {
			const r = e.router.getMatch(n);
			r && (r._nonReactive.loaderPromise = void 0), V(e, r, t);
		}
	},
	Re = async (e, t, n) => {
		async function r(r, a, c, l, d) {
			const f = Date.now() - a.updatedAt,
				p = r
					? (d.options.preloadStaleTime ?? e.router.options.defaultPreloadStaleTime ?? 3e4)
					: (d.options.staleTime ?? e.router.options.defaultStaleTime ?? 0),
				m = d.options.shouldReload,
				h = typeof m == `function` ? m(Ie(e, t, i, n, d)) : m,
				{ status: g, invalid: _ } = l,
				v = f >= p && (!!e.forceStaleReload || l.cause === `enter` || (c !== void 0 && c !== l.id));
			(o = g === `success` && (_ || (h ?? v))),
				(r && d.options.preload === !1) ||
					(o && !e.sync && u
						? ((s = !0),
							(async () => {
								try {
									await Le(e, t, i, n, d);
									const r = e.router.getMatch(i);
									r._nonReactive.loaderPromise?.resolve(),
										r._nonReactive.loadPromise?.resolve(),
										(r._nonReactive.loaderPromise = void 0),
										(r._nonReactive.loadPromise = void 0);
								} catch (t) {
									N(t) && (await e.router.navigate(t.options));
								}
							})())
						: g !== `success` || o
							? await Le(e, t, i, n, d)
							: Ae(e, i, n));
		}
		const { id: i, routeId: a } = e.matches[n],
			o = !1,
			s = !1,
			c = e.router.looseRoutesById[a],
			l = c.options.loader,
			u =
				((typeof l == `function` ? void 0 : l?.staleReloadMode) ?? e.router.options.defaultStaleReloadMode) !==
				`blocking`;
		if (ke(e, i)) {
			if (!e.router.getMatch(i)) return e.matches[n];
			Ae(e, i, n);
		} else {
			const t = e.router.getMatch(i),
				o = e.router.stores.matchesId.get()[n],
				s =
					((o && e.router.stores.matchStores.get(o)) || null)?.routeId === a
						? o
						: e.router.stores.matches.get().find((e) => e.routeId === a)?.id,
				l = z(e, i);
			if (t._nonReactive.loaderPromise) {
				if (t.status === `success` && !e.sync && !t.preload && u) return t;
				await t._nonReactive.loaderPromise;
				const n = e.router.getMatch(i),
					a = n._nonReactive.error || n.error;
				a && V(e, n, a), n.status === `pending` && (await r(l, t, s, n, c));
			} else {
				const n = l && !e.router.stores.matchStores.has(i),
					a = e.router.getMatch(i);
				(a._nonReactive.loaderPromise = f()),
					n !== a.preload && e.updateMatch(i, (e) => ({ ...e, preload: n })),
					await r(l, t, s, a, c);
			}
		}
		const d = e.router.getMatch(i);
		s ||
			(d._nonReactive.loaderPromise?.resolve(),
			d._nonReactive.loadPromise?.resolve(),
			(d._nonReactive.loadPromise = void 0)),
			clearTimeout(d._nonReactive.pendingTimeout),
			(d._nonReactive.pendingTimeout = void 0),
			s || (d._nonReactive.loaderPromise = void 0),
			(d._nonReactive.dehydrated = void 0);
		const p = s ? d.isFetching : !1;
		return p !== d.isFetching || d.invalid !== !1
			? (e.updateMatch(i, (e) => ({ ...e, isFetching: p, invalid: !1 })), e.router.getMatch(i))
			: d;
	};
async function ze(e) {
	const t = e,
		n = [];
	De(t.router) && Ee(t);
	let r;
	for (let e = 0; e < t.matches.length; e++) {
		try {
			const n = Pe(t, e);
			y(n) && (await n);
		} catch (e) {
			if (N(e)) throw e;
			if (M(e)) r = e;
			else if (!t.preload) throw e;
			break;
		}
		if (t.serialError || t.firstBadMatchIndex != null) break;
	}
	let i = t.firstBadMatchIndex ?? t.matches.length,
		a = r && !t.preload ? Oe(t, r) : void 0,
		o = r && t.preload ? 0 : a === void 0 ? i : Math.min(a + 1, i),
		s,
		c;
	for (let e = 0; e < o; e++) n.push(Re(t, n, e));
	try {
		await Promise.all(n);
	} catch {
		const e = await Promise.allSettled(n);
		for (const t of e) {
			if (t.status !== `rejected`) continue;
			const e = t.reason;
			if (N(e)) throw e;
			M(e) ? (s ??= e) : (c ??= e);
		}
		if (c !== void 0) throw c;
	}
	let l = s ?? (r && !t.preload ? r : void 0),
		u = t.firstBadMatchIndex === void 0 ? t.matches.length - 1 : t.firstBadMatchIndex;
	if (!l && r && t.preload) return t.matches;
	if (l) {
		const e = Oe(t, l);
		e === void 0 && j();
		const n = t.matches[e],
			r = t.router.looseRoutesById[n.routeId],
			i = t.router.options?.defaultNotFoundComponent;
		!r.options.notFoundComponent && i && (r.options.notFoundComponent = i), (l.routeId = n.routeId);
		const a = n.routeId === t.router.routeTree.id;
		t.updateMatch(n.id, (e) => ({
			...e,
			...(a ? { status: `success`, globalNotFound: !0, error: void 0 } : { status: `notFound`, error: l }),
			isFetching: !1,
		})),
			(u = e),
			await U(r, [`notFoundComponent`]);
	} else if (!t.preload) {
		const e = t.matches[0];
		e.globalNotFound ||
			(t.router.getMatch(e.id)?.globalNotFound &&
				t.updateMatch(e.id, (e) => ({ ...e, globalNotFound: !1, error: void 0 })));
	}
	if (t.serialError && t.firstBadMatchIndex !== void 0) {
		const e = t.router.looseRoutesById[t.matches[t.firstBadMatchIndex].routeId];
		await U(e, [`errorComponent`]);
	}
	for (let e = 0; e <= u; e++) {
		const { id: n, routeId: r } = t.matches[e],
			i = t.router.looseRoutesById[r];
		try {
			const e = Fe(t, n, i);
			if (e) {
				const r = await e;
				t.updateMatch(n, (e) => ({ ...e, ...r }));
			}
		} catch (e) {
			console.error(`Error executing head for route ${r}:`, e);
		}
	}
	const d = Ee(t);
	if ((y(d) && (await d), l)) throw l;
	if (t.serialError && !t.preload && !t.onReady) throw t.serialError;
	return t.matches;
}
function Be(e, t) {
	const n = t.map((t) => e.options[t]?.preload?.()).filter(Boolean);
	if (n.length !== 0) return Promise.all(n);
}
function U(e, t = W) {
	!e._lazyLoaded &&
		e._lazyPromise === void 0 &&
		(e.lazyFn
			? (e._lazyPromise = e.lazyFn().then((t) => {
					const { id: n, ...r } = t.options;
					Object.assign(e.options, r), (e._lazyLoaded = !0), (e._lazyPromise = void 0);
				}))
			: (e._lazyLoaded = !0));
	const n = () =>
		e._componentsLoaded
			? void 0
			: t === W
				? (() => {
						if (e._componentsPromise === void 0) {
							const t = Be(e, W);
							t
								? (e._componentsPromise = t.then(() => {
										(e._componentsLoaded = !0), (e._componentsPromise = void 0);
									}))
								: (e._componentsLoaded = !0);
						}
						return e._componentsPromise;
					})()
				: Be(e, t);
	return e._lazyPromise ? e._lazyPromise.then(n) : n();
}
function Ve(e) {
	for (const t of W) if (e.options[t]?.preload) return !0;
	return !1;
}
var W = [`component`, `errorComponent`, `pendingComponent`, `notFoundComponent`],
	G = `__TSR_index`,
	He = `popstate`,
	Ue = `beforeunload`;
function We(e) {
	let t = e.getLocation(),
		n = new Set(),
		r = (r) => {
			(t = e.getLocation()), n.forEach((e) => e({ location: t, action: r }));
		},
		i = (n) => {
			(e.notifyOnIndexChange ?? !0) ? r(n) : (t = e.getLocation());
		},
		a = async ({ task: n, navigateOpts: r, ...i }) => {
			if (r?.ignoreBlocker ?? !1) {
				n();
				return;
			}
			const a = e.getBlockers?.() ?? [],
				o = i.type === `PUSH` || i.type === `REPLACE`;
			if (typeof document < `u` && a.length && o)
				for (const n of a) {
					const r = K(i.path, i.state);
					if (await n.blockerFn({ currentLocation: t, nextLocation: r, action: i.type })) {
						e.onBlocked?.();
						return;
					}
				}
			n();
		};
	return {
		get location() {
			return t;
		},
		get length() {
			return e.getLength();
		},
		subscribers: n,
		subscribe: (e) => (
			n.add(e),
			() => {
				n.delete(e);
			}
		),
		push: (n, i, o) => {
			const s = t.state[G];
			(i = Ge(s + 1, i)),
				a({
					task: () => {
						e.pushState(n, i), r({ type: `PUSH` });
					},
					navigateOpts: o,
					type: `PUSH`,
					path: n,
					state: i,
				});
		},
		replace: (n, i, o) => {
			const s = t.state[G];
			(i = Ge(s, i)),
				a({
					task: () => {
						e.replaceState(n, i), r({ type: `REPLACE` });
					},
					navigateOpts: o,
					type: `REPLACE`,
					path: n,
					state: i,
				});
		},
		go: (t, n) => {
			a({
				task: () => {
					e.go(t), i({ type: `GO`, index: t });
				},
				navigateOpts: n,
				type: `GO`,
			});
		},
		back: (t) => {
			a({
				task: () => {
					e.back(t?.ignoreBlocker ?? !1), i({ type: `BACK` });
				},
				navigateOpts: t,
				type: `BACK`,
			});
		},
		forward: (t) => {
			a({
				task: () => {
					e.forward(t?.ignoreBlocker ?? !1), i({ type: `FORWARD` });
				},
				navigateOpts: t,
				type: `FORWARD`,
			});
		},
		canGoBack: () => t.state[G] !== 0,
		createHref: (t) => e.createHref(t),
		block: (t) => {
			if (!e.setBlockers) return () => {};
			const n = e.getBlockers?.() ?? [];
			return (
				e.setBlockers([...n, t]),
				() => {
					const n = e.getBlockers?.() ?? [];
					e.setBlockers?.(n.filter((e) => e !== t));
				}
			);
		},
		flush: () => e.flush?.(),
		destroy: () => e.destroy?.(),
		notify: r,
	};
}
function Ge(e, t) {
	t ||= {};
	const n = Je();
	return { ...t, key: n, __TSR_key: n, [G]: e };
}
function Ke(e) {
	let t = e?.window ?? (typeof document < `u` ? window : void 0),
		n = t.history.pushState,
		r = t.history.replaceState,
		i = [],
		a = () => i,
		o = (e) => (i = e),
		s = e?.createHref ?? ((e) => e),
		c = e?.parseLocation ?? (() => K(`${t.location.pathname}${t.location.search}${t.location.hash}`, t.history.state));
	if (!t.history.state?.__TSR_key && !t.history.state?.key) {
		const e = Je();
		t.history.replaceState({ [G]: 0, key: e, __TSR_key: e }, ``);
	}
	let l = c(),
		u,
		d = !1,
		f = !1,
		p = !1,
		m = !1,
		h = () => l,
		g,
		_,
		v = () => {
			g &&
				((C._ignoreSubscribers = !0),
				(g.isPush ? t.history.pushState : t.history.replaceState)(g.state, ``, g.href),
				(C._ignoreSubscribers = !1),
				(g = void 0),
				(_ = void 0),
				(u = void 0));
		},
		y = (e, t, n) => {
			const r = s(t);
			_ || (u = l),
				(l = K(t, n)),
				(g = { href: r, state: n, isPush: g?.isPush || e === `push` }),
				(_ ||= Promise.resolve().then(() => v()));
		},
		b = (e) => {
			(l = c()), C.notify({ type: e });
		},
		x = async () => {
			if (f) {
				f = !1;
				return;
			}
			const e = c(),
				n = e.state[G] - l.state[G],
				r = n === 1,
				i = n === -1,
				o = (!r && !i) || d;
			d = !1;
			const s = o ? `GO` : i ? `BACK` : `FORWARD`,
				u = o ? { type: `GO`, index: n } : { type: i ? `BACK` : `FORWARD` };
			if (p) p = !1;
			else {
				const n = a();
				if (typeof document < `u` && n.length) {
					for (const r of n)
						if (await r.blockerFn({ currentLocation: l, nextLocation: e, action: s })) {
							(f = !0), t.history.go(1), C.notify(u);
							return;
						}
				}
			}
			(l = c()), C.notify(u);
		},
		S = (e) => {
			if (m) {
				m = !1;
				return;
			}
			let t = !1,
				n = a();
			if (typeof document < `u` && n.length)
				for (const e of n) {
					const n = e.enableBeforeUnload ?? !0;
					if (n === !0) {
						t = !0;
						break;
					}
					if (typeof n == `function` && n() === !0) {
						t = !0;
						break;
					}
				}
			if (t) return e.preventDefault(), (e.returnValue = ``);
		},
		C = We({
			getLocation: h,
			getLength: () => t.history.length,
			pushState: (e, t) => y(`push`, e, t),
			replaceState: (e, t) => y(`replace`, e, t),
			back: (e) => (e && (p = !0), (m = !0), t.history.back()),
			forward: (e) => {
				e && (p = !0), (m = !0), t.history.forward();
			},
			go: (e) => {
				(d = !0), t.history.go(e);
			},
			createHref: (e) => s(e),
			flush: v,
			destroy: () => {
				(t.history.pushState = n),
					(t.history.replaceState = r),
					t.removeEventListener(Ue, S, { capture: !0 }),
					t.removeEventListener(He, x);
			},
			onBlocked: () => {
				u && l !== u && (l = u);
			},
			getBlockers: a,
			setBlockers: o,
			notifyOnIndexChange: !1,
		});
	return (
		t.addEventListener(Ue, S, { capture: !0 }),
		t.addEventListener(He, x),
		(t.history.pushState = (...e) => {
			const r = n.apply(t.history, e);
			return C._ignoreSubscribers || b(`PUSH`), r;
		}),
		(t.history.replaceState = (...e) => {
			const n = r.apply(t.history, e);
			return C._ignoreSubscribers || b(`REPLACE`), n;
		}),
		C
	);
}
function qe(e) {
	let t = e.replace(/[\x00-\x1f\x7f]/g, ``);
	return t.startsWith(`//`) && (t = `/` + t.replace(/^\/+/, ``)), t;
}
function K(e, t) {
	const n = qe(e),
		r = n.indexOf(`#`),
		i = n.indexOf(`?`),
		a = Je();
	return {
		href: n,
		pathname: n.substring(0, r > 0 ? (i > 0 ? Math.min(r, i) : r) : i > 0 ? i : n.length),
		hash: r > -1 ? n.substring(r) : ``,
		search: i > -1 ? n.slice(i, r === -1 ? void 0 : r) : ``,
		state: t || { [G]: 0, key: a, __TSR_key: a },
	};
}
function Je() {
	return (Math.random() + 1).toString(36).substring(7);
}
function Ye(e) {
	return e instanceof Error ? { name: e.name, message: e.message } : { data: e };
}
function q(e, t) {
	const n = t,
		r = e;
	return {
		fromLocation: n,
		toLocation: r,
		pathChanged: n?.pathname !== r.pathname,
		hrefChanged: n?.href !== r.href,
		hashChanged: n?.hash !== r.hash,
	};
}
var Xe = class {
		constructor(e, t) {
			(this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`),
				(this.resetNextScroll = !0),
				(this.shouldViewTransition = void 0),
				(this.isViewTransitionTypesSupported = void 0),
				(this.subscribers = new Set()),
				(this.isScrollRestoring = !1),
				(this.isScrollRestorationSetup = !1),
				(this.startTransition = (e) => e()),
				(this.update = (e) => {
					const t = this.options,
						n = this.basepath ?? t?.basepath ?? `/`,
						r = this.basepath === void 0,
						i = t?.rewrite;
					if (
						((this.options = { ...t, ...e }),
						(this.isServer = this.options.isServer ?? typeof document > `u`),
						(this.protocolAllowlist = new Set(this.options.protocolAllowlist)),
						this.options.pathParamsAllowedCharacters &&
							(this.pathParamsDecoder = w(this.options.pathParamsAllowedCharacters)),
						(!this.history || (this.options.history && this.options.history !== this.history)) &&
							(this.options.history ? (this.history = this.options.history) : (this.history = Ke())),
						(this.origin = this.options.origin),
						this.origin ||
							(window?.origin && window.origin !== `null`
								? (this.origin = window.origin)
								: (this.origin = `http://localhost`)),
						this.history && this.updateLatestLocation(),
						this.options.routeTree !== this.routeTree)
					) {
						this.routeTree = this.options.routeTree;
						let e;
						(this.resolvePathCache = D(1e3)), (e = this.buildRouteTree()), this.setRoutes(e);
					}
					if (!this.stores && this.latestLocation) {
						const e = this.getStoreConfig(this);
						(this.batch = e.batch), (this.stores = Te(Qe(this.latestLocation), e)), he(this);
					}
					let a = !1,
						o = this.options.basepath ?? `/`,
						s = this.options.rewrite;
					if (r || n !== o || i !== s) {
						this.basepath = o;
						const e = [],
							t = ie(o);
						t && t !== `/` && e.push(xe({ basepath: o })),
							s && e.push(s),
							(this.rewrite = e.length === 0 ? void 0 : e.length === 1 ? e[0] : be(e)),
							this.history && this.updateLatestLocation(),
							(a = !0);
					}
					a && this.stores && this.stores.location.set(this.latestLocation),
						typeof window < `u` &&
							`CSS` in window &&
							typeof window.CSS?.supports == `function` &&
							(this.isViewTransitionTypesSupported = window.CSS.supports(`selector(:active-view-transition-type(a)`));
				}),
				(this.updateLatestLocation = () => {
					this.latestLocation = this.parseLocation(this.history.location, this.latestLocation);
				}),
				(this.buildRouteTree = () => {
					const e = m(this.routeTree, this.options.caseSensitive, (e, t) => {
						e.init({ originalIndex: t });
					});
					return this.options.routeMasks && o(this.options.routeMasks, e.processedTree), e;
				}),
				(this.subscribe = (e, t) => {
					const n = { eventType: e, fn: t };
					return (
						this.subscribers.add(n),
						() => {
							this.subscribers.delete(n);
						}
					);
				}),
				(this.emit = (e) => {
					this.subscribers.forEach((t) => {
						t.eventType === e.type && t.fn(e);
					});
				}),
				(this.parseLocation = (e, t) => {
					const n = ({ pathname: e, search: n, hash: r, href: i, state: a }) => {
							if (!this.rewrite && !/[ \x00-\x1f\x7f\u0080-\uffff]/.test(e)) {
								const i = this.options.parseSearch(n),
									o = this.options.stringifySearch(i);
								return {
									href: e + o + r,
									publicHref: e + o + r,
									pathname: p(e).path,
									external: !1,
									searchStr: o,
									search: v(t?.search, i),
									hash: p(r.slice(1)).path,
									state: b(t?.state, a),
								};
							}
							const o = new URL(i, this.origin),
								s = I(this.rewrite, o),
								c = this.options.parseSearch(s.search),
								l = this.options.stringifySearch(c);
							return (
								(s.search = l),
								{
									href: s.href.replace(s.origin, ``),
									publicHref: i,
									pathname: p(s.pathname).path,
									external: !!this.rewrite && s.origin !== this.origin,
									searchStr: l,
									search: v(t?.search, c),
									hash: p(s.hash.slice(1)).path,
									state: b(t?.state, a),
								}
							);
						},
						r = n(e),
						{ __tempLocation: i, __tempKey: a } = r.state;
					if (i && (!a || a === this.tempLocationKey)) {
						const e = n(i);
						return (
							(e.state.key = r.state.key),
							(e.state.__TSR_key = r.state.__TSR_key),
							delete e.state.__tempLocation,
							{ ...e, maskedLocation: r }
						);
					}
					return r;
				}),
				(this.resolvePathWithBase = (e, t) =>
					S({ base: e, to: O(t), trailingSlash: this.options.trailingSlash, cache: this.resolvePathCache })),
				(this.matchRoutes = (e, t, n) =>
					typeof e == `string`
						? this.matchRoutesInternal({ pathname: e, search: t }, n)
						: this.matchRoutesInternal(e, t)),
				(this.getMatchedRoutes = (e) =>
					$e({ pathname: e, routesById: this.routesById, processedTree: this.processedTree })),
				(this.cancelMatch = (e) => {
					const t = this.getMatch(e);
					t &&
						(t.abortController.abort(),
						clearTimeout(t._nonReactive.pendingTimeout),
						(t._nonReactive.pendingTimeout = void 0));
				}),
				(this.cancelMatches = () => {
					this.stores.pendingIds.get().forEach((e) => {
						this.cancelMatch(e);
					}),
						this.stores.matchesId.get().forEach((e) => {
							if (this.stores.pendingMatchStores.has(e)) return;
							const t = this.stores.matchStores.get(e)?.get();
							t && (t.status === `pending` || t.isFetching === `loader`) && this.cancelMatch(e);
						});
				}),
				(this.buildLocation = (e) => {
					const t = (t = {}) => {
							const n = t._fromLocation || this.pendingBuiltLocation || this.latestLocation,
								r = this.matchRoutesLightweight(n);
							t.from;
							let i = t.unsafeRelative === `path` ? n.pathname : (t.from ?? r.fullPath),
								a = this.resolvePathWithBase(i, `.`),
								o = r.search,
								s = Object.assign(Object.create(null), r.params),
								l = t.to ? this.resolvePathWithBase(a, `${t.to}`) : this.resolvePathWithBase(a, `.`),
								u =
									t.params === !1 || t.params === null
										? Object.create(null)
										: (t.params ?? !0) === !0
											? s
											: Object.assign(s, d(t.params, s)),
								f = this.getMatchedRoutes(l),
								m = f.matchedRoutes;
							if (
								((!f.foundRoute || (f.foundRoute.path !== `/` && f.routeParams[`**`])) &&
									this.options.notFoundRoute &&
									(m = [...m, this.options.notFoundRoute]),
								Object.keys(u).length > 0)
							)
								for (const e of m) {
									const t = e.options.params?.stringify ?? e.options.stringifyParams;
									if (t)
										try {
											Object.assign(u, t(u));
										} catch {}
								}
							let h = e.leaveParams
									? l
									: p(
											x({ path: l, params: u, decoder: this.pathParamsDecoder, server: this.isServer })
												.interpolatedPath,
										).path,
								g = o;
							if (e._includeValidateSearch && this.options.search?.strict) {
								const e = {};
								m.forEach((t) => {
									if (t.options.validateSearch)
										try {
											Object.assign(e, Y(t.options.validateSearch, { ...e, ...g }));
										} catch {}
								}),
									(g = e);
							}
							(g = et({ search: g, dest: t, destRoutes: m, _includeValidateSearch: e._includeValidateSearch })),
								(g = v(o, g));
							let _ = this.options.stringifySearch(g),
								y = t.hash === !0 ? n.hash : t.hash ? d(t.hash, n.hash) : void 0,
								S = y ? `#${y}` : ``,
								C = t.state === !0 ? n.state : t.state ? d(t.state, n.state) : {};
							C = b(n.state, C);
							let w = `${h}${_}${S}`,
								T,
								E,
								D = !1;
							if (this.rewrite) {
								const e = new URL(w, this.origin),
									t = Se(this.rewrite, e);
								(T = e.href.replace(e.origin, ``)),
									t.origin === this.origin ? (E = t.pathname + t.search + t.hash) : ((E = t.href), (D = !0));
							} else (T = c(w)), (E = T);
							return {
								publicHref: E,
								href: T,
								pathname: h,
								search: g,
								searchStr: _,
								state: C,
								hash: y ?? ``,
								external: D,
								unmaskOnReload: t.unmaskOnReload,
							};
						},
						n = (n = {}, r) => {
							let i = t(n),
								a = r ? t(r) : void 0;
							if (!a) {
								const n = Object.create(null);
								if (this.options.routeMasks) {
									const o = re(i.pathname, this.processedTree);
									if (o) {
										Object.assign(n, o.rawParams);
										const { from: i, params: s, ...c } = o.route,
											l =
												s === !1 || s === null ? Object.create(null) : (s ?? !0) === !0 ? n : Object.assign(n, d(s, n));
										(r = { from: e.from, ...c, params: l }), (a = t(r));
									}
								}
							}
							return a && (i.maskedLocation = a), i;
						};
					return e.mask ? n(e, { from: e.from, ...e.mask }) : n(e);
				}),
				(this.commitLocation = async ({ viewTransition: e, ignoreBlocker: t, ...n }) => {
					let r = () => {
							const e = [`key`, `__TSR_key`, `__TSR_index`, `__hashScrollIntoViewOptions`];
							e.forEach((e) => {
								n.state[e] = this.latestLocation.state[e];
							});
							const t = h(n.state, this.latestLocation.state);
							return (
								e.forEach((e) => {
									delete n.state[e];
								}),
								t
							);
						},
						i = a(this.latestLocation.href) === a(n.href),
						o = this.commitLocationPromise;
					if (
						((this.commitLocationPromise = f(() => {
							o?.resolve(), (o = void 0);
						})),
						i && r())
					)
						this.load();
					else {
						let { maskedLocation: r, hashScrollIntoView: i, ...a } = n;
						r &&
							((a = {
								...r,
								state: {
									...r.state,
									__tempKey: void 0,
									__tempLocation: {
										...a,
										search: a.searchStr,
										state: { ...a.state, __tempKey: void 0, __tempLocation: void 0, __TSR_key: void 0, key: void 0 },
									},
								},
							}),
							(a.unmaskOnReload ?? this.options.unmaskOnReload ?? !1) && (a.state.__tempKey = this.tempLocationKey)),
							(a.state.__hashScrollIntoViewOptions = i ?? this.options.defaultHashScrollIntoView ?? !0),
							(this.shouldViewTransition = e),
							this.history[n.replace ? `replace` : `push`](a.publicHref, a.state, { ignoreBlocker: t });
					}
					return (
						(this.resetNextScroll = n.resetScroll ?? !0),
						this.history.subscribers.size || this.load(),
						this.commitLocationPromise
					);
				}),
				(this.buildAndCommitLocation = ({
					replace: e,
					resetScroll: t,
					hashScrollIntoView: n,
					viewTransition: r,
					ignoreBlocker: i,
					href: a,
					...o
				} = {}) => {
					if (a) {
						const t = this.history.location.state.__TSR_index,
							n = K(a, { __TSR_index: e ? t : t + 1 }),
							r = new URL(n.pathname, this.origin);
						(o.to = I(this.rewrite, r).pathname),
							(o.search = this.options.parseSearch(n.search)),
							(o.hash = n.hash.slice(1));
					}
					const s = this.buildLocation({ ...o, _includeValidateSearch: !0 });
					this.pendingBuiltLocation = s;
					const c = this.commitLocation({
						...s,
						viewTransition: r,
						replace: e,
						resetScroll: t,
						hashScrollIntoView: n,
						ignoreBlocker: i,
					});
					return (
						Promise.resolve().then(() => {
							this.pendingBuiltLocation === s && (this.pendingBuiltLocation = void 0);
						}),
						c
					);
				}),
				(this.navigate = async ({ to: e, reloadDocument: t, href: n, publicHref: r, ...i }) => {
					let a = !1;
					if (n)
						try {
							new URL(`${n}`), (a = !0);
						} catch {}
					if ((a && !t && (t = !0), t)) {
						if (e !== void 0 || !n) {
							const t = this.buildLocation({ to: e, ...i });
							(n ??= t.publicHref), (r ??= t.publicHref);
						}
						const t = !a && r ? r : n;
						if (g(t, this.protocolAllowlist)) return Promise.resolve();
						if (!i.ignoreBlocker) {
							const e = this.history.getBlockers?.() ?? [];
							for (const t of e)
								if (
									t?.blockerFn &&
									(await t.blockerFn({
										currentLocation: this.latestLocation,
										nextLocation: this.latestLocation,
										action: `PUSH`,
									}))
								)
									return Promise.resolve();
						}
						return i.replace ? window.location.replace(t) : (window.location.href = t), Promise.resolve();
					}
					return this.buildAndCommitLocation({ ...i, href: n, to: e, _isNavigate: !0 });
				}),
				(this.beforeLoad = () => {
					this.cancelMatches(), this.updateLatestLocation();
					const e = this.matchRoutes(this.latestLocation),
						t = this.stores.cachedMatches.get().filter((t) => !e.some((e) => e.id === t.id));
					this.batch(() => {
						this.stores.status.set(`pending`),
							this.stores.statusCode.set(200),
							this.stores.isLoading.set(!0),
							this.stores.location.set(this.latestLocation),
							this.stores.setPending(e),
							this.stores.setCached(t);
					});
				}),
				(this.load = async (e) => {
					let t,
						n,
						r,
						i = this.stores.resolvedLocation.get() ?? this.stores.location.get();
					for (
						r = new Promise((a) => {
							this.startTransition(async () => {
								try {
									this.beforeLoad();
									const t = this.latestLocation,
										n = q(t, this.stores.resolvedLocation.get());
									this.stores.redirect.get() || this.emit({ type: `onBeforeNavigate`, ...n }),
										this.emit({ type: `onBeforeLoad`, ...n }),
										await ze({
											router: this,
											sync: e?.sync,
											forceStaleReload: i.href === t.href,
											matches: this.stores.pendingMatches.get(),
											location: t,
											updateMatch: this.updateMatch,
											onReady: async () => {
												this.startTransition(() => {
													this.startViewTransition(async () => {
														let e = null,
															t = null,
															n = null,
															r = null;
														this.batch(() => {
															const i = this.stores.pendingMatches.get(),
																a = i.length,
																o = this.stores.matches.get();
															e = a ? o.filter((e) => !this.stores.pendingMatchStores.has(e.id)) : null;
															const s = new Set();
															for (const e of this.stores.pendingMatchStores.values()) e.routeId && s.add(e.routeId);
															const c = new Set();
															for (const e of this.stores.matchStores.values()) e.routeId && c.add(e.routeId);
															(t = a ? o.filter((e) => !s.has(e.routeId)) : null),
																(n = a ? i.filter((e) => !c.has(e.routeId)) : null),
																(r = a ? i.filter((e) => c.has(e.routeId)) : o),
																this.stores.isLoading.set(!1),
																this.stores.loadedAt.set(Date.now()),
																a &&
																	(this.stores.setMatches(i),
																	this.stores.setPending([]),
																	this.stores.setCached([
																		...this.stores.cachedMatches.get(),
																		...e.filter(
																			(e) =>
																				e.status !== `error` && e.status !== `notFound` && e.status !== `redirected`,
																		),
																	]),
																	this.clearExpiredCache());
														});
														for (const [e, i] of [
															[t, `onLeave`],
															[n, `onEnter`],
															[r, `onStay`],
														])
															if (e) for (const t of e) this.looseRoutesById[t.routeId].options[i]?.(t);
													});
												});
											},
										});
								} catch (e) {
									N(e) ? ((t = e), this.navigate({ ...t.options, replace: !0, ignoreBlocker: !0 })) : M(e) && (n = e);
									const r = t
										? t.status
										: n
											? 404
											: this.stores.matches.get().some((e) => e.status === `error`)
												? 500
												: 200;
									this.batch(() => {
										this.stores.statusCode.set(r), this.stores.redirect.set(t);
									});
								}
								this.latestLoadPromise === r &&
									(this.commitLocationPromise?.resolve(),
									(this.latestLoadPromise = void 0),
									(this.commitLocationPromise = void 0)),
									a();
							});
						}),
							this.latestLoadPromise = r,
							await r;
						this.latestLoadPromise && r !== this.latestLoadPromise;
					)
						await this.latestLoadPromise;
					let a;
					this.hasNotFoundMatch()
						? (a = 404)
						: this.stores.matches.get().some((e) => e.status === `error`) && (a = 500),
						a !== void 0 && this.stores.statusCode.set(a);
				}),
				(this.startViewTransition = (e) => {
					const t = this.shouldViewTransition ?? this.options.defaultViewTransition;
					if (
						((this.shouldViewTransition = void 0),
						t &&
							typeof document < `u` &&
							`startViewTransition` in document &&
							typeof document.startViewTransition == `function`)
					) {
						let n;
						if (typeof t == `object` && this.isViewTransitionTypesSupported) {
							const r = this.latestLocation,
								i = this.stores.resolvedLocation.get(),
								a = typeof t.types == `function` ? t.types(q(r, i)) : t.types;
							if (a === !1) {
								e();
								return;
							}
							n = { update: e, types: a };
						} else n = e;
						document.startViewTransition(n);
					} else e();
				}),
				(this.updateMatch = (e, t) => {
					this.startTransition(() => {
						const n = this.stores.pendingMatchStores.get(e);
						if (n) {
							n.set(t);
							return;
						}
						const r = this.stores.matchStores.get(e);
						if (r) {
							r.set(t);
							return;
						}
						const i = this.stores.cachedMatchStores.get(e);
						if (i) {
							const n = t(i.get());
							n.status === `redirected`
								? this.stores.cachedMatchStores.delete(e) && this.stores.cachedIds.set((t) => t.filter((t) => t !== e))
								: i.set(n);
						}
					});
				}),
				(this.getMatch = (e) =>
					this.stores.cachedMatchStores.get(e)?.get() ??
					this.stores.pendingMatchStores.get(e)?.get() ??
					this.stores.matchStores.get(e)?.get()),
				(this.invalidate = (e) => {
					const t = (t) =>
						(e?.filter?.(t) ?? !0)
							? {
									...t,
									invalid: !0,
									...(e?.forcePending || t.status === `error` || t.status === `notFound`
										? { status: `pending`, error: void 0 }
										: void 0),
								}
							: t;
					return (
						this.batch(() => {
							this.stores.setMatches(this.stores.matches.get().map(t)),
								this.stores.setCached(this.stores.cachedMatches.get().map(t)),
								this.stores.setPending(this.stores.pendingMatches.get().map(t));
						}),
						(this.shouldViewTransition = !1),
						this.load({ sync: e?.sync })
					);
				}),
				(this.getParsedLocationHref = (e) => e.publicHref || `/`),
				(this.resolveRedirect = (e) => {
					const t = e.headers.get(`Location`);
					if (!e.options.href || e.options._builtLocation) {
						const t = e.options._builtLocation ?? this.buildLocation(e.options),
							n = this.getParsedLocationHref(t);
						(e.options.href = n), e.headers.set(`Location`, n);
					} else if (t)
						try {
							const n = new URL(t);
							if (this.origin && n.origin === this.origin) {
								const t = n.pathname + n.search + n.hash;
								(e.options.href = t), e.headers.set(`Location`, t);
							}
						} catch {}
					if (e.options.href && !e.options._builtLocation && g(e.options.href, this.protocolAllowlist))
						throw Error(`Redirect blocked: unsafe protocol`);
					return e.headers.get(`Location`) || e.headers.set(`Location`, e.options.href), e;
				}),
				(this.clearCache = (e) => {
					const t = e?.filter;
					t === void 0
						? this.stores.setCached([])
						: this.stores.setCached(this.stores.cachedMatches.get().filter((e) => !t(e)));
				}),
				(this.clearExpiredCache = () => {
					const e = Date.now();
					this.clearCache({
						filter: (t) => {
							const n = this.looseRoutesById[t.routeId];
							if (!n.options.loader) return !0;
							const r =
								(t.preload
									? (n.options.preloadGcTime ?? this.options.defaultPreloadGcTime)
									: (n.options.gcTime ?? this.options.defaultGcTime)) ?? 300 * 1e3;
							return t.status === `error` ? !0 : e - t.updatedAt >= r;
						},
					});
				}),
				(this.loadRouteChunk = U),
				(this.preloadRoute = async (e) => {
					let t = e._builtLocation ?? this.buildLocation(e),
						n = this.matchRoutes(t, { throwOnError: !0, preload: !0, dest: e }),
						r = new Set([...this.stores.matchesId.get(), ...this.stores.pendingIds.get()]),
						i = new Set([...r, ...this.stores.cachedIds.get()]),
						a = n.filter((e) => !i.has(e.id));
					if (a.length) {
						const e = this.stores.cachedMatches.get();
						this.stores.setCached([...e, ...a]);
					}
					try {
						return (
							(n = await ze({
								router: this,
								matches: n,
								location: t,
								preload: !0,
								updateMatch: (e, t) => {
									r.has(e) ? (n = n.map((n) => (n.id === e ? t(n) : n))) : this.updateMatch(e, t);
								},
							})),
							n
						);
					} catch (e) {
						if (N(e))
							return e.options.reloadDocument ? void 0 : await this.preloadRoute({ ...e.options, _fromLocation: t });
						M(e) || console.error(e);
						return;
					}
				}),
				(this.matchRoute = (e, t) => {
					const n = {
							...e,
							to: e.to ? this.resolvePathWithBase(e.from || ``, e.to) : void 0,
							params: e.params || {},
							leaveParams: !0,
						},
						r = this.buildLocation(n);
					if (t?.pending && this.stores.status.get() !== `pending`) return !1;
					const i = (t?.pending === void 0 ? !this.stores.isLoading.get() : t.pending)
							? this.latestLocation
							: this.stores.resolvedLocation.get() || this.stores.location.get(),
						a = s(r.pathname, t?.caseSensitive ?? !1, t?.fuzzy ?? !1, i.pathname, this.processedTree);
					return !a || (e.params && !h(a.rawParams, e.params, { partial: !0 }))
						? !1
						: (t?.includeSearch ?? !0)
							? h(i.search, r.search, { partial: !0 })
								? a.rawParams
								: !1
							: a.rawParams;
				}),
				(this.hasNotFoundMatch = () =>
					this.stores.matches.get().some((e) => e.status === `notFound` || e.globalNotFound)),
				(this.getStoreConfig = t),
				this.update({
					defaultPreloadDelay: 50,
					defaultPendingMs: 1e3,
					defaultPendingMinMs: 500,
					context: void 0,
					...e,
					caseSensitive: e.caseSensitive ?? !1,
					notFoundMode: e.notFoundMode ?? `fuzzy`,
					stringifySearch: e.stringifySearch ?? _e,
					parseSearch: e.parseSearch ?? ge,
					protocolAllowlist: e.protocolAllowlist ?? r,
				}),
				typeof document < `u` && (self.__TSR_ROUTER__ = this);
		}
		isShell() {
			return !!this.options.isShell;
		}
		isPrerendering() {
			return !!this.options.isPrerendering;
		}
		get state() {
			return this.stores.__store.get();
		}
		setRoutes({ routesById: e, routesByPath: t, processedTree: n }) {
			(this.routesById = e), (this.routesByPath = t), (this.processedTree = n);
			const r = this.options.notFoundRoute;
			r && (r.init({ originalIndex: 99999999999 }), (this.routesById[r.id] = r));
		}
		get looseRoutesById() {
			return this.routesById;
		}
		getParentContext(e) {
			return e?.id ? (e.context ?? this.options.context ?? void 0) : (this.options.context ?? void 0);
		}
		matchRoutesInternal(e, t) {
			let n = this.getMatchedRoutes(e.pathname),
				{ foundRoute: r, routeParams: i, parsedParams: o } = n,
				{ matchedRoutes: s } = n,
				c = !1;
			(r ? r.path !== `/` && i[`**`] : a(e.pathname)) &&
				(this.options.notFoundRoute ? (s = [...s, this.options.notFoundRoute]) : (c = !0));
			const l = c ? nt(this.options.notFoundMode, s) : void 0,
				u = Array(s.length),
				d = new Map();
			for (const e of this.stores.matchStores.values()) e.routeId && d.set(e.routeId, e.get());
			for (let n = 0; n < s.length; n++) {
				let r = s[n],
					a = u[n - 1],
					c,
					p,
					m;
				{
					const n = a?.search ?? e.search,
						i = a?._strictSearch ?? void 0;
					try {
						const e = Y(r.options.validateSearch, { ...n }) ?? void 0;
						(c = { ...n, ...e }), (p = { ...i, ...e }), (m = void 0);
					} catch (e) {
						let r = e;
						if ((e instanceof J || (r = new J(e.message, { cause: e })), t?.throwOnError)) throw r;
						(c = n), (p = {}), (m = r);
					}
				}
				let h = r.options.loaderDeps?.({ search: c }) ?? ``,
					g = h ? JSON.stringify(h) : ``,
					{ interpolatedPath: _, usedParams: y } = x({
						path: r.fullPath,
						params: i,
						decoder: this.pathParamsDecoder,
						server: this.isServer,
					}),
					S = r.id + _ + g,
					C = this.getMatch(S),
					w = d.get(r.id),
					T = C?._strictParams ?? y,
					E;
				if (!C)
					try {
						rt(r, y, o, T);
					} catch (e) {
						if (((E = M(e) || N(e) ? e : new Ze(e.message, { cause: e })), t?.throwOnError)) throw E;
					}
				Object.assign(i, T);
				let D = w ? `stay` : `enter`,
					O;
				if (C)
					O = {
						...C,
						cause: D,
						params: w?.params ?? i,
						_strictParams: T,
						search: v(w ? w.search : C.search, c),
						_strictSearch: p,
					};
				else {
					const e = r.options.loader || r.options.beforeLoad || r.lazyFn || Ve(r) ? `pending` : `success`;
					O = {
						id: S,
						ssr: r.options.ssr,
						index: n,
						routeId: r.id,
						params: w?.params ?? i,
						_strictParams: T,
						pathname: _,
						updatedAt: Date.now(),
						search: w ? v(w.search, c) : c,
						_strictSearch: p,
						searchError: void 0,
						status: e,
						isFetching: !1,
						error: void 0,
						paramsError: E,
						__routeContext: void 0,
						_nonReactive: { loadPromise: f() },
						__beforeLoadContext: void 0,
						context: {},
						abortController: new AbortController(),
						fetchCount: 0,
						cause: D,
						loaderDeps: w ? b(w.loaderDeps, h) : h,
						invalid: !1,
						preload: !1,
						links: void 0,
						scripts: void 0,
						headScripts: void 0,
						meta: void 0,
						staticData: r.options.staticData || {},
						fullPath: r.fullPath,
					};
				}
				t?.preload || (O.globalNotFound = l === r.id), (O.searchError = m);
				const ee = this.getParentContext(a);
				(O.context = { ...ee, ...O.__routeContext, ...O.__beforeLoadContext }), (u[n] = O);
			}
			for (let t = 0; t < u.length; t++) {
				const n = u[t],
					r = this.looseRoutesById[n.routeId],
					a = this.getMatch(n.id),
					o = d.get(n.routeId);
				if (((n.params = o ? v(o.params, i) : i), !a)) {
					const i = u[t - 1],
						a = this.getParentContext(i);
					if (r.options.context) {
						const t = {
							deps: n.loaderDeps,
							params: n.params,
							context: a ?? {},
							location: e,
							navigate: (t) => this.navigate({ ...t, _fromLocation: e }),
							buildLocation: this.buildLocation,
							cause: n.cause,
							abortController: n.abortController,
							preload: !!n.preload,
							matches: u,
							routeId: r.id,
						};
						n.__routeContext = r.options.context(t) ?? void 0;
					}
					n.context = { ...a, ...n.__routeContext, ...n.__beforeLoadContext };
				}
			}
			return u;
		}
		matchRoutesLightweight(e) {
			const { matchedRoutes: t, routeParams: n, parsedParams: r } = this.getMatchedRoutes(e.pathname),
				i = u(t),
				a = { ...e.search };
			for (const e of t)
				try {
					Object.assign(a, Y(e.options.validateSearch, a));
				} catch {}
			let o = u(this.stores.matchesId.get()),
				s = o && this.stores.matchStores.get(o)?.get(),
				c = s && s.routeId === i.id && s.pathname === e.pathname,
				l;
			if (c) l = s.params;
			else {
				const e = Object.assign(Object.create(null), n);
				for (const i of t)
					try {
						rt(i, n, r ?? {}, e);
					} catch {}
				l = e;
			}
			return { matchedRoutes: t, fullPath: i.fullPath, search: a, params: l };
		}
	},
	J = class extends Error {},
	Ze = class extends Error {};
function Qe(e) {
	return {
		loadedAt: 0,
		isLoading: !1,
		isTransitioning: !1,
		status: `idle`,
		resolvedLocation: void 0,
		location: e,
		matches: [],
		statusCode: 200,
	};
}
function Y(e, t) {
	if (e == null) return {};
	if (`~standard` in e) {
		const n = e[`~standard`].validate(t);
		if (n instanceof Promise) throw new J(`Async validation not supported`);
		if (n.issues) throw new J(JSON.stringify(n.issues, void 0, 2), { cause: n });
		return n.value;
	}
	return `parse` in e ? e.parse(t) : typeof e == `function` ? e(t) : {};
}
function $e({ pathname: e, routesById: t, processedTree: n }) {
	let r = Object.create(null),
		i = a(e),
		o,
		s,
		c = _(i, n, !0);
	return (
		c && ((o = c.route), Object.assign(r, c.rawParams), (s = Object.assign(Object.create(null), c.parsedParams))),
		{ matchedRoutes: c?.branch || [t.__root__], routeParams: r, foundRoute: o, parsedParams: s }
	);
}
function et({ search: e, dest: t, destRoutes: n, _includeValidateSearch: r }) {
	return tt(n)(e, t, r ?? !1);
}
function tt(e) {
	const t = { dest: null, _includeValidateSearch: !1, middlewares: [] };
	for (const n of e)
		`search` in n.options
			? n.options.search?.middlewares && t.middlewares.push(...n.options.search.middlewares)
			: (n.options.preSearchFilters || n.options.postSearchFilters) &&
				t.middlewares.push(({ search: e, next: t }) => {
					let r = e;
					`preSearchFilters` in n.options &&
						n.options.preSearchFilters &&
						(r = n.options.preSearchFilters.reduce((e, t) => t(e), e));
					const i = t(r);
					return `postSearchFilters` in n.options && n.options.postSearchFilters
						? n.options.postSearchFilters.reduce((e, t) => t(e), i)
						: i;
				}),
			n.options.validateSearch &&
				t.middlewares.push(({ search: e, next: r }) => {
					const i = r(e);
					if (!t._includeValidateSearch) return i;
					try {
						return { ...i, ...(Y(n.options.validateSearch, i) ?? void 0) };
					} catch {
						return i;
					}
				});
	t.middlewares.push(({ search: e }) => {
		const n = t.dest;
		return n.search ? (n.search === !0 ? e : d(n.search, e)) : {};
	});
	const n = (e, t, r) => {
		if (e >= r.length) return t;
		const i = r[e];
		return i({ search: t, next: (t) => n(e + 1, t, r) });
	};
	return (e, r, i) => ((t.dest = r), (t._includeValidateSearch = i), n(0, e, t.middlewares));
}
function nt(e, t) {
	if (e !== `root`)
		for (let e = t.length - 1; e >= 0; e--) {
			const n = t[e];
			if (n.children) return n.id;
		}
	return te;
}
function rt(e, t, n, r) {
	const i = e.options.params?.parse ?? e.options.parseParams;
	if (i)
		if (e.options.skipRouteOnParseError) for (const e in t) e in n && (r[e] = n[e]);
		else {
			const e = i(r);
			Object.assign(r, e);
		}
}
var X = e(n(), 1),
	Z = e(t(), 1);
function it(e) {
	const t = e.errorComponent ?? Q;
	return (0, Z.jsx)(at, {
		getResetKey: e.getResetKey,
		onCatch: e.onCatch,
		children: ({ error: n, reset: r }) => (n ? X.createElement(t, { error: n, reset: r }) : e.children),
	});
}
var at = class extends X.Component {
	constructor(...e) {
		super(...e), (this.state = { error: null });
	}
	static getDerivedStateFromProps(e, t) {
		const n = e.getResetKey();
		return t.error && t.resetKey !== n ? { resetKey: n, error: null } : { resetKey: n };
	}
	static getDerivedStateFromError(e) {
		return { error: e };
	}
	reset() {
		this.setState({ error: null });
	}
	componentDidCatch(e, t) {
		this.props.onCatch && this.props.onCatch(e, t);
	}
	render() {
		return this.props.children({
			error: this.state.error,
			reset: () => {
				this.reset();
			},
		});
	}
};
function Q({ error: e }) {
	const [t, n] = X.useState(!1);
	return (0, Z.jsxs)(`div`, {
		style: { padding: `.5rem`, maxWidth: `100%` },
		children: [
			(0, Z.jsxs)(`div`, {
				style: { display: `flex`, alignItems: `center`, gap: `.5rem` },
				children: [
					(0, Z.jsx)(`strong`, { style: { fontSize: `1rem` }, children: `Something went wrong!` }),
					(0, Z.jsx)(`button`, {
						style: {
							appearance: `none`,
							fontSize: `.6em`,
							border: `1px solid currentColor`,
							padding: `.1rem .2rem`,
							fontWeight: `bold`,
							borderRadius: `.25rem`,
						},
						onClick: () => n((e) => !e),
						children: t ? `Hide Error` : `Show Error`,
					}),
				],
			}),
			(0, Z.jsx)(`div`, { style: { height: `.25rem` } }),
			t
				? (0, Z.jsx)(`div`, {
						children: (0, Z.jsx)(`pre`, {
							style: {
								fontSize: `.7em`,
								border: `1px solid red`,
								borderRadius: `.25rem`,
								padding: `.3rem`,
								color: `red`,
								overflow: `auto`,
							},
							children: e.message ? (0, Z.jsx)(`code`, { children: e.message }) : null,
						}),
					})
				: null,
		],
	});
}
function ot(e) {
	const t = T(),
		n = `not-found-${A(t.stores.location, (e) => e.pathname)}-${A(t.stores.status, (e) => e)}`;
	return (0, Z.jsx)(it, {
		getResetKey: () => n,
		onCatch: (t, n) => {
			if (M(t)) e.onCatch?.(t, n);
			else throw t;
		},
		errorComponent: ({ error: t }) => {
			if (M(t)) return e.fallback?.(t);
			throw t;
		},
		children: e.children,
	});
}
function st() {
	return (0, Z.jsx)(`p`, { children: `Not Found` });
}
function $(e) {
	return (0, Z.jsx)(Z.Fragment, { children: e.children });
}
function ct(e, t, n) {
	return t.options.notFoundComponent
		? (0, Z.jsx)(t.options.notFoundComponent, { ...n })
		: e.options.defaultNotFoundComponent
			? (0, Z.jsx)(e.options.defaultNotFoundComponent, { ...n })
			: (0, Z.jsx)(st, {});
}
var lt = X.memo(({ matchId: e }) => {
	const t = T(),
		n = t.stores.matchStores.get(e);
	n || j();
	const r = A(t.stores.loadedAt, (e) => e),
		i = A(n, (e) => e);
	return (0, Z.jsx)(ut, {
		router: t,
		matchId: e,
		resetKey: r,
		matchState: X.useMemo(() => {
			const e = i.routeId,
				n = t.routesById[e].parentRoute?.id;
			return { routeId: e, ssr: i.ssr, _displayPending: i._displayPending, parentRouteId: n };
		}, [i._displayPending, i.routeId, i.ssr, t.routesById]),
	});
});
function ut({ router: e, matchId: t, resetKey: n, matchState: r }) {
	const i = e.routesById[r.routeId],
		a = i.options.pendingComponent ?? e.options.defaultPendingComponent,
		o = a ? (0, Z.jsx)(a, {}) : null,
		s = i.options.errorComponent ?? e.options.defaultErrorComponent,
		c = i.options.onCatch ?? e.options.defaultOnCatch,
		l = i.isRoot
			? (i.options.notFoundComponent ?? e.options.notFoundRoute?.options.component)
			: i.options.notFoundComponent,
		u = r.ssr === !1 || r.ssr === `data-only`,
		d =
			(!i.isRoot || i.options.wrapInSuspense || u) &&
			(i.options.wrapInSuspense ?? a ?? (i.options.errorComponent?.preload || u))
				? X.Suspense
				: $,
		f = s ? it : $,
		p = l ? ot : $;
	return (0, Z.jsxs)(i.isRoot ? (i.options.shellComponent ?? $) : $, {
		children: [
			(0, Z.jsx)(k.Provider, {
				value: t,
				children: (0, Z.jsx)(d, {
					fallback: o,
					children: (0, Z.jsx)(f, {
						getResetKey: () => n,
						errorComponent: s || Q,
						onCatch: (e, t) => {
							if (M(e)) throw ((e.routeId ??= r.routeId), e);
							c?.(e, t);
						},
						children: (0, Z.jsx)(p, {
							fallback: (e) => {
								if (
									((e.routeId ??= r.routeId), !l || (e.routeId && e.routeId !== r.routeId) || (!e.routeId && !i.isRoot))
								)
									throw e;
								return X.createElement(l, e);
							},
							children:
								u || r._displayPending
									? (0, Z.jsx)(ee, { fallback: o, children: (0, Z.jsx)(ft, { matchId: t }) })
									: (0, Z.jsx)(ft, { matchId: t }),
						}),
					}),
				}),
			}),
			r.parentRouteId === `__root__`
				? (0, Z.jsxs)(Z.Fragment, { children: [(0, Z.jsx)(dt, { resetKey: n }), (e.options.scrollRestoration, null)] })
				: null,
		],
	});
}
function dt({ resetKey: e }) {
	const t = T(),
		n = X.useRef(void 0);
	return (
		C(() => {
			const e = t.latestLocation.href;
			(n.current === void 0 || n.current !== e) &&
				(t.emit({ type: `onRendered`, ...q(t.stores.location.get(), t.stores.resolvedLocation.get()) }),
				(n.current = e));
		}, [t.latestLocation.state.__TSR_key, e, t]),
		null
	);
}
var ft = X.memo(({ matchId: e }) => {
		const t = T(),
			n = (e, n) => t.getMatch(e.id)?._nonReactive[n] ?? e._nonReactive[n],
			r = t.stores.matchStores.get(e);
		r || j();
		const i = A(r, (e) => e),
			a = i.routeId,
			o = t.routesById[a],
			s = X.useMemo(() => {
				const e = (t.routesById[a].options.remountDeps ?? t.options.defaultRemountDeps)?.({
					routeId: a,
					loaderDeps: i.loaderDeps,
					params: i._strictParams,
					search: i._strictSearch,
				});
				return e ? JSON.stringify(e) : void 0;
			}, [a, i.loaderDeps, i._strictParams, i._strictSearch, t.options.defaultRemountDeps, t.routesById]),
			c = X.useMemo(() => {
				const e = o.options.component ?? t.options.defaultComponent;
				return e ? (0, Z.jsx)(e, {}, s) : (0, Z.jsx)(pt, {});
			}, [s, o.options.component, t.options.defaultComponent]);
		if (i._displayPending) throw n(i, `displayPendingPromise`);
		if (i._forcePending) throw n(i, `minPendingPromise`);
		if (i.status === `pending`) {
			const e = o.options.pendingMinMs ?? t.options.defaultPendingMinMs;
			if (e) {
				const n = t.getMatch(i.id);
				if (n && !n._nonReactive.minPendingPromise) {
					const t = f();
					(n._nonReactive.minPendingPromise = t),
						setTimeout(() => {
							t.resolve(), (n._nonReactive.minPendingPromise = void 0);
						}, e);
				}
			}
			throw n(i, `loadPromise`);
		}
		if (i.status === `notFound`) return M(i.error) || j(), ct(t, o, i.error);
		if (i.status === `redirected`) throw (N(i.error) || j(), n(i, `loadPromise`));
		if (i.status === `error`) throw i.error;
		return c;
	}),
	pt = X.memo(() => {
		let e = T(),
			t = X.useContext(k),
			n,
			r = !1,
			i;
		{
			const a = t ? e.stores.matchStores.get(t) : void 0;
			([n, r] = A(a, (e) => [e?.routeId, e?.globalNotFound ?? !1])),
				(i = A(e.stores.matchesId, (e) => e[e.findIndex((e) => e === t) + 1]));
		}
		const a = n ? e.routesById[n] : void 0,
			o = e.options.defaultPendingComponent ? (0, Z.jsx)(e.options.defaultPendingComponent, {}) : null;
		if (r) return a || j(), ct(e, a, void 0);
		if (!i) return null;
		const s = (0, Z.jsx)(lt, { matchId: i });
		return n === `__root__` ? (0, Z.jsx)(X.Suspense, { fallback: o, children: s }) : s;
	});
export { Q as a, q as c, it as i, Ce as l, pt as n, Xe as o, $ as r, Ye as s, lt as t, we as u };
