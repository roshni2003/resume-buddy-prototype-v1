import { o as e } from "./jsx-runtime-D7jARjhZ.js";
import { t } from "./react-BZSX5Bs9.js";

function n(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { code: e, message: t, toString: () => e }]));
}
var r = n({
		CHALLENGE_NOT_FOUND: `Challenge not found`,
		YOU_ARE_NOT_ALLOWED_TO_REGISTER_THIS_PASSKEY: `You are not allowed to register this passkey`,
		FAILED_TO_VERIFY_REGISTRATION: `Failed to verify registration`,
		PASSKEY_NOT_FOUND: `Passkey not found`,
		AUTHENTICATION_FAILED: `Authentication failed`,
		UNABLE_TO_CREATE_SESSION: `Unable to create session`,
		FAILED_TO_UPDATE_PASSKEY: `Failed to update passkey`,
		PREVIOUSLY_REGISTERED: `Previously registered`,
		REGISTRATION_CANCELLED: `Registration cancelled`,
		AUTH_CANCELLED: `Auth cancelled`,
		UNKNOWN_ERROR: `Unknown error`,
		SESSION_REQUIRED: `Passkey registration requires an authenticated session`,
		RESOLVE_USER_REQUIRED: `Passkey registration requires either an authenticated session or a resolveUser callback when requireSession is false`,
		RESOLVED_USER_INVALID: `Resolved user is invalid`,
	}),
	i = `1.6.9`;
function a(e) {
	let t = new Uint8Array(e),
		n = ``;
	for (const e of t) n += String.fromCharCode(e);
	return btoa(n).replace(/\+/g, `-`).replace(/\//g, `_`).replace(/=/g, ``);
}
function o(e) {
	const t = e.replace(/-/g, `+`).replace(/_/g, `/`),
		n = (4 - (t.length % 4)) % 4,
		r = t.padEnd(t.length + n, `=`),
		i = atob(r),
		a = new ArrayBuffer(i.length),
		o = new Uint8Array(a);
	for (let e = 0; e < i.length; e++) o[e] = i.charCodeAt(e);
	return a;
}
function s() {
	return c.stubThis(globalThis?.PublicKeyCredential !== void 0 && typeof globalThis.PublicKeyCredential == `function`);
}
const c = { stubThis: (e) => e };
function l(e) {
	const { id: t } = e;
	return { ...e, id: o(t), transports: e.transports };
}
function u(e) {
	return e === `localhost` || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e);
}
var d = class extends Error {
	constructor({ message: e, code: t, cause: n, name: r }) {
		super(e, { cause: n }),
			Object.defineProperty(this, `code`, { enumerable: !0, configurable: !0, writable: !0, value: void 0 }),
			(this.name = r ?? n.name),
			(this.code = t);
	}
};
function f({ error: e, options: t }) {
	const { publicKey: n } = t;
	if (!n) throw Error(`options was missing required publicKey property`);
	if (e.name === `AbortError`) {
		if (t.signal instanceof AbortSignal)
			return new d({
				message: `Registration ceremony was sent an abort signal`,
				code: `ERROR_CEREMONY_ABORTED`,
				cause: e,
			});
	} else if (e.name === `ConstraintError`) {
		if (n.authenticatorSelection?.requireResidentKey === !0)
			return new d({
				message: `Discoverable credentials were required but no available authenticator supported it`,
				code: `ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT`,
				cause: e,
			});
		if (t.mediation === `conditional` && n.authenticatorSelection?.userVerification === `required`)
			return new d({
				message: `User verification was required during automatic registration but it could not be performed`,
				code: `ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE`,
				cause: e,
			});
		if (n.authenticatorSelection?.userVerification === `required`)
			return new d({
				message: `User verification was required but no available authenticator supported it`,
				code: `ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT`,
				cause: e,
			});
	} else if (e.name === `InvalidStateError`)
		return new d({
			message: `The authenticator was previously registered`,
			code: `ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED`,
			cause: e,
		});
	else if (e.name === `NotAllowedError`)
		return new d({ message: e.message, code: `ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`, cause: e });
	else if (e.name === `NotSupportedError`)
		return n.pubKeyCredParams.filter((e) => e.type === `public-key`).length === 0
			? new d({
					message: `No entry in pubKeyCredParams was of type "public-key"`,
					code: `ERROR_MALFORMED_PUBKEYCREDPARAMS`,
					cause: e,
				})
			: new d({
					message: `No available authenticator supported any of the specified pubKeyCredParams algorithms`,
					code: `ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG`,
					cause: e,
				});
	else if (e.name === `SecurityError`) {
		const t = globalThis.location.hostname;
		if (u(t)) {
			if (n.rp.id !== t)
				return new d({
					message: `The RP ID "${n.rp.id}" is invalid for this domain`,
					code: `ERROR_INVALID_RP_ID`,
					cause: e,
				});
		} else
			return new d({
				message: `${globalThis.location.hostname} is an invalid domain`,
				code: `ERROR_INVALID_DOMAIN`,
				cause: e,
			});
	} else if (e.name === `TypeError`) {
		if (n.user.id.byteLength < 1 || n.user.id.byteLength > 64)
			return new d({
				message: `User ID was not between 1 and 64 characters`,
				code: `ERROR_INVALID_USER_ID_LENGTH`,
				cause: e,
			});
	} else if (e.name === `UnknownError`)
		return new d({
			message: `The authenticator was unable to process the specified options, or could not create a new credential`,
			code: `ERROR_AUTHENTICATOR_GENERAL_ERROR`,
			cause: e,
		});
	return e;
}
const p = new (class {
	constructor() {
		Object.defineProperty(this, `controller`, { enumerable: !0, configurable: !0, writable: !0, value: void 0 });
	}
	createNewAbortSignal() {
		if (this.controller) {
			const e = Error(`Cancelling existing WebAuthn API call for new one`);
			(e.name = `AbortError`), this.controller.abort(e);
		}
		const e = new AbortController();
		return (this.controller = e), e.signal;
	}
	cancelCeremony() {
		if (this.controller) {
			const e = Error(`Manually cancelling existing WebAuthn API call`);
			(e.name = `AbortError`), this.controller.abort(e), (this.controller = void 0);
		}
	}
})();
var m = [`cross-platform`, `platform`];
function h(e) {
	if (e && !(m.indexOf(e) < 0)) return e;
}
async function g(e) {
	!e.optionsJSON &&
		e.challenge &&
		(console.warn(
			`startRegistration() was not called correctly. It will try to continue with the provided options, but this call should be refactored to use the expected call structure instead. See https://simplewebauthn.dev/docs/packages/browser#typeerror-cannot-read-properties-of-undefined-reading-challenge for more information.`,
		),
		(e = { optionsJSON: e }));
	const { optionsJSON: t, useAutoRegister: n = !1 } = e;
	if (!s()) throw Error(`WebAuthn is not supported in this browser`);
	const r = {
			...t,
			challenge: o(t.challenge),
			user: { ...t.user, id: o(t.user.id) },
			excludeCredentials: t.excludeCredentials?.map(l),
		},
		i = {};
	n && (i.mediation = `conditional`), (i.publicKey = r), (i.signal = p.createNewAbortSignal());
	let c;
	try {
		c = await navigator.credentials.create(i);
	} catch (e) {
		throw f({ error: e, options: i });
	}
	if (!c) throw Error(`Registration was not completed`);
	let { id: u, rawId: d, response: m, type: g } = c,
		v;
	typeof m.getTransports == `function` && (v = m.getTransports());
	let y;
	if (typeof m.getPublicKeyAlgorithm == `function`)
		try {
			y = m.getPublicKeyAlgorithm();
		} catch (e) {
			_(`getPublicKeyAlgorithm()`, e);
		}
	let b;
	if (typeof m.getPublicKey == `function`)
		try {
			const e = m.getPublicKey();
			e !== null && (b = a(e));
		} catch (e) {
			_(`getPublicKey()`, e);
		}
	let x;
	if (typeof m.getAuthenticatorData == `function`)
		try {
			x = a(m.getAuthenticatorData());
		} catch (e) {
			_(`getAuthenticatorData()`, e);
		}
	return {
		id: u,
		rawId: a(d),
		response: {
			attestationObject: a(m.attestationObject),
			clientDataJSON: a(m.clientDataJSON),
			transports: v,
			publicKeyAlgorithm: y,
			publicKey: b,
			authenticatorData: x,
		},
		type: g,
		clientExtensionResults: c.getClientExtensionResults(),
		authenticatorAttachment: h(c.authenticatorAttachment),
	};
}
function _(e, t) {
	console.warn(
		`The browser extension that intercepted this WebAuthn API call incorrectly implemented ${e}. You should report this error to them.\n`,
		t,
	);
}
function v() {
	if (!s()) return y.stubThis(new Promise((e) => e(!1)));
	const e = globalThis.PublicKeyCredential;
	return e?.isConditionalMediationAvailable === void 0
		? y.stubThis(new Promise((e) => e(!1)))
		: y.stubThis(e.isConditionalMediationAvailable());
}
const y = { stubThis: (e) => e };
function b({ error: e, options: t }) {
	const { publicKey: n } = t;
	if (!n) throw Error(`options was missing required publicKey property`);
	if (e.name === `AbortError`) {
		if (t.signal instanceof AbortSignal)
			return new d({
				message: `Authentication ceremony was sent an abort signal`,
				code: `ERROR_CEREMONY_ABORTED`,
				cause: e,
			});
	} else if (e.name === `NotAllowedError`)
		return new d({ message: e.message, code: `ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`, cause: e });
	else if (e.name === `SecurityError`) {
		const t = globalThis.location.hostname;
		if (u(t)) {
			if (n.rpId !== t)
				return new d({
					message: `The RP ID "${n.rpId}" is invalid for this domain`,
					code: `ERROR_INVALID_RP_ID`,
					cause: e,
				});
		} else
			return new d({
				message: `${globalThis.location.hostname} is an invalid domain`,
				code: `ERROR_INVALID_DOMAIN`,
				cause: e,
			});
	} else if (e.name === `UnknownError`)
		return new d({
			message: `The authenticator was unable to process the specified options, or could not create a new assertion signature`,
			code: `ERROR_AUTHENTICATOR_GENERAL_ERROR`,
			cause: e,
		});
	return e;
}
async function x(e) {
	!e.optionsJSON &&
		e.challenge &&
		(console.warn(
			`startAuthentication() was not called correctly. It will try to continue with the provided options, but this call should be refactored to use the expected call structure instead. See https://simplewebauthn.dev/docs/packages/browser#typeerror-cannot-read-properties-of-undefined-reading-challenge for more information.`,
		),
		(e = { optionsJSON: e }));
	const { optionsJSON: t, useBrowserAutofill: n = !1, verifyBrowserAutofillInput: r = !0 } = e;
	if (!s()) throw Error(`WebAuthn is not supported in this browser`);
	let i;
	t.allowCredentials?.length !== 0 && (i = t.allowCredentials?.map(l));
	const c = { ...t, challenge: o(t.challenge), allowCredentials: i },
		u = {};
	if (n) {
		if (!(await v())) throw Error(`Browser does not support WebAuthn autofill`);
		if (document.querySelectorAll(`input[autocomplete$='webauthn']`).length < 1 && r)
			throw Error('No <input> with "webauthn" as the only or last value in its `autocomplete` attribute was detected');
		(u.mediation = `conditional`), (c.allowCredentials = []);
	}
	(u.publicKey = c), (u.signal = p.createNewAbortSignal());
	let d;
	try {
		d = await navigator.credentials.get(u);
	} catch (e) {
		throw b({ error: e, options: u });
	}
	if (!d) throw Error(`Authentication was not completed`);
	let { id: f, rawId: m, response: g, type: _ } = d,
		y;
	return (
		g.userHandle && (y = a(g.userHandle)),
		{
			id: f,
			rawId: a(m),
			response: {
				authenticatorData: a(g.authenticatorData),
				clientDataJSON: a(g.clientDataJSON),
				signature: a(g.signature),
				userHandle: y,
			},
			type: _,
			clientExtensionResults: d.getClientExtensionResults(),
			authenticatorAttachment: h(d.authenticatorAttachment),
		}
	);
}
var S = `1.6.9`,
	C = Symbol.for(`better-auth:broadcast-channel`),
	ee = () => Math.floor(Date.now() / 1e3),
	te = class {
		listeners = new Set();
		name;
		constructor(e = `better-auth.message`) {
			this.name = e;
		}
		subscribe(e) {
			return (
				this.listeners.add(e),
				() => {
					this.listeners.delete(e);
				}
			);
		}
		post(e) {
			if (!(typeof window > `u`))
				try {
					localStorage.setItem(this.name, JSON.stringify({ ...e, timestamp: ee() }));
				} catch {}
		}
		setup() {
			if (typeof window > `u` || window.addEventListener === void 0) return () => {};
			const e = (e) => {
				if (e.key !== this.name) return;
				const t = JSON.parse(e.newValue ?? `{}`);
				t?.event !== `session` || !t?.data || this.listeners.forEach((e) => e(t));
			};
			return (
				window.addEventListener(`storage`, e),
				() => {
					window.removeEventListener(`storage`, e);
				}
			);
		}
	};
