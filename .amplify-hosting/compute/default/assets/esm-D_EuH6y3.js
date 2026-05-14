var _globalThis = typeof globalThis === "object" ? globalThis : global;
var VERSION = "1.9.0";
var re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function _makeCompatibilityCheck(ownVersion) {
	var acceptedVersions = new Set([ownVersion]);
	var rejectedVersions = /* @__PURE__ */ new Set();
	var myVersionMatch = ownVersion.match(re);
	if (!myVersionMatch) return function() {
		return false;
	};
	var ownVersionParsed = {
		major: +myVersionMatch[1],
		minor: +myVersionMatch[2],
		patch: +myVersionMatch[3],
		prerelease: myVersionMatch[4]
	};
	if (ownVersionParsed.prerelease != null) return function isExactmatch(globalVersion) {
		return globalVersion === ownVersion;
	};
	function _reject(v) {
		rejectedVersions.add(v);
		return false;
	}
	function _accept(v) {
		acceptedVersions.add(v);
		return true;
	}
	return function isCompatible$1(globalVersion) {
		if (acceptedVersions.has(globalVersion)) return true;
		if (rejectedVersions.has(globalVersion)) return false;
		var globalVersionMatch = globalVersion.match(re);
		if (!globalVersionMatch) return _reject(globalVersion);
		var globalVersionParsed = {
			major: +globalVersionMatch[1],
			minor: +globalVersionMatch[2],
			patch: +globalVersionMatch[3],
			prerelease: globalVersionMatch[4]
		};
		if (globalVersionParsed.prerelease != null) return _reject(globalVersion);
		if (ownVersionParsed.major !== globalVersionParsed.major) return _reject(globalVersion);
		if (ownVersionParsed.major === 0) {
			if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) return _accept(globalVersion);
			return _reject(globalVersion);
		}
		if (ownVersionParsed.minor <= globalVersionParsed.minor) return _accept(globalVersion);
		return _reject(globalVersion);
	};
}
var isCompatible = _makeCompatibilityCheck(VERSION);
var major = VERSION.split(".")[0];
var GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for("opentelemetry.js.api." + major);
var _global = _globalThis;
function registerGlobal(type, instance, diag$2, allowOverride) {
	var _a;
	if (allowOverride === void 0) allowOverride = false;
	var api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a !== void 0 ? _a : { version: VERSION };
	if (!allowOverride && api[type]) {
		var err = /* @__PURE__ */ new Error("@opentelemetry/api: Attempted duplicate registration of API: " + type);
		diag$2.error(err.stack || err.message);
		return false;
	}
	if (api.version !== "1.9.0") {
		var err = /* @__PURE__ */ new Error("@opentelemetry/api: Registration of version v" + api.version + " for " + type + " does not match previously registered API v" + VERSION);
		diag$2.error(err.stack || err.message);
		return false;
	}
	api[type] = instance;
	diag$2.debug("@opentelemetry/api: Registered a global for " + type + " v" + VERSION + ".");
	return true;
}
function getGlobal(type) {
	var _a, _b;
	var globalVersion = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a === void 0 ? void 0 : _a.version;
	if (!globalVersion || !isCompatible(globalVersion)) return;
	return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
}
function unregisterGlobal(type, diag$2) {
	diag$2.debug("@opentelemetry/api: Unregistering a global for " + type + " v" + VERSION + ".");
	var api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
	if (api) delete api[type];
}
var __read$4 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
var __spreadArray$3 = function(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
};
var DiagComponentLogger = function() {
	function DiagComponentLogger$1(props) {
		this._namespace = props.namespace || "DiagComponentLogger";
	}
	DiagComponentLogger$1.prototype.debug = function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		return logProxy("debug", this._namespace, args);
	};
	DiagComponentLogger$1.prototype.error = function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		return logProxy("error", this._namespace, args);
	};
	DiagComponentLogger$1.prototype.info = function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		return logProxy("info", this._namespace, args);
	};
	DiagComponentLogger$1.prototype.warn = function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		return logProxy("warn", this._namespace, args);
	};
	DiagComponentLogger$1.prototype.verbose = function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		return logProxy("verbose", this._namespace, args);
	};
	return DiagComponentLogger$1;
}();
function logProxy(funcName, namespace, args) {
	var logger = getGlobal("diag");
	if (!logger) return;
	args.unshift(namespace);
	return logger[funcName].apply(logger, __spreadArray$3([], __read$4(args), false));
}
var DiagLogLevel;
(function(DiagLogLevel$1) {
	DiagLogLevel$1[DiagLogLevel$1["NONE"] = 0] = "NONE";
	DiagLogLevel$1[DiagLogLevel$1["ERROR"] = 30] = "ERROR";
	DiagLogLevel$1[DiagLogLevel$1["WARN"] = 50] = "WARN";
	DiagLogLevel$1[DiagLogLevel$1["INFO"] = 60] = "INFO";
	DiagLogLevel$1[DiagLogLevel$1["DEBUG"] = 70] = "DEBUG";
	DiagLogLevel$1[DiagLogLevel$1["VERBOSE"] = 80] = "VERBOSE";
	DiagLogLevel$1[DiagLogLevel$1["ALL"] = 9999] = "ALL";
})(DiagLogLevel || (DiagLogLevel = {}));
function createLogLevelDiagLogger(maxLevel, logger) {
	if (maxLevel < DiagLogLevel.NONE) maxLevel = DiagLogLevel.NONE;
	else if (maxLevel > DiagLogLevel.ALL) maxLevel = DiagLogLevel.ALL;
	logger = logger || {};
	function _filterFunc(funcName, theLevel) {
		var theFunc = logger[funcName];
		if (typeof theFunc === "function" && maxLevel >= theLevel) return theFunc.bind(logger);
		return function() {};
	}
	return {
		error: _filterFunc("error", DiagLogLevel.ERROR),
		warn: _filterFunc("warn", DiagLogLevel.WARN),
		info: _filterFunc("info", DiagLogLevel.INFO),
		debug: _filterFunc("debug", DiagLogLevel.DEBUG),
		verbose: _filterFunc("verbose", DiagLogLevel.VERBOSE)
	};
}
var __read$3 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
var __spreadArray$2 = function(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
};
var API_NAME$4 = "diag";
var DiagAPI = function() {
	function DiagAPI$1() {
		function _logProxy(funcName) {
			return function() {
				var args = [];
				for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
				var logger = getGlobal("diag");
				if (!logger) return;
				return logger[funcName].apply(logger, __spreadArray$2([], __read$3(args), false));
			};
		}
		var self = this;
		var setLogger = function(logger, optionsOrLogLevel) {
			var _a, _b, _c;
			if (optionsOrLogLevel === void 0) optionsOrLogLevel = { logLevel: DiagLogLevel.INFO };
			if (logger === self) {
				var err = /* @__PURE__ */ new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
				self.error((_a = err.stack) !== null && _a !== void 0 ? _a : err.message);
				return false;
			}
			if (typeof optionsOrLogLevel === "number") optionsOrLogLevel = { logLevel: optionsOrLogLevel };
			var oldLogger = getGlobal("diag");
			var newLogger = createLogLevelDiagLogger((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : DiagLogLevel.INFO, logger);
			if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
				var stack = (_c = (/* @__PURE__ */ new Error()).stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
				oldLogger.warn("Current logger will be overwritten from " + stack);
				newLogger.warn("Current logger will overwrite one already registered from " + stack);
			}
			return registerGlobal("diag", newLogger, self, true);
		};
		self.setLogger = setLogger;
		self.disable = function() {
			unregisterGlobal(API_NAME$4, self);
		};
		self.createComponentLogger = function(options) {
			return new DiagComponentLogger(options);
		};
		self.verbose = _logProxy("verbose");
		self.debug = _logProxy("debug");
		self.info = _logProxy("info");
		self.warn = _logProxy("warn");
		self.error = _logProxy("error");
	}
	DiagAPI$1.instance = function() {
		if (!this._instance) this._instance = new DiagAPI$1();
		return this._instance;
	};
	return DiagAPI$1;
}();
var __read$2 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
var __values = function(o) {
	var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	if (m) return m.call(o);
	if (o && typeof o.length === "number") return { next: function() {
		if (o && i >= o.length) o = void 0;
		return {
			value: o && o[i++],
			done: !o
		};
	} };
	throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var BaggageImpl = function() {
	function BaggageImpl$1(entries) {
		this._entries = entries ? new Map(entries) : /* @__PURE__ */ new Map();
	}
	BaggageImpl$1.prototype.getEntry = function(key) {
		var entry = this._entries.get(key);
		if (!entry) return;
		return Object.assign({}, entry);
	};
	BaggageImpl$1.prototype.getAllEntries = function() {
		return Array.from(this._entries.entries()).map(function(_a) {
			var _b = __read$2(_a, 2);
			return [_b[0], _b[1]];
		});
	};
	BaggageImpl$1.prototype.setEntry = function(key, entry) {
		var newBaggage = new BaggageImpl$1(this._entries);
		newBaggage._entries.set(key, entry);
		return newBaggage;
	};
	BaggageImpl$1.prototype.removeEntry = function(key) {
		var newBaggage = new BaggageImpl$1(this._entries);
		newBaggage._entries.delete(key);
		return newBaggage;
	};
	BaggageImpl$1.prototype.removeEntries = function() {
		var e_1, _a;
		var keys = [];
		for (var _i = 0; _i < arguments.length; _i++) keys[_i] = arguments[_i];
		var newBaggage = new BaggageImpl$1(this._entries);
		try {
			for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
				var key = keys_1_1.value;
				newBaggage._entries.delete(key);
			}
		} catch (e_1_1) {
			e_1 = { error: e_1_1 };
		} finally {
			try {
				if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
			} finally {
				if (e_1) throw e_1.error;
			}
		}
		return newBaggage;
	};
	BaggageImpl$1.prototype.clear = function() {
		return new BaggageImpl$1();
	};
	return BaggageImpl$1;
}();
var baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
var diag$1 = DiagAPI.instance();
function createBaggage(entries) {
	if (entries === void 0) entries = {};
	return new BaggageImpl(new Map(Object.entries(entries)));
}
function baggageEntryMetadataFromString(str) {
	if (typeof str !== "string") {
		diag$1.error("Cannot create baggage metadata from unknown type: " + typeof str);
		str = "";
	}
	return {
		__TYPE__: baggageEntryMetadataSymbol,
		toString: function() {
			return str;
		}
	};
}
function createContextKey(description) {
	return Symbol.for(description);
}
var ROOT_CONTEXT = new (function() {
	function BaseContext$1(parentContext) {
		var self = this;
		self._currentContext = parentContext ? new Map(parentContext) : /* @__PURE__ */ new Map();
		self.getValue = function(key) {
			return self._currentContext.get(key);
		};
		self.setValue = function(key, value) {
			var context$1 = new BaseContext$1(self._currentContext);
			context$1._currentContext.set(key, value);
			return context$1;
		};
		self.deleteValue = function(key) {
			var context$1 = new BaseContext$1(self._currentContext);
			context$1._currentContext.delete(key);
			return context$1;
		};
	}
	return BaseContext$1;
}())();
var consoleMap = [
	{
		n: "error",
		c: "error"
	},
	{
		n: "warn",
		c: "warn"
	},
	{
		n: "info",
		c: "info"
	},
	{
		n: "debug",
		c: "debug"
	},
	{
		n: "verbose",
		c: "trace"
	}
];
var DiagConsoleLogger = function() {
	function DiagConsoleLogger$1() {
		function _consoleFunc(funcName) {
			return function() {
				var args = [];
				for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
				if (console) {
					var theFunc = console[funcName];
					if (typeof theFunc !== "function") theFunc = console.log;
					if (typeof theFunc === "function") return theFunc.apply(console, args);
				}
			};
		}
		for (var i = 0; i < consoleMap.length; i++) this[consoleMap[i].n] = _consoleFunc(consoleMap[i].c);
	}
	return DiagConsoleLogger$1;
}();
var __extends = (function() {
	var extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d$1, b$1) {
			d$1.__proto__ = b$1;
		} || function(d$1, b$1) {
			for (var p in b$1) if (Object.prototype.hasOwnProperty.call(b$1, p)) d$1[p] = b$1[p];
		};
		return extendStatics(d, b);
	};
	return function(d, b) {
		if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
})();
var NoopMeter = function() {
	function NoopMeter$1() {}
	NoopMeter$1.prototype.createGauge = function(_name, _options) {
		return NOOP_GAUGE_METRIC;
	};
	NoopMeter$1.prototype.createHistogram = function(_name, _options) {
		return NOOP_HISTOGRAM_METRIC;
	};
	NoopMeter$1.prototype.createCounter = function(_name, _options) {
		return NOOP_COUNTER_METRIC;
	};
	NoopMeter$1.prototype.createUpDownCounter = function(_name, _options) {
		return NOOP_UP_DOWN_COUNTER_METRIC;
	};
	NoopMeter$1.prototype.createObservableGauge = function(_name, _options) {
		return NOOP_OBSERVABLE_GAUGE_METRIC;
	};
	NoopMeter$1.prototype.createObservableCounter = function(_name, _options) {
		return NOOP_OBSERVABLE_COUNTER_METRIC;
	};
	NoopMeter$1.prototype.createObservableUpDownCounter = function(_name, _options) {
		return NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
	};
	NoopMeter$1.prototype.addBatchObservableCallback = function(_callback, _observables) {};
	NoopMeter$1.prototype.removeBatchObservableCallback = function(_callback) {};
	return NoopMeter$1;
}();
var NoopMetric = function() {
	function NoopMetric$1() {}
	return NoopMetric$1;
}();
var NoopCounterMetric = function(_super) {
	__extends(NoopCounterMetric$1, _super);
	function NoopCounterMetric$1() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	NoopCounterMetric$1.prototype.add = function(_value, _attributes) {};
	return NoopCounterMetric$1;
}(NoopMetric);
var NoopUpDownCounterMetric = function(_super) {
	__extends(NoopUpDownCounterMetric$1, _super);
	function NoopUpDownCounterMetric$1() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	NoopUpDownCounterMetric$1.prototype.add = function(_value, _attributes) {};
	return NoopUpDownCounterMetric$1;
}(NoopMetric);
var NoopGaugeMetric = function(_super) {
	__extends(NoopGaugeMetric$1, _super);
	function NoopGaugeMetric$1() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	NoopGaugeMetric$1.prototype.record = function(_value, _attributes) {};
	return NoopGaugeMetric$1;
}(NoopMetric);
var NoopHistogramMetric = function(_super) {
	__extends(NoopHistogramMetric$1, _super);
	function NoopHistogramMetric$1() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	NoopHistogramMetric$1.prototype.record = function(_value, _attributes) {};
	return NoopHistogramMetric$1;
}(NoopMetric);
var NoopObservableMetric = function() {
	function NoopObservableMetric$1() {}
	NoopObservableMetric$1.prototype.addCallback = function(_callback) {};
	NoopObservableMetric$1.prototype.removeCallback = function(_callback) {};
	return NoopObservableMetric$1;
}();
var NoopObservableCounterMetric = function(_super) {
	__extends(NoopObservableCounterMetric$1, _super);
	function NoopObservableCounterMetric$1() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	return NoopObservableCounterMetric$1;
}(NoopObservableMetric);
var NoopObservableGaugeMetric = function(_super) {
	__extends(NoopObservableGaugeMetric$1, _super);
	function NoopObservableGaugeMetric$1() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	return NoopObservableGaugeMetric$1;
}(NoopObservableMetric);
var NoopObservableUpDownCounterMetric = function(_super) {
	__extends(NoopObservableUpDownCounterMetric$1, _super);
	function NoopObservableUpDownCounterMetric$1() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	return NoopObservableUpDownCounterMetric$1;
}(NoopObservableMetric);
var NOOP_METER = new NoopMeter();
var NOOP_COUNTER_METRIC = new NoopCounterMetric();
var NOOP_GAUGE_METRIC = new NoopGaugeMetric();
var NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric();
var NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric();
var NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric();
var NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric();
var NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric();
function createNoopMeter() {
	return NOOP_METER;
}
var ValueType;
(function(ValueType$1) {
	ValueType$1[ValueType$1["INT"] = 0] = "INT";
	ValueType$1[ValueType$1["DOUBLE"] = 1] = "DOUBLE";
})(ValueType || (ValueType = {}));
var defaultTextMapGetter = {
	get: function(carrier, key) {
		if (carrier == null) return;
		return carrier[key];
	},
	keys: function(carrier) {
		if (carrier == null) return [];
		return Object.keys(carrier);
	}
};
var defaultTextMapSetter = { set: function(carrier, key, value) {
	if (carrier == null) return;
	carrier[key] = value;
} };
var __read$1 = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
var __spreadArray$1 = function(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
};
var NoopContextManager = function() {
	function NoopContextManager$1() {}
	NoopContextManager$1.prototype.active = function() {
		return ROOT_CONTEXT;
	};
	NoopContextManager$1.prototype.with = function(_context, fn, thisArg) {
		var args = [];
		for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
		return fn.call.apply(fn, __spreadArray$1([thisArg], __read$1(args), false));
	};
	NoopContextManager$1.prototype.bind = function(_context, target) {
		return target;
	};
	NoopContextManager$1.prototype.enable = function() {
		return this;
	};
	NoopContextManager$1.prototype.disable = function() {
		return this;
	};
	return NoopContextManager$1;
}();
var __read = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
var __spreadArray = function(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
};
var API_NAME$3 = "context";
var NOOP_CONTEXT_MANAGER = new NoopContextManager();
var ContextAPI = function() {
	function ContextAPI$1() {}
	ContextAPI$1.getInstance = function() {
		if (!this._instance) this._instance = new ContextAPI$1();
		return this._instance;
	};
	ContextAPI$1.prototype.setGlobalContextManager = function(contextManager) {
		return registerGlobal(API_NAME$3, contextManager, DiagAPI.instance());
	};
	ContextAPI$1.prototype.active = function() {
		return this._getContextManager().active();
	};
	ContextAPI$1.prototype.with = function(context$1, fn, thisArg) {
		var _a;
		var args = [];
		for (var _i = 3; _i < arguments.length; _i++) args[_i - 3] = arguments[_i];
		return (_a = this._getContextManager()).with.apply(_a, __spreadArray([
			context$1,
			fn,
			thisArg
		], __read(args), false));
	};
	ContextAPI$1.prototype.bind = function(context$1, target) {
		return this._getContextManager().bind(context$1, target);
	};
	ContextAPI$1.prototype._getContextManager = function() {
		return getGlobal(API_NAME$3) || NOOP_CONTEXT_MANAGER;
	};
	ContextAPI$1.prototype.disable = function() {
		this._getContextManager().disable();
		unregisterGlobal(API_NAME$3, DiagAPI.instance());
	};
	return ContextAPI$1;
}();
var TraceFlags;
(function(TraceFlags$1) {
	TraceFlags$1[TraceFlags$1["NONE"] = 0] = "NONE";
	TraceFlags$1[TraceFlags$1["SAMPLED"] = 1] = "SAMPLED";
})(TraceFlags || (TraceFlags = {}));
var INVALID_SPANID = "0000000000000000";
var INVALID_TRACEID = "00000000000000000000000000000000";
var INVALID_SPAN_CONTEXT = {
	traceId: INVALID_TRACEID,
	spanId: INVALID_SPANID,
	traceFlags: TraceFlags.NONE
};
var NonRecordingSpan = function() {
	function NonRecordingSpan$1(_spanContext) {
		if (_spanContext === void 0) _spanContext = INVALID_SPAN_CONTEXT;
		this._spanContext = _spanContext;
	}
	NonRecordingSpan$1.prototype.spanContext = function() {
		return this._spanContext;
	};
	NonRecordingSpan$1.prototype.setAttribute = function(_key, _value) {
		return this;
	};
	NonRecordingSpan$1.prototype.setAttributes = function(_attributes) {
		return this;
	};
	NonRecordingSpan$1.prototype.addEvent = function(_name, _attributes) {
		return this;
	};
	NonRecordingSpan$1.prototype.addLink = function(_link) {
		return this;
	};
	NonRecordingSpan$1.prototype.addLinks = function(_links) {
		return this;
	};
	NonRecordingSpan$1.prototype.setStatus = function(_status) {
		return this;
	};
	NonRecordingSpan$1.prototype.updateName = function(_name) {
		return this;
	};
	NonRecordingSpan$1.prototype.end = function(_endTime) {};
	NonRecordingSpan$1.prototype.isRecording = function() {
		return false;
	};
	NonRecordingSpan$1.prototype.recordException = function(_exception, _time) {};
	return NonRecordingSpan$1;
}();
var SPAN_KEY = createContextKey("OpenTelemetry Context Key SPAN");
function getSpan(context$1) {
	return context$1.getValue(SPAN_KEY) || void 0;
}
function getActiveSpan() {
	return getSpan(ContextAPI.getInstance().active());
}
function setSpan(context$1, span) {
	return context$1.setValue(SPAN_KEY, span);
}
function deleteSpan(context$1) {
	return context$1.deleteValue(SPAN_KEY);
}
function setSpanContext(context$1, spanContext) {
	return setSpan(context$1, new NonRecordingSpan(spanContext));
}
function getSpanContext(context$1) {
	var _a;
	return (_a = getSpan(context$1)) === null || _a === void 0 ? void 0 : _a.spanContext();
}
var VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
var VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
function isValidTraceId(traceId) {
	return VALID_TRACEID_REGEX.test(traceId) && traceId !== "00000000000000000000000000000000";
}
function isValidSpanId(spanId) {
	return VALID_SPANID_REGEX.test(spanId) && spanId !== "0000000000000000";
}
function isSpanContextValid(spanContext) {
	return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
}
function wrapSpanContext(spanContext) {
	return new NonRecordingSpan(spanContext);
}
var contextApi = ContextAPI.getInstance();
var NoopTracer = function() {
	function NoopTracer$1() {}
	NoopTracer$1.prototype.startSpan = function(name, options, context$1) {
		if (context$1 === void 0) context$1 = contextApi.active();
		if (Boolean(options === null || options === void 0 ? void 0 : options.root)) return new NonRecordingSpan();
		var parentFromContext = context$1 && getSpanContext(context$1);
		if (isSpanContext(parentFromContext) && isSpanContextValid(parentFromContext)) return new NonRecordingSpan(parentFromContext);
		else return new NonRecordingSpan();
	};
	NoopTracer$1.prototype.startActiveSpan = function(name, arg2, arg3, arg4) {
		var opts;
		var ctx;
		var fn;
		if (arguments.length < 2) return;
		else if (arguments.length === 2) fn = arg2;
		else if (arguments.length === 3) {
			opts = arg2;
			fn = arg3;
		} else {
			opts = arg2;
			ctx = arg3;
			fn = arg4;
		}
		var parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
		var span = this.startSpan(name, opts, parentContext);
		var contextWithSpanSet = setSpan(parentContext, span);
		return contextApi.with(contextWithSpanSet, fn, void 0, span);
	};
	return NoopTracer$1;
}();
function isSpanContext(spanContext) {
	return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
}
var NOOP_TRACER = new NoopTracer();
var ProxyTracer = function() {
	function ProxyTracer$1(_provider, name, version, options) {
		this._provider = _provider;
		this.name = name;
		this.version = version;
		this.options = options;
	}
	ProxyTracer$1.prototype.startSpan = function(name, options, context$1) {
		return this._getTracer().startSpan(name, options, context$1);
	};
	ProxyTracer$1.prototype.startActiveSpan = function(_name, _options, _context, _fn) {
		var tracer = this._getTracer();
		return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
	};
	ProxyTracer$1.prototype._getTracer = function() {
		if (this._delegate) return this._delegate;
		var tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
		if (!tracer) return NOOP_TRACER;
		this._delegate = tracer;
		return this._delegate;
	};
	return ProxyTracer$1;
}();
var NOOP_TRACER_PROVIDER = new (function() {
	function NoopTracerProvider$1() {}
	NoopTracerProvider$1.prototype.getTracer = function(_name, _version, _options) {
		return new NoopTracer();
	};
	return NoopTracerProvider$1;
}())();
var ProxyTracerProvider = function() {
	function ProxyTracerProvider$1() {}
	ProxyTracerProvider$1.prototype.getTracer = function(name, version, options) {
		var _a;
		return (_a = this.getDelegateTracer(name, version, options)) !== null && _a !== void 0 ? _a : new ProxyTracer(this, name, version, options);
	};
	ProxyTracerProvider$1.prototype.getDelegate = function() {
		var _a;
		return (_a = this._delegate) !== null && _a !== void 0 ? _a : NOOP_TRACER_PROVIDER;
	};
	ProxyTracerProvider$1.prototype.setDelegate = function(delegate) {
		this._delegate = delegate;
	};
	ProxyTracerProvider$1.prototype.getDelegateTracer = function(name, version, options) {
		var _a;
		return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getTracer(name, version, options);
	};
	return ProxyTracerProvider$1;
}();
var SamplingDecision;
(function(SamplingDecision$1) {
	SamplingDecision$1[SamplingDecision$1["NOT_RECORD"] = 0] = "NOT_RECORD";
	SamplingDecision$1[SamplingDecision$1["RECORD"] = 1] = "RECORD";
	SamplingDecision$1[SamplingDecision$1["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
})(SamplingDecision || (SamplingDecision = {}));
var SpanKind;
(function(SpanKind$1) {
	SpanKind$1[SpanKind$1["INTERNAL"] = 0] = "INTERNAL";
	SpanKind$1[SpanKind$1["SERVER"] = 1] = "SERVER";
	SpanKind$1[SpanKind$1["CLIENT"] = 2] = "CLIENT";
	SpanKind$1[SpanKind$1["PRODUCER"] = 3] = "PRODUCER";
	SpanKind$1[SpanKind$1["CONSUMER"] = 4] = "CONSUMER";
})(SpanKind || (SpanKind = {}));
var SpanStatusCode;
(function(SpanStatusCode$1) {
	SpanStatusCode$1[SpanStatusCode$1["UNSET"] = 0] = "UNSET";
	SpanStatusCode$1[SpanStatusCode$1["OK"] = 1] = "OK";
	SpanStatusCode$1[SpanStatusCode$1["ERROR"] = 2] = "ERROR";
})(SpanStatusCode || (SpanStatusCode = {}));
var VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
var VALID_KEY = "[a-z]" + VALID_KEY_CHAR_RANGE + "{0,255}";
var VALID_VENDOR_KEY = "[a-z0-9]" + VALID_KEY_CHAR_RANGE + "{0,240}@[a-z]" + VALID_KEY_CHAR_RANGE + "{0,13}";
var VALID_KEY_REGEX = /* @__PURE__ */ new RegExp("^(?:" + VALID_KEY + "|" + VALID_VENDOR_KEY + ")$");
var VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
var INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
function validateKey(key) {
	return VALID_KEY_REGEX.test(key);
}
function validateValue(value) {
	return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
}
var MAX_TRACE_STATE_ITEMS = 32;
var MAX_TRACE_STATE_LEN = 512;
var LIST_MEMBERS_SEPARATOR = ",";
var LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
var TraceStateImpl = function() {
	function TraceStateImpl$1(rawTraceState) {
		this._internalState = /* @__PURE__ */ new Map();
		if (rawTraceState) this._parse(rawTraceState);
	}
	TraceStateImpl$1.prototype.set = function(key, value) {
		var traceState = this._clone();
		if (traceState._internalState.has(key)) traceState._internalState.delete(key);
		traceState._internalState.set(key, value);
		return traceState;
	};
	TraceStateImpl$1.prototype.unset = function(key) {
		var traceState = this._clone();
		traceState._internalState.delete(key);
		return traceState;
	};
	TraceStateImpl$1.prototype.get = function(key) {
		return this._internalState.get(key);
	};
	TraceStateImpl$1.prototype.serialize = function() {
		var _this = this;
		return this._keys().reduce(function(agg, key) {
			agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + _this.get(key));
			return agg;
		}, []).join(LIST_MEMBERS_SEPARATOR);
	};
	TraceStateImpl$1.prototype._parse = function(rawTraceState) {
		if (rawTraceState.length > MAX_TRACE_STATE_LEN) return;
		this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse().reduce(function(agg, part) {
			var listMember = part.trim();
			var i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
			if (i !== -1) {
				var key = listMember.slice(0, i);
				var value = listMember.slice(i + 1, part.length);
				if (validateKey(key) && validateValue(value)) agg.set(key, value);
			}
			return agg;
		}, /* @__PURE__ */ new Map());
		if (this._internalState.size > MAX_TRACE_STATE_ITEMS) this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
	};
	TraceStateImpl$1.prototype._keys = function() {
		return Array.from(this._internalState.keys()).reverse();
	};
	TraceStateImpl$1.prototype._clone = function() {
		var traceState = new TraceStateImpl$1();
		traceState._internalState = new Map(this._internalState);
		return traceState;
	};
	return TraceStateImpl$1;
}();
function createTraceState(rawTraceState) {
	return new TraceStateImpl(rawTraceState);
}
var context = ContextAPI.getInstance();
var diag = DiagAPI.instance();
var NOOP_METER_PROVIDER = new (function() {
	function NoopMeterProvider$1() {}
	NoopMeterProvider$1.prototype.getMeter = function(_name, _version, _options) {
		return NOOP_METER;
	};
	return NoopMeterProvider$1;
}())();
var API_NAME$2 = "metrics";
var metrics = function() {
	function MetricsAPI$1() {}
	MetricsAPI$1.getInstance = function() {
		if (!this._instance) this._instance = new MetricsAPI$1();
		return this._instance;
	};
	MetricsAPI$1.prototype.setGlobalMeterProvider = function(provider) {
		return registerGlobal(API_NAME$2, provider, DiagAPI.instance());
	};
	MetricsAPI$1.prototype.getMeterProvider = function() {
		return getGlobal(API_NAME$2) || NOOP_METER_PROVIDER;
	};
	MetricsAPI$1.prototype.getMeter = function(name, version, options) {
		return this.getMeterProvider().getMeter(name, version, options);
	};
	MetricsAPI$1.prototype.disable = function() {
		unregisterGlobal(API_NAME$2, DiagAPI.instance());
	};
	return MetricsAPI$1;
}().getInstance();
var NoopTextMapPropagator = function() {
	function NoopTextMapPropagator$1() {}
	NoopTextMapPropagator$1.prototype.inject = function(_context, _carrier) {};
	NoopTextMapPropagator$1.prototype.extract = function(context$1, _carrier) {
		return context$1;
	};
	NoopTextMapPropagator$1.prototype.fields = function() {
		return [];
	};
	return NoopTextMapPropagator$1;
}();
var BAGGAGE_KEY = createContextKey("OpenTelemetry Baggage Key");
function getBaggage(context$1) {
	return context$1.getValue(BAGGAGE_KEY) || void 0;
}
function getActiveBaggage() {
	return getBaggage(ContextAPI.getInstance().active());
}
function setBaggage(context$1, baggage) {
	return context$1.setValue(BAGGAGE_KEY, baggage);
}
function deleteBaggage(context$1) {
	return context$1.deleteValue(BAGGAGE_KEY);
}
var API_NAME$1 = "propagation";
var NOOP_TEXT_MAP_PROPAGATOR = new NoopTextMapPropagator();
var propagation = function() {
	function PropagationAPI$1() {
		this.createBaggage = createBaggage;
		this.getBaggage = getBaggage;
		this.getActiveBaggage = getActiveBaggage;
		this.setBaggage = setBaggage;
		this.deleteBaggage = deleteBaggage;
	}
	PropagationAPI$1.getInstance = function() {
		if (!this._instance) this._instance = new PropagationAPI$1();
		return this._instance;
	};
	PropagationAPI$1.prototype.setGlobalPropagator = function(propagator) {
		return registerGlobal(API_NAME$1, propagator, DiagAPI.instance());
	};
	PropagationAPI$1.prototype.inject = function(context$1, carrier, setter) {
		if (setter === void 0) setter = defaultTextMapSetter;
		return this._getGlobalPropagator().inject(context$1, carrier, setter);
	};
	PropagationAPI$1.prototype.extract = function(context$1, carrier, getter) {
		if (getter === void 0) getter = defaultTextMapGetter;
		return this._getGlobalPropagator().extract(context$1, carrier, getter);
	};
	PropagationAPI$1.prototype.fields = function() {
		return this._getGlobalPropagator().fields();
	};
	PropagationAPI$1.prototype.disable = function() {
		unregisterGlobal(API_NAME$1, DiagAPI.instance());
	};
	PropagationAPI$1.prototype._getGlobalPropagator = function() {
		return getGlobal(API_NAME$1) || NOOP_TEXT_MAP_PROPAGATOR;
	};
	return PropagationAPI$1;
}().getInstance();
var API_NAME = "trace";
var trace = function() {
	function TraceAPI$1() {
		this._proxyTracerProvider = new ProxyTracerProvider();
		this.wrapSpanContext = wrapSpanContext;
		this.isSpanContextValid = isSpanContextValid;
		this.deleteSpan = deleteSpan;
		this.getSpan = getSpan;
		this.getActiveSpan = getActiveSpan;
		this.getSpanContext = getSpanContext;
		this.setSpan = setSpan;
		this.setSpanContext = setSpanContext;
	}
	TraceAPI$1.getInstance = function() {
		if (!this._instance) this._instance = new TraceAPI$1();
		return this._instance;
	};
	TraceAPI$1.prototype.setGlobalTracerProvider = function(provider) {
		var success = registerGlobal(API_NAME, this._proxyTracerProvider, DiagAPI.instance());
		if (success) this._proxyTracerProvider.setDelegate(provider);
		return success;
	};
	TraceAPI$1.prototype.getTracerProvider = function() {
		return getGlobal(API_NAME) || this._proxyTracerProvider;
	};
	TraceAPI$1.prototype.getTracer = function(name, version) {
		return this.getTracerProvider().getTracer(name, version);
	};
	TraceAPI$1.prototype.disable = function() {
		unregisterGlobal(API_NAME, DiagAPI.instance());
		this._proxyTracerProvider = new ProxyTracerProvider();
	};
	return TraceAPI$1;
}().getInstance();
var esm_default = {
	context,
	diag,
	metrics,
	propagation,
	trace
};
export { DiagConsoleLogger, DiagLogLevel, INVALID_SPANID, INVALID_SPAN_CONTEXT, INVALID_TRACEID, ProxyTracer, ProxyTracerProvider, ROOT_CONTEXT, SamplingDecision, SpanKind, SpanStatusCode, TraceFlags, ValueType, baggageEntryMetadataFromString, context, createContextKey, createNoopMeter, createTraceState, esm_default as default, defaultTextMapGetter, defaultTextMapSetter, diag, isSpanContextValid, isValidSpanId, isValidTraceId, metrics, propagation, trace };