function w(e = `better-auth.message`) {
	return globalThis[C] || (globalThis[C] = new te(e)), globalThis[C];
}
var T = Symbol.for(`better-auth:focus-manager`),
	ne = class {
		listeners = new Set();
		subscribe(e) {
			return (
				this.listeners.add(e),
				() => {
					this.listeners.delete(e);
				}
			);
		}
		setFocused(e) {
			this.listeners.forEach((t) => t(e));
		}
		setup() {
			if (typeof window > `u` || typeof document > `u` || window.addEventListener === void 0) return () => {};
			const e = () => {
				document.visibilityState === `visible` && this.setFocused(!0);
			};
			return (
				document.addEventListener(`visibilitychange`, e, !1),
				() => {
					document.removeEventListener(`visibilitychange`, e, !1);
				}
			);
		}
	};
function re() {
	return globalThis[T] || (globalThis[T] = new ne()), globalThis[T];
}
var E = Symbol.for(`better-auth:online-manager`),
	ie = class {
		listeners = new Set();
		isOnline = typeof navigator < `u` ? navigator.onLine : !0;
		subscribe(e) {
			return (
				this.listeners.add(e),
				() => {
					this.listeners.delete(e);
				}
			);
		}
		setOnline(e) {
			(this.isOnline = e), this.listeners.forEach((t) => t(e));
		}
		setup() {
			if (typeof window > `u` || window.addEventListener === void 0) return () => {};
			const e = () => this.setOnline(!0),
				t = () => this.setOnline(!1);
			return (
				window.addEventListener(`online`, e, !1),
				window.addEventListener(`offline`, t, !1),
				() => {
					window.removeEventListener(`online`, e, !1), window.removeEventListener(`offline`, t, !1);
				}
			);
		}
	};
function D() {
	return globalThis[E] || (globalThis[E] = new ie()), globalThis[E];
}
var ae = {
		proto:
			/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
		constructor:
			/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
		protoShort: /"__proto__"\s*:/,
		constructorShort: /"constructor"\s*:/,
	},
	oe = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/,
	O = { true: !0, false: !1, null: null, undefined: void 0, nan: NaN, infinity: 1 / 0, "-infinity": -1 / 0 },
	se = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function ce(e) {
	return e instanceof Date && !isNaN(e.getTime());
}
function le(e) {
	const t = se.exec(e);
	if (!t) return null;
	const [, n, r, i, a, o, s, c, l, u, d] = t,
		f = new Date(
			Date.UTC(
				parseInt(n, 10),
				parseInt(r, 10) - 1,
				parseInt(i, 10),
				parseInt(a, 10),
				parseInt(o, 10),
				parseInt(s, 10),
				c ? parseInt(c.padEnd(3, `0`), 10) : 0,
			),
		);
	if (l) {
		const e = (parseInt(u, 10) * 60 + parseInt(d, 10)) * (l === `+` ? -1 : 1);
		f.setUTCMinutes(f.getUTCMinutes() + e);
	}
	return ce(f) ? f : null;
}
function ue(e, t = {}) {
	const { strict: n = !1, warnings: r = !1, reviver: i, parseDates: a = !0 } = t;
	if (typeof e != `string`) return e;
	const o = e.trim();
	if (o.length > 0 && o[0] === `"` && o.endsWith(`"`) && !o.slice(1, -1).includes(`"`)) return o.slice(1, -1);
	const s = o.toLowerCase();
	if (s.length <= 9 && s in O) return O[s];
	if (!oe.test(o)) {
		if (n) throw SyntaxError(`[better-json] Invalid JSON`);
		return e;
	}
	if (
		Object.entries(ae).some(([e, t]) => {
			const n = t.test(o);
			return (
				n && r && console.warn(`[better-json] Detected potential prototype pollution attempt using ${e} pattern`), n
			);
		}) &&
		n
	)
		throw Error(`[better-json] Potential prototype pollution attempt detected`);
	try {
		return JSON.parse(o, (e, t) => {
			if (e === `__proto__` || (e === `constructor` && t && typeof t == `object` && `prototype` in t)) {
				r && console.warn(`[better-json] Dropping "${e}" key to prevent prototype pollution`);
				return;
			}
			if (a && typeof t == `string`) {
				const e = le(t);
				if (e) return e;
			}
			return i ? i(e, t) : t;
		});
	} catch (t) {
		if (n) throw t;
		return e;
	}
}
function de(e, t = { strict: !0 }) {
	return ue(e, t);
}
var k = [],
	A = 0,
	j = 4;
const fe = (globalThis.nanostoresGlobal ||= { epoch: 0 }),
	M = (e) => {
		const t = [],
			n = {
				get() {
					return n.lc || n.listen(() => {})(), n.value;
				},
				init: e,
				lc: 0,
				listen(e) {
					return (
						(n.lc = t.push(e)),
						() => {
							for (let t = A + j; t < k.length; ) k[t] === e ? k.splice(t, j) : (t += j);
							const r = t.indexOf(e);
							~r && (t.splice(r, 1), --n.lc || n.off());
						}
					);
				},
				notify(e, r) {
					fe.epoch++;
					const i = !k.length;
					for (const i of t) k.push(i, n.value, e, r);
					if (i) {
						for (A = 0; A < k.length; A += j) k[A](k[A + 1], k[A + 2], k[A + 3]);
						k.length = 0;
					}
				},
				off() {},
				set(e) {
					const t = n.value;
					t !== e && ((n.value = e), n.notify(t));
				},
				subscribe(e) {
					const t = n.listen(e);
					return e(n.value), t;
				},
				value: e,
			};
		return n;
	};
var pe = 5,
	N = 6,
	P = 10;
const me = (e, t, n, r) => (
		(e.events = e.events || {}),
		e.events[n + P] ||
			(e.events[n + P] = r((t) => {
				e.events[n].reduceRight((e, t) => (t(e), e), { shared: {}, ...t });
			})),
		(e.events[n] = e.events[n] || []),
		e.events[n].push(t),
		() => {
			const r = e.events[n],
				i = r.indexOf(t);
			r.splice(i, 1), r.length || (delete e.events[n], e.events[n + P](), delete e.events[n + P]);
		}
	),
	he = (e, t) =>
		me(
			e,
			(n) => {
				const r = t(n);
				r && e.events[N].push(r);
			},
			pe,
			(t) => {
				const n = e.listen;
				e.listen = (...r) => (!e.lc && !e.active && ((e.active = !0), t()), n(...r));
				const r = e.off;
				return (
					(e.events[N] = []),
					(e.off = () => {
						r(),
							setTimeout(() => {
								if (e.active && !e.lc) {
									e.active = !1;
									for (const t of e.events[N]) t();
									e.events[N] = [];
								}
							}, 1e3);
					}),
					() => {
						(e.listen = n), (e.off = r);
					}
				);
			},
		);
function ge(e, t, n) {
	const r = new Set(t).add(void 0);
	return e.listen((e, t, i) => {
		r.has(i) && n(e, t, i);
	});
}
var _e = () => typeof window > `u`,
	ve = (e, t, n, r) => {
		const i = M({ data: null, error: null, isPending: !0, isRefetching: !1, refetch: (e) => a(e) }),
			a = async (e) =>
				new Promise((a) => {
					const o =
						typeof r == `function` ? r({ data: i.get().data, error: i.get().error, isPending: i.get().isPending }) : r;
					n(t, {
						...o,
						query: { ...o?.query, ...e?.query },
						async onSuccess(e) {
							i.set({ data: e.data, error: null, isPending: !1, isRefetching: !1, refetch: i.value.refetch }),
								await o?.onSuccess?.(e);
						},
						async onError(e) {
							const { request: t } = e,
								n = typeof t.retry == `number` ? t.retry : t.retry?.attempts,
								r = t.retryAttempt || 0;
							if (n && r < n) return;
							const a = e.error.status === 401;
							i.set({
								error: e.error,
								data: a ? null : i.get().data,
								isPending: !1,
								isRefetching: !1,
								refetch: i.value.refetch,
							}),
								await o?.onError?.(e);
						},
						async onRequest(e) {
							const t = i.get();
							i.set({
								isPending: t.data === null,
								data: t.data,
								error: null,
								isRefetching: !0,
								refetch: i.value.refetch,
							}),
								await o?.onRequest?.(e);
						},
					})
						.catch((e) => {
							i.set({ error: e, data: i.get().data, isPending: !1, isRefetching: !1, refetch: i.value.refetch });
						})
						.finally(() => {
							a(void 0);
						});
				});
		e = Array.isArray(e) ? e : [e];
		let o = !1;
		for (const t of e)
			t.subscribe(async () => {
				_e() ||
					(o
						? await a()
						: he(i, () => {
								const e = setTimeout(async () => {
									o || ((o = !0), await a());
								}, 0);
								return () => {
									i.off(), t.off(), clearTimeout(e);
								};
							}));
			});
		return i;
	},
	F = () => Math.floor(Date.now() / 1e3);
function I(e) {
	return typeof e == `object` && e && `data` in e && `error` in e ? e : { data: e, error: null };
}
var ye = 5;
function be(e) {
	const { sessionAtom: t, sessionSignal: n, $fetch: r, options: i = {} } = e,
		a = i.sessionOptions?.refetchInterval ?? 0,
		o = i.sessionOptions?.refetchOnWindowFocus ?? !0,
		s = i.sessionOptions?.refetchWhenOffline ?? !1,
		c = { lastSync: 0, lastSessionRequest: 0, cachedSession: void 0 },
		l = () => s || D().isOnline,
		u = (e) => {
			if (!l()) return;
			if (e?.event === `storage`) {
				(c.lastSync = F()), n.set(!n.get());
				return;
			}
			const i = t.get(),
				a = () => {
					(c.lastSessionRequest = F()),
						r(`/get-session`)
							.then(async (e) => {
								let { data: a, error: o } = I(e);
								if (a?.needsRefresh)
									try {
										const e = await r(`/get-session`, { method: `POST` });
										({ data: a, error: o } = I(e));
									} catch {}
								const s = a?.session && a?.user ? a : null;
								t.set({ ...i, data: s, error: o }), (c.lastSync = F()), n.set(!n.get());
							})
							.catch(() => {});
				};
			if (e?.event === `poll`) {
				a();
				return;
			}
			if (e?.event === `visibilitychange`) {
				if (F() - c.lastSessionRequest < ye) return;
				c.lastSessionRequest = F();
			}
			if (e?.event === `visibilitychange`) {
				a();
				return;
			}
			(i?.data === null || i?.data === void 0) && ((c.lastSync = F()), n.set(!n.get()));
		},
		d = (e) => {
			w().post({ event: `session`, data: { trigger: e }, clientId: Math.random().toString(36).substring(7) });
		},
		f = () => {
			a &&
				a > 0 &&
				(c.pollInterval = setInterval(() => {
					t.get()?.data && u({ event: `poll` });
				}, a * 1e3));
		},
		p = () => {
			c.unsubscribeBroadcast = w().subscribe(() => {
				u({ event: `storage` });
			});
		},
		m = () => {
			o &&
				(c.unsubscribeFocus = re().subscribe(() => {
					u({ event: `visibilitychange` });
				}));
		},
		h = () => {
			c.unsubscribeOnline = D().subscribe((e) => {
				e && u({ event: `visibilitychange` });
			});
		};
	return {
		init: () => {
			f(), p(), m(), h(), w().setup(), re().setup(), D().setup();
		},
		cleanup: () => {
			(c.pollInterval &&= (clearInterval(c.pollInterval), void 0)),
				(c.unsubscribeBroadcast &&= (c.unsubscribeBroadcast(), void 0)),
				(c.unsubscribeFocus &&= (c.unsubscribeFocus(), void 0)),
				(c.unsubscribeOnline &&= (c.unsubscribeOnline(), void 0)),
				(c.lastSync = 0),
				(c.lastSessionRequest = 0),
				(c.cachedSession = void 0);
		},
		triggerRefetch: u,
		broadcastSessionUpdate: d,
	};
}
var L = Object.create(null),
	R = (e) => ({}),
	z = new Proxy(L, {
		get(e, t) {
			return R()[t] ?? L[t];
		},
		has(e, t) {
			return t in R() || t in L;
		},
		set(e, t, n) {
			const r = R(!0);
			return (r[t] = n), !0;
		},
		deleteProperty(e, t) {
			if (!t) return !1;
			const n = R(!0);
			return delete n[t], !0;
		},
		ownKeys() {
			const e = R(!0);
			return Object.keys(e);
		},
	});
function B(e, t) {
	return typeof process < `u`
		? ({}[e] ?? t)
		: typeof Deno < `u`
			? (Deno.env.get(e) ?? t)
			: typeof Bun < `u`
				? (Bun.env[e] ?? t)
				: t;
}
Object.freeze({
	get BETTER_AUTH_SECRET() {
		return B(`BETTER_AUTH_SECRET`);
	},
	get AUTH_SECRET() {
		return B(`AUTH_SECRET`);
	},
	get BETTER_AUTH_TELEMETRY() {
		return B(`BETTER_AUTH_TELEMETRY`);
	},
	get BETTER_AUTH_TELEMETRY_ID() {
		return B(`BETTER_AUTH_TELEMETRY_ID`);
	},
	get NODE_ENV() {
		return B(`NODE_ENV`, `development`);
	},
	get PACKAGE_VERSION() {
		return B(`PACKAGE_VERSION`, `0.0.0`);
	},
	get BETTER_AUTH_TELEMETRY_ENDPOINT() {
		return B(`BETTER_AUTH_TELEMETRY_ENDPOINT`, ``);
	},
});
function xe() {
	const e = Object.getOwnPropertyDescriptor(Error, `stackTraceLimit`);
	return e === void 0 ? Object.isExtensible(Error) : Object.hasOwn(e, `writable`) ? e.writable : e.set !== void 0;
}
function Se(e) {
	const t = e.split(`
    at `);
	return t.length <= 1
		? e
		: (t.splice(1, 1),
			t.join(`
    at `));
}
function Ce(e, t) {
	class n extends e {
		#e;
		constructor(...e) {
			if (xe()) {
				const t = Error.stackTraceLimit;
				(Error.stackTraceLimit = 0), super(...e), (Error.stackTraceLimit = t);
			} else super(...e);
			const t = Error().stack;
			t && (this.#e = Se(t.replace(/^Error/, this.name)));
		}
		get errorStack() {
			return this.#e;
		}
	}
	return (
		Object.defineProperty(n.prototype, `constructor`, {
			get() {
				return t;
			},
			enumerable: !1,
			configurable: !0,
		}),
		n
	);
}
var we = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	MULTIPLE_CHOICES: 300,
	MOVED_PERMANENTLY: 301,
	FOUND: 302,
	SEE_OTHER: 303,
	NOT_MODIFIED: 304,
	TEMPORARY_REDIRECT: 307,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	PAYLOAD_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	"I'M_A_TEAPOT": 418,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_ENTITY: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NOT_EXTENDED: 510,
	NETWORK_AUTHENTICATION_REQUIRED: 511,
};
Ce(
	class extends Error {
		constructor(e = `INTERNAL_SERVER_ERROR`, t = void 0, n = {}, r = typeof e == `number` ? e : we[e]) {
			super(t?.message, t?.cause ? { cause: t.cause } : void 0),
				(this.status = e),
				(this.body = t),
				(this.headers = n),
				(this.statusCode = r),
				(this.name = `APIError`),
				(this.status = e),
				(this.headers = n),
				(this.statusCode = r),
				(this.body = t);
		}
	},
	Error,
);
var V = class extends Error {
	constructor(e, t) {
		super(e, t), (this.name = `BetterAuthError`), (this.message = e), (this.stack = ``);
	}
};
function Te(e) {
	try {
		return (new URL(e).pathname.replace(/\/+$/, ``) || `/`) !== `/`;
	} catch {
		throw new V(`Invalid base URL: ${e}. Please provide a valid base URL.`);
	}
}
function Ee(e) {
	try {
		const t = new URL(e);
		if (t.protocol !== `http:` && t.protocol !== `https:`)
			throw new V(`Invalid base URL: ${e}. URL must include 'http://' or 'https://'`);
	} catch (t) {
		throw t instanceof V ? t : new V(`Invalid base URL: ${e}. Please provide a valid base URL.`, { cause: t });
	}
}
function H(e, t = `/api/auth`) {
	if ((Ee(e), Te(e))) return e;
	const n = e.replace(/\/+$/, ``);
	return !t || t === `/` ? n : ((t = t.startsWith(`/`) ? t : `/${t}`), `${n}${t}`);
}
function U(e, t) {
	return !e || e.trim() === ``
		? !1
		: t === `proto`
			? e === `http` || e === `https`
			: t === `host`
				? [/\.\./, /\0/, /[\s]/, /^[.]/, /[<>'"]/, /javascript:/i, /file:/i, /data:/i].some((t) => t.test(e))
					? !1
					: /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(:[0-9]{1,5})?$/.test(
							e,
						) ||
						/^(\d{1,3}\.){3}\d{1,3}(:[0-9]{1,5})?$/.test(e) ||
						/^\[[0-9a-fA-F:]+\](:[0-9]{1,5})?$/.test(e) ||
						/^localhost(:[0-9]{1,5})?$/i.test(e)
				: !1;
}
function De(e, t, n, r, i) {
	if (e) return H(e, t);
	if (r !== !1) {
		const e =
			z.BETTER_AUTH_URL ||
			z.NEXT_PUBLIC_BETTER_AUTH_URL ||
			z.PUBLIC_BETTER_AUTH_URL ||
			z.NUXT_PUBLIC_BETTER_AUTH_URL ||
			z.NUXT_PUBLIC_AUTH_URL ||
			(z.BASE_URL === `/` ? void 0 : z.BASE_URL);
		if (e) return H(e, t);
	}
	const a = n?.headers.get(`x-forwarded-host`),
		o = n?.headers.get(`x-forwarded-proto`);
	if (a && o && i && U(o, `proto`) && U(a, `host`))
		try {
			return H(`${o}://${a}`, t);
		} catch {}
	if (n) {
		const e = Oe(n.url);
		if (!e) throw new V(`Could not get origin from request. Please provide a valid base URL.`);
		return H(e, t);
	}
	if (typeof window < `u` && window.location) return H(window.location.origin, t);
}
function Oe(e) {
	try {
		const t = new URL(e);
		return t.origin === `null` ? null : t.origin;
	} catch {
		return null;
	}
}
var ke = {
	id: `redirect`,
	name: `Redirect`,
	hooks: {
		onSuccess(e) {
			if (e.data?.url && e.data?.redirect && typeof window < `u` && window.location && window.location)
				try {
					window.location.href = e.data.url;
				} catch {}
		},
	},
};
function Ae(e, t) {
	let n = M(!1),
		r = ve(n, `/get-session`, e, { method: `GET` }),
		i = () => {};
	return (
		he(r, () => {
			const a = be({ sessionAtom: r, sessionSignal: n, $fetch: e, options: t });
			return (
				a.init(),
				(i = a.broadcastSessionUpdate),
				() => {
					a.cleanup();
				}
			);
		}),
		{ session: r, $sessionSignal: n, broadcastSessionUpdate: (e) => i(e) }
	);
}
function W(e) {
	if (typeof e != `object` || !e) return !1;
	const t = Object.getPrototypeOf(e);
	return (t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null) || Symbol.iterator in e
		? !1
		: Symbol.toStringTag in e
			? Object.prototype.toString.call(e) === `[object Module]`
			: !0;
}
function G(e, t, n = `.`, r) {
	if (!W(t)) return G(e, {}, n, r);
	const i = { ...t };
	for (const t of Object.keys(e)) {
		if (t === `__proto__` || t === `constructor`) continue;
		const a = e[t];
		a != null &&
			((r && r(i, t, a, n)) ||
				(Array.isArray(a) && Array.isArray(i[t])
					? (i[t] = [...a, ...i[t]])
					: W(a) && W(i[t])
						? (i[t] = G(a, i[t], (n ? `${n}.` : ``) + t.toString(), r))
						: (i[t] = a)));
	}
	return i;
}
function je(e) {
	return (...t) => t.reduce((t, n) => G(t, n, ``, e), {});
}
var Me = je(),
	Ne = Object.defineProperty,
	Pe = Object.defineProperties,
	Fe = Object.getOwnPropertyDescriptors,
	Ie = Object.getOwnPropertySymbols,
	Le = Object.prototype.hasOwnProperty,
	Re = Object.prototype.propertyIsEnumerable,
	K = (e, t, n) => (t in e ? Ne(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n)),
	q = (e, t) => {
		for (var n in (t ||= {})) Le.call(t, n) && K(e, n, t[n]);
		if (Ie) for (var n of Ie(t)) Re.call(t, n) && K(e, n, t[n]);
		return e;
	},
	J = (e, t) => Pe(e, Fe(t)),
	ze = class extends Error {
		constructor(e, t, n) {
			super(t || e.toString(), { cause: n }),
				(this.status = e),
				(this.statusText = t),
				(this.error = n),
				Error.captureStackTrace(this, this.constructor);
		}
	},
	Be = async (e, t) => {
		let n = t || {},
			r = {
				onRequest: [t?.onRequest],
				onResponse: [t?.onResponse],
				onSuccess: [t?.onSuccess],
				onError: [t?.onError],
				onRetry: [t?.onRetry],
			};
		if (!t || !t?.plugins) return { url: e, options: n, hooks: r };
		for (const i of t?.plugins || []) {
			if (i.init) {
				const r = await i.init?.call(i, e.toString(), t);
				(n = r.options || n), (e = r.url);
			}
			r.onRequest.push(i.hooks?.onRequest),
				r.onResponse.push(i.hooks?.onResponse),
				r.onSuccess.push(i.hooks?.onSuccess),
				r.onError.push(i.hooks?.onError),
				r.onRetry.push(i.hooks?.onRetry);
		}
		return { url: e, options: n, hooks: r };
	},
	Y = class {
		constructor(e) {
			this.options = e;
		}
		shouldAttemptRetry(e, t) {
			return this.options.shouldRetry
				? Promise.resolve(e < this.options.attempts && this.options.shouldRetry(t))
				: Promise.resolve(e < this.options.attempts);
		}
		getDelay() {
			return this.options.delay;
		}
	},
	Ve = class {
		constructor(e) {
			this.options = e;
		}
		shouldAttemptRetry(e, t) {
			return this.options.shouldRetry
				? Promise.resolve(e < this.options.attempts && this.options.shouldRetry(t))
				: Promise.resolve(e < this.options.attempts);
		}
		getDelay(e) {
			return Math.min(this.options.maxDelay, this.options.baseDelay * 2 ** e);
		}
	};
function He(e) {
	if (typeof e == `number`) return new Y({ type: `linear`, attempts: e, delay: 1e3 });
	switch (e.type) {
		case `linear`:
			return new Y(e);
		case `exponential`:
			return new Ve(e);
		default:
			throw Error(`Invalid retry strategy`);
	}
}
var Ue = async (e) => {
		const t = {},
			n = async (e) => (typeof e == `function` ? await e() : e);
		if (e?.auth) {
			if (e.auth.type === `Bearer`) {
				const r = await n(e.auth.token);
				if (!r) return t;
				t.authorization = `Bearer ${r}`;
			} else if (e.auth.type === `Basic`) {
				const [r, i] = await Promise.all([n(e.auth.username), n(e.auth.password)]);
				if (!r || !i) return t;
				t.authorization = `Basic ${btoa(`${r}:${i}`)}`;
			} else if (e.auth.type === `Custom`) {
				const [r, i] = await Promise.all([n(e.auth.prefix), n(e.auth.value)]);
				if (!i) return t;
				t.authorization = `${r ?? ``} ${i}`;
			}
		}
		return t;
	},
	We = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function Ge(e) {
	const t = e.headers.get(`content-type`),
		n = new Set([`image/svg`, `application/xml`, `application/xhtml`, `application/html`]);
	if (!t) return `json`;
	const r = t.split(`;`).shift() || ``;
	return We.test(r) ? `json` : n.has(r) || r.startsWith(`text/`) ? `text` : `blob`;
}
function Ke(e) {
	try {
		return JSON.parse(e), !0;
	} catch {
		return !1;
	}
}
function X(e) {
	if (e === void 0) return !1;
	const t = typeof e;
	return t === `string` || t === `number` || t === `boolean` || t === null
		? !0
		: t === `object`
			? Array.isArray(e)
				? !0
				: e.buffer
					? !1
					: (e.constructor && e.constructor.name === `Object`) || typeof e.toJSON == `function`
			: !1;
}
function qe(e) {
	try {
		return JSON.parse(e);
	} catch {
		return e;
	}
}
function Je(e) {
	return typeof e == `function`;
}
function Ye(e) {
	if (e?.customFetchImpl) return e.customFetchImpl;
	if (typeof globalThis < `u` && Je(globalThis.fetch)) return globalThis.fetch;
	if (typeof window < `u` && Je(window.fetch)) return window.fetch;
	throw Error(`No fetch implementation found`);
}
async function Xe(e) {
	const t = new Headers(e?.headers),
		n = await Ue(e);
	for (const [e, r] of Object.entries(n || {})) t.set(e, r);
	if (!t.has(`content-type`)) {
		const n = Ze(e?.body);
		n && t.set(`content-type`, n);
	}
	return t;
}
function Ze(e) {
	return X(e) ? `application/json` : null;
}
function Qe(e) {
	if (!e?.body) return null;
	const t = new Headers(e?.headers);
	if (X(e.body) && !t.has(`content-type`)) {
		for (const [t, n] of Object.entries(e?.body)) n instanceof Date && (e.body[t] = n.toISOString());
		return JSON.stringify(e.body);
	}
	return t.has(`content-type`) && t.get(`content-type`) === `application/x-www-form-urlencoded` && X(e.body)
		? new URLSearchParams(e.body).toString()
		: e.body;
}
function $e(e, t) {
	if (t?.method) return t.method.toUpperCase();
	if (e.startsWith(`@`)) {
		const n = e.split(`@`)[1]?.split(`/`)[0];
		return nt.includes(n) ? n.toUpperCase() : t?.body ? `POST` : `GET`;
	}
	return t?.body ? `POST` : `GET`;
}
function et(e, t) {
	let n;
	return (
		!e?.signal && e?.timeout && (n = setTimeout(() => t?.abort(), e?.timeout)),
		{
			abortTimeout: n,
			clearTimeout: () => {
				n && clearTimeout(n);
			},
		}
	);
}
var tt = class e extends Error {
	constructor(t, n) {
		super(n || JSON.stringify(t, null, 2)), (this.issues = t), Object.setPrototypeOf(this, e.prototype);
	}
};
async function Z(e, t) {
	const n = await e[`~standard`].validate(t);
	if (n.issues) throw new tt(n.issues);
	return n.value;
}
var nt = [`get`, `post`, `put`, `patch`, `delete`],
	rt = (e) => ({
		id: `apply-schema`,
		name: `Apply Schema`,
		version: `1.0.0`,
		async init(t, n) {
			const r =
				e.plugins?.find((e) =>
					e.schema?.config
						? t.startsWith(e.schema.config.baseURL || ``) || t.startsWith(e.schema.config.prefix || ``)
						: !1,
				)?.schema || e.schema;
			if (r) {
				let e = t;
				r.config?.prefix &&
					e.startsWith(r.config.prefix) &&
					((e = e.replace(r.config.prefix, ``)),
					r.config.baseURL && (t = t.replace(r.config.prefix, r.config.baseURL))),
					r.config?.baseURL && e.startsWith(r.config.baseURL) && (e = e.replace(r.config.baseURL, ``));
				const i = r.schema[e];
				if (i) {
					let e = J(q({}, n), { method: i.method, output: i.output });
					return (
						n?.disableValidation ||
							(e = J(q({}, e), {
								body: i.input ? await Z(i.input, n?.body) : n?.body,
								params: i.params ? await Z(i.params, n?.params) : n?.params,
								query: i.query ? await Z(i.query, n?.query) : n?.query,
							})),
						{ url: t, options: e }
					);
				}
			}
			return { url: t, options: n };
		},
	}),
	it = (e) => {
		async function t(t, n) {
			const r = J(q(q({}, e), n), { plugins: [...(e?.plugins || []), rt(e || {}), ...(n?.plugins || [])] });
			if (e?.catchAllError)
				try {
					return await Q(t, r);
				} catch (e) {
					return {
						data: null,
						error: {
							status: 500,
							statusText: `Fetch Error`,
							message: `Fetch related error. Captured by catchAllError option. See error property for more details.`,
							error: e,
						},
					};
				}
			return await Q(t, r);
		}
		return t;
	};
function at(e, t) {
	let { baseURL: n, params: r, query: i } = t || { query: {}, params: {}, baseURL: `` },
		a = e.startsWith(`http`) ? e.split(`/`).slice(0, 3).join(`/`) : n || ``;
	if (e.startsWith(`@`)) {
		const t = e.toString().split(`@`)[1].split(`/`)[0];
		nt.includes(t) && (e = e.replace(`@${t}/`, `/`));
	}
	a.endsWith(`/`) || (a += `/`);
	let [o, s] = e.replace(a, ``).split(`?`),
		c = new URLSearchParams(s);
	for (const [e, t] of Object.entries(i || {})) {
		if (t == null) continue;
		let n;
		if (typeof t == `string`) n = t;
		else if (Array.isArray(t)) {
			for (const n of t) c.append(e, n);
			continue;
		} else n = JSON.stringify(t);
		c.set(e, n);
	}
	if (r)
		if (Array.isArray(r)) {
			const e = o.split(`/`).filter((e) => e.startsWith(`:`));
			for (const [t, n] of e.entries()) {
				const e = r[t];
				o = o.replace(n, e);
			}
		} else for (const [e, t] of Object.entries(r)) o = o.replace(`:${e}`, String(t));
	(o = o.split(`/`).map(encodeURIComponent).join(`/`)), o.startsWith(`/`) && (o = o.slice(1));
	let l = c.toString();
	return (
		(l = l.length > 0 ? `?${l}`.replace(/\+/g, `%20`) : ``),
		a.startsWith(`http`) ? new URL(`${o}${l}`, a) : `${a}${o}${l}`
	);
}
var Q = async (e, t) => {
		let { hooks: n, url: r, options: i } = await Be(e, t),
			a = Ye(i),
			o = new AbortController(),
			s = i.signal ?? o.signal,
			c = at(r, i),
			l = Qe(i),
			u = await Xe(i),
			d = $e(r, i),
			f = J(q({}, i), { url: c, headers: u, body: l, method: d, signal: s });
		for (const e of n.onRequest)
			if (e) {
				const t = await e(f);
				typeof t == `object` && t && (f = t);
			}
		((`pipeTo` in f && typeof f.pipeTo == `function`) || typeof t?.body?.pipe == `function`) &&
			(`duplex` in f || (f.duplex = `half`));
		let { clearTimeout: p } = et(i, o),
			m = await a(f.url, f);
		p();
		const h = { response: m, request: f };
		for (const e of n.onResponse)
			if (e) {
				const n = await e(J(q({}, h), { response: t?.hookOptions?.cloneResponse ? m.clone() : m }));
				n instanceof Response ? (m = n) : typeof n == `object` && n && (m = n.response);
			}
		if (m.ok) {
			if (f.method === `HEAD`) return { data: ``, error: null };
			const e = Ge(m),
				r = { data: null, response: m, request: f };
			if (e === `json` || e === `text`) {
				const e = await m.text();
				r.data = await (f.jsonParser ?? qe)(e);
			} else r.data = await m[e]();
			f?.output && f.output && !f.disableValidation && (r.data = await Z(f.output, r.data));
			for (const e of n.onSuccess)
				e && (await e(J(q({}, r), { response: t?.hookOptions?.cloneResponse ? m.clone() : m })));
			return t?.throw ? r.data : { data: r.data, error: null };
		}
		const g = t?.jsonParser ?? qe,
			_ = await m.text(),
			v = Ke(_),
			y = v ? await g(_) : null,
			b = {
				response: m,
				responseText: _,
				request: f,
				error: J(q({}, y), { status: m.status, statusText: m.statusText }),
			};
		for (const e of n.onError) e && (await e(J(q({}, b), { response: t?.hookOptions?.cloneResponse ? m.clone() : m })));
		if (t?.retry) {
			const r = He(t.retry),
				i = t.retryAttempt ?? 0;
			if (await r.shouldAttemptRetry(i, m)) {
				for (const e of n.onRetry) e && (await e(h));
				const a = r.getDelay(i);
				return await new Promise((e) => setTimeout(e, a)), await Q(e, J(q({}, t), { retryAttempt: i + 1 }));
			}
		}
		if (t?.throw) throw new ze(m.status, m.statusText, v ? y : _);
		return { data: null, error: J(q({}, y), { status: m.status, statusText: m.statusText }) };
	},
	ot = (e) => {
		if (typeof process > `u`) return;
		const t = e ?? `/api/auth`;
		if ({}.NEXT_PUBLIC_AUTH_URL) return {}.NEXT_PUBLIC_AUTH_URL;
		if (typeof window > `u`) {
			if ({}.NEXTAUTH_URL)
				try {
					return {}.NEXTAUTH_URL;
				} catch {}
			if ({}.VERCEL_URL)
				try {
					const e = {}.VERCEL_URL.startsWith(`http`) ? `` : `https://`;
					return `${new URL(`${e}${{}.VERCEL_URL}`).origin}${t}`;
				} catch {}
		}
	},
	st = (e, t) => {
		let n = `credentials` in Request.prototype,
			r = De(e?.baseURL, e?.basePath, void 0, t) ?? ot(e?.basePath) ?? `/api/auth`,
			i = e?.plugins?.flatMap((e) => e.fetchPlugins).filter((e) => e !== void 0) || [],
			a = {
				id: `lifecycle-hooks`,
				name: `lifecycle-hooks`,
				hooks: {
					onSuccess: e?.fetchOptions?.onSuccess,
					onError: e?.fetchOptions?.onError,
					onRequest: e?.fetchOptions?.onRequest,
					onResponse: e?.fetchOptions?.onResponse,
				},
			},
			{ onSuccess: o, onError: s, onRequest: c, onResponse: l, ...u } = e?.fetchOptions || {},
			d = it({
				baseURL: r,
				...(n ? { credentials: `include` } : {}),
				method: `GET`,
				jsonParser(e) {
					return e ? de(e, { strict: !1 }) : null;
				},
				customFetchImpl: fetch,
				...u,
				plugins: [a, ...(u.plugins || []), ...(e?.disableDefaultFetchPlugins ? [] : [ke]), ...i],
			}),
			{ $sessionSignal: f, session: p, broadcastSessionUpdate: m } = Ae(d, e),
			h = e?.plugins || [],
			g = {},
			_ = { $sessionSignal: f, session: p },
			v = { "/sign-out": `POST`, "/revoke-sessions": `POST`, "/revoke-other-sessions": `POST`, "/delete-user": `POST` },
			y = [
				{
					signal: `$sessionSignal`,
					matcher(e) {
						return (
							e === `/sign-out` ||
							e === `/update-user` ||
							e === `/update-session` ||
							e === `/sign-up/email` ||
							e === `/sign-in/email` ||
							e === `/delete-user` ||
							e === `/verify-email` ||
							e === `/revoke-sessions` ||
							e === `/revoke-session` ||
							e === `/revoke-other-sessions` ||
							e === `/change-email` ||
							e === `/change-password`
						);
					},
					callback(e) {
						e === `/sign-out` ? m(`signout`) : (e === `/update-user` || e === `/update-session`) && m(`updateUser`);
					},
				},
			];
		for (const e of h)
			e.getAtoms && Object.assign(_, e.getAtoms?.(d)),
				e.pathMethods && Object.assign(v, e.pathMethods),
				e.atomListeners && y.push(...e.atomListeners);
		const b = {
			notify: (e) => {
				_[e].set(!_[e].get());
			},
			listen: (e, t) => {
				_[e].subscribe(t);
			},
			atoms: _,
		};
		for (const t of h) t.getActions && (g = Me(t.getActions?.(d, b, e) ?? {}, g));
		return {
			get baseURL() {
				return r;
			},
			pluginsActions: g,
			pluginsAtoms: _,
			pluginPathMethods: v,
			atomListeners: y,
			$fetch: d,
			$store: b,
		};
	};
function ct(e) {
	return (
		typeof e == `object` && !!e && `get` in e && typeof e.get == `function` && `lc` in e && typeof e.lc == `number`
	);
}
function lt(e, t, n) {
	const r = t[e],
		{ fetchOptions: i, query: a, ...o } = n || {};
	return r || (i?.method ? i.method : o && Object.keys(o).length > 0 ? `POST` : `GET`);
}
function ut(e, t, n, r, i) {
	function a(o = []) {
		return new Proxy(() => {}, {
			get(t, n) {
				if (typeof n != `string` || n === `then` || n === `catch` || n === `finally`) return;
				let r = [...o, n],
					i = e;
				for (const e of r)
					if (i && typeof i == `object` && e in i) i = i[e];
					else {
						i = void 0;
						break;
					}
				return typeof i == `function` || ct(i) ? i : a(r);
			},
			apply: async (e, a, s) => {
				const c = `/` + o.map((e) => e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`)).join(`/`),
					l = s[0] || {},
					u = s[1] || {},
					{ query: d, fetchOptions: f, ...p } = l,
					m = { ...u, ...f },
					h = lt(c, n, l);
				return await t(c, {
					...m,
					body: h === `GET` ? void 0 : { ...p, ...(m?.body || {}) },
					query: d || m?.query,
					method: h,
					async onSuccess(e) {
						if ((await m?.onSuccess?.(e), !i || m.disableSignal)) return;
						const t = i.filter((e) => e.matcher(c));
						if (!t.length) return;
						const n = new Set();
						for (const e of t) {
							const t = r[e.signal];
							if (!t) return;
							if (n.has(e.signal)) continue;
							n.add(e.signal);
							const i = t.get();
							setTimeout(() => {
								t.set(!i);
							}, 10),
								e.callback?.(c);
						}
					},
				});
			},
		});
	}
	return a();
}
function dt(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
var ft = (e, { $listPasskeys: t, $store: n }) => ({
		signIn: {
			passkey: async (i, a) => {
				const o = await e(`/passkey/generate-authenticate-options`, { method: `GET`, throw: !1 });
				if (!o.data) return o;
				try {
					const r =
							o.data.extensions || i?.extensions ? { ...(o.data.extensions || {}), ...(i?.extensions || {}) } : void 0,
						s = await x({ optionsJSON: { ...o.data, extensions: r }, useBrowserAutofill: i?.autoFill }),
						{ clientExtensionResults: c, ...l } = s,
						u = await e(`/passkey/verify-authentication`, {
							body: { response: l },
							...i?.fetchOptions,
							...a,
							method: `POST`,
							throw: !1,
						});
					return (
						t.set(Math.random()),
						n.notify(`$sessionSignal`),
						i?.returnWebAuthnResponse ? { ...u, webauthn: { response: s, clientExtensionResults: c } } : u
					);
				} catch (e) {
					return (
						console.error(`[Better Auth] Error verifying passkey`, e),
						{
							data: null,
							error: {
								code: `AUTH_CANCELLED`,
								message: r.AUTH_CANCELLED.message,
								status: 400,
								statusText: `BAD_REQUEST`,
							},
						}
					);
				}
			},
		},
		passkey: {
			addPasskey: async (n, i) => {
				const a = await e(`/passkey/generate-register-options`, {
					method: `GET`,
					query: {
						...(n?.authenticatorAttachment && { authenticatorAttachment: n.authenticatorAttachment }),
						...(n?.name && { name: n.name }),
						...(n?.context && { context: n.context }),
					},
					throw: !1,
				});
				if (!a.data) return a;
				try {
					const r =
							a.data.extensions || n?.extensions ? { ...(a.data.extensions || {}), ...(n?.extensions || {}) } : void 0,
						o = await g({ optionsJSON: { ...a.data, extensions: r }, useAutoRegister: n?.useAutoRegister }),
						{ clientExtensionResults: s, ...c } = o,
						l = await e(`/passkey/verify-registration`, {
							...n?.fetchOptions,
							...i,
							body: { response: c, name: n?.name },
							method: `POST`,
							throw: !1,
						});
					return l.data
						? (t.set(Math.random()),
							n?.returnWebAuthnResponse ? { ...l, webauthn: { response: o, clientExtensionResults: s } } : l)
						: l;
				} catch (e) {
					return e instanceof d
						? e.code === `ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED`
							? {
									data: null,
									error: {
										code: e.code,
										message: r.PREVIOUSLY_REGISTERED.message,
										status: 400,
										statusText: `BAD_REQUEST`,
									},
								}
							: e.code === `ERROR_CEREMONY_ABORTED`
								? {
										data: null,
										error: {
											code: e.code,
											message: r.REGISTRATION_CANCELLED.message,
											status: 400,
											statusText: `BAD_REQUEST`,
										},
									}
								: { data: null, error: { code: e.code, message: e.message, status: 400, statusText: `BAD_REQUEST` } }
						: {
								data: null,
								error: {
									code: `UNKNOWN_ERROR`,
									message: e instanceof Error ? e.message : r.UNKNOWN_ERROR.message,
									status: 500,
									statusText: `INTERNAL_SERVER_ERROR`,
								},
							};
				}
			},
		},
		$Infer: {},
	}),
	pt = () => {
		const e = M();
		return {
			id: `passkey`,
			version: i,
			$InferServerPlugin: {},
			getActions: (t, n) => ft(t, { $listPasskeys: e, $store: n }),
			getAtoms(t) {
				return { listPasskeys: ve(e, `/passkey/list-user-passkeys`, t, { method: `GET` }), $listPasskeys: e };
			},
			pathMethods: { "/passkey/register": `POST`, "/passkey/authenticate": `POST` },
			atomListeners: [
				{
					matcher(e) {
						return (
							e === `/passkey/verify-registration` ||
							e === `/passkey/delete-passkey` ||
							e === `/passkey/update-passkey` ||
							e === `/sign-out`
						);
					},
					signal: `$listPasskeys`,
				},
				{ matcher: (e) => e === `/passkey/verify-authentication`, signal: `$sessionSignal` },
			],
			$ERROR_CODES: r,
		};
	},
	mt = (e) => ({ id: `additional-fields-client`, version: S, $InferServerPlugin: {} }),
	ht = n({
		INVALID_OAUTH_CONFIGURATION: `Invalid OAuth configuration`,
		TOKEN_URL_NOT_FOUND: `Invalid OAuth configuration. Token URL not found.`,
		PROVIDER_CONFIG_NOT_FOUND: `No config found for provider`,
		PROVIDER_ID_REQUIRED: `Provider ID is required`,
		INVALID_OAUTH_CONFIG: `Invalid OAuth configuration.`,
		SESSION_REQUIRED: `Session is required`,
		ISSUER_MISMATCH: `OAuth issuer mismatch. The authorization server issuer does not match the expected value (RFC 9207).`,
		ISSUER_MISSING: `OAuth issuer parameter missing. The authorization server did not include the required iss parameter (RFC 9207).`,
	}),
	gt = () => ({ id: `generic-oauth-client`, version: S, $InferServerPlugin: {}, $ERROR_CODES: ht }),
	_t = n({
		OTP_NOT_ENABLED: `OTP not enabled`,
		OTP_HAS_EXPIRED: `OTP has expired`,
		TOTP_NOT_ENABLED: `TOTP not enabled`,
		TWO_FACTOR_NOT_ENABLED: `Two factor isn't enabled`,
		BACKUP_CODES_NOT_ENABLED: `Backup codes aren't enabled`,
		INVALID_BACKUP_CODE: `Invalid backup code`,
		INVALID_CODE: `Invalid code`,
		TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: `Too many attempts. Please request a new code.`,
		INVALID_TWO_FACTOR_COOKIE: `Invalid two factor cookie`,
	}),
	vt = (e) => ({
		id: `two-factor`,
		version: S,
		$InferServerPlugin: {},
		atomListeners: [{ matcher: (e) => e.startsWith(`/two-factor/`), signal: `$sessionSignal` }],
		pathMethods: {
			"/two-factor/disable": `POST`,
			"/two-factor/enable": `POST`,
			"/two-factor/send-otp": `POST`,
			"/two-factor/generate-backup-codes": `POST`,
			"/two-factor/get-totp-uri": `POST`,
			"/two-factor/verify-totp": `POST`,
			"/two-factor/verify-otp": `POST`,
			"/two-factor/verify-backup-code": `POST`,
		},
		fetchPlugins: [
			{
				id: `two-factor`,
				name: `two-factor`,
				hooks: {
					async onSuccess(t) {
						if (t.data?.twoFactorRedirect) {
							if (e?.onTwoFactorRedirect) {
								await e.onTwoFactorRedirect({ twoFactorMethods: t.data.twoFactorMethods });
								return;
							}
							e?.twoFactorPage && typeof window < `u` && (window.location.href = e.twoFactorPage);
						}
					},
				},
			},
		],
		$ERROR_CODES: _t,
	}),
	yt = n({
		INVALID_USERNAME_OR_PASSWORD: `Invalid username or password`,
		EMAIL_NOT_VERIFIED: `Email not verified`,
		UNEXPECTED_ERROR: `Unexpected error`,
		USERNAME_IS_ALREADY_TAKEN: `Username is already taken. Please try another.`,
		USERNAME_TOO_SHORT: `Username is too short`,
		USERNAME_TOO_LONG: `Username is too long`,
		INVALID_USERNAME: `Username is invalid`,
		INVALID_DISPLAY_USERNAME: `Display username is invalid`,
	}),
	bt = () => ({
		id: `username`,
		version: S,
		$InferServerPlugin: {},
		atomListeners: [{ matcher: (e) => e === `/sign-in/username`, signal: `$sessionSignal` }],
		$ERROR_CODES: yt,
	}),
	$ = e(t(), 1);
function xt(e, t = {}) {
	const n = (0, $.useRef)(e.get()),
		{ keys: r, deps: i = [e, r] } = t,
		a = (0, $.useCallback)((t) => {
			const i = (e) => {
				n.current !== e && ((n.current = e), t());
			};
			return i(e.value), r?.length ? ge(e, r, i) : e.listen(i);
		}, i),
		o = () => n.current;
	return (0, $.useSyncExternalStore)(a, o, o);
}
function St(e) {
	return `use${dt(e)}`;
}
function Ct(e) {
	const { pluginPathMethods: t, pluginsActions: n, pluginsAtoms: r, $fetch: i, $store: a, atomListeners: o } = st(e),
		s = {};
	for (const [e, t] of Object.entries(r)) s[St(e)] = () => xt(t);
	return ut({ ...n, ...s, $fetch: i, $store: a }, i, t, r, o);
}
const wt = (() =>
	Ct({
		plugins: [
			bt(),
			vt({
				onTwoFactorRedirect() {
					typeof window < `u` && (window.location.href = `/dashboard/resumes`);
				},
			}),
			pt(),
			gt(),
			mt(),
		],
	}))();
export { wt as t };
